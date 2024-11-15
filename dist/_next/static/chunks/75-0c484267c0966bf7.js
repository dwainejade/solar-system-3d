"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[75],{3537:function(t,e,i){i.d(e,{V:function(){return o}});var s=i(2988),r=i(2265),a=i(7776),n=i(9373);let o=r.forwardRef(function({children:t,follow:e=!0,lockX:i=!1,lockY:o=!1,lockZ:u=!1,...h},l){let p=r.useRef(null),c=r.useRef(null),f=new a.Quaternion;return(0,n.A)(({camera:t})=>{if(!e||!c.current)return;let s=c.current.rotation.clone();c.current.updateMatrix(),c.current.updateWorldMatrix(!1,!1),c.current.getWorldQuaternion(f),t.getWorldQuaternion(p.current.quaternion).premultiply(f.invert()),i&&(c.current.rotation.x=s.x),o&&(c.current.rotation.y=s.y),u&&(c.current.rotation.z=s.z)}),r.useImperativeHandle(l,()=>c.current,[]),r.createElement("group",(0,s.Z)({ref:c,matrixAutoUpdate:!1,matrixWorldAutoUpdate:!1},h),r.createElement("group",{ref:p},t))})},4379:function(t,e,i){i.d(e,{x:function(){return o}});var s=i(2988),r=i(2265),a=i(9373),n=i(9429);let o=r.forwardRef(({sdfGlyphSize:t=64,anchorX:e="center",anchorY:o="middle",font:u,fontSize:h=1,children:l,characters:p,onSync:c,...f},d)=>{let{Text:v,preloadFont:m}=(0,n.Rq)(async()=>Promise.all([i.e(918),i.e(610)]).then(i.bind(i,5212)),[]),y=(0,a.z)(({invalidate:t})=>t),[b]=r.useState(()=>new v),[g,A]=r.useMemo(()=>{let t=[],e="";return r.Children.forEach(l,i=>{"string"==typeof i||"number"==typeof i?e+=i:t.push(i)}),[t,e]},[l]);return(0,n.Rq)(()=>new Promise(t=>m({font:u,characters:p},t)),["troika-text",u,p]),r.useLayoutEffect(()=>void b.sync(()=>{y(),c&&c(b)})),r.useEffect(()=>()=>b.dispose(),[b]),r.createElement("primitive",(0,s.Z)({object:b,ref:d,font:u,text:A,anchorX:e,anchorY:o,fontSize:h,sdfGlyphSize:t},f),g)})},8811:function(t,e,i){i.d(e,{Q:function(){return y}});var s=i(9373),r=i(2265),a=i(7776),n=Object.defineProperty,o=(t,e,i)=>e in t?n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,u=(t,e,i)=>(o(t,"symbol"!=typeof e?e+"":e,i),i);function h(t,e,i,s,r){let a;if(t=t.subarray||t.slice?t:t.buffer,i=i.subarray||i.slice?i:i.buffer,t=e?t.subarray?t.subarray(e,r&&e+r):t.slice(e,r&&e+r):t,i.set)i.set(t,s);else for(a=0;a<t.length;a++)i[a+s]=t[a];return i}class l extends a.BufferGeometry{constructor(){super(),u(this,"type","MeshLine"),u(this,"isMeshLine",!0),u(this,"positions",[]),u(this,"previous",[]),u(this,"next",[]),u(this,"side",[]),u(this,"width",[]),u(this,"indices_array",[]),u(this,"uvs",[]),u(this,"counters",[]),u(this,"widthCallback",null),u(this,"_attributes"),u(this,"_points",[]),u(this,"points"),u(this,"matrixWorld",new a.Matrix4),Object.defineProperties(this,{points:{enumerable:!0,get(){return this._points},set(t){this.setPoints(t,this.widthCallback)}}})}setMatrixWorld(t){this.matrixWorld=t}setPoints(t,e){var i;if(t=(i=t)instanceof Float32Array?i:i instanceof a.BufferGeometry?i.getAttribute("position").array:i.map(t=>{let e=Array.isArray(t);return t instanceof a.Vector3?[t.x,t.y,t.z]:t instanceof a.Vector2?[t.x,t.y,0]:e&&3===t.length?[t[0],t[1],t[2]]:e&&2===t.length?[t[0],t[1],0]:t}).flat(),this._points=t,this.widthCallback=null!=e?e:null,this.positions=[],this.counters=[],t.length&&t[0]instanceof a.Vector3)for(let e=0;e<t.length;e++){let i=t[e],s=e/(t.length-1);this.positions.push(i.x,i.y,i.z),this.positions.push(i.x,i.y,i.z),this.counters.push(s),this.counters.push(s)}else for(let e=0;e<t.length;e+=3){let i=e/(t.length-1);this.positions.push(t[e],t[e+1],t[e+2]),this.positions.push(t[e],t[e+1],t[e+2]),this.counters.push(i),this.counters.push(i)}this.process()}compareV3(t,e){let i=6*t,s=6*e;return this.positions[i]===this.positions[s]&&this.positions[i+1]===this.positions[s+1]&&this.positions[i+2]===this.positions[s+2]}copyV3(t){let e=6*t;return[this.positions[e],this.positions[e+1],this.positions[e+2]]}process(){let t,e;let i=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[],e=this.compareV3(0,i-1)?this.copyV3(i-2):[this.positions[0]-(this.positions[6]-this.positions[0]),this.positions[1]-(this.positions[7]-this.positions[1]),this.positions[2]-(this.positions[8]-this.positions[2])],this.previous.push(e[0],e[1],e[2]),this.previous.push(e[0],e[1],e[2]);for(let s=0;s<i;s++){if(this.side.push(1),this.side.push(-1),t=this.widthCallback?this.widthCallback(s/(i-1)):1,this.width.push(t),this.width.push(t),this.uvs.push(s/(i-1),0),this.uvs.push(s/(i-1),1),s<i-1){e=this.copyV3(s),this.previous.push(e[0],e[1],e[2]),this.previous.push(e[0],e[1],e[2]);let t=2*s;this.indices_array.push(t,t+1,t+2),this.indices_array.push(t+2,t+1,t+3)}s>0&&(e=this.copyV3(s),this.next.push(e[0],e[1],e[2]),this.next.push(e[0],e[1],e[2]))}e=this.compareV3(i-1,0)?this.copyV3(1):[this.positions[i-1]+(this.positions[i-1]-this.positions[i-1-6]),this.positions[i-2]+(this.positions[i-2]-this.positions[i-2-6]),this.positions[i-3]+(this.positions[i-3]-this.positions[i-3-6])],this.next.push(e[0],e[1],e[2]),this.next.push(e[0],e[1],e[2]),this._attributes&&this._attributes.position.count===this.counters.length?(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0):this._attributes={position:new a.BufferAttribute(new Float32Array(this.positions),3),previous:new a.BufferAttribute(new Float32Array(this.previous),3),next:new a.BufferAttribute(new Float32Array(this.next),3),side:new a.BufferAttribute(new Float32Array(this.side),1),width:new a.BufferAttribute(new Float32Array(this.width),1),uv:new a.BufferAttribute(new Float32Array(this.uvs),2),index:new a.BufferAttribute(new Uint16Array(this.indices_array),1),counters:new a.BufferAttribute(new Float32Array(this.counters),1)},this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:t,y:e,z:i}){let s=this._attributes.position.array,r=this._attributes.previous.array,a=this._attributes.next.array,n=s.length;h(s,0,r,0,n),h(s,6,s,0,n-6),s[n-6]=t,s[n-5]=e,s[n-4]=i,s[n-3]=t,s[n-2]=e,s[n-1]=i,h(s,6,a,0,n-6),a[n-6]=t,a[n-5]=e,a[n-4]=i,a[n-3]=t,a[n-2]=e,a[n-1]=i,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}}let p=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  #include <fog_pars_vertex>
  #include <clipping_planes_pars_vertex>

  attribute vec3 previous;
  attribute vec3 next;
  attribute float side;
  attribute float width;
  attribute float counters;
  
  uniform vec2 resolution;
  uniform float lineWidth;
  uniform vec3 color;
  uniform float opacity;
  uniform float sizeAttenuation;
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
  	vCounters = counters;
    return res;
  }
  
  void main() {
    float aspect = resolution.x / resolution.y;
    vColor = vec4(color, opacity);
    vUV = uv;
  
    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4(position, 1.0) * aspect;
    vec4 prevPos = m * vec4(previous, 1.0);
    vec4 nextPos = m * vec4(next, 1.0);
  
    vec2 currentP = fix(finalPosition, aspect);
    vec2 prevP = fix(prevPos, aspect);
    vec2 nextP = fix(nextPos, aspect);
  
    float w = lineWidth * width;
  
    vec2 dir1 = normalize(currentP - prevP);
    vec2 dir2 = normalize(nextP - currentP);
    vec2 dir = normalize(dir1 + dir2);

    vec2 perp = vec2(-dir1.y, dir1.x);
    vec2 miter = vec2(-dir.y, dir.x);
    //w = clamp(w / dot(miter, perp), 0., 4. * lineWidth * width);
  
    //vec2 normal = (cross(vec3(dir, 0.), vec3(0., 0., 1.))).xy;
    vec4 normal = vec4(-dir.y, dir.x, 0., 1.);
    normal.xy *= .5 * w;
    //normal *= projectionMatrix;
    if (sizeAttenuation == 0.) {
      normal.xy *= finalPosition.w;
      normal.xy /= (vec4(resolution, 0., 1.) * projectionMatrix).xy * aspect;
    }
  
    finalPosition.xy += normal.xy * side;
    gl_Position = finalPosition;
    #include <logdepthbuf_vertex>
    #include <fog_vertex>
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    #include <clipping_planes_vertex>
    #include <fog_vertex>
  }
