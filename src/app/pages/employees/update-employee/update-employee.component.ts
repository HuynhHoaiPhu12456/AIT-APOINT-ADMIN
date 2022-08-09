import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbDateService } from "@nebular/theme";
import { Observable, of } from "rxjs";
import { DepartmentService } from "../../../service/department.service";
import { EmployeeService } from "../../../service/employee.service";
import { UserService } from "../../../service/user.service";

@Component({
    selector: 'common-employee-update',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
    employee_id: any;
    employee: any;             // save current employee data
    new_employee: any;         // save input data
    departments = [];
    employees = [];
    users = [];
    is_success = false;
    is_fail = false;

    max: Date;
    filterdUsers$: Observable<string[]>;
    is_show_save = false;
    is_show_clear = true;
    is_show_unchanged = false;

    constructor(
        private route: ActivatedRoute,
        private employeeService: EmployeeService,
        private departmentService: DepartmentService,
        private userService: UserService,
        private dateService: NbDateService<Date>,
        private _location: Location
    ) { }

    async ngOnInit() {
        this.employee = {
            user_id: '',
            date_of_birth: null,
            gender: '',
            phone: '',
            address: '',
            dept_id: [],
            total_point: null,
        };
        this.new_employee = {
            user_id: '',
            date_of_birth: null,
            gender: '',
            phone: '',
            address: '',
            dept_id: [],
            total_point: null,
        };
        this.max = this.dateService.addDay(this.dateService.today(), 0);
        this.route.paramMap.subscribe( params => {
            this.employee_id = params['params']['id'];
        });
        await this.getOneEmployee(this.employee_id)
        await this.setupForm();
        this.filterdUsers$ = of(this.users);
        this.setupData();
    }

    setupData = async () => {
        this.new_employee = {
            _id: this.employee._id,
            user_id: this.employee.user_id,
            date_of_birth: this.employee.date_of_birth*1000,
            gender: this.employee.gender,
            phone: this.employee.phone,
            address: this.employee.address,
            dept_id: this.employee.dept_id,
            total_point: this.employee.total_point,
        }
    }

    getOneEmployee = async (id) => {
        this.employee = await (await this.employeeService.getOneEmployee(id)).data['oneEmployee'];
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
        let idx = 1;
        for (let i in user) {
            if (user[i]._id === this.employee.user_id) {
                this.users[0] = {
                    name: user[i].name + '\n(' + user[i].email + ')',
                    value: user[i]._id,
                }
            }
            else if (!(this.employees.includes(user[i]._id))) {
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
        this.onChangeValue();
    }

    onChangeValue = () => { 
        // console.log("Change:\n",this.new_employee.user_id, this.employee.user_id,'\n',
        // this.new_employee.date_of_birth, this.employee.date_of_birth*1000,'\n',
        // this.new_employee.address, this.employee.address, '\n',
        // this.new_employee.gender, this.employee.gender, '\n',
        // this.new_employee.phone, this.employee.phone, '\n',
        // this.new_employee.total_point, this.employee.total_point,'\n',
        // this.new_employee.dept_id.length, this.employee.dept_id.length)
        if (
            this.new_employee.user_id       === ''      &&
            this.new_employee.date_of_birth === null    &&
            this.new_employee.address       === ''      &&
            this.new_employee.gender        === ''      &&
            this.new_employee.phone         === ''      &&
            this.new_employee.dept_id.length === 0      &&
            this.new_employee.total_point   === null
        ) {
            this.is_show_clear = false;
            this.is_show_save = false;
            this.is_show_unchanged = true;
        }
        else if (
            this.new_employee.user_id       === ''      ||
            this.new_employee.date_of_birth === null    ||
            this.new_employee.address       === ''      ||
            this.new_employee.gender        === ''      ||
            this.new_employee.phone         === ''      ||
            this.new_employee.dept_id.length === 0      ||
            this.new_employee.total_point   === null
        ) {
            this.is_show_clear = true;
            this.is_show_save = false;
            this.is_show_unchanged = true;
        }
        else if (
            this.new_employee.user_id       !== this.employee.user_id       ||
            this.new_employee.date_of_birth !== this.employee.date_of_birth*1000 ||
            this.new_employee.address       !== this.employee.address       ||
            this.new_employee.gender        !== this.employee.gender        ||
            this.new_employee.phone         !== this.employee.phone         ||
            this.new_employee.dept_id.length !== this.employee.dept_id.length ||
            (this.new_employee.total_point  !== this.employee.total_point   &&
                this.new_employee.total_point  >= 0)
        ) {
            this.is_show_clear = true;
            this.is_show_save = true;
            this.is_show_unchanged = true;
        }
        else {
            this.is_show_clear = true;
            this.is_show_save = false;
            if (this.new_employee.total_point < 0) {
                this.is_show_unchanged = true;
            }
            else {
                this.is_show_unchanged = false;
            }
        }
    }
    
    onClickBack = () => {
        console.log("Back!!!");
        // this.router.navigateByUrl('/pages/employee');
        this._location.back();
    }

    onClickUnchange = () => {
        this.new_employee.user_id = this.employee.user_id;
        this.new_employee.gender = this.employee.gender;
        this.new_employee.phone = this.employee.phone;
        this.new_employee.address = this.employee.address;
        this.new_employee.dept_id = this.employee.dept_id;
        this.new_employee.date_of_birth = this.employee.date_of_birth*1000;
        this.new_employee.total_point = this.employee.total_point;

        this.is_show_unchanged = false;
        this.is_show_save = false;
        this.is_show_clear = true;
    }

    onClickClear = () => {
        this.new_employee.user_id = '';
        this.new_employee.gender = '';
        this.new_employee.phone = '';
        this.new_employee.address = '';
        this.new_employee.dept_id = [];
        this.new_employee.date_of_birth = null;
        this.new_employee.total_point = null;

        this.is_show_clear = false;
        this.is_show_save = false;
        this.is_show_unchanged = true;
    }

    onClickSave = async () => {
        const date = new Date();
        this.new_employee.change_at =  date.getTime()/1000;
        
        const user_id = localStorage.getItem('user_id');
        this.new_employee.change_by = user_id;

        this.new_employee.date_of_birth = (new Date(this.new_employee.date_of_birth)).getTime()/1000;
        console.log("employee => ", this.new_employee);
        const employeeUpdate = await this.employeeService.setEmployee(this.new_employee);
        if (employeeUpdate.errors) {
            this.is_fail = true;
        }
        else {
            this.is_success = true;
        }
        this.is_show_unchanged = false;
        this.is_show_save = false;
        this.is_show_clear = true;
        this.setupForm();
    }

    onClose = () => {
        this.is_success = false;
        this.is_fail = false;
    }
}