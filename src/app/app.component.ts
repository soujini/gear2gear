import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
//export class AppComponent {
export class AppComponent {
  title = 'app';

  constructor() {
  }
  onActivate(event) {
    window.scrollTo(0, 0);
  }
}
