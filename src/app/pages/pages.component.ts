import { Component, OnInit } from "@angular/core";
import { NbMenuItem } from "@nebular/theme";
import { TranslateService } from "../service/translate.service";

import { MENU_ITEMS } from "./pages-menu";

const pathTranslate: string = "sidebar.";

@Component({
  selector: "ait-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ait-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ait-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu: NbMenuItem[];
  
  constructor ( 
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
      this.menu = MENU_ITEMS;       // chưa có trigger bắt event change language
      this.translateMenuItems();
  }

  translateMenuItems = () => {
    this.menu.forEach(item => this.translateMenuItem(item));
  }
  
  translateMenuItem = (item: NbMenuItem) => {
    if (item.children != null) {
      item.children.forEach( child => this.translateMenuItem(child));
    }
    item.title = this.translateService.translate(pathTranslate + item.title);
  }
}
