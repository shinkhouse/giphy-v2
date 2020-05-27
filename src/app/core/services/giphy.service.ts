import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { giphy } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { GiphySearchResponse } from '../models/giphy';

const baseUrl = giphy.url;
const apiKey = giphy.key;

@Injectable({
    providedIn: 'root',
})
export class GiphyService {
    constructor(private http: HttpClient) {}

    getSearchResults(params) {
        const queryParams = {
            q: params.query,
            api_key: apiKey,
        };

        return this.http
            .get(`${baseUrl}/gifs/search`, { params: queryParams })
            .pipe(map((res: any) => new GiphySearchResponse().deserialize(res)));
    }
}
