(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"g+tZ":function(n,e,a){"use strict";a.r(e),a.d(e,"WorkModule",(function(){return c}));var r=a("ofXK"),t=a("tyNb"),o=a("fXoL"),b=a("0jaQ");const i=function(n){return["/profile",n]},l=[{path:"",component:(()=>{class n{constructor(n){this.tokenService=n}ngOnInit(){this.username=this.tokenService.getUsername()}}return n.\u0275fac=function(e){return new(e||n)(o.Jb(b.a))},n.\u0275cmp=o.Db({type:n,selectors:[["app-general"]],decls:18,vars:5,consts:[[1,"navbar","navbar-expand-lg","navbar-dark","bg-dark"],[1,"navbar-brand",3,"href"],["type","button","data-toggle","collapse","data-target","#navbarColor01","aria-controls","navbarColor01","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","navbarColor01",1,"collapse","navbar-collapse"],[1,"navbar-nav","mr-auto"],[1,"nav-item"],[1,"nav-link",3,"routerLink"],[1,"form-inline"],["type","search","placeholder","Search","aria-label","Search",1,"form-control","mr-sm-2"],["type","submit",1,"btn","btn-outline-info","my-2","my-sm-0"]],template:function(n,e){1&n&&(o.Mb(0,"nav",0),o.Mb(1,"a",1),o.bc(2,"FanDocker"),o.Lb(),o.Mb(3,"button",2),o.Kb(4,"span",3),o.Lb(),o.Mb(5,"div",4),o.Mb(6,"ul",5),o.Mb(7,"li",6),o.Mb(8,"a",7),o.bc(9,"Profile"),o.Lb(),o.Lb(),o.Mb(10,"li",6),o.Mb(11,"a",7),o.bc(12,"Organizations"),o.Lb(),o.Lb(),o.Lb(),o.Mb(13,"form",8),o.Kb(14,"input",9),o.Mb(15,"button",10),o.bc(16,"Search"),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Kb(17,"router-outlet")),2&n&&(o.zb(1),o.Vb("href","/",o.Yb),o.zb(7),o.Vb("routerLink",o.Wb(3,i,e.username)),o.zb(3),o.Vb("routerLink","/organizations"))},directives:[t.c,t.e],styles:[""]}),n})(),children:[{path:"",loadChildren:()=>a.e(10).then(a.bind(null,"8Snn")).then(n=>n.NewsModule)},{path:"profile/:username",loadChildren:()=>a.e(22).then(a.bind(null,"ovj/")).then(n=>n.ProfileModule)},{path:"organizations",loadChildren:()=>a.e(20).then(a.bind(null,"H6gV")).then(n=>n.OrganizationsModule)}]}];let s=(()=>{class n{}return n.\u0275mod=o.Hb({type:n}),n.\u0275inj=o.Gb({factory:function(e){return new(e||n)},imports:[[t.d.forChild(l)],t.d]}),n})(),c=(()=>{class n{}return n.\u0275mod=o.Hb({type:n}),n.\u0275inj=o.Gb({factory:function(e){return new(e||n)},imports:[[r.b,s]]}),n})()}}]);