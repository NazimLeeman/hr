export interface UserData {
  id: number;
  name: string;
  email: string;
  experience: string[];
  phoneNumber: number;
  address: string;
  skillTags: string[];
  hourlyRate: number;
  imageUrl: string;
  availability: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  data: UserData;
}

export interface SuitableSkill {
    skillTags: string[];
}