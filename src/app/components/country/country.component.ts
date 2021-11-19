import { Component, OnInit } from '@angular/core';
import { ApiCountry } from 'src/app/models/apiCountry';
import { CountryService } from 'src/app/services/country.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  countries: ApiCountry[];
  newCountry: ApiCountry[] =[];
  dbCountries:Country[]=[]
  selectedCountry:any = {};
  isSelected=true;
  
  countryForm:FormGroup;
  
  constructor(private countryService: CountryService,private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.getAll();
    this.countryForm = this.formBuilder.group({
      
      countryName:"",

    })

    this.getCountries();
   
  }

  getCountries() {
    console.log('a');
    this.countryService.getAllCountriesByApi().subscribe((response) => {
      this.countries = response.data;
      
    });
  }
  log() {
    console.log(this.countries);

    this.countries.forEach((c,i) => {
      
      let addedCountry:ApiCountry = {country:c.country,cities:c.cities}
      
      this.newCountry.push(addedCountry);
    });

    
  }
   
  submit(){

    let val = String(  this.countryForm.controls['countryName'].value);
  
    let addedCountry:Country={countryId:undefined,countryName:val}
    
    console.log(val);
    console.log(addedCountry);
    this.addCountry(addedCountry)
  }


  addCountry(country:Country){

    this.countryService.addCountry(country).subscribe((response=>{
      console.log(response);
    }),(err=>{
      console.log(err);
    }));
  }

  getAll(){
    this.countryService.getAll().subscribe((response) => {
      this.dbCountries = response.data;
    });
  }

  onCountryChange(){

    this.isSelected =false;
  }

}
