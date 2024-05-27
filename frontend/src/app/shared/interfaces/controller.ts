import {Observer, Subscription} from 'rxjs'

export interface Controller {
  observer: Observer<any>
  sub?: Subscription
}
