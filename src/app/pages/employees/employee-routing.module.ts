import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { EmployeeComponent } from "./employee.component";
import { ReadEmployeeComponent } from "./read-employee/read-employee.component";
import { UpdateEmployeeComponent } from "./update-employee/update-employee.component";

const routes: Routes = [
    {
        path: '',
        component: EmployeeComponent,
        children: [
            {
                path: '',
                component: ReadEmployeeComponent,
            },
            {
                path: 'list',
                component: ReadEmployeeComponent,
            },
            {
                path: 'create',
                component: CreateEmployeeComponent,
            },
            {
                path: 'edit/:id',
                component: UpdateEmployeeComponent,
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployeeRoutingModule { }