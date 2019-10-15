import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [{ id: 1 , nome: 'Jason st', email: 'wt@mail.it', passut: 'test', tipologia: 'test', datan: '09/01/1976' },
  {id: 2, nome: 'Marco Rossi', email: 'mrossi@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1976'},
  {id: 3, nome: 'Luca Verdi', email: 'lverdi@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1977'},
  {id: 4, nome: 'Pietro Gialli', email: 'pgialli@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1979'},
  {id: 5, nome: 'Roberto Bianchi', email: 'rbianchi@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1971'},
  {id: 6, nome: 'Paolo Azzurri', email: 'pazzurri@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1972'},
  {id: 7, nome: 'Marco', email: 'marco@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1975'},
  {id: 8, nome: 'Luca', email: 'lc@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1976'},
  {id: 9, nome: 'PierGiorgio', email: 'pg@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1976'},
  {id: 10, nome: 'Giancarlo', email: 'gianc@mail.it', passut: '123', tipologia: 'Customer', datan: '09/01/1976'},
  {id: 11, nome: 'Alberto', email: 'alb@mail.it', passut: '123', tipologia: 'Admin', datan: '09/01/1976'}
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      // tslint:disable-next-line:max-line-length
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.nome === username && x.passut === password);
      if (!user) { return error('Username or password is incorrect'); }
      return ok({
        id: user.id,
        nome: user.nome,
        email: user.email,
        passut: user.passut,
        tipologia: user.tipologia,
        token: 'fake-jwt-token'
      });
    }

    // helper functions

    // tslint:disable-next-line:no-shadowed-variable
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
