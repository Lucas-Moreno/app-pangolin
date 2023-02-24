import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ApiResponse {
  message: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  response: ApiResponse | undefined;


  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post<ApiResponse>('http://localhost:3000/signup', { name: this.name, email: this.email, password: this.password })
      .subscribe(
        (response: ApiResponse) => {
          this.response = response;
          console.log(this.response);
          this.router.navigate(['/signin']);
        },
        (error: any) => console.error(error)
      );
  }
}