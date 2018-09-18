import { Component, Input } from '@angular/core';

@Component({
  selector: `storybook-base-button`,
  template: `
    <button>{{label}}</button>
  `,
})
export class ButtonComponent {
  @Input()
  label: string;
}