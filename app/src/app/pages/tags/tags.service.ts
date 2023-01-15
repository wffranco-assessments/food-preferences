import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/HttpService';
import { Tag } from './tags.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TagsService extends CrudService<Tag> {
  override uri = 'tags';

  getLangs(): string[][] {
    return [
      ['en', 'English'],
      ['es', 'Español'],
    ];
  }
}
