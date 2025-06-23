import type {CartItem as CartItemType} from '../types/dessert';

interface CartItemProps {
    item: CartItemType;
    onRemove?: (dessertName: string) => void;
    onModal?: boolean
}

const CartItem: React.FC<CartItemProps> = ({item, onRemove, onModal = false}) => {
    const {dessert, quantity} = item;
    const subtotal = dessert.price * quantity;

    return (
        <div className={'item'}>
            <div className={`flex gap-1 ${onModal ? 'flex-row gap-4' : 'flex-col'} justify-between `}>
                {onModal &&
                    <div className={'flex justify-center items-center'}>
                        <img src={dessert.image.thumbnail} className={'rounded-md w-16 h-16'} alt="thumbnail"/>
                    </div>
                }
                <div className={`${onModal && 'flex flex-col gap-4'}`}>
                    <h3>{dessert.name}</h3>
                    <div className={`flex flex-row gap-4`}>
                        <span className={'text-Red'}>{quantity}x</span>
                        <span className={'font-Red-Hat-Regular text-Rose-500'}>@{dessert.price.toFixed(2)}</span>
                        {!onModal && <span className={'text-Rose-500'}>${subtotal.toFixed(2)}</span>}
                    </div>
                </div>
            </div>
            {!onModal && onRemove ? (
                <div className="group item-remove" onClick={() => onRemove(dessert.name)}>
                    <svg
                        className={"item-remove-icon group-hover:text-black"}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={'20px'}
                        height={'20px'}
                    >
                        <path
                            fill="currentColor"
                            d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"/>
                    </svg>
                </div>
            ) : (
                <div className="group item-remove">
                    <span className={'text-Rose-500'}>${subtotal.toFixed(2)}</span>
                </div>
            )}

        </div>
    )
}
export default CartItem;