import Auth from "@layout/Auth/UI/auth.tsx";
// react router dom
import {Route, Routes} from "react-router-dom";
import SingUp from "@layout/SingUp/UI/singUp.tsx";
import Confirmed from "@layout/Comfirme/UI/confirmed.tsx";
import Progress from "@layout/Progress/UI/progress.tsx";

function App() {
    return (
        <>
            <main className={'container'}>
                <Routes>
                    <Route path={'/'} element={<Auth/>}/>
                    <Route path={'/singup'} element={<SingUp/>}/>
                    <Route path={'/confirmed'} element={<Confirmed/>}/>
                    <Route path={'/progress'} element={<Progress/>}/>
                </Routes>
            </main>
        </>
    )
}

export default App
