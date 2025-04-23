import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Product } from 'src/interfaces/product.interface';
import { ProductService } from 'src/services/product.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
    imports: [ MatTableModule,
      MatCardModule, 
      MatIconModule,
      MatProgressSpinnerModule,
      MatSidenavModule,
      CommonModule,],
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private _productService: ProductService
  ) { }


    products: Product[] = [];
    displayedColumns: string[] = [ 'id', 'name', 'image', 'price','action'];
    loader: boolean = false

  ngOnInit(): void {
    this.getProductData()
  }

  bulkDowload(){
    window.open(environment.host + "product/generate-report", '_blank')
  }

    getProductData(){
      this._productService.getList().subscribe({
        next: (response: HttpResponse<{data: Product[]}>) => {
          console.log(response.body.data)
          this.products = response.body.data
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        }
      })
    }

      deleteUser(id: number){
        this.loader = true;
        this._productService.deleteUser(id).subscribe({
          next: (response: HttpResponse<any>) => {
            this.getProductData()
            this.loader = false;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error)
            this.loader = false;
          }
        })
      }

}
