import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Cuestionario';
  temaCuestionario: string = ''
  cuestionarios: any[] = [];
  // Creamos un formulario
  formQuestions!: FormGroup;
  
  constructor( private fb: FormBuilder, private dataService: DataService ){}

  async ngOnInit() {
    this.formQuestions = this.fb.group({});
    await this.dataService.obtenerCuestionario(1).then( (data: any) => {
      // this.formQuestions = this.fb.group({});
      // Tenemos que recorrer el arreglo de preguntas para generar el formulario
      this.temaCuestionario = data.resultado.find( (elemento: any) => elemento.hasOwnProperty('tema') )?.tema || '';
      // Recorremos el array de resultados
      this.cuestionarios = data.resultado[0].preguntas;
      data.resultado.forEach(( { tema, activo, preguntas }: any ) => {
        // Tenemos que recorrer el array de preguntas para hacer el formulario dinamico
        preguntas.forEach( (pregunta: any) => {
          this.formQuestions.addControl( `${pregunta.idPregunta}`, new FormControl('', Validators.required) );
        });
      });
    });

    // console.log('Formulario: ', this.formQuestions);
    
  }

  onSubmit(){
    if(!this.formQuestions.valid) 
      return;

    console.log('Formulario: ', this.formQuestions.value);
  }



}
