import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Styles/Booking.css';

const Booking = () => {
    const { bookingId } = useParams();
    const [service, setService] = useState(null);
    const [booking, setBooking] = useState(null);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        address: '',
        notes: ''
    });
    const navigate = useNavigate();
    const isNewBooking = !isNaN(bookingId);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!user) {
            navigate('/auth');
            return;
        }
        
        const fetchService = async () => {
            try {
                // For now, set null - ready for backend integration
                setService(null);
            } catch (error) {
                toast.error('Service not found');
                navigate('/services');
            }
        };

        const fetchBooking = async () => {
            try {
                // For now, set null - ready for backend integration
                setBooking(null);
            } catch (error) {
                toast.error('Booking not found');
                navigate('/customer-dashboard');
            }
        };
        
        if (isNewBooking) {
            fetchService();
        } else {
            fetchBooking();
        }
    }, [bookingId, isNewBooking, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // For now, just show success - ready for backend integration
            toast.success('Booking created successfully!');
            navigate('/customer-dashboard');
        } catch (error) {
            toast.error('Booking failed');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isNewBooking && service) {
        return (
            <div className="booking-form">
                <h1>Book Service: {service.title}</h1>
                <div className="service-summary">
                    <p><strong>Provider:</strong> {service.provider?.name}</p>
                    <p><strong>Price:</strong> ${service.price}</p>
                    <p><strong>Duration:</strong> {service.duration} minutes</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Time</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Service Address</label>
                        <textarea
                            name="address"
                            placeholder="Enter the address where service is needed"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows="3"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Additional Notes (Optional)</label>
                        <textarea
                            name="notes"
                            placeholder="Any special instructions or requirements"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    
                    <button type="submit" className="btn-primary btn-full">
                        Confirm Booking
                    </button>
                </form>
            </div>
        );
    }

    if (booking) {
        return (
            <div className="booking-details">
                <h1>Booking Details</h1>
                <div className="booking-info">
                    <p><strong>Service:</strong> {booking.service?.title}</p>
                    <p><strong>Provider:</strong> {booking.provider?.name}</p>
                    <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {booking.time}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                    <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
                    <p><strong>Address:</strong> {booking.address}</p>
                    {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="booking-form">
            <h1>Service Booking</h1>
            <div className="empty-state">
                <p>Connect to backend to load service details</p>
                <button className="btn-primary" onClick={() => navigate('/services')}>
                    Browse Services
                </button>
            </div>
        </div>
    );
};

export default Booking;