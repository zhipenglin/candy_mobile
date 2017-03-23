import React,{Component} from 'react'
import classnames from 'classnames'
import Wave from '../Wave'
import Touch from '../Touch'
import '../../style/Buttton/style.scss'

export default class Button extends Component{
    state={
        press:false
    }
    touchStartHandler=()=>{
        if(this.props.disabled){
            return;
        }
        this.setState({
            press:true
        });
    }
    touchEndHandler=()=>{
        this.setState({
            press:false
        });
    }
    clickHandler=(event,superEvent)=>{
        if(this.props.disabled){
            return;
        }
        this.props.onClick&&this.props.onClick(event,superEvent);
    }
    render(){
        const {className,noWave,disabled,onClick,size,children,type,...reset}=this.props;
        return <div className={classnames('candy-mob-button',{
            'candy-mob-button--disabled':disabled,
            'candy-mob-button--primary':type=='primary',
            'candy-mob-button--ghost':type=='ghost',
            'candy-mob-button--link':type=='link',
            'candy-mob-button--small':size=='small',
            'candy-mob-button--mini':size=='mini',
            'candy-mob-button--press':this.state.press
        },className)}>
            <Touch onTap={this.clickHandler} onTouchStart={this.touchStartHandler} onTouchEnd={this.touchEndHandler} onTouchCancel={this.touchEndHandler}>
                {noWave===true?children:<Wave white={type=='primary'} disabled={disabled} outside={type=='link'||size=='mini'}>{children}</Wave>}
            </Touch>
        </div>
    }
}