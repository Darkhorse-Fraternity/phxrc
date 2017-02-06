/*@flow*/
'use strict'



import TabView  from './TabView'
import LoginView from '../../pages/Setting/LoginView';
import PersonCenter from '../../pages/PersonInfo/PersonCenter';
import PersonInfo from '../../pages/PersonInfo';
import BaseWebView from '../../components/Base/BaseWebView';
import Setting from '../../pages/Setting';
import FindPwd from '../../pages/Setting/FindPwd';
import RegPhone from '../../pages/Setting/RegPhone'
import Feedback from '../../pages/Setting/Feedback'
import AlterPwd from '../../pages/PersonInfo/AlterPwd'
import NickName from '../../pages/PersonInfo/NickName'
import Home from '../../pages/PHXR/Home'
import Financing from '../../pages/PHXR/Financing'
import Financed from '../../pages/PHXR/Financed'

import WidgetForm from '../../components/WidgetForm/WidgetForm'
export  const PageMap =
{
  Financing,
  Financed,
  WidgetForm,
  Home,

  "WebView"             : BaseWebView,
  'TabView'             : TabView,

  'LoginView'           : LoginView,
  "PersonCenter"        : PersonCenter,
  "PersonInfo"          : PersonInfo,
  "Setting"             : Setting,
  "FindPwd"             : FindPwd,
  'Feedback'            : Feedback,
  "AlterPwd"            : AlterPwd,
  "NickName"            : NickName,
  // "PhoneContacts"       : PhoneContacts,
  'RegPhone'            : RegPhone,

}
