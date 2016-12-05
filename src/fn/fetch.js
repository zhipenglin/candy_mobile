/**
 * Created by ifchangetoclzp on 2016/11/9.
 */
import Toast from '../Dialog/Toast'

var timeout=10000;

function setTime(time){
    timeout=time;
}

function serialize(data){
    var temp=[];
    for(let key in data){
        if(data.hasOwnProperty(key)){
            temp.push(`${key}=${window.encodeURIComponent(data[key])}`);
        }
    }
    return temp.join('&');
}

function deserialize(str){
    var temp=str.split('&');
    var data={};
    for(let index=0;index<temp.length;index++){
        var [key,value]=temp[index].split('=');
        data[key]=value?window.decodeURIComponent(value):'';
    }
    return data;
}

function resolveURL(url){
    var org=url||location.href;

    var [path,param]=org.split('?');
    if(!param){
        param='';
    }
    var [search,hash]=param.split('#');
    if(!hash){
        hash='';
    }
    return {
        path,search,hash
    }
}

function join(...args){
    var url=[];
    args.forEach(n=>{
        url=url.concat(n.split('/'));
    });
    var res=url.filter(n=>n).join('/');
    if(!/^.*\..*/.test(res)){
        res='/'+res;
    }
    return res;
}

function fetch(url,...arg){
    var errorCatch=true,url=resolveURL(url),options={type:'GET',data:{},dataType:'json'};
    if(typeof arg[0]=='object'){
        Object.assign(options,arg[0]);
        if(arg[1]!==undefined){
            errorCatch=arg[1];
        }

    }else if(typeof arg[0]=='boolean'){
        errorCatch=arg[0];
    }

    var xhr=new window.XMLHttpRequest();

    if(/^get$/i.test(options.type)){
        xhr.open('GET',join('api',url.path)+'?'+serialize(Object.assign(deserialize(url.search),options.data)),true);
        xhr.send();
    }else{
        xhr.open(options.type,join('api',url.path),true);
        var content=serialize(options.data);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(content);
    }
    return new Promise((resolve,reject)=>{
        var timer=setTimeout(()=>{
            xhr.abort();
            reject('请求超时');
        },timeout);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    clearTimeout(timer);
                    resolve(xhr.responseText);
                }else{
                    reject(xhr.status);
                }
            }
        }
    }).then((res)=>{
        //转成json格式
        if(/^json$/.test(options.dataType)){
            return JSON.parse(res);
        }
        return res;
    }).then((res)=>{
        //取出data数据
        if(typeof res=='object'){
            if(res.err_no==0){
                return {
                    status:true,
                    data:res.results
                };
            }else{
                if(errorCatch){
                    //默认处理错误
                    new Toast(res.err_msg);
                }
                return {
                    status:false,
                    code:res.err_no,
                    data:res.err_msg
                }
            }
        }
        return res;
    }).catch((res)=>{
        let msg='请求异常，请刷新后重试';
        if(typeof res=='string'){
            msg=res;
        }
        if(errorCatch){
            new Toast(msg);
        }
        return {
            status:false,
            code:0,
            data:msg
        }
    });
}

fetch.serialize=serialize;
fetch.deserialize=deserialize;
fetch.resolveURL=resolveURL;
fetch.join=join;
fetch.setTime=setTime;

export default fetch;