import { Pipe, PipeTransform, isStandalone } from '@angular/core';
@Pipe({
  name: 'showPassword',
  standalone:false
})
export class ShowPasswordPipe implements PipeTransform {
  transform(isVisible: boolean): string {
    return isVisible ? 'text' : 'password';
  }
}
