import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { Action, select, Store } from "@ngrx/store";
import { ActionTypes } from "../types";

export class ChangeLangage implements Action {
  readonly type = ActionTypes.Change_lang_app;
  public payload: string;
  constructor(_payload: any) {
    this.payload = _payload;
    localStorage.setItem("lang", this.payload);
  }
}
