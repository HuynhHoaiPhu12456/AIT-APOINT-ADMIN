import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { HomeComponent } from "./home/home/home.component";
import { AuthGuardService as AuthGuard } from "../service/auth-guard.service";



const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "department",
        loadChildren: () => import('./departments/department.module')
          .then(m => m.DepartmentModule),
        canActivate: [AuthGuard],
      },
      {
        path: "employee",
        loadChildren: () => import('./employees/employee.module')
          .then(m => m.EmployeeModule),
        canActivate: [AuthGuard],
      },
      {
        path: "reward",
        loadChildren: () => import('./rewards/reward.module')
          .then(m => m.RewardModule),
        canActivate: [AuthGuard],
      },
      {
        path: "department",
        loadChildren: () => import('./departments/department.module')
          .then(m => m.DepartmentModule),
        canActivate: [AuthGuard],
      },
      {
        path: "employee",
        loadChildren: () => import('./employees/employee.module')
          .then(m => m.EmployeeModule),
        canActivate: [AuthGuard],
      },
      {
        path: "reward",
        loadChildren: () => import('./rewards/reward.module')
          .then(m => m.RewardModule),
        canActivate: [AuthGuard],
      },
      {
        path: "event",
        loadChildren: () => import('./events/event.module')
          .then(m => m.EventModule),
        canActivate: [AuthGuard],
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
