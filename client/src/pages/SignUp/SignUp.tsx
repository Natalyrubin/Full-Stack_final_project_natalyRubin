import "./SignUp.css"
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { AuthContext } from '../../context/AuthContext';



export default function SignUp() {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVerification, setPasswordVerification] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [houseNumber, setHouseNumber] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [isCustomer, setIsCustomer] = useState<boolean>(true);
    const [isBusy, setIsBusy] = useState<boolean>(false);

    const auth = useContext(AuthContext);
    const toasts = useContext(ToastsContext)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsBusy(true)
        if (!auth) { setIsBusy(false); return }

        const userData = {
            name: {
                first: firstName,
                last: lastName,
            },
            phone: phone,
            email: email,
            password: password,
            image: {
                url: 'https://cdns-images.dzcdn.net/images/artist/300b1c998b93b8a62b050a4b10b14b12/264x264.jpg',
                alt: 'You wrote that this is NOT required 😉',
            },
            address: {
                country: country,
                city: city,
                street: street,
                houseNumber: Number(houseNumber),
                zip: zipCode.toString(),
            },
            isCustomer: isCustomer,

        }


        const { error } = await auth?.signUp(userData);

        if (error) {
            toasts?.addToast('⚠️', 'Error Signing-Up', error, 'danger');
        } else {
            toasts?.addToast('👍🏼', 'Successfully Signed-Up', `Please Log-in with your credentials.`, 'success');
            navigate('/login');
        }
        setIsBusy(false);
    }


    return (
        <div className="SignUp">

            <h1>Hi, Welcome To The Family</h1>
            <h5>fill the following details and join us</h5>


            <form onSubmit={handleSubmit}  >
                <div className="formContainer">
                    <p>SUBMIT DETAILS</p>
                    <h6>Each field must contain a minimum of 2 characters. <br /> Mobile number, Email and Password must be in the format specified in the field.</h6>
                    <div className="formRow" >
                        <label htmlFor='firstName'>Full Name</label>
                        <div>
                            <input
                                id='firstName'
                                type='text'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder='First Name'
                                required
                                autoComplete='on'
                            />
                        </div>
                        <div>
                            <input
                                id='lastName'
                                type='text'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder='Last Name'
                                required
                                autoComplete='on'
                            />
                        </div>
                    </div>
                    <div className="formRow">
                        <label htmlFor='phone'>Contact Details</label>
                        <div>
                            <input
                                id='phone'
                                type='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder='050-0000000'
                                required
                                autoComplete='on'
                            />
                        </div>
                        <div>
                            <input
                                id='email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email@email.com'
                                required
                                autoComplete='on'
                            />
                        </div>
                    </div >
                    <div className="formRow">
                        <label htmlFor='password'>Password</label>
                        <div>
                            <input
                                id='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Aabc123!'
                                required
                                autoComplete='on'
                            />
                        </div>
                        <div>
                            <input
                                id='passwordVerification'
                                type='password'
                                value={passwordVerification}
                                onChange={(e) => setPasswordVerification(e.target.value)}
                                placeholder='Password Again'
                                required
                                autoComplete='on'
                            />
                        </div>
                    </div>

                    <div className="addressSignUpArea">
                        <div>
                            <label htmlFor='country'>Address</label>
                            <div>
                                <input
                                    id='country'
                                    type='text'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder='Country'
                                    required
                                    autoComplete='on'
                                />
                            </div>
                            <div>
                                <input
                                    id='city'
                                    type='text'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder='City'
                                    required
                                    autoComplete='on'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="addressSignUpArea2">
                        <div>
                            <div>
                                <label htmlFor='street'></label>
                                <input
                                    id='street'
                                    type='text'
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    placeholder='Street'
                                    required
                                    autoComplete='on'
                                />
                            </div>
                            <div>
                                <input
                                    id='houseNumber'
                                    type='number'
                                    value={houseNumber}
                                    onChange={(e) => setHouseNumber(e.target.value)}
                                    placeholder='House Number'
                                    required
                                    autoComplete='on'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="zipCode">
                        <label htmlFor='zipCode'></label>
                        <input
                            id='zipCode'
                            type='number'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder='Zip Code'
                            required
                            autoComplete='on'
                        />
                    </div>
                    <div className="checkBox">
                        <input
                            id='isCustomer'
                            type="checkbox" checked={isCustomer}
                            onChange={(e) => setIsCustomer(e.target.checked)}
                            required
                            autoComplete='on'
                        />
                        <label htmlFor='isCustomer'>Customers</label>
                    </div>

                    <button type='submit' disabled={isBusy}>Sign Up</button>
                </div>
            </form>
        </div >
    )
}