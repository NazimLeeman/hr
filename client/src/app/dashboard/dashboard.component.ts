import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  apiData: any[] = [];
  cards = [
    { title: 'Kacchi Bhai', role: 'Chef', salary: '50', description: 'As a Position Title at Restaurant Name, you will play a crucial role in ensuring the seamless operation of our restaurant. From culinary excellence to customer service, you will contribute to the overall success of our establishment. We are seeking passionate individuals who share our dedication to delivering exceptional service and creating memorable dining experiences.Responsibilities: Culinary Excellence: Prepare and cook a variety of dishes with precision and attention to detail.Ensure food quality meets our high standards and is consistently delivered to guests.Customer Service:Provide excellent customer service, ensuring guests have a positive and enjoyable dining experience.Attend to guest needs and inquiries with professionalism and courtesy.Team Collaboration:Work collaboratively with kitchen and front-of-house teams to maintain a harmonious and efficient working environment.Communicate effectively with team members to ensure smooth service operations.Cleanliness and Hygiene:Maintain a clean and organized workspace, adhering to food safety and sanitation guidelines.Contribute to overall cleanliness and hygiene standards within the restaurant.Menu Knowledge:Stay informed about menu items, specials, and ingredients to provide accurate information to guests.Assist guests with menu selections and accommodate special requests.Your dedication to these responsibilities will not only enhance the reputation of our restaurant but also contribute to the satisfaction of our valued guests. We look forward to welcoming a dynamic individual like you to our team, where your passion and commitment will undoubtedly make a lasting impact.', showDetails: false },
    { title: 'McDonalds', role: 'Waiter', salary: '60', description: 'As a Position Title at Restaurant Name, you will play a crucial role in ensuring the seamless operation of our restaurant. From culinary excellence to customer service, you will contribute to the overall success of our establishment. We are seeking passionate individuals who share our dedication to delivering exceptional service and creating memorable dining experiences.Responsibilities: Culinary Excellence: Prepare and cook a variety of dishes with precision and attention to detail.Ensure food quality meets our high standards and is consistently delivered to guests.Customer Service:Provide excellent customer service, ensuring guests have a positive and enjoyable dining experience.Attend to guest needs and inquiries with professionalism and courtesy.Team Collaboration:Work collaboratively with kitchen and front-of-house teams to maintain a harmonious and efficient working environment.Communicate effectively with team members to ensure smooth service operations.Cleanliness and Hygiene:Maintain a clean and organized workspace, adhering to food safety and sanitation guidelines.Contribute to overall cleanliness and hygiene standards within the restaurant.Menu Knowledge:Stay informed about menu items, specials, and ingredients to provide accurate information to guests.Assist guests with menu selections and accommodate special requests.', showDetails: false },
  ];

  selectedCard: any; 
  
  selectCard(card: any) {
    this.selectedCard = card;
    this.cards.forEach(c => c.showDetails = c === card);
  }

  ngOnInit(): void {
    if (this.cards.length > 0) {
      this.selectCard(this.cards[0]);
    }
    this.anotherOnInit()
  }

  anotherOnInit(): void {
    this.apiClientService.getAllJobForRestaurant().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.apiData = data.data;
        if (this.cards.length > 0 && this.apiData.length > 0) {
          this.cards.forEach((card, index) => {
            const apiDataItem = this.apiData[index];
  
            console.log(`Card ${index + 1}:`, card);
            console.log(`API Data ${index + 1}:`, apiDataItem);
  
            if (apiDataItem) {
              card.role = apiDataItem.jobRole || card.role;
              card.salary = apiDataItem.hourlyRate || card.salary;
              card.description = apiDataItem.jobDescription || card.description;
  
              console.log(`Updated Card ${index + 1}:`, card);
            } else {
              console.error(`Error: API data for Card ${index + 1} is undefined.`);
            }
          })
          // const firstCard = this.cards[0];
          // const firstApiData = this.apiData[0];
  
          // if (firstApiData && firstCard) {
          //   firstCard.role = firstApiData.jobRole || firstCard.role;
          //   firstCard.salary = firstApiData.hourlyRate || firstCard.salary;
          //   firstCard.description = firstApiData.jobDescription || firstCard.description;
          // }
          
        }
      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
  }

  constructor(private apiClientService: ApiClientService) {}

}


