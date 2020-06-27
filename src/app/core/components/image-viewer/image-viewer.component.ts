import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GiphySearchResponse, GiphySearchItem } from '../../models/giphy';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
    public images: GiphySearchResponse;
    public selectedImage: number;
    public displayedImage: GiphySearchItem;

    constructor(private dialogRef: MatDialogRef<ImageViewerComponent>, @Inject(MAT_DIALOG_DATA) data) {
        console.log(data, data.imagesArr, data.selectedImage);
        this.images = data.imagesArr;
        this.selectedImage = data.selected;
    }

    ngOnInit(): void {
        this.displayedImage = this.images.data[this.selectedImage];
    }

    previousImage() {
        if (this.canSelectPreviousImage()) {
            this.selectedImage = this.selectedImage--;
            this.displayedImage = this.images.data[this.selectedImage];
        }
    }

    nextImage() {
        if (this.canSelectNextImage()) {
            this.selectedImage = this.selectedImage++;
            this.displayedImage = this.images.data[this.selectedImage];
        }
    }

    canSelectPreviousImage() {
        return this.selectedImage !== 0;
    }

    canSelectNextImage() {
        return this.selectedImage !== this.images.data.length - 1;
    }

    closeDialog() {
        this.dialogRef.close();
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
