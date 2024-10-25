import React, { useState } from "react";
import { createTarget, updateTarget } from "../api/requests";

interface TargetFormProps {
  targetId?: number;
  onSuccess: () => void;
}

const TargetForm: React.FC<TargetFormProps> = ({ targetId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (targetId) {
      await updateTarget(targetId, { title, description, isComplete });
    } else {
      await createTarget({ title, description, isComplete });
    }
    onSuccess(); // Atualiza a lista de Targets
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{targetId ? "Editar Target" : "Novo Target"}</h3>
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
      <button type="submit">{targetId ? "Atualizar" : "Criar"}</button>
    </form>
  );
};

export default TargetForm;
