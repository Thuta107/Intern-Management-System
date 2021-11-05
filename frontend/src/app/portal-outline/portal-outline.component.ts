import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../_services/';


@Component({
  selector: 'app-portal-outline',
  templateUrl: './portal-outline.component.html',
  styleUrls: ['./portal-outline.component.css']
})
export class PortalOutlineComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    public AuthenticationService: AuthenticationService, ) {}

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
