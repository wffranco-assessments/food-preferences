import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { TagsService } from '../../tags/tags.service';
import { Meal } from '../meals.interfaces';
import { MealsService, mergeTags } from '../meals.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  input: Meal = {
    name: '',
    slug: '',
    tags: [],
  };
  loading = false;

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
    this.loading = true;
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.mealsService.get(parseInt(id)).subscribe({
            next: (meal) => {
              this.input = meal;
            },
            complete: () => {
              this.loading = false;
            },
          });
        }
      },
      error: () => {
        this.loading = false;
      },
    });
    this.tagsService.getMany().subscribe((tags) => {
      this._suggestions = tags.map((tag) => tag.name);
    });
  }

  backToList() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

  deleteTag(tag: string) {
    this.input.tags = this.input.tags.filter((t) => t !== tag);
    this.tagField.focus();
  }

  updateTags() {
    this.tag = this.tag + ' ';
  }

  async submit(id: number) {
    this.updateTags();
    this.loading = true;
    forkJoin([
      ...this.input.tags
        .filter((t) => !this._suggestions.includes(t))
        .map((name) => this.tagsService.post({ name, lang: '' })),
      this.mealsService.put(id, this.input),
    ]).subscribe({
      complete: () => {
        this.loading = false;
        this.backToList();
      },
    });
  }
}
