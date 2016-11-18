/**
 * Created by ifchangetoclzp on 2016/11/11.
 */
import InlineStylePrefixer from 'inline-style-prefixer'

var prefixer=new InlineStylePrefixer({
    userAgent:window.navigator.userAgent
});

export default function(style,key,value){
    Object.assign(style,prefixer.prefix({[key]:value}));
}