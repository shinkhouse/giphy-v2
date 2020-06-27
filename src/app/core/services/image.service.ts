import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    constructor(private http: HttpClient) {}

    getImageAndDownload() {
      this.http.get(urlImage, { responseType: 'blob' }).subscribe((val) => {
          console.log(val);
          let url = URL.createObjectURL(val);
          downloadUrl(url, 'image.png');
          URL.revokeObjectURL(url);
      });
    }
}
