import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from "@nebular/auth";
import { AuthService } from "../../service/auth.service";

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent { 
    constructor(
        service: NbAuthService,
        cd: ChangeDetectorRef,
        @Inject(NB_AUTH_OPTIONS) option: {},
        router: Router,
        public authService: AuthService,
    ) {
        super(service, option, cd, router); console.log("Login")
    }

    login() {
        this.loginHandle().then();
    }

    loginHandle = async () => {
        const userLogin = await this.authService.login(this.user.email, this.user.password); console.log("login -> ", userLogin)
        if (userLogin) {
            localStorage.setItem('user_id', userLogin);
            this.router.navigateByUrl('pages/home');
        }       
    }
}