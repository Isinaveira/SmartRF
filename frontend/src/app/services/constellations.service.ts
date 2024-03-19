import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Constellation } from '@/models/constellation.model';

@Injectable({
  providedIn: 'root'
})
export class ConstellationsService {

  constellations: Constellation[] = [
    {
      _id: "1",
      name: "Andromeda",
      createdAt: "2024-03-15T00:00:00.000Z",
      isActive: true,
      devices_list: ["1", "2", "3", "4", "5", "6"]
    },
    {
      _id: "2",
      name: "Orion",
      createdAt: "2024-03-14T00:00:00.000Z",
      isActive: true,
      devices_list: ["4", "5"]
    },
    {
      _id: "3",
      name: "Cassiopeia",
      createdAt: "2024-03-13T00:00:00.000Z",
      isActive: false,
      devices_list: ["4", "6", "3", "1"]
    },
    {
      _id: "4",
      name: "Ursa Major",
      createdAt: "2024-03-12T00:00:00.000Z",
      isActive: true,
      devices_list: ["1"]
    },
    {
      _id: "5",
      name: "Scorpius",
      createdAt: "2024-03-11T00:00:00.000Z",
      isActive: false,
      devices_list: ["5", "2"]
    },
    {
      _id: "6",
      name: "Lyra",
      createdAt: "2024-03-10T00:00:00.000Z",
      isActive: true,
      devices_list: ["1", "3", "6"]
    }
  ];
  

  constructor() { }

  //obtener constelaciones

  //editar constelaciones

  //eliminar constelaciones

}
