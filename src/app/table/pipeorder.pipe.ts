import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'pipeorder'
})
export class PipeorderPipe implements PipeTransform {
  transform(value: any[], key: any, or: boolean): any {
    let text;
    if (or === true) {
      text = 'asc';
    } else { text = 'desc'; }
    return _.orderBy(value, key, text );
    }
  }
