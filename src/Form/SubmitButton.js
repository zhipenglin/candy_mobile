import React,{PureComponent} from 'react'
import LoadingButton from '../Button/LoadingButton'
import classnames from 'classnames'

export default class SubmitButton extends PureComponent{
    static formType='SubmitButton'
    constructor(){
        super();
        this.onClickHandler=this.onClickHandler.bind(this);
    }
    onClickHandler(change){
        const {submit}=this.props;
        submit().then(()=>{
            change();
        });
    }
    render(){
        const {className,submit,children,...others}=this.props;
        return (
            <LoadingButton className={classnames('candy-mob-submit-button',className)} {...others} type="primary" onClick={this.onClickHandler}>{children}</LoadingButton>
        );
    }
}