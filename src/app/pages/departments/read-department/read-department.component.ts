import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { DepartmentService } from "../../../service/department.service";
import { TranslateService } from "../../../service/translate.service";
import { UserService } from "../../../service/user.service";

interface Department {
    _id: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    create_at: number;
    create_by: string;
    change_at: number;
    change_by: string;
}

interface DisplayDepartment {
    _id: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    create_at: string;
    create_by: string;
    change_at: string;
    change_by: string;
}

@Component({
    selector: 'common-read-department',
    templateUrl: './read-department.component.html',
    styleUrls: ['./read-department.component.scss'],
})
export class ReadDepartmentComponent implements OnInit {
    settings = {
        actions: {
            columnTitle: this.translateService.translate("common.department.read.action"),
            custom: [
                // {
                //     name: 'detail',
                //     title: '<i class="nb-maximize" title="Detail"></i>'
                // },
                {
                    name: 'editAction',
                    title: `
                        <i class="nb-edit" title="${this.translateService.translate("common.department.read.edit")}"></i>
                    `
                },
                {
                    name: 'deleteAction',
                    title: `
                        <i class="nb-trash" title="${this.translateService.translate("common.department.read.delete")}"></i>
                    `
                }
            ],
            add: false,
            edit: false,
            delete: false
        },
        hideSubHeader: true,
        columns: {
            name: {
                title: this.translateService.translate("common.department.read.name"),
                type: 'string',
            },
            address: {
                title: this.translateService.translate("common.department.read.address"),
                type: 'string',
            },
            phone: {
                title: this.translateService.translate("common.department.read.phone"),
                type: 'string',
            },
            email: {
                title: this.translateService.translate("common.department.read.email"),
                type: 'string',
            },
            create_by: {
                title: this.translateService.translate("common.department.read.create_by"),
                type: 'string',
            },
            create_at: {
                title: this.translateService.translate("common.department.read.create_at"),
                type: 'string',
            },
            change_by: {
                title: this.translateService.translate("common.department.read.change_by"),
                type: 'string',
            },
            change_at: {
                title: this.translateService.translate("common.department.read.change_at"),
                type: 'string',
            }
        },
    };


    source: [Department];
    sources: LocalDataSource;
    convert_source: any;

    constructor(
        private departmentService: DepartmentService,
        private userService: UserService,
        private router: Router,
        private translateService: TranslateService,
    ) {
    }

    async ngOnInit() { 
        await this.setupData();

        await this.convertData();
    }

    setupData = async () => {
        const data = await this.departmentService.getDepartmentList();
        this.source = data.data['department'];
    }

    /**
     * Unix Timestamp (Float) -> Date Time (String);
     * Create_by, Change_by (Object Id) -> Name (String);
     */
    convertData = async () => {
        var temp = [];
        for (var i = 0; i < this.source.length; i++) {
            var name = this.source[i].name,
                address = this.source[i].address,
                email = this.source[i].email,
                phone = this.source[i].phone,
                _id = this.source[i]._id;

            var create_at = (new Date(this.source[i].create_at * 1000)).toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                change_at = (new Date(this.source[i].change_at * 1000)).toLocaleString('en-ZA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

            var create_by = await (await this.userService.getUser(this.source[i].create_by)).data['oneUserById']['name'],
                change_by = await (await this.userService.getUser(this.source[i].change_by)).data['oneUserById']['name'];

            var item: DisplayDepartment = {
                _id: _id,
                name: name,
                address: address,
                email: email,
                phone: phone,
                create_at: create_at,
                change_at: change_at,
                create_by: create_by,
                change_by: change_by
            }

            temp[i] = item;
        }
        this.convert_source = temp;
        this.sources = new LocalDataSource(this.convert_source);
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
        this.router.navigate(['/pages/department/edit/', item['_id']]);
    }

    onDeleteConfirm = async (event) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await this.departmentService.deleteDepartment(event.data['_id']);
            // update table
            await this.sources.remove(event.data);
        }
    }

    onClickNew = () => {
        console.log("Clicked New");
        this.router.navigateByUrl('/pages/department/create')
    }
}