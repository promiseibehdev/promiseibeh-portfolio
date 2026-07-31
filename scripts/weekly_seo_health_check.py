from __future__ import annotations

import json
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urldefrag, urljoin, urlparse

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

SITE_URL = "https://promiseibeh-portfolio.pages.dev"
SITE_HOST = urlparse(SITE_URL).netloc
SITEMAP_URL = f"{SITE_URL}/sitemap.xml"
ROBOTS_URL = f"{SITE_URL}/robots.txt"
INDEXNOW_KEY = "1626bbfe0b874218aebb5265c6864f27"
INDEXNOW_KEY_URL = f"{SITE_URL}/{INDEXNOW_KEY}.txt"
REPORT_PATH = Path("seo-health-report.md")
USER_AGENT = "Mozilla/5.0 (compatible; PromiseIbehSEOHealthCheck/1.0)"


@dataclass
class Response:
    status: int
    url: str
    headers: dict[str, str]
    body: bytes


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, response, code, message, headers, new_url):
        return None


class SourceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []
        self.canonicals: list[str] = []
        self.descriptions: list[str] = []
        self.robots: list[str] = []
        self.titles: list[str] = []
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "a" and values.get("href"):
            self.links.append(values["href"] or "")
        if tag == "link" and "canonical" in (values.get("rel") or "").lower():
            self.canonicals.append(values.get("href") or "")
        if tag == "meta" and (values.get("name") or "").lower() == "description":
            self.descriptions.append(values.get("content") or "")
        if tag == "meta" and (values.get("name") or "").lower() == "robots":
            self.robots.append(values.get("content") or "")
        if tag == "title":
            self._in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title and data.strip():
            self.titles.append(data.strip())


def fetch(
    url: str,
    attempts: int = 3,
    timeout: int = 15,
    follow_redirects: bool = True,
) -> Response:
    last_error: Exception | None = None
    for attempt in range(attempts):
        try:
            request = urllib.request.Request(
                url,
                headers={"User-Agent": USER_AGENT, "Cache-Control": "no-cache"},
            )
            opener = urllib.request.build_opener() if follow_redirects else urllib.request.build_opener(NoRedirect)
            with opener.open(request, timeout=timeout) as response:
                return Response(
                    status=response.status,
                    url=response.url,
                    headers={key.lower(): value for key, value in response.headers.items()},
                    body=response.read(),
                )
        except urllib.error.HTTPError as error:
            if not follow_redirects and 300 <= error.code < 400:
                return Response(
                    status=error.code,
                    url=url,
                    headers={key.lower(): value for key, value in error.headers.items()},
                    body=error.read(),
                )
            last_error = error
            if attempt + 1 < attempts:
                time.sleep(2 * (attempt + 1))
        except (urllib.error.URLError, TimeoutError) as error:
            last_error = error
            if attempt + 1 < attempts:
                time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"Unable to fetch {url}: {last_error}")


def normalized_internal_url(href: str, source_url: str) -> str | None:
    absolute = urldefrag(urljoin(source_url, href))[0]
    parsed = urlparse(absolute)
    if parsed.scheme not in {"http", "https"} or parsed.netloc != SITE_HOST:
        return None
    return absolute


failures: list[str] = []
checks: list[str] = []


def record(condition: bool, success: str, failure: str) -> None:
    if condition:
        checks.append(success)
    else:
        failures.append(failure)


