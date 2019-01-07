
import { TestBed } from '@angular/core/testing';

import { SignupFormService } from './signup-form.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('SignupFormService', () => {
  let httpTestingController:HttpTestingController;
  let service:SignupFormService
  let mockHandleError;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        SignupFormService
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service= TestBed.get(SignupFormService);

});

  it('should be created', () => {
    const service: SignupFormService = TestBed.get(SignupFormService);
    expect(service).toBeTruthy();
  });

  describe("getCountries",()=>{
    it("call get to correct url",()=>{
      service.getCountries().subscribe();
       let req = httpTestingController.expectOne("http://localhost:3000/location");
             req.flush({id: 1, name: "Afghanistan",states: {
              Badakhshan: [
                  "Eshkashem",
                  "Fayzabad",
                  "Jurm",
                  "Khandud",
                  "Qal'eh-ye Panjeh"
              ]
            }
          }); 
      httpTestingController.verify();
    });

    
  })
});
 