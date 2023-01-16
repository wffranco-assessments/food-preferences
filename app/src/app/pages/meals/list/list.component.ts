import { Component } from '@angular/core';
import { Meal } from '../meals.interfaces';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-list-meals',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(private mealsService: MealsService) {}

  meals: Meal[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.mealsService.getMany().subscribe((meals) => {
      this.meals = meals;
    });
  }

  delete(id: number) {
    this.mealsService.delete(id).subscribe(() => {
      this.load();
    });
  }
}
