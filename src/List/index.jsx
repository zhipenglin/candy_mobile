import React,{PureComponent} from 'react'
import classnames from 'classnames'
import {pure,getDisplayName} from 'recompose'
import ListItem from './ListItem'
import QueueAnim from 'rc-queue-anim';
import '../../style/List/style.scss'

const animConfig=[
    { opacity: [1, 0], scale: [1,0.5],translateX: [0, 100] },
    { opacity: [1, 0], scale: [0.5, 1],translateX: [0, -100] }
];
const filterListItem=(children)=>{
    return React.Children.toArray(children).filter((item)=>{
        return getDisplayName(item.type)=='ListItem';
    });
}
const AnimateList=pure(({animate,delay,duration,children})=>{
    if(animate){
        let config=typeof animate=='object'?animate:animConfig;
        return <QueueAnim className="candy-mob-list__animate" leaveReverse delay={delay} duration={duration} animConfig={config}>
            {children}
        </QueueAnim>;
    }else{
        return <div>{children}</div>;
    }
});
const List=pure(({className,title,inside,animate,children})=>{
    return (
        <div className={classnames("candy-mob-list",{
                "candy-mob-list--inside":inside
            },className)}>
            {title?<div className="candy-mob-list__title">{title}</div>:null}
            <div className="candy-mob-list__list">
                <AnimateList animate={animate}>{children}</AnimateList>
            </div>
        </div>
    );
});
List.ListItem=ListItem;

export default List;