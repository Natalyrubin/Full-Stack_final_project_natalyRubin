import "./Login.css"
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastsContext } from '../../context/ToastsContext'



export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(AuthContext);
    const toasts = useContext(ToastsContext)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (auth) {
            const errMessage = await auth.login(email, password)
            if (!errMessage) {
                toasts?.addToast('👍🏼', 'Successfully Signed-In', `Welcome ${auth.userDetails?.name.first} !`, 'success')
                navigate('/')
            } else {
                toasts?.addToast('⚠️', 'Error Signing-In', errMessage, 'danger')
                navigate('/signup')
            }
        }
    }

    return (
        <div className="Login">

            <h1>Login Page</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                        autoComplete='on'
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                        autoComplete='on'
                    />
                </div>

                <button type='submit'>Sign In</button>
            </form>

            <p>Not SignUp yet? <br></br> Click here and Join Us</p>
            <button><Link to="/signup">Sign Up</Link></button>
        </div>
    )
}

