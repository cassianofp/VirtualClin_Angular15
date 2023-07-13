import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { PacienteService } from '../services/paciente.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {

  empForm: FormGroup;

  constructor(private builder: FormBuilder, private service: PacienteService, private toastr: ToastrService, private dialogRef: MatDialogRef<EmpAddEditComponent>) {
    this.empForm = this.builder.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      genero: '',
    });
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      this.service.addPaciente(this.empForm.value).subscribe({
        next: (val: any) => {
          this.toastr.success('Paciente cadastrado');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    } else {
      this.toastr.warning('Por Favor selecione as informações corretamente');
    }
  }

}


