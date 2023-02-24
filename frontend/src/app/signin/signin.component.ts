import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ApiResponse {
  email: string;
  token: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  email: string = '';
  password: string = '';
  response: ApiResponse | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http
      .post<ApiResponse>(
        'http://localhost:3000/signin',
        { email: this.email, password: this.password },
        { withCredentials: true }
      )
      .subscribe(
        (response: any) => {
          const token = response.token;
          localStorage.setItem('jwt', token);
          this.router.navigate(['/home']);
        },
        (error: any) => console.error(error)
      );
  }
}
