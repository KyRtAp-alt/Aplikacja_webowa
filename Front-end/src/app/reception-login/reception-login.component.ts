import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardRreceptionService } from '../auth-guard-rreception.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reception-login',
  templateUrl: './reception-login.component.html',
  styleUrls: ['./reception-login.component.scss'],
})
export class ReceptionLoginComponent implements OnInit {
  loginForm!: FormGroup;
  showErrorMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private authGuardRreceptionService: AuthGuardRreceptionService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Recepcja logowanie');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const username = this.loginForm?.get('username')?.value ?? '';
    const password = this.loginForm?.get('password')?.value ?? '';

    if (username === 'admin' && password === '321') {
      this.authGuardRreceptionService.login(username, password);
      this.router.navigate(['/recepcja-stronaglowna']);
    } else {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 10000);
      console.log('Błędne dane logowania');
    }
  }
}
