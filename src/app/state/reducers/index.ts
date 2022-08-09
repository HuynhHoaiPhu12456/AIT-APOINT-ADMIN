import { ActionTypes } from "../types";
export const LIST_SKILL_HISTORY = "skill_history";
interface CommonState {
  company?: string;
  language?: string;
  isAppLoading?: boolean;
  requestInfo?: {
    module: string;
    page: string;
  };
  user_setting?: any;
  app_loading?: boolean;
  show_snackbar?: any;
  currencySymbol?: string;
  isRememberMe?: boolean;
  pageInfo?: any;
  commonMessages?: any;
  env?: any;
}
interface CommonAction {
  type: string;
  payload: CommonState | any;
}

const langStorage = localStorage.lang;

export const initialState: CommonState = {
  company: "",
  language: langStorage,
  isAppLoading: false,
  requestInfo: {
    page: "",
    module: "",
  },
  user_setting: {},
  app_loading: false,
  show_snackbar: {},
  currencySymbol: "JPY",
  isRememberMe: false,
  pageInfo: {},
  commonMessages: {},
  env: {},
};

export const CommonReducer = (
  state = initialState,
  action: CommonAction
): CommonState => {
  switch (action.type) {
    // CODING case for getting state here 😎👌👌\
    case ActionTypes.Change_lang_app:
      localStorage.setItem("lang", action.payload);
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};
