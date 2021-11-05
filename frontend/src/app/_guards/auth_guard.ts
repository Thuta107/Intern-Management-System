import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ObjectBindingOrAssignmentPattern} from 'typescript';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //console.log(JSON.parse(localStorage.getItem('currentUser')))

    let obj = localStorage.getItem('currentUser')

    if (localStorage.getItem('currentUser') && localStorage.getItem("currentUserType") == "customer") {
      // logged in so return true
      return true;
    }

    else if (localStorage.getItem('currentUser') && localStorage.getItem("currentUserType") == "client") {
      //logged in so return true
      return true;
    }
    
    else if (localStorage.getItem('currentUser') && localStorage.getItem("currentUserType") == "admin") {
      //logged in so return true
      
      return true;
    }
        //return true;

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    console.log('no access so back to login page')
    return false;
  }
}
