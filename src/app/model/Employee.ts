export class EmployeeModel {
    empID : number;
    name : string ;
    city : string ;
    state : string;
    email: string;
    contact: string;
    address:string;
    pinCode:string;

    constructor (){
        this.empID= 1,
        this.name='',
        this.city='', 
        this.state='',
        this.email='',
        this.contact='',
        this.address='',
        this.pinCode=''
    }
}