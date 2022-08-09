import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NbAuthComponent } from "@nebular/auth";
import { NgxLoginComponent } from "./login/login.component";
import { NgxRegisterComponent } from "./register/register.component";
import { NgxRequestPasswordComponent } from "./request-password/request-password.component";
import { NgxResetPasswordComponent } from "./reset-password/reset-password.compnent";

export const routes: Routes = [
    {
        path: '',
        component: NbAuthComponent,
        children: [
            {
                path: '',
                component: NgxLoginComponent,
            },
            {
                path: 'login',
                component: NgxLoginComponent,
            },
            {
                path: 'register',
                component: NgxRegisterComponent,
            },
            {
                path: 'request-password',
                component: NgxRequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: NgxResetPasswordComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgxAuthRoutingModule { }