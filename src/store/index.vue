<script lang="ts">
import IProjetos from "@/interfaces/IProjeto.vue";
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {defineComponent, InjectionKey} from "vue";
import IProjeto from "@/interfaces/IProjeto.vue";
import {ALTERA_PROJETO, ADICIONA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR, DEFINIRR_PROJETO} from "@/store/tipo-Mutacoes";
import {INotificacao} from "@/interfaces/INotificacao";
import {ALTERAR_PROJETOS, CADASTRA_PROJETOS, OBTER_PROJETOS, REMOVER_PROJETOS} from "@/store/tipo-acoes";
import http from "@/http";

export default defineComponent({
  name: 'Index'
})

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
       projetos:[],
       notificacoes:[]
  },
   mutations:{
    [ADICIONA_PROJETO](state , nomeDoProjeto: string){
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto
      state.projetos.push(projeto)
     },
     [ALTERA_PROJETO](state, projeto: IProjeto){
      const index = state.projetos.findIndex(proj => proj.id === projeto.id);
      state.projetos[index] = projeto;
     },
     [EXCLUIR_PROJETO](state, id: string) {
       state.projetos = state.projetos.filter(proj => proj.id != id)
     },
     [DEFINIRR_PROJETO](state, projetos: IProjeto[]) {
       state.projetos = projetos
     },
     [NOTIFICAR] (state, novaNotificacao: INotificacao) {

       novaNotificacao.id = new Date().getTime()
       state.notificacoes.push(novaNotificacao)

       setTimeout(() => {
         state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
       }, 3000)
     }
   },
   actions:{
    [OBTER_PROJETOS]({ commit }){
      http.get('projetos')
          .then(respota => commit(DEFINIRR_PROJETO, respota.data))
    },
     [CADASTRA_PROJETOS](contexto, nomeDoProjeto: string){
      return http.post('/projetos',{
        nome: nomeDoProjeto,
      })
     },
     [ALTERAR_PROJETOS](contexto, projeto: IProjeto){
       return http.put(`/projetos/${projeto.id}`, projeto)
     },
     [REMOVER_PROJETOS]({ commit }, id: string){
       return http.delete(`/projetos/${id}`)
           .then(() => commit(EXCLUIR_PROJETO, id))
     }
   }
})

interface Estado {
  projetos: IProjetos[],
  notificacoes: INotificacao[]
}

export function useStore() : Store<Estado>{
  return vuexUseStore(key)
}
</script>

<template>

</template>

<style scoped>

</style>


