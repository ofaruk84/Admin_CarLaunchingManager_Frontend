import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:User[] = [];
  filteredUsers:User[] = [];

  userForm:FormGroup;
  userDeleteForm:FormGroup;
  userUpdateForm:FormGroup;
  
  deletedUser:User = {};

  updateBoolean:boolean = false;

  dummy:any={};

  currentId = 0;


  currentUser:User={userId:undefined,userName:"",email:"",password:"",isAdmin:true};
  constructor(private userService:UserService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      username:"",
      email:"",
      password:"",
      admin:""

    })
    this.userDeleteForm = this.formBuilder.group({
      usernameDelete:""
    })
    this.userUpdateForm = this.formBuilder.group({

      usernameDropdown:"",
      username:"",
      email:"",
      password:"",
      admin:""

    })

    this.getAll();
  }

  getAll():void{

    this.userService.getAll().subscribe((response) => {
      this.users = response.data;
      
    },(err=>{
        console.log(err);
    }));
  }

  add(user:User):void{

    this.userService.addUser(user).subscribe((response) => {
      
      console.log(response)
      
    },(err=>{
        console.log(err);
    }));
  }

  delete(user:User):void{

    this.userService.deleteUser(user).subscribe((response) => {
      
      console.log(response)
      
    },(err=>{
        console.log(err);
    }));
  }


  submit(){

    let username = this.userForm.controls['username'].value;
    let email = this.userForm.controls['email'].value;
    let password = this.userForm.controls['password'].value;

    let stringAdmin =String (this.userForm.controls['admin'].value);
    let admin = this.getBoolean(stringAdmin);

    var addedUser:User = {userId:undefined,userName:username,email:email,password:password,isAdmin:admin}
    console.log(addedUser);

    this.add(addedUser);
  }

  getBoolean(value:string):boolean{

    let res:boolean = false;

    if(value=="true"){
      res = true
    }

    return res;

  }

  deleteSubmit(){

    let username = String(this.userDeleteForm.controls['usernameDelete'].value).trim();
   
    
    this.deleteByUsername(username);

  }



  deleteByUsername(username:string){

    this.userService.deleteByUsername(username).subscribe((response) => {
      
      console.log(response)
      
    },(err=>{
        console.log(err);
    }));

  }

   getByUsername(username:string){

     this.userService.getByUsername(username).subscribe((response) => {
      
      this.currentUser = response.data;
      console.log(response)
      
      this.dummy = response;
      
    },(err=>{
        console.log(err);
    }));
  }

  updateSubmit(){

    let stringAdmin =String (this.userUpdateForm.controls['admin'].value);
    let admin = this.getBoolean(stringAdmin);


    let updatedUser:User = {userId:this.currentId,
      userName:this.userUpdateForm.controls['username'].value,
      email:this.userUpdateForm.controls['email'].value,
      password:this.userUpdateForm.controls['password'].value,
      isAdmin:admin};

      console.log(updatedUser);

      this.userService.update(updatedUser).subscribe((response)=>{

        console.log(response);
      });

    }



   onUsernameChange(){
    this.updateBoolean = true;
    let username =String(this.userUpdateForm.controls['usernameDropdown'].value).trim();
    
    let id = 0;
    // this.getByUsername(username)

    //console.log(this.currentUser);
    
    this.userService.getByUsername(username).subscribe((response) => {
      
      this.currentUser = response.data;
      console.log(response)
      
      this.dummy = response;
      
    },(err=>{
        console.log(err);
    }),()=>{

      console.log(this.currentUser);
      console.log(this.currentUser.userName?.trim().length);

      this.currentId = this.currentUser.userId!;
      this.userUpdateForm.controls['username'].setValue(this.currentUser.userName?.trim());
      this.userUpdateForm.controls['email'].setValue(this.currentUser.email?.trim());
      this.userUpdateForm.controls['password'].setValue(this.currentUser.password?.trim());
      this.userUpdateForm.controls['admin'].setValue(String(this.currentUser.isAdmin?.valueOf));
    });
     
    
  }


 

}
