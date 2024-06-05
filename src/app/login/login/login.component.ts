import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  user?: any;
  //authService = inject(AuthService);
  // constructor() {
  //   this.authService
  //   .login({
  //     username: 'emilys',
  //     password: 'emilyspass'})
  //     .subscribe((r) => {
  //       this.authService.getcurrentAuthUser().subscribe((r) =>{
  //          console.log(r);
  //          this.user = r;
  //       });
  //     }
  //     );
  // }
  constructor(private authService: AuthService) {
 }

 ngOnInit(): void {
  this.authService.getCurrentAuthUser().subscribe({
    next: (r) => {
      this.user = r;
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}