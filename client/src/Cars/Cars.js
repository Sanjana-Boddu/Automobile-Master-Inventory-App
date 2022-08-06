import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context';
import { API } from '../helpers/constants';
import './Cars.css';

const tableHeaderList = ['Id', 'Name', 'Brand'];

export const Cars = () => {
    const { token } = useContext(AuthContext);
    const [cars, setCars] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setError('');
        setLoading(true);
        const getCars = async () => {
            try {
                const response = await fetch(`${API}/cars`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setCars(data);
                        setLoading(false);
                    } else {
                        throw new Error('Error Fetching');
                    }
                } else {
                    throw new Error('Error Fetching');
                }
            } catch (error) {
                setError('Sorry! Something went wrong.');
                setLoading(false);
            }
        };

        getCars();
    }, [token]);


    return <>
        <h2 className="title">Cars</h2>
        {loading && <h3 className="loading">Loading ...</h3>}
        {!loading && error && <h3 className="error">{error}</h3>}
        {!loading && <div className="table-container">
            <div className="table-row table-header">
                {tableHeaderList.map(label => <div key={label} className="table-column">{label}</div>)}
            </div>
            {cars.map(car => <div className="table-row" key={car.id}>
                <div className="table-column">{car.id}</div>
                <div className="table-column">{car.name}</div>
                <div className="table-column">{car.brand}</div>
            </div>)}
        </div>}
    </>;
};
