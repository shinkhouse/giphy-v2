import { Component, OnInit, ViewChild } from '@angular/core';
import { GiphyService } from 'src/app/core/services/giphy.service';
import { Subscription } from 'rxjs';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerComponent } from 'src/app/core/components/image-viewer/image-viewer.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    constructor(private giphy: GiphyService, private route: ActivatedRoute, private router: Router, private location: Location, private dialog: MatDialog) {}

    public searchResults: any;
    public masonryOptions: NgxMasonryOptions = {
        horizontalOrder: true,
        gutter: 4,
        itemSelector: '.masonry-item',
        resize: true,
    };
    public query: string;

    @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
    private searchSubscription: Subscription;
    private queryParamsSubscription: Subscription;

    ngOnInit(): void {
        this.queryParamsSubscription = this.route.queryParamMap.subscribe((queryParamMap) => {
            const querySearchParam = queryParamMap.get('q');
            if (querySearchParam) {
                this.query = queryParamMap.get('q');
                this.getSearchResults(this.query);
            }
        });
    }

    getSearchResults(q) {
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
            this.searchSubscription = null;
        }
        const params = {
            query: q,
        };

        this.searchSubscription = this.giphy.getSearchResults(params).subscribe(
            (res) => {
                this.searchResults = res;
                this.masonry.reloadItems();
                this.changeQueryParam(q);
                this.masonry.layout();
            },
            (err) => {
                console.error(err);
            }
        );
    }

    openImageViewer(images, selectedImage) {
        console.log(images.data[selectedImage].images.original);
        const dialogRef = this.dialog
            .open(ImageViewerComponent, {
                panelClass: 'image-viewer',
                minWidth: '400px',
                width: `${images.data[selectedImage].images.original.width}px`,
                height: `${images.data[selectedImage].images.original.height}px`,
                data: {
                    imagesArr: images,
                    selected: selectedImage,
                },
            })
            .addPanelClass('image-viewer');
    }

    changeQueryParam(query) {
        this.location.go('/', `?q=${query}`);
    }
}
