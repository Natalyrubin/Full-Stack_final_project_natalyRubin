import './Cards.css';
import ICard from '../../interfaces/ICrad';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

export default function ICards() {
    const { searchTerm } = useUser();
    const [cards, setCards] = useState<ICard[] | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const fetchAllCards = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/api/items', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) throw new Error('Failed to fetch cards');

                const data = await response.json();

                const uniqueCategories = Array.from(new Set(data.data.map((card: ICard) => card.category))) as string[];
                setCategories(uniqueCategories);

                const filteredCards = data.data.filter((card: ICard) =>
                    (searchTerm ? card.title.toLowerCase().includes(searchTerm.toLowerCase()) || card.description.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
                    (selectedCategory ? card.category === selectedCategory : true)
                );

                setCards(filteredCards);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchAllCards();
    }, [searchTerm, selectedCategory]);

    const handleAddToCart = (cardId: string) => {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

        if (!cartItems.includes(cardId)) {
            cartItems.push(cardId);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            alert('Product added to cart');
        } else {
            alert('Product is already in the cart');
        }
    };

    return (
        <div className="Cards">
            <h1>Our Boards</h1>
            <p>SurfBoards - All Types</p>
            <div className="category-filter">
                <label htmlFor="categorySelect">Filter by Category:</label>
                <select
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="cards_container">
                {(cards) ?
                    (cards.length > 0) ?
                        cards.map((card) => (
                            <div className="card_box" key={card._id}>
                                <img className='cardImg' src={card.image.url} alt="Card" />
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <hr />
                                <p>Brand: {card.brand}</p>
                                <p>Category: {card.category}</p>
                                <p>Rate: {card.rating}</p>

                                <div className='IconCardArea'>
                                    <div className='smallCradIcons'>
                                        <img src="/assets/img/add-to-cart.png" alt="Add to cart"
                                            onClick={() => handleAddToCart(card._id)} />
                                    </div>
                                    <Link to={`/productpage/${card._id}`}>
                                        <button id='productPageButton' >
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                        :
                        'Loading data, please wait ...'

                    :
                    (!cards) && 'No cards'
                }
            </div>
        </div>
    );
}
