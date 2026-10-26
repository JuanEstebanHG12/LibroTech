import {createContext, useState, useEffect} from "react";
import {ENV} from "../utils";
import {getMe} from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {                                                                                                       
        (async () => {                                                                                                        
          const accessToken = localStorage.getItem(ENV.JWT.ACCESS);                                                           
          const refreshToken = localStorage.getItem(ENV.JWT.REFRESH);                                                         
                                                                                                               
          if (!accessToken || !refreshToken) {                                                                                
            logout();                                                                                                         
            setLoading(false);                                                                                                
            return;                                                                                                           
          }                                                                                                                   
                                                                                                                              
          // Intentamos obtener el usuario.                                                                                   
          // ¡Si el accessToken caducó, axiosClient hará el refresh automáticamente!                                          
          await login();                                                                                                      
          setLoading(false);                                                                                                  
        })();                                                                                                                 
      }, []);  

  const login = async() => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      logout(); // Si hay un error, cerramos sesión
    }
  };

  const logout = () => {                                                                                                  
        setUser(null);                                                                                                        
        localStorage.removeItem(ENV.JWT.ACCESS);                                                                              
        localStorage.removeItem(ENV.JWT.REFRESH);                                                                             
      };

  if (loading) {
    return null; // O un componente de carga mientras se verifica la sesión
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}