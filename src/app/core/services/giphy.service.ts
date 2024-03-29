import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { giphy } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { GiphySearchResponse } from '../models/giphy';

const baseUrl = giphy.url;

@Injectable({
    providedIn: 'root',
})
export class GiphyService {
    constructor(private http: HttpClient) {}

    getSearchResults(params) {
        let queryParams: HttpParams = new HttpParams();

        queryParams = queryParams.append('q', params.query);
        queryParams = queryParams.append('limit', '50');

        return this.http
            .get<any>(`${baseUrl}/gifs/search`, {params: queryParams})
            .pipe(map((res: any) => new GiphySearchResponse().deserialize(res)));
    }

    getTrendingGifs() {
        let queryParams: HttpParams = new HttpParams();
        queryParams = queryParams.append('limit', '50');

        return this.http.get<any>(`${baseUrl}/gifs/trending`, { params: queryParams }).pipe(map((res: any) => new GiphySearchResponse().deserialize(res)));
    }
}
