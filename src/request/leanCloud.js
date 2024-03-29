 /* @flow */
'use strict'

import { methodType, cacheType } from './'


export const requestSmsCode = {
    path   : '/requestSmsCode',
    method : methodType.post,
    params :{
      mobilePhoneNumber: "13588833404", //必须
    }
}


/**
 * 通过手机短信来实现「忘记密码」的功能：
 * @param mobilePhoneNumber
 * @returns {{path: string, method: string, param: Arguments}}
 */
export function requestPasswordResetBySmsCode(mobilePhoneNumber:string) {
    return {
        path:'/requestPasswordResetBySmsCode',
        method:methodType.post,
        params:{
          mobilePhoneNumber
        },
    }
}

export  function resetPasswordBySmsCode(password:string,code:string) {
    return {
        path:'/resetPasswordBySmsCode/' +code,
        method:methodType.put,
        params:{
            password,
        },
    }
}

/**
 * 用手机号码来注册
 * @param  {[type]} mobilePhoneNumber:string [description]
 * @param  {[type]} smsCode:string           [description]
 * @param  {[type]} password:string          [description]
 * @return {[type]}                          [description]
 */
export function requestUsersByMobilePhone(mobilePhoneNumber:string,smsCode:string,password:string):Object{
  return {
    path   : '/usersByMobilePhone',
    method : methodType.post,
    params : {
       mobilePhoneNumber,//必须
       smsCode,//必须，且为六位。
       password,//不必须，要业务需求必须。
    }
  }
}

/**
 * 使用手机和密码登录
 * @param  {[type]} mobilePhoneNumber:string 注册用的手机号码
 * @param  {[type]} password:string          密码
 * @return {[type]}                          返回参数信息
 */
export function requestLogin(mobilePhoneNumber:string,password:string):Object{
  return {
    path : '/login',
    method :methodType.get,
    params :{
      mobilePhoneNumber,
      password,
    }
  }
}



/**
 * 获取用户
 * @param id 用户的ID
 * @returns {{path: string, method: string}}
 */
export  function  getUserByID(id:string):Object {
    return {
        path : '/users/'+ id,
        method : methodType.get,
    }
}

/**
 * 给user 数据变更。
 * @param  {[type]} userID:string [description]
 * @param  {[type]} obj:Object    [description]
 * @return {[type]}               [description]
 */
export function bindingToUser(userID:string,obj:Object):Object{

  const path = '/users/'+userID;
  return {
     path :path,
     method:methodType.put,
     params:obj,
     needSession:true,
  }
}

/**
 * 使用新旧密码参数来修改密码
 * @param  {[type]} id:string             [description]
 * @param  {[type]} old_password:string   [description]
 * @param  {[type]} new_password:'string' [description]
 * @return {[type]}                       [description]
 */
export function updatePassword(id:string,old_password:string,
  new_password:string):Object{
    return {
       path :'/users/'+id +'/updatePassword',
       method:methodType.put,
       params:{
         old_password,
         new_password,
       },
       needSession:true,
    }
}

/**
 * 跟新用户昵称
 * @param  {[type]} id:string       用户ID
 * @param  {[type]} username:string 更新后的名字
 * @return {[type]}                 [description]
 */
export function updateUserName(id:string,username:string):Object{
    return {
      path:'/users/'+id,
      method:methodType.put,
      needSession:true,
      params:{
        id,
        username
      }
    }
}

/**
 * 绑定文件或图片到user中。
 * @param  {[type]} userID:string [description]
 * @param  {[type]} fileID:string [description]
 * @param  {[type]} name:string   [description]
 * @return {[type]}               [description]
 */
export function bindingFileToUser(userID:string,fileID:string,name:string):Object{

  const param = {};
  param[name]={
    "id": fileID,
    "__type": "File"
  };

  return bindingToUser(userID,param);
}

/**
 * 删除文件
 * @param  {[type]} fileID:string 文件的ID，
 * @return {[type]}               [description]
 */
export function deleteFile(fileID:string):Object{
  const path = '/files/'+fileID
  return {
    path:path,
    method:methodType.delete,
  }
}
export function feedbackParam(content:string,contact:string
  ):Object{
    return {
      path:'/feedback',
      method:methodType.post,
      params:{
        status:'open',
        content,
        contact,
      }
    }
  }
//Object

/**
 * 基础查询,含有id 的时候则为具体值。
 * @param  {[type]} className:string 查询的类名
 * @param  {[type]} id:string        =“” 可选，具体的id
 * @return {[type]}                  [description]
 */
export function classNormalSearch(className:string,id:string = ''):Object{
   return {
     path:'/classes/' + className + '/' + id,
     method:methodType.get
   }
}

export function limitSearch(className:string,page:Number = 0,
                            limit:Number = 40,other:Object = {}):Object{
    const skip = page * limit;
    return {
      path:'/classes/' + className,
      method:methodType.get,
      params:{
        skip:skip +'',
        limit:limit + '',
        order:'-createdAt',//降序
        ...other
      }
    }
}
/**
 * 增加
 * @param  {[type]} className:string 类名
 * @param  {[type]} params:Object    参数
 * @return {[type]}                  [description]
 */
export function classCreatNewOne(className:string,params:Object):Object{
  return {
    path:'/classes/' + className,
    method:methodType.post,
    params,
  }
}

/**
 * 修改leancloud 对象
 * @param  {[type]} className:string 类名
 * @param  {[type]} objectId:string  对象id
 * @param  {[type]} params:Object    参数
 * @return {[type]}                  [description]
 */
export function classUpdate(className:string,objectId:string,params:Object):Object{
  return {
    path:'/classes/'+ className + '/' + objectId,
    method:methodType.put,
    params,
  }
}

/**
 * 删除对象
 * 你也可以在一个对象中删除一个字段，通过 Delete 操作（注意：这时候 HTTP Method 还是 PUT）：
 * @param  {[type]} className:string [description]
 * @param  {[type]} objectId:string  [description]
 * @param  {[type]} params:Object    [description]
 * @return {[type]}                  [description]
 */
export function classDelete(className:string,objectId:string,params:Object):Object{
  return {
    path:'/classes/'+ className + '/' + objectId,
    method:methodType.put,
    params,
  }
}

export function classBatch(requests:[Object]):Object{
  const  newRequests = requests.map((request,i)=>{
    return {
      path:'1.1'+request.path,
      method:request.method,
      body:request.params,
    }
  });
  return {
    path:'/batch',
    method:methodType.post,
    params:newRequests,
  }
}

export function pushInstallation(OS:String,token:string,userObjectId:string = '') {
    let installationId = OS == 'ios' ? { "deviceToken": token}:{ "installationId": token}
    const LeanCloud_APP_ID = 'q81jdsbi5qp679fi5o46i5nppjgycztgivwj30707xfvehzt';
    const LeanCloud_APP_KEY = 'y6ffzv6mq705pya2pd6kgl1ni1vwlppesis7f1qi19afg5nn';
    return {
        scheme:'https',
        host:'leancloud.cn/1.1',
        path:'/installations',
        method:methodType.post,
        head:{
            "Content-Type": "application/json",
            "X-LC-Key": LeanCloud_APP_KEY,
            "X-LC-Id": LeanCloud_APP_ID,
        },
        params:{
            "deviceType": OS,
            ...installationId,
            "channels": [
                "public", "protected", "private"
            ],
            userObjectId,
        },
    }
}