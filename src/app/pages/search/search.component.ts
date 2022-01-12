import { Component, OnInit, ViewChild } from '@angular/core';
import { GiphyService } from 'src/app/core/services/giphy.service';
import { Subscription } from 'rxjs';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerComponent } from 'src/app/core/components/image-viewer/image-viewer.component';
import { GiphySearchItem } from 'src/app/core/models/giphy';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    constructor(private giphy: GiphyService, private route: ActivatedRoute, private router: Router, private location: Location, private dialog: MatDialog, private snackbar: MatSnackBar) {}

    public searchResults: GiphySearchItem[];
    public favorites: GiphySearchItem[] = [];
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

        this.getTrendingResults();
    }

    getTrendingResults() {
        this.searchSubscription = this.giphy.getTrendingGifs().subscribe(
            (res) => {
                this.searchResults = res.data;
                res.data.forEach((image) => {
                    image.favorite = false;
                });
                // this.masonry.reloadItems();
                
                // this.masonry.layout();
            },
            (err) => {
                console.error(err);
            }
        );
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
                this.searchResults = res.data;
                res.data.forEach((image) => {
                    image.favorite = false;
                })
                // this.masonry.reloadItems();
                this.changeQueryParam(q);
                // this.masonry.layout();
            },
            (err) => {
                console.error(err);
            }
        );
    }

    openImageViewer(images: GiphySearchItem[], selectedImage: number) {
        console.log(images[selectedImage].images.original);

        const dialogRef = this.dialog
            .open(ImageViewerComponent, {
                panelClass: 'image-viewer',
                minWidth: '400px',
                width: `${images[selectedImage].images.original.width}px`,
                height: `${images[selectedImage].images.original.height}px`,
                data: {
                    imagesArr: images,
                    selected: selectedImage,
                },
            })
            .addPanelClass('image-viewer');
    }

    toggleFavorites() {
        // open favorite sidenav
    }

    addToFavorites(images: GiphySearchItem[], selectedImage: number) {
        images[selectedImage].favorite = !images[selectedImage].favorite;
        if (images[selectedImage].favorite) {
            this.favorites.push(images[selectedImage]);
            this.snackbar.open("Item added to favorites", 'Okay', {
                duration: 5000
            })
        } else {
            const itemIndex = this.favorites.findIndex((result: GiphySearchItem) => {
                return result.id === images[selectedImage].id;
            })
            this.snackbar.open("Item removed to favorites", 'Okay', {
                duration: 5000
            })
            this.favorites.splice(itemIndex, 1);
        }
        console.log(this.favorites);
    }

    changeQueryParam(query) {
        this.location.go('/', `?q=${query}`);
        if(query.length === 0) {
            this.getTrendingResults();
        }
    }
}
