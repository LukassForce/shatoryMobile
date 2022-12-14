import { Component, OnInit } from '@angular/core';
import { LocaService } from 'src/app/services/local/loca.service';
import { Local } from 'src/app/interfaces/local';
import { ActivatedRoute } from '@angular/router';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { EventoService } from 'src/app/services/evento/evento.service';
import { Evento } from 'src/app/interfaces/evento';
import { Marker } from 'src/app/interfaces/marker';
declare var google;

@Component({
  selector: 'app-perfil-local',
  templateUrl: './perfil-local.page.html',
  styleUrls: ['./perfil-local.page.scss'],
})
export class PerfilLocalPage implements OnInit {

  list: Array<Local> = [];
  data: any;
  localForm: any;
  isRed: boolean;
  eventos: Array<any> = [];
  map: any = null;
 

  constructor(private activatedRouter: ActivatedRoute, private localesService: LocaService, private eventoService: EventoService) {
    this.data = this.activatedRouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.isRed = true;
    this.obtenerLocal(this.data);
    this.obtenerEvento();
  }

  obtenerLocal(id: any) {
    this.localesService.getLocalsByName(id).subscribe(data => {
      this.list[0] = data;
      this.loadMap(this.list);
    });
  }
  changesHeart(){
    if(!this.isRed){
      document.getElementById('heart').style.color = 'red';
      this.isRed = true;
    }
    else{
      document.getElementById('heart').style.color = 'white';
      this.isRed = false;
    }
  }
  obtenerEvento(){
    this.eventoService.getEvents().subscribe(data => {
      this.eventos = data;
      this.changesDate(); 
    });
  }
  verifIdLocal(id: any){
    if (id == this.data){
      return true;
    }else{
      return false;
    }
  }
  changesDate(){
    let i;
    for( i =0; i < this.eventos.length ; i++){
      const date = new Date(this.eventos[i].fecha);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      // const hour = date.getHours();
      // const minutes = date.getMinutes();
      // const seconds = date.getSeconds();
      // this.list[i].date = day + '/' + month + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds;
      this.eventos[i].fecha = day + '/' + month + '/' + year;
    }
  }

  loadMap(local) {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = { lat: local[0].latitud, lng: local[0].longitud };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');

      const marker = {
        position: {
          lat: local[0].latitud,
          lng: local[0].longitud
        },
        title: local[0].nombre
      };
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker){
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }
}