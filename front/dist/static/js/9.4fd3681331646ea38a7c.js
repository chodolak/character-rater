webpackJsonp([9],{"86xM":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("uL8o"),s=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default={name:"admin-layout",components:{VNav:s.default}}},"9GVA":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("86xM"),s=a.n(n),i=a("jiFg"),r=a("VU/8"),o=r(s.a,i.a,!1,null,null,null);e.default=o.exports},A4S1:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",[a("v-dialog"),t._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-2"},[a("router-link",{staticClass:"btn custom-button",attrs:{to:{name:"admin-shows-upload.index"},tag:"button"}},[t._v("\n          Add New\n        ")])],1),t._v(" "),a("div",{staticClass:"col-4"},[a("div",{staticClass:"form-group"},[a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchParams.name,expression:"searchParams.name"}],staticClass:"form-control",attrs:{name:"name",type:"text",placeholder:"Name"},domProps:{value:t.searchParams.name},on:{input:[function(e){e.target.composing||t.$set(t.searchParams,"name",e.target.value)},t.search]}})])])]),t._v(" "),a("div",{staticClass:"col-6"})])]),t._v(" "),t.shows.length>0?a("table",{staticClass:"table table-bordered table-hover"},[a("thead",{staticClass:"thead-custom"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("#")]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v("Name")]),t._v(" "),a("th",{attrs:{scope:"col"}}),t._v(" "),a("th",{attrs:{scope:"col"}})])]),t._v(" "),a("tbody",t._l(t.shows,function(e){return a("tr",{key:e.id},[a("th",{attrs:{scope:"row"}},[t._v(t._s(e.id))]),t._v(" "),a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[a("div",{staticClass:"custom-center"},[a("router-link",{staticClass:"btn custom-button",attrs:{to:{name:"admin-shows-upload.index",params:{id:e.id}},tag:"button"}},[a("i",{staticClass:"fa fa-pencil",attrs:{"aria-hidden":"true"}})])],1)]),t._v(" "),a("td",[a("div",{staticClass:"custom-center"},[a("button",{staticClass:"btn custom-red-button",on:{click:function(a){t.showDeleteDialog(e.id,e.name)}}},[a("i",{staticClass:"fa fa-times",attrs:{"aria-hidden":"true"}})])])])])}))]):t._e(),t._v(" "),t.shows.length>0?a("nav",[a("paginate",{attrs:{pageCount:t.totalPages,"initial-page":t.page,containerClass:"pagination",clickHandler:t.pageClick,"page-class":"page-item","page-link-class":"page-link","prev-class":"page-item","prev-link-class":"page-link","next-class":"page-item","next-link-class":"page-link"}})],1):t._e()],1)},s=[],i={render:n,staticRenderFns:s};e.a=i},GQsj:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("a6IA"),s=a.n(n),i=a("A4S1"),r=a("VU/8"),o=r(s.a,i.a,!1,null,null,null);e.default=o.exports},HhAh:function(t,e){t.exports=function(t,e,a){function n(){var u=Date.now()-o;u<e&&u>=0?s=setTimeout(n,e-u):(s=null,a||(l=t.apply(r,i),r=i=null))}var s,i,r,o,l;null==e&&(e=100);var u=function(){r=this,i=arguments,o=Date.now();var u=a&&!s;return s||(s=setTimeout(n,e)),u&&(l=t.apply(r,i),r=i=null),l};return u.clear=function(){s&&(clearTimeout(s),s=null)},u.flush=function(){s&&(l=t.apply(r,i),r=i=null,clearTimeout(s),s=null)},u}},Q6FB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"nav",data:function(){return{menuCollapsed:!1}},methods:{logout:function(){this.$store.dispatch("auth/logout")},toggleMenu:function(){this.menuCollapsed=!this.menuCollapsed}}}},a6IA:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a("9GVA"),i=n(s),r=a("unG1"),o=n(r),l=a("HhAh"),u=n(l),c=a("kBYy"),d=n(c);e.default={name:"admin-shows-index",data:function(){return{shows:[],page:1,totalPages:1,searchParams:{name:""}}},beforeRouteEnter:function(t,e,a){var n={},s=1;t.query.name&&(n.name=t.query.name),t.query.p&&(s=t.query.p),(new o.default).get(s,n).then(function(e){a(function(a){return a.setUpShows(t.query,e)})})},methods:{setUpShows:function(t,e){t.p&&(this.page=t.p),t.name&&(this.searchParams.name=t.name),this.shows=e.data,this.page=e.current_page-1,this.totalPages=e.last_page,this.setUpQuery()},getShows:function(t){var e=this;(new o.default).get(t,this.searchParams).then(function(t){e.shows=t.data,e.page=t.current_page-1,e.totalPages=t.last_page,e.setUpQuery()})},pageClick:function(t){this.page=t,this.getShows(t)},setUpQuery:function(){this.query={},0!==this.page&&(this.query.p=this.page+1),this.searchParams.name&&(this.query.name=this.searchParams.name),this.$router.replace({query:this.query})},deleteShow:function(t){var e=this;this.$modal.hide("dialog"),(new o.default).delete(t).then(function(){e.getShows(e.page+1)})},showDeleteDialog:function(t,e){var a=this;this.$modal.show("dialog",{title:"Delete Show",text:"Are you sure you want to delete "+e+"?",buttons:[{title:"CANCEL",default:!0,handler:function(){a.$modal.hide("dialog")}},{title:'<span class="delete-text">DELETE</span>',handler:function(){a.deleteShow(t)}}]})},search:(0,u.default)(function(){this.page=0,this.getShows(1)},500)},components:{VLayout:i.default,Paginate:d.default}}},jiFg:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-nav"),t._v(" "),a("div",{staticClass:"page"},[a("div",{staticClass:"page-content d-flex align-items-stretch"},[a("nav",{staticClass:"side-navbar"},[a("span",{staticClass:"heading"}),t._v(" "),a("ul",{staticClass:"list-unstyled"},[a("router-link",{attrs:{to:{name:"admin.index"},tag:"li"}},[a("a",[a("i",{staticClass:"fa fa-home",attrs:{"aria-hidden":"true"}}),t._v("Dashboard")])]),t._v(" "),a("router-link",{attrs:{to:{name:"admin-characters.index"},"active-class":"active",tag:"li"}},[a("a",[a("i",{staticClass:"fa fa-user",attrs:{"aria-hidden":"true"}}),t._v("Characters")])]),t._v(" "),a("router-link",{attrs:{to:{name:"admin-shows.index"},"active-class":"active",tag:"li"}},[a("a",[a("i",{staticClass:"fa fa-folder-open",attrs:{"aria-hidden":"true"}}),t._v("Shows")])])],1)]),t._v(" "),a("div",{staticClass:"container pt-4"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col col-12"},[t._t("default")],2)])])])])],1)},s=[],i={render:n,staticRenderFns:s};e.a=i},kBYy:function(t,e,a){!function(e,a){t.exports=a()}(0,function(){return function(t){function e(n){if(a[n])return a[n].exports;var s=a[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}([function(t,e,a){"use strict";var n=a(1),s=function(t){return t&&t.__esModule?t:{default:t}}(n);t.exports=s.default},function(t,e,a){a(2);var n=a(6)(a(7),a(8),"data-v-82963a40",null);t.exports=n.exports},function(t,e,a){var n=a(3);"string"==typeof n&&(n=[[t.id,n,""]]),a(5)(n,{}),n.locals&&(t.exports=n.locals)},function(t,e,a){e=t.exports=a(4)(),e.push([t.id,"a[data-v-82963a40]{cursor:pointer}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var a=this[e];a[2]?t.push("@media "+a[2]+"{"+a[1]+"}"):t.push(a[1])}return t.join("")},t.i=function(e,a){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},s=0;s<this.length;s++){var i=this[s][0];"number"==typeof i&&(n[i]=!0)}for(s=0;s<e.length;s++){var r=e[s];"number"==typeof r[0]&&n[r[0]]||(a&&!r[2]?r[2]=a:a&&(r[2]="("+r[2]+") and ("+a+")"),t.push(r))}},t}},function(t,e,a){function n(t,e){for(var a=0;a<t.length;a++){var n=t[a],s=d[n.id];if(s){s.refs++;for(var i=0;i<s.parts.length;i++)s.parts[i](n.parts[i]);for(;i<n.parts.length;i++)s.parts.push(l(n.parts[i],e))}else{for(var r=[],i=0;i<n.parts.length;i++)r.push(l(n.parts[i],e));d[n.id]={id:n.id,refs:1,parts:r}}}}function s(t){for(var e=[],a={},n=0;n<t.length;n++){var s=t[n],i=s[0],r=s[1],o=s[2],l=s[3],u={css:r,media:o,sourceMap:l};a[i]?a[i].parts.push(u):e.push(a[i]={id:i,parts:[u]})}return e}function i(t,e){var a=f(),n=m[m.length-1];if("top"===t.insertAt)n?n.nextSibling?a.insertBefore(e,n.nextSibling):a.appendChild(e):a.insertBefore(e,a.firstChild),m.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");a.appendChild(e)}}function r(t){t.parentNode.removeChild(t);var e=m.indexOf(t);e>=0&&m.splice(e,1)}function o(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function l(t,e){var a,n,s;if(e.singleton){var i=g++;a=v||(v=o(e)),n=u.bind(null,a,i,!1),s=u.bind(null,a,i,!0)}else a=o(e),n=c.bind(null,a),s=function(){r(a)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else s()}}function u(t,e,a,n){var s=a?"":n.css;if(t.styleSheet)t.styleSheet.cssText=C(e,s);else{var i=document.createTextNode(s),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(i,r[e]):t.appendChild(i)}}function c(t,e){var a=e.css,n=e.media,s=e.sourceMap;if(n&&t.setAttribute("media",n),s&&(a+="\n/*# sourceURL="+s.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),t.styleSheet)t.styleSheet.cssText=a;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(a))}}var d={},p=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}},h=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),f=p(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,g=0,m=[];t.exports=function(t,e){e=e||{},void 0===e.singleton&&(e.singleton=h()),void 0===e.insertAt&&(e.insertAt="bottom");var a=s(t);return n(a,e),function(t){for(var i=[],r=0;r<a.length;r++){var o=a[r],l=d[o.id];l.refs--,i.push(l)}if(t){n(s(t),e)}for(var r=0;r<i.length;r++){var l=i[r];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete d[l.id]}}}};var C=function(){var t=[];return function(e,a){return t[e]=a,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e,a,n){var s,i=t=t||{},r=typeof t.default;"object"!==r&&"function"!==r||(s=t,i=t.default);var o="function"==typeof i?i.options:i;if(e&&(o.render=e.render,o.staticRenderFns=e.staticRenderFns),a&&(o._scopeId=a),n){var l=o.computed||(o.computed={});Object.keys(n).forEach(function(t){var e=n[t];l[t]=function(){return e}})}return{esModule:s,exports:i,options:o}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{pageCount:{type:Number,required:!0},initialPage:{type:Number,default:0},forcePage:{type:Number},clickHandler:{type:Function,default:function(){}},pageRange:{type:Number,default:3},marginPages:{type:Number,default:1},prevText:{type:String,default:"Prev"},nextText:{type:String,default:"Next"},containerClass:{type:String},pageClass:{type:String},pageLinkClass:{type:String},prevClass:{type:String},prevLinkClass:{type:String},nextClass:{type:String},nextLinkClass:{type:String},activeClass:{type:String,default:"active"},noLiSurround:{type:Boolean,default:!1}},data:function(){return{selected:this.initialPage}},beforeUpdate:function(){void 0!==this.forcePage&&this.forcePage!==this.selected&&(this.selected=this.forcePage)},computed:{pages:function(){var t=this,e={};if(this.pageCount<=this.pageRange)for(var a=0;a<this.pageCount;a++){var n={index:a,content:a+1,selected:a===this.selected};e[a]=n}else{var s=this.pageRange/2,i=this.pageRange-s;this.selected<s?(s=this.selected,i=this.pageRange-s):this.selected>this.pageCount-this.pageRange/2&&(i=this.pageCount-this.selected,s=this.pageRange-i);for(var r=function(a){var n={index:a,content:a+1,selected:a===t.selected};e[a]=n},o=function(t){var a={content:"...",disabled:!0};e[t]=a},l=0;l<this.marginPages;l++)r(l);var u=0;this.selected-this.pageRange>0&&(u=this.selected-this.pageRange);var c=this.pageCount;this.selected+this.pageRange<this.pageCount&&(c=this.selected+this.pageRange);for(var d=u;d<=c&&d<=this.pageCount-1;d++)r(d);u>this.marginPages&&o(u-1),c+1<this.pageCount-this.marginPages&&o(c+1);for(var p=this.pageCount-1;p>=this.pageCount-this.marginPages;p--)r(p)}return e}},methods:{handlePageSelected:function(t){this.selected!==t&&(this.selected=t,this.clickHandler(this.selected+1))},prevPage:function(){this.selected<=0||(this.selected--,this.clickHandler(this.selected+1))},nextPage:function(){this.selected>=this.pageCount-1||(this.selected++,this.clickHandler(this.selected+1))},firstPageSelected:function(){return 0===this.selected},lastPageSelected:function(){return this.selected===this.pageCount-1||0===this.pageCount}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.noLiSurround?a("div",{class:t.containerClass},[a("a",{class:[t.prevLinkClass,{disabled:t.firstPageSelected()}],attrs:{tabindex:"0"},on:{click:function(e){t.prevPage()},keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?void t.prevPage():null}}},[t._t("prevContent",[t._v(t._s(t.prevText))])],2),t._v(" "),t._l(t.pages,function(e){return[e.disabled?a("a",{class:[t.pageLinkClass,e.selected?t.activeClass:"",{disabled:e.disabled}],attrs:{tabindex:"0"}},[t._v(t._s(e.content))]):a("a",{class:[t.pageLinkClass,{active:e.selected,disabled:e.disabled}],attrs:{tabindex:"0"},on:{click:function(a){t.handlePageSelected(e.index)},keyup:function(a){return"button"in a||!t._k(a.keyCode,"enter",13)?void t.handlePageSelected(e.index):null}}},[t._v("\n      "+t._s(e.content)+"\n    ")])]}),t._v(" "),a("a",{class:[t.nextLinkClass,{disabled:t.lastPageSelected()}],attrs:{tabindex:"0"},on:{click:function(e){t.nextPage()},keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?void t.nextPage():null}}},[t._t("nextContent",[t._v(t._s(t.nextText))])],2)],2):a("ul",{class:t.containerClass},[a("li",{class:[t.prevClass,{disabled:t.firstPageSelected()}]},[a("a",{class:t.prevLinkClass,attrs:{tabindex:"0"},on:{click:function(e){t.prevPage()},keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?void t.prevPage():null}}},[t._t("prevContent",[t._v(t._s(t.prevText))])],2)]),t._v(" "),t._l(t.pages,function(e){return a("li",{class:[t.pageClass,e.selected?t.activeClass:"",{disabled:e.disabled}]},[e.disabled?a("a",{class:t.pageLinkClass,attrs:{tabindex:"0"}},[t._v(t._s(e.content))]):a("a",{class:t.pageLinkClass,attrs:{tabindex:"0"},on:{click:function(a){t.handlePageSelected(e.index)},keyup:function(a){return"button"in a||!t._k(a.keyCode,"enter",13)?void t.handlePageSelected(e.index):null}}},[t._v(t._s(e.content))])])}),t._v(" "),a("li",{class:[t.nextClass,{disabled:t.lastPageSelected()}]},[a("a",{class:t.nextLinkClass,attrs:{tabindex:"0"},on:{click:function(e){t.nextPage()},keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13)?void t.nextPage():null}}},[t._t("nextContent",[t._v(t._s(t.nextText))])],2)])],2)},staticRenderFns:[]}}])})},ntB4:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar navbar-expand-lg navbar-dark"},[a("router-link",{staticClass:"navbar-brand",attrs:{to:{name:"home.index"}}},[t._v("\n    Chodolak Character Rater\n  ")]),t._v(" "),a("button",{staticClass:"navbar-toggler",attrs:{type:"button"},on:{click:t.toggleMenu}},[a("span",{staticClass:"navbar-toggler-icon"})]),t._v(" "),a("div",{staticClass:"collapse navbar-collapse",class:{show:t.menuCollapsed}},[a("ul",{staticClass:"navbar-nav"},[a("router-link",{staticClass:"nav-item",attrs:{to:{name:"shows.index"},"active-class":"active",tag:"li"}},[a("a",{staticClass:"nav-link"},[t._v("\n          Shows\n        ")])])],1),t._v(" "),a("ul",{staticClass:"navbar-nav mr-auto"},[t.$store.state.auth.admin?a("router-link",{staticClass:"nav-item",attrs:{to:{name:"admin.index"},"active-class":"active",tag:"li"}},[a("a",{staticClass:"nav-link"},[t._v("\n          Admin\n        ")])]):t._e()],1),t._v(" "),t.$store.state.auth.authenticated?a("span",{staticClass:"navbar-text"},[a("a",{staticClass:"btn btn-dark login-nav",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.logout(e)}}},[a("i",{staticClass:"fa fa-sign-out"})])]):t._e(),t._v(" "),t.$store.state.auth.authenticated?t._e():a("span",{staticClass:"navbar-text"},[a("router-link",{staticClass:"btn btn-dark login-nav",attrs:{to:{name:"login.index"},tag:"a"}},[t._v("\n          Login\n      ")])],1)])],1)},s=[],i={render:n,staticRenderFns:s};e.a=i},uL8o:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Q6FB"),s=a.n(n),i=a("ntB4"),r=a("VU/8"),o=r(s.a,i.a,!1,null,null,null);e.default=o.exports},unG1:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a("Zx67"),i=n(s),r=a("Zrlr"),o=n(r),l=a("wxAW"),u=n(l),c=a("zwoO"),d=n(c),p=a("Pf15"),h=n(p),f=a("dP9K"),v=n(f),g=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.default)(this,e),(0,d.default)(this,(e.__proto__||(0,i.default)(e)).call(this,t))}return(0,h.default)(e,t),(0,u.default)(e,[{key:"get",value:function(t,e){var a="?page="+t;return e.name&&(a+="&name="+e.name),this.submit("get",this.endpoint+"/shows"+a)}},{key:"getByName",value:function(t){return this.submit("get",this.endpoint+"/shows/"+t)}},{key:"getById",value:function(t){return this.submit("get",this.endpoint+"/shows/id/"+t)}},{key:"create",value:function(t){return this.submit("post",this.endpoint+"/admin/show",t)}},{key:"update",value:function(t,e,a,n){var s={name:e.name,bio:e.bio,fileName:e.fileName,image:e.image,thumbnail:e.thumbnail};return a&&delete s.image,n&&delete s.thumbnail,this.submit("put",this.endpoint+"/admin/show/"+t,s)}},{key:"delete",value:function(t){return this.submit("delete",this.endpoint+"/admin/show/"+t)}}]),e}(v.default);e.default=g}});
//# sourceMappingURL=9.4fd3681331646ea38a7c.js.map