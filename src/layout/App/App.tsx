import './App.css'
import Auth from "@layout/Auth/UI/auth.tsx";
// react router dom
import {Route, Routes} from "react-router-dom";
import SingUp from "@layout/SingUp/UI/singUp.tsx";
import Confirmed from "@layout/Comfirme/UI/confirmed.tsx";

function App() {

    return (
        <>
            <div className={'container'}>
                <Routes>
                    <Route path={'/'} element={<Auth/>}/>
                    <Route path={'/singup'} element={<SingUp/>}/>
                    <Route path={'/confirmed'} element={<Confirmed/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
