import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbDatepicker } from '@nebular/theme';
import { Apollo, gql } from 'apollo-angular';
import { Get_getAllRewardOrder, Get_searchRewardOrder } from '../../../service/reward.service';
import { TranslateService } from '../../../service/translate.service';
import { CustomInputSelectFilterComponent } from '../custom-input/custom-input-select-filter/custom-input-select-filter.component';
import { CustomInputTextFilterComponent } from '../custom-input/custom-input-text-filter/custom-input-text-filter.component';
import { DateFilterComponent } from '../custom-input/date-filter-component/date-filter-component.component';







@Component({
  selector: 'app-reward-order-search',
  templateUrl: './reward-order-search.component.html',
  styleUrls: ['./reward-order-search.component.scss']
})
export class RewardOrderSearchComponent implements OnInit {
  reward_order: any[] = [];

  isCard: boolean = true;
  isBelowCard: boolean = true;


  constructor(private apollo: Apollo,
    private fb: FormBuilder,
    private translateService: TranslateService,
    ) { }

    searchOrderForm =  this.fb.group({
      user: [''],
      reward: [''],
      status: [''],
      remask:[''],
      create_at: [{start: new Date(1656612000000), end: new Date()}],
     /*  to: [new Date()], */
    })

   /*  fromdate = JSON.parse(JSON.stringify(this.searchOrderForm.controls["from"].value)!).start;
    todate = JSON.parse(JSON.stringify(this.searchOrderForm.controls["from"].value)!).end; */
  ngOnInit(): void {
    this.LoadRewardOrder();
  }

  settings = {
    actions: {
      columnTitle: this.translateService.translate("biz.reward-order.read.reward-order-list.action"),
      custom: [
        {
          name: 'edit',
          title: `
                        <i class="nb-edit" title="${this.translateService.translate("biz.reward-order.read.reward-order-list.edit")}"></i>
                    `
        },
        {
          name: 'delete',
          title: `
          <i class="nb-trash" title="${this.translateService.translate("biz.reward-order.read.reward-order-list.delete")}"></i>
      `
        },
        ],
        add: false,
        edit: false,
        delete: false,

  },
    columns: {
      user_id: {
        title: this.translateService.translate("biz.reward-order.read.user"),
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: { placeholder: this.translateService.translate("biz.reward-order.read.user") },
        },

        valuePrepareFunction: (user_id: any) => {
          if(user_id) {
            return user_id.name
          }
          else {return null}
        },
        filterFunction: (cell: {name: string}, search:string): boolean => {
          return cell.name.includes(search)

        }
      },
      reward_id: {
        title: this.translateService.translate("biz.reward-order.read.reward"),
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: { placeholder: this.translateService.translate("biz.reward-order.read.reward") },
        },
        valuePrepareFunction: (reward_id: any) => {
          if(reward_id) {
            return reward_id.name
          }
          else {return null}
        },
        filterFunction: (cell: {name: string}, search:string): boolean => {
          if(cell) {
            return cell.name.includes(search);
          } else {
            return false
          }

        }
      },
      status: {
        title: this.translateService.translate("biz.reward-order.read.status.status"),
        filter: {
          type: 'custom',
          component: CustomInputSelectFilterComponent,
          config: {
            selectText: 'Select Status',
            list: [
              {value: '', title: this.translateService.translate("biz.reward-order.read.status.status")},
              {value: '01', title: this.translateService.translate("biz.reward-order.read.status.new")},
              {value: '02', title: this.translateService.translate("biz.reward-order.read.status.approved")},
              {value: '03', title: this.translateService.translate("biz.reward-order.read.status.claimed")},

            ]
          }
        },
        valuePrepareFunction: (value: any) => {
          if(value === '01') {
            return this.translateService.translate("biz.reward-order.read.status.new")
          }
          if(value === '02') {
            return this.translateService.translate("biz.reward-order.read.status.approved")
          }
          if(value === '03') {
            return this.translateService.translate("biz.reward-order.read.status.claimed")
          }
          else {return }
        }
      },
      remark: {
        title: this.translateService.translate("biz.reward-order.read.reward-order-list.remark"),
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: { placeholder: this.translateService.translate("biz.reward-order.read.reward-order-list.remark") },
        },
        sort: true,
      },
      create_at: {
        title: this.translateService.translate("biz.reward-order.read.date"),
        filter: {
          type: 'custom',
          component: DateFilterComponent
        },
        sort: true,
        valuePrepareFunction: (value: any) => {
          if(!value) {
            return '';
          } else {
            return new Date(value * 1000).toLocaleDateString('vi');
          }
        },
        filterFunction: (value: any, query: string) => {
          const range = JSON.parse(query)
          const start = Math.round(new Date(range.start).getTime()/1000) /* new Date(range.start).getTime()  */
          const end = Math.round(new Date(range.end).getTime()/1000) /* new Date(range.end).getTime() */
          const date = value

          console.log(range)
          if(start <= date && date <= end) {
            return start <= date && date <= end
          }
          else {return false}

        },
      },
    }
  };

  toggleCard(){
    this.isCard = !this.isCard;
  }

  toogleBelowCard() {
    this.isBelowCard = !this.isBelowCard;
  }

  LoadRewardOrder() {
    this.apollo
    .watchQuery({
      query: Get_getAllRewardOrder,

    })
    .valueChanges.subscribe((res: any) => {

      this.reward_order = res?.data?.getAllRewardOrder;

      console.log("data Reward Order", this.reward_order);
    })
   }


   searchRewardOrder() {
    this.apollo
      .watchQuery({
        query: Get_searchRewardOrder,
        variables:
        {
          USER: this.searchOrderForm.controls["user"].value,
          REWARD: this.searchOrderForm.controls["reward"].value,
          STATUS: this.searchOrderForm.controls["status"].value,
          FROM: Math.round(new Date(JSON.parse(JSON.stringify(this.searchOrderForm.controls["create_at"].value)!).start).getTime()/1000),
          TO:  Math.round(new Date(JSON.parse(JSON.stringify(this.searchOrderForm.controls["create_at"].value)!).end).getTime()/1000),
          /*  FROM:  Math.round(new Date(this.searchOrderForm.controls["from"].value!).getTime()/1000), */
          /* TO: Math.round(new Date(this.searchOrderForm.controls["to"].value!).getTime()/1000) */

        }
      })
      .valueChanges.subscribe((res: any) => {

        this.reward_order = res?.data?.searchRewardOrder;
        console.log("Search Reward Order: ", this.reward_order)
      })
   }

   resetSearchForm() {

    this.searchOrderForm.reset();
    this.searchOrderForm.get('user')?.reset('');
    this.searchOrderForm.get('reward')?.reset('');
    this.searchOrderForm.get('status')?.reset('');
    this.searchOrderForm.get('remask')?.reset('');
    this.searchOrderForm.get('create_at')?.reset({start: new Date(1656612000000), end: new Date()});
    /* this.searchOrderForm.get('to')?.reset(new Date()); */

  }

  Logdata(datepicker: any) {
    console.log(datepicker);
  }
}


