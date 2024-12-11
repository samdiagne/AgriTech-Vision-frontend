import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  showSuccessNotification: boolean = false;

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordInput = <HTMLInputElement>document.getElementById('password');
    if (passwordInput) {
      passwordInput.type = this.isPasswordVisible ? 'text' : 'password';
    }
  }

  constructor(private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: { [key: string]: string }) => {
      if (params['registered'] === 'true') {
        this.showSuccessNotification = true;
        setTimeout(() => {
          this.showSuccessNotification = false;
        }, 6000); // Notification disparaît après 3 secondes
      }
    });
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const { token, redirect } = response;
        
        // Gestion de la réponse de connexion
        this.authService.handleLoginResponse(token, redirect);
      },
      (error) => {
        console.error('Erreur de connexion', error);
        // Afficher un message d'erreur
      }
    );
  }
}
