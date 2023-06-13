import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  modalRef: BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  larguraImg: number = 150;
  margemImg: number = 2;
  exibirImg: boolean = true;
  private _filtroLista = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
      private eventoService: EventoService,
      private modalService: BsModalService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
        /** spinner starts on init */
        this.spinner.show();

        setTimeout(() => {
          /** spinner ends after 5 seconds */
        }, 3000);

    this.getEventos();

  }

  public alterarImagem(): void {
    this.exibirImg = !this.exibirImg;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
        next: (_eventos: Evento[]) => {
          this.eventos = _eventos;
          this.eventosFiltrados = this.eventos;
        },
        error: (Error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar os eventos!', 'Erro!');
          console.log(Error) },
        complete: () => this.spinner.hide()
     });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Evento Deletado com sucesso!', 'Deletado');
  }

  decline(): void {
    this.modalRef.hide();
  }

}
