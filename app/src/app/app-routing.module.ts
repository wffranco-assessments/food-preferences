import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './pages/suggestions/suggestions.component';

const routes: Routes = [
  { path: '', component: SuggestionsComponent },
  {
    path: 'meals',
    loadChildren: () =>
      import('./pages/meals/meals.module').then((m) => m.MealsModule),
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('./pages/tags/tags.module').then((m) => m.TagsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
