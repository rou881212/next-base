import React from 'react'

export default function JsxMap() {
  // 以ul-li 呈現以下陣列值
  const aa = [1, 4, 9, 16]

  //準備要渲染的陣列方法
  const ab = aa.map((v, i) => {
    return <li key={i}>{v}</li>
  })

  // ab相當於
  // [<li key={i}>{v}</li>],
  // [<li key={0}>1</li>],
  // [<li key={1}>4</li>],
  // [<li key={2}>9</li>],
  // [<li key={3}>16</li>]

  return (
    <>
      <h1>JSX中陣列map渲染範例</h1>
      <hr />
      <ul>{ab}</ul>
      {/* 實作上不需要額外宣告ab,直接在jsx中寫map */}
      <ul>
        {aa.map((v, i) => {
          return <li key={i}>{v}</li>
        })}
      </ul>
    </>
  )
}
