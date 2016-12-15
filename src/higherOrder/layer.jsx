import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import '../../style/higherOrdder/layer.scss'

export default function(ComposedComponent){
    return class Layer{
        constructor(text,options){
            this._layer=document.createElement('div');
            this.alive=true;
            this.isShow=true;
            this.options=Object.assign({},options);
            this.text=text;
            document.body.appendChild(this._layer);
            this._render();
        }
        _render(){
            ReactDOM.render(<ComposedComponent className="candy-mob-layer" show={this.isShow} remove={this.remove} close={this.close} {...this.options}>{this.text}</ComposedComponent>, this._layer);
        }
        show=()=>{
            if(!this.alive){
                console.warn('当前组件已销毁');
                return;
            }
            if(!this.isShow){
                this.isShow=true;
                this._render();
            }
        }
        remove=()=>{
            if(!this.alive){
                return;
            }
            this.alive=false;
            ReactDOM.unmountComponentAtNode(this._layer);
            document.body.removeChild(this._layer);
            this.options.removeCallback&&this.options.removeCallback();
        }
        close=()=>{
            if(!this.alive){
                return;
            }
            if(this.isShow){
                this.isShow=false;
                this._render();
            }
        }
    }
}