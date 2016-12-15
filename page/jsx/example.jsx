/**
 * Created by ifchangetoclzp on 2016/12/13.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Button,Toast} from '../../src/index'

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