// action-cell.component.ts
import { Component } from '@angular/core';
import type { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-cell',
  template: `
    <i class="bi bi-box-arrow-up-right"
       [title]="params?.data?.openRequest || 'Open Request'"
       style="cursor:pointer; font-size:18px"
       (click)="onClick($event)"
       (mouseenter)="hover(true, $event)"
       (mouseleave)="hover(false, $event)">
    </i>
  `,
})
export class ActionCellComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: any): void { this.params = params; }
  refresh(): boolean { return false; }

  onClick(e: MouseEvent) {
    e.stopPropagation(); // prevent row selection
    this.params.context?.openModal(this.params.data);
  }

  hover(on: boolean, e: MouseEvent) {
    (e.target as HTMLElement).style.color = on ? '#0d6efd' : '';
  }
}