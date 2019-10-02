import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router
    ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
          if (errorResponse.status == 404) {
            this.router.navigate(['/page-not-found']);
            return;
        }

        if(errorResponse.status === 403) {
          msg = 'Você não tem permissão para executar essa ação';
        }
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse.error;

        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.toasty.error(msg);
  }

}
