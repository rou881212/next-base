import { useState } from 'react'

// 範例資料
import data from '@/data/books.json'

import Item from './item'

export default function List() {
  // 先擴增原本的書籍資料，多一個能代表是否有加入收藏(或我的最愛)的屬性值fav(布林值，預設為false)
  const initState = data.map((v) => {
    return { ...v, fav: false }
  })

  // 宣告狀態
  const [books, setBooks] = useState(initState)

  // 處理fav屬性布林值切換的函式
  const handleToggleFav = (isbn) => {
    const nextBooks = books.map((v, i) => {
      // 如果符合條件(isbn是傳入的isbn)，回傳修改其中屬性fav為反相布林值的物件值
      if (v.isbn === isbn) return { ...v, fav: !v.fav }
      // 否則回傳原物件
      else return v
    })

    setBooks(nextBooks)
  }

  return (
    <>
      <h1>書籍清單(元件拆解組合範例)</h1>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>書名</th>
            <th>作者</th>
            <th>加入收藏</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const { isbn, author, title, fav } = book

            return (
              <Item
                // key要加入map裡面的回調函式
                key={isbn}
                // book={book}
                isbn={isbn}
                author={author}
                title={title}
                fav={fav}
                handleToggleFav={handleToggleFav}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}
