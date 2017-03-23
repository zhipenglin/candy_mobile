import React,{Component} from 'react'
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
    componentDidMount(){
        const {value,onChange}=this.props;
        onChange(value.trim(),true);
    }
    changeHandler=(e)=>{
        let value=e.target.value;
        this.setState({
            value:value
        });
        const {onChange}=this.props;
        onChange(value.trim());
    }
    render(){
        const {value,onChange,...reset}=this.props;
        return <input className="candy-mob-input" onChange={this.changeHandler} type="text" value={this.state.value} {...reset}/>
    }
}