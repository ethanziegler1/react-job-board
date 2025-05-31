import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <ToastContainer />
        </>
    );
}