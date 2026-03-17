import React, { createContext, useContext, useState } from 'react'

// ログイン状況に関する関数や状態をまとめたもの。
type AuthContextType = {
    token: string | null
    login: (token: string) => void
    logout: () => void
    isLoggedIn: boolean
    username: string
    setUsername: (name: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [token, setToken] = useState<string | null> (
        localStorage.getItem('token')
    )

    const [username, setUsername] = useState<string>(
        localStorage.getItem('username') || ''
    )

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setToken(null)
        setUsername('')
    }

    return (
        // Claude CodeのコードとかにはProviderがつくけど、
        // 調べてみたらProviderをつけたりするのはReact 19以上では非推奨（古い書き方）
        // とされてるみたい。
        <AuthContext value={{token, login, logout, isLoggedIn: !!token, username, setUsername}}>
            { children }
        </AuthContext>
    )
}

// カスタムフックでコンテクストを簡潔に取り出せるようにしている。
// このログイン情報はすべてのコンポーネントで共有されるべきもので、
// それぞれのコンポーネントによってどれが選択されるべきかが変わるため、
// const { user_id } = useAuth()
// のようにしたらすぐに取り出せる。
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('Err')
    return context
}