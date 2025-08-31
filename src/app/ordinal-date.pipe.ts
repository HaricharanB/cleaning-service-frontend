import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalDate'
})
export class OrdinalDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    let date: Date;

    if (typeof value === 'string' && /^\d{4},\d{2},\d{2}$/.test(value)) {
      // Parse yyyy,mm,dd as local date
      const [year, month, day] = value.split(',').map(Number);
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(value);
    }

    if (isNaN(date.getTime())) return '';
    const dayNum = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const ordinal = this.getOrdinal(dayNum);
    return `${dayNum}${ordinal} ${month} ${year}`;
  }

  private getOrdinal(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
}
