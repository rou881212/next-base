import { useState, useEffect } from 'react'

export default function ChildB({ setDataFromChild = () => {} }) {
  // 狀態為元件內部私有，其它元件都無法得知
  const [cData, setCData] = useState('child b data')

  //設定狀態的函式有副作用(不能直接在元件主體裡呼叫)
  //setDataFromChild(cData)

  //正確的第2種方式
  useEffect(() => {
    // 元件第一次渲染之後執行其中程式碼
    //setDataFromChild(cData)
  }, [])

  return (
    <>
      <h3>Child B(子女 B)</h3>
      <button
        onClick={() => {
          // 正確的第1種呼叫方式. 在事件處理函式呼叫
           setDataFromChild(cData)
        }}
      >
        傳資料給子女A
      </button>
    </>
  )
}