import { Component, VERSION } from '@angular/core';
import { NameInfoService } from './services/name-info.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


// Custom validator function
function emailMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const email = control.get('email');
  const repeatEmail = control.get('email2');

  if (email.value !== repeatEmail.value) {
    return { emailMismatch: true };
  }

  return null;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  nameMessage: string;
  form: FormGroup;
  submitted = false;

  constructor(
    private nameInfoService: NameInfoService,
    private formBuilder: FormBuilder
  ) {
    
  }

  ngOnInit(): void {
    //Construct a `FormGroup` for the four fields
    this.form = this.formBuilder.group(
      {
        fullname: ['', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/),
        ]],

        email: ['', [Validators.required, Validators.email]],
        email2: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ],
        ],
      },
      {
        validator: emailMatchValidator
      }
    );



    //debounce the user's input on the `name` control (500ms) and then call the `getNameInfo` method, passing the value from the name control. The returned message should be assigned to `nameMessage`
    this.form.get('fullname').valueChanges
      .pipe(
        debounceTime(500), // Debounce user input for 500ms
        distinctUntilChanged(), // Ensure the input has changed
        switchMap((name: string) => this.nameInfoService.getNameInfo(name)) // service method call
      )
      .subscribe((message: string) => {
        this.nameMessage = message; // Assign the returned message to nameMessage
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    debugger;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }


  


  

}
