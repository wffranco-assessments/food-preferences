import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() items: Item[] = [];
  @Input() rows: Entries = [];
  @Input() title = '';

  @Output() deleteChange = new EventEmitter<number>();

  constructor(private datePipe: DatePipe) {}

  get headers() {
    if (this.rows instanceof Array) {
      if (this.rows.length) {
        return this.rows.map((item) => (item instanceof Array ? item : [item]));
      }
    } else if (this.rows instanceof Object) {
      return Object.entries(this.rows);
    }
    return Object.keys(this.items[0] || {}).map((key) => [key]);
  }

  capitalize(text: string) {
    return text
      .replace(/([a-z])(?=[A-Z])/g, '$1 ')
      .replace(/[\W_]+/g, ' ')
      .toLowerCase()
      .replace(/\b([a-z])/g, (_, l: string) => l.toUpperCase());
  }

  format(value: any) {
    if (value instanceof Array) return value.join(', ');
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
      ? this.datePipe.transform(value, 'short')
      : value;
  }

  edit(id: number) {
    return `./${id}/edit`;
  }

  delete(id: number) {
    if (confirm('Are you sure you want to remove this item?')) {
      this.deleteChange.emit(id);
    }
  }
}

type Entries = string[] | string[][] | { [k: string]: string };

interface Item {
  [k: string]: any;
}
