"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[554],{6554:(x,g,r)=>{r.r(g),r.d(g,{ConfiguracionModule:()=>X});var _=r(6814),f=r(1896),t=r(5879),h=r(6385),u=r(4104);let Z=(()=>{class a{constructor(e){this.router=e,this.activeTabIndex=0;const i=localStorage.getItem("activeConfiguracion");null!==i&&(this.activeTabIndex=+i)}onTabChange(e){switch(this.activeTabIndex=e.index,localStorage.setItem("activeConfiguracion",this.activeTabIndex.toString()),e.index){case 0:this.router.navigateByUrl("/servicios/configuracion/tarifaAgua");break;case 1:this.router.navigateByUrl("/servicios/configuracion/tarifaMulta")}}static#t=this.\u0275fac=function(i){return new(i||a)(t.Y36(f.F0))};static#a=this.\u0275cmp=t.Xpm({type:a,selectors:[["gst-configuracion"]],decls:5,vars:1,consts:[["mat-stretch-tabs","false","mat-align-tabs","start",3,"selectedIndex","selectedTabChange"],["label","TARIFA DE AGUA"]],template:function(i,n){1&i&&(t.TgZ(0,"mat-tab-group",0),t.NdJ("selectedTabChange",function(p){return n.onTabChange(p)}),t._UZ(1,"mat-tab",1),t.qZA(),t._UZ(2,"mat-divider"),t.TgZ(3,"body"),t._UZ(4,"router-outlet"),t.qZA()),2&i&&t.Q6J("selectedIndex",n.activeTabIndex)},dependencies:[f.lC,h.d,u.uX,u.SP]})}return a})();var s=r(7845),d=r(3814),T=r(617),A=r(2032),C=r(9157),v=r(2296),m=r(6223),l=r(5313),b=r(3577),S=r(6724);function U(a,o){1&a&&t._UZ(0,"mat-divider")}function y(a,o){1&a&&t._UZ(0,"br")}function M(a,o){if(1&a){const e=t.EpF();t.TgZ(0,"div")(1,"form",14)(2,"mat-form-field",15)(3,"mat-label"),t._uU(4,"Tipo de Servicio"),t.qZA(),t.TgZ(5,"input",16,17),t.NdJ("ngModelChange",function(n){t.CHM(e);const c=t.oxw();return t.KtG(c.filaSeleccionada.tip_serv=n)}),t.qZA()(),t.TgZ(7,"mat-form-field",15)(8,"mat-label"),t._uU(9,"Valor B\xe1sico"),t.qZA(),t.TgZ(10,"input",18),t.NdJ("ngModelChange",function(n){t.CHM(e);const c=t.oxw();return t.KtG(c.filaSeleccionada.basico=n)})("input",function(n){t.CHM(e);const c=t.oxw();return t.KtG(c.validarInput(n,"basico"))}),t.qZA()(),t.TgZ(11,"mat-form-field",15)(12,"mat-label"),t._uU(13,"Valor Exceso"),t.qZA(),t.TgZ(14,"input",19),t.NdJ("ngModelChange",function(n){t.CHM(e);const c=t.oxw();return t.KtG(c.filaSeleccionada.exceso=n)})("input",function(n){t.CHM(e);const c=t.oxw();return t.KtG(c.validarInput(n,"exceso"))}),t.qZA()(),t.TgZ(15,"mat-form-field",15)(16,"mat-label"),t._uU(17,"Metros C\xfabicos"),t.qZA(),t.TgZ(18,"input",20),t.NdJ("ngModelChange",function(n){t.CHM(e);const c=t.oxw();return t.KtG(c.filaSeleccionada.met_cubicos=n)})("input",function(n){t.CHM(e);const c=t.oxw();return t.KtG(c.validarInput(n,"met_cubicos"))}),t.qZA()(),t.TgZ(19,"button",21),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.guardarEdicion())}),t._uU(20,"Guardar"),t.qZA(),t.TgZ(21,"button",22),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.cancelarEdicion())}),t._uU(22,"Cancelar"),t.qZA()()()}if(2&a){const e=t.oxw();t.xp6(5),t.Q6J("ngModel",e.filaSeleccionada.tip_serv)("readonly",!0),t.xp6(5),t.Q6J("ngModel",e.filaSeleccionada.basico),t.xp6(4),t.Q6J("ngModel",e.filaSeleccionada.exceso),t.xp6(4),t.Q6J("ngModel",e.filaSeleccionada.met_cubicos),t.xp6(1),t.Q6J("disabled",!e.formularioValido())}}function I(a,o){1&a&&t._UZ(0,"mat-divider")}function E(a,o){1&a&&t._UZ(0,"br")}function N(a,o){1&a&&(t.TgZ(0,"th",23),t._uU(1," TIPO DE SERVICIO "),t.qZA())}function J(a,o){if(1&a&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.xp6(1),t.hij(" ",e.tip_serv," ")}}function D(a,o){1&a&&(t.TgZ(0,"th",23),t._uU(1," VALOR B\xc1SICO "),t.qZA())}function $(a,o){if(1&a&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.xp6(1),t.hij(" ",e.basico," ")}}function Y(a,o){1&a&&(t.TgZ(0,"th",23),t._uU(1," VALOR EXCESO "),t.qZA())}function Q(a,o){if(1&a&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.xp6(1),t.hij(" ",e.exceso," ")}}function w(a,o){1&a&&(t.TgZ(0,"th",23),t._uU(1," METROS C\xdaBICOS "),t.qZA())}function R(a,o){if(1&a&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.xp6(1),t.hij(" ",e.met_cubicos," ")}}function O(a,o){1&a&&(t.TgZ(0,"th",23),t._uU(1," FECHA CREACI\xd3N "),t.qZA())}function B(a,o){if(1&a&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.xp6(1),t.hij(" ",e.fec_crea," ")}}function F(a,o){1&a&&(t.TgZ(0,"th",23),t._uU(1," FECHA ACTUALIZACI\xd3N "),t.qZA())}function H(a,o){if(1&a&&(t.TgZ(0,"td",24),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.xp6(1),t.hij(" ",e.fec_upda," ")}}function G(a,o){1&a&&(t.TgZ(0,"th",23),t._uU(1," ACCIONES "),t.qZA())}function K(a,o){if(1&a){const e=t.EpF();t.TgZ(0,"td",24)(1,"button",25),t.NdJ("click",function(){const c=t.CHM(e).$implicit,p=t.oxw();return t.KtG(p.editarFilaSeleccionada(c))}),t.TgZ(2,"mat-icon"),t._uU(3,"edit"),t.qZA()()()}}function V(a,o){1&a&&t._UZ(0,"tr",26)}function j(a,o){1&a&&t._UZ(0,"tr",27)}const L=[{path:"",component:Z,children:[{path:"",redirectTo:"tarifaAgua",pathMatch:"full"},{path:"tarifaAgua",component:(()=>{class a{constructor(e){this.serveTarifaAguaService=e,this.showSpinner=!1,this.dataSource=[],this.columnas=["tip_serv","basico","exceso","met_cubicos","fec_crea","fec_upda","editar"],this.filaSeleccionada=null,this.estaEditando=!1,this.cargarDatos()}cargarDatos(){this.showSpinner=!0,this.serveTarifaAguaService.getTarifasAgua().subscribe(e=>{this.dataSource=e,this.showSpinner=!1},e=>{console.error("Error al cargar los datos:",e)})}editarFilaSeleccionada(e){this.filaSeleccionada={...e},this.estaEditando=!0}guardarEdicion(){if(this.showSpinner=!0,this.filaSeleccionada){const{id:e,basico:i,exceso:n,met_cubicos:c}=this.filaSeleccionada;this.serveTarifaAguaService.actualizarTarifaAgua(e,i,n,c).subscribe(p=>{this.cargarDatos(),this.cancelarEdicion(),this.obtenerValorConsumo(),this.obtenerValorRiego(),this.showSpinner=!1},p=>{console.error("Error al actualizar datos:",p)})}else console.error("No hay fila seleccionada para editar")}obtenerValorConsumo(){this.serveTarifaAguaService.getTarifasConsumo().subscribe(e=>{localStorage.setItem("tarifaConsumo",JSON.stringify(e))},e=>{console.error("Error al obtener las tarifas:",e)})}obtenerValorRiego(){this.serveTarifaAguaService.getTarifasRiego().subscribe(e=>{localStorage.setItem("tarifaRiego",JSON.stringify(e))},e=>{console.error("Error al obtener las tarifas:",e)})}cancelarEdicion(){this.filaSeleccionada=null,this.estaEditando=!1}formularioValido(){return!!(this.filaSeleccionada.tip_serv&&this.filaSeleccionada.basico&&this.filaSeleccionada.exceso&&this.filaSeleccionada.met_cubicos)}validarInput(e,i){const n=e.target;/^\d+(\.\d+)?$/.test(n.value)||(n.value=n.value.replace(/[^0-9.]/g,""),this.filaSeleccionada[i]=n.value)}static#t=this.\u0275fac=function(i){return new(i||a)(t.Y36(s.c))};static#a=this.\u0275cmp=t.Xpm({type:a,selectors:[["gst-conf-tarifagua"]],decls:31,vars:9,consts:[[3,"showSpinner"],[4,"ngIf"],["mat-table","",3,"dataSource"],["matColumnDef","tip_serv"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","basico"],["matColumnDef","exceso"],["matColumnDef","met_cubicos"],["matColumnDef","fec_crea"],["matColumnDef","fec_upda"],["matColumnDef","editar"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["fxLayout","row","fxLayoutGap","10px"],["appearance","outline"],["matInput","","name","tip_serv",3,"ngModel","readonly","ngModelChange"],["inputMedidor",""],["matInput","","name","basico","inputmode","decimal","pattern","^\\d+(\\.\\d+)?$",3,"ngModel","ngModelChange","input"],["matInput","","name","exceso","inputmode","decimal","pattern","^\\d+(\\.\\d+)?$",3,"ngModel","ngModelChange","input"],["matInput","","name","met_cubicos","inputmode","decimal","pattern","^\\d+(\\.\\d+)?$",3,"ngModel","ngModelChange","input"],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-raised-button","","color","warn",3,"click"],["mat-header-cell",""],["mat-cell",""],["mat-icon-button","",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(i,n){1&i&&(t._UZ(0,"gst-spiner",0),t.TgZ(1,"gst-container"),t.YNc(2,U,1,0,"mat-divider",1),t.YNc(3,y,1,0,"br",1),t.YNc(4,M,23,6,"div",1),t.YNc(5,I,1,0,"mat-divider",1),t.YNc(6,E,1,0,"br",1),t.TgZ(7,"table",2),t.ynx(8,3),t.YNc(9,N,2,0,"th",4),t.YNc(10,J,2,1,"td",5),t.BQk(),t.ynx(11,6),t.YNc(12,D,2,0,"th",4),t.YNc(13,$,2,1,"td",5),t.BQk(),t.ynx(14,7),t.YNc(15,Y,2,0,"th",4),t.YNc(16,Q,2,1,"td",5),t.BQk(),t.ynx(17,8),t.YNc(18,w,2,0,"th",4),t.YNc(19,R,2,1,"td",5),t.BQk(),t.ynx(20,9),t.YNc(21,O,2,0,"th",4),t.YNc(22,B,2,1,"td",5),t.BQk(),t.ynx(23,10),t.YNc(24,F,2,0,"th",4),t.YNc(25,H,2,1,"td",5),t.BQk(),t.ynx(26,11),t.YNc(27,G,2,0,"th",4),t.YNc(28,K,4,0,"td",5),t.BQk(),t.YNc(29,V,1,0,"tr",12),t.YNc(30,j,1,0,"tr",13),t.qZA()()),2&i&&(t.Q6J("showSpinner",n.showSpinner),t.xp6(2),t.Q6J("ngIf",n.estaEditando),t.xp6(1),t.Q6J("ngIf",n.estaEditando),t.xp6(1),t.Q6J("ngIf",n.estaEditando),t.xp6(1),t.Q6J("ngIf",n.estaEditando),t.xp6(1),t.Q6J("ngIf",n.estaEditando),t.xp6(1),t.Q6J("dataSource",n.dataSource),t.xp6(22),t.Q6J("matHeaderRowDef",n.columnas),t.xp6(1),t.Q6J("matRowDefColumns",n.columnas))},dependencies:[_.O5,d.xw,d.SQ,T.Hw,A.Nt,C.KE,C.hX,v.lW,v.RK,m._Y,m.Fj,m.JJ,m.JL,m.c5,m.On,m.F,h.d,l.BZ,l.fO,l.as,l.w1,l.Dz,l.nj,l.ge,l.ev,l.XQ,l.Gk,b.e,S.O]})}return a})()},{path:"tarifaMulta",component:(()=>{class a{static#t=this.\u0275fac=function(i){return new(i||a)};static#a=this.\u0275cmp=t.Xpm({type:a,selectors:[["gst-conf-tarifa-multa"]],decls:2,vars:0,template:function(i,n){1&i&&(t.TgZ(0,"p"),t._uU(1,"conf-tarifa-multa works!"),t.qZA())}})}return a})()}]}];let z=(()=>{class a{static#t=this.\u0275fac=function(i){return new(i||a)};static#a=this.\u0275mod=t.oAB({type:a});static#e=this.\u0275inj=t.cJS({imports:[f.Bz.forChild(L),f.Bz]})}return a})();var P=r(568),q=r(3223);let X=(()=>{class a{static#t=this.\u0275fac=function(i){return new(i||a)};static#a=this.\u0275mod=t.oAB({type:a});static#e=this.\u0275inj=t.cJS({imports:[_.ez,z,P.m,q.Y]})}return a})()},7845:(x,g,r)=>{r.d(g,{c:()=>h});var _=r(9413),f=r(5879),t=r(9862);let h=(()=>{class u{constructor(s){this.http=s,this.myAppUrl=_.N.endpoint,this.myApiUrlTarifasAgua="api/tarifaagua",this.myApiUrlTarifasAguaConsumo="api/tarifaagua/consumo",this.myApiUrlTarifasAguaRiego="api/tarifaagua/riego"}getTarifasAgua(){return this.http.get(`${this.myAppUrl}${this.myApiUrlTarifasAgua}`)}getTarifasRiego(){return this.http.get(`${this.myAppUrl}${this.myApiUrlTarifasAguaRiego}`)}getTarifasConsumo(){return this.http.get(`${this.myAppUrl}${this.myApiUrlTarifasAguaConsumo}`)}getTarifaAgua(s){return this.http.get(`${this.myAppUrl}${this.myApiUrlTarifasAgua}${s}`)}crearTarifaAgua(s){return this.http.post(`${this.myAppUrl}${this.myApiUrlTarifasAgua}`,s)}actualizarTarifaAgua(s,d,T,A){return this.http.put(`${this.myAppUrl}${this.myApiUrlTarifasAgua}/${s}`,{basico:d,exceso:T,met_cubicos:A})}eliminarTarifaAgua(s){return this.http.delete(`${this.myAppUrl}${this.myApiUrlTarifasAgua}${s}`)}static#t=this.\u0275fac=function(d){return new(d||u)(f.LFG(t.eN))};static#a=this.\u0275prov=f.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"})}return u})()}}]);