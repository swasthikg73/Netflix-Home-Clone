declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router)
  ngOnInit(): void {
    try {
      google.accounts.id.initialize({
        client_id: "358262469433-fio7tq3jqjabqu49417ktt7q5hd5e125.apps.googleusercontent.com",
        callback: (res: any) => {
          this.handlelogin(res);
        }
      });

      google.accounts.id.renderButton(document.getElementById('google-btn'), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      })
    } catch (err) { }
  }

  decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handlelogin(response: any) {
    //decode the session
    const token = this.decodeToken(response.credential);
    //store the session
    sessionStorage.setItem('LoggiedInUser', JSON.stringify(token));
    // Navigate to the page
    this.router.navigateByUrl('home')
  }

}

