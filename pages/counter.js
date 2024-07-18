// 模組系統導入(部分or多重導入)
import { useState } from 'react'

// 1. 元件一定要預設導出
// 2. 元件的函示名稱一定要英文開頭大寫(大駝峰命名)
// 3. 元件函示並非一般的函示,實際上是"純函示"(pure function)
export default function Counter() {
  // 陣列解構賦值語法(設計為陣列是為了方便命名)
  // [獲得值的變數, 設定值的方法] = useState(初始化值)
  const [total, setTotal] = useState(0)

  // 函示型元件的return相當於類別型元件的render方法
  //<>...</> 只有開頭和結尾的標記是jsx中特有的標記(實際上是一個名為Fragment(片段)的原件)
  return (
    <>
      <h1>計數器</h1>
      {/* 以下加入花括號是為了要在jsx語法中嵌入js的值或表達式 */}
      <h1>{total}</h1>
      <button
        // onClick是react內部加入的"人造事件"屬性
        // 相當於由react在執行前協助進行addEventListener
        onClick={() => {
          setTotal(total + 1)
        }}
      >
        +1
      </button>
    </>
  )
}
