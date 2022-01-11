import { AuthContext } from "auth/AuthContext";

// custom hooks for accessing the context
export const useAuth = () => useContext(AuthContext);
