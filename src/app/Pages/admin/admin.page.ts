import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/interfaces/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  
  data: any;
  nombreArtista : string;
  descripcion : string;
  linkImagen : string;
  
  constructor(private artistServcie:ArtistService, private alertController: AlertController , private activatedRouter: ActivatedRoute) { 
    this.data = this.activatedRouter.snapshot.paramMap.get('id');
  }
  
  ngOnInit() {

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Mensaje importante',
      message: 'Aritsta creado correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }
  enviarArtista(){
    const nuevoArtista : Artist = {
      nombreArtista : this.nombreArtista,
      descripcion : this.descripcion,
      linkImagen : this.linkImagen
    };

    const artistaJSON = JSON.stringify(nuevoArtista);

    this.artistServcie.createArtist(artistaJSON).subscribe(data =>{
      this.presentAlert();
      
    });

  }
  isDefault(){
    if(this.data === '0'){
      return true;
    }
    else{
      return false;
    }
  }
  isCreateArtist(){
    if(this.data === '1'){
      return true;
    }
    else{
      return false;
    }
  }

  isCreateLocal(){
    if(this.data === '2'){
      return true;
    }
    else{
      return false;
    }
  }
  isCreateEvent(){
    if(this.data === '3'){
      return true;
    }
    else{
      return false;
    }
  }
}
