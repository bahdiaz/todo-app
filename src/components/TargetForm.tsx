import React, { useState, useEffect } from "react";
import { createTarget, updateTarget, getTargetById } from "../api/requests";
import styles from "./styles/TargetForm.module.css";

interface TargetFormProps {
  targetId?: number; // ID para edição (opcional)
  onSuccess: () => void; // Callback para atualizar a lista após submit
}

const TargetForm: React.FC<TargetFormProps> = ({ targetId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Carrega os dados do Target para edição, caso targetId seja passado
  useEffect(() => {
    if (targetId) {
      getTargetById(targetId).then((response) => {
        const target = response.data;
        setTitle(target.title);
        setDescription(target.description || "");
        setIsComplete(target.isComplete);
      });
    }
  }, [targetId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (targetId) {
      await updateTarget(targetId, { title, description, isComplete });
    } else {
      await createTarget({ title, description, isComplete });
    }
    onSuccess(); // Atualiza a lista após o submit
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        {targetId ? "Editar Target" : "Novo Target"}
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
        {targetId ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
};

export default TargetForm;
