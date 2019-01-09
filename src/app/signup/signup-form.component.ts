import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { SignupFormService } from './signup-form.service';
import { Observable, of } from 'rxjs';
import { ILocation } from 'src/api/location.model';
import { ActivatedRoute, Router} from '@angular/router';
import { SignupForm } from './signup-form';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  countryAppended:boolean = true;
  stateAppended:boolean = true;
  cityAppended:boolean = true;
  signupForm: FormGroup
  locations:ILocation[]
  errorMessage: Observable<string>;
  countries:string[]= [];
  filteredCountries: string[];
  states:string[]=[];
  cities: {}[];
  form:SignupForm

  constructor(private fb: FormBuilder,
     private signupService:SignupFormService,
     private route:ActivatedRoute,
     private router:Router) { }
  ngOnInit() {

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(12)]],
      middleName: ['', Validators.maxLength(12)],
      lastName: ['', Validators.maxLength(12)],
      email: ['', [Validators.email, Validators.required, Validators.maxLength(20)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      houseNumber: ['', Validators.maxLength(10)],
      lane: ['', [Validators.maxLength(30)]],
      area: ['', Validators.maxLength(30)],
      country: [''],
      city: [''],
      state: [''],
      zip: ['', Validators.maxLength(6)]
    });
    

      this.signupForm.patchValue(this.route.queryParams["value"])

      this.signupService.getCountries().subscribe(
       (data:ILocation[])=> {
        this.locations = data;
        console.log(this.locations)
         for(let loc of this.locations){
          this.countries.push(loc["name"]);
         } 
       },
       (err:any)=>console.log(err)
      );

      const stateControl = this.signupForm.get('state');
      stateControl.valueChanges.subscribe(
        value=>{
          this.stateAppended = true;
           this.getStates();
      },
        err=>console.log(err)
      )

      const cityControl = this.signupForm.get('city');
      cityControl.valueChanges.subscribe(
        value=>{
          this.cityAppended = true;
           this.getCities();
      },
        err=>console.log(err)
      )


      const countryControl = this.signupForm.get('country');
      countryControl.valueChanges.subscribe(
        value=>{
           this.countryAppended = true;
      },
        err=>console.log(err)
      )  
  }
 
  selectedCountry(event){   
    let that = this;
    this.signupForm.patchValue({
      country: (<HTMLElement>event.target).innerText,
    });
    this.countryAppended = false;
  }

  selectedState(event){
    this.signupForm.patchValue({
      state: (<HTMLElement>event.target).innerText,
    });
    this.stateAppended = false;
  }

  selectedCity(event){
    this.signupForm.patchValue({
      city: (<HTMLElement>event.target).innerText,
    });
    this.cityAppended = false;
  }

  getStates(){
   let country =  this.signupForm.get('country').value;
   for(let loc of this.locations){
        if(loc["name"].toLowerCase() === country.toLowerCase()){
          this.states = Object.keys(loc["states"]);
        }
   }
  }

  getCities(){
    let country =  this.signupForm.get('country').value;
    let state = this.signupForm.get('state').value;
    for(let loc of this.locations){
      if(loc["name"].toLowerCase() === country.toLowerCase()){
        this.cities= loc["states"][state]
      }
 }
  console.log(this.cities);
  }
  save(): void {
    let newUser:SignupForm = <SignupForm> this.signupForm.value;
    // newUser.userID =0;
    // console.log(newUser);
    this.signupService.addUser(newUser)
    .subscribe(
      (data:SignupForm)=>console.log(data),
      (err:any)=>console.error(err)
    )
    // this.router.navigate(['/success'])
    
  }
}
