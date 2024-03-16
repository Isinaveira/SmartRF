
import { Device } from '@/models/device.model';
import { User } from '@/models/user.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  devices: Device[] = [
    {
      id_dispositivo: 1,
      coordenadas: { lng: -8.689038314733466,lat: 42.17065472083152},
      estado: "activo",
      fecha_ultima_lectura: "2024-02-23T10:00:00Z",
      imagen_path: "../../assets/dispositivo1.jpg",
      lecturas: [
        { canal: 1, potencia: -55 },
        { canal: 2, potencia: -53 },
        { canal: 3, potencia: -50 },
        { canal: 4, potencia: -48 },
        { canal: 5, potencia: -46 },
        { canal: 6, potencia: -44 },
        { canal: 7, potencia: -42 },
        { canal: 8, potencia: -40 },
        { canal: 9, potencia: -38 },
        { canal: 10, potencia: -36 },
      ],
    },
    {
      id_dispositivo: 2,
      coordenadas: { lng: -8.689744429290187, lat: 42.169751113048505 },
      estado: "inactivo",
      fecha_ultima_lectura: "2024-02-22T15:30:00Z",
      imagen_path: "../../assets/dispositivo2.jpg",
      lecturas: [
        { canal: 1, potencia: -55 },
        { canal: 2, potencia: -53 },
        { canal: 3, potencia: -50 },
        { canal: 4, potencia: -48 },
        { canal: 5, potencia: -46 },
        { canal: 6, potencia: -44 },
        { canal: 7, potencia: -42 },
        { canal: 8, potencia: -40 },
        { canal: 9, potencia: -38 },
        { canal: 10, potencia: -36 },
      ],
    },
    {
      id_dispositivo: 3,
      coordenadas: { lng: -8.687306048086725, lat: 42.17065472083152 },
      estado: "activo",
      fecha_ultima_lectura: "2024-02-24T09:20:00Z",
      imagen_path: "../../assets/dispositivo3.jpg",
      lecturas: [
        { canal: 1, potencia: -52 },
        { canal: 2, potencia: -50 },
        { canal: 3, potencia: -48 },
        { canal: 4, potencia: -46 },
        { canal: 5, potencia: -44 },
        { canal: 6, potencia: -42 },
        { canal: 7, potencia: -40 },
        { canal: 8, potencia: -38 },
        { canal: 9, potencia: -36 },
        { canal: 10, potencia: -34 },
      ],
    },
    {
      id_dispositivo: 4,
      coordenadas: { lng: -8.686259576153134, lat: 42.16949508849626 },
      estado: "inactivo",
      fecha_ultima_lectura: "2024-02-25T14:45:00Z",
      imagen_path: "../../assets/dispositivo4.jpg",
      lecturas: [
        { canal: 1, potencia: -58 },
        { canal: 2, potencia: -56 },
        { canal: 3, potencia: -54 },
        { canal: 4, potencia: -52 },
        { canal: 5, potencia: -50 },
        { canal: 6, potencia: -48 },
        { canal: 7, potencia: -46 },
        { canal: 8, potencia: -44 },
        { canal: 9, potencia: -42 },
        { canal: 10, potencia: -40 },
      ],
    },
    {
      id_dispositivo: 5,
      coordenadas: { lng: -8.686955530788651, lat: 42.168855022583045 },
      estado: "activo",
      fecha_ultima_lectura: "2024-02-26T12:10:00Z",
      imagen_path: "../../assets/dispositivo5.jpg",
      lecturas: [
        { canal: 1, potencia: -55 },
        { canal: 2, potencia: -53 },
        { canal: 3, potencia: -50 },
        { canal: 4, potencia: -48 },
        { canal: 5, potencia: -46 },
        { canal: 6, potencia: -44 },
        { canal: 7, potencia: -42 },
        { canal: 8, potencia: -40 },
        { canal: 9, potencia: -38 },
        { canal: 10, potencia: -36 },
      ],
    },
    {
      id_dispositivo: 6,
      coordenadas: { lng: -8.688469359118926, lat: 42.1688211365599 },
      estado: "inactivo",
      fecha_ultima_lectura: "2024-02-27T08:30:00Z",
      imagen_path: "../../assets/dispositivo6.jpg",
      lecturas: [
        { canal: 1, potencia: -52 },
        { canal: 2, potencia: -50 },
        { canal: 3, potencia: -48 },
        { canal: 4, potencia: -46 },
        { canal: 5, potencia: -44 },
        { canal: 6, potencia: -42 },
        { canal: 7, potencia: -40 },
        { canal: 8, potencia: -38 },
        { canal: 9, potencia: -36 },
        { canal: 10, potencia: -34 },
      ],
    },
  ];

  users: User[] = [
    {
      "name": "John Doe",
      "dni": "12345678B",
      "email": "john.doe@example.com",
      "role": "usuario",
      "department": "Televés",
      "password": "password123"
    },
    {
      "name": "Jane Smith",
      "dni": "12345678C",
      "email": "jane.smith@example.com",
      "role": "admin",
      "department": "Televés",
      "password": "password123"
    },
    {
      "name": "Alice Johnson",
      "dni": "12345678D",
      "email": "alice.johnson@example.com",
      "role": "usuario",
      "department": "Gradiant",
      "password": "password123"
    },
    {
      "name": "Robert Brown",
      "dni": "12345678E",
      "email": "robert.brown@example.com",
      "role": "admin",
      "department": "Gradiant",
      "password": "password123"
    },
    {
      "name": "Emily Clark",
      "dni": "12345678F",
      "email": "emily.clark@example.com",
      "role": "usuario",
      "department": "Surcontrol",
      "password": "password123"
    },
    {
      "name": "David Smith",
      "dni": "12345678G",
      "email": "david.smith@example.com",
      "role": "usuario",
      "department": "Surcontrol",
      "password": "password123"
    },
    {
      "name": "Sophia Wilson",
      "dni": "12345678H",
      "email": "sophia.wilson@example.com",
      "role": "admin",
      "department": "Surcontrol",
      "password": "password123"
    },
    {
      "name": "Michael Johnson",
      "dni": "12345678I",
      "email": "michael.johnson@example.com",
      "role": "usuario",
      "department": "Televés",
      "password": "password123"
    },
    {
      "name": "Olivia Martin",
      "dni": "12345678J",
      "email": "olivia.martin@example.com",
      "role": "usuario",
      "department": "Televés",
      "password": "password123"
    },
    {
      "name": "James Davis",
      "dni": "12345678K",
      "email": "james.davis@example.com",
      "role": "admin",
      "department": "Televés",
      "password": "password123"
    }
  ]
  

  constructor() { }

  
}
