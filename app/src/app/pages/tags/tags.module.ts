import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagsRoutingModule } from './tags-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent],
  imports: [SharedModule, TagsRoutingModule],
})
export class TagsModule {}
