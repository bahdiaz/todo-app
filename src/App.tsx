import React, { useState } from "react";
import TargetList from "./components/TargetList";
import TargetForm from "./components/TargetForm";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshTargets = () => setRefresh(!refresh);

  return (
    <div>
      <TargetForm onSuccess={refreshTargets} />
      <TargetList key={refresh.toString()} />
    </div>
  );
};

export default App;
