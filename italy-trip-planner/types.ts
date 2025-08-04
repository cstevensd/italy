

export interface ScheduleItem {
  date: string;
  activity: string;
  notes: string;
  address?: string;
  link?: {
    url:string;
    text: string;
  };
}

export interface Flight {
  travelers: string;
  outbound: FlightDetails;
  return: FlightDetails;
  confirmationCodes: ConfirmationCode[];
}

export interface FlightDetails {
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration?: string;
  seats?: string;
  departureTerminal?: string;
  arrivalTerminal?: string;
  departureMapUrl?: string;
  arrivalMapUrl?: string;
}

export interface ConfirmationCode {
  provider: string;
  code: string;
}

export interface Accommodation {
  city: string;
  name: string;
  provider: string;
  address: string;
  dates: string;
  imageUrl: string;
  bookingLink?: string;
}

export interface TodoItemType {
  id: number;
  task: string;
  completed: boolean;
  assignees: string[];
  dueDate?: string;
  link?: {
    url: string;
    text: string;
  };
}

export interface Traveler {
    name: string;
    email: string;
}

export interface DestinationGuideData {
  overview: string;
  placesToVisit: {
    name:string;
    googleMapsUrl: string;
  }[];
  thingsToDo: string[];
  localTips: {
    description: string;
    name?: string;
    googleMapsUrl?: string;
  }[];
}

export interface GuideListItem {
  name: string;
  description?: string;
  address?: string;
  url?: string;
  items?: string[];
  subItems?: GuideListItem[];
}

export interface GuideSection {
  title: string;
  content: string | GuideListItem[];
}

export interface CuratedGuideContent {
  name: string;
  overviewImage?: string;
  overviewText?: string;
  sections: GuideSection[];
}

export interface TrainTime {
  trainNumber: string;
  trainType: 'Frecciarossa' | 'Italo' | 'Regionale' | 'Intercity';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
}

export interface Phrase {
  italian: string;
  english: string;
}

export interface PhraseCategory {
  category: string;
  phrases: Phrase[];
}

export interface TrainBooking {
  passenger: string;
  departure: string;
  arrival: string;
  duration: string;
  confirmationNumber: string;
  seats: string;
  coach: string;
  class: string;
  departureMapUrl?: string;
  arrivalMapUrl?: string;
}

export type Currency = 'USD' | 'CAD' | 'EUR';
