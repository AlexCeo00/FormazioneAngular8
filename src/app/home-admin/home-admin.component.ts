import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  utenti: User[] = null;

  clConfig: any = [
    {text: 'btn btn-primary'},
    {text: 'btn btn-outline-success'},
    {text: 'btn btn-warning'},
    {text: 'btn btn-outline-danger'}
  ];
  constructor(private http: HttpClient) {
  }
  elements = [
    {id: 1, nome: 'Marco Rossi', email: 'mrossi@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1976'},
    {id: 2, nome: 'Luca Verdi', email: 'lverdi@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1977'},
    {id: 3, nome: 'Giorgio Bianchi', email: 'mrossi@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1978'},
    {id: 4, nome: 'Pietro Gialli', email: 'pgialli@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1979'},
    {id: 5, nome: 'Roberto Bianchi', email: 'rbianchi@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1971'},
    {id: 6, nome: 'Paolo Azzurri', email: 'pazzurri@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1972'},
    {id: 7, nome: 'Marco', email: 'marco@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1975'},
    {id: 8, nome: 'Luca', email: 'lc@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1976'},
    {id: 9, nome: 'PierGiorgio', email: 'pg@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1976'},
    {id: 10, nome: 'Giancarlo', email: 'gianc@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1976'},
    {id: 11, nome: 'Alberto', email: 'alb@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1976'}
  ];
  arrConf: any = [
    {text: 'Modifica', height: 40, width: 130, action: 'RouterLink', url: 'edit'},
    {text: 'Prenotazioni', height: 40, width: 130, action: 'RouterLink', url: '#' },
    {text: 'Problemi', height: 40, width: 130, action: 'RouterLink', url: 'HomeAdmin'},
    {text: 'Elimina', height: 40, width: 130, action: 'RouterLink', url: '#' }
  ];
  // ConfigAction: any = [
  //   {text: 'RouterLink'},
  //   {text: 'Get'},
  //   {text: 'Post'},
  //   {text: 'Delete'}
  // ];
  // tslint:disable-next-line:max-line-length
  headElements = {id: 'ID', nome : 'Nome e Cognome', email : 'Email', passut : 'password', tipologia : 'Tipologia',  datan : 'Data di Nascita', azione : 'Azioni'};
  ngOnInit() {
   this.funz();
  }
  getAll() {
    return this.http.get<User[]>(`http://localhost:3000/users`);
  }
  funz() {
    this.getAll().subscribe(users => this.utenti = users);
  }
}
