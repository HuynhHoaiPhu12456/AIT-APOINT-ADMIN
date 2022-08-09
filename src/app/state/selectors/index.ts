export const getLang = (state: AppState) => {
  return state.commonReducer.language;
};

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
  user_setting?: any;
  app_loading: boolean;
  show_snackbar: any;
  currencySymbol?: string;
  isRemmemberMe?: boolean;
  pageInfo?: any;
  commonMessages?: any;
  env?: any;
}

export interface ThemeReducer {
  theme: string;
}
