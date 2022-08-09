import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthService, NbRegisterComponent, NB_AUTH_OPTIONS } from "@nebular/auth";
import { AuthService } from "../../service/auth.service";

@Component({
    selector: 'ngx-register',
    templateUrl: './register.component.html'
})
export class NgxRegisterComponent extends NbRegisterComponent {
    constructor(
        service: NbAuthService,
        cd: ChangeDetectorRef,
        @Inject(NB_AUTH_OPTIONS) option: {},
        router: Router,
        public authService: AuthService,
    ) {
        super(service, option, cd, router);
    }

    register = () => { 
        if(!this.user.fullName) {
            this.user.fullName = '';
        }
        const userRegister = this.authService.register(this.user.fullName, this.user.email, this.user.password);
        console.log("User register: ", userRegister);
        if (userRegister) {
            this.router.navigateByUrl('auth/login');
        }
    }
}