`,c=parseInt(a.REVISION.replace(/\D+/g,"")),f=`
  #include <fog_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>
  
  uniform sampler2D map;
  uniform sampler2D alphaMap;
  uniform float useGradient;
  uniform float useMap;
  uniform float useAlphaMap;
  uniform float useDash;
  uniform float dashArray;
  uniform float dashOffset;
  uniform float dashRatio;
  uniform float visibility;
  uniform float alphaTest;
  uniform vec2 repeat;
  uniform vec3 gradient[2];
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  void main() {
    #include <logdepthbuf_fragment>
    vec4 diffuseColor = vColor;
    if (useGradient == 1.) diffuseColor = vec4(mix(gradient[0], gradient[1], vCounters), 1.0);
    if (useMap == 1.) diffuseColor *= texture2D(map, vUV * repeat);
    if (useAlphaMap == 1.) diffuseColor.a *= texture2D(alphaMap, vUV * repeat).a;
    if (diffuseColor.a < alphaTest) discard;
    if (useDash == 1.) diffuseColor.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
    diffuseColor.a *= step(vCounters, visibility);
    #include <clipping_planes_fragment>
    gl_FragColor = diffuseColor;     
    #include <fog_fragment>
    #include <tonemapping_fragment>
    #include <${c>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`;class d extends a.ShaderMaterial{constructor(t){super({uniforms:{...a.UniformsLib.fog,lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new a.Color(16777215)},gradient:{value:[new a.Color(16711680),new a.Color(65280)]},opacity:{value:1},resolution:{value:new a.Vector2(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},useGradient:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new a.Vector2(1,1)}},vertexShader:p,fragmentShader:f}),u(this,"lineWidth"),u(this,"map"),u(this,"useMap"),u(this,"alphaMap"),u(this,"useAlphaMap"),u(this,"color"),u(this,"gradient"),u(this,"opacity",1),u(this,"resolution"),u(this,"sizeAttenuation"),u(this,"dashArray"),u(this,"dashOffset"),u(this,"dashRatio"),u(this,"useDash"),u(this,"useGradient"),u(this,"visibility"),u(this,"alphaTest",0),u(this,"repeat"),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(t){this.uniforms.lineWidth.value=t}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(t){this.uniforms.map.value=t}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(t){this.uniforms.useMap.value=t}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(t){this.uniforms.alphaMap.value=t}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(t){this.uniforms.useAlphaMap.value=t}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(t){this.uniforms.color.value=t}},gradient:{enumerable:!0,get(){return this.uniforms.gradient.value},set(t){this.uniforms.gradient.value=t}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(t){this.uniforms.resolution.value.copy(t)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(t){this.uniforms.sizeAttenuation.value=t}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(t){this.uniforms.dashArray.value=t,this.useDash=0!==t?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(t){this.uniforms.dashOffset.value=t}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(t){this.uniforms.dashRatio.value=t}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(t){this.uniforms.useDash.value=t}},useGradient:{enumerable:!0,get(){return this.uniforms.useGradient.value},set(t){this.uniforms.useGradient.value=t}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(t){this.uniforms.visibility.value=t}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(t){this.uniforms.alphaTest.value=t}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(t){this.uniforms.repeat.value.copy(t)}}}),this.setValues(t)}copy(t){return super.copy(t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.gradient=t.gradient,this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray=t.dashArray,this.dashOffset=t.dashOffset,this.dashRatio=t.dashRatio,this.useDash=t.useDash,this.useGradient=t.useGradient,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this}}let v={width:.2,length:1,decay:1,local:!1,stride:0,interval:1},m=(t,e=1)=>(t.set(t.subarray(e)),t.fill(-1/0,-e),t),y=r.forwardRef((t,e)=>{let{children:i}=t,{width:n,length:o,decay:u,local:h,stride:p,interval:c}={...v,...t},{color:f="hotpink",attenuation:y,target:b}=t,g=(0,s.z)(t=>t.size),A=(0,s.z)(t=>t.scene),x=r.useRef(null),[_,w]=r.useState(null),M=function(t,e){let{length:i,local:n,decay:o,interval:u,stride:h}={...v,...e},l=r.useRef(),[p]=r.useState(()=>new a.Vector3);r.useLayoutEffect(()=>{t&&(l.current=Float32Array.from({length:30*i},(e,i)=>t.position.getComponent(i%3)))},[i,t]);let c=r.useRef(new a.Vector3),f=r.useRef(0);return(0,s.A)(()=>{if(t&&l.current){if(0===f.current){let e;n?e=t.position:(t.getWorldPosition(p),e=p);let i=1*o;for(let t=0;t<i;t++)e.distanceTo(c.current)<h||(m(l.current,3),l.current.set(e.toArray(),l.current.length-3));c.current.copy(e)}f.current++,f.current=f.current%u}}),l}(_,{length:o,decay:u,local:h,stride:p,interval:c});r.useEffect(()=>{let t=(null==b?void 0:b.current)||x.current.children.find(t=>t instanceof a.Object3D);t&&w(t)},[M,b]);let C=r.useMemo(()=>new l,[]),P=r.useMemo(()=>{var t;let e;let s=new d({lineWidth:.1*n,color:f,sizeAttenuation:1,resolution:new a.Vector2(g.width,g.height)});return i&&(Array.isArray(i)?e=i.find(t=>"string"==typeof t.type&&"meshLineMaterial"===t.type):"string"==typeof i.type&&"meshLineMaterial"===i.type&&(e=i)),"object"==typeof(null==(t=e)?void 0:t.props)&&s.setValues(e.props),s},[n,f,g,i]);return r.useEffect(()=>{P.uniforms.resolution.value.set(g.width,g.height)},[g]),(0,s.A)(()=>{M.current&&C.setPoints(M.current,y)}),r.createElement("group",null,(0,s.g)(r.createElement("mesh",{ref:e,geometry:C,material:P}),A),r.createElement("group",{ref:x},i))})}}]);