import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: '[id][label].form-group',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnChanges {
  @Input() id = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() type = 'text';
  @Input('ngModelOptions') options: any;
  @Input('ngModel') model: any;
  @Output('ngModelChange') update = new EventEmitter<any>();

  input = '';

  ngOnInit() {
    this.input = this.model;
  }
  ngOnChanges(): void {
    this.update.emit(this.input);
  }
}
