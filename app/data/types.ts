// app/data/types.ts
export interface User {
  name: string;
  avatar_url: string | null;
}

export interface Comment {
  id: string;
  user_name: string;
  content: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  category: string;
  created_by: User;
  participants: number;
  max_participants: number;
  comments: Comment[];
}

export interface Service {
  id: string;
  title: string;
  profession: string;
  location: string;
  hourly_rate: number;
  experience_years: number;
  rating: number;
  review_count: number;
  is_verified: boolean;
  provider: User;
}

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: string;
  read_time: number; // em minutos
  created_at: string;
}

export interface HomeData {
  featuredServices: Service[];
  upcomingEvents: Event[];
  healthTips: HealthTip[];
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: 'emergency' | 'health' | 'family';
  description: string;
}