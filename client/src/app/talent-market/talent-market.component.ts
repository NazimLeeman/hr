import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../services/apiClient/api-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-talent-market',
  templateUrl: './talent-market.component.html',
  styleUrl: './talent-market.component.css'
})
export class TalentMarketComponent {
  apiData: any[] = [];
  jobs: any[] = [];
  radioValue = 'C';
  selectedJobType: string = 'C';
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = (): boolean => true;


  cards: any[] = [];


  applicantId: number = 0;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private apiClientService: ApiClientService) {}
  paramOnInit(): void {
      this.route.params.subscribe(params => {
        this.applicantId = +params['applicantId'] || 0;
      })
  }

  selectedCard: any; 

  

  getApplicantData(): void {
    this.route.params.pipe(
      switchMap((params) => {
          this.applicantId = params['applicantId'];
          return this.apiClientService.getRegisterData(this.applicantId);
      })
  ).subscribe(
      (data: any) => {
        console.log('Applicant Data Response:', data);
      },
      (error) => {
          console.error('Error fetching data from the API', error);
      }
  );
  }
  
  selectCard(card: any) {
    this.selectedCard = card;
    this.cards.forEach(c => c.showDetails = c === card);
    this.trackSelectedCardApiData(card); 
  }

  trackSelectedCardApiData(card: any): void {
    if (!card) {
      console.error('Error: Selected card is undefined.');
      return;
    }

    const selectedCardJobId = card.jobId; 

    this.apiClientService.getAllJob().subscribe(
      (jobDetails: any) => {
        console.log('Selected Card API Response:', jobDetails);
      },
      (error) => {
        console.error('Error fetching job details from the API', error);
      }
    );
  }

  ngOnInit(): void {
    // if (this.cards.length > 0) {
    //   this.selectCard(this.cards[0]);
    // }
    this.anotherOnInit();
    this.paramOnInit();
  }

  anotherOnInit(): void {
    this.apiClientService.getAllJobForRestaurant().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.apiData = data.data;
        this.cards = [];
  
        if (this.apiData.length > 0) {
          let filteredData = this.apiData;
  
          // Filter based on radioValue
          if (this.radioValue === 'A') {
            filteredData = filteredData.filter(item => item.jobNature === 'Part-Time');
          } else if (this.radioValue === 'B') {
            filteredData = filteredData.filter(item => item.jobNature === 'Full-Time');
          }
  
          filteredData.forEach((apiDataItem, index) => {
            const newCard = {
              jobId: apiDataItem.id || -1,
              jobNature: apiDataItem.jobNature || '',
              skillTags: apiDataItem.skillTags || [],
              restaurantId: apiDataItem.restaurantId || -1,
              role: apiDataItem.jobRole || 'Default Role',
              salary: apiDataItem.hourlyRate || 'Default Salary',
              description: apiDataItem.jobDescription || 'Default Description',
              showDetails: false,
            };
  
            console.log(`New Card ${index + 1}:`, newCard);
  
            if (this.cards.length > 0) {
              this.selectCard(this.cards[0]);
            }
  
            this.cards.push(newCard);
  
            if (this.selectedCard && this.selectedCard === apiDataItem) {
              this.selectCard(newCard);
            }
          });
        }
      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
  }

  search(value: string): void {
    this.apiClientService.getAllJobForRestaurant().subscribe(
      (data: any) => {
        if (data) {
          this.apiData = data.data;
          const uniqueValuesSet = new Set<string>();
  
          const filteredOptions: Array<{ value: string; text: string }> = data.data
            .filter((item: any) => item.jobRole.toLowerCase().includes(value.toLowerCase()))
            .map((item: any) => {
              const key = item.jobRole.toLowerCase();
  
              if (!uniqueValuesSet.has(key)) {
                uniqueValuesSet.add(key); 
                return {
                  value: item.jobRole,
                  text: `${item.jobRole}`
                };
              }
              return null; 
            })
            .filter((item: any) => item !== null); 
  
          this.listOfOption = filteredOptions;
          console.log(this.listOfOption);
        } else {
          console.error('Invalid response format:', data);
        }
      },
      (error) => {
        console.error('Error during restaurant job search:', error);
      }
    );
  }

  handleSignIn() {
    this.router.navigate(['']);
  }

  handleSignUp() {
    this.router.navigate(['/signup']);
  }

  onJobTypeChange(): void {
    if (this.selectedJobType === 'A') {
      this.apiClientService.getAllPartTimeJob().subscribe(
        (data: any) => {
          console.log('API Response:', data);
          this.apiData = data.data;
          this.cards = [];
          this.apiData.forEach((apiDataItem, index) => {
            const newCard = {
              jobId: apiDataItem.id || -1,
              jobNature: apiDataItem.jobNature || '',
              skillTags: apiDataItem.skillTags || [],
              restaurantId: apiDataItem.restaurantId || -1,
              role: apiDataItem.jobRole || 'Default Role',
              salary: apiDataItem.hourlyRate || 'Default Salary',
              description: apiDataItem.jobDescription || 'Default Description',
              showDetails: false,
            };
  
            console.log(`New Card ${index + 1}:`, newCard);
  
            if (this.cards.length > 0) {
              this.selectCard(this.cards[0]);
            }
  
            this.cards.push(newCard);
  
            if (this.selectedCard && this.selectedCard === apiDataItem) {
              this.selectCard(newCard);
            }
          })
        },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
    } else if (this.selectedJobType === 'B') {
      this.apiClientService.getAllFullTimeJob().subscribe(
        (data: any) => {
          console.log('API Response:', data);
          this.apiData = data.data;
          this.cards = [];
          this.apiData.forEach((apiDataItem, index) => {
            const newCard = {
              jobId: apiDataItem.id || -1,
              jobNature: apiDataItem.jobNature || '',
              skillTags: apiDataItem.skillTags || [],
              restaurantId: apiDataItem.restaurantId || -1,
              role: apiDataItem.jobRole || 'Default Role',
              salary: apiDataItem.hourlyRate || 'Default Salary',
              description: apiDataItem.jobDescription || 'Default Description',
              showDetails: false,
            };
  
            console.log(`New Card ${index + 1}:`, newCard);
  
            if (index === 0) {
              // Select the first card by default
              this.selectCard(newCard);
            }
  
            this.cards.push(newCard);
  
            if (this.selectedCard && this.selectedCard === apiDataItem) {
              this.selectCard(newCard);
            }
          })
        },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
    } else if (this.selectedJobType === 'C') {
      this.apiClientService.getAllJobForRestaurant().subscribe(
        (data: any) => {
          console.log('API Response:', data);
          this.apiData = data.data;
          this.cards = [];
          this.apiData.forEach((apiDataItem, index) => {
            const newCard = {
              jobId: apiDataItem.id || -1,
              jobNature: apiDataItem.jobNature || '',
              skillTags: apiDataItem.skillTags || [],
              restaurantId: apiDataItem.restaurantId || -1,
              role: apiDataItem.jobRole || 'Default Role',
              salary: apiDataItem.hourlyRate || 'Default Salary',
              description: apiDataItem.jobDescription || 'Default Description',
              showDetails: false,
            };
  
            console.log(`New Card ${index + 1}:`, newCard);
  
            if (this.cards.length > 0) {
              this.selectCard(this.cards[0]);
            }
  
            this.cards.push(newCard);
  
            if (this.selectedCard && this.selectedCard === apiDataItem) {
              this.selectCard(newCard);
            }
          })
        },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
    }
  }
  
}
