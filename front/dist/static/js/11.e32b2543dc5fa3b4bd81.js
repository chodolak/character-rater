webpackJsonp([11],{"1YSl":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("v-nav"),t._v(" "),t._t("outside"),t._v(" "),e("div",{staticClass:"container pt-4"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col col-12"},[t._t("default")],2)])])],2)},s=[],r={render:n,staticRenderFns:s};a.a=r},CLEE:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("RBkm"),s=e.n(n),r=e("kfhA"),i=e("VU/8"),c=i(s.a,r.a,!1,null,null,null);a.default=c.exports},HhAh:function(t,a){t.exports=function(t,a,e){function n(){var u=Date.now()-c;u<a&&u>=0?s=setTimeout(n,a-u):(s=null,e||(l=t.apply(i,r),i=r=null))}var s,r,i,c,l;null==a&&(a=100);var u=function(){i=this,r=arguments,c=Date.now();var u=e&&!s;return s||(s=setTimeout(n,a)),u&&(l=t.apply(i,r),i=r=null),l};return u.clear=function(){s&&(clearTimeout(s),s=null)},u.flush=function(){s&&(l=t.apply(i,r),i=r=null,clearTimeout(s),s=null)},u}},Q6FB:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"nav",data:function(){return{menuCollapsed:!1}},methods:{logout:function(){this.$store.dispatch("auth/logout")},toggleMenu:function(){this.menuCollapsed=!this.menuCollapsed}}}},RBkm:function(t,a,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(a,"__esModule",{value:!0});var s=e("ao7l"),r=n(s),i=e("j+XE"),c=n(i),l=e("GB2M"),u=n(l),o=e("HhAh"),h=n(o);a.default={name:"rate-index",data:function(){return{rating:{id:null,value:null,avg:null,exists:!1},first:!0,loading:!0,character:{id:null,name:null,image:null,bio:null,show:null}}},beforeRouteEnter:function(t,a,e){(new c.default).getByShowCharacter(t.params.show,t.params.character).then(function(t){e(function(a){return a.setCharacter(t)})})},beforeRouteUpdate:function(t,a,e){this.setUpCharacter(t),e()},methods:{setUpCharacter:function(t){var a=this;(new c.default).getByShowCharacter(t.params.show,t.params.character).then(function(t){a.character=t,a.character.image="https://api.chodolak.com"+t.image,t.rating?(a.rating.value=t.rating.rating,a.rating.id=t.rating.id,a.rating.exists=!0):(a.rating.value=null,a.rating.exists=!1)})},setCharacter:function(t){this.character=t,this.character.image="https://api.chodolak.com"+t.image,t.rating?(this.rating.id=t.rating.id,this.rating.value=t.rating.rating,this.rating.exists=!0):this.rating.exists=!1},ratingChange:(0,h.default)(function(){var t=this;this.$store.state.auth.authenticated?this.rating.exists?(new c.default).updateRating(this.character.id,this.rating.id,{rating:this.rating.value}).then(function(){t.ratingUpdatedSuccessMsg()}):(new c.default).createRating({character:this.character.id,rating:this.rating.value}).then(function(a){t.rating.exists=!0,t.rating.id=a.id,t.ratingCreatedSuccessMsg()}):console.log("popup to login")},250)},notifications:{ratingCreatedSuccessMsg:{type:u.default.types.success,title:"Success!",message:"Created rating"},ratingUpdatedSuccessMsg:{type:u.default.types.success,title:"Success!",message:"Updated rating"}},components:{VLayout:r.default}}},ao7l:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("nZvO"),s=e.n(n),r=e("1YSl"),i=e("VU/8"),c=i(s.a,r.a,!1,null,null,null);a.default=c.exports},gKEs:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("nav",{staticClass:"navbar navbar-expand-lg navbar-dark"},[e("router-link",{staticClass:"navbar-brand",attrs:{to:{name:"home.index"}}},[t._v("\n    Chodolak Anime\n  ")]),t._v(" "),e("button",{staticClass:"navbar-toggler",attrs:{type:"button"},on:{click:t.toggleMenu}},[e("span",{staticClass:"navbar-toggler-icon"})]),t._v(" "),e("div",{staticClass:"collapse navbar-collapse",class:{show:t.menuCollapsed}},[e("ul",{staticClass:"navbar-nav"},[e("router-link",{staticClass:"nav-item",attrs:{to:{name:"shows.index"},"active-class":"active",tag:"li"}},[e("a",{staticClass:"nav-link"},[t._v("\n          Shows\n        ")])])],1),t._v(" "),e("ul",{staticClass:"navbar-nav"},[t.$store.state.auth.authenticated?e("router-link",{staticClass:"nav-item",attrs:{to:{name:"rate.index",params:{show:"hunter-x-hunter",character:"gon-freecss"}},"active-class":"active",tag:"li"}},[e("a",{staticClass:"nav-link"},[t._v("\n          Rate\n        ")])]):t._e()],1),t._v(" "),e("ul",{staticClass:"navbar-nav mr-auto"},[t.$store.state.auth.admin?e("router-link",{staticClass:"nav-item",attrs:{to:{name:"admin.index"},"active-class":"active",tag:"li"}},[e("a",{staticClass:"nav-link"},[t._v("\n          Admin\n        ")])]):t._e()],1),t._v(" "),t.$store.state.auth.authenticated?e("span",{staticClass:"navbar-text"},[e("a",{staticClass:"btn btn-dark login-nav",attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.logout(a)}}},[e("i",{staticClass:"fa fa-sign-out"})])]):t._e(),t._v(" "),t.$store.state.auth.authenticated?t._e():e("span",{staticClass:"navbar-text"},[e("router-link",{staticClass:"btn btn-dark login-nav",attrs:{to:{name:"login.index"},tag:"a"}},[t._v("\n          Login\n      ")])],1)])],1)},s=[],r={render:n,staticRenderFns:s};a.a=r},"j+XE":function(t,a,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(a,"__esModule",{value:!0});var s=e("Zx67"),r=n(s),i=e("Zrlr"),c=n(i),l=e("wxAW"),u=n(l),o=e("zwoO"),h=n(o),d=e("Pf15"),v=n(d),f=e("dP9K"),g=n(f),m=function(t){function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,c.default)(this,a),(0,h.default)(this,(a.__proto__||(0,r.default)(a)).call(this,t))}return(0,v.default)(a,t),(0,u.default)(a,[{key:"upload",value:function(t){var a={name:t.name,bio:t.bio,show:t.show.value,fileName:t.fileName,image:t.image,thumbnail:t.thumbnail};return this.submit("post",this.endpoint+"/admin/character/upload",a)}},{key:"get",value:function(t,a){var e="?page="+t;return a.name&&(e+="&name="+a.name),a.show&&(e+="&show="+a.show),this.submit("get",this.endpoint+"/characters"+e)}},{key:"getById",value:function(t){return this.submit("get",this.endpoint+"/characters/id/"+t)}},{key:"getByShowCharacter",value:function(t,a){return this.submit("get",this.endpoint+"/characters/"+t+"/"+a)}},{key:"getCharactersByShow",value:function(t,a,e){var n="?page="+a;return e.name&&(n+="&name="+e.name),e.show&&(n+="&show="+e.show),this.submit("get",this.endpoint+"/characters/show/"+t+n)}},{key:"update",value:function(t,a,e,n){var s={name:a.name,bio:a.bio,show:a.show,fileName:a.fileName,image:a.image,thumbnail:a.thumbnail};return e&&delete s.image,n&&delete s.thumbnail,s.show&&(s.show=s.show.value),this.submit("put",this.endpoint+"/admin/character/"+t,s)}},{key:"createRating",value:function(t){return this.submit("post",this.endpoint+"/rate",t)}},{key:"updateRating",value:function(t,a,e){return this.submit("put",this.endpoint+"/rate/"+t+"/"+a,e)}},{key:"delete",value:function(t){return this.submit("delete",this.endpoint+"/admin/character/"+t)}}]),a}(g.default);a.default=m},kfhA:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-layout",[t.character.name?t._e():e("div",{staticClass:"card row justify-content-center align-self-center",staticStyle:{height:"650px"}},[e("div",{staticClass:"custom-center"})]),t._v(" "),t.character.name?e("div",{staticClass:"card"},[e("div",{staticClass:"rate-img-container center-block"},[t.character.image?e("img",{staticClass:"rate-img",attrs:{src:t.character.image,alt:"Card image cap"}}):t._e()]),t._v(" "),e("div",{staticClass:"card-body"},[e("h2",{staticClass:"card-title text-center"},[t._v(t._s(t.character.name))]),t._v(" "),e("div",{staticClass:"custom-center rate-stars"},[e("el-rate",{attrs:{"allow-half":!0,colors:["#007bff","#0860a3","#043b65"]},on:{change:t.ratingChange},model:{value:t.rating.value,callback:function(a){t.$set(t.rating,"value",a)},expression:"rating.value"}})],1)]),t._v(" "),e("ul",{staticClass:"list-group list-group-flush"},[e("li",{staticClass:"list-group-item"},[e("h6",[t._v("Bio")]),t._v("\n        "+t._s(t.character.bio)+"\n      ")]),t._v(" "),e("li",{staticClass:"list-group-item"},[e("h6",[t._v("Show")]),t._v(" "),e("router-link",{attrs:{to:{name:"shows-characters.index",params:{name:t.character.showUrlSafe}},tag:"a"}},[t._v("\n          "+t._s(t.character.show)+"\n        ")])],1)])]):t._e(),t._v(" "),t.character.prev?e("div",{staticClass:"prev-character"},[e("router-link",{staticClass:"btn custom-button",attrs:{to:{name:"rate.index",params:{show:t.character.prev.showUrlSafe,character:t.character.prev.nameUrlSafe}},tag:"button"}},[e("i",{staticClass:"fa fa-arrow-left",attrs:{"aria-hidden":"true"}}),t._v(" "),e("span",[t._v(t._s(t.character.prev.name))])])],1):t._e(),t._v(" "),t.character.next?e("div",{staticClass:"next-character"},[e("router-link",{staticClass:"btn custom-button",attrs:{to:{name:"rate.index",params:{show:t.character.next.showUrlSafe,character:t.character.next.nameUrlSafe}},tag:"button"}},[e("span",[t._v(t._s(t.character.next.name))]),t._v(" "),e("i",{staticClass:"fa fa-arrow-right",attrs:{"aria-hidden":"true"}})])],1):t._e()])},s=[],r={render:n,staticRenderFns:s};a.a=r},nZvO:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("uL8o"),s=function(t){return t&&t.__esModule?t:{default:t}}(n);a.default={name:"default-layout",components:{VNav:s.default}}},uL8o:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("Q6FB"),s=e.n(n),r=e("gKEs"),i=e("VU/8"),c=i(s.a,r.a,!1,null,null,null);a.default=c.exports}});
//# sourceMappingURL=11.e32b2543dc5fa3b4bd81.js.map