<script lang="ts">
import IProjetos from "@/interfaces/IProjeto.vue";
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {defineComponent, InjectionKey} from "vue";
import IProjeto from "@/interfaces/IProjeto.vue";
import {ALTERA_PROJETO, ADICIONA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR} from "@/store/Tipo-Mutacoes";
import {INotificacao} from "@/interfaces/INotificacao";

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
     [NOTIFICAR] (state, novaNotificacao: INotificacao) {

       novaNotificacao.id = new Date().getTime()
       state.notificacoes.push(novaNotificacao)

       setTimeout(() => {
         state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
       }, 3000)
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


