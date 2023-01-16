import { NgModule } from '@angular/core';

import { MealsRoutingModule } from './meals-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [CreateComponent, EditComponent, ListComponent],
  imports: [MealsRoutingModule, SharedModule],
})
export class MealsModule {}
