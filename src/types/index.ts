export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "men" | "women" | "unisex";
  materials: string[];
  sustainability: string[];
  sizes: number[];
  colors: string[];
}

export interface FilterState {
  category: string[];
  material: string[];
  sustainability: string[];
  sizes: number[];
  colors: string[];
  sort: SortOption;
}

export type SortOption =
  | "relevance"
  | "a-z"
  | "z-a"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "best-selling";

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ValueCard {
  icon: string;
  title: string;
  description: string;
}
