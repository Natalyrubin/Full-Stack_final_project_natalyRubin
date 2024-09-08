import { ChangeEvent } from 'react';
import './SearchInput.css';
import { useUser } from '../../context/UserContext';



export default function SearchInput() {
  const { searchTerm, setSearchTerm } = useUser();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <div className="SearchInput">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}
