import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [
    {
      Tema: 'Angular 11',
      Local: 'Vila Velha'
    },
    {
      Tema: '.NET 5',
      Local: 'Vitória'
    },
    {
      Tema: 'Angular e as suas novidades',
      Local: 'Florianópolis'
    },
  ]
  constructor() { }

  ngOnInit(): void {

  }
}
