import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "../service/translate.service";

@Injectable()
@Pipe({
  name: "translate",
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: any, args?: any): any {
    return this.translateService.translate(value);
  }
}
