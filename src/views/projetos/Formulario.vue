<script  lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from "@/store/index.vue";
import {ALTERA_PROJETO} from "@/store/tipo-Mutacoes";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import {notificacaoMixin} from "@/minixs/Notificar";
import useNotificador from '@/hooks/Notificador'
import {ALTERAR_PROJETOS, CADASTRA_PROJETOS} from "@/store/tipo-acoes";

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
        this.store.dispatch(ALTERAR_PROJETOS, {
          id: this.id,
          nome: this.nomeDoProjeto,
        }).then(() => this.lidarComSucesso())
            .catch(() => this.lidarComError());
      }else{
        this.store.dispatch(CADASTRA_PROJETOS, this.nomeDoProjeto)
        .then(() => this.lidarComSucesso()).catch(() => this.lidarComError())
      }
    },
    lidarComSucesso(){
      this.nomeDoProjeto = "";
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto foi cadastrado com sucesso')
      this.$router.push("/projetos");
    },
    lidarComError(){
      this.notificar(TipoNotificacao.FALHA, 'Falha', 'O projeto não foi cadastrado ')
    }
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