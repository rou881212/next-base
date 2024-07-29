import { createContext, useState, useContext, useEffect } from 'react'
// import { useRouter } from 'next/router'

// 1. 建立context
const CartContext = createContext(null)

// 2. 建立CartProvider元件
export function CartProvider({ children }) {
  // const router = useRouter()
  const [didMount, setDidMount] = useState(false)

  // 加入到購物車的項目，和原本的商品物件值相比多了一個qty(數量)屬性
  const [cartItems, setCartItems] = useState([])

  // 處理遞增
  const handleIncrease = (productId) => {
    const nextCartItems = cartItems.map((v) => {
      // 如果符合條件(id是productId)，回傳修改其中屬性qty遞增的物件值
      if (v.id === productId) return { ...v, qty: v.qty + 1 }
      // 否則回傳原物件
      else return v
    })

    // 設定到狀態中
    setCartItems(nextCartItems)
  }

  // 處理遞減
  const handleDecrease = (productId) => {
    const nextCartItems = cartItems.map((v) => {
      // 如果符合條件(id是productId)，回傳修改其中屬性qty遞減的物件值
      if (v.id === productId) return { ...v, qty: v.qty - 1 }
      // 否則回傳原物件
      else return v
    })

    // 設定到狀態中
    setCartItems(nextCartItems)
  }

  // 處理移除
  const handleRemove = (productId) => {
    const nextCartItems = cartItems.filter((v) => {
      return v.id !== productId
    })
    // 設定到狀態中
    setCartItems(nextCartItems)
  }

  // 處理商品
  const handleAdd = (product) => {
    // 先判斷此商品是否已經在購物車中
    const foundIndex = cartItems.findIndex((v) => v.id === product.id)

    if (foundIndex > -1) {
      // 如果有 --> 遞增數量(qty屬性+1)
      // 套用遞增處理函式
      handleIncrease(product.id)
    } else {
      // 如果沒有 --> 新增商品
      // 先寫出要新增的物件值，擴增一個qty屬性，預設為1
      const newCartItem = { ...product, qty: 1 }
      const nextCartItems = [newCartItem, ...cartItems]
      // 設定到狀態中
      setCartItems(nextCartItems)
    }
  }

  // // 計算總數量
  // const calcTotalQty = () => {
  //   let total = 0

  //   for (let i = 0; i < cartItems.length; i++) {
  //     total += cartItems[i].qty
  //   }

  //   return total
  // }

  // // 計算總金額
  // const calcTotalPrice = () => {
  //   let total = 0

  //   for (let i = 0; i < cartItems.length; i++) {
  //     total += cartItems[i].qty * cartItems[i].price
  //   }

  //   return total
  // }

  // 計算總金額與數量(使用陣列reduce迭代方法)
  const totalQty = cartItems.reduce((acc, v) => acc + v.qty, 0)
  const totalPrice = cartItems.reduce((acc, v) => acc + v.qty * v.price, 0)

  // 初次渲染的時間點，從localstorage讀出資料設定到狀態中
  useEffect(() => {
    setDidMount(true)
    // 保護語法，避免掉ssr重覆渲染的情況
    if (typeof window !== 'undefined') {
      setCartItems(JSON.parse(localStorage.getItem('cart')) || [])
    }
  }, [])

  // 購物車資料有更動(新增、刪除、修改)時，寫入localstorage
  useEffect(() => {
    if (didMount) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }

    console.log(`save ${cartItems.length} to localstorage`)
  }, [cartItems, didMount])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalQty,
        handleAdd,
        handleDecrease,
        handleIncrease,
        handleRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// 3. 建立一個包裝useContext的useCart
export const useCart = () => useContext(CartContext)
