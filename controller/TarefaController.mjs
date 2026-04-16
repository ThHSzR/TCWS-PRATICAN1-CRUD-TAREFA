import { Tarefa }        from '../model/Tarefa.mjs';
import { TarefaService } from '../service/TarefaService.mjs';

const service = new TarefaService();

export class TarefaController {
  listarTarefas() {
    return service.buscarTodas();
  }

  adicionarTarefa(descricao) {
    if (!descricao?.trim()) throw new Error('Descrição é obrigatória');
    const lista  = service.buscarTodas();
    const tarefa = new Tarefa({ descricao });
    lista.push(tarefa);
    service.salvarTodas(lista);
    return tarefa;
  }

  atualizarTarefa(id, novosDados) {
    const lista = service.buscarTodas().map(t =>
      t.id === id ? { ...t, ...novosDados, id } : t
    );
    service.salvarTodas(lista);
  }

  removerTarefa(id) {
    const lista = service.buscarTodas().filter(t => t.id !== id);
    service.salvarTodas(lista);
  }

  alternarConclusao(id) {
    const tarefa = service.buscarTodas().find(t => t.id === id);
    if (!tarefa) return;
    this.atualizarTarefa(id, { concluida: !tarefa.concluida });
  }
}