export interface Position {
    id: number;
    position: string;
    employeeId: number;
    restaurantId: number;
    services: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Applicant {
    id: number;
    name: string;
    email: string;
    experience: string[];
    phoneNumber: number;
    address: string;
    skillTags: string[];
    hourlyRate: number;
    efficiency: string;
    imageUrl: string;
    availability?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ApplicantData {
    id: number;
    restaurantId: number;
    name: string;
    email: string;
    experience: string[];
    phoneNumber: number;
    address: string;
    skillTags: string[];
    hourlyRate: number;
    efficiency: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    positionId: number;
    applicantId: number | null;
    position: Position;
    applicant: Applicant | null;
}

export interface ApplicantDataResponse {
    data: ApplicantData[];
}

export interface Employee {
    id: number;
    restaurantId: number;
    name: string;
    email: string;
    experience: string[];
    phoneNumber: number;
    address: string;
    skillTags: string[];
    hourlyRate: number;
    efficiency: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    positionId: number;
    applicantId: number | null;
    position: Position;
    applicant: Applicant | null;
}

export interface Position {
    id: number;
    position: string;
    employeeId: number;
    restaurantId: number;
    services: string[];
    createdAt: string;
    updatedAt: string;
}

export interface EmployeeData {
    data: {
        id: number;
        employeeId: number;
        hourlyRate: number;
        totalHours: number;
        totalDeduction: number;
        restaurantId: number;
        createdAt: string;
        updatedAt: string;
        employee: {
            id: number;
            restaurantId: number;
            name: string;
            email: string;
            experience: string[];
            phoneNumber: number;
            address: string;
            skillTags: string[];
            hourlyRate: number;
            efficiency: string;
            imageUrl: string;
            createdAt: string;
            updatedAt: string;
            positionId: number;
            applicantId: number | null;
        };
    };
}

export interface EmployeeOption {
  id: number;
  restaurantId: number;
  name: string;
  email: string;
  position: {
    position: string;
  }
}

export interface UserOption {
  id: number;
  name: string;
  email: string;
}