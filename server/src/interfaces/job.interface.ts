export interface IJob {
  id: number;
  jobRole: string;
  jobNature: string;
  jobDescription: string;
  experience: string;
  skillTags: [string];
  hourlyRate: number;
  applicationDeadline: Date; 
  responsibilities: string[];
  restaurantId: number; 
  // restaurantName: string;
  // restaurantInformation: string; 
  // restaurantLogoUrl: string; 
  // restaurantcontactEmail: string;
}