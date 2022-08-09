/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import {
  NbActionsModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";
import { StoreModule } from "@ngrx/store";
import { rootReducers } from "./state/rootReducers";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { DefaultOptions, InMemoryCache } from "@apollo/client/core";
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService as AuthGuard } from "./service/auth-guard.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { GraphQLModule } from "./graphql.module";
import { PagesRoutingModule } from "./pages/pages-routing.module";
import { Ng2SmartTableModule } from "ng2-smart-table";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NbEvaIconsModule,
    NbCardModule,
    NbIconModule,
    NbLayoutModule,
    NbActionsModule,
    NbCheckboxModule,
    GraphQLModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    StoreModule.forRoot(
      { ...rootReducers },
      {
        initialState: {},
      }
    ),
    ApolloModule,
    PagesRoutingModule,
    Ng2SmartTableModule

  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        var token = localStorage.getItem('access_token');
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql',
            headers: new HttpHeaders({
              "Authorization": `Bearer ${token}`
            })
          }),
          defaultOptions: defaultOptions,
        };
      },
      deps: [HttpLink],
    },
    AuthGuard,
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
