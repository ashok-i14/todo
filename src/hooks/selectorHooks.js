import { useSelector } from "react-redux";

export function useTodos() {
  const state = useSelector(({ todo } = {}) => todo);
  return state;
}
