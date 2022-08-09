import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Apollo, gql } from 'apollo-angular';
import { Get_getAllRewardInventory, Get_getRewardInvenById1, Get_searchRewardInventory } from '../../../service/reward.service';
import { TranslateService } from '../../../service/translate.service';
import { CustomInputSelectFilterComponent } from '../custom-input/custom-input-select-filter/custom-input-select-filter.component';
import { CustomInputTextFilterComponent } from '../custom-input/custom-input-text-filter/custom-input-text-filter.component';
import { InventoryDialogDeleteComponent } from '../inventory-dialog-delete/inventory-dialog-delete.component';



@Component({
  selector: 'app-reward-inventory-search',
  templateUrl: './reward-inventory-search.component.html',
  styleUrls: ['./reward-inventory-search.component.scss']
})
export class RewardInventorySearchComponent implements OnInit {
  reward_inventory: any[] = [];
  reward_id = '';
  isCard: boolean = true;
  isBelowCard: boolean = true;
  constructor(private apollo: Apollo,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private router: Router,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: Get_getAllRewardInventory,
        fetchPolicy: 'network-only'
      })
      .valueChanges.subscribe((res: any) => {

        this.reward_inventory = res?.data?.getAllRewardInventory;
      })
  }

  RemoveRewardInventory(id: string) {

    this.reward_id = id;
    this.apollo
      .mutate({
        mutation: Get_getRewardInvenById1,
        variables: {
          id: id,
        },

      })
      .subscribe((res: any) => {

        this.open();
      });
    console.log(id);
  }

  onCustomEvent = (event: { action: any; data: any; }) => {
    switch (event.action) {
      case 'edit':
        console.log("edit", event.data);
        this.editRewardInventory(event.data._id);
        break;
      case 'delete':
        this.RemoveRewardInventory(event.data._id);
        break;

    }
  }
  editRewardInventory(id: string) {
    this.apollo
      .watchQuery({
        query: Get_getRewardInvenById1,
        variables: {
          id: id,

        },
      })
      .valueChanges.subscribe((res: any) => {
        this.reward_inventory = res.data.getRewardInvenById;
        console.log(res.data.getRewardInvenById);

      });

    this.router.navigate(['/pages/reward/inventory/update', id]);
  }
  open() {
    this.dialogService.open(InventoryDialogDeleteComponent, {
      context:
      {
        reward_id: this.reward_id
      }
    })
  }

  addIventory() {
    this.router.navigate(['/pages/reward/inventory/create', '0']);
  }

  searchForm = this.fb.group({
    name: [''],
    type: [''],
    price: [null],
    total: [null],
    shipping: [null],
    sold: [null],
    is_approve: [null],
    active_flag: [null],
  })

  settings = {
    actions: {
      columnTitle: this.translateService.translate("biz.reward-inventory.read.reward-inventory-list.action"),
      custom: [
        {
          name: 'edit',
          title: `
                        <i class="nb-edit" title="${this.translateService.translate("biz.reward-inventory.read.reward-inventory-list.edit")}"></i>
                    `
        },
        {
          name: 'delete',
          title: `
                        <i class="nb-trash" title="${this.translateService.translate("biz.reward-inventory.read.reward-inventory-list.delete")}"></i>
                    `
        },
      ],
      add: false,
      edit: false,
      delete: true
    },
    columns: {
      name: {
        title: this.translateService.translate("biz.reward-inventory.read.name"),
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: this.translateService.translate("biz.reward-inventory.read.name"),
          }
        }
      },
      type: {
        title: this.translateService.translate("biz.reward-inventory.read.type.type"),
        filter: {
          type: 'custom',
          component: CustomInputSelectFilterComponent,
          config: {
            selectText: this.translateService.translate("biz.reward-inventory.read.type.type"),
            list: [
              { value: '', title: this.translateService.translate("biz.reward-inventory.read.type.none") },
              { value: '01', title: this.translateService.translate("biz.reward-inventory.read.type.others") },
              { value: '02', title: this.translateService.translate("biz.reward-inventory.read.type.point") },
              { value: '03', title: this.translateService.translate("biz.reward-inventory.read.type.voucher/coupon") },
              { value: '04', title: this.translateService.translate("biz.reward-inventory.read.type.course") },
              { value: '05', title: this.translateService.translate("biz.reward-inventory.read.type.ticket") }
            ]
          }
        },
        valuePrepareFunction: (value: any) => {
          if (value === '01') {
            return this.translateService.translate("biz.reward-inventory.read.type.others")
          }
          if (value === '02') {
            return this.translateService.translate("biz.reward-inventory.read.type.point")
          }
          if (value === '03') {
            return this.translateService.translate("biz.reward-inventory.read.type.voucher/coupon")
          }
          if (value === '04') {
            return this.translateService.translate("biz.reward-inventory.read.type.course")
          }
          if (value === '05') {
            return this.translateService.translate("biz.reward-inventory.read.type.ticket")
          }
          else { return }
        }
      },
      price: {
        title: this.translateService.translate("biz.reward-inventory.read.price"),
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: this.translateService.translate("biz.reward-inventory.read.price")
          }
        }
      },
      total: {
        title: this.translateService.translate("biz.reward-inventory.read.total"),
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: this.translateService.translate("biz.reward-inventory.read.total")
          }
        }
      },
      shipping: {
        title: this.translateService.translate("biz.reward-inventory.read.shipping"),
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: this.translateService.translate("biz.reward-inventory.read.shipping")
          }
        }
      },
      sold: {
        title: this.translateService.translate("biz.reward-inventory.read.sold"),
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: {
            placeholder: this.translateService.translate("biz.reward-inventory.read.sold")
          }
        }
      },
      is_approve: {
        title: this.translateService.translate("biz.reward-inventory.read.approve.approve"),
        filter: {
          type: 'custom',
          component: CustomInputSelectFilterComponent,
          config: {
            selectText: 'Select Type',
            list: [
              { value: "", title: this.translateService.translate("biz.reward-inventory.read.approve.none") },
              { value: "true", title: this.translateService.translate("biz.reward-inventory.read.approve.approved") },
              { value: "false", title: this.translateService.translate("biz.reward-inventory.read.approve.not-approved") },
            ]
          }
        },
        valuePrepareFunction: (value: any) => {
          if (value === true) {
            return this.translateService.translate("biz.reward-inventory.read.approve.approved")
          }
          if (value === false) {
            return this.translateService.translate("biz.reward-inventory.read.approve.not-approved")
          }
          else { return }
        }
      },
      active_flag: {
        title: this.translateService.translate("biz.reward-inventory.read.active.active"),
        filter: {
          type: 'custom',
          component: CustomInputSelectFilterComponent,
          config: {
            selectText: 'Select Type',
            list: [
              { value: "", title: this.translateService.translate("biz.reward-inventory.read.active.none") },
              { value: "true", title: this.translateService.translate("biz.reward-inventory.read.active.actived") },
              { value: "false", title: this.translateService.translate("biz.reward-inventory.read.active.not-actived") },
            ]
          }
        },
        valuePrepareFunction: (value: any) => {
          if (value === true) {
            return this.translateService.translate("biz.reward-inventory.read.active.actived")
          }
          if (value === false) {
            return this.translateService.translate("biz.reward-inventory.read.active.not-actived")
          }
          else { return }
        }
      },
    }
  };


  toggleCard() {
    this.isCard = !this.isCard;
  }

  toogleBelowCard() {
    this.isBelowCard = !this.isBelowCard;
  }

  searchRewardInventory() {
    this.apollo
      .watchQuery({
        query: Get_searchRewardInventory,
        variables:
        {
          NAME: this.searchForm.controls["name"].value,
          TYPE: this.searchForm.controls["type"].value,
          PRICE: this.searchForm.controls["price"].value,
          TOTAL: this.searchForm.controls["total"].value,
          SHIPPING: this.searchForm.controls["shipping"].value,
          SOLD: this.searchForm.controls["sold"].value,
          ACTIVE_FLAG: this.searchForm.controls["active_flag"].value,
          IS_APPROVE: this.searchForm.controls["is_approve"].value,
        }
      })
      .valueChanges.subscribe((res: any) => {

        this.reward_inventory = res?.data?.searchRewardInventory;
        console.log("Search By Name: ", this.reward_inventory)
      })
  }

  resetSearchForm() {

    this.searchForm.reset();
    this.searchForm.get('name')?.reset('');
    this.searchForm.get('type')?.reset('');
  }


}
