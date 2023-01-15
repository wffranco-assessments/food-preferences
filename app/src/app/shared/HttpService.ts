import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const base_path = 'http://localhost:3000';

@Injectable()
export class HttpService<T> {
  uri = '';

  constructor(public http: HttpClient) {}

  getMany(options?: Options) {
    return this.http
      .get<Data<T[]>>(`${base_path}/${this.uri}`, options)
      .pipe(map<Data<T[]>, T[]>(({ data }) => data));
  }

  get(id: number | Options, options?: Options) {
    return this.http
      .get<Data<T>>(`${base_path}/${this.uri}/${id}`, options)
      .pipe(map<Data<T>, T>(({ data }) => data));
  }

  post(body: any | null, options?: Options) {
    return this.http
      .post<Data<T>>(`${base_path}/${this.uri}`, body, options)
      .pipe(map<Data<T>, T>(({ data }) => data));
  }

  put(id: number, body: any | null, options?: Options) {
    return this.http
      .put<Data<T>>(`${base_path}/${this.uri}/${id}`, body, options)
      .pipe(map<Data<T>, T>(({ data }) => data));
  }

  delete(id: number, options?: Options) {
    return this.http.delete(`${base_path}/${this.uri}/${id}`, options);
  }
}

interface Data<T> {
  data: T;
}

export type Options = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
};
