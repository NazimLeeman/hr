export interface RegisterData {
  id: number;
  email: string;
  password: string;
  applicantId: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  data: RegisterData;
}

