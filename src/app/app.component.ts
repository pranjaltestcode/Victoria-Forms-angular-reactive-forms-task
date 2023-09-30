import { Component, VERSION } from '@angular/core';
import { NameInfoService } from './services/name-info.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


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
    nameInfoService.getNameInfo('').subscribe((a) => {
      this.nameMessage = a;
    });
  }

  ngOnInit(): void {
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
