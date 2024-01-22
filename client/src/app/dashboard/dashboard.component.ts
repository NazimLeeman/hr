import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  apiData: any[] = [];
  jobs: any[] = [];
  radioValue = 'C';
  selectedJobType: string = 'C';
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = (): boolean => true;
  filteredJobs: any[] = [];
  searchTerm = '';
  value = '';
  value1 = 1;
  value2 = 0;
  skillData: any[] = [];
  listOfSkillOption: Array<{ value: string, text: string}> = [];
  selectedSkillValue = null;
  filteredDataJobType: any[] = [];
  filteredDataJobRole: any[] = [];
  filteredDataSkills: any[] = [];

  cards: any[] = [];


  applicantId: number = 0;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private apiClientService: ApiClientService, private modal: NzModalService) {}
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
    
    this.anotherOnInit();
    this.paramOnInit();
    // this.getApplicantData();
    // this.selectCard(this.cards[0]);
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
  
            // console.log(`New Card ${index + 1}:`, newCard);
  
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
          console.log(this.selectedValue);
        } else {
          console.error('Invalid response format:', data);
        }
      },
      (error) => {
        console.error('Error during restaurant job search:', error);
      }
    );
  }

  onOptionSelected(newValue: string): void {
    console.log('Selected value:', newValue);
    if(this.filteredDataJobType.length > 0 || this.filteredDataSkills.length > 0) {
      let mergedData = Array.from(new Set([...this.filteredDataJobType, ... this.filteredDataSkills]));
      console.log('mergeData:',mergedData)
      this.filteredDataJobRole = mergedData.filter((apiDataItem:any) => {
        return apiDataItem.jobRole.toLowerCase().includes(newValue.toLowerCase());  
      })
    } else {
      this.filteredDataJobRole = this.apiData.filter((apiDataItem: any) => {
        return apiDataItem.jobRole.toLowerCase().includes(newValue.toLowerCase());
      });
    }
    console.log('Filtered Data:', this.filteredDataJobRole);
            if(!this.filteredDataJobRole.length) {
              this.error();
            }
              this.cards = [];
              this.filteredDataJobRole.forEach((apiDataItem, index) => {
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
                
      
                this.cards.push(newCard);
      
                if (this.selectedCard && this.selectedCard === apiDataItem) {
                  this.selectCard(newCard);
                }
              })
              if (this.cards.length > 0) {
                this.selectCard(this.cards[0]);
              }
  }

  // onJobTypeChange(): void {
  //   if (this.selectedJobType === 'A') {
  //     this.apiClientService.getAllPartTimeJob().subscribe(
  //       (data: any) => {
  //         console.log('API Response:', data);
  //         this.apiData = data.data;
  //         this.cards = [];
  //         this.apiData.forEach((apiDataItem, index) => {
  //           const newCard = {
  //             jobId: apiDataItem.id || -1,
  //             jobNature: apiDataItem.jobNature || '',
  //             skillTags: apiDataItem.skillTags || [],
  //             restaurantId: apiDataItem.restaurantId || -1,
  //             role: apiDataItem.jobRole || 'Default Role',
  //             salary: apiDataItem.hourlyRate || 'Default Salary',
  //             description: apiDataItem.jobDescription || 'Default Description',
  //             showDetails: false,
  //           };
  
  
  //           if (this.cards.length > 0) {
  //             this.selectCard(this.cards[0]);
  //           }
  
  //           this.cards.push(newCard);
  
  //           if (this.selectedCard && this.selectedCard === apiDataItem) {
  //             this.selectCard(newCard);
  //           }
  //         })
  //       },
  //     (error) => {
  //       console.error('Error fetching data from the API', error);
  //     }
  //   );
  //   } else if (this.selectedJobType === 'B') {
  //     this.apiClientService.getAllFullTimeJob().subscribe(
  //       (data: any) => {
  //         console.log('API Response:', data);
  //         this.apiData = data.data;
  //         this.cards = [];
  //         this.apiData.forEach((apiDataItem, index) => {
  //           const newCard = {
  //             jobId: apiDataItem.id || -1,
  //             jobNature: apiDataItem.jobNature || '',
  //             skillTags: apiDataItem.skillTags || [],
  //             restaurantId: apiDataItem.restaurantId || -1,
  //             role: apiDataItem.jobRole || 'Default Role',
  //             salary: apiDataItem.hourlyRate || 'Default Salary',
  //             description: apiDataItem.jobDescription || 'Default Description',
  //             showDetails: false,
  //           };
  
  
  //           if (index === 0) {
  //             this.selectCard(newCard);
  //           }
  
  //           this.cards.push(newCard);
  
  //           if (this.selectedCard && this.selectedCard === apiDataItem) {
  //             this.selectCard(newCard);
  //           }
  //         })
  //       },
  //     (error) => {
  //       console.error('Error fetching data from the API', error);
  //     }
  //   );
  //   } else if (this.selectedJobType === 'C') {
  //     this.apiClientService.getAllJobForRestaurant().subscribe(
  //       (data: any) => {
  //         console.log('API Response:', data);
  //         this.apiData = data.data;
  //         this.cards = [];
  //         this.apiData.forEach((apiDataItem, index) => {
  //           const newCard = {
  //             jobId: apiDataItem.id || -1,
  //             jobNature: apiDataItem.jobNature || '',
  //             skillTags: apiDataItem.skillTags || [],
  //             restaurantId: apiDataItem.restaurantId || -1,
  //             role: apiDataItem.jobRole || 'Default Role',
  //             salary: apiDataItem.hourlyRate || 'Default Salary',
  //             description: apiDataItem.jobDescription || 'Default Description',
  //             showDetails: false,
  //           };
  
  //           console.log(`New Card ${index + 1}:`, newCard);
  
  //           if (this.cards.length > 0) {
  //             this.selectCard(this.cards[0]);
  //           }
  
  //           this.cards.push(newCard);
  
  //           if (this.selectedCard && this.selectedCard === apiDataItem) {
  //             this.selectCard(newCard);
  //           }
  //         })
  //       },
  //     (error) => {
  //       console.error('Error fetching data from the API', error);
  //     }
  //   );
  //   }
  // }

  onJobTypeChange(): void {
    if(this.filteredDataJobRole.length > 0 || this.filteredDataSkills.length > 0) {
      let mergedData = Array.from(new Set([...this.filteredDataJobRole,...this.filteredDataSkills]));
      if(this.selectedJobType === 'C') {
        this.filteredDataJobType = mergedData.filter((apiDataItem: any) => {
          return apiDataItem.jobNature === 'Part-Time' || apiDataItem.jobNature === 'Full-Time';
        });
      }
      else
      {
        this.filteredDataJobType = mergedData.filter((apiDataItem: any) => {
          return apiDataItem.jobNature === this.selectedJobType;
        });
      }
        console.log('Filtered Data Job Type:', this.filteredDataJobType)
    } else {
        if(this.selectedJobType === 'C') {
          this.filteredDataJobType = this.apiData.filter((apiDataItem: any) => {
            return apiDataItem.jobNature === 'Part-Time' || apiDataItem.jobNature === 'Full-Time';
          });
        }
        else
        {
          this.filteredDataJobType = this.apiData.filter((apiDataItem: any) => {
            return apiDataItem.jobNature === this.selectedJobType;
          });
        }
          console.log('Filtered Data Job Type:', this.filteredDataJobType)
    }
    console.log('Filtered Data:', this.filteredDataJobRole);
    if(!this.filteredDataJobType.length) {
      this.error();
    }
      this.cards = [];
      this.filteredDataJobType.forEach((apiDataItem, index) => {
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
      this.cards.push(newCard);

      if (this.selectedCard && this.selectedCard === apiDataItem) {
        this.selectCard(newCard);
      }
    });
    if (this.cards.length > 0) {
      this.selectCard(this.cards[0]);
    }
  }
  
  searchSkill(value: string): void {
    this.apiClientService.getAllJobForRestaurant().subscribe(
      (data: any) => {
        if (data) {
          this.listOfSkillOption = data.data
  .flatMap((item: any) => item.skillTags) 
  .filter((tag: string) => tag.toLowerCase().includes(value.toLowerCase())) 
  .map((tag: string) => ({ value: tag, text: tag })); 

this.listOfSkillOption = this.listOfSkillOption.filter(
  (tag, index, self) =>
    index ===
    self.findIndex((t) => t.value.toLowerCase() === tag.value.toLowerCase())
);
          console.log('Skills:', this.listOfSkillOption);
          console.log(this.selectedSkillValue);
        } else {
          console.error('Invalid response format:', data);
        }
      },
      (error) => {
        console.error('Error during skill Tags search:', error);
      }
    );
  }

  // onSkillOptionSelected(newValue: string): void {
  //   console.log('Selected value:', newValue);
  //   this.apiClientService.searchJob(newValue).subscribe(
  //           (data: any) => {
  //             console.log('API Response:', data);
  //             this.apiData = data.data;
  //             this.cards = [];
  //             this.apiData.forEach((apiDataItem, index) => {
  //               const newCard = {
  //                 jobId: apiDataItem.id || -1,
  //                 jobNature: apiDataItem.jobNature || '',
  //                 skillTags: apiDataItem.skillTags || [],
  //                 restaurantId: apiDataItem.restaurantId || -1,
  //                 role: apiDataItem.jobRole || 'Default Role',
  //                 salary: apiDataItem.hourlyRate || 'Default Salary',
  //                 description: apiDataItem.jobDescription || 'Default Description',
  //                 showDetails: false,
  //               };
      
  //               // console.log(`New Card ${index + 1}:`, newCard);
  //               this.cards.push(newCard);
      
  //               if (this.selectedCard && this.selectedCard === apiDataItem) {
  //                 this.selectCard(newCard);
  //               }
  //             })
  //             if (this.cards.length > 0) {
  //               this.selectCard(this.cards[0]);
  //             }
  //           }, (error) => {
  //             console.error('Error fetching data from the API', error);
  //           }
  //         );
  // }
  onSkillOptionSelected(newValue: string): void {
    console.log('Selected value:', newValue);
    if (this.filteredDataJobType.length > 0 || this.filteredDataJobRole.length > 0) {
      let mergedData = Array.from(new Set([...this.filteredDataJobType, ...this.filteredDataJobRole]));
      this.filteredDataSkills = mergedData.filter((apiDataItem: any) =>
        apiDataItem.skillTags.includes(newValue)
      );
    } else {
      this.filteredDataSkills = this.apiData.filter((apiDataItem: any) =>
        apiDataItem.skillTags.includes(newValue)
      );
    }
    console.log('filteredSkills:',this.filteredDataSkills)
    if(!this.filteredDataSkills.length) {
      this.error();
    }
    this.cards = [];
              this.filteredDataSkills.forEach((apiDataItem, index) => {
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
      
                // console.log(`New Card ${index + 1}:`, newCard);
                this.cards.push(newCard);
      
                if (this.selectedCard && this.selectedCard === apiDataItem) {
                  this.selectCard(newCard);
                }
              })
              if (this.cards.length > 0) {
                this.selectCard(this.cards[0]);
              }
  }

  error(): void {
    this.modal.error({
      nzTitle: 'Sorry',
      nzContent: 'No Matches were found....',
      nzOnOk: () => {
        location.reload();
      },
      nzOnCancel: () => {
        location.reload();
      },
    });
  }
  
}


