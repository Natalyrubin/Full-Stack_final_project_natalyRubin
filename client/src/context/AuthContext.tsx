import { jwtDecode } from "jwt-decode"
import { createContext, useState } from "react"
import { IUserDetailsType, IUserCustomJwtPayload, IUserAuthContextType, IUserSignup } from "../interfaces/IUserDetails"
import { doSignUp, removeToken } from "../Services/UserService"





export const AuthContext = createContext<IUserAuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const [isCustomer, setIsCustomer] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const [userDetails, setUserDetails] = useState<IUserDetailsType | undefined>(undefined)



    const getUserById = async (): Promise<null | string> => {
        const token: null | string = localStorage.getItem('userToken')
        if (!token) return null

        const decoded = jwtDecode<IUserCustomJwtPayload>(token)

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/users/${decoded._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            })

            if (!response.ok) throw new Error(response.statusText)

            const responseData = await response.json();
            const userDetails: IUserDetailsType = responseData.data;
            setUserDetails(userDetails)



            return null

        } catch (err) {
            const errMessage = (err as Error).message
            return errMessage
        }
    }


    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("http://127.0.0.1:3000/api/users/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()


            if (!response.ok) throw new Error(data.message || "Login failed")

            const token = data.token;
            const decoded = jwtDecode<IUserCustomJwtPayload>(token)

            setIsSignedIn(true)
            setIsCustomer(decoded.isCustomer)
            setIsAdmin(decoded.isAdmin)

            localStorage.setItem('userToken', token)

            const errorMessage = await getUserById()
            if (errorMessage) throw new Error(errorMessage)

        } catch (err) {
            const errMessage = (err as Error).message
            return errMessage
        }
    }







    const logOut = async () => {
        alert("You'r Sign Out")
        setIsSignedIn(false)
        await removeToken()
        setUserDetails(undefined)
    }

    const signUp = async (userData: IUserSignup): Promise<{ error: string | undefined }> => {
        try {
            let { error } = await doSignUp(userData);

            if (error) {
                logOut();
                return { error };
            }
            return { error: undefined };
        } catch (err) {
            const errMessage = (err as Error).message;
            return { error: errMessage };
        }
    }


    const loadUserFromLS = async () => {
        const userToken = localStorage.getItem('userToken')
        if (!userToken) return
        const user = jwtDecode<IUserCustomJwtPayload>(userToken)
        setIsSignedIn(true)
        setIsCustomer(user.isCustomer)
        setIsAdmin(user.isAdmin)
        await getUserById();
    }




    const updateUserDetails = async (updatedUserData: Partial<IUserDetailsType>): Promise<{ error: string | undefined }> => {
        const token = localStorage.getItem('userToken');

        if (!token) {
            return { error: 'לא נמצא טוקן' };
        }

        const decoded = jwtDecode<IUserCustomJwtPayload>(token);
        const userId = decoded._id;

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(updatedUserData)
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'נכשל בעדכון פרטי המשתמש');
            }

            const result = await response.json();
            setUserDetails(result.data);

            return { error: undefined };

        } catch (err) {
            const errMessage = (err as Error).message;
            return { error: errMessage };
        }
    };



    return (
        <AuthContext.Provider value={{ isSignedIn, isCustomer, isAdmin, userDetails, login, logOut, signUp, loadUserFromLS, updateUserDetails }}>
            {children}
        </AuthContext.Provider>
    )
}





