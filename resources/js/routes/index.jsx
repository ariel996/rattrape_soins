import React from 'react';
import {Route, Routes} from 'react-router-dom';
import routes, {privateRoutes} from './routes';
import PrivateRoute from './Private';
import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import Welcome from "@/Pages/Welcome";
import ForgetPassword from "@/Pages/Auth/ForgotPassword";

function Routers() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forget-password" element={<ForgetPassword/>}/>

                <Route element={<PrivateRoute isAuthenticated={false}/>}>
                    {privateRoutes.map((route) => <Route key={route.path} path={route.path}
                                                         element={route.component}/>)}
                </Route>
                {routes.map((route) => <Route key={route.path} path={route.path}
                                                    element={route.component}/>)}
            </Routes>

            {/* <Route>
                {routes.map((route) => {
                    if (route.auth && route.fallback) {
                        return <Route element={<SplitRoute key={route.path} {...route} />}/>;
                    }
                    if (route.auth) {
                        return <Route element={<PrivateRoute key={route.path} {...route} />}/>;
                    }
                    return <Route element={<PublicRoute key={route.path} {...route} />}/>;
                })}
            </Route>*/}
        </>
    )
}

export default Routers;
