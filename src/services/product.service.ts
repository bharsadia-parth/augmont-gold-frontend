import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


   constructor(
      private _http: HttpClient
    ) { }
  
    path: string = "product";
  
    getList(){
      return this._http.get<{data: Product[]}>(environment.host + this.path, {observe: 'response'});
    }
  
    deleteUser(id: number){
      return this._http.delete(environment.host + this.path + "/" + id, {observe: 'response'});
    }
}
