import './EditUserDeatails.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { AuthContext } from '../../context/AuthContext';
import { IUserDetailsType } from '../../interfaces/IUserDetails'

export default function EditUserDetails() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [houseNumber, setHouseNumber] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageAlt, setImageAlt] = useState<string>('');

  const [isBusy, setIsBusy] = useState<boolean>(false);

  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsBusy(true);

    const updatedUserData: Partial<IUserDetailsType> = {};

    // Add name if provided
    if (firstName || lastName) {
      updatedUserData.name = {
        first: firstName || auth?.userDetails?.name.first || '',
        last: lastName || auth?.userDetails?.name.last || ''
      };
    }

    // Add address if provided
    if (state || country || city || street || houseNumber || zipCode) {
      updatedUserData.address = {
        state: state || auth?.userDetails?.address.state || '',
        country: country || auth?.userDetails?.address.country || '',
        city: city || auth?.userDetails?.address.city || '',
        street: street || auth?.userDetails?.address.street || '',
        houseNumber: houseNumber ? parseInt(houseNumber) : auth?.userDetails?.address.houseNumber || 0,
        zip: zipCode || auth?.userDetails?.address.zip || ''
      };
    }

    // Add image if provided
    if (imageUrl || imageAlt) {
      updatedUserData.image = {
        url: imageUrl || auth?.userDetails?.image.url || '',
        alt: imageAlt || auth?.userDetails?.image.alt || ''
      };
    }

    const result = await auth?.updateUserDetails(updatedUserData);

    if (result?.error) {
      const errorMessage = result.error || 'An error occurred while updating user details.';
      toasts?.addToast('❌', 'Error', errorMessage, 'danger');
    } else {
      toasts?.addToast('✅', 'Success', 'User details updated successfully!', 'success');
      navigate('/');
    }

    setIsBusy(false);
  };


  return (
    <div className="EditUserDetails">
      <h1>Edit Your Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="formContainer">
          <div className="formRow">
            <label htmlFor='firstName'>First Name</label>
            <input
              id='firstName'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              autoComplete='on'
            />
          </div>
          <div className="formRow">
            <label htmlFor='lastName'>Last Name</label>
            <input
              id='lastName'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
              autoComplete='on'
            />
          </div>
          <div className="formRow">
            <label htmlFor='country'>Country</label>
            <input
              id='country'
              type='text'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder='Country'
              autoComplete='on'
            />
          </div>
          <div className="formRow">
            <label htmlFor='state'>State</label>
            <input
              id='state'
              type='text'
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder='State'
              autoComplete='on'
            />
          </div>
          <div className="formRow">
            <label htmlFor='city'>City</label>
            <input
              id='city'
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='City'
              autoComplete='on'
            />
          </div>
          <div className="formRow">
            <label htmlFor='street'>Street</label>
            <input
              id='street'
              type='text'
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder='Street'
              autoComplete='on'
            />
          </div>
          <div className="formRow">
            <label htmlFor='houseNumber'>House Number</label>
            <input
              id='houseNumber'
              type='number'
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder='House Number'
              autoComplete='on'
            />
          </div>
          <div className="formRow">
            <label htmlFor='zipCode'>Zip Code</label>
            <input
              id='zipCode'
              type='number'
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder='Zip Code'
              autoComplete='on'
            />
          </div>
          <div className="formRow">
            <label htmlFor='imageUrl'>Image URL</label>
            <input
              id='imageUrl'
              type='text'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder='Image URL'
              autoComplete='on'
            />
          </div>
          <div className="formRow">
            <label htmlFor='imageAlt'>Image Description</label>
            <input
              id='imageAlt'
              type='text'
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder='Image Description'
              autoComplete='on'
            />
          </div>
          <button type='submit' disabled={isBusy}>Update Details</button>
        </div>
      </form>
    </div>
  );
}
