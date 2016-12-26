import React from 'react'
import {compose} from 'recompose'
import layer from './layer'

export default compose(layer,function(ComposedComponent){
    return (props)=>{
        const touchStartHandler=(e)=>{
            e.preventDefault();
            props.remove();
        }
        return <div>
            <div className="candy-mob-layer__cover_touch" onTouchStart={touchStartHandler}></div>
            <ComposedComponent {...props}/>
        </div>;
    }
});