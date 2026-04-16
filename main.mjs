import { TarefaController } from './controller/TarefaController.mjs';

const controller = new TarefaController();

const form      = document.getElementById('form-tarefa');
const inputDesc = document.getElementById('input-descricao');
const listaEl   = document.getElementById('lista-tarefas');

function renderizar() {
  const tarefas = controller.listarTarefas();

  listaEl.innerHTML = tarefas.length === 0
    ? '<li class="list-group-item text-muted text-center">Nenhuma tarefa cadastrada.</li>'
    : tarefas.map(t => `
        <li class="list-group-item d-flex justify-content-between align-items-center gap-2">
          <span style="${t.concluida ? 'text-decoration:line-through;color:#888' : ''}">
            ${t.descricao}
          </span>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-secondary"
              onclick="editar('${t.id}', '${t.descricao.replace(/'/g, "\\'")}')">Editar</button>
            <button class="btn btn-sm btn-outline-success"
              onclick="alternar('${t.id}')">
              ${t.concluida ? '↩ Reabrir' : 'Concluir'}
            </button>
            <button class="btn btn-sm btn-outline-danger"
              onclick="remover('${t.id}')">Excluir</button>
          </div>
        </li>`
      ).join('');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    controller.adicionarTarefa(inputDesc.value);
    inputDesc.value = '';
    renderizar();
  } catch (err) {
    alert(err.message);
  }
});

window.editar = (id, descricaoAtual) => {
  const nova = prompt('Editar tarefa:', descricaoAtual);
  if (nova === null) return;           // cancelou
  if (!nova.trim()) {
    alert('Descrição não pode ser vazia.');
    return;
  }
  controller.atualizarTarefa(id, { descricao: nova.trim() });
  renderizar();
};

window.alternar = (id) => {
  controller.alternarConclusao(id);
  renderizar();
};

window.remover = (id) => {
  if (confirm('Confirma a exclusão?')) {
    controller.removerTarefa(id);
    renderizar();
  }
};

document.addEventListener('DOMContentLoaded', renderizar);