import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  // { path: '', redirectTo: 'user', pathMatch: 'full' }, 
  {path: "user", loadComponent: () => import("./users/users.component").then(c => c.UsersComponent)},
  {path: "product", loadComponent: () => import("./product/product.component").then(c => c.ProductComponent)},
  // { path: '**', redirectTo: 'user', pathMatch: 'full' } 

];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
