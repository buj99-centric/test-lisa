import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  installPrompt!: Event;

  constructor() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.installPrompt = event;
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
