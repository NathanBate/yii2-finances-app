(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d2311ac"],{eeb8:function(t,e,a){"use strict";a.r(e);var c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("div",{staticClass:"row q-pl-lg q-pb-lg q-pt-md"},[a("div",{staticClass:"col-md-12"},[a("q-breadcrumbs",[a("q-breadcrumbs-el",{attrs:{label:"Dashboard",icon:"fas fa-home",to:"/"}}),a("q-breadcrumbs-el",{attrs:{label:"Settings",icon:"settings",to:"/settings"}}),a("q-breadcrumbs-el",{attrs:{label:"Accounts",icon:"account_balance"}})],1)],1)]),a("div",{staticClass:"row justify-center q-mt-lg"},[a("div",{staticClass:"col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-5"},[a("q-toolbar",{staticClass:"bg-primary text-white shadow-2"},[a("q-toolbar-title",[t._v("Bank Accounts")]),a("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"add",to:"/accounts/add/"}})],1),a("q-list",{attrs:{bordered:"",separator:""}},t._l(t.accounts,(function(e){return a("q-item",{key:e.id},[a("q-item-section",[a("q-item-label",[t._v(t._s(e.accountName))]),a("q-item-label",{attrs:{caption:""}},[a("span",[t._v(t._s(e.bankName))]),null!=e.accountNumber?a("span",[t._v(" - "+t._s(e.accountNumber))]):t._e()])],1),a("q-item-section",{attrs:{avatar:""}},[a("q-btn",{attrs:{size:"xs",round:"",color:"primary",icon:"edit",to:"/settings/accounts/updateaccount/"+e.accountId+"/"}})],1)],1)})),1)],1)])])},n=[],r=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("c47a")),o=a.n(r),s=a("2f62"),i=a("f508");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);e&&(c=c.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,c)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){o()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var b={name:"UsersPage",data:function(){return{}},computed:u({},Object(s["b"])({accounts:"accounts/getAccounts"})),created:function(){i["a"].show(),this.$store.dispatch("accounts/getAccounts").then((function(t){i["a"].hide()}))},mounted:function(){}},d=b,p=a("2877"),m=a("eebe"),f=a.n(m),g=a("9989"),q=a("ead5"),O=a("079e"),w=a("65c6"),v=a("6ac5"),h=a("9c40"),y=a("1c1c"),j=a("66e5"),_=a("4074"),P=a("0170"),Q=Object(p["a"])(d,c,n,!1,null,null,null);e["default"]=Q.exports;f()(Q,"components",{QPage:g["a"],QBreadcrumbs:q["a"],QBreadcrumbsEl:O["a"],QToolbar:w["a"],QToolbarTitle:v["a"],QBtn:h["a"],QList:y["a"],QItem:j["a"],QItemSection:_["a"],QItemLabel:P["a"]})}}]);