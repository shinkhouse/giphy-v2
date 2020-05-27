/* tslint:disable: variable-name */
import { Deserializable } from './deserializable.model';

export class GiphySearchItem implements Deserializable {
    analytics: object;
    analytics_response_payload: string;
    bitly_gif_url: string;
    bitly_url: string;
    content_url: string;
    embed_url: string;
    id: string;
    images: object;
    import_datetime: string;
    is_sticker: number;
    rating: string;
    slug: string;
    source: string;
    source_post_url: string;
    source_tld: string;
    title: string;
    trending_datetime: string;
    type: string;
    url: string;
    user: object;
    username: string;

    deserialize(input: this | any): this {
        Object.assign(this, input);
        return this;
    }
}

export class GiphySearchResponse implements Deserializable {
    data: GiphySearchItem[];
    meta: object;
    pagination: object;

    deserialize(input: this | any): this {
        Object.assign(this, input);
        return this;
    }
}

/* tslint:enable */
