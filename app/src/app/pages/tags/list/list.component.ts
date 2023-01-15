import { Component } from '@angular/core';
import { Tag } from '../tags.interfaces';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(private tagsService: TagsService) {}

  tags: Tag[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.tagsService.getMany().subscribe((tags) => {
      this.tags = tags;
    });
  }

  delete(id: number) {
    this.tagsService.delete(id).subscribe(() => {
      this.load();
    });
  }
}
