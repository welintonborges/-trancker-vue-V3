import IProjeto from "./IProjeto.vue";

export default interface ITarefa {
  duracaoEmSegundos: number,
  descricao: string,
  projeto: IProjeto
}