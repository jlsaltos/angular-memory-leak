import { Component } from '@angular/core';

@Component({
  selector: 'parent-leaked',
  template: `
    <h2 class="mb-5">Memory Leaked - Random</h2>
    <button class="btn btn-danger" (click)="triggerList()">Trigger</button>
    <child-random-leaked *ngIf="shouldShowList"></child-random-leaked>
  `,
})
export class ParentRandomMemoryLeakedComponent {
  shouldShowList = false;

  triggerList() {
    this.shouldShowList = !this.shouldShowList;
  }
}
