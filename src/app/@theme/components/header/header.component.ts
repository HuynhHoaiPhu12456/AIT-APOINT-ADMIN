import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { filter, map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { AppState } from "../../../state/selectors";
import { Store } from "@ngrx/store";
import { ChangeLangage } from "../../../state/actions";
import { UserService } from "../../../service/user.service";
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";
import { TranslateService } from "../../../service/translate.service";

@Component({
  selector: "ait-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  tag = 'my-context-menu';
  pathTranslate = "common.header.";
  USER_MENU: NbMenuItem[] = [ 
    { 
      title: 'Profile',
      icon: 'person-outline',
    }, 
    { 
      title: 'Log out',
      icon: 'log-out-outline',
    } 
  ];

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];
  languages = [
    { value: "en_US", name: "EN" },
    { value: "vi_VN", name: "VN" },
    { value: "ja_JP", name: "JP" },
  ];

  currentTheme = "default";
  currentLang = localStorage.getItem("lang") || "en_US";

  userMenu: NbMenuItem[];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.userMenu = this.USER_MENU;
    this.translateUserMenu();

    // this.userService
    //   .getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => (this.user = users.iron));

    this.getUser();

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));

    this.menuService.onItemClick()
      .pipe(filter(({ tag }) => tag === this.tag))
      .subscribe((event) =>  this.onItemSelection(event.item.title));
  }

  /**
   * Handle Log out & Profile
   */
  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      console.log('Log out Clicked ');
      this.authService.logout();
    } else if ( title === 'Profile' ) {
      console.log('Profile Clicked ');
      this.router.navigateByUrl('/pages/home');
    }
  }

  async getUser() {
    const id = localStorage.getItem("user_id");
    const result = await this.userService.getUser(id);
    if (result) {
      this.user = result.data['oneUserById'];
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  translateUserMenu = () => {
    this.userMenu.forEach( item => this._translateUserMenu(item))
  }

  _translateUserMenu = (item: NbMenuItem) => {
    item.title = this.translateService.translate(this.pathTranslate + item.title);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeLang(lang: string) {
    localStorage.setItem("lang", lang);
    this.store.dispatch(new ChangeLangage(lang));
    this.currentLang = lang;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
