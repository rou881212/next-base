// 目的1: 將context provider(提供者)中的共享狀態集中統一管理
// 目的2: 包裝useContext，提供一個對應適合的名稱為useAuth，方便消費者(consumers)呼叫使用共享狀態，提高閱讀性
import { createContext, useState, useContext } from 'react'

// 1. 建立context與導出它
// 傳入參數為defaultValue，是在套用context時錯誤或失敗才會得到的值。
// 可以使用有意義的預設值，或使用null(通常目的是為了除錯)
const AuthContext = createContext(null)

// 2. 建立AuthProvider元件
// props.children屬性，代表包裏在Provider中的所有子女元件內容
export function AuthProvider({ children }) {
  // 會員的狀態
  const [auth, setAuth] = useState({
    isAuth: false, // 代表會員是否有登入的信號值
    // 會員的資料
    userData: {
      id: 0,
      name: '',
      email: '',
      username: '',
    },
  })

  const login = () => {
    setAuth({
      isAuth: true,
      userData: {
        id: 1,
        name: '哈利',
        email: 'herry@test.com',
        username: 'herry',
      },
    })

    alert('登入成功!')
  }

  const logout = () => {
    setAuth({
      isAuth: false,
      userData: {
        id: 0,
        name: '',
        email: '',
        username: '',
      },
    })

    alert('你已成功登出!')
  }
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. 建立一個包裝useContext的useAuth
export const useAuth = () => useContext(AuthContext)
