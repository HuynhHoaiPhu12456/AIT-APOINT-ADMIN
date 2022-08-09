import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ThemeModule } from "../../@theme/theme.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ThemeModule],
})
export class HomeModule {}
