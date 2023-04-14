import {Route, Routes} from "react-router-dom"
import Layout from "./Layout";
import Home from "../views/Home";
import Admin from "../views/Admin";
import User from "../views/User";

const Routing = (): JSX.Element => {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*public routes*/}
                <Route path="/" element={<Home/>}/>

                {/*admin routes*/}
                <Route path="admin" element={<Admin/>}/>

                {/*user routes*/}
                <Route path="user" element={<User/>}/>
            </Route>
        </Routes>
    )
}

export default Routing
