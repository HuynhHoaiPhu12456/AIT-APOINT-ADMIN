import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Apollo, gql } from "apollo-angular";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root',  
})
export class AuthService extends BaseService {
    private ACCESS_TOKEN = 'access_token';
    private REFRESH_TOKEN = 'refresh_token';

    private access_token: any;
    private token_payload: any;

    constructor(
        apollo: Apollo,
        httpService: HttpClient,
        private router: Router,
        private jwtHelper: JwtHelperService,

    ) {
        super(apollo, httpService);
        this.access_token = localStorage.getItem(this.ACCESS_TOKEN);
    }

    isAuthenticated = async () => { 
        const token = localStorage.getItem(this.ACCESS_TOKEN);
        const user = localStorage.getItem('user_id');
        
        if (token && user) {
            await this.getTokenDecode();
            if (this.token_payload) {
                if (this.token_payload.sub == user) {
                    return true;
                }
            }
        }
        return false;
    }

    getTokenDecode = () => {
        this.token_payload = this.jwtHelper.decodeToken(this.access_token);
        return this.token_payload;
    }

    getAuthToken = async (email: string, password: string) => {
        const token = await this.apollo
            .mutate({
                mutation: gql `
                    mutation {
                        login(
                            email: "${email}",
                            password: "${password}"
                        ) {
                            access_token
                        }
                    }`
            })
            .toPromise();
        return token;
    }

    /**
     * login()
     * @param email
     * @param password
     * @returns
     */
    login = async (email: string, password: string) => {
        await this.getAuthToken(email, password).then( (res) => {
            console.log("Get access token: ", res.data['login']['access_token']);
            localStorage.setItem(this.ACCESS_TOKEN, res.data['login']['access_token']);
        });
        const res_token = localStorage.getItem(this.ACCESS_TOKEN);
        const res_data = this.jwtHelper.decodeToken(res_token);
        if (res_data.username === email) {
            return res_data.sub;
        }
        return null;
        
        // const result =  await this.apollo
        //     .mutate({
        //         mutation: gql`
        //             mutation {
        //                 logIn(
        //                     email: "${email}", 
        //                     password: "${password}"
        //                 ) {
        //                     _id 
        //                     username
        //                     name
        //                     password
        //                     email
        //                 }
        //             }`
        //     })
        //     .toPromise();
        // return result; 
    }

    /**
     * register()
     * @param fullname
     * @param email
     * @param password
     * @returns
     */
    register = (fullname: string, email: string, password: string) => {
        return this.apollo
            .mutate({
                mutation: gql `
                    mutation {
                        register(
                            email: "${email}",
                            name: "${fullname}",
                            password: "${password}",
                            username: "${email}"
                        ) {
                            _id
                            email
                        }
                    }`
            })
            .toPromise();
    }

    logout = () => {
        localStorage.removeItem(this.ACCESS_TOKEN);
        localStorage.removeItem("user_id");
        this.router.navigateByUrl('/auth/login');
    }
}