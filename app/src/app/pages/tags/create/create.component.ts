import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  langs: string[][] = [
    ['en', 'English'],
    ['es', 'Español'],
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tagsService: TagsService,
  ) {}

  backToList() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  submit(form: NgForm) {
    console.log(form.value);
    this.tagsService.post(form.value).subscribe((res) => {
      console.log({ res });
      this.backToList();
    });
  }
}
