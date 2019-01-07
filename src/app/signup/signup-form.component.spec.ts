 import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FilterPipe } from './location.filter.pipe';
import { SignupFormService } from './signup-form.service';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let mockSignupService, mockActivatedRoute, Location;

  let countries, states, cities;
  beforeEach(async(() => {
    Location = [{id: 1, name: "Afghanistan",states: {
      Badakhshan: [
          "Eshkashem",
          "Fayzabad",
          "Jurm",
          "Khandud",
          "Qal'eh-ye Panjeh"
      ]
    }
  }, {
    id: 101,
    name: "India",
    states: {
      "Andaman and Nicobar Islands": [
        "Bombuflat",
        "Garacharma",
        "Port Blair",
        "Rangat"
      ]
  }
}];
    mockSignupService = jasmine.createSpyObj(['getCountries']);
    mockActivatedRoute = {
      queryParams:{ value:{ firstName:'vinay', lastName:'Ajay'}}
    }
    TestBed.configureTestingModule({
      declarations: [ 
        SignupFormComponent,
        FilterPipe
      ],
      imports:[
        ReactiveFormsModule
      ],
      providers:[
        {provide:SignupFormService, useValue:mockSignupService},
        {provide:ActivatedRoute, useValue:mockActivatedRoute},
      ],
      schemas: [NO_ERRORS_SCHEMA]
      
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    component.locations = mockSignupService.getCountries.and.returnValue(of(Location));
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });
  it('form is valid when mandatory fields are given',()=>{
    component.signupForm.patchValue({
      firstName:"vinay",
      email:"vinay@gmail.com",
      phoneNumber:"2345678"
    })
    expect(component.signupForm.valid).toBeTruthy();
  })

  it('should call valuechanges by country ',()=>{
     const countryElement = fixture.debugElement.query(By.css('input[formControlName="country"]'));
    countryElement.nativeElement.value = "afg";
    countryElement.nativeElement.dispatchEvent(new Event('input'))
    fixture.detectChanges();
    expect(component.countryAppended).toBeTruthy();
  })
  it('should return location by calling getCountries',()=>{
    console.log(component.locations);
    for(let loc of component.locations){
      console.log(loc["name"]);
      component.countries.push(loc["name"])
    }
      // component.countries.push(...component.locations["name"])
    expect(component.countries[0]).toBe(Location[0].name);
  })
  
  it('should call valuechanges by state ',()=>{
    spyOn(component,"getStates");
    const stateElement = fixture.debugElement.query(By.css('input[formControlName="state"]'));
    stateElement.nativeElement.dispatchEvent(new Event('input')) 
   fixture.detectChanges();
   fixture.whenStable().then(() => {
    expect(component.getStates()).toHaveBeenCalled();
  })
 });
 it('should return the states by calling getStates',()=>{
  let country = "India"
  for(let loc of component.locations){
    if(loc["name"].toLowerCase() === country.toLowerCase()){
      component.states = Object.keys(loc["states"])
    }
  }
  expect(component.states).toEqual(Object.keys(Location[1].states));
 })
 it('should call valuechanges by city',()=>{
  const cityElement = fixture.debugElement.query(By.css('input[formControlName="city"]'));
  cityElement.nativeElement.dispatchEvent(new Event('input')) 
 fixture.detectChanges();
 fixture.whenStable().then(() => {
  expect(component.getCities()).toHaveBeenCalled();
  })
})

it('should return the cities by calling getCities',()=>{
  let country = "India"
  let state = "Andaman and Nicobar Islands"
  for(let loc of component.locations){
    if(loc["name"].toLowerCase() === country.toLowerCase()){
      component.cities= loc["states"][state]
    }
  }
  expect(component.cities.length).toEqual(4);
 })
});
 