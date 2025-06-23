import './App.css'
import DessertGrid from "./component/DessertGrid.tsx";
import ShoppingCart from "./component/ShoppingCart.tsx";
import {useCartStore} from "./store/useCartStore.ts";
import {useState} from "react";
import OrderConfirmationModal from "./models/OrderConfirmationModal.tsx";

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const loading = useCartStore((state) => state.loading);
    const {
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity
    } = useCartStore();

    const cartState = {items, totalItems, totalPrice};

    const handleConfirmOrder = () => {
        if (items.length > 0) {
            setModalOpen(true);
        }
    };

    const handleStartNewOrder = () => {
        clearCart();
        setModalOpen(false);
    };

    return (
        <>
            <main>
                <DessertGrid
                    onAddToCart={addToCart}
                    onUpdateQuantity={updateQuantity}
                    getItemQuantity={getItemQuantity}
                />
                {!loading &&
                    <ShoppingCart
                        cartState={cartState}
                        onRemoveFromCart={removeFromCart}
                        onConfirmOrder={handleConfirmOrder}
                    />
                }
            </main>
            {modalOpen &&
                <OrderConfirmationModal
                    isOpen={modalOpen}
                    cartState={cartState}
                    onClose={() => setModalOpen(false)}
                    onStartNewOrder={handleStartNewOrder}
                />
            }
        </>
    )
}

export default App
