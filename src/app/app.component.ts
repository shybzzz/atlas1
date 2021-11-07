import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'atlas1';
  apiLoaded: Observable<boolean>;

  mapOptions = {
    center: { lat: 44.5403, lng: -78.5463 },
    zoom: 8,
    mapTypeId: 'satellite',
    disableDefaultUI: true,
    scaleControl: true,
    styles: [
      {
        featureType: 'all',
        stylers: [
          {
            visibility: 'on',
          },
        ],
      },
    ],
  };

  kmls = [
    'https://drive.google.com/uc?export=download&id=1y5JrJNLgKo4Kk6xNgmxHnG6je5J5MaqB',
    'https://drive.google.com/uc?export=download&id=0B1fFxcYW_dJzdjhFUlBzVDFfNU0',
  ];

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp('https://maps.googleapis.com/maps/api/js', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
