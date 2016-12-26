import React,{Component} from 'react'
import Button from './index'

export default class LoadingButton extends Component{
	static defaultProps={
        loadingText:'正在加载...%s%'
    }
    constructor(){
        super();
        this.state={
            loading:false
        };
    }
    clickHandler=(...args)=>{
        const {onClick,disabled}=this.props;
        if(disabled||this.state.loading){
            return;
        }
        this.setState({
            text:this.getLoadingText(),
            loading:true
        });
        onClick(this.changeHandler,...args);
    }
    changeHandler=(progress)=>{
        const {loadingText}=this.props;
        if(progress===true||progress===undefined||(typeof progress=='number'&&progress>=100)){
            this.setState({
                loading:false
            });
        }else if(typeof progress=='string'){
            this.setState({
                text:progress
            });
        }else if(typeof progress=='number'){
            this.setState({
                text:this.getLoadingText(progress)
            });
        }
    }
    getLoadingText(progress=0){
        const {loadingText}=this.props;
        return loadingText.replace(/%s/g,progress);
    }
    render(){
        const {disabled,loadingText,onClick,children,...reset}=this.props;
        return (
            <Button disabled={disabled||this.state.loading} onClick={this.clickHandler} {...reset}>
                {this.state.loading?<div className="candy-mob-button--loading">{this.state.text}</div>:children}
            </Button>
        );
    }
};