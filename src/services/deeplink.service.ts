import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DestinationType } from 'src/app/url-shortner/url-shortner.component';
import { environment } from 'src/environments/environment';

export interface Deeplink{
  id: number,
  identifier: string,
  description?: string,
  path:string,
  destination_type:DestinationType,
  params:string,
  redirect_install:boolean,
  shortcode?: string
}

@Injectable({
  providedIn: 'root'
})
export class DeeplinkService {

  constructor(
    private _http: HttpClient
  ) { }

  path: string = "deeplink";
  insert(body:Deeplink ){
    console.log(environment.host)
    return this._http.post(environment.host + this.path, body)
  }
}
