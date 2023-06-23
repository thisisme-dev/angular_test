import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angularCase';

  showMobileNav: boolean = false;

  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }
}
