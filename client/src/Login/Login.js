import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { API } from '../helpers/constants';
import { AuthContext } from '../Context';

export const Login = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(AuthContext);

    useEffect(() => {
        if (token !== null) {
            navigate('/', { replace: true });
        }
    }, [navigate, token]);

    const [state, setState] = useState({
        email: '',
        password: '',
        loading: false,
        error: '',
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const valid = () => {
        // TODO: Add validations here.
        return true;
    };

    const submit = async () => {
        setState(prevState => ({
            ...prevState,
            error: '',
            loading: true
        }));

        if (!valid()) {
            return;
        }

        try {
            const response = await fetch(`${API}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: state.email,
                    password: state.password
                })
            });
            if (response.ok) {
                const data = await response.json();
                if (data?.token) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    setState({ loading: false });
                    navigate('/', { replace: true });
                } else {
                    throw 'Authentication Error';
                }
            } else {
                throw 'Authentication Error';
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                error: 'Sorry! Something went wrong.',
                loading: false
            }));
        }
    };

    return <>
        <h2 className="title">Login/Register</h2>
        {state.loading && <h3 className="loading">Loading ...</h3>}
        {!state.loading && state.error && <h3 className="error">{state.error}</h3>}
        {!state.loading && <form className="login-container" onSubmit={submit}>
            <input className="input-container" placeholder="Email..." type="email" name="email" value={state.email} onChange={onChange} />
            <input className="input-container" placeholder="Password..." type="password" name="password" value={state.password} onChange={onChange} />
            <input className="submit-button" type="submit" value="Login" />
        </form>
        }
    </>;
};
