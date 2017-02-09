/**
 * Created by ifchangetoclzp on 2017/2/6.
 */
import range from 'lodash.range'
import Select from './index'

export default class SelectDate extends Select{
    constructor(options){
        var {start,end,current,onChange,yearDisplay,monthDisplay,dayDisplay}=Object.assign({},{start:new Date('1949-10-01'),end:new Date('2050-12-31'),yearDisplay:true,monthDisplay:true,dayDisplay:true,current:new Date(),onChange:function(){}},options);
        if(!start instanceof Date){
            if(new Date(start).toString()=='Invalid Date'){
                start=new Date('1949-01-01');
            }else{
                start=new Date(start);
            }
        }

        if(!end instanceof Date){
            if(new Date(end).toString()=='Invalid Date'){
                end=new Date();
            }else{
                end=new Date(end);
            }
        }

        if(!current instanceof Date){
            if(new Date(current).toString()=='Invalid Date'){
                current=new Date();
            }else{
                current=new Date(current);
            }
        }

        if(start-end>0){
            throw new Error('开始时间不能大于结束时间');
        }

        var onChangeHandler=(target)=>{
            var data=target.state.data;
            data[1].list=SelectDate.getMonthList(target.value[0],start,end);
            data[2].list=SelectDate.getDayList(target.value,start,end);
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
            list:SelectDate.getMonthList(current.getFullYear(),start,end),
            defaultValue:current.getMonth()+1,
            display:monthDisplay,
            onChange:onChangeHandler
        },{
            list:SelectDate.getDayList([current.getFullYear(),current.getMonth()+1],start,end),
            display:dayDisplay,
            defaultValue:current.getDate()
        }],{
            onChange:(value)=>{
                onChange(new Date(value));
            }
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
    static getMonthList(currentYear,start,end){
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
}