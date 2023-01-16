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
export class CrudService<T> {
  uri = '';

  constructor(private _http: HttpClient) {}

  /** Enable get|post|put|delete Requests, and unwrap response ({ data: result } -> result). */
  get http() {
    return {
      get: <U extends T | T[]>(url: Uri, options?: Options) =>
        this._http
          .get<Data<U>>(parseUrl(base_path, this.uri, url), options)
          .pipe(map<Data<U>, U>(({ data }) => data)),
      post: (url: Uri, body: any, options?: Options) =>
        this._http
          .post<Data<T>>(parseUrl(base_path, this.uri, url), body, options)
          .pipe(map<Data<T>, T>(({ data }) => data)),
      put: (url: Uri, body: any, options?: Options) =>
        this._http
          .put<Data<T>>(parseUrl(base_path, this.uri, url), body, options)
          .pipe(map<Data<T>, T>(({ data }) => data)),
      delete: (url: Uri, options?: Options) =>
        this._http.delete(parseUrl(base_path, this.uri, url), options),
    };
  }

  getMany(options?: Options) {
    return this.http.get<T[]>('', options);
  }

  get(id: number, options?: Options) {
    return this.http.get<T>(id, options);
  }

  post(body?: any, options?: Options) {
    return this.http.post('', body, options);
  }

  put(id: number, body?: any, options?: Options) {
    return this.http.put(id, body, options);
  }

  delete(id: number, options?: Options) {
    return this.http.delete(id, options);
  }
}

const parseUrl = (...p: any[]) => p.filter((el) => el || el === 0).join('/');

export interface Data<T> {
  data: T;
}

/** url string or id number */
export type Uri = string | number;
export type Method = 'get' | 'post' | 'put' | 'delete';

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
