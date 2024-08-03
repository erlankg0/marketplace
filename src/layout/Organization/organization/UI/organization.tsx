import {Route, Routes} from "react-router-dom";
import React from "react";

import Admin from "@layout/Organization/admin/UI/admin.tsx";
import Add from "@layout/Organization/employers/add/UI/add.tsx";
import ListEmployers from "@layout/Organization/employers/list/UI/list.tsx";
import DetailEmployees from "@layout/Organization/employers/detail/UI/detail.tsx";
import AddAppointment from "@layout/Organization/appointment/add/UI/add.tsx";
import History from "@layout/Organization/history/UI/history.tsx";

import {IOrganization} from "@layout/Organization/interface.ts";

const Organization: React.FC<IOrganization> = ({setModalActive}) => {
    return (
        <Routes>
            <Route path={'/admin'} element={<Admin setModalActive={setModalActive}/>}/>
            <Route path={'/add-employer'} element={<Add/>}/>
            <Route path={'/list-employer'} element={<ListEmployers/>}/>
            <Route path={'admin/detail-employer'} element={<DetailEmployees setModalActive={setModalActive}/>}/>
            <Route path={'/appointment'} element={<AddAppointment/>}/>
            <Route path={'/history-employer'} element={<History setModalActive={setModalActive}/>}/>
        </Routes>
    )
}

export default Organization