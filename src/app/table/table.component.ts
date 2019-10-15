import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {log} from 'util';
import {element} from 'protractor';
import {PipeorderPipe} from './pipeorder.pipe';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  _ = _;
  order: any;
  @Input() elements?;
  @Input() headElements?;
  // @Input() headbElements;
  @Input() configurazione?: any;
  @Input() configurazionecl?: any;
  numeroElementiPerPagina;
  selectNumeriPerPagina = [2, 4, 6];
  elementiCopia;
  elementicopia2;
  reverse = false;
  text;
  ord1;

  indicePagine; // tutti gli indici pagina
  numeroPagineTotali;
  pageNumber;
  currentIndex;
  pagesIndex: Array<number>;
  pageStart;
  indiceArrayA;
  indiceArrayB;

  constructor(private router: Router) { }
  ngOnInit() {
    this.numeroElementiPerPagina = this.selectNumeriPerPagina[0];
    this.elementiCopia = [];
    this.currentIndex = 1; // indice corrente all'inizio della pagina
    this.numeroPagineTotali = this.elements.length / this.numeroElementiPerPagina; // numero totale di pagine +1
    this.pageStart = 1; // indice lista inizio pagina
    this.indicePagine = this.numeroPagineTotali; // tutti gli indici pagina
    this.pageNumber = Math.ceil(this.numeroPagineTotali - 1); // pagine 1 di ? cast per eccesso

    if (this.numeroPagineTotali !== 0) {
      this.pageNumber ++;
    }
    if (this.pageNumber  < this.indicePagine) {
      this.indicePagine =  this.pageNumber;
    }
    this.refreshIndexes();
    // let arraySlice;
    console.log('array', this.elements);
  }

  getHeadervalues() {
    return _.values(this.headElements);
  }

  getKeyvalues() {
    return _.keys(this.headElements);
  }

  setOrder(value: any) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  fillArrayIndexes(): any {
    const obj = [];
    for (let index = this.pageStart; index < this.pageStart + this.indicePagine; index ++) {
      obj.push(index);
    }
    return obj;
  }

  refreshIndexes() {
    this.pagesIndex =  this.fillArrayIndexes();
    this.indiceArrayA = (this.currentIndex - 1) * this.numeroElementiPerPagina;
    this.indiceArrayB = (this.currentIndex * this.numeroElementiPerPagina);
    this.sliceArrays();
  }

  sliceArrays() {
    if (this.elements) {
      this.elementiCopia = _.orderBy(this.elements, this.ord1, this.text);
      this.elementiCopia = this.elementiCopia.slice(this.indiceArrayA, this.indiceArrayB);
      const pipe = new PipeorderPipe();
      console.log(this.elementiCopia);
      console.log(pipe.transform(this.elements, this.order, this.reverse ));
    }
  }

  prevPage() {
    if (this.currentIndex > 1) {
      this.currentIndex --;
    }
    if (this.currentIndex < this.pageStart) {
      this.pageStart = this.currentIndex;
    }
    this.refreshIndexes();
  }
  nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex ++;
    }
    if (this.currentIndex >= (this.pageStart + this.indicePagine)) {
      this.pageStart = this.currentIndex - this.indicePagine + 1;
    }
    this.refreshIndexes();
  }
  setPage(index: number) {
    this.currentIndex = index;
    this.refreshIndexes();
  }
  orderelementiCopia(value?: any, order?: any, or?: boolean) {
    // tslint:disable-next-line:prefer-const
    this.setOrder(value);
    if (or === true) {
      this.text = 'asc';
    } else { this.text = 'desc'; }
    this.ord1 = order;
    this.elementicopia2 = _.orderBy(this.elements, order, this.text);
    return this.elementiCopia = this.elementicopia2.slice(this.indiceArrayA, this.indiceArrayB);
  }
  selectNumber(index) {
    this.numeroElementiPerPagina = this.selectNumeriPerPagina[index];
    this.numeroPagineTotali = this.elements.length / this.numeroElementiPerPagina;
    this.indicePagine = this.numeroPagineTotali;
    this.pageNumber = Math.ceil(this.numeroPagineTotali);
    this.currentIndex = 1;
    this.refreshIndexes();
  }
//
  // get countries(): Country[] {
  //   return COUNTRIES
  //     .map((country, i) => ({id: i + 1, ...country}))
  //     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  // }

  onCustomAction(conf: any, id: any) {
    console.log(conf.action);
    switch (conf.action) {
      case 'RouterLink':
        this.router.navigateByUrl(conf.url + '?id=' + id);
        break;
      case 'Get':
        this.router.navigateByUrl('HomeAdmin');
        break;
      case 'Post':
        this.router.navigateByUrl('HomeAdmin');
        break;
      case 'Delete':
        this.router.navigateByUrl('HomeAdmin');
        break;
      default:  this.router.navigateByUrl('HomeAdmin');
    }
  }
}
