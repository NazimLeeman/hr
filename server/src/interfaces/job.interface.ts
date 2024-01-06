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
  // restaurantName: string;
  // restaurantInformation: string; 
  // restaurantLogoUrl: string; 
  // restaurantcontactEmail: string;
}