import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SignupFormComponent } from './signup/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './signup/location.filter.pipe';

describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        RouterModule.forRoot([
          {path:'signup', component:SignupFormComponent},
          {path:'', redirectTo:'signup', pathMatch:'full'}
        ])
      ],
      declarations: [
        AppComponent,
        SignupFormComponent,
        FilterPipe
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
 
  it(`should have as title 'Assignment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    console.log(app.title)
    expect(app.title).toEqual('Assignment');
  });

  xit('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Assignment!');
  }); 
});
