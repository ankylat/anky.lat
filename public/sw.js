if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>d[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/RL3rmE1lMFkav1LZ5-9NX/_buildManifest.js",revision:"a7b439fb2f2c6c47eb50a8b4e1c3811b"},{url:"/_next/static/RL3rmE1lMFkav1LZ5-9NX/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1119.d2d26e806c02bd5e.js",revision:"d2d26e806c02bd5e"},{url:"/_next/static/chunks/1163.ca2d12c1485b7ba4.js",revision:"ca2d12c1485b7ba4"},{url:"/_next/static/chunks/1170.507b5ead6dd74a53.js",revision:"507b5ead6dd74a53"},{url:"/_next/static/chunks/122.42d14c81f11520fc.js",revision:"42d14c81f11520fc"},{url:"/_next/static/chunks/1330.07939092726433ce.js",revision:"07939092726433ce"},{url:"/_next/static/chunks/1354.cff710111fd2ed9c.js",revision:"cff710111fd2ed9c"},{url:"/_next/static/chunks/1373.9a5b9265dc911575.js",revision:"9a5b9265dc911575"},{url:"/_next/static/chunks/1675.74796221b5000bd6.js",revision:"74796221b5000bd6"},{url:"/_next/static/chunks/1960.a6b55fa0fb19ebbc.js",revision:"a6b55fa0fb19ebbc"},{url:"/_next/static/chunks/2038.b25af7754ed0d58a.js",revision:"b25af7754ed0d58a"},{url:"/_next/static/chunks/2068.361958e85cc943dd.js",revision:"361958e85cc943dd"},{url:"/_next/static/chunks/215.107d70f4dc257ca6.js",revision:"107d70f4dc257ca6"},{url:"/_next/static/chunks/2264.ed3e42228eedf80b.js",revision:"ed3e42228eedf80b"},{url:"/_next/static/chunks/2306.e3400b9ae3019343.js",revision:"e3400b9ae3019343"},{url:"/_next/static/chunks/2328.6118322762883c04.js",revision:"6118322762883c04"},{url:"/_next/static/chunks/2345.e3dea2a82f19fbb4.js",revision:"e3dea2a82f19fbb4"},{url:"/_next/static/chunks/2480.2dc8c88f57ce68e9.js",revision:"2dc8c88f57ce68e9"},{url:"/_next/static/chunks/2484.42c8cdc6fcc195ec.js",revision:"42c8cdc6fcc195ec"},{url:"/_next/static/chunks/2532.40b0c27be5b242df.js",revision:"40b0c27be5b242df"},{url:"/_next/static/chunks/2610.b1d3457c33240875.js",revision:"b1d3457c33240875"},{url:"/_next/static/chunks/2656.572c61d2392c3658.js",revision:"572c61d2392c3658"},{url:"/_next/static/chunks/2692.6e16f73c3f8ec563.js",revision:"6e16f73c3f8ec563"},{url:"/_next/static/chunks/2738.2f301c9017d67fda.js",revision:"2f301c9017d67fda"},{url:"/_next/static/chunks/2785.64ecc2e28c2642f4.js",revision:"64ecc2e28c2642f4"},{url:"/_next/static/chunks/2822.f68093acf978ebcc.js",revision:"f68093acf978ebcc"},{url:"/_next/static/chunks/2876.1a04a3b4c6aacf36.js",revision:"1a04a3b4c6aacf36"},{url:"/_next/static/chunks/3028.534a66ceaa897ba7.js",revision:"534a66ceaa897ba7"},{url:"/_next/static/chunks/3046.700a8962f8268dce.js",revision:"700a8962f8268dce"},{url:"/_next/static/chunks/3199.4029b01edd9cacd7.js",revision:"4029b01edd9cacd7"},{url:"/_next/static/chunks/3222.307c6233930e5dc4.js",revision:"307c6233930e5dc4"},{url:"/_next/static/chunks/337d5454.4d725475f7f21868.js",revision:"4d725475f7f21868"},{url:"/_next/static/chunks/3565.fb5464bf14b9a14e.js",revision:"fb5464bf14b9a14e"},{url:"/_next/static/chunks/3736.398174a4aafbeb3d.js",revision:"398174a4aafbeb3d"},{url:"/_next/static/chunks/3792.dfb3265844df1f74.js",revision:"dfb3265844df1f74"},{url:"/_next/static/chunks/3794.71bc0d9023039cde.js",revision:"71bc0d9023039cde"},{url:"/_next/static/chunks/3c81fcac-9e60eab947720a46.js",revision:"9e60eab947720a46"},{url:"/_next/static/chunks/4020.bbab91628710a70b.js",revision:"bbab91628710a70b"},{url:"/_next/static/chunks/4235.08fb27f4e11f681e.js",revision:"08fb27f4e11f681e"},{url:"/_next/static/chunks/4247.4043c6e5bac6b5be.js",revision:"4043c6e5bac6b5be"},{url:"/_next/static/chunks/4345.70e435092536343e.js",revision:"70e435092536343e"},{url:"/_next/static/chunks/44.96d1e066598b98a5.js",revision:"96d1e066598b98a5"},{url:"/_next/static/chunks/4480.9617da1086ba2d20.js",revision:"9617da1086ba2d20"},{url:"/_next/static/chunks/4506.bfe29b5281fd9412.js",revision:"bfe29b5281fd9412"},{url:"/_next/static/chunks/4574.3e0e15c8051c0e4c.js",revision:"3e0e15c8051c0e4c"},{url:"/_next/static/chunks/4830.b9de851214fd02b2.js",revision:"b9de851214fd02b2"},{url:"/_next/static/chunks/485.9ba369862557d04d.js",revision:"9ba369862557d04d"},{url:"/_next/static/chunks/5149.bb04f2db81edbd3d.js",revision:"bb04f2db81edbd3d"},{url:"/_next/static/chunks/5236.07e838469b8d259e.js",revision:"07e838469b8d259e"},{url:"/_next/static/chunks/5400.92b89f867b9ea0d5.js",revision:"92b89f867b9ea0d5"},{url:"/_next/static/chunks/5675-cf9fdf66523d0bd2.js",revision:"cf9fdf66523d0bd2"},{url:"/_next/static/chunks/57.627046c8ee3a3cd5.js",revision:"627046c8ee3a3cd5"},{url:"/_next/static/chunks/573.81409d01907f95d8.js",revision:"81409d01907f95d8"},{url:"/_next/static/chunks/5811.19e26c00231804ac.js",revision:"19e26c00231804ac"},{url:"/_next/static/chunks/5844.63a6ac415b6256cd.js",revision:"63a6ac415b6256cd"},{url:"/_next/static/chunks/5861.742cb479f9aa7595.js",revision:"742cb479f9aa7595"},{url:"/_next/static/chunks/6044.26afc2a3dd2bef95.js",revision:"26afc2a3dd2bef95"},{url:"/_next/static/chunks/6163.e543d7bce9655717.js",revision:"e543d7bce9655717"},{url:"/_next/static/chunks/6164.c16a1412c44063ff.js",revision:"c16a1412c44063ff"},{url:"/_next/static/chunks/619.58250cf94040e417.js",revision:"58250cf94040e417"},{url:"/_next/static/chunks/6327.539e50dfc42182b6.js",revision:"539e50dfc42182b6"},{url:"/_next/static/chunks/6499.615841166f0f6b8b.js",revision:"615841166f0f6b8b"},{url:"/_next/static/chunks/6942.c08085427c39966c.js",revision:"c08085427c39966c"},{url:"/_next/static/chunks/7059.585cca5d527b1a81.js",revision:"585cca5d527b1a81"},{url:"/_next/static/chunks/7104.1aecdb310d01918f.js",revision:"1aecdb310d01918f"},{url:"/_next/static/chunks/7571.e53d385f5d0a9c65.js",revision:"e53d385f5d0a9c65"},{url:"/_next/static/chunks/7652.8c2df55e68488cf7.js",revision:"8c2df55e68488cf7"},{url:"/_next/static/chunks/7710.b4bbae577c1da720.js",revision:"b4bbae577c1da720"},{url:"/_next/static/chunks/7741.92597ce357632a49.js",revision:"92597ce357632a49"},{url:"/_next/static/chunks/7891.dc7891aa6add1107.js",revision:"dc7891aa6add1107"},{url:"/_next/static/chunks/8055.07f6f7a9a92781c0.js",revision:"07f6f7a9a92781c0"},{url:"/_next/static/chunks/8110.a315ece2430152e5.js",revision:"a315ece2430152e5"},{url:"/_next/static/chunks/8129.f655b67e0be5c4d6.js",revision:"f655b67e0be5c4d6"},{url:"/_next/static/chunks/8428.c89593fd1dd06d41.js",revision:"c89593fd1dd06d41"},{url:"/_next/static/chunks/8692.eff3012aa9291525.js",revision:"eff3012aa9291525"},{url:"/_next/static/chunks/8777.049cc6d93d6c5f29.js",revision:"049cc6d93d6c5f29"},{url:"/_next/static/chunks/8786.5ec8059d52f350ab.js",revision:"5ec8059d52f350ab"},{url:"/_next/static/chunks/8872.2379f2b412598a8a.js",revision:"2379f2b412598a8a"},{url:"/_next/static/chunks/925.9dbed5879d445b44.js",revision:"9dbed5879d445b44"},{url:"/_next/static/chunks/9343.d9582edbc6478448.js",revision:"d9582edbc6478448"},{url:"/_next/static/chunks/9498.608eb76d07e32139.js",revision:"608eb76d07e32139"},{url:"/_next/static/chunks/9695.bc574f43a6c7f86a.js",revision:"bc574f43a6c7f86a"},{url:"/_next/static/chunks/970-c05cba2f9fb74330.js",revision:"c05cba2f9fb74330"},{url:"/_next/static/chunks/9796.788674f8a4c358dc.js",revision:"788674f8a4c358dc"},{url:"/_next/static/chunks/9920.f3de60ad28ebe100.js",revision:"f3de60ad28ebe100"},{url:"/_next/static/chunks/c894814f-19a05284824bd5e5.js",revision:"19a05284824bd5e5"},{url:"/_next/static/chunks/fb7d5399.3940acc9ac8268a7.js",revision:"3940acc9ac8268a7"},{url:"/_next/static/chunks/framework-2645a99191cfc5e9.js",revision:"2645a99191cfc5e9"},{url:"/_next/static/chunks/main-b5164a0c7b438ada.js",revision:"b5164a0c7b438ada"},{url:"/_next/static/chunks/pages/_error-82b79221b9ed784b.js",revision:"82b79221b9ed784b"},{url:"/_next/static/chunks/pages/index-286431c0d1711775.js",revision:"286431c0d1711775"},{url:"/_next/static/chunks/pages/prevIndex-721d8d77387992b0.js",revision:"721d8d77387992b0"},{url:"/_next/static/chunks/pages/profile-b983f691addf9d96.js",revision:"b983f691addf9d96"},{url:"/_next/static/chunks/pages/read/%5Bid%5D-e63a77407b76f8ff.js",revision:"e63a77407b76f8ff"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-daec21a27b12270f.js",revision:"daec21a27b12270f"},{url:"/_next/static/css/6aaa4fa06f977cba.css",revision:"6aaa4fa06f977cba"},{url:"/_next/static/css/ab1eb4a9efeeef4e.css",revision:"ab1eb4a9efeeef4e"},{url:"/_next/static/media/f6ffe4459c1daa33-s.woff2",revision:"1d39e32df99ce4e3b86fe6f63dc00105"},{url:"/_next/static/media/f769c49a4b8c1350-s.p.woff2",revision:"b6b23332a828909942c545fe2d987946"},{url:"/ankys/1.png",revision:"78ae24f951730799ab26f2187ce7f918"},{url:"/ankys/2.png",revision:"5c2d4fa5f70b1408bb5e786780d4dc00"},{url:"/ankys/3.png",revision:"4bb2c038f802798bca088cedcdf1b177"},{url:"/ankys/4.png",revision:"b5142f9eff2fd86def0a081ec739a87d"},{url:"/ankys/5.png",revision:"1583aa6a4047078998fb4d05686841a8"},{url:"/ankys/6.png",revision:"0e068657446e95ecf5bc79cecc4c1bc1"},{url:"/ankys/7.png",revision:"17025189327646a96d9eede76cb321c0"},{url:"/ankys/8.png",revision:"67a4f66636d0b82afb091aa593d86c82"},{url:"/ankys/9.png",revision:"e818e0b711f89f4baef6ecc10bc8a7ea"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/images/mintbg.jpg",revision:"d0d99ba97c0df9b508ec2ee9cb462fb9"},{url:"/images/touch/homescreen144.png",revision:"e6224568643a18448b9d6122ae9a1e84"},{url:"/images/touch/homescreen168.png",revision:"cdaf59823c90fc8435c8e392f29cf7d7"},{url:"/images/touch/homescreen192.png",revision:"1aca13633491e482beb5b35a28942fc3"},{url:"/images/touch/homescreen48.png",revision:"fd6cd560d705f0ecc26f8df3156bc03f"},{url:"/images/touch/homescreen72.png",revision:"4428b5aa8c815e15951db3de035d3f4b"},{url:"/images/touch/homescreen96.png",revision:"798935a03ba78190ad3475028aa2e6ec"},{url:"/manifest.json",revision:"36426bea9d41f755d25fa444a2c97c98"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
