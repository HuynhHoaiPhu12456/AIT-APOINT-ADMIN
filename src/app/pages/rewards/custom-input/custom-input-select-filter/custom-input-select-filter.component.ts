import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFilter } from 'ng2-smart-table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-custom-input-select-filter',
  template: `
  <nb-select  size='small' placeholder="{{ column.filter.config?.selectText || column.title }}" fullWidth [formControl]="inputControl" >
  <nb-option style="background-color: #fff; color: black" class="input" *ngFor="let item of column.filter.config.list" [value]="item.value">
      {{item.title}}
    </nb-option>
  </nb-select>
`,
  styleUrls: ['./custom-input-select-filter.component.scss']
})
export class CustomInputSelectFilterComponent extends DefaultFilter implements OnInit, OnChanges {

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
