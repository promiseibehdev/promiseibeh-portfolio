import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className, size = 24 }: IconProps) {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) {
    // Fallback if icon is not found
    const HelpCircle = Icons.HelpCircle;
    return <HelpCircle className={className} size={size} />;
  }
  return <LucideIcon className={className} size={size} />;
}
