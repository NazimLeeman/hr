export interface Employee {
  id: number;
  restaurantId: number;
  name: string;
  email: string;
}

export interface UserOption {
  id: number;
  name: string;
}

export interface Schedule {
  id: number;
  day: string;
  slotStart: string;
  slotEnds: string;
  restaurantId: number;
  shift: string;
  employees: { id: number; name: string }[];
  createdAt: string;
  updatedAt: string;
}