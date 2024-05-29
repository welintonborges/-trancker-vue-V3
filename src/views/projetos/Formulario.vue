<script  lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from "@/store/index.vue";
import {ADICIONA_PROJETO, ALTERA_PROJETO, NOTIFICAR} from "@/store/Tipo-Mutacoes";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import {notificacaoMixin} from "@/minixs/Notificar";
import useNotificador from '@/hooks/Notificador'

export default defineComponent({
  name: 'Formulario',
  props: {
    id: {
      type: String
    }
  },
  mixins:[notificacaoMixin],
  mounted () {
    if(this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data() {
      return{
        nomeDoProjeto: "",
      };
  },
  methods:{
    salvar(){
      if(this.id){
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        });
      }else{
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = "";
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Oprojeto foi cadastrado com sucesso')
      this.$router.push("/projetos");
    },

  },
  setup() {
          const store = useStore()
          const { notificar }  = useNotificador()
       return{
         store,
         notificar,
         // projetos: computed(()=> store.state.projetos)
       }
  },
})
</script>

<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
  <form @submit.prevent="salvar">
    <div class="field">
      <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
      <input type="text" id="nomeDoProjeto" class="input" v-model="nomeDoProjeto"  />
    </div>
    <div class="field">
      <button class="button" type="submit">Salvar</button>
    </div>
  </form>
</section>
</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>