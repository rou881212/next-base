import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function EffectPattern() {
  const [total, setTotal] = useState(0)

  // 樣式1: 沒有第二個傳入參數(相依變數陣列)
  // 意義: 每次渲染之後(after)，都會執行一次第一個傳入參數(作用回調函式)中的程式碼
  // 用途: 一般應用很少使用，主要用於記錄or除錯，或是一些特殊勾子開發
  useEffect(() => {
    //console.log('每次渲染之後(after)，都會執行一次這裡')
  })

  // 樣式2: 第二個傳入參數總是保持空陣列
  // 意義: 首次渲染之後(after)，執行一次第一個傳入參數(作用回調函式)中的程式碼。之後因沒有任何與變數相依，不會再執行。(註: 此行為是有加入第二個傳參數(相依變數陣列)的預設行為。)
  // 用途: 最常使用的樣式，近似於didMount生命周期方法執行的時間點。頁面首次呈現後，和伺服器作fetch/ajax獲取資料呈現在頁面上，或是整合第三方JS應用。
  useEffect(() => {
    //console.log('首次渲染之後(after)，會執行一次這裡，之後不會再執行。')
  }, [])
  // ^^ 這裡保持空白陣列，代表不與任何相依變數相依，相當於套用"有加入第二傳入參數的預設行為"

  // 樣式3: 第二傳入參數中有相依變數
  // 意義: 首次渲染之後(after)，執行一次第一個傳入參數(作用回調函式)中的程式碼。當相依變數更動後，會再執行一次。
  // 用途: 第二常使用的樣式，近似於didMount+didUpdate二合一的生命周期方法執行時間點。
  // 狀態異步的解決方案之一，通常用於狀態更動連鎖A->B->C。不同資料要套用到同一個元件上。
  useEffect(() => {
    console.log(
      '首次渲染之後(after)，會執行一次這裡。之後當total更動後，會再執行這裡一次。'
    )
  }, [total])
  // ^^^^^^^ total加入相依變數陣列中，代表要監聽total狀態的更動(change)事件

  // 樣式4: 第一個傳入參數(作用回調函式)的回傳值(是另個函式)
  // 意義: 元件被移出真實DOM之前(before)會執行一次
  // 用途: 近似於willUnmount階段(被稱為cleanup)，通常搭配樣式2使用，作元件移出前的"清理工作"
  useEffect(() => {
    return () => {
      console.log('元件被移出真實DOM之前(before)會執行一次')
    }
  }, [])

  return (
    <>
      <h1>Effect應用4種樣式</h1>
      <hr />
      <Link href="/">連至 首頁</Link>
      <h1>{total}</h1>
      <button
        onClick={() => {
          setTotal(total + 1)
        }}
      >
        +1
      </button>
    </>
  )
}
