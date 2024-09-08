import './MyCards.css';
import { useEffect, useState, useContext } from 'react';
import ICard from '../../interfaces/ICrad';
import { ToastsContext } from '../../context/ToastsContext';


export default function MyCards() {
  const [cardsById, setCardsById] = useState<ICard[]>([]);
  const toasts = useContext(ToastsContext)

  useEffect(() => {
    const fetchCards = async () => {
      const ids = JSON.parse(localStorage.getItem('cart') || '[]');

      if (ids.length === 0) return;

      try {
        const responses = await Promise.all(
          ids.map((id: string) =>
            fetch(`http://127.0.0.1:3000/api/items/${id}`)
          )
        );

        const data = await Promise.all(responses.map(res => res.json()));

        setCardsById(data.map((item: { data: ICard }) => item.data));
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const handleRemoveCard = (id: string) => {
    const updatedIds = JSON.parse(localStorage.getItem('cart') || '[]').filter((item: string) => item !== id);
    localStorage.setItem('cart', JSON.stringify(updatedIds));
    setCardsById(cardsById.filter(card => card._id !== id));
    toasts?.addToast('👍', 'Success', 'Removed successfully', 'success');
  };



  return (
    <div className="MyCards">
      <h1>My Cart</h1>
      <p>My Own Choices</p>



      <div className="cards_container">
        {cardsById.length > 0 ? (
          cardsById.map((cardById) => (
            <div className="card_box" key={cardById._id}>
              <img className='cardImg' src={cardById.image.url} alt="Card" />
              <h3>{cardById.title}</h3>
              <p>{cardById.description}</p>
              <hr />
              <p>Brand: {cardById.brand}</p>
              <p>Category: {cardById.category}</p>
              <p>Price: {cardById.price}$</p>

              <div className='IconCardArea'>
                <div className='smallCradIcons'>
                  <img src="/assets/img/remove.png" alt="Remove"
                    onClick={() => handleRemoveCard(cardById._id)} />
                </div>

              </div>
            </div>


          ))
        ) : (
          'Your Cart Its empty - Lets Pick Your Own Board'
        )}
      </div>
      <button className="button">Buy Now</button>
    </div>
  );
}
