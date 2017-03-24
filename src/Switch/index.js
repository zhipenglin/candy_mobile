import React,{PureComponent,PropTypes} from 'react'
import classnames from 'classnames'
import '../../style/Switch/style.scss'

export default class Switch extends PureComponent{
    static defaultProps={
        value:true,
        openLabel:'开',
        closeLabel:'关',
        onChange:()=>{}
    }
    static propTypes={
        value:PropTypes.bool,
        onChange:PropTypes.func
    }
    state={
        value:true
    }
    constructor(){
        super();
        this.onClickHandler=this.onClickHandler.bind(this);
    }
    componentWillMount(){
        this.setState({value:this.props.value});
    }
    onClickHandler(){
        const {onChange}=this.props;
        this.setState({value:!this.state.value},()=>{
            onChange(this.state.value);
        });
    }
    render(){
        const {className,openLabel,closeLabel}=this.props;
        return (
            <div className={classnames("candy-mob-switch",{
                "candy-mob-switch--open":this.state.value
            },className)} onClick={this.onClickHandler}>
                <div className="candy-mob-switch__inner">
                    <div className="candy-mob-switch__button"></div>
                </div>
                <span className="candy-mob-switch__label">{this.state.value?openLabel:closeLabel}</span>
            </div>
        );
    }
}