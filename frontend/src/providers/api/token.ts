import axios from 'axios'

export const AUTH_TOKEN = 'garanto-authorization'

export const api_client = axios

export function setToken(token: string): void {
    window.localStorage.setItem(AUTH_TOKEN, token)
}

export function unsetToken(): void {
    window.localStorage.removeItem(AUTH_TOKEN)
}

export function getToken(): string | null {
    return window.localStorage.getItem(AUTH_TOKEN)
}