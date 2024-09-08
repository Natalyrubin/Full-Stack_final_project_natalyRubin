import './ProductPage.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ICard from '../../interfaces/ICrad';

export default function ProductPage() {
  const location = useLocation();
  const [product, setProduct] = useState<ICard | null>(null);
  const id = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchProductById = async () => {
      if (!id) {
        console.error('Product ID is undefined');


        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:3000/api/items/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch product');

        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductById();
  }, [id]);

  if (!product) {
    return <div>Loading product, please wait...</div>;
  }

  const handleAddToCart = () => {
    if (!product) return;

    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    cartItems.push(product._id);

    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert('Product added to cart');
  };



  return (
    <div className="ProductPage">
      <div className="product_image">
        <img src={product.image.url} alt={product.image.alt} />
      </div>
      <div className="product_details">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Rating:</strong> {product.rating} stars</p>
        <p><strong>Availability:</strong> {product.stock ? 'In Stock' : 'Out of Stock'}</p>

        <div className="button-container">
          <button className="button" onClick={handleAddToCart} >Add to Cart</button>
          <button className="button">Buy Now</button>
        </div>

        <hr />
        <h3>Customer Reviews</h3>
        <div className="reviews">
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review">
                <p><strong>{review.reviewerName}:</strong> {review.comment}</p>
                <p><strong>Rating:</strong> {review.rating} stars</p>
              </div>
            ))
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </div>

      </div>
    </div>
  );
}
