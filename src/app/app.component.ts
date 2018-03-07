import { Component, ApplicationRef } from '@angular/core';
import { SessionService } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user = null;
  constructor(private session: SessionService, private application: ApplicationRef) {
    this.session.signedIn$.subscribe((user) => {
      this.user = user;
      // application.tick();
      console.log(this.user);
    })
  }

}
