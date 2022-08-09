import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

import { Apollo, gql } from "apollo-angular";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class DepartmentService extends BaseService {
    constructor(
        apolloProvider: Apollo,
        httpService: HttpClient
    ) {
        super(apolloProvider, httpService);
    }

    /**
     * get department list
     * @returns
     */
    getDepartmentList = async () => {
        const result = await this.apollo
            .query({
                query: gql`
                {
                    department {
                        _id
                        name
                        address
                        phone
                        email
                        create_by
                        create_at
                        change_by
                        change_at
                    }
                }`
            })
            .toPromise();

        return result;
    }

    createDepartment = async (department) => {
        const result = await this.apollo
            .mutate({
                mutation: gql`
                    mutation {
                        createDepartment(
                            input: {
                                company: "${this.company}",
                                name: "${department.name}",
                                address: "${department.address}",
                                email: "${department.email}",
                                phone: "${department.phone}",
                                create_at: ${department.create_at},
                                create_by: "${department.create_by}",
                                change_by: "${department.create_by}",
                                change_at: ${department.create_at}
                            } 
                        ) {
                            _id
                            name
                        }
                    }`
            })
            .toPromise();

        return result;
    }

    getOneDepartment = async (id) => {
        const result = await this.apollo
            .query({
                query: gql `
                    {
                        oneDepartment (id: "${id}") {
                            _id
                            name
                            address
                            phone
                            email
                        }
                    }`
            })
            .toPromise();

        return result;
    }

    setDepartment = async (department) => {
        const result = await this.apollo
        .mutate({
            mutation: gql`
                mutation {
                    UpdateDepartment(
                        id: "${department._id}",
                        input: {
                            company: "${this.company}",
                            name: "${department.name}",
                            address: "${department.address}",
                            email: "${department.email}",
                            phone: "${department.phone}",
                            change_by: "${department.change_by}",
                            change_at: ${department.change_at}
                        }
                    ) {
                        _id
                        name
                        address
                        email
                        phone
                        create_at
                        create_by
                        change_at
                        change_by
                    }
                }`
        })
        .toPromise();
        
        return result;
    }

    deleteDepartment = async (id) => {
        const result = await this.apollo
        .mutate({
            mutation: gql`
                mutation {
                    RemoveDepartment(
                        id: "${id}",
                    ) {
                        _id
                        name
                        address
                        email
                        phone
                        create_at
                        create_by
                        change_at
                        change_by
                    }
                }`
        })
        .toPromise();

        return result;
    }
}

