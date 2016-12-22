import React,{Component,cloneElement} from 'react'
import classnames from 'classnames'
import Button from '../Button'
import Touch from '../Touch'
import layer from '../higherOrder/layer'

@layer
class Cover extends Component{
    touchStartHandler=()=>{
        this.props.remove();
    }
    render(){
        const {className}=this.props;
        return (
            <div className={classnames("candy-mob-list_item_layer",className)} onTouchStart={this.touchStartHandler}></div>
        );
    }
}

export default class ListItem extends Component{
    constructor(){
        super();
        this.state={
            menuX:0,
            open:false,
            menuChange:false
        };
    }
    pressMoveHandler=(event,superEvent)=>{
        if(!this.state.menuChange){
            let x=Math.abs(superEvent.distanceX),y=Math.abs(superEvent.distanceY);
            if(superEvent.distanceX<-10&&x>y){
                this.setState({
                    menuChange:true
                });
            }else{
                return;
            }
        }else{
            let distance=this.state.menuX+superEvent.deltaX;
            if(distance<-this.refs.item_menu.offsetWidth-20||distance>20){
                return;
            }
            this.setState({
                menuX:distance
            });
        }
    }
    touchEndHandler=(event,superEvent)=>{
        if(!this.state.open&&this.state.menuX<-20){
            this.cover=new Cover(null,{
                removeCallback:()=>{
                    this.closeMenu();
                }
            });
            this.setState({
                menuChange:false,
                open:true,
                menuX:-this.refs.item_menu.offsetWidth
            });
        }else{
            this.closeMenu();
        }
    }
    closeMenu(){
        this.setState({
            menuChange:false,
            open:false,
            menuX:0
        });
        if(this.cover){
            this.cover.remove();
        }
    }
    renderMenu(children){
        const {menu}=this.props;
        if(menu&&menu.length>0){
            let menuList=menu.map((item,key)=>{
                return <Button className="candy-mob-list_item__menu_item" style={item.color?{background:item.color}:{}} type="ghost" key={key} onClick={item.onClick}>{item.text}</Button>
            });
            let style={
                transform:`translateX(${this.state.menuX}px)`
            };
            if(!this.state.menuChange){
                style.transition='transform 300ms';
            }
            return <div className="candy-mob-list_item__touch"  style={this.state.open?{zIndex:1000}:{}}>
                        {this.state.open?<div className="candy-mob-list_item__cover" style={style} onTouchStart={()=>{
                            this.closeMenu();
                        }}></div>:null}
                        <Touch onTouchEnd={this.touchEndHandler} onPressMove={this.pressMoveHandler}>
                            <div className="candy-mob-list_item__animate" style={style}>
                                {children}
                            </div>
                            <div className="candy-mob-list_item__menu" ref="item_menu">{menuList}</div>
                        </Touch>
                    </div>
        }else{
            return children;
        }
    }
    renderClick(children){
        const {onClick}=this.props;
        if(typeof onClick=='function'){
            return <Button onClick={onClick} type="ghost">{children}</Button>;
        }else{
            return children;
        }
    }
    render(){
        const {className,onClick,icon,menu,children}=this.props;
        return (
            <li className={classnames("candy-mob-list_item",{
                "candy-mob-list_item--icon":icon,
                "candy-mob-list_item--link":typeof onClick=='function',
                "candy-mob-list_item--menu":menu&&menu.length>0
            },className)}>
                {this.renderMenu(this.renderClick(<div className="candy-mob-list_item__inner">
                    {icon?<div className="candy-mob-list_item__media">{icon}</div>:null}
                    <div className="candy-mob-list_item__content">{children}</div>
                </div>))}
            </li>
        );
    }
}