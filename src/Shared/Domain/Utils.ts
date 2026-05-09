import * as fs from 'fs';

export class Utils {
  static dateToString(date: Date): string {
    return date.toISOString();
  }

  static stringToDate(text: string): Date {
    return new Date(text);
  }

  static jsonEncode(value: any): string {
    return JSON.stringify(value);
  }

  static jsonDecode(value: string): any {
    return JSON.parse(value);
  }

  static toSnakeCase(text: string): string {
    return text
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/\s+/g, '_')
      .toLowerCase();
  }

  static toCamelCase(text: string): string {
    return text
      .replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace('-', '').replace('_', '')
      )
      .replace(/^[A-Z]/, firstChar => firstChar.toLowerCase());
  }

  static dot(object: any, prepend = ''): any {
    return Object.keys(object).reduce((acc: any, key: string) => {
      const value = object[key];
      if (
        value instanceof Object &&
        !Array.isArray(value) &&
        Object.keys(value).length > 0
      ) {
        Object.assign(acc, this.dot(value, prepend + key + '.'));
      } else {
        acc[prepend + key] = value;
      }
      return acc;
    }, {});
  }

  static filesIn(directoryPath: string, extension: string): string[] {
    if (!fs.existsSync(directoryPath)) {
        return [];
    }
    return fs.readdirSync(directoryPath).filter(file => file.endsWith(extension));
  }

  static iterableToArray<T>(iterable: Iterable<T> | T[]): T[] {
    return Array.from(iterable);
  }
}
