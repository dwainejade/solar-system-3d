(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[948],{2782:function(e,t,s){Promise.resolve().then(s.bind(s,6223)),Promise.resolve().then(s.bind(s,1336))},6223:function(e,t,s){"use strict";s.r(t);var r=s(3827),a=s(4090),n=s(7475),u=s(7808),o=s(4541),i=s(7912),p=s(424),c=s(440),m=s(6376),x=s(1653),l=s(5556),d=s(8675),f=s(2597);t.default=()=>{let{sunSettings:e,rotationCounts:t,simulationDate:s}=(0,i.ZP)(),{planetPositions:y,selectedPlanet:j,selectedMoon:_}=(0,i.d2)(),{surfacePoint:Z,isSurfaceCameraActive:k}=(0,i.g5)(),b=(0,a.useRef)(),g=(0,a.useRef)(),[D,P]=(0,a.useState)(200),h=()=>{if(!g.current)return;P(200),g.current.setTarget(e.position.x,e.position.y,e.position.z,!0);let t={x:e.position.x+-2e3,y:e.position.y+1e3,z:e.position.z+1e3};g.current.setPosition(t.x,t.y,t.z,!0)};(0,a.useEffect)(()=>{if(j&&g.current){let e=y[j.name];if(e){let t=p.ZP[j.name].radius*p.YB*4;P(t/2),g.current.setTarget(e.x,e.y,e.z,!0),g.current.dollyTo(t,!0)}"Sun"===j.name&&(P(200),g.current.setTarget(0,0,0,!0),g.current.dollyTo(200,!0))}},[j,y]),(0,a.useEffect)(()=>{if(_&&g.current){let e=_.position;if(e){let t=_.bodyData.radius*c.sh*4;P(t/2),g.current.setTarget(e.x,e.y,e.z,!0),g.current.dollyTo(t,!0)}}},[_,c._d]),(0,a.useEffect)(()=>{!j&&g.current&&h()},[j,e.position]),(0,x.A)(()=>{if(k&&Z&&j){let e=y[j.name];if(e){let t=new m.Vector3(e.x,e.y,e.z),s=new m.Vector3(Z.x,Z.y,Z.z).sub(t).normalize(),r=new m.Vector3(Z.x,Z.y,Z.z).add(s.multiplyScalar(.1));b.current.position.copy(r);let a=r.clone().add(s);b.current.lookAt(a),b.current.up.copy(s)}}});let z=(0,n.m)({map:"./assets/earth/2k_earth_daymap.jpg"}),v=(0,n.m)({map:"./assets/venus/2k_venus_surface.jpg",surface:"./assets/venus/2k_venus_atmosphere.jpg"}),S=(0,n.m)({map:"./assets/mercury/2k_mercury.jpg"}),T=(0,n.m)({map:"./assets/mars/2k_mars.jpg"}),E=(0,n.m)({map:"./assets/jupiter/2k_jupiter.jpg"}),w=(0,n.m)({map:"./assets/saturn/2k_saturn.jpg"}),N=(0,n.m)({map:"./assets/uranus/2k_uranus.jpg"}),V=(0,n.m)({map:"./assets/neptune/2k_neptune.jpg"}),C=(e,t)=>(c._d[e]||[]).map((t,s)=>(0,r.jsx)(l.Z,{bodyData:t,parentPosition:y[e],parentName:e},"".concat(e,"-moon-").concat(s)));return(0,r.jsxs)(r.Fragment,{children:[!k&&(0,r.jsx)(u.B,{ref:g,makeDefault:!0,maxDistance:9e4,smoothTime:.8,truckSpeed:1,rotateSpeed:1,zoomSpeed:.1,minDistance:Math.max(.02,D)}),Z&&k&&(0,r.jsx)(o.c,{ref:b,makeDefault:!0,position:[Z.x,Z.y+10,Z.z],fov:70,near:.01,far:1e6}),(0,r.jsx)(f.Z,{bodyData:p.ZP.Earth,textures:z}),(0,r.jsx)(f.Z,{bodyData:p.ZP.Mars,textures:T}),(0,r.jsx)(f.Z,{bodyData:p.ZP.Venus,textures:v}),(0,r.jsx)(f.Z,{bodyData:p.ZP.Mercury,textures:S}),(0,r.jsx)(f.Z,{bodyData:p.ZP.Jupiter,textures:E}),(0,r.jsx)(f.Z,{bodyData:p.ZP.Saturn,textures:w}),(0,r.jsx)(f.Z,{bodyData:p.ZP.Uranus,textures:N}),(0,r.jsx)(f.Z,{bodyData:p.ZP.Neptune,textures:V}),Object.entries(c._d).map(e=>{let[t,s]=e;return C(t,s)}),(0,r.jsx)(d.Z,{position:e.position,resetCamera:h},"Sun-plain")]})}}},function(e){e.O(0,[689,723,800,896,417,971,69,744],function(){return e(e.s=2782)}),_N_E=e.O()}]);