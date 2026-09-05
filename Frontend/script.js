const API_URL = 'http://127.0.0.1:8000';

const botaoadd = document.querySelector('.add button');

botaoadd.addEventListener('click', () => {
    const descricao = prompt('Digite a tarefa que deseja adicionar:');

    if (descricao) {
        fetch(`${API_URL}/tarefas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao: descricao })
        })
        .then(response => response.json())
        .then(data => {
            alert('Tarefa adicionada com sucesso!');
            atualizarLista();
        });
    }
});

const botaoview = document.querySelector('.view button');
const listaTarefas = document.getElementById('lista-tarefas');

function atualizarLista() {
    fetch(`${API_URL}/tarefas`)
        .then(response => response.json())
        .then(data => {
            listaTarefas.innerHTML = '';
            
            if (data.length === 0) {
            const mensagemVazia = document.createElement('li');
            mensagemVazia.textContent = 'Nenhuma tarefa ainda! Adicione a primeira 🎉';
            listaTarefas.appendChild(mensagemVazia);
            return;
            }
     
            data.forEach((tarefa, indice) => {
                const item = document.createElement('li');
                const status = tarefa.concluida ? 'X' : ' ';
                item.textContent = `${indice} - [${status}] ${tarefa.descricao}`;
                listaTarefas.appendChild(item);
            });
        });
}

botaoview.addEventListener('click', atualizarLista);

const botaoconcluir = document.querySelector('.complete button');

botaoconcluir.addEventListener('click', () => {
    const indice = prompt('Digite o número da tarefa que deseja concluir:');

    if (indice !== null) {
        fetch(`${API_URL}/tarefas/${indice}`, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(data => {
            alert('Tarefa concluída com sucesso!');
            atualizarLista();
        });
    }
});

const botaoremover = document.querySelector('.remove button');

botaoremover.addEventListener('click', () => {
    const indice = prompt('Digite o número da tarefa que deseja remover:');

    if (indice !== null) {
        fetch(`${API_URL}/tarefas/${indice}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Tarefa removida com sucesso!');
            atualizarLista();
        });
    }
});