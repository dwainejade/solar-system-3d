if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,i)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let n={};const c=e=>a(e,r),o={module:{uri:r},exports:n,require:c};s[r]=Promise.all(t.map((e=>o[e]||c(e)))).then((e=>(i(...e),n)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/solar-system-interactive/_next/static/chunks/0f8af13e.65e9f70631afb4e4.js",revision:"65e9f70631afb4e4"},{url:"/solar-system-interactive/_next/static/chunks/122-d7053d31acc11de2.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/190-e753b18cef0152c5.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/231-7ffc4c5a62e4069d.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/264-b6c2e8a08f19f8cc.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/610.04419856ad100465.js",revision:"04419856ad100465"},{url:"/solar-system-interactive/_next/static/chunks/974-72d06db2c05c95a0.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/a3cd4a83-48632266db391fbd.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/app/_not-found/page-390ee65fff7d62e4.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/app/experiments/page-5424757185398953.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/app/explore/page-1b47ad5968089c87.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/app/layout-642bb26ac050ce4d.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/app/main/page-f7ef1f822d4441d9.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/app/page-3c83c7992dce97c4.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/app/scene-one/page-b21b6aecd83e0e87.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/app/scene-two/page-c7be29d07e007bbf.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/b536a0f1-3001e411565d7032.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/fd9d1056-e072cc15a15e6133.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/framework-ecc7c29b98f29b59.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/main-5d82afe7033f6a80.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/main-app-c62ad81821e396ac.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/solar-system-interactive/_next/static/chunks/webpack-626ff66791161709.js",revision:"rlNhXUCzOlznA6vT9_G3Z"},{url:"/solar-system-interactive/_next/static/css/df84f87bce2a4811.css",revision:"df84f87bce2a4811"},{url:"/solar-system-interactive/_next/static/media/FranklinGothic_URW_Medium.148dd2bd.ttf",revision:"148dd2bd"},{url:"/solar-system-interactive/_next/static/media/Termina_Black.beb33c5e.ttf",revision:"beb33c5e"},{url:"/solar-system-interactive/_next/static/media/bottom_menu_bg.f7bc4000.png",revision:"f7bc4000"},{url:"/solar-system-interactive/_next/static/media/chevron.95677471.svg",revision:"95677471"},{url:"/solar-system-interactive/_next/static/media/dialog_box_bg.df9054f1.png",revision:"df9054f1"},{url:"/solar-system-interactive/_next/static/media/fullscreen_icon.3cdc90aa.svg",revision:"3cdc90aa"},{url:"/solar-system-interactive/_next/static/media/reset_icon.95eee989.svg",revision:"95eee989"},{url:"/solar-system-interactive/_next/static/media/side_panel_bg.a8f6e93a.png",revision:"a8f6e93a"},{url:"/solar-system-interactive/_next/static/rlNhXUCzOlznA6vT9_G3Z/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/solar-system-interactive/_next/static/rlNhXUCzOlznA6vT9_G3Z/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/solar-system-interactive/assets/earth/earth_clouds.jpg",revision:"3970b5d37c20a2ba460123c0d4b827a1"},{url:"/solar-system-interactive/assets/earth/earth_daymap.jpg",revision:"6a762d2461623d86276a64c2d25d56d5"},{url:"/solar-system-interactive/assets/earth/earth_nightmap.jpg",revision:"758335c67969541cb8eef5d35f31b78c"},{url:"/solar-system-interactive/assets/earth/earth_normal_map.png",revision:"606bc74e4c823b844f128739bd86c06c"},{url:"/solar-system-interactive/assets/earth/earth_specular_map.png",revision:"4065568e3f165816c11020512e912587"},{url:"/solar-system-interactive/assets/earth/moon/moon.jpg",revision:"1d2baa0e3c50c12e7cc080e723c9be87"},{url:"/solar-system-interactive/assets/fonts/FranklinGothic_URW_Medium.ttf",revision:"d84c363ebb2455bd1e7177498f773ae6"},{url:"/solar-system-interactive/assets/fonts/Termina_Black.ttf",revision:"d624c83a8ade36414750fd894533f016"},{url:"/solar-system-interactive/assets/fonts/Termina_Heavy.ttf",revision:"2bc69e26f4f0e89f27bac83c8a69a591"},{url:"/solar-system-interactive/assets/jupiter/jupiter.jpg",revision:"2f417da575f998b7813a2c475eaf470e"},{url:"/solar-system-interactive/assets/mars/mars.jpg",revision:"56f226a559fd3807a5aab2e2efab8e24"},{url:"/solar-system-interactive/assets/mercury/mercury.jpg",revision:"9854af69ba4f7e622cb913a2639e9862"},{url:"/solar-system-interactive/assets/models/satellite/scene.bin",revision:"72e9ed652fc54531fe862e5c3c28154f"},{url:"/solar-system-interactive/assets/models/satellite/scene.gltf",revision:"18b6db4c8f6a4d5c22d8ac71b9b7984a"},{url:"/solar-system-interactive/assets/models/satellite/textures/initialShadingGroup_baseColor.png",revision:"96e8e4c239c1dc16909b98904d9df817"},{url:"/solar-system-interactive/assets/models/satellite/textures/initialShadingGroup_metallicRoughness.png",revision:"a094d4bfaf5a485c6ad184f20f5581b1"},{url:"/solar-system-interactive/assets/models/satellite/textures/initialShadingGroup_specularf0.png",revision:"a4c2302c73bc5486935fa94e2483b847"},{url:"/solar-system-interactive/assets/neptune/neptune.jpg",revision:"18b4863b8e9bb79ebcff1938a2792c7e"},{url:"/solar-system-interactive/assets/pluto/pluto.jpg",revision:"92af301d5dafb1e962997235eca320ae"},{url:"/solar-system-interactive/assets/saturn/saturn-rings.png",revision:"8d0d9f3061f2596e75686838eb712486"},{url:"/solar-system-interactive/assets/saturn/saturn.jpg",revision:"b49ef63a16912a2c91661c40816b4ac5"},{url:"/solar-system-interactive/assets/stars/2k_stars.jpg",revision:"518b5d069913f4a71f1476af17d981b3"},{url:"/solar-system-interactive/assets/stars/2k_stars_milky_way.jpg",revision:"8c656f09a019ef12031a6620356ee7d4"},{url:"/solar-system-interactive/assets/stars/constellations-cube-map/nx.png",revision:"a9fb2358a23151010fd755732b4b3056"},{url:"/solar-system-interactive/assets/stars/constellations-cube-map/ny.png",revision:"58c48019a39911095fdd873ab69434b4"},{url:"/solar-system-interactive/assets/stars/constellations-cube-map/nz.png",revision:"d42015454a5684600219d34ac979eff4"},{url:"/solar-system-interactive/assets/stars/constellations-cube-map/px.png",revision:"c51fee7b77e2cd6fb8be56926eb0214e"},{url:"/solar-system-interactive/assets/stars/constellations-cube-map/py.png",revision:"d0eb4fa3301a8cdc1daaa9ea28ce0642"},{url:"/solar-system-interactive/assets/stars/constellations-cube-map/pz.png",revision:"0e7416cfccb0de3bf42dac161a30fd18"},{url:"/solar-system-interactive/assets/stars/constellations.png",revision:"e080136c10ff7353867f58b93fafcc1a"},{url:"/solar-system-interactive/assets/stars/starmap_8k.png",revision:"6c144ec4b72792b2a9a3805e06b3938e"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/high-res/nx.png",revision:"605747957ee456fa335248d18c275a1c"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/high-res/ny.png",revision:"075fa0da77cda3f95a26991c99491196"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/high-res/nz.png",revision:"be68e52ead21873f55f467f88a4225f0"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/high-res/px.png",revision:"43d32659226d4ad835aa8c2f8f2a3e1d"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/high-res/py.png",revision:"a0e01031ef510a743032c197264c8868"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/high-res/pz.png",revision:"c3322a902a071c3956d286b505239819"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/nx.png",revision:"0253dfb110493ddc88a1b65ade8c1d8c"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/ny.png",revision:"5f1942a96e569f73c70c02ee81d8b139"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/nz.png",revision:"282fb5477a76a64dff50f194306a0f00"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/px.png",revision:"18ae04f2ca1889a426b88bbb9d57ed1b"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/py.png",revision:"277bb129e24a9d4274ac5c341b01b8b9"},{url:"/solar-system-interactive/assets/stars/stars-cube-map/pz.png",revision:"005fff83b3493c2a56ffcd282955799f"},{url:"/solar-system-interactive/assets/sun/sun.jpg",revision:"013c53a32e3869d980ead3fcc9035a38"},{url:"/solar-system-interactive/assets/ui/bottom_menu_bg.png",revision:"bfc310bfb08e0d023bf69ad0686b7c8b"},{url:"/solar-system-interactive/assets/ui/bottom_menu_bg.svg",revision:"dcc024d1ee11dae06fc8f1e27c93ab91"},{url:"/solar-system-interactive/assets/ui/dialog_box_bg.png",revision:"ab5139af6898073d4342fac41e1e477a"},{url:"/solar-system-interactive/assets/ui/dialog_box_bg.svg",revision:"128bbf9ed9f88d981ff466444b5f674b"},{url:"/solar-system-interactive/assets/ui/icons/chevron.svg",revision:"d8462695f972f57aea5b7cf5bc8ce851"},{url:"/solar-system-interactive/assets/ui/icons/earth-icon.png",revision:"a7b260f23a593de67daaf6f776e816e5"},{url:"/solar-system-interactive/assets/ui/icons/fullscreen_icon.svg",revision:"e9131fd6296f7b4d6690f4da0612c513"},{url:"/solar-system-interactive/assets/ui/icons/jupiter-icon.png",revision:"000b4bd5775a6d3afbae8eb325c9d176"},{url:"/solar-system-interactive/assets/ui/icons/mars-icon.png",revision:"1fc51852771151d565e9b163fa0822dd"},{url:"/solar-system-interactive/assets/ui/icons/mercury-icon.png",revision:"2a6a062539d4e9f9e2848674bb18f4fc"},{url:"/solar-system-interactive/assets/ui/icons/neptune-icon.png",revision:"6d1d6bb1cb62e51347e0f4db2f91f24f"},{url:"/solar-system-interactive/assets/ui/icons/orbit_icon.svg",revision:"b07319797b9e09ab366a09518238d6c8"},{url:"/solar-system-interactive/assets/ui/icons/reset_icon.svg",revision:"9ebb31b49ed820d66525192b0ad21cfe"},{url:"/solar-system-interactive/assets/ui/icons/saturn-icon.png",revision:"05a8d7837d5f0e8b866b97e085899819"},{url:"/solar-system-interactive/assets/ui/icons/uranus-icon.png",revision:"c901fd80f101c27ffe4039033ff4274e"},{url:"/solar-system-interactive/assets/ui/icons/venus-icon.png",revision:"7bedd860d4278cf69f59d792b0ae3a58"},{url:"/solar-system-interactive/assets/ui/icons/warning_icon.png",revision:"23032eef0a494f26140be1106c391bd1"},{url:"/solar-system-interactive/assets/ui/icons/warning_icon.svg",revision:"baee4c08fb2ccfea7d193d1475d2febd"},{url:"/solar-system-interactive/assets/ui/side_panel_bg.png",revision:"270f2865eda075238c086ffa627dd70d"},{url:"/solar-system-interactive/assets/ui/side_panel_bg.svg",revision:"9f1ff13f070c35ee73918a282975f169"},{url:"/solar-system-interactive/assets/uranus/uranus-rings.png",revision:"9f94e815856e7c3e6d61a93673eb6f1c"},{url:"/solar-system-interactive/assets/uranus/uranus.jpg",revision:"fcda14db4ede2bd85c637d31fb2b32cb"},{url:"/solar-system-interactive/assets/venus/venus_atmosphere.jpg",revision:"efb8b2c1384aee65f3ceeaa18b93cbce"},{url:"/solar-system-interactive/assets/venus/venus_surface.jpg",revision:"34a252e4162584d1a182666bce5654b9"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/solar-system-interactive",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
