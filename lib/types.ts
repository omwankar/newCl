export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  details?: string[];
}

export interface Office {
  id: string;
  city: string;
  country: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Differentiator {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface TimelineEvent {
  id: string;
  year: number | string;
  title: string;
  description: string;
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  message: string;
}
