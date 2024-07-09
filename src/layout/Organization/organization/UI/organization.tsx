import Create from "@layout/Organization/create/UI/create.tsx";
import {Route, Routes} from "react-router-dom";
import Admin from "@layout/Organization/admin/UI/admin.tsx";
import {IOrganization} from "@layout/Organization/interface.ts";
import React from "react";

const Organization: React.FC<IOrganization> = ({setModalActive}) => {
    return (
        <Routes>
            <Route path={'/create'} element={<Create/>}/>
            <Route path={'/admin'} element={<Admin setModalActive={setModalActive}/>}/>
        </Routes>
    )
}

export default Organization