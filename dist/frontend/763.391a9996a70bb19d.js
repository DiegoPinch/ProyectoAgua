"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[763],{9763:(P,u,n)=>{n.r(u),n.d(u,{SesionesModule:()=>F});var p=n(6814),f=n(1896),t=n(5879),r=n(6223),A=n(7624),h=n(9413),C=n(9862);let O=(()=>{class e{constructor(o){this.http=o,this.myAppUrl=h.N.endpoint,this.myApyUrl="api/actas/"}getActas(){return this.http.get(this.myAppUrl+this.myApyUrl)}postActas(o){return this.http.post(`${this.myAppUrl}${this.myApyUrl}`,o)}deleteActas(o){return this.http.delete(this.myAppUrl+this.myApyUrl+o)}static#t=this.\u0275fac=function(a){return new(a||e)(t.LFG(C.eN))};static#a=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var E=n(7700),N=n(3577),S=n(7935),T=n(494),m=n(3814),v=n(2032),g=n(9157),I=n(2296),c=n(5195),y=n(2823);function D(e,b){if(1&e&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&e){const o=t.oxw();let a;t.xp6(1),t.Oqu(null==(a=o.formulario.get("DOCUMENTO"))?null:a.value.name)}}let U=(()=>{class e{constructor(o,a,s){this.fb=o,this._actasService=a,this.dialog=s,this.records=[],this.data=[],this.metaDataColumns=[{field:"ID_ACT",title:"ID"},{field:"DOCUMENTO",title:"DOCUMENTO"},{field:"OBSERVACION",title:"OBSERVACION"},{field:"acciones",title:"ACCIONES"}],this.totalRecords=this.records.length,this.formulario=this.fb.group({ID_SESION_ACT:[null,r.kI.required],DOCUMENTO:[null,r.kI.required],OBSERVACION:[null,r.kI.maxLength(50)]}),this.cargarDatos(),this.changePage(0)}ngOnInit(){}onFileSelected(o){const a=o.target.files[0];a&&this.formulario.patchValue({DOCUMENTO:a})}cargarDatos(){this._actasService.getActas().subscribe(o=>{this.records=o.map(a=>({ID_ACT:a.ID_ACT,DOCUMENTO:a.DOCUMENTO,OBSERVACION:a.OBSERVACION,acciones:[{icon:"edit",tooltip:"Editar Acta",color:"primary"},{icon:"delete",tooltip:"Eliminar Acta",color:"warn"}]})),this.totalRecords=this.records.length,this.changePage(0)})}guardar(){this._actasService.postActas({ID_SESION_ACT:this.formulario.value.ID_SESION_ACT,DOCUMENTO:this.formulario.value.DOCUMENTO,OBSERVACION:this.formulario.value.OBSERVACION}).subscribe(a=>{console.log("Datos insertados con \xe9xito"),this.cargarDatos()},a=>{console.error("Error al insertar datos:",a)})}ejecutarAccion(o,a){"edit"===o.icon?(console.log("Editando fila:",a),this.dialog.open(A.L,{width:"300px",data:{cedula:a.CED_USU,lecActual:a.LEC_ACT,lecAnterior:a.LEC_ANT,metodo:this.cargarDatos()}}).afterClosed().subscribe(i=>{i&&(console.log("Hola:",i),this.cargarDatos())})):"delete"===o.icon&&(console.log("Eliminando fila:",a),window.confirm("\xbfEst\xe1s seguro de que deseas eliminar esta fila?")&&this._actasService.deleteActas(a.ID_ACT).subscribe(i=>{console.log("ELIMINADO \xe9xito"),this.cargarDatos()},i=>{console.error("Error al insertar ELIMNAR:",i)}))}changePage(o){const a=h.N.PAGE_SIZE,s=a*o;this.data=this.records.slice(s,s+a)}static#t=this.\u0275fac=function(a){return new(a||e)(t.Y36(r.qu),t.Y36(O),t.Y36(E.uw))};static#a=this.\u0275cmp=t.Xpm({type:e,selectors:[["gst-actas"]],decls:26,vars:6,consts:[["fxLayout","row","fxLayoutGap","14px",3,"formGroup"],["appearance","fill","fxFlex","15%"],["matInput","","formControlName","ID_SESION_ACT"],["fxFlex","30%"],["type","file","accept",".pdf",2,"display","none",3,"change"],["fileInput",""],["mat-raised-button","","color","primary",3,"click"],[4,"ngIf"],["appearance","fill","fxFlex","25%"],["matInput","","formControlName","OBSERVACION"],["mat-raised-button","","color","primary",3,"disabled","click"],[1,"heightMaxScrollbar"],[3,"data","metaDataColumns","actionClicked"],[3,"length","onChangePage"]],template:function(a,s){if(1&a){const i=t.EpF();t.TgZ(0,"gst-container")(1,"mat-card")(2,"mat-card-header")(3,"mat-card-title"),t._uU(4,"Agregar Actas"),t.qZA()(),t.TgZ(5,"mat-card-content")(6,"form",0)(7,"mat-form-field",1)(8,"mat-label"),t._uU(9,"ID Sesi\xf3n Act"),t.qZA(),t._UZ(10,"input",2),t.qZA(),t.TgZ(11,"div",3)(12,"input",4,5),t.NdJ("change",function(l){return s.onFileSelected(l)}),t.qZA(),t.TgZ(14,"button",6),t.NdJ("click",function(){t.CHM(i);const l=t.MAs(13);return t.KtG(l.click())}),t._uU(15," Seleccionar Archivo "),t.qZA(),t.YNc(16,D,2,1,"span",7),t.qZA(),t.TgZ(17,"mat-form-field",8)(18,"mat-label"),t._uU(19,"Observaci\xf3n"),t.qZA(),t._UZ(20,"input",9),t.qZA(),t.TgZ(21,"button",10),t.NdJ("click",function(){return s.guardar()}),t._uU(22," Guardar "),t.qZA()()()(),t.TgZ(23,"ng-scrollbar",11)(24,"gst-table",12),t.NdJ("actionClicked",function(l){return s.ejecutarAccion(l.accion,l.rowData)}),t.qZA()(),t.TgZ(25,"gst-paginator",13),t.NdJ("onChangePage",function(l){return s.changePage(l)}),t.qZA()()}if(2&a){let i;t.xp6(6),t.Q6J("formGroup",s.formulario),t.xp6(10),t.Q6J("ngIf",(null==(i=s.formulario.get("DOCUMENTO"))?null:i.value)&&(null==(i=s.formulario.get("DOCUMENTO"))?null:i.value.name)),t.xp6(5),t.Q6J("disabled",!s.formulario.valid),t.xp6(3),t.Q6J("data",s.data)("metaDataColumns",s.metaDataColumns),t.xp6(1),t.Q6J("length",s.totalRecords)}},dependencies:[p.O5,N.e,S.a,T.J,m.xw,m.SQ,m.yH,v.Nt,g.KE,g.hX,I.lW,r._Y,r.Fj,r.JJ,r.JL,c.a8,c.dn,c.dk,c.n5,r.sg,r.u,y.KC],styles:["mat-card[_ngcontent-%COMP%]{border:2px solid #000000;border-radius:12px}"]})}return e})();const Z=[{path:"",component:(()=>{class e{static#t=this.\u0275fac=function(a){return new(a||e)};static#a=this.\u0275cmp=t.Xpm({type:e,selectors:[["gst-page-princial-sesiones"]],decls:1,vars:0,template:function(a,s){1&a&&t._UZ(0,"gst-actas")},dependencies:[U]})}return e})()}];let M=(()=>{class e{static#t=this.\u0275fac=function(a){return new(a||e)};static#a=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[f.Bz.forChild(Z),f.Bz]})}return e})();var x=n(3223),J=n(843);let F=(()=>{class e{static#t=this.\u0275fac=function(a){return new(a||e)};static#a=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[p.ez,M,x.Y,J.m]})}return e})()}}]);