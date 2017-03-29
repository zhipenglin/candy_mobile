import React,{PureComponent} from 'react'
import classnames from 'classnames'
import _ from 'lodash'
import List from '../List'
import ListItem from '../List/ListItem'
import {compose} from 'recompose'
import field from '../higherOrder/field'
import fieldDecorator from '../higherOrder/fieldDecorator'
import layer from '../higherOrder/layerTouchClose'
import '../../style/Form/check-list.scss'

@layer
class Cover extends PureComponent{
    render(){
        const {className,remove}=this.props;
        return (
            <div className={classnames("candy-mob-check-list-layer",className)} onTouchStart={remove}></div>
        )
    }
}

@compose(field,fieldDecorator)
export default class CheckList extends PureComponent{
    static defaultProps={
        placeholder:'请选择',
        mult:false
    }
    state={
        show:false
    }
    constructor(){
        super();
        this.listClickHandler=this.listClickHandler.bind(this);
    }
    componentWillMount(){
        this.cover=new Cover(null,{persistent:true,removeCallback:()=>{
            this.hide();
        }});
    }
    itemOnClick(itemValue,checked){
        const {value,mult,onValueChange,onActiveChange}=this.props;
        return (e)=>{
            if(mult){
                let list=value?value.slice(0):[];
                if(checked){
                    list.indexOf(itemValue);
                    list.splice(list.indexOf(itemValue),1);
                }else{
                    list.push(itemValue);
                }
                onValueChange(list);
            }else{
                this.hide();
                onValueChange(itemValue);
            }
        }
    }
    renderList(){
        const {children}=this.props;
        if(this.state.show&&Array.isArray(children)){
            let itemList=children.map((item)=>{
                if(typeof item=='string'){
                    item={value:item,text:item}
                }
                const checked=this.valueIsMatch(item.value);
                return <ListItem className={classnames("candy-mob-check-list__item",{
                    "candy-mob-check-list__item--checked":checked
                })} onClick={
                    this.itemOnClick(item.value,checked)
                } key={item.value} icon={<i className="icon "></i>}>
                    {item.text}
                </ListItem>
            });
            return itemList;
        }else{
            return null;
        }
    }
    valueIsMatch(itemValue){
        const {value,mult}=this.props;
        if(mult){
            return value&&value.indexOf(itemValue)>=0;
        }else{
            return value===itemValue;
        }
    }
    valueToString(){
        const {mult,value,children}=this.props;
        var getText=(item)=>{
            let target=children.find((child)=>{
                return ((typeof child=='string')?child:child.value)==item;
            });
            if(target){
                return (typeof target=='string')?target:target.text;
            }
        }
        if(mult){
            if(value&&value.length>0){
                return _(value).map((item)=>getText(item)).compact().join(',');
            }
        }else{
            if(value!==undefined){
                return getText(value);
            }
        }
    }
    listClickHandler(){
        this.show();
    }
    show(){
        const {onActiveChange}=this.props;
        this.setState({show:true});
        onActiveChange(true);
        this.cover.show();
    }
    hide(){
        const {onActiveChange}=this.props;
        this.setState({show:false});
        onActiveChange(false);
        this.cover.remove();
    }
    render(){
        const {className,placeholder,mult,value,children}=this.props;
        const text=this.valueToString();
        return (
            <div className={classnames("candy-mob-check-list",className,{
                "candy-mob-check-list--mult":mult,
                "candy-mob-check-list--show":this.state.show
            })}>
                <div className="candy-mob-check-list__field" onClick={this.listClickHandler}>
                    {text?text:<span className="candy-mob-check-list__placeholder">{placeholder}</span>}
                </div>
                <List className="candy-mob-check-list__inner" animate>
                    {this.state.show?this.renderList():null}
                </List>
            </div>
        );
    }
}