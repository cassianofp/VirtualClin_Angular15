import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:3000/user';

  GetAll(){
    return this.http.get(this.apiurl);
  }

  GetByCode(code:any){
    return this.http.get(this.apiurl+'/'+code);
  }

  GetAllRole(){
    return this.http.get('http://localhost:3000/role');
  }

  Proceedregister(inputdata:any){
    return this.http.post(this.apiurl, inputdata);
  }

  Updateuser(code:any, inputedata:any){
    return this.http.put(this.apiurl+'/'+code, inputedata);
  }

  IsloggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  GetUserrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }

}
