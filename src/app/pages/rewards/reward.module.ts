import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { 
    NbAccordionModule,
    NbAlertModule,
    NbAutocompleteModule,
    NbButtonModule, 
    NbCardModule, 
    NbDatepickerModule, 
    NbFormFieldModule, 
    NbIconModule, 
    NbInputModule, 
    NbRadioModule, 
    NbSelectModule, 
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { CustomInputSelectFilterComponent } from "./custom-input/custom-input-select-filter/custom-input-select-filter.component";
import { CustomInputTextFilterComponent } from "./custom-input/custom-input-text-filter/custom-input-text-filter.component";
import { DateFilterComponent } from "./custom-input/date-filter-component/date-filter-component.component";
import { InventoryCreateComponent } from "./inventory-create/inventory-create.component";
import { InventoryDialogDeleteComponent } from "./inventory-dialog-delete/inventory-dialog-delete.component";
import { RewardInventorySearchComponent } from "./reward-inventory-search/reward-inventory-search.component";
import { RewardOrderSearchComponent } from "./reward-order-search/reward-order-search.component";
import { RewardRoutingModule } from "./reward-routing.module";
import { RewardComponent } from "./reward.component";




@NgModule({
    imports: [
        RewardRoutingModule,
        NbAlertModule,
        NbCardModule,
        NbIconModule,
        NbInputModule,
        NbButtonModule,
        NbRadioModule,
        NbSelectModule,
        NbAccordionModule,
        NbDatepickerModule,
        NbFormFieldModule,
        NbAutocompleteModule,
        FormsModule,
        ThemeModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        FormsModule,

    ],
    declarations: [
        InventoryCreateComponent,
        InventoryDialogDeleteComponent,
        RewardInventorySearchComponent,
        RewardOrderSearchComponent,
        RewardComponent,
        CustomInputSelectFilterComponent,
        CustomInputTextFilterComponent,
        DateFilterComponent
    ]
})
export class RewardModule { }