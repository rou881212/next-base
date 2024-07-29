import { useState } from 'react'

export default function MyRadioButtonGroup() {
  // 選項按鈕群組
  // 選項陣列
  const petOptions = ['狗', '貓', '倉鼠']
  // 狀態值，從中選出一個
  const [pet, setPet] = useState('')

  return (
    <>
      <div title="radio-button-group">
        <h2>選項按鈕群組(radio button group)</h2>
        {petOptions.map((v, i) => {
          return (
            <label key={i}>
              <input
                type="radio"
                // 配合第二種寫法定義value屬性
                value={v}
                // 每個radio選項用自己本身的值v和狀態相比，相符會是true，反之是false
                checked={v === pet}
                onChange={(e) => {
                  // 第一種寫法，使用v值(map時得到的)
                  //setPet(v)
                  // 第二種寫法，使用事件目標對象值，注意要加上value屬性
                  setPet(e.target.value)
                }}
              />
              {v}
            </label>
          )
        })}
      </div>
    </>
  )
}
