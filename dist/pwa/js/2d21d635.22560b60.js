(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d21d635"],{d0a4:function(t,e,a){"use strict";a.r(e);var c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("div",{staticClass:"row q-pl-lg q-pb-lg q-pt-md"},[a("div",{staticClass:"col-md-12"},[a("q-breadcrumbs",[a("q-breadcrumbs-el",{attrs:{label:"Dashboard",icon:"fas fa-home",to:"/"}}),a("q-breadcrumbs-el",{attrs:{label:"Settings",icon:"settings",to:"/settings"}}),a("q-breadcrumbs-el",{attrs:{label:"Accounts",icon:"account_balance",to:"/accounts"}}),a("q-breadcrumbs-el",{attrs:{label:"Add Account",icon:"add"}})],1)],1)]),a("q-form",{staticClass:"q-py-lg",on:{submit:t.onSubmit}},[a("div",{staticClass:"row justify-center q-mt-lg"},[a("div",{staticClass:"col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4"},[a("q-toolbar",{staticClass:"bg-primary text-white shadow-2"},[a("q-toolbar-title",[t._v("Add Bank Account")])],1),a("div",{staticClass:"row items-start content-start q-col-gutter-x-sm q-col-gutter-y-sm q-pt-lg"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-6"},[a("q-input",{attrs:{outlined:"",label:"Account Name",type:"text",filled:"","no-error-icon":"",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.accountName,callback:function(e){t.accountName=e},expression:"accountName"}})],1),a("div",{staticClass:"col-xs-12 col-sm-12 col-md-6"},[a("q-input",{attrs:{outlined:"",label:"Bank Name",type:"text",filled:"","no-error-icon":"",rules:[function(t){return!!t||"Field is required"}]},model:{value:t.bankName,callback:function(e){t.bankName=e},expression:"bankName"}})],1),a("div",{staticClass:"col-xs-12 col-sm-12 col-md-6"},[a("q-input",{attrs:{outlined:"",label:"Account Number",type:"text",filled:"","no-error-icon":""},model:{value:t.accountNumber,callback:function(e){t.accountNumber=e},expression:"accountNumber"}})],1),a("div",{staticClass:"col-xs-12 col-sm-12 col-md-6"},[a("q-input",{attrs:{outlined:"",label:"Slug",type:"text",filled:"","no-error-icon":"",hint:"At Least 4 Chars & Only Lowercase and dashes (i.e. personal-checking)",rules:[function(e){return e.match(t.slugRegEx)||"At least 4 chars & only lowercase and dashes"}]},model:{value:t.slug,callback:function(e){t.slug=e},expression:"slug"}})],1),a("div",{staticClass:"col-12"},[a("q-btn",{staticClass:"q-mt-lg",attrs:{type:"submit",color:"primary",label:"Add"}})],1)])],1)])])],1)},s=[],o=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("c47a")),n=a.n(o),r=a("2f62");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);e&&(c=c.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,c)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){n()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var i={name:"AddBankAccountPage",data:function(){return{accountName:"",bankName:"",accountNumber:"",slug:"",slugRegEx:/^[a-z\-]{4,}$/}},computed:u({},Object(r["b"])({usersById:"users/usersById"})),methods:{onSubmit:function(){var t=this,e={accountName:this.accountName,bankName:this.bankName,accountNumber:this.accountNumber,slug:this.slug};this.$store.dispatch("accounts/addAccount",e).then((function(e){t.$router.push("/accounts/")}))}}},d=i,b=a("2877"),m=a("eebe"),p=a.n(m),f=a("9989"),g=a("ead5"),h=a("079e"),q=a("0378"),y=a("65c6"),v=a("6ac5"),N=a("27f9"),O=a("9c40"),w=Object(b["a"])(d,c,s,!1,null,null,null);e["default"]=w.exports;p()(w,"components",{QPage:f["a"],QBreadcrumbs:g["a"],QBreadcrumbsEl:h["a"],QForm:q["a"],QToolbar:y["a"],QToolbarTitle:v["a"],QInput:N["a"],QBtn:O["a"]})}}]);