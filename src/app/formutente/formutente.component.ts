import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../Services';
import {first} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-formutente',
  templateUrl: './formutente.component.html',
  styleUrls: ['./formutente.component.css']
})
export class FormutenteComponent implements OnInit {
  // , AfterViewInit
  @ViewChild('userForm', {static: false}) userForm;
  User: User;
  id = null;
  editForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(   private formBuilder: FormBuilder,
                 private route: ActivatedRoute,
                 private router: Router,
                 private authenticationService: AuthenticationService,
                 private http: HttpClient
  ) {
  }

ngOnInit() {
  // this.editForm = this.formBuilder.group({
  //   nome : ['', Validators.required],
  //   passut: ['', Validators.required],
  //   email: ['', Validators.required],
  //   tipologia: ['', Validators.required],
  //   datan: ['', Validators.required],
  // });
  this.id = this.route.snapshot.queryParamMap.get('id');
  console.log(this.id);
  this.http.get<User>(`http://localhost:3000/users/${this.id}`).subscribe(users => this.User = users);
  // console.log(this.userForm);
  }

  // ngAfterViewInit() {
  //   console.log(this.userForm);
  // }

onSubmit() {
    this.submitted = true;
  // stop here if form is invalid
  // tslint:disable-next-line:max-line-length
  //   this.http.post<any>(`http://localhost:3000/users?nome=${this.User.nome}&email=${this.User.email}&passut=${this.User.passut}&tipologia=${this.User.passut}&datan=${this.User.datan}`);
  // tslint:disable-next-line:max-line-length
    this.http.post<any>(`http://localhost:3000/users/${this.id}`, this.User).subscribe();
    this.router.navigateByUrl('/');
}
}
