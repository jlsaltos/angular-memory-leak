import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, Subscription, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'child-random-leaked',
  template: ` <ul>
    <li *ngFor="let data of datas">Random value : {{ sumAll(data) }}</li>
  </ul>`,
})
export class ChildRandomMemoryLeakedComponent implements OnInit, OnDestroy {
  componentId: number;

  shouldShowList = false;

  private _updateData = new Subject<number[]>();
  updateData$ = this._updateData.asObservable();

  datas: number[][] = [];

  unsubscribe = new Subject();

  ngOnInit() {
    this.componentId = new Date().getTime();

    this.updateData$.subscribe((newVal) => {
      this.datas.push(newVal);
    });
    this.triggerList();
  }

  triggerList() {
    this.shouldShowList = !this.shouldShowList;

    if (this.shouldShowList) {
      this.datas = [];
      this.createList();
    }
  }

  createList() {
    interval(500).subscribe(() => {
      let newArr = [];

      for (let i = 0; i < 10000; i++) {
        const valueRandom = Math.random();
        console.log(
          `Interval ${this.componentId} -randomValu= ${valueRandom} `
        );
        newArr.push(valueRandom);
      }

      this._updateData.next(newArr);
    });
  }

  sumAll(dataList: number[]) {
    return dataList.reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
  }

  ngOnDestroy() {
    console.log(`OnDestroy-ComponentID ${this.componentId}`);
  }
}
