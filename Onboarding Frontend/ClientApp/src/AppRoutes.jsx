import { Counter } from "./components/Counter";
import CustomerContainer from "./components/Customers/Customers";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import ProductContainer from "./components/Products/Products";
import SalesContainer from "./components/Sales/Sales";
import StoresContainer from "./components/Stores/Stores";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/stores',
        element: <StoresContainer />
    },
    {
        path: '/products',
        element: <ProductContainer />
    },
    {
        path: '/sales',
        element: <SalesContainer />
    },
    {
        path: '/customers',
        element: <CustomerContainer />
    }
];

export default AppRoutes;
