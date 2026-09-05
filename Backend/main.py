from fastapi import FastAPI
from pydantic import BaseModel #Garante que os dados serão recebidos de forma correta.
from fastapi.middleware.cors import CORSMiddleware #Retirar as restrições e permitir que meu html faça requisições para minha API.

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

tarefas = []

class Tarefa(BaseModel):
    descricao: str

@app.get("/tarefas") 
def listar_tarefas():
    return tarefas

@app.post("/tarefas")
def adicionar_tarefa(tarefa: Tarefa):
    nova_tarefa = {"descricao": tarefa.descricao, "concluida": False}
    tarefas.append(nova_tarefa)
    return nova_tarefa

@app.put("/tarefas/{indice}")
def concluir_tarefa(indice:int):
    tarefas[indice]["concluida"] = True
    return tarefas[indice]

@app.delete("/tarefas/{indice}")
def deletar_tarefa(indice:int):
    tarefa_deletada = tarefas.pop(indice)
    return tarefa_deletada