webpackJsonp([13],{"/hsz":function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n("cKSt"),r=u(a),o=n("5AB7"),i=u(o),l=n("VkTP"),s=u(l),d=n("g8Jr"),f=u(d);t.default={namespaced:!0,actions:r.default,getters:i.default,mutations:s.default,state:f.default}},"1AQK":function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n("Zx67"),r=u(a),o=n("Zrlr"),i=u(o),l=n("wxAW"),s=u(l),d=n("zwoO"),f=u(d),c=n("Pf15"),m=u(c),h=n("dP9K"),p=u(h),v=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.default)(this,t),(0,f.default)(this,(t.__proto__||(0,r.default)(t)).call(this,e))}return(0,m.default)(t,e),(0,s.default)(t,[{key:"login",value:function(e){return this.submit("post",this.endpoint+"/auth/login",e)}},{key:"register",value:function(e){return this.submit("post",this.endpoint+"/auth/signup",e)}},{key:"logout",value:function(){return this.submit("post",this.endpoint+"/auth/logout")}}]),t}(p.default);t.default=v},"20Zl":function(e,t){},"4HwT":function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n("Zx67"),r=u(a),o=n("Zrlr"),i=u(o),l=n("wxAW"),s=u(l),d=n("zwoO"),f=u(d),c=n("Pf15"),m=u(c),h=n("wz9i"),p=u(h),v=function(e){function t(){return(0,i.default)(this,t),(0,f.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,s.default)(t,null,[{key:"fetch",value:function(e){return{email:e.email,firstName:e.first_name,lastName:e.last_name}}},{key:"send",value:function(e){return{email:e.email,first_name:e.firstName,last_name:e.lastName}}}]),t}(p.default);t.default=v},"5AB7":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={}},"5W1q":function(e,t){},"77GP":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=n("eOO6"),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(u);t.default={auth:a}},CZ0x:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n("fHbC"),r=u(a),o=n("iwwM"),i=u(o),l=n("m3mU"),s=u(l),d=n("MACa"),f=u(d);t.default={namespaced:!0,actions:r.default,getters:i.default,mutations:s.default,state:f.default}},"DP/h":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{path:"/",name:"home.index",component:function(){return n.e(2).then(n.bind(null,"JNxQ"))}},{path:"/shows",name:"shows.index",component:function(){return n.e(8).then(n.bind(null,"yb7c"))}},{path:"/shows/:name",name:"shows-characters.index",component:function(){return n.e(10).then(n.bind(null,"Gdi1"))}},{path:"/rate/:show/:character",name:"rate.index",component:function(){return n.e(11).then(n.bind(null,"CLEE"))}},{path:"/admin",name:"admin.index",component:function(){return n.e(7).then(n.bind(null,"FWQX"))},meta:{admin:!0}},{path:"/admin/characters",name:"admin-characters.index",component:function(){return n.e(1).then(n.bind(null,"3YQM"))},meta:{admin:!0}},{path:"/admin/characters/upload/:id?",name:"admin-characters-upload.index",component:function(){return n.e(0).then(n.bind(null,"04+M"))},meta:{admin:!0}},{path:"/admin/shows",name:"admin-shows.index",component:function(){return n.e(9).then(n.bind(null,"GQsj"))},meta:{admin:!0}},{path:"/admin/shows/upload/:id?",name:"admin-shows-upload.index",component:function(){return n.e(3).then(n.bind(null,"yuCM"))},meta:{admin:!0}},{path:"/account",name:"account.index",component:function(){return n.e(6).then(n.bind(null,"NgpE"))},meta:{auth:!0}},{path:"/login",name:"login.index",component:function(){return n.e(5).then(n.bind(null,"7GdE"))},meta:{guest:!0}},{path:"/register",name:"register.index",component:function(){return n.e(4).then(n.bind(null,"ikTn"))},meta:{guest:!0}}]},GRgx:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}var a=n("9JMe"),r=u(a),o=n("IcnI"),i=u(o),l=n("sSws");r.default.sync(i.default,l.router)},IcnI:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),r=u(a),o=n("NYxO"),i=u(o),l=n("sax8"),s=(u(l),n("/hsz")),d=u(s),f=n("CZ0x"),c=u(f);r.default.use(i.default);t.default=new i.default.Store({modules:{account:d.default,auth:c.default},strict:!1,plugins:[]})},Jmt5:function(e,t){},Kkag:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}var a=n("//Fk"),r=u(a),o=n("7+uW"),i=u(o),l=n("mtWM"),s=u(l),d=n("IcnI"),f=u(d);s.default.defaults.baseURL="https://api.chodolak.com/",s.default.defaults.headers.common.Accept="application/json",s.default.interceptors.response.use(void 0,function(e){var t=e.response;if(500===t.status&&t.data.error&&"Unauthenticated."===t.data.error.message&&-1===t.request.responseURL.indexOf("/auth/logout")){var n=e.config,u="https://api.chodolak.com/";return u+="/auth/refresh",s.default.post(u).then(function(e){var t=e.data;return f.default.dispatch("auth/refresh",t.token),n.headers.Authorization="Bearer ",n.headers.Authorization+=t.token,(0,s.default)(n)})}return r.default.reject(e)}),i.default.http=s.default,Object.defineProperty(i.default.prototype,"http",{get:function(){return s.default}})},LQSN:function(e,t,n){"use strict";var u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("vue-progress-bar"),e._v(" "),n("router-view")],1)},a=[],r={render:u,staticRenderFns:a};t.a=r},M0FW:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=t.CHECK="CHECK",a=t.REGISTER="REGISTER",r=t.LOGIN="LOGIN",o=t.LOGOUT="LOGOUT",i=t.INVALID_LOGIN="INVALID_LOGIN",l=t.INVALID_REGISTER="INVALID_REGISTER",s=t.LOADING="LOADING",d=t.REFRESH="REFRESH";t.default={CHECK:u,REGISTER:a,LOGIN:r,LOGOUT:o,INVALID_LOGIN:i,INVALID_REGISTER:l,LOADING:s,REFRESH:d}},M93x:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=n("xJD8"),a=n.n(u),r=n("LQSN"),o=n("VU/8"),i=o(a.a,r.a,!1,null,null,null);t.default=i.exports},MACa:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={test:!1,invalidLogin:!1,invalidRegister:{},loading:!1,admin:!1}},NHnr:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.title,n=e.message,u=e.type,a=e.timeout;return u===_.default.types.warn&&(u="warning"),b.default[u]({title:t,message:n,timeout:a})}var r=n("7+uW"),o=u(r),i=n("CjbC"),l=u(i),s=n("zYko"),d=u(s),f=n("zL8q");n("tvR6");var c=n("vlaz"),m=u(c),h=n("VN6J"),p=u(h),v=n("GB2M"),_=u(v),g=n("sUu7"),I=u(g),O=n("YxSy"),b=u(O);n("20Zl");var y=n("rifk"),M=u(y);n("rXZ2"),n("Kkag");var k=n("SwH8"),N=n("sSws");n("GRgx"),n("Y3mD"),n("UbOQ"),n("WlsB");var P=n("M93x"),w=u(P),L=n("IcnI"),E=u(L),x={success:a,error:a,info:a,warn:a},G={color:"#007bff",failedColor:"red",thickness:"5px"};o.default.use(l.default),o.default.use(d.default,G),o.default.use(f.Rate),o.default.use(m.default),o.default.use(_.default,x),o.default.use(I.default),o.default.use(p.default),o.default.use(M.default,{dialog:!0}),o.default.config.productionTip=!1,E.default.dispatch("auth/check"),new o.default({el:"#app",i18n:k.i18n,router:N.router,store:E.default,render:function(e){return e(w.default)}})},SwH8:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.i18n=void 0;var a=n("7+uW"),r=u(a),o=n("TXmL"),i=u(o),l=n("Vtlw"),s=u(l);r.default.use(i.default);var d=t.i18n=new i.default({locale:"en",fallbackLocale:"en",messages:s.default});t.default={i18n:d}},UbOQ:function(e,t,n){"use strict";n("5W1q")},Uz6F:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=n("bfkd"),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(u);t.default={auth:a}},VkTP:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=n("bOdI"),a=function(e){return e&&e.__esModule?e:{default:e}}(u),r=n("Xrs4");t.default=(0,a.default)({},r.FIND,function(e,t){e.email=t.email,e.firstName=t.firstName,e.lastName=t.lastName})},Vtlw:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n("77GP"),r=u(a),o=n("Uz6F"),i=u(o);t.default={en:r.default,nl:i.default}},WlsB:function(e,t){},Xrs4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=t.FIND="FIND";t.default={FIND:u}},Y3mD:function(e,t,n){"use strict";n("Jmt5")},bfkd:function(e,t){e.exports={failed:"Het inloggen is mislukt",success:"Het inloggen is geslaagd"}},cKSt:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.find=void 0;var u=n("4HwT"),a=function(e){return e&&e.__esModule?e:{default:e}}(u),r=n("Xrs4"),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),i=t.find=function(e){var t=e.commit,n={first_name:"John",last_name:"Doe",email:"jonh@doe.com"};t(o.FIND,a.default.fetch(n))};t.default={find:i}},dP9K:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n("//Fk"),r=u(a),o=n("fZjL"),i=u(o),l=n("Zrlr"),s=u(l),d=n("wxAW"),f=u(d),c=n("7+uW"),m=u(c),h=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,s.default)(this,e),this.endpoint="https://api.chodolak.com/",this.parameters=t}return(0,f.default)(e,[{key:"setParameters",value:function(e){var t=this;return(0,i.default)(e).forEach(function(n){t.parameters[n]=e[n]}),this}},{key:"setParameter",value:function(e,t){return this.parameters[e]=t,this}},{key:"removeParameters",value:function(e){var t=this;return e.forEach(function(e){delete t.parameters[e]}),this}},{key:"removeParameter",value:function(e){return delete this.parameters[e],this}},{key:"submit",value:function(e,t){var n=this,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return new r.default(function(a,r){m.default.http[e](t+n.getParameterString(),u).then(function(e){a(e.data)}).catch(function(e){var t=e.response;t?r(t.data):r()})})}},{key:"all",value:function(){return this.submit("get","/"+this.endpoint)}},{key:"find",value:function(e){return this.submit("get","/"+this.endpoint+"/"+e)}},{key:"create",value:function(e){return this.submit("post","/"+this.endpoint,e)}},{key:"update",value:function(e,t){return this.submit("put","/"+this.endpoint+"/"+e,t)}},{key:"destroy",value:function(e){return this.submit("delete","/"+this.endpoint+"/"+e)}},{key:"getParameterString",value:function(){var e=this,t=(0,i.default)(this.parameters),n=t.filter(function(t){return!!e.parameters[t]}).map(function(t){return t+"="+e.parameters[t]});return 0===n.length?"":"?"+n.join("&")}}]),e}();t.default=h},eOO6:function(e,t){e.exports={failed:"Login failed",success:"Login successful"}},fHbC:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.refresh=t.logout=t.login=t.register=t.check=void 0;var a=n("7+uW"),r=u(a),o=n("M0FW"),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(o),l=n("1AQK"),s=u(l),d=t.check=function(e){(0,e.commit)(i.CHECK)},f=t.register=function(e,t){var n=e.commit;n(i.INVALID_REGISTER,{}),n(i.LOADING,!0);var u={name:t.name,email:t.email,password:t.password};(new s.default).register(u).then(function(e){n(i.LOGIN,e.token,!1),r.default.router.push({name:"home.index"})}).catch(function(e){n(i.INVALID_REGISTER,e.error.errors)})},c=t.login=function(e,t){var n=e.commit;n(i.INVALID_LOGIN,!1),n(i.LOADING,!0),(new s.default).login(t).then(function(e){var t={token:e.token,admin:e.admin};n(i.LOGIN,t),r.default.router.push({name:"home.index"})}).catch(function(){n(i.INVALID_LOGIN,!0)})},m=t.logout=function(e){var t=e.commit;(new s.default).logout(),t(i.LOGOUT),r.default.router.push({name:"login.index"})},h=t.refresh=function(e,t){(0,e.commit)(i.REFRESH,t)};t.default={check:d,register:f,login:c,logout:m,refresh:h}},g8Jr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={email:null,firstName:null,lastName:null}},iwwM:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={}},m3mU:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a,r=n("bOdI"),o=u(r),i=n("7+uW"),l=u(i),s=n("M0FW");t.default=(a={},(0,o.default)(a,s.CHECK,function(e){e.authenticated=!!localStorage.getItem("id_token"),e.admin=!!localStorage.getItem("admin"),e.authenticated&&(l.default.http.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("id_token"))}),(0,o.default)(a,s.REGISTER,function(){}),(0,o.default)(a,s.LOGIN,function(e,t){e.authenticated=!0,e.loading=!1,t.admin?(e.admin=!0,localStorage.setItem("admin",!0)):e.admin=!1,localStorage.setItem("id_token",t.token),l.default.http.defaults.headers.common.Authorization="Bearer "+t.token}),(0,o.default)(a,s.INVALID_LOGIN,function(e,t){e.invalidLogin=t,e.loading=!1}),(0,o.default)(a,s.INVALID_REGISTER,function(e,t){e.invalidRegister=t,e.loading=!1}),(0,o.default)(a,s.LOGOUT,function(e){e.authenticated=!1,e.admin=!1,localStorage.removeItem("id_token"),localStorage.removeItem("admin"),l.default.http.defaults.headers.common.Authorization=""}),(0,o.default)(a,s.LOADING,function(e,t){e.loading=t}),(0,o.default)(a,s.REFRESH,function(e,t){localStorage.removeItem("id_token"),l.default.http.defaults.headers.common.Authorization="",localStorage.setItem("id_token",t),l.default.http.defaults.headers.common.Authorization="Bearer "+t}),a)},rXZ2:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}var a=n("7+uW"),r=u(a),o=n("NYxO"),i=u(o);r.default.use(i.default)},sSws:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.router=void 0;var a=n("7+uW"),r=u(a),o=n("/ocq"),i=u(o),l=n("DP/h"),s=u(l),d=n("IcnI"),f=u(d);r.default.use(i.default);var c=t.router=new i.default({mode:"history",routes:s.default,scrollBehavior:function(){return{x:0,y:0}}});c.beforeEach(function(e,t,n){e.matched.some(function(e){return e.meta.auth})&&!f.default.state.auth.authenticated?n({name:"login.index"}):e.matched.some(function(e){return e.meta.guest})&&f.default.state.auth.authenticated?n({name:"home.index"}):e.matched.some(function(e){return e.meta.admin})&&!f.default.state.auth.admin?n({name:"home.index"}):n()}),r.default.router=c,t.default={router:c}},tvR6:function(e,t){},wz9i:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n("Zrlr"),r=u(a),o=n("wxAW"),i=u(o),l=function(){function e(){(0,r.default)(this,e)}return(0,i.default)(e,null,[{key:"fetchCollection",value:function(e){var t=this;return e.map(function(e){return t.fetch(e)})}},{key:"sendCollection",value:function(e){var t=this;return e.map(function(e){return t.send(e)})}}]),e}();t.default=l},xJD8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"chodolak-anime",created:function(){var e=this;this.$Progress.start(),this.$router.beforeEach(function(t,n,u){if(void 0!==t.meta.progress){var a=t.meta.progress;e.$Progress.parseMeta(a)}e.$Progress.start(),u()}),this.$router.afterEach(function(){e.$Progress.finish()})},mounted:function(){this.$Progress.finish()}}}},["NHnr"]);
//# sourceMappingURL=app.185656fed51fc72ef232.js.map