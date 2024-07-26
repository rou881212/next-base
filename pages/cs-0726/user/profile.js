import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export default function Profile() {
  // 2. 在任何後代元件層級深度，使⽤ useContext(MyContext)勾⼦讀取它
  const { auth } = useAuth()

  return (
    <>
      <h1>會員資料頁</h1>
      <hr />
      <Link href="/cs-0726/user/login">連至 會員登入頁</Link>
      <hr />
      <p>會員id {auth?.userData?.id}</p>
      <p>帳號 {auth?.userData?.username}</p>
      <p>email {auth?.userData?.email}</p>
      <p>姓名 {auth?.userData?.name}</p>
    </>
  )
}
