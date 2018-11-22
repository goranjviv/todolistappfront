import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private messagesService: MessagesService
    ) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  login(): void {
    const val = this.form.value;

    if(val.email !== "" && val.password !== "") {
      this.userService.login(val.email, val.password)
        .subscribe(
          () => {
            this.messagesService.push("Login successful!");
            this.router.navigateByUrl('/');
          },
          error => {
            this.messagesService.push("Login unsuccessful!");
            this.router.navigateByUrl('/login');
          }
        );
    }
  }

  ngOnInit() {
  }

}
