import { Component, Input } from '@angular/core';
import { Meal } from '../meals/meals.interfaces';
import { MealsService } from '../meals/meals.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent {
  @Input() delay = 800;
  meals: Meal[] = [];

  private _timer?: ReturnType<typeof setTimeout>;
  private _input = '';
  get input() {
    return this._input;
  }
  set input(value: string) {
    clearTimeout(this._timer);
    this._input = value;
    if (value.trim().length > 2) {
      this._timer = setTimeout(() => {
        this.submit();
      }, this.delay);
    } else {
      this.meals = [];
    }
  }

  constructor(private mealsService: MealsService) {}

  submit() {
    const query = this.input.replace(/\s+/g, ',');
    console.log({ query });
    this.mealsService.find(query).subscribe((meals) => {
      this.meals = meals;
    });
  }
}
