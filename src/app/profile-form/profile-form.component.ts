import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy, OnInit, Injector, AfterViewInit, DoCheck } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgContentAst } from '@angular/compiler';

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: number;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true,
    }
  ],

  // change Detection has to be default to trigger the DoCheck lifecycle hook. 
  // note that this could potentially impact your application performance
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProfileFormComponent implements ControlValueAccessor, OnDestroy, OnInit, AfterViewInit, DoCheck {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  private ngControl: NgControl;

  get value(): ProfileFormValues {
    return this.form.value;
  }

  set value(value: ProfileFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl() {
    return this.form.controls.email;
  }

  constructor(private formBuilder: FormBuilder, private injector: Injector) {
    this.form = this.formBuilder.group({
      firstName: [],
      lastName: [],
      email: ['', Validators.required],
      matInputControl: ['', Validators.required]
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {
    // get the formcontrol
    // Note that Injection of NgCOntrol will cause dependency loop and this is why injector is used instead
    this.ngControl = this.injector.get(NgControl,null)
  }
  ngAfterViewInit() {
  }

  ngDoCheck() {
    // Mark the control as touched if the formcontrol in parent form is touch 
    // This is where the magic happens
    console.log('Do CHeck time')
    if(this.ngControl && this.ngControl.touched) {
      this.form.markAllAsTouched();
    }
    else {
      this.form.markAsUntouched();
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { profile: { valid: false, }, };
  }
}
