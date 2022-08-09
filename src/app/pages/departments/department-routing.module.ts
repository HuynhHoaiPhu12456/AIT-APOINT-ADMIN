import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateDepartmentComponent } from "./create-department/create-department.component";

import { DepartmentComponent } from "./department.component";
import { ReadDepartmentComponent } from "./read-department/read-department.component";
import { UpdateDepartmentConponent } from "./update-department/update-department.component";

const routes: Routes = [
    {
        path: '',
        component: DepartmentComponent,
        children: [
            {
                path: '',
                component: ReadDepartmentComponent,
            },
            {
                path: 'list',
                component: ReadDepartmentComponent,
            },
            {
                path: 'create',
                component: CreateDepartmentComponent,
            },
            {
                path: 'edit/:id',
                component: UpdateDepartmentConponent,
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DepartmentRoutingModule { }