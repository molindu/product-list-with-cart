import {create} from "zustand/react";
import type {CartButton} from "../types/types.ts";

type CommonState = {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    cartStatus: CartButton[];
    setCartStatus: (cartStatus: CartButton[]) => void;
}
const useCommonStore = create<CommonState>((set) => ({
    modalOpen: false,
    setModalOpen: (modalOpen) => {
        set({modalOpen})
    },
    cartStatus: [],
    setCartStatus: (cartStatus: CartButton[]) => {
        set({cartStatus})
    }
}))

export default useCommonStore;