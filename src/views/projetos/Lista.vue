<script  lang="ts">
import {computed, defineComponent} from 'vue';
import { useStore } from "@/store/index.vue";
import {EXCLUIR_PROJETO} from "@/store/tipo-Mutacoes";
import {OBTER_PROJETOS, REMOVER_PROJETOS} from "@/store/tipo-acoes";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/Notificador";

export default defineComponent({
  name: 'Lista',
  methods:{
    excluir(id: string){
     this.store.dispatch(REMOVER_PROJETOS, id)
         .then(() =>  this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto excluido com sucesso'))
         .catch(() => this.notificar(TipoNotificacao.FALHA, 'Falha', 'O projeto não foi excluido'));
    }
  },
  setup() {
      const store = useStore()
      store.dispatch(OBTER_PROJETOS)
    const { notificar }  = useNotificador()
    return{
        store,
      notificar,
      projetos: computed(()=> store.state.projetos)
    }
  },
})
</script>

<template>
  <section class="projetos">
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth">
    <thead>
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Ações</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="projeto in projetos" :key="projeto.id">
      <td>{{ projeto.id }}</td>
      <td>{{ projeto.nome }}</td>
      <td>
        <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
        </router-link>
        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</section>
</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>