import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {
    if (window.location.pathname === '/') {
      this.router.navigate(['/dashboard']);
    }
  }
}
