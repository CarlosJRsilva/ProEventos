import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registragion',
  templateUrl: './registragion.component.html',
  styleUrls: ['./registragion.component.scss']
})
export class RegistragionComponent implements OnInit{

  form: FormGroup;

  get f(): any { return this.form.controls; }

  constructor(public fb: FormBuilder){}

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void{
    this.form = this.fb.group({
      primeiroNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      ultimoNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      usuario: ['',  [Validators.required, Validators.minLength(6)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
}
