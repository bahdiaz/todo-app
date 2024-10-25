import React, { useEffect, useState } from "react";
import { getTargets, getTodos } from "../api/requests";
import { Target, Todo } from "../types";

const TargetList: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTargetId, setSelectedTargetId] = useState<number | null>(null);

  useEffect(() => {
    // Carrega todos os Targets na montagem do componente
    getTargets().then((response) => setTargets(response.data));
  }, []);

  const handleTargetClick = (id: number) => {
    setSelectedTargetId(id);
    // Filtra TODOs pelo targetId selecionado
    getTodos().then((response) => {
      const filteredTodos = response.data.filter(
        (todo) => todo.targetId === id
      );
      setTodos(filteredTodos);
    });
  };

  return (
    <div>
      <h1>Lista de Targets</h1>
      <ul>
        {targets.map((target) => (
          <li key={target.id} onClick={() => handleTargetClick(target.id)}>
            {target.title}
          </li>
        ))}
      </ul>

      {selectedTargetId && (
        <div>
          <h2>TODOs do Target {selectedTargetId}</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TargetList;
