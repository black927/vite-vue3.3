import{d as s,a as m,u as c,x as d,o as i,k as _,i as o,W as n}from"./index-d1f6f85b.js";import{I as f}from"./index.es-f3f8a0f4.js";import{u as g}from"./user-68ae85c9.js";const b=s({name:"UserLabel"}),B=s({...b,setup(I){const t=m(),{destroyApp:u,bus:p}=n,e=g(),r={groupId:e.groupId,brandId:e.brandId,brandName:e.brandName,token:e.token,parentName:"comm",url:e.env.abTestUrl,redirectUrl:"/app-manage"};console.log("AB实验props：",r);const l=c();return p.$on("__AB_TEST_ENTER_EXP",a=>{console.log(a.appId),l.push("/experiment-manage-layer")}),d(()=>{u("app-manage")}),(a,k)=>(i(),_(o(n),{ref_key:"wujieVueRef",ref:t,width:"100%",height:"100%",name:"app-manage",url:r.url,props:r,plugins:[o(f)()]},null,8,["url","plugins"]))}});export{B as default};
//# sourceMappingURL=app-manage-6fc089ab.js.map
