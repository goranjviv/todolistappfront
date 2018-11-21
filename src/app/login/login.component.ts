import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  login(): void {
    const val = this.form.value;
    console.log();

    if(val.email !== "" && val.password !== "") {
      console.log("doing the call");
      this.userService.login(val.email, val.password)
        .subscribe(
          () => {
            console.log("ok");
            this.router.navigateByUrl('/');
            console.log(this.userService.token);
          },
          error => {
            console.log("err");
            this.router.navigateByUrl('/login');
          }
        );
    }
  }

  ngOnInit() {
  }

}
