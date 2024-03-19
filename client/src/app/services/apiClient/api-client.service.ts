import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  // private apiUrl = 'http://localhost:4000';
  // private apiUrl = 'https://hr-server-icl9.onrender.com';
  private apiUrl = 'https://bento-hr.fly.dev'; 
  private tokenKey = 'token';
  private updateSubject = new Subject<any>();

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/applicant/signup`, userData)
  }

  createEmployee(userData:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/employee/create`, userData);
  }

  updateEmployee(userData: any, employeeId:number): Observable<any>{
    return this.http.put(`${this.apiUrl}/employee/update/${employeeId}`, userData)
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee/restaurant`);
  }

  postPosition( userData:any): Observable<any>{
    const url = `${this.apiUrl}/position/new`
    return this.http.post(url, userData);
  }

  postJob(userData:any): Observable<any> {
    const url = `${this.apiUrl}/job/new`
    return this.http.post(url,userData)
  }

  postSchedule(userData:any): Observable<any> {
    const url = `${this.apiUrl}/schedule/restaurant`
    return this.http.post(url,userData)
  }

  getAllScheduleForRestaurant(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schedule/restaurant`)
  }

  // getAllScheduleOfEmployee(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/schedule/2/restaurant/1`)
  // }

  getAllJobForRestaurant(): Observable<any> {
    // return this.http.get(`${this.apiUrl}/job/1`)
    const url = `${this.apiUrl}/job/restaurant`
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching applied applicant:', error);
        throw error;
      }),
      tap((data) => {
        this.updateSubject.next(data);
      })
    );
  }

  getAllJob(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/all`)
  }
  
  getAllFullTimeJob(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/allFullTime`)
  }
  
  getAllPartTimeJob(): Observable<any> {
    return this.http.get(`${this.apiUrl}/job/allPartTime`)
  }

  searchJob(searchTerm: string): Observable<any> {
    console.log(searchTerm);
    return this.http.get(`${this.apiUrl}/job/search/jobs`, { params: {searchTerm: searchTerm}});
  }

  postPayroll(userData:any): Observable<any> {
    const url = `${this.apiUrl}/payroll/new`
    return this.http.post(url,userData)
  }

  getPayroll(employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payroll/${employeeId}`)
  }

  loginUser(loginData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/applicant/login`, loginData)
  }

  deleteApplicant(applicantId: number) {
    const url = `${this.apiUrl}/applicant/${applicantId}`
    return this.http.delete<void>(url);
  }

  getRegisterData(applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/applicant/loginData/${applicantId}`
    return this.http.get(url);
  }
  
  getApplicantData(applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/applicant/${applicantId}`
    return this.http.get(url);
  }

  applyJob(selectedJobId:number, selectedRestaurantId: number, applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/jobApplicant/applyJob/${applicantId}`
    const requestData = {
      jobId: selectedJobId,
      restaurantId: selectedRestaurantId
    };
    return this.http.post(url,requestData)
  }

  getAppliedApplicant(): Observable<any> {
    const url = `${this.apiUrl}/jobApplicant/applicantTracking`
    // return this.http.get(url);
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching applied applicant:', error);
        throw error;
      }),
      tap((data) => {
        this.updateSubject.next(data);
      })
    );
  }
  
  getAppliedApplications(applicantId:number): Observable<any> {
    const url = `${this.apiUrl}/jobApplicant/applicationTracking/${applicantId}`
    return this.http.get(url);
    // return this.http.get(url).pipe(
    //   catchError((error) => {
    //     console.error('Error fetching applied applications:', error);
    //     throw error;
    //   }),
    //   tap((data) => {
    //     this.updateSubject.next(data);
    //   })
    // );
  }

  postApplicantToEmployee(applicantData:any, applicantId: number): Observable<any> {
    const url = `${this.apiUrl}/employee/restaurant/${applicantId}`
    const requestData = {
      name: applicantData.name,
      email: applicantData.email,
      experience: applicantData.experience,
      phoneNumber: applicantData.phoneNumber,
      skillTags: applicantData.skillTags,
      address: applicantData.address,
      hourlyRate: applicantData.hourlyRate,
      imageUrl: applicantData.imageUrl
    }
    return this.http.post(url,requestData)
  }

  updateApplicantData(applicantId: number, mergedData: any): Observable<any> {
    const url = `${this.apiUrl}/applicant/${applicantId}`
    return this.http.put(url, mergedData);
  }

  authenticate(code: string) {
    const url = `${this.apiUrl}/auth/token/${code}`;
    return this.http.get(url)
  }

  updateJobApplicantData(jobApplicantId: number, mergedData: any): Observable<any> {
    const url = `${this.apiUrl}/jobApplicant/${jobApplicantId}`;
    return this.http.put(url, mergedData);
  }

  getUpdateObservable(): Observable<void> {
    return this.updateSubject.asObservable();
  }

  // triggerUpdate() {
  //   this.updateSubject.next();
  // }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
