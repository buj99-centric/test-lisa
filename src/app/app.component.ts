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

  upload(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const filePicker = document.querySelector('input');

      if (!filePicker || !filePicker.files || filePicker.files.length <= 0) {
        reject('No file selected.');
        return;
      }
      const myFile = filePicker.files[0];
      console.log(myFile);

      resolve();
    });
  }
}
