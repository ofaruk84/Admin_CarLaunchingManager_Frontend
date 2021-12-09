import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiCountry } from 'src/app/models/apiCountry';
import { Attendee } from 'src/app/models/attendee';
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
  countries:ApiCountry[]=[];

  constructor(private attendeeService:AttendeeService,private formBuilder: FormBuilder,private countryService: CountryService) { }

  ngOnInit(): void {

    this.attendeeForm = this.formBuilder.group({

      attendeeName:"",
      attendeeJob:"",
      attendeeNationality:""
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

    let attendeeNationality = String(  this.attendeeForm.controls['attendeeNationality'].value);
    let attendeeName = this.attendeeForm.controls['attendeeName'].value;
    let attendeeJob = this.attendeeForm.controls['attendeeJob'].value;

    let addedAttendee:Attendee = {attendeeId:undefined,attendeeName:attendeeName,attendeeJob:attendeeJob,attendeeNationality:attendeeNationality};
    console.log(addedAttendee);

    this.addAttendee(addedAttendee);
    this.attendees.push(addedAttendee);

  }

  getCountries() {
   
    this.countryService.getAllCountriesByApi().subscribe((response) => {
      this.countries = response.data;
      
    });
  }
}
