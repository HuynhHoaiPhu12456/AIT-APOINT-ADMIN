import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
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
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeComponent } from "./employee.component";
import { ReadEmployeeComponent } from "./read-employee/read-employee.component";
import { UpdateEmployeeComponent } from "./update-employee/update-employee.component";


@NgModule({
    imports: [
        EmployeeRoutingModule,
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
    ],
    declarations: [
        EmployeeComponent,
        ReadEmployeeComponent,
        CreateEmployeeComponent,
        UpdateEmployeeComponent,
    ]
})
export class EmployeeModule { }