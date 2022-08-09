import { Component, Input, OnInit } from '@angular/core';

import {
  NbComponentStatus,
  NbDialogRef,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import { Apollo } from 'apollo-angular';
import { DELETE_EVENT_CATEGORY, Get_getAllEventCategory } from '../../../service/event.service';
import { TranslateService } from '../../../service/translate.service';


@Component({
  selector: 'app-dialog-del',
  templateUrl: './dialog-del.component.html',
  styleUrls: ['./dialog-del.component.scss'],
})
export class DialogDelComponent implements OnInit {
  public id: any;
  event_category: any[] = [];
  @Input() event_id = '';

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;

  constructor(
    private apollo: Apollo,
    protected dialogRef: NbDialogRef<DialogDelComponent>,
    private toastrService: NbToastrService,
    private translateService: TranslateService
  ) {}

  cancel() {
    this.dialogRef.close();
  }

  deleteEventCategory() {
    this.apollo
      .mutate({
        mutation: DELETE_EVENT_CATEGORY,
        variables: {
          ID: this.event_id,
        },
      })
      .subscribe((res: any) => {
        console.log('Delete By ID: ', this.event_id);
        this.loadData();
        this.cancel();
      });
  }

  showToast(position: NbGlobalPosition, status: NbComponentStatus) {
    this.toastrService.show('', this.translateService.translate("biz.eventcategory.confirm.success"), {
      position,
      status,
    });
  }

  ngOnInit(): void {}
  loadData() {
    this.apollo
      .watchQuery({
        query: Get_getAllEventCategory,
        fetchPolicy: 'network-only',
      })
      .valueChanges.subscribe((res: any) => {
        this.event_category = res?.data?.getAllEventCategory;
      });
  }
}
