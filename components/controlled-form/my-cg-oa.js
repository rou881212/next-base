import { useState } from 'react'

// checkbox group object array
export default function MyCgOa() {
  // 選項陣列
  const petOptions = ['狗', '貓', '倉鼠']

  // 轉換為物件陣列
  const initState = petOptions.map((v, i) => {
    return { id: i + 1, label: v, checked: false }
  })

  // 定義核取方塊群組的狀態 - 物件陣列
  const [pets, setPets] = useState(initState)

  // 處理checked屬性布林值切換的函式
  const handleToggleChecked = (id) => {
    const nextPets = pets.map((v, i) => {
      // 如果符合條件(id是傳入的id)，回傳修改其中屬性checked為反相布林值的物件值
      if (v.id === id) return { ...v, checked: !v.checked }
      // 否則回傳原物件
      else return v
    })

    setPets(nextPets)
  }

  // 處理全選
  const handleCheckboxGroupAll = (e) => {
    // 強制讓所有的選項的checked屬性，和e.target.checked一致
    const nextPets = pets.map((v, i) => {
      return { ...v, checked: e.target.checked }
    })

    setPets(nextPets)
  }

  return (
    <>
      <div title="checkbox-group">
        <h2>核取方塊群組(checkbox-group)-物件陣列</h2>
        <div>
          <input
            type="checkbox"
            // 全選是否有勾選，是依照所有myPets狀態裡記錄與所有選項的比對，當pets成員中的checked屬性都是true，就是true
            // every會測試陣列中所有成員，當每個成員都能通過測試的回調函式，才會回傳true
            checked={pets.every((v) => v.checked)}
            onChange={handleCheckboxGroupAll}
          />{' '}
          全選
        </div>
        {pets.map((v, i) => {
          return (
            <label key={v.id}>
              <input
                type="checkbox"
                checked={v.checked}
                onChange={() => {
                  handleToggleChecked(v.id)
                }}
              />
              {v.label}
            </label>
          )
        })}
      </div>
    </>
  )
}
