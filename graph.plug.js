var w=Object.defineProperty;var d=(e,r)=>{for(var n in r)w(e,n,{get:r[n],enumerable:!0})};var f=typeof window>"u"&&typeof globalThis.WebSocketPair>"u";typeof Deno>"u"&&(self.Deno={args:[],build:{arch:"x86_64"},env:{get(){}}});var p=new Map,u=0;function c(e){self.postMessage(e)}f&&(globalThis.syscall=async(e,...r)=>await new Promise((n,o)=>{u++,p.set(u,{resolve:n,reject:o}),c({type:"sys",id:u,name:e,args:r})}));function y(e,r){f&&(self.addEventListener("message",n=>{(async()=>{let o=n.data;switch(o.type){case"inv":{let s=e[o.name];if(!s)throw new Error(`Function not loaded: ${o.name}`);try{let i=await Promise.resolve(s(...o.args||[]));c({type:"invr",id:o.id,result:i})}catch(i){console.error("An exception was thrown as a result of invoking function",o.name,"error:",i.message),c({type:"invr",id:o.id,error:i.message})}}break;case"sysr":{let s=o.id,i=p.get(s);if(!i)throw Error("Invalid request id");p.delete(s),o.error?i.reject(new Error(o.error)):i.resolve(o.result)}break}})().catch(console.error)}),c({type:"manifest",manifest:r}))}function G(e){let r=atob(e),n=r.length,o=new Uint8Array(n);for(let s=0;s<n;s++)o[s]=r.charCodeAt(s);return o}function h(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let r="",n=e.byteLength;for(let o=0;o<n;o++)r+=String.fromCharCode(e[o]);return btoa(r)}async function K(e,r){if(typeof e!="string"){let n=new Uint8Array(await e.arrayBuffer()),o=n.length>0?h(n):void 0;r={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:o},e=e.url}return syscall("sandboxFetch.fetch",e,r)}globalThis.nativeFetch=globalThis.fetch;function S(){globalThis.fetch=async function(e,r){let n=r&&r.body?h(new Uint8Array(await new Response(r.body).arrayBuffer())):void 0,o=await K(e,r&&{method:r.method,headers:r.headers,base64Body:n});return new Response(o.base64Body?G(o.base64Body):null,{status:o.status,headers:o.headers})}}f&&S();var a={};d(a,{confirm:()=>ne,copyToClipboard:()=>fe,deleteLine:()=>ye,dispatch:()=>re,downloadFile:()=>J,filterBox:()=>H,flashNotification:()=>j,fold:()=>ae,foldAll:()=>ce,getCurrentPage:()=>k,getCursor:()=>R,getSelection:()=>M,getText:()=>F,getUiOption:()=>ie,goHistory:()=>V,hidePanel:()=>q,insertAtCursor:()=>te,insertAtPos:()=>z,moveCursor:()=>$,moveCursorToLine:()=>ee,navigate:()=>Q,newWindow:()=>E,openCommandPalette:()=>T,openPageNavigator:()=>D,openSearchPanel:()=>pe,openUrl:()=>B,prompt:()=>oe,redo:()=>ue,reloadConfigAndCommands:()=>N,reloadPage:()=>U,reloadUI:()=>Y,replaceRange:()=>_,save:()=>L,setSelection:()=>W,setText:()=>Z,setUiOption:()=>se,showPanel:()=>O,toggleFold:()=>de,undo:()=>me,unfold:()=>ge,unfoldAll:()=>le,uploadFile:()=>X,vimEx:()=>he});typeof self>"u"&&(self={syscall:()=>{throw new Error("Not implemented here")}});function t(e,...r){return globalThis.syscall(e,...r)}function k(){return t("editor.getCurrentPage")}function F(){return t("editor.getText")}function Z(e,r=!1){return t("editor.setText",e,r)}function R(){return t("editor.getCursor")}function M(){return t("editor.getSelection")}function W(e,r){return t("editor.setSelection",e,r)}function L(){return t("editor.save")}function Q(e,r=!1,n=!1){return t("editor.navigate",e,r,n)}function D(e="page"){return t("editor.openPageNavigator",e)}function T(){return t("editor.openCommandPalette")}function U(){return t("editor.reloadPage")}function Y(){return t("editor.reloadUI")}function N(){return t("editor.reloadConfigAndCommands")}function B(e,r=!1){return t("editor.openUrl",e,r)}function E(){return t("editor.newWindow")}function V(e){return t("editor.goHistory",e)}function J(e,r){return t("editor.downloadFile",e,r)}function X(e,r){return t("editor.uploadFile",e,r)}function j(e,r="info"){return t("editor.flashNotification",e,r)}function H(e,r,n="",o=""){return t("editor.filterBox",e,r,n,o)}function O(e,r,n,o=""){return t("editor.showPanel",e,r,n,o)}function q(e){return t("editor.hidePanel",e)}function z(e,r){return t("editor.insertAtPos",e,r)}function _(e,r,n){return t("editor.replaceRange",e,r,n)}function $(e,r=!1){return t("editor.moveCursor",e,r)}function ee(e,r=1,n=!1){return t("editor.moveCursorToLine",e,r,n)}function te(e){return t("editor.insertAtCursor",e)}function re(e){return t("editor.dispatch",e)}function oe(e,r=""){return t("editor.prompt",e,r)}function ne(e){return t("editor.confirm",e)}function ie(e){return t("editor.getUiOption",e)}function se(e,r){return t("editor.setUiOption",e,r)}function ae(){return t("editor.fold")}function ge(){return t("editor.unfold")}function de(){return t("editor.toggleFold")}function ce(){return t("editor.foldAll")}function le(){return t("editor.unfoldAll")}function me(){return t("editor.undo")}function ue(){return t("editor.redo")}function pe(){return t("editor.openSearchPanel")}function fe(e){return t("editor.copyToClipboard",e)}function ye(){return t("editor.deleteLine")}function he(e){return t("editor.vimEx",e)}var l={};d(l,{deleteAttachment:()=>ke,deleteFile:()=>We,deletePage:()=>ve,fileExists:()=>Le,getAttachmentMeta:()=>Ge,getFileMeta:()=>Re,getPageMeta:()=>Pe,listAttachments:()=>we,listFiles:()=>Fe,listPages:()=>xe,listPlugs:()=>be,readAttachment:()=>Ke,readFile:()=>Ze,readPage:()=>Ie,writeAttachment:()=>Se,writeFile:()=>Me,writePage:()=>Ae});function xe(){return t("space.listPages")}function Pe(e){return t("space.getPageMeta",e)}function Ie(e){return t("space.readPage",e)}function Ae(e,r){return t("space.writePage",e,r)}function ve(e){return t("space.deletePage",e)}function be(){return t("space.listPlugs")}function we(){return t("space.listAttachments")}function Ge(e){return t("space.getAttachmentMeta",e)}function Ke(e){return t("space.readAttachment",e)}function Se(e,r){return t("space.writeAttachment",e,r)}function ke(e){return t("space.deleteAttachment",e)}function Fe(){return t("space.listFiles")}function Ze(e){return t("space.readFile",e)}function Re(e){return t("space.getFileMeta",e)}function Me(e,r){return t("space.writeFile",e,r)}function We(e){return t("space.deleteFile",e)}function Le(e){return t("space.fileExists",e)}var m={};d(m,{readAsset:()=>Ve});function Ee(e){let r=atob(e),n=r.length,o=new Uint8Array(n);for(let s=0;s<n;s++)o[s]=r.charCodeAt(s);return o}function C(e){let r=e.split(",",2)[1];return Ee(r)}async function Ve(e,r,n="utf8"){let o=await t("asset.readAsset",e,r);switch(n){case"utf8":return new TextDecoder().decode(C(o));case"dataurl":return o}}var g={};d(g,{batchDel:()=>et,batchGet:()=>_e,batchSet:()=>qe,del:()=>$e,get:()=>ze,listFunctions:()=>ot,query:()=>tt,queryDelete:()=>rt,set:()=>Oe});function Oe(e,r){return t("datastore.set",e,r)}function qe(e){return t("datastore.batchSet",e)}function ze(e){return t("datastore.get",e)}function _e(e){return t("datastore.batchGet",e)}function $e(e){return t("datastore.delete",e)}function et(e){return t("datastore.batchDelete",e)}function tt(e,r={}){return t("datastore.query",e,r)}function rt(e,r){return t("datastore.queryDelete",e,r)}function ot(){return t("datastore.listFunctions")}async function x(){let e=await l.listPages(),n=(await g.query({type:"link"})).filter(i=>i.value.tag==="link"&&i.value.toPage?.trim()).map(i=>({source:i.value.page,target:i.value.toPage})),s={nodes:e.map(i=>({id:i.name,title:i.name,tags:i.tags||[],created:i.created,lastModified:i.lastModified})),links:n};console.log("Generated graph data:",JSON.stringify(s,null,2)),await g.set(["graph","main"],s),console.log("Graph saved to datastore:",s),await a.flashNotification("Graph saved to datastore!")}async function P(){await g.del(["graph","main"]),await a.flashNotification("Graph data cleared from datastore!")}async function I(e,r){let n=await g.get(["graph","main"]);return n?{html:'<div id="graph-container" style="width: 100%; height: 500px; border: 1px solid #ccc;"></div>',script:`
      loadJsByUrl("https://d3js.org/d3.v7.min.js").then(() => {
        ${await m.readAsset("graph","assets/graph_widget.js")}
        renderGraph(${JSON.stringify(n)});
      });
    `}:{html:"<div>Graph data not found in datastore. Please save a graph first!</div>"}}async function A(){await a.flashNotification("Hello world!")}var v={saveGraph:x,clearGraphData:P,graphWidget:I,hello:A},b={name:"graph",version:.1,imports:["https://get.silverbullet.md/global.plug.json"],assets:{"assets/graph_widget.js":{data:"data:application/javascript;base64,ZnVuY3Rpb24gcmVuZGVyR3JhcGgoZ3JhcGhEYXRhKSB7CiAgY29uc3Qgd2lkdGggPSA2MDAsIGhlaWdodCA9IDQwMDsKCiAgLy8gQ3JlYSBsJ1NWRwogIGNvbnN0IHN2ZyA9IGQzLnNlbGVjdCgiI2dyYXBoLWNvbnRhaW5lciIpCiAgICAuYXBwZW5kKCJzdmciKQogICAgLmF0dHIoIndpZHRoIiwgd2lkdGgpCiAgICAuYXR0cigiaGVpZ2h0IiwgaGVpZ2h0KTsKCiAgLy8gU2ltdWxhemlvbmUgZGkgbGF5b3V0CiAgY29uc3Qgc2ltdWxhdGlvbiA9IGQzLmZvcmNlU2ltdWxhdGlvbihncmFwaERhdGEubm9kZXMpCiAgICAuZm9yY2UoImxpbmsiLCBkMy5mb3JjZUxpbmsoZ3JhcGhEYXRhLmxpbmtzKS5pZCgoZCkgPT4gZC5pZCkuZGlzdGFuY2UoMTAwKSkKICAgIC5mb3JjZSgiY2hhcmdlIiwgZDMuZm9yY2VNYW55Qm9keSgpLnN0cmVuZ3RoKC0zMDApKQogICAgLmZvcmNlKCJjZW50ZXIiLCBkMy5mb3JjZUNlbnRlcih3aWR0aCAvIDIsIGhlaWdodCAvIDIpKTsKCiAgLy8gRGlzZWduYSBpIGxpbmsKICBjb25zdCBsaW5rID0gc3ZnLmFwcGVuZCgiZyIpCiAgICAuc2VsZWN0QWxsKCJsaW5lIikKICAgIC5kYXRhKGdyYXBoRGF0YS5saW5rcykKICAgIC5qb2luKCJsaW5lIikKICAgIC5hdHRyKCJzdHJva2UiLCAiIzk5OSIpCiAgICAuYXR0cigic3Ryb2tlLXdpZHRoIiwgMik7CgogIC8vIERpc2VnbmEgaSBub2RpCiAgY29uc3Qgbm9kZSA9IHN2Zy5hcHBlbmQoImciKQogICAgLnNlbGVjdEFsbCgiY2lyY2xlIikKICAgIC5kYXRhKGdyYXBoRGF0YS5ub2RlcykKICAgIC5qb2luKCJjaXJjbGUiKQogICAgLmF0dHIoInIiLCAxMCkKICAgIC5hdHRyKCJmaWxsIiwgKGQpID0+IGQuZ3JvdXAgPT09IDEgPyAiYmx1ZSIgOiAiZ3JlZW4iKQogICAgLmNhbGwoCiAgICAgIGQzLmRyYWcoKQogICAgICAgIC5vbigic3RhcnQiLCAoZXZlbnQsIGQpID0+IHsKICAgICAgICAgIGlmICghZXZlbnQuYWN0aXZlKSBzaW11bGF0aW9uLmFscGhhVGFyZ2V0KDAuMykucmVzdGFydCgpOwogICAgICAgICAgZC5meCA9IGQueDsKICAgICAgICAgIGQuZnkgPSBkLnk7CiAgICAgICAgfSkKICAgICAgICAub24oImRyYWciLCAoZXZlbnQsIGQpID0+IHsKICAgICAgICAgIGQuZnggPSBldmVudC54OwogICAgICAgICAgZC5meSA9IGV2ZW50Lnk7CiAgICAgICAgfSkKICAgICAgICAub24oImVuZCIsIChldmVudCwgZCkgPT4gewogICAgICAgICAgaWYgKCFldmVudC5hY3RpdmUpIHNpbXVsYXRpb24uYWxwaGFUYXJnZXQoMCk7CiAgICAgICAgICBkLmZ4ID0gbnVsbDsKICAgICAgICAgIGQuZnkgPSBudWxsOwogICAgICAgIH0pLAogICAgKTsKCiAgLy8gQWdnaW9ybmEgcG9zaXppb25pCiAgc2ltdWxhdGlvbi5vbigidGljayIsICgpID0+IHsKICAgIGxpbmsKICAgICAgLmF0dHIoIngxIiwgKGQpID0+IGQuc291cmNlLngpCiAgICAgIC5hdHRyKCJ5MSIsIChkKSA9PiBkLnNvdXJjZS55KQogICAgICAuYXR0cigieDIiLCAoZCkgPT4gZC50YXJnZXQueCkKICAgICAgLmF0dHIoInkyIiwgKGQpID0+IGQudGFyZ2V0LnkpOwoKICAgIG5vZGUKICAgICAgLmF0dHIoImN4IiwgKGQpID0+IGQueCkKICAgICAgLmF0dHIoImN5IiwgKGQpID0+IGQueSk7CiAgfSk7Cn0K",mtime:1732056440682}},functions:{saveGraph:{path:"graph.ts:saveGraph",command:{name:"Save Graph"}},clearGraphData:{path:"graph.ts:clearGraphData",command:{name:"Clear Graph Data"}},graphWidget:{path:"graph.ts:widget",codeWidget:"graph"},hello:{path:"hello.ts:hello",command:{name:"hello"}}}},Yt={manifest:b,functionMapping:v};y(v,b);export{Yt as plug};
