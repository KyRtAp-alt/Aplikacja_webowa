import { Component } from '@angular/core';
import { RosService } from '../ros.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subpage-rof1',
  templateUrl: './subpage-rof1.component.html',
  styleUrls: ['./subpage-rof1.component.scss'],
})
export class SubpageRof1Component {
  ross: any[] = [];
  selectedRosId: string = '';

  constructor(private rosService: RosService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedRosId = params['id'];
      this.getRoss();
    });
  }

  getRoss() {
    this.rosService.getRoss().subscribe(
      (ross: any) => {
        console.log(ross);
        this.ross = ross.filter(
          (ros: { _id: string }) => ros._id === this.selectedRosId
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
