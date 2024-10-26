import React, { useState } from "react";
import TargetList from "./components/TargetList";
import TargetForm from "./components/TargetForm";
import TodoForm from "./components/TodoForm";
import styles from "./styles/App.module.css";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTargetId, setSelectedTargetId] = useState<number | null>(null);

  const refreshTargets = () => setRefresh(!refresh);

  return (
    <div className={styles.appContainer}>
      <TargetForm onSuccess={refreshTargets} />
      {selectedTargetId && (
        <TodoForm targetId={selectedTargetId} onSuccess={refreshTargets} />
      )}
      <TargetList key={refresh.toString()} />
    </div>
  );
};

export default App;
