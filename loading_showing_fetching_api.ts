app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './app.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  subscriptionUsers: [] = [];
  isLoading: boolean = true;

  constructor(private authService: AuthService) {
    this.getUsersWithSubscription();
  }

  getUsersWithSubscription() {
    this.isLoading = true; // Show loader
    this.authService.getUsersForSubscription().subscribe(
      (res) => {
        this.subscriptionUsers = res;
        console.log(
          'getUsersWithSubscription(): ' +
            JSON.stringify(this.subscriptionUsers)
        );
        this.isLoading = false; // Hide loader once data is fetched
      },
      (error) => {
        console.error('Error fetching subscription users:', error);
        this.isLoading = false; // Hide loader in case of error
      }
    );
  }
}

app.component.html
<div *ngIf="isLoading">Loading...</div>

<div *ngIf="!isLoading">
  <div *ngFor="let item of subscriptionUsers">
    {{ item.title }}
  </div>
</div>


app.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { delay, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {}

  getUsersForSubscription(): Observable<any> {
    return timer(2000).pipe(
      switchMap(() =>
        this._http
          .get('https://jsonplaceholder.typicode.com/posts')
          .pipe(delay(4000))
      )
    );
  }
}
