import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {DropDownTitle, DropDownContent} from "./StyleEditProfile"
const DropDown = ({list, changeYear}) =>{
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user);
    const toggleOpen = () => {
        setOpen(!open);
    }

    return(
        <div className = "title">
        <DropDownTitle onClick = {toggleOpen}>{user.year}</DropDownTitle>  
            {open && 
            <DropDownContent >
                {list.map((year, index)=>(
                    <DropDownTitle onClick = {changeYear(year)} key = {index}>{year}</DropDownTitle>
                ))}

                {/* <DropDownTitle>im opened</DropDownTitle>
                <DropDownTitle>im opened</DropDownTitle>
                <DropDownTitle>im opened</DropDownTitle>
                <DropDownTitle>im opened</DropDownTitle>                 */}
            </DropDownContent>

            }    
        </div>

        
    );
}

export default DropDown