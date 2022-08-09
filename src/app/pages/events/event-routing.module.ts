import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventCategoryComponent } from "./event-category/event-category.component";
import { EventComponent } from "./event.component";
import { ResigterEventCategoryComponent } from "./resigter-event-category/resigter-event-category.component";



const routes: Routes = [
    {
        path: '',
        component: EventComponent,
        children: [
            {
                path: 'resigter/:id',
                component: ResigterEventCategoryComponent,
              },
              {
                path: 'edit/:id',
                component: ResigterEventCategoryComponent,
              },
              {
                path: '',
                component: EventCategoryComponent,
              },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventRoutingModule { }