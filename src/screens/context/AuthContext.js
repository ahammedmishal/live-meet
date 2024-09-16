import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const AuthContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Fetch user data (e.g., from an API or storage)
        const fetchUserData = async () => {
            const fetchedUser = await AsyncStorage.getItem('UserId');
            console.log(fetchedUser);
            setUser(fetchedUser);
            setLoading(false);
        };
        fetchUserData();
    }, []);

    if (loading) {
        // Render a loading indicator or null until user data is fetched
        return null; // or <LoadingComponent />
    }
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
