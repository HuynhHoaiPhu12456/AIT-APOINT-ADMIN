export interface AppState {
  commonReducer: CommonReducer;
  themeReducer: ThemeReducer;
}

export interface CommonReducer {
  company: string;
  language: string;
  isAppLoading: boolean;
  requestInfo: {
    module: string;
    page: string;
  };
  user_permissions: string;
  user_setting?: any;
  app_loading: boolean;
  show_snackbar: any;
  currencySymbol?: string;
  isRemmemberMe?: boolean;
  commonMessages?: any;
}

export interface ThemeReducer {
  theme: string;
}
