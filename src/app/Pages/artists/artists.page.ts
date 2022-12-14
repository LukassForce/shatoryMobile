import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/services/artist.service';
import {  Router } from '@angular/router';
import { Location } from '@angular/common';
import { Artist } from 'src/app/interfaces/artist';
import { ActivatedRoute } from '@angular/router';
import { PerfilArtistaPage } from '../perfil-artista/perfil-artista.page';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.page.html',
  styleUrls: ['./artists.page.scss'],
})
export class ArtistsPage implements OnInit {
  list: Array<Artist> = [];
  constructor(private artistService: ArtistService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.showLoading();
    this.getArtists();
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',

    });

    loading.present();
  }
  getArtists() {
    this.artistService.getArtists().subscribe(data => {
      this.loadingCtrl.dismiss();
      this.list = data;
    });
  }

  obtenerArtista(id: any){
    this.artistService.getArtistById(id).subscribe();
    this.router.navigate(['perfil-artista/'+JSON.stringify(id)]);
  }
}
