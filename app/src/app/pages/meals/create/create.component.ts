import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from '../meals.interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  input: Meal = {
    name: '',
    slug: '',
    tags: [],
  };

  submit(form: NgForm) {
    console.log(form.value);
  }
}
