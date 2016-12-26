import React,{Component} from 'react'
import classnames from 'classnames'
import {pure} from 'recompose'
import layer from '../higherOrder/layerTouchClose'
import Button from '../Button'
import Scroll from '../Scroll'
import '../../style/Select/style.scss'

const dataFormat=(data)=>{
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
};

const Group=pure(({list})=><div className="candy-mob-select__group">
    <div className="candy-mob-select__group__inner">
        {list.map(data=><div className="candy-mob-select__option" key={data.value} data-value={data.value}>{data.text}</div>)}
    </div>
</div>);

export default layer(({className,remove,children})=>{
    const optionList=dataFormat(children).map((group,key)=>{
        return <Group list={group} key={key}/>
    });
    return (
        <div className={classnames("candy-mob-select",className)}>
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
});