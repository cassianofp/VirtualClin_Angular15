import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { PacienteService } from '../services/paciente.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dialog: MatDialog, private service: PacienteService, private toastr: ToastrService) {
    this.getPacienteList();
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'genero', 'action'];
  dataSource:any;
  pacientelist:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPacienteList() {
    this.service.getPacienteList().subscribe(res =>{
        this.pacientelist = res;
        this.dataSource = new MatTableDataSource(this.pacientelist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    })
  }

  openAddEditEmpForm() {
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getPacienteList();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePaciente(id:any){
    this.service.deletePaciente(id).subscribe({
      next: (res)=>{
        this.toastr.success('Paciente deletado');
        this.getPacienteList();
      },
      error: console.log,
    })
  }


}
