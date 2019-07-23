import {myaxios} from "./tools/myaxios.js";

export function  albumsList(id){
    var obj={
        method:'Get',
        url:'https://api.imjad.cn/qqfm/v1/',
        params:{
            params:{
                type:"album",
                page_size:10,
                id:id,
                page:1
            }
        }
    }
    return myaxios(obj);
}

export function  showsList(showId){
    var obj={
        method:'Get',
        url:'https://api.imjad.cn/qqfm/v1/',
        params:{
            params:{
                type: 'show',
                id:showId
            }
         }
    }
    return myaxios(obj);
}

export function  skipShowsList(id,str){
    var obj={
        method:'Get',
        url:'https://api.imjad.cn/qqfm/v1/',
        params:{
            params:{
                type: 'skip_show',
                id: id,
                shows: str
            }
        }
    }
    return myaxios(obj);
}