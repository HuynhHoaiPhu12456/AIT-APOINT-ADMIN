import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class BaseService implements OnDestroy {
    company = '20c07176-22d8-4542-8785-c26b274b417f';
    active_flag;
    token = '';
    is_token_valid;
    user_id = ''; 
    employee_id = '';
    department_id = '';
    current_lang = '';
    private subscription = new Subscription();

    constructor(
        public apollo: Apollo,
        public http: HttpClient,
    ) { 
        this.token = localStorage.getItem('access_token');
    }

    ngOnDestroy(): void { 
        if (this.is_token_valid !== null || this.is_token_valid !== undefined) {
            this.subscription.unsubscribe()
        }
    }

    saveToken = (refToken: string, accToken: string) => {
        localStorage.setItem('access_token', refToken);
        localStorage.setItem('refresh_token', accToken);
    }
}
