@Component({
    moduleId: __moduleName,
    selector: 'simple-form',
    templateUrl: 'simple-form.component.html',
    styleUrls: ['simple-form.component.css'],
    // Here we tell Angular that we want the form
    // directives to be available in this component
    directives: [FORM_DIRECTIVES]
})

export class RegisterFormComponent {

    constructor(private http: Http) { }

    registerUser(user) {
        let data = JSON.stringify(user);
        this.http.post(CREATE_USER_ENDPOINT, data)
            .subscribe(
            data => alert('Your account has been created!'),
            error => alert(error.json().message)
            );
    }
}

export class ValidatedFormComponent {

  registrationForm: ControlGroup;
  email: Control;
  password: Control;
  submitAttempt: boolean = false;

  constructor(private http: Http, private builder: FormBuilder) {

    // Synchronous validators are passed in as the second
    // argument to our Controls
    this.email = new Control('', Validators.required)
    // If we want to use more than one synchronous validators, we need to compose them
    this.password = new Control('', Validators.compose([Validators.required, Validators.minLength(8)]))

    this.registrationForm = builder.group({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

