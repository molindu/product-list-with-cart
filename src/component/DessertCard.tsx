import Cart from "../assets/icons/icon-add-to-cart.svg";
import type {Dessert} from "../types/dessert.ts";

interface DessertCardProps {
    dessert: Dessert;
    quantity: number;
    onAddToCart: (dessert: Dessert) => void;
    onUpdateQuantity: (dessertName: string, quantity: number) => void;
}

const DessertCard: React.FC<DessertCardProps> = ({
                                                     dessert,
                                                     quantity,
                                                     onAddToCart,
                                                     onUpdateQuantity,
                                                 }) => {
        const handleAddToCart = () => {
            onAddToCart(dessert);
        };

        const handleIncrement = () => {
            onUpdateQuantity(dessert.name, quantity + 1);
        };

        const handleDecrement = () => {
            onUpdateQuantity(dessert.name, quantity - 1);
        };
        return (
            <div className="rounded-[5px]">
                <div className="item-card">
                    <picture>
                        <source media="(max-width: 640px)" srcSet={dessert.image.mobile}/>
                        <source media="(max-width: 1024px)" srcSet={dessert.image.tablet}/>
                        <img
                            src={dessert.image.desktop}
                            alt={dessert.name}
                            className={'item-card-image'}
                        />
                    </picture>
                    <div
                        className={`add-to-cart-main ${quantity !== 0 && 'add-to-cart-toggle'}`}
                    >
                        {quantity !== 0 ? (
                            <>
                                <div
                                    className={'add-to-cart-button group'}
                                    onClick={handleDecrement}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="2"
                                        viewBox="0 0 10 2"
                                        className={'add-to-cart-button-icon group-hover:text-Red'}
                                    >
                                        <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/>
                                    </svg>
                                </div>
                                {quantity}
                                <div
                                    className={'add-to-cart-button group'}
                                    onClick={handleIncrement}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        className={'add-to-cart-button-icon group-hover:text-Red'}
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                                        />
                                    </svg>
                                </div>
                            </>
                        ) : (
                            <div onClick={handleAddToCart}>
                                <img src={Cart} alt="Cart"
                                     className="inline-block mr-2"/>
                                Add to Cart
                            </div>
                        )}
                    </div>
                </div>
                <p className={'item-card-category'}>{dessert.category}</p>
                <h2 className={'item-card-name'}>{dessert.name}</h2>
                <p className={'item-card-price'}>${dessert.price.toFixed(2)}</p>
            </div>
        );
    }
;

export default DessertCard;