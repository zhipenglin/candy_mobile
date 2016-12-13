/**
 * Created by ifchangetoclzp on 2016/12/12.
 */
(function(window){
    if (typeof Object.assign != 'function') {
        Object.assign = function (target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }
    var Hash=(function(){
        var Hash=function(){
            this.data={};
            this.catch={};
            this.parse();
            this.hashChangeHandler=[];
            var _this=this;
            window.onhashchange=function(){
                _this.parse();
                _this.hashChangeHandler.forEach(function(callback){
                    callback(_this.hash,_this.data);
                });
            };
        };
        Hash.prototype={
            constructor:Hash,
            parse:function(){
                this.hash=location.hash.slice(1);
                if(typeof this.catch[this.hash]=='object'){
                    this.data=this.catch[this.hash];
                    return;
                }
                this.data={};
                var _this=this;
                this.hash.split('&').forEach(function(n){
                    var value=n.split('=');
                    if(value[0]){
                        _this.data[value[0]]=value[1];
                    }
                });
                this.catch[this.hash]=this.data;
            },
            get:function(key){
                if(key){
                    return this.data[key];
                }else{
                    return this.data;
                }
            },
            set:function(object){
                var stringify=function(data){
                    var value=[];
                    for(var key in data){
                        if(data.hasOwnProperty(key)){
                            value.push(key+'='+data[key]);
                        }
                    }
                    return value.join('&');
                }
                this.data=Object.assign({},this.data,object);
                var hash=stringify(this.data);
                if(hash!=this.hash){
                    location.hash=hash;
                }
            },
            hashChange:function(callback){
                if(typeof callback!='function'){
                    throw new Error('请传入一个function类型的参数');
                }
                return this.hashChangeHandler.push(callback);
            },
            unHashChange:function(index){
                this.hashChangeHandler.splice(index,1);
            }
        };
        return Hash;
    })();

    var Pager=(function(){
        var Pager=function(className,options){
            options=Object.assign({},options);
            this.pageList={};
            this.pageChangeHandler=[];
            if(options.pageChange){
                this.pageChange(options.pageChange);
            }
            var domList=document.querySelectorAll(className);
            for(var i=0;i<domList.length;i++){
                this.pageList[domList[i].dataset.page]=domList[i];
            }
            this.hash=new Hash();
            var _this=this;
            this.hash.hashChange(function(hash,data){
                _this._setActive(data.page);
            });
            this._setActive(this.hash.get('page')||domList[0].dataset.page);
        };
        Pager.prototype={
            constructor:Pager,
            go:function(name){
                if(!this.pageList[name]){
                    return console.warn('该页面不存在');
                }
                this.hash.set({
                    page:name
                });
            },
            _setActive:function(name){
                if(!this.pageList[name]){
                    return console.warn('该页面不存在');
                }
                if(this.active){
                    this.active.classList.remove('active');
                }
                this.pageList[name].classList.add('active');
                this.active=this.pageList[name];
                this.pageChangeHandler.forEach(function(callback){
                    callback(name);
                });
            },
            pageChange:function(callback){
                if(typeof callback!='function'){
                    throw new Error('请传入一个function类型的参数');
                }
                return this.pageChangeHandler.push(callback);
            },
            unPageChange:function(index){
                this.pageChangeHandler.splice(index,1);
            }
        };
        return Pager;
    })();

    window.Pager=Pager;
})(window);
