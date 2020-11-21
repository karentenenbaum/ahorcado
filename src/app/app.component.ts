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
  palabraOculta = '';
  index = 0;

  palabras = [
    {
      palabra: 'hola',
      pistas: ['pista1', 'pista2']
    },
    {
      palabra: 'chau',
      pistas: ['123', '123']
    },
    {
      palabra: 'qtal',
      pistas: ['xx', 'dd']
    }
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

        this.intentos = 0;
        this.gano = false;
        this.perdio = false;
      } else {
        this.end = true;
      }
    }, 3000);
  }


}
