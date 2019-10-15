import { Component } from '@angular/core';
import {EnumValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator';
// import {Configuration} from './button/button.component';
import { AuthenticationService } from './Services';
import {Router} from '@angular/router';
// nel terminale npm run jserver per permettere di caricare tutti gli utenti
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;
  // jConfiguration =  new Configuration('PROVA', '70', '70', 'assets/imgs/img.jpg');
  provaConfig: any = {
    text: 'CIAO',
    height: 80,
    width: 200,
    image : 'assets/imgs/img.jpg'
    };
  ConfigLogin: any = {
    text: 'Login',
    height: 25,
    width: 60
  };
  provaConfig2: any = {
    text: 'CIAO',
    height: 70,
    width: 160
  };
  provaConfig3: any = {
    text: 'CIAO',
    height: 70,
    width: 160,
    icona: 'face'
  };
  provaConfig4: any = {
    text: 'CIAO',
    height: 70,
    width: 160,
    icona: 'face',
    action: 'RouterLink',
    url: 'HomeAdmin'
  };

  clConfig: any = [
    {text: 'btn btn-primary'},
    {text: 'btn btn-outline-success'},
    {text: 'btn btn-warning'},
    {text: 'btn btn-outline-danger'}
  ];

  ConfigAction: any = [
    {text: 'RouterLink'},
    {text: 'Get'},
    {text: 'Post'},
    {text: 'Delete'}
  ];
  elements = [
    {id: 1, first: 'Marco', last: 'Rossi', handle: 'marco@mail.it'},
    {id: 2, first: 'Luca', last: 'Verdi', handle: 'luca@mail.it'},
    {id: 3, first: 'Giorgio', last: 'Bianchi', handle: 'giorgio@mail.it'},
    {id: 4, first: 'Pietro', last: 'Gialli', handle: 'pietro@mail.it'},
    {id: 5, first: 'Roberto', last: 'Bianchi', handle: 'roberto@mail.it'},
    {id: 6, first: 'Paolo', last: 'Azzurri', handle: 'paolo@mail.it'},
    {id: 7, first: 'Marco', last: 'Rossi', handle: 'marco@mail.it'},
    {id: 8, first: 'Luca', last: 'Verdi', handle: 'luca@mail.it'},
    {id: 9, first: 'PierGiorgio', last: 'Bianchessi', handle: 'pgiorgio@mail.it'},
    {id: 10, first: 'Giancarlo', last: 'Violini', handle: 'gcarlo@mail.it'},
    {id: 11, first: 'Alberto', last: 'Lucini', handle: 'roberto@mail.it'}
  ];
  arrConf: any = [
    {text: 'Modifica', height: 40, width: 130 },
    {text: 'Prenotazioni', height: 40, width: 130 },
    {text: 'Problemi', height: 40, width: 130 },
    {text: 'Elimina', height: 40, width: 130 }
  ];
  headElements = {id: 'ID', first : 'NOME', last : 'COGNOME', handle : 'EMAIL', azione : 'AZIONI'};
  headbutElements = {azione : 'AZIONI'};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }
}

