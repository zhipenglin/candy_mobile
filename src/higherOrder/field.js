import React,{PropTypes,PureComponent} from 'react'
export default function field(MiddleComponent){
    return class Field extends PureComponent{
        static formType='field'
        static propTypes={
            name:PropTypes.string.isRequired,
            rule:PropTypes.string,
            label:PropTypes.string,
            extra:PropTypes.func
        }
        state={
            value:'',
            active:false,
            status:0,  //0 初始化状态 1 正在校验中 2 错误
            errMsg:''
        }
        constructor(){
            super();
            this.onActiveChange=this.onActiveChange.bind(this);
            this.onValueChangeHandler=this.onValueChangeHandler.bind(this);
        }
        componentWillMount(){
            const {value}=this.props;
            this.setState({value:value});
        }
        onValueChangeHandler(value,noDispatch){
            const {dispatch}=this.props;
            if(noDispatch){
                this.setState({status:0,value,errMsg:''});
                return;
            }
            if(value===undefined){
                value=this.state.value;
            }
            dispatch(value).then((res)=>{
                if(res===true){
                    this.setState({status:0,value,errMsg:''});
                }else{
                    this.setState({status:2,errMsg:res});
                }
            });
            this.setState({status:1});
        }
        onActiveChange(event){
            const {onFocus,onBlur}=this.props;
            if(event.type=='focus'){
                this.setState({
                    active:true
                });
                typeof onFocus=='function'&&onFocus(event);
            }else if(event.type=='blur'){
                this.setState({
                    active:false
                });
                typeof onBlur=='function'&&onBlur(event);
            }
        }
        render(){
            const {value,dispatch,data,name,rule,label,extra,...others}=this.props;
            return (
                <MiddleComponent {...others} label={label} active={this.state.active} value={this.state.value} status={this.state.status} errMsg={this.state.errMsg} onValueChange={this.onValueChangeHandler} onFocus={this.onActiveChange} onBlur={this.onActiveChange}/>
            );
        }
    }
}