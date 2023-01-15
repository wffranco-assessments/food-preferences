import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Meal } from '../meals.interfaces';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(private mealsService: MealsService) {}

  meals: Meal[] = [];

  ngOnInit(): void {
    this.mealsService
      .getMany()
      .pipe(
        tap((meals) => {
          this.meals = meals;
        }),
      )
      .subscribe();
  }

  delete(id: number) {
    console.log({ id });
    // this.mealsService.delete(id);
    // alert(`delete ${id} meal`);
  }
}
