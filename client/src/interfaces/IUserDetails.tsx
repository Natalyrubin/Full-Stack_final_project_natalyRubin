export interface IUserDetailsType {
    _id: string
    name: {
        first: string
        last: string
    }
    phone: string
    email: string
    password: string
    image: {
        url: string
        alt: string
    }
    address: {
        state: string
        country: string
        city: string
        street: string
        houseNumber: number
        zip: string
    }
    isAdmin: boolean
    isCustomer: boolean
    createdAt: string
}



export interface IUserAuthContextType {
    isSignedIn: boolean
    isCustomer: boolean
    isAdmin: boolean
    userDetails: IUserDetailsType | undefined
    login: (email: string, password: string) => Promise<void | string>
    logOut: () => void
    signUp: ({ }: IUserSignup) => Promise<{ error: string | undefined }>
    loadUserFromLS: () => void
    updateUserDetails: (updatedUserData: Partial<IUserDetailsType>) => Promise<{ error: string | undefined }>;
}


export interface IUserCustomJwtPayload {
    _id: string
    isCustomer: boolean
    isAdmin: boolean
    iat: number
}


export interface IUserSignup {
    name: {
        first: string
        middle?: string
        last: string
    }
    phone: string
    email: string
    password: string
    image?: {
        url: string
        alt: string
    }
    address: {
        state?: string
        country: string
        city: string
        street: string
        houseNumber: number
        zip: string
    }
    isCustomer: boolean
}
