import React from "react";
import '../../global.css';
import './styles.css';
// import { FiUser, FiDollarSign } from 'react-icons/fi';
// import { FcConferenceCall, FcInTransit,FcReadingEbook } from "react-icons/fc";
// import { GiBanknote } from "react-icons/gi";
// import { RiNewspaperFill } from "react-icons/ri"
// import { MdOutlinePlace, MdPlace } from "react-icons/md"
import Menu from "../../componentes/Menu";
export default function Dashboard(){
    return(
        <div className="dashboard-container">
            {/* <p>
                Dashboard
            </p> */}
            <Menu/>
            <div className="principal">
                <p className="pri">Principal</p>
            </div>
        </div>
    )
}