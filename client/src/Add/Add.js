import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css';
import { API } from '../helpers/constants';
import { AuthContext } from '../Context';

export const Add = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [state, setState] = useState({
        name: '',
        brand: '',
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
            const response = await fetch(`${API}/cars`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: state.name,
                    brand: state.brand
                })
            });
            if (response.ok) {
                const data = await response.json();
                if (data?.success) {
                    setState({ loading: false });
                    navigate('/', { replace: true });
                } else {
                    throw new Error('Authentication Error');
                }
            } else {
                throw new Error('Authentication Error');
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
        <h2 className="title">Add Car</h2>
        {state.loading && <h3 className="loading">Loading ...</h3>}
        {!state.loading && state.error && <h3 className="error">{state.error}</h3>}
        {!state.loading && <form className="add-car-container" onSubmit={submit}>
            <input className="input-container" placeholder="Name..." type="text" name="name" value={state.name} onChange={onChange} />
            <input className="input-container" placeholder="Brand..." type="text" name="brand" value={state.brand} onChange={onChange} />
            <input className="submit-button" type="submit" value="Add" />
        </form>
        }
    </>;
};
