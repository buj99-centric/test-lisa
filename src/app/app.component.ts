import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  installPrompt!: Event;
  location: Subject<GeolocationCoordinates> =
    new Subject<GeolocationCoordinates>();
  constructor() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.installPrompt = event;
    });
  }
  ngOnInit(): void {
    navigator.geolocation.watchPosition((position: GeolocationPosition) => {
      this.location.next(position.coords);
    });
  }

  onInstallClick() {
    if (this.installPrompt) {
      (this.installPrompt as any).prompt();
    } else {
      alert('Install prompt is not available');
    }
  }
}
