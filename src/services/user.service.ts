import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }



  path: string = "user";

  get(url){
    return this._http.get(url);
  }

  getList(){
    return this._http.get<{data: User[]}>(environment.host + this.path, {observe: 'response'});
  }

  getList2(){
    return this._http.get<{data: User[]}>(environment.host + this.path, {observe: 'response'});
  }

  deleteUser(id: number){
    return this._http.delete(environment.host + this.path + "/" + id, {observe: 'response'});
  }
}
