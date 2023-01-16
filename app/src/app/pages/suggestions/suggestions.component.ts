import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent {
  _input = '';
  get input() {
    return this._input;
  }
  set input(value: string) {
    this._input = value;
  }

  submit() {
    console.log(this.input);
  }
}
