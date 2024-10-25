import React, { useEffect, useState } from "react";
import { getTargets, getTodos } from "../api/requests";
import { Target, Todo } from "../types";
import styles from "./styles/TargetList.module.css";

const TargetList: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTargetId, setSelectedTargetId] = useState<number | null>(null);

  useEffect(() => {
    getTargets().then((response) => setTargets(response.data));
  }, []);

  const handleTargetClick = (id: number) => {
    setSelectedTargetId(id);
    getTodos().then((response) => {
      const filteredTodos = response.data.filter(
        (todo) => todo.targetId === id
      );
      setTodos(filteredTodos);
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Targets</h1>
      <ul className={styles.targetList}>
        {targets.map((target) => (
          <li
            key={target.id}
            className={styles.targetItem}
            onClick={() => handleTargetClick(target.id)}
          >
            {target.title}
          </li>
        ))}
      </ul>

      {selectedTargetId && (
        <div className={styles.todoList}>
          <h2>TODOs do Target {selectedTargetId}</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className={styles.todoItem}>
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TargetList;
