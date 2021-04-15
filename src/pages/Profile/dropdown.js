import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {DropDownTitle, DropDownContent} from "./StyleEditProfile"
const DropDown = ({list, changeYear}) =>{
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    }

    return(
        <div >
        <DropDownTitle onClick = {toggleOpen}>{year}</DropDownTitle>  
            {openYear && 
            <DropDownContent >
                {list.map((year, index)=>(
                    <DropDownTitle onClick = {changeYear(year)} key = {index}>{year}</DropDownTitle>
                ))}
            </DropDownContent>

            }    
        </div>

        
    );
}

export default DropDown