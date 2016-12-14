/**
 * Created by ifchangetoclzp on 2016/12/13.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from '../../lib/index'

ReactDOM.render(<Button onClick={function(){
    console.log('点击按钮');
}}>普通按钮</Button>,document.querySelector('.s-button-normal'));
ReactDOM.render(<Button type="primary">主按钮</Button>,document.querySelector('.s-button-primary'));
ReactDOM.render(<Button type="ghost">幽灵按钮</Button>,document.querySelector('.s-button-ghost'));
ReactDOM.render(<Button type="link">链接按钮</Button>,document.querySelector('.s-button-link'));
ReactDOM.render(<Button size="small">小按钮</Button>,document.querySelector('.s-button-small'));
ReactDOM.render(<Button size="mini">迷你按钮</Button>,document.querySelector('.s-button-mini'));