(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{25:function(e,t,n){e.exports=n(79)},30:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(22),l=n.n(o),c=(n(30),n(4)),i=n(24),u=n(1),f=n(3),s=n.n(f),v=n(7),m=n.n(v),d=n(23),b=n.n(d),p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:9;return"number"!==typeof e?null:Math.floor(e/t)},y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:9;return"number"!==typeof e?null:e%t},E=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:9;if("number"!==typeof e)return null;var n=Math.floor(t/3),r=Math.ceil((e+1)/n)-1,a=-n*p(e)+Math.floor(e/Math.floor(3*t))*n;return r+a},h=function(e,t){if("number"!==typeof t)return[];var n=9*p(t);return e.slice(n,n+9)},g=function(e,t){if("number"!==typeof t)return[];var n=y(t);return e.filter((function(e,t){return y(t)===n}))},k=function(e,t){if("number"!==typeof t)return[];var n=E(t);return e.filter((function(e,t){return E(t)===n}))},C=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return"number"!==typeof t?!n:e.filter((function(e){return e===t})).length<=(n?0:1)},j=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=r.isIncoming,o=void 0!==a&&a;return C(k(e,t),n,o)&&C(h(e,t),n,o)&&C(g(e,t),n,o)},O=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return[].concat(Object(u.a)(e.slice(t)),Object(u.a)(e.slice(0,t)))},N=function(e){return e.every((function(t,n){return j(e,n,t)}))},S=function e(t){for(var n=0;n<81;n++)if("number"!==typeof t[n]){for(var r=1;r<=9;r++)if(j(t,n,r,{isIncoming:!0})){if(t[n]=r,e(t))return!0;t[n]=!1}return!1}return!0},x=function(e){var t=e.isHighlighted,n=e.isSelected,r=e.value,o=e.boardIndex,l=e.onClick,c=e.boardSize,i=void 0===c?9:c,u=e.isValid,f=void 0===u||u,s=e.isGiven,v=p(o,i),m=y(o,i),d=v===i-1?2:1,b=m===i-1?2:1,E=0===m?2:0,h=0===v?2:0;return 9===i&&(m>0&&m%3===0&&(E+=1),v>0&&v%3===0&&(h+=1)),a.a.createElement("div",{className:"cell",onClick:function(){return l&&l(o,r)},style:{borderColor:n?"black":"#666",fontWeight:s||n?"bold":"normal",color:s?"blue":"black",borderBottomWidth:d,borderRightWidth:b,borderLeftWidth:E,borderTopWidth:h}},a.a.createElement(I,{active:!f,color:"red",opacity:.5}),a.a.createElement(I,{active:f&&t,color:"yellow",opacity:.5}),a.a.createElement(I,{active:n,color:"gray",opacity:.5}),a.a.createElement(I,{active:!0,style:{display:"flex",justifyContent:"center",alignItems:"center"}},r))},I=function(e){var t=e.active,n=e.children,r=e.color,o=e.opacity,l=void 0===o?1:o,c=e.style,u=void 0===c?{}:c;return a.a.createElement("div",{style:Object(i.a)({position:"absolute",top:0,right:0,bottom:0,left:0,opacity:l,backgroundColor:t?r:"transparent"},u)},n)},w=function(e){var t=e.value,n=e.onClick;return a.a.createElement("div",{className:"button",onClick:n},t)},M=function(e){var t=e.onClickValue,n=e.activeNumber,r=e.onErase;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"controls"},a.a.createElement(w,{value:"Hint",onClick:function(){}}),a.a.createElement(w,{value:"Undo",onClick:function(){}}),a.a.createElement(w,{value:"Redo",onClick:function(){}})),a.a.createElement("div",{className:"controls-numbers"},[1,2,3,4,5,6,7,8,9].map((function(e,r){return a.a.createElement(x,{key:"control-cell-".concat(r),value:e,boardIndex:r,boardSize:3,isHighlighted:e===n,onClick:t})}))),a.a.createElement("div",{className:"controls"},a.a.createElement(w,{value:"Pencil",onClick:function(){}}),a.a.createElement(w,{value:"Erase",onClick:r}),a.a.createElement(w,{value:"Game",onClick:function(){}})))},V=function(){var e=Object(r.useState)(null),t=Object(c.a)(e,2),n=t[0],o=t[1],l=Object(r.useState)(null),i=Object(c.a)(l,2),f=i[0],v=i[1],d=Object(r.useState)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.numGivens,n=void 0===t?30:t,r="123456789".split("").map((function(e){return+e}));r=s()(r);for(var a=0;a<8;a++){var o=2===a||5===a?1:3,l=r.slice(9*a,9*a+9);r=r.concat(O(l,o))}var c=m()(r,27);r=s()(c).flat();var i=m()(b.a.apply(void 0,Object(u.a)(m()(r,9))).flat(),27);r=s()(i).flat();var f=81-n,v=s()([].concat(Object(u.a)(new Array(f).fill(!1)),Object(u.a)(new Array(n).fill(!0))));return r=r.map((function(e,t){return!!v[t]&&e})).flat(),console.log({isValid:N(r),isSolvable:S(Object(u.a)(r))}),r}()),p=Object(c.a)(d,1)[0],y=Object(r.useState)(p),E=Object(c.a)(y,2),h=E[0],g=E[1],k=function(e,t){"number"!==typeof p[t]&&g(h.map((function(n,r){return r===t?h[t]!==e&&e:n})))},C=function(e){"number"===typeof n?k(n,e):v(f===e?null:e)};return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"title-container flex-center"},a.a.createElement("p",null,"Sudoku")),a.a.createElement("div",{className:"board-container"},a.a.createElement("div",{className:"flex-1"},a.a.createElement("div",{className:"board"},h.map((function(e,t){return a.a.createElement(x,{key:"cell-".concat(t),value:e,onClick:C,boardIndex:t,isGiven:"number"===typeof p[t],isSelected:f===t,isHighlighted:e===n,isValid:j(h,t,e)})}))))),a.a.createElement("div",{className:"controls-container"},a.a.createElement(M,{activeCell:f,activeNumber:n,setActiveNumber:o,onClickValue:function(e,t){"number"===typeof f?k(t,f):o(n===t?null:t)},onErase:function(e){return k(!1,f)}})))};l.a.render(a.a.createElement(V,null),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.8e92300c.chunk.js.map