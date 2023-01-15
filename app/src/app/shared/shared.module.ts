import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [TableComponent, InputComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [DatePipe],
  exports: [CommonModule, FormsModule, InputComponent, TableComponent],
})
export class SharedModule {}
