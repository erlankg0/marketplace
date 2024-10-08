import Create from "@layout/Organization/create/UI/create.tsx";
import {Route, Routes} from "react-router-dom";
import Admin from "@layout/Organization/admin/UI/admin.tsx";
import {IOrganization} from "@layout/Organization/interface.ts";
import React from "react";
import Add from "@layout/Organization/employers/add/UI/add.tsx";
import ListEmployers from "@layout/Organization/employers/list/UI/list.tsx";
import DetailEmployees from "@layout/Organization/employers/detail/UI/detail.tsx";
import AddAppointment from "@layout/Organization/appointment/add/UI/add.tsx";

const Organization: React.FC<IOrganization> = ({setModalActive}) => {
    return (
        <Routes>
            <Route path={'/'} element={<Create/>}/>
            <Route path={'/admin'} element={<Admin setModalActive={setModalActive}/>}/>
            <Route path={'/add-employer'} element={<Add/>}/>
            <Route path={'/list-employer'} element={<ListEmployers/>}/>
            <Route path={'/detail-employer'} element={<DetailEmployees setModalActive={setModalActive}/>}/>
            <Route path={'/appointment'} element={<AddAppointment/>}/>
        </Routes>
    )
}

export default Organization