import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiCountry } from 'src/app/models/apiCountry';
import { Attendee } from 'src/app/models/attendee';
import { AttendeeRegisterModel } from 'src/app/models/attendeeRegisterModel';
import { AttendeeAuthService } from 'src/app/services/attendee-auth.service';
import { AttendeeService } from 'src/app/services/attendee.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.css']
})
export class AttendeeComponent implements OnInit {

  attendees:Attendee[]= [];
  attendeeForm:FormGroup;
  attendeeDeleteForm:FormGroup;
  countries:ApiCountry[]=[];

  constructor(private attendeeService:AttendeeService,private attendeeAuth:AttendeeAuthService,private formBuilder: FormBuilder,private countryService: CountryService) { }

  ngOnInit(): void {

    this.attendeeForm = this.formBuilder.group({

      attendeeEmail:"",
      attendeeName:"",
      attendeeJob:"",
      attendeeNationality:""
    })
    this.attendeeDeleteForm = this.formBuilder.group({

      attendeeName:""
    })

    this.getAll();
    this.getCountries();
  }

  getAll():void{

    this.attendeeService.getAll().subscribe((response) => {
      this.attendees = response.data;
      
    });
  }

  addAttendee(attendee:Attendee){
    this.attendeeService.addAttendee(attendee).subscribe((response=>{

      console.log(response);
    }),(error=>{
      console.log(error);
    }))
  }

  submit(){

    let attendeeEmail = this.attendeeForm.controls['attendeeEmail'].value;
    let attendeeNationality = String(  this.attendeeForm.controls['attendeeNationality'].value);
    let attendeeName = this.attendeeForm.controls['attendeeName'].value;
    let attendeeJob = this.attendeeForm.controls['attendeeJob'].value;
    let password = "mercedesLaunchfy"
    console.log(password)

    let addedAttendee:AttendeeRegisterModel = {email:attendeeEmail,attendeeName:attendeeName,password:password,attendeeJob:attendeeJob,attendeeNationality:attendeeNationality};
    console.log(addedAttendee);

    this.register(addedAttendee);
    //this.attendees.push(addedAttendee);

  }

  getCountries() {
   
    this.countryService.getAllCountriesByApi().subscribe((response) => {
      this.countries = response.data;
      
    });
  }

  register(attendee:AttendeeRegisterModel){

    this.attendeeAuth.register(attendee).subscribe((res=>{
      console.log(res)
    }),(err=>{
      console.log(err)
    }))
  }
  onDelete(attendee:Attendee){
    
  }
}
