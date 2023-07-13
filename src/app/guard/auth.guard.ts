import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
class AdminGuard {

  constructor(private service: AuthService, private router: Router, private toastr: ToastrService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.service.IsloggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'user') {
          if (this.service.GetUserrole() == 'admin') {
            return true;
          } else {
            this.router.navigate(['']);
            this.toastr.warning('Você não possui acesso')
            return false;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

}

export const IsAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AdminGuard).canActivate(route, state);
}

