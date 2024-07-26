import ProductList from '@/components/checkout/product-list'
import styles from '@/components/checkout/cart.module.css'
import CartNavbar from '@/components/checkout/navbar'
import Link from 'next/link'

export default function Product() {
  return (
    <>
      <div className={styles['container']}>
        <CartNavbar />
        <h1>商品列表</h1>
        <hr />
        <p>
          <Link href="/cs-0726/checkout/cart">連至 購物車頁面</Link>
        </p>
        <div className={styles['product']}>
          <ProductList />
        </div>
      </div>
    </>
  )
}
