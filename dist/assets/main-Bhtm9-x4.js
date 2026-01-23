(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const _={speed:0,maxSpeed:80,acceleration:.3,friction:.97,maxSpeedWarning:70,arrestDistance:30,arrested:!1,startTime:Date.now(),elapsedTime:0,money:0,rebirthPoints:0,totalMoney:0,selectedCar:"standard",lastMoneyCheckTime:0,lastPoliceSpawnTime:0,policeCars:[],chunks:[],chunkGrid:{},activeChunks:[],fallenDebris:[],smallDebris:[],chunkGridSize:200,heatLevel:1,collectibles:[],projectiles:[],slowEffect:0,slowDuration:0,sparks:[],baseFOV:75,currentFOV:75,screenShake:0,velocityX:0,velocityZ:0,angularVelocity:0,driftFactor:0,tireMarks:[],carTilt:0,wheelAngle:0,speedParticles:[],is2DMode:!1,health:100,arrestCountdown:0,arrestStartTime:0,policeKilled:0,isMultiplayer:!1,isHost:!1,playerId:null,roomCode:null,otherPlayers:new Map,playerColor:16711680},un={},ye={heatIncreaseInterval:60,maxHeatLevel:6,arrestCountdownTime:1,arrestSpeedThreshold:.1,touchArrest:!0,playerCrashDamageMultiplier:.3,policeCrashDamageMultiplier:.4,minCrashDamage:5,policeSpawnInterval:10,passiveIncomeInterval:10,passiveIncomeBase:100,coinBaseValue:50};function Bh(){const s=localStorage.getItem("gameConfig");if(s)try{const t=JSON.parse(s);Object.assign(ye,t)}catch(t){console.warn("Failed to load saved config:",t)}}Bh();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jo="160",zh=0,Ea=1,Gh=2,kh=0,Ic=1,Hh=2,zn=3,ii=0,$e=1,Ce=2,ti=0,ji=1,wa=2,ba=3,Ta=4,Vh=5,vi=100,Wh=101,Xh=102,Aa=103,Ca=104,qh=200,Yh=201,jh=202,$h=203,Co=204,Ro=205,Kh=206,Zh=207,Jh=208,Qh=209,td=210,ed=211,nd=212,id=213,sd=214,rd=0,od=1,ad=2,vr=3,ld=4,cd=5,hd=6,dd=7,Ar=0,ud=1,fd=2,ei=0,pd=1,md=2,gd=3,vd=4,_d=5,xd=6,Nc=300,ts=301,es=302,Po=303,Lo=304,Cr=306,Do=1e3,pn=1001,Io=1002,We=1003,Ra=1004,zr=1005,rn=1006,yd=1007,bs=1008,ni=1009,Md=1010,Sd=1011,Qo=1012,Uc=1013,Zn=1014,Jn=1015,Ts=1016,Fc=1017,Oc=1018,Mi=1020,Ed=1021,mn=1023,wd=1024,bd=1025,Si=1026,ns=1027,Td=1028,Bc=1029,Ad=1030,zc=1031,Gc=1033,Gr=33776,kr=33777,Hr=33778,Vr=33779,Pa=35840,La=35841,Da=35842,Ia=35843,kc=36196,Na=37492,Ua=37496,Fa=37808,Oa=37809,Ba=37810,za=37811,Ga=37812,ka=37813,Ha=37814,Va=37815,Wa=37816,Xa=37817,qa=37818,Ya=37819,ja=37820,$a=37821,Wr=36492,Ka=36494,Za=36495,Cd=36283,Ja=36284,Qa=36285,tl=36286,Hc=3e3,Ei=3001,Rd=3200,Pd=3201,ta=0,Ld=1,an="",Pe="srgb",kn="srgb-linear",ea="display-p3",Rr="display-p3-linear",_r="linear",le="srgb",xr="rec709",yr="p3",Ti=7680,el=519,Dd=512,Id=513,Nd=514,Vc=515,Ud=516,Fd=517,Od=518,Bd=519,nl=35044,il="300 es",No=1035,Gn=2e3,Mr=2001;class rs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xr=Math.PI/180,Uo=180/Math.PI;function Rs(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Ye(s,t,e){return Math.max(t,Math.min(e,s))}function zd(s,t){return(s%t+t)%t}function qr(s,t,e){return(1-e)*s+e*t}function sl(s){return(s&s-1)===0&&s!==0}function Fo(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ds(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Xe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Jt{constructor(t=0,e=0){Jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,n,i,r,o,a,l,c){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],m=n[5],g=n[8],v=i[0],f=i[3],p=i[6],x=i[1],y=i[4],E=i[7],P=i[2],w=i[5],C=i[8];return r[0]=o*v+a*x+l*P,r[3]=o*f+a*y+l*w,r[6]=o*p+a*E+l*C,r[1]=c*v+h*x+u*P,r[4]=c*f+h*y+u*w,r[7]=c*p+h*E+u*C,r[2]=d*v+m*x+g*P,r[5]=d*f+m*y+g*w,r[8]=d*p+m*E+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,m=c*r-o*l,g=e*u+n*d+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-a*e)*v,t[6]=m*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Yr.makeScale(t,e)),this}rotate(t){return this.premultiply(Yr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yr=new $t;function Wc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Sr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Gd(){const s=Sr("canvas");return s.style.display="block",s}const rl={};function Es(s){s in rl||(rl[s]=!0,console.warn(s))}const ol=new $t().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),al=new $t().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ns={[kn]:{transfer:_r,primaries:xr,toReference:s=>s,fromReference:s=>s},[Pe]:{transfer:le,primaries:xr,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Rr]:{transfer:_r,primaries:yr,toReference:s=>s.applyMatrix3(al),fromReference:s=>s.applyMatrix3(ol)},[ea]:{transfer:le,primaries:yr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(al),fromReference:s=>s.applyMatrix3(ol).convertLinearToSRGB()}},kd=new Set([kn,Rr]),ie={enabled:!0,_workingColorSpace:kn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!kd.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Ns[t].toReference,i=Ns[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Ns[s].primaries},getTransfer:function(s){return s===an?_r:Ns[s].transfer}};function $i(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function jr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ai;class Xc{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ai===void 0&&(Ai=Sr("canvas")),Ai.width=t.width,Ai.height=t.height;const n=Ai.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ai}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Sr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=$i(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($i(e[n]/255)*255):e[n]=$i(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Hd=0;class qc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=Rs(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push($r(i[o].image)):r.push($r(i[o]))}else r=$r(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function $r(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Xc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vd=0;class Qe extends rs{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,n=pn,i=pn,r=rn,o=bs,a=mn,l=ni,c=Qe.DEFAULT_ANISOTROPY,h=an){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Rs(),this.name="",this.source=new qc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Jt(0,0),this.repeat=new Jt(1,1),this.center=new Jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Es("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ei?Pe:an),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Nc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Do:t.x=t.x-Math.floor(t.x);break;case pn:t.x=t.x<0?0:1;break;case Io:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Do:t.y=t.y-Math.floor(t.y);break;case pn:t.y=t.y<0?0:1;break;case Io:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Es("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Pe?Ei:Hc}set encoding(t){Es("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Ei?Pe:an}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=Nc;Qe.DEFAULT_ANISOTROPY=1;class Re{constructor(t=0,e=0,n=0,i=1){Re.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],m=l[5],g=l[9],v=l[2],f=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+f)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,E=(m+1)/2,P=(p+1)/2,w=(h+d)/4,C=(u+v)/4,z=(g+f)/4;return y>E&&y>P?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=w/n,r=C/n):E>P?E<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(E),n=w/i,r=z/i):P<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(P),n=C/r,i=z/r),this.set(n,i,r,e),this}let x=Math.sqrt((f-g)*(f-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(f-g)/x,this.y=(u-v)/x,this.z=(d-h)/x,this.w=Math.acos((c+m+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wd extends rs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Es("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ei?Pe:an),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Qe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new qc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wi extends Wd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Yc extends Qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xd extends Qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=We,this.minFilter=We,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let os=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],m=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=m,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==m||h!==g){let f=1-a;const p=l*d+c*m+h*g+u*v,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const P=Math.sqrt(y),w=Math.atan2(P,p*x);f=Math.sin(f*w)/P,a=Math.sin(a*w)/P}const E=a*x;if(l=l*f+d*E,c=c*f+m*E,h=h*f+g*E,u=u*f+v*E,f===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],m=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*m-c*d,t[e+1]=l*g+h*d+c*u-a*m,t[e+2]=c*g+h*m+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),m=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u-d*m*g;break;case"YXZ":this._x=d*h*u+c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u+d*m*g;break;case"ZXY":this._x=d*h*u-c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u-d*m*g;break;case"ZYX":this._x=d*h*u-c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u+d*m*g;break;case"YZX":this._x=d*h*u+c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u-d*m*g;break;case"XZY":this._x=d*h*u-c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u+d*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(o-i)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(r+c)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(r-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-i)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(r),n*Math.cos(r),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class O{constructor(t=0,e=0,n=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ll.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ll.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Kr.copy(this).projectOnVector(t),this.sub(Kr)}reflect(t){return this.sub(Kr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kr=new O,ll=new os;class as{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ln):ln.fromBufferAttribute(r,o),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Us.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Us.copy(n.boundingBox)),Us.applyMatrix4(t.matrixWorld),this.union(Us)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(us),Fs.subVectors(this.max,us),Ci.subVectors(t.a,us),Ri.subVectors(t.b,us),Pi.subVectors(t.c,us),Wn.subVectors(Ri,Ci),Xn.subVectors(Pi,Ri),ai.subVectors(Ci,Pi);let e=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-ai.z,ai.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,ai.z,0,-ai.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-ai.y,ai.x,0];return!Zr(e,Ci,Ri,Pi,Fs)||(e=[1,0,0,0,1,0,0,0,1],!Zr(e,Ci,Ri,Pi,Fs))?!1:(Os.crossVectors(Wn,Xn),e=[Os.x,Os.y,Os.z],Zr(e,Ci,Ri,Pi,Fs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Rn=[new O,new O,new O,new O,new O,new O,new O,new O],ln=new O,Us=new as,Ci=new O,Ri=new O,Pi=new O,Wn=new O,Xn=new O,ai=new O,us=new O,Fs=new O,Os=new O,li=new O;function Zr(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){li.fromArray(s,r);const a=i.x*Math.abs(li.x)+i.y*Math.abs(li.y)+i.z*Math.abs(li.z),l=t.dot(li),c=e.dot(li),h=n.dot(li);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const qd=new as,fs=new O,Jr=new O;let na=class{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):qd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fs.subVectors(t,this.center);const e=fs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(fs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fs.copy(t.center).add(Jr)),this.expandByPoint(fs.copy(t.center).sub(Jr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}};const Pn=new O,Qr=new O,Bs=new O,qn=new O,to=new O,zs=new O,eo=new O;let Yd=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Qr.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(Qr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Bs),a=qn.dot(this.direction),l=-qn.dot(Bs),c=qn.lengthSq(),h=Math.abs(1-o*o);let u,d,m,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,m=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),m=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Qr).addScaledVector(Bs,d),m}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);const n=Pn.dot(this.direction),i=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,i,r){to.subVectors(e,t),zs.subVectors(n,t),eo.crossVectors(to,zs);let o=this.direction.dot(eo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qn.subVectors(this.origin,t);const l=a*this.direction.dot(zs.crossVectors(qn,zs));if(l<0)return null;const c=a*this.direction.dot(to.cross(qn));if(c<0||l+c>o)return null;const h=-a*qn.dot(eo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class Me{constructor(t,e,n,i,r,o,a,l,c,h,u,d,m,g,v,f){Me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,u,d,m,g,v,f)}set(t,e,n,i,r,o,a,l,c,h,u,d,m,g,v,f){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=m,p[7]=g,p[11]=v,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Li.setFromMatrixColumn(t,0).length(),r=1/Li.setFromMatrixColumn(t,1).length(),o=1/Li.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,m=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+g*c,e[5]=d-v*c,e[9]=-a*l,e[2]=v-d*c,e[6]=g+m*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,m=l*u,g=c*h,v=c*u;e[0]=d+v*a,e[4]=g*a-m,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=m*a-g,e[6]=v+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,m=l*u,g=c*h,v=c*u;e[0]=d-v*a,e[4]=-o*u,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,m=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=g*c-m,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=m*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,m=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+m,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=m*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*l,m=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=o*h,e[9]=m*u-g,e[2]=g*u-m,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(jd,t,$d)}lookAt(t,e,n){const i=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Yn.crossVectors(n,Ze),Yn.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Yn.crossVectors(n,Ze)),Yn.normalize(),Gs.crossVectors(Ze,Yn),i[0]=Yn.x,i[4]=Gs.x,i[8]=Ze.x,i[1]=Yn.y,i[5]=Gs.y,i[9]=Ze.y,i[2]=Yn.z,i[6]=Gs.z,i[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],m=n[13],g=n[2],v=n[6],f=n[10],p=n[14],x=n[3],y=n[7],E=n[11],P=n[15],w=i[0],C=i[4],z=i[8],S=i[12],T=i[1],B=i[5],F=i[9],N=i[13],L=i[2],D=i[6],I=i[10],V=i[14],G=i[3],H=i[7],K=i[11],Q=i[15];return r[0]=o*w+a*T+l*L+c*G,r[4]=o*C+a*B+l*D+c*H,r[8]=o*z+a*F+l*I+c*K,r[12]=o*S+a*N+l*V+c*Q,r[1]=h*w+u*T+d*L+m*G,r[5]=h*C+u*B+d*D+m*H,r[9]=h*z+u*F+d*I+m*K,r[13]=h*S+u*N+d*V+m*Q,r[2]=g*w+v*T+f*L+p*G,r[6]=g*C+v*B+f*D+p*H,r[10]=g*z+v*F+f*I+p*K,r[14]=g*S+v*N+f*V+p*Q,r[3]=x*w+y*T+E*L+P*G,r[7]=x*C+y*B+E*D+P*H,r[11]=x*z+y*F+E*I+P*K,r[15]=x*S+y*N+E*V+P*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],m=t[14],g=t[3],v=t[7],f=t[11],p=t[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*m-n*l*m)+v*(+e*l*m-e*c*d+r*o*d-i*o*m+i*c*h-r*l*h)+f*(+e*c*u-e*a*m-r*o*u+n*o*m+r*a*h-n*c*h)+p*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],m=t[11],g=t[12],v=t[13],f=t[14],p=t[15],x=u*f*c-v*d*c+v*l*m-a*f*m-u*l*p+a*d*p,y=g*d*c-h*f*c-g*l*m+o*f*m+h*l*p-o*d*p,E=h*v*c-g*u*c+g*a*m-o*v*m-h*a*p+o*u*p,P=g*u*l-h*v*l-g*a*d+o*v*d+h*a*f-o*u*f,w=e*x+n*y+i*E+r*P;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return t[0]=x*C,t[1]=(v*d*r-u*f*r-v*i*m+n*f*m+u*i*p-n*d*p)*C,t[2]=(a*f*r-v*l*r+v*i*c-n*f*c-a*i*p+n*l*p)*C,t[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*m-n*l*m)*C,t[4]=y*C,t[5]=(h*f*r-g*d*r+g*i*m-e*f*m-h*i*p+e*d*p)*C,t[6]=(g*l*r-o*f*r-g*i*c+e*f*c+o*i*p-e*l*p)*C,t[7]=(o*d*r-h*l*r+h*i*c-e*d*c-o*i*m+e*l*m)*C,t[8]=E*C,t[9]=(g*u*r-h*v*r-g*n*m+e*v*m+h*n*p-e*u*p)*C,t[10]=(o*v*r-g*a*r+g*n*c-e*v*c-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*m-e*a*m)*C,t[12]=P*C,t[13]=(h*v*i-g*u*i+g*n*d-e*v*d-h*n*f+e*u*f)*C,t[14]=(g*a*i-o*v*i-g*n*l+e*v*l+o*n*f-e*a*f)*C,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,m=r*h,g=r*u,v=o*h,f=o*u,p=a*u,x=l*c,y=l*h,E=l*u,P=n.x,w=n.y,C=n.z;return i[0]=(1-(v+p))*P,i[1]=(m+E)*P,i[2]=(g-y)*P,i[3]=0,i[4]=(m-E)*w,i[5]=(1-(d+p))*w,i[6]=(f+x)*w,i[7]=0,i[8]=(g+y)*C,i[9]=(f-x)*C,i[10]=(1-(d+v))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Li.set(i[0],i[1],i[2]).length();const o=Li.set(i[4],i[5],i[6]).length(),a=Li.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],cn.copy(this);const c=1/r,h=1/o,u=1/a;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=h,cn.elements[5]*=h,cn.elements[6]*=h,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,e.setFromRotationMatrix(cn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Gn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let m,g;if(a===Gn)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Mr)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Gn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-r),d=(e+t)*c,m=(n+i)*h;let g,v;if(a===Gn)g=(o+r)*u,v=-2*u;else if(a===Mr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Li=new O,cn=new Me,jd=new O(0,0,0),$d=new O(1,1,1),Yn=new O,Gs=new O,Ze=new O,cl=new Me,hl=new os;class Pr{constructor(t=0,e=0,n=0,i=Pr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return cl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(cl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return hl.setFromEuler(this),this.setFromQuaternion(hl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pr.DEFAULT_ORDER="XYZ";class jc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Kd=0;const dl=new O,Di=new os,Ln=new Me,ks=new O,ps=new O,Zd=new O,Jd=new os,ul=new O(1,0,0),fl=new O(0,1,0),pl=new O(0,0,1),Qd={type:"added"},tu={type:"removed"};class De extends rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=Rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new O,e=new Pr,n=new os,i=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Me},normalMatrix:{value:new $t}}),this.matrix=new Me,this.matrixWorld=new Me,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.multiply(Di),this}rotateOnWorldAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.premultiply(Di),this}rotateX(t){return this.rotateOnAxis(ul,t)}rotateY(t){return this.rotateOnAxis(fl,t)}rotateZ(t){return this.rotateOnAxis(pl,t)}translateOnAxis(t,e){return dl.copy(t).applyQuaternion(this.quaternion),this.position.add(dl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ul,t)}translateY(t){return this.translateOnAxis(fl,t)}translateZ(t){return this.translateOnAxis(pl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ks.copy(t):ks.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(ps,ks,this.up):Ln.lookAt(ks,ps,this.up),this.quaternion.setFromRotationMatrix(Ln),i&&(Ln.extractRotation(i.matrixWorld),Di.setFromRotationMatrix(Ln),this.quaternion.premultiply(Di.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Qd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(tu)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,t,Zd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,Jd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}De.DEFAULT_UP=new O(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new O,Dn=new O,no=new O,In=new O,Ii=new O,Ni=new O,ml=new O,io=new O,so=new O,ro=new O;let Hs=!1;class fn{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),hn.subVectors(t,e),i.cross(hn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){hn.subVectors(i,e),Dn.subVectors(n,e),no.subVectors(t,e);const o=hn.dot(hn),a=hn.dot(Dn),l=hn.dot(no),c=Dn.dot(Dn),h=Dn.dot(no),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,m=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getUV(t,e,n,i,r,o,a,l){return Hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Hs=!0),this.getInterpolation(t,e,n,i,r,o,a,l)}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,In.x),l.addScaledVector(o,In.y),l.addScaledVector(a,In.z),l)}static isFrontFacing(t,e,n,i){return hn.subVectors(n,e),Dn.subVectors(t,e),hn.cross(Dn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),hn.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return fn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return fn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return Hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Hs=!0),fn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}getInterpolation(t,e,n,i,r){return fn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return fn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return fn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Ii.subVectors(i,n),Ni.subVectors(r,n),io.subVectors(t,n);const l=Ii.dot(io),c=Ni.dot(io);if(l<=0&&c<=0)return e.copy(n);so.subVectors(t,i);const h=Ii.dot(so),u=Ni.dot(so);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ii,o);ro.subVectors(t,r);const m=Ii.dot(ro),g=Ni.dot(ro);if(g>=0&&m<=g)return e.copy(r);const v=m*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ni,a);const f=h*g-m*u;if(f<=0&&u-h>=0&&m-g>=0)return ml.subVectors(r,i),a=(u-h)/(u-h+(m-g)),e.copy(i).addScaledVector(ml,a);const p=1/(f+v+d);return o=v*p,a=d*p,e.copy(n).addScaledVector(Ii,o).addScaledVector(Ni,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const $c={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Vs={h:0,s:0,l:0};function oo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ie.workingColorSpace){if(t=zd(t,1),e=Ye(e,0,1),n=Ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=oo(o,r,t+1/3),this.g=oo(o,r,t),this.b=oo(o,r,t-1/3)}return ie.toWorkingColorSpace(this,i),this}setStyle(t,e=Pe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Pe){const n=$c[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$i(t.r),this.g=$i(t.g),this.b=$i(t.b),this}copyLinearToSRGB(t){return this.r=jr(t.r),this.g=jr(t.g),this.b=jr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Pe){return ie.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Ye(Ue.r*255,0,255))*65536+Math.round(Ye(Ue.g*255,0,255))*256+Math.round(Ye(Ue.b*255,0,255))}getHexString(t=Pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.fromWorkingColorSpace(Ue.copy(this),e);const n=Ue.r,i=Ue.g,r=Ue.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ie.workingColorSpace){return ie.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Pe){ie.fromWorkingColorSpace(Ue.copy(this),t);const e=Ue.r,n=Ue.g,i=Ue.b;return t!==Pe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(jn),this.setHSL(jn.h+t,jn.s+e,jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(Vs);const n=qr(jn.h,Vs.h,e),i=qr(jn.s,Vs.s,e),r=qr(jn.l,Vs.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new Bt;Bt.NAMES=$c;let eu=0,ls=class extends rs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=Rs(),this.name="",this.type="Material",this.blending=ji,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Co,this.blendDst=Ro,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=el,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(n.blending=this.blending),this.side!==ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Co&&(n.blendSrc=this.blendSrc),this.blendDst!==Ro&&(n.blendDst=this.blendDst),this.blendEquation!==vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==el&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class me extends ls{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ar,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ge=new O,Ws=new Jt;class bn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=nl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ws.fromBufferAttribute(this,e),Ws.applyMatrix3(t),this.setXY(e,Ws.x,Ws.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ds(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ds(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ds(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ds(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ds(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),i=Xe(i,this.array),r=Xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==nl&&(t.usage=this.usage),t}}class Kc extends bn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Zc extends bn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ze extends bn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let nu=0;const sn=new Me,ao=new De,Ui=new O,Je=new as,ms=new as,Te=new O;class Tn extends rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=Rs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Wc(t)?Zc:Kc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return ao.lookAt(t),ao.updateMatrix(),this.applyMatrix4(ao.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ui).negate(),this.translate(Ui.x,Ui.y,Ui.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ze(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new as);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new na);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ms.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(Je.min,ms.min),Je.expandByPoint(Te),Te.addVectors(Je.max,ms.max),Je.expandByPoint(Te)):(Je.expandByPoint(ms.min),Je.expandByPoint(ms.max))}Je.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Te.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Te));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Te.fromBufferAttribute(a,c),l&&(Ui.fromBufferAttribute(t,c),Te.add(Ui)),i=Math.max(i,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,r=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let T=0;T<a;T++)c[T]=new O,h[T]=new O;const u=new O,d=new O,m=new O,g=new Jt,v=new Jt,f=new Jt,p=new O,x=new O;function y(T,B,F){u.fromArray(i,T*3),d.fromArray(i,B*3),m.fromArray(i,F*3),g.fromArray(o,T*2),v.fromArray(o,B*2),f.fromArray(o,F*2),d.sub(u),m.sub(u),v.sub(g),f.sub(g);const N=1/(v.x*f.y-f.x*v.y);isFinite(N)&&(p.copy(d).multiplyScalar(f.y).addScaledVector(m,-v.y).multiplyScalar(N),x.copy(m).multiplyScalar(v.x).addScaledVector(d,-f.x).multiplyScalar(N),c[T].add(p),c[B].add(p),c[F].add(p),h[T].add(x),h[B].add(x),h[F].add(x))}let E=this.groups;E.length===0&&(E=[{start:0,count:n.length}]);for(let T=0,B=E.length;T<B;++T){const F=E[T],N=F.start,L=F.count;for(let D=N,I=N+L;D<I;D+=3)y(n[D+0],n[D+1],n[D+2])}const P=new O,w=new O,C=new O,z=new O;function S(T){C.fromArray(r,T*3),z.copy(C);const B=c[T];P.copy(B),P.sub(C.multiplyScalar(C.dot(B))).normalize(),w.crossVectors(z,B);const N=w.dot(h[T])<0?-1:1;l[T*4]=P.x,l[T*4+1]=P.y,l[T*4+2]=P.z,l[T*4+3]=N}for(let T=0,B=E.length;T<B;++T){const F=E[T],N=F.start,L=F.count;for(let D=N,I=N+L;D<I;D+=3)S(n[D+0]),S(n[D+1]),S(n[D+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new bn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const i=new O,r=new O,o=new O,a=new O,l=new O,c=new O,h=new O,u=new O;if(t)for(let d=0,m=t.count;d<m;d+=3){const g=t.getX(d+0),v=t.getX(d+1),f=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,f),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,f),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,m=e.count;d<m;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let m=0,g=0;for(let v=0,f=l.length;v<f;v++){a.isInterleavedBufferAttribute?m=l[v]*a.data.stride+a.offset:m=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[m++]}return new bn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Tn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],m=t(d,n);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const gl=new Me,ci=new Yd,Xs=new na,vl=new O,Fi=new O,Oi=new O,Bi=new O,lo=new O,qs=new O,Ys=new Jt,js=new Jt,$s=new Jt,_l=new O,xl=new O,yl=new O,Ks=new O,Zs=new O;class rt extends De{constructor(t=new Tn,e=new me){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(lo.fromBufferAttribute(u,t),o?qs.addScaledVector(lo,h):qs.addScaledVector(lo.sub(e),h))}e.add(qs)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(r),ci.copy(t.ray).recast(t.near),!(Xs.containsPoint(ci.origin)===!1&&(ci.intersectSphere(Xs,vl)===null||ci.origin.distanceToSquared(vl)>(t.far-t.near)**2))&&(gl.copy(r).invert(),ci.copy(t.ray).applyMatrix4(gl),!(n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ci)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const f=d[g],p=o[f.materialIndex],x=Math.max(f.start,m.start),y=Math.min(a.count,Math.min(f.start+f.count,m.start+m.count));for(let E=x,P=y;E<P;E+=3){const w=a.getX(E),C=a.getX(E+1),z=a.getX(E+2);i=Js(this,p,t,n,c,h,u,w,C,z),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=f.materialIndex,e.push(i))}}else{const g=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let f=g,p=v;f<p;f+=3){const x=a.getX(f),y=a.getX(f+1),E=a.getX(f+2);i=Js(this,o,t,n,c,h,u,x,y,E),i&&(i.faceIndex=Math.floor(f/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const f=d[g],p=o[f.materialIndex],x=Math.max(f.start,m.start),y=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let E=x,P=y;E<P;E+=3){const w=E,C=E+1,z=E+2;i=Js(this,p,t,n,c,h,u,w,C,z),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=f.materialIndex,e.push(i))}}else{const g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let f=g,p=v;f<p;f+=3){const x=f,y=f+1,E=f+2;i=Js(this,o,t,n,c,h,u,x,y,E),i&&(i.faceIndex=Math.floor(f/3),e.push(i))}}}}function iu(s,t,e,n,i,r,o,a){let l;if(t.side===$e?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===ii,a),l===null)return null;Zs.copy(a),Zs.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Zs);return c<e.near||c>e.far?null:{distance:c,point:Zs.clone(),object:s}}function Js(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Fi),s.getVertexPosition(l,Oi),s.getVertexPosition(c,Bi);const h=iu(s,t,e,n,Fi,Oi,Bi,Ks);if(h){i&&(Ys.fromBufferAttribute(i,a),js.fromBufferAttribute(i,l),$s.fromBufferAttribute(i,c),h.uv=fn.getInterpolation(Ks,Fi,Oi,Bi,Ys,js,$s,new Jt)),r&&(Ys.fromBufferAttribute(r,a),js.fromBufferAttribute(r,l),$s.fromBufferAttribute(r,c),h.uv1=fn.getInterpolation(Ks,Fi,Oi,Bi,Ys,js,$s,new Jt),h.uv2=h.uv1),o&&(_l.fromBufferAttribute(o,a),xl.fromBufferAttribute(o,l),yl.fromBufferAttribute(o,c),h.normal=fn.getInterpolation(Ks,Fi,Oi,Bi,_l,xl,yl,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new O,materialIndex:0};fn.getNormal(Fi,Oi,Bi,u.normal),h.face=u}return h}class Ot extends Tn{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,m=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ze(c,3)),this.setAttribute("normal",new ze(h,3)),this.setAttribute("uv",new ze(u,2));function g(v,f,p,x,y,E,P,w,C,z,S){const T=E/C,B=P/z,F=E/2,N=P/2,L=w/2,D=C+1,I=z+1;let V=0,G=0;const H=new O;for(let K=0;K<I;K++){const Q=K*B-N;for(let W=0;W<D;W++){const $=W*T-F;H[v]=$*x,H[f]=Q*y,H[p]=L,c.push(H.x,H.y,H.z),H[v]=0,H[f]=0,H[p]=w>0?1:-1,h.push(H.x,H.y,H.z),u.push(W/C),u.push(1-K/z),V+=1}}for(let K=0;K<z;K++)for(let Q=0;Q<C;Q++){const W=d+Q+D*K,$=d+Q+D*(K+1),tt=d+(Q+1)+D*(K+1),ct=d+(Q+1)+D*K;l.push(W,$,ct),l.push($,tt,ct),G+=6}a.addGroup(m,G,S),m+=G,d+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ot(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function is(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ve(s){const t={};for(let e=0;e<s.length;e++){const n=is(s[e]);for(const i in n)t[i]=n[i]}return t}function su(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Jc(s){return s.getRenderTarget()===null?s.outputColorSpace:ie.workingColorSpace}const ru={clone:is,merge:Ve};var ou=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,au=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bi extends ls{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ou,this.fragmentShader=au,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=su(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Qc extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Me,this.projectionMatrix=new Me,this.projectionMatrixInverse=new Me,this.coordinateSystem=Gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class on extends Qc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Uo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Xr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Uo*2*Math.atan(Math.tan(Xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Xr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const zi=-90,Gi=1;class lu extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new on(zi,Gi,t,e);i.layers=this.layers,this.add(i);const r=new on(zi,Gi,t,e);r.layers=this.layers,this.add(r);const o=new on(zi,Gi,t,e);o.layers=this.layers,this.add(o);const a=new on(zi,Gi,t,e);a.layers=this.layers,this.add(a);const l=new on(zi,Gi,t,e);l.layers=this.layers,this.add(l);const c=new on(zi,Gi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class th extends Qe{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ts,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class cu extends wi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Es("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Ei?Pe:an),this.texture=new th(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:rn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ot(5,5,5),r=new bi({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:ti});r.uniforms.tEquirect.value=e;const o=new rt(i,r),a=e.minFilter;return e.minFilter===bs&&(e.minFilter=rn),new lu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const co=new O,hu=new O,du=new $t;let mi=class{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=co.subVectors(n,e).cross(hu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(co),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||du.getNormalMatrix(t),i=this.coplanarPoint(co).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}};const hi=new na,Qs=new O;class ia{constructor(t=new mi,e=new mi,n=new mi,i=new mi,r=new mi,o=new mi){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Gn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],m=i[8],g=i[9],v=i[10],f=i[11],p=i[12],x=i[13],y=i[14],E=i[15];if(n[0].setComponents(l-r,d-c,f-m,E-p).normalize(),n[1].setComponents(l+r,d+c,f+m,E+p).normalize(),n[2].setComponents(l+o,d+h,f+g,E+x).normalize(),n[3].setComponents(l-o,d-h,f-g,E-x).normalize(),n[4].setComponents(l-a,d-u,f-v,E-y).normalize(),e===Gn)n[5].setComponents(l+a,d+u,f+v,E+y).normalize();else if(e===Mr)n[5].setComponents(a,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(t){return hi.center.set(0,0,0),hi.radius=.7071067811865476,hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Qs.x=i.normal.x>0?t.max.x:t.min.x,Qs.y=i.normal.y>0?t.max.y:t.min.y,Qs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Qs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function eh(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function uu(s,t){const e=t.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,m=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),c.onUploadCallback();let v;if(u instanceof Float32Array)v=s.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)v=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=s.SHORT;else if(u instanceof Uint32Array)v=s.UNSIGNED_INT;else if(u instanceof Int32Array)v=s.INT;else if(u instanceof Int8Array)v=s.BYTE;else if(u instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,h,u){const d=h.array,m=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,c),m.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let v=0,f=g.length;v<f;v++){const p=g[v];e?s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}m.count!==-1&&(e?s.bufferSubData(u,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):s.bufferSubData(u,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,i(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}class tn extends Tn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,m=[],g=[],v=[],f=[];for(let p=0;p<h;p++){const x=p*d-o;for(let y=0;y<c;y++){const E=y*u-r;g.push(E,-x,0),v.push(0,0,1),f.push(y/a),f.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const y=x+c*p,E=x+c*(p+1),P=x+1+c*(p+1),w=x+1+c*p;m.push(y,E,w),m.push(E,P,w)}this.setIndex(m),this.setAttribute("position",new ze(g,3)),this.setAttribute("normal",new ze(v,3)),this.setAttribute("uv",new ze(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.width,t.height,t.widthSegments,t.heightSegments)}}var fu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,_u=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Su=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Eu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Au=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Iu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Uu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Fu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ou=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ku=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Xu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,qu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ju=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$u=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ku=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ju=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ef=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,nf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,of=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,af=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,df=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ff=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_f=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,yf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Mf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,wf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Af=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Rf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Pf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Lf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Df=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,If=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ff=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Of=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$f=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Kf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,np=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ip=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,op=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ap=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,lp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,up=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_p=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Mp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Sp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ap=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Dp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Np=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Up=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Op=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:fu,alphahash_pars_fragment:pu,alphamap_fragment:mu,alphamap_pars_fragment:gu,alphatest_fragment:vu,alphatest_pars_fragment:_u,aomap_fragment:xu,aomap_pars_fragment:yu,batching_pars_vertex:Mu,batching_vertex:Su,begin_vertex:Eu,beginnormal_vertex:wu,bsdfs:bu,iridescence_fragment:Tu,bumpmap_pars_fragment:Au,clipping_planes_fragment:Cu,clipping_planes_pars_fragment:Ru,clipping_planes_pars_vertex:Pu,clipping_planes_vertex:Lu,color_fragment:Du,color_pars_fragment:Iu,color_pars_vertex:Nu,color_vertex:Uu,common:Fu,cube_uv_reflection_fragment:Ou,defaultnormal_vertex:Bu,displacementmap_pars_vertex:zu,displacementmap_vertex:Gu,emissivemap_fragment:ku,emissivemap_pars_fragment:Hu,colorspace_fragment:Vu,colorspace_pars_fragment:Wu,envmap_fragment:Xu,envmap_common_pars_fragment:qu,envmap_pars_fragment:Yu,envmap_pars_vertex:ju,envmap_physical_pars_fragment:af,envmap_vertex:$u,fog_vertex:Ku,fog_pars_vertex:Zu,fog_fragment:Ju,fog_pars_fragment:Qu,gradientmap_pars_fragment:tf,lightmap_fragment:ef,lightmap_pars_fragment:nf,lights_lambert_fragment:sf,lights_lambert_pars_fragment:rf,lights_pars_begin:of,lights_toon_fragment:lf,lights_toon_pars_fragment:cf,lights_phong_fragment:hf,lights_phong_pars_fragment:df,lights_physical_fragment:uf,lights_physical_pars_fragment:ff,lights_fragment_begin:pf,lights_fragment_maps:mf,lights_fragment_end:gf,logdepthbuf_fragment:vf,logdepthbuf_pars_fragment:_f,logdepthbuf_pars_vertex:xf,logdepthbuf_vertex:yf,map_fragment:Mf,map_pars_fragment:Sf,map_particle_fragment:Ef,map_particle_pars_fragment:wf,metalnessmap_fragment:bf,metalnessmap_pars_fragment:Tf,morphcolor_vertex:Af,morphnormal_vertex:Cf,morphtarget_pars_vertex:Rf,morphtarget_vertex:Pf,normal_fragment_begin:Lf,normal_fragment_maps:Df,normal_pars_fragment:If,normal_pars_vertex:Nf,normal_vertex:Uf,normalmap_pars_fragment:Ff,clearcoat_normal_fragment_begin:Of,clearcoat_normal_fragment_maps:Bf,clearcoat_pars_fragment:zf,iridescence_pars_fragment:Gf,opaque_fragment:kf,packing:Hf,premultiplied_alpha_fragment:Vf,project_vertex:Wf,dithering_fragment:Xf,dithering_pars_fragment:qf,roughnessmap_fragment:Yf,roughnessmap_pars_fragment:jf,shadowmap_pars_fragment:$f,shadowmap_pars_vertex:Kf,shadowmap_vertex:Zf,shadowmask_pars_fragment:Jf,skinbase_vertex:Qf,skinning_pars_vertex:tp,skinning_vertex:ep,skinnormal_vertex:np,specularmap_fragment:ip,specularmap_pars_fragment:sp,tonemapping_fragment:rp,tonemapping_pars_fragment:op,transmission_fragment:ap,transmission_pars_fragment:lp,uv_pars_fragment:cp,uv_pars_vertex:hp,uv_vertex:dp,worldpos_vertex:up,background_vert:fp,background_frag:pp,backgroundCube_vert:mp,backgroundCube_frag:gp,cube_vert:vp,cube_frag:_p,depth_vert:xp,depth_frag:yp,distanceRGBA_vert:Mp,distanceRGBA_frag:Sp,equirect_vert:Ep,equirect_frag:wp,linedashed_vert:bp,linedashed_frag:Tp,meshbasic_vert:Ap,meshbasic_frag:Cp,meshlambert_vert:Rp,meshlambert_frag:Pp,meshmatcap_vert:Lp,meshmatcap_frag:Dp,meshnormal_vert:Ip,meshnormal_frag:Np,meshphong_vert:Up,meshphong_frag:Fp,meshphysical_vert:Op,meshphysical_frag:Bp,meshtoon_vert:zp,meshtoon_frag:Gp,points_vert:kp,points_frag:Hp,shadow_vert:Vp,shadow_frag:Wp,sprite_vert:Xp,sprite_frag:qp},at={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new Jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},wn={basic:{uniforms:Ve([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Ve([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Ve([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Ve([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Ve([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Ve([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Ve([at.points,at.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Ve([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Ve([at.common,at.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Ve([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Ve([at.sprite,at.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:Ve([at.common,at.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:Ve([at.lights,at.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};wn.physical={uniforms:Ve([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const tr={r:0,b:0,g:0};function Yp(s,t,e,n,i,r,o){const a=new Bt(0);let l=r===!0?0:1,c,h,u=null,d=0,m=null;function g(f,p){let x=!1,y=p.isScene===!0?p.background:null;y&&y.isTexture&&(y=(p.backgroundBlurriness>0?e:t).get(y)),y===null?v(a,l):y&&y.isColor&&(v(y,1),x=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Cr)?(h===void 0&&(h=new rt(new Ot(1,1,1),new bi({name:"BackgroundCubeMaterial",uniforms:is(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=ie.getTransfer(y.colorSpace)!==le,(u!==y||d!==y.version||m!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,m=s.toneMapping),h.layers.enableAll(),f.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new rt(new tn(2,2),new bi({name:"BackgroundMaterial",uniforms:is(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=ie.getTransfer(y.colorSpace)!==le,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||m!==s.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,m=s.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function v(f,p){f.getRGB(tr,Jc(s)),n.buffers.color.setClear(tr.r,tr.g,tr.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(f,p=1){a.set(f),l=p,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,v(a,l)},render:g}}function jp(s,t,e,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=f(null);let c=l,h=!1;function u(L,D,I,V,G){let H=!1;if(o){const K=v(V,I,D);c!==K&&(c=K,m(c.object)),H=p(L,V,I,G),H&&x(L,V,I,G)}else{const K=D.wireframe===!0;(c.geometry!==V.id||c.program!==I.id||c.wireframe!==K)&&(c.geometry=V.id,c.program=I.id,c.wireframe=K,H=!0)}G!==null&&e.update(G,s.ELEMENT_ARRAY_BUFFER),(H||h)&&(h=!1,z(L,D,I,V),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function m(L){return n.isWebGL2?s.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?s.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function v(L,D,I){const V=I.wireframe===!0;let G=a[L.id];G===void 0&&(G={},a[L.id]=G);let H=G[D.id];H===void 0&&(H={},G[D.id]=H);let K=H[V];return K===void 0&&(K=f(d()),H[V]=K),K}function f(L){const D=[],I=[],V=[];for(let G=0;G<i;G++)D[G]=0,I[G]=0,V[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:I,attributeDivisors:V,object:L,attributes:{},index:null}}function p(L,D,I,V){const G=c.attributes,H=D.attributes;let K=0;const Q=I.getAttributes();for(const W in Q)if(Q[W].location>=0){const tt=G[W];let ct=H[W];if(ct===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(ct=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(ct=L.instanceColor)),tt===void 0||tt.attribute!==ct||ct&&tt.data!==ct.data)return!0;K++}return c.attributesNum!==K||c.index!==V}function x(L,D,I,V){const G={},H=D.attributes;let K=0;const Q=I.getAttributes();for(const W in Q)if(Q[W].location>=0){let tt=H[W];tt===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(tt=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(tt=L.instanceColor));const ct={};ct.attribute=tt,tt&&tt.data&&(ct.data=tt.data),G[W]=ct,K++}c.attributes=G,c.attributesNum=K,c.index=V}function y(){const L=c.newAttributes;for(let D=0,I=L.length;D<I;D++)L[D]=0}function E(L){P(L,0)}function P(L,D){const I=c.newAttributes,V=c.enabledAttributes,G=c.attributeDivisors;I[L]=1,V[L]===0&&(s.enableVertexAttribArray(L),V[L]=1),G[L]!==D&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,D),G[L]=D)}function w(){const L=c.newAttributes,D=c.enabledAttributes;for(let I=0,V=D.length;I<V;I++)D[I]!==L[I]&&(s.disableVertexAttribArray(I),D[I]=0)}function C(L,D,I,V,G,H,K){K===!0?s.vertexAttribIPointer(L,D,I,G,H):s.vertexAttribPointer(L,D,I,V,G,H)}function z(L,D,I,V){if(n.isWebGL2===!1&&(L.isInstancedMesh||V.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;y();const G=V.attributes,H=I.getAttributes(),K=D.defaultAttributeValues;for(const Q in H){const W=H[Q];if(W.location>=0){let $=G[Q];if($===void 0&&(Q==="instanceMatrix"&&L.instanceMatrix&&($=L.instanceMatrix),Q==="instanceColor"&&L.instanceColor&&($=L.instanceColor)),$!==void 0){const tt=$.normalized,ct=$.itemSize,xt=e.get($);if(xt===void 0)continue;const yt=xt.buffer,zt=xt.type,kt=xt.bytesPerElement,Pt=n.isWebGL2===!0&&(zt===s.INT||zt===s.UNSIGNED_INT||$.gpuType===Uc);if($.isInterleavedBufferAttribute){const Zt=$.data,X=Zt.stride,Ge=$.offset;if(Zt.isInstancedInterleavedBuffer){for(let bt=0;bt<W.locationSize;bt++)P(W.location+bt,Zt.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Zt.meshPerAttribute*Zt.count)}else for(let bt=0;bt<W.locationSize;bt++)E(W.location+bt);s.bindBuffer(s.ARRAY_BUFFER,yt);for(let bt=0;bt<W.locationSize;bt++)C(W.location+bt,ct/W.locationSize,zt,tt,X*kt,(Ge+ct/W.locationSize*bt)*kt,Pt)}else{if($.isInstancedBufferAttribute){for(let Zt=0;Zt<W.locationSize;Zt++)P(W.location+Zt,$.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Zt=0;Zt<W.locationSize;Zt++)E(W.location+Zt);s.bindBuffer(s.ARRAY_BUFFER,yt);for(let Zt=0;Zt<W.locationSize;Zt++)C(W.location+Zt,ct/W.locationSize,zt,tt,ct*kt,ct/W.locationSize*Zt*kt,Pt)}}else if(K!==void 0){const tt=K[Q];if(tt!==void 0)switch(tt.length){case 2:s.vertexAttrib2fv(W.location,tt);break;case 3:s.vertexAttrib3fv(W.location,tt);break;case 4:s.vertexAttrib4fv(W.location,tt);break;default:s.vertexAttrib1fv(W.location,tt)}}}}w()}function S(){F();for(const L in a){const D=a[L];for(const I in D){const V=D[I];for(const G in V)g(V[G].object),delete V[G];delete D[I]}delete a[L]}}function T(L){if(a[L.id]===void 0)return;const D=a[L.id];for(const I in D){const V=D[I];for(const G in V)g(V[G].object),delete V[G];delete D[I]}delete a[L.id]}function B(L){for(const D in a){const I=a[D];if(I[L.id]===void 0)continue;const V=I[L.id];for(const G in V)g(V[G].object),delete V[G];delete I[L.id]}}function F(){N(),h=!0,c!==l&&(c=l,m(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:F,resetDefaultState:N,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfProgram:B,initAttributes:y,enableAttribute:E,disableUnusedAttributes:w}}function $p(s,t,e,n){const i=n.isWebGL2;let r;function o(h){r=h}function a(h,u){s.drawArrays(r,h,u),e.update(u,r,1)}function l(h,u,d){if(d===0)return;let m,g;if(i)m=s,g="drawArraysInstanced";else if(m=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,h,u,d),e.update(u,r,d)}function c(h,u,d){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{m.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v];e.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Kp(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),f=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,E=o||t.has("OES_texture_float"),P=y&&E,w=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:f,maxVaryings:p,maxFragmentUniforms:x,vertexTextures:y,floatFragmentTextures:E,floatVertexTextures:P,maxSamples:w}}function Zp(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new mi,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||n!==0||i;return i=d,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,m){const g=u.clippingPlanes,v=u.clipIntersection,f=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!f)r?h(null):c();else{const x=r?0:n,y=x*4;let E=p.clippingState||null;l.value=E,E=h(g,d,y,m);for(let P=0;P!==y;++P)E[P]=e[P];p.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,m,g){const v=u!==null?u.length:0;let f=null;if(v!==0){if(f=l.value,g!==!0||f===null){const p=m+v*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(f===null||f.length<p)&&(f=new Float32Array(p));for(let y=0,E=m;y!==v;++y,E+=4)o.copy(u[y]).applyMatrix4(x,a),o.normal.toArray(f,E),f[E+3]=o.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,f}}function Jp(s){let t=new WeakMap;function e(o,a){return a===Po?o.mapping=ts:a===Lo&&(o.mapping=es),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Po||a===Lo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new cu(l.height/2);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class nh extends Qc{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Wi=4,Ml=[.125,.215,.35,.446,.526,.582],_i=20,ho=new nh,Sl=new Bt;let uo=null,fo=0,po=0;const gi=(1+Math.sqrt(5))/2,ki=1/gi,El=[new O(1,1,1),new O(-1,1,1),new O(1,1,-1),new O(-1,1,-1),new O(0,gi,ki),new O(0,gi,-ki),new O(ki,0,gi),new O(-ki,0,gi),new O(gi,ki,0),new O(-gi,ki,0)];class wl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){uo=this._renderer.getRenderTarget(),fo=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Al(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(uo,fo,po),t.scissorTest=!1,er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ts||t.mapping===es?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),uo=this._renderer.getRenderTarget(),fo=this._renderer.getActiveCubeFace(),po=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:Ts,format:mn,colorSpace:kn,depthBuffer:!1},i=bl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qp(r)),this._blurMaterial=tm(r,t,e)}return i}_compileMaterial(t){const e=new rt(this._lodPlanes[0],t);this._renderer.compile(e,ho)}_sceneToCubeUV(t,e,n,i){const a=new on(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Sl),h.toneMapping=ei,h.autoClear=!1;const m=new me({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),g=new rt(new Ot,m);let v=!1;const f=t.background;f?f.isColor&&(m.color.copy(f),t.background=null,v=!0):(m.color.copy(Sl),v=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const y=this._cubeSize;er(i,x*y,p>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=f}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ts||t.mapping===es;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Al()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tl());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new rt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;er(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ho)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=El[(i-1)%El.length];this._blur(t,i-1,i,r,o)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new rt(this._lodPlanes[i],c),d=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*_i-1),v=r/g,f=isFinite(r)?1+Math.floor(h*v):_i;f>_i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${_i}`);const p=[];let x=0;for(let C=0;C<_i;++C){const z=C/v,S=Math.exp(-z*z/2);p.push(S),C===0?x+=S:C<f&&(x+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/x;d.envMap.value=t.texture,d.samples.value=f,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const E=this._sizeLods[i],P=3*E*(i>y-Wi?i-y+Wi:0),w=4*(this._cubeSize-E);er(e,P,w,3*E,2*E),l.setRenderTarget(e),l.render(u,ho)}}function Qp(s){const t=[],e=[],n=[];let i=s;const r=s-Wi+1+Ml.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-Wi?l=Ml[o-s+Wi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,v=3,f=2,p=1,x=new Float32Array(v*g*m),y=new Float32Array(f*g*m),E=new Float32Array(p*g*m);for(let w=0;w<m;w++){const C=w%3*2/3-1,z=w>2?0:-1,S=[C,z,0,C+2/3,z,0,C+2/3,z+1,0,C,z,0,C+2/3,z+1,0,C,z+1,0];x.set(S,v*g*w),y.set(d,f*g*w);const T=[w,w,w,w,w,w];E.set(T,p*g*w)}const P=new Tn;P.setAttribute("position",new bn(x,v)),P.setAttribute("uv",new bn(y,f)),P.setAttribute("faceIndex",new bn(E,p)),t.push(P),i>Wi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function bl(s,t,e){const n=new wi(s,t,e);return n.texture.mapping=Cr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function er(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function tm(s,t,e){const n=new Float32Array(_i),i=new O(0,1,0);return new bi({name:"SphericalGaussianBlur",defines:{n:_i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Tl(){return new bi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Al(){return new bi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function sa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function em(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Po||l===Lo,h=l===ts||l===es;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new wl(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&i(u)){e===null&&(e=new wl(s));const d=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function nm(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function im(s,t,e,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let f=0,p=v.length;f<p;f++)t.remove(v[f])}d.removeEventListener("dispose",o),delete i[d.id];const m=r.get(d);m&&(t.remove(m),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const v=m[g];for(let f=0,p=v.length;f<p;f++)t.update(v[f],s.ARRAY_BUFFER)}}function c(u){const d=[],m=u.index,g=u.attributes.position;let v=0;if(m!==null){const x=m.array;v=m.version;for(let y=0,E=x.length;y<E;y+=3){const P=x[y+0],w=x[y+1],C=x[y+2];d.push(P,w,w,C,C,P)}}else if(g!==void 0){const x=g.array;v=g.version;for(let y=0,E=x.length/3-1;y<E;y+=3){const P=y+0,w=y+1,C=y+2;d.push(P,w,w,C,C,P)}}else return;const f=new(Wc(d)?Zc:Kc)(d,1);f.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,f)}function h(u){const d=r.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function sm(s,t,e,n){const i=n.isWebGL2;let r;function o(m){r=m}let a,l;function c(m){a=m.type,l=m.bytesPerElement}function h(m,g){s.drawElements(r,g,a,m*l),e.update(g,r,1)}function u(m,g,v){if(v===0)return;let f,p;if(i)f=s,p="drawElementsInstanced";else if(f=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",f===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](r,g,a,m*l,v),e.update(g,r,v)}function d(m,g,v){if(v===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<v;p++)this.render(m[p]/l,g[p]);else{f.multiDrawElementsWEBGL(r,g,0,a,m,0,v);let p=0;for(let x=0;x<v;x++)p+=g[x];e.update(p,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function rm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function om(s,t){return s[0]-t[0]}function am(s,t){return Math.abs(t[1])-Math.abs(s[1])}function lm(s,t,e){const n={},i=new Float32Array(8),r=new WeakMap,o=new Re,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=g!==void 0?g.length:0;let f=r.get(h);if(f===void 0||f.count!==v){let D=function(){N.dispose(),r.delete(h),h.removeEventListener("dispose",D)};var m=D;f!==void 0&&f.texture.dispose();const y=h.morphAttributes.position!==void 0,E=h.morphAttributes.normal!==void 0,P=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],C=h.morphAttributes.normal||[],z=h.morphAttributes.color||[];let S=0;y===!0&&(S=1),E===!0&&(S=2),P===!0&&(S=3);let T=h.attributes.position.count*S,B=1;T>t.maxTextureSize&&(B=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const F=new Float32Array(T*B*4*v),N=new Yc(F,T,B,v);N.type=Jn,N.needsUpdate=!0;const L=S*4;for(let I=0;I<v;I++){const V=w[I],G=C[I],H=z[I],K=T*B*4*I;for(let Q=0;Q<V.count;Q++){const W=Q*L;y===!0&&(o.fromBufferAttribute(V,Q),F[K+W+0]=o.x,F[K+W+1]=o.y,F[K+W+2]=o.z,F[K+W+3]=0),E===!0&&(o.fromBufferAttribute(G,Q),F[K+W+4]=o.x,F[K+W+5]=o.y,F[K+W+6]=o.z,F[K+W+7]=0),P===!0&&(o.fromBufferAttribute(H,Q),F[K+W+8]=o.x,F[K+W+9]=o.y,F[K+W+10]=o.z,F[K+W+11]=H.itemSize===4?o.w:1)}}f={count:v,texture:N,size:new Jt(T,B)},r.set(h,f),h.addEventListener("dispose",D)}let p=0;for(let y=0;y<d.length;y++)p+=d[y];const x=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",x),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),u.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}else{const g=d===void 0?0:d.length;let v=n[h.id];if(v===void 0||v.length!==g){v=[];for(let E=0;E<g;E++)v[E]=[E,0];n[h.id]=v}for(let E=0;E<g;E++){const P=v[E];P[0]=E,P[1]=d[E]}v.sort(am);for(let E=0;E<8;E++)E<g&&v[E][1]?(a[E][0]=v[E][0],a[E][1]=v[E][1]):(a[E][0]=Number.MAX_SAFE_INTEGER,a[E][1]=0);a.sort(om);const f=h.morphAttributes.position,p=h.morphAttributes.normal;let x=0;for(let E=0;E<8;E++){const P=a[E],w=P[0],C=P[1];w!==Number.MAX_SAFE_INTEGER&&C?(f&&h.getAttribute("morphTarget"+E)!==f[w]&&h.setAttribute("morphTarget"+E,f[w]),p&&h.getAttribute("morphNormal"+E)!==p[w]&&h.setAttribute("morphNormal"+E,p[w]),i[E]=C,x+=C):(f&&h.hasAttribute("morphTarget"+E)===!0&&h.deleteAttribute("morphTarget"+E),p&&h.hasAttribute("morphNormal"+E)===!0&&h.deleteAttribute("morphNormal"+E),i[E]=0)}const y=h.morphTargetsRelative?1:1-x;u.getUniforms().setValue(s,"morphTargetBaseInfluence",y),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function cm(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class ih extends Qe{constructor(t,e,n,i,r,o,a,l,c,h){if(h=h!==void 0?h:Si,h!==Si&&h!==ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Si&&(n=Zn),n===void 0&&h===ns&&(n=Mi),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:We,this.minFilter=l!==void 0?l:We,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const sh=new Qe,rh=new ih(1,1);rh.compareFunction=Vc;const oh=new Yc,ah=new Xd,lh=new th,Cl=[],Rl=[],Pl=new Float32Array(16),Ll=new Float32Array(9),Dl=new Float32Array(4);function cs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Cl[i];if(r===void 0&&(r=new Float32Array(i),Cl[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Se(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ee(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Lr(s,t){let e=Rl[t];e===void 0&&(e=new Int32Array(t),Rl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function hm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function dm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2fv(this.addr,t),Ee(e,t)}}function um(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;s.uniform3fv(this.addr,t),Ee(e,t)}}function fm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4fv(this.addr,t),Ee(e,t)}}function pm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(Se(e,n))return;Dl.set(n),s.uniformMatrix2fv(this.addr,!1,Dl),Ee(e,n)}}function mm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(Se(e,n))return;Ll.set(n),s.uniformMatrix3fv(this.addr,!1,Ll),Ee(e,n)}}function gm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(Se(e,n))return;Pl.set(n),s.uniformMatrix4fv(this.addr,!1,Pl),Ee(e,n)}}function vm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function _m(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2iv(this.addr,t),Ee(e,t)}}function xm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3iv(this.addr,t),Ee(e,t)}}function ym(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4iv(this.addr,t),Ee(e,t)}}function Mm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Sm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2uiv(this.addr,t),Ee(e,t)}}function Em(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3uiv(this.addr,t),Ee(e,t)}}function wm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4uiv(this.addr,t),Ee(e,t)}}function bm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?rh:sh;e.setTexture2D(t||r,i)}function Tm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||ah,i)}function Am(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||lh,i)}function Cm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||oh,i)}function Rm(s){switch(s){case 5126:return hm;case 35664:return dm;case 35665:return um;case 35666:return fm;case 35674:return pm;case 35675:return mm;case 35676:return gm;case 5124:case 35670:return vm;case 35667:case 35671:return _m;case 35668:case 35672:return xm;case 35669:case 35673:return ym;case 5125:return Mm;case 36294:return Sm;case 36295:return Em;case 36296:return wm;case 35678:case 36198:case 36298:case 36306:case 35682:return bm;case 35679:case 36299:case 36307:return Tm;case 35680:case 36300:case 36308:case 36293:return Am;case 36289:case 36303:case 36311:case 36292:return Cm}}function Pm(s,t){s.uniform1fv(this.addr,t)}function Lm(s,t){const e=cs(t,this.size,2);s.uniform2fv(this.addr,e)}function Dm(s,t){const e=cs(t,this.size,3);s.uniform3fv(this.addr,e)}function Im(s,t){const e=cs(t,this.size,4);s.uniform4fv(this.addr,e)}function Nm(s,t){const e=cs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Um(s,t){const e=cs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Fm(s,t){const e=cs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Om(s,t){s.uniform1iv(this.addr,t)}function Bm(s,t){s.uniform2iv(this.addr,t)}function zm(s,t){s.uniform3iv(this.addr,t)}function Gm(s,t){s.uniform4iv(this.addr,t)}function km(s,t){s.uniform1uiv(this.addr,t)}function Hm(s,t){s.uniform2uiv(this.addr,t)}function Vm(s,t){s.uniform3uiv(this.addr,t)}function Wm(s,t){s.uniform4uiv(this.addr,t)}function Xm(s,t,e){const n=this.cache,i=t.length,r=Lr(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||sh,r[o])}function qm(s,t,e){const n=this.cache,i=t.length,r=Lr(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||ah,r[o])}function Ym(s,t,e){const n=this.cache,i=t.length,r=Lr(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||lh,r[o])}function jm(s,t,e){const n=this.cache,i=t.length,r=Lr(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||oh,r[o])}function $m(s){switch(s){case 5126:return Pm;case 35664:return Lm;case 35665:return Dm;case 35666:return Im;case 35674:return Nm;case 35675:return Um;case 35676:return Fm;case 5124:case 35670:return Om;case 35667:case 35671:return Bm;case 35668:case 35672:return zm;case 35669:case 35673:return Gm;case 5125:return km;case 36294:return Hm;case 36295:return Vm;case 36296:return Wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Xm;case 35679:case 36299:case 36307:return qm;case 35680:case 36300:case 36308:case 36293:return Ym;case 36289:case 36303:case 36311:case 36292:return jm}}class Km{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Rm(e.type)}}class Zm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=$m(e.type)}}class Jm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const mo=/(\w+)(\])?(\[|\.)?/g;function Il(s,t){s.seq.push(t),s.map[t.id]=t}function Qm(s,t,e){const n=s.name,i=n.length;for(mo.lastIndex=0;;){const r=mo.exec(n),o=mo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Il(e,c===void 0?new Km(a,s,t):new Zm(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new Jm(a),Il(e,u)),e=u}}}class ur{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Qm(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Nl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const t0=37297;let e0=0;function n0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function i0(s){const t=ie.getPrimaries(ie.workingColorSpace),e=ie.getPrimaries(s);let n;switch(t===e?n="":t===yr&&e===xr?n="LinearDisplayP3ToLinearSRGB":t===xr&&e===yr&&(n="LinearSRGBToLinearDisplayP3"),s){case kn:case Rr:return[n,"LinearTransferOETF"];case Pe:case ea:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Ul(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+n0(s.getShaderSource(t),o)}else return i}function s0(s,t){const e=i0(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function r0(s,t){let e;switch(t){case pd:e="Linear";break;case md:e="Reinhard";break;case gd:e="OptimizedCineon";break;case vd:e="ACESFilmic";break;case xd:e="AgX";break;case _d:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function o0(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Xi).join(`
`)}function a0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Xi).join(`
`)}function l0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function c0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Xi(s){return s!==""}function Fl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ol(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const h0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oo(s){return s.replace(h0,u0)}const d0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function u0(s,t){let e=Vt[t];if(e===void 0){const n=d0.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Oo(e)}const f0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bl(s){return s.replace(f0,p0)}function p0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function zl(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function m0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ic?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Hh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===zn&&(t="SHADOWMAP_TYPE_VSM"),t}function g0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ts:case es:t="ENVMAP_TYPE_CUBE";break;case Cr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function v0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case es:t="ENVMAP_MODE_REFRACTION";break}return t}function _0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ar:t="ENVMAP_BLENDING_MULTIPLY";break;case ud:t="ENVMAP_BLENDING_MIX";break;case fd:t="ENVMAP_BLENDING_ADD";break}return t}function x0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function y0(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=m0(e),c=g0(e),h=v0(e),u=_0(e),d=x0(e),m=e.isWebGL2?"":o0(e),g=a0(e),v=l0(r),f=i.createProgram();let p,x,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Xi).join(`
`),p.length>0&&(p+=`
`),x=[m,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Xi).join(`
`),x.length>0&&(x+=`
`)):(p=[zl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xi).join(`
`),x=[m,zl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ei?"#define TONE_MAPPING":"",e.toneMapping!==ei?Vt.tonemapping_pars_fragment:"",e.toneMapping!==ei?r0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,s0("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Xi).join(`
`)),o=Oo(o),o=Fl(o,e),o=Ol(o,e),a=Oo(a),a=Fl(a,e),a=Ol(a,e),o=Bl(o),a=Bl(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,x=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===il?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===il?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const E=y+p+o,P=y+x+a,w=Nl(i,i.VERTEX_SHADER,E),C=Nl(i,i.FRAGMENT_SHADER,P);i.attachShader(f,w),i.attachShader(f,C),e.index0AttributeName!==void 0?i.bindAttribLocation(f,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(f,0,"position"),i.linkProgram(f);function z(F){if(s.debug.checkShaderErrors){const N=i.getProgramInfoLog(f).trim(),L=i.getShaderInfoLog(w).trim(),D=i.getShaderInfoLog(C).trim();let I=!0,V=!0;if(i.getProgramParameter(f,i.LINK_STATUS)===!1)if(I=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,f,w,C);else{const G=Ul(i,w,"vertex"),H=Ul(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(f,i.VALIDATE_STATUS)+`

Program Info Log: `+N+`
`+G+`
`+H)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(L===""||D==="")&&(V=!1);V&&(F.diagnostics={runnable:I,programLog:N,vertexShader:{log:L,prefix:p},fragmentShader:{log:D,prefix:x}})}i.deleteShader(w),i.deleteShader(C),S=new ur(i,f),T=c0(i,f)}let S;this.getUniforms=function(){return S===void 0&&z(this),S};let T;this.getAttributes=function(){return T===void 0&&z(this),T};let B=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=i.getProgramParameter(f,t0)),B},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(f),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=e0++,this.cacheKey=t,this.usedTimes=1,this.program=f,this.vertexShader=w,this.fragmentShader=C,this}let M0=0;class S0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new E0(t),e.set(t,n)),n}}class E0{constructor(t){this.id=M0++,this.code=t,this.usedTimes=0}}function w0(s,t,e,n,i,r,o){const a=new jc,l=new S0,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let m=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return S===0?"uv":`uv${S}`}function f(S,T,B,F,N){const L=F.fog,D=N.geometry,I=S.isMeshStandardMaterial?F.environment:null,V=(S.isMeshStandardMaterial?e:t).get(S.envMap||I),G=V&&V.mapping===Cr?V.image.height:null,H=g[S.type];S.precision!==null&&(m=i.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const K=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,Q=K!==void 0?K.length:0;let W=0;D.morphAttributes.position!==void 0&&(W=1),D.morphAttributes.normal!==void 0&&(W=2),D.morphAttributes.color!==void 0&&(W=3);let $,tt,ct,xt;if(H){const ke=wn[H];$=ke.vertexShader,tt=ke.fragmentShader}else $=S.vertexShader,tt=S.fragmentShader,l.update(S),ct=l.getVertexShaderID(S),xt=l.getFragmentShaderID(S);const yt=s.getRenderTarget(),zt=N.isInstancedMesh===!0,kt=N.isBatchedMesh===!0,Pt=!!S.map,Zt=!!S.matcap,X=!!V,Ge=!!S.aoMap,bt=!!S.lightMap,Ut=!!S.bumpMap,Mt=!!S.normalMap,ce=!!S.displacementMap,Wt=!!S.emissiveMap,R=!!S.metalnessMap,b=!!S.roughnessMap,Y=S.anisotropy>0,it=S.clearcoat>0,nt=S.iridescence>0,st=S.sheen>0,St=S.transmission>0,ut=Y&&!!S.anisotropyMap,vt=it&&!!S.clearcoatMap,Rt=it&&!!S.clearcoatNormalMap,Xt=it&&!!S.clearcoatRoughnessMap,et=nt&&!!S.iridescenceMap,ne=nt&&!!S.iridescenceThicknessMap,Kt=st&&!!S.sheenColorMap,Nt=st&&!!S.sheenRoughnessMap,wt=!!S.specularMap,_t=!!S.specularColorMap,Ht=!!S.specularIntensityMap,ee=St&&!!S.transmissionMap,de=St&&!!S.thicknessMap,Yt=!!S.gradientMap,ot=!!S.alphaMap,U=S.alphaTest>0,ht=!!S.alphaHash,dt=!!S.extensions,Lt=!!D.attributes.uv1,Tt=!!D.attributes.uv2,se=!!D.attributes.uv3;let re=ei;return S.toneMapped&&(yt===null||yt.isXRRenderTarget===!0)&&(re=s.toneMapping),{isWebGL2:h,shaderID:H,shaderType:S.type,shaderName:S.name,vertexShader:$,fragmentShader:tt,defines:S.defines,customVertexShaderID:ct,customFragmentShaderID:xt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:kt,instancing:zt,instancingColor:zt&&N.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:yt===null?s.outputColorSpace:yt.isXRRenderTarget===!0?yt.texture.colorSpace:kn,map:Pt,matcap:Zt,envMap:X,envMapMode:X&&V.mapping,envMapCubeUVHeight:G,aoMap:Ge,lightMap:bt,bumpMap:Ut,normalMap:Mt,displacementMap:d&&ce,emissiveMap:Wt,normalMapObjectSpace:Mt&&S.normalMapType===Ld,normalMapTangentSpace:Mt&&S.normalMapType===ta,metalnessMap:R,roughnessMap:b,anisotropy:Y,anisotropyMap:ut,clearcoat:it,clearcoatMap:vt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Xt,iridescence:nt,iridescenceMap:et,iridescenceThicknessMap:ne,sheen:st,sheenColorMap:Kt,sheenRoughnessMap:Nt,specularMap:wt,specularColorMap:_t,specularIntensityMap:Ht,transmission:St,transmissionMap:ee,thicknessMap:de,gradientMap:Yt,opaque:S.transparent===!1&&S.blending===ji,alphaMap:ot,alphaTest:U,alphaHash:ht,combine:S.combine,mapUv:Pt&&v(S.map.channel),aoMapUv:Ge&&v(S.aoMap.channel),lightMapUv:bt&&v(S.lightMap.channel),bumpMapUv:Ut&&v(S.bumpMap.channel),normalMapUv:Mt&&v(S.normalMap.channel),displacementMapUv:ce&&v(S.displacementMap.channel),emissiveMapUv:Wt&&v(S.emissiveMap.channel),metalnessMapUv:R&&v(S.metalnessMap.channel),roughnessMapUv:b&&v(S.roughnessMap.channel),anisotropyMapUv:ut&&v(S.anisotropyMap.channel),clearcoatMapUv:vt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Xt&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&v(S.sheenRoughnessMap.channel),specularMapUv:wt&&v(S.specularMap.channel),specularColorMapUv:_t&&v(S.specularColorMap.channel),specularIntensityMapUv:Ht&&v(S.specularIntensityMap.channel),transmissionMapUv:ee&&v(S.transmissionMap.channel),thicknessMapUv:de&&v(S.thicknessMap.channel),alphaMapUv:ot&&v(S.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Mt||Y),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,vertexUv1s:Lt,vertexUv2s:Tt,vertexUv3s:se,pointsUvs:N.isPoints===!0&&!!D.attributes.uv&&(Pt||ot),fog:!!L,useFog:S.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:N.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:W,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&B.length>0,shadowMapType:s.shadowMap.type,toneMapping:re,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Pt&&S.map.isVideoTexture===!0&&ie.getTransfer(S.map.colorSpace)===le,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ce,flipSided:S.side===$e,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:dt&&S.extensions.derivatives===!0,extensionFragDepth:dt&&S.extensions.fragDepth===!0,extensionDrawBuffers:dt&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:dt&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:dt&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function p(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const B in S.defines)T.push(B),T.push(S.defines[B]);return S.isRawShaderMaterial===!1&&(x(T,S),y(T,S),T.push(s.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function x(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function y(S,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),S.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function E(S){const T=g[S.type];let B;if(T){const F=wn[T];B=ru.clone(F.uniforms)}else B=S.uniforms;return B}function P(S,T){let B;for(let F=0,N=c.length;F<N;F++){const L=c[F];if(L.cacheKey===T){B=L,++B.usedTimes;break}}return B===void 0&&(B=new y0(s,T,S,r),c.push(B)),B}function w(S){if(--S.usedTimes===0){const T=c.indexOf(S);c[T]=c[c.length-1],c.pop(),S.destroy()}}function C(S){l.remove(S)}function z(){l.dispose()}return{getParameters:f,getProgramCacheKey:p,getUniforms:E,acquireProgram:P,releaseProgram:w,releaseShaderCache:C,programs:c,dispose:z}}function b0(){let s=new WeakMap;function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function e(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function T0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Gl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function kl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,m,g,v,f){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:m,groupOrder:g,renderOrder:u.renderOrder,z:v,group:f},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=m,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=f),t++,p}function a(u,d,m,g,v,f){const p=o(u,d,m,g,v,f);m.transmission>0?n.push(p):m.transparent===!0?i.push(p):e.push(p)}function l(u,d,m,g,v,f){const p=o(u,d,m,g,v,f);m.transmission>0?n.unshift(p):m.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||T0),n.length>1&&n.sort(d||Gl),i.length>1&&i.sort(d||Gl)}function h(){for(let u=t,d=s.length;u<d;u++){const m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function A0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new kl,s.set(n,[o])):i>=r.length?(o=new kl,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function C0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Bt};break;case"SpotLight":e={position:new O,direction:new O,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":e={color:new Bt,position:new O,halfWidth:new O,halfHeight:new O};break}return s[t.id]=e,e}}}function R0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let P0=0;function L0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function D0(s,t){const e=new C0,n=R0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new O);const r=new O,o=new Me,a=new Me;function l(h,u){let d=0,m=0,g=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let v=0,f=0,p=0,x=0,y=0,E=0,P=0,w=0,C=0,z=0,S=0;h.sort(L0);const T=u===!0?Math.PI:1;for(let F=0,N=h.length;F<N;F++){const L=h[F],D=L.color,I=L.intensity,V=L.distance,G=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=D.r*I*T,m+=D.g*I*T,g+=D.b*I*T;else if(L.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(L.sh.coefficients[H],I);S++}else if(L.isDirectionalLight){const H=e.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const K=L.shadow,Q=n.get(L);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,i.directionalShadow[v]=Q,i.directionalShadowMap[v]=G,i.directionalShadowMatrix[v]=L.shadow.matrix,E++}i.directional[v]=H,v++}else if(L.isSpotLight){const H=e.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(D).multiplyScalar(I*T),H.distance=V,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,i.spot[p]=H;const K=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,K.updateMatrices(L),L.castShadow&&z++),i.spotLightMatrix[p]=K.matrix,L.castShadow){const Q=n.get(L);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,i.spotShadow[p]=Q,i.spotShadowMap[p]=G,w++}p++}else if(L.isRectAreaLight){const H=e.get(L);H.color.copy(D).multiplyScalar(I),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),i.rectArea[x]=H,x++}else if(L.isPointLight){const H=e.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity*T),H.distance=L.distance,H.decay=L.decay,L.castShadow){const K=L.shadow,Q=n.get(L);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,Q.shadowCameraNear=K.camera.near,Q.shadowCameraFar=K.camera.far,i.pointShadow[f]=Q,i.pointShadowMap[f]=G,i.pointShadowMatrix[f]=L.shadow.matrix,P++}i.point[f]=H,f++}else if(L.isHemisphereLight){const H=e.get(L);H.skyColor.copy(L.color).multiplyScalar(I*T),H.groundColor.copy(L.groundColor).multiplyScalar(I*T),i.hemi[y]=H,y++}}x>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=m,i.ambient[2]=g;const B=i.hash;(B.directionalLength!==v||B.pointLength!==f||B.spotLength!==p||B.rectAreaLength!==x||B.hemiLength!==y||B.numDirectionalShadows!==E||B.numPointShadows!==P||B.numSpotShadows!==w||B.numSpotMaps!==C||B.numLightProbes!==S)&&(i.directional.length=v,i.spot.length=p,i.rectArea.length=x,i.point.length=f,i.hemi.length=y,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=P,i.pointShadowMap.length=P,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=P,i.spotLightMatrix.length=w+C-z,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=z,i.numLightProbes=S,B.directionalLength=v,B.pointLength=f,B.spotLength=p,B.rectAreaLength=x,B.hemiLength=y,B.numDirectionalShadows=E,B.numPointShadows=P,B.numSpotShadows=w,B.numSpotMaps=C,B.numLightProbes=S,i.version=P0++)}function c(h,u){let d=0,m=0,g=0,v=0,f=0;const p=u.matrixWorldInverse;for(let x=0,y=h.length;x<y;x++){const E=h[x];if(E.isDirectionalLight){const P=i.directional[d];P.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),d++}else if(E.isSpotLight){const P=i.spot[g];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(p),P.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),g++}else if(E.isRectAreaLight){const P=i.rectArea[v];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(p),a.identity(),o.copy(E.matrixWorld),o.premultiply(p),a.extractRotation(o),P.halfWidth.set(E.width*.5,0,0),P.halfHeight.set(0,E.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),v++}else if(E.isPointLight){const P=i.point[m];P.position.setFromMatrixPosition(E.matrixWorld),P.position.applyMatrix4(p),m++}else if(E.isHemisphereLight){const P=i.hemi[f];P.direction.setFromMatrixPosition(E.matrixWorld),P.direction.transformDirection(p),f++}}}return{setup:l,setupView:c,state:i}}function Hl(s,t){const e=new D0(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function I0(s,t){let e=new WeakMap;function n(r,o=0){const a=e.get(r);let l;return a===void 0?(l=new Hl(s,t),e.set(r,[l])):o>=a.length?(l=new Hl(s,t),a.push(l)):l=a[o],l}function i(){e=new WeakMap}return{get:n,dispose:i}}class N0 extends ls{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class U0 extends ls{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const F0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function B0(s,t,e){let n=new ia;const i=new Jt,r=new Jt,o=new Re,a=new N0({depthPacking:Pd}),l=new U0,c={},h=e.maxTextureSize,u={[ii]:$e,[$e]:ii,[Ce]:Ce},d=new bi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Jt},radius:{value:4}},vertexShader:F0,fragmentShader:O0}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const g=new Tn;g.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new rt(g,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ic;let p=this.type;this.render=function(w,C,z){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;const S=s.getRenderTarget(),T=s.getActiveCubeFace(),B=s.getActiveMipmapLevel(),F=s.state;F.setBlending(ti),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const N=p!==zn&&this.type===zn,L=p===zn&&this.type!==zn;for(let D=0,I=w.length;D<I;D++){const V=w[D],G=V.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const H=G.getFrameExtents();if(i.multiply(H),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/H.x),i.x=r.x*H.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/H.y),i.y=r.y*H.y,G.mapSize.y=r.y)),G.map===null||N===!0||L===!0){const Q=this.type!==zn?{minFilter:We,magFilter:We}:{};G.map!==null&&G.map.dispose(),G.map=new wi(i.x,i.y,Q),G.map.texture.name=V.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const K=G.getViewportCount();for(let Q=0;Q<K;Q++){const W=G.getViewport(Q);o.set(r.x*W.x,r.y*W.y,r.x*W.z,r.y*W.w),F.viewport(o),G.updateMatrices(V,Q),n=G.getFrustum(),E(C,z,G.camera,V,this.type)}G.isPointLightShadow!==!0&&this.type===zn&&x(G,z),G.needsUpdate=!1}p=this.type,f.needsUpdate=!1,s.setRenderTarget(S,T,B)};function x(w,C){const z=t.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new wi(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(C,null,z,d,v,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(C,null,z,m,v,null)}function y(w,C,z,S){let T=null;const B=z.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(B!==void 0)T=B;else if(T=z.isPointLight===!0?l:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const F=T.uuid,N=C.uuid;let L=c[F];L===void 0&&(L={},c[F]=L);let D=L[N];D===void 0&&(D=T.clone(),L[N]=D,C.addEventListener("dispose",P)),T=D}if(T.visible=C.visible,T.wireframe=C.wireframe,S===zn?T.side=C.shadowSide!==null?C.shadowSide:C.side:T.side=C.shadowSide!==null?C.shadowSide:u[C.side],T.alphaMap=C.alphaMap,T.alphaTest=C.alphaTest,T.map=C.map,T.clipShadows=C.clipShadows,T.clippingPlanes=C.clippingPlanes,T.clipIntersection=C.clipIntersection,T.displacementMap=C.displacementMap,T.displacementScale=C.displacementScale,T.displacementBias=C.displacementBias,T.wireframeLinewidth=C.wireframeLinewidth,T.linewidth=C.linewidth,z.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const F=s.properties.get(T);F.light=z}return T}function E(w,C,z,S,T){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===zn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld);const N=t.update(w),L=w.material;if(Array.isArray(L)){const D=N.groups;for(let I=0,V=D.length;I<V;I++){const G=D[I],H=L[G.materialIndex];if(H&&H.visible){const K=y(w,H,S,T);w.onBeforeShadow(s,w,C,z,N,K,G),s.renderBufferDirect(z,null,N,K,w,G),w.onAfterShadow(s,w,C,z,N,K,G)}}}else if(L.visible){const D=y(w,L,S,T);w.onBeforeShadow(s,w,C,z,N,D,null),s.renderBufferDirect(z,null,N,D,w,null),w.onAfterShadow(s,w,C,z,N,D,null)}}const F=w.children;for(let N=0,L=F.length;N<L;N++)E(F[N],C,z,S,T)}function P(w){w.target.removeEventListener("dispose",P);for(const z in c){const S=c[z],T=w.target.uuid;T in S&&(S[T].dispose(),delete S[T])}}}function z0(s,t,e){const n=e.isWebGL2;function i(){let U=!1;const ht=new Re;let dt=null;const Lt=new Re(0,0,0,0);return{setMask:function(Tt){dt!==Tt&&!U&&(s.colorMask(Tt,Tt,Tt,Tt),dt=Tt)},setLocked:function(Tt){U=Tt},setClear:function(Tt,se,re,we,ke){ke===!0&&(Tt*=we,se*=we,re*=we),ht.set(Tt,se,re,we),Lt.equals(ht)===!1&&(s.clearColor(Tt,se,re,we),Lt.copy(ht))},reset:function(){U=!1,dt=null,Lt.set(-1,0,0,0)}}}function r(){let U=!1,ht=null,dt=null,Lt=null;return{setTest:function(Tt){Tt?kt(s.DEPTH_TEST):Pt(s.DEPTH_TEST)},setMask:function(Tt){ht!==Tt&&!U&&(s.depthMask(Tt),ht=Tt)},setFunc:function(Tt){if(dt!==Tt){switch(Tt){case rd:s.depthFunc(s.NEVER);break;case od:s.depthFunc(s.ALWAYS);break;case ad:s.depthFunc(s.LESS);break;case vr:s.depthFunc(s.LEQUAL);break;case ld:s.depthFunc(s.EQUAL);break;case cd:s.depthFunc(s.GEQUAL);break;case hd:s.depthFunc(s.GREATER);break;case dd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}dt=Tt}},setLocked:function(Tt){U=Tt},setClear:function(Tt){Lt!==Tt&&(s.clearDepth(Tt),Lt=Tt)},reset:function(){U=!1,ht=null,dt=null,Lt=null}}}function o(){let U=!1,ht=null,dt=null,Lt=null,Tt=null,se=null,re=null,we=null,ke=null;return{setTest:function(oe){U||(oe?kt(s.STENCIL_TEST):Pt(s.STENCIL_TEST))},setMask:function(oe){ht!==oe&&!U&&(s.stencilMask(oe),ht=oe)},setFunc:function(oe,He,xn){(dt!==oe||Lt!==He||Tt!==xn)&&(s.stencilFunc(oe,He,xn),dt=oe,Lt=He,Tt=xn)},setOp:function(oe,He,xn){(se!==oe||re!==He||we!==xn)&&(s.stencilOp(oe,He,xn),se=oe,re=He,we=xn)},setLocked:function(oe){U=oe},setClear:function(oe){ke!==oe&&(s.clearStencil(oe),ke=oe)},reset:function(){U=!1,ht=null,dt=null,Lt=null,Tt=null,se=null,re=null,we=null,ke=null}}}const a=new i,l=new r,c=new o,h=new WeakMap,u=new WeakMap;let d={},m={},g=new WeakMap,v=[],f=null,p=!1,x=null,y=null,E=null,P=null,w=null,C=null,z=null,S=new Bt(0,0,0),T=0,B=!1,F=null,N=null,L=null,D=null,I=null;const V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,H=0;const K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(K)[1]),G=H>=1):K.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),G=H>=2);let Q=null,W={};const $=s.getParameter(s.SCISSOR_BOX),tt=s.getParameter(s.VIEWPORT),ct=new Re().fromArray($),xt=new Re().fromArray(tt);function yt(U,ht,dt,Lt){const Tt=new Uint8Array(4),se=s.createTexture();s.bindTexture(U,se),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let re=0;re<dt;re++)n&&(U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY)?s.texImage3D(ht,0,s.RGBA,1,1,Lt,0,s.RGBA,s.UNSIGNED_BYTE,Tt):s.texImage2D(ht+re,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Tt);return se}const zt={};zt[s.TEXTURE_2D]=yt(s.TEXTURE_2D,s.TEXTURE_2D,1),zt[s.TEXTURE_CUBE_MAP]=yt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(zt[s.TEXTURE_2D_ARRAY]=yt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),zt[s.TEXTURE_3D]=yt(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),kt(s.DEPTH_TEST),l.setFunc(vr),Wt(!1),R(Ea),kt(s.CULL_FACE),Mt(ti);function kt(U){d[U]!==!0&&(s.enable(U),d[U]=!0)}function Pt(U){d[U]!==!1&&(s.disable(U),d[U]=!1)}function Zt(U,ht){return m[U]!==ht?(s.bindFramebuffer(U,ht),m[U]=ht,n&&(U===s.DRAW_FRAMEBUFFER&&(m[s.FRAMEBUFFER]=ht),U===s.FRAMEBUFFER&&(m[s.DRAW_FRAMEBUFFER]=ht)),!0):!1}function X(U,ht){let dt=v,Lt=!1;if(U)if(dt=g.get(ht),dt===void 0&&(dt=[],g.set(ht,dt)),U.isWebGLMultipleRenderTargets){const Tt=U.texture;if(dt.length!==Tt.length||dt[0]!==s.COLOR_ATTACHMENT0){for(let se=0,re=Tt.length;se<re;se++)dt[se]=s.COLOR_ATTACHMENT0+se;dt.length=Tt.length,Lt=!0}}else dt[0]!==s.COLOR_ATTACHMENT0&&(dt[0]=s.COLOR_ATTACHMENT0,Lt=!0);else dt[0]!==s.BACK&&(dt[0]=s.BACK,Lt=!0);Lt&&(e.isWebGL2?s.drawBuffers(dt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(dt))}function Ge(U){return f!==U?(s.useProgram(U),f=U,!0):!1}const bt={[vi]:s.FUNC_ADD,[Wh]:s.FUNC_SUBTRACT,[Xh]:s.FUNC_REVERSE_SUBTRACT};if(n)bt[Aa]=s.MIN,bt[Ca]=s.MAX;else{const U=t.get("EXT_blend_minmax");U!==null&&(bt[Aa]=U.MIN_EXT,bt[Ca]=U.MAX_EXT)}const Ut={[qh]:s.ZERO,[Yh]:s.ONE,[jh]:s.SRC_COLOR,[Co]:s.SRC_ALPHA,[td]:s.SRC_ALPHA_SATURATE,[Jh]:s.DST_COLOR,[Kh]:s.DST_ALPHA,[$h]:s.ONE_MINUS_SRC_COLOR,[Ro]:s.ONE_MINUS_SRC_ALPHA,[Qh]:s.ONE_MINUS_DST_COLOR,[Zh]:s.ONE_MINUS_DST_ALPHA,[ed]:s.CONSTANT_COLOR,[nd]:s.ONE_MINUS_CONSTANT_COLOR,[id]:s.CONSTANT_ALPHA,[sd]:s.ONE_MINUS_CONSTANT_ALPHA};function Mt(U,ht,dt,Lt,Tt,se,re,we,ke,oe){if(U===ti){p===!0&&(Pt(s.BLEND),p=!1);return}if(p===!1&&(kt(s.BLEND),p=!0),U!==Vh){if(U!==x||oe!==B){if((y!==vi||w!==vi)&&(s.blendEquation(s.FUNC_ADD),y=vi,w=vi),oe)switch(U){case ji:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wa:s.blendFunc(s.ONE,s.ONE);break;case ba:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ta:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ji:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wa:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ba:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ta:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,P=null,C=null,z=null,S.set(0,0,0),T=0,x=U,B=oe}return}Tt=Tt||ht,se=se||dt,re=re||Lt,(ht!==y||Tt!==w)&&(s.blendEquationSeparate(bt[ht],bt[Tt]),y=ht,w=Tt),(dt!==E||Lt!==P||se!==C||re!==z)&&(s.blendFuncSeparate(Ut[dt],Ut[Lt],Ut[se],Ut[re]),E=dt,P=Lt,C=se,z=re),(we.equals(S)===!1||ke!==T)&&(s.blendColor(we.r,we.g,we.b,ke),S.copy(we),T=ke),x=U,B=!1}function ce(U,ht){U.side===Ce?Pt(s.CULL_FACE):kt(s.CULL_FACE);let dt=U.side===$e;ht&&(dt=!dt),Wt(dt),U.blending===ji&&U.transparent===!1?Mt(ti):Mt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),a.setMask(U.colorWrite);const Lt=U.stencilWrite;c.setTest(Lt),Lt&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Y(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?kt(s.SAMPLE_ALPHA_TO_COVERAGE):Pt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(U){F!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),F=U)}function R(U){U!==zh?(kt(s.CULL_FACE),U!==N&&(U===Ea?s.cullFace(s.BACK):U===Gh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Pt(s.CULL_FACE),N=U}function b(U){U!==L&&(G&&s.lineWidth(U),L=U)}function Y(U,ht,dt){U?(kt(s.POLYGON_OFFSET_FILL),(D!==ht||I!==dt)&&(s.polygonOffset(ht,dt),D=ht,I=dt)):Pt(s.POLYGON_OFFSET_FILL)}function it(U){U?kt(s.SCISSOR_TEST):Pt(s.SCISSOR_TEST)}function nt(U){U===void 0&&(U=s.TEXTURE0+V-1),Q!==U&&(s.activeTexture(U),Q=U)}function st(U,ht,dt){dt===void 0&&(Q===null?dt=s.TEXTURE0+V-1:dt=Q);let Lt=W[dt];Lt===void 0&&(Lt={type:void 0,texture:void 0},W[dt]=Lt),(Lt.type!==U||Lt.texture!==ht)&&(Q!==dt&&(s.activeTexture(dt),Q=dt),s.bindTexture(U,ht||zt[U]),Lt.type=U,Lt.texture=ht)}function St(){const U=W[Q];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ut(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function vt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Rt(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Xt(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Kt(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function wt(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ht(U){ct.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),ct.copy(U))}function ee(U){xt.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),xt.copy(U))}function de(U,ht){let dt=u.get(ht);dt===void 0&&(dt=new WeakMap,u.set(ht,dt));let Lt=dt.get(U);Lt===void 0&&(Lt=s.getUniformBlockIndex(ht,U.name),dt.set(U,Lt))}function Yt(U,ht){const Lt=u.get(ht).get(U);h.get(ht)!==Lt&&(s.uniformBlockBinding(ht,Lt,U.__bindingPointIndex),h.set(ht,Lt))}function ot(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},Q=null,W={},m={},g=new WeakMap,v=[],f=null,p=!1,x=null,y=null,E=null,P=null,w=null,C=null,z=null,S=new Bt(0,0,0),T=0,B=!1,F=null,N=null,L=null,D=null,I=null,ct.set(0,0,s.canvas.width,s.canvas.height),xt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:kt,disable:Pt,bindFramebuffer:Zt,drawBuffers:X,useProgram:Ge,setBlending:Mt,setMaterial:ce,setFlipSided:Wt,setCullFace:R,setLineWidth:b,setPolygonOffset:Y,setScissorTest:it,activeTexture:nt,bindTexture:st,unbindTexture:St,compressedTexImage2D:ut,compressedTexImage3D:vt,texImage2D:wt,texImage3D:_t,updateUBOMapping:de,uniformBlockBinding:Yt,texStorage2D:Kt,texStorage3D:Nt,texSubImage2D:Rt,texSubImage3D:Xt,compressedTexSubImage2D:et,compressedTexSubImage3D:ne,scissor:Ht,viewport:ee,reset:ot}}function G0(s,t,e,n,i,r,o){const a=i.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,b){return m?new OffscreenCanvas(R,b):Sr("canvas")}function v(R,b,Y,it){let nt=1;if((R.width>it||R.height>it)&&(nt=it/Math.max(R.width,R.height)),nt<1||b===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const st=b?Fo:Math.floor,St=st(nt*R.width),ut=st(nt*R.height);u===void 0&&(u=g(St,ut));const vt=Y?g(St,ut):u;return vt.width=St,vt.height=ut,vt.getContext("2d").drawImage(R,0,0,St,ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+St+"x"+ut+")."),vt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function f(R){return sl(R.width)&&sl(R.height)}function p(R){return a?!1:R.wrapS!==pn||R.wrapT!==pn||R.minFilter!==We&&R.minFilter!==rn}function x(R,b){return R.generateMipmaps&&b&&R.minFilter!==We&&R.minFilter!==rn}function y(R){s.generateMipmap(R)}function E(R,b,Y,it,nt=!1){if(a===!1)return b;if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let st=b;if(b===s.RED&&(Y===s.FLOAT&&(st=s.R32F),Y===s.HALF_FLOAT&&(st=s.R16F),Y===s.UNSIGNED_BYTE&&(st=s.R8)),b===s.RED_INTEGER&&(Y===s.UNSIGNED_BYTE&&(st=s.R8UI),Y===s.UNSIGNED_SHORT&&(st=s.R16UI),Y===s.UNSIGNED_INT&&(st=s.R32UI),Y===s.BYTE&&(st=s.R8I),Y===s.SHORT&&(st=s.R16I),Y===s.INT&&(st=s.R32I)),b===s.RG&&(Y===s.FLOAT&&(st=s.RG32F),Y===s.HALF_FLOAT&&(st=s.RG16F),Y===s.UNSIGNED_BYTE&&(st=s.RG8)),b===s.RGBA){const St=nt?_r:ie.getTransfer(it);Y===s.FLOAT&&(st=s.RGBA32F),Y===s.HALF_FLOAT&&(st=s.RGBA16F),Y===s.UNSIGNED_BYTE&&(st=St===le?s.SRGB8_ALPHA8:s.RGBA8),Y===s.UNSIGNED_SHORT_4_4_4_4&&(st=s.RGBA4),Y===s.UNSIGNED_SHORT_5_5_5_1&&(st=s.RGB5_A1)}return(st===s.R16F||st===s.R32F||st===s.RG16F||st===s.RG32F||st===s.RGBA16F||st===s.RGBA32F)&&t.get("EXT_color_buffer_float"),st}function P(R,b,Y){return x(R,Y)===!0||R.isFramebufferTexture&&R.minFilter!==We&&R.minFilter!==rn?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function w(R){return R===We||R===Ra||R===zr?s.NEAREST:s.LINEAR}function C(R){const b=R.target;b.removeEventListener("dispose",C),S(b),b.isVideoTexture&&h.delete(b)}function z(R){const b=R.target;b.removeEventListener("dispose",z),B(b)}function S(R){const b=n.get(R);if(b.__webglInit===void 0)return;const Y=R.source,it=d.get(Y);if(it){const nt=it[b.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&T(R),Object.keys(it).length===0&&d.delete(Y)}n.remove(R)}function T(R){const b=n.get(R);s.deleteTexture(b.__webglTexture);const Y=R.source,it=d.get(Y);delete it[b.__cacheKey],o.memory.textures--}function B(R){const b=R.texture,Y=n.get(R),it=n.get(b);if(it.__webglTexture!==void 0&&(s.deleteTexture(it.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(Y.__webglFramebuffer[nt]))for(let st=0;st<Y.__webglFramebuffer[nt].length;st++)s.deleteFramebuffer(Y.__webglFramebuffer[nt][st]);else s.deleteFramebuffer(Y.__webglFramebuffer[nt]);Y.__webglDepthbuffer&&s.deleteRenderbuffer(Y.__webglDepthbuffer[nt])}else{if(Array.isArray(Y.__webglFramebuffer))for(let nt=0;nt<Y.__webglFramebuffer.length;nt++)s.deleteFramebuffer(Y.__webglFramebuffer[nt]);else s.deleteFramebuffer(Y.__webglFramebuffer);if(Y.__webglDepthbuffer&&s.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let nt=0;nt<Y.__webglColorRenderbuffer.length;nt++)Y.__webglColorRenderbuffer[nt]&&s.deleteRenderbuffer(Y.__webglColorRenderbuffer[nt]);Y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let nt=0,st=b.length;nt<st;nt++){const St=n.get(b[nt]);St.__webglTexture&&(s.deleteTexture(St.__webglTexture),o.memory.textures--),n.remove(b[nt])}n.remove(b),n.remove(R)}let F=0;function N(){F=0}function L(){const R=F;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),F+=1,R}function D(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function I(R,b){const Y=n.get(R);if(R.isVideoTexture&&ce(R),R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version){const it=R.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ct(Y,R,b);return}}e.bindTexture(s.TEXTURE_2D,Y.__webglTexture,s.TEXTURE0+b)}function V(R,b){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){ct(Y,R,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,Y.__webglTexture,s.TEXTURE0+b)}function G(R,b){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){ct(Y,R,b);return}e.bindTexture(s.TEXTURE_3D,Y.__webglTexture,s.TEXTURE0+b)}function H(R,b){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){xt(Y,R,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture,s.TEXTURE0+b)}const K={[Do]:s.REPEAT,[pn]:s.CLAMP_TO_EDGE,[Io]:s.MIRRORED_REPEAT},Q={[We]:s.NEAREST,[Ra]:s.NEAREST_MIPMAP_NEAREST,[zr]:s.NEAREST_MIPMAP_LINEAR,[rn]:s.LINEAR,[yd]:s.LINEAR_MIPMAP_NEAREST,[bs]:s.LINEAR_MIPMAP_LINEAR},W={[Dd]:s.NEVER,[Bd]:s.ALWAYS,[Id]:s.LESS,[Vc]:s.LEQUAL,[Nd]:s.EQUAL,[Od]:s.GEQUAL,[Ud]:s.GREATER,[Fd]:s.NOTEQUAL};function $(R,b,Y){if(Y?(s.texParameteri(R,s.TEXTURE_WRAP_S,K[b.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,K[b.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,K[b.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,Q[b.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,Q[b.minFilter])):(s.texParameteri(R,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(R,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(b.wrapS!==pn||b.wrapT!==pn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(R,s.TEXTURE_MAG_FILTER,w(b.magFilter)),s.texParameteri(R,s.TEXTURE_MIN_FILTER,w(b.minFilter)),b.minFilter!==We&&b.minFilter!==rn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,W[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const it=t.get("EXT_texture_filter_anisotropic");if(b.magFilter===We||b.minFilter!==zr&&b.minFilter!==bs||b.type===Jn&&t.has("OES_texture_float_linear")===!1||a===!1&&b.type===Ts&&t.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(s.texParameterf(R,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function tt(R,b){let Y=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",C));const it=b.source;let nt=d.get(it);nt===void 0&&(nt={},d.set(it,nt));const st=D(b);if(st!==R.__cacheKey){nt[st]===void 0&&(nt[st]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),nt[st].usedTimes++;const St=nt[R.__cacheKey];St!==void 0&&(nt[R.__cacheKey].usedTimes--,St.usedTimes===0&&T(b)),R.__cacheKey=st,R.__webglTexture=nt[st].texture}return Y}function ct(R,b,Y){let it=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(it=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(it=s.TEXTURE_3D);const nt=tt(R,b),st=b.source;e.bindTexture(it,R.__webglTexture,s.TEXTURE0+Y);const St=n.get(st);if(st.version!==St.__version||nt===!0){e.activeTexture(s.TEXTURE0+Y);const ut=ie.getPrimaries(ie.workingColorSpace),vt=b.colorSpace===an?null:ie.getPrimaries(b.colorSpace),Rt=b.colorSpace===an||ut===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);const Xt=p(b)&&f(b.image)===!1;let et=v(b.image,Xt,!1,i.maxTextureSize);et=Wt(b,et);const ne=f(et)||a,Kt=r.convert(b.format,b.colorSpace);let Nt=r.convert(b.type),wt=E(b.internalFormat,Kt,Nt,b.colorSpace,b.isVideoTexture);$(it,b,ne);let _t;const Ht=b.mipmaps,ee=a&&b.isVideoTexture!==!0&&wt!==kc,de=St.__version===void 0||nt===!0,Yt=P(b,et,ne);if(b.isDepthTexture)wt=s.DEPTH_COMPONENT,a?b.type===Jn?wt=s.DEPTH_COMPONENT32F:b.type===Zn?wt=s.DEPTH_COMPONENT24:b.type===Mi?wt=s.DEPTH24_STENCIL8:wt=s.DEPTH_COMPONENT16:b.type===Jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===Si&&wt===s.DEPTH_COMPONENT&&b.type!==Qo&&b.type!==Zn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=Zn,Nt=r.convert(b.type)),b.format===ns&&wt===s.DEPTH_COMPONENT&&(wt=s.DEPTH_STENCIL,b.type!==Mi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=Mi,Nt=r.convert(b.type))),de&&(ee?e.texStorage2D(s.TEXTURE_2D,1,wt,et.width,et.height):e.texImage2D(s.TEXTURE_2D,0,wt,et.width,et.height,0,Kt,Nt,null));else if(b.isDataTexture)if(Ht.length>0&&ne){ee&&de&&e.texStorage2D(s.TEXTURE_2D,Yt,wt,Ht[0].width,Ht[0].height);for(let ot=0,U=Ht.length;ot<U;ot++)_t=Ht[ot],ee?e.texSubImage2D(s.TEXTURE_2D,ot,0,0,_t.width,_t.height,Kt,Nt,_t.data):e.texImage2D(s.TEXTURE_2D,ot,wt,_t.width,_t.height,0,Kt,Nt,_t.data);b.generateMipmaps=!1}else ee?(de&&e.texStorage2D(s.TEXTURE_2D,Yt,wt,et.width,et.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,et.width,et.height,Kt,Nt,et.data)):e.texImage2D(s.TEXTURE_2D,0,wt,et.width,et.height,0,Kt,Nt,et.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ee&&de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Yt,wt,Ht[0].width,Ht[0].height,et.depth);for(let ot=0,U=Ht.length;ot<U;ot++)_t=Ht[ot],b.format!==mn?Kt!==null?ee?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,_t.width,_t.height,et.depth,Kt,_t.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ot,wt,_t.width,_t.height,et.depth,0,_t.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?e.texSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,_t.width,_t.height,et.depth,Kt,Nt,_t.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ot,wt,_t.width,_t.height,et.depth,0,Kt,Nt,_t.data)}else{ee&&de&&e.texStorage2D(s.TEXTURE_2D,Yt,wt,Ht[0].width,Ht[0].height);for(let ot=0,U=Ht.length;ot<U;ot++)_t=Ht[ot],b.format!==mn?Kt!==null?ee?e.compressedTexSubImage2D(s.TEXTURE_2D,ot,0,0,_t.width,_t.height,Kt,_t.data):e.compressedTexImage2D(s.TEXTURE_2D,ot,wt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?e.texSubImage2D(s.TEXTURE_2D,ot,0,0,_t.width,_t.height,Kt,Nt,_t.data):e.texImage2D(s.TEXTURE_2D,ot,wt,_t.width,_t.height,0,Kt,Nt,_t.data)}else if(b.isDataArrayTexture)ee?(de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Yt,wt,et.width,et.height,et.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,Kt,Nt,et.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,wt,et.width,et.height,et.depth,0,Kt,Nt,et.data);else if(b.isData3DTexture)ee?(de&&e.texStorage3D(s.TEXTURE_3D,Yt,wt,et.width,et.height,et.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,Kt,Nt,et.data)):e.texImage3D(s.TEXTURE_3D,0,wt,et.width,et.height,et.depth,0,Kt,Nt,et.data);else if(b.isFramebufferTexture){if(de)if(ee)e.texStorage2D(s.TEXTURE_2D,Yt,wt,et.width,et.height);else{let ot=et.width,U=et.height;for(let ht=0;ht<Yt;ht++)e.texImage2D(s.TEXTURE_2D,ht,wt,ot,U,0,Kt,Nt,null),ot>>=1,U>>=1}}else if(Ht.length>0&&ne){ee&&de&&e.texStorage2D(s.TEXTURE_2D,Yt,wt,Ht[0].width,Ht[0].height);for(let ot=0,U=Ht.length;ot<U;ot++)_t=Ht[ot],ee?e.texSubImage2D(s.TEXTURE_2D,ot,0,0,Kt,Nt,_t):e.texImage2D(s.TEXTURE_2D,ot,wt,Kt,Nt,_t);b.generateMipmaps=!1}else ee?(de&&e.texStorage2D(s.TEXTURE_2D,Yt,wt,et.width,et.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,Kt,Nt,et)):e.texImage2D(s.TEXTURE_2D,0,wt,Kt,Nt,et);x(b,ne)&&y(it),St.__version=st.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function xt(R,b,Y){if(b.image.length!==6)return;const it=tt(R,b),nt=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+Y);const st=n.get(nt);if(nt.version!==st.__version||it===!0){e.activeTexture(s.TEXTURE0+Y);const St=ie.getPrimaries(ie.workingColorSpace),ut=b.colorSpace===an?null:ie.getPrimaries(b.colorSpace),vt=b.colorSpace===an||St===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Rt=b.isCompressedTexture||b.image[0].isCompressedTexture,Xt=b.image[0]&&b.image[0].isDataTexture,et=[];for(let ot=0;ot<6;ot++)!Rt&&!Xt?et[ot]=v(b.image[ot],!1,!0,i.maxCubemapSize):et[ot]=Xt?b.image[ot].image:b.image[ot],et[ot]=Wt(b,et[ot]);const ne=et[0],Kt=f(ne)||a,Nt=r.convert(b.format,b.colorSpace),wt=r.convert(b.type),_t=E(b.internalFormat,Nt,wt,b.colorSpace),Ht=a&&b.isVideoTexture!==!0,ee=st.__version===void 0||it===!0;let de=P(b,ne,Kt);$(s.TEXTURE_CUBE_MAP,b,Kt);let Yt;if(Rt){Ht&&ee&&e.texStorage2D(s.TEXTURE_CUBE_MAP,de,_t,ne.width,ne.height);for(let ot=0;ot<6;ot++){Yt=et[ot].mipmaps;for(let U=0;U<Yt.length;U++){const ht=Yt[U];b.format!==mn?Nt!==null?Ht?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U,0,0,ht.width,ht.height,Nt,ht.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U,_t,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U,0,0,ht.width,ht.height,Nt,wt,ht.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U,_t,ht.width,ht.height,0,Nt,wt,ht.data)}}}else{Yt=b.mipmaps,Ht&&ee&&(Yt.length>0&&de++,e.texStorage2D(s.TEXTURE_CUBE_MAP,de,_t,et[0].width,et[0].height));for(let ot=0;ot<6;ot++)if(Xt){Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,et[ot].width,et[ot].height,Nt,wt,et[ot].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,_t,et[ot].width,et[ot].height,0,Nt,wt,et[ot].data);for(let U=0;U<Yt.length;U++){const dt=Yt[U].image[ot].image;Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U+1,0,0,dt.width,dt.height,Nt,wt,dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U+1,_t,dt.width,dt.height,0,Nt,wt,dt.data)}}else{Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Nt,wt,et[ot]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,_t,Nt,wt,et[ot]);for(let U=0;U<Yt.length;U++){const ht=Yt[U];Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U+1,0,0,Nt,wt,ht.image[ot]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,U+1,_t,Nt,wt,ht.image[ot])}}}x(b,Kt)&&y(s.TEXTURE_CUBE_MAP),st.__version=nt.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function yt(R,b,Y,it,nt,st){const St=r.convert(Y.format,Y.colorSpace),ut=r.convert(Y.type),vt=E(Y.internalFormat,St,ut,Y.colorSpace);if(!n.get(b).__hasExternalTextures){const Xt=Math.max(1,b.width>>st),et=Math.max(1,b.height>>st);nt===s.TEXTURE_3D||nt===s.TEXTURE_2D_ARRAY?e.texImage3D(nt,st,vt,Xt,et,b.depth,0,St,ut,null):e.texImage2D(nt,st,vt,Xt,et,0,St,ut,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),Mt(b)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,nt,n.get(Y).__webglTexture,0,Ut(b)):(nt===s.TEXTURE_2D||nt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,it,nt,n.get(Y).__webglTexture,st),e.bindFramebuffer(s.FRAMEBUFFER,null)}function zt(R,b,Y){if(s.bindRenderbuffer(s.RENDERBUFFER,R),b.depthBuffer&&!b.stencilBuffer){let it=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(Y||Mt(b)){const nt=b.depthTexture;nt&&nt.isDepthTexture&&(nt.type===Jn?it=s.DEPTH_COMPONENT32F:nt.type===Zn&&(it=s.DEPTH_COMPONENT24));const st=Ut(b);Mt(b)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,st,it,b.width,b.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,st,it,b.width,b.height)}else s.renderbufferStorage(s.RENDERBUFFER,it,b.width,b.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,R)}else if(b.depthBuffer&&b.stencilBuffer){const it=Ut(b);Y&&Mt(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,it,s.DEPTH24_STENCIL8,b.width,b.height):Mt(b)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,it,s.DEPTH24_STENCIL8,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,R)}else{const it=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let nt=0;nt<it.length;nt++){const st=it[nt],St=r.convert(st.format,st.colorSpace),ut=r.convert(st.type),vt=E(st.internalFormat,St,ut,st.colorSpace),Rt=Ut(b);Y&&Mt(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Rt,vt,b.width,b.height):Mt(b)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Rt,vt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,vt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function kt(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),I(b.depthTexture,0);const it=n.get(b.depthTexture).__webglTexture,nt=Ut(b);if(b.depthTexture.format===Si)Mt(b)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0,nt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0);else if(b.depthTexture.format===ns)Mt(b)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0,nt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Pt(R){const b=n.get(R),Y=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");kt(b.__webglFramebuffer,R)}else if(Y){b.__webglDepthbuffer=[];for(let it=0;it<6;it++)e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[it]),b.__webglDepthbuffer[it]=s.createRenderbuffer(),zt(b.__webglDepthbuffer[it],R,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=s.createRenderbuffer(),zt(b.__webglDepthbuffer,R,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Zt(R,b,Y){const it=n.get(R);b!==void 0&&yt(it.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Y!==void 0&&Pt(R)}function X(R){const b=R.texture,Y=n.get(R),it=n.get(b);R.addEventListener("dispose",z),R.isWebGLMultipleRenderTargets!==!0&&(it.__webglTexture===void 0&&(it.__webglTexture=s.createTexture()),it.__version=b.version,o.memory.textures++);const nt=R.isWebGLCubeRenderTarget===!0,st=R.isWebGLMultipleRenderTargets===!0,St=f(R)||a;if(nt){Y.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(a&&b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer[ut]=[];for(let vt=0;vt<b.mipmaps.length;vt++)Y.__webglFramebuffer[ut][vt]=s.createFramebuffer()}else Y.__webglFramebuffer[ut]=s.createFramebuffer()}else{if(a&&b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ut=0;ut<b.mipmaps.length;ut++)Y.__webglFramebuffer[ut]=s.createFramebuffer()}else Y.__webglFramebuffer=s.createFramebuffer();if(st)if(i.drawBuffers){const ut=R.texture;for(let vt=0,Rt=ut.length;vt<Rt;vt++){const Xt=n.get(ut[vt]);Xt.__webglTexture===void 0&&(Xt.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&Mt(R)===!1){const ut=st?b:[b];Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let vt=0;vt<ut.length;vt++){const Rt=ut[vt];Y.__webglColorRenderbuffer[vt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Y.__webglColorRenderbuffer[vt]);const Xt=r.convert(Rt.format,Rt.colorSpace),et=r.convert(Rt.type),ne=E(Rt.internalFormat,Xt,et,Rt.colorSpace,R.isXRRenderTarget===!0),Kt=Ut(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,Kt,ne,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,Y.__webglColorRenderbuffer[vt])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),zt(Y.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(nt){e.bindTexture(s.TEXTURE_CUBE_MAP,it.__webglTexture),$(s.TEXTURE_CUBE_MAP,b,St);for(let ut=0;ut<6;ut++)if(a&&b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)yt(Y.__webglFramebuffer[ut][vt],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,vt);else yt(Y.__webglFramebuffer[ut],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);x(b,St)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){const ut=R.texture;for(let vt=0,Rt=ut.length;vt<Rt;vt++){const Xt=ut[vt],et=n.get(Xt);e.bindTexture(s.TEXTURE_2D,et.__webglTexture),$(s.TEXTURE_2D,Xt,St),yt(Y.__webglFramebuffer,R,Xt,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,0),x(Xt,St)&&y(s.TEXTURE_2D)}e.unbindTexture()}else{let ut=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?ut=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ut,it.__webglTexture),$(ut,b,St),a&&b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)yt(Y.__webglFramebuffer[vt],R,b,s.COLOR_ATTACHMENT0,ut,vt);else yt(Y.__webglFramebuffer,R,b,s.COLOR_ATTACHMENT0,ut,0);x(b,St)&&y(ut),e.unbindTexture()}R.depthBuffer&&Pt(R)}function Ge(R){const b=f(R)||a,Y=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let it=0,nt=Y.length;it<nt;it++){const st=Y[it];if(x(st,b)){const St=R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,ut=n.get(st).__webglTexture;e.bindTexture(St,ut),y(St),e.unbindTexture()}}}function bt(R){if(a&&R.samples>0&&Mt(R)===!1){const b=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],Y=R.width,it=R.height;let nt=s.COLOR_BUFFER_BIT;const st=[],St=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ut=n.get(R),vt=R.isWebGLMultipleRenderTargets===!0;if(vt)for(let Rt=0;Rt<b.length;Rt++)e.bindFramebuffer(s.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ut.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let Rt=0;Rt<b.length;Rt++){st.push(s.COLOR_ATTACHMENT0+Rt),R.depthBuffer&&st.push(St);const Xt=ut.__ignoreDepthValues!==void 0?ut.__ignoreDepthValues:!1;if(Xt===!1&&(R.depthBuffer&&(nt|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&(nt|=s.STENCIL_BUFFER_BIT)),vt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ut.__webglColorRenderbuffer[Rt]),Xt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[St]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[St])),vt){const et=n.get(b[Rt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,et,0)}s.blitFramebuffer(0,0,Y,it,0,0,Y,it,nt,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,st)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),vt)for(let Rt=0;Rt<b.length;Rt++){e.bindFramebuffer(s.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.RENDERBUFFER,ut.__webglColorRenderbuffer[Rt]);const Xt=n.get(b[Rt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ut.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.TEXTURE_2D,Xt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}}function Ut(R){return Math.min(i.maxSamples,R.samples)}function Mt(R){const b=n.get(R);return a&&R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ce(R){const b=o.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function Wt(R,b){const Y=R.colorSpace,it=R.format,nt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===No||Y!==kn&&Y!==an&&(ie.getTransfer(Y)===le?a===!1?t.has("EXT_sRGB")===!0&&it===mn?(R.format=No,R.minFilter=rn,R.generateMipmaps=!1):b=Xc.sRGBToLinear(b):(it!==mn||nt!==ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),b}this.allocateTextureUnit=L,this.resetTextureUnits=N,this.setTexture2D=I,this.setTexture2DArray=V,this.setTexture3D=G,this.setTextureCube=H,this.rebindTextures=Zt,this.setupRenderTarget=X,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=Mt}function k0(s,t,e){const n=e.isWebGL2;function i(r,o=an){let a;const l=ie.getTransfer(o);if(r===ni)return s.UNSIGNED_BYTE;if(r===Fc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Oc)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Md)return s.BYTE;if(r===Sd)return s.SHORT;if(r===Qo)return s.UNSIGNED_SHORT;if(r===Uc)return s.INT;if(r===Zn)return s.UNSIGNED_INT;if(r===Jn)return s.FLOAT;if(r===Ts)return n?s.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Ed)return s.ALPHA;if(r===mn)return s.RGBA;if(r===wd)return s.LUMINANCE;if(r===bd)return s.LUMINANCE_ALPHA;if(r===Si)return s.DEPTH_COMPONENT;if(r===ns)return s.DEPTH_STENCIL;if(r===No)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Td)return s.RED;if(r===Bc)return s.RED_INTEGER;if(r===Ad)return s.RG;if(r===zc)return s.RG_INTEGER;if(r===Gc)return s.RGBA_INTEGER;if(r===Gr||r===kr||r===Hr||r===Vr)if(l===le)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Gr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===kr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Vr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Gr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===kr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Hr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Vr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Pa||r===La||r===Da||r===Ia)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Pa)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===La)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Da)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ia)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===kc)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Na||r===Ua)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Na)return l===le?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Ua)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Fa||r===Oa||r===Ba||r===za||r===Ga||r===ka||r===Ha||r===Va||r===Wa||r===Xa||r===qa||r===Ya||r===ja||r===$a)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Fa)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Oa)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ba)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===za)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ga)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ka)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ha)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Va)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Wa)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Xa)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===qa)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ya)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ja)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===$a)return l===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Wr||r===Ka||r===Za)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===Wr)return l===le?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ka)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Za)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Cd||r===Ja||r===Qa||r===tl)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===Wr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Ja)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Qa)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===tl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Mi?n?s.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class H0 extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class je extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const V0={type:"move"};class go{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const f=e.getJointPose(v,n),p=this._getHandJoint(c,v);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&d>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(V0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new je;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class W0 extends rs{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,m=null,g=null;const v=e.getContextAttributes();let f=null,p=null;const x=[],y=[],E=new Jt;let P=null;const w=new on;w.layers.enable(1),w.viewport=new Re;const C=new on;C.layers.enable(2),C.viewport=new Re;const z=[w,C],S=new H0;S.layers.enable(1),S.layers.enable(2);let T=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let tt=x[$];return tt===void 0&&(tt=new go,x[$]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function($){let tt=x[$];return tt===void 0&&(tt=new go,x[$]=tt),tt.getGripSpace()},this.getHand=function($){let tt=x[$];return tt===void 0&&(tt=new go,x[$]=tt),tt.getHandSpace()};function F($){const tt=y.indexOf($.inputSource);if(tt===-1)return;const ct=x[tt];ct!==void 0&&(ct.update($.inputSource,$.frame,c||o),ct.dispatchEvent({type:$.type,data:$.inputSource}))}function N(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",L);for(let $=0;$<x.length;$++){const tt=y[$];tt!==null&&(y[$]=null,x[$].disconnect(tt))}T=null,B=null,t.setRenderTarget(f),m=null,d=null,u=null,i=null,p=null,W.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(f=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",N),i.addEventListener("inputsourceschange",L),v.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(E),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const tt={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),p=new wi(m.framebufferWidth,m.framebufferHeight,{format:mn,type:ni,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let tt=null,ct=null,xt=null;v.depth&&(xt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=v.stencil?ns:Si,ct=v.stencil?Mi:Zn);const yt={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(yt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),p=new wi(d.textureWidth,d.textureHeight,{format:mn,type:ni,depthTexture:new ih(d.textureWidth,d.textureHeight,ct,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});const zt=t.properties.get(p);zt.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),W.setContext(i),W.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function L($){for(let tt=0;tt<$.removed.length;tt++){const ct=$.removed[tt],xt=y.indexOf(ct);xt>=0&&(y[xt]=null,x[xt].disconnect(ct))}for(let tt=0;tt<$.added.length;tt++){const ct=$.added[tt];let xt=y.indexOf(ct);if(xt===-1){for(let zt=0;zt<x.length;zt++)if(zt>=y.length){y.push(ct),xt=zt;break}else if(y[zt]===null){y[zt]=ct,xt=zt;break}if(xt===-1)break}const yt=x[xt];yt&&yt.connect(ct)}}const D=new O,I=new O;function V($,tt,ct){D.setFromMatrixPosition(tt.matrixWorld),I.setFromMatrixPosition(ct.matrixWorld);const xt=D.distanceTo(I),yt=tt.projectionMatrix.elements,zt=ct.projectionMatrix.elements,kt=yt[14]/(yt[10]-1),Pt=yt[14]/(yt[10]+1),Zt=(yt[9]+1)/yt[5],X=(yt[9]-1)/yt[5],Ge=(yt[8]-1)/yt[0],bt=(zt[8]+1)/zt[0],Ut=kt*Ge,Mt=kt*bt,ce=xt/(-Ge+bt),Wt=ce*-Ge;tt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Wt),$.translateZ(ce),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const R=kt+ce,b=Pt+ce,Y=Ut-Wt,it=Mt+(xt-Wt),nt=Zt*Pt/b*R,st=X*Pt/b*R;$.projectionMatrix.makePerspective(Y,it,nt,st,R,b),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function G($,tt){tt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(tt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;S.near=C.near=w.near=$.near,S.far=C.far=w.far=$.far,(T!==S.near||B!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),T=S.near,B=S.far);const tt=$.parent,ct=S.cameras;G(S,tt);for(let xt=0;xt<ct.length;xt++)G(ct[xt],tt);ct.length===2?V(S,w,C):S.projectionMatrix.copy(w.projectionMatrix),H($,S,tt)};function H($,tt,ct){ct===null?$.matrix.copy(tt.matrixWorld):($.matrix.copy(ct.matrixWorld),$.matrix.invert(),$.matrix.multiply(tt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(tt.projectionMatrix),$.projectionMatrixInverse.copy(tt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Uo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)};let K=null;function Q($,tt){if(h=tt.getViewerPose(c||o),g=tt,h!==null){const ct=h.views;m!==null&&(t.setRenderTargetFramebuffer(p,m.framebuffer),t.setRenderTarget(p));let xt=!1;ct.length!==S.cameras.length&&(S.cameras.length=0,xt=!0);for(let yt=0;yt<ct.length;yt++){const zt=ct[yt];let kt=null;if(m!==null)kt=m.getViewport(zt);else{const Zt=u.getViewSubImage(d,zt);kt=Zt.viewport,yt===0&&(t.setRenderTargetTextures(p,Zt.colorTexture,d.ignoreDepthValues?void 0:Zt.depthStencilTexture),t.setRenderTarget(p))}let Pt=z[yt];Pt===void 0&&(Pt=new on,Pt.layers.enable(yt),Pt.viewport=new Re,z[yt]=Pt),Pt.matrix.fromArray(zt.transform.matrix),Pt.matrix.decompose(Pt.position,Pt.quaternion,Pt.scale),Pt.projectionMatrix.fromArray(zt.projectionMatrix),Pt.projectionMatrixInverse.copy(Pt.projectionMatrix).invert(),Pt.viewport.set(kt.x,kt.y,kt.width,kt.height),yt===0&&(S.matrix.copy(Pt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),xt===!0&&S.cameras.push(Pt)}}for(let ct=0;ct<x.length;ct++){const xt=y[ct],yt=x[ct];xt!==null&&yt!==void 0&&yt.update(xt,tt,c||o)}K&&K($,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const W=new eh;W.setAnimationLoop(Q),this.setAnimationLoop=function($){K=$},this.dispose=function(){}}}function X0(s,t){function e(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function n(f,p){p.color.getRGB(f.fogColor.value,Jc(s)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function i(f,p,x,y,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(f,p):p.isMeshToonMaterial?(r(f,p),u(f,p)):p.isMeshPhongMaterial?(r(f,p),h(f,p)):p.isMeshStandardMaterial?(r(f,p),d(f,p),p.isMeshPhysicalMaterial&&m(f,p,E)):p.isMeshMatcapMaterial?(r(f,p),g(f,p)):p.isMeshDepthMaterial?r(f,p):p.isMeshDistanceMaterial?(r(f,p),v(f,p)):p.isMeshNormalMaterial?r(f,p):p.isLineBasicMaterial?(o(f,p),p.isLineDashedMaterial&&a(f,p)):p.isPointsMaterial?l(f,p,x,y):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,e(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===$e&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,e(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===$e&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,e(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,e(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const x=t.get(p).envMap;if(x&&(f.envMap.value=x,f.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap){f.lightMap.value=p.lightMap;const y=s._useLegacyLights===!0?Math.PI:1;f.lightMapIntensity.value=p.lightMapIntensity*y,e(p.lightMap,f.lightMapTransform)}p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,f.aoMapTransform))}function o(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform))}function a(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,x,y){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*x,f.scale.value=y*.5,p.map&&(f.map.value=p.map,e(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function h(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function u(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function d(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,f.roughnessMapTransform)),t.get(p).envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,x){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$e&&f.clearcoatNormalScale.value.negate())),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=x.texture,f.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,p){p.matcap&&(f.matcap.value=p.matcap)}function v(f,p){const x=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(x.matrixWorld),f.nearDistance.value=x.shadow.camera.near,f.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function q0(s,t,e,n){let i={},r={},o=[];const a=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,y){const E=y.program;n.uniformBlockBinding(x,E)}function c(x,y){let E=i[x.id];E===void 0&&(g(x),E=h(x),i[x.id]=E,x.addEventListener("dispose",f));const P=y.program;n.updateUBOMapping(x,P);const w=t.render.frame;r[x.id]!==w&&(d(x),r[x.id]=w)}function h(x){const y=u();x.__bindingPointIndex=y;const E=s.createBuffer(),P=x.__size,w=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,P,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,E),E}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const y=i[x.id],E=x.uniforms,P=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let w=0,C=E.length;w<C;w++){const z=Array.isArray(E[w])?E[w]:[E[w]];for(let S=0,T=z.length;S<T;S++){const B=z[S];if(m(B,w,S,P)===!0){const F=B.__offset,N=Array.isArray(B.value)?B.value:[B.value];let L=0;for(let D=0;D<N.length;D++){const I=N[D],V=v(I);typeof I=="number"||typeof I=="boolean"?(B.__data[0]=I,s.bufferSubData(s.UNIFORM_BUFFER,F+L,B.__data)):I.isMatrix3?(B.__data[0]=I.elements[0],B.__data[1]=I.elements[1],B.__data[2]=I.elements[2],B.__data[3]=0,B.__data[4]=I.elements[3],B.__data[5]=I.elements[4],B.__data[6]=I.elements[5],B.__data[7]=0,B.__data[8]=I.elements[6],B.__data[9]=I.elements[7],B.__data[10]=I.elements[8],B.__data[11]=0):(I.toArray(B.__data,L),L+=V.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,F,B.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(x,y,E,P){const w=x.value,C=y+"_"+E;if(P[C]===void 0)return typeof w=="number"||typeof w=="boolean"?P[C]=w:P[C]=w.clone(),!0;{const z=P[C];if(typeof w=="number"||typeof w=="boolean"){if(z!==w)return P[C]=w,!0}else if(z.equals(w)===!1)return z.copy(w),!0}return!1}function g(x){const y=x.uniforms;let E=0;const P=16;for(let C=0,z=y.length;C<z;C++){const S=Array.isArray(y[C])?y[C]:[y[C]];for(let T=0,B=S.length;T<B;T++){const F=S[T],N=Array.isArray(F.value)?F.value:[F.value];for(let L=0,D=N.length;L<D;L++){const I=N[L],V=v(I),G=E%P;G!==0&&P-G<V.boundary&&(E+=P-G),F.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=E,E+=V.storage}}}const w=E%P;return w>0&&(E+=P-w),x.__size=E,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function f(x){const y=x.target;y.removeEventListener("dispose",f);const E=o.indexOf(y.__bindingPointIndex);o.splice(E,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class ch{constructor(t={}){const{canvas:e=Gd(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const m=new Uint32Array(4),g=new Int32Array(4);let v=null,f=null;const p=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pe,this._useLegacyLights=!1,this.toneMapping=ei,this.toneMappingExposure=1;const y=this;let E=!1,P=0,w=0,C=null,z=-1,S=null;const T=new Re,B=new Re;let F=null;const N=new Bt(0);let L=0,D=e.width,I=e.height,V=1,G=null,H=null;const K=new Re(0,0,D,I),Q=new Re(0,0,D,I);let W=!1;const $=new ia;let tt=!1,ct=!1,xt=null;const yt=new Me,zt=new Jt,kt=new O,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Zt(){return C===null?V:1}let X=n;function Ge(A,k){for(let j=0;j<A.length;j++){const Z=A[j],q=e.getContext(Z,k);if(q!==null)return q}return null}try{const A={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Jo}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",U,!1),e.addEventListener("webglcontextcreationerror",ht,!1),X===null){const k=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&k.shift(),X=Ge(k,A),X===null)throw Ge(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&X instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),X.getShaderPrecisionFormat===void 0&&(X.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let bt,Ut,Mt,ce,Wt,R,b,Y,it,nt,st,St,ut,vt,Rt,Xt,et,ne,Kt,Nt,wt,_t,Ht,ee;function de(){bt=new nm(X),Ut=new Kp(X,bt,t),bt.init(Ut),_t=new k0(X,bt,Ut),Mt=new z0(X,bt,Ut),ce=new rm(X),Wt=new b0,R=new G0(X,bt,Mt,Wt,Ut,_t,ce),b=new Jp(y),Y=new em(y),it=new uu(X,Ut),Ht=new jp(X,bt,it,Ut),nt=new im(X,it,ce,Ht),st=new cm(X,nt,it,ce),Kt=new lm(X,Ut,R),Xt=new Zp(Wt),St=new w0(y,b,Y,bt,Ut,Ht,Xt),ut=new X0(y,Wt),vt=new A0,Rt=new I0(bt,Ut),ne=new Yp(y,b,Y,Mt,st,d,l),et=new B0(y,st,Ut),ee=new q0(X,ce,Ut,Mt),Nt=new $p(X,bt,ce,Ut),wt=new sm(X,bt,ce,Ut),ce.programs=St.programs,y.capabilities=Ut,y.extensions=bt,y.properties=Wt,y.renderLists=vt,y.shadowMap=et,y.state=Mt,y.info=ce}de();const Yt=new W0(y,X);this.xr=Yt,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const A=bt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=bt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(A){A!==void 0&&(V=A,this.setSize(D,I,!1))},this.getSize=function(A){return A.set(D,I)},this.setSize=function(A,k,j=!0){if(Yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=A,I=k,e.width=Math.floor(A*V),e.height=Math.floor(k*V),j===!0&&(e.style.width=A+"px",e.style.height=k+"px"),this.setViewport(0,0,A,k)},this.getDrawingBufferSize=function(A){return A.set(D*V,I*V).floor()},this.setDrawingBufferSize=function(A,k,j){D=A,I=k,V=j,e.width=Math.floor(A*j),e.height=Math.floor(k*j),this.setViewport(0,0,A,k)},this.getCurrentViewport=function(A){return A.copy(T)},this.getViewport=function(A){return A.copy(K)},this.setViewport=function(A,k,j,Z){A.isVector4?K.set(A.x,A.y,A.z,A.w):K.set(A,k,j,Z),Mt.viewport(T.copy(K).multiplyScalar(V).floor())},this.getScissor=function(A){return A.copy(Q)},this.setScissor=function(A,k,j,Z){A.isVector4?Q.set(A.x,A.y,A.z,A.w):Q.set(A,k,j,Z),Mt.scissor(B.copy(Q).multiplyScalar(V).floor())},this.getScissorTest=function(){return W},this.setScissorTest=function(A){Mt.setScissorTest(W=A)},this.setOpaqueSort=function(A){G=A},this.setTransparentSort=function(A){H=A},this.getClearColor=function(A){return A.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor.apply(ne,arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha.apply(ne,arguments)},this.clear=function(A=!0,k=!0,j=!0){let Z=0;if(A){let q=!1;if(C!==null){const ft=C.texture.format;q=ft===Gc||ft===zc||ft===Bc}if(q){const ft=C.texture.type,Et=ft===ni||ft===Zn||ft===Qo||ft===Mi||ft===Fc||ft===Oc,Ct=ne.getClearColor(),It=ne.getClearAlpha(),qt=Ct.r,Ft=Ct.g,Gt=Ct.b;Et?(m[0]=qt,m[1]=Ft,m[2]=Gt,m[3]=It,X.clearBufferuiv(X.COLOR,0,m)):(g[0]=qt,g[1]=Ft,g[2]=Gt,g[3]=It,X.clearBufferiv(X.COLOR,0,g))}else Z|=X.COLOR_BUFFER_BIT}k&&(Z|=X.DEPTH_BUFFER_BIT),j&&(Z|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",U,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),vt.dispose(),Rt.dispose(),Wt.dispose(),b.dispose(),Y.dispose(),st.dispose(),Ht.dispose(),ee.dispose(),St.dispose(),Yt.dispose(),Yt.removeEventListener("sessionstart",ke),Yt.removeEventListener("sessionend",oe),xt&&(xt.dispose(),xt=null),He.stop()};function ot(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const A=ce.autoReset,k=et.enabled,j=et.autoUpdate,Z=et.needsUpdate,q=et.type;de(),ce.autoReset=A,et.enabled=k,et.autoUpdate=j,et.needsUpdate=Z,et.type=q}function ht(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function dt(A){const k=A.target;k.removeEventListener("dispose",dt),Lt(k)}function Lt(A){Tt(A),Wt.remove(A)}function Tt(A){const k=Wt.get(A).programs;k!==void 0&&(k.forEach(function(j){St.releaseProgram(j)}),A.isShaderMaterial&&St.releaseShaderCache(A))}this.renderBufferDirect=function(A,k,j,Z,q,ft){k===null&&(k=Pt);const Et=q.isMesh&&q.matrixWorld.determinant()<0,Ct=Nh(A,k,j,Z,q);Mt.setMaterial(Z,Et);let It=j.index,qt=1;if(Z.wireframe===!0){if(It=nt.getWireframeAttribute(j),It===void 0)return;qt=2}const Ft=j.drawRange,Gt=j.attributes.position;let pe=Ft.start*qt,Ke=(Ft.start+Ft.count)*qt;ft!==null&&(pe=Math.max(pe,ft.start*qt),Ke=Math.min(Ke,(ft.start+ft.count)*qt)),It!==null?(pe=Math.max(pe,0),Ke=Math.min(Ke,It.count)):Gt!=null&&(pe=Math.max(pe,0),Ke=Math.min(Ke,Gt.count));const be=Ke-pe;if(be<0||be===1/0)return;Ht.setup(q,Z,Ct,j,It);let Cn,he=Nt;if(It!==null&&(Cn=it.get(It),he=wt,he.setIndex(Cn)),q.isMesh)Z.wireframe===!0?(Mt.setLineWidth(Z.wireframeLinewidth*Zt()),he.setMode(X.LINES)):he.setMode(X.TRIANGLES);else if(q.isLine){let jt=Z.linewidth;jt===void 0&&(jt=1),Mt.setLineWidth(jt*Zt()),q.isLineSegments?he.setMode(X.LINES):q.isLineLoop?he.setMode(X.LINE_LOOP):he.setMode(X.LINE_STRIP)}else q.isPoints?he.setMode(X.POINTS):q.isSprite&&he.setMode(X.TRIANGLES);if(q.isBatchedMesh)he.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else if(q.isInstancedMesh)he.renderInstances(pe,be,q.count);else if(j.isInstancedBufferGeometry){const jt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ur=Math.min(j.instanceCount,jt);he.renderInstances(pe,be,Ur)}else he.render(pe,be)};function se(A,k,j){A.transparent===!0&&A.side===Ce&&A.forceSinglePass===!1?(A.side=$e,A.needsUpdate=!0,Is(A,k,j),A.side=ii,A.needsUpdate=!0,Is(A,k,j),A.side=Ce):Is(A,k,j)}this.compile=function(A,k,j=null){j===null&&(j=A),f=Rt.get(j),f.init(),x.push(f),j.traverseVisible(function(q){q.isLight&&q.layers.test(k.layers)&&(f.pushLight(q),q.castShadow&&f.pushShadow(q))}),A!==j&&A.traverseVisible(function(q){q.isLight&&q.layers.test(k.layers)&&(f.pushLight(q),q.castShadow&&f.pushShadow(q))}),f.setupLights(y._useLegacyLights);const Z=new Set;return A.traverse(function(q){const ft=q.material;if(ft)if(Array.isArray(ft))for(let Et=0;Et<ft.length;Et++){const Ct=ft[Et];se(Ct,j,q),Z.add(Ct)}else se(ft,j,q),Z.add(ft)}),x.pop(),f=null,Z},this.compileAsync=function(A,k,j=null){const Z=this.compile(A,k,j);return new Promise(q=>{function ft(){if(Z.forEach(function(Et){Wt.get(Et).currentProgram.isReady()&&Z.delete(Et)}),Z.size===0){q(A);return}setTimeout(ft,10)}bt.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let re=null;function we(A){re&&re(A)}function ke(){He.stop()}function oe(){He.start()}const He=new eh;He.setAnimationLoop(we),typeof self<"u"&&He.setContext(self),this.setAnimationLoop=function(A){re=A,Yt.setAnimationLoop(A),A===null?He.stop():He.start()},Yt.addEventListener("sessionstart",ke),Yt.addEventListener("sessionend",oe),this.render=function(A,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Yt.enabled===!0&&Yt.isPresenting===!0&&(Yt.cameraAutoUpdate===!0&&Yt.updateCamera(k),k=Yt.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,k,C),f=Rt.get(A,x.length),f.init(),x.push(f),yt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),$.setFromProjectionMatrix(yt),ct=this.localClippingEnabled,tt=Xt.init(this.clippingPlanes,ct),v=vt.get(A,p.length),v.init(),p.push(v),xn(A,k,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(G,H),this.info.render.frame++,tt===!0&&Xt.beginShadows();const j=f.state.shadowsArray;if(et.render(j,A,k),tt===!0&&Xt.endShadows(),this.info.autoReset===!0&&this.info.reset(),ne.render(v,A),f.setupLights(y._useLegacyLights),k.isArrayCamera){const Z=k.cameras;for(let q=0,ft=Z.length;q<ft;q++){const Et=Z[q];va(v,A,Et,Et.viewport)}}else va(v,A,k);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),A.isScene===!0&&A.onAfterRender(y,A,k),Ht.resetDefaultState(),z=-1,S=null,x.pop(),x.length>0?f=x[x.length-1]:f=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function xn(A,k,j,Z){if(A.visible===!1)return;if(A.layers.test(k.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(k);else if(A.isLight)f.pushLight(A),A.castShadow&&f.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||$.intersectsSprite(A)){Z&&kt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(yt);const Et=st.update(A),Ct=A.material;Ct.visible&&v.push(A,Et,Ct,j,kt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||$.intersectsObject(A))){const Et=st.update(A),Ct=A.material;if(Z&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),kt.copy(A.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),kt.copy(Et.boundingSphere.center)),kt.applyMatrix4(A.matrixWorld).applyMatrix4(yt)),Array.isArray(Ct)){const It=Et.groups;for(let qt=0,Ft=It.length;qt<Ft;qt++){const Gt=It[qt],pe=Ct[Gt.materialIndex];pe&&pe.visible&&v.push(A,Et,pe,j,kt.z,Gt)}}else Ct.visible&&v.push(A,Et,Ct,j,kt.z,null)}}const ft=A.children;for(let Et=0,Ct=ft.length;Et<Ct;Et++)xn(ft[Et],k,j,Z)}function va(A,k,j,Z){const q=A.opaque,ft=A.transmissive,Et=A.transparent;f.setupLightsView(j),tt===!0&&Xt.setGlobalState(y.clippingPlanes,j),ft.length>0&&Ih(q,ft,k,j),Z&&Mt.viewport(T.copy(Z)),q.length>0&&Ds(q,k,j),ft.length>0&&Ds(ft,k,j),Et.length>0&&Ds(Et,k,j),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Ih(A,k,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;const ft=Ut.isWebGL2;xt===null&&(xt=new wi(1,1,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")?Ts:ni,minFilter:bs,samples:ft?4:0})),y.getDrawingBufferSize(zt),ft?xt.setSize(zt.x,zt.y):xt.setSize(Fo(zt.x),Fo(zt.y));const Et=y.getRenderTarget();y.setRenderTarget(xt),y.getClearColor(N),L=y.getClearAlpha(),L<1&&y.setClearColor(16777215,.5),y.clear();const Ct=y.toneMapping;y.toneMapping=ei,Ds(A,j,Z),R.updateMultisampleRenderTarget(xt),R.updateRenderTargetMipmap(xt);let It=!1;for(let qt=0,Ft=k.length;qt<Ft;qt++){const Gt=k[qt],pe=Gt.object,Ke=Gt.geometry,be=Gt.material,Cn=Gt.group;if(be.side===Ce&&pe.layers.test(Z.layers)){const he=be.side;be.side=$e,be.needsUpdate=!0,_a(pe,j,Z,Ke,be,Cn),be.side=he,be.needsUpdate=!0,It=!0}}It===!0&&(R.updateMultisampleRenderTarget(xt),R.updateRenderTargetMipmap(xt)),y.setRenderTarget(Et),y.setClearColor(N,L),y.toneMapping=Ct}function Ds(A,k,j){const Z=k.isScene===!0?k.overrideMaterial:null;for(let q=0,ft=A.length;q<ft;q++){const Et=A[q],Ct=Et.object,It=Et.geometry,qt=Z===null?Et.material:Z,Ft=Et.group;Ct.layers.test(j.layers)&&_a(Ct,k,j,It,qt,Ft)}}function _a(A,k,j,Z,q,ft){A.onBeforeRender(y,k,j,Z,q,ft),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(y,k,j,Z,A,ft),q.transparent===!0&&q.side===Ce&&q.forceSinglePass===!1?(q.side=$e,q.needsUpdate=!0,y.renderBufferDirect(j,k,Z,q,A,ft),q.side=ii,q.needsUpdate=!0,y.renderBufferDirect(j,k,Z,q,A,ft),q.side=Ce):y.renderBufferDirect(j,k,Z,q,A,ft),A.onAfterRender(y,k,j,Z,q,ft)}function Is(A,k,j){k.isScene!==!0&&(k=Pt);const Z=Wt.get(A),q=f.state.lights,ft=f.state.shadowsArray,Et=q.state.version,Ct=St.getParameters(A,q.state,ft,k,j),It=St.getProgramCacheKey(Ct);let qt=Z.programs;Z.environment=A.isMeshStandardMaterial?k.environment:null,Z.fog=k.fog,Z.envMap=(A.isMeshStandardMaterial?Y:b).get(A.envMap||Z.environment),qt===void 0&&(A.addEventListener("dispose",dt),qt=new Map,Z.programs=qt);let Ft=qt.get(It);if(Ft!==void 0){if(Z.currentProgram===Ft&&Z.lightsStateVersion===Et)return ya(A,Ct),Ft}else Ct.uniforms=St.getUniforms(A),A.onBuild(j,Ct,y),A.onBeforeCompile(Ct,y),Ft=St.acquireProgram(Ct,It),qt.set(It,Ft),Z.uniforms=Ct.uniforms;const Gt=Z.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Gt.clippingPlanes=Xt.uniform),ya(A,Ct),Z.needsLights=Fh(A),Z.lightsStateVersion=Et,Z.needsLights&&(Gt.ambientLightColor.value=q.state.ambient,Gt.lightProbe.value=q.state.probe,Gt.directionalLights.value=q.state.directional,Gt.directionalLightShadows.value=q.state.directionalShadow,Gt.spotLights.value=q.state.spot,Gt.spotLightShadows.value=q.state.spotShadow,Gt.rectAreaLights.value=q.state.rectArea,Gt.ltc_1.value=q.state.rectAreaLTC1,Gt.ltc_2.value=q.state.rectAreaLTC2,Gt.pointLights.value=q.state.point,Gt.pointLightShadows.value=q.state.pointShadow,Gt.hemisphereLights.value=q.state.hemi,Gt.directionalShadowMap.value=q.state.directionalShadowMap,Gt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Gt.spotShadowMap.value=q.state.spotShadowMap,Gt.spotLightMatrix.value=q.state.spotLightMatrix,Gt.spotLightMap.value=q.state.spotLightMap,Gt.pointShadowMap.value=q.state.pointShadowMap,Gt.pointShadowMatrix.value=q.state.pointShadowMatrix),Z.currentProgram=Ft,Z.uniformsList=null,Ft}function xa(A){if(A.uniformsList===null){const k=A.currentProgram.getUniforms();A.uniformsList=ur.seqWithValue(k.seq,A.uniforms)}return A.uniformsList}function ya(A,k){const j=Wt.get(A);j.outputColorSpace=k.outputColorSpace,j.batching=k.batching,j.instancing=k.instancing,j.instancingColor=k.instancingColor,j.skinning=k.skinning,j.morphTargets=k.morphTargets,j.morphNormals=k.morphNormals,j.morphColors=k.morphColors,j.morphTargetsCount=k.morphTargetsCount,j.numClippingPlanes=k.numClippingPlanes,j.numIntersection=k.numClipIntersection,j.vertexAlphas=k.vertexAlphas,j.vertexTangents=k.vertexTangents,j.toneMapping=k.toneMapping}function Nh(A,k,j,Z,q){k.isScene!==!0&&(k=Pt),R.resetTextureUnits();const ft=k.fog,Et=Z.isMeshStandardMaterial?k.environment:null,Ct=C===null?y.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:kn,It=(Z.isMeshStandardMaterial?Y:b).get(Z.envMap||Et),qt=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ft=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Gt=!!j.morphAttributes.position,pe=!!j.morphAttributes.normal,Ke=!!j.morphAttributes.color;let be=ei;Z.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(be=y.toneMapping);const Cn=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,he=Cn!==void 0?Cn.length:0,jt=Wt.get(Z),Ur=f.state.lights;if(tt===!0&&(ct===!0||A!==S)){const nn=A===S&&Z.id===z;Xt.setState(Z,A,nn)}let ue=!1;Z.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==Ur.state.version||jt.outputColorSpace!==Ct||q.isBatchedMesh&&jt.batching===!1||!q.isBatchedMesh&&jt.batching===!0||q.isInstancedMesh&&jt.instancing===!1||!q.isInstancedMesh&&jt.instancing===!0||q.isSkinnedMesh&&jt.skinning===!1||!q.isSkinnedMesh&&jt.skinning===!0||q.isInstancedMesh&&jt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&jt.instancingColor===!1&&q.instanceColor!==null||jt.envMap!==It||Z.fog===!0&&jt.fog!==ft||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==Xt.numPlanes||jt.numIntersection!==Xt.numIntersection)||jt.vertexAlphas!==qt||jt.vertexTangents!==Ft||jt.morphTargets!==Gt||jt.morphNormals!==pe||jt.morphColors!==Ke||jt.toneMapping!==be||Ut.isWebGL2===!0&&jt.morphTargetsCount!==he)&&(ue=!0):(ue=!0,jt.__version=Z.version);let ri=jt.currentProgram;ue===!0&&(ri=Is(Z,k,q));let Ma=!1,hs=!1,Fr=!1;const Ie=ri.getUniforms(),oi=jt.uniforms;if(Mt.useProgram(ri.program)&&(Ma=!0,hs=!0,Fr=!0),Z.id!==z&&(z=Z.id,hs=!0),Ma||S!==A){Ie.setValue(X,"projectionMatrix",A.projectionMatrix),Ie.setValue(X,"viewMatrix",A.matrixWorldInverse);const nn=Ie.map.cameraPosition;nn!==void 0&&nn.setValue(X,kt.setFromMatrixPosition(A.matrixWorld)),Ut.logarithmicDepthBuffer&&Ie.setValue(X,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Ie.setValue(X,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,hs=!0,Fr=!0)}if(q.isSkinnedMesh){Ie.setOptional(X,q,"bindMatrix"),Ie.setOptional(X,q,"bindMatrixInverse");const nn=q.skeleton;nn&&(Ut.floatVertexTextures?(nn.boneTexture===null&&nn.computeBoneTexture(),Ie.setValue(X,"boneTexture",nn.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}q.isBatchedMesh&&(Ie.setOptional(X,q,"batchingTexture"),Ie.setValue(X,"batchingTexture",q._matricesTexture,R));const Or=j.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0&&Ut.isWebGL2===!0)&&Kt.update(q,j,ri),(hs||jt.receiveShadow!==q.receiveShadow)&&(jt.receiveShadow=q.receiveShadow,Ie.setValue(X,"receiveShadow",q.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(oi.envMap.value=It,oi.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),hs&&(Ie.setValue(X,"toneMappingExposure",y.toneMappingExposure),jt.needsLights&&Uh(oi,Fr),ft&&Z.fog===!0&&ut.refreshFogUniforms(oi,ft),ut.refreshMaterialUniforms(oi,Z,V,I,xt),ur.upload(X,xa(jt),oi,R)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(ur.upload(X,xa(jt),oi,R),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Ie.setValue(X,"center",q.center),Ie.setValue(X,"modelViewMatrix",q.modelViewMatrix),Ie.setValue(X,"normalMatrix",q.normalMatrix),Ie.setValue(X,"modelMatrix",q.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const nn=Z.uniformsGroups;for(let Br=0,Oh=nn.length;Br<Oh;Br++)if(Ut.isWebGL2){const Sa=nn[Br];ee.update(Sa,ri),ee.bind(Sa,ri)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ri}function Uh(A,k){A.ambientLightColor.needsUpdate=k,A.lightProbe.needsUpdate=k,A.directionalLights.needsUpdate=k,A.directionalLightShadows.needsUpdate=k,A.pointLights.needsUpdate=k,A.pointLightShadows.needsUpdate=k,A.spotLights.needsUpdate=k,A.spotLightShadows.needsUpdate=k,A.rectAreaLights.needsUpdate=k,A.hemisphereLights.needsUpdate=k}function Fh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(A,k,j){Wt.get(A.texture).__webglTexture=k,Wt.get(A.depthTexture).__webglTexture=j;const Z=Wt.get(A);Z.__hasExternalTextures=!0,Z.__hasExternalTextures&&(Z.__autoAllocateDepthBuffer=j===void 0,Z.__autoAllocateDepthBuffer||bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,k){const j=Wt.get(A);j.__webglFramebuffer=k,j.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(A,k=0,j=0){C=A,P=k,w=j;let Z=!0,q=null,ft=!1,Et=!1;if(A){const It=Wt.get(A);It.__useDefaultFramebuffer!==void 0?(Mt.bindFramebuffer(X.FRAMEBUFFER,null),Z=!1):It.__webglFramebuffer===void 0?R.setupRenderTarget(A):It.__hasExternalTextures&&R.rebindTextures(A,Wt.get(A.texture).__webglTexture,Wt.get(A.depthTexture).__webglTexture);const qt=A.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(Et=!0);const Ft=Wt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ft[k])?q=Ft[k][j]:q=Ft[k],ft=!0):Ut.isWebGL2&&A.samples>0&&R.useMultisampledRTT(A)===!1?q=Wt.get(A).__webglMultisampledFramebuffer:Array.isArray(Ft)?q=Ft[j]:q=Ft,T.copy(A.viewport),B.copy(A.scissor),F=A.scissorTest}else T.copy(K).multiplyScalar(V).floor(),B.copy(Q).multiplyScalar(V).floor(),F=W;if(Mt.bindFramebuffer(X.FRAMEBUFFER,q)&&Ut.drawBuffers&&Z&&Mt.drawBuffers(A,q),Mt.viewport(T),Mt.scissor(B),Mt.setScissorTest(F),ft){const It=Wt.get(A.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+k,It.__webglTexture,j)}else if(Et){const It=Wt.get(A.texture),qt=k||0;X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,It.__webglTexture,j||0,qt)}z=-1},this.readRenderTargetPixels=function(A,k,j,Z,q,ft,Et){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Et!==void 0&&(Ct=Ct[Et]),Ct){Mt.bindFramebuffer(X.FRAMEBUFFER,Ct);try{const It=A.texture,qt=It.format,Ft=It.type;if(qt!==mn&&_t.convert(qt)!==X.getParameter(X.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Gt=Ft===Ts&&(bt.has("EXT_color_buffer_half_float")||Ut.isWebGL2&&bt.has("EXT_color_buffer_float"));if(Ft!==ni&&_t.convert(Ft)!==X.getParameter(X.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ft===Jn&&(Ut.isWebGL2||bt.has("OES_texture_float")||bt.has("WEBGL_color_buffer_float")))&&!Gt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=A.width-Z&&j>=0&&j<=A.height-q&&X.readPixels(k,j,Z,q,_t.convert(qt),_t.convert(Ft),ft)}finally{const It=C!==null?Wt.get(C).__webglFramebuffer:null;Mt.bindFramebuffer(X.FRAMEBUFFER,It)}}},this.copyFramebufferToTexture=function(A,k,j=0){const Z=Math.pow(2,-j),q=Math.floor(k.image.width*Z),ft=Math.floor(k.image.height*Z);R.setTexture2D(k,0),X.copyTexSubImage2D(X.TEXTURE_2D,j,0,0,A.x,A.y,q,ft),Mt.unbindTexture()},this.copyTextureToTexture=function(A,k,j,Z=0){const q=k.image.width,ft=k.image.height,Et=_t.convert(j.format),Ct=_t.convert(j.type);R.setTexture2D(j,0),X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,j.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,j.unpackAlignment),k.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,Z,A.x,A.y,q,ft,Et,Ct,k.image.data):k.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,Z,A.x,A.y,k.mipmaps[0].width,k.mipmaps[0].height,Et,k.mipmaps[0].data):X.texSubImage2D(X.TEXTURE_2D,Z,A.x,A.y,Et,Ct,k.image),Z===0&&j.generateMipmaps&&X.generateMipmap(X.TEXTURE_2D),Mt.unbindTexture()},this.copyTextureToTexture3D=function(A,k,j,Z,q=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ft=A.max.x-A.min.x+1,Et=A.max.y-A.min.y+1,Ct=A.max.z-A.min.z+1,It=_t.convert(Z.format),qt=_t.convert(Z.type);let Ft;if(Z.isData3DTexture)R.setTexture3D(Z,0),Ft=X.TEXTURE_3D;else if(Z.isDataArrayTexture||Z.isCompressedArrayTexture)R.setTexture2DArray(Z,0),Ft=X.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,Z.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,Z.unpackAlignment);const Gt=X.getParameter(X.UNPACK_ROW_LENGTH),pe=X.getParameter(X.UNPACK_IMAGE_HEIGHT),Ke=X.getParameter(X.UNPACK_SKIP_PIXELS),be=X.getParameter(X.UNPACK_SKIP_ROWS),Cn=X.getParameter(X.UNPACK_SKIP_IMAGES),he=j.isCompressedTexture?j.mipmaps[q]:j.image;X.pixelStorei(X.UNPACK_ROW_LENGTH,he.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,he.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,A.min.x),X.pixelStorei(X.UNPACK_SKIP_ROWS,A.min.y),X.pixelStorei(X.UNPACK_SKIP_IMAGES,A.min.z),j.isDataTexture||j.isData3DTexture?X.texSubImage3D(Ft,q,k.x,k.y,k.z,ft,Et,Ct,It,qt,he.data):j.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),X.compressedTexSubImage3D(Ft,q,k.x,k.y,k.z,ft,Et,Ct,It,he.data)):X.texSubImage3D(Ft,q,k.x,k.y,k.z,ft,Et,Ct,It,qt,he),X.pixelStorei(X.UNPACK_ROW_LENGTH,Gt),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,pe),X.pixelStorei(X.UNPACK_SKIP_PIXELS,Ke),X.pixelStorei(X.UNPACK_SKIP_ROWS,be),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Cn),q===0&&Z.generateMipmaps&&X.generateMipmap(Ft),Mt.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?R.setTextureCube(A,0):A.isData3DTexture?R.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?R.setTexture2DArray(A,0):R.setTexture2D(A,0),Mt.unbindTexture()},this.resetState=function(){P=0,w=0,C=null,Mt.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ea?"display-p3":"srgb",e.unpackColorSpace=ie.workingColorSpace===Rr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Pe?Ei:Hc}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Ei?Pe:kn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Y0 extends ch{}Y0.prototype.isWebGL1Renderer=!0;class ra{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Bt(t),this.density=e}clone(){return new ra(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class oa{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Bt(t),this.near=e,this.far=n}clone(){return new oa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class j0 extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Be extends Tn{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],m=[];let g=0;const v=[],f=n/2;let p=0;x(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ze(u,3)),this.setAttribute("normal",new ze(d,3)),this.setAttribute("uv",new ze(m,2));function x(){const E=new O,P=new O;let w=0;const C=(e-t)/n;for(let z=0;z<=r;z++){const S=[],T=z/r,B=T*(e-t)+t;for(let F=0;F<=i;F++){const N=F/i,L=N*l+a,D=Math.sin(L),I=Math.cos(L);P.x=B*D,P.y=-T*n+f,P.z=B*I,u.push(P.x,P.y,P.z),E.set(D,C,I).normalize(),d.push(E.x,E.y,E.z),m.push(N,1-T),S.push(g++)}v.push(S)}for(let z=0;z<i;z++)for(let S=0;S<r;S++){const T=v[S][z],B=v[S+1][z],F=v[S+1][z+1],N=v[S][z+1];h.push(T,B,N),h.push(B,F,N),w+=6}c.addGroup(p,w,0),p+=w}function y(E){const P=g,w=new Jt,C=new O;let z=0;const S=E===!0?t:e,T=E===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,f*T,0),d.push(0,T,0),m.push(.5,.5),g++;const B=g;for(let F=0;F<=i;F++){const L=F/i*l+a,D=Math.cos(L),I=Math.sin(L);C.x=S*I,C.y=f*T,C.z=S*D,u.push(C.x,C.y,C.z),d.push(0,T,0),w.x=D*.5+.5,w.y=I*.5*T+.5,m.push(w.x,w.y),g++}for(let F=0;F<i;F++){const N=P+F,L=B+F;E===!0?h.push(L,L+1,N):h.push(L+1,L,N),z+=3}c.addGroup(p,z,E===!0?1:2),p+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Be(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ps extends Be{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ps(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Hn extends Tn{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new O,d=new O,m=[],g=[],v=[],f=[];for(let p=0;p<=n;p++){const x=[],y=p/n;let E=0;p===0&&o===0?E=.5/e:p===n&&l===Math.PI&&(E=-.5/e);for(let P=0;P<=e;P++){const w=P/e;u.x=-t*Math.cos(i+w*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(i+w*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),f.push(w+E,1-y),x.push(c++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<e;x++){const y=h[p][x+1],E=h[p][x],P=h[p+1][x],w=h[p+1][x+1];(p!==0||o>0)&&m.push(y,E,w),(p!==n-1||l<Math.PI)&&m.push(E,P,w)}this.setIndex(m),this.setAttribute("position",new ze(g,3)),this.setAttribute("normal",new ze(v,3)),this.setAttribute("uv",new ze(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class aa extends Tn{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new O,u=new O,d=new O;for(let m=0;m<=n;m++)for(let g=0;g<=i;g++){const v=g/i*r,f=m/n*Math.PI*2;u.x=(t+e*Math.cos(f))*Math.cos(v),u.y=(t+e*Math.cos(f))*Math.sin(v),u.z=e*Math.sin(f),a.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=i;g++){const v=(i+1)*m+g-1,f=(i+1)*(m-1)+g-1,p=(i+1)*(m-1)+g,x=(i+1)*m+g;o.push(v,f,x),o.push(f,p,x)}this.setIndex(o),this.setAttribute("position",new ze(a,3)),this.setAttribute("normal",new ze(l,3)),this.setAttribute("uv",new ze(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new aa(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Vl extends ls{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Bt(16777215),this.specular=new Bt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ta,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ar,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class At extends ls{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ta,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ar,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class hh extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const vo=new Me,Wl=new O,Xl=new O;class $0{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Jt(512,512),this.map=null,this.mapPass=null,this.matrix=new Me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ia,this._frameExtents=new Jt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Wl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Wl),Xl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Xl),e.updateMatrixWorld(),vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class K0 extends $0{constructor(){super(new nh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Z0 extends hh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new K0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class J0 extends hh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}let nr;class Q0{static getContext(){return nr===void 0&&(nr=new(window.AudioContext||window.webkitAudioContext)),nr}static setContext(t){nr=t}}class tg{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ql(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=ql();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function ql(){return(typeof performance>"u"?Date:performance).now()}const di=new O,Yl=new os,eg=new O,ui=new O;class ng extends De{constructor(){super(),this.type="AudioListener",this.context=Q0.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new tg}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(di,Yl,eg),ui.set(0,0,-1).applyQuaternion(Yl),e.positionX){const i=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(di.x,i),e.positionY.linearRampToValueAtTime(di.y,i),e.positionZ.linearRampToValueAtTime(di.z,i),e.forwardX.linearRampToValueAtTime(ui.x,i),e.forwardY.linearRampToValueAtTime(ui.y,i),e.forwardZ.linearRampToValueAtTime(ui.z,i),e.upX.linearRampToValueAtTime(n.x,i),e.upY.linearRampToValueAtTime(n.y,i),e.upZ.linearRampToValueAtTime(n.z,i)}else e.setPosition(di.x,di.y,di.z),e.setOrientation(ui.x,ui.y,ui.z,n.x,n.y,n.z)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jo);const gt=new j0;gt.background=new Bt(8900331);gt.fog=new oa(8900331,3e3,6e3);const Qt=new on(75,window.innerWidth/window.innerHeight,.1,3e3),ig=new ng;Qt.add(ig);const si=new ch({antialias:!1,powerPreference:"high-performance"});si.setSize(window.innerWidth,window.innerHeight);si.shadowMap.enabled=!0;si.shadowMap.type=kh;const sg=new J0(16777215,.6);gt.add(sg);const An=new Z0(16777215,.8);An.position.set(500,1e3,500);An.castShadow=!0;An.shadow.mapSize.width=1024;An.shadow.mapSize.height=1024;An.shadow.camera.far=2e3;An.shadow.camera.left=-1e3;An.shadow.camera.right=1e3;An.shadow.camera.top=1e3;An.shadow.camera.bottom=-1e3;gt.add(An);const dh={standard:{color:255,speed:250,scale:1,name:"Politibil",health:50},interceptor:{color:1118481,speed:300,scale:1,name:"Interceptor",health:40},swat:{color:3355443,speed:220,scale:1.5,name:"SWAT",health:150},military:{color:5597999,speed:350,scale:1.2,name:"Militær",health:300}},Vn={standard:{name:"Standard Bil",price:0,maxSpeed:80,acceleration:.3,handling:.05,health:100,color:16711680},sport:{name:"Sportsvogn",price:2500,maxSpeed:110,acceleration:.45,handling:.07,health:80,color:16776960},muscle:{name:"Muscle Car",price:8e3,maxSpeed:100,acceleration:.5,handling:.04,health:120,color:255},super:{name:"Superbil",price:25e3,maxSpeed:150,acceleration:.7,handling:.09,health:70,color:16711935},hyper:{name:"Hyperbil",price:75e3,maxSpeed:200,acceleration:1,handling:.12,health:150,color:65535},tank:{name:"Kampvogn",price:2e5,maxSpeed:60,acceleration:.2,handling:.08,health:500,color:3100495,type:"tank",reqRebirth:0},ufo:{name:"UFO Prototype",price:5e5,maxSpeed:300,acceleration:2,handling:.2,health:150,color:10066329,type:"ufo",reqRebirth:1}},fe={wheel:new Be(5,5,8,16),coin:new Be(5,5,2,8),carBody:new Ot(20,12,45),carRoof:new Ot(18,8,20),policeStripe:new Ot(20,2,45),policeLight:new Ot(8,3,8),tankBody:new Ot(26,14,50),militaryCamo:new Ot(18,5,40),militaryTurretBase:new Be(6,8,5,8),militaryTurretBarrel:new Be(1.5,1.5,20,8),projectile:new Hn(3,8,8),spark:new Ot(1,1,3),speedParticle:new Ot(.5,.5,3),smoke:new Ot(3,3,3),tireMark:new tn(3,8)},Ae={wheel:new At({color:0}),coin:new At({color:16766720}),redLight:new me({color:16711680}),blueLight:new me({color:255}),projectile:new me({color:16729088}),spark:new me({color:16755200}),white:new At({color:16777215}),camo:new At({color:3885605}),darkGrey:new At({color:2763306}),smoke:new me({color:3355443,transparent:!0,opacity:.6}),fire:new me({color:16729088,transparent:!0,opacity:.8}),speedParticle:new me({color:16777215,transparent:!0,opacity:.6}),tireMark:new me({color:1118481,transparent:!0,opacity:.7,side:Ce})};Object.values(dh).forEach(s=>{s.bodyMaterial=new At({color:s.color}),s.roofMaterial=new At({color:s.color}),s.roofMaterial.color.multiplyScalar(.8)});const ws={spark:[],smoke:[],fire:[],speed:[]};function Dr(s,t,e){let n;return ws[s]&&ws[s].length>0?(n=ws[s].pop(),n.visible=!0,n.scale.set(1,1,1),n.material.opacity!==void 0&&(n.material.opacity=1)):n=new rt(t,e.clone()),n}function Er(s,t){s.visible=!1,gt.remove(s),ws[t]&&ws[t].push(s)}function la(s){if(!J)return;const t=Dr("spark",fe.spark,Ae.spark);if(s)t.position.copy(s),t.position.y+=Math.random();else{const n=J.rotation.y,i=(Math.random()-.5)*15;t.position.set(J.position.x-Math.sin(n)*25+i,1+Math.random()*3,J.position.z-Math.cos(n)*25)}const e=J.rotation.y;t.userData={velocity:new O((Math.random()-.5)*2-Math.sin(e)*3,Math.random()*3+1,(Math.random()-.5)*2-Math.cos(e)*3),lifetime:500,spawnTime:Date.now(),type:"spark"},t.material.opacity=1,gt.add(t),_.sparks.push(t)}function Fe(s,t=1){if(_.sparks.length>300)return;const e=Dr("smoke",fe.smoke,Ae.smoke);e.position.copy(s),e.position.y+=(5+Math.random()*5)*t,e.scale.set(t,t,t),e.userData={velocity:new O((Math.random()-.5)*2*t,(Math.random()*3+2)*t,(Math.random()-.5)*2*t),lifetime:2e3*t,spawnTime:Date.now(),type:"smoke"},e.material.opacity=.6*t,gt.add(e),_.sparks.push(e)}function rg(s){if(_.sparks.length>300)return;const t=Dr("fire",fe.spark,Ae.fire);t.position.copy(s),t.position.x+=(Math.random()-.5)*10,t.position.z+=(Math.random()-.5)*10,t.position.y+=8+Math.random()*5,t.scale.set(2+Math.random(),3+Math.random()*2,2+Math.random()),t.userData={velocity:new O((Math.random()-.5)*1,Math.random()*4+3,(Math.random()-.5)*1),lifetime:800,spawnTime:Date.now(),type:"fire"},t.material.opacity=.9,gt.add(t),_.sparks.push(t)}function og(){const s=Date.now();for(let t=_.sparks.length-1;t>=0;t--){const e=_.sparks[t],n=s-e.userData.spawnTime;if(n>e.userData.lifetime){const i=e.userData.type==="fire"?"fire":e.userData.type;Er(e,i),_.sparks.splice(t,1);continue}if(e.position.add(e.userData.velocity),e.userData.type==="spark"){if(e.userData.velocity.y-=.15,e.position.y<0){Er(e,"spark"),_.sparks.splice(t,1);continue}}else e.userData.type==="smoke"?(e.scale.multiplyScalar(1.02),e.userData.velocity.multiplyScalar(.95)):e.userData.type==="fire"&&(e.scale.multiplyScalar(1.03),e.userData.velocity.multiplyScalar(.92),e.material.opacity=(1-n/e.userData.lifetime)*.8*(.7+Math.random()*.3));e.userData.type!=="fire"&&(e.material.opacity=(1-n/e.userData.lifetime)*(e.userData.type==="smoke"?.6:1))}}function uh(s,t){if(!J||_.speedParticles.length>60)return;const e=Dr("speed",fe.speedParticle,Ae.speedParticle);if(t&&s)e.position.copy(s),e.rotation.y=Math.random()*Math.PI*2;else{const r=50+Math.random()*100,o=J.rotation.y+(Math.random()-.5)*1.5;e.position.set(J.position.x+Math.sin(o)*r+(Math.random()-.5)*150,5+Math.random()*40,J.position.z+Math.cos(o)*r+(Math.random()-.5)*150),e.rotation.y=J.rotation.y}const n=.7+Math.random()*.3;e.material.color.setRGB(n,n,n),e.material.opacity=.3+Math.random()*.4,e.userData={lifetime:800+Math.random()*400,spawnTime:Date.now()},gt.add(e),_.speedParticles.push(e)}function ag(s){if(!J)return;const t=Date.now(),e=Math.abs(_.speed)/_.maxSpeed;for(let n=_.speedParticles.length-1;n>=0;n--){const i=_.speedParticles[n],r=t-i.userData.spawnTime;if(r>i.userData.lifetime){Er(i,"speed"),_.speedParticles.splice(n,1);continue}const o=(_.speed*1.5+20)*s;i.position.x-=Math.sin(J.rotation.y)*o,i.position.z-=Math.cos(J.rotation.y)*o,i.scale.z=1+e*4;const a=r/i.userData.lifetime;i.material.opacity=(1-a)*(.3+e*.5)}}function lg(s){if(!J)return;const t=Math.abs(_.speed)/_.maxSpeed,e=_.baseFOV+t*20;if(_.currentFOV+=(e-_.currentFOV)*.1,Math.abs(Qt.fov-_.currentFOV)>.01&&(Qt.fov=_.currentFOV,Qt.updateProjectionMatrix()),t>.8?_.screenShake=(t-.8)*5:_.screenShake*=.9,t>.7&&Math.random()<t*.3&&la(),_.sparks.length>30){const n=_.sparks.length-30;for(let i=0;i<n;i++){const r=_.sparks[i];if(!r)continue;const o=r.userData&&r.userData.type,a=o==="fire"?"fire":o;a==="spark"||a==="smoke"||a==="fire"?Er(r,a):gt.remove(r)}_.sparks.splice(0,n)}if(t>.2){const n=Math.floor(t*3);for(let i=0;i<n;i++)Math.random()<.4&&uh()}ag(s)}const cg=new tn(3,8);new me({color:1118481,transparent:!0,opacity:.5,side:Ce});const Bo=[];for(let s=0;s<20;s++)Bo.push(new me({color:1118481,transparent:!0,opacity:.5,side:Ce}));let _o=0;function hg(s,t,e){const r=_.tireMarks.length+2-100;if(r>0){for(let h=0;h<r;h++){const u=_.tireMarks[h];u&&gt.remove(u)}_.tireMarks.splice(0,r)}const o=10,a=Math.cos(e),l=Math.sin(e),c=Date.now();for(let h=-1;h<=1;h+=2){const u=Bo[_o];_o=(_o+1)%Bo.length,u.opacity=.5;const d=new rt(cg,u);d.rotation.x=-Math.PI/2,d.rotation.z=e,d.position.set(s+a*o*h,.12,t-l*o*h),d.userData={spawnTime:c,lifetime:5e3},gt.add(d),_.tireMarks.push(d)}}function dg(){const s=Date.now();for(let t=_.tireMarks.length-1;t>=0;t--){const e=_.tireMarks[t],n=s-e.userData.spawnTime;if(n>e.userData.lifetime){gt.remove(e),_.tireMarks.splice(t,1);continue}e.material.opacity=.5*(1-n/e.userData.lifetime)}}class vn{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new M);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new M);const n=this.elements,i=t.x,r=t.y,o=t.z;return e.x=n[0]*i+n[1]*r+n[2]*o,e.y=n[3]*i+n[4]*r+n[5]*o,e.z=n[6]*i+n[7]*r+n[8]*o,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new vn);const n=this.elements,i=t.elements,r=e.elements,o=n[0],a=n[1],l=n[2],c=n[3],h=n[4],u=n[5],d=n[6],m=n[7],g=n[8],v=i[0],f=i[1],p=i[2],x=i[3],y=i[4],E=i[5],P=i[6],w=i[7],C=i[8];return r[0]=o*v+a*x+l*P,r[1]=o*f+a*y+l*w,r[2]=o*p+a*E+l*C,r[3]=c*v+h*x+u*P,r[4]=c*f+h*y+u*w,r[5]=c*p+h*E+u*C,r[6]=d*v+m*x+g*P,r[7]=d*f+m*y+g*w,r[8]=d*p+m*E+g*C,e}scale(t,e){e===void 0&&(e=new vn);const n=this.elements,i=e.elements;for(let r=0;r!==3;r++)i[3*r+0]=t.x*n[3*r+0],i[3*r+1]=t.y*n[3*r+1],i[3*r+2]=t.z*n[3*r+2];return e}solve(t,e){e===void 0&&(e=new M);const n=3,i=4,r=[];let o,a;for(o=0;o<n*i;o++)r.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)r[o+i*a]=this.elements[o+3*a];r[3+4*0]=t.x,r[3+4*1]=t.y,r[3+4*2]=t.z;let l=3;const c=l;let h;const u=4;let d;do{if(o=c-l,r[o+i*o]===0){for(a=o+1;a<c;a++)if(r[o+i*a]!==0){h=u;do d=u-h,r[d+i*o]+=r[d+i*a];while(--h);break}}if(r[o+i*o]!==0)for(a=o+1;a<c;a++){const m=r[o+i*a]/r[o+i*o];h=u;do d=u-h,r[d+i*a]=d<=o?0:r[d+i*a]-r[d+i*o]*m;while(--h)}}while(--l);if(e.z=r[2*i+3]/r[2*i+2],e.y=(r[1*i+3]-r[1*i+2]*e.z)/r[1*i+1],e.x=(r[0*i+3]-r[0*i+2]*e.z-r[0*i+1]*e.y)/r[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new vn);const e=3,n=6,i=ug;let r,o;for(r=0;r<3;r++)for(o=0;o<3;o++)i[r+n*o]=this.elements[r+3*o];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const l=a;let c;const h=n;let u;do{if(r=l-a,i[r+n*r]===0){for(o=r+1;o<l;o++)if(i[r+n*o]!==0){c=h;do u=h-c,i[u+n*r]+=i[u+n*o];while(--c);break}}if(i[r+n*r]!==0)for(o=r+1;o<l;o++){const d=i[r+n*o]/i[r+n*r];c=h;do u=h-c,i[u+n*o]=u<=r?0:i[u+n*o]-i[u+n*r]*d;while(--c)}}while(--a);r=2;do{o=r-1;do{const d=i[r+n*o]/i[r+n*r];c=n;do u=n-c,i[u+n*o]=i[u+n*o]-i[u+n*r]*d;while(--c)}while(o--)}while(--r);r=2;do{const d=1/i[r+n*r];c=n;do u=n-c,i[u+n*r]=i[u+n*r]*d;while(--c)}while(r--);r=2;do{o=2;do{if(u=i[e+o+n*r],isNaN(u)||u===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(r,o,u)}while(o--)}while(r--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,r=t.w,o=e+e,a=n+n,l=i+i,c=e*o,h=e*a,u=e*l,d=n*a,m=n*l,g=i*l,v=r*o,f=r*a,p=r*l,x=this.elements;return x[3*0+0]=1-(d+g),x[3*0+1]=h-p,x[3*0+2]=u+f,x[3*1+0]=h+p,x[3*1+1]=1-(c+g),x[3*1+2]=m-v,x[3*2+0]=u-f,x[3*2+1]=m+v,x[3*2+2]=1-(c+d),this}transpose(t){t===void 0&&(t=new vn);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const ug=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class M{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new M);const n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,l=this.z;return e.x=a*r-l*i,e.y=l*n-o*r,e.z=o*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new M(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new M(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new vn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const r=1/i;this.x*=r,this.y*=r,this.z*=r}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new M);const e=this.x,n=this.y,i=this.z;let r=Math.sqrt(e*e+n*n+i*i);return r>0?(r=1/r,t.x=e*r,t.y=n*r,t.z=i*r):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return Math.sqrt((r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return(r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new M);const n=this.x,i=this.y,r=this.z;return e.x=t*n,e.y=t*i,e.z=t*r,e}vmul(t,e){return e===void 0&&(e=new M),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new M),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new M),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=fg,r=1/n;i.set(this.x*r,this.y*r,this.z*r);const o=pg;Math.abs(i.x)<.9?(o.set(1,0,0),i.cross(o,t)):(o.set(0,1,0),i.cross(o,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,r=this.y,o=this.z;n.x=i+(t.x-i)*e,n.y=r+(t.y-r)*e,n.z=o+(t.z-o)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(jl),jl.almostEquals(t,e)}clone(){return new M(this.x,this.y,this.z)}}M.ZERO=new M(0,0,0);M.UNIT_X=new M(1,0,0);M.UNIT_Y=new M(0,1,0);M.UNIT_Z=new M(0,0,1);const fg=new M,pg=new M,jl=new M;class en{constructor(t){t===void 0&&(t={}),this.lowerBound=new M,this.upperBound=new M,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const r=this.lowerBound,o=this.upperBound,a=n;r.copy(t[0]),a&&a.vmult(r,r),o.copy(r);for(let l=1;l<t.length;l++){let c=t[l];a&&(a.vmult(c,$l),c=$l),c.x>o.x&&(o.x=c.x),c.x<r.x&&(r.x=c.x),c.y>o.y&&(o.y=c.y),c.y<r.y&&(r.y=c.y),c.z>o.z&&(o.z=c.z),c.z<r.z&&(r.z=c.z)}return e&&(e.vadd(r,r),e.vadd(o,o)),i&&(r.x-=i,r.y-=i,r.z-=i,o.x+=i,o.y+=i,o.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new en().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound,o=i.x<=n.x&&n.x<=r.x||e.x<=r.x&&r.x<=n.x,a=i.y<=n.y&&n.y<=r.y||e.y<=r.y&&r.y<=n.y,l=i.z<=n.z&&n.z<=r.z||e.z<=r.z&&r.z<=n.z;return o&&a&&l}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound;return e.x<=i.x&&n.x>=r.x&&e.y<=i.y&&n.y>=r.y&&e.z<=i.z&&n.z>=r.z}getCorners(t,e,n,i,r,o,a,l){const c=this.lowerBound,h=this.upperBound;t.copy(c),e.set(h.x,c.y,c.z),n.set(h.x,h.y,c.z),i.set(c.x,h.y,h.z),r.set(h.x,c.y,h.z),o.set(c.x,h.y,c.z),a.set(c.x,c.y,h.z),l.copy(h)}toLocalFrame(t,e){const n=Kl,i=n[0],r=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],u=n[7];this.getCorners(i,r,o,a,l,c,h,u);for(let d=0;d!==8;d++){const m=n[d];t.pointToLocal(m,m)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=Kl,i=n[0],r=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],u=n[7];this.getCorners(i,r,o,a,l,c,h,u);for(let d=0;d!==8;d++){const m=n[d];t.pointToWorld(m,m)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,r=1/e.y,o=1/e.z,a=(this.lowerBound.x-n.x)*i,l=(this.upperBound.x-n.x)*i,c=(this.lowerBound.y-n.y)*r,h=(this.upperBound.y-n.y)*r,u=(this.lowerBound.z-n.z)*o,d=(this.upperBound.z-n.z)*o,m=Math.max(Math.max(Math.min(a,l),Math.min(c,h)),Math.min(u,d)),g=Math.min(Math.min(Math.max(a,l),Math.max(c,h)),Math.max(u,d));return!(g<0||m>g)}}const $l=new M,Kl=[new M,new M,new M,new M,new M,new M,new M,new M];class Zl{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const r=i;i=n,n=r}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:r}=e;if(r>i){const o=r;r=i,i=o}this.matrix[(i*(i+1)>>1)+r-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class fh{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,r=n.length;i<r;i++)n[i].call(this,t)}return this}}class _e{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new M),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=mg,i=gg;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new _e);const n=this.x,i=this.y,r=this.z,o=this.w,a=t.x,l=t.y,c=t.z,h=t.w;return e.x=n*h+o*a+i*c-r*l,e.y=i*h+o*l+r*a-n*c,e.z=r*h+o*c+n*l-i*a,e.w=o*h-n*a-i*l-r*c,e}inverse(t){t===void 0&&(t=new _e);const e=this.x,n=this.y,i=this.z,r=this.w;this.conjugate(t);const o=1/(e*e+n*n+i*i+r*r);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new _e),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new M);const n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,l=this.z,c=this.w,h=c*n+a*r-l*i,u=c*i+l*n-o*r,d=c*r+o*i-a*n,m=-o*n-a*i-l*r;return e.x=h*c+m*-o+u*-l-d*-a,e.y=u*c+m*-a+d*-o-h*-l,e.z=d*c+m*-l+h*-a-u*-o,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,r;const o=this.x,a=this.y,l=this.z,c=this.w;switch(e){case"YZX":const h=o*a+l*c;if(h>.499&&(n=2*Math.atan2(o,c),i=Math.PI/2,r=0),h<-.499&&(n=-2*Math.atan2(o,c),i=-Math.PI/2,r=0),n===void 0){const u=o*o,d=a*a,m=l*l;n=Math.atan2(2*a*c-2*o*l,1-2*d-2*m),i=Math.asin(2*h),r=Math.atan2(2*o*c-2*a*l,1-2*u-2*m)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=r}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const r=Math.cos(t/2),o=Math.cos(e/2),a=Math.cos(n/2),l=Math.sin(t/2),c=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=l*o*a+r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a-l*c*h):i==="YXZ"?(this.x=l*o*a+r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a+l*c*h):i==="ZXY"?(this.x=l*o*a-r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a-l*c*h):i==="ZYX"?(this.x=l*o*a-r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a+l*c*h):i==="YZX"?(this.x=l*o*a+r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a-l*c*h):i==="XZY"&&(this.x=l*o*a-r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a+l*c*h),this}clone(){return new _e(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new _e);const i=this.x,r=this.y,o=this.z,a=this.w;let l=t.x,c=t.y,h=t.z,u=t.w,d,m,g,v,f;return m=i*l+r*c+o*h+a*u,m<0&&(m=-m,l=-l,c=-c,h=-h,u=-u),1-m>1e-6?(d=Math.acos(m),g=Math.sin(d),v=Math.sin((1-e)*d)/g,f=Math.sin(e*d)/g):(v=1-e,f=e),n.x=v*i+f*l,n.y=v*r+f*c,n.z=v*o+f*h,n.w=v*a+f*u,n}integrate(t,e,n,i){i===void 0&&(i=new _e);const r=t.x*n.x,o=t.y*n.y,a=t.z*n.z,l=this.x,c=this.y,h=this.z,u=this.w,d=e*.5;return i.x+=d*(r*u+o*h-a*c),i.y+=d*(o*u+a*l-r*h),i.z+=d*(a*u+r*c-o*l),i.w+=d*(-r*l-o*c-a*h),i}}const mg=new M,gg=new M,vg={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class pt{constructor(t){t===void 0&&(t={}),this.id=pt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}pt.idCounter=0;pt.types=vg;class te{constructor(t){t===void 0&&(t={}),this.position=new M,this.quaternion=new _e,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return te.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return te.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new M),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new M),n.vsub(t,i),e.conjugate(Jl),Jl.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new M),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new M),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new M),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const Jl=new _e;class Ki extends pt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:r,boundingSphereRadius:o}=t;super({type:pt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=r?r.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new M;for(let r=0;r!==t.length;r++){const o=t[r],a=o.length;for(let l=0;l!==a;l++){const c=(l+1)%a;e[o[l]].vsub(e[o[c]],i),i.normalize();let h=!1;for(let u=0;u!==n.length;u++)if(n[u].almostEquals(i)||n[u].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new M;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],r=this.vertices[n[1]],o=this.vertices[n[2]];Ki.computeNormal(i,r,o,e)}static computeNormal(t,e,n,i){const r=new M,o=new M;e.vsub(t,o),n.vsub(e,r),r.cross(o,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,r,o,a,l,c){const h=new M;let u=-1,d=-Number.MAX_VALUE;for(let g=0;g<n.faces.length;g++){h.copy(n.faceNormals[g]),r.vmult(h,h);const v=h.dot(o);v>d&&(d=v,u=g)}const m=[];for(let g=0;g<n.faces[u].length;g++){const v=n.vertices[n.faces[u][g]],f=new M;f.copy(v),r.vmult(f,f),i.vadd(f,f),m.push(f)}u>=0&&this.clipFaceAgainstHull(o,t,e,m,a,l,c)}findSeparatingAxis(t,e,n,i,r,o,a,l){const c=new M,h=new M,u=new M,d=new M,m=new M,g=new M;let v=Number.MAX_VALUE;const f=this;if(f.uniqueAxes)for(let p=0;p!==f.uniqueAxes.length;p++){n.vmult(f.uniqueAxes[p],c);const x=f.testSepAxis(c,t,e,n,i,r);if(x===!1)return!1;x<v&&(v=x,o.copy(c))}else{const p=a?a.length:f.faces.length;for(let x=0;x<p;x++){const y=a?a[x]:x;c.copy(f.faceNormals[y]),n.vmult(c,c);const E=f.testSepAxis(c,t,e,n,i,r);if(E===!1)return!1;E<v&&(v=E,o.copy(c))}}if(t.uniqueAxes)for(let p=0;p!==t.uniqueAxes.length;p++){r.vmult(t.uniqueAxes[p],h);const x=f.testSepAxis(h,t,e,n,i,r);if(x===!1)return!1;x<v&&(v=x,o.copy(h))}else{const p=l?l.length:t.faces.length;for(let x=0;x<p;x++){const y=l?l[x]:x;h.copy(t.faceNormals[y]),r.vmult(h,h);const E=f.testSepAxis(h,t,e,n,i,r);if(E===!1)return!1;E<v&&(v=E,o.copy(h))}}for(let p=0;p!==f.uniqueEdges.length;p++){n.vmult(f.uniqueEdges[p],d);for(let x=0;x!==t.uniqueEdges.length;x++)if(r.vmult(t.uniqueEdges[x],m),d.cross(m,g),!g.almostZero()){g.normalize();const y=f.testSepAxis(g,t,e,n,i,r);if(y===!1)return!1;y<v&&(v=y,o.copy(g))}}return i.vsub(e,u),u.dot(o)>0&&o.negate(o),!0}testSepAxis(t,e,n,i,r,o){const a=this;Ki.project(a,t,n,i,xo),Ki.project(e,t,r,o,yo);const l=xo[0],c=xo[1],h=yo[0],u=yo[1];if(l<u||h<c)return!1;const d=l-u,m=h-c;return d<m?d:m}calculateLocalInertia(t,e){const n=new M,i=new M;this.computeLocalAABB(i,n);const r=n.x-i.x,o=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*o*2*o+2*a*2*a),e.y=1/12*t*(2*r*2*r+2*a*2*a),e.z=1/12*t*(2*o*2*o+2*r*2*r)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,r,o,a){const l=new M,c=new M,h=new M,u=new M,d=new M,m=new M,g=new M,v=new M,f=this,p=[],x=i,y=p;let E=-1,P=Number.MAX_VALUE;for(let T=0;T<f.faces.length;T++){l.copy(f.faceNormals[T]),n.vmult(l,l);const B=l.dot(t);B<P&&(P=B,E=T)}if(E<0)return;const w=f.faces[E];w.connectedFaces=[];for(let T=0;T<f.faces.length;T++)for(let B=0;B<f.faces[T].length;B++)w.indexOf(f.faces[T][B])!==-1&&T!==E&&w.connectedFaces.indexOf(T)===-1&&w.connectedFaces.push(T);const C=w.length;for(let T=0;T<C;T++){const B=f.vertices[w[T]],F=f.vertices[w[(T+1)%C]];B.vsub(F,c),h.copy(c),n.vmult(h,h),e.vadd(h,h),u.copy(this.faceNormals[E]),n.vmult(u,u),e.vadd(u,u),h.cross(u,d),d.negate(d),m.copy(B),n.vmult(m,m),e.vadd(m,m);const N=w.connectedFaces[T];g.copy(this.faceNormals[N]);const L=this.getPlaneConstantOfFace(N);v.copy(g),n.vmult(v,v);const D=L-v.dot(e);for(this.clipFaceAgainstPlane(x,y,v,D);x.length;)x.shift();for(;y.length;)x.push(y.shift())}g.copy(this.faceNormals[E]);const z=this.getPlaneConstantOfFace(E);v.copy(g),n.vmult(v,v);const S=z-v.dot(e);for(let T=0;T<x.length;T++){let B=v.dot(x[T])+S;if(B<=r&&(console.log(`clamped: depth=${B} to minDist=${r}`),B=r),B<=o){const F=x[T];if(B<=1e-6){const N={point:F,normal:v,depth:B};a.push(N)}}}}clipFaceAgainstPlane(t,e,n,i){let r,o;const a=t.length;if(a<2)return e;let l=t[t.length-1],c=t[0];r=n.dot(l)+i;for(let h=0;h<a;h++){if(c=t[h],o=n.dot(c)+i,r<0)if(o<0){const u=new M;u.copy(c),e.push(u)}else{const u=new M;l.lerp(c,r/(r-o),u),e.push(u)}else if(o<0){const u=new M;l.lerp(c,r/(r-o),u),e.push(u),e.push(c)}l=c,r=o}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new M);const n=this.vertices,i=this.worldVertices;for(let r=0;r!==this.vertices.length;r++)e.vmult(n[r],i[r]),t.vadd(i[r],i[r]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const r=n[i];r.x<t.x?t.x=r.x:r.x>e.x&&(e.x=r.x),r.y<t.y?t.y=r.y:r.y>e.y&&(e.y=r.y),r.z<t.z?t.z=r.z:r.z>e.z&&(e.z=r.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new M);const n=this.faceNormals,i=this.worldFaceNormals;for(let r=0;r!==e;r++)t.vmult(n[r],i[r]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const r=this.vertices;let o,a,l,c,h,u,d=new M;for(let m=0;m<r.length;m++){d.copy(r[m]),e.vmult(d,d),t.vadd(d,d);const g=d;(o===void 0||g.x<o)&&(o=g.x),(c===void 0||g.x>c)&&(c=g.x),(a===void 0||g.y<a)&&(a=g.y),(h===void 0||g.y>h)&&(h=g.y),(l===void 0||g.z<l)&&(l=g.z),(u===void 0||g.z>u)&&(u=g.z)}n.set(o,a,l),i.set(c,h,u)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new M);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let r=0;r<n;r++){const o=i[r];e.vmult(o,o)}for(let r=0;r<this.faceNormals.length;r++){const o=this.faceNormals[r];e.vmult(o,o)}}if(t)for(let r=0;r<n;r++){const o=i[r];o.vadd(t,o)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,r=new M;this.getAveragePointLocal(r);for(let o=0;o<this.faces.length;o++){let a=i[o];const l=e[n[o][0]],c=new M;t.vsub(l,c);const h=a.dot(c),u=new M;r.vsub(l,u);const d=a.dot(u);if(h<0&&d>0||h>0&&d<0)return!1}return-1}static project(t,e,n,i,r){const o=t.vertices.length,a=_g;let l=0,c=0;const h=xg,u=t.vertices;h.setZero(),te.vectorToLocalFrame(n,i,e,a),te.pointToLocalFrame(n,i,h,h);const d=h.dot(a);c=l=u[0].dot(a);for(let m=1;m<o;m++){const g=u[m].dot(a);g>l&&(l=g),g<c&&(c=g)}if(c-=d,l-=d,c>l){const m=c;c=l,l=m}r[0]=l,r[1]=c}}const xo=[],yo=[];new M;const _g=new M,xg=new M;class As extends pt{constructor(t){super({type:pt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=M,r=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],l=new Ki({vertices:r,faces:o,axes:a});this.convexPolyhedronRepresentation=l,l.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new M),As.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let r=0;r!==n.length;r++)e.vmult(n[r],n[r]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,r=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let o=0;o<r.length;o++)$n.set(r[o][0],r[o][1],r[o][2]),e.vmult($n,$n),t.vadd($n,$n),n($n.x,$n.y,$n.z)}calculateWorldAABB(t,e,n,i){const r=this.halfExtents;yn[0].set(r.x,r.y,r.z),yn[1].set(-r.x,r.y,r.z),yn[2].set(-r.x,-r.y,r.z),yn[3].set(-r.x,-r.y,-r.z),yn[4].set(r.x,-r.y,-r.z),yn[5].set(r.x,r.y,-r.z),yn[6].set(-r.x,r.y,-r.z),yn[7].set(r.x,-r.y,r.z);const o=yn[0];e.vmult(o,o),t.vadd(o,o),i.copy(o),n.copy(o);for(let a=1;a<8;a++){const l=yn[a];e.vmult(l,l),t.vadd(l,l);const c=l.x,h=l.y,u=l.z;c>i.x&&(i.x=c),h>i.y&&(i.y=h),u>i.z&&(i.z=u),c<n.x&&(n.x=c),h<n.y&&(n.y=h),u<n.z&&(n.z=u)}}}const $n=new M,yn=[new M,new M,new M,new M,new M,new M,new M,new M],ca={DYNAMIC:1,STATIC:2,KINEMATIC:4},ha={AWAKE:0,SLEEPY:1,SLEEPING:2};class mt extends fh{constructor(t){t===void 0&&(t={}),super(),this.id=mt.idCounter++,this.index=-1,this.world=null,this.vlambda=new M,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new M,this.previousPosition=new M,this.interpolatedPosition=new M,this.initPosition=new M,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new M,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new M,this.force=new M;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?mt.STATIC:mt.DYNAMIC,typeof t.type==typeof mt.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=mt.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new M,this.quaternion=new _e,this.initQuaternion=new _e,this.previousQuaternion=new _e,this.interpolatedQuaternion=new _e,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new M,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new M,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new M,this.invInertia=new M,this.invInertiaWorld=new vn,this.invMassSolve=0,this.invInertiaSolve=new M,this.invInertiaWorldSolve=new vn,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new M(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new M(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new en,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new M,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=mt.AWAKE,this.wakeUpAfterNarrowphase=!1,t===mt.SLEEPING&&this.dispatchEvent(mt.wakeupEvent)}sleep(){this.sleepState=mt.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===mt.AWAKE&&n<i?(this.sleepState=mt.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(mt.sleepyEvent)):e===mt.SLEEPY&&n>i?this.wakeUp():e===mt.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(mt.sleepEvent))}}updateSolveMassProperties(){this.sleepState===mt.SLEEPING||this.type===mt.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new M),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new M),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new M),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new M),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new M,r=new _e;return e&&i.copy(e),n&&r.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(r),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let r=0;r!==n;r++){const o=t[r];o.updateBoundingSphereRadius();const a=e[r].length(),l=o.boundingSphereRadius;a+l>i&&(i=a+l)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,r=yg,o=Mg,a=this.quaternion,l=this.aabb,c=Sg;for(let h=0;h!==i;h++){const u=t[h];a.vmult(e[h],r),r.vadd(this.position,r),a.mult(n[h],o),u.calculateWorldAABB(r,o,c.lowerBound,c.upperBound),h===0?l.copy(c):l.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=Eg,i=wg;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new M),this.type!==mt.DYNAMIC)return;this.sleepState===mt.SLEEPING&&this.wakeUp();const n=bg;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new M),this.type!==mt.DYNAMIC)return;const n=Tg,i=Ag;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===mt.DYNAMIC&&(this.sleepState===mt.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new M),this.type!==mt.DYNAMIC)return;this.sleepState===mt.SLEEPING&&this.wakeUp();const n=e,i=Cg;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const r=Rg;n.cross(t,r),this.invInertiaWorld.vmult(r,r),this.angularVelocity.vadd(r,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new M),this.type!==mt.DYNAMIC)return;const n=Pg,i=Lg;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=Dg;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),As.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new M;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===mt.DYNAMIC||this.type===mt.KINEMATIC)||this.sleepState===mt.SLEEPING)return;const i=this.velocity,r=this.angularVelocity,o=this.position,a=this.force,l=this.torque,c=this.quaternion,h=this.invMass,u=this.invInertiaWorld,d=this.linearFactor,m=h*t;i.x+=a.x*m*d.x,i.y+=a.y*m*d.y,i.z+=a.z*m*d.z;const g=u.elements,v=this.angularFactor,f=l.x*v.x,p=l.y*v.y,x=l.z*v.z;r.x+=t*(g[0]*f+g[1]*p+g[2]*x),r.y+=t*(g[3]*f+g[4]*p+g[5]*x),r.z+=t*(g[6]*f+g[7]*p+g[8]*x),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,c.integrate(this.angularVelocity,t,this.angularFactor,c),e&&(n?c.normalizeFast():c.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}mt.idCounter=0;mt.COLLIDE_EVENT_NAME="collide";mt.DYNAMIC=ca.DYNAMIC;mt.STATIC=ca.STATIC;mt.KINEMATIC=ca.KINEMATIC;mt.AWAKE=ha.AWAKE;mt.SLEEPY=ha.SLEEPY;mt.SLEEPING=ha.SLEEPING;mt.wakeupEvent={type:"wakeup"};mt.sleepyEvent={type:"sleepy"};mt.sleepEvent={type:"sleep"};const yg=new M,Mg=new _e,Sg=new en,Eg=new vn,wg=new vn;new vn;const bg=new M,Tg=new M,Ag=new M,Cg=new M,Rg=new M,Pg=new M,Lg=new M,Dg=new M;class ph{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&mt.STATIC||t.sleepState===mt.SLEEPING)&&(e.type&mt.STATIC||e.sleepState===mt.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const r=Ig;e.position.vsub(t.position,r);const o=(t.boundingRadius+e.boundingRadius)**2;r.lengthSquared()<o&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=Ng,i=Ug,r=Fg,o=t.length;for(let a=0;a!==o;a++)i[a]=t[a],r[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==o;a++){const l=i[a].id,c=r[a].id,h=l<c?`${l},${c}`:`${c},${l}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const l=n.keys.pop(),c=n[l];t.push(i[c]),e.push(r[c]),delete n[l]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new M;t.position.vsub(e.position,n);const i=t.shapes[0],r=e.shapes[0];return Math.pow(i.boundingSphereRadius+r.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const Ig=new M;new M;new _e;new M;const Ng={keys:[]},Ug=[],Fg=[];new M;new M;new M;class Og extends ph{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,r=i.length;let o,a;for(let l=0;l!==r;l++)for(let c=0;c!==l;c++)o=i[l],a=i[c],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const r=t.bodies[i];r.aabbNeedsUpdate&&r.updateAABB(),r.aabb.overlaps(e)&&n.push(r)}return n}}class wr{constructor(){this.rayFromWorld=new M,this.rayToWorld=new M,this.hitNormalWorld=new M,this.hitPointWorld=new M,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,r,o,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=r,this.body=o,this.distance=a}}let mh,gh,vh,_h,xh,yh,Mh;const da={CLOSEST:1,ANY:2,ALL:4};mh=pt.types.SPHERE;gh=pt.types.PLANE;vh=pt.types.BOX;_h=pt.types.CYLINDER;xh=pt.types.CONVEXPOLYHEDRON;yh=pt.types.HEIGHTFIELD;Mh=pt.types.TRIMESH;class ve{get[mh](){return this._intersectSphere}get[gh](){return this._intersectPlane}get[vh](){return this._intersectBox}get[_h](){return this._intersectConvex}get[xh](){return this._intersectConvex}get[yh](){return this._intersectHeightfield}get[Mh](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new M),e===void 0&&(e=new M),this.from=t.clone(),this.to=e.clone(),this.direction=new M,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=ve.ANY,this.result=new wr,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||ve.ANY,this.result=e.result||new wr,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Ql),Mo.length=0,t.broadphase.aabbQuery(t,Ql,Mo),this.intersectBodies(Mo),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=Bg,r=zg;for(let o=0,a=t.shapes.length;o<a;o++){const l=t.shapes[o];if(!(n&&!l.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[o],r),t.quaternion.vmult(t.shapeOffsets[o],i),i.vadd(t.position,i),this.intersectShape(l,r,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const r=this.from;if(Qg(r,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,r){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,r)}_intersectPlane(t,e,n,i,r){const o=this.from,a=this.to,l=this.direction,c=new M(0,0,1);e.vmult(c,c);const h=new M;o.vsub(n,h);const u=h.dot(c);a.vsub(n,h);const d=h.dot(c);if(u*d>0||o.distanceTo(a)<u)return;const m=c.dot(l);if(Math.abs(m)<this.precision)return;const g=new M,v=new M,f=new M;o.vsub(n,g);const p=-c.dot(g)/m;l.scale(p,v),o.vadd(v,f),this.reportIntersection(c,f,r,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,r=this.from;e.x=Math.min(i.x,r.x),e.y=Math.min(i.y,r.y),e.z=Math.min(i.z,r.z),n.x=Math.max(i.x,r.x),n.y=Math.max(i.y,r.y),n.z=Math.max(i.z,r.z)}_intersectHeightfield(t,e,n,i,r){t.data,t.elementSize;const o=Gg;o.from.copy(this.from),o.to.copy(this.to),te.pointToLocalFrame(n,e,o.from,o.from),te.pointToLocalFrame(n,e,o.to,o.to),o.updateDirection();const a=kg;let l,c,h,u;l=c=0,h=u=t.data.length-1;const d=new en;o.getAABB(d),t.getIndexOfPosition(d.lowerBound.x,d.lowerBound.y,a,!0),l=Math.max(l,a[0]),c=Math.max(c,a[1]),t.getIndexOfPosition(d.upperBound.x,d.upperBound.y,a,!0),h=Math.min(h,a[0]+1),u=Math.min(u,a[1]+1);for(let m=l;m<h;m++)for(let g=c;g<u;g++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(m,g,d),!!d.overlapsRay(o)){if(t.getConvexTrianglePillar(m,g,!1),te.pointToWorldFrame(n,e,t.pillarOffset,ir),this._intersectConvex(t.pillarConvex,e,ir,i,r,tc),this.result.shouldStop)return;t.getConvexTrianglePillar(m,g,!0),te.pointToWorldFrame(n,e,t.pillarOffset,ir),this._intersectConvex(t.pillarConvex,e,ir,i,r,tc)}}}_intersectSphere(t,e,n,i,r){const o=this.from,a=this.to,l=t.radius,c=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-n.x)+(a.y-o.y)*(o.y-n.y)+(a.z-o.z)*(o.z-n.z)),u=(o.x-n.x)**2+(o.y-n.y)**2+(o.z-n.z)**2-l**2,d=h**2-4*c*u,m=Hg,g=Vg;if(!(d<0))if(d===0)o.lerp(a,d,m),m.vsub(n,g),g.normalize(),this.reportIntersection(g,m,r,i,-1);else{const v=(-h-Math.sqrt(d))/(2*c),f=(-h+Math.sqrt(d))/(2*c);if(v>=0&&v<=1&&(o.lerp(a,v,m),m.vsub(n,g),g.normalize(),this.reportIntersection(g,m,r,i,-1)),this.result.shouldStop)return;f>=0&&f<=1&&(o.lerp(a,f,m),m.vsub(n,g),g.normalize(),this.reportIntersection(g,m,r,i,-1))}}_intersectConvex(t,e,n,i,r,o){const a=Wg,l=ec,c=o&&o.faceList||null,h=t.faces,u=t.vertices,d=t.faceNormals,m=this.direction,g=this.from,v=this.to,f=g.distanceTo(v),p=c?c.length:h.length,x=this.result;for(let y=0;!x.shouldStop&&y<p;y++){const E=c?c[y]:y,P=h[E],w=d[E],C=e,z=n;l.copy(u[P[0]]),C.vmult(l,l),l.vadd(z,l),l.vsub(g,l),C.vmult(w,a);const S=m.dot(a);if(Math.abs(S)<this.precision)continue;const T=a.dot(l)/S;if(!(T<0)){m.scale(T,qe),qe.vadd(g,qe),dn.copy(u[P[0]]),C.vmult(dn,dn),z.vadd(dn,dn);for(let B=1;!x.shouldStop&&B<P.length-1;B++){Mn.copy(u[P[B]]),Sn.copy(u[P[B+1]]),C.vmult(Mn,Mn),C.vmult(Sn,Sn),z.vadd(Mn,Mn),z.vadd(Sn,Sn);const F=qe.distanceTo(g);!(ve.pointInTriangle(qe,dn,Mn,Sn)||ve.pointInTriangle(qe,Mn,dn,Sn))||F>f||this.reportIntersection(a,qe,r,i,E)}}}}_intersectTrimesh(t,e,n,i,r,o){const a=Xg,l=Zg,c=Jg,h=ec,u=qg,d=Yg,m=jg,g=Kg,v=$g,f=t.indices;t.vertices;const p=this.from,x=this.to,y=this.direction;c.position.copy(n),c.quaternion.copy(e),te.vectorToLocalFrame(n,e,y,u),te.pointToLocalFrame(n,e,p,d),te.pointToLocalFrame(n,e,x,m),m.x*=t.scale.x,m.y*=t.scale.y,m.z*=t.scale.z,d.x*=t.scale.x,d.y*=t.scale.y,d.z*=t.scale.z,m.vsub(d,u),u.normalize();const E=d.distanceSquared(m);t.tree.rayQuery(this,c,l);for(let P=0,w=l.length;!this.result.shouldStop&&P!==w;P++){const C=l[P];t.getNormal(C,a),t.getVertex(f[C*3],dn),dn.vsub(d,h);const z=u.dot(a),S=a.dot(h)/z;if(S<0)continue;u.scale(S,qe),qe.vadd(d,qe),t.getVertex(f[C*3+1],Mn),t.getVertex(f[C*3+2],Sn);const T=qe.distanceSquared(d);!(ve.pointInTriangle(qe,Mn,dn,Sn)||ve.pointInTriangle(qe,dn,Mn,Sn))||T>E||(te.vectorToWorldFrame(e,a,v),te.pointToWorldFrame(n,e,qe,g),this.reportIntersection(v,g,r,i,C))}l.length=0}reportIntersection(t,e,n,i,r){const o=this.from,a=this.to,l=o.distanceTo(e),c=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(c.hitFaceIndex=typeof r<"u"?r:-1,this.mode){case ve.ALL:this.hasHit=!0,c.set(o,a,t,e,n,i,l),c.hasHit=!0,this.callback(c);break;case ve.CLOSEST:(l<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(o,a,t,e,n,i,l));break;case ve.ANY:this.hasHit=!0,c.hasHit=!0,c.set(o,a,t,e,n,i,l),c.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,xi),n.vsub(e,gs),t.vsub(e,So);const r=xi.dot(xi),o=xi.dot(gs),a=xi.dot(So),l=gs.dot(gs),c=gs.dot(So);let h,u;return(h=l*a-o*c)>=0&&(u=r*c-o*a)>=0&&h+u<r*l-o*o}}ve.CLOSEST=da.CLOSEST;ve.ANY=da.ANY;ve.ALL=da.ALL;const Ql=new en,Mo=[],gs=new M,So=new M,Bg=new M,zg=new _e,qe=new M,dn=new M,Mn=new M,Sn=new M;new M;new wr;const tc={faceList:[0]},ir=new M,Gg=new ve,kg=[],Hg=new M,Vg=new M,Wg=new M;new M;new M;const ec=new M,Xg=new M,qg=new M,Yg=new M,jg=new M,$g=new M,Kg=new M;new en;const Zg=[],Jg=new te,xi=new M,sr=new M;function Qg(s,t,e){e.vsub(s,xi);const n=xi.dot(t);return t.scale(n,sr),sr.vadd(s,sr),e.distanceTo(sr)}class qi extends ph{static checkBounds(t,e,n){let i,r;n===0?(i=t.position.x,r=e.position.x):n===1?(i=t.position.y,r=e.position.y):n===2&&(i=t.position.z,r=e.position.z);const o=t.boundingRadius,a=e.boundingRadius,l=i+o;return r-a<l}static insertionSortX(t){for(let e=1,n=t.length;e<n;e++){const i=t[e];let r;for(r=e-1;r>=0&&!(t[r].aabb.lowerBound.x<=i.aabb.lowerBound.x);r--)t[r+1]=t[r];t[r+1]=i}return t}static insertionSortY(t){for(let e=1,n=t.length;e<n;e++){const i=t[e];let r;for(r=e-1;r>=0&&!(t[r].aabb.lowerBound.y<=i.aabb.lowerBound.y);r--)t[r+1]=t[r];t[r+1]=i}return t}static insertionSortZ(t){for(let e=1,n=t.length;e<n;e++){const i=t[e];let r;for(r=e-1;r>=0&&!(t[r].aabb.lowerBound.z<=i.aabb.lowerBound.z);r--)t[r+1]=t[r];t[r+1]=i}return t}constructor(t){super(),this.axisList=[],this.world=null,this.axisIndex=0;const e=this.axisList;this._addBodyHandler=n=>{e.push(n.body)},this._removeBodyHandler=n=>{const i=e.indexOf(n.body);i!==-1&&e.splice(i,1)},t&&this.setWorld(t)}setWorld(t){this.axisList.length=0;for(let e=0;e<t.bodies.length;e++)this.axisList.push(t.bodies[e]);t.removeEventListener("addBody",this._addBodyHandler),t.removeEventListener("removeBody",this._removeBodyHandler),t.addEventListener("addBody",this._addBodyHandler),t.addEventListener("removeBody",this._removeBodyHandler),this.world=t,this.dirty=!0}collisionPairs(t,e,n){const i=this.axisList,r=i.length,o=this.axisIndex;let a,l;for(this.dirty&&(this.sortList(),this.dirty=!1),a=0;a!==r;a++){const c=i[a];for(l=a+1;l<r;l++){const h=i[l];if(this.needBroadphaseCollision(c,h)){if(!qi.checkBounds(c,h,o))break;this.intersectionTest(c,h,e,n)}}}}sortList(){const t=this.axisList,e=this.axisIndex,n=t.length;for(let i=0;i!==n;i++){const r=t[i];r.aabbNeedsUpdate&&r.updateAABB()}e===0?qi.insertionSortX(t):e===1?qi.insertionSortY(t):e===2&&qi.insertionSortZ(t)}autoDetectAxis(){let t=0,e=0,n=0,i=0,r=0,o=0;const a=this.axisList,l=a.length,c=1/l;for(let m=0;m!==l;m++){const g=a[m],v=g.position.x;t+=v,e+=v*v;const f=g.position.y;n+=f,i+=f*f;const p=g.position.z;r+=p,o+=p*p}const h=e-t*t*c,u=i-n*n*c,d=o-r*r*c;h>u?h>d?this.axisIndex=0:this.axisIndex=2:u>d?this.axisIndex=1:this.axisIndex=2}aabbQuery(t,e,n){n===void 0&&(n=[]),this.dirty&&(this.sortList(),this.dirty=!1);const i=this.axisIndex;let r="x";i===1&&(r="y"),i===2&&(r="z");const o=this.axisList;e.lowerBound[r],e.upperBound[r];for(let a=0;a<o.length;a++){const l=o[a];l.aabbNeedsUpdate&&l.updateAABB(),l.aabb.overlaps(e)&&n.push(l)}return n}}class tv{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class nc{constructor(){this.spatial=new M,this.rotational=new M}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Ls{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=Ls.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new nc,this.jacobianElementB=new nc,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,r=t,o=n;this.a=4/(o*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(o*o*r*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),r=this.computeGq(),o=this.computeGiMf();return-r*t-i*e-o*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.position,o=i.position;return t.spatial.dot(r)+e.spatial.dot(o)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.velocity,o=i.velocity,a=n.angularVelocity,l=i.angularVelocity;return t.multiplyVectors(r,a)+e.multiplyVectors(o,l)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.vlambda,o=i.vlambda,a=n.wlambda,l=i.wlambda;return t.multiplyVectors(r,a)+e.multiplyVectors(o,l)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.force,o=n.torque,a=i.force,l=i.torque,c=n.invMassSolve,h=i.invMassSolve;return r.scale(c,ic),a.scale(h,sc),n.invInertiaWorldSolve.vmult(o,rc),i.invInertiaWorldSolve.vmult(l,oc),t.multiplyVectors(ic,rc)+e.multiplyVectors(sc,oc)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.invMassSolve,o=i.invMassSolve,a=n.invInertiaWorldSolve,l=i.invInertiaWorldSolve;let c=r+o;return a.vmult(t.rotational,rr),c+=rr.dot(t.rotational),l.vmult(e.rotational,rr),c+=rr.dot(e.rotational),c}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,r=this.bj,o=ev;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),r.vlambda.addScaledVector(r.invMassSolve*t,n.spatial,r.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,o),i.wlambda.addScaledVector(t,o,i.wlambda),r.invInertiaWorldSolve.vmult(n.rotational,o),r.wlambda.addScaledVector(t,o,r.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Ls.idCounter=0;const ic=new M,sc=new M,rc=new M,oc=new M,rr=new M,ev=new M;class nv extends Ls{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new M,this.rj=new M,this.ni=new M}computeB(t){const e=this.a,n=this.b,i=this.bi,r=this.bj,o=this.ri,a=this.rj,l=iv,c=sv,h=i.velocity,u=i.angularVelocity;i.force,i.torque;const d=r.velocity,m=r.angularVelocity;r.force,r.torque;const g=rv,v=this.jacobianElementA,f=this.jacobianElementB,p=this.ni;o.cross(p,l),a.cross(p,c),p.negate(v.spatial),l.negate(v.rotational),f.spatial.copy(p),f.rotational.copy(c),g.copy(r.position),g.vadd(a,g),g.vsub(i.position,g),g.vsub(o,g);const x=p.dot(g),y=this.restitution+1,E=y*d.dot(p)-y*h.dot(p)+m.dot(c)-u.dot(l),P=this.computeGiMf();return-x*e-E*n-t*P}getImpactVelocityAlongNormal(){const t=ov,e=av,n=lv,i=cv,r=hv;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,r),this.ni.dot(r)}}const iv=new M,sv=new M,rv=new M,ov=new M,av=new M,lv=new M,cv=new M,hv=new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;class ac extends Ls{constructor(t,e,n){super(t,e,-n,n),this.ri=new M,this.rj=new M,this.t=new M}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,r=dv,o=uv,a=this.t;n.cross(a,r),i.cross(a,o);const l=this.jacobianElementA,c=this.jacobianElementB;a.negate(l.spatial),r.negate(l.rotational),c.spatial.copy(a),c.rotational.copy(o);const h=this.computeGW(),u=this.computeGiMf();return-h*e-t*u}}const dv=new M,uv=new M;class ss{constructor(t,e,n){n=tv.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=ss.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}ss.idCounter=0;class Qn{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Qn.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Qn.idCounter=0;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new ve;new M;new M;new M;new M(1,0,0),new M(0,1,0),new M(0,0,1);new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;class fv extends pt{constructor(t){if(super({type:pt.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new M);const n=2*t*this.radius*this.radius/5;return e.x=n,e.y=n,e.z=n,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,n,i){const r=this.radius,o=["x","y","z"];for(let a=0;a<o.length;a++){const l=o[a];n[l]=t[l]-r,i[l]=t[l]+r}}}new M;new M;new M;new M;new M;new M;new M;new M;new M;class pv extends Ki{constructor(t,e,n,i){if(t===void 0&&(t=1),e===void 0&&(e=1),n===void 0&&(n=1),i===void 0&&(i=8),t<0)throw new Error("The cylinder radiusTop cannot be negative.");if(e<0)throw new Error("The cylinder radiusBottom cannot be negative.");const r=i,o=[],a=[],l=[],c=[],h=[],u=Math.cos,d=Math.sin;o.push(new M(-e*d(0),-n*.5,e*u(0))),c.push(0),o.push(new M(-t*d(0),n*.5,t*u(0))),h.push(1);for(let g=0;g<r;g++){const v=2*Math.PI/r*(g+1),f=2*Math.PI/r*(g+.5);g<r-1?(o.push(new M(-e*d(v),-n*.5,e*u(v))),c.push(2*g+2),o.push(new M(-t*d(v),n*.5,t*u(v))),h.push(2*g+3),l.push([2*g,2*g+1,2*g+3,2*g+2])):l.push([2*g,2*g+1,1,0]),(r%2===1||g<r/2)&&a.push(new M(-d(f),0,u(f)))}l.push(c),a.push(new M(0,1,0));const m=[];for(let g=0;g<h.length;g++)m.push(h[h.length-g-1]);l.push(m),super({vertices:o,faces:l,axes:a}),this.type=pt.types.CYLINDER,this.radiusTop=t,this.radiusBottom=e,this.height=n,this.numSegments=i}}class mv extends pt{constructor(){super({type:pt.types.PLANE}),this.worldNormal=new M,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(t){const e=this.worldNormal;e.set(0,0,1),t.vmult(e,e),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(t,e){return e===void 0&&(e=new M),e}volume(){return Number.MAX_VALUE}calculateWorldAABB(t,e,n,i){Nn.set(0,0,1),e.vmult(Nn,Nn);const r=Number.MAX_VALUE;n.set(-r,-r,-r),i.set(r,r,r),Nn.x===1?i.x=t.x:Nn.x===-1&&(n.x=t.x),Nn.y===1?i.y=t.y:Nn.y===-1&&(n.y=t.y),Nn.z===1?i.z=t.z:Nn.z===-1&&(n.z=t.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}}const Nn=new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new en;new M;new en;new M;new M;new M;new M;new M;new M;new M;new en;new M;new te;new en;class gv{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class vv extends gv{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,r=this.tolerance*this.tolerance,o=this.equations,a=o.length,l=e.bodies,c=l.length,h=t;let u,d,m,g,v,f;if(a!==0)for(let E=0;E!==c;E++)l[E].updateSolveMassProperties();const p=xv,x=yv,y=_v;p.length=a,x.length=a,y.length=a;for(let E=0;E!==a;E++){const P=o[E];y[E]=0,x[E]=P.computeB(h),p[E]=1/P.computeC()}if(a!==0){for(let w=0;w!==c;w++){const C=l[w],z=C.vlambda,S=C.wlambda;z.set(0,0,0),S.set(0,0,0)}for(n=0;n!==i;n++){g=0;for(let w=0;w!==a;w++){const C=o[w];u=x[w],d=p[w],f=y[w],v=C.computeGWlambda(),m=d*(u-v-C.eps*f),f+m<C.minForce?m=C.minForce-f:f+m>C.maxForce&&(m=C.maxForce-f),y[w]+=m,g+=m>0?m:-m,C.addToWlambda(m)}if(g*g<r)break}for(let w=0;w!==c;w++){const C=l[w],z=C.velocity,S=C.angularVelocity;C.vlambda.vmul(C.linearFactor,C.vlambda),z.vadd(C.vlambda,z),C.wlambda.vmul(C.angularFactor,C.wlambda),S.vadd(C.wlambda,S)}let E=o.length;const P=1/h;for(;E--;)o[E].multiplier=y[E]*P}return n}}const _v=[],xv=[],yv=[];class Mv{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class Sv extends Mv{constructor(){super(...arguments),this.type=M}constructObject(){return new M}}const ae={sphereSphere:pt.types.SPHERE,spherePlane:pt.types.SPHERE|pt.types.PLANE,boxBox:pt.types.BOX|pt.types.BOX,sphereBox:pt.types.SPHERE|pt.types.BOX,planeBox:pt.types.PLANE|pt.types.BOX,convexConvex:pt.types.CONVEXPOLYHEDRON,sphereConvex:pt.types.SPHERE|pt.types.CONVEXPOLYHEDRON,planeConvex:pt.types.PLANE|pt.types.CONVEXPOLYHEDRON,boxConvex:pt.types.BOX|pt.types.CONVEXPOLYHEDRON,sphereHeightfield:pt.types.SPHERE|pt.types.HEIGHTFIELD,boxHeightfield:pt.types.BOX|pt.types.HEIGHTFIELD,convexHeightfield:pt.types.CONVEXPOLYHEDRON|pt.types.HEIGHTFIELD,sphereParticle:pt.types.PARTICLE|pt.types.SPHERE,planeParticle:pt.types.PLANE|pt.types.PARTICLE,boxParticle:pt.types.BOX|pt.types.PARTICLE,convexParticle:pt.types.PARTICLE|pt.types.CONVEXPOLYHEDRON,cylinderCylinder:pt.types.CYLINDER,sphereCylinder:pt.types.SPHERE|pt.types.CYLINDER,planeCylinder:pt.types.PLANE|pt.types.CYLINDER,boxCylinder:pt.types.BOX|pt.types.CYLINDER,convexCylinder:pt.types.CONVEXPOLYHEDRON|pt.types.CYLINDER,heightfieldCylinder:pt.types.HEIGHTFIELD|pt.types.CYLINDER,particleCylinder:pt.types.PARTICLE|pt.types.CYLINDER,sphereTrimesh:pt.types.SPHERE|pt.types.TRIMESH,planeTrimesh:pt.types.PLANE|pt.types.TRIMESH};class Ev{get[ae.sphereSphere](){return this.sphereSphere}get[ae.spherePlane](){return this.spherePlane}get[ae.boxBox](){return this.boxBox}get[ae.sphereBox](){return this.sphereBox}get[ae.planeBox](){return this.planeBox}get[ae.convexConvex](){return this.convexConvex}get[ae.sphereConvex](){return this.sphereConvex}get[ae.planeConvex](){return this.planeConvex}get[ae.boxConvex](){return this.boxConvex}get[ae.sphereHeightfield](){return this.sphereHeightfield}get[ae.boxHeightfield](){return this.boxHeightfield}get[ae.convexHeightfield](){return this.convexHeightfield}get[ae.sphereParticle](){return this.sphereParticle}get[ae.planeParticle](){return this.planeParticle}get[ae.boxParticle](){return this.boxParticle}get[ae.convexParticle](){return this.convexParticle}get[ae.cylinderCylinder](){return this.convexConvex}get[ae.sphereCylinder](){return this.sphereConvex}get[ae.planeCylinder](){return this.planeConvex}get[ae.boxCylinder](){return this.boxConvex}get[ae.convexCylinder](){return this.convexConvex}get[ae.heightfieldCylinder](){return this.heightfieldCylinder}get[ae.particleCylinder](){return this.particleCylinder}get[ae.sphereTrimesh](){return this.sphereTrimesh}get[ae.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new Sv,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,r,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new nv(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const l=this.currentContactMaterial;a.restitution=l.restitution,a.setSpookParams(l.contactEquationStiffness,l.contactEquationRelaxation,this.world.dt);const c=n.material||t.material,h=i.material||e.material;return c&&h&&c.restitution>=0&&h.restitution>=0&&(a.restitution=c.restitution*h.restitution),a.si=r||n,a.sj=o||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,r=t.si,o=t.sj,a=this.world,l=this.currentContactMaterial;let c=l.friction;const h=r.material||n.material,u=o.material||i.material;if(h&&u&&h.friction>=0&&u.friction>=0&&(c=h.friction*u.friction),c>0){const d=c*(a.frictionGravity||a.gravity).length();let m=n.invMass+i.invMass;m>0&&(m=1/m);const g=this.frictionEquationPool,v=g.length?g.pop():new ac(n,i,d*m),f=g.length?g.pop():new ac(n,i,d*m);return v.bi=f.bi=n,v.bj=f.bj=i,v.minForce=f.minForce=-d*m,v.maxForce=f.maxForce=d*m,v.ri.copy(t.ri),v.rj.copy(t.rj),f.ri.copy(t.ri),f.rj.copy(t.rj),t.ni.tangents(v.t,f.t),v.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),f.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),v.enabled=f.enabled=t.enabled,e.push(v,f),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];fi.setZero(),Hi.setZero(),Vi.setZero();const r=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==r?(fi.vadd(e.ni,fi),Hi.vadd(e.ri,Hi),Vi.vadd(e.rj,Vi)):(fi.vsub(e.ni,fi),Hi.vadd(e.rj,Hi),Vi.vadd(e.ri,Vi));const o=1/t;Hi.scale(o,n.ri),Vi.scale(o,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),fi.normalize(),fi.tangents(n.t,i.t)}getContacts(t,e,n,i,r,o,a){this.contactPointPool=r,this.frictionEquationPool=a,this.result=i,this.frictionResult=o;const l=Tv,c=Av,h=wv,u=bv;for(let d=0,m=t.length;d!==m;d++){const g=t[d],v=e[d];let f=null;g.material&&v.material&&(f=n.getContactMaterial(g.material,v.material)||null);const p=g.type&mt.KINEMATIC&&v.type&mt.STATIC||g.type&mt.STATIC&&v.type&mt.KINEMATIC||g.type&mt.KINEMATIC&&v.type&mt.KINEMATIC;for(let x=0;x<g.shapes.length;x++){g.quaternion.mult(g.shapeOrientations[x],l),g.quaternion.vmult(g.shapeOffsets[x],h),h.vadd(g.position,h);const y=g.shapes[x];for(let E=0;E<v.shapes.length;E++){v.quaternion.mult(v.shapeOrientations[E],c),v.quaternion.vmult(v.shapeOffsets[E],u),u.vadd(v.position,u);const P=v.shapes[E];if(!(y.collisionFilterMask&P.collisionFilterGroup&&P.collisionFilterMask&y.collisionFilterGroup)||h.distanceTo(u)>y.boundingSphereRadius+P.boundingSphereRadius)continue;let w=null;y.material&&P.material&&(w=n.getContactMaterial(y.material,P.material)||null),this.currentContactMaterial=w||f||n.defaultContactMaterial;const C=y.type|P.type,z=this[C];if(z){let S=!1;y.type<P.type?S=z.call(this,y,P,h,u,l,c,g,v,y,P,p):S=z.call(this,P,y,u,h,c,l,v,g,y,P,p),S&&p&&(n.shapeOverlapKeeper.set(y.id,P.id),n.bodyOverlapKeeper.set(g.id,v.id))}}}}}sphereSphere(t,e,n,i,r,o,a,l,c,h,u){if(u)return n.distanceSquared(i)<(t.radius+e.radius)**2;const d=this.createContactEquation(a,l,t,e,c,h);i.vsub(n,d.ni),d.ni.normalize(),d.ri.copy(d.ni),d.rj.copy(d.ni),d.ri.scale(t.radius,d.ri),d.rj.scale(-e.radius,d.rj),d.ri.vadd(n,d.ri),d.ri.vsub(a.position,d.ri),d.rj.vadd(i,d.rj),d.rj.vsub(l.position,d.rj),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}spherePlane(t,e,n,i,r,o,a,l,c,h,u){const d=this.createContactEquation(a,l,t,e,c,h);if(d.ni.set(0,0,1),o.vmult(d.ni,d.ni),d.ni.negate(d.ni),d.ni.normalize(),d.ni.scale(t.radius,d.ri),n.vsub(i,or),d.ni.scale(d.ni.dot(or),lc),or.vsub(lc,d.rj),-or.dot(d.ni)<=t.radius){if(u)return!0;const m=d.ri,g=d.rj;m.vadd(n,m),m.vsub(a.position,m),g.vadd(i,g),g.vsub(l.position,g),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}}boxBox(t,e,n,i,r,o,a,l,c,h,u){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,r,o,a,l,t,e,u)}sphereBox(t,e,n,i,r,o,a,l,c,h,u){const d=this.v3pool,m=Qv;n.vsub(i,ar),e.getSideNormals(m,o);const g=t.radius;let v=!1;const f=e_,p=n_,x=i_;let y=null,E=0,P=0,w=0,C=null;for(let I=0,V=m.length;I!==V&&v===!1;I++){const G=Kv;G.copy(m[I]);const H=G.length();G.normalize();const K=ar.dot(G);if(K<H+g&&K>0){const Q=Zv,W=Jv;Q.copy(m[(I+1)%3]),W.copy(m[(I+2)%3]);const $=Q.length(),tt=W.length();Q.normalize(),W.normalize();const ct=ar.dot(Q),xt=ar.dot(W);if(ct<$&&ct>-$&&xt<tt&&xt>-tt){const yt=Math.abs(K-H-g);if((C===null||yt<C)&&(C=yt,P=ct,w=xt,y=H,f.copy(G),p.copy(Q),x.copy(W),E++,u))return!0}}}if(E){v=!0;const I=this.createContactEquation(a,l,t,e,c,h);f.scale(-g,I.ri),I.ni.copy(f),I.ni.negate(I.ni),f.scale(y,f),p.scale(P,p),f.vadd(p,f),x.scale(w,x),f.vadd(x,I.rj),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),I.rj.vadd(i,I.rj),I.rj.vsub(l.position,I.rj),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}let z=d.get();const S=t_;for(let I=0;I!==2&&!v;I++)for(let V=0;V!==2&&!v;V++)for(let G=0;G!==2&&!v;G++)if(z.set(0,0,0),I?z.vadd(m[0],z):z.vsub(m[0],z),V?z.vadd(m[1],z):z.vsub(m[1],z),G?z.vadd(m[2],z):z.vsub(m[2],z),i.vadd(z,S),S.vsub(n,S),S.lengthSquared()<g*g){if(u)return!0;v=!0;const H=this.createContactEquation(a,l,t,e,c,h);H.ri.copy(S),H.ri.normalize(),H.ni.copy(H.ri),H.ri.scale(g,H.ri),H.rj.copy(z),H.ri.vadd(n,H.ri),H.ri.vsub(a.position,H.ri),H.rj.vadd(i,H.rj),H.rj.vsub(l.position,H.rj),this.result.push(H),this.createFrictionEquationsFromContact(H,this.frictionResult)}d.release(z),z=null;const T=d.get(),B=d.get(),F=d.get(),N=d.get(),L=d.get(),D=m.length;for(let I=0;I!==D&&!v;I++)for(let V=0;V!==D&&!v;V++)if(I%3!==V%3){m[V].cross(m[I],T),T.normalize(),m[I].vadd(m[V],B),F.copy(n),F.vsub(B,F),F.vsub(i,F);const G=F.dot(T);T.scale(G,N);let H=0;for(;H===I%3||H===V%3;)H++;L.copy(n),L.vsub(N,L),L.vsub(B,L),L.vsub(i,L);const K=Math.abs(G),Q=L.length();if(K<m[H].length()&&Q<g){if(u)return!0;v=!0;const W=this.createContactEquation(a,l,t,e,c,h);B.vadd(N,W.rj),W.rj.copy(W.rj),L.negate(W.ni),W.ni.normalize(),W.ri.copy(W.rj),W.ri.vadd(i,W.ri),W.ri.vsub(n,W.ri),W.ri.normalize(),W.ri.scale(g,W.ri),W.ri.vadd(n,W.ri),W.ri.vsub(a.position,W.ri),W.rj.vadd(i,W.rj),W.rj.vsub(l.position,W.rj),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult)}}d.release(T,B,F,N,L)}planeBox(t,e,n,i,r,o,a,l,c,h,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,r,o,a,l,t,e,u)}convexConvex(t,e,n,i,r,o,a,l,c,h,u,d,m){const g=__;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,r,i,o,g,d,m)){const v=[],f=x_;t.clipAgainstHull(n,r,e,i,o,g,-100,100,v);let p=0;for(let x=0;x!==v.length;x++){if(u)return!0;const y=this.createContactEquation(a,l,t,e,c,h),E=y.ri,P=y.rj;g.negate(y.ni),v[x].normal.negate(f),f.scale(v[x].depth,f),v[x].point.vadd(f,E),P.copy(v[x].point),E.vsub(n,E),P.vsub(i,P),E.vadd(n,E),E.vsub(a.position,E),P.vadd(i,P),P.vsub(l.position,P),this.result.push(y),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(y,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}}sphereConvex(t,e,n,i,r,o,a,l,c,h,u){const d=this.v3pool;n.vsub(i,s_);const m=e.faceNormals,g=e.faces,v=e.vertices,f=t.radius;let p=!1;for(let x=0;x!==v.length;x++){const y=v[x],E=l_;o.vmult(y,E),i.vadd(E,E);const P=a_;if(E.vsub(n,P),P.lengthSquared()<f*f){if(u)return!0;p=!0;const w=this.createContactEquation(a,l,t,e,c,h);w.ri.copy(P),w.ri.normalize(),w.ni.copy(w.ri),w.ri.scale(f,w.ri),E.vsub(i,w.rj),w.ri.vadd(n,w.ri),w.ri.vsub(a.position,w.ri),w.rj.vadd(i,w.rj),w.rj.vsub(l.position,w.rj),this.result.push(w),this.createFrictionEquationsFromContact(w,this.frictionResult);return}}for(let x=0,y=g.length;x!==y&&p===!1;x++){const E=m[x],P=g[x],w=c_;o.vmult(E,w);const C=h_;o.vmult(v[P[0]],C),C.vadd(i,C);const z=d_;w.scale(-f,z),n.vadd(z,z);const S=u_;z.vsub(C,S);const T=S.dot(w),B=f_;if(n.vsub(C,B),T<0&&B.dot(w)>0){const F=[];for(let N=0,L=P.length;N!==L;N++){const D=d.get();o.vmult(v[P[N]],D),i.vadd(D,D),F.push(D)}if($v(F,w,n)){if(u)return!0;p=!0;const N=this.createContactEquation(a,l,t,e,c,h);w.scale(-f,N.ri),w.negate(N.ni);const L=d.get();w.scale(-T,L);const D=d.get();w.scale(-f,D),n.vsub(i,N.rj),N.rj.vadd(D,N.rj),N.rj.vadd(L,N.rj),N.rj.vadd(i,N.rj),N.rj.vsub(l.position,N.rj),N.ri.vadd(n,N.ri),N.ri.vsub(a.position,N.ri),d.release(L),d.release(D),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult);for(let I=0,V=F.length;I!==V;I++)d.release(F[I]);return}else for(let N=0;N!==P.length;N++){const L=d.get(),D=d.get();o.vmult(v[P[(N+1)%P.length]],L),o.vmult(v[P[(N+2)%P.length]],D),i.vadd(L,L),i.vadd(D,D);const I=r_;D.vsub(L,I);const V=o_;I.unit(V);const G=d.get(),H=d.get();n.vsub(L,H);const K=H.dot(V);V.scale(K,G),G.vadd(L,G);const Q=d.get();if(G.vsub(n,Q),K>0&&K*K<I.lengthSquared()&&Q.lengthSquared()<f*f){if(u)return!0;const W=this.createContactEquation(a,l,t,e,c,h);G.vsub(i,W.rj),G.vsub(n,W.ni),W.ni.normalize(),W.ni.scale(f,W.ri),W.rj.vadd(i,W.rj),W.rj.vsub(l.position,W.rj),W.ri.vadd(n,W.ri),W.ri.vsub(a.position,W.ri),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult);for(let $=0,tt=F.length;$!==tt;$++)d.release(F[$]);d.release(L),d.release(D),d.release(G),d.release(Q),d.release(H);return}d.release(L),d.release(D),d.release(G),d.release(Q),d.release(H)}for(let N=0,L=F.length;N!==L;N++)d.release(F[N])}}}planeConvex(t,e,n,i,r,o,a,l,c,h,u){const d=p_,m=m_;m.set(0,0,1),r.vmult(m,m);let g=0;const v=g_;for(let f=0;f!==e.vertices.length;f++)if(d.copy(e.vertices[f]),o.vmult(d,d),i.vadd(d,d),d.vsub(n,v),m.dot(v)<=0){if(u)return!0;const x=this.createContactEquation(a,l,t,e,c,h),y=v_;m.scale(m.dot(v),y),d.vsub(y,y),y.vsub(n,x.ri),x.ni.copy(m),d.vsub(i,x.rj),x.ri.vadd(n,x.ri),x.ri.vsub(a.position,x.ri),x.rj.vadd(i,x.rj),x.rj.vsub(l.position,x.rj),this.result.push(x),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(t,e,n,i,r,o,a,l,c,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,r,o,a,l,t,e,u)}sphereHeightfield(t,e,n,i,r,o,a,l,c,h,u){const d=e.data,m=t.radius,g=e.elementSize,v=L_,f=P_;te.pointToLocalFrame(i,o,n,f);let p=Math.floor((f.x-m)/g)-1,x=Math.ceil((f.x+m)/g)+1,y=Math.floor((f.y-m)/g)-1,E=Math.ceil((f.y+m)/g)+1;if(x<0||E<0||p>d.length||y>d[0].length)return;p<0&&(p=0),x<0&&(x=0),y<0&&(y=0),E<0&&(E=0),p>=d.length&&(p=d.length-1),x>=d.length&&(x=d.length-1),E>=d[0].length&&(E=d[0].length-1),y>=d[0].length&&(y=d[0].length-1);const P=[];e.getRectMinMax(p,y,x,E,P);const w=P[0],C=P[1];if(f.z-m>C||f.z+m<w)return;const z=this.result;for(let S=p;S<x;S++)for(let T=y;T<E;T++){const B=z.length;let F=!1;if(e.getConvexTrianglePillar(S,T,!1),te.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(F=this.sphereConvex(t,e.pillarConvex,n,v,r,o,a,l,t,e,u)),u&&F||(e.getConvexTrianglePillar(S,T,!0),te.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(F=this.sphereConvex(t,e.pillarConvex,n,v,r,o,a,l,t,e,u)),u&&F))return!0;if(z.length-B>2)return}}boxHeightfield(t,e,n,i,r,o,a,l,c,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,r,o,a,l,t,e,u)}convexHeightfield(t,e,n,i,r,o,a,l,c,h,u){const d=e.data,m=e.elementSize,g=t.boundingSphereRadius,v=C_,f=R_,p=A_;te.pointToLocalFrame(i,o,n,p);let x=Math.floor((p.x-g)/m)-1,y=Math.ceil((p.x+g)/m)+1,E=Math.floor((p.y-g)/m)-1,P=Math.ceil((p.y+g)/m)+1;if(y<0||P<0||x>d.length||E>d[0].length)return;x<0&&(x=0),y<0&&(y=0),E<0&&(E=0),P<0&&(P=0),x>=d.length&&(x=d.length-1),y>=d.length&&(y=d.length-1),P>=d[0].length&&(P=d[0].length-1),E>=d[0].length&&(E=d[0].length-1);const w=[];e.getRectMinMax(x,E,y,P,w);const C=w[0],z=w[1];if(!(p.z-g>z||p.z+g<C))for(let S=x;S<y;S++)for(let T=E;T<P;T++){let B=!1;if(e.getConvexTrianglePillar(S,T,!1),te.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(B=this.convexConvex(t,e.pillarConvex,n,v,r,o,a,l,null,null,u,f,null)),u&&B||(e.getConvexTrianglePillar(S,T,!0),te.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(B=this.convexConvex(t,e.pillarConvex,n,v,r,o,a,l,null,null,u,f,null)),u&&B))return!0}}sphereParticle(t,e,n,i,r,o,a,l,c,h,u){const d=E_;if(d.set(0,0,1),i.vsub(n,d),d.lengthSquared()<=t.radius*t.radius){if(u)return!0;const g=this.createContactEquation(l,a,e,t,c,h);d.normalize(),g.rj.copy(d),g.rj.scale(t.radius,g.rj),g.ni.copy(d),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(t,e,n,i,r,o,a,l,c,h,u){const d=y_;d.set(0,0,1),a.quaternion.vmult(d,d);const m=M_;if(i.vsub(a.position,m),d.dot(m)<=0){if(u)return!0;const v=this.createContactEquation(l,a,e,t,c,h);v.ni.copy(d),v.ni.negate(v.ni),v.ri.set(0,0,0);const f=S_;d.scale(d.dot(i),f),i.vsub(f,f),v.rj.copy(f),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(t,e,n,i,r,o,a,l,c,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,r,o,a,l,t,e,u)}convexParticle(t,e,n,i,r,o,a,l,c,h,u){let d=-1;const m=b_,g=T_;let v=null;const f=w_;if(f.copy(i),f.vsub(n,f),r.conjugate(cc),cc.vmult(f,f),t.pointIsInside(f)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,r),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(r);for(let p=0,x=t.faces.length;p!==x;p++){const y=[t.worldVertices[t.faces[p][0]]],E=t.worldFaceNormals[p];i.vsub(y[0],hc);const P=-E.dot(hc);if(v===null||Math.abs(P)<Math.abs(v)){if(u)return!0;v=P,d=p,m.copy(E)}}if(d!==-1){const p=this.createContactEquation(l,a,e,t,c,h);m.scale(v,g),g.vadd(i,g),g.vsub(n,g),p.rj.copy(g),m.negate(p.ni),p.ri.set(0,0,0);const x=p.ri,y=p.rj;x.vadd(i,x),x.vsub(l.position,x),y.vadd(n,y),y.vsub(a.position,y),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,r,o,a,l,c,h,u){return this.convexHeightfield(e,t,i,n,o,r,l,a,c,h,u)}particleCylinder(t,e,n,i,r,o,a,l,c,h,u){return this.convexParticle(e,t,i,n,o,r,l,a,c,h,u)}sphereTrimesh(t,e,n,i,r,o,a,l,c,h,u){const d=Uv,m=Fv,g=Ov,v=Bv,f=zv,p=Gv,x=Wv,y=Nv,E=Dv,P=Xv;te.pointToLocalFrame(i,o,n,f);const w=t.radius;x.lowerBound.set(f.x-w,f.y-w,f.z-w),x.upperBound.set(f.x+w,f.y+w,f.z+w),e.getTrianglesInAABB(x,P);const C=Iv,z=t.radius*t.radius;for(let N=0;N<P.length;N++)for(let L=0;L<3;L++)if(e.getVertex(e.indices[P[N]*3+L],C),C.vsub(f,E),E.lengthSquared()<=z){if(y.copy(C),te.pointToWorldFrame(i,o,y,C),C.vsub(n,E),u)return!0;let D=this.createContactEquation(a,l,t,e,c,h);D.ni.copy(E),D.ni.normalize(),D.ri.copy(D.ni),D.ri.scale(t.radius,D.ri),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),D.rj.copy(C),D.rj.vsub(l.position,D.rj),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}for(let N=0;N<P.length;N++)for(let L=0;L<3;L++){e.getVertex(e.indices[P[N]*3+L],d),e.getVertex(e.indices[P[N]*3+(L+1)%3],m),m.vsub(d,g),f.vsub(m,p);const D=p.dot(g);f.vsub(d,p);let I=p.dot(g);if(I>0&&D<0&&(f.vsub(d,p),v.copy(g),v.normalize(),I=p.dot(v),v.scale(I,p),p.vadd(d,p),p.distanceTo(f)<t.radius)){if(u)return!0;const G=this.createContactEquation(a,l,t,e,c,h);p.vsub(f,G.ni),G.ni.normalize(),G.ni.scale(t.radius,G.ri),G.ri.vadd(n,G.ri),G.ri.vsub(a.position,G.ri),te.pointToWorldFrame(i,o,p,p),p.vsub(l.position,G.rj),te.vectorToWorldFrame(o,G.ni,G.ni),te.vectorToWorldFrame(o,G.ri,G.ri),this.result.push(G),this.createFrictionEquationsFromContact(G,this.frictionResult)}}const S=kv,T=Hv,B=Vv,F=Lv;for(let N=0,L=P.length;N!==L;N++){e.getTriangleVertices(P[N],S,T,B),e.getNormal(P[N],F),f.vsub(S,p);let D=p.dot(F);if(F.scale(D,p),f.vsub(p,p),D=p.distanceTo(f),ve.pointInTriangle(p,S,T,B)&&D<t.radius){if(u)return!0;let I=this.createContactEquation(a,l,t,e,c,h);p.vsub(f,I.ni),I.ni.normalize(),I.ni.scale(t.radius,I.ri),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),te.pointToWorldFrame(i,o,p,p),p.vsub(l.position,I.rj),te.vectorToWorldFrame(o,I.ni,I.ni),te.vectorToWorldFrame(o,I.ri,I.ri),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}}P.length=0}planeTrimesh(t,e,n,i,r,o,a,l,c,h,u){const d=new M,m=Cv;m.set(0,0,1),r.vmult(m,m);for(let g=0;g<e.vertices.length/3;g++){e.getVertex(g,d);const v=new M;v.copy(d),te.pointToWorldFrame(i,o,v,d);const f=Rv;if(d.vsub(n,f),m.dot(f)<=0){if(u)return!0;const x=this.createContactEquation(a,l,t,e,c,h);x.ni.copy(m);const y=Pv;m.scale(f.dot(m),y),d.vsub(y,y),x.ri.copy(y),x.ri.vsub(a.position,x.ri),x.rj.copy(d),x.rj.vsub(l.position,x.rj),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}}}const fi=new M,Hi=new M,Vi=new M,wv=new M,bv=new M,Tv=new _e,Av=new _e,Cv=new M,Rv=new M,Pv=new M,Lv=new M,Dv=new M;new M;const Iv=new M,Nv=new M,Uv=new M,Fv=new M,Ov=new M,Bv=new M,zv=new M,Gv=new M,kv=new M,Hv=new M,Vv=new M,Wv=new en,Xv=[],or=new M,lc=new M,qv=new M,Yv=new M,jv=new M;function $v(s,t,e){let n=null;const i=s.length;for(let r=0;r!==i;r++){const o=s[r],a=qv;s[(r+1)%i].vsub(o,a);const l=Yv;a.cross(t,l);const c=jv;e.vsub(o,c);const h=l.dot(c);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const ar=new M,Kv=new M,Zv=new M,Jv=new M,Qv=[new M,new M,new M,new M,new M,new M],t_=new M,e_=new M,n_=new M,i_=new M,s_=new M,r_=new M,o_=new M,a_=new M,l_=new M,c_=new M,h_=new M,d_=new M,u_=new M,f_=new M;new M;new M;const p_=new M,m_=new M,g_=new M,v_=new M,__=new M,x_=new M,y_=new M,M_=new M,S_=new M,E_=new M,cc=new _e,w_=new M;new M;const b_=new M,hc=new M,T_=new M,A_=new M,C_=new M,R_=[0],P_=new M,L_=new M;class dc{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let r=0;for(;n>i[r];)r++;if(n!==i[r]){for(let o=i.length-1;o>=r;o--)i[o+1]=i[o];i[r]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,r=n.length,o=i.length;let a=0;for(let l=0;l<r;l++){let c=!1;const h=n[l];for(;h>i[a];)a++;c=h===i[a],c||uc(t,h)}a=0;for(let l=0;l<o;l++){let c=!1;const h=i[l];for(;h>n[a];)a++;c=n[a]===h,c||uc(e,h)}}}function uc(s,t){s.push((t&4294901760)>>16,t&65535)}const Eo=(s,t)=>s<t?`${s}-${t}`:`${t}-${s}`;class D_{constructor(){this.data={keys:[]}}get(t,e){const n=Eo(t,e);return this.data[n]}set(t,e,n){const i=Eo(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=Eo(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class I_ extends fh{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new M,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new M,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new Og,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new vv,this.constraints=[],this.narrowphase=new Ev(this),this.collisionMatrix=new Zl,this.collisionMatrixPrevious=new Zl,this.bodyOverlapKeeper=new dc,this.shapeOverlapKeeper=new dc,this.contactmaterials=[],this.contactMaterialTable=new D_,this.defaultMaterial=new Qn("default"),this.defaultContactMaterial=new ss(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof wr?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=ve.ALL,n.from=t,n.to=e,n.callback=i,wo.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=ve.ANY,n.from=t,n.to=e,n.result=i,wo.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=ve.CLOSEST,n.from=t,n.to=e,n.result=i,wo.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof mt&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let r=0;r!==n.length;r++)n[r].index=r;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let r=0;r<i.length;r++){const o=i[r];if(o.id===t)return o}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=xe.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=xe.now();let r=0;for(;this.accumulator>=t&&r<n&&(this.internalStep(t),this.accumulator-=t,r++,!(xe.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const o=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const l=this.bodies[a];l.previousPosition.lerp(l.position,o,l.interpolatedPosition),l.previousQuaternion.slerp(l.quaternion,o,l.interpolatedQuaternion),l.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=B_,i=z_,r=this.bodies.length,o=this.bodies,a=this.solver,l=this.gravity,c=this.doProfiling,h=this.profile,u=mt.DYNAMIC;let d=-1/0;const m=this.constraints,g=O_;l.length();const v=l.x,f=l.y,p=l.z;let x=0;for(c&&(d=xe.now()),x=0;x!==r;x++){const N=o[x];if(N.type===u){const L=N.force,D=N.mass;L.x+=D*v,L.y+=D*f,L.z+=D*p}}for(let N=0,L=this.subsystems.length;N!==L;N++)this.subsystems[N].update();c&&(d=xe.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),c&&(h.broadphase=xe.now()-d);let y=m.length;for(x=0;x!==y;x++){const N=m[x];if(!N.collideConnected)for(let L=n.length-1;L>=0;L-=1)(N.bodyA===n[L]&&N.bodyB===i[L]||N.bodyB===n[L]&&N.bodyA===i[L])&&(n.splice(L,1),i.splice(L,1))}this.collisionMatrixTick(),c&&(d=xe.now());const E=F_,P=e.length;for(x=0;x!==P;x++)E.push(e[x]);e.length=0;const w=this.frictionEquations.length;for(x=0;x!==w;x++)g.push(this.frictionEquations[x]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,E,this.frictionEquations,g),c&&(h.narrowphase=xe.now()-d),c&&(d=xe.now()),x=0;x<this.frictionEquations.length;x++)a.addEquation(this.frictionEquations[x]);const C=e.length;for(let N=0;N!==C;N++){const L=e[N],D=L.bi,I=L.bj,V=L.si,G=L.sj;let H;if(D.material&&I.material?H=this.getContactMaterial(D.material,I.material)||this.defaultContactMaterial:H=this.defaultContactMaterial,H.friction,D.material&&I.material&&(D.material.friction>=0&&I.material.friction>=0&&D.material.friction*I.material.friction,D.material.restitution>=0&&I.material.restitution>=0&&(L.restitution=D.material.restitution*I.material.restitution)),a.addEquation(L),D.allowSleep&&D.type===mt.DYNAMIC&&D.sleepState===mt.SLEEPING&&I.sleepState===mt.AWAKE&&I.type!==mt.STATIC){const K=I.velocity.lengthSquared()+I.angularVelocity.lengthSquared(),Q=I.sleepSpeedLimit**2;K>=Q*2&&(D.wakeUpAfterNarrowphase=!0)}if(I.allowSleep&&I.type===mt.DYNAMIC&&I.sleepState===mt.SLEEPING&&D.sleepState===mt.AWAKE&&D.type!==mt.STATIC){const K=D.velocity.lengthSquared()+D.angularVelocity.lengthSquared(),Q=D.sleepSpeedLimit**2;K>=Q*2&&(I.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(D,I,!0),this.collisionMatrixPrevious.get(D,I)||(vs.body=I,vs.contact=L,D.dispatchEvent(vs),vs.body=D,I.dispatchEvent(vs)),this.bodyOverlapKeeper.set(D.id,I.id),this.shapeOverlapKeeper.set(V.id,G.id)}for(this.emitContactEvents(),c&&(h.makeContactConstraints=xe.now()-d,d=xe.now()),x=0;x!==r;x++){const N=o[x];N.wakeUpAfterNarrowphase&&(N.wakeUp(),N.wakeUpAfterNarrowphase=!1)}for(y=m.length,x=0;x!==y;x++){const N=m[x];N.update();for(let L=0,D=N.equations.length;L!==D;L++){const I=N.equations[L];a.addEquation(I)}}a.solve(t,this),c&&(h.solve=xe.now()-d),a.removeAllEquations();const z=Math.pow;for(x=0;x!==r;x++){const N=o[x];if(N.type&u){const L=z(1-N.linearDamping,t),D=N.velocity;D.scale(L,D);const I=N.angularVelocity;if(I){const V=z(1-N.angularDamping,t);I.scale(V,I)}}}this.dispatchEvent(U_),c&&(d=xe.now());const T=this.stepnumber%(this.quatNormalizeSkip+1)===0,B=this.quatNormalizeFast;for(x=0;x!==r;x++)o[x].integrate(t,T,B);this.clearForces(),this.broadphase.dirty=!0,c&&(h.integrate=xe.now()-d),this.stepnumber+=1,this.dispatchEvent(N_);let F=!0;if(this.allowSleep)for(F=!1,x=0;x!==r;x++){const N=o[x];N.sleepTick(this.time),N.sleepState!==mt.SLEEPING&&(F=!0)}this.hasActiveBodies=F}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(Un,Fn),t){for(let r=0,o=Un.length;r<o;r+=2)_s.bodyA=this.getBodyById(Un[r]),_s.bodyB=this.getBodyById(Un[r+1]),this.dispatchEvent(_s);_s.bodyA=_s.bodyB=null}if(e){for(let r=0,o=Fn.length;r<o;r+=2)xs.bodyA=this.getBodyById(Fn[r]),xs.bodyB=this.getBodyById(Fn[r+1]),this.dispatchEvent(xs);xs.bodyA=xs.bodyB=null}Un.length=Fn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(Un,Fn),n){for(let r=0,o=Un.length;r<o;r+=2){const a=this.getShapeById(Un[r]),l=this.getShapeById(Un[r+1]);On.shapeA=a,On.shapeB=l,a&&(On.bodyA=a.body),l&&(On.bodyB=l.body),this.dispatchEvent(On)}On.bodyA=On.bodyB=On.shapeA=On.shapeB=null}if(i){for(let r=0,o=Fn.length;r<o;r+=2){const a=this.getShapeById(Fn[r]),l=this.getShapeById(Fn[r+1]);Bn.shapeA=a,Bn.shapeB=l,a&&(Bn.bodyA=a.body),l&&(Bn.bodyB=l.body),this.dispatchEvent(Bn)}Bn.bodyA=Bn.bodyB=Bn.shapeA=Bn.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new en;const wo=new ve,xe=globalThis.performance||{};if(!xe.now){let s=Date.now();xe.timing&&xe.timing.navigationStart&&(s=xe.timing.navigationStart),xe.now=()=>Date.now()-s}new M;const N_={type:"postStep"},U_={type:"preStep"},vs={type:mt.COLLIDE_EVENT_NAME,body:null,contact:null},F_=[],O_=[],B_=[],z_=[],Un=[],Fn=[],_s={type:"beginContact",bodyA:null,bodyB:null},xs={type:"endContact",bodyA:null,bodyB:null},On={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Bn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class G_{constructor(){this.world=new I_,this.world.gravity.set(0,-9.82,0),this.world.broadphase=new qi(this.world),this.world.allowSleep=!0,this.world.solver.iterations=10,this.materials={ground:new Qn("ground"),car:new Qn("car"),obstacle:new Qn("obstacle"),debris:new Qn("debris")};const t=new ss(this.materials.car,this.materials.ground,{friction:.3,restitution:.1});this.world.addContactMaterial(t);const e=new ss(this.materials.car,this.materials.obstacle,{friction:.5,restitution:.2});this.world.addContactMaterial(e),this.bodies=new Map,this.initGround()}initGround(){const t=new mt({mass:0,shape:new mv,material:this.materials.ground});t.quaternion.setFromAxisAngle(new M(1,0,0),-Math.PI/2),this.world.addBody(t)}addBody(t,e="box",n={}){if(!t)return null;const i=this.createShape(t,e,n);if(!i)return null;const r=new mt({mass:n.mass||0,position:new M(t.position.x,t.position.y,t.position.z),material:this.materials[n.material]||this.materials.obstacle});return r.addShape(i),r.quaternion.set(t.quaternion.x,t.quaternion.y,t.quaternion.z,t.quaternion.w),n.velocity&&r.velocity.copy(n.velocity),r.userData={mesh:t},this.world.addBody(r),this.bodies.set(t.uuid,r),r}addKinematicBody(t,e="box",n={}){const i=this.addBody(t,e,{...n,mass:0});return i?(i.type=mt.KINEMATIC,i.updateMassProperties(),i):null}createShape(t,e,n){if(!n.size){t.geometry.computeBoundingBox();const i=t.geometry.boundingBox;n.size={width:i.max.x-i.min.x,height:i.max.y-i.min.y,depth:i.max.z-i.min.z}}switch(e){case"box":const i=new M(n.size.width/2,n.size.height/2,n.size.depth/2);return new As(i);case"sphere":return new fv(Math.max(n.size.width,n.size.depth)/2);case"cylinder":return new pv(n.size.width/2,n.size.width/2,n.size.height,8);default:return new As(new M(1,1,1))}}removeBody(t){if(!t||!this.bodies.has(t.uuid))return;const e=this.bodies.get(t.uuid);this.world.removeBody(e),this.bodies.delete(t.uuid)}syncKinematicBody(t,e=null){if(!t||!this.bodies.has(t.uuid))return;const n=this.bodies.get(t.uuid);n.type===mt.KINEMATIC&&(n.position.set(t.position.x,t.position.y,t.position.z),n.quaternion.set(t.quaternion.x,t.quaternion.y,t.quaternion.z,t.quaternion.w),e&&n.velocity.set(e.x||0,e.y||0,e.z||0))}applyImpulse(t,e){if(!t||!this.bodies.has(t.uuid))return;const n=this.bodies.get(t.uuid),i=new M(e.x||0,e.y||0,e.z||0);n.applyImpulse(i,n.position)}update(t){this.world.step(1/60,t,3),this.bodies.forEach(e=>{if(!e.userData||!e.userData.mesh||e.type===mt.KINEMATIC)return;const n=e.userData.mesh;n.position.set(e.position.x,e.position.y,e.position.z),n.quaternion.set(e.quaternion.x,e.quaternion.y,e.quaternion.z,e.quaternion.w)})}checkCollisions(){}}const yi=new G_,fc=new O,k_=new as,lr=new O;let br={triggerDamageEffect:()=>{},updateHealthUI:()=>{}};function H_(s){br={...br,...s}}let J;function Sh(s=16711680,t="standard"){const e=new je;if(e.position.set(0,0,0),t==="tank"){const n=new Ot(26,14,50),i=new At({color:s}),r=new rt(n,i);r.position.y=7,r.castShadow=!0,r.receiveShadow=!0,r.name="carBody",e.add(r);const o=new Ot(16,8,20),a=new Bt(s).multiplyScalar(.8),l=new At({color:a}),c=new rt(o,l);c.position.set(0,18,0),c.castShadow=!0,c.receiveShadow=!0,c.name="carRoof",e.add(c);const h=new Be(2,2,30,16),u=new At({color:3355443}),d=new rt(h,u);d.rotation.x=-Math.PI/2,d.position.set(0,18,20),d.castShadow=!0,e.add(d);const m=new Ot(6,12,48),g=new At({color:1118481}),v=new rt(m,g);v.position.set(-14,6,0),e.add(v);const f=new rt(m,g);f.position.set(14,6,0),e.add(f)}else if(t==="ufo"){const n=new Be(15,25,8,32),i=new Vl({color:s,shininess:100,emissive:2236962}),r=new rt(n,i);r.position.y=10,r.castShadow=!0,r.name="carBody",e.add(r);const o=new Hn(8,32,16,0,Math.PI*2,0,Math.PI/2),a=new Vl({color:8965375,transparent:!0,opacity:.8,shininess:150}),l=new rt(o,a);l.position.y=12,e.add(l);const c=new Hn(1,8,8),h=new me({color:65280});for(let u=0;u<8;u++){const d=new rt(c,h),m=u/8*Math.PI*2;d.position.set(Math.cos(m)*22,10,Math.sin(m)*22),e.add(d)}}else{const n=new rt(fe.carBody,new At({color:s}));n.position.y=6,n.castShadow=!0,n.receiveShadow=!0,n.name="carBody",e.add(n);const i=new Bt(s).multiplyScalar(.8),r=new rt(fe.carRoof,new At({color:i}));r.position.set(0,16,-5),r.castShadow=!0,r.receiveShadow=!0,r.name="carRoof",e.add(r);const o=new rt(fe.window,Ae.window);o.position.set(0,16,5),e.add(o);const a=new rt(fe.window,Ae.window);a.position.set(0,16,-12),e.add(a);const l=[[-12,5,12],[12,5,12],[-12,5,-12],[12,5,-12]];e.userData.wheels=[],l.forEach((c,h)=>{const u=new rt(fe.wheel,Ae.wheel);u.rotation.z=Math.PI/2,u.position.set(...c),u.userData.baseY=c[1],u.userData.wobbleOffset=h*Math.PI/2,e.userData.wheels.push(u),e.add(u)})}return gt.add(e),J=e,k_.setFromObject(e).getSize(lr),yi.addKinematicBody(e,"box",{material:"car",size:{width:lr.x,height:lr.y,depth:lr.z}}),e}function ua(s=null){J&&gt.remove(J);const t=Vn[_.selectedCar],e=s!==null?s:t.color;Sh(e,t.type)}function V_(s){if(!J)return;const t=J.getObjectByName("carBody"),e=J.getObjectByName("carRoof");t&&t.material.color.setHex(s),e&&e.material.color.setHex(s).multiplyScalar(.8)}function pc(s){const t=Vn[s];_.maxSpeed=t.maxSpeed,_.acceleration=t.acceleration,_.handling=t.handling,V_(t.color)}function Zi(s){_.arrested||(_.selectedCar==="tank"&&(s*=.2),_.selectedCar==="ufo"&&(s*=.5),_.health-=s,br.triggerDamageEffect(),br.updateHealthUI(),_.health<=0&&(_.health=0))}function W_(s,t){if(!J||_.arrested)return;if(_.health<=0){_.speed*=.95,Math.abs(_.speed)<1&&(_.speed=0),J.position.x+=_.velocityX*s*.5,J.position.z+=_.velocityZ*s*.5,_.velocityX*=.95,_.velocityZ*=.95,Math.random()<.3&&Fe(J.position);return}let e=Math.max(0,_.health)/100;e=Math.min(1,e);const n=.2+.8*e;let i=_.maxSpeed*n;_.health>0&&i<10&&(i=10);const r=_.handling||.05,o=Math.abs(_.speed),a=o/_.maxSpeed;let l=0;if((un.a||un.arrowleft)&&(l=1),(un.d||un.arrowright)&&(l=-1),_.health<30&&_.health>0&&Math.random()<.05&&(l+=(Math.random()-.5)*1.5),un.w||un.arrowup){const w=1-a*.3;_.speed<i?_.speed=Math.min(_.speed+_.acceleration*w*s,i):_.speed*=Math.pow(.95,s)}(un.s||un.arrowdown)&&(_.speed>0?_.speed=Math.max(0,_.speed-_.acceleration*2*s):_.speed=Math.max(_.speed-_.acceleration*.5*s,-30));const c=un[" "];if(c){const w=o>30?.985:.97;_.speed*=Math.pow(w,s);const C=o>15?.2:.08;_.driftFactor=Math.min(_.driftFactor+C*s,.95)}else _.driftFactor=Math.max(_.driftFactor-.06*s,0);const h=Math.max(.25,1.4-a*1.1),u=.25+Math.min(o,50)/50,d=r*h*(1+_.driftFactor*.8),m=l*d*u;_.angularVelocity+=(m-_.angularVelocity)*.15*s,_.angularVelocity*=.92,J.rotation.y+=_.angularVelocity*s;const g=Math.sin(J.rotation.y),v=Math.cos(J.rotation.y),f=1-Math.min(.95,_.driftFactor+(c?.15:0));let p=g*_.speed,x=v*_.speed;if(_.driftFactor>.1&&o>10){const w=Math.cos(J.rotation.y),C=-Math.sin(J.rotation.y),z=_.driftFactor*l*o*.35;p+=w*z,x+=C*z,c&&Math.random()<.25&&(fc.set(J.position.x-g*12,J.position.y+2,J.position.z-v*12),Fe(fc,.6))}_.velocityX+=(p-_.velocityX)*(.1+f*.15)*s,_.velocityZ+=(x-_.velocityZ)*(.1+f*.15)*s,_.speed*=Math.pow(_.friction,s),_.velocityX*=Math.pow(.98,s),_.velocityZ*=Math.pow(.98,s);const y=_.slowEffect>0?1-_.slowEffect:1;_.health<30&&Math.random()<.1&&Fe(J.position),_.health<=0&&Math.random()<.3&&(Fe(J.position),Math.random()<.1&&la()),J.position.x+=_.velocityX*s*y,J.position.z+=_.velocityZ*s*y,yi.syncKinematicBody(J,{x:_.velocityX,y:0,z:_.velocityZ}),_.wheelAngle=l*.4;const E=-_.angularVelocity*a*.3;_.carTilt+=(E-_.carTilt)*.1*s,J.rotation.z=_.carTilt,_.driftFactor>.2&&o>10&&hg(J.position.x,J.position.z,J.rotation.y),dg(),J.userData.wheels&&J.userData.wheels.forEach(w=>{const C=Math.sin(t*.05+w.userData.wobbleOffset)*.3,z=o>30?(Math.random()-.5)*(o/100):0;w.position.y=w.userData.baseY+C+z});const P=4e3;J.position.x=Math.max(-P,Math.min(P,J.position.x)),J.position.z=Math.max(-P,Math.min(P,J.position.z))}function fa(s=65280,t="standard"){const e=new je;if(t==="tank"){const n=new Ot(26,14,50),i=new At({color:s}),r=new rt(n,i);r.position.y=7,r.castShadow=!0,r.receiveShadow=!0,e.add(r);const o=new Ot(16,8,20),a=new At({color:new Bt(s).multiplyScalar(.8)}),l=new rt(o,a);l.position.set(0,18,0),l.castShadow=!0,e.add(l);const c=new Be(2,2,30,16),h=new At({color:3355443}),u=new rt(c,h);u.rotation.x=-Math.PI/2,u.position.set(0,18,20),u.castShadow=!0,e.add(u);const d=new Ot(6,12,48),m=new At({color:1118481}),g=new rt(d,m);g.position.set(-14,6,0),e.add(g);const v=new rt(d,m);v.position.set(14,6,0),e.add(v)}else if(t==="ufo"){const n=new Be(18,22,8,32),i=new At({color:s}),r=new rt(n,i);r.position.y=15,r.castShadow=!0,e.add(r);const o=new Hn(10,32,16,0,Math.PI*2,0,Math.PI/2),a=new At({color:8965375,transparent:!0,opacity:.7}),l=new rt(o,a);l.position.y=19,e.add(l);const c=new aa(20,1.5,8,16),h=new me({color:65535}),u=new rt(c,h);u.rotation.x=Math.PI/2,u.position.y=15,e.add(u)}else{const n=fe.carBody||new Ot(20,8,40),i=new At({color:s}),r=new rt(n,i);r.position.y=6,r.castShadow=!0,r.receiveShadow=!0,e.add(r);const o=fe.carRoof||new Ot(16,6,20),a=new At({color:new Bt(s).multiplyScalar(.8)}),l=new rt(o,a);l.position.set(0,13,-2),l.castShadow=!0,e.add(l);const c=fe.wheel||new Be(4,4,3,16),h=Ae.wheel||new At({color:1118481});[{x:-10,y:4,z:12},{x:10,y:4,z:12},{x:-10,y:4,z:-12},{x:10,y:4,z:-12}].forEach(d=>{const m=new rt(c,h);m.rotation.z=Math.PI/2,m.position.set(d.x,d.y,d.z),m.castShadow=!0,e.add(m)})}return gt.add(e),e}function X_(s,t){if(!(!s||!t)){if(!s.userData.targetState){s.userData.targetState={...t},s.position.set(t.x,t.y,t.z),s.rotation.y=t.rotY!==void 0?t.rotY:t.rotation;return}s.userData.targetState={x:t.x,y:t.y,z:t.z,rotY:t.rotY!==void 0?t.rotY:t.rotation,timestamp:Date.now()}}}const cr=new O,mc=new O;function q_(s){_.otherPlayers.forEach(e=>{if(!e.mesh||!e.mesh.userData.targetState)return;const n=e.mesh,i=n.userData.targetState;cr.set(i.x,i.y,i.z),mc.copy(n.position);const r=mc.distanceTo(cr);r>50?n.position.copy(cr):n.position.lerp(cr,10*s);let o=n.rotation.y,l=i.rotY-o;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;if(n.rotation.y+=l*10*s,e.mesh.userData.wheels&&r>.1){const c=r*2;e.mesh.userData.wheels.forEach(h=>{h.rotation.x+=c*s})}})}function Y_(s){s&&gt.remove(s)}function j_(s,t){const e=parseInt(s.replace("#",""),16),n=Math.round(2.55*t),i=Math.max(0,(e>>16)-n),r=Math.max(0,(e>>8&255)-n),o=Math.max(0,(e&255)-n);return"#"+(16777216+i*65536+r*256+o).toString(16).slice(1)}function $_(s){for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return s}function Eh(s,t,e){return Math.max(t,Math.min(e,s))}let zo=null,gc=!1,En=null,ys=null;function K_(s){zo=s}const lt={speed:document.getElementById("speed"),speedFill:document.getElementById("speedFill"),time:document.getElementById("time"),heatLevel:document.getElementById("heatLevel"),policeCount:document.getElementById("policeCount"),deadPoliceCount:document.getElementById("deadPoliceCount"),money:document.getElementById("money"),policeDistance:document.getElementById("policeDistance"),status:document.getElementById("status"),gameOver:document.getElementById("gameOver"),gameOverMessage:document.getElementById("gameOverMessage"),gameOverTime:document.getElementById("gameOverTime"),gameOverMoney:document.getElementById("gameOverMoney"),gameOverPoliceKilled:document.getElementById("gameOverPoliceKilled"),gameOverMaxHeat:document.getElementById("gameOverMaxHeat"),shop:document.getElementById("shop"),shopMoney:document.getElementById("shopMoney"),carList:document.getElementById("carList"),driftIndicator:document.getElementById("driftIndicator"),healthValue:document.getElementById("healthValue"),healthFill:document.getElementById("healthFill"),playBtn:document.getElementById("playBtn"),gameOverShopBtn:document.getElementById("gameOverShopBtn")};function Z_(s){const t=Math.round(_.speed*3.6);lt.speed.textContent=t,lt.speedFill.style.width=Eh(_.speed/_.maxSpeed*100,0,100)+"%",_.speed>_.maxSpeedWarning?lt.speedFill.style.background="linear-gradient(to right, #ffff00, #ff0000)":lt.speedFill.style.background="linear-gradient(to right, #00ff00, #ffff00, #ff0000)",_.driftFactor>.3?(lt.driftIndicator.style.display="block",lt.driftIndicator.style.opacity=Math.min(1,_.driftFactor*1.5)):lt.driftIndicator.style.display="none";const e=Date.now();let n;_.arrested&&_.elapsedTime?n=Math.floor(_.elapsedTime):n=Math.floor((e-_.startTime)/1e3),lt.time.textContent=n,lt.heatLevel.textContent=_.heatLevel;let i=0;for(let a=0;a<_.policeCars.length;a++)_.policeCars[a].userData.dead&&i++;const r=_.policeCars.length-i;lt.policeCount.textContent=r,lt.deadPoliceCount.textContent=i;const o=["#00ff00","#99ff00","#ffff00","#ff8800","#ff4400","#ff0000"][_.heatLevel-1]||"#ff0000";if(lt.heatLevel.style.color=o,_.elapsedTime=n,n>0&&n%ye.passiveIncomeInterval===0&&e-_.lastMoneyCheckTime>500){const a=(_.rebirthPoints||0)+1;Kn(ye.passiveIncomeBase*_.heatLevel*a),_.lastMoneyCheckTime=e}lt.money.textContent=_.money,s>0&&(lt.policeDistance.textContent=Math.round(s),_.arrestCountdown>0?(lt.status.textContent=`ANHOLDELSE: ${Math.ceil(_.arrestCountdown)}`,lt.status.style.color="#ff0000",lt.status.style.fontSize="24px",lt.status.style.animation="pulse 0.5s infinite"):s<_.arrestDistance+100?(lt.status.textContent="I FARE!",lt.status.style.color="#ff0000",lt.status.style.fontSize="",lt.status.style.animation=""):(lt.status.textContent="Fri",lt.status.style.color="#00ff00",lt.status.style.fontSize="",lt.status.style.animation=""))}function Kn(s){s<=0||_.arrested||Math.abs(_.speed)/_.maxSpeed<.05||(_.money+=s,lt.money.parentElement.classList.remove("hud-money-pop"),lt.money.parentElement.offsetWidth,lt.money.parentElement.classList.add("hud-money-pop"))}function vc(s){_.policeCars.forEach(a=>gt.remove(a)),_.policeCars=[],_.collectibles.forEach(a=>gt.remove(a)),_.collectibles=[],_.projectiles.forEach(a=>gt.remove(a)),_.projectiles=[],lt.gameOverMessage.textContent="Du blev fanget af politiet og sat i fængsel!",lt.gameOver.style.display="block";const t=document.getElementById("gameOverRejoinBtn");t&&(t.style.display=_.isMultiplayer?"inline-block":"none");const e=document.getElementById("gameOverMpShopBtn");e&&(e.style.display=_.isMultiplayer?"inline-block":"none");const n=Math.round(_.elapsedTime),i=_.money,r=_.policeKilled||0,o=_.heatLevel;lt.gameOverTime.textContent="0",lt.gameOverMoney.textContent="0",lt.gameOverPoliceKilled.textContent="0",lt.gameOverMaxHeat.textContent="1",setTimeout(()=>hr(lt.gameOverTime,n,600),200),setTimeout(()=>hr(lt.gameOverMoney,i,800),400),setTimeout(()=>hr(lt.gameOverPoliceKilled,r,500),600),setTimeout(()=>hr(lt.gameOverMaxHeat,o,300),800)}function hr(s,t,e){const n=parseInt(s.textContent)||0,i=performance.now();function r(o){const a=o-i,l=Math.min(a/e,1),c=1-Math.pow(1-l,3),h=Math.round(n+(t-n)*c);s.textContent=h,l<1&&requestAnimationFrame(r)}requestAnimationFrame(r)}let fr=!1,Ms=null;function J_(s){Ms=s}function pa(s=!1){fr=s,_.totalMoney+=_.money,lt.shop.style.display="flex";const t=document.getElementById("respawnNotice");t&&(t.style.display=s?"block":"none"),lt.playBtn&&(s||_.isMultiplayer?lt.playBtn.textContent="🚀 SPAWN":lt.playBtn.textContent="🚀 KØR NU"),Q_(),Tr()}let Ss="all";function wh(s,t){return t.type==="tank"||t.type==="ufo"||t.reqRebirth?"special":t.price>=5e4?"premium":t.price>=5e3?"sport":t.price<5e3?"budget":"all"}function Q_(){if(gc)return;gc=!0;const s=document.querySelectorAll(".shop-tab");s.forEach(t=>{t.addEventListener("click",()=>{s.forEach(e=>e.classList.remove("active")),t.classList.add("active"),Ss=t.dataset.category,Tr()})})}function tx(){let s={all:0,budget:0,sport:0,premium:0,special:0};Object.entries(Vn).forEach(([t,e])=>{if(e.reqRebirth&&(_.rebirthPoints||0)<e.reqRebirth)return;s.all++;const n=wh(t,e);s[n]!==void 0&&s[n]++}),Object.entries(s).forEach(([t,e])=>{const n=document.getElementById(`tabCount${t.charAt(0).toUpperCase()+t.slice(1)}`);n&&(n.textContent=e)})}function Tr(){if(lt.shopMoney.textContent=_.totalMoney.toLocaleString(),lt.carList.innerHTML="",tx(),(Ss==="all"||Ss==="special")&&_.heatLevel>=6&&_.totalMoney>=2e5&&(_.rebirthPoints||0)<5){const s=document.createElement("div");s.className="carCard",s.style.background="linear-gradient(135deg, rgba(255,0,255,0.2) 0%, rgba(0,255,255,0.2) 100%)",s.style.borderColor="rgba(255,0,255,0.5)",s.innerHTML=`
                <div class="car-preview-box" style="background: linear-gradient(135deg, #1a0a1a 0%, #0a1a1a 100%);">
                    <div style="font-size: 48px; animation: pulse 2s infinite;">✨</div>
                </div>
                <div class="card-content">
                    <h3>REBIRTH SYSTEM <span class="car-type-badge special">PRESTIGE</span></h3>
                    <div class="stats-container" style="text-align: center; color: #aaa;">
                        <p style="margin: 5px 0;">🔥 Kræver: Heat 6 + 200.000 kr</p>
                        <p style="margin: 5px 0;">🎁 Belønning: Special biler + 2x Penge</p>
                        <p style="margin: 5px 0; color: #ff00ff;">Rebirth Points: ${_.rebirthPoints||0}/5</p>
                    </div>
                </div>
                <div class="card-footer">
                    <span class="price-tag" style="color: #ff00ff;">200.000 kr</span>
                    <span class="action-indicator" style="background: linear-gradient(135deg, #ff00ff, #00ffff); color: #000;">REBIRTH NU</span>
                </div>
            `,s.addEventListener("click",()=>{confirm("Er du sikker? Dette nulstiller dine biler og penge, men låser op for nyt indhold!")&&ex()}),lt.carList.appendChild(s)}Object.entries(Vn).forEach(([s,t])=>{if(t.reqRebirth&&(_.rebirthPoints||0)<t.reqRebirth)return;const e=wh(s,t);if(Ss!=="all"&&e!==Ss)return;const n=_.ownedCars&&_.ownedCars[s]||s==="standard",i=_.selectedCar===s,r=_.totalMoney>=t.price;if(fr&&!n)return;const o=document.createElement("div");let a=["carCard"];n&&a.push("owned"),i&&a.push("selected"),n||(r?a.push("affordable"):a.push("expensive")),o.className=a.join(" ");const l=Math.min(t.maxSpeed/200*100,100),c=Math.min(t.acceleration/1.5*100,100),h=Math.min(t.handling/.2*100,100),u=Math.min((t.health||100)/500*100,100),d="#"+t.color.toString(16).padStart(6,"0"),m=j_(d,40);let g="",v="";i?(g="VALGT",v="✓"):n?(g="VÆLG",v="→"):r?(g="KØB",v="🛒"):(g="LÅST",v="🔒");let f="";e==="special"?f=`<span class="car-type-badge ${e==="special"?"special":""}">SPECIAL</span>`:e==="premium"?f='<span class="car-type-badge">PREMIUM</span>':e==="sport"&&(f='<span class="car-type-badge">SPORT</span>'),o.innerHTML=`
            <div class="car-preview-box">
                <div class="floor-grid"></div>
                <div class="car-model-3d">
                    <div class="car-body" style="background: linear-gradient(135deg, ${d} 0%, ${m} 100%);">
                        <div class="car-wheel front-left"></div>
                        <div class="car-wheel front-right"></div>
                        <div class="car-wheel back-left"></div>
                        <div class="car-wheel back-right"></div>
                        <div class="car-headlight left"></div>
                        <div class="car-headlight right"></div>
                        <div class="car-taillight left"></div>
                        <div class="car-taillight right"></div>
                    </div>
                </div>
            </div>
            
            <div class="card-content">
                <h3>${t.name} ${f}</h3>
                
                <div class="stats-container">
                    <div class="stat-row">
                        <span class="stat-icon">⚡</span>
                        <span class="stat-label">Fart</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill speed" style="width: ${l}%"></div></div>
                        <span class="stat-value">${Math.round(t.maxSpeed*3.6)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">🚀</span>
                        <span class="stat-label">Acc</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill accel" style="width: ${c}%"></div></div>
                        <span class="stat-value">${(t.acceleration*10).toFixed(1)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">🎯</span>
                        <span class="stat-label">Styr</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill handle" style="width: ${h}%"></div></div>
                        <span class="stat-value">${(t.handling*100).toFixed(0)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">❤️</span>
                        <span class="stat-label">HP</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill health" style="width: ${u}%"></div></div>
                        <span class="stat-value">${t.health||100}</span>
                    </div>
                </div>
            </div>

            <div class="card-footer">
                <span class="price-tag">${t.price>0?t.price.toLocaleString()+" kr":"GRATIS"}</span>
                <span class="action-indicator">${v} ${g}</span>
            </div>
        `,o.addEventListener("click",()=>{n?(_.selectedCar=s,pc(s),Tr(),fr&&Ms&&Ms(s)):r&&confirm(`Køb ${t.name} for ${t.price.toLocaleString()} kr?`)&&(_.totalMoney-=t.price,_.ownedCars||(_.ownedCars={}),_.ownedCars[s]=!0,_.selectedCar=s,pc(s),Tr(),fr&&Ms&&Ms(s))}),lt.carList.appendChild(o)})}function ex(){_.rebirthPoints=(_.rebirthPoints||0)+1,_.totalMoney=0,_.money=0,_.ownedCars={standard:!0},_.selectedCar="standard",zo&&zo(),_.rebirthPoints>0&&(gt.fog=new ra(1114163,.002),si.setClearColor(1114163),alert(`REBIRTH SUCCESSFUL! Count: ${_.rebirthPoints}
New Cars Unlocked!
Money gained is doubled!`))}function Ir(){lt.healthValue&&(lt.healthValue.textContent=Math.ceil(_.health)),lt.healthFill&&(lt.healthFill.style.width=Math.max(0,_.health)+"%",lt.healthFill.style.background=_.health<30?"#ff0000":_.health<60?"#ffa500":"#00ff00")}function nx(){lt.status&&(lt.status.style.color="red",setTimeout(()=>{!_.arrested&&lt.status.textContent!=="I FARE!"?lt.status.style.color="#00ff00":lt.status.textContent==="I FARE!"&&(lt.status.style.color="#ff0000")},200)),ix()}function ix(){En||(En=document.createElement("div"),En.style.cssText=`
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(255, 0, 0, 0.4);
            pointer-events: none;
            z-index: 1000;
            display: none;
        `,document.body.appendChild(En)),ys&&(clearTimeout(ys),ys=null),En.style.display="block",En.style.animation="none",En.offsetWidth,En.style.animation="flashFade 0.3s ease-out forwards",ys=setTimeout(()=>{En&&(En.style.display="none"),ys=null},300)}if(!document.getElementById("damageFlashStyle")){const s=document.createElement("style");s.id="damageFlashStyle",s.textContent=`
        @keyframes flashFade {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `,document.head.appendChild(s)}let Le=null,_n=!1,Cs=!1,pr=null,mr=new Map;const sx="SPIL";let pi=[],bh=null,rx=null,Go=null,ko=null,Ho=null,Vo=null,Wo=null,Xo=null,qo=null,Yo=null,jo=null,$o=null;async function ox(s=null){pi=[];const t=window.location.hostname;if(t==="localhost"||t==="127.0.0.1"){const l=await bo("localhost");return l&&pi.push(l),pi}const e=t.split(".");if(e.length!==4)return pi;const n=`${e[0]}.${e[1]}.${e[2]}`,i=await bo(t);i&&pi.push(i);const r=[],o=[1,2,100,101,102,103,104,105,50,51,52];for(const l of o){const c=`${n}.${l}`;c!==t&&r.push(bo(c))}return s&&s(0,o.length),(await Promise.all(r)).forEach(l=>{l&&pi.push(l)}),s&&s(o.length,o.length),pi}async function bo(s){try{const t=new AbortController,e=setTimeout(()=>t.abort(),500),n=await fetch(`http://${s}:3000/api/discover`,{signal:t.signal});if(clearTimeout(e),n.ok){const i=await n.json();return{ip:s,...i}}}catch{}return null}function ax(s){bh=s}function lx(){const s=window.location.protocol==="https:"?"wss:":"ws:",t=bh||window.location.hostname;return`${s}//${t}:3001`}function cx(){return new Promise((s,t)=>{try{Le=new WebSocket(lx()),Le.onopen=()=>{_n=!0,console.log("Connected to multiplayer server"),s()},Le.onclose=()=>{_n=!1,console.log("Disconnected from server")},Le.onerror=e=>{console.error("WebSocket error:",e),t(e)},Le.onmessage=e=>{try{const n=JSON.parse(e.data);hx(n)}catch(n){console.error("Message parse error:",n)}}}catch(e){t(e)}})}function hx(s){switch(s.type){case"joined":Cs=s.isHost||!1,pr=s.playerId,s.roomCode,Go&&Go(s.roomCode,s.playerId,s.players,s.isHost);break;case"playerJoined":ko&&ko(s.player,s.players,s.dropIn);break;case"playerLeft":mr.delete(s.playerId),Ho&&Ho(s.playerId,s.playerName);break;case"hostChanged":s.newHostId===pr&&(Cs=!0,console.log("You are now the host!")),$o&&$o(s.newHostId,s.newHostName);break;case"gameStart":Vo&&Vo(s.players,s.config,s.dropIn);break;case"gameReset":break;case"playerState":s.playerId!==pr&&(mr.set(s.playerId,{...mr.get(s.playerId),state:s.state}),Wo&&Wo(s.playerId,s.state));break;case"policeState":Xo&&Xo(s.police);break;case"gameEvent":qo&&qo(s.playerId,s.event,s.data);break;case"chat":break;case"error":console.error("Server error:",s.message),Yo&&Yo(s.message);break;case"respawned":jo&&jo(s.spawnPos,s.car,s.resetHeat);break}}function dx(s,t="standard",e=null){_n&&Le.send(JSON.stringify({type:"join",roomCode:e||sx,playerName:s,car:t}))}function ux(s={}){!_n||!Cs||Le.send(JSON.stringify({type:"startGame",config:s}))}let _c=0;const fx=50;function px(s){if(!_n)return;const t=performance.now();t-_c<fx||(_c=t,Le.send(JSON.stringify({type:"playerState",state:s})))}let xc=0;const mx=100;function gx(s){if(!_n||!Cs)return;const t=performance.now();t-xc<mx||(xc=t,Le.send(JSON.stringify({type:"policeState",police:s})))}function yc(s,t){_n&&Le.send(JSON.stringify({type:"gameEvent",event:s,data:t}))}function vx(){_n&&Le.send(JSON.stringify({type:"respawn"}))}function Th(s){_n&&Le.send(JSON.stringify({type:"respawn",car:s}))}function _x(s){Go=s}function xx(s){ko=s}function yx(s){Ho=s}function Mx(s){Vo=s}function Sx(s){Wo=s}function Ex(s){Xo=s}function wx(s){qo=s}function bx(s){Yo=s}function Tx(s){jo=s}function Ax(s){$o=s}function Cx(){return _n&&Le&&Le.readyState===1}function Ji(){Le&&(Le.close(),Le=null),_n=!1,Cs=!1,pr=null,mr.clear()}const Ah=new Hn(2,8,8);function Ch(s="standard"){const t=dh[s],e=new je;e.position.set(0,0,-500),e.scale.set(t.scale,t.scale,t.scale),e.userData={type:s,speed:t.speed,health:t.health,maxHealth:t.health};const n=t.bodyMaterial||new At({color:t.color}),i=new rt(fe.carBody,n);if(i.position.y=6,i.castShadow=!0,e.add(i),s==="standard"||s==="interceptor"){const h=new rt(fe.policeStripe,Ae.white);h.position.set(0,12.5,0),e.add(h)}else if(s==="military"){const h=new rt(fe.militaryCamo,Ae.camo);h.position.set(0,8,0),e.add(h);const u=new rt(fe.militaryTurretBase,Ae.camo);u.position.set(0,15,-5),e.add(u);const d=new rt(fe.militaryTurretBarrel,Ae.darkGrey);d.rotation.x=Math.PI/2,d.position.set(0,17,10),d.name="turretBarrel",e.add(d),e.userData.lastShotTime=0,e.userData.fireRate=2e3}const r=t.roofMaterial||new At({color:t.color}),o=new rt(fe.carRoof,r);o.position.set(0,16,-5),o.castShadow=!0,e.add(o);const a=new rt(fe.policeLight,Ae.redLight);a.position.set(-4,20,-8),e.add(a);const l=new rt(fe.policeLight,Ae.blueLight);if(l.position.set(4,20,-8),e.add(l),[[-12,5,12],[12,5,12],[-12,5,-12],[12,5,-12]].forEach(h=>{const u=new rt(fe.wheel,Ae.wheel);u.rotation.z=Math.PI/2,u.position.set(...h),e.add(u)}),t.health){const h=new rt(new tn(14,2),new me({color:0,side:Ce}));h.position.set(0,25,0),h.name="hpBg",e.add(h);const u=new rt(new tn(13.6,1.6),new me({color:65280,side:Ce}));u.position.set(0,25,.1),u.name="hpBar",e.add(u)}return gt.add(e),e}let Rh=1;function Rx(){Rh=1,console.log("[POLICE] Network IDs reset")}function Nr(){if(!J)return;let s="standard";const t=Math.random();_.heatLevel>=2&&t>.6&&(s="interceptor"),_.heatLevel>=3&&t>.7&&(s="swat"),_.heatLevel>=4&&t>.8&&(s="military");const e=Ch(s);e.userData.networkId=Rh++;const n=3500;let i,r;do i=(Math.random()-.5)*n*2,r=(Math.random()-.5)*n*2;while(Math.abs(i-J.position.x)<300&&Math.abs(r-J.position.z)<300);return e.position.x=i,e.position.z=r,_.policeCars.push(e),_.isMultiplayer&&console.log(`[POLICE] Spawned police #${e.userData.networkId} (${s}) at (${Math.round(i)}, ${Math.round(r)}). Total: ${_.policeCars.length}`),e}function Px(s){if(!J)return 1e4;let t=1e4;if(_.policeCars.forEach((o,a)=>{if(o.userData.dead){if(o.userData.speed*=Math.pow(.9,s||1),o.userData.speed>1){const D=o.userData.speed*.016*(s||1);o.position.x+=Math.sin(o.rotation.y)*D,o.position.z+=Math.cos(o.rotation.y)*D}else o.userData.speed=0;if(J){const D=J.position.x-o.position.x,I=J.position.z-o.position.z,V=Math.sqrt(D*D+I*I),G=25;if(V<G){const H=G-V,K=V>0?D/V:1,Q=V>0?I/V:0;J.position.x+=K*H*.8,J.position.z+=Q*H*.8;const W=Date.now();if(W-(o.userData.lastDeadCollision||0)>500){o.userData.lastDeadCollision=W;const $=Math.abs(_.speed)*3.6;if($>20){const tt=Math.max(ye.minCrashDamage,$*ye.playerCrashDamageMultiplier*.5);Zi(tt),_.speed*=.5,_.screenShake=.2,Fe(o.position)}}}}const F=Date.now(),N=F-o.userData.deathTime,L=o.userData.lastParticleTime||0;F-L>100&&(o.userData.lastParticleTime=F,Math.random()<.4&&Fe(o.position),N>2e3&&Math.random()<.3&&rg(o.position));return}for(let F=a+1;F<_.policeCars.length;F++){const N=_.policeCars[F],L=o.position.x-N.position.x,D=o.position.z-N.position.z,I=L*L+D*D,V=30,G=50;if(I<V*V){const H=Math.sqrt(I),K=(V-H)*.5,Q=H>0?L/H:1,W=H>0?D/H:0;N.userData.dead?(o.position.x+=Q*K*1.5,o.position.z+=W*K*1.5,N.position.x-=Q*K*.1,N.position.z-=W*K*.1):(o.position.x+=Q*K,o.position.z+=W*K,N.position.x-=Q*K,N.position.z-=W*K);const $=Math.abs(o.userData.speed||0)+Math.abs(N.userData.speed||0),tt=Date.now();if(tt-(o.userData.lastPoliceCollision||0)>500){o.userData.lastPoliceCollision=tt;const ct=Math.max(ye.minCrashDamage,$*.05);o.userData.health-=ct,N.userData.dead||(N.userData.lastPoliceCollision=tt,N.userData.health-=ct,N.userData.health<=0&&(N.userData.dead=!0,N.userData.deathTime=tt,Kn(_.heatLevel*100),_.policeKilled=(_.policeKilled||0)+1)),Fe(o.position),_.screenShake=.15,o.userData.health<=0&&(o.userData.dead=!0,o.userData.deathTime=tt,Kn(_.heatLevel*100),_.policeKilled=(_.policeKilled||0)+1)}}else if(I<G*G&&!N.userData.dead){const H=Math.sqrt(I),K=.3*(1-H/G),Q=L/H,W=D/H;o.position.x+=Q*K,o.position.z+=W*K}}const l=J.position.x-o.position.x,c=J.position.z-o.position.z,h=Math.sqrt(l*l+c*c),u=Vn[_.selectedCar];if(u&&u.type==="tank"&&h<50){o.userData.dead=!0,o.userData.deathTime=Date.now(),Kn(_.heatLevel*100),_.policeKilled=(_.policeKilled||0)+1,Fe(o.position),_.screenShake=.5;return}const d=1+(_.heatLevel-1)*.3,m=Math.atan2(l,c),v=.06*d,f=$_(m-o.rotation.y);o.rotation.y+=Eh(f,-v,v)*(s||1);let p=(o.userData.speed||250)*(1+(d-1)*.5);const x=Math.abs(_.speed)*3.6,E=_.maxSpeed*3.6*.1;if(h<150&&x<E){const F=Math.max(.1,h/150);p*=F}_.heatLevel>=3&&h<100&&h>30&&(p*=1.3);const P=p*.016*(s||1);o.position.z+=Math.cos(o.rotation.y)*P,o.position.x+=Math.sin(o.rotation.y)*P;const w=_.chunkGridSize,C=Math.floor(o.position.x/w),z=Math.floor(o.position.z/w);for(let F=C-1;F<=C+1;F++)for(let N=z-1;N<=z+1;N++){const L=`${F},${N}`,D=_.chunkGrid[L];if(D)for(let I=0;I<D.length;I++){const V=D[I];if(V.userData.isHit)continue;const G=V.position.x-o.position.x,H=V.position.z-o.position.z,K=Math.sqrt(G*G+H*H);if(K<30&&Math.abs(V.position.y-15)<V.userData.height){V.userData.isHit=!0,_.activeChunks.push(V);const Q=o.rotation.y,W=p*.01;V.userData.velocity.set(Math.sin(Q)*W+G/K*3,3+Math.random()*3,Math.cos(Q)*W+H/K*3),V.userData.rotVelocity.set((Math.random()-.5)*.3,(Math.random()-.5)*.3,(Math.random()-.5)*.3),o.userData.health-=15,Fe(V.position),o.userData.health<=0&&(o.userData.dead=!0,o.userData.deathTime=Date.now())}}}const S=o.getObjectByName("hpBar"),T=o.getObjectByName("hpBg");if(S&&T){S.lookAt(Qt.position),T.lookAt(Qt.position);const F=Math.max(0,o.userData.health/o.userData.maxHealth);S.scale.x=F,S.material.color.setHSL(F*.3,1,.5)}if(o.userData.type==="military"){const F=Date.now();F-o.userData.lastShotTime>o.userData.fireRate&&h<800&&(Lx(o),o.userData.lastShotTime=F)}const B=25;if(h<B&&!o.userData.dead){const F=B-h,N=l/h,L=c/h;J.position.x+=N*F*.6,J.position.z+=L*F*.6,o.position.x-=N*F*.4,o.position.z-=L*F*.4;const D=Date.now();if(D-(o.userData.lastCollisionDamage||0)>300){o.userData.lastCollisionDamage=D;const I=Math.abs(_.speed)*3.6,V=Math.max(ye.minCrashDamage,I*ye.playerCrashDamageMultiplier);Zi(V);const G=Math.max(ye.minCrashDamage,I*ye.policeCrashDamageMultiplier);o.userData.health-=G,o.userData.health<=0&&(o.userData.dead=!0,o.userData.deathTime=D,Kn(_.heatLevel*100),_.policeKilled=(_.policeKilled||0)+1),Fe(J.position),_.screenShake=.2}}if(h<_.arrestDistance&&!_.arrested){const F=Math.abs(_.speed)*3.6,L=_.maxSpeed*3.6*.1;if(F>=L){const D=Date.now();if(D-(o.userData.lastHit||0)<500)return;o.userData.lastHit=D;const I=J.position.x-o.position.x,V=J.position.z-o.position.z,G=Math.sqrt(I*I+V*V),H=G>0?I/G:1,K=G>0?V/G:0,Q=Math.max(20,F*.5);_.speed*=-.4,_.velocityX+=H*Q,_.velocityZ+=K*Q,o.position.x-=H*15,o.position.z-=K*15,o.userData.health-=Math.max(5,F*.2),o.userData.health<=0&&(o.userData.dead=!0,o.userData.deathTime=Date.now(),Kn(_.heatLevel*100),_.policeKilled=(_.policeKilled||0)+1);const W=Math.max(5,F*.3);Zi(W),_.screenShake=.3,Fe(J.position)}}t=Math.min(t,h)}),ye.touchArrest)return t<_.arrestDistance&&!_.arrested&&(_.arrested=!0,_.arrestCountdown=0,_.arrestStartTime=0,_.elapsedTime=(Date.now()-_.startTime)/1e3,_.isMultiplayer&&yc("arrested",{time:_.elapsedTime}),vc()),_.policeCars=_.policeCars.filter(o=>!o.userData.remove),t;const e=_.maxSpeed*3.6,n=Math.abs(_.speed)*3.6,i=e*ye.arrestSpeedThreshold,r=n<i;if(t<_.arrestDistance&&r&&!_.arrested){_.arrestStartTime===0&&(_.arrestStartTime=Date.now());const o=(Date.now()-_.arrestStartTime)/1e3;_.arrestCountdown=Math.max(0,ye.arrestCountdownTime-o),_.arrestCountdown<=0&&(_.arrested=!0,_.elapsedTime=(Date.now()-_.startTime)/1e3,_.isMultiplayer&&yc("arrested",{time:_.elapsedTime}),vc())}else(t>=_.arrestDistance||!r)&&(_.arrestCountdown=0,_.arrestStartTime=0);return _.policeCars=_.policeCars.filter(o=>!o.userData.remove),t}function Lx(s){if(!J)return;const t=new rt(Ah,Ae.projectile);t.position.copy(s.position),t.position.y=17*s.scale.y;const e=J.position.x-s.position.x,n=J.position.z-s.position.z,i=Math.atan2(e,n);t.position.x+=Math.sin(i)*15*s.scale.x,t.position.z+=Math.cos(i)*15*s.scale.z;const r=15;t.userData={velocity:new O(Math.sin(i)*r,0,Math.cos(i)*r),lifetime:3e3,spawnTime:Date.now()},gt.add(t),_.projectiles.push(t)}function Dx(){if(!J||_.arrested)return;const s=new rt(Ah,Ae.projectile),t=J.rotation.y;s.position.copy(J.position),s.position.y=18,s.position.x+=Math.sin(t)*35,s.position.z+=Math.cos(t)*35,s.userData={velocity:new O(Math.sin(t)*60,0,Math.cos(t)*60),lifetime:2e3,spawnTime:Date.now(),isPlayerShot:!0},gt.add(s),_.projectiles.push(s),_.speed-=2}function Ix(s){if(!J)return;const t=Date.now(),e=J.position;for(let n=_.projectiles.length-1;n>=0;n--){const i=_.projectiles[n];if(i.position.x+=i.userData.velocity.x*(s||1),i.position.y+=i.userData.velocity.y*(s||1),i.position.z+=i.userData.velocity.z*(s||1),t-i.userData.spawnTime>i.userData.lifetime){gt.remove(i),_.projectiles.splice(n,1);continue}if(i.userData.isPlayerShot){let r=!1;for(let o=0;o<_.policeCars.length;o++){const a=_.policeCars[o];if(a.userData.dead)continue;const l=a.position.x-i.position.x,c=a.position.z-i.position.z;if(l*l+c*c<600){r=!0,a.userData.dead=!0,a.userData.deathTime=t,Kn(_.heatLevel*100),_.policeKilled=(_.policeKilled||0)+1;for(let h=0;h<5;h++)uh(a.position,!0);break}}if(r){gt.remove(i),_.projectiles.splice(n,1);continue}}else{const r=e.x-i.position.x,o=e.z-i.position.z;Math.sqrt(r*r+o*o)<20&&(gt.remove(i),_.projectiles.splice(n,1),Zi(34))}}}function Nx(s){if(!s||!Array.isArray(s))return;_.policeCars.length;const t=new Map;_.policeCars.forEach((n,i)=>{n.userData.networkId!==void 0&&t.set(n.userData.networkId,{car:n,index:i})});const e=new Set;s.forEach(n=>{if(e.add(n.id),t.has(n.id)){const{car:i}=t.get(n.id),r=.3;i.position.x+=(n.x-i.position.x)*r,i.position.z+=(n.z-i.position.z)*r;let o=n.rotation-i.rotation.y;o>Math.PI&&(o-=Math.PI*2),o<-Math.PI&&(o+=Math.PI*2),i.rotation.y+=o*r,i.userData.health=n.health,i.userData.speed=n.speed}else{const i=n.type||"standard",r=Ch(i);r.position.set(n.x,0,n.z),r.rotation.y=n.rotation,r.userData.networkId=n.id,r.userData.health=n.health,r.userData.speed=n.speed,gt.add(r),_.policeCars.push(r)}});for(let n=_.policeCars.length-1;n>=0;n--){const i=_.policeCars[n];i.userData.networkId!==void 0&&!e.has(i.userData.networkId)&&(gt.remove(i),_.policeCars.splice(n,1))}}function Ux(){return _.policeCars.filter(s=>s.userData.networkId!==void 0&&!s.userData.dead).map(s=>({id:s.userData.networkId,x:s.position.x,z:s.position.z,rotation:s.rotation.y,health:s.userData.health,speed:s.userData.speed,type:s.userData.type}))}function Fx(){const s=new tn(1e4,1e4),t=new At({color:4473924}),e=new rt(s,t);e.rotation.x=-Math.PI/2,e.receiveShadow=!0,gt.add(e);const n=new Ot(300,.4,1e4),i=new At({color:2236962}),r=new rt(n,i);r.position.set(0,.2,0),r.receiveShadow=!0,gt.add(r);const o=new rt(n,i);o.rotation.y=Math.PI/2,o.position.set(0,.2,0),o.receiveShadow=!0,gt.add(o);const a=new tn(5,150),l=new At({color:16776960});for(let c=-2500;c<2500;c+=300){const h=new rt(a,l);h.rotation.x=-Math.PI/2,h.position.set(0,.45,c),h.receiveShadow=!0,gt.add(h)}for(let c=-2500;c<2500;c+=300){const h=new rt(a,l);h.rotation.x=-Math.PI/2,h.position.set(c,.45,0),h.receiveShadow=!0,gt.add(h)}}function Ox(){const s=[[-300,-1500],[300,-1500],[-1500,-1200],[1500,-1200],[-1600,500],[1600,500],[-200,1500],[200,1500],[-1400,1200],[1400,1200],[-800,-2e3],[800,-2e3],[0,2e3],[-900,-400],[900,-400],[-1100,600],[1100,600],[-500,1800],[500,1800],[-1800,-800],[1800,-800],[-2200,400],[2200,400]],t=new Be(8,12,50,8),e=new At({color:6111287}),n=new Ps(35,70,8),i=new At({color:3046706});s.forEach(r=>{const o=new rt(t,e.clone());o.position.set(r[0],25,r[1]),o.castShadow=!0,o.userData={isTree:!0,isHit:!1,health:2,velocity:new O,rotVelocity:new O,width:20,height:50,depth:20},gt.add(o),_.chunks.push(o);const a=Math.floor(o.position.x/_.chunkGridSize),l=Math.floor(o.position.z/_.chunkGridSize),c=`${a},${l}`;_.chunkGrid[c]||(_.chunkGrid[c]=[]),_.chunkGrid[c].push(o);const h=new rt(n,i.clone());h.position.set(r[0],80,r[1]),h.castShadow=!0,h.userData={isTreeFoliage:!0,linkedTrunk:o,isHit:!1,velocity:new O,rotVelocity:new O,width:35,height:70,depth:35},gt.add(h),o.userData.linkedFoliage=h})}const Dt={GENERIC:{name:"generic",colors:[9268835,7951688,7162945,10586239]},SHOP:{name:"shop",colors:[1668818,2201331,4367861],hasAwning:!0,signColor:16771899},BANK:{name:"bank",colors:[3622735,4545124,5533306],hasColumns:!0,signColor:16766720},PIZZERIA:{name:"pizzeria",colors:[13840175,12986408,12000284],hasAwning:!0,signColor:16761095},CHURCH:{name:"church",colors:[15527921,13621468,11583173],hasTower:!0,hasRoof:!0},POLICE_STATION:{name:"police",colors:[1402304,870305],hasFlagpole:!0,signColor:16777215},PARLIAMENT:{name:"parliament",colors:[14142664,12364452,10586239],hasDome:!0,hasColumns:!0,hasCow:!0},RESIDENTIAL:{name:"residential",colors:[16764092,16755601,16747109,12434877]},OFFICE:{name:"office",colors:[9489145,6600182,4367861],isGlass:!0},WAREHOUSE:{name:"warehouse",colors:[7697781,6381921,4342338],hasRollerDoor:!0}};function dr(s,t,e,n,i,r,o){const a=new tn(i,r),l=o?Math.random()>.5?16775620:16769154:2503224,c=new me({color:l,side:Ce}),h=new rt(a,c);return h.position.set(s,t,e),h.rotation.y=n,h}function Bx(s,t,e,n,i,r,o){const u=Math.floor((n-20)/25),d=Math.floor((r-20)/35),m=o.isGlass;for(let v=0;v<d;v++)for(let f=0;f<u;f++){const p=Math.random()>.4,x=t-n/2+15+f*25,y=20+v*35,E=dr(x,y,e+i/2+.5,0,m?22:12,m?30:15,p);s.add(E);const P=dr(x,y,e-i/2-.5,Math.PI,m?22:12,m?30:15,p);s.add(P)}const g=Math.floor((i-20)/25);for(let v=0;v<d;v++)for(let f=0;f<g;f++){const p=Math.random()>.4,x=e-i/2+15+f*25,y=20+v*35,E=dr(t-n/2-.5,y,x,Math.PI/2,m?22:12,m?30:15,p);s.add(E);const P=dr(t+n/2+.5,y,x,-Math.PI/2,m?22:12,m?30:15,p);s.add(P)}}function zx(s,t,e,n,i){const r=new Ot(e+10,3,20),o=new At({color:i}),a=new rt(r,o);return a.position.set(s,35,t+n/2+10),a.rotation.x=-.2,a}function Gx(s,t,e,n,i,r){const o=new je,a=new Be(4,5,i*.6,8),l=new At({color:15527921}),c=e/(r+1);for(let h=1;h<=r;h++){const u=new rt(a,l);u.position.set(s-e/2+h*c,i*.3,t+n/2+8),u.castShadow=!0,o.add(u)}return o}function kx(s,t,e){const n=new je,i=new Ot(25,80,25),r=new At({color:15527921}),o=new rt(i,r);o.position.set(s,e+40,t),n.add(o);const a=new Ps(15,50,4),l=new At({color:6111287}),c=new rt(a,l);c.position.set(s,e+105,t),n.add(c);const h=new rt(new Ot(3,20,3),new At({color:16766720}));h.position.set(s,e+140,t),n.add(h);const u=new rt(new Ot(12,3,3),new At({color:16766720}));return u.position.set(s,e+145,t),n.add(u),n}function Hx(s,t,e,n){const i=new je,r=new Be(n,n+5,15,16),o=new At({color:12364452}),a=new rt(r,o);a.position.set(s,e+7.5,t),i.add(a);const l=new Hn(n,16,8,0,Math.PI*2,0,Math.PI/2),c=new At({color:7901340}),h=new rt(l,c);return h.position.set(s,e+15,t),i.add(h),i}function Vx(s,t,e){const n=new je,i=new Ot(20,12,10),r=new At({color:16119285}),o=new rt(i,r);o.position.set(s,e+6,t),n.add(o);const a=new At({color:1710618}),l=new rt(new Ot(6,5,.5),a);l.position.set(s-3,e+7,t+5.3),n.add(l);const c=new rt(new Ot(5,4,.5),a);c.position.set(s+5,e+5,t+5.3),n.add(c);const h=new Ot(8,8,8),u=new rt(h,r);u.position.set(s+14,e+8,t),n.add(u);const d=new Ot(4,4,4),m=new At({color:16764370}),g=new rt(d,m);g.position.set(s+19,e+6,t),n.add(g);const v=new Ps(1.5,6,6),f=new At({color:9268835}),p=new rt(v,f);p.position.set(s+12,e+14,t-3),p.rotation.z=-.3,n.add(p);const x=new rt(v,f);x.position.set(s+12,e+14,t+3),x.rotation.z=-.3,n.add(x);const y=new Ot(3,8,3),E=new At({color:16119285});[[-6,-3],[-6,3],[6,-3],[6,3]].forEach(([C,z])=>{const S=new rt(y,E);S.position.set(s+C,e-4,t+z),n.add(S)});const P=new Ot(2,10,2),w=new rt(P,r);return w.position.set(s-12,e+2,t),w.rotation.z=.5,n.add(w),n}function Wx(s,t,e,n,i,r,o){const a=new je,l=new rt(new Ot(e*.6,15,3),new At({color:r}));return l.position.set(s,n-20,t),a.add(l),a}function Xx(s,t,e){const n=new je,i=new rt(new Be(1,1.5,60,8),new At({color:10395294}));i.position.set(s,e/2+30,t),n.add(i);const r=new tn(25,15),o=new At({color:12986408,side:Ce}),a=new rt(r,o);a.position.set(s+13,e/2+52,t),n.add(a);const l=new rt(new tn(25,3),new me({color:16777215,side:Ce}));l.position.set(s+13,e/2+52,t+.1),n.add(l);const c=new rt(new tn(3,15),new me({color:16777215,side:Ce}));return c.position.set(s+8,e/2+52,t+.1),n.add(c),n}function qx(){const s=[[-600,-800,100,80,150,Dt.SHOP],[-700,-500,120,90,180,Dt.OFFICE],[-550,-200,90,70,140,Dt.PIZZERIA],[-800,100,110,85,160,Dt.BANK],[-650,400,100,75,150,Dt.RESIDENTIAL],[-750,700,130,95,190,Dt.OFFICE],[-600,1e3,95,80,145,Dt.SHOP],[600,-800,105,85,155,Dt.RESIDENTIAL],[700,-500,115,88,175,Dt.SHOP],[550,-200,95,72,145,Dt.WAREHOUSE],[800,100,120,90,170,Dt.OFFICE],[650,400,105,78,155,Dt.PIZZERIA],[750,700,125,92,185,Dt.BANK],[600,1e3,100,82,150,Dt.RESIDENTIAL],[-350,600,140,100,120,Dt.POLICE_STATION],[350,-600,180,120,140,Dt.PARLIAMENT],[0,-2800,120,80,100,Dt.CHURCH],[-1200,-600,90,70,140,Dt.RESIDENTIAL],[-1300,200,110,85,160,Dt.SHOP],[-1100,800,100,78,150,Dt.WAREHOUSE],[1200,-600,95,75,145,Dt.OFFICE],[1300,200,115,88,170,Dt.RESIDENTIAL],[1100,800,105,80,155,Dt.SHOP],[-400,-1200,85,65,130,Dt.RESIDENTIAL],[400,-1200,90,70,135,Dt.SHOP],[-1100,-400,100,75,150,Dt.GENERIC],[1100,-400,105,80,155,Dt.GENERIC],[-800,1800,120,90,200,Dt.OFFICE],[0,2200,150,100,220,Dt.GENERIC],[800,1800,110,85,180,Dt.RESIDENTIAL],[-1500,2e3,100,80,160,Dt.WAREHOUSE],[1500,2e3,105,82,170,Dt.SHOP],[-800,-1800,115,88,190,Dt.RESIDENTIAL],[800,-1800,100,80,175,Dt.OFFICE],[-1500,-2e3,95,75,155,Dt.GENERIC],[1500,-2e3,110,85,165,Dt.SHOP],[-2e3,-1e3,130,95,200,Dt.OFFICE],[-2200,0,140,100,230,Dt.GENERIC],[-2e3,1e3,120,90,190,Dt.RESIDENTIAL],[-2500,-500,100,80,160,Dt.WAREHOUSE],[-2500,500,105,82,170,Dt.GENERIC],[2e3,-1e3,125,92,195,Dt.OFFICE],[2200,0,145,98,225,Dt.GENERIC],[2e3,1e3,115,88,185,Dt.RESIDENTIAL],[2500,-500,98,78,155,Dt.SHOP],[2500,500,102,80,165,Dt.GENERIC]],t=30;s.forEach(([e,n,i,r,o,a])=>{const l=new je,c=a.colors,h=c[Math.floor(Math.random()*c.length)],u=Math.ceil(i/t),d=Math.ceil(o/t),m=Math.ceil(r/t),g=i/u,v=o/d,f=r/m,p=new Ot(g,v,f),x=new At({color:h}),y=e-i/2+g/2,E=v/2,P=n-r/2+f/2;for(let w=0;w<u;w++)for(let C=0;C<d;C++)for(let z=0;z<m;z++){const S=new rt(p,x.clone());S.position.set(y+w*g,E+C*v,P+z*f),S.userData={isHit:!1,buildingType:a.name,velocity:new O,rotVelocity:new O,width:g,height:v,depth:f},gt.add(S),_.chunks.push(S);const T=Math.floor(S.position.x/_.chunkGridSize),B=Math.floor(S.position.z/_.chunkGridSize),F=`${T},${B}`;_.chunkGrid[F]||(_.chunkGrid[F]=[]),_.chunkGrid[F].push(S)}if(Bx(l,e,n,i,r,o,a),a.hasAwning){const w=a.name==="pizzeria"?3706428:1402304,C=zx(e,n,i,r,w);l.add(C)}if(a.hasColumns){const w=a.name==="parliament"?6:4,C=Gx(e,n,i,r,o,w);l.add(C)}if(a.hasTower){const w=kx(e,n-r/4,o);l.add(w)}if(a.hasDome){const w=Hx(e,n,o,30);l.add(w)}if(a.hasCow){const w=Vx(e,n,o+45);l.add(w)}if(a.hasFlagpole){const w=Xx(e+i/2+15,n+r/2+10,0);l.add(w)}if(a.signColor){const w=Wx(e,n+r/2+2,i,o,a.name,a.signColor);l.add(w)}gt.add(l)})}function Yx(s){if(!J)return;const t=s||1;for(let a=_.activeChunks.length-1;a>=0;a--){const l=_.activeChunks[a];l.position.x+=l.userData.velocity.x*t,l.position.y+=l.userData.velocity.y*t,l.position.z+=l.userData.velocity.z*t,l.rotation.x+=l.userData.rotVelocity.x*t,l.rotation.y+=l.userData.rotVelocity.y*t,l.rotation.z+=l.userData.rotVelocity.z*t;const c=l.userData.gravity||.5;l.userData.velocity.y-=c*t;const h=l.userData.height?l.userData.height/2:.5;if(l.position.y<h){l.position.y=h,l.userData.velocity.y*=-.4;const u=Math.pow(.75,t);l.userData.velocity.x*=u,l.userData.velocity.z*=u,l.userData.rotVelocity.multiplyScalar(u)}l.userData.isSmallDebris&&(l.userData.velocity.x*=.98,l.userData.velocity.z*=.98),Math.abs(l.userData.velocity.y)<.1&&Math.abs(l.userData.velocity.x)<.1&&Math.abs(l.userData.velocity.z)<.1&&l.position.y<=h+.1&&(_.activeChunks.splice(a,1),l.userData.isSmallDebris?(l.userData.isSmallDebris=!0,_.smallDebris||(_.smallDebris=[]),_.smallDebris.push(l),l.userData.physicsBody||(l.userData.physicsBody=yi.addBody(l,"box",{mass:5,material:"debris",size:{width:l.userData.width||2,height:l.userData.height||2,depth:l.userData.depth||2}}))):(l.userData.isFallenDebris=!0,_.fallenDebris||(_.fallenDebris=[]),_.fallenDebris.push(l),l.userData.physicsBody||(l.userData.physicsBody=yi.addBody(l,"box",{mass:20,material:"debris",size:{width:l.userData.width||10,height:l.userData.height||5,depth:l.userData.depth||10}}))))}const e=J.position,n=15,i=_.chunkGridSize,r=Math.floor(e.x/i),o=Math.floor(e.z/i);for(let a=r-1;a<=r+1;a++)for(let l=o-1;l<=o+1;l++){const c=`${a},${l}`,h=_.chunkGrid[c];if(h)for(let u=0;u<h.length;u++){const d=h[u];if(!d.userData.isHit&&Math.abs(d.position.x-e.x)<40&&Math.abs(d.position.z-e.z)<40){const m=d.position.x-e.x,g=d.position.z-e.z;if(m*m+g*g<(n+d.userData.width/2+5)**2&&Math.abs(d.position.y-e.y)<d.userData.height/2+10){const f=Math.abs(_.speed),p=J.rotation.y,x=Math.atan2(m,g);if(d.userData.isTree){if(d.userData.health--,d.userData.health<=0||f>25){if(d.userData.isHit=!0,_.activeChunks.push(d),d.userData.velocity.set(Math.sin(p)*f*.3,2+Math.random()*3,Math.cos(p)*f*.3),d.userData.rotVelocity.set((Math.random()-.5)*.3,0,(Math.random()-.5)*.3),d.userData.linkedFoliage){const y=d.userData.linkedFoliage;y.userData.isHit=!0,_.activeChunks.push(y),y.userData.velocity=d.userData.velocity.clone(),y.userData.velocity.y+=3,y.userData.rotVelocity=new O((Math.random()-.5)*.5,(Math.random()-.5)*.3,(Math.random()-.5)*.5)}jx(d.position,f)}else _.screenShake=.2;_.speed*=.85,Zi(Math.floor(f*.15)+8),_.screenShake=.4,Fe(d.position)}else d.userData.isHit=!0,_.activeChunks.push(d),d.userData.velocity.set(Math.sin(p)*f*.2+Math.sin(x)*5,Math.abs(f)*.1+5+Math.random()*5,Math.cos(p)*f*.2+Math.cos(x)*5),d.userData.rotVelocity.set((Math.random()-.5)*.5,(Math.random()-.5)*.5,(Math.random()-.5)*.5),$x(d.position,d.material.color,f),_.speed*=.95,Zi(Math.floor(f*.1)+5),_.screenShake=.3,Fe(d.position)}}}}if(_.fallenDebris&&_.fallenDebris.length>0)for(let a=_.fallenDebris.length-1;a>=0;a--){const l=_.fallenDebris[a];if(!(!l||!l.userData||!l.userData.isFallenDebris)&&l.userData.physicsBody){const c=l.position.x-e.x,h=l.position.z-e.z,u=c*c+h*h,d=l.userData.width||10,m=l.userData.depth||10,g=Math.max(d,m)/2,v=n+g+2;if(u<v*v){const f=Math.abs(_.speed);if(f>8){_.fallenDebris.splice(a,1),gt.remove(l),yi.removeBody(l);const p=Math.min(15,Math.floor(f/2)+3);Kx(l,f,p),_.speed*=.8,_.screenShake=Math.min(.5,f/25),Fe(l.position),ma(l.position,Math.floor(f/4))}else _.speed*=.9,f>2&&(_.screenShake=.15)}}}if(_.smallDebris&&_.smallDebris.length>0)for(let a=_.smallDebris.length-1;a>=0;a--){const l=_.smallDebris[a];if(!l||!l.userData)continue;const c=l.position.x-e.x,h=l.position.z-e.z,u=c*c+h*h,d=(l.userData.width||3)/2,m=n+d+1;if(u<m*m){const g=Math.abs(_.speed);if(g>10&&l.userData.width>1.5){gt.remove(l),_.smallDebris.splice(a,1);const v=_.activeChunks.indexOf(l);v>-1&&_.activeChunks.splice(v,1),l.userData.physicsBody&&yi.removeBody(l),Zx(l.position,l.material,g),_.speed*=.98}}}}function jx(s,t){const e=Math.sin((J==null?void 0:J.rotation.y)||0),n=Math.cos((J==null?void 0:J.rotation.y)||0),i=new At({color:6111287});for(let o=0;o<6;o++){const a=new Ot(2+Math.random()*3,8+Math.random()*15,2+Math.random()*3),l=new rt(a,i.clone());l.position.copy(s),l.position.y+=Math.random()*30,l.position.x+=(Math.random()-.5)*10,l.position.z+=(Math.random()-.5)*10,l.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),l.userData={isSmallDebris:!0,velocity:new O(e*t*.3+(Math.random()-.5)*10,5+Math.random()*8,n*t*.3+(Math.random()-.5)*10),rotVelocity:new O((Math.random()-.5)*.6,(Math.random()-.5)*.6,(Math.random()-.5)*.6),width:3,height:10,depth:3,lifetime:300,gravity:.3},gt.add(l),_.activeChunks.push(l),_.smallDebris||(_.smallDebris=[]),_.smallDebris.push(l)}const r=new At({color:3046706});for(let o=0;o<12;o++){const a=new Ot(3+Math.random()*4,1,3+Math.random()*4),l=new rt(a,r.clone());l.position.copy(s),l.position.y+=40+Math.random()*40,l.position.x+=(Math.random()-.5)*30,l.position.z+=(Math.random()-.5)*30,l.userData={isSmallDebris:!0,velocity:new O((Math.random()-.5)*8,2+Math.random()*4,(Math.random()-.5)*8),rotVelocity:new O((Math.random()-.5)*.4,(Math.random()-.5)*.4,(Math.random()-.5)*.4),width:4,height:1,depth:4,lifetime:400,gravity:.08},gt.add(l),_.activeChunks.push(l),_.smallDebris||(_.smallDebris=[]),_.smallDebris.push(l)}}function $x(s,t,e){const n=Math.sin((J==null?void 0:J.rotation.y)||0),i=Math.cos((J==null?void 0:J.rotation.y)||0),r=Math.min(15,4+Math.floor(e/5)),o=t||new Bt(9268835);for(let c=0;c<r;c++){const h=1+Math.random()*4,u=new Ot(h*(.5+Math.random()),h*(.5+Math.random()),h*(.5+Math.random())),d=o.clone();d.offsetHSL(0,(Math.random()-.5)*.1,(Math.random()-.5)*.2);const m=new At({color:d}),g=new rt(u,m);g.position.copy(s),g.position.y+=Math.random()*20,g.position.x+=(Math.random()-.5)*15,g.position.z+=(Math.random()-.5)*15,g.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const v=Math.random()*Math.PI*2,f=3+Math.random()*e*.4;g.userData={isSmallDebris:!0,velocity:new O(n*e*.25+Math.sin(v)*f,3+Math.random()*(e*.3),i*e*.25+Math.cos(v)*f),rotVelocity:new O((Math.random()-.5)*.8,(Math.random()-.5)*.8,(Math.random()-.5)*.8),width:h,height:h,depth:h,lifetime:250+Math.floor(Math.random()*150),gravity:.35},gt.add(g),_.activeChunks.push(g),_.smallDebris||(_.smallDebris=[]),_.smallDebris.push(g)}const a=Math.min(8,2+Math.floor(e/8));for(let c=0;c<a;c++){const h=new Ot(.5+Math.random()*2,.2,.5+Math.random()*2),u=new me({color:Math.random()>.3?9489145:14938877,transparent:!0,opacity:.7}),d=new rt(h,u);d.position.copy(s),d.position.y+=10+Math.random()*30,d.position.x+=(Math.random()-.5)*20,d.position.z+=(Math.random()-.5)*20,d.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),d.userData={isSmallDebris:!0,velocity:new O((Math.random()-.5)*12,2+Math.random()*6,(Math.random()-.5)*12),rotVelocity:new O((Math.random()-.5)*1.2,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2),width:1.5,height:.2,depth:1.5,lifetime:180+Math.floor(Math.random()*100),gravity:.25},gt.add(d),_.activeChunks.push(d),_.smallDebris||(_.smallDebris=[]),_.smallDebris.push(d)}const l=Math.min(10,3+Math.floor(e/6));for(let c=0;c<l;c++){const h=new Hn(1+Math.random()*2,6,6),u=new me({color:10395294,transparent:!0,opacity:.4+Math.random()*.3}),d=new rt(h,u);d.position.copy(s),d.position.y+=Math.random()*15,d.position.x+=(Math.random()-.5)*10,d.position.z+=(Math.random()-.5)*10,d.userData={isSmallDebris:!0,isDust:!0,velocity:new O(n*e*.15+(Math.random()-.5)*5,1+Math.random()*3,i*e*.15+(Math.random()-.5)*5),rotVelocity:new O(0,0,0),width:2,height:2,depth:2,lifetime:120+Math.floor(Math.random()*80),gravity:-.02},gt.add(d),_.activeChunks.push(d),_.smallDebris||(_.smallDebris=[]),_.smallDebris.push(d)}ma(s,Math.min(6,Math.floor(e/5)))}function Kx(s,t=15,e=6){const n=Math.max(4,e+Math.floor(Math.random()*3)),i=Math.min(s.userData.width,s.userData.height,s.userData.depth)/2,r=Math.sin((J==null?void 0:J.rotation.y)||0),o=Math.cos((J==null?void 0:J.rotation.y)||0);for(let a=0;a<n;a++){const l=i*(.2+Math.random()*.5),c=new Ot(l,l*(.5+Math.random()*.5),l),h=new rt(c,s.material.clone());h.position.set(s.position.x+(Math.random()-.5)*s.userData.width,s.position.y+Math.random()*3,s.position.z+(Math.random()-.5)*s.userData.depth),h.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const u=(Math.random()-.5)*t*.6,d=(Math.random()-.5)*t*.6;h.userData={isSmallDebris:!0,canShatter:l>2,velocity:new O(r*t*.4+u,2+Math.random()*(t*.3),o*t*.4+d),rotVelocity:new O((Math.random()-.5)*.5,(Math.random()-.5)*.5,(Math.random()-.5)*.5),width:l,height:l,depth:l,lifetime:400+Math.floor(Math.random()*200),gravity:.15+Math.random()*.1},gt.add(h),_.activeChunks.push(h),_.smallDebris||(_.smallDebris=[]),_.smallDebris.push(h)}Fe(s.position),ma(s.position,Math.min(8,Math.floor(t/3)))}function Zx(s,t,e){const n=3+Math.floor(Math.random()*4),i=Math.sin((J==null?void 0:J.rotation.y)||0),r=Math.cos((J==null?void 0:J.rotation.y)||0);for(let o=0;o<n;o++){const a=.3+Math.random()*.7,l=new Ot(a,a,a),c=new rt(l,t.clone());c.position.copy(s),c.position.y+=Math.random()*2,c.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),c.userData={isSmallDebris:!0,canShatter:!1,velocity:new O(i*e*.5+(Math.random()-.5)*e*.8,1+Math.random()*e*.2,r*e*.5+(Math.random()-.5)*e*.8),rotVelocity:new O((Math.random()-.5)*.8,(Math.random()-.5)*.8,(Math.random()-.5)*.8),width:a,height:a,depth:a,lifetime:150+Math.floor(Math.random()*100),gravity:.25},gt.add(c),_.activeChunks.push(c),_.smallDebris||(_.smallDebris=[]),_.smallDebris.push(c)}Fe(s,.5)}function ma(s,t=5){for(let e=0;e<t;e++)la(s)}function Jx(){if(_.smallDebris)for(let s=_.smallDebris.length-1;s>=0;s--){const t=_.smallDebris[s];if(t.userData.lifetime!==void 0&&(t.userData.lifetime--,t.userData.lifetime<=0)){gt.remove(t),_.smallDebris.splice(s,1);const e=_.activeChunks.indexOf(t);e>-1&&_.activeChunks.splice(e,1)}}}function Qx(){const s=new rt(fe.coin,Ae.coin),t=3500;s.position.set((Math.random()-.5)*t*2,5,(Math.random()-.5)*t*2),s.rotation.z=Math.PI/2,s.castShadow=!0,gt.add(s),_.collectibles.push(s)}function ty(){if(_.arrested)return;if(Math.random()<.02&&(Qx(),_.collectibles.length>50)){const n=_.collectibles.length-50;for(let i=0;i<n;i++){const r=_.collectibles[i];r&&gt.remove(r)}_.collectibles.splice(0,n)}const s=J?J.position.x:0,t=J?J.position.z:0,e=400;for(let n=_.collectibles.length-1;n>=0;n--){const i=_.collectibles[n];if(i.rotation.y+=.05,!J)continue;const r=s-i.position.x,o=t-i.position.z;if(r*r+o*o<e){gt.remove(i),_.collectibles.splice(n,1);const a=(_.arrested?_.elapsedTime:(Date.now()-_.startTime)/1e3)||0,l=ye.coinBaseValue,c=Math.floor(a/10)*10,h=(_.rebirthPoints||0)+1;Kn((l+c)*h)}}}document.getElementById("gameContainer").appendChild(si.domElement);const ey=window.location.pathname==="/start"||window.location.pathname==="/start/",Qi=document.getElementById("multiplayerLobby"),Mc=document.getElementById("lobbyCloseBtn"),Yi=document.getElementById("joinGameBtn"),Ko=document.getElementById("playerNameInput"),gn=document.getElementById("lobbyError"),ny=document.getElementById("lobbyConnect"),iy=document.getElementById("lobbyRoom");document.getElementById("displayRoomCode");const Sc=document.getElementById("playersList"),sy=document.getElementById("playerCount"),Ec=document.getElementById("hostControls"),wc=document.getElementById("waitingMessage"),bc=document.getElementById("startMultiplayerBtn"),To=document.getElementById("hostTouchArrest"),Ao=document.getElementById("hostDropInEnabled"),Tc=document.getElementById("otherPlayersHUD"),Ac=document.getElementById("gameOverRejoinBtn"),Cc=document.getElementById("gameOverMpShopBtn"),Oe=document.getElementById("gameModeModal"),Rc=document.getElementById("soloModeBtn"),Pc=document.getElementById("multiplayerModeBtn"),Zo=[16711680,26367,65280,16755200];lt.playBtn&&lt.playBtn.addEventListener("click",()=>{if(_.isMultiplayer&&Cx()){lt.shop.style.display="none",Th(_.selectedCar);return}Oe.style.display="flex"});Rc&&Rc.addEventListener("click",()=>{Oe.style.display="none",ga()});const Lc=document.getElementById("menuShopBtn");Lc&&Lc.addEventListener("click",()=>{Oe.style.display="none",pa(!1)});Pc&&Pc.addEventListener("click",async()=>{Oe.style.display="none",Qi.style.display="flex",gn.textContent="",gr()});async function gr(){const s=document.getElementById("serverDiscovery"),t=document.getElementById("lobbyConnect"),e=document.getElementById("lobbyRoom"),n=document.getElementById("scanningStatus"),i=document.getElementById("discoveredServers"),r=document.getElementById("noServersFound"),o=document.getElementById("serverList");s&&(s.style.display="block"),t&&(t.style.display="none"),e&&(e.style.display="none"),n&&(n.style.display="block"),i&&(i.style.display="none"),r&&(r.style.display="none");const a=await ox();n&&(n.style.display="none"),a.length>0?(i&&(i.style.display="block"),o&&(o.innerHTML=a.map(l=>`
                <div class="server-card ${l.gameStarted?"in-game":""}" data-ip="${l.ip}" data-players="${l.players}">
                    <div class="server-name">🖥️ ${l.ip==="localhost"?"Lokal Server":l.ip}</div>
                    <span class="server-players">
                        ${l.gameStarted?"🎮 I gang - ":"⏳ Venter - "}${l.players}/${l.maxPlayers} spillere
                    </span>
                </div>
            `).join(""),o.querySelectorAll(".server-card").forEach(l=>{l.addEventListener("click",()=>{Ph(l.dataset.ip,l.dataset.players)})}))):r&&(r.style.display="block")}function Ph(s,t){ax(s);const e=document.getElementById("serverDiscovery"),n=document.getElementById("lobbyConnect"),i=document.getElementById("selectedServerInfo");e&&(e.style.display="none"),n&&(n.style.display="block"),i&&(i.textContent=`🖥️ Server: ${s} (${t} spillere online)`);const r=document.getElementById("playerNameInput");r&&r.focus()}document.addEventListener("DOMContentLoaded",()=>{const s=localStorage.getItem("playerName");s&&Ko&&(Ko.value=s);const t=document.getElementById("backToServersBtn"),e=document.getElementById("rescanBtn"),n=document.getElementById("rescanBtnEmpty"),i=document.getElementById("hostOwnServerBtn");t&&t.addEventListener("click",()=>{Ji(),gr()}),e&&e.addEventListener("click",gr),n&&n.addEventListener("click",gr),i&&i.addEventListener("click",()=>{Ph("localhost","?")})});lt.gameOverShopBtn&&lt.gameOverShopBtn.addEventListener("click",()=>{_.isMultiplayer&&(Ji(),_.isMultiplayer=!1),pa(),Oe.style.display="flex"});Ac&&Ac.addEventListener("click",()=>{vx()});Cc&&Cc.addEventListener("click",()=>{lt.gameOver.style.display="none",pa(!0)});J_(s=>{console.log("Multiplayer shop: selected car",s),lt.shop.style.display="none",Th(s)});Oe&&Oe.addEventListener("click",s=>{s.target===Oe&&(Oe.style.display="none")});document.addEventListener("keydown",s=>{if(s.key==="Escape"){if(Oe&&Oe.style.display==="flex"){Oe.style.display="none";return}if(Qi&&Qi.style.display==="flex"){Qi.style.display="none",Ji();return}if(lt.shop&&lt.shop.style.display==="flex"){lt.shop.style.display="none",Oe.style.display="flex";return}if(lt.gameOver&&lt.gameOver.style.display==="block"){lt.gameOver.style.display="none",_.isMultiplayer&&(Ji(),_.isMultiplayer=!1),Oe.style.display="flex";return}!_.arrested&&_.startTime>0&&(_.arrested=!0,_.isMultiplayer&&(Ji(),_.isMultiplayer=!1),_.policeCars.forEach(t=>gt.remove(t)),_.policeCars=[],_.collectibles.forEach(t=>gt.remove(t)),_.collectibles=[],_.projectiles.forEach(t=>gt.remove(t)),_.projectiles=[],lt.gameOver.style.display="none",Oe.style.display="flex")}});Mc&&Mc.addEventListener("click",()=>{Qi.style.display="none",Ji()});Yi&&Yi.addEventListener("click",async()=>{const s=Ko.value.trim()||"Spiller",t=_.selectedCar||"standard";localStorage.setItem("playerName",s),Yi.disabled=!0,gn.textContent="Forbinder...",gn.style.color="#888";try{await cx(),gn.textContent="Joiner spil...",dx(s,t)}catch{gn.textContent="Kunne ikke forbinde til server",gn.style.color="#ff4444",Yi.disabled=!1}});bc&&bc.addEventListener("click",()=>{const s={...ye,touchArrest:(To==null?void 0:To.checked)||!1,dropInEnabled:(Ao==null?void 0:Ao.checked)!==!1};ux(s)});_x((s,t,e,n)=>{_.isMultiplayer=!0,_.isHost=n,_.playerId=t,_.roomCode=s;const i=e.findIndex(r=>r.id===t);_.playerColor=Zo[i]||Zo[0],ry(s,e,n),console.log(`Joined as ${n?"HOST":"player"}`)});Ax((s,t)=>{const e=_.isHost;if(_.isHost=s===_.playerId,_.isHost&&!e){const n=document.getElementById("hostControls"),i=document.getElementById("waitingMessage");n&&(n.style.display="block"),i&&(i.style.display="none"),gn.textContent="Du er nu værten!",gn.style.color="#00ff00",setTimeout(()=>{gn.textContent=""},3e3)}console.log(`Host changed to: ${t} (isHost: ${_.isHost})`)});xx((s,t,e)=>{if(Lh(t),e&&_.isMultiplayer&&!_.arrested){const n=fa(s.color||26367,s.car||"standard");n.position.set(0,0,100),_.otherPlayers.set(s.id,{name:s.name,car:s.car,color:s.color,mesh:n,state:null}),console.log(`${s.name} dropped into the game!`)}});yx((s,t)=>{oy(s),console.log(`${t||"Player"} left the game`)});Mx((s,t,e)=>{Qi.style.display="none";const n=s.find(i=>i.id===_.playerId);s.forEach(i=>{if(i.id!==_.playerId){const r=fa(i.color||26367,i.car||"standard");r.position.set(i.spawnPos.x,0,i.spawnPos.z),_.otherPlayers.set(i.id,{name:i.name,car:i.car,color:i.color,mesh:r,state:null})}}),ay(n.spawnPos)});Sx((s,t)=>{const e=_.otherPlayers.get(s);e&&e.mesh&&(X_(e.mesh,t),e.state=t)});Ex(s=>{_.isHost||Nx(s)});wx((s,t,e)=>{if(t==="arrested"){const n=_.otherPlayers.get(s);n&&console.log(`${n.name} blev arresteret!`)}else if(t==="respawned"){const n=_.otherPlayers.get(s);n&&e&&(console.log(`Player ${s} respawned with car: ${e.car}`),e.car&&e.car!==n.car&&(n.car=e.car,n.mesh&&gt.remove(n.mesh),n.mesh=fa(n.color||26367,e.car)),n.mesh&&e.spawnPos&&n.mesh.position.set(e.spawnPos.x,.5,e.spawnPos.z))}});bx(s=>{gn.textContent=s});Tx((s,t,e)=>{console.log("Respawned at:",s,"with car:",t,"resetHeat:",e),lt.gameOver.style.display="none",lt.shop.style.display="none",t&&t!==_.selectedCar&&(_.selectedCar=t,ua(_.playerColor)),_.arrested=!1;const n=Vn[_.selectedCar];_.health=(n==null?void 0:n.health)||100,_.arrestCountdown=0,_.arrestStartTime=0,e&&(console.log("[RESPAWN] Solo player - resetting heat level and police"),_.heatLevel=1,_.startTime=Date.now(),_.policeKilled=0,_.policeCars.forEach(i=>gt.remove(i)),_.policeCars=[],_.isHost&&Nr()),J&&(J.position.set(s.x,.5,s.z),J.rotation.y=0,_.speed=0,Qt&&(Qt.position.set(s.x,50,s.z+80),Qt.lookAt(J.position))),Ir()});function ry(s,t,e){const n=document.getElementById("serverDiscovery");n&&(n.style.display="none"),ny.style.display="none",iy.style.display="block",Yi&&(Yi.disabled=!1),gn.textContent="",e?(Ec.style.display="block",wc.style.display="none"):(Ec.style.display="none",wc.style.display="block"),Lh(t)}function Lh(s){sy.textContent=s.length,Sc.innerHTML="",s.forEach((t,e)=>{const n=document.createElement("div");n.className="player-item",n.innerHTML=`
            <div class="player-color" style="background: #${(t.color||Zo[e]).toString(16).padStart(6,"0")}"></div>
            <span class="player-name">${t.name}</span>
            ${t.isHost?'<span class="player-host">HOST</span>':""}
        `,Sc.appendChild(n)})}function oy(s){const t=_.otherPlayers.get(s);t&&t.mesh&&Y_(t.mesh),_.otherPlayers.delete(s)}window.addEventListener("resize",()=>{Qt.aspect=window.innerWidth/window.innerHeight,Qt.updateProjectionMatrix(),si.setSize(window.innerWidth,window.innerHeight)});window.addEventListener("keydown",s=>{if(un[s.key.toLowerCase()]=!0,(s.key==="c"||s.key==="C")&&(_.is2DMode=!_.is2DMode),s.key==="f"||s.key==="F"){const t=Vn[_.selectedCar];if(t&&t.type==="tank"){const e=Date.now();e-(_.lastPlayerShot||0)>800&&(Dx(),_.lastPlayerShot=e)}}s.key===" "&&s.preventDefault()});window.addEventListener("keyup",s=>{un[s.key.toLowerCase()]=!1});Fx();qx();Ox();Sh();function ga(){lt.shop.style.display="none",lt.gameOver.style.display="none",_.speed=0,_.money=0,_.heatLevel=1;const s=Vn[_.selectedCar];_.health=s.health||100,Ir(),_.arrested=!1,_.startTime=Date.now(),_.lastMoneyCheckTime=Date.now(),_.lastPoliceSpawnTime=Date.now(),_.policeCars.forEach(t=>gt.remove(t)),_.policeCars=[],_.collectibles.forEach(t=>gt.remove(t)),_.collectibles=[],_.projectiles.forEach(t=>gt.remove(t)),_.projectiles=[],_.slowEffect=0,_.slowDuration=0,_.arrestCountdown=0,_.arrestStartTime=0,_.policeKilled=0,_.sparks.forEach(t=>gt.remove(t)),_.sparks=[],_.currentFOV=_.baseFOV,Qt.fov=_.baseFOV,Qt.updateProjectionMatrix(),ua(),Nr()}function ay(s){lt.shop.style.display="none",lt.gameOver.style.display="none",_.speed=0,_.money=0,_.heatLevel=1;const t=Vn[_.selectedCar];_.health=t.health||100,Ir(),_.arrested=!1,_.startTime=Date.now(),_.lastMoneyCheckTime=Date.now(),_.lastPoliceSpawnTime=Date.now(),_.policeCars.forEach(e=>gt.remove(e)),_.policeCars=[],_.collectibles.forEach(e=>gt.remove(e)),_.collectibles=[],_.projectiles.forEach(e=>gt.remove(e)),_.projectiles=[],_.slowEffect=0,_.slowDuration=0,_.arrestCountdown=0,_.arrestStartTime=0,_.policeKilled=0,_.sparks.forEach(e=>gt.remove(e)),_.sparks=[],_.currentFOV=_.baseFOV,Qt.fov=_.baseFOV,Qt.updateProjectionMatrix(),ua(_.playerColor),J&&s&&J.position.set(s.x,0,s.z),_.isHost?(Rx(),Nr(),console.log(`[MULTIPLAYER] Host started game. isHost: ${_.isHost}, isMultiplayer: ${_.isMultiplayer}`)):console.log(`[MULTIPLAYER] Client started game. isHost: ${_.isHost}, isMultiplayer: ${_.isMultiplayer}`)}let Dc=performance.now();function Dh(){requestAnimationFrame(Dh);const s=performance.now(),t=Math.min((s-Dc)/16.67,2);if(Dc=s,!_.arrested){W_(t,s),_.isMultiplayer&&J&&px({x:J.position.x,y:J.position.y,z:J.position.z,rotY:J.rotation.y,speed:_.speed,health:_.health,arrested:_.arrested});const e=Math.floor((Date.now()-_.startTime)/1e3);(!_.isMultiplayer||_.isHost)&&e>0&&e%ye.policeSpawnInterval===0&&Date.now()-_.lastPoliceSpawnTime>500&&(_.isMultiplayer&&console.log(`[SPAWN] Triggering police spawn at ${e}s (isHost: ${_.isHost}, interval: ${ye.policeSpawnInterval})`),Nr(),_.lastPoliceSpawnTime=Date.now());const i=Math.min(ye.maxHeatLevel,1+Math.floor(e/ye.heatIncreaseInterval));i>_.heatLevel&&(_.heatLevel=i),Yx(t),Jx(),yi.update(t),ty(),Ix(t);const r=Px(t);if(_.isMultiplayer&&_.isHost){const o=Ux();gx(o)}Z_(r),_.isMultiplayer&&(ly(),q_(t))}if(og(),lg(t),!J){si.render(gt,Qt);return}if(_.is2DMode)Qt.up.set(0,0,-1),Qt.position.x=J.position.x,Qt.position.z=J.position.z,Qt.position.y=800,Qt.lookAt(J.position);else{Qt.up.set(0,1,0);const e=80,n=40,i=J.position.x-Math.sin(J.rotation.y)*e,r=J.position.z-Math.cos(J.rotation.y)*e;Qt.position.x+=(i-Qt.position.x)*.1,Qt.position.y=J.position.y+n,Qt.position.z+=(r-Qt.position.z)*.1,_.screenShake>.01&&(Qt.position.x+=(Math.random()-.5)*_.screenShake,Qt.position.y+=(Math.random()-.5)*_.screenShake*.5),Qt.lookAt(J.position.x,J.position.y+10,J.position.z)}si.render(gt,Qt)}function ly(){if(!Tc)return;let s="";_.otherPlayers.forEach((t,e)=>{if(t.state){const n="#"+(t.color||26367).toString(16).padStart(6,"0");s+=`
                <div class="other-player-card" style="border-color: ${n}">
                    <div class="name" style="color: ${n}">${t.name}</div>
                    <div class="stats">
                        HP: ${Math.round(t.state.health||100)}% | 
                        ${Math.round(Math.abs(t.state.speed||0)*3.6)} km/t
                        ${t.state.arrested?" | 🚔 FANGET":""}
                    </div>
                </div>
            `}}),Tc.innerHTML=s}K_(ga);H_({triggerDamageEffect:nx,updateHealthUI:Ir});ey?ga():setTimeout(()=>{Oe.style.display="flex"},500);Dh();
//# sourceMappingURL=main-Bhtm9-x4.js.map
