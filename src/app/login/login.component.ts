import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private service: AuthService, private router: Router, private toastr: ToastrService) {
    sessionStorage.clear();
  }
  userdata:any;

  loginform = this.builder.group({
    username:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetByCode(this.loginform.value.username).subscribe(item => {
        this.userdata = item;
        //console.log(this.userdata);
        if (this.userdata.password === this.loginform.value.password) {
          if (this.userdata.isactive) {
            sessionStorage.setItem('username',this.userdata.username);
            sessionStorage.setItem('role',this.userdata.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Por favor contate o administrador', 'Pendente aprovação');
          }
        } else {
          this.toastr.error('Dados incorretos');
        }
      });
    } else {
      this.toastr.warning('Por favor, insira informações válidas')
    }
  }
}

