import { Component, Input } from '@angular/core';

@Component({
  selector: `storybook-base-button`,
  template: `
    <button (click)="onClick">{{label}}</button>
  `,
})
export class ButtonComponent {
  @Input()
  label: string;
  click: Function;
  onClick(){
    console.log(this)
  }
}