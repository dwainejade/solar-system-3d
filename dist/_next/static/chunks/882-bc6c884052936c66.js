(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[882],{625:function(e,a,t){"use strict";var i=t(7437),n=t(2265),r=t(15),s=t(8384),l=t(7871),o=t(7776),c=t(8942),d=t(878),u=t(4510);let m=(0,n.forwardRef)((e,a)=>{let{moonData:t}=e,{simSpeed:m,orbitPaths:b,setSimSpeed:h}=(0,s.ZP)(),{selectedPlanet:p,selectedMoon:g,setSelectedMoon:x,setSelectedPlanet:v}=(0,s.d2)(),{satelliteCamera:P,toggleSatelliteCamera:f}=(0,s.g5)(),j=a||(0,n.useRef)(),y=(0,n.useRef)(0),S=(0,l.m)({Moon:"../assets/earth/moon/2k_moon.jpg"}),{name:M,orbitalRadius:C,radius:w,color:R,orbitalPeriod:F,orbitalInclination:I}=t,N=g&&g.name===M,k=w*c.sh,T=C*c.H_,E=(0,n.useMemo)(()=>2*Math.PI/(86400*F),[F]);return(0,n.useEffect)(()=>{y.current=2*Math.random()*Math.PI},[]),(0,r.A)((e,a)=>{y.current-=E*m*a;let t=y.current,i=Math.PI/180*I;j.current&&(j.current.position.set(Math.cos(t)*T,Math.sin(t)*Math.sin(i)*T,Math.sin(t)*T),j.current.lookAt(new o.Vector3(0,0,0)))}),(0,i.jsxs)("group",{children:[N&&j.current&&(0,i.jsx)(u.Z,{target:j.current,color:R,size:k,satelliteCamera:P,toggleSatelliteCamera:f}),(0,i.jsxs)("mesh",{ref:j,children:[(0,i.jsx)("sphereGeometry",{args:[k,32,16]}),(0,i.jsx)("meshStandardMaterial",{metalness:.9,roughness:.65,map:S[M]||null,zIndexRange:[99]})]}),b&&(0,i.jsx)("group",{position:[0,0,0],children:(0,i.jsx)(d.Z,{origin:[0,0,0],radius:T,orbitalInclination:I,color:R,name:M+"-orbit-path"})})]})});a.Z=m},878:function(e,a,t){"use strict";var i=t(7437),n=t(2265),r=t(4851),s=t(7776);let l=(0,n.forwardRef)((e,a)=>{let{origin:t=new s.Vector3(0,0,0),radius:l=2,color:o="white",name:c="orbit-path",orbitalInclination:d,hiRes:u=!1}=e,m=Math.PI/180*d,b=(0,n.useMemo)(()=>{let e=[],a=u?Math.min(l/2,1e3):30;for(let t=0;t<2*Math.PI;t+=Math.PI/a){let a=l*Math.cos(t),i=Math.sin(m)*l*Math.sin(t),n=l*Math.sin(t);e.push(new s.Vector3(a,i,n))}return e},[t,l,u]);return(0,i.jsx)(r.x,{ref:a,points:b,color:o,lineWidth:.25})});a.Z=l},4510:function(e,a,t){"use strict";var i=t(7437),n=t(2265),r=t(15),s=t(5533),l=t(7776),o=t(8384);a.Z=e=>{let{target:a,size:t,satelliteCamera:c,toggleSatelliteCamera:d}=e,{toggleCameraTransitioning:u}=(0,o.g5)(),{prevSpeed:m,setSimSpeed:b}=(0,o.ZP)(),{camera:h,gl:p}=(0,r.z)(),g=(0,n.useRef)(),[x,v]=(0,n.useState)(!1),[P,f]=(0,n.useState)({x:0,y:0}),[j,y]=(0,n.useState)(new l.Spherical),S=(0,n.useCallback)(e=>{v(!0),f({x:e.clientX,y:e.clientY})},[]),M=(0,n.useCallback)(e=>{if(x){let a=e.clientX-P.x,t=e.clientY-P.y;y(e=>{let i=new l.Spherical(e.radius,e.phi-.003*t,e.theta-.003*a);return i.phi=Math.max(.1,Math.min(Math.PI-.1,i.phi)),i}),f({x:e.clientX,y:e.clientY})}},[x,P]),C=(0,n.useCallback)(()=>{v(!1)},[]),w=(0,n.useCallback)(e=>{let i=new l.Vector3().setFromSpherical(j).length(),n=new l.Vector3(a.position.x,a.position.y,a.position.z).distanceTo(h.position),r=-.8*e.deltaY,s=j.radius+-(Math.sign(r)*Math.min(Math.abs(r),3)*(i/n)*1);y(e=>new l.Spherical(Math.max(2.5*t,Math.min(500,s)),e.phi,e.theta))},[t,j,a.position]);return(0,n.useEffect)(()=>{let e=p.domElement,a=document.body;return e.addEventListener("mousedown",S),a.addEventListener("mousemove",M),a.addEventListener("mouseup",C),e.addEventListener("wheel",w),()=>{e.removeEventListener("mousedown",S),a.removeEventListener("mousemove",M),a.removeEventListener("mouseup",C),e.removeEventListener("wheel",w)}},[S,M,C,w,p.domElement]),(0,n.useEffect)(()=>()=>{c&&d(!1)},[c,d]),(0,r.A)(()=>{if(g.current&&a){let e=new l.Vector3().setFromSpherical(j);g.current.position.set(e.x+a.position.x,e.y+a.position.y,e.z+a.position.z),g.current.lookAt(a.position),g.current.updateMatrixWorld(),h.position.distanceTo(a.position)<=5*t&&!c&&(()=>{let e=new l.Vector3().subVectors(h.position,a.position),t=e.length(),i=Math.acos(e.y/t),n=Math.atan2(e.z,e.x);y(new l.Spherical(t,i,n)),d(!0),u(!1),b(m)})()}}),(0,i.jsx)(s.c,{ref:g,name:"satellite-camera",makeDefault:c,fov:50,near:t,far:1e5,enablePan:!0})}},3920:function(e,a,t){"use strict";var i=t(7437),n=t(2265),r=t(15),s=t(7776),l=t(8384);function o(e){let{texture:a,showConstellations:t}=e,{scene:i}=(0,r.z)();return(0,n.useEffect)(()=>{i.background=a},[t]),null}a.Z=()=>{let{showConstellations:e}=(0,l.ZP)(),a=new s.CubeTextureLoader,t=a.load(["../assets/stars/stars-cube-map/px.png","../assets/stars/stars-cube-map/nx.png","../assets/stars/stars-cube-map/py.png","../assets/stars/stars-cube-map/ny.png","../assets/stars/stars-cube-map/pz.png","../assets/stars/stars-cube-map/nz.png"]),n=a.load(["../assets/stars/constellations-cube-map/px.png","../assets/stars/constellations-cube-map/nx.png","../assets/stars/constellations-cube-map/py.png","../assets/stars/constellations-cube-map/ny.png","../assets/stars/constellations-cube-map/pz.png","../assets/stars/constellations-cube-map/nz.png"]);return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(o,{showConstellations:e,texture:e?n:t})})}},5375:function(e,a,t){"use strict";var i=t(7437),n=t(2265),r=t(8384),s=t(2079),l=t(2325);a.Z=e=>{let{position:a,resetCamera:t,textures:o}=e,[c,d]=(0,n.useState)(!1),u=(0,n.useRef)({x:0,y:0}),{selectedPlanet:m,setSelectedPlanet:b,displayLabels:h,planetsData:p}=(0,r.d2)(),g=p.Sun.radius*s.YB,x=e=>{e.stopPropagation(),c||(m&&"Sun"===m.name?(b(null),t()):b(p.Sun))},v=e=>{e.stopPropagation(),d(!1),u.current={x:e.clientX,y:e.clientY}},P=e=>{Math.sqrt(Math.pow(e.clientX-u.current.x,2)+Math.pow(e.clientY-u.current.y,2))>5&&d(!0)},f=e=>{d(!1)},j=e=>{e.stopPropagation(),document.body.style.cursor="pointer"},y=e=>{e.stopPropagation(),document.body.style.cursor="auto"};return(0,i.jsxs)("group",{children:[(0,i.jsxs)("mesh",{position:a,onClick:x,onPointerDown:v,onPointerMove:P,onPointerUp:f,onPointerOver:j,onPointerOut:y,children:[(0,i.jsx)("sphereGeometry",{args:[g,64,64]}),o?(0,i.jsx)("meshPhysicalMaterial",{map:o.map,color:[10,3,0],toneMapped:!1,zIndexRange:[99]}):(0,i.jsx)("meshBasicMaterial",{color:[10,3,0],toneMapped:!1})]}),h?(0,i.jsx)(l.V,{as:"div",center:!0,occlude:!0,"position-y":60,zIndexRange:[100,0],children:(0,i.jsx)("div",{className:"planet-label",style:{color:"rgb(255, 255, 0)"},onClick:x,onPointerDown:v,onPointerMove:P,onPointerUp:f,onPointerOver:j,onPointerOut:y,children:"Sun"})}):null]})}},3757:function(e,a,t){"use strict";t.d(a,{Z:function(){return x}});var i=t(7437),n=t(2265),r=t(3149),s=t(7581),l=t(2325),o=t(7140),c=t(8384),d=t(2079);let u=e=>(Math.sqrt(4*Math.PI**2*(1e3*e)**3/(d.G*d.Gw))/86400).toFixed(1),m=e=>d.G*d.Gw/(1e3*e)**2;var b=()=>{let{isEditing:e,setIsEditing:a}=(0,c.ZP)(),{selectedPlanet:t,updatePlanetData:r,planetsData:s,setSelectedPlanet:l,resetSinglePlanetData:o}=(0,c.d2)(),[d,b]=(0,n.useState)({}),[h,p]=(0,n.useState)(0);(0,n.useEffect)(()=>{t&&(b(s[t.name]||{}),p(m(t.orbitalRadius)))},[t,s,e]);let g=a=>i=>{let n="number"===i.target.type?Number(i.target.value):i.target.value,s={...d,[a]:n};if("orbitalRadius"===a){let e=u(n),a=m(n);s.orbitalPeriod=e,s.gravitationalAcceleration=a.toFixed(3)}b(s),e&&r(t.name,s)};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h2",{children:null==t?void 0:t.name}),d&&(0,i.jsxs)("div",{className:"planet-details ".concat(e?"editing":"saved"),children:[(0,i.jsxs)("div",{className:"item w1",children:[(0,i.jsx)("label",{htmlFor:"mass",children:"Mass:"}),(0,i.jsxs)("span",{children:[d.mass||""," kg"]})]}),(0,i.jsxs)("div",{className:"item w1",children:[(0,i.jsx)("label",{htmlFor:"radius",children:"Radius:"}),(0,i.jsxs)("span",{children:[d.radius||""," kg"]})]}),(0,i.jsxs)("div",{className:"item w2",children:[(0,i.jsx)("label",{htmlFor:"orbitalRadius",children:"Orbit Radius:"}),(0,i.jsx)("input",{type:"text",id:"orbitalRadius",value:d.orbitalRadius||"",onChange:g("orbitalRadius"),disabled:!e}),(0,i.jsx)("span",{children:"km"})]}),(0,i.jsxs)("div",{className:"item w2",children:[(0,i.jsx)("label",{htmlFor:"orbitalPeriod",children:"Orbital Period:"}),(0,i.jsxs)("span",{children:[d.orbitalPeriod||""," days"]})]}),(0,i.jsxs)("div",{className:"item w2",children:[(0,i.jsx)("label",{htmlFor:"rotationPeriod",children:"Day Length:"}),(0,i.jsx)("input",{type:"text",value:d.rotationPeriod||"",onChange:g("rotationPeriod"),disabled:!e}),(0,i.jsx)("span",{children:"hours"})]}),(0,i.jsxs)("div",{className:"item w4",children:[(0,i.jsx)("label",{htmlFor:"gravity",children:"Acceleration:"}),(0,i.jsxs)("span",{children:[d.gravitationalAcceleration||""," m/s\xb2"]})]}),(0,i.jsxs)("div",{className:"button-con",children:[(0,i.jsx)("button",{onClick:()=>{e&&(null==t?void 0:t.name)?(r(t.name,d),l({...t,...d}),a(!1)):a(!e)},className:"edit-planet-btn btn",children:e?"Save Values":"Adjust Values"}),(0,i.jsx)("button",{onClick:()=>{o(null==t?void 0:t.name)},className:"reset-planet-btn btn",children:"Reset Values"})]})]})]})},h=()=>{let{simSpeed:e,setSimSpeed:a,prevSpeed:t,fullscreen:r,toggleFullscreen:s,orbitPaths:l,toggleOrbitPaths:o}=(0,c.ZP)(),{selectedPlanet:d,setSelectedPlanet:u,displayLabels:m,toggleDisplayLabels:h,planetsData:p,resetPlanetsData:g}=(0,c.d2)(),{setTriggerReset:x,toggleSatelliteCamera:v,isCameraTransitioning:P}=(0,c.g5)(),[f,j]=(0,n.useState)(!1),y=()=>{x(!0)};return(0,i.jsxs)("div",{className:"menu-wrapper",children:[(0,i.jsx)("button",{className:"reset-all-btn btn",onClick:()=>{x(!0),g(),v(!1)}}),(0,i.jsx)("button",{className:"fullscreen-btn btn",onClick:()=>{s()}}),(0,i.jsxs)("div",{className:"bottom-menu ".concat(f?"open":"closed"),children:[(0,i.jsx)("button",{onClick:()=>{j(!f)},className:"menu-toggle-btn btn"}),(0,i.jsxs)("div",{className:"left-con",children:[(0,i.jsxs)("div",{className:"menu-item",children:[(0,i.jsx)("label",{htmlFor:"planetSelection",children:"Select a Planet"}),(0,i.jsxs)("select",{id:"planetSelection",onChange:e=>{let a=e.target.value;"reset-camera"===a?(y(),u(null)):u(p[a])},value:(null==d?void 0:d.name)||"Select a Planet",children:[(0,i.jsx)("option",{value:"reset-camera",children:"Solar System"}),Object.keys(p).map(e=>(0,i.jsx)("option",{value:e,children:e},e))]})]}),(0,i.jsxs)("div",{className:"menu-item",children:[(0,i.jsx)("label",{htmlFor:"simSpeedSelect",children:"Simulation Speed"}),(0,i.jsx)("select",{id:"simSpeedSelect",onChange:e=>{a(parseInt(e.target.value,10))},value:P?t:e,disabled:P,children:[{label:"-1 year /s",value:-31557600},{label:"-1 month /s",value:-2629800},{label:"-1 week /s",value:-604800},{label:"-1 day /s",value:-86400},{label:"-1 hour /s",value:-3600},{label:"-1 minute /s",value:-60},{label:"Realtime",value:1},{label:"1 minute /s",value:60},{label:"1 hour /s",value:3600},{label:"1 day /s",value:86400},{label:"1 week /s",value:604800},{label:"1 month /s",value:2629800},{label:"1 year /s",value:31557600}].map((e,a)=>(0,i.jsx)("option",{value:e.value,children:e.label},a))})]})]}),(0,i.jsx)("div",{className:"divider"}),(0,i.jsxs)("div",{className:"right-con",children:[(0,i.jsxs)("div",{className:"menu-item",children:[(0,i.jsx)("label",{htmlFor:"orbitPathToggle",children:"Orbit Paths"}),(0,i.jsxs)("div",{className:"switch",onClick:()=>o(!l),children:[(0,i.jsx)("input",{id:"orbitPathToggle",type:"checkbox",checked:l,onChange:()=>{},style:{display:"none"}}),(0,i.jsx)("div",{className:"slider round"})]})]}),(0,i.jsxs)("div",{className:"menu-item",children:[(0,i.jsx)("label",{htmlFor:"labelToggle",children:"Labels"}),(0,i.jsxs)("div",{className:"switch",onClick:()=>h(!m),children:[(0,i.jsx)("input",{id:"labelToggle",type:"checkbox",checked:m,onChange:()=>{},style:{display:"none"}}),(0,i.jsx)("div",{className:"slider round"})]})]})]})]}),(0,i.jsx)("div",{className:"side-menu ".concat(d?"open":"closed"),children:(0,i.jsx)("div",{className:"side-menu-inner",children:(0,i.jsx)(b,{})})})]})},p=t(3631),g=t(8864);t(6901);var x=e=>{let{children:a}=e,{fullscreen:t}=(0,c.ZP)(),{planetAngles:d,updatePlanetPosition:u,selectedPlanet:m,setSelectedPlanet:b,displayLabels:x}=(0,c.d2)(),{errors:v,loaded:P}=(0,s.S)(),f=P/12*100;return(0,n.useEffect)(()=>{v.length&&console.warn(v)},[v]),(0,i.jsxs)("div",{className:"Main ".concat(t?"fullscreen":"minimized"),children:[(0,i.jsxs)(r.Xz,{id:"Canvas",shadows:!0,dpr:[1,2],gl:{antialias:!0,logarithmicDepthBuffer:!0},camera:{fov:50,position:[5e3,5e3,5e3],near:.01,far:1e6},children:[(0,i.jsxs)(n.Suspense,{fallback:(0,i.jsx)(()=>(0,i.jsx)(l.V,{as:"div",fullscreen:!0,className:"loading-screen",children:(0,i.jsxs)("div",{className:"loading-con",children:[(0,i.jsx)("p",{children:"Loading..."}),(0,i.jsx)("div",{className:"loading-bar-container",children:(0,i.jsx)("div",{className:"loading-bar",style:{width:"".concat(f,"%")}})})]})}),{}),children:[(0,i.jsx)("ambientLight",{intensity:.04}),(0,i.jsx)("pointLight",{color:"#f6f3ea",intensity:2,position:[0,0,0]},(null==m?void 0:m.name)||"basic"),(0,i.jsx)(p.x,{children:(0,i.jsx)(g.d,{mipmapBlur:!0,intensity:.6,luminanceThreshold:1,luminanceSmoothing:1.2,radius:.6})}),a]}),(0,i.jsx)(o.q,{all:!0})]}),(0,i.jsx)(h,{})]})}},8942:function(e,a,t){"use strict";t.d(a,{H_:function(){return i},_d:function(){return r},sh:function(){return n}});let i=1e-4,n=4e-4,r={Mercury:[],Venus:[],Earth:[{name:"Moon",mass:7342e19,orbitalRadius:384400,radius:1737.1,orbitalPeriod:27.3,orbitalInclination:5.145,color:"silver"}],Mars:[{name:"Deimos",mass:148e13,orbitalRadius:23460,radius:6.2,orbitalPeriod:1.263,orbitalInclination:1.79,color:"lightgrey"},{name:"Phobos",mass:1066e13,orbitalRadius:9376,radius:11.2677,orbitalPeriod:.319,orbitalInclination:1.093,color:"darkgrey"}],Jupiter:[{name:"Callisto",mass:10758e19,orbitalRadius:1882700,radius:2410.3,orbitalPeriod:16.689,orbitalInclination:.28,color:"darkgrey"},{name:"Europa",mass:47998e18,orbitalRadius:671100,radius:1560.8,orbitalPeriod:3.551,orbitalInclination:.47,color:"white"},{name:"Ganymede",mass:14819e19,orbitalRadius:1070400,radius:2634.1,orbitalPeriod:7.154,orbitalInclination:.2,color:"grey"},{name:"Io",mass:89319e18,orbitalRadius:421700,radius:1821.6,orbitalPeriod:1.769,orbitalInclination:.05,color:"yellow"}],Saturn:[{name:"Dione",mass:1095452e15,orbitalRadius:377396,radius:561.7,orbitalPeriod:2.737,orbitalInclination:.02,color:"#D9D9D9"},{name:"Enceladus",mass:108022e15,orbitalRadius:237948,radius:252.1,orbitalPeriod:1.37,orbitalInclination:.02,color:"#FFFFFF"},{name:"Iapetus",mass:1805635e15,orbitalRadius:3560820,radius:734.5,orbitalPeriod:79.322,orbitalInclination:7.52,color:"#FFFFFF"},{name:"Mimas",mass:37493e15,orbitalRadius:185539,radius:198.2,orbitalPeriod:.942,orbitalInclination:1.53,color:"#E0E0E0"},{name:"Rhea",mass:2306518e15,orbitalRadius:527108,radius:763.8,orbitalPeriod:4.518,orbitalInclination:.35,color:"#D3D3D3"},{name:"Tethys",mass:617449e15,orbitalRadius:294619,radius:531.1,orbitalPeriod:1.888,orbitalInclination:1.12,color:"#F5F5F5"},{name:"Titan",mass:13452e19,orbitalRadius:1221870,radius:2574.73,orbitalPeriod:15.945,orbitalInclination:.33,color:"#FFCC99"}],Uranus:[{name:"Ariel",mass:1353e18,orbitalRadius:191020,radius:578.9,orbitalPeriod:2.52,orbitalInclination:.26,color:"grey"},{name:"Miranda",mass:659e17,orbitalRadius:129900,radius:235.8,orbitalPeriod:1.413,orbitalInclination:4.34,color:"grey"},{name:"Oberon",mass:3014e18,orbitalRadius:583520,radius:761.4,orbitalPeriod:13.463,orbitalInclination:.1,color:"grey"},{name:"Titania",mass:3527e18,orbitalRadius:436300,radius:788.9,color:"lightblue",orbitalPeriod:8.706,orbitalInclination:.14,color:"grey"},{name:"Umbriel",mass:1172e18,orbitalRadius:266e3,radius:584.7,orbitalPeriod:4.144,orbitalInclination:.36,color:"grey"}],Neptune:[{name:"Nereid",mass:31e19,orbitalRadius:5513800,radius:1737,orbitalPeriod:360.1362,orbitalInclination:7.23,color:"grey"},{name:"Triton",mass:214e20,orbitalRadius:354800,radius:353.4,orbitalPeriod:-5.877,orbitalInclination:0,color:"lightblue"}]}},2079:function(e,a,t){"use strict";t.d(a,{E_:function(){return d},G:function(){return u},Gw:function(){return m},Hm:function(){return o},YB:function(){return c}});var i=t(7776);let n=new i.Vector3(0,0,0),r={name:"Mars",mass:64171e19,radius:3396.2,orbitalOrigin:n,orbitalRadius:2279e5,orbitalSpeed:24.077,orbitalPeriod:687,initialOrbitalAngle:360*Math.random(),orbitalInclination:1.85,axialTilt:25.19,rotationPeriod:24.6635,surfaceTemp:-63,color:"salmon",gravity:3.72076,gravitationalAcceleration:.00256,interestPoints:[{title:"Olympus Mons",coordinates:new i.Vector3(10,15,0)}]},s={name:"Saturn",mass:5683e23,radius:58232,orbitalOrigin:n,orbitalRadius:1434e6,orbitalSpeed:9.68,orbitalPeriod:10759,initialOrbitalAngle:360*Math.random(),orbitalInclination:2.49,axialTilt:26.73,rotationPeriod:10.8,surfaceTemp:-139,color:"#FFCC99",gravity:10.44,gravitationalAcceleration:646e-7,interestPoints:[{title:"Hexagon Storm",coordinates:new i.Vector3(-10,20,0)}]},l={name:"Neptune",mass:1024e23,radius:24622,orbitalOrigin:n,orbitalRadius:4495e6,orbitalSpeed:5.43,orbitalPeriod:60182,initialOrbitalAngle:360*Math.random(),orbitalInclination:1.77,axialTilt:28.32,rotationPeriod:16,surfaceTemp:-201,color:"#4973AB",gravity:11.15,gravitationalAcceleration:657e-8,interestPoints:[{title:"Great Dark Spot",coordinates:new i.Vector3(-5,-5,0)}]};a.ZP={Sun:{name:"Sun",mass:1989e27,radius:696340,orbitalOrigin:n,orbitalRadius:0,orbitalSpeed:0,orbitalPeriod:0,initialOrbitalAngle:0,axialTilt:7.25,rotationPeriod:609.12,surfaceTemp:5505,color:"#FFFF00",gravity:274},Mercury:{name:"Mercury",mass:3285e20,radius:2439.7,orbitalOrigin:n,orbitalRadius:579e5,orbitalSpeed:47.87,orbitalPeriod:88,initialOrbitalAngle:360*Math.random(),orbitalInclination:7,axialTilt:.034,rotationPeriod:1407.6,surfaceTemp:167,color:"gray",gravity:3.7,gravitationalAcceleration:.0396},Venus:{name:"Venus",mass:4867e21,radius:6051.8,orbitalOrigin:n,orbitalRadius:1082e5,orbitalSpeed:35.02,orbitalPeriod:225,initialOrbitalAngle:360*Math.random(),orbitalInclination:3.39,axialTilt:177.4,rotationPeriod:5832.5,surfaceTemp:464,color:"#ff9e43",gravity:8.87,gravitationalAcceleration:.0113},Earth:{name:"Earth",mass:5972e21,radius:6371,orbitalOrigin:n,orbitalRadius:1496e5,orbitalSpeed:29.78,orbitalPeriod:365.25,initialOrbitalAngle:360*Math.random(),orbitalInclination:5e-5,axialTilt:23.44,rotationPeriod:23.93,surfaceTemp:14,color:"dodgerblue",gravity:9.807,gravitationalAcceleration:.00593},Mars:r,Jupiter:{name:"Jupiter",mass:1898e24,radius:69911,orbitalOrigin:n,orbitalRadius:7785e5,orbitalSpeed:13.07,orbitalPeriod:4333,initialOrbitalAngle:360*Math.random(),orbitalInclination:1.31,axialTilt:3.13,rotationPeriod:9.93,surfaceTemp:-145,color:"#FFD27D",gravity:24.79,gravitationalAcceleration:219e-6,interestPoints:[{title:"Great Red Spot",coordinates:[-5,5,0]}]},Saturn:s,Uranus:{name:"Uranus",mass:8681e22,radius:25362,orbitalOrigin:n,orbitalRadius:2871e6,orbitalSpeed:6.81,orbitalPeriod:30660,initialOrbitalAngle:360*Math.random(),orbitalInclination:.77,axialTilt:97.77,rotationPeriod:17.2,surfaceTemp:-195,color:"#AECBC9",gravity:8.69,gravitationalAcceleration:161e-7},Neptune:l};let o=1e-5,c=1e-4,d=6e5,u=66743e-15,m=1989e27},8384:function(e,a,t){"use strict";t.d(a,{d2:function(){return o},g5:function(){return c}});var i=t(9099),n=t(2844),r=t(7776),s=t(2079);let l=(0,i.Ue)((e,a)=>({simSpeed:1,setSimSpeed:a=>e({simSpeed:a}),prevSpeed:1,setPrevSpeed:a=>e({prevSpeed:a}),fullscreen:!1,toggleFullscreen:()=>{document.fullscreenElement?document.exitFullscreen&&(document.exitFullscreen().catch(e=>{console.error("Failed to exit full-screen mode:",e)}),e({fullscreen:!1})):(document.documentElement.requestFullscreen().catch(e=>{console.error("Failed to enter full-screen mode:",e)}),e({fullscreen:!0}))},isEditing:!1,setIsEditing:a=>e({isEditing:a}),orbitPaths:!0,toggleOrbitPaths:()=>e(e=>({orbitPaths:!e.orbitPaths})),showConstellations:!1,toggleConstellations:()=>e(e=>({showConstellations:!e.showConstellations})),sunSettings:{position:new r.Vector3(0,0,0)},setEarthOrbit:a=>e(e=>({earthSettings:{...e.earthSettings,...a}})),earthPosition:new r.Vector3(10,0,0),setEarthPosition:a=>e({earthPosition:a}),setMoonOrbit:a=>e(e=>({moonSettings:{...e.moonSettings,...a}})),rotationCounts:{},simulationDate:new Date("2024-01-18"),updateRotationCount:(a,t)=>e(e=>{let i=e.rotationCounts[a]||0;return{rotationCounts:{...e.rotationCounts,[a]:i+t}}}),incrementDate:()=>e(e=>({simulationDate:new Date(e.simulationDate.setDate(e.simulationDate.getDate()+1))})),camera:new r.PerspectiveCamera,orbitControls:null,previousCameraPosition:new r.Vector3,setOrbitControls:a=>e({orbitControls:a}),resetCamera:()=>{let{orbitControls:e}=a();e&&(e.target.set(0,0,0),e.update())}}));a.ZP=l;let o=(0,i.Ue)((0,n.n)((e,a)=>({displayLabels:!1,toggleDisplayLabels:()=>e(e=>({displayLabels:!e.displayLabels})),planetPositions:{},updatePlanetPosition:(a,t)=>e(e=>({planetPositions:{...e.planetPositions,[a]:t}})),planetAngles:{},updatePlanetAngle:(a,t)=>e(e=>({planetAngles:{...e.planetAngles,[a]:t}})),selectedPlanet:null,setSelectedPlanet:a=>e(()=>({selectedPlanet:a})),selectedMoon:null,setSelectedMoon:a=>e(()=>({selectedMoon:a})),planetsData:s.ZP,updatePlanetData:(a,t)=>{e(e=>{e.planetsData[a]&&Object.keys(t).forEach(i=>{e.planetsData[a][i]=t[i]})})},resetPlanetsData:()=>{e(e=>{e.planetsData=s.ZP})},resetSinglePlanetData:a=>{e(e=>{e.planetsData[a]&&s.ZP[a]&&(e.planetsData[a]=s.ZP[a])})}}))),c=(0,i.Ue)(e=>({satelliteCamera:!1,toggleSatelliteCamera:a=>e(()=>({satelliteCamera:a})),isCameraTransitioning:!1,toggleCameraTransitioning:a=>e(()=>({isCameraTransitioning:a})),surfacePoint:null,setSurfacePoint:a=>e({surfacePoint:a}),surfaceNormal:[0,1,0],setSurfaceNormal:a=>e({surfaceNormal:a}),cameraSurfacePoint:null,setCameraSurfacePoint:a=>e({cameraSurfacePoint:a}),cameraSurfaceNormal:[0,1,0],setCameraSurfaceNormal:a=>e({cameraSurfaceNormal:a}),isSurfaceCameraActive:!1,toggleSurfaceCamera:()=>e(e=>({isSurfaceCameraActive:!e.isSurfaceCameraActive})),cameraTarget:new r.Vector3,setCameraTarget:a=>e({cameraTarget:a}),triggerReset:null,setTriggerReset:a=>e({triggerReset:a})}))},6901:function(){}}]);