// src/components/TodoForm.tsx

import React, { useState } from "react";
import { createTodo, updateTodo } from "../api/requests";

interface TodoFormProps {
  todoId?: number; // ID para edição (opcional)
  targetId: number; // ID do Target ao qual o TODO pertence
  onSuccess: () => void; // Callback para recarregar a lista após o submit
}

const TodoForm: React.FC<TodoFormProps> = ({ todoId, targetId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (todoId) {
      await updateTodo(todoId, { title, description, isComplete, targetId });
    } else {
      await createTodo({ title, description, isComplete, targetId });
    }
    onSuccess(); // Atualiza a lista de TODOs
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{todoId ? "Editar TODO" : "Novo TODO"}</h3>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>
        Concluído
        <input
          type="checkbox"
          checked={isComplete}
          onChange={(e) => setIsComplete(e.target.checked)}
        />
      </label>
      <button type="submit">{todoId ? "Atualizar" : "Criar"}</button>
    </form>
  );
};

export default TodoForm;
