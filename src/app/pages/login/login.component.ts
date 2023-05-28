import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { obtenerErroresGenerico, parsearErroresAPI } from 'src/app/helpers/helpers';
import { SecurityService } from 'src/app/security/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  hide = true;
  isLoading = false;
  errores: string[] = [];

  isChecked: boolean;

  constructor(
    private securityService: SecurityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.isActived();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      correo: [
        localStorage.getItem('correo') || '',
        [Validators.required, Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });
  }

  login() {
    this.isLoading = true;

    this.securityService.login(this.form.value).subscribe({
      next: (response) => {
        this.isLoading = false;

        this.securityService.guardarToken(response);

        this.isRemember();
        this.router.navigate(['/static/home-page']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  isRemember() {
    if (this.form.get('remember')?.value) {
      localStorage.setItem('correo', this.form.get('correo')?.value);
    } else {
      localStorage.removeItem('correo');
    }
  }

  isActived() {
    if (localStorage.getItem('correo') !== null) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  obtenerErrorGenerico(
    nombreCampo: string,
    nombreMostrar: string,
    minLength?: number,
    maxLength?: number
  ): string {
    return obtenerErroresGenerico(
      nombreCampo,
      nombreMostrar,
      this.form,
      minLength,
      maxLength
    );
  }
}
