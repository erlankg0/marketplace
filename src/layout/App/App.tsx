import Auth from '@layout/Auth/UI/auth.tsx';
import SingUp from '@layout/SingUp/UI/singUp.tsx';
import Confirmed from '@layout/Comfirme/UI/confirmed.tsx';
import Progress from '@layout/Progress/UI/progress.tsx';
import Marketplace from '@layout/Marketplace/UI/marketplace.tsx';
import withAuth from '@components/isAuth/isAuth.tsx';
import {Route, Routes} from "react-router-dom";

const ProtectedMarketplace = withAuth(Marketplace);

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Auth/>}/>
                <Route path="/singup" element={<SingUp/>}/>
                <Route path="/confirmed" element={<Confirmed/>}/>
                <Route path="/progress" element={<Progress/>}/>
                <Route path="/marketplace/*" element={<ProtectedMarketplace/>}/>
            </Routes>
        </>
    );
};

export default App;