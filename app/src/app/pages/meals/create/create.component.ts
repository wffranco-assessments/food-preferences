import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TagsService } from '../../tags/tags.service';
import { Meal } from '../meals.interfaces';
import { MealsService, mergeTags } from '../meals.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  input: Meal = {
    name: '',
    slug: '',
    tags: [],
  };
  submiting = false;

  private _suggestions: string[] = [];
  get suggestions() {
    return this._suggestions.filter((tag) => !this.input.tags.includes(tag));
  }

  private _tag = '';
  get tag() {
    return this._tag;
  }
  set tag(value: string) {
    this._tag = mergeTags(this.input, value);
  }

  get tagField() {
    return document.querySelector('input#tag') as HTMLInputElement;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealsService: MealsService,
    private tagsService: TagsService,
  ) {}

  ngOnInit(): void {
    this.tagsService.getMany().subscribe((tags) => {
      this._suggestions = tags.map((tag) => tag.name);
    });
  }

  backToList() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  deleteTag(tag: string) {
    this.input.tags = this.input.tags.filter((t) => t !== tag);
    this.tagField.focus();
  }

  updateTags() {
    this.tag = this.tag + ' ';
  }

  async submit() {
    this.updateTags();
    this.mealsService.post(this.input).subscribe(() => {
      const insertTags = this.input.tags
        .filter((t) => !this._suggestions.includes(t))
        .map((name) => this.tagsService.post({ name, lang: '' }));
      forkJoin(insertTags).subscribe({
        complete: () => this.backToList(),
      });
    });
  }
}
