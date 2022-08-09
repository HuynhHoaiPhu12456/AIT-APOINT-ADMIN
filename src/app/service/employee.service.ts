import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

import { Apollo, gql } from "apollo-angular";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class EmployeeService extends BaseService {
    current_employee: any;

    constructor(
        apolloProvider: Apollo,
        httpService: HttpClient
    ) {
        super(apolloProvider, httpService);
    }

    getEmployeeList = async () => {
        const result = this.apollo
            .query({
                query: gql `
                {
                    employee {
                        _id
                        user_id
                        dept_id
                        date_of_birth
                        gender 
                        address
                        phone
                        total_point
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

    getOneEmployee = async (id) => {
        const result = this.apollo
            .query({
                query: gql `
                {
                    oneEmployee (id: "${id}") {
                        _id
                        user_id
                        dept_id
                        date_of_birth
                        gender 
                        address
                        phone
                        total_point
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

    createEmployee = async (employee) => { console.log("em: ", employee)
        let dept_id = '[';
        for (let i of employee.dept_id) {
            dept_id += `"${i}", `;
        }
        dept_id += ']';
        
        const result = await this.apollo
            .mutate({
                mutation: gql `
                    mutation {
                        createEmployee (
                            input: {
                                company: "${this.company}",
                                user_id: "${employee.user_id}",
                                dept_id: ${dept_id},
                                date_of_birth: ${employee.date_of_birth},
                                gender: "${employee.gender}",
                                address: "${employee.address}",
                                phone: "${employee.phone}",
                                total_point: ${employee.total_point},
                                create_at: ${employee.create_at},
                                create_by: "${employee.create_by}",
                                change_at: ${employee.create_at},
                                change_by: "${employee.create_by}"
                            }
                        ) {
                            _id
                            user_id
                            dept_id
                        }
                    }`
            })
            .toPromise();

        return result;
    }

    setEmployee = async (employee) => {
        let dept_id = '[';
        for (let i of employee.dept_id) {
            dept_id += `"${i}", `;
        }
        dept_id += ']';

        const result = this.apollo
            .mutate({
                mutation: gql `
                    mutation {
                        UpdateEmployee (
                            input: {
                                company: "${this.company}",
                                _id: "${employee._id}",
                                user_id: "${employee.user_id}",
                                dept_id: ${dept_id},
                                date_of_birth: ${employee.date_of_birth},
                                gender: "${employee.gender}",
                                address: "${employee.address}",
                                phone: "${employee.phone}",
                                total_point: ${employee.total_point},
                                change_at: ${employee.change_at},
                                change_by: "${employee.change_by}"
                            }
                        ) {
                            _id
                            user_id
                            dept_id
                            date_of_birth
                            gender
                            address
                            phone
                            total_point
                            create_at
                            create_by
                            change_at
                            change_by
                        }
                    }`
            })
            .toPromise()
        
        return result;
    }

    deleteEmployee = async (id) => {
        const result = await this.apollo
            .mutate({
                mutation: gql `
                    mutation {
                        RemoveEmployee (
                            id: "${id}"
                        ) {
                            _id
                            user_id
                            dept_id
                            date_of_birth
                            gender
                            address
                            phone
                            total_point
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