import React, { useState } from "react";
import TargetList from "./components/TargetList";
import TargetForm from "./components/TargetForm";
import styles from "./components/styles/App.module.css";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshTargets = () => setRefresh(!refresh);

  return (
    <div className={styles.appContainer}>
      <TargetForm onSuccess={refreshTargets} />
      <TargetList key={refresh.toString()} />
    </div>
  );
};

export default App;
