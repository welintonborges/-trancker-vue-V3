import {TipoNotificacao} from "../interfaces/INotificacao";
import {NOTIFICAR} from "../store/tipo-Mutacoes";

export const notificacaoMixin = {
    methods:{
        notificar(tipo: TipoNotificacao, titulo: string, texto: string){
            this.store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            })
        }
    }
}