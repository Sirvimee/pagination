import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from './data/api-response';
import { Page } from './data/page';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userState$: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse }>;
  reponseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userState$ = this.userService.users$().pipe(
      map((response: ApiResponse<Page>) => {
        this.reponseSubject.next(response);
        this.currentPageSubject.next(response.dataInfo.page.number);
        return { appState: 'APP_LOADED', appData: response };
      }),
      startWith({ appState: 'APP_LOADING' }),
      catchError((error: HttpErrorResponse) => of({ appState: 'APP_ERROR', error }))
    )
  }

  goToPage(name?: string, pageNumber: number = 0): void {
    this.userState$ = this.userService.users$(name, pageNumber).pipe(
      map((response: ApiResponse<Page>) => {
        this.reponseSubject.next(response);
        this.currentPageSubject.next(response.dataInfo.page.number);
        return { appState: 'APP_LOADED', appData: response };
      }),
      startWith({ appState: 'APP_LOADED', appData: this.reponseSubject.value }),
      catchError((error: HttpErrorResponse) => of({ appState: 'APP_ERROR', error }))
    )
  }

  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.goToPage(name, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

}
