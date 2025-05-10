import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent {
  user: any;
  name: string = '';
  email: string = '';
  password: string = '';
  changeInfo: boolean = true;

  constructor(private router: Router, private userService: UserService) {
    const storedUser = sessionStorage.getItem("user");
    this.user = storedUser ? JSON.parse(storedUser) : null;
    this.name = this.user.username || "";
    this.email = this.user.email || "";
  }

  changeInfos() {
    if (this.changeInfo == false) {
      this.changeInfo = true;
      this.name = this.user.username
      this.email = this.user.email
      this.password = '';
    } else {
      this.changeInfo = false;
      alert("You can now change your account infos")
    }
  }

saveChanges() {
  const updatedUser = {
    id: this.user.id,
    username: this.name,
    email: this.email,
    password: this.password || undefined
  };

  this.userService.updateUser(updatedUser).subscribe({
    next: (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Information Updated',
        text: 'Your information has been updated successfully.'
      }).then(() => {
        sessionStorage.setItem("user", JSON.stringify({
          ...this.user,
          username: this.name,
          email: this.email
        }));
        window.location.reload();
      });
    },
    error: (error) => {
      console.error(error);
      if (error.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Email Conflict',
          text: 'Email is already in use.'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'An error occurred while updating your information.'
        });
      }
    }
  });
}

  cancelChanges() {
    if (this.user) {
      this.name = this.user.username;
      this.email = this.user.email;
      this.password = '';
      this.changeInfo = true;
    }
  }
}
