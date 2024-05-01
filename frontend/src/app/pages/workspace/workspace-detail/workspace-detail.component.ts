import { MeasurementsService } from '@/services/measurements.service';
import { UsersService } from '@/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-workspace-detail',
  standalone: true,
  imports: [],
  templateUrl: './workspace-detail.component.html',
  styleUrl: './workspace-detail.component.css'
})
export class WorkspaceDetailComponent implements OnInit {
  measurements_configs!: any[];
  all_configs!: any[];
  onlyConstellations!: any[];
  onlyDevices!: any[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private measurements: MeasurementsService,
    private cookieService: CookieService
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log("El valor del parámetro '/id' es:", id);

      if (id == '1') {
        this.measurements.getMeasurements()
          .subscribe(data => {
            this.all_configs = [...data]
            this.measurements_configs = this.all_configs;
          })
      } else {
        this.measurements.getMyMeasurements(this.cookieService.get('dniCookie'))
          .subscribe(data => {
            this.all_configs = [...data]
            this.measurements_configs = this.all_configs;
          })
      }
    });
  }

  jsonToString(o: object) {
    return JSON.stringify(o);
  }

  onConstellationClick(event: Event) {
    event.stopPropagation();
    let configs = this.measurements_configs
      .filter(m => { m.type.isConstellation == true })
    if (configs) {
      this.measurements_configs = [...configs]
      console.log(this.measurements_configs.length);
    }
  }
  onDeviceClick(event: Event) {
    event.stopPropagation();
    let configs = this.measurements_configs
      .filter(m => { m.type.isConstellation == false })
    if (configs) {
      this.measurements_configs = [...configs]
      console.log(this.measurements_configs.length);
    }
  }

}
