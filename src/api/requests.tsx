import { api } from "./axios";
import { Target, Todo } from "../types";

// **Targets**
export const getTargets = () => api.get<Target[]>("Targets");
export const getTargetById = (id: number) => api.get<Target>(`Targets/${id}`);
export const createTarget = (data: Omit<Target, "id">) =>
  api.post("Targets", data);
export const updateTarget = (id: number, data: Partial<Target>) =>
  api.put(`Targets/${id}`, data);
export const deleteTarget = (id: number) => api.delete(`Targets/${id}`);

// **TODOs**
export const getTodos = () => api.get<Todo[]>("Todo");
export const getTodoById = (id: number) => api.get<Todo>(`Todo/${id}`);
export const createTodo = (data: Omit<Todo, "id">) => api.post("Todo", data);
export const updateTodo = (id: number, data: Partial<Todo>) =>
  api.put(`Todo/${id}`, data);
export const deleteTodo = (id: number) => api.delete(`Todo/${id}`);
