import {Component} from '@angular/core';
import {ProductViewComponent} from '../shared/product-view/product-view.component'
import {ContentComponent} from '../shared/content/content.component'

@Component({
  selector: 'm165-edit-overview',
  standalone: true,
  imports: [
    ProductViewComponent,
    ContentComponent
  ],
  templateUrl: './edit-overview.component.html',
  styleUrl: './edit-overview.component.css'
})
export class EditOverviewComponent {

}
