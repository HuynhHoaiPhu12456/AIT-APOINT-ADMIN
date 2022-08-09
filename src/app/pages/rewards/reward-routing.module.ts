import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InventoryCreateComponent } from "./inventory-create/inventory-create.component";
import { RewardInventorySearchComponent } from "./reward-inventory-search/reward-inventory-search.component";
import { RewardOrderSearchComponent } from "./reward-order-search/reward-order-search.component";
import { RewardComponent } from "./reward.component";


const routes: Routes = [
    {
        path: '',
        component: RewardComponent,
        children: [
            { path: 'order', component: RewardOrderSearchComponent },
            { path: 'inventory', component: RewardInventorySearchComponent },
            { path: 'inventory/create/:id', component: InventoryCreateComponent },
            { path: 'inventory/update/:id', component: InventoryCreateComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RewardRoutingModule { }