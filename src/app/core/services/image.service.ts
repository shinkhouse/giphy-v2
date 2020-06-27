import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    constructor(private http: HttpClient) {}

    getImageAndDownload(urlImage, fileName, fileType) {
        this.http.get(urlImage, { responseType: 'blob' }).subscribe((val) => {
            console.log(val);
            const url = URL.createObjectURL(val);
            this.saveImage(url, `${fileName}.${fileType}`);
            URL.revokeObjectURL(url);
        });
    }

    saveImage(url, fileName) {
        const a: any = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.style = 'display: none';
        a.click();
        a.remove();
    }
}
