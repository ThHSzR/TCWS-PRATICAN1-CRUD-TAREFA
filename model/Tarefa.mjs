export class Tarefa {
  constructor({ id = null, descricao, concluida = false }) {
    this.id        = id ?? Date.now().toString();
    this.descricao = descricao.trim();
    this.concluida = concluida;
  }
}