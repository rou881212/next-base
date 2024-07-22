import React from 'react'

export default function ChildA({ dataFromChild = '' }) {
  return (
    <>
      <h3>Child A(子女 A)</h3>
      {/* <p>來自父母元件的資料: {pData}</p> */}
      <p>來自子女元件B的資料: {dataFromChild}</p>
    </>
  )
}