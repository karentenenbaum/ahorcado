import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  end = false;

  palabra = '';
  pistas = [];
  selected = [];
  palabraOculta = '';
  index = 0;

  palabras = [
    {
      palabra: 'FISICAS',
      pistas: ['Estas personas comienzan a existir desde que son concebidas en el seno materno']
    },
    {
      palabra: 'JURIDICAS',
      pistas: ['Estas personas nacen de acuerdo a un acto jurídico o acto de constitución, o sea,' +
      ' un evento jurídico de fundación que es reconocido por los organismos y autoridades administrativas,']
    },
    {
      palabra: 'PATRIMONIO',
      pistas: ['Atributo de la personalidad que se define como el conjunto de bienes y obligaciones pertenecientes a una persona natural o jurídica' +
      'que son susceptibles de ser valorados economicamente']
    },
    {
      palabra: 'CAPACIDAD',
      pistas: ['Atributo de la personalidad que consiste en la aptitud de contraer derechos y obligaciones']
    },
    {
      palabra: 'ESTADO',
      pistas: ['Atributo de la personalidad que solo tienen las personas de existencia visible']
    },
    {
      palabra: 'MUEBLES',
      pistas: ['Clasificación de las cosas: Son aquellos bienes que por su naturaleza pueden transportarse de un lugar a otro.']
    },
    {
      palabra: 'CONTRATO',
      pistas: ['Acuerdo entre dos o más personas sobre una declaración de voluntad común destinada a reglar sus derechos']
    },
    {
      palabra: 'ACREEDOR',
      pistas: ['Parte de un contrato que tiene derecho a pedir que se cumpla una obligación, especialmente que se le pague una deuda.']
    },
    {
      palabra: 'OBLIGACION',
      pistas: ['Vínculo o relación jurídica en virtud de la cual una persona ( acreedor) tiene la facultad de exigir de otra ( deudor)' +
      ' un determinado comportamiento positivo o negativo ( prestación), de cuyo cumplimiento responderá en última instancia el patrimonio del deudor.']
    },
  ];


  intentos = 0;

  gano = false;
  perdio = false;


  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


  constructor() {
  }

  ngOnInit() {
    this.palabra = this.palabras[this.index].palabra.toUpperCase();
    this.pistas = this.palabras[this.index].pistas;
    this.palabraOculta = '_ '.repeat(this.palabra.length);
  }

  comprobar(letra) {
    this.existeLetra(letra);
    const palabraOcultaArr = this.palabraOculta.split(' ');

    for (let i = 0; i < this.palabra.length; i++) {
      if (this.palabra[i] === letra) {
        palabraOcultaArr[i] = letra;
      }
    }

    this.palabraOculta = palabraOcultaArr.join(' ');
    this.verificaGane();
  }

  verificaGane() {

    const palabraArr = this.palabraOculta.split(' ');
    const palabraEvaluar = palabraArr.join('');

    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      this.resetPalabras('win');
      console.log('Usuario GANO');
    }

    if (this.intentos >= 9) {
      this.perdio = true;
      this.resetPalabras('lose');
      console.log('Usuario perdió');
    }

  }

  existeLetra(letra) {
    if (!(this.palabra.indexOf(letra) >= 0)) {
      this.selected.push(letra);
      this.intentos++;
    }
  }

  resetPalabras(type) {
    setTimeout(() => {
      if ((this.index + 1) !== this.palabras.length) {
        this.index = this.index + 1;
        this.palabra = this.palabras[this.index].palabra.toUpperCase();
        this.palabraOculta = '_ '.repeat(this.palabra.length);
        this.pistas = [];
        this.pistas = this.palabras[this.index].pistas;
        this.selected = [];

        this.intentos = 0;
        this.gano = false;
        this.perdio = false;
      } else {
        this.end = true;
      }
    }, 2000);
  }


}
