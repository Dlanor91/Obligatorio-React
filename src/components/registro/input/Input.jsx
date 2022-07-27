import React from "react";

const Input = ({ attribute, handleChange, param }) => {
    return (
        <div className="w-50" >
            <input
                id={attribute.id}
                name={attribute.name}
                placeholder={attribute.placeholder}
                type={attribute.type}
                onChange={handleChange}                
                className="form-control"
            />
            
        </div>
    )
};

export default Input;