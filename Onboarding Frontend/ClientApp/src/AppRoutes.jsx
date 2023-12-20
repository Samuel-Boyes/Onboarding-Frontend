import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import StoresContainer from "./components/Stores";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/stores',
        element: <StoresContainer />
    }
];

export default AppRoutes;
