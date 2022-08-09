import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { 
    NbAccordionModule,
    NbAlertModule,
    NbAutocompleteModule,
    NbButtonModule, 
    NbCardModule, 
    NbDatepickerModule, 
    NbFormFieldModule, 
    NbIconModule, 
    NbInputModule, 
    NbRadioModule, 
    NbSelectModule, 
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { DialogDelComponent } from "./dialog-del/dialog-del.component";
import { EventCategoryComponent } from "./event-category/event-category.component";
import { EventRoutingModule } from "./event-routing.module";
import { EventComponent } from "./event.component";
import { ResigterEventCategoryComponent } from "./resigter-event-category/resigter-event-category.component";





@NgModule({
    imports: [
        EventRoutingModule,
        NbAlertModule,
        NbCardModule,
        NbIconModule,
        NbInputModule,
        NbButtonModule,
        NbRadioModule,
        NbSelectModule,
        NbAccordionModule,
        NbDatepickerModule,
        NbFormFieldModule,
        NbAutocompleteModule,
        FormsModule,
        ThemeModule,
        Ng2SmartTableModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        EventCategoryComponent,
        DialogDelComponent,
        ResigterEventCategoryComponent,
        EventComponent
    ]
})
export class EventModule { }