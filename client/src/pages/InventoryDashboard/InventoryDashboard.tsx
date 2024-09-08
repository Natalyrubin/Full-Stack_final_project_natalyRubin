import { useEffect, useState, useContext } from "react";
import ICard from "../../interfaces/ICrad";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./InventoryDashboard.css";
import { ToastsContext } from '../../context/ToastsContext';

export default function InventoryDashboard() {
  const [cards, setCards] = useState<ICard[] | null>(null);
  const [editingCard, setEditingCard] = useState<ICard | null>(null);
  const [formData, setFormData] = useState<Partial<ICard>>({});
  const toasts = useContext(ToastsContext)

  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/items", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch cards");

        const data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
        toasts?.addToast('❌', 'Error', 'Failed to fetch cards', 'danger');
      }
    };

    fetchAllCards();
  }, []);

  const handleEdit = (card: ICard) => {
    setEditingCard(card);
    setFormData(card);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    const token: string | null = localStorage.getItem('userToken');
    if (!token) return null;

    if (editingCard && formData) {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/items/${editingCard._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'x-auth-token': token,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to update card");

        setCards((prevCards) =>
          prevCards?.map((card) =>
            card._id === editingCard._id ? { ...card, ...formData } : card
          ) || null
        );

        setEditingCard(null);
        toasts?.addToast('👍', 'Success', 'Card updated successfully', 'success');
      } catch (error) {
        console.error("Error updating card:", error);
        toasts?.addToast('❌', 'Error', 'Failed to update card', 'danger');
      }
    }
  };

  const handleDelete = async (cardId: string) => {
    const token: string | null = localStorage.getItem('userToken');
    if (!token) return null;

    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://127.0.0.1:3000/api/items/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': token,
        },
      });

      if (!response.ok) throw new Error("Failed to delete card");

      setCards((prevCards) =>
        prevCards?.filter((card) => card._id !== cardId) || null
      );

      toasts?.addToast('👍', 'Success', 'Card deleted successfully', 'success');
    } catch (error) {
      console.error("Error deleting card:", error);
      toasts?.addToast('❌', 'Error', 'Failed to delete card', 'danger');
    }
  };

  return (
    <div className="InventoryDashboard">

      <div className="top">
        <h1>Product Operations</h1>

        <Link to="/createnewcard">
          <button className="navigate-button">
            Create New Card
          </button>
        </Link>
      </div>

      <table className="itemsTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cards ? (
            cards.length > 0 ? (
              cards.map((card) => (
                <tr key={card._id}>
                  <td>{card.title}</td>
                  <td>{card.description}</td>
                  <td>{card.category}</td>
                  <td>{card.brand}</td>
                  <td>{card.price}</td>
                  <td>{card.rating}</td>
                  <td>{card.stock ? "In Stock" : "Out of Stock"}</td>
                  <td>
                    <button className="editButton" onClick={() => handleEdit(card)}>
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button className="deleteButton" onClick={() => handleDelete(card._id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>Loading data, please wait ...</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={9}>No cards</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingCard && (
        <div className="editForm">
          <h2>Edit Item</h2>
          <form>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description || ""}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleFormChange}
              />
            </label>
            <button type="button" onClick={handleSaveEdit}>
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
