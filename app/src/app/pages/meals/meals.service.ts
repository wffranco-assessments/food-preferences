import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/HttpService';
import { Meal } from './meals.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MealsService extends HttpService<Meal> {
  override uri = 'meals';
}
