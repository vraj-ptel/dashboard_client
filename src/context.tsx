
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

// Define the context value type
type AdminContextType = [boolean, Dispatch<SetStateAction<boolean>>];

// Create the context with a default value of null
const AdminContext = createContext<AdminContextType | null>(null);

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

// Provider component
export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState(false);
  return (
    <AdminContext.Provider value={[admin, setAdmin]}>
      {children}
    </AdminContext.Provider>
  );
}
