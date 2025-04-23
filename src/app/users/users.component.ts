import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/interfaces/user.interface';
import { UserService } from 'src/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [ MatTableModule,
    MatCardModule, 
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private _userService: UserService
  ) { }

  users: User[] = [];
  displayedColumns: string[] = [ 'id', 'email','action'];
  loader: boolean = false

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this._userService.getList().subscribe({
      next: (response: HttpResponse<{data: User[]}>) => {
        console.log(response.body.data)
        this.users = response.body.data
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }

  deleteUser(id: number){
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
