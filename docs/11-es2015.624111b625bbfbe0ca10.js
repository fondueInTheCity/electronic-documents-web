(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{AYID:function(t,n,e){"use strict";e.r(n),e.d(n,"CreateOrganizationModule",(function(){return m}));var o=e("ofXK"),r=e("tyNb"),i=e("3Pt+"),a=e("fXoL"),b=e("wmAJ"),c=e("0jaQ");const s=[{path:"",component:(()=>{class t{constructor(t,n,e){this.organizationService=t,this.activatedRoute=n,this.tokenService=e,this.organizationForm=new i.e({name:new i.c,ownerUsername:new i.c(this.tokenService.getUsername())})}ngOnInit(){}onSubmit(){this.getSubscription=this.organizationService.createOrganization(this.organizationForm.value).subscribe()}}return t.\u0275fac=function(n){return new(n||t)(a.Jb(b.a),a.Jb(r.a),a.Jb(c.a))},t.\u0275cmp=a.Db({type:t,selectors:[["app-create-organization"]],decls:11,vars:1,consts:[[1,"d-flex","flex-column","bd-highlight","mb-3","align-items-center"],[1,"h3","mb-3","font-weight-normal"],[3,"formGroup","ngSubmit"],[1,"form-group"],["type","text","formControlName","name","required","","autofocus","",1,"form-control"],[1,"btn","btn-lg","btn-primary","btn-block"]],template:function(t,n){1&t&&(a.Mb(0,"div",0),a.Mb(1,"h1",1),a.bc(2,"Create Organization"),a.Lb(),a.Mb(3,"form",2),a.Tb("ngSubmit",(function(){return n.onSubmit()})),a.Mb(4,"div",3),a.Mb(5,"label"),a.bc(6," Organization Name "),a.Kb(7,"input",4),a.Lb(),a.Lb(),a.Mb(8,"div",3),a.Mb(9,"button",5),a.bc(10,"Create"),a.Lb(),a.Lb(),a.Lb(),a.Lb()),2&t&&(a.zb(3),a.Vb("formGroup",n.organizationForm))},directives:[i.l,i.i,i.f,i.a,i.h,i.d,i.k],styles:[""]}),t})()}];let u=(()=>{class t{}return t.\u0275mod=a.Hb({type:t}),t.\u0275inj=a.Gb({factory:function(n){return new(n||t)},imports:[[r.d.forChild(s)],r.d]}),t})(),m=(()=>{class t{}return t.\u0275mod=a.Hb({type:t}),t.\u0275inj=a.Gb({factory:function(n){return new(n||t)},imports:[[o.b,u,i.j]]}),t})()}}]);