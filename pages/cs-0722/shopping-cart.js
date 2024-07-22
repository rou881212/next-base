import { useState } from 'react'

const initialProducts = [
  {
    id: 0,
    name: '小熊餅乾',
    count: 1,
  },
  {
    id: 1,
    name: '巧克力豆餅乾',
    count: 5,
  },
  {
    id: 2,
    name: '小老板海苔',
    count: 2,
  },
]

export default function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts)

  // 處理遞增
  const handleIncrease = (productId) => {
    const nextProducts = products.map((v) => {
      // 如果符合條件(id是productId)，回傳修改其中屬性count遞增的物件值
      if (v.id === productId) return { ...v, count: v.count + 1 }
      // 否則回傳原物件
      else return v
    })

    // 設定到狀態中
    setProducts(nextProducts)
  }

  // 處理遞減
  const handleDecrease = (productId) => {
    const nextProducts = products.map((v) => {
      // 如果符合條件(id是productId)，回傳修改其中屬性count遞減的物件值
      if (v.id === productId) return { ...v, count: v.count - 1 }
      // 否則回傳原物件
      else return v
    })

    // 設定到狀態中
    setProducts(nextProducts)
  }

  // 處理移除
  const handleRemove = (productId) => {
    const nextProducts = products.filter((v, i) => {
      return v.id !== productId
    })
    // 設定到狀態中
    setProducts(nextProducts)
  }

  // 官網解法:
  // https://react.dev/learn/updating-arrays-in-state#challenges
  function handleDecreaseClick(productId) {
    // 遞減一樣都會動作
    // 這裡一定要用let，下面filter要重新指定
    let nextProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count - 1,
        }
      } else {
        return product
      }
    })
    // 這裡過濾出商品數量大於0的
    nextProducts = nextProducts.filter((p) => p.count > 0)
    // 設定到狀態中
    setProducts(nextProducts)
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} (<b>{product.count}</b>)
          <button
            onClick={() => {
              handleIncrease(product.id)
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              handleDecreaseClick(product.id)
            }}
          >
            –(官網解法)
          </button>
          <button
            onClick={() => {
              // 先計算(預計)按了按鈕後，商品數量會變為多少
              const nextCount = product.count - 1
              // 如果按了後商品數量<= 0，進行移除
              if (nextCount <= 0) {
                if (confirm('你確定要移除此商品嗎?')) {
                  handleRemove(product.id)
                }
              } else {
                handleDecrease(product.id)
              }
            }}
          >
            –
          </button>
        </li>
      ))}
    </ul>
  )
}
