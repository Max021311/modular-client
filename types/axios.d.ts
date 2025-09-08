import type { AxiosInstance, HeadersDefaults } from 'axios'

type Scopes = keyof HeadersDefaults

export interface CustomAxiosInstance extends AxiosInstance {
  setHeader: (key: string, value: string | null, scopes?: Scopes[]) => void
  setToken: (token: string, type?: string | null, scopes?: Scopes[]) => void
}
