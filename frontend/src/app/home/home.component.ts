import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

interface ApiResponse {
  email: string;
  token: string;
}

interface ProfileResponse {
  name: string;
  email: string;
  role: string;
  friend: string[];
  friends: string[];
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  formProfile: FormGroup;
  formRole: FormGroup;
  formFriends: FormGroup;
  profileData: any;
  pangolinData: any;
  friends: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {

    this.formProfile = this.fb.group({
      name: '',
      email: '',
      password: ''
    });

    this.formRole = this.fb.group({
      role: ''
    });

    this.formFriends = this.fb.group({
      friends: ''
    });

  }

  ngOnInit() {
    this.http.get<ProfileResponse>('http://localhost:3000/me', { withCredentials: true })
      .subscribe(
        (response: ProfileResponse) => {
          this.profileData = response;
          this.formProfile.patchValue({
            name: response.name,
            email: response.email,
            friend: response.friend
          });
          this.formRole.patchValue({
            role: response.role
          })
        },
        (error: any) => console.error(error)
      );

    this.http.get<ProfileResponse>('http://localhost:3000/pangolins', { withCredentials: true })
      .subscribe(
        (response: ProfileResponse) => {
          this.pangolinData = response;
        },
        (error: any) => console.error(error)
      );

    this.refreshFriendsList();
  }

  refreshFriendsList() {
    this.http.get<ProfileResponse>('http://localhost:3000/me', { withCredentials: true })
      .subscribe(
        (response: ProfileResponse) => {
          this.friends = response.friends;
        },
        (error: any) => console.error(error)
      );
  }

  onProfileFormSubmit() {

    if (this.formProfile.valid) {
      this.http.put<ApiResponse>('http://localhost:3000/me', { name: this.formProfile.value.name, email: this.formProfile.value.email, password: this.formProfile.value.password }, { withCredentials: true })
        .subscribe(
          (response: any) => console.log(response),
          (error: any) => console.error(error)
        );
    }
  }
  onRoleFormSubmit() {
    if (this.formRole.valid) {
      this.http.put('http://localhost:3000/me/role', { role: this.formRole.value.role }, { withCredentials: true })
        .subscribe(
          (response: any) => console.log(response),
          (error: any) => console.error(error)
        );
    }
  }

  onFriendsFormSubmit(pangolinId: string) {
    if (this.formFriends.valid) {
      this.http.post(`http://localhost:3000/me/friends/${pangolinId}`, {}, { withCredentials: true })
        .subscribe(
          (response: any) => {
            console.log('hi', response);
            this.refreshFriendsList();
          },
          (error: any) => console.error(error)
        );
    }
  }


  onFriendsFormDelete(pangolinId: string) {
    if (this.formFriends.valid) {
      this.http.delete(`http://localhost:3000/me/friends/${pangolinId}`, { withCredentials: true })
        .subscribe(
          (response: any) => {
            console.log('hi', response);
            this.refreshFriendsList();
          },
          (error: any) => console.error(error)
        );
    }
  }

}
