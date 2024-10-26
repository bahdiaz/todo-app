import React, { useState, useEffect } from "react";
import { createTodo, updateTodo, getTodoById } from "../api/requests";
import styles from "./styles/TodoForm.module.css";

interface TodoFormProps {
  todoId?: number; // ID para edição (opcional)
  targetId: number; // ID do Target relacionado
  onSuccess: () => void; // Callback para atualizar a lista após o submit
}

const TodoForm: React.FC<TodoFormProps> = ({ todoId, targetId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Carrega os dados do TODO para edição, caso todoId seja passado
  useEffect(() => {
    if (todoId) {
      getTodoById(todoId).then((response) => {
        const todo = response.data;
        setTitle(todo.title);
        setDescription(todo.description || "");
        setIsComplete(todo.isComplete);
      });
    }
  }, [todoId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (todoId) {
      await updateTodo(todoId, { title, description, isComplete, targetId });
    } else {
      await createTodo({ title, description, isComplete, targetId });
    }
    onSuccess(); // Atualiza a lista após o submit
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        {todoId ? "Editar TODO" : "Novo TODO"}
      </h3>

      <label className={styles.formLabel}>Título</label>
      <input
        type="text"
        className={styles.formField}
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className={styles.formLabel}>Descrição</label>
      <textarea
        className={styles.formField}
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className={styles.formLabel}>
        Concluído
        <input
          type="checkbox"
          checked={isComplete}
          onChange={(e) => setIsComplete(e.target.checked)}
        />
      </label>

      <button type="submit" className={styles.submitButton}>
        {todoId ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
};

export default TodoForm;
