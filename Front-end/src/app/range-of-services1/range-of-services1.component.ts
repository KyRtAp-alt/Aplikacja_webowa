import { Component } from '@angular/core';

@Component({
  selector: 'app-range-of-services1',
  templateUrl: './range-of-services1.component.html',
  styleUrls: ['./range-of-services1.component.scss']
})
export class RangeOfServices1Component {
onShowMore() {
  this.showMore = true
}
showMore = false;

}
