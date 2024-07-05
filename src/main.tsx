import ReactDOM from 'react-dom/client'
import App from './layout/App/App.tsx'
import "./styles/index.scss"
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import {Provider} from "react-redux";
import store from "@redux/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ChakraProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
)