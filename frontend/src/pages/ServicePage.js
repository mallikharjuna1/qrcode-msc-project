import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import '../css/ServicePage.css';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(1);
    const [editingId, setEditingId] = useState(null);
    const { token } = useContext(AuthContext);

    const fetchServices = async () => {
        try {
            const res = await axios.get('http://localhost:5050/api/business/services', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setServices(res.data.services);
        } catch (err) {
            console.error('Failed to load services', err);
        }
    };

    const handleSubmit = async () => {
        if (!name || !price || !description) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        if (image) formData.append('image', image);

        try {
            if (editingId) {
                await axios.put(
                    `http://localhost:5050/api/business/services/${editingId}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setEditingId(null);
            } else {
                await axios.post(
                    'http://localhost:5050/api/business/services',
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            
            setName('');
            setDescription('');
            setImage(null);
            fetchServices();
        } catch (err) {
            console.error('Error saving service', err);
        }
    };

    const handleEdit = (service) => {
        setEditingId(service._id);
        setName(service.name);
        setPrice(service.price);
        setDescription(service.description);
        setImage(null); 
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            await axios.delete(`http://localhost:5050/api/business/services/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchServices();
        } catch (err) {
            console.error('Error deleting service', err);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="page-container">
            <Sidebar />
            <main className="content-area">
                <h2 className="page-title">Your Services / Products</h2>

                <div className="form-section">
                    <input
                        type="text"
                        placeholder="Service/Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                        required
                    />

                    <input
                        placeholder='Price'
                        type="number"
                        className='input-field'
                        min={0}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea-field"
                        rows={4}
                        required
                    />

                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
                            if (!validTypes.includes(file.type)) {
                                alert('Only PNG, JPG, and JPEG files are allowed');
                                e.target.value = null;
                                return;
                            }

                            setImage(file);
                        }}
                        className="file-input"
                        required
                    />

                    <button className="btn-primary" onClick={handleSubmit}>
                        {editingId ? 'Update Service' : 'Add Service'}
                    </button>
                </div>

                <h3 className="sub-heading">Existing Services</h3>
                <div className="services-list">
                    {services.map((s) => (
                        <div key={s._id} className="service-card">

                            <h4>{s.name}</h4>
                            <p>{s.description}</p>
                            <p>£{s.price}</p>
                            <img src={`http://localhost:5050${s.image}`} alt='product_img' className='service-image' />
                            <div className="action-buttons">
                                <button className="btn-secondary" onClick={() => handleEdit(s)}>Edit</button>
                                <button className="btn-danger" onClick={() => handleDelete(s._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ServicesPage;
