import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  prenom: string = '';
  nom: string = '';
  adresse: string = '';
  telephone: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  selectedTypes: number[] = [];  // Tableau des ID des types de culture sélectionnés
  typesCultures: any[] = [];
  showPassword = false;
  showConfirmPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Charger les types de cultures depuis le backend
    this.authService.getTypesCultures().subscribe(data => {
      this.typesCultures = data;
    });
  }

  onTypeCultureChange(event: any): void {
    const checked = event.target.checked;
    const value = +event.target.value;

    if (checked) {
      this.selectedTypes.push(value);  // Ajouter l'ID du type de culture sélectionné
    } else {
      const index = this.selectedTypes.indexOf(value);
      if (index !== -1) {
        this.selectedTypes.splice(index, 1);  // Supprimer l'ID du type de culture décoché
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.password === this.confirmPassword) {
      const user = {
        prenom: this.prenom,
        nom: this.nom,
        adresse: this.adresse,
        telephone: this.telephone,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword,
        types_culture_pratiques: this.selectedTypes,
        role: 'agriculteur'
      };
  
      this.authService.register(user).subscribe({
        next: () => {
          // Rediriger avec un message de succès
          this.router.navigate(['/login'], {
            queryParams: { registered: 'true' }
          });
        },
        error: (err) => console.error(err)
      });
    } else {
      alert("Les mots de passe ne correspondent pas.");
    }
  }
  
  
  showNotification(): void {
    const notification = document.getElementById("successNotification");
    if (notification) {
      notification.style.visibility = "visible";
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }
  }

  register() {
    console.log({
      nom: this.nom,
      prenom: this.prenom,
      adresse: this.adresse,
      telephone: this.telephone,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      cultures: this.selectedTypes
    });
  }

}
