import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { 
    NbAccordionModule,
    NbAlertModule,
    NbButtonModule, 
    NbCardModule, 
    NbDatepickerModule, 
    NbFormFieldModule, 
    NbIconModule, 
    NbInputModule, 
    NbSelectModule, 
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { CreateDepartmentComponent } from "./create-department/create-department.component";
import { DepartmentRoutingModule } from "./department-routing.module";
import { DepartmentComponent } from "./department.component";
import { ReadDepartmentComponent } from "./read-department/read-department.component";
import { UpdateDepartmentConponent } from "./update-department/update-department.component";

@NgModule({
    imports: [
        DepartmentRoutingModule,
        NbAlertModule,
        NbCardModule,
        NbIconModule,
        NbInputModule,
        NbButtonModule,
        NbSelectModule,
        NbAccordionModule,
        NbDatepickerModule,
        NbFormFieldModule,
        FormsModule,
        ThemeModule,
        Ng2SmartTableModule,
    ],
    declarations: [
        DepartmentComponent,
        ReadDepartmentComponent,
        CreateDepartmentComponent,
        UpdateDepartmentConponent,
    ]
})
export class DepartmentModule { }