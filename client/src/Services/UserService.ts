import { IUserSignup } from "../interfaces/IUserDetails"



export const removeToken = async (): Promise<void> => {
    localStorage.removeItem('userToken')
}


export const doSignUp = async (userData: IUserSignup): Promise<{ error: string | undefined }> => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })

        const data = await response.json()


        if (!response.ok) return { error: data }
        return { error: undefined }

    } catch (err) {
        const errMessage = (err as Error).message
        return { error: errMessage }
    }
}



