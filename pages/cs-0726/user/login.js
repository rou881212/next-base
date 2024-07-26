import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'

export default function Login() {
  // 2. 在任何後代元件層級深度，使⽤ useContext(MyContext)勾⼦讀取它
  const { auth, login, logout } = useAuth()

  // 定義路由器
  const router = useRouter()

  return (
    <>
      <h1>會員登入頁</h1>
      <hr />
      <p>
        {/* 不要使用a連結，因為會導致頁面重新整理載入，context中的狀態會回復初始值 */}
        <a href="/cs-0726/user/profile">連至 會員個人資料頁(a連結)</a>
      </p>
      {/* Link元件取代a連結，可以保持目前的狀態值 */}
      <Link href="/cs-0726/user/profile">連至 會員個人資料頁(Link元件)</Link>
      <hr />
      <p>目前登入狀況: {auth.isAuth ? '已登入' : '未登入'}</p>
      <button
        onClick={() => {
          login()
          // 登入後跳轉到個人資料頁(使用router)
          // router.push也可以跳轉到某個路由路徑中，保持目前的狀態值
          router.push('/cs-0726/user/profile')
        }}
      >
        登入
      </button>
      <button onClick={logout}>登出</button>
    </>
  )
}
