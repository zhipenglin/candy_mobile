import React,{PropTypes,PureComponent} from 'react'
import classnames from 'classnames'
import '../../style/higherOrdder/field.scss'

export default function fieldDecorator(MiddleComponent) {
    return class FieldDecorator extends PureComponent {
        render(){
            const {label,hideLabel,active,status,errMsg,...others}=this.props;
            return (
                <div className={classnames('candy-mob-field',{
                    'candy-mob-field--active':active,
                    'candy-mob-field--error':status==2,
                    'candy-mob-field--loading':status==1
                })}>
                    <div className="candy-mob-field__content">
                        {hideLabel?null:<div className="candy-mob-field__label">{label}</div>}
                        <div className="candy-mob-field__inner">
                            <MiddleComponent {...others}/>
                            <i className="candy-mob-field__status"></i>
                        </div>
                    </div>
                    <div className="candy-mob-field__msg">{status==2?errMsg:null}</div>
                </div>
            );
        }
    }
}