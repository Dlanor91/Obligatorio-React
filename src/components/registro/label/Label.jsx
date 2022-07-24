import React from "react";

const Label = ({ texto,htmlEnlace }) => {
    return (
        <label htmlFor={htmlEnlace} className="m-2">{texto}</label>
    )
}

export default Label;