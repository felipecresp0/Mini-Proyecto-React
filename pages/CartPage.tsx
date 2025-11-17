
import React from 'react';
import { useCart } from '../context/CartContext';
import { Course } from '../types';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';
import { ArrowLeftIcon } from '../components/icons/IconComponents';
import { useNavigate } from 'react-router-dom';

const CartItem: React.FC<{ item: Course; onRemove: (id: string) => void; }> = ({ item, onRemove }) => (
  <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
    <div className="flex items-center space-x-4">
      <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
      <div>
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        <p className="text-primary font-medium">${item.price}</p>
      </div>
    </div>
    <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
      Remove
    </button>
  </div>
);

const CartPage: React.FC = () => {
  const { cart, loading, removeFromCart, checkout } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const result = await checkout();
    if (result.success) {
      alert(`Checkout successful! Total: $${result.orderTotal.toFixed(2)}`);
    } else {
      alert('Checkout failed. Please try again.');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col h-screen">
       <header className="p-6 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 mr-4">
          <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">My Cart</h1>
      </header>
      
      {loading ? (
        <div className="p-6 text-center">Loading cart...</div>
      ) : cart.length > 0 ? (
        <>
          <div className="flex-grow p-6 space-y-4 bg-light-bg">
            {cart.map(item => <CartItem key={item.id} item={item} onRemove={removeFromCart} />)}
          </div>
          <div className="p-6 bg-white border-t">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="font-medium text-gray-600">Total</span>
              <span className="font-bold text-gray-800">${total.toFixed(2)}</span>
            </div>
            <PrimaryButton onClick={handleCheckout}>Checkout</PrimaryButton>
          </div>
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center">
            <EmptyState 
              title="Your Cart is Empty"
              message="Looks like you haven't added any courses to your cart yet."
            />
        </div>
      )}
    </div>
  );
};

export default CartPage;
