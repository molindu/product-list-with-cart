import CarbonIcon from '../assets/icons/icon-carbon-neutral.svg'
import CartItem from './CartItem.tsx'
import EmptyIcon from '../assets/icons/illustration-empty-cart.svg'
import type {CartState} from "../types/dessert.ts";

interface ShoppingCartProps {
    cartState: CartState;
    onRemoveFromCart: (dessertName: string) => void;
    onConfirmOrder: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
                                                       cartState,
                                                       onRemoveFromCart,
                                                       onConfirmOrder,
                                                   }) => {
    const {items, totalItems, totalPrice} = cartState;

    return (
        <div className={'order-details'}>
            <h2>Your Cart ({totalItems})</h2>
            {items.length !== 0 ? (
                    <>
                        <div>
                            {items.map((item) => (
                                <CartItem
                                    key={item.dessert.name}
                                    item={item}
                                    onRemove={onRemoveFromCart}
                                />
                            ))}
                        </div>

                        <div className={'order-totals'}>
                            <span>Order Total</span>
                            <span className={'font-Red-Hat-Bold text-lg'}>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className={'order-carbon-neutral'}>
                            <img src={CarbonIcon} alt="Carbon Icon"/>
                            <p>This is a <span className={'font-Red-Hat-SemiBold'}>carbon-neutral</span> delivery</p>
                        </div>
                        <div
                            onClick={onConfirmOrder}
                            className={'order-confirm-button'}>
                            Confim Order
                        </div>
                    </>)
                : (<>
                    <div
                        className={'order-empty'}>
                        <img src={EmptyIcon} alt="Empty"/>
                        <p>Your added items will appear here</p>
                    </div>
                </>)}

        </div>
    );
};

export default ShoppingCart;