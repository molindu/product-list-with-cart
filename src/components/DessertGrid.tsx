import React, {useState, useEffect} from 'react';
import {Loader2} from 'lucide-react';
import DessertCard from './DessertCard';
import type {Dessert} from '../types/dessert';

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
    const [loading, setLoading] = useState(true);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-orange-600">
                    <Loader2 className="animate-spin" size={24}/>
                    <span className="font-medium">Loading delicious desserts...</span>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center text-Rose-500">
                    <p className="font-medium">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {desserts.map((dessert, index) => (
                <DessertCard
                    key={dessert.id || `${dessert.name}-${index}`}
                    dessert={dessert}
                    quantity={getItemQuantity(dessert.name)}
                    onAddToCart={onAddToCart}
                    onUpdateQuantity={onUpdateQuantity}
                />
            ))}
        </div>
    );
};

export default DessertGrid;