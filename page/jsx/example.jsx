/**
 * Created by ifchangetoclzp on 2016/12/13.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Button,Toast,Confirm,Action,Drawer} from '../../src/index'

ReactDOM.render(<Button onClick={function(){console.log('click!');}}>普通按钮</Button>,document.querySelector('.s-button-normal'));
ReactDOM.render(<Button onClick={function(){console.log('click!');}} disabled>禁用普通按钮</Button>,document.querySelector('.s-button-normal-disabled'));

ReactDOM.render(<Button type="primary">主按钮</Button>,document.querySelector('.s-button-primary'));
ReactDOM.render(<Button type="primary" disabled>禁用主按钮</Button>,document.querySelector('.s-button-primary-disabled'));

ReactDOM.render(<Button type="ghost">幽灵按钮</Button>,document.querySelector('.s-button-ghost'));
ReactDOM.render(<Button type="ghost" disabled>禁用幽灵按钮</Button>,document.querySelector('.s-button-ghost-disabled'));

ReactDOM.render(<Button type="link">链接按钮</Button>,document.querySelector('.s-button-link'));
ReactDOM.render(<Button type="link" disabled>禁用链接按钮</Button>,document.querySelector('.s-button-link-disabled'));

ReactDOM.render(<Button size="small">小按钮</Button>,document.querySelector('.s-button-small'));
ReactDOM.render(<Button size="small" type="primary">小按钮</Button>,document.querySelector('.s-button-small-primary'));

ReactDOM.render(<Button size="mini">迷你按钮</Button>,document.querySelector('.s-button-mini'));
ReactDOM.render(<Button size="mini" type="primary">迷你按钮</Button>,document.querySelector('.s-button-mini-primary'));


ReactDOM.render(<div>
    <Button type="primary" size="small" onClick={function(){new Toast('错误提示框');}}>显示错误提示框</Button>
    <Button type="primary" size="small" onClick={function(){new Toast('成功提示框',{type:'success'});}}>显示成功提示框</Button>
    <Button type="primary" size="small" onClick={function(){new Toast('加载中...',{type:'loading'});}}>显示加载提示框</Button>
</div>,document.querySelector('.s-dialog-toast'));
ReactDOM.render(<div>
    <Button type="primary" size="small" onClick={function(){new Confirm('确认框');}}>确认框</Button>
    <Button type="primary" size="small" onClick={function(){new Confirm('确认框',{callbackCancel:function(){}});}}>带取消的确认框</Button>
    <Button type="primary" size="small" onClick={function(){new Confirm('确认框',{title:'请确定',callbackCancel:function(){}});}}>带标题的确认框</Button>
</div>,document.querySelector('.s-dialog-confirm'));

ReactDOM.render(<div>
    <Button type="primary" size="small" onClick={function(){new Action([[{
        text:'请确认',
        label:true
    },{
        text:'确定',
        callback:function(){

        }
    }],[{
        text:'取消',
        color:'red'
    }]]);}}>操作表</Button>
</div>,document.querySelector('.s-dialog-action'));

class DrawerContent extends Component{
    render(){
        const {remove}=this.props;
        return (
            <div>
                <h1>我是Drawer</h1>
                <Button size="small" onClick={remove}>关闭Drawer</Button>
            </div>
        );
    }
}

ReactDOM.render(<div>
    <Button type="primary" size="small" onClick={function(){new Drawer(<div><h1>我是Drawer</h1></div>);}}>抽屉</Button>
    <Button type="primary" size="small" onClick={function(){new Drawer(<div><h1>我是Drawer</h1></div>,{right:true});}}>抽屉右</Button>
    <Button type="primary" size="small" onClick={function(){new Drawer(<DrawerContent/>);}}>抽屉内部关闭</Button>
</div>,document.querySelector('.s-dialog-drawer'));