try:
    homepage = fetch(f"{SITE_URL}/")
    record(homepage.status == 200, "Homepage returned HTTP 200.", f"Homepage returned HTTP {homepage.status}.")

    robots = fetch(ROBOTS_URL)
    robots_text = robots.body.decode("utf-8", errors="strict")
    record(robots.status == 200, "robots.txt returned HTTP 200.", f"robots.txt returned HTTP {robots.status}.")
    record(
        f"Sitemap: {SITEMAP_URL}" in robots_text,
        "robots.txt references the production sitemap.",
        "robots.txt does not reference the production sitemap.",
    )

    sitemap = fetch(SITEMAP_URL)
    record(sitemap.status == 200, "sitemap.xml returned HTTP 200.", f"sitemap.xml returned HTTP {sitemap.status}.")
    record(
        sitemap.headers.get("content-type", "").split(";", 1)[0] in {"application/xml", "text/xml"},
        "sitemap.xml has an XML Content-Type.",
        f"sitemap.xml has unexpected Content-Type {sitemap.headers.get('content-type')}.",
    )
    root = ET.fromstring(sitemap.body)
    namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"
    record(
        root.tag == f"{{{namespace}}}urlset",
        "sitemap.xml uses the required urlset namespace.",
        f"sitemap.xml has unexpected root element {root.tag}.",
    )
    sitemap_urls = [
        node.text.strip()
        for node in root.findall(f"{{{namespace}}}url/{{{namespace}}}loc")
        if node.text
    ]
    record(bool(sitemap_urls), "sitemap.xml contains URLs.", "sitemap.xml contains no URLs.")
    record(
        len(sitemap_urls) == len(set(sitemap_urls)),
        "sitemap.xml contains no duplicate URLs.",
        "sitemap.xml contains duplicate URLs.",
    )
    record(
        all(url.startswith(f"{SITE_URL}/") for url in sitemap_urls),
        "All sitemap URLs are absolute production HTTPS URLs.",
        "The sitemap contains a non-production or non-HTTPS URL.",
    )

    source_links: set[str] = set()
    for url in sitemap_urls:
        response = fetch(url)
        record(response.status == 200, f"{url} returned HTTP 200.", f"{url} returned HTTP {response.status}.")
        parser = SourceParser()
        parser.feed(response.body.decode("utf-8", errors="replace"))
        record(
            parser.canonicals == [url],
            f"{url} has the correct source canonical.",
            f"{url} source canonical is {parser.canonicals!r}; expected {url}.",
        )
        record(bool(parser.titles and parser.titles[0]), f"{url} has a source title.", f"{url} has no source title.")
        record(
            bool(parser.descriptions and parser.descriptions[0].strip()),
            f"{url} has a source description.",
            f"{url} has no source description.",
        )
        robots_directives = " ".join(parser.robots).lower()
        record("noindex" not in robots_directives, f"{url} is not noindexed.", f"{url} contains a noindex directive.")
        record(
            "noindex" not in response.headers.get("x-robots-tag", "").lower(),
            f"{url} has no blocking X-Robots-Tag.",
            f"{url} has a blocking X-Robots-Tag.",
        )
        for href in parser.links:
            internal = normalized_internal_url(href, url)
            if internal:
                source_links.add(internal)

    def check_internal_link(link: str) -> None:
        try:
            response = fetch(link)
            record(response.status == 200, f"Internal link works: {link}", f"Broken internal link ({response.status}): {link}")
        except RuntimeError as error:
            failures.append(f"Broken internal link: {error}")

    with ThreadPoolExecutor(max_workers=6) as executor:
        list(executor.map(check_internal_link, sorted(source_links)))

    key_file = fetch(INDEXNOW_KEY_URL)
    record(
        key_file.status == 200 and key_file.body.decode("utf-8", errors="strict") == INDEXNOW_KEY,
        "The IndexNow key file is publicly available and exact.",
        "The IndexNow key file is unavailable or its contents are incorrect.",
    )

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--window-size=390,844")
    options.set_capability("pageLoadStrategy", "eager")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(30)
    project_links: set[str] = set()
    rendered_internal_links: set[str] = set()
    try:
        for url in sitemap_urls:
            driver.set_window_size(390, 844)
            driver.get(url)
            time.sleep(0.4)
            overflow = driver.execute_script(
                "return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1"
            )
            record(not overflow, f"No mobile overflow: {url}", f"Mobile overflow detected: {url}")
            canonical = driver.find_elements(By.CSS_SELECTOR, 'link[rel="canonical"]')
            record(
                len(canonical) == 1 and canonical[0].get_attribute("href") == url,
                f"Rendered canonical is correct: {url}",
                f"Rendered canonical is incorrect: {url}",
            )
            title = driver.title.strip()
            descriptions = driver.find_elements(By.CSS_SELECTOR, 'meta[name="description"]')
            rendered_robots = driver.find_elements(By.CSS_SELECTOR, 'meta[name="robots"]')
            record(bool(title), f"Rendered title exists: {url}", f"Rendered title is missing: {url}")
            record(
                len(descriptions) == 1 and bool((descriptions[0].get_attribute("content") or "").strip()),
                f"Rendered description exists: {url}",
                f"Rendered description is missing: {url}",
            )
            record(
                all(
                    "noindex" not in (element.get_attribute("content") or "").lower()
                    for element in rendered_robots
                ),
                f"Rendered page is not noindexed: {url}",
                f"Rendered page contains a noindex directive: {url}",
            )
            for anchor in driver.find_elements(By.CSS_SELECTOR, 'a[href]'):
                internal = normalized_internal_url(anchor.get_attribute("href") or "", url)
                if internal:
                    rendered_internal_links.add(internal)

        driver.get(f"{SITE_URL}/projects")
        time.sleep(0.5)
        for anchor in driver.find_elements(By.CSS_SELECTOR, 'a[href]'):
            text = " ".join(anchor.text.lower().split())
            href = anchor.get_attribute("href")
            if href and text in {"view live", "view source"} and urlparse(href).netloc != SITE_HOST:
                project_links.add(href)
    finally:
        driver.quit()

    with ThreadPoolExecutor(max_workers=6) as executor:
        list(executor.map(check_internal_link, sorted(rendered_internal_links - source_links)))

    def check_project_link(link: str) -> None:
        try:
            response = fetch(link, attempts=2, timeout=15, follow_redirects=False)
            record(response.status < 400, f"Project link works: {link}", f"Broken project link ({response.status}): {link}")
        except RuntimeError as error:
            failures.append(f"Broken project link: {error}")

    with ThreadPoolExecutor(max_workers=6) as executor:
        list(executor.map(check_project_link, sorted(project_links)))

except Exception as error:  # Ensure unexpected audit errors produce a report and issue.
    failures.append(f"Audit execution error: {error}")

status = "PASS" if not failures else "FAIL"
report = [
    f"# Weekly SEO Health Check: {status}",
    "",
    f"- Website: {SITE_URL}",
    f"- Successful assertions: {len(checks)}",
    f"- Failures: {len(failures)}",
    "",
]
if failures:
    report.extend(["## Failures", "", *[f"- {failure}" for failure in failures], ""])
report.extend(["## Passed checks", "", *[f"- {check}" for check in checks], ""])
REPORT_PATH.write_text("\n".join(report), encoding="utf-8")
print(json.dumps({"status": status, "checks": len(checks), "failures": failures}))
raise SystemExit(1 if failures else 0)
