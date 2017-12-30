webpackJsonp([3],{"1kJx":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card"},[t.hasSlot("header")?a("h4",{staticClass:"card-header complimentary-color text-white"},[t._t("header")],2):t._e(),t._v(" "),t.hasSlot("body")?a("div",{staticClass:"card-body"},[t._t("body")],2):t._e(),t._v(" "),t.hasSlot("footer")?a("div",{staticClass:"card-footer"},[t._t("footer")],2):t._e()])},i=[],n={render:s,staticRenderFns:i};e.a=n},"6j10":function(t,e,a){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=a("GB2M"),n=s(i),o=a("9GVA"),r=s(o),l=a("rhdv"),u=s(l),c=a("unG1"),d=s(c);e.default={name:"admin-shows-upload-index",data:function(){return{show:{image:"",thumbnail:"",name:null,bio:null,fileName:null},uploadingShow:!1,existingShow:!1,existingShowId:null,originalImage:!1,originalThumbnail:!1}},beforeRouteEnter:function(t,e,a){t.params.id?(new d.default).getById(t.params.id).then(function(t){a(function(e){return e.setUpShow(t)})}):a()},methods:{setUpShow:function(t){this.existingShow=!0,this.existingShowId=t.id,this.originalImage=!0,this.show.image="https://api.chodolak.com".replace("/api","")+t.image,this.show.thumbnail="https://api.chodolak.com".replace("/api","")+t.thumbnail,this.show.name=t.name,this.show.bio=t.bio;var e=t.image.replace("/images/shows/","");this.show.fileName=e.replace(/\.[^\/.]+$/,"")},onFileChange:function(t){var e=t.target.files||t.dataTransfer.files;this.originalImage=!1,e.length&&this.createImage(e[0])},createImage:function(t){var e=new FileReader,a=this;e.onload=function(t){a.show.image=t.target.result},e.readAsDataURL(t)},onThumbnailFileChange:function(t){var e=t.target.files||t.dataTransfer.files;this.originalThumbnail=!1,e.length&&this.createThumbnailImage(e[0])},createThumbnailImage:function(t){var e=new FileReader,a=this;e.onload=function(t){a.show.thumbnail=t.target.result},e.readAsDataURL(t)},handleShowSubmit:function(){this.existingShow?this.update():this.create()},create:function(){var t=this;this.$validator.validateAll().then(function(e){e&&(t.uploadingShow=!0,(new d.default).create(t.show).then(function(){t.showSuccessCreateMsg(),t.uploadingShow=!1,t.resetShowVariables()}).catch(function(){t.uploadingShow=!1,t.showCreateErrorMsg()}).then(function(){t.errors.clear()}))})},update:function(){var t=this;this.uploadingShow=!0,(new d.default).update(this.existingShowId,this.show,this.originalImage).then(function(){t.showSuccessUpdateMsg(),t.uploadingShow=!1}).catch(function(){t.uploadingShow=!1,t.showUpdateErrorMsg()})},resetShowVariables:function(){this.show.image="",this.show.thumbnail="",this.show.name=null,this.show.bio=null,this.show.fileName=null,document.getElementById("show-image").value="",document.getElementById("show-thumbnail").value=""}},notifications:{showSuccessCreateMsg:{type:n.default.types.success,title:"Success!",message:"Uploaded show"},showSuccessUpdateMsg:{type:n.default.types.success,title:"Success!",message:"Updated show"},showCreateErrorMsg:{type:n.default.types.error,title:"Error!",message:"Failed to upload show"},showUpdateErrorMsg:{type:n.default.types.error,title:"Error!",message:"Failed to update show"}},components:{VLayout:r.default,VCard:u.default}}},"86xM":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("uL8o"),i=function(t){return t&&t.__esModule?t:{default:t}}(s);e.default={name:"admin-layout",components:{VNav:i.default}}},"9GVA":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("86xM"),i=a.n(s),n=a("jiFg"),o=a("VU/8"),r=o(i.a,n.a,!1,null,null,null);e.default=r.exports},"EM4/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{hasSlot:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default";return!!this.$slots[t]}}}},NU23:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("EM4/"),i=function(t){return t&&t.__esModule?t:{default:t}}(s);e.default={name:"card",mixins:[i.default],props:{contextualStyle:{type:String,required:!1}}}},Q1P9:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",[a("v-card",{attrs:{"contextual-style":"dark"}},[a("span",{attrs:{slot:"header"},slot:"header"},[t._v("\n      Show\n    ")]),t._v(" "),a("div",{attrs:{slot:"body"},slot:"body"},[a("form",{attrs:{novalidate:""},on:{submit:function(e){e.preventDefault(),t.handleShowSubmit()}}},[a("div",{staticClass:"form-group"},[a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:t.show.name,expression:"show.name"}],staticClass:"form-control",class:{input:!0,"is-invalid":t.errors.has("name")},attrs:{name:"name",type:"text",placeholder:"Name"},domProps:{value:t.show.name},on:{input:function(e){e.target.composing||t.$set(t.show,"name",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("div",{staticClass:"input-group"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.show.bio,expression:"show.bio"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{input:!0,"is-invalid":t.errors.has("bio")},attrs:{rows:"2",id:"bio",placeholder:"Bio",name:"bio"},domProps:{value:t.show.bio},on:{input:function(e){e.target.composing||t.$set(t.show,"bio",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"model",rawName:"v-model",value:t.show.fileName,expression:"show.fileName"}],staticClass:"form-control",class:{input:!0,"is-invalid":t.errors.has("fileName")},attrs:{type:"text",name:"fileName",placeholder:"File name"},domProps:{value:t.show.fileName},on:{input:function(e){e.target.composing||t.$set(t.show,"fileName",e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",[t._v("Image")]),t._v(" "),a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{input:!0,"is-invalid":t.errors.has("file")},attrs:{id:"show-image",type:"file",name:"file"},on:{change:t.onFileChange}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",[t._v("Thumbnail")]),t._v(" "),a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{input:!0,"is-invalid":t.errors.has("thumbnail")},attrs:{id:"show-thumbnail",type:"file",name:"thumbnail"},on:{change:t.onThumbnailFileChange}})])]),t._v(" "),a("div",{staticClass:"form-group"},[a("button",{staticClass:"btn custom-button"},[t._v("\n            Submit\n            "),t.uploadingShow?a("i",{staticClass:"fa fa-spinner fa-spin"}):t._e()])])]),t._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm"},[t.show.image?a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title custom-center"},[t._v("Image")])]),t._v(" "),a("img",{staticClass:"card-img-bottom",attrs:{src:t.show.image}})]):t._e()]),t._v(" "),a("div",{staticClass:"col-sm"},[t.show.thumbnail?a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title custom-center"},[t._v("Thumbnail")])]),t._v(" "),a("img",{staticClass:"card-img-bottom",attrs:{src:t.show.thumbnail}})]):t._e()])])])])])],1)},i=[],n={render:s,staticRenderFns:i};e.a=n},Q6FB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"nav",data:function(){return{menuCollapsed:!1}},methods:{logout:function(){this.$store.dispatch("auth/logout")},toggleMenu:function(){this.menuCollapsed=!this.menuCollapsed}}}},gKEs:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar navbar-expand-lg navbar-dark"},[a("router-link",{staticClass:"navbar-brand",attrs:{to:{name:"home.index"}}},[t._v("\n    Chodolak Anime\n  ")]),t._v(" "),a("button",{staticClass:"navbar-toggler",attrs:{type:"button"},on:{click:t.toggleMenu}},[a("span",{staticClass:"navbar-toggler-icon"})]),t._v(" "),a("div",{staticClass:"collapse navbar-collapse",class:{show:t.menuCollapsed}},[a("ul",{staticClass:"navbar-nav"},[a("router-link",{staticClass:"nav-item",attrs:{to:{name:"shows.index"},"active-class":"active",tag:"li"}},[a("a",{staticClass:"nav-link"},[t._v("\n          Shows\n        ")])])],1),t._v(" "),a("ul",{staticClass:"navbar-nav"},[t.$store.state.auth.authenticated?a("router-link",{staticClass:"nav-item",attrs:{to:{name:"rate.index",params:{show:"hunter-x-hunter",character:"gon-freecss"}},"active-class":"active",tag:"li"}},[a("a",{staticClass:"nav-link"},[t._v("\n          Rate\n        ")])]):t._e()],1),t._v(" "),a("ul",{staticClass:"navbar-nav mr-auto"},[t.$store.state.auth.admin?a("router-link",{staticClass:"nav-item",attrs:{to:{name:"admin.index"},"active-class":"active",tag:"li"}},[a("a",{staticClass:"nav-link"},[t._v("\n          Admin\n        ")])]):t._e()],1),t._v(" "),t.$store.state.auth.authenticated?a("span",{staticClass:"navbar-text"},[a("a",{staticClass:"btn btn-dark login-nav",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.logout(e)}}},[a("i",{staticClass:"fa fa-sign-out"})])]):t._e(),t._v(" "),t.$store.state.auth.authenticated?t._e():a("span",{staticClass:"navbar-text"},[a("router-link",{staticClass:"btn btn-dark login-nav",attrs:{to:{name:"login.index"},tag:"a"}},[t._v("\n          Login\n      ")])],1)])],1)},i=[],n={render:s,staticRenderFns:i};e.a=n},jiFg:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-nav"),t._v(" "),a("div",{staticClass:"page"},[a("div",{staticClass:"page-content d-flex align-items-stretch"},[a("nav",{staticClass:"side-navbar"},[a("span",{staticClass:"heading"}),t._v(" "),a("ul",{staticClass:"list-unstyled"},[a("router-link",{attrs:{to:{name:"admin.index"},tag:"li"}},[a("a",[a("i",{staticClass:"fa fa-home",attrs:{"aria-hidden":"true"}}),t._v("Dashboard")])]),t._v(" "),a("router-link",{attrs:{to:{name:"admin-characters.index"},"active-class":"active",tag:"li"}},[a("a",[a("i",{staticClass:"fa fa-user",attrs:{"aria-hidden":"true"}}),t._v("Characters")])]),t._v(" "),a("router-link",{attrs:{to:{name:"admin-shows.index"},"active-class":"active",tag:"li"}},[a("a",[a("i",{staticClass:"fa fa-folder-open",attrs:{"aria-hidden":"true"}}),t._v("Shows")])])],1)]),t._v(" "),a("div",{staticClass:"container pt-4"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col col-12"},[t._t("default")],2)])])])])],1)},i=[],n={render:s,staticRenderFns:i};e.a=n},rhdv:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("NU23"),i=a.n(s),n=a("1kJx"),o=a("VU/8"),r=o(i.a,n.a,!1,null,null,null);e.default=r.exports},uL8o:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Q6FB"),i=a.n(s),n=a("gKEs"),o=a("VU/8"),r=o(i.a,n.a,!1,null,null,null);e.default=r.exports},unG1:function(t,e,a){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=a("Zx67"),n=s(i),o=a("Zrlr"),r=s(o),l=a("wxAW"),u=s(l),c=a("zwoO"),d=s(c),h=a("Pf15"),v=s(h),m=a("dP9K"),f=s(m),p=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.default)(this,e),(0,d.default)(this,(e.__proto__||(0,n.default)(e)).call(this,t))}return(0,v.default)(e,t),(0,u.default)(e,[{key:"get",value:function(t,e){var a="?page="+t;return e.name&&(a+="&name="+e.name),this.submit("get",this.endpoint+"/shows"+a)}},{key:"getByName",value:function(t){return this.submit("get",this.endpoint+"/shows/"+t)}},{key:"getById",value:function(t){return this.submit("get",this.endpoint+"/shows/id/"+t)}},{key:"create",value:function(t){return this.submit("post",this.endpoint+"/admin/show",t)}},{key:"update",value:function(t,e,a,s){var i={name:e.name,bio:e.bio,fileName:e.fileName,image:e.image,thumbnail:e.thumbnail};return a&&delete i.image,s&&delete i.thumbnail,this.submit("put",this.endpoint+"/admin/show/"+t,i)}},{key:"delete",value:function(t){return this.submit("delete",this.endpoint+"/admin/show/"+t)}}]),e}(f.default);e.default=p},yuCM:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("6j10"),i=a.n(s),n=a("Q1P9"),o=a("VU/8"),r=o(i.a,n.a,!1,null,null,null);e.default=r.exports}});
//# sourceMappingURL=3.ff3b3450762375bfd749.js.map