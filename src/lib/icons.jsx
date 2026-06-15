import {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Handshake,
  Heart,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Mail,
  MessageCircle,
  Mountain,
  PersonStanding,
  Play,
  Send,
  Target,
  Users
} from "lucide-react";

const iconMap = {
  ArrowRight,
  ChevronDown,
  GraduationCap,
  Handshake,
  Heart,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Mail,
  MessageCircle,
  Mountain,
  PersonStanding,
  Play,
  Send,
  Target,
  Users
};

export function Icon({ name, ...props }) {
  const Component = iconMap[name] || Users;
  return <Component {...props} />;
}

export function SocialIcon({ platform, iconUrl, size }) {
  if (iconUrl) {
    return <img src={iconUrl} alt={platform} style={{ width: size, height: size, objectFit: "contain", borderRadius: "50%" }} />;
  }
  return null;
}
