import {useEffect, useState} from 'react';
import Cart from '../assets/icons/icon-add-to-cart.svg'
import type {Dessert} from "../types/types.ts";
import useCommonStore from "../store/useCommonStore.ts";


const ItemsLoader = () => {
    const [desserts, setDesserts] = useState<Dessert[]>([]);
    const [loading, setLoading] = useState(true);
    const {cartStatus, setCartStatus} = useCommonStore((state) => state);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://684ce0bf65ed087139147af0.mockapi.io/data");
                const jsonData = await response.json();
                const dataWithIds = jsonData.map((item: Omit<Dessert, 'id'>, index: number) => ({
                    ...item,
                    id: index.toString(),
                }));
                setDesserts(dataWithIds);

                const toggleStates = dataWithIds.map((item: Dessert) => ({
                    id: item.id,
                    toggled: false,
                    count: 0,
                    name: item.name,
                    price: item.price,
                    image_url: item.image.thumbnail
                }));
                setCartStatus(toggleStates);

            } catch (error) {
                console.error("Failed to fetch desserts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log("cartStatus", cartStatus);
    const toggleCart = (id: number) => {
        const updatedCart = cartStatus.map((item) =>
            item.id === String(id) && !item.toggled ? {...item, toggled: true} : item
        );
        setCartStatus(updatedCart);
    };

    const handleCountChange = (id: number, increment: boolean) => {
        const updatedCart = cartStatus.map((item) => {
            if (item.id !== String(id)) return item;

            const newCount = increment
                ? item.count++
                // : Math.max(item.count--, 0);
                : (item.count !== 0 ? item.count-- : 0);
            return {...item, count: newCount};
        });

        setCartStatus(updatedCart);
    };


    if (loading) return <div className={'loading'}>
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading...</p>
        </div>
    </div>;

    return (
        <div className="item-loader-container">
            <h1 className="item-loader-header">Desserts</h1>
            <div className="item-container">
                {desserts.map((dessert, index) => {
                    const cartValues = cartStatus.find((t) => t.id === dessert.id);
                    return (
                        <div key={index} className="rounded-[5px]">
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
                                    className={`add-to-cart-main ${cartValues?.toggled && 'add-to-cart-toggle'}`}
                                    onClick={() => toggleCart(index)}
                                >
                                    {cartValues?.toggled ? (
                                        <>
                                            <div
                                                className={'add-to-cart-button group'}
                                                onClick={() => handleCountChange(index, false)}
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
                                            {cartValues.count}
                                            <div
                                                className={'add-to-cart-button group'}
                                                onClick={() => handleCountChange(index, true)}
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
                                        <>
                                            <img src={Cart} alt="Cart"
                                                 className="inline-block mr-2"/>
                                            Add to Cart
                                        </>
                                    )}
                                </div>
                            </div>
                            <p className={'item-card-category'}>{dessert.category}</p>
                            <h2 className={'item-card-name'}>{dessert.name}</h2>
                            <p className={'item-card-price'}>${dessert.price.toFixed(2)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ItemsLoader;
