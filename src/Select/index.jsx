import React,{Component} from 'react'
import classnames from 'classnames'
import layer from '../higherOrder/layer'
import Button from '../Button'
import Scroll from '../Scroll'
import '../../style/Select/style.scss'

class Group extends Component{
    render(){
        const {list}=this.props;
        return (
            <div className="candy-mob-select__group">
                <div className="candy-mob-select__group__inner">
                    {list.map(data=><div className="candy-mob-select__option" key={data.value} data-value={data.value}>{data.text}</div>)}
                </div>
            </div>
        );
    }
}

@layer
export default class Select extends Component{
    dataFormat(data){
        if(!Array.isArray(data[0])){
            data=[data];
        }
        data=data.filter(item=>Array.isArray(item));
        return data.map(group=>{
            return group.map(item=>{
                if(typeof item=='string'){
                    return {
                        text:item,
                        value:item
                    }
                }else if(item&&item.text&&item.value!==undefined){
                    return {
                        text:item.text,
                        value:item.value
                    }
                }
            }).filter(item=>item);
        }).filter(group=>group&&group.length>0);
    }
    touchStartHandler=(e)=>{
        e.preventDefault();
        const {remove}=this.props;
        remove();
    }
    render(){
        const {className,remove,children}=this.props;
        const optionList=this.dataFormat(children).map((group,key)=>{
            return <Group list={group} key={key}/>
        });
        return (
            <div className={classnames("candy-mob-select",className)}>
                <div className="candy-mob-select__cover" onTouchStart={this.touchStartHandler}></div>
                <div className="candy-mob-select__inner">
                    <div className="candy-mob-select__title">
                        <Button type="ghost" size="mini" onClick={remove}>取消</Button>
                        <div className="candy-mob-select__title__center">请选择</div>
                        <Button type="ghost" size="mini">确定</Button>
                    </div>
                    <div className="candy-mob-select__content">
                        {optionList}
                    </div>
                </div>
            </div>
        );
    }
}