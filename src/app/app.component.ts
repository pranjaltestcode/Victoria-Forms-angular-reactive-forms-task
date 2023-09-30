import { Component, VERSION } from '@angular/core';
import { NameInfoService } from './services/name-info.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

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
        fullname: ['', Validators.required],

        email: ['', [Validators.required, Validators.email]],
        email2: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
      },
      {
        
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

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
