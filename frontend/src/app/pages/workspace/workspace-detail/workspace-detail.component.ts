import { MeasurementsService } from '@/services/measurements.service';
import { UsersService } from '@/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workspace-detail',
  standalone: true,
  imports: [],
  templateUrl: './workspace-detail.component.html',
  styleUrl: './workspace-detail.component.css'
})
export class WorkspaceDetailComponent implements OnInit{


constructor(
  private router: Router,
  private route: ActivatedRoute,
  private usersService: UsersService,
  private measurements: MeasurementsService
){}


ngOnInit(){
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    console.log("El valor del parámetro '/id' es:", id);

    if(id == '1'){
      
    }else{

    }
  });
}



}
