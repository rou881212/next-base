import next from 'next'
import { useState } from 'react'

const sample = [
  {
    id: 1,
    text: 'a',
  },
  {
    id: 2,
    text: 'b',
  },
  {
    id: 3,
    text: 'c',
  },
  {
    id: 4,
    text: 'aa',
  },
]

export default function ObjectArray() {
  // 呈現(渲染)時會與使用者互動時進行改動，必需是state
  const [data, setData] = useState(sample)

  return (
    <>
      <h1>物件陣列(object array)狀態的各種操作</h1>
      <hr />
      <h2>資料表格</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            return (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.text}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <hr />
      <h2>操作</h2>
      <p>
        <strong>
          注意: 請在任一操作前先重新整理網頁 ，或是對重覆id值進行加入時的限制。
        </strong>
        有些操作是key值會對應id的關係，會產生key值重覆問題，造成不預期的結果。實務上務必要考慮key不可以重覆問題。
      </p>

      <button
        onClick={() => {
          // 先寫出要新增的物件值
          const newObj = { id: 99, text: 'xxx' }

          // 1. 從目前的狀態拷貝出一個新的變數值(陣列/物件)
          // 2. 在新的變數值(陣列/物件)上作處理
          // 3. 設定回原本的狀態中

          //1 //2
          const nextData = [newObj, ...data]

          //3
          setData(nextData)
        }}
      >
        1. 列表最前面，新增一個物件值id為99與文字為xxx的物件
      </button>
      <br />
      <button
        onClick={() => {
          const newObj = { id: 88, text: 'yyy' }

          //1 //2
          const nextData = [...data, newObj]

          //3
          setData(nextData)
        }}
      >
        2. 列表最後面，新增一個物件值id為88與文字為yyy的物件
      </button>
      <br />
      <button
        onClick={() => {
          // 產生id的方式
          // 1. uuid或nanoid(函式庫，要另外安裝)
          //const newId = self.crypto.randomUUID()
          // 2. 簡單隨機字串的函式庫或語法
          // const newId = (Math.random() + 1).toString(36).substring(7)
          // 3. 日期時間字串，或是轉成毫秒整數
          // 也可以用`Number(new Date())`或`+new Date()`
          // const newId = Date.now()
          // 4. 仿照資料庫資料表自動遞增id數字值(注意，只能id是數字類型才能使用)
          // 提取目前的陣列中的id值為一個陣列，ids = [1,2,3,4]
          const ids = data.map((v) => v.id)
          // 新id為最大值+1，如果陣列中沒有資料，則從1開始計算
          const newId = data.length > 0 ? Math.max(...ids) + 1 : 1
          // 先寫出要新增的物件值
          const newObj = { id: newId, text: 'xxx' }
          //1 //2
          const nextData = [newObj, ...data]
          //3
          setData(nextData)
        }}
      >
        3. 列表最前面，新增一個文字為xxx的物件(id不能與其它資料重覆)
      </button>
      <br />
      <button
        onClick={() => {
          // 提取目前的陣列中的id值為一個陣列，ids = [1,2,3,4]
          const ids = data.map((v) => v.id)
          // 新id為最大值+1，如果陣列中沒有資料，則從1開始計算
          const newId = data.length > 0 ? Math.max(...ids) + 1 : 1
          // 先寫出要新增的物件值
          const newObj = { id: newId, text: 'yyy' }
          //1 //2
          const nextData = [...data, newObj]
          //3
          setData(nextData)
        }}
      >
        4. 列表最後面，新增一個文字為yyy的物件(id不能與其它資料重覆)
      </button>
      <br />
      <button
        onClick={() => {
          //1 //2
          // filter和map一樣，會產生一個新陣列，不會修改到呼叫的陣列，所以沒有副作用
          const nextData = data.filter((v, i) => {
            return v.text.includes('a')
          })

          // 3
          setData(nextData)
        }}
      >
        5. 尋找(過濾)只呈現所有文字中有包含a英文字母的資料
      </button>
      <br />
      <button
        onClick={() => {
          //1 //2
          // 過濾後剩下除了文字為b之外的物件資料==>相當於刪除文字為b的資料
          const nextData = data.filter((v, i) => {
            return v.text !== 'b'
          })

          // 3
          setData(nextData)
        }}
      >
        6. 刪除文字為b的物件資料
      </button>
      <br />
      <button
        onClick={() => {
          // 第1種: 使用filter(推薦)
          //1 //2
          // 過濾後剩下除了id為4之外的物件資料==>相當於刪除id為4的資料
          // const nextData = data.filter((v, i) => {
          //   return v.id !== 4
          // })
          // // 3
          // setData(nextData)
          // ------------------
          // 第2種: for迴圈
          // const nextData = []
          // for (let i = 0; i < data.length; i++) {
          //   if (data[i].id !== 4) {
          //     nextData.push(data[i])
          //   }
          // }
          // setData(nextData)
          // ------------------
          // 第3種: 使用splice(粘接)，注意有副作用，可能會更動呼叫它的陣列，呼叫前要先作拷貝。另外它是典型的使用索引值操作的方法
          // 刪除公式: array.splice(deleteIndex, 1)
          //
          // 1. 先找到id為4的物件資料索引值
          const foundIndex = data.findIndex((v) => v.id === 4)

          // 2. 判斷是否有找到索引值
          if (foundIndex > -1) {
            //有找到
            // 2-1 拷貝(如果深度不足，要作深拷貝)
            // const nextData = JSON.parse(JSON.stringify(data))
            const nextData = [...data]
            // 2-2 在複本上處理(代入公式語法)
            nextData.splice(foundIndex, 1)
            // 2-3 設定回狀態
            setData(nextData)
          }
        }}
      >
        7. 刪除id為4的物件資料
      </button>
      <br />
      <button
        onClick={() => {
          // 第1種: 展開陣列(map) + 展開物件拷貝({...v})
          // const nextData = data.map((v, i) => {
          //   // 如果符合條件(id是3)，回傳修改其中屬性text為'cccc'字串的物件值
          //   if (v.id === 3) return { ...v, text: 'cccc' }
          //   // 否則回傳原物件
          //   else return v
          // })

          // setData(nextData)
          // --------------------

          // 第2種: 深拷貝+直接更動
          // 1. 先找到id為4的物件資料索引值
          const foundIndex = data.findIndex((v) => v.id === 3)
          // 2. 判斷是否有找到索引值
          if (foundIndex > -1) {
            // 2-1. 這裡要到第二層深度，所以一定要深拷貝
            const nextData = JSON.parse(JSON.stringify(data))
            // 2-2. 在複本物件陣列上直接修改好
            nextData[foundIndex].text = 'cccc'
            // 2-3. 設定給狀態
            setData(nextData)
          }
        }}
      >
        8. 取代id為3的文字為cccc
      </button>
      <br />
      <button
        onClick={() => {
          setData([])
        }}
      >
        9. 清空表格
      </button>
      <br />
      <button
        onClick={() => {
          // 第1種. slice(切割)，沒有副作用，會回傳新陣列不會修改原呼叫陣列
          // 語法公式(注意不包含endIndex): array.slice(startIndex, endIndex)
          // 1. 先找到id為2的物件資料索引值
          // const foundIndex = data.findIndex((v) => v.id === 2)
          // // 2. 判斷是否有找到索引值
          // if (foundIndex > -1) {
          //   const aa = data.slice(0, foundIndex + 1)
          //   const ab = data.slice(foundIndex + 1) //沒有第二傳入參數，會到陣列最尾端
          //   // 新物件
          //   const newObj = { id: 5, text: 'bbb' }
          //   // 組合新陣列
          //   const newData = [...aa, newObj, ...ab]
          //   // 設定到狀態
          //   setData(newData)
          // }
          //-----------------

          //  第2種，使用splice(粘接)
          // 插入公式(在某個索引之後): array.splice(insertIndex + 1, 0, value)
          // 1. 先找到id為2的物件資料索引值
          const foundIndex = data.findIndex((v) => v.id === 2)
          // 2. 判斷是否有找到索引值
          if (foundIndex > -1) {
            // 2-1 深拷貝(如果只作用到陣列層級，使用[...data]也可以)
            const nextData = JSON.parse(JSON.stringify(data))
            // 2-2
            nextData.splice(foundIndex + 1, 0, { id: 5, text: 'bbb' })
            // 2-3
            setData(nextData)
          }
        }}
      >
        10. 在id為2後面插入id為5與文字為bbb的物件
      </button>
    </>
  )
}
