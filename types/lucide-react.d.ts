declare module "lucide-react" {
  import { FC, SVGProps, ForwardRefExoticComponent, RefAttributes } from "react";

  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  type Icon = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

  export const Sparkles: Icon;
  export const ArrowRight: Icon;
  export const ArrowLeft: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const Brain: Icon;
  export const Bot: Icon;
  export const Puzzle: Icon;
  export const Store: Icon;
  export const Server: Icon;
  export const Workflow: Icon;
  export const Key: Icon;
  export const Monitor: Icon;
  export const Smartphone: Icon;
  export const Shield: Icon;
  export const Cloud: Icon;
  export const Zap: Icon;
  export const Palette: Icon;
  export const Lock: Icon;
  export const Search: Icon;
  export const Star: Icon;
  export const TrendingUp: Icon;
  export const Flame: Icon;
  export const Download: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const ChevronDown: Icon;
  export const Quote: Icon;
  export const Check: Icon;
  export const Clock: Icon;
  export const Gift: Icon;
  export const Target: Icon;
  export const Eye: Icon;
  export const Heart: Icon;
  export const Send: Icon;
  export const MessageSquare: Icon;
  export const BarChart3: Icon;
  export const Twitter: Icon;
  export const Facebook: Icon;
  export const MessageCircle: Icon;
  export const Instagram: Icon;
  export const Youtube: Icon;

  export type LucideIcon = Icon;
}
