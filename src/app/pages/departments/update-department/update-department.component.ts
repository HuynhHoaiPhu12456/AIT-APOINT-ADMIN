import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DepartmentService } from "../../../service/department.service";

@Component({
    selector: 'common-department-update',
    templateUrl: './update-department.component.html',
    styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentConponent implements OnInit {
    department_id: any;
    department: any;                    // save current department data
    new_department: any;                // save input data
    is_show_unchanged: boolean = false;
    is_show_save: boolean = false;
    is_show_clear: boolean = true;
    is_success = false;
    is_fail = false;

    constructor(
        private route: ActivatedRoute,
        private departmentService: DepartmentService,
        private _location: Location,
        private router: Router
    ) { }

    ngOnInit() {
        this.department = {
            name: '',
            email: '',
            phone: '',
            address: '',
        };
        this.new_department = {
            _id: '',
            name: '',
            email: '',
            phone: '',
            address: '',
        };
        this.route.paramMap.subscribe( params => {
            this.department_id = params['params']['id'];
        });
        this.setupData(this.department_id);
    }

    setupData = async (id) => {
        await this.getOneDepartment(id);
        this.new_department = {
            _id: this.department._id,
            name: this.department.name,
            email: this.department.email,
            phone: this.department.phone,
            address: this.department.address
        }
    }

    getOneDepartment = async (id) => {
        this.department = await (await this.departmentService.getOneDepartment(id)).data['oneDepartment']; 
    }

    onClickBack = () => {
        console.log("Back!!!");
        this.router.navigateByUrl('/pages/department');
        // this._location.back();
    }

    onClickUnchange = () => {
        this.new_department.name = this.department.name;
        this.new_department.email = this.department.email;
        this.new_department.phone = this.department.phone;
        this.new_department.address = this.department.address;
        this.is_show_unchanged = false;
        this.is_show_save = false;
        this.is_show_clear = true;
    }

    onClickClear = () => {
        this.new_department.name = '';
        this.new_department.email = '';
        this.new_department.phone = '';
        this.new_department.address = '';
        this.is_show_unchanged = true;
        this.is_show_save = false;
        this.is_show_clear = false;
    }

    onClickSave = async () => {
        const date = new Date();
        this.new_department.change_at =  date.getTime()/1000;
        
        const user_id = localStorage.getItem('user_id');
        this.new_department.change_by = user_id;
        
        const departmentUpdate = await this.departmentService.setDepartment(this.new_department);
        if (departmentUpdate.errors) {
            this.is_fail = true;
        }
        else {
            this.is_success = true;
        }
        this.is_show_unchanged = false;
        this.is_show_save = false;
        this.is_show_clear = true;
    }

    onClose = () => {
        this.is_success = false;
        this.is_fail = false;
    }

    onChangeValue = () => {
        if (
            this.new_department.name    === '' &&
            this.new_department.address === '' &&
            this.new_department.phone   === '' &&
            this.new_department.email   === ''
        ) {
            this.is_show_unchanged = true;
            this.is_show_save = false;
            this.is_show_clear = false;
        }
        else if (
            this.new_department.name    === '' ||
            this.new_department.address === '' ||
            this.new_department.phone   === '' ||
            this.new_department.email   === ''
        ) {
            this.is_show_unchanged = true;
            this.is_show_save = false;
            this.is_show_clear = true;
        }
        else if (
            this.new_department.name    != this.department.name     ||
            this.new_department.address != this.department.address  ||
            this.new_department.phone   != this.department.phone    ||
            this.new_department.email   != this.department.email
        ) {
            this.is_show_unchanged = true;
            this.is_show_save = true;
            this.is_show_clear = true;
        }
        else {
            this.is_show_unchanged = false;
            this.is_show_save = false;
            this.is_show_clear = true;
        }
    }
}