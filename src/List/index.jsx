import React,{Component} from 'react'
import classnames from 'classnames'
import ListItem from './ListItem'
import '../../style/List/style.scss'

export default class List extends Component{
    renderListItem(){
        const {children}=this.props;
        var childrenArray=React.Children.toArray(children).filter((item)=>{
            return item.type==ListItem;
        });
        return childrenArray;
    }
    render(){
        const {className,title,inside,children}=this.props;
        return (
            <div className={classnames("candy-mob-list",{
                "candy-mob-list--inside":inside
            },className)}>
                {title?<div className="candy-mob-list__title">{title}</div>:null}
                <ul className="candy-mob-list__ul">{this.renderListItem()}</ul>
            </div>
        );
    }
}

List.ListItem=ListItem;