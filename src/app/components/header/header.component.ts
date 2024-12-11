import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    // S'abonner à l'état d'authentification
    this.authService.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
    });
  }

  logout(): void {
    // Supprimer le token et rediriger
    localStorage.removeItem('auth_token');
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
