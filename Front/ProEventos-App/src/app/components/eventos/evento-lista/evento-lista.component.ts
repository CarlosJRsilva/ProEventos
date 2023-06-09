import { Router } from '@angular/router';
import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent {

  public get eventoService(): EventoService {
    return this._eventoService;
  }
  public set eventoService(value: EventoService) {
    this._eventoService = value;
  }
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
      private _eventoService: EventoService,
      private modalService: BsModalService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService,
      private router: Router
  ) { }

  public ngOnInit(): void {
        /** spinner starts on init */
        this.spinner.show();

        setTimeout(() => {
          /** spinner ends after 5 seconds */
        }, 5000);

    this.getEventos();

  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
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
