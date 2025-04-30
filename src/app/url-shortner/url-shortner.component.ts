import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatSelectModule } from '@angular/material/select';
import { Deeplink, DeeplinkService } from 'src/services/deeplink.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'

export enum DestinationType{
  SIP="SIP",
  ONETIME= "One-Time",
  JEWELLERY= "Jewellery",
  GOLD_LOAN= "Gold Loan",
  DIGI_GOLD= "Digi Gold"
}

@Component({
  selector: 'app-url-shortner',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatSlideToggleModule, 
    MatInputModule, 
    FormsModule, 
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './url-shortner.component.html',
  styleUrls: ['./url-shortner.component.scss']
})
export class UrlShortnerComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _deeplinkService: DeeplinkService,
    private _snackbar: MatSnackBar
  ) { }

  form: FormGroup | undefined;

  DestinationTypes = Object.values(DestinationType);

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: this._formBuilder.control(0),
      path: this._formBuilder.control('', [Validators.required]),
      identifier: this._formBuilder.control('', [Validators.required]),
      destination_type: this._formBuilder.control('', [Validators.required]),
      description: this._formBuilder.control(''),
      // params: this._formBuilder.control(''),
      paramsArray: this._formBuilder.array([]),
      redirect_install: this._formBuilder.control(false, [Validators.required]),
    });
  }

  test(){
    console.log(this.form.value)
  }

  deleteParam(index: number){
    this.paramsArray.removeAt(index);
  }

  addParams(){
    (this.form.get('paramsArray') as FormArray).push(this._formBuilder.group(
      {
        key:['', Validators.required],
        value: ['', Validators.required]
      }
    ))
  }

  get paramsArray(){
    return this.form.get('paramsArray') as FormArray;
  }

loader: boolean = false;
  insert(){
    this.loader = true;
    const body = this.generateInsertBody();
    console.log(body)
    this._deeplinkService.insert(body).subscribe({
      next: (response: HttpResponse<any>) => {
        this.loader = false;
        this._snackbar.open("Deeplink created successfully", "OK", {duration: 3000})
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        this.loader = false;
        this._snackbar.open(error.error.err ?? "Something wen wrong", "OK", {duration: 3000})
        console.error(error);
      }
    });
  }

  generateInsertBody(): Deeplink{
    const body : Deeplink= {
      id: this.form.value.id,
      identifier: this.form.value.identifier,
      path: this.form.value.path,
      destination_type: this.form.value.destination_type,
      params: this.form.value.paramsArray.map(param => `${param.key}=${param.value}`).join("&"),
      redirect_install: this.form.value.redirect_install,
    };
    console.log(body);
    return body
  }

}
