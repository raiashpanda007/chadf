import {string, z as zod } from 'zod'

export interface User {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    accounts: Account[]
    sessions: Session[]
}
export interface Session {
    id: string
    userId: string
    expires: Date
    sessionToken: string
    accessToken: string
    createdAt: Date
    updatedAt: Date
    user: User
}
export interface Account {
    id: string
    userId: string
    providerType: string
    providerId: string
    providerAccountId: string
    refreshToken: string | null
    accessToken: string | null
    accessTokenExpires: Date | null
    createdAt: Date
    updatedAt: Date
    user: User
}



export const CreateChatSchema = zod.object({
    filePath: zod.string(),
    name: zod.string().min(1,'Please provide name for the chat').optional(),
})
