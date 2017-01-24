import React,{Component} from 'react'
import classnames from 'classnames'
import {pure} from 'recompose'
import find from 'lodash.find'
import layer from '../higherOrder/layerTouchClose'
import Button from '../Button'
import Scroll from '../Scroll/scroll'
import '../../style/Select/style.scss'

const listHeight=window.rem?window.rem*1.0625:80;
const Group=pure(({list,defaultIndex,onChange})=>{
    const changeHandler=(value)=>{
        onChange(list[-value/listHeight].value);
    }
    return <div className="candy-mob-select__group">
        <Scroll initY={-defaultIndex*listHeight} itemHeight={listHeight} onScrollEnd={changeHandler}>
            <div className="candy-mob-select__group__inner" ref="inner">
                {list.map(data=><div className="candy-mob-select__option" key={data.value} data-value={data.value}>{data.text}</div>)}
            </div>
        </Scroll>
    </div>;
});

@layer
export default class Select extends Component{
    constructor(){
        super();
        this.value=[];
    }
    dataFormat(data){
        if(this._formatData){
            return this._formatData;
        }
        if(!Array.isArray(data[0])){
            data=[data];
        }
        data=data.filter(item=>Array.isArray(item));
        return this._formatData=data.map(group=>{
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
    getDefaultIndex(){
        const {defaultValue,defaultIndex,children}=this.props;
        var valueArray=defaultValue,indexArray=defaultIndex,data=this.dataFormat(children);
        if(valueArray){
            if(!Array.isArray(valueArray)){
                valueArray=[valueArray];
            }
            return data.map((group,key)=>group.indexOf(find(group,(item)=>item.value===valueArray[key]))||0);
        }else if(indexArray){
            if(!Array.isArray(indexArray)){
                indexArray=[indexArray];
            }
            return data.map((group,key)=>{
                if(typeof indexArray[key]=='number'&&(indexArray[key]<0||indexArray[key]>group.length-1)){
                    return 0;
                }
                return indexArray[key];
            });
        }else{
            return data.map(()=>0);
        }
    }
    componentDidMount(){
        const {children}=this.props;
        const defaultIndex=this.getDefaultIndex();
        this.value=this.dataFormat(children).map((group,key)=>{
            return group[defaultIndex[key]].value;
        });
    }
    changeHandler=(key,value)=>{
        this.value[key]=value;
    }
    confirmClickHandler=()=>{
        const {remove}=this.props;
        console.log(this.value);
        remove();
    }
    render(){
        const {className,remove,children}=this.props;
        const defaultIndex=this.getDefaultIndex();
        const optionList=this.dataFormat(children).map((group,key)=>{
            return <Group list={group} defaultIndex={defaultIndex[key]} onChange={this.changeHandler.bind(this,key)} key={key}/>
        });
        return (
            <div className={classnames("candy-mob-select",className)}>
                <div className="candy-mob-select__inner">
                    <div className="candy-mob-select__title">
                        <Button type="ghost" size="mini" onClick={remove}>取消</Button>
                        <div className="candy-mob-select__title__center">请选择</div>
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