import React from 'react'
import Child from './child'

export default function Parent() {
  return (
    <>
      <h2>Parent(父母)</h2>
      {/* 誰render誰 (父母render子女) */}
      {/* 父母元件利用類似HTML給定屬性值的方式，傳遞各種類型的值給子女元件 */}
      {/* <Child
        title="今天正在學react"
        price={123}
        isConnected={true}
        aa={[1, 2, 3]}
        oa={{ a: 1, b: 2 }}
        sum={(x, y) => x + y}
      />
      <hr />
      <Child /> */}
      <Child title="cde" price="abc" isConnected={123} />
    </>
  )
}