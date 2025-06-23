import {useEffect, useState} from 'react';
// import Cart from '../assets/icons/icon-add-to-cart.svg'
import type {Dessert} from "../types/dessert.ts";
import {useCartStore} from "../store/useCartStore.ts";
import DessertCard from "./DessertCard.tsx";

interface DessertGridProps {
    onAddToCart: (dessert: Dessert) => void;
    onUpdateQuantity: (dessertName: string, quantity: number) => void;
    getItemQuantity: (dessertName: string) => number;
}

const DessertGrid: React.FC<DessertGridProps> = ({
                                                     onAddToCart,
                                                     onUpdateQuantity,
                                                     getItemQuantity,
                                                 }) => {
    const [desserts, setDesserts] = useState<Dessert[]>([]);
    const loading = useCartStore((state) => state.loading);
    const setLoading = useCartStore((state) => state.setLoading);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDesserts = async () => {
            try {
                const response = await fetch('https://684ce0bf65ed087139147af0.mockapi.io/data');
                if (!response.ok) {
                    throw new Error('Failed to fetch desserts');
                }
                const data = await response.json();
                setDesserts(data);
            } catch (err) {
                setError('Failed to load desserts. Please try again later.');
                console.error('Error fetching desserts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDesserts();
    }, []);

    if (loading) return <div className={'loading'}>
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading...</p>
        </div>
    </div>;
    if (error) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center text-red-600">
                    <p className="font-medium">{error}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="item-loader-container">
            <h1 className="item-loader-header">Desserts</h1>
            <div className="item-container">
                {desserts.map((dessert, index) => (
                    <DessertCard
                        key={dessert.id || `${dessert.name}-${index}`}
                        dessert={dessert}
                        quantity={getItemQuantity(dessert.name)}
                        onAddToCart={onAddToCart}
                        onUpdateQuantity={onUpdateQuantity}
                    />))}
            </div>
        </div>
    );
};

export default DessertGrid;
