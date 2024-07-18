import React from 'react'

export default function JsxRender() {
  return (
    <>
      <h1>JSX中各種值render(渲染)範例</h1>
      <hr />
      <h2>number(數字)</h2>
      {123}
      {1 - 1}
      {NaN}
      <hr />
      <h2>string(字串)</h2>
      hello
      {'      '}
      {'hello'}
      {`price=${100 - 1}`}
      <hr />
      <h2>boolean(布林)</h2>
      {/* 不會渲染呈現 */}
      {true}
      {false}
      <hr />
      <h2>null/undefined</h2>
      {/* 不會渲染呈現 */}
      {null}
      {undefined}
      <hr />
      <h2>array(陣列)</h2>
      {/* 類似array.join('') */}
      {[1, 2, 3]}
      {['hello', 'a', 'b']}
      {[<p key="1">1</p>, <p key="2">2</p>]}
      <hr />
      <h2>object(物件)</h2>
      {/* 不能直接渲染，會造成執行錯誤，不是合法的React Child */}
      {/* {{ a: 1, b: 2 }} */}
      <hr />
      <h2>function(函式)</h2>
      {/* 不會渲染呈現，會有警告，不是合法的React Child */}
      {/* {() => {}} */}
    </>
  )
}
