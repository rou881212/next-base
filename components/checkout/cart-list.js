import React from 'react'
import styles from './cart.module.css'
import { useCart } from '@/hooks/use-cart'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function CartList() {
  const {
    cartItems = [],
    handleDecrease = () => {},
    handleIncrease = () => {},
    handleRemove = () => {},
  } = useCart()

  // swal要使用
  const MySwal = withReactContent(Swal)

  const notifyAndRemove = (productName, productId) => {
    MySwal.fire({
      title: '你確定嗎?',
      text: '這個操作無法復原!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定刪除!',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已刪除!',
          text: productName + '已成功刪除。',
          icon: 'success',
        })

        // 作刪除的動作
        handleRemove(productId)
      }
    })
  }

  return (
    <>
      <ul className={styles['list']}>
        {cartItems.map((v) => {
          return (
            <li key={v.id} className={styles['item']}>
              <div className={styles['w-400']}>{v.name}</div>
              <div>{v.price}</div>
              <div>
                <button
                  onClick={() => {
                    handleIncrease(v.id)
                  }}
                >
                  +
                </button>
                <span>{v.qty}</span>
                <button
                  onClick={() => {
                    // 先計算(預計)按了按鈕後，商品數量會變為多少
                    const nextQty = v.qty - 1
                    // 如果按了後商品數量<= 0，進行移除
                    if (nextQty <= 0) {
                      notifyAndRemove(v.name, v.id)
                      // if (confirm('你確定要移除此商品?')) {
                      //   handleRemove(v.id)
                      // }
                    } else {
                      handleDecrease(v.id)
                    }
                  }}
                >
                  -
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    notifyAndRemove(v.name, v.id)
                    // if (confirm('你確定要移除此商品?')) {
                    //   handleRemove(v.id)
                    // }
                  }}
                >
                  移除
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
