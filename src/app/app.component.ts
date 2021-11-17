import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Firestore, doc, docData } from '@angular/fire/firestore';

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

  kmls: Observable<string[]>;

  constructor(httpClient: HttpClient, firestore: Firestore) {
    this.apiLoaded = httpClient
      .jsonp('https://maps.googleapis.com/maps/api/js', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );

    const constantDoc = docData(doc(firestore, 'kmls/constant'));
    this.kmls = constantDoc.pipe(map(({ layers }) => layers));
  }
}
