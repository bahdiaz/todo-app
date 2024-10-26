import React, { useState } from "react";
import TargetList from "./components/TargetList";
import TargetForm from "./components/TargetForm";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  // Função para atualizar a lista de Targets e gerar um novo valor de key
  const refreshTargets = () => setRefresh(!refresh);

  return (
    <div>
      <TargetForm onSuccess={refreshTargets} />
      {/* Gera um timestamp como key para garantir que seja único */}
      <TargetList key={refresh ? Date.now() : Date.now() + 1} />
    </div>
  );
};

export default App;
