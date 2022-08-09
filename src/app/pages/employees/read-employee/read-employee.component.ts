import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeeService } from "../../../service/employee.service";
import { DepartmentService } from "../../../service/department.service";
import { UserService } from "../../../service/user.service";
import { LocalDataSource } from "ng2-smart-table";
import { TranslateService } from "../../../service/translate.service";

@Component({
    selector: 'common-read-employee',
    templateUrl: './read-employee.component.html',
    styleUrls: ['./read-employee.component.scss'],
})
export class ReadEmployeeComponent implements OnInit {
    settings = {
        actions: {
            columnTitle: this.translateService.translate("common.department.read.action"),
            custom: [
                {
                    name: 'editAction',
                    title: `
                        <i class="nb-edit" title="${this.translateService.translate("common.employee.read.edit")}"></i>
                    `,
                },
                {
                    name: 'deleteAction',
                    title: `
                        <i class="nb-trash" title="${this.translateService.translate("common.employee.read.delete")}"></i>
                    `,
                },
            ],
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        columns: {
            user_id: {
                title: this.translateService.translate("common.employee.read.name"),
                type: 'string',
            },
            date_of_birth: {
                title: this.translateService.translate("common.employee.read.date_of_birth"),
                type: 'string',
            },
            gender: {
                title: this.translateService.translate("common.employee.read.gender.gender"),
                type: 'string',
                valuePrepareFunction: (data) => {
                    return this.translateService.translate("common.employee.read.gender." + data);
                }
            },
            address: {
                title: this.translateService.translate("common.employee.read.address"),
                type: 'string',
            },
            phone: {
                title: this.translateService.translate("common.employee.read.phone"),
                type: 'string',
            },
            dept_id: {
                title: this.translateService.translate("common.employee.read.department"),
                type: '[string]',
                valuePrepareFunction: (data) => {
                    var dept = '';
                    for (var i in data) {
                        dept = dept + "\n" + data[i];
                    }
                    return dept;
                }
            },
            total_point: {
                title: this.translateService.translate("common.employee.read.total_point"),
                type: 'number'
            },
            create_by: {
                title: this.translateService.translate("common.employee.read.create_by"),
                type: 'string',
            },
            create_at: {
                title: this.translateService.translate("common.employee.read.create_at"),
                type: 'string',
            },
            change_by: {
                title: this.translateService.translate("common.employee.read.change_by"),
                type: 'string',
            },
            change_at: {
                title: this.translateService.translate("common.employee.read.change_at"),
                type: 'string',
            }
        }
    }

    source: [{}];
    sources: LocalDataSource;
    convert_source: any;

    genderValue = "";   // for search
    departments = [];

    constructor(
        private empolyeeService: EmployeeService,
        private departmentService: DepartmentService,
        private userService: UserService,
        private router: Router,
        private translateService: TranslateService,
    ) { }

    async ngOnInit() {
        await this.setupSearch();
        await this.setupData();
        this.convertData();
    }

    setupData = async () => {
        const data = await this.empolyeeService.getEmployeeList();
        this.source = data.data['employee'];
    }

    /**
     * Gender (Number) -> (String)
     * Unix Timestamp -> Date Time;
     * Dept_id ([Object Id]) -> Dept name list (String);
     * Create_by, Change_by (Object Id) -> Name (String);
     */
    convertData = async () => {
        var temp = [];
        
        for (var i = 0; i < this.source.length; i++) {
            var address = this.source[i]['address'],
                phone = this.source[i]['phone'],
                total_point = this.source[i]['total_point'],
                _id = this.source[i]['_id'];
            
            var gender;
            if (this.source[i]['gender'] === '1') {
                gender = "Male";
            }
            else if (this.source[i] === '2') {
                gender = "Female";
            }
            else {
                gender = "Other";
            }

            var date_of_birth = (new Date(this.source[i]['date_of_birth'] * 1000)).toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit' }); 
            
            var create_at = (new Date(this.source[i]['create_at'] * 1000)).toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                change_at = (new Date(this.source[i]['change_at'] * 1000)).toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

            var create_by = await (await this.userService.getUser(this.source[i]['create_by'])).data['oneUserById']['name'],
                change_by = await (await this.userService.getUser(this.source[i]['change_by'])).data['oneUserById']['name'],
                name = await (await this.userService.getUser(this.source[i]['user_id'])).data['oneUserById']['name'];
            
            var depts = [];
            for (var j in this.source[i]['dept_id']) {
                for (var department of this.departments) {
                    if (department.value === this.source[i]['dept_id'][j]) {
                        depts[j] = department.name;
                        break;
                    }
                }
            }
            
            const item = {
                _id: _id,
                user_id: name,
                dept_id: depts,
                date_of_birth: date_of_birth,
                gender: gender,
                address: address,
                phone: phone,
                total_point: total_point,
                create_at: create_at,
                create_by: create_by,
                change_at: change_at,
                change_by: change_by,
            }

            temp[i] = item;
        }

        this.convert_source = temp;
        this.sources = new LocalDataSource(this.convert_source);
    }

    setupSearch = async () => {
        const depts = await (await this.departmentService.getDepartmentList()).data['department'];
        for (var i in depts) {
            var item = {
                name: depts[i].name,
                value: depts[i]._id
            }
            this.departments[i] = item;
        }
    }

    onClickNew = () => {
        console.log("Clicked New");
        this.router.navigateByUrl('/pages/employee/create')
    }

    onCustomEvent = (event) => {
        switch (event.action) {
            case 'detail':
                console.log("Detail ", event.data);
                break;
            case 'editAction':
                console.log("Edit ", event.data);
                this.onEditEvent(event.data);
                break;
            case 'deleteAction':
                this.onDeleteConfirm(event);
                break;
        }
    }

    onEditEvent = (item) => {
        this.router.navigate(['/pages/employee/edit/', item['_id']]);
    }

    onDeleteConfirm = async (event) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await this.empolyeeService.deleteEmployee(event.data['_id']);
            // update table
            await this.sources.remove(event.data);
        }
    }
}