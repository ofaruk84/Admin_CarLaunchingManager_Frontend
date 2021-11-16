import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  cars:Car[] = [];

  carForm:FormGroup;

  constructor(private carService:CarService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.carForm = this.formBuilder.group({

      carName:"",
      carYear:""
    })

    this.getAll();

  }
  

  getAll():void{
    this.carService.getAll().subscribe((response) => {
      this.cars = response.data;
    });
  }

  submit(){
    console.log(this.carForm);
  }
}
