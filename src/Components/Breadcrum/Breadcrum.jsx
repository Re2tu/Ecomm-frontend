import React from "react";
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

// arrow marks upon mens womens kids page home>men>tshirt>
const Breadcrum=(props)=>{
    const {product}=props;
    return(
<div className="breadcrum">
    HOME <img src={arrow_icon} alt=""/> SHOP <img src={arrow_icon} alt=""/> {product.category} <img src={arrow_icon} alt=""/> {product.name}
</div>
    )
}

export default Breadcrum