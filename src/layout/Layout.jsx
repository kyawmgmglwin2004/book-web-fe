
import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
export default function Layout({cartCount, setCartCount}) {
    console.log("nav :", cartCount)
    return (
        <div>
            <div className="mb-[40vh]">
                <Header cartCount={cartCount}/>
                
            </div>
            <Outlet context={{ cartCount, setCartCount }} />

            <Footer/>
        </div>
    )
}