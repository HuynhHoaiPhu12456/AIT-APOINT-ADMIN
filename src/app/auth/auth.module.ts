import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NbAuthModule } from "@nebular/auth";
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule
} from "@nebular/theme";
import { ThemeModule } from "../@theme/theme.module";
import { TranslatePipe } from "../pipe/translate.pipe";
import { NgxAuthRoutingModule } from "./auth-routing.module";
import { NgxLoginComponent } from "./login/login.component";
import { NgxRegisterComponent } from "./register/register.component";
import { NgxRequestPasswordComponent } from "./request-password/request-password.component";
import { NgxResetPasswordComponent } from "./reset-password/reset-password.compnent";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        ThemeModule,
        NgxAuthRoutingModule,
        NbAuthModule,
    ],
    declarations: [
        NgxLoginComponent,
        NgxRegisterComponent,
        NgxRequestPasswordComponent,
        NgxResetPasswordComponent,
    ],
})
export class NgxAuthModule {

}