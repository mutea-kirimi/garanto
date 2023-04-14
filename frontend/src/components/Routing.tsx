import {Route, Routes} from "react-router-dom"
import Layout from "./Layout";
import Home from "../views/Home";
import Authorization from "./Authorization";
import {Role} from "../dataClasses/classes";
import UnAuthorized from "./UnAuthorized";
import Error from "./Error";
import Authentication from "./Authentication";
import Landing from "../views/Landing";
import ResourceNotFound from "./ResourceNotFound";
import NestedAdmin from "../views/NestedAdmin";
import UserInfo from "../views/UserInfo";

const Routing = (): JSX.Element => {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<Authentication/>}>

                    {/*public routes*/}
                    <Route path="/" element={<Home/>}/>

                    {/*user routes*/}
                    <Route element={<Authorization allowedRoles={[Role.USER, Role.ADMIN]}/>}>
                        <Route path="landing" element={<Landing/>}/>
                        <Route path="landing/info" element={<UserInfo/>}/>
                    </Route>

                    {/*admin routes*/}
                    <Route element={<Authorization allowedRoles={[Role.ADMIN]}/>}>
                        <Route path="landing/admin" element={<NestedAdmin/>}/>
                    </Route>

                </Route>

                {/*fallback routes*/}
                <Route path="/error" element={<Error/>}/>
                <Route path="/unauthorized" element={<UnAuthorized/>}/>
                <Route path="*" element={<ResourceNotFound/>}/>

            </Route>
        </Routes>
    )
}

export default Routing
