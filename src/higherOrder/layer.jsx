import React,{PureComponent} from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import '../../style/higherOrdder/layer.scss'
import Animate from 'rc-animate';

export default function(ComposedComponent){
    class Layer extends PureComponent{
        state={
            options:null,
            children:null,
            show:false
        }
        constructor(){
            super();
            this.animateEndHandler=this.animateEndHandler.bind(this);
            this.touchStartHandler=this.touchStartHandler.bind(this);
        }
        componentWillMount(){
            const {children,options}=this.props;
            this.setState({
                options,children
            });
        }
        animateEndHandler=()=>{
            const {show,options}=this.state;
            const {destroy}=this.props;
            if(!show&&options.persistent!==true){
                destroy();
            }
        }
        touchStartHandler=(e)=>{
            e.preventDefault();
        }
        show(){
            const {show}=this.state;
            if(show){
                return;
            }
            this.setState({show:true});
        }
        hide(callback){
            const {show}=this.state;
            if(!show){
                return;
            }
            this.setState({show:false},()=>{
                callback();
            });
        }
        isShow(){
            return this.state.show;
        }
        change({children,options}){
            this.setState({children:children||this.state.children,options:Object.assign({},this.state.options,options)});
        }
        render(){
            const{show,children,options}=this.state;
            const {remove}=this.props;
            return (
                <Animate className="candy-mob-layer" transitionName="candy-mob-layer--animate" onEnd={this.animateEndHandler}>
                    {show?<div className="candy-mob-layer__inner">
                        <div className="candy-mob-layer__cover" onTouchStart={this.touchStartHandler}></div>
                        <ComposedComponent className="candy-mob-layer__content" {...options} remove={remove}>{children}</ComposedComponent>
                    </div>:null}
                </Animate>
            );
        }
    }
    return class {
        constructor(children,options){
            this._layer=document.createElement('div');
            this._layer.className='candy-mob-layer-set';
            document.body.appendChild(this._layer);

            this.options=Object.assign({},options);
            this.children=children;
            this.reactLayer=this._render();
            if(!this.options.persistent){
                this.show();
            }

        }
        _render(){
            return ReactDOM.render(
                <Layer options={this.options} remove={this.remove} destroy={this.destroy}>{this.children}</Layer>
            , this._layer);
        }
        change=({children,options})=>{
            this.reactLayer.change({children,options});
        }
        show=()=>{
            this.reactLayer.show();
            document.body.style.overflow='hidden';
        }
        remove=()=>{
            document.body.style.overflow='auto';
            this.reactLayer.hide(()=>{
                this.options.removeCallback&&this.options.removeCallback();
            });
        }
        destroy=()=>{
            document.body.removeChild(this._layer);
            ReactDOM.unmountComponentAtNode(this._layer);
        }
    }
}