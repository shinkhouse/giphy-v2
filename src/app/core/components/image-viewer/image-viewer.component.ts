import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GiphySearchResponse, GiphySearchItem } from '../../models/giphy';
import { ImageService } from '../../services/image.service';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
    public images: GiphySearchItem[];
    public selectedImage: number;
    public displayedImage: GiphySearchItem;

    constructor(private dialogRef: MatDialogRef<ImageViewerComponent>, @Inject(MAT_DIALOG_DATA) data, private image: ImageService) {
        console.log(data, data.imagesArr, data.selectedImage);
        this.images = data.imagesArr;
        this.selectedImage = data.selected;
    }

    ngOnInit(): void {
        this.displayedImage = this.images[this.selectedImage];
    }

    previousImage() {
        if (this.canSelectPreviousImage()) {
            this.selectedImage = this.selectedImage - 1;
            this.displayedImage = this.images[this.selectedImage];
            this.dialogRef.updateSize(this.displayedImage.images.original.width, this.displayedImage.images.original.height);
        }
    }

    nextImage() {
        if (this.canSelectNextImage()) {
            this.selectedImage = this.selectedImage + 1;
            this.displayedImage = this.images[this.selectedImage];
            this.dialogRef.updateSize(this.displayedImage.images.original.width, this.displayedImage.images.original.height);
        }
    }

    canSelectPreviousImage(): boolean {
        return this.selectedImage !== 0;
    }

    canSelectNextImage(): boolean {
        return this.selectedImage !== this.images.length - 1;
    }

    closeDialog() {
        this.dialogRef.close();
    }

    saveImage(url, fileName, fileType) {
        this.image.getImageAndDownload(url, fileName, fileType);
    }
}
