import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../tags.interfaces';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  langs?: string[][];
  loading = false;
  tag: Tag = {
    name: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tagsService: TagsService,
  ) {}

  ngOnInit(): void {
    this.langs = this.tagsService.getLangs();
    this.loading = true;
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.tagsService.get(parseInt(id)).subscribe((tag) => {
          this.tag = tag;
        });
      }
    });
  }

  backToList() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

  submit(id?: number) {
    if (id) {
      this.tagsService.put(id, this.tag).subscribe((res) => {
        console.log({ res });
        this.backToList();
      });
    }
  }
}
