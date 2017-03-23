import React,{Component} from 'react'
import classnames from 'classnames'
import {pure} from 'recompose'
import find from 'lodash/find'
import layer from '../higherOrder/layer'
import Button from '../Button'
import Scroll from '../Scroll/scroll'
import '../../style/Select/style.scss'

var listHeight;
const Group=pure(({list,defaultIndex,onChange,className})=>{
    if(!listHeight){
        listHeight=window.rem?window.rem*1.0625:80
    }
    const changeHandler=(value)=>{
        var index=parseInt(-value/listHeight);
        var selected=list[index];
        if(!selected){
            index=defaultIndex;
            selected=list[defaultIndex];
        }
        onChange(selected.value,index);
    }
    if(list&&list.length>0){
        return <div className={classnames("candy-mob-select__group",className)}>
            <Scroll initY={-defaultIndex*listHeight} itemHeight={listHeight} onScrollEnd={changeHandler}>
                <div className="candy-mob-select__group__inner" ref="inner">
                    {list.map(data=><div className="candy-mob-select__option" key={data.value} data-value={data.value}>{data.text}</div>)}
                </div>
            </Scroll>
        </div>;
    }else{
        return null;
    }
});

export function dataFormat(data){
    if(!Array.isArray(data[0])&&!Array.isArray(data[0].list)){
        data=[data];
    }
    data=data.filter(item=>{
        return Array.isArray(item)||Array.isArray(item.list);
    });
    return data.map(group=>{
        var list=[];
        if(Array.isArray(group)){
            list=group;
        }else if(Array.isArray(group.list)){
            list=group.list;
        }
        return {
            list:list.map(item=>{
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
            }).filter(item=>item),
            defaultIndex:group.defaultIndex,
            defaultValue:group.defaultValue,
            display:group.display,
            className:group.className,
            onChange:group.onChange||function(){}
        };
    }).filter(group=>group.list&&group.list.length>0).map((group,i)=>{
        var data={list:group.list,defaultIndex:0,display:group.display,className:group.className,onChange:group.onChange};
        if(typeof group.defaultIndex=='number'&&group.defaultIndex>0&&group.defaultIndex<group.list.length){
            data.defaultIndex=group.defaultIndex;
        }else if(group.defaultValue!==undefined){
            let index=group.list.indexOf(find(group.list,(item)=>item.value===group.defaultValue));
            data.defaultIndex=index<0?0:index;
        }
        return data;
    });
}

@layer
export default class Select extends Component{
    state={data:[]}
    constructor(){
        super();
        this.value=[];
    }
    componentWillMount(){
        const {children}=this.props;
        this.setState({data:this.dataFormat(children)},()=>{
            this.value=this.state.data.map((group,key)=>{
                return group.list[group.defaultIndex].value;
            });
        });
    }
    dataFormat=dataFormat
    changeHandler=(key,value,index)=>{
        this.value[key]=value;
        this.state.data[key].onChange(this,key,value);
        this.state.data[key].defaultIndex=index;
    }
    confirmClickHandler=()=>{
        const {remove,onChange}=this.props;
        typeof onChange=='function'&&onChange(this.valueOf(),this.state.data);
        remove();
    }
    cancelClickHandler=()=>{
        const {remove,onCancel}=this.props;
        typeof onCancel=='function'&&onCancel();
        remove();
    }
    valueOf(){
        if(this.value.length==1){
            return this.value[0];
        }else{
            return this.value;
        }
    }
    render(){
        const {className,remove,title,children}=this.props;
        const optionList=this.state.data.map((group,key)=>{
            if(group.display===false){
                return null;
            }
            return <Group className={group.className} list={group.list} defaultIndex={group.defaultIndex} onChange={this.changeHandler.bind(this,key)} key={key}/>
        });
        return (
            <div className={classnames("candy-mob-select",className)}>
                <div className="candy-mob-select__close" onClick={this.cancelClickHandler}></div>
                <div className="candy-mob-select__inner">
                    <div className="candy-mob-select__title">
                        <Button type="ghost" size="mini" onClick={this.cancelClickHandler}>取消</Button>
                        <div className="candy-mob-select__title__center">{title?title:'请选择'}</div>
                        <Button type="ghost" size="mini" onClick={this.confirmClickHandler}>确定</Button>
                    </div>
                    <div className="candy-mob-select__content">
                        {optionList}
                    </div>
                </div>
            </div>
        );
    }
}