(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[992],{206:function(e,t,r){Promise.resolve().then(r.bind(r,9704))},9704:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return I}});var n=r(7437),a=r(2265),o=r(4220),s=r(7871),i=r(3719),u=r(8384),c=r(2803),l=r(2079),m=r(5375),h=r(7776),p=r(9373),d=r(2325),x=r(8942),f=r(878),g=r(1675),M=r(6209);let y=e=>{let{start:t,end:r,color:a,thickness:o=.1}=e,s=new h.Vector3().subVectors(r,t),i=.5*s.length(),u=s.normalize(),c=new h.Quaternion,l=new h.Vector3(0,1,0);c.setFromUnitVectors(l,u);let m=i-.8;return(0,n.jsx)("group",{position:t,children:(0,n.jsxs)("group",{quaternion:c,children:[(0,n.jsxs)("mesh",{position:[0,m/2,0],children:[(0,n.jsx)("cylinderGeometry",{args:[o,o,m,32]}),(0,n.jsx)("meshStandardMaterial",{color:a,emissive:a,emissiveIntensity:1,transparent:!0,opacity:.5,depthWrite:!1,depthTest:!1})]}),(0,n.jsxs)("mesh",{position:[0,i-.4,0],children:[(0,n.jsx)("coneGeometry",{args:[.4,.8,32]}),(0,n.jsx)("meshStandardMaterial",{color:a,emissive:a,emissiveIntensity:.8,transparent:!0,opacity:.5,depthWrite:!1,depthTest:!1})]})]})})};var w=e=>{let{moonRef:t,planetRef:r,length:a=3}=e;if(!t?.current?.position||!r?.current?.position)return null;let o=t.current.position.clone(),s=new h.Vector3(0,0,0),i=new h.Vector3().subVectors(s,o).normalize().multiplyScalar(Math.max(3,Math.min(25,8*a))),u=new h.Vector3().subVectors(o,s).normalize().multiplyScalar(Math.max(3,Math.min(25,8*a))),c=new h.Vector3(o.x+i.x,o.y+i.y,o.z+i.z),l=new h.Vector3(s.x+u.x,s.y+u.y,s.z+u.z);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(y,{start:o,end:c,color:"orange",thickness:.04}),(0,n.jsx)(y,{start:s,end:l,color:"green",thickness:.04})]})},v=r(4851),j=e=>{let{target:t,color:r="white",width:o=3,opacity:s=1,active:i=!0,minPoints:u=500,maxPoints:c=1e3,pause:l=!1}=e,[m,d]=(0,a.useState)([]),x=(0,a.useRef)(null),f=(0,a.useRef)(0),g=(0,a.useRef)([]),M={pointsPerSegment:5,smoothingFactor:1},y=(e,t)=>{if(e.length<2)return e;let r=[];for(let n=0;n<e.length-1;n++){let a=e[Math.max(0,n-1)],o=e[n],s=e[n+1],i=e[Math.min(e.length-1,n+2)];for(let e=0;e<t;e++){let n=e/t,u=n*n,c=u*n,l=new h.Vector3;l.x=.5*(2*o.x+(-a.x+s.x)*n+(2*a.x-5*o.x+4*s.x-i.x)*u+(-a.x+3*o.x-3*s.x+i.x)*c),l.y=.5*(2*o.y+(-a.y+s.y)*n+(2*a.y-5*o.y+4*s.y-i.y)*u+(-a.y+3*o.y-3*s.y+i.y)*c),l.z=.5*(2*o.z+(-a.z+s.z)*n+(2*a.z-5*o.z+4*s.z-i.z)*u+(-a.z+3*o.z-3*s.z+i.z)*c),r.push(l)}}return r};(0,p.A)((e,r)=>{if(!i||!t?.current||l)return;let n=performance.now(),a=t.current.position.clone(),o=n-f.current,s=x.current&&a.distanceTo(x.current)>.001;(o>16||s)&&d(e=>{let t=x.current?new h.Vector3().lerpVectors(x.current,a,M.smoothingFactor):a,r=[...e,t];for(r.length>c&&(r=r.slice(r.length-c));r.length<u;)r.unshift(r[0]?.clone()||a);return g.current=y(r,M.pointsPerSegment),x.current=t,f.current=n,r})}),(0,a.useEffect)(()=>{i||(d([]),x.current=null,f.current=0,g.current=[])},[i]);let w=(0,a.useMemo)(()=>g.current.length?g.current.map((e,t)=>{let n=t/(g.current.length-1);return new h.Color(r).multiplyScalar(n)}):[],[r,g.current.length]);return g.current.length?(0,n.jsx)(v.x,{points:g.current,vertexColors:w,lineWidth:o,depthWrite:!1,transparent:!0,opacity:s}):null},P=r(1577);function b(e){let{meanMotion:t,eccentricity:r,orbitalRadius:n,orbitalInclination:a,currentAngle:o,deltaTime:s}=e,i=o+t*s,u=i;for(let e=0;e<10;e++){let e=(u-r*Math.sin(u)-i)/(1-r*Math.cos(u));if(u-=e,1e-6>Math.abs(e))break}let c=2*Math.atan(Math.sqrt((1+r)/(1-r))*Math.tan(u/2)),l=n*(1-r*r)/(1+r*Math.cos(c)),m=l*Math.sin(c),p=Math.PI/180*a,d=Math.sin(p)*m,x=Math.cos(p)*m;return{position:new h.Vector3(l*Math.cos(c),d,x),angle:i}}var z=e=>{let{moonData:t,planetRef:r,parentName:o,scaledPlanetRadius:i}=e,{name:m,orbitalRadius:d,radius:g,color:y,orbitalPeriod:v,orbitalInclination:z,eccentricity:R}=t,{simSpeed:E,toggleDetailsMenu:V}=(0,u.ZP)(),{selectedMoon:S,setSelectedMoon:T,updateMoonPosition:k,updateMoonWorldPosition:A,displayLabels:I,orbitPaths:L,planetsData:Z}=(0,u.d2)(),{activeCamera:C,switchToMoonCamera:D}=(0,u.g5)(),{experimentStatus:W,setExperimentStatus:Y,experimentType:B,newtonOneStatus:N,setNewtonOneStatus:U}=(0,c.Z)(),_=(0,a.useMemo)(()=>({radius:g*x.sh,orbitalRadius:d*x.H_,meanMotion:2*Math.PI/(86400*v)}),[g,d,v]),F=_.radius+i,X=l.ZP[o].mass,G=Z[o].mass/X,$=(0,a.useRef)(),O=(0,a.useRef)(0),q=(0,a.useRef)(0),Q=(0,a.useRef)(new h.Vector3(_.orbitalRadius,0,0)),H=(0,a.useRef)(null),J=(0,a.useRef)(!1),[K,ee]=(0,a.useState)(!1),[et,er]=(0,a.useState)(!1),en=S&&S.name===m,ea="Moon"===m?(0,s.m)("../assets/earth/moon/moon.jpg"):null;return(0,a.useEffect)(()=>{if(("completed"!==W||!W)&&$.current){$.current.position.set(_.orbitalRadius,0,0),Q.current.set(_.orbitalRadius,0,0),O.current=0,q.current=0,H.current=null,J.current=!1,ee(!1),er(!1);let e=$.current.getWorldPosition(new h.Vector3);k(m,{x:e.x,y:e.y,z:e.z})}},[W,_.orbitalRadius,m]),(0,p.A)((e,t)=>{if(K||"completed"===W)return;if("started"!==W){if($.current){let e=$.current.getWorldPosition(new h.Vector3);k(m,{x:e.x,y:e.y,z:e.z})}return}let r=G<=.5,n=t*E;if($.current){if(r){J.current||(Q.current.copy($.current.position),H.current=new h.Vector3(-$.current.position.y,$.current.position.x,0).normalize().multiplyScalar(_.meanMotion*_.orbitalRadius),J.current=!0,er(!0),U("escaped"));let{position:e,velocity:t}=function(e){let{meanMotion:t,orbitalRadius:r,currentAngle:n,startAngle:a=null,deltaTime:o,initialVelocity:s=null,position:i=null}=e;if(!s||!i){let e=t*r*1.02,a=new h.Vector2(-e*Math.sin(n),e*Math.cos(n));return{position:new h.Vector3(r*Math.cos(n),0,r*Math.sin(n)),velocity:a,angle:n}}let u=Math.sqrt(i.x*i.x+i.z*i.z),c=4e-6/(u*u),l=new h.Vector2(-i.x/u,-i.z/u),m=s.clone();m.x+=l.x*c*o*.1,m.y+=l.y*c*o*.1;let p=m.clone().normalize();m.x+=1e-10*p.x*o,m.y+=1e-10*p.y*o;let d=i.clone();d.x+=m.x*o,d.z+=m.y*o;let x=Math.atan2(d.z,d.x);return{position:d,velocity:m,angle:x}}({meanMotion:_.meanMotion,orbitalRadius:_.orbitalRadius,currentAngle:q.current,deltaTime:n,initialVelocity:H.current,position:Q.current});if(Q.current.copy(e),H.current=t,$.current.position.copy(e),e.length()>6*_.orbitalRadius){Y("completed");return}}else if(.1>Math.abs(G-2)){let{position:e,angle:t}=function(e){let{meanMotion:t,orbitalRadius:r,currentAngle:n,startAngle:a,deltaTime:o}=e,s=r*Math.exp(-(Math.abs(a-n)/(2*Math.PI)*2.2)),i=n+t*Math.pow(r/s,.8)*5*o,u=s*Math.cos(i),c=s*Math.sin(i);return{position:new h.Vector3(u,0,c),angle:i,radius:s}}({meanMotion:_.meanMotion,orbitalRadius:_.orbitalRadius,currentAngle:q.current,startAngle:O.current,deltaTime:n});$.current.position.copy(e),q.current=t}else if(.1>Math.abs(G-1.5)){let{position:e,angle:t}=function(e){let{meanMotion:t,eccentricity:r,orbitalRadius:n,orbitalInclination:a,currentAngle:o,deltaTime:s,radiusModifier:i=.7,eccentricityModifier:u=.3}=e;return b({meanMotion:1.2*t,eccentricity:Math.min(.7,r+u),orbitalRadius:n*i,orbitalInclination:a,currentAngle:o,deltaTime:s})}({meanMotion:_.meanMotion,eccentricity:R,orbitalRadius:_.orbitalRadius,orbitalInclination:z,currentAngle:q.current,deltaTime:n,radiusModifier:.7,eccentricityModifier:.3});$.current.position.copy(e),q.current=t}else{U("stable");let{position:e,angle:t}=b({meanMotion:_.meanMotion,eccentricity:R,orbitalRadius:_.orbitalRadius,orbitalInclination:z,currentAngle:q.current,deltaTime:n});$.current.position.copy(e),q.current=t}if($.current.position.length()<=F&&!r){ee(!0),U("collided"),Y("completed");return}let e=$.current.getWorldPosition(new h.Vector3);k(m,{x:e.x,y:e.y,z:e.z}),"Moon"===m&&$.current.lookAt(new h.Vector3(0,0,0));let t=$.current.getWorldPosition(new h.Vector3);A(m,{x:t.x,y:t.y,z:t.z})}}),(0,n.jsxs)(n.Fragment,{children:[C?.name===m&&$.current&&(0,n.jsx)(M.Z,{target:$.current,targetName:m,size:_.radius,bodyType:"moon"},m+"-satellite-camera"),"newton-1"===B?(0,n.jsx)(j,{target:$,color:y,width:2,active:W&&L,minPoints:(()=>{switch(G){case .5:return 500;case 1:return 200;default:return 100}})(),maxPoints:(()=>{switch(G){case .5:return 750;case 1:return 350;default:return 150}})(),pause:"completed"===W},W?"moon-trail-active":"moon-trail"):(0,n.jsx)(f.Z,{radius:_.orbitalRadius,eccentricity:R,orbitalInclination:z,color:y,name:`${m}-orbit-path`,hiRes:!0,lineWidth:1,position:$.current?.position,arcLength:.9}),(0,n.jsxs)("group",{ref:$,children:[(0,n.jsxs)("mesh",{rotation:"Moon"===m?[0,3.5*Math.PI,0]:[0,0,0],children:[(0,n.jsx)("sphereGeometry",{args:[_.radius,en?38:24,en?28:16]}),(0,n.jsx)("meshBasicMaterial",{metalness:K?.8:.5,roughness:K?.2:.5,map:K?null:ea,color:K?"red":ea?null:y})]},"moon-mesh"+K+W),I&&(0,n.jsx)(P.Z,{text:m,size:16,position:[0,2*_.radius,0],color:y})]}),$.current&&"newton-1"===B&&(0,n.jsx)(w,{moonRef:$,planetRef:r,length:_.radius*G*100/($.current.position.length()||1)})]})},R=r(4242),E=r(8236);let V=e=>(e%(2*Math.PI)+2*Math.PI)%(2*Math.PI);var S=e=>{let{planetName:t="Earth",planetRef:r,angleRef:o,numTriangles:s=5,radius:i,eccentricity:l=0,orbitalInclination:m}=e,{planetsData:h,updatePlanetAngle:d,updatePlanetData:x}=(0,u.d2)(),{experimentStatus:f}=(0,c.Z)(),[g,M]=(0,a.useState)(null),[y,w]=(0,a.useState)([]),[j,P]=(0,a.useState)(0),[b,z]=(0,a.useState)(null),R=(0,a.useRef)([]),E=(0,a.useRef)(!1);(0,a.useEffect)(()=>{w([]),P(0),M(null),z(null),R.current=[],E.current=!0},[t,i,h[t].eccentricity,m,s,x]),(0,a.useEffect)(()=>{null===f&&(w([]),P(0),M(null),z(null),R.current=[],E.current=!0)},[f]);let S=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100,n=[];e=V(e),t=V(t);for(let e=0;e<20;e++)n.push([0,0,0]);let a=t-e;a<0&&(a+=2*Math.PI);for(let t=0;t<=r;t++){let o=e+t/r*a;n.push(k(o))}for(let e=0;e<20;e++)n.push([0,0,0]);return n},T=(0,a.useMemo)(()=>{let e=[];for(let t=0;t<=s;t++){let r=t/s*2*Math.PI,n=r;for(let e=0;e<10;e++){let e=(n-l*Math.sin(n)-r)/(1-l*Math.cos(n));if(n-=e,1e-6>Math.abs(e))break}let a=2*Math.atan(Math.sqrt((1+l)/(1-l))*Math.tan(n/2));e.push(V(a))}return e},[s,l]),k=e=>{let t=i*(1-l*l)/(1+l*Math.cos(e)),r=t*Math.sin(e),n=Math.PI/180*m;return[t*Math.cos(e),Math.sin(n)*r,Math.cos(n)*r]},A=(e,t,r)=>(e=V(e),(t=V(t))<=(r=V(r)))?e>=t&&e<=r:e>=t||e<=r;return(0,p.A)(()=>{if(!r.current)return;let e=r.current.position,t=V(Math.atan2(e.z,e.x));if(R.current.push(t),R.current.length>3&&R.current.shift(),null===b){z(t);return}let n=R.current,a=n.some(e=>e>5),o=n.some(e=>e<1);if(a&&o&&t<b){w([]),P(0),M(null),z(t),R.current=[t];return}if(j<s){let e=T[j],r=T[j+1];g?!A(t,e,r)&&A(b,e,r)?(w(t=>[...t,{points:S(e,r),color:g.color}]),j<s-1?(P(e=>e+1),M({startAngle:r,endAngle:t,color:`hsl(${(j+1)*360/s}, 70%, 50%)`})):M(null)):M(e=>({...e,endAngle:t})):M({startAngle:e,endAngle:t,color:`hsl(${360*j/s}, 70%, 50%)`})}z(t)}),(0,n.jsxs)("group",{children:[y.map((e,t)=>(0,n.jsx)(v.x,{points:e.points,color:e.color,lineWidth:2},`complete-${t}`)),g&&(0,n.jsx)(v.x,{points:S(g.startAngle,g.endAngle),color:g.color,lineWidth:4})]},t)},T=e=>{let{name:t="Earth",textures:r}=e,{planetsData:o}=(0,u.d2)(),{experimentType:s,experimentPlanet:i,experimentStatus:m}=(0,c.Z)(),{radius:M=1,orbitalOrigin:y,orbitalRadius:w=1,orbitalPeriod:v=1,orbitalInclination:j=0,axialTilt:P=0,rotationPeriod:b=1,color:V="#ffffff",initialOrbitalAngle:T=0,eccentricity:k=0,mass:A}={...o[t]},{simSpeed:I,toggleDetailsMenu:L}=(0,u.ZP)(),{planetAngles:Z,updatePlanetPosition:C,selectedPlanet:D,setSelectedPlanet:W,displayLabels:Y,selectedMoon:B,setSelectedMoon:N,orbitPaths:U}=(0,u.d2)(),{isSurfaceCameraActive:_,satelliteCamera:F,toggleSatelliteCamera:X,setAutoRotate:G,autoRotate:$,activeCamera:O,switchToPlanetCamera:q}=(0,u.g5)();l.ZP[t].mass;let Q=(0,a.useRef)(),H=(0,a.useRef)(0),J=(0,a.useRef)(),K=(0,a.useRef)(null),[ee,et]=(0,a.useState)(!1),[er,en]=(0,a.useState)(!1),[ea,eo]=(0,a.useState)(!1),es=(0,a.useRef)({x:0,y:0}),ei=Math.max(.1,w*(_?1e-4:l.Hm)),eu=Math.max(.1,M*l.YB);l.E_;let ec="newton-1"===s||D&&D.name===t,el=()=>!!ec||B?.parentName===t,em=ec||el()?128:32,[eh,ep]=(0,a.useState)(eu),ed=(0,a.useRef)(1),[ex,ef]=(0,a.useState)(!1),[eg,eM]=(0,a.useState)(1),[ey,ew]=(0,a.useState)(0);(0,a.useEffect)(()=>{null===m&&(H.current=-.000001,ew(0))},[m]),(0,a.useEffect)(()=>{K.current&&(K.current.rotation.order="YXZ",K.current.rotation.y=0,K.current.rotation.x=h.MathUtils.degToRad(P))},[P,D]),(0,a.useEffect)(()=>{r?.map&&(r.map.colorSpace=h.SRGBColorSpace,r.map.needsUpdate=!0),r?.clouds&&(r.clouds.colorSpace=h.SRGBColorSpace,r.clouds.needsUpdate=!0)},[]),(0,p.A)((e,r)=>{let n=r*I;if("completed"===m)return;if("newton-1"===s){if(b&&K.current){let e=2*Math.PI/(3600*b)*n,t=new h.Vector3(0,1,0);K.current.rotateOnAxis(t,e),J.current&&(J.current.rotation.y+=1.1*e)}if(Q.current){if(!Q.current.userData.initialPositionSet){let e=ei*(1-k);Q.current.position.set(e,0,0),C(t,{x:e,y:0,z:0}),Q.current.userData.initialPositionSet=!0}let r=Q.current.position.distanceTo(e.camera.position);ep(r/1e3<=eu?eu:r/1e3),ef("moon"===O.type||r<500);let n=100*eu,a=1*eu;eM(Math.max(0,Math.min(1,(r-a)/(n-a)))),ed.current&&(ed.current=.02*r)}return}H.current-=2*Math.PI/(86400*v)*n;let a=H.current;for(let e=0;e<10;e++){let e=(a-k*Math.sin(a)-H.current)/(1-k*Math.cos(a));if(a-=e,1e-6>Math.abs(e))break}let o=2*Math.atan(Math.sqrt((1+k)/(1-k))*Math.tan(a/2)),i=ei*(1-k*k)/(1+k*Math.cos(o)),u=i*Math.cos(-o),c=i*Math.sin(-o);if(Q.current){let r=Math.PI/180*j,a=Math.sin(r)*c,o=Math.cos(r)*c;if(Q.current.position.set(u,a,o),C(t,{x:u,y:a,z:o}),b&&K.current){let e=2*Math.PI/(3600*b)*n,t=new h.Vector3(0,1,0);K.current.rotateOnAxis(t,e);let r=n/86400;ew(e=>e+r),Q.current.rotation.y>=2*Math.PI&&ec&&(Q.current.rotation.y%=2*Math.PI),J.current&&(J.current.rotation.y+=1.1*e)}let s=Q.current.position.distanceTo(e.camera.position);ep(Math.max(.1,s/1e3<=eu?eu:s/1e3)),ef("moon"===O.type||s<500);let i=100*eu,l=1*eu;eM(Math.max(0,Math.min(1,(s-l)/(i-l)))),ed.current&&(ed.current=Math.max(.1,.02*s))}});let ev=e=>{e.stopPropagation(),en(!1),es.current={x:e.clientX,y:e.clientY}},ej=e=>{Math.sqrt(Math.pow(e.clientX-es.current.x,2)+Math.pow(e.clientY-es.current.y,2))>5&&en(!0)},eP=e=>{en(!1)},eb=e=>{e.stopPropagation(),document.body.style.cursor="pointer",eo(!0)},ez=e=>{e.stopPropagation(),document.body.style.cursor="auto",eo(!1)},eR=x.ZP[t]||[],eE=Math.max(.1,el()?eu:8*eh),eV=Math.max(.1,el()?eu:8*eh),eS=Math.max(.1,1.005*eu),eT=Math.max(.1,1.008*eu);return(0,n.jsxs)(n.Fragment,{children:[O?.name===t&&Q.current&&(0,n.jsx)(g.Z,{target:Q.current,targetName:t,size:eu}),(0,n.jsxs)("group",{ref:Q,children:[(0,n.jsx)("mesh",{visible:!1,onPointerDown:ev,onPointerMove:ej,onPointerUp:eP,onPointerOver:eb,onPointerOut:ez,children:O?.name!==t&&(0,n.jsx)("sphereGeometry",{args:[eE,8,8]})}),(0,n.jsxs)("mesh",{ref:K,children:[(0,n.jsx)("sphereGeometry",{args:[eV,em,em/2]}),ec||el()||!ee?(0,n.jsxs)(n.Fragment,{children:["Earth"===t&&ec&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("mesh",{ref:J,children:[(0,n.jsx)("sphereGeometry",{args:[eS,em,em/2]}),(0,n.jsx)("meshBasicMaterial",{alphaMap:r?.clouds,transparent:!0,opacity:.8})]},`${t}-cloud_texture`),(0,n.jsxs)("mesh",{children:[(0,n.jsx)("sphereGeometry",{args:[eT,em,em/2]}),(0,n.jsx)("shaderMaterial",{args:[R.e]})]},`${t}-atmosphere_texture`)]}),(0,n.jsx)("meshBasicMaterial",{metalness:.6,roughness:.8,map:r?.map,onBuild:()=>et(!0)})]}):(0,n.jsx)("meshBasicMaterial",{color:V})]},ec?t+"-textured":t+"-basic"),"Saturn"===t&&ex&&(0,n.jsx)(E.Z,{innerRadius:Math.max(.1,1.2*eu),outerRadius:Math.max(.1,2*eu),height:0,rotation:[h.MathUtils.degToRad(P),0,0],texture:ec?r?.ringTexture:null,detail:Math.max(em,32)},em+t+"-ring"),"Uranus"===t&&ex&&(0,n.jsx)(E.Z,{innerRadius:Math.max(.1,1.5*eu),outerRadius:Math.max(.1,1.9*eu),height:0,texture:ec?r?.ringTexture:null,detail:Math.max(em,32),rotation:[h.MathUtils.degToRad(P),0,0]},em+t+"-ring"),Y&&ec&&(0,n.jsx)(d.V,{as:"span",wrapperClass:"label-wrapper",center:!0,"position-y":ec?eh+.25*eh:4*eh,zIndexRange:[100,0],style:{pointerEvents:"none"},children:(0,n.jsx)("span",{className:"planet-label",style:{color:V},onPointerDown:ev,onPointerMove:ej,onPointerUp:eP,onPointerOver:eb,onPointerOut:ez,children:t})}),el()&&eR.map((e,r)=>{let a=["Saturn","Uranus"].includes(t);return(0,n.jsx)("group",{rotation:a?[h.MathUtils.degToRad(P),0,0]:[0,0,0],children:(0,n.jsx)(z,{moonData:e,planetRef:Q,parentName:t,scaledPlanetRadius:eu},`${t}-moon-${r}`)},`${t}-moon-group-${r}`)})]}),U&&"newton-1"!==s&&(0,n.jsx)(f.Z,{position:Q.current?.position,...(()=>{switch(s){case"kepler-2":return{name:t+"orbital-path",color:"#fff",lineWidth:1,opacity:1,hiRes:!0,transparent:!0,arcLength:.8,origin:y,radius:ei,eccentricity:k,orbitalInclination:j};case"kepler-3":return{name:t+"orbital-path",color:V,lineWidth:5,opacity:.1,hiRes:!0,transparent:!0,arcLength:.8,origin:y,radius:ei,eccentricity:k,orbitalInclination:j};default:return{name:t+"orbital-path",color:V,lineWidth:2,opacity:1,transparent:!0,hiRes:!0,arcLength:.8,origin:y,radius:ei,eccentricity:k,orbitalInclination:j}}})()}),"kepler-2"===s&&(0,n.jsx)(S,{planetName:t,planetRef:Q,angleRef:H,numTriangles:6,radius:ei,eccentricity:k,orbitalInclination:j},t)]})},k=r(3920),A=()=>{let{sunSettings:e,simSpeed:t,setSimSpeed:r,prevSpeed:o,setPrevSpeed:d,setViewOnlyMode:x}=(0,u.ZP)(),{planetPositions:f,selectedPlanet:g,setSelectedPlanet:M,selectedMoon:y,setSelectedMoon:w,planetsData:v,moonsData:j,moonPositions:P,resetPlanetsData:b}=(0,u.d2)(),{satelliteCamera:z,isCameraTransitioning:R,toggleCameraTransitioning:E,isZoomingToSun:V,resetCamera:S,toggleZoomingToSun:A,activeCamera:I,setActiveCamera:L,switchToCustomCamera:Z,satelliteCameraState:C,setSatelliteCameraState:D}=(0,u.g5)(),{experimentPlanet:W,experimentType:Y,experimentStatus:B}=(0,c.Z)(),N=(0,a.useRef)(),[U,_]=(0,a.useState)(200),[F,X]=(0,a.useState)(!1),G=[1e5,1e5,1e5],$=[2e4,2e4,2e4],O=[0,0,0];(0,a.useEffect)(()=>{N.current&&!F&&(N.current.setPosition(...G,!1),N.current.setTarget(...O,!1),setTimeout(()=>{N.current.setPosition(...$,!0),N.current.setTarget(...O,!0),X(!0)},100))},[N.current]);let q=e=>"moon"===I.type?Math.max(.5*e,.01):4.2*e,Q=(e,t)=>{let r=j[t];return r?r.find(t=>t.name===e):null};(0,p.A)(()=>{if(N.current){if(C?.position&&R){let{position:e,targetPosition:t}=C;N.current.setPosition(e.x,e.y,e.z,!1),N.current.setTarget(t.x,t.y,t.z,!1),N.current.updateCameraUp(),N.current.update(),D(null)}if("planet"===I.type&&"Sun"!==I.name){let e=f[g.name];if(w(null),e){let t=q(v[g.name].radius*l.YB);_(t/2),N.current.setTarget(e.x,e.y,e.z,!0),N.current.dollyTo(t,!0),A(!1)}}if("moon"===I.type){let e=P[I.name],t=Q(I.name,I.parentName);if(e&&t){let r=t.radius*l.YB,n=q(r);_(2*r),N.current.setTarget(e.x,e.y,e.z,!0),N.current.dollyTo(4*n,!0);let a=new h.Vector3;N.current.getTarget(a),.1>a.distanceTo(new h.Vector3(e.x,e.y,e.z))&&E(!1)}}if("Sun"===I.name&&"planet"===I.type&&(_(200),N.current.setTarget(0,0,0,!0),N.current.maxDistance=1e3,E(!1),N.current.distance>300&&V?N.current.dollyTo(200,!0):A(!1)),"Asteroid Belt"===I.name){let e=I.position;if(e&&"number"==typeof e.x){N.current.setPosition(e.x,e.y,e.z,!0),N.current.setTarget(0,0,0,!0),_(4250),N.current.maxDistance=9e3;let t=new h.Vector3;N.current.getPosition(t),100>t.distanceTo(new h.Vector3(e.x,e.y,e.z))&&E(!1)}}if("default"===I.name&&R){let e=I.position,t=I.lookAt,r=new h.Vector3,n=new h.Vector3;N.current.getPosition(r),N.current.getTarget(n),r.distanceTo(e)>100&&N.current.setLookAt(e.x,e.y,e.z,t.x,t.y,t.z,!0),E(!1),_(200)}if("orbit"!==I.type||R||(_(200),N.current.maxDistance=16e4),"kepler"===I.name&&W&&R){let e=v[W],t=e.orbitalRadius*l.Hm,r=t/2*e.eccentricity;N.current.setPosition(r,5*t,0,!0),N.current.setTarget(r,0,0,!0),_(t),N.current.maxDistance=2e6,E(!1)}if("newton"===I.name&&W){let e=v.Earth,t={x:1494.5039999707724,y:816068867940263e-23,z:.009351460384996825};if(R){let r=e.radius*l.YB*10;N.current.setLookAt(t.x,10*r,-r,t.x,t.y,t.z,!0),_(r),N.current.maxDistance=20*r,E(!1)}else{let e=Object.keys(P).find(e=>e.includes("Moon"));if(e&&P[e]){let r=P[e];_(1.2*new h.Vector3(r.x-t.x,r.y-t.y,r.z-t.z).length());let n={x:(t.x+r.x)/2,y:(t.y+r.y)/2,z:(t.z+r.z)/2};N.current.setTarget(n.x,n.y,n.z,!0)}}}}}),(0,a.useEffect)(()=>{if(null===B&&"newton"===I.name&&N.current){let e=v.Earth,t={x:1494.5039999707724,y:816068867940263e-23,z:.009351460384996825},r=e.radius*l.YB,n=10*r;N.current.setLookAt(t.x,10*n,-n,t.x,t.y,t.z,!0),_(20*r),N.current.maxDistance=20*n,E(!1)}},[B]),(0,a.useEffect)(()=>{N.current&&!F&&(N.current.setPosition(...G,!1),N.current.setTarget(...O,!1),N.current.camera.updateProjectionMatrix(),setTimeout(()=>{S(),X(!0)},100))},[N.current]),(0,a.useEffect)(()=>{I.name,("planet"===I.type||"moon"===I.type)&&(console.log("Transitioning camera"),E(!0),d(t),r(0)),"orbit"===I.type&&"default"===I.name&&0===t&&r(o),g||y||0!==t||r(o),"Sun"===I.name&&(A(!0),0===t&&r(o)),N.current?.camera.updateProjectionMatrix()},[g,y,I]),(0,a.useEffect)(()=>{Y&&(Y.includes("kepler")?Z("kepler",v[W]):"newton-1"===Y&&Z("newton",v.Earth))},[Y,W]),(0,a.useEffect)(()=>{let e=e=>{1===e.button&&e.preventDefault(),N.current&&(N.current.mouseButtons.right=1)};return window.addEventListener("mousedown",e),()=>{window.removeEventListener("mousedown",e)}},[]);let H=(0,s.m)({map:"../assets/earth/earth_daymap.jpg",clouds:"../assets/earth/earth_clouds.jpg"}),J=(0,s.m)({map:"../assets/sun/sun.jpg"}),K=(0,s.m)({map:"../assets/venus/venus_surface.jpg"}),ee=(0,s.m)({map:"../assets/mercury/mercury.jpg"}),et=(0,s.m)({map:"../assets/mars/mars.jpg"}),er=(0,s.m)({map:"../assets/jupiter/jupiter.jpg"}),en=(0,s.m)({map:"../assets/saturn/saturn.jpg",ringTexture:"../assets/saturn/saturn-rings.png"}),ea=(0,s.m)({map:"../assets/uranus/uranus.jpg",ringTexture:"../assets/uranus/uranus-rings.png"}),eo=(0,s.m)({map:"../assets/neptune/neptune.jpg"});return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.B,{ref:N,makeDefault:!z,maxDistance:12e5,minDistance:U,smoothTime:.6,enableDamping:!0,near:.01,far:15e5,autoRotate:!0,enabled:!z}),(0,n.jsx)(k.Z,{}),(()=>{switch(W){case"Mars":return(0,n.jsx)(T,{name:"Mars",textures:et},W);case"Venus":return(0,n.jsx)(T,{name:"Venus",textures:K},W);case"Mercury":return(0,n.jsx)(T,{name:"Mercury",textures:ee},W);case"Jupiter":return(0,n.jsx)(T,{name:"Jupiter",textures:er},W);case"Saturn":return(0,n.jsx)(T,{name:"Saturn",textures:en},W);case"Uranus":return(0,n.jsx)(T,{name:"Uranus",textures:ea},W);case"Neptune":return(0,n.jsx)(T,{name:"Neptune",textures:eo},W);default:return(0,n.jsx)(T,{name:"Earth",textures:H},W)}})(),(0,n.jsx)(m.Z,{textures:J,position:e.position,resetCamera:S},"Sun-plain")]})};r(7045);var I=()=>{let{experimentMode:e,toggleExperimentMode:t}=(0,c.Z)();return(0,a.useEffect)(()=>{t(!0)},[t]),(0,n.jsx)(o.Z,{mode:e?"experiments":"main",children:(0,n.jsx)(A,{})})}},8236:function(e,t,r){"use strict";var n=r(7437),a=r(2265),o=r(7776);t.Z=e=>{let{innerRadius:t,outerRadius:r,height:s=0,rotation:i,texture:u,detail:c=16}=e,l=(0,a.useMemo)(()=>{let e=new o.CylinderGeometry(r,t,s,c,1,!0),n=e.attributes.uv;for(let e=0;e<n.count;e++){let t=n.getX(e),r=n.getY(e);n.setXY(e,t,r)}return e},[t,r,s]),m=(0,a.useMemo)(()=>new o.MeshBasicMaterial({map:u,side:o.DoubleSide,transparent:!0}),[u]);return(0,n.jsx)("mesh",{geometry:l,material:m,rotation:i})}},1675:function(e,t,r){"use strict";var n=r(7437),a=r(2265),o=r(9373),s=r(5533),i=r(7776),u=r(8384);t.Z=e=>{let{target:t,size:r,targetName:c,bodyType:l="planet"}=e,{toggleCameraTransitioning:m,setAutoRotate:h,autoRotate:p,toggleSatelliteCamera:d,satelliteCamera:x,activeCamera:f,setSatelliteCameraState:g}=(0,u.g5)(),{prevSpeed:M,setSimSpeed:y}=(0,u.ZP)(),{gl:w,camera:v}=(0,o.z)(),j=(0,a.useRef)(),P=(0,a.useRef)(!1),b=(0,a.useRef)({x:0,y:0}),z=(0,a.useRef)(new i.Spherical(6*r,Math.PI/2,0)),R=2.8*r,E=(0,a.useCallback)(()=>{h(!1)},[h]),V=(0,a.useCallback)(e=>{P.current=!0,b.current={x:e.clientX,y:e.clientY}},[]),S=(0,a.useCallback)(()=>{P.current=!1},[]),T=(0,a.useCallback)(e=>{if(!P.current)return;E();let t=e.clientX-b.current.x,r=e.clientY-b.current.y,n=z.current.phi-.45*r*.01,a=z.current.theta-.45*t*.01;z.current.phi=Math.max(.1,Math.min(Math.PI-.1,n)),z.current.theta=a,b.current={x:e.clientX,y:e.clientY}},[E]),k=(0,a.useCallback)(e=>{if(!x)return;let t=.1*e.deltaY,r=i.MathUtils.clamp(z.current.radius+t,R,1e3);z.current.radius=r,E()},[x,r,l,E]),A=(0,a.useCallback)(e=>{P.current=!0,e.touches?(e.preventDefault(),b.current={x:e.touches[0].clientX,y:e.touches[0].clientY}):b.current={x:e.clientX,y:e.clientY}},[]),I=(0,a.useCallback)(e=>{if(!P.current)return;E();let t=e.touches?e.touches[0].clientX:e.clientX,r=e.touches?e.touches[0].clientY:e.clientY,n=t-b.current.x,a=r-b.current.y,o=z.current.phi-.003*a,s=z.current.theta-.003*n;z.current.phi=Math.max(.1,Math.min(Math.PI-.1,o)),z.current.theta=s,b.current={x:t,y:r}},[E]);(0,o.A)((e,n)=>{if(!j.current||!t)return;let a=new i.Vector3;t.getWorldPosition(a);let o=t.position.clone();p&&(z.current.theta+=.05*n);let s=new i.Vector3().setFromSpherical(z.current).add(o);if(j.current.position.copy(s),j.current.lookAt(o),j.current.updateMatrixWorld(),x){let e=new i.Vector3;j.current.getWorldPosition(e);let t=new i.Quaternion;j.current.getWorldQuaternion(t),g(e,new i.Euler().setFromQuaternion(t),a)}f.name===c&&!x&&v.position.distanceTo(a)<=4.5*r&&L(v,a)});let L=(0,a.useCallback)((e,r)=>{let n=e.position.clone(),a=t.parent.matrixWorld.clone().invert(),o=n.applyMatrix4(a),s=t.position.clone(),u=o.sub(s);z.current.setFromVector3(u),z.current.radius=i.MathUtils.clamp(z.current.radius,R,1e3),j.current.position.copy(o),j.current.lookAt(s),d(!0),m(!1),y(M)},[t,l,r,d,m,y,M]);return(0,a.useEffect)(()=>{let e=w.domElement;return e.addEventListener("mousedown",V),window.addEventListener("mousemove",T),window.addEventListener("mouseup",S),e.addEventListener("wheel",k,{passive:!0}),e.addEventListener("touchstart",A),e.addEventListener("touchmove",I),e.addEventListener("touchend",S),e.addEventListener("contextmenu",e=>e.preventDefault()),()=>{e.removeEventListener("mousedown",V),window.removeEventListener("mousemove",T),window.removeEventListener("mouseup",S),e.removeEventListener("wheel",k),e.removeEventListener("touchstart",A),e.removeEventListener("touchmove",I),e.removeEventListener("touchend",S),e.removeEventListener("contextmenu",e=>e.preventDefault()),x&&d(!1)}},[V,T,S,k,A,I,w.domElement,x,d]),(0,n.jsx)(s.c,{ref:j,name:"planet-satellite-camera-"+c,makeDefault:x,fov:50,near:1e-4,far:12e5},c)}},4242:function(e,t,r){"use strict";r.d(t,{e:function(){return n}});let n={uniforms:{glowColor:{value:new(r(7776)).Color(3377407)},glowIntensity:{value:.6}},vertexShader:`
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      uniform float glowIntensity;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      
      void main() {
        float rim = 1.0 - max(dot(normalize(vViewPosition), vNormal), 0.0);
        rim = pow(rim, 3.0); // Increased power for sharper falloff
        gl_FragColor = vec4(glowColor, rim * glowIntensity);
      }
    `}},7045:function(){}},function(e){e.O(0,[260,689,723,802,122,971,190,744],function(){return e(e.s=206)}),_N_E=e.O()}]);