import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router, private toastr: ToastrService) {

  }

  registerform=this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(2)])), 
    password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(8)])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  proceedregister() {
    if (this.registerform.valid){
      this.service.Proceedregister(this.registerform.value).subscribe(result => {
        this.toastr.success('Seu registro foi submetido para aprovação','Registro enviado')
        this.router.navigate(['login'])
      });
    }else{
      this.toastr.warning('Por favor, insira as informações corretamente')
    }
  }

}
