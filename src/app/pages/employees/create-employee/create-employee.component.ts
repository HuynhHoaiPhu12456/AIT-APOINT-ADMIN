import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbDateService } from "@nebular/theme";
import { Observable, of } from "rxjs";
import { DepartmentService } from "../../../service/department.service";
import { EmployeeService } from "../../../service/employee.service";
import { UserService } from "../../../service/user.service";

@Component({
    selector: 'common-employee-create',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {

    employee: any;
    departments = [];
    employees = [];
    users = [];
    is_success = false;
    is_fail = false;

    max: Date;
    filterdUsers$: Observable<string[]>;
    is_show_save = false;
    is_show_clear = false;

    constructor(
        private router: Router,
        private employeeService: EmployeeService,
        private departmentService: DepartmentService,
        private userService: UserService,
        private dateService: NbDateService<Date>,
    ) { }

    async ngOnInit() {
        this.employee = {
            user_id: '',
            date_of_birth: null,
            gender: '',
            phone: '',
            address: '',
            dept_id: [],
            total_point: 0,
        };
        this.max = this.dateService.addDay(this.dateService.today(), 0);
        await this.setupForm();
        this.filterdUsers$ = of(this.users);
    }

    /**
     * Get department list for nb-select
     * Get user id for Name input
     */
    setupForm = async () => {
        const emps = await (await this.employeeService.getEmployeeList()).data['employee']; 
        for (let i in emps) {
            this.employees[i] = emps[i].user_id;
        }
        
        const depts = await (await this.departmentService.getDepartmentList()).data['department'];
        for (let i in depts) {
            let item = {
                name: depts[i].name,
                value: depts[i]._id
            }
            this.departments[i] = item;
        }
        
        const user = await (await this.userService.getUserList()).data['user'];
        let idx = 0;
        for (let i in user) {
            if (!(this.employees.includes(user[i]._id))) {
                let item = {
                    name: user[i].name + '\n(' + user[i].email + ')',
                    value: user[i]._id, 
                }
                this.users[idx] = item;
                idx++;
            }
        } 
    }

    /**
     * filter input for Name ID 
     */
    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.users.filter( user => user.name.toLowerCase().includes(filterValue));
      }

    onNameChange = (value: string) => {
        this.filterdUsers$ = of (this.filter(value));
        if (value !== '') {
            this.is_show_clear = true;
        }
    }

    onChangeValue = () => {
        if (
            this.employee.user_id       === ''      &&
            this.employee.date_of_birth === null    &&
            this.employee.address       === ''      &&
            this.employee.gender        === ''      &&
            this.employee.phone         === ''      &&
            this.employee.dept_id.length === 0
        ) {
            this.is_show_clear = false;
            this.is_show_save = false;
        }
        else if (
            this.employee.user_id       === ''      ||
            this.employee.date_of_birth === null    ||
            this.employee.address       === ''      ||
            this.employee.gender        === ''      ||
            this.employee.phone         === ''      ||
            this.employee.dept_id.length === 0
        ) {
            this.is_show_clear = true;
            this.is_show_save = false;
        }
        else {
            this.is_show_clear = true;
            this.is_show_save = true;
        }
    }
    
    onClickBack = () => {
        console.log("Back!!!");
        this.router.navigateByUrl('/pages/employee');
    }

    onClickClear = () => {
        this.employee.user_id = '';
        this.employee.gender = '';
        this.employee.phone = '';
        this.employee.address = '';
        this.employee.dept_id = [];
        this.employee.date_of_birth = null;

        this.is_show_clear = false;
        this.is_show_save = false;
    }

    onClickSave = async () => {
        const date = new Date();
        this.employee.create_at =  date.getTime()/1000;
        
        const user_id = localStorage.getItem('user_id');
        this.employee.create_by = user_id;

        this.employee.date_of_birth = (new Date(this.employee.date_of_birth)).getTime()/1000;
        console.log("employee => ", this.employee);
        const employeeRegister = await this.employeeService.createEmployee(this.employee);
        if (employeeRegister.errors) {
            this.is_fail = true;
        }
        else {
            this.is_success = true;
        }
        this.onClickClear();
        this.setupForm();
    }

    onClose = () => {
        this.is_success = false;
        this.is_fail = false;
    }
}