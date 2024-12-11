import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router : Router) {
    // Vérifier si un token est déjà présent dans le localStorage au chargement de l'application
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);  // Définit l'état d'authentification basé sur la présence du token
  }

  // Observable pour suivre l'état d'authentification
  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Méthode pour se connecter
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Méthode pour gérer la connexion après réception du token
  handleLoginResponse(token: string, redirectUrl: string) {
    localStorage.setItem('auth_token', token);
    this.isAuthenticatedSubject.next(true); 
    this.router.navigate([redirectUrl]);  // Redirige l'utilisateur
  }
  

  // Méthode pour se déconnecter
  logout() {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false); // L'utilisateur est déconnecté
  }

  // Méthode d'inscription
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Méthode pour récupérer les types de cultures
  getTypesCultures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/types-cultures`);
  }
  
}
