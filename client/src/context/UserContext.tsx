import { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextProps {
    children: ReactNode;
}

interface UserContextData {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}


const UserContext = createContext<UserContextData | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};



export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <UserContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </UserContext.Provider>
    );
};


