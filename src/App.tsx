import './App.css'
import ItemsLoader from "./component/ItemsLoader.tsx";
import CartDetails from "./component/CartDetails.tsx";
import ConfirmModal from "./models/ConfirmModal.tsx";
import useCommonStore from "./store/useCommonStore.ts";

function App() {
    const {modalOpen} = useCommonStore((state) => state)
    const {loading} = useCommonStore((state) => state);
    return (
        <>
            <main>
                <ItemsLoader/>
                {!loading &&
                    <CartDetails/>
                }
            </main>
            {modalOpen &&
                <ConfirmModal/>
            }
        </>
    )
}

export default App
