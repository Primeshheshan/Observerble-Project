import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { interval, Subscription, Observer } from 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
numberObsSubcription: Subscription;
customobsSubcription: Subscription;
  constructor() { }

  ngOnInit() {
    const myNumber = interval(1000)
      .map(
        (data: number) => {
          return data * 2;
        }
      );
    this.numberObsSubcription = myNumber.subscribe(
      (num: number) => {
        console.log(num);
      }
    );

    const myObserverble = Observable
    .create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('first pacage');
        }, 2000);
        setTimeout(() => {
          observer.next('second pacage');
        }, 4000);
        setTimeout(() => {
          // observer.error('this does not work!');
          observer.complete();
        }, 5000);
        // setTimeout(() => {
        //   observer.error('this does not work!');
        // }, 6000);
      }
    );

    this.customobsSubcription = myObserverble.subscribe(
      (data: string) => {console.log(data); },
      (error: string) => {console.log(error); },
      () => {console.log('completed!'); },

    );
  }

  ngOnDestroy() {
    this.numberObsSubcription.unsubscribe();
    this.customobsSubcription.unsubscribe();
  }

}
