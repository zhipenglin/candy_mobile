/**
 * Created by ifchangetoclzp on 2016/12/13.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Button,Toast,Confirm,Action,Drawer,List,ListItem,Select,SelectDate,SelectDateTime,SelectTime,Form,Input,SubmitButton,SelectField,SwitchField} from '../../src/index'

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
    <Button type="primary" size="small" onClick={function(){new Confirm('确认框',{cancelCallback:function(){}});}}>带取消的确认框</Button>
    <Button type="primary" size="small" onClick={function(){new Confirm('确认框',{title:'请确定',cancelCallback:function(){}});}}>带标题的确认框</Button>
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


class AnimateList extends Component{
    itemList=[<ListItem key="0">列表1</ListItem>,
    <ListItem key="1">列表2</ListItem>,
    <ListItem key="2">列表3</ListItem>,
    <ListItem key="3">列表4</ListItem>]
    state={
        show:false
    }
    renderList(){
        return <List animate>
            {this.state.show?this.itemList:null}
        </List>
    }
    swatchList=()=>{
        this.setState({
            show:!this.state.show
        });
    }
    render(){
        return <div>
            <Button type="primary" size="small" onClick={this.swatchList}>{this.state.show?'列表出场':'列表进场'}</Button>
            {this.renderList()}
        </div>
    }
}
ReactDOM.render(<div>
    <List title="普通列表">
        <ListItem>列表1</ListItem>
        <ListItem>列表2</ListItem>
        <ListItem>列表3</ListItem>
        <ListItem>列表4</ListItem>
    </List>
    <List inside title="内嵌列表">
        <ListItem>列表1</ListItem>
        <ListItem>列表2</ListItem>
        <ListItem>列表3</ListItem>
        <ListItem>列表4</ListItem>
    </List>
    <div>
        <div>带进出场动画的列表</div>
        <AnimateList></AnimateList>
    </div>
    <List title="可点击列表">
        <ListItem onClick={function(){console.log('clicked');}}>列表1</ListItem>
        <ListItem onClick={function(){console.log('clicked');}}>列表2</ListItem>
        <ListItem onClick={function(){console.log('clicked');}}>列表3</ListItem>
        <ListItem onClick={function(){console.log('clicked');}}>列表4</ListItem>
        <ListItem href="https://www.baidu.com">百度</ListItem>
        <ListItem href="https://www.zhihu.com">知乎</ListItem>
    </List>
    <List title="多媒体列表">
        <ListItem icon={<i className="icon" style={{
            width: '60px',
            display:'block',
            height: '60px',
            background: '#ececec',
            borderRadius: '8px',
        }}></i>} onClick={function(){console.log('clicked');}}>
            <div className="title">列表1</div>
            <div className="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
        </ListItem>
        <ListItem icon={<i className="icon" style={{
            width: '60px',
            display:'block',
            height: '60px',
            background: '#ececec',
            borderRadius: '8px',
        }}></i>} onClick={function(){console.log('clicked');}}>
            <div className="title">列表2</div>
            <div className="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
        </ListItem>
        <ListItem icon={<i className="icon" style={{
            width: '60px',
            display:'block',
            height: '60px',
            background: '#ececec',
            borderRadius: '8px',
        }}></i>} onClick={function(){console.log('clicked');}}>
            <div className="title">列表3</div>
            <div className="content">内容内容内容内容内容内容内容</div>
        </ListItem>
        <ListItem icon={<i className="icon" style={{
            width: '60px',
            display:'block',
            height: '60px',
            background: '#ececec',
            borderRadius: '8px',
        }}></i>} onClick={function(){console.log('clicked');}}>
            <div className="title">列表4</div>
            <div className="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
        </ListItem>
    </List>
    <List title="带左拉菜单的列表">
        <ListItem menu={[{
            text:'删除',
            color:'red',
            onClick:function(){
                console.log('删除');
            }
        }]}>列表1</ListItem>
        <ListItem menu={[{
            text:'测试测试测试测试测试测试',
            color:'red',
            onClick:function(){
                console.log('测试测试测试测试测试测试');
            }
        }]} onClick={function(){}}>列表2</ListItem>
        <ListItem menu={[{
            text:'删除',
            color:'red',
            onClick:function(){
                console.log('删除');
            }
        }]} icon={<i className="icon" style={{
            width: '60px',
            display:'block',
            height: '60px',
            background: '#ececec',
            borderRadius: '8px',
        }}></i>} onClick={function(){console.log('clicked');}}>
            <div className="title">列表4</div>
            <div className="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
        </ListItem>
        <ListItem menu={[{
            text:'编辑',
            onClick:function(){
                console.log('编辑');
            }
        },{
            text:'删除',
            color:'red',
            onClick:function(){
                console.log('删除');
            }
        }]} onClick={function(){}}>列表2</ListItem>
    </List>
</div>,document.querySelector('.s-list-normal'));

ReactDOM.render(<div>
    <Button type="primary" size="small" onClick={function(){
        new Select(['选项1','选项2','选项3','选项4'],{
            onChange:function(value) {
              new Toast(value,{type:'success'});
            }
        });
    }}>打开选择器</Button>
</div>,document.querySelector('.s-select-single'));

ReactDOM.render(<div>
    <Button type="primary" size="small" onClick={function(){
        new Select([{
            list:['选项01','选项02','选项03','选项04'],
            defaultIndex:1
        },{
            list:['选项11','选项12','选项13','选项14'],
            defaultIndex:2
        },{
            list:['选项21','选项22','选项23','选项24'],
            defaultValue:'选项24'
        }],{
            onChange:function(value) {
              new Toast(value,{type:'success'});
            }
        });
    }}>打开选择器</Button>
</div>,document.querySelector('.s-select-mult'));

ReactDOM.render(<div>
    <Button type="primary" size="small" onClick={function(){
        new SelectDate({
            title:'日期选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>打开选择器</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectDate({
            start:new Date(),
            title:'日期选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>设置开始时间</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectDate({
            end:new Date(),
            title:'日期选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>设置结束时间</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectDate({
            current:'2000-09-21',
            title:'日期选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>设置当前时间</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectDate({
            dayDisplay:false,
            title:'日期选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>隐藏日选择</Button>
</div>,document.querySelector('.s-select-date'));

ReactDOM.render(<div>
    <Button type="primary" size="small" onClick={function(){
        new SelectTime({
            title:'时间选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>打开选择器</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectTime({
            start:new Date(),
            title:'时间选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>设置开始时间</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectTime({
            end:new Date(),
            title:'时间选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>设置结束时间</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectTime({
            current:'10:30',
            title:'时间选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>设置当前时间</Button>
</div>,document.querySelector('.s-select-time'));

ReactDOM.render(<div>
    <Button type="primary" size="small" onClick={function(){
        new SelectDateTime({
            title:'日期时间选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>打开选择器</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectDateTime({
            start:new Date(),
            title:'日期时间选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>设置开始时间</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectDateTime({
            end:new Date(),
            title:'日期时间选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>设置结束时间</Button>
    <Button type="primary" size="small" onClick={function(){
        new SelectDateTime({
            current:'2000-09-21 10:30',
            title:'日期时间选择器',
            onChange:function(value){
                new Toast(value,{type:'success'});
            }
        });
    }}>设置当前时间</Button>
</div>,document.querySelector('.s-select-datetime'));

ReactDOM.render(<div>
    <Form>
        <Input name="name" rule="req email" label="用户名" placeholder="请输入用户名"/>
        <div>
            <Input name="tel" rule="req tel" label="手机号" placeholder="请输入手机号"/>
        </div>
        <Input type="password" name="pwd" rule="req 1-10" label="密码" placeholder="请输入密码"/>
        <Input type="textarea" name="des" rule="req 1-100" label="简介" placeholder="请输入简介" maxLength={100}/>
        <SelectField name="select" label="多项选择" rule="req">{[['选项1','选项2','选项3','选项4'],['选项1','选项2','选项3','选项4']]}</SelectField>
        <SelectField name="select2" label="选择" placeholder="请选择一项">{['选项1','选项2','选项3','选项4']}</SelectField>
        <SwitchField name="sex" label="性别" openLabel="男" closeLabel="女"></SwitchField>
        <SubmitButton>提交</SubmitButton>
    </Form>
</div>,document.querySelector('.s-form-input'));

