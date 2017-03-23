import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import '../../style/higherOrdder/layer.scss'
import Animate from 'rc-animate';

export default function(ComposedComponent){
    return class Layer{
        constructor(children,options){
            this._layer=document.createElement('div');
            this._layer.className='candy-mob-layer-set';
            document.body.appendChild(this._layer);

            this.options=Object.assign({},options);
            this.children=children;
            this.isShow=false;
            if(this.options.persistent!==true){
                this.show();
            }
        }
        animateEndHandler=()=>{
            if(!this.isShow&&this.options.persistent!==true){
                this.destroy();
            }
        }
        touchStartHandler=(e)=>{
            e.preventDefault();
        }
        _render(){
            ReactDOM.render(
                <Animate className="candy-mob-layer" transitionName="candy-mob-layer--animate" onEnd={this.animateEndHandler}>
                    {this.isShow?<div className="candy-mob-layer__inner">
                        <div className={classnames("candy-mob-layer__cover",{
                            "candy-mob-layer__cover--transparent":ComposedComponent.coverHide
                        })} onTouchStart={this.touchStartHandler}></div>
                        <ComposedComponent className="candy-mob-layer__content" {...this.options} remove={this.remove}>{this.children}</ComposedComponent>
                    </div>:null}
                </Animate>
            , this._layer);
        }
        set isShow(value){
            this._isShow=value;
            this._render();
        }
        get isShow(){
            return this._isShow;
        }
        change({children,options}){
            if(children!==undefined){
                this.children=children;
            }
            if(typeof options=='object'){
                this.options=Object.assign({},this.options,options);
            }
        }
        show=()=>{
            if(!this.isShow){
                this.isShow=true;
            }
        }
        remove=()=>{
            if(this.isShow){
                this.isShow=false;
                this.options.removeCallback&&this.options.removeCallback();
            }
        }
        destroy=()=>{
            document.body.removeChild(this._layer);
            ReactDOM.unmountComponentAtNode(this._layer);
        }
    }
}