import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      password: [],
      profile: [],
      textControl:['abc',Validators.required],
      matInputControl: ['', Validators.required],
      inputField: ["", Validators.required]
    });
  }

  submit() {
    // To show error message on untouch custom control, you have to mark all control as touched in parent form
    this.signupForm.markAllAsTouched();

    console.log(this.signupForm.value);
  }

  resetForm() {
    this.signupForm.reset();
    // Seems reset does not change untouched status at all
    //this.signupForm.markAsUntouched();
  }

  getErrorMessage() {
    return this.signupForm.get('matInputControl').hasError('required') ? 'You must enter a value' :
        this.signupForm.get('matInputControl').hasError('matInputControl') ? 'Not a valid value' :
            '';
  }
}

class myClass {
  private name: string;
}



