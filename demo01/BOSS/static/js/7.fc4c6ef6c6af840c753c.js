webpackJsonp([7],{116:function(a,t,e){t=a.exports=e(54)(!1),t.push([a.i,'.navbar[data-v-2e3af64e]{width:100%;position:fixed;left:0;bottom:0;background:#fff;z-index:10}.navbar[data-v-2e3af64e]:before{content:"";position:absolute;left:0;background:gray;width:100%;height:1px;-webkit-transform:scaleY(.3);transform:scaleY(.3);-webkit-transform-origin:0 0;transform-origin:0 0}.navbar a[data-v-2e3af64e]{color:gray;padding:.18rem 0;-webkit-transition:all .5s;transition:all .5s;text-align:center}.navbar a span[data-v-2e3af64e]{display:block}.navbar a [class*=" icon-"][data-v-2e3af64e],.navbar a [class^=icon-][data-v-2e3af64e]{font-size:.6rem}.navbar a.router-link-active[data-v-2e3af64e]{color:#53cac3}.fade-enter-active[data-v-2e3af64e],.fade-leave-active[data-v-2e3af64e]{-webkit-transition:opacity .5s;transition:opacity .5s}.fade-enter[data-v-2e3af64e],.fade-leave-to[data-v-2e3af64e]{opacity:0}',""])},129:function(a,t,e){var n=e(116);"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);e(55)("2368c796",n,!0)},147:function(a,t){a.exports={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{attrs:{id:"home"}},[e("transition",{attrs:{name:"fade",mode:"out-in"}},[e("router-view")],1),a._v(" "),e("div",{staticClass:"navbar flex_parent"},[e("router-link",{staticClass:"flex_child",attrs:{to:"/home"}},[e("span",{staticClass:"icon-earth"}),e("span",[a._v("职位")])]),a._v(" "),e("router-link",{staticClass:"flex_child",attrs:{to:"/company"},nativeOn:{click:function(t){a.showitem(t)}}},[e("span",{staticClass:"icon-company"}),e("span",[a._v("公司")])]),a._v(" "),e("router-link",{staticClass:"flex_child",attrs:{to:"/message"}},[e("span",{staticClass:"icon-message"}),e("span",[a._v("消息")])]),a._v(" "),e("router-link",{staticClass:"flex_child",attrs:{to:"/aboutme"}},[e("span",{staticClass:"icon-me"}),e("span",[a._v("我的")])])],1)],1)},staticRenderFns:[]}},57:function(a,t,e){function n(a){e(129)}var i=e(3)(e(74),e(147),n,"data-v-2e3af64e",null);a.exports=i.exports},74:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{msg:"主要的内容区域",willshow:!1,isloading:!1}},watch:{$route:function(a,t){var e=a.path.split("/").length,n=t.path.split("/").length;this.transitionName=e<n?"slide-right":"slide-left"}},computed:{},methods:{showitem:function(){},beforeEnter:function(a){console.log(a)}},mounted:function(){},created:function(){}}}});