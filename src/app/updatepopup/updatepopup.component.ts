import { Component, OnInit, Inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import {NgFor} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../service/auth.service'
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit{
  constructor(private builder:FormBuilder,private service:AuthService, @Inject(MAT_DIALOG_DATA) public data:any, private toastr:ToastrService, private dialog:MatDialogRef<UpdatepopupComponent>){
    
  }

  editdata:any;
  rolelist:any;
  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res=>{
      this.rolelist=res;
    })
    if(this.data.usercode!=null && this.data.usercode!=''){
      this.service.GetByCode(this.data.usercode).subscribe(res=>{
        this.editdata = res;
        this.registerform.setValue({id:this.editdata.id, name:this.editdata.name, email:this.editdata.email, password:this.editdata.password, role:this.editdata.role, isactive:this.editdata.isactive})
      });
    }
  }
  
  registerform=this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''), 
    password: this.builder.control(''),
    email: this.builder.control(''),
    role: this.builder.control('',Validators.required),
    isactive: this.builder.control(false)
  });

  UpdateUser(){
    if(this.registerform.valid){
      this.service.Updateuser(this.registerform.value.id,this.registerform.value).subscribe(res=>{
        this.toastr.success('Informações Atualizadas');
        this.dialog.close();
      });
    }else{
      this.toastr.warning('Por Favor selecione as informações corretamente');
    }
  }


}
