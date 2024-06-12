import Auth from "@layout/Auth/UI/auth.tsx";
// react router dom
import {Route, Routes} from "react-router-dom";
import SingUp from "@layout/SingUp/UI/singUp.tsx";
import Confirmed from "@layout/Comfirme/UI/confirmed.tsx";
import Progress from "@layout/Progress/UI/progress.tsx";
import Marketplace from "@layout/Marketplace/UI/marketplace.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/marketplace'} element={<Auth/>}/>
                <Route path={'/singup'} element={<SingUp/>}/>
                <Route path={'/confirmed'} element={<Confirmed/>}/>
                <Route path={'/progress'} element={<Progress/>}/>
                <Route path={'/*'} element={<Marketplace/>}/>
            </Routes>
        </>
    )
}

export default App
