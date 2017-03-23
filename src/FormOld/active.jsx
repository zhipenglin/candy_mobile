import React,{Component} from 'react'
export default function(ComposedComponent){
    return class active extends Component{
        onActiveChange=(event)=>{
            const {onActiveChange}=this.props;
            if(event.type=='focus'){
                onActiveChange(true);
            }else if(event.type=='blur'){
                onActiveChange(false);
            }
        }
        render(){
            const {onActiveChange,...reset}=this.props;
            return <ComposedComponent className="candy-mob-input" onFocus={this.onActiveChange} onBlur={this.onActiveChange} {...reset}/>
        }
    }
}