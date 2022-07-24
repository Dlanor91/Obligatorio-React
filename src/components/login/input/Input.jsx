import React from "react";

const Input = ({ attribute, handleChange, param }) => {
    return (
        <div>
            <input
                id={attribute.id}
                name={attribute.name}
                placeholder={attribute.placeholder}
                type={attribute.type}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
            />
        </div>
    )
};

export default Input;