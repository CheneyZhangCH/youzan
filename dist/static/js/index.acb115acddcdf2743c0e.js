webpackJsonp([3],{"035s":function(t,e){},"7tPq":function(t,e){},"97Sy":function(t,e){},NydE:function(t,e,a){"use strict";var s=a("DNVT"),n=(a("v2ns"),{name:"swipe",props:{lists:{type:Array,required:!0}},created:function(){},mounted:function(){new s.a(".swiper-container",{loop:!0,pagination:{el:".swiper-pagination"},autoplay:{delay:3e3}})}}),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t){return e("div",{staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])})),this._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var r=a("VU/8")(n,i,!1,function(t){a("7tPq")},null,null);e.a=r.exports},RHoF:function(t,e){},TFhR:function(t,e,a){"use strict";var s,n=a("bOdI"),i=a.n(n),r=(s={hostLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",cartAdd:"/cart/add"},i()(s,"cartAdd","/cart/add"),i()(s,"cartLists","/cart/list"),i()(s,"cartReduce","/cart/reduce"),i()(s,"cartRemove","/cart/remove"),i()(s,"cartMRemove","/cart/mremove"),i()(s,"addressLists","/address/list"),i()(s,"addressAdd","/address/add"),i()(s,"addressRemove","/address/remove"),i()(s,"addressUpdate","/address/update"),i()(s,"addressSetDefault","/address/setDefault"),s);for(var o in r)r.hasOwnProperty(o)&&(r[o]="http://rapapi.org/mockjsdata/32382"+r[o]);e.a=r},"U/rD":function(t,e,a){"use strict";var s=a("mw3O"),n=a.n(s).a.parse(location.search.substr(1)).index,i=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],r={data:function(){return{navConfig:i,currentIndex:parseInt(n)||0}},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,s){return a("li",{class:{active:s===t.currentIndex},on:{click:function(a){t.changeNav(e,s)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]};var c={filters:{currency:function(t){var e=""+t;if(e.indexOf(".")>-1){var a=e.split(".");return a[0]+"."+(a[1]+"0").substr(0,2)}return e+".00"}},components:{Foot:a("VU/8")(r,o,!1,function(t){a("RHoF")},null,null).exports}};e.a=c},U67u:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("97Sy"),n=(a.n(s),a("bCKv")),i=a.n(n),r=a("035s"),o=(a.n(r),a("eChN")),c=(a.n(o),a("7+uW")),d=a("mtWM"),l=a.n(d),u=a("TFhR"),p=a("NydE"),f=a("U/rD");c.default.use(i.a);new c.default({el:"#app",data:{lists:null,pageNum:1,pageSize:6,loading:!1,allLoaded:!1,bannerLists:null},created:function(){this.getLists(),this.getBanner()},methods:{getLists:function(){var t=this;this.allLoaded||(this.loading=!0,l.a.post(u.a.hostLists,{pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){var a=e.data.list;a.length<t.pageSize&&(t.allLoaded=!0),t.lists?t.lists=t.lists.concat(a):t.lists=e.data.list,t.loading=!1,t.pageNum++}))},getBanner:function(){var t=this;l.a.get(u.a.banner).then(function(e){t.bannerLists=e.data.lists})}},components:{Swiper:p.a},mixins:[f.a]})},eChN:function(t,e){},v2ns:function(t,e){}},["U67u"]);
//# sourceMappingURL=index.acb115acddcdf2743c0e.js.map