import CarbonIcon from '../assets/icons/icon-carbon-neutral.svg'
import useCommonStore from "../store/useCommonStore.ts";
import Item from './Item.tsx'
import EmptyIcon from '../assets/icons/illustration-empty-cart.svg'

const CartDetails = () => {
    const {cartStatus, setModalOpen} = useCommonStore();

    return (
        <div className={'order-details'}>
            <h2>Your Cart ({cartStatus.reduce((sum, item) => sum + item.count, 0)})</h2>
            {cartStatus.some(item => item.count > 0) ? (
                    <>
                        <div>
                            {cartStatus.map((item) =>
                                item.count > 0 ? (
                                        <Item
                                            key={item.id}
                                            count={item.count}
                                            unitPrice={item.price}
                                            name={item.name}
                                            image_url={item.image_url}
                                        />
                                    )
                                    : null
                            )}
                        </div>

                        <div className={'order-totals'}>
                            <span>Order Total</span>
                            <span className={'font-Red-Hat-Bold text-lg'}>${cartStatus.reduce(
                                (sum, item) => sum + item.count * item.price,
                                0
                            )}</span>
                        </div>
                        <div className={'order-carbon-neutral'}>
                            <img src={CarbonIcon} alt="Carbon Icon"/>
                            <p>This is a <span className={'font-Red-Hat-SemiBold'}>carbon-neutral</span> delivery</p>
                        </div>
                        <div
                            onClick={() => setModalOpen(true)}
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

export default CartDetails;