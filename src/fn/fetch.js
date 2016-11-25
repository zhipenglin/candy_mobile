/**
 * Created by ifchangetoclzp on 2016/11/9.
 */
import Toast from '../Dialog/Toast'
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
        xhr.open('GET','/api/'+url.path+'?'+serialize(Object.assign(deserialize(url.search),options.data)),true);
        xhr.send();
    }else{
        xhr.open(options.type,'/api/'+url.path,true);
        var content=serialize(options.data);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(content);
    }
    return new Promise((resolve,reject)=>{
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
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

export default fetch;