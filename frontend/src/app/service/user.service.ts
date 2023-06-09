import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../data/api-response';
import { Page } from '../data/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly serverUrl: string = 'http://localhost:8085';

  constructor(private http: HttpClient) { }

  //Make call to the backend API to retrieve page of users
  users$ = (name: string = '', page: number = 0, size: number = 10): Observable<ApiResponse<Page>> =>
    this.http.get<ApiResponse<Page>>(`${this.serverUrl}/users?name=${name}&page=${page}&size=${size}`);


  // getUsers(name: string = '', page: number = 0, size: number = 10): Observable<any> {
  //   return this.http.get<ApiResponse<Page>>(`${this.serverUrl}/users?name=${name}&page=${page}&size=${size}`);
  // }
}
