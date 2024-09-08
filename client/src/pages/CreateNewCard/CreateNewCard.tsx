import "./CreateNewCard.css"
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { AuthContext } from '../../context/AuthContext';

export default function CreateNewCard() {

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imgAlt, setImgAlt] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [stock, setStock] = useState<boolean>(true);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext)
  const navigate = useNavigate();

  const handleSubmitCreateNewCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true);
    if (!auth) { setIsBusy(false); return }

    const newCardData = {
      title: title,
      description: description,
      category: category,
      brand: brand,
      image: {
        url: imgUrl,
        alt: imgAlt
      },
      price: price,
      rating: rating,
      stock: stock,
    };

    const token: null | string = localStorage.getItem('userToken')
    if (!token) return null

    try {
      const response = await fetch(`http://127.0.0.1:3000/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(newCardData)
      });

      if (!response.ok) {
        throw new Error('Failed to POST card to data');
      }

      toasts?.addToast('🎉', 'Card created successfully', 'success');
      navigate('/cards');
    } catch (error) {
      console.error('Error POST card to data:', error);
      toasts?.addToast('⚠️', 'Error creating card', 'danger');
    }
  };

  return (
    <div className="CreateNewCard">
      <h1>Create A New Card</h1>
      <h5>Fill in the following details to create a new card</h5>

      <form onSubmit={handleSubmitCreateNewCard} >
        <div className="formContainer">
          <p>SurfBoard DETAILS</p>
          <div className="formRow" >
            <label htmlFor='title'>Board Details</label>
            <div>
              <input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='category'
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Category'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='brand'
                type='text'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder='Brand'
                required
                autoComplete='on'
              />
            </div>
          </div>

          <div className="formRow">
            <label htmlFor='imgUrl'>Image Details</label>
            <div>
              <input
                id='imgUrl'
                type='text'
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder='Image URL'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='imgAlt'
                type='text'
                value={imgAlt}
                onChange={(e) => setImgAlt(e.target.value)}
                placeholder='Image alt'
                autoComplete='on'
              />
            </div>
          </div>

          <div className="formRow">
            <label htmlFor='price'>Price, Rating and Stock</label>
            <div>
              <input
                id='price'
                type='number'
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                placeholder='Price'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <input
                id='rating'
                type='number'
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                placeholder='Rating'
                required
                autoComplete='on'
              />
            </div>
            <div>
              <label htmlFor='stock'>In Stock</label>
              <input
                id='stock'
                type='checkbox'
                checked={stock}
                onChange={(e) => setStock(e.target.checked)}
              />
            </div>
          </div>

          <button className="createNewCardButton" type='submit' disabled={isBusy}>Create New Card</button>
        </div>
      </form>
    </div>
  )
}
