# CRUD de Tarefas — MVC + localStorage

Aplicação de gerenciamento de tarefas (To-Do List) desenvolvida com JavaScript moderno (ES6+), seguindo a arquitetura MVC e persistência local via localStorage.

## Tecnologias

- JavaScript ES6+ (módulos `.mjs`)
- HTML5 + Bootstrap 5
- localStorage

## Estrutura do Projeto
crud-tarefas/
├── index.html
├── main.mjs
├── package.json
├── model/
│ └── Tarefa.mjs
├── service/
│ └── TarefaService.mjs
└── controller/
└── TarefaController.mjs

text

## Funcionalidades

- Adicionar tarefa
- Listar tarefas
- Editar descrição da tarefa
- Marcar/desmarcar como concluída
- Excluir tarefa
- Persistência automática via localStorage
