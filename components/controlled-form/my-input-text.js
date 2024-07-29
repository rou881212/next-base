import { useState } from 'react'
import InputIME from '@/components/controlled-form/input-ime'

export default function MyInputText() {
  // 文字輸入框
  const [inputText, setInputText] = useState('')
  // 數字輸入框
  const [inputNumber, setInputNumber] = useState(0)
  // 日期輸入框
  // 字串值(格式是 yyyy-mm-dd 字串)
  const [inputDate, setInputDate] = useState('')
  // 轉換函式
  // 時間日期物件 ==> yyyy-mm-dd 字串
  // sv是swedish語言(svenska)，此語言使用的格式是ISO 8601
  const dateToString = (date = null) =>
    date instanceof Date ? date.toLocaleDateString('sv') : ''
  // yyyy-mm-dd 字串 ==> 時間日期物件
  const stringToDate = (str = '') => new Date(str)
  // 時間日期物件(特殊物件，初始值可以用null或使用今天、某天)
  const [inputDateObj, setInputDateObj] = useState(null)

  // 密碼輸入框
  const [inputPassword, setInputPassword] = useState('')

  // 顯示密碼的核取方塊用
  const [show, setShow] = useState(false)

  return (
    <>
      <div title="input-text">
        <h2>文字輸入框(input-text)</h2>
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
          }}
        />
        <h2>文字輸入框(input-text)輸入法組字時間略過</h2>
        {/* 修正在中文輸入法組字期間會略過設定到狀態裡 */}
        <InputIME
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
          }}
        />
        <h2>數字輸入框(input-number)</h2>
        <input
          type="number"
          value={inputNumber}
          min={0}
          max={100}
          step={1}
          onChange={(e) => {
            // 為了保持一致的狀態資料類型
            // 設定到狀態時要先轉換為數字
            // setInputNumber(+e.target.value)
            setInputNumber(Number(e.target.value))
          }}
        />
        <h2>日期輸入框(input-date)-字串值</h2>
        <input
          type="date"
          value={inputDate}
          onChange={(e) => {
            setInputDate(e.target.value)
          }}
        />
        <h2>日期輸入框(input-date)-時間日期物件值</h2>
        <input
          type="date"
          // 呈現時要轉換為yyyy-mm-dd字串
          value={dateToString(inputDateObj)}
          onChange={(e) => {
            // 設定到狀態前要先轉換為時間日期物件
            setInputDateObj(stringToDate(e.target.value))
          }}
        />
        <h2>密碼輸入框(input-password)</h2>
        <input
          type={show ? 'text' : 'password'}
          value={inputPassword}
          onChange={(e) => {
            setInputPassword(e.target.value)
          }}
        />
        <input
          type="checkbox"
          checked={show}
          onChange={(e) => {
            // 第一種寫法，使用事件觸發目標對象的checked值
            //setShow(e.target.checked)
            // 第二種寫法，使用布林值切換
            setShow(!show)
          }}
        />{' '}
        顯示密碼
      </div>
    </>
  )
}
