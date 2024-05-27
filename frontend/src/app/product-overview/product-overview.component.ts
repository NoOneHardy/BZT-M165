import {Component} from '@angular/core'
import {ProductViewComponent} from '../shared/product-view/product-view.component'
import {ContentComponent} from '../shared/content/content.component'

@Component({
  selector: 'm165-product-overview',
  standalone: true,
  imports: [
    ProductViewComponent,
    ContentComponent,
    ContentComponent
  ],
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.css'
})
export class ProductOverviewComponent {
}
