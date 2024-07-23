import FavIcon from './fav-icon'

export default function Item({
  isbn,
  author,
  title,
  fav,
  handleToggleFav = () => {},
}) {
  return (
    <>
      <tr>
        <td>{isbn}</td>
        <td>{title}</td>
        <td>{author}</td>
        <td>
          <FavIcon isbn={isbn} fav={fav} handleToggleFav={handleToggleFav} />
        </td>
      </tr>
    </>
  )
}
