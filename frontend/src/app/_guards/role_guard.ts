import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ObjectBindingOrAssignmentPattern} from 'typescript';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //console.log(JSON.parse(localStorage.getItem('currentUser')))

    let obj = localStorage.getItem('currentUserType')
    const obj2 = route.data.userType
    console.log(obj + " current usr");
    console.log(obj2);
    if (obj == obj2) {
      // logged in so return true
      return true;
    }
    
    else if (obj == "admin"){
      //admin logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home']);
    console.log('no access so back to Home page')
    return false;
  }
}
