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
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span style="${t.concluida ? 'text-decoration:line-through;color:#888' : ''}">
            ${t.descricao}
          </span>
          <div>
            <button class="btn btn-sm btn-outline-success me-1"
              onclick="alternar('${t.id}')">
              ${t.concluida ? '↩ Reabrir' : '✔ Concluir'}
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