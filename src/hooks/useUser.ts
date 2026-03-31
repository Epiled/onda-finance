import { useAuthStore } from "./useAuthStore";

export function useUser() {
  const user = useAuthStore((state) => state.user);
  
  if (!user) {
    throw new Error("Usuário não identificado");
  }
  
  return user;
}