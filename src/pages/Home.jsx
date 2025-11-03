import React from "react";
import Card from "../components/Card"

export default function Home({ cartCount ,setCartCount})  {
    return (
        <div className="mt-[-45vh]">
            <Card cartCount={cartCount} setCartCount={setCartCount} />
        </div>
    )
}