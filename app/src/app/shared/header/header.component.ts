import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menu = {
    left: [
      { title: 'Sugestions', link: '/' },
      { title: 'Meals', link: '/meals' },
      { title: 'Tags', link: '/tags' },
    ],
  };
}
