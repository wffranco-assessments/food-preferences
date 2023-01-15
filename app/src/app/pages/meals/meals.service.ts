import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/HttpService';
import { Meal } from './meals.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MealsService extends CrudService<Meal> {
  override uri = 'meals';
}
