import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatList, MatListItem} from '@angular/material/list';
import {MatAnchor} from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContent,
    MatSidenav,
    MatSidenavContainer,
    MatList,
    MatListItem,
    MatAnchor,
    RouterLink
  ],
})
export class AppComponent {
}
