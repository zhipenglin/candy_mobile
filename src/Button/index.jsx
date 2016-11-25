import React,{Component} from 'react'
import classnames from 'classnames'
import Wave from '../Wave'
import '../../style/Buttton/style.scss'

export default class Button extends Component{
    render(){
        const {className,disabled,size,children,type,...reset}=this.props;
        return <a className={classnames('candy-mob-button',{
            'candy-mob-button--disabled':disabled,
            'candy-mob-button--primary':type=='primary',
            'candy-mob-button--ghost':type=='ghost',
            'candy-mob-button--link':type=='link',
            'candy-mob-button--small':size=='small',
            'candy-mob-button--mini':size=='mini'
        },className)} {...reset}>
            <Wave white={type=='primary'} disabled={disabled}>{children}</Wave>
        </a>
    }
}