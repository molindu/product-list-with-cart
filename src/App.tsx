import { useState } from 'react';
import DessertGrid from './components/DessertGrid';
import ShoppingCart from './components/ShoppingCart';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import { useCart } from './hooks/useCart';

function App() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const {
    cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  } = useCart();

  const handleConfirmOrder = () => {
    if (cartState.items.length > 0) {
      setShowOrderModal(true);
    }
  };

  const handleStartNewOrder = () => {
    clearCart();
    setShowOrderModal(false);
  };

  return (
    <div className="min-h-screen bg-Rose-50 font-Red-Hat-Regular">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Dessert Grid */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-Rose-900 mb-2">Desserts</h1>
            </div>
            <DessertGrid
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
              getItemQuantity={getItemQuantity}
            />
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <ShoppingCart
              cartState={cartState}
              onRemoveFromCart={removeFromCart}
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