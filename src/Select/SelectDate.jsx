/**
 * Created by ifchangetoclzp on 2017/2/6.
 */
import range from 'lodash.range'
import Select from './index'

export class SelectDateCore extends Select{
    constructor(options){
        var {start,end,current,onChange,yearDisplay,monthDisplay,dayDisplay,timeDisplay,title}=Object.assign({},{
            start:'1949-10-01 0:00',
            end:'2050-12-31 23:59',
            yearDisplay:true,
            monthDisplay:true,
            dayDisplay:true,
            timeDisplay:true,
            current:new Date(),
            title:'',
            onChange:function(){}
        },options);

        start=SelectDateCore.dateValue(start,'1949-01-01 0:00');
        end=SelectDateCore.dateValue(end,'2050-12-31 23:59');
        current=SelectDateCore.dateValue(current);
        if(start-end>0){
            throw new Error('开始时间不能大于结束时间');
        }

        var onChangeHandler=(target)=>{
            var data=target.state.data;
            data[1].list=SelectDateCore.getMonthList(target.value,start,end);
            data[2].list=SelectDateCore.getDayList(target.value,start,end);
            data[3].list=SelectDateCore.getHour(target.value,start,end);
            data[4].list=SelectDateCore.getMinute(target.value,start,end);
            data=target.dataFormat(data);
            target.setState({
                data:data
            });
        };
        super([{
            list:range(start.getFullYear(),end.getFullYear()+1).map((n)=>{
                return {
                    value:n,
                    text:`${n}年`
                }
            }),
            defaultValue:current.getFullYear(),
            display:yearDisplay,
            onChange:onChangeHandler
        },{
            list:SelectDateCore.getMonthList([current.getFullYear()],start,end),
            defaultValue:current.getMonth()+1,
            display:monthDisplay,
            onChange:onChangeHandler
        },{
            list:SelectDateCore.getDayList([current.getFullYear(),current.getMonth()+1],start,end),
            display:dayDisplay,
            defaultValue:current.getDate(),
            onChange:onChangeHandler
        },{
            list:SelectDateCore.getHour([current.getFullYear(),current.getMonth()+1,current.getDate()],start,end),
            display:timeDisplay,
            className:'candy-mob-select__group--time',
            defaultValue:current.getHours(),
            onChange:onChangeHandler
        },{
            list:SelectDateCore.getMinute([current.getFullYear(),current.getMonth()+1,current.getDate(),current.getHours()],start,end),
            display:timeDisplay,
            defaultValue:current.getMinutes()
        }],{
            title:title,
            onChange:(value)=>{
                value[1]-=1;
                onChange(new Date(...value));
            }
        });
    }
    static getMinute([year,month,day,hour],start,end){
        var startMinute=0,endMinute=59;
        if(year==start.getFullYear()&&month==start.getMonth()+1&&day==start.getDate()&&hour==start.getHours()){
            startMinute=Math.max(startMinute,start.getMinutes());
        }
        if(year==end.getFullYear()&&month==end.getMonth()+1&&day==end.getDate()&&hour==end.getHours()){
            endMinute=Math.min(endMinute,end.getMinutes());
        }
        return range(startMinute,endMinute+1).map((n)=>{
            return {
                value:n,
                text:SelectDateCore.timeFormat(n)
            };
        });
    }
    static getHour([year,month,day],start,end){
        var startHour=0,endHour=23;
        if(year==start.getFullYear()&&month==start.getMonth()+1&&day==start.getDate()){
            startHour=Math.max(startHour,start.getHours());
        }
        if(year==end.getFullYear()&&month==end.getMonth()+1&&day==end.getDate()){
            endHour=Math.min(endHour,end.getHours());
        }
        return range(startHour,endHour+1).map((n)=>{
            return {
                value:n,
                text:SelectDateCore.timeFormat(n)
            };
        });
    }
    static getDayList([year,month],start,end) {
        var getList=(day)=>{
            var startDay=1;
            if(year==end.getFullYear()&&month==end.getMonth()+1){
                day=Math.min(day,end.getDate());
            }
            if(year==start.getFullYear()&&month==start.getMonth()+1){
                startDay=Math.max(1,start.getDate());
            }
            return range(startDay, day+1).map((n)=> {
                return {
                    value: n,
                    text: `${n}日`
                }
            });
        }
        if ([4, 6, 9, 11].indexOf(month) >= 0) {
            return getList(30);
        }else if(month==2){
            if(year%4==0){
                return getList(29);
            }else{
                return getList(28);
            }
        } else {
            return getList(31);
        }
    }
    static getMonthList([currentYear],start,end){
        var startMonth=1,endMonth=12;
        if(currentYear==start.getFullYear()){
            startMonth=start.getMonth()+1;
        }
        if(currentYear==end.getFullYear()){
            endMonth=end.getMonth()+1;
        }
        return range(startMonth, endMonth+1).map((n)=> {
            return {
                value: n,
                text: `${n}月`
            }
        });
    }
    static timeFormat(value){
        var map=['00','01','02','03','04','05','06','07','08','09'];
        return map[value]||value.toString();
    }
    static dateFormat(date,fmt='yyyy-MM-dd'){
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    static dateValue(value,defaultTime){
        var transform=function(date) {
            if(new Date(date).toString()!='Invalid Date'){
                return new Date(date);
            }
            var res=new Date();
            if (/^([0-2]{1}[0-3]{1}):([0-5]{1}\d{1})$/.test(date)) {
                let m = date.match(/^([0-2]{1}[0-3]{1}):([0-5]{1}\d{1})$/);
                res.setHours(m[1]);
                res.setMinutes(m[2]);
            } else if (/^(\d{4})(?:\-|\/)(\d{1,2})(?:\-|\/)(\d{1,2})(?: ([0-9]{1,2}):([0-9]{1,2}))?$/.test(date)) {
                let m = date.match(/^(\d{4})(?:\-|\/)(\d{1,2})(?:\-|\/)(\d{1,2})(?: ([0-9]{1,2}):([0-9]{1,2}))?$/);
                res = new Date(m[1], m[2] - 1, m[3], m[4]||0, m[5]||0);
            }
            return res;
        }
        if(!(value instanceof Date&&value.toString()!='Invalid Date')){
            if(new Date(value).toString()=='Invalid Date'){
                return transform(value?value:defaultTime);
            }else{
                return transform(value);
            }
        }
        return value;
    }
}

export default class SelectDate extends SelectDateCore{
    constructor(options){
        super(Object.assign({},options,{
            start:'',
            end:'',
            yearDisplay:true,
            monthDisplay:true,
            timeDisplay:false,
            onChange(value){
                var fmt='yyyy-MM-dd';
                if(options.dayDisplay===false){
                    fmt='yyyy-MM';
                }
                options.onChange&&options.onChange(SelectDateCore.dateFormat(value,fmt));
            }
        }));
    }
}

export class SelectDateTime extends SelectDateCore{
    constructor(options){
        super(Object.assign({},options,{
            yearDisplay:true,
            monthDisplay:true,
            dayDisplay:true,
            timeDisplay:true,
            onChange(value){
                options.onChange&&options.onChange(SelectDateCore.dateFormat(value,'yyyy-MM-dd hh:mm'));
            }
        }));
    }
}

export class SelectTime extends SelectDateCore{
    constructor(options){
        super(Object.assign({},options,{
            yearDisplay:false,
            monthDisplay:false,
            dayDisplay:false,
            timeDisplay:true,
            onChange(value){
                options.onChange&&options.onChange(SelectDateCore.dateFormat(value,'hh:mm'));
            }
        }));
    }
}