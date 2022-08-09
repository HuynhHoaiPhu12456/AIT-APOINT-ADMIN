import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFilter } from 'ng2-smart-table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-date-filter-component',
  template: `
  <input nbInput style="background-color: #fff; color: black" fullWidth placeholder="{{column.title}}" [formControl]="inputControl" [nbDatepicker]="rangepicker">
  <nb-rangepicker #rangepicker></nb-rangepicker>
  `,
  styleUrls: ['./date-filter-component.component.scss']
})
export class DateFilterComponent extends DefaultFilter implements OnInit, OnChanges {
  inputControl = new FormControl();

  constructor() { super(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query']) {
      this.query = changes['query'].currentValue;
      this.inputControl.setValue(this.inputControl.value);
    }
  }

  ngOnInit(): void {
    this.inputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(this.delay),
      )
      .subscribe((value: string) => {
        if(this.inputControl.status === 'VALID')
        {
          this.query = value !== null ? JSON.stringify(this.inputControl.value) : "";
          this.setFilter();
        }
      });
  }

}
