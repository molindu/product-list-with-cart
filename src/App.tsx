import {useState} from 'react';
import DessertGrid from './components/DessertGrid';
import ShoppingCart from './components/ShoppingCart';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {addToCart, removeFromCart, updateQuantity, clearCart} from './store/cartSlice';
import type {Dessert} from "./types/dessert.ts";

function App() {
    const [showOrderModal, setShowOrderModal] = useState(false);
    const dispatch = useAppDispatch();
    const cartState = useAppSelector((state) => state.cart);

    const handleAddToCart = (dessert: Dessert) => {
        dispatch(addToCart(dessert));
    };

    const handleRemoveFromCart = (dessertName: string) => {
        dispatch(removeFromCart(dessertName));
    };

    const handleUpdateQuantity = (dessertName: string, quantity: number) => {
        dispatch(updateQuantity({dessertName, quantity}));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const getItemQuantity = (dessertName: string) => {
        const item = cartState.items.find(item => item.dessert.name === dessertName);
        return item ? item.quantity : 0;
    };

    const handleConfirmOrder = () => {
        if (cartState.items.length > 0) {
            setShowOrderModal(true);
        }
    };

    const handleStartNewOrder = () => {
        handleClearCart();
        setShowOrderModal(false);
    };

    return (
        <div className="min-h-screen bg-rose-50 font-red-hat">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Dessert Grid */}
                    <div className="lg:col-span-3">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-rose-900 mb-2">Desserts</h1>
                        </div>
                        <DessertGrid
                            onAddToCart={handleAddToCart}
                            onUpdateQuantity={handleUpdateQuantity}
                            getItemQuantity={getItemQuantity}
                        />
                    </div>

                    {/* Shopping Cart */}
                    <div className="lg:col-span-1">
                        <ShoppingCart
                            cartState={cartState}
                            onRemoveFromCart={handleRemoveFromCart}
                            onConfirmOrder={handleConfirmOrder}
                        />
                    </div>
                </div>
            </div>

            {/* Order Confirmation Modal */}
            <OrderConfirmationModal
                isOpen={showOrderModal}
                cartState={cartState}
                onClose={() => setShowOrderModal(false)}
                onStartNewOrder={handleStartNewOrder}
            />
        </div>
    );
}

export default App;