import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionPipeTs'
})
export class DescriptionPipeTsPipe implements PipeTransform {

  transform(desc: string, value?: number): any {
    return desc.substring(0, value) + ' ...';
  }

}
