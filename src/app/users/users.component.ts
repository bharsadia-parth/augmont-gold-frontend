import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/interfaces/user.interface';
import { UserService } from 'src/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserFormComponent } from './user-form/user-form.component';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { AppLauncherService } from 'src/services/app-launcher.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [ MatTableModule,
    MatCardModule, 
    MatIconModule,
    UserFormComponent,
    MatProgressSpinnerModule,
    MatSidenavModule,
    CommonModule,
  ],
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _appLauncherService: AppLauncherService,
  ) { }

  users: User[] = [];
  displayedColumns: string[] = [ 'id', 'email','action'];
  loader: boolean = false

  ngOnInit(): void {
    // this.getUserData();
    this._appLauncherService.openAugmontApp()
  }
  
   hello(){


  }

  getUserData(){
    forkJoin({api1: this._userService.getList(), api2: this._userService.getList2()}).subscribe({
      next: (val) => {
        val.api2
      }
    })
    // ._userService.getList().subscribe({
    //   next: (response: HttpResponse<{data: User[]}>) => {
    //     console.log(response.body.data)
    //     this.users = response.body.data
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error)
    //   }
    // })

    
  }

  delethisteUser(id: number){
    this.loader = true;
    this._userService.deleteUser(id).subscribe({
      next: (response: HttpResponse<{data: User[]}>) => {
        this.getUserData()
        this.loader = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.loader = false;
      }
    })
  }

}
