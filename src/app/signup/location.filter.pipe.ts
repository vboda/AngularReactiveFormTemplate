import { Pipe, PipeTransform } from '@angular/core';
import { startWith } from 'rxjs/operators';

@Pipe({
  name: 'locationFilter'
})
export class FilterPipe implements PipeTransform {
  transform(value: string[], str:string): string[] {
    value = value.filter(
      country => country.toString().toLowerCase().startsWith(str.toLowerCase())
    );
    console.log(value);
    return value;
  }
}
