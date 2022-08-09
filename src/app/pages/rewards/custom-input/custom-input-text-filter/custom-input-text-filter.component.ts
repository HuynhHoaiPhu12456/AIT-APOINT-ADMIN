import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFilter } from 'ng2-smart-table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-custom-input-text-filter',
  template: `
    <input
      style="background-color: #fff; color: black"
      nbInput
      fullWidth
      fieldSize="large"
      [ngClass]="inputClass"
      [formControl]="inputControl"
      class="form-control"
      type="text"
      placeholder="{{ column.filter.config?.placeholder || column.title }}"
    />
  `,
  styleUrls: ['./custom-input-text-filter.component.scss']
})
export class CustomInputTextFilterComponent extends DefaultFilter implements OnInit, OnChanges {
  inputControl = new FormControl();

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.query) {
      this.inputControl.setValue(this.query);
    }
    this.inputControl.valueChanges.pipe(distinctUntilChanged(), debounceTime(this.delay)).subscribe((value: string) => {
      this.query = this.inputControl.value;
      this.setFilter();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['query']) {
      this.inputControl.setValue(this.query);
    }
  }
}
