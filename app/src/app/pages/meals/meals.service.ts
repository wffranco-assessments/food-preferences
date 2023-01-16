import { Injectable } from '@angular/core';
import { CrudService, Options } from 'src/app/shared/HttpService';
import { Meal } from './meals.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MealsService extends CrudService<Meal> {
  override uri = 'meals';

  find(query: string, options?: Options) {
    return this.http.get<Meal[]>(`find/${query}`, options);
  }
}

export function mergeTags(input: Meal, value: string) {
  if (!/\s$/.test(value)) {
    return value.trim();
  } else {
    const tags = value.trim();
    if (tags) {
      let merged = input.tags;
      tags.split(/\s+/).forEach((tag) => {
        if (!merged.find((t) => t === tag)) {
          if (merged === input.tags) merged = input.tags.slice();
          merged.push(tag);
        }
      });
      input.tags = merged;
    }
    return '';
  }
}
