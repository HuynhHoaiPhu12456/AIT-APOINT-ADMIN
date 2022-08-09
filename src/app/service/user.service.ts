import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseService {
    
    constructor(
        apollo: Apollo,
        httpService: HttpClient,
    ) {
        super(apollo, httpService);
    }

    getUser = async (id) => {
        const result = await this.apollo
            .query({
                query: gql `
                    {
                        oneUserById(id: "${id}") {
                            email
                            name
                            password
                            username
                        }
                    }`
            })
            .toPromise();
        return result;
    }

    getUserList = async () => {
        const result = await this.apollo
            .query({
                query: gql `
                    {
                        user {
                            _id
                            email
                            password
                            username
                            name
                        }
                    }`
            })
            .toPromise();
        
        return result;
    }
}