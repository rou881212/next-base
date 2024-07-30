import { useRef } from 'react'

export default function InputRef() {
  // 1. 宣告一個ref物件(可變的mutable)
  // 執行後`inputRef = { current: null }`
  // 對照的是document.getElementById這個方法
  // 所以初始值會使用null值
  const inputRef = useRef(null)

  return (
    <>
      <h2>input-text使用ref</h2>
      {/* 2. 使用ref來指定 */}
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          // 3. 要獲取dom元件實體參照使用.current屬性值
          inputRef.current.focus()
        }}
      >
        聚焦
      </button>
      <button
        onClick={() => {
          inputRef.current.blur()
        }}
      >
        失焦
      </button>
      <button
        onClick={() => {
          alert(inputRef.current.value)
        }}
      >
        獲得值
      </button>
    </>
  )
}