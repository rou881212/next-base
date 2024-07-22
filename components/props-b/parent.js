import { useState } from 'react'
import ChildA from './child-a'
import ChildB from './child-b'

export default function Parent() {
  // 狀態為元件內部私有，其它元件都無法得知
  //   const [pData, setPData] = useState('parent data')

  // 宣告一組專門要給Child B傳資料的狀態
  const [dataFromChild, setDataFromChild] = useState('')

  return (
    <>
      <h2>Parent(父母)</h2>
      {/* P->C 獲得狀態值的變數 */}
      <ChildA dataFromChild={dataFromChild} />
      {/* C->P 用設定狀態的函式傳給子女元件 */}
      <ChildB setDataFromChild={setDataFromChild} />
    </>
  )
}
