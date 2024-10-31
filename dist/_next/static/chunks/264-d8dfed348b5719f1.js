"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[264],{5264:function(e,t,r){var n=r(7437),a=r(2265),o=r(7776),s=r(9373),i=r(2325),u=r(8384),c=r(2079),l=r(878),h=r(1675),d=r(2167),m=r(1577),p=r(8942),x=r(1045),v=r(8236);t.Z=e=>{let{name:t="Earth",textures:r}=e,{planetsData:M}=(0,u.d2)(),f={...M[t]},{radius:g=1,orbitalOrigin:y,orbitalRadius:P=1,orbitalPeriod:j=1,orbitalInclination:w=0,axialTilt:E=0,rotationPeriod:b=1,color:k="#ffffff",initialOrbitalAngle:R=0,eccentricity:C=0}=f,{simSpeed:L,toggleDetailsMenu:Y}=(0,u.ZP)(),{planetAngles:S,updatePlanetPosition:Z,selectedPlanet:X,setSelectedPlanet:I,displayLabels:D,selectedMoon:T,setSelectedMoon:U,orbitPaths:_}=(0,u.d2)(),{isSurfaceCameraActive:N,satelliteCamera:A,toggleSatelliteCamera:B,setAutoRotate:F,autoRotate:G,activeCamera:O,switchToPlanetCamera:V}=(0,u.g5)(),z=(0,a.useRef)(),W=(0,a.useRef)(S[t]||0),q=(0,a.useRef)(),H=(0,a.useRef)(null),[J,K]=(0,a.useState)(!1),[Q,$]=(0,a.useState)(!1),[ee,et]=(0,a.useState)(!1),er=(0,a.useRef)({x:0,y:0}),en=P*(N?1e-4:c.Hm),ea=g*c.YB;c.E_;let eo=X&&X.name===t,es=()=>!!eo||(null==T?void 0:T.parentName)===t,ei=eo||es()?64:16,[eu,ec]=(0,a.useState)(ea),el=(0,a.useRef)(1),[eh,ed]=(0,a.useState)(!1),[em,ep]=(0,a.useState)(1);(0,s.A)((e,r)=>{let n=r*L;0===W.current?W.current=Math.PI/180*R:W.current-=2*Math.PI/(86400*j)*n;let a=W.current;for(let e=0;e<10;e++){let e=(a-C*Math.sin(a)-W.current)/(1-C*Math.cos(a));if(a-=e,1e-6>Math.abs(e))break}let s=2*Math.atan(Math.sqrt((1+C)/(1-C))*Math.tan(a/2)),i=en*(1-C*C)/(1+C*Math.cos(s)),u=i*Math.cos(-s),c=i*Math.sin(-s);if(z.current){let r=Math.PI/180*w,a=Math.sin(r)*c,s=Math.cos(r)*c;if(z.current.position.set(u,a,s),Z(t,{x:u,y:a,z:s}),b){let e=2*Math.PI/(3600*b)*n,t=new o.Vector3(0,1,0);H.current.rotateOnAxis(t,e),z.current.rotation.y>=2*Math.PI&&eo&&(z.current.rotation.y%=2*Math.PI),q.current&&(q.current.rotation.y+=1.1*e)}let i=z.current.position.distanceTo(e.camera.position);i/1e3<=ea?ec(ea):ec(i/1e3),ed("moon"===O.type||i<500);let l=100*ea,h=1*ea;ep(Math.max(0,Math.min(1,(i-h)/(l-h)))),el.current&&(el.current=.02*i)}}),(0,a.useEffect)(()=>{H.current&&(H.current.rotation.order="YXZ",H.current.rotation.y=0,H.current.rotation.x=o.MathUtils.degToRad(E))},[E,X]);let ex=e=>{e.stopPropagation(),Q||O.name===t||(console.log(T),Y(!0),U(null),I(f),V(t))},ev=e=>{e.stopPropagation(),$(!1),er.current={x:e.clientX,y:e.clientY}},eM=e=>{Math.sqrt(Math.pow(e.clientX-er.current.x,2)+Math.pow(e.clientY-er.current.y,2))>5&&$(!0)},ef=e=>{$(!1)},eg=e=>{e.stopPropagation(),document.body.style.cursor="pointer",et(!0)},ey=e=>{e.stopPropagation(),document.body.style.cursor="auto",et(!1)},eP=p.ZP[t]||[];return(0,n.jsxs)(n.Fragment,{children:[(null==O?void 0:O.name)===t&&z.current&&(0,n.jsx)(h.Z,{target:z.current,targetName:t,size:ea}),(0,n.jsxs)("group",{ref:z,children:[(0,n.jsx)("mesh",{visible:!1,onClick:ex,onPointerDown:ev,onPointerMove:eM,onPointerUp:ef,onPointerOver:eg,onPointerOut:ey,children:(null==O?void 0:O.name)!==t&&(0,n.jsx)("sphereGeometry",{args:[es()?ea:8*eu,8,8]})}),(0,n.jsxs)("mesh",{ref:H,onDoubleClick:e=>{e.stopPropagation(),F(!G)},children:[(0,n.jsx)("sphereGeometry",{args:[es()?ea:8*eu,ei,ei/2]}),eo||es()||!J?(0,n.jsxs)(n.Fragment,{children:["Earth"===t&&eo&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("mesh",{ref:q,children:[(0,n.jsx)("sphereGeometry",{args:[Math.min(1.008*ea),ei,ei/2]}),(0,n.jsx)("meshStandardMaterial",{alphaMap:null==r?void 0:r.clouds,transparent:!0,opacity:.8})]},"".concat(t,"-cloud_texture")),(0,n.jsxs)("mesh",{children:[(0,n.jsx)("sphereGeometry",{args:[Math.min(1.02*ea),ei,ei/2]}),(0,n.jsx)("shaderMaterial",{args:[x.et]})]},"".concat(t,"-atmosphere_texture"))]}),(0,n.jsx)("meshStandardMaterial",{metalness:.6,roughness:.8,map:null==r?void 0:r.map,onBuild:()=>K(!0)})]}):(0,n.jsx)("meshBasicMaterial",{color:k})]},eo?t+"-textured":t+"-basic"),"Saturn"===t&&eh&&(0,n.jsx)(v.Z,{innerRadius:1.2*ea,outerRadius:2*ea,height:0,rotation:[o.MathUtils.degToRad(E),0,0],texture:eo?null==r?void 0:r.ringTexture:null,detail:Math.max(ei,32)},ei+t+"-ring"),"Uranus"===t&&eh&&(0,n.jsx)(v.Z,{innerRadius:1.5*ea,outerRadius:1.9*ea,height:0,texture:eo?null==r?void 0:r.ringTexture:null,detail:Math.max(ei,32),rotation:[o.MathUtils.degToRad(E),0,0]},ei+t+"-ring"),(D&&!eo||ee&&!eo)&&(0,n.jsx)(m.Z,{text:t,size:null==el?void 0:el.current,position:[0,1.2*eu+(null==el?void 0:el.current),0],color:k,handleClick:ex,handlePointerDown:ev,font:"../assets/fonts/Termina_Black.ttf"},t),D&&eo&&(0,n.jsx)(i.V,{as:"span",wrapperClass:"label-wrapper",center:!0,"position-y":eo?eu+.25*eu:4*eu,zIndexRange:[100,0],style:{pointerEvents:"none"},children:(0,n.jsx)("span",{className:"planet-label",style:{color:k},onClick:ex,onPointerDown:ev,onPointerMove:eM,onPointerUp:ef,onPointerOver:eg,onPointerOut:ey,children:t})}),es()&&eP.map((e,r)=>{var a;let s=["Saturn","Uranus"].includes(t);return(0,n.jsx)("group",{rotation:s?[o.MathUtils.degToRad(E),0,0]:[0,0,0],children:(0,n.jsx)(d.Z,{moonData:e,planetPosition:null===(a=z.current)||void 0===a?void 0:a.position,parentName:t},"".concat(t,"-moon-").concat(r))},"".concat(t,"-moon-group-").concat(r))})]}),_&&(0,n.jsx)(l.Z,{origin:y,radius:en,eccentricity:C,orbitalInclination:w,color:k,name:t+"-orbit-path",opacity:.4,hiRes:eo})]})}},8236:function(e,t,r){var n=r(7437),a=r(2265),o=r(7776);t.Z=e=>{let{innerRadius:t,outerRadius:r,height:s=0,rotation:i,texture:u,detail:c=16}=e,l=(0,a.useMemo)(()=>{let e=new o.CylinderGeometry(r,t,s,c,1,!0),n=e.attributes.uv;for(let e=0;e<n.count;e++){let t=n.getX(e),r=n.getY(e);n.setXY(e,t,r)}return e},[t,r,s]),h=(0,a.useMemo)(()=>new o.MeshBasicMaterial({map:u,side:o.DoubleSide,transparent:!0}),[u]);return(0,n.jsx)("mesh",{geometry:l,material:h,rotation:i})}},1675:function(e,t,r){var n=r(7437),a=r(2265),o=r(9373),s=r(5533),i=r(7776),u=r(8384);t.Z=e=>{let{target:t,size:r,targetName:c}=e,{toggleCameraTransitioning:l,setAutoRotate:h,autoRotate:d,activeCamera:m,toggleSatelliteCamera:p,satelliteCamera:x}=(0,u.g5)(),{prevSpeed:v,setSimSpeed:M}=(0,u.ZP)(),{gl:f,camera:g}=(0,o.z)(),y=(0,a.useRef)(),P=(0,a.useRef)(!1),j=(0,a.useRef)({x:0,y:0}),w=(0,a.useRef)(new i.Spherical(6*r,Math.PI/2,0)),E=(0,a.useCallback)(()=>{h(!1)},[h]),b=(0,a.useCallback)(e=>{P.current=!0,j.current={x:e.clientX,y:e.clientY}},[]),k=(0,a.useCallback)(()=>{P.current=!1},[]),R=(0,a.useCallback)(e=>{if(!P.current)return;E();let t=e.clientX-j.current.x,r=e.clientY-j.current.y,n=w.current.phi-.45*r*.01,a=w.current.theta-.45*t*.01;w.current.phi=Math.max(.1,Math.min(Math.PI-.1,n)),w.current.theta=a,j.current={x:e.clientX,y:e.clientY}},[E]),C=(0,a.useCallback)(e=>{if(!x)return;let t=.01*e.deltaY,n=i.MathUtils.clamp(w.current.radius+t,2.5*r,500);w.current.radius=n,E()},[x,r,E]),L=(0,a.useCallback)(e=>{P.current=!0,e.touches?(e.preventDefault(),j.current={x:e.touches[0].clientX,y:e.touches[0].clientY}):j.current={x:e.clientX,y:e.clientY}},[]),Y=(0,a.useCallback)(e=>{if(!P.current)return;E();let t=e.touches?e.touches[0].clientX:e.clientX,r=e.touches?e.touches[0].clientY:e.clientY,n=t-j.current.x,a=r-j.current.y,o=w.current.phi-.003*a,s=w.current.theta-.003*n;w.current.phi=Math.max(.1,Math.min(Math.PI-.1,o)),w.current.theta=s,j.current={x:t,y:r}},[E]);(0,o.A)((e,n)=>{if(!y.current||!t)return;let a=new i.Vector3;t.getWorldPosition(a);let o=t.position.clone();d&&(w.current.theta+=.05*n);let s=new i.Vector3().setFromSpherical(w.current).add(o);y.current.position.copy(s),y.current.lookAt(o),y.current.updateMatrixWorld(),m.name===c&&!x&&g.position.distanceTo(a)<=Math.max(4.3*r,.01)&&S(g,a)});let S=(0,a.useCallback)((e,r)=>{let n=e.position.clone(),a=t.parent.matrixWorld.clone().invert(),o=n.applyMatrix4(a),s=t.position.clone(),i=o.sub(s);w.current.setFromVector3(i),y.current.position.copy(o),y.current.lookAt(s),p(!0),l(!1),M(v)},[t,p,l,M,v]);return(0,a.useEffect)(()=>{let e=f.domElement;return e.addEventListener("mousedown",b),window.addEventListener("mousemove",R),window.addEventListener("mouseup",k),e.addEventListener("wheel",C,{passive:!0}),e.addEventListener("touchstart",L),e.addEventListener("touchmove",Y),e.addEventListener("touchend",k),e.addEventListener("contextmenu",e=>e.preventDefault()),()=>{e.removeEventListener("mousedown",b),window.removeEventListener("mousemove",R),window.removeEventListener("mouseup",k),e.removeEventListener("wheel",C),e.removeEventListener("touchstart",L),e.removeEventListener("touchmove",Y),e.removeEventListener("touchend",k),e.removeEventListener("contextmenu",e=>e.preventDefault()),x&&p(!1)}},[b,R,k,C,L,Y,f.domElement,x,p]),(0,n.jsx)(s.c,{ref:y,name:"satellite-camera-"+c,makeDefault:x,fov:50,near:.01,far:1e6},c)}}}]);