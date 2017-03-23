import React,{Component} from 'react'
import LoadingButton from '../Button/LoadingButton'


export default class SubmitButton extends Component{
	static hasFormType='SubmitButton'
	static defaultProps={
		onClick:()=>{}
	}
	clickHandler=(change,...args)=>{
		const {onClick,submit}=this.props;
		if(submit){
			submit(change);
		}
		onClick(...args);
	}
	render(){
		const {submit,onClick,...reset}=this.props;
		return (
			<LoadingButton onClick={this.clickHandler} {...reset}/>
		);
	}
}