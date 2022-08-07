(this.webpackJsonpcovdata=this.webpackJsonpcovdata||[]).push([[16],{434:function(e,t,a){"use strict";a.r(t);var n=a(216),o=a.n(n),r=a(294),i=a(227),c=a(6),l=a(40),s=a(0),p=a(41),d=a(252),b=a(102),u=a(262),j=a(793);var m=function(e,t){var a=function(){var e=Object(s.useRef)(!0);return e.current?(e.current=!1,!0):e.current}();Object(s.useEffect)((function(){if(!a)return e()}),t)},f=a(178),O=a(5),x=a(840),h=a(823),D=a(184),y=a(189),g=(a(12),a(74)),v=a(192),w=["openTo","views","minDate","maxDate"],C=function(e){return 1===e.length&&"year"===e[0]},P=function(e){return 2===e.length&&-1!==e.indexOf("month")&&-1!==e.indexOf("year")},k=function(e,t){return C(e)?{mask:"____",inputFormat:t.formats.year}:P(e)?{disableMaskedInput:!0,inputFormat:t.formats.monthAndYear}:{mask:"__/__/____",inputFormat:t.formats.keyboardDate}};var T=a(846),I=a(39),M=a(170),S=a(437),_=a(3),R=["date","isLandscape","isMobileKeyboardViewOpen","onChange","toggleMobileKeyboardView","toolbarFormat","toolbarPlaceholder","toolbarTitle","views"],K=Object(M.a)("PrivateDatePickerToolbar",["penIcon"]),V=Object(I.a)(S.a,{skipSx:!0})(Object(O.a)({},"& .".concat(K.penIcon),{position:"relative",top:4})),F=Object(I.a)(T.a,{skipSx:!0})((function(e){var t=e.ownerState;return Object(D.a)({},t.isLandscape&&{margin:"auto 16px auto auto"})})),L=s.forwardRef((function(e,t){var a=e.date,n=e.isLandscape,o=e.isMobileKeyboardViewOpen,r=e.toggleMobileKeyboardView,i=e.toolbarFormat,c=e.toolbarPlaceholder,l=void 0===c?"\u2013\u2013":c,p=e.toolbarTitle,d=void 0===p?"Select date":p,b=e.views,u=Object(y.a)(e,R),j=Object(v.c)(),m=s.useMemo((function(){return a?i?j.formatByString(a,i):C(b)?j.format(a,"year"):P(b)?j.format(a,"month"):/en/.test(j.getCurrentLocaleCode())?j.format(a,"normalDateWithWeekday"):j.format(a,"normalDate"):l}),[a,i,l,j,b]),f=e;return Object(_.jsx)(V,Object(D.a)({ref:t,toolbarTitle:d,isMobileKeyboardViewOpen:o,toggleMobileKeyboardView:r,isLandscape:n,penIconClassName:K.penIcon,ownerState:f},u,{children:Object(_.jsx)(F,{variant:"h4",align:n?"left":"center",ownerState:f,children:m})}))})),B=a(23),E=a(235),A=a(403);var N,q=function(e){var t=e.children,a=e.DateInputProps,n=e.KeyboardDateInputComponent,o=e.onDismiss,r=e.open,i=e.PopperProps,c=e.PaperProps,l=e.TransitionComponent,p=s.useRef(null),d=Object(B.a)(a.inputRef,p);return Object(_.jsxs)(E.a.Provider,{value:"desktop",children:[Object(_.jsx)(n,Object(D.a)({},a,{inputRef:d})),Object(_.jsx)(A.a,{role:"dialog",open:r,anchorEl:p.current,TransitionComponent:l,PopperProps:i,PaperProps:c,onClose:o,children:t})]})},J=a(436),W=a(442),Y=a(229),Z=a(438),H=a(443),Q=["onChange","PopperProps","PaperProps","ToolbarComponent","TransitionComponent","value"],U={emptyValue:null,parseInput:Y.f,areValuesEqual:function(e,t,a){return e.isEqual(t,a)}},z=s.forwardRef((function(e,t){var a=function(e,t){var a=e.openTo,n=void 0===a?"day":a,o=e.views,r=void 0===o?["year","day"]:o,i=e.minDate,c=e.maxDate,l=Object(y.a)(e,w),s=Object(v.c)(),p=Object(v.a)(),d=null!=i?i:p.minDate,b=null!=c?c:p.maxDate;return Object(g.a)({props:Object(D.a)({views:r,openTo:n,minDate:d,maxDate:b},k(r,s),l),name:t})}(e,"MuiDesktopDatePicker"),n=null!==Object(W.b)(a),o=Object(H.a)(a,U),r=o.pickerProps,i=o.inputProps,c=o.wrapperProps,l=a.PopperProps,s=a.PaperProps,p=a.ToolbarComponent,d=void 0===p?L:p,b=a.TransitionComponent,u=Object(y.a)(a,Q),j=Object(D.a)({},i,u,{ref:t,validationError:n});return Object(_.jsx)(q,Object(D.a)({},c,{DateInputProps:j,KeyboardDateInputComponent:Z.a,PopperProps:l,PaperProps:s,TransitionComponent:b,children:Object(_.jsx)(J.b,Object(D.a)({},r,{autoFocus:!0,toolbarTitle:a.label||a.toolbarTitle,ToolbarComponent:d,DateInputProps:j},u))}))})),G={Date:{light:{inputText:"#454545",toolbarBackColor:"rgba(199, 199, 199,0.5)",toolbarTextColor:"#454545",pickersDayColor:"#454545",daySelectedBackColor:"rgba(199, 199, 199,0.5)"},dark:{inputText:"#c2c2c2",toolbarBackColor:"rgba(47, 55, 92,0.5)",toolbarTextColor:"#c2c2c2",pickersDayColor:"#c2c2c2",daySelectedBackColor:"rgba(47, 55, 92,0.5)"}}},X=a(101),$=a(844),ee=p.b.input(N||(N=Object(l.a)(["\n    border-radius: 5px;\n    padding: 7px;\n    background: transparent;\n    outline:none;\n    border: 1px solid ",";\n    color: ",";\n"])),(function(e){return"light"===e.usetheme?"black":"#b8b8b8"}),(function(e){return"light"===e.usetheme?"black":"#b8b8b8"}));var te,ae,ne,oe,re=function(e){var t=e.label,a=e.defaultDate,n=e.maxDate,o=e.minDate,r=e.disabled,c=e.callbackChange,l=e.value,s=e.formData,p=Object(b.a)(),d=Object(X.a)({overrides:{MuiInputLabel:{root:{color:"".concat(G.Date[p.palette.type].inputText," !important")}},MuiInputBase:{root:{color:G.Date[p.palette.type].inputText},input:{color:G.Date[p.palette.type].inputText}}},palette:{mode:"light"===p.palette.type?"light":"dark",primary:{main:"#f09a37"},secondary:{main:"#d48b3f"}}});return Object(_.jsx)($.a,{theme:d,children:Object(_.jsx)(h.b,{dateAdapter:x.a,children:Object(_.jsx)(z,{label:t,inputFormat:"MM/dd/yyyy",value:a,onChange:function(e){c(Object(i.a)(Object(i.a)({},s),{},Object(O.a)({},l,e)))},renderInput:function(e){var t=e.inputRef,a=e.inputProps,n=e.InputProps;return Object(_.jsxs)("div",{style:{display:"inline-flex",alignItems:"center"},children:[Object(_.jsx)(ee,Object(i.a)(Object(i.a)({ref:t},a),{},{usetheme:p.palette.type,disabled:!0})),null===n||void 0===n?void 0:n.endAdornment]})},disabled:r,maxDate:new Date(n),minDate:new Date(o),disableCloseOnSelect:!1,clearable:!1,desktopModeMediaQuery:"@media (pointer: fine)"})})})},ie=p.b.div(te||(te=Object(l.a)(["\n    display: flex;\n    width: 30%;\n    justify-content: space-around;\n    align-items: center;\n\n    @media (max-width: 768px) {\n        width: 50%;\n    }\n"]))),ce=p.b.div(ae||(ae=Object(l.a)(["\n    color: #f09a37;\n"]))),le=p.b.div(ne||(ne=Object(l.a)(["\n    margin: auto;\n    margin-bottom: 20px;\n    text-align: center;\n    width: 90%;\n    height: ",";\n    overflow: hidden;\n    transition: all 0.2s ease;\n"])),(function(e){return e.isOpen?"100px":"20px"})),se=p.b.div(oe||(oe=Object(l.a)(["\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n"])));t.default=function(e){var t=e.data,a=e.updateData,n=e.loadingRef,l=(Object(b.a)(),Object(s.useState)(!1)),p=Object(c.a)(l,2),O=p[0],x=p[1],h=Object(s.useState)({minDate:t.data.dates.firstDate,maxDate:t.data.dates.lastDate}),D=Object(c.a)(h,2),y=D[0],g=(D[1],Object(s.useState)({mode:"cum"===t.mode,onDateData:new Date(t.data.UpdatedTill)})),v=Object(c.a)(g,2),w=v[0],C=v[1],P=Object(d.useSpring)({scroll:w.mode?0:20,from:{scroll:0},delay:200,config:d.config.default}).scroll;return m((function(){var e=w.mode?"cum":"daily";a(Object(i.a)(Object(i.a)({},t),{},{mode:e}))}),[w.mode]),m(Object(r.a)(o.a.mark((function e(){var r,c,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.current.continuousStart(),r=Object(j.a)(w.onDateData,"MM'-'dd'-'yyyy"),w.onDateData.getTime()===new Date(y.maxDate).getTime()&&(console.log("Yes"),r="current"),e.next=5,fetch("".concat(u.a,"india_").concat(r,".json"));case 5:return c=e.sent,e.next=8,c.json();case 8:l=e.sent,n.current.complete(),a(Object(i.a)(Object(i.a)({},t),{},{data:l}));case 11:case"end":return e.stop()}}),e)}))),[w.onDateData]),Object(_.jsxs)(le,{isOpen:O,children:[Object(_.jsxs)(se,{children:[Object(_.jsxs)(ie,{children:[Object(_.jsx)("div",{style:{color:"#636060"},children:"Mode:"}),Object(_.jsx)(f.a,{title:"Click to change",placement:"top",arrow:!0,children:Object(_.jsx)(d.animated.div,{style:{position:"relative",height:"20px",width:"fit-content",overflow:"hidden",background:"rgba(255, 166, 64, 0.5)",borderRadius:"9px"},scrollTop:P,children:["Cumulative","Daily"].map((function(e,t){return Object(_.jsx)(ce,{style:{height:20,display:"flex",justifyContent:"center",alignItems:"center"},children:Object(_.jsx)("span",{style:{cursor:"pointer",padding:"1px 5px"},onClick:function(){return C(Object(i.a)(Object(i.a)({},w),{},{mode:!w.mode}))},children:e})},"".concat(e,"_").concat(t))}))})})]}),Object(_.jsx)(f.a,{title:"History",placement:"top",arrow:!0,children:Object(_.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"30px",height:"20px",cursor:"pointer",color:"#636060",transform:O?"rotateZ(-180deg)":"rotateZ(0deg)",transition:"all 0.2s ease"},onClick:function(){return x(!O)},children:Object(_.jsx)("i",{className:"fa fa-history","aria-hidden":"true"})})})]}),Object(_.jsx)("div",{className:"history",style:{marginTop:"20px"},children:Object(_.jsx)(re,{label:"On Date",defaultDate:w.onDateData,maxDate:y.maxDate,minDate:y.minDate,callbackChange:C,disabled:!1,value:"onDateData",formData:w})})]})}}}]);
//# sourceMappingURL=16.e698401b.chunk.js.map