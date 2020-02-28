import React from 'react';
 import logo  from "../ToDo-List-icon.png"

function Header() {
    return (
        <header style={{ background: "rgba(144, 135, 165, 0.15)"}}>
            <img src={logo}
                 style={{
                     margin: "0 auto",
                     display: "block"
                 }}
                 width="200px" alt="List-icon"/>
        </header>
    )
}

export default Header;