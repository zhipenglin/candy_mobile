import React,{Component} from 'react'
import md5 from 'blueimp-md5'
import field from './field'
import active from './active'
import '../../style/Form/input.scss'

@field
@active
export default class Input extends Component{
    constructor(){
        super();
        this.state={
            value:''
        };
    }
    changeHandler=(e)=>{
        let value=e.target.value;
        this.setState({
            value:value
        });
        const {onChange}=this.props;
        value=value.trim();
        onChange({computed:md5(value),origin:value});
    }
    render(){
        const {value,onChange,...reset}=this.props;
        return <input className="candy-mob-input" onChange={this.changeHandler} type="password" value={this.state.value} {...reset}/>
    }
}