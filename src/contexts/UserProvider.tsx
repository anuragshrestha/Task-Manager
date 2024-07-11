import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { FIREBASE_AUTH } from "../firebase/FireBaseAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const UserContext = createContext({} as any);

export const UserProvider = ({ children } : {children: React.ReactNode}) => {

    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [onBoarded, setOnBoarded] = useState(false);
    const [isOnBoardingChecking, setIsOnBoardingChecking] = useState(false)
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
        setUser(user);
        setIsAuthenticating(false);
      });
      return unsubscribe;
    }, []);

  
    useEffect(() => {
      if (!!user) {
        setIsOnBoardingChecking(true)
        const getOnBoardingStatus = async () => {
        if (!user?.email) {
          return null
        }
      const status = await AsyncStorage.getItem(user?.email)
      setIsOnBoardingChecking(false)
      if (!!status) setOnBoarded(true)
      }
      getOnBoardingStatus()
    }
    }, [user])
  
  
const value = {
    isAuthenticating,
    setIsAuthenticating,
    user,
    onBoarded,
    setOnBoarded,
    isOnBoardingChecking
}

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
