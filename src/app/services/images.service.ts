import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private _images: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);

  constructor() {}

  get Images() {
    return this._images.asObservable();
  }

  get ImagesAsUrl(): Observable<string[]> {
    return this._images.pipe(
      map((images: File[]) =>
        images.map((image: File) => URL.createObjectURL(image))
      )
    );
  }

  addImage(image: File) {
    const images = this._images.getValue();
    images.push(image);
    this._images.next(images);
  }
}
