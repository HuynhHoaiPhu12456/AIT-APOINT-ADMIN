import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DepartmentService } from "../../../service/department.service";

@Component({
    selector: 'common-department-create',
    templateUrl: './create-department.component.html',
    styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {
    department: any;
    is_success = false;
    is_fail = false;

    constructor(
        private router: Router,
        private departmentService: DepartmentService,
    ) { }

    ngOnInit() {
        this.department = {
            name: '',
            email: '',
            phone: '',
            address: '',
        };
    }
    
    onClickBack = () => {
        console.log("Back!!!");
        this.router.navigateByUrl('/pages/department');
    }

    onClickClear = () => {
        this.department.name = '';
        this.department.email = '';
        this.department.phone = '';
        this.department.address = '';
    }

    onClickSave = async () => {
        const date = new Date();
        this.department.create_at =  date.getTime()/1000;
        
        const user_id = localStorage.getItem('user_id');
        this.department.create_by = user_id;
        
        const departmentRegister = await this.departmentService.createDepartment(this.department);
        if (departmentRegister.errors) {
            this.is_fail = true;
        }
        else {
            this.is_success = true;
        }
        this.onClickClear();
    }

    onClose = () => {
        this.is_success = false;
        this.is_fail = false;
    }
}