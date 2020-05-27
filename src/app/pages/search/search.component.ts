import { Component, OnInit, ViewChild } from '@angular/core';
import { GiphyService } from 'src/app/core/services/giphy.service';
import { Subscription } from 'rxjs';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    constructor(private giphy: GiphyService, private route: ActivatedRoute, private router: Router, private location: Location) {}

    public searchResults: any;
    public masonryOptions: NgxMasonryOptions = {
        gutter: 5,
        // columnWidth: 200,
        itemSelector: '.masonry-item',
        // fitWidth: true,
        resize: true,
        // initLayout: true,
    };
    public query: string;

    @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
    private searchSubscription: Subscription;
    private queryParamsSubscription: Subscription;

    ngOnInit(): void {
        this.queryParamsSubscription = this.route.queryParamMap.subscribe(queryParamMap => {
          const querySearchParam = queryParamMap.get('q');
          if(querySearchParam) {
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
                this.masonry.layout();
                this.changeQueryParam(q);
            },
            (err) => {
                console.error(err);
            }
        );
    }

    changeQueryParam(query) {
      this.location.go('/', `?q=${query}`);
    }
}
