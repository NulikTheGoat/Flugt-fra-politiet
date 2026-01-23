(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const p={speed:0,maxSpeed:80,acceleration:.3,friction:.97,maxSpeedWarning:70,arrestDistance:30,arrested:!1,startTime:Date.now(),elapsedTime:0,money:0,rebirthPoints:0,totalMoney:0,selectedCar:"standard",lastMoneyCheckTime:0,lastPoliceSpawnTime:0,policeCars:[],chunks:[],chunkGrid:{},activeChunks:[],fallenDebris:[],smallDebris:[],chunkGridSize:200,heatLevel:1,collectibles:[],projectiles:[],slowEffect:0,slowDuration:0,sparks:[],baseFOV:75,currentFOV:75,screenShake:0,velocityX:0,velocityZ:0,angularVelocity:0,driftFactor:0,tireMarks:[],carTilt:0,wheelAngle:0,speedParticles:[],is2DMode:!1,health:100,arrestCountdown:0,arrestStartTime:0,policeKilled:0,isMultiplayer:!1,isHost:!1,playerId:null,roomCode:null,otherPlayers:new Map,playerColor:16711680},en={},ut={heatIncreaseInterval:60,maxHeatLevel:6,arrestCountdownTime:1,arrestSpeedThreshold:.1,touchArrest:!0,playerCrashDamageMultiplier:.3,policeCrashDamageMultiplier:.4,minCrashDamage:5,policeSpawnInterval:10,passiveIncomeInterval:10,passiveIncomeBase:100,coinBaseValue:50};function hc(){const n=localStorage.getItem("gameConfig");if(n)try{const e=JSON.parse(n);Object.assign(ut,e)}catch(e){console.warn("Failed to load saved config:",e)}}hc();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ta="160",dc=0,ya=1,uc=2,fc=0,fl=1,pc=2,xn=3,Nn=0,Gt=1,Mt=2,Ln=0,Mi=1,Ea=2,Ta=3,wa=4,mc=5,$n=100,gc=101,_c=102,ba=103,Aa=104,vc=200,xc=201,Mc=202,Sc=203,Ds=204,Ls=205,yc=206,Ec=207,Tc=208,wc=209,bc=210,Ac=211,Rc=212,Cc=213,Pc=214,Dc=0,Lc=1,Ic=2,Rr=3,Uc=4,Nc=5,Fc=6,Oc=7,Or=0,Bc=1,zc=2,In=0,Gc=1,Hc=2,kc=3,Vc=4,Wc=5,Xc=6,pl=300,wi=301,bi=302,Is=303,Us=304,Br=306,Ns=1e3,nn=1001,Fs=1002,Nt=1003,Ra=1004,jr=1005,$t=1006,qc=1007,Wi=1008,Un=1009,Yc=1010,$c=1011,na=1012,ml=1013,Pn=1014,Dn=1015,Xi=1016,gl=1017,_l=1018,Kn=1020,jc=1021,rn=1023,Kc=1024,Zc=1025,Zn=1026,Ai=1027,Jc=1028,vl=1029,Qc=1030,xl=1031,Ml=1033,Kr=33776,Zr=33777,Jr=33778,Qr=33779,Ca=35840,Pa=35841,Da=35842,La=35843,Sl=36196,Ia=37492,Ua=37496,Na=37808,Fa=37809,Oa=37810,Ba=37811,za=37812,Ga=37813,Ha=37814,ka=37815,Va=37816,Wa=37817,Xa=37818,qa=37819,Ya=37820,$a=37821,es=36492,ja=36494,Ka=36495,eh=36283,Za=36284,Ja=36285,Qa=36286,yl=3e3,Jn=3001,th=3200,nh=3201,ia=0,ih=1,Kt="",yt="srgb",Sn="srgb-linear",ra="display-p3",zr="display-p3-linear",Cr="linear",it="srgb",Pr="rec709",Dr="p3",ti=7680,eo=519,rh=512,sh=513,ah=514,El=515,oh=516,lh=517,ch=518,hh=519,to=35044,no="300 es",Os=1035,Mn=2e3,Lr=2001;class Ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ts=Math.PI/180,Bs=180/Math.PI;function Yi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]).toLowerCase()}function Bt(n,e,t){return Math.max(e,Math.min(t,n))}function dh(n,e){return(n%e+e)%e}function ns(n,e,t){return(1-t)*n+t*e}function io(n){return(n&n-1)===0&&n!==0}function zs(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Ui(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ot(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class je{constructor(e=0,t=0){je.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,t,i,r,s,a,o,l,c){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],g=i[5],v=i[8],_=r[0],m=r[3],d=r[6],T=r[1],y=r[4],b=r[7],D=r[2],A=r[5],R=r[8];return s[0]=a*_+o*T+l*D,s[3]=a*m+o*y+l*A,s[6]=a*d+o*b+l*R,s[1]=c*_+h*T+f*D,s[4]=c*m+h*y+f*A,s[7]=c*d+h*b+f*R,s[2]=u*_+g*T+v*D,s[5]=u*m+g*y+v*A,s[8]=u*d+g*b+v*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,u=o*l-h*s,g=c*s-a*l,v=t*f+i*u+r*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/v;return e[0]=f*_,e[1]=(r*c-h*i)*_,e[2]=(o*i-r*a)*_,e[3]=u*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=g*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(is.makeScale(e,t)),this}rotate(e){return this.premultiply(is.makeRotation(-e)),this}translate(e,t){return this.premultiply(is.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const is=new qe;function Tl(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ir(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function uh(){const n=Ir("canvas");return n.style.display="block",n}const ro={};function ki(n){n in ro||(ro[n]=!0,console.warn(n))}const so=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ao=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ji={[Sn]:{transfer:Cr,primaries:Pr,toReference:n=>n,fromReference:n=>n},[yt]:{transfer:it,primaries:Pr,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[zr]:{transfer:Cr,primaries:Dr,toReference:n=>n.applyMatrix3(ao),fromReference:n=>n.applyMatrix3(so)},[ra]:{transfer:it,primaries:Dr,toReference:n=>n.convertSRGBToLinear().applyMatrix3(ao),fromReference:n=>n.applyMatrix3(so).convertLinearToSRGB()}},fh=new Set([Sn,zr]),Qe={enabled:!0,_workingColorSpace:Sn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!fh.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Ji[e].toReference,r=Ji[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Ji[n].primaries},getTransfer:function(n){return n===Kt?Cr:Ji[n].transfer}};function Si(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function rs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ni;class wl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ni===void 0&&(ni=Ir("canvas")),ni.width=e.width,ni.height=e.height;const i=ni.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ni}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ir("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Si(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Si(t[i]/255)*255):t[i]=Si(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ph=0;class bl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ph++}),this.uuid=Yi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ss(r[a].image)):s.push(ss(r[a]))}else s=ss(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ss(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?wl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mh=0;class Wt extends Ci{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,i=nn,r=nn,s=$t,a=Wi,o=rn,l=Un,c=Wt.DEFAULT_ANISOTROPY,h=Kt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=Yi(),this.name="",this.source=new bl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new je(0,0),this.repeat=new je(1,1),this.center=new je(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ki("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Jn?yt:Kt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ns:e.x=e.x-Math.floor(e.x);break;case nn:e.x=e.x<0?0:1;break;case Fs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ns:e.y=e.y-Math.floor(e.y);break;case nn:e.y=e.y<0?0:1;break;case Fs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ki("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===yt?Jn:yl}set encoding(e){ki("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Jn?yt:Kt}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=pl;Wt.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,t=0,i=0,r=1){St.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],h=l[4],f=l[8],u=l[1],g=l[5],v=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(v-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(v+m)<.1&&Math.abs(c+g+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,b=(g+1)/2,D=(d+1)/2,A=(h+u)/4,R=(f+_)/4,$=(v+m)/4;return y>b&&y>D?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=A/i,s=R/i):b>D?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=A/r,s=$/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=R/s,r=$/s),this.set(i,r,s,t),this}let T=Math.sqrt((m-v)*(m-v)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(T)<.001&&(T=1),this.x=(m-v)/T,this.y=(f-_)/T,this.z=(u-h)/T,this.w=Math.acos((c+g+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gh extends Ci{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(ki("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Jn?yt:Kt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Wt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new bl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qn extends gh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Al extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _h extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],f=i[r+3];const u=s[a+0],g=s[a+1],v=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f;return}if(o===1){e[t+0]=u,e[t+1]=g,e[t+2]=v,e[t+3]=_;return}if(f!==_||l!==u||c!==g||h!==v){let m=1-o;const d=l*u+c*g+h*v+f*_,T=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const D=Math.sqrt(y),A=Math.atan2(D,d*T);m=Math.sin(m*A)/D,o=Math.sin(o*A)/D}const b=o*T;if(l=l*m+u*b,c=c*m+g*b,h=h*m+v*b,f=f*m+_*b,m===1-o){const D=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=D,c*=D,h*=D,f*=D}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],f=s[a],u=s[a+1],g=s[a+2],v=s[a+3];return e[t]=o*v+h*f+l*g-c*u,e[t+1]=l*v+h*u+c*f-o*g,e[t+2]=c*v+h*g+o*u-l*f,e[t+3]=h*v-o*f-l*u-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),f=o(s/2),u=l(i/2),g=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=u*h*f+c*g*v,this._y=c*g*f-u*h*v,this._z=c*h*v+u*g*f,this._w=c*h*f-u*g*v;break;case"YXZ":this._x=u*h*f+c*g*v,this._y=c*g*f-u*h*v,this._z=c*h*v-u*g*f,this._w=c*h*f+u*g*v;break;case"ZXY":this._x=u*h*f-c*g*v,this._y=c*g*f+u*h*v,this._z=c*h*v+u*g*f,this._w=c*h*f-u*g*v;break;case"ZYX":this._x=u*h*f-c*g*v,this._y=c*g*f+u*h*v,this._z=c*h*v-u*g*f,this._w=c*h*f+u*g*v;break;case"YZX":this._x=u*h*f+c*g*v,this._y=c*g*f+u*h*v,this._z=c*h*v-u*g*f,this._w=c*h*f-u*g*v;break;case"XZY":this._x=u*h*f-c*g*v,this._y=c*g*f-u*h*v,this._z=c*h*v+u*g*f,this._w=c*h*f+u*g*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],u=i+o+f;if(u>0){const g=.5/Math.sqrt(u+1);this._w=.25/g,this._x=(h-l)*g,this._y=(s-c)*g,this._z=(a-r)*g}else if(i>o&&i>f){const g=2*Math.sqrt(1+i-o-f);this._w=(h-l)/g,this._x=.25*g,this._y=(r+a)/g,this._z=(s+c)/g}else if(o>f){const g=2*Math.sqrt(1+o-i-f);this._w=(s-c)/g,this._x=(r+a)/g,this._y=.25*g,this._z=(l+h)/g}else{const g=2*Math.sqrt(1+f-i-o);this._w=(a-r)/g,this._x=(s+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const g=1-t;return this._w=g*a+t*this._w,this._x=g*i+t*this._x,this._y=g*r+t*this._y,this._z=g*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),f=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*f+this._w*u,this._x=i*f+this._x*u,this._y=r*f+this._y*u,this._z=s*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(oo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(oo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),h=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*h,this.y=i+l*h+o*c-s*f,this.z=r+l*f+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return as.copy(this).projectOnVector(e),this.sub(as)}reflect(e){return this.sub(as.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const as=new L,oo=new Pi;class $i{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zt):Zt.fromBufferAttribute(s,a),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qi.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qi.copy(i.boundingBox)),Qi.applyMatrix4(e.matrixWorld),this.union(Qi)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ni),er.subVectors(this.max,Ni),ii.subVectors(e.a,Ni),ri.subVectors(e.b,Ni),si.subVectors(e.c,Ni),Tn.subVectors(ri,ii),wn.subVectors(si,ri),zn.subVectors(ii,si);let t=[0,-Tn.z,Tn.y,0,-wn.z,wn.y,0,-zn.z,zn.y,Tn.z,0,-Tn.x,wn.z,0,-wn.x,zn.z,0,-zn.x,-Tn.y,Tn.x,0,-wn.y,wn.x,0,-zn.y,zn.x,0];return!os(t,ii,ri,si,er)||(t=[1,0,0,0,1,0,0,0,1],!os(t,ii,ri,si,er))?!1:(tr.crossVectors(Tn,wn),t=[tr.x,tr.y,tr.z],os(t,ii,ri,si,er))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const pn=[new L,new L,new L,new L,new L,new L,new L,new L],Zt=new L,Qi=new $i,ii=new L,ri=new L,si=new L,Tn=new L,wn=new L,zn=new L,Ni=new L,er=new L,tr=new L,Gn=new L;function os(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Gn.fromArray(n,s);const o=r.x*Math.abs(Gn.x)+r.y*Math.abs(Gn.y)+r.z*Math.abs(Gn.z),l=e.dot(Gn),c=t.dot(Gn),h=i.dot(Gn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const vh=new $i,Fi=new L,ls=new L;class sa{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):vh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fi.subVectors(e,this.center);const t=Fi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Fi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ls.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fi.copy(e.center).add(ls)),this.expandByPoint(Fi.copy(e.center).sub(ls))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mn=new L,cs=new L,nr=new L,bn=new L,hs=new L,ir=new L,ds=new L;class xh{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mn.copy(this.origin).addScaledVector(this.direction,t),mn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){cs.copy(e).add(t).multiplyScalar(.5),nr.copy(t).sub(e).normalize(),bn.copy(this.origin).sub(cs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(nr),o=bn.dot(this.direction),l=-bn.dot(nr),c=bn.lengthSq(),h=Math.abs(1-a*a);let f,u,g,v;if(h>0)if(f=a*l-o,u=a*o-l,v=s*h,f>=0)if(u>=-v)if(u<=v){const _=1/h;f*=_,u*=_,g=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=s,f=Math.max(0,-(a*u+o)),g=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(a*u+o)),g=-f*f+u*(u+2*l)+c;else u<=-v?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-l),s),g=-f*f+u*(u+2*l)+c):u<=v?(f=0,u=Math.min(Math.max(-s,-l),s),g=u*(u+2*l)+c):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-l),s),g=-f*f+u*(u+2*l)+c);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),g=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(cs).addScaledVector(nr,u),g}intersectSphere(e,t){mn.subVectors(e.center,this.origin);const i=mn.dot(this.direction),r=mn.dot(mn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,mn)!==null}intersectTriangle(e,t,i,r,s){hs.subVectors(t,e),ir.subVectors(i,e),ds.crossVectors(hs,ir);let a=this.direction.dot(ds),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;bn.subVectors(this.origin,e);const l=o*this.direction.dot(ir.crossVectors(bn,ir));if(l<0)return null;const c=o*this.direction.dot(hs.cross(bn));if(c<0||l+c>a)return null;const h=-o*bn.dot(ds);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ft{constructor(e,t,i,r,s,a,o,l,c,h,f,u,g,v,_,m){ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,h,f,u,g,v,_,m)}set(e,t,i,r,s,a,o,l,c,h,f,u,g,v,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=f,d[14]=u,d[3]=g,d[7]=v,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ai.setFromMatrixColumn(e,0).length(),s=1/ai.setFromMatrixColumn(e,1).length(),a=1/ai.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*h,g=a*f,v=o*h,_=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=g+v*c,t[5]=u-_*c,t[9]=-o*l,t[2]=_-u*c,t[6]=v+g*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,g=l*f,v=c*h,_=c*f;t[0]=u+_*o,t[4]=v*o-g,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=g*o-v,t[6]=_+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,g=l*f,v=c*h,_=c*f;t[0]=u-_*o,t[4]=-a*f,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,g=a*f,v=o*h,_=o*f;t[0]=l*h,t[4]=v*c-g,t[8]=u*c+_,t[1]=l*f,t[5]=_*c+u,t[9]=g*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,g=a*c,v=o*l,_=o*c;t[0]=l*h,t[4]=_-u*f,t[8]=v*f+g,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=g*f+v,t[10]=u-_*f}else if(e.order==="XZY"){const u=a*l,g=a*c,v=o*l,_=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=u*f+_,t[5]=a*h,t[9]=g*f-v,t[2]=v*f-g,t[6]=o*h,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mh,e,Sh)}lookAt(e,t,i){const r=this.elements;return kt.subVectors(e,t),kt.lengthSq()===0&&(kt.z=1),kt.normalize(),An.crossVectors(i,kt),An.lengthSq()===0&&(Math.abs(i.z)===1?kt.x+=1e-4:kt.z+=1e-4,kt.normalize(),An.crossVectors(i,kt)),An.normalize(),rr.crossVectors(kt,An),r[0]=An.x,r[4]=rr.x,r[8]=kt.x,r[1]=An.y,r[5]=rr.y,r[9]=kt.y,r[2]=An.z,r[6]=rr.z,r[10]=kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],g=i[13],v=i[2],_=i[6],m=i[10],d=i[14],T=i[3],y=i[7],b=i[11],D=i[15],A=r[0],R=r[4],$=r[8],M=r[12],w=r[1],k=r[5],N=r[9],K=r[13],P=r[2],I=r[6],F=r[10],X=r[14],q=r[3],Y=r[7],j=r[11],J=r[15];return s[0]=a*A+o*w+l*P+c*q,s[4]=a*R+o*k+l*I+c*Y,s[8]=a*$+o*N+l*F+c*j,s[12]=a*M+o*K+l*X+c*J,s[1]=h*A+f*w+u*P+g*q,s[5]=h*R+f*k+u*I+g*Y,s[9]=h*$+f*N+u*F+g*j,s[13]=h*M+f*K+u*X+g*J,s[2]=v*A+_*w+m*P+d*q,s[6]=v*R+_*k+m*I+d*Y,s[10]=v*$+_*N+m*F+d*j,s[14]=v*M+_*K+m*X+d*J,s[3]=T*A+y*w+b*P+D*q,s[7]=T*R+y*k+b*I+D*Y,s[11]=T*$+y*N+b*F+D*j,s[15]=T*M+y*K+b*X+D*J,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],u=e[10],g=e[14],v=e[3],_=e[7],m=e[11],d=e[15];return v*(+s*l*f-r*c*f-s*o*u+i*c*u+r*o*g-i*l*g)+_*(+t*l*g-t*c*u+s*a*u-r*a*g+r*c*h-s*l*h)+m*(+t*c*f-t*o*g-s*a*f+i*a*g+s*o*h-i*c*h)+d*(-r*o*h-t*l*f+t*o*u+r*a*f-i*a*u+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],u=e[10],g=e[11],v=e[12],_=e[13],m=e[14],d=e[15],T=f*m*c-_*u*c+_*l*g-o*m*g-f*l*d+o*u*d,y=v*u*c-h*m*c-v*l*g+a*m*g+h*l*d-a*u*d,b=h*_*c-v*f*c+v*o*g-a*_*g-h*o*d+a*f*d,D=v*f*l-h*_*l-v*o*u+a*_*u+h*o*m-a*f*m,A=t*T+i*y+r*b+s*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return e[0]=T*R,e[1]=(_*u*s-f*m*s-_*r*g+i*m*g+f*r*d-i*u*d)*R,e[2]=(o*m*s-_*l*s+_*r*c-i*m*c-o*r*d+i*l*d)*R,e[3]=(f*l*s-o*u*s-f*r*c+i*u*c+o*r*g-i*l*g)*R,e[4]=y*R,e[5]=(h*m*s-v*u*s+v*r*g-t*m*g-h*r*d+t*u*d)*R,e[6]=(v*l*s-a*m*s-v*r*c+t*m*c+a*r*d-t*l*d)*R,e[7]=(a*u*s-h*l*s+h*r*c-t*u*c-a*r*g+t*l*g)*R,e[8]=b*R,e[9]=(v*f*s-h*_*s-v*i*g+t*_*g+h*i*d-t*f*d)*R,e[10]=(a*_*s-v*o*s+v*i*c-t*_*c-a*i*d+t*o*d)*R,e[11]=(h*o*s-a*f*s-h*i*c+t*f*c+a*i*g-t*o*g)*R,e[12]=D*R,e[13]=(h*_*r-v*f*r+v*i*u-t*_*u-h*i*m+t*f*m)*R,e[14]=(v*o*r-a*_*r-v*i*l+t*_*l+a*i*m-t*o*m)*R,e[15]=(a*f*r-h*o*r+h*i*l-t*f*l-a*i*u+t*o*u)*R,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,f=o+o,u=s*c,g=s*h,v=s*f,_=a*h,m=a*f,d=o*f,T=l*c,y=l*h,b=l*f,D=i.x,A=i.y,R=i.z;return r[0]=(1-(_+d))*D,r[1]=(g+b)*D,r[2]=(v-y)*D,r[3]=0,r[4]=(g-b)*A,r[5]=(1-(u+d))*A,r[6]=(m+T)*A,r[7]=0,r[8]=(v+y)*R,r[9]=(m-T)*R,r[10]=(1-(u+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ai.set(r[0],r[1],r[2]).length();const a=ai.set(r[4],r[5],r[6]).length(),o=ai.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Jt.copy(this);const c=1/s,h=1/a,f=1/o;return Jt.elements[0]*=c,Jt.elements[1]*=c,Jt.elements[2]*=c,Jt.elements[4]*=h,Jt.elements[5]*=h,Jt.elements[6]*=h,Jt.elements[8]*=f,Jt.elements[9]*=f,Jt.elements[10]*=f,t.setFromRotationMatrix(Jt),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Mn){const l=this.elements,c=2*s/(t-e),h=2*s/(i-r),f=(t+e)/(t-e),u=(i+r)/(i-r);let g,v;if(o===Mn)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Lr)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Mn){const l=this.elements,c=1/(t-e),h=1/(i-r),f=1/(a-s),u=(t+e)*c,g=(i+r)*h;let v,_;if(o===Mn)v=(a+s)*f,_=-2*f;else if(o===Lr)v=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=_,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ai=new L,Jt=new ft,Mh=new L(0,0,0),Sh=new L(1,1,1),An=new L,rr=new L,kt=new L,lo=new ft,co=new Pi;class Gr{constructor(e=0,t=0,i=0,r=Gr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],f=r[2],u=r[6],g=r[10];switch(t){case"XYZ":this._y=Math.asin(Bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Bt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,g),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return lo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(lo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return co.setFromEuler(this),this.setFromQuaternion(co,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gr.DEFAULT_ORDER="XYZ";class Rl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yh=0;const ho=new L,oi=new Pi,gn=new ft,sr=new L,Oi=new L,Eh=new L,Th=new Pi,uo=new L(1,0,0),fo=new L(0,1,0),po=new L(0,0,1),wh={type:"added"},bh={type:"removed"};class Tt extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=Yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new L,t=new Gr,i=new Pi,r=new L(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ft},normalMatrix:{value:new qe}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.multiply(oi),this}rotateOnWorldAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.premultiply(oi),this}rotateX(e){return this.rotateOnAxis(uo,e)}rotateY(e){return this.rotateOnAxis(fo,e)}rotateZ(e){return this.rotateOnAxis(po,e)}translateOnAxis(e,t){return ho.copy(e).applyQuaternion(this.quaternion),this.position.add(ho.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(uo,e)}translateY(e){return this.translateOnAxis(fo,e)}translateZ(e){return this.translateOnAxis(po,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?sr.copy(e):sr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(Oi,sr,this.up):gn.lookAt(sr,Oi,this.up),this.quaternion.setFromRotationMatrix(gn),r&&(gn.extractRotation(r.matrixWorld),oi.setFromRotationMatrix(gn),this.quaternion.premultiply(oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(wh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(gn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,e,Eh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,Th,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),g.length>0&&(i.animations=g),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Tt.DEFAULT_UP=new L(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qt=new L,_n=new L,us=new L,vn=new L,li=new L,ci=new L,mo=new L,fs=new L,ps=new L,ms=new L;let ar=!1;class tn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Qt.subVectors(e,t),r.cross(Qt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Qt.subVectors(r,t),_n.subVectors(i,t),us.subVectors(e,t);const a=Qt.dot(Qt),o=Qt.dot(_n),l=Qt.dot(us),c=_n.dot(_n),h=_n.dot(us),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,g=(c*l-o*h)*u,v=(a*h-o*l)*u;return s.set(1-g-v,v,g)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getUV(e,t,i,r,s,a,o,l){return ar===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ar=!0),this.getInterpolation(e,t,i,r,s,a,o,l)}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,vn.x),l.addScaledVector(a,vn.y),l.addScaledVector(o,vn.z),l)}static isFrontFacing(e,t,i,r){return Qt.subVectors(i,t),_n.subVectors(e,t),Qt.cross(_n).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qt.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),Qt.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return ar===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ar=!0),tn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return tn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;li.subVectors(r,i),ci.subVectors(s,i),fs.subVectors(e,i);const l=li.dot(fs),c=ci.dot(fs);if(l<=0&&c<=0)return t.copy(i);ps.subVectors(e,r);const h=li.dot(ps),f=ci.dot(ps);if(h>=0&&f<=h)return t.copy(r);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(li,a);ms.subVectors(e,s);const g=li.dot(ms),v=ci.dot(ms);if(v>=0&&g<=v)return t.copy(s);const _=g*c-l*v;if(_<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(i).addScaledVector(ci,o);const m=h*v-g*f;if(m<=0&&f-h>=0&&g-v>=0)return mo.subVectors(s,r),o=(f-h)/(f-h+(g-v)),t.copy(r).addScaledVector(mo,o);const d=1/(m+_+u);return a=_*d,o=u*d,t.copy(i).addScaledVector(li,a).addScaledVector(ci,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},or={h:0,s:0,l:0};function gs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ne{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=dh(e,1),t=Bt(t,0,1),i=Bt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=gs(a,s,e+1/3),this.g=gs(a,s,e),this.b=gs(a,s,e-1/3)}return Qe.toWorkingColorSpace(this,r),this}setStyle(e,t=yt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const i=Cl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}copyLinearToSRGB(e){return this.r=rs(e.r),this.g=rs(e.g),this.b=rs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return Qe.fromWorkingColorSpace(At.copy(this),e),Math.round(Bt(At.r*255,0,255))*65536+Math.round(Bt(At.g*255,0,255))*256+Math.round(Bt(At.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(At.copy(this),t);const i=At.r,r=At.g,s=At.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=yt){Qe.fromWorkingColorSpace(At.copy(this),e);const t=At.r,i=At.g,r=At.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(or);const i=ns(Rn.h,or.h,t),r=ns(Rn.s,or.s,t),s=ns(Rn.l,or.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Ne;Ne.NAMES=Cl;let Ah=0;class Di extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=Yi(),this.name="",this.type="Material",this.blending=Mi,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ds,this.blendDst=Ls,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=eo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Mi&&(i.blending=this.blending),this.side!==Nn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ds&&(i.blendSrc=this.blendSrc),this.blendDst!==Ls&&(i.blendDst=this.blendDst),this.blendEquation!==$n&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Rr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==eo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ht extends Di{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Or,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new L,lr=new je;class hn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=to,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXY(t,lr.x,lr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ui(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ot(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ui(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ui(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ui(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ui(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),i=Ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),i=Ot(i,this.array),r=Ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),i=Ot(i,this.array),r=Ot(r,this.array),s=Ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==to&&(e.usage=this.usage),e}}class Pl extends hn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Dl extends hn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Pt extends hn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Rh=0;const Yt=new ft,_s=new Tt,hi=new L,Vt=new $i,Bi=new $i,vt=new L;class dn extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=Yi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tl(e)?Dl:Pl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new qe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,i){return Yt.makeTranslation(e,t,i),this.applyMatrix4(Yt),this}scale(e,t,i){return Yt.makeScale(e,t,i),this.applyMatrix4(Yt),this}lookAt(e){return _s.lookAt(e),_s.updateMatrix(),this.applyMatrix4(_s.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Pt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Vt.setFromBufferAttribute(s),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Bi.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Vt.min,Bi.min),Vt.expandByPoint(vt),vt.addVectors(Vt.max,Bi.max),Vt.expandByPoint(vt)):(Vt.expandByPoint(Bi.min),Vt.expandByPoint(Bi.max))}Vt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)vt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(vt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)vt.fromBufferAttribute(o,c),l&&(hi.fromBufferAttribute(e,c),vt.add(hi)),r=Math.max(r,i.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let w=0;w<o;w++)c[w]=new L,h[w]=new L;const f=new L,u=new L,g=new L,v=new je,_=new je,m=new je,d=new L,T=new L;function y(w,k,N){f.fromArray(r,w*3),u.fromArray(r,k*3),g.fromArray(r,N*3),v.fromArray(a,w*2),_.fromArray(a,k*2),m.fromArray(a,N*2),u.sub(f),g.sub(f),_.sub(v),m.sub(v);const K=1/(_.x*m.y-m.x*_.y);isFinite(K)&&(d.copy(u).multiplyScalar(m.y).addScaledVector(g,-_.y).multiplyScalar(K),T.copy(g).multiplyScalar(_.x).addScaledVector(u,-m.x).multiplyScalar(K),c[w].add(d),c[k].add(d),c[N].add(d),h[w].add(T),h[k].add(T),h[N].add(T))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let w=0,k=b.length;w<k;++w){const N=b[w],K=N.start,P=N.count;for(let I=K,F=K+P;I<F;I+=3)y(i[I+0],i[I+1],i[I+2])}const D=new L,A=new L,R=new L,$=new L;function M(w){R.fromArray(s,w*3),$.copy(R);const k=c[w];D.copy(k),D.sub(R.multiplyScalar(R.dot(k))).normalize(),A.crossVectors($,k);const K=A.dot(h[w])<0?-1:1;l[w*4]=D.x,l[w*4+1]=D.y,l[w*4+2]=D.z,l[w*4+3]=K}for(let w=0,k=b.length;w<k;++w){const N=b[w],K=N.start,P=N.count;for(let I=K,F=K+P;I<F;I+=3)M(i[I+0]),M(i[I+1]),M(i[I+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,g=i.count;u<g;u++)i.setXYZ(u,0,0,0);const r=new L,s=new L,a=new L,o=new L,l=new L,c=new L,h=new L,f=new L;if(e)for(let u=0,g=e.count;u<g;u+=3){const v=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,g=t.count;u<g;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let g=0,v=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?g=l[_]*o.data.stride+o.offset:g=l[_]*h;for(let d=0;d<h;d++)u[v++]=c[g++]}return new hn(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new dn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],g=e(u,i);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const g=c[f];h.push(g.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],f=s[c];for(let u=0,g=f.length;u<g;u++)h.push(f[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const go=new ft,Hn=new xh,cr=new sa,_o=new L,di=new L,ui=new L,fi=new L,vs=new L,hr=new L,dr=new je,ur=new je,fr=new je,vo=new L,xo=new L,Mo=new L,pr=new L,mr=new L;class re extends Tt{constructor(e=new dn,t=new ht){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){hr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],f=s[l];h!==0&&(vs.fromBufferAttribute(f,e),a?hr.addScaledVector(vs,h):hr.addScaledVector(vs.sub(t),h))}t.add(hr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),cr.copy(i.boundingSphere),cr.applyMatrix4(s),Hn.copy(e.ray).recast(e.near),!(cr.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(cr,_o)===null||Hn.origin.distanceToSquared(_o)>(e.far-e.near)**2))&&(go.copy(s).invert(),Hn.copy(e.ray).applyMatrix4(go),!(i.boundingBox!==null&&Hn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Hn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,g=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,_=u.length;v<_;v++){const m=u[v],d=a[m.materialIndex],T=Math.max(m.start,g.start),y=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let b=T,D=y;b<D;b+=3){const A=o.getX(b),R=o.getX(b+1),$=o.getX(b+2);r=gr(this,d,e,i,c,h,f,A,R,$),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,g.start),_=Math.min(o.count,g.start+g.count);for(let m=v,d=_;m<d;m+=3){const T=o.getX(m),y=o.getX(m+1),b=o.getX(m+2);r=gr(this,a,e,i,c,h,f,T,y,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,_=u.length;v<_;v++){const m=u[v],d=a[m.materialIndex],T=Math.max(m.start,g.start),y=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let b=T,D=y;b<D;b+=3){const A=b,R=b+1,$=b+2;r=gr(this,d,e,i,c,h,f,A,R,$),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,g.start),_=Math.min(l.count,g.start+g.count);for(let m=v,d=_;m<d;m+=3){const T=m,y=m+1,b=m+2;r=gr(this,a,e,i,c,h,f,T,y,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Ch(n,e,t,i,r,s,a,o){let l;if(e.side===Gt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Nn,o),l===null)return null;mr.copy(o),mr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(mr);return c<t.near||c>t.far?null:{distance:c,point:mr.clone(),object:n}}function gr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,di),n.getVertexPosition(l,ui),n.getVertexPosition(c,fi);const h=Ch(n,e,t,i,di,ui,fi,pr);if(h){r&&(dr.fromBufferAttribute(r,o),ur.fromBufferAttribute(r,l),fr.fromBufferAttribute(r,c),h.uv=tn.getInterpolation(pr,di,ui,fi,dr,ur,fr,new je)),s&&(dr.fromBufferAttribute(s,o),ur.fromBufferAttribute(s,l),fr.fromBufferAttribute(s,c),h.uv1=tn.getInterpolation(pr,di,ui,fi,dr,ur,fr,new je),h.uv2=h.uv1),a&&(vo.fromBufferAttribute(a,o),xo.fromBufferAttribute(a,l),Mo.fromBufferAttribute(a,c),h.normal=tn.getInterpolation(pr,di,ui,fi,vo,xo,Mo,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new L,materialIndex:0};tn.getNormal(di,ui,fi,f.normal),h.face=f}return h}class Ue extends dn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,g=0;v("z","y","x",-1,-1,i,t,e,a,s,0),v("z","y","x",1,-1,i,t,-e,a,s,1),v("x","z","y",1,1,e,i,t,r,a,2),v("x","z","y",1,-1,e,i,-t,r,a,3),v("x","y","z",1,-1,e,t,i,r,s,4),v("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Pt(c,3)),this.setAttribute("normal",new Pt(h,3)),this.setAttribute("uv",new Pt(f,2));function v(_,m,d,T,y,b,D,A,R,$,M){const w=b/R,k=D/$,N=b/2,K=D/2,P=A/2,I=R+1,F=$+1;let X=0,q=0;const Y=new L;for(let j=0;j<F;j++){const J=j*k-K;for(let Q=0;Q<I;Q++){const V=Q*w-N;Y[_]=V*T,Y[m]=J*y,Y[d]=P,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[d]=A>0?1:-1,h.push(Y.x,Y.y,Y.z),f.push(Q/R),f.push(1-j/$),X+=1}}for(let j=0;j<$;j++)for(let J=0;J<R;J++){const Q=u+J+I*j,V=u+J+I*(j+1),Z=u+(J+1)+I*(j+1),he=u+(J+1)+I*j;l.push(Q,V,he),l.push(V,Z,he),q+=6}o.addGroup(g,q,M),g+=q,u+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ue(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ri(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Ut(n){const e={};for(let t=0;t<n.length;t++){const i=Ri(n[t]);for(const r in i)e[r]=i[r]}return e}function Ph(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ll(n){return n.getRenderTarget()===null?n.outputColorSpace:Qe.workingColorSpace}const Dh={clone:Ri,merge:Ut};var Lh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ih=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends Di{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lh,this.fragmentShader=Ih,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ri(e.uniforms),this.uniformsGroups=Ph(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Il extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=Mn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class jt extends Il{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ts*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bs*2*Math.atan(Math.tan(ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ts*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const pi=-90,mi=1;class Uh extends Tt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new jt(pi,mi,e,t);r.layers=this.layers,this.add(r);const s=new jt(pi,mi,e,t);s.layers=this.layers,this.add(s);const a=new jt(pi,mi,e,t);a.layers=this.layers,this.add(a);const o=new jt(pi,mi,e,t);o.layers=this.layers,this.add(o);const l=new jt(pi,mi,e,t);l.layers=this.layers,this.add(l);const c=new jt(pi,mi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Mn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Lr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(f,u,g),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Ul extends Wt{constructor(e,t,i,r,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:wi,super(e,t,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Nh extends Qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(ki("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Jn?yt:Kt),this.texture=new Ul(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:$t}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ue(5,5,5),s=new ei({name:"CubemapFromEquirect",uniforms:Ri(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:Ln});s.uniforms.tEquirect.value=t;const a=new re(r,s),o=t.minFilter;return t.minFilter===Wi&&(t.minFilter=$t),new Uh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const xs=new L,Fh=new L,Oh=new qe;class qn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=xs.subVectors(i,t).cross(Fh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(xs),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Oh.getNormalMatrix(e),r=this.coplanarPoint(xs).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kn=new sa,_r=new L;class aa{constructor(e=new qn,t=new qn,i=new qn,r=new qn,s=new qn,a=new qn){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Mn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],h=r[5],f=r[6],u=r[7],g=r[8],v=r[9],_=r[10],m=r[11],d=r[12],T=r[13],y=r[14],b=r[15];if(i[0].setComponents(l-s,u-c,m-g,b-d).normalize(),i[1].setComponents(l+s,u+c,m+g,b+d).normalize(),i[2].setComponents(l+a,u+h,m+v,b+T).normalize(),i[3].setComponents(l-a,u-h,m-v,b-T).normalize(),i[4].setComponents(l-o,u-f,m-_,b-y).normalize(),t===Mn)i[5].setComponents(l+o,u+f,m+_,b+y).normalize();else if(t===Lr)i[5].setComponents(o,f,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(kn)}intersectsSprite(e){return kn.center.set(0,0,0),kn.radius=.7071067811865476,kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(kn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(_r.x=r.normal.x>0?e.max.x:e.min.x,_r.y=r.normal.y>0?e.max.y:e.min.y,_r.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_r)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Nl(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Bh(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,h){const f=c.array,u=c.usage,g=f.byteLength,v=n.createBuffer();n.bindBuffer(h,v),n.bufferData(h,f,u),c.onUploadCallback();let _;if(f instanceof Float32Array)_=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=n.SHORT;else if(f instanceof Uint32Array)_=n.UNSIGNED_INT;else if(f instanceof Int32Array)_=n.INT;else if(f instanceof Int8Array)_=n.BYTE;else if(f instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:v,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:g}}function s(c,h,f){const u=h.array,g=h._updateRange,v=h.updateRanges;if(n.bindBuffer(f,c),g.count===-1&&v.length===0&&n.bufferSubData(f,0,u),v.length!==0){for(let _=0,m=v.length;_<m;_++){const d=v[_];t?n.bufferSubData(f,d.start*u.BYTES_PER_ELEMENT,u,d.start,d.count):n.bufferSubData(f,d.start*u.BYTES_PER_ELEMENT,u.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}g.count!==-1&&(t?n.bufferSubData(f,g.offset*u.BYTES_PER_ELEMENT,u,g.offset,g.count):n.bufferSubData(f,g.offset*u.BYTES_PER_ELEMENT,u.subarray(g.offset,g.offset+g.count)),g.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=i.get(c);(!u||u.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,h));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,h),f.version=c.version}}return{get:a,remove:o,update:l}}class Xt extends dn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,f=e/o,u=t/l,g=[],v=[],_=[],m=[];for(let d=0;d<h;d++){const T=d*u-a;for(let y=0;y<c;y++){const b=y*f-s;v.push(b,-T,0),_.push(0,0,1),m.push(y/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let T=0;T<o;T++){const y=T+c*d,b=T+c*(d+1),D=T+1+c*(d+1),A=T+1+c*d;g.push(y,b,A),g.push(b,D,A)}this.setIndex(g),this.setAttribute("position",new Pt(v,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xt(e.width,e.height,e.widthSegments,e.heightSegments)}}var zh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gh=`#ifdef USE_ALPHAHASH
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
#endif`,Hh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Wh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xh=`#ifdef USE_AOMAP
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
#endif`,qh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yh=`#ifdef USE_BATCHING
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
#endif`,$h=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,jh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Jh=`#ifdef USE_IRIDESCENCE
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
#endif`,Qh=`#ifdef USE_BUMPMAP
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
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,ld=`#define PI 3.141592653589793
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
} // validated`,cd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hd=`vec3 transformedNormal = objectNormal;
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
#endif`,dd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ud=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,md="gl_FragColor = linearToOutputTexel( gl_FragColor );",gd=`
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
}`,_d=`#ifdef USE_ENVMAP
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
#endif`,vd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xd=`#ifdef USE_ENVMAP
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
#endif`,Md=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sd=`#ifdef USE_ENVMAP
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
#endif`,yd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ed=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Td=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bd=`#ifdef USE_GRADIENTMAP
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
}`,Ad=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Rd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dd=`uniform bool receiveShadow;
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
#endif`,Ld=`#ifdef USE_ENVMAP
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
#endif`,Id=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ud=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Od=`PhysicalMaterial material;
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
#endif`,Bd=`struct PhysicalMaterial {
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
}`,zd=`
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
#endif`,Gd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Hd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Xd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,qd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$d=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jd=`#if defined( USE_POINTS_UV )
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
#endif`,Kd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qd=`#ifdef USE_MORPHNORMALS
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
#endif`,eu=`#ifdef USE_MORPHTARGETS
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
#endif`,tu=`#ifdef USE_MORPHTARGETS
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
#endif`,nu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,iu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ru=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,su=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,au=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ou=`#ifdef USE_NORMALMAP
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
#endif`,lu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,du=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_u=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Su=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Eu=`float getShadowMask() {
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
}`,Tu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wu=`#ifdef USE_SKINNING
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
#endif`,bu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Au=`#ifdef USE_SKINNING
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
#endif`,Ru=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Du=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lu=`#ifdef USE_TRANSMISSION
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
#endif`,Iu=`#ifdef USE_TRANSMISSION
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
#endif`,Uu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ou=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zu=`uniform sampler2D t2D;
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
}`,Gu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hu=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ku=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wu=`#include <common>
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
}`,Xu=`#if DEPTH_PACKING == 3200
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
}`,qu=`#define DISTANCE
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
}`,Yu=`#define DISTANCE
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
}`,$u=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ju=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ku=`uniform float scale;
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
}`,Zu=`uniform vec3 diffuse;
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
}`,Ju=`#include <common>
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
}`,Qu=`uniform vec3 diffuse;
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
}`,ef=`#define LAMBERT
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
}`,tf=`#define LAMBERT
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
}`,nf=`#define MATCAP
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
}`,rf=`#define MATCAP
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
}`,sf=`#define NORMAL
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
}`,af=`#define NORMAL
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
}`,of=`#define PHONG
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
}`,lf=`#define PHONG
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
}`,cf=`#define STANDARD
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
}`,hf=`#define STANDARD
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
}`,df=`#define TOON
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
}`,uf=`#define TOON
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
}`,ff=`uniform float size;
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
}`,pf=`uniform vec3 diffuse;
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
}`,mf=`#include <common>
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
}`,gf=`uniform vec3 color;
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
}`,_f=`uniform float rotation;
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
}`,vf=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:zh,alphahash_pars_fragment:Gh,alphamap_fragment:Hh,alphamap_pars_fragment:kh,alphatest_fragment:Vh,alphatest_pars_fragment:Wh,aomap_fragment:Xh,aomap_pars_fragment:qh,batching_pars_vertex:Yh,batching_vertex:$h,begin_vertex:jh,beginnormal_vertex:Kh,bsdfs:Zh,iridescence_fragment:Jh,bumpmap_pars_fragment:Qh,clipping_planes_fragment:ed,clipping_planes_pars_fragment:td,clipping_planes_pars_vertex:nd,clipping_planes_vertex:id,color_fragment:rd,color_pars_fragment:sd,color_pars_vertex:ad,color_vertex:od,common:ld,cube_uv_reflection_fragment:cd,defaultnormal_vertex:hd,displacementmap_pars_vertex:dd,displacementmap_vertex:ud,emissivemap_fragment:fd,emissivemap_pars_fragment:pd,colorspace_fragment:md,colorspace_pars_fragment:gd,envmap_fragment:_d,envmap_common_pars_fragment:vd,envmap_pars_fragment:xd,envmap_pars_vertex:Md,envmap_physical_pars_fragment:Ld,envmap_vertex:Sd,fog_vertex:yd,fog_pars_vertex:Ed,fog_fragment:Td,fog_pars_fragment:wd,gradientmap_pars_fragment:bd,lightmap_fragment:Ad,lightmap_pars_fragment:Rd,lights_lambert_fragment:Cd,lights_lambert_pars_fragment:Pd,lights_pars_begin:Dd,lights_toon_fragment:Id,lights_toon_pars_fragment:Ud,lights_phong_fragment:Nd,lights_phong_pars_fragment:Fd,lights_physical_fragment:Od,lights_physical_pars_fragment:Bd,lights_fragment_begin:zd,lights_fragment_maps:Gd,lights_fragment_end:Hd,logdepthbuf_fragment:kd,logdepthbuf_pars_fragment:Vd,logdepthbuf_pars_vertex:Wd,logdepthbuf_vertex:Xd,map_fragment:qd,map_pars_fragment:Yd,map_particle_fragment:$d,map_particle_pars_fragment:jd,metalnessmap_fragment:Kd,metalnessmap_pars_fragment:Zd,morphcolor_vertex:Jd,morphnormal_vertex:Qd,morphtarget_pars_vertex:eu,morphtarget_vertex:tu,normal_fragment_begin:nu,normal_fragment_maps:iu,normal_pars_fragment:ru,normal_pars_vertex:su,normal_vertex:au,normalmap_pars_fragment:ou,clearcoat_normal_fragment_begin:lu,clearcoat_normal_fragment_maps:cu,clearcoat_pars_fragment:hu,iridescence_pars_fragment:du,opaque_fragment:uu,packing:fu,premultiplied_alpha_fragment:pu,project_vertex:mu,dithering_fragment:gu,dithering_pars_fragment:_u,roughnessmap_fragment:vu,roughnessmap_pars_fragment:xu,shadowmap_pars_fragment:Mu,shadowmap_pars_vertex:Su,shadowmap_vertex:yu,shadowmask_pars_fragment:Eu,skinbase_vertex:Tu,skinning_pars_vertex:wu,skinning_vertex:bu,skinnormal_vertex:Au,specularmap_fragment:Ru,specularmap_pars_fragment:Cu,tonemapping_fragment:Pu,tonemapping_pars_fragment:Du,transmission_fragment:Lu,transmission_pars_fragment:Iu,uv_pars_fragment:Uu,uv_pars_vertex:Nu,uv_vertex:Fu,worldpos_vertex:Ou,background_vert:Bu,background_frag:zu,backgroundCube_vert:Gu,backgroundCube_frag:Hu,cube_vert:ku,cube_frag:Vu,depth_vert:Wu,depth_frag:Xu,distanceRGBA_vert:qu,distanceRGBA_frag:Yu,equirect_vert:$u,equirect_frag:ju,linedashed_vert:Ku,linedashed_frag:Zu,meshbasic_vert:Ju,meshbasic_frag:Qu,meshlambert_vert:ef,meshlambert_frag:tf,meshmatcap_vert:nf,meshmatcap_frag:rf,meshnormal_vert:sf,meshnormal_frag:af,meshphong_vert:of,meshphong_frag:lf,meshphysical_vert:cf,meshphysical_frag:hf,meshtoon_vert:df,meshtoon_frag:uf,points_vert:ff,points_frag:pf,shadow_vert:mf,shadow_frag:gf,sprite_vert:_f,sprite_frag:vf},ae={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new je(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new je(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},cn={basic:{uniforms:Ut([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Ut([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Ut([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Ut([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Ut([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Ut([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Ut([ae.points,ae.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Ut([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Ut([ae.common,ae.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Ut([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Ut([ae.sprite,ae.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Ut([ae.common,ae.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Ut([ae.lights,ae.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};cn.physical={uniforms:Ut([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new je(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new je},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new je},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const vr={r:0,b:0,g:0};function xf(n,e,t,i,r,s,a){const o=new Ne(0);let l=s===!0?0:1,c,h,f=null,u=0,g=null;function v(m,d){let T=!1,y=d.isScene===!0?d.background:null;y&&y.isTexture&&(y=(d.backgroundBlurriness>0?t:e).get(y)),y===null?_(o,l):y&&y.isColor&&(_(y,1),T=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||T)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Br)?(h===void 0&&(h=new re(new Ue(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:Ri(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=Qe.getTransfer(y.colorSpace)!==it,(f!==y||u!==y.version||g!==n.toneMapping)&&(h.material.needsUpdate=!0,f=y,u=y.version,g=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new re(new Xt(2,2),new ei({name:"BackgroundMaterial",uniforms:Ri(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(y.colorSpace)!==it,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||u!==y.version||g!==n.toneMapping)&&(c.material.needsUpdate=!0,f=y,u=y.version,g=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,d){m.getRGB(vr,Ll(n)),i.buffers.color.setClear(vr.r,vr.g,vr.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),l=d,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:v}}function Mf(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},l=m(null);let c=l,h=!1;function f(P,I,F,X,q){let Y=!1;if(a){const j=_(X,F,I);c!==j&&(c=j,g(c.object)),Y=d(P,X,F,q),Y&&T(P,X,F,q)}else{const j=I.wireframe===!0;(c.geometry!==X.id||c.program!==F.id||c.wireframe!==j)&&(c.geometry=X.id,c.program=F.id,c.wireframe=j,Y=!0)}q!==null&&t.update(q,n.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,$(P,I,F,X),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function u(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function g(P){return i.isWebGL2?n.bindVertexArray(P):s.bindVertexArrayOES(P)}function v(P){return i.isWebGL2?n.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function _(P,I,F){const X=F.wireframe===!0;let q=o[P.id];q===void 0&&(q={},o[P.id]=q);let Y=q[I.id];Y===void 0&&(Y={},q[I.id]=Y);let j=Y[X];return j===void 0&&(j=m(u()),Y[X]=j),j}function m(P){const I=[],F=[],X=[];for(let q=0;q<r;q++)I[q]=0,F[q]=0,X[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:X,object:P,attributes:{},index:null}}function d(P,I,F,X){const q=c.attributes,Y=I.attributes;let j=0;const J=F.getAttributes();for(const Q in J)if(J[Q].location>=0){const Z=q[Q];let he=Y[Q];if(he===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(he=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(he=P.instanceColor)),Z===void 0||Z.attribute!==he||he&&Z.data!==he.data)return!0;j++}return c.attributesNum!==j||c.index!==X}function T(P,I,F,X){const q={},Y=I.attributes;let j=0;const J=F.getAttributes();for(const Q in J)if(J[Q].location>=0){let Z=Y[Q];Z===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(Z=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(Z=P.instanceColor));const he={};he.attribute=Z,Z&&Z.data&&(he.data=Z.data),q[Q]=he,j++}c.attributes=q,c.attributesNum=j,c.index=X}function y(){const P=c.newAttributes;for(let I=0,F=P.length;I<F;I++)P[I]=0}function b(P){D(P,0)}function D(P,I){const F=c.newAttributes,X=c.enabledAttributes,q=c.attributeDivisors;F[P]=1,X[P]===0&&(n.enableVertexAttribArray(P),X[P]=1),q[P]!==I&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,I),q[P]=I)}function A(){const P=c.newAttributes,I=c.enabledAttributes;for(let F=0,X=I.length;F<X;F++)I[F]!==P[F]&&(n.disableVertexAttribArray(F),I[F]=0)}function R(P,I,F,X,q,Y,j){j===!0?n.vertexAttribIPointer(P,I,F,q,Y):n.vertexAttribPointer(P,I,F,X,q,Y)}function $(P,I,F,X){if(i.isWebGL2===!1&&(P.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const q=X.attributes,Y=F.getAttributes(),j=I.defaultAttributeValues;for(const J in Y){const Q=Y[J];if(Q.location>=0){let V=q[J];if(V===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(V=P.instanceColor)),V!==void 0){const Z=V.normalized,he=V.itemSize,Me=t.get(V);if(Me===void 0)continue;const xe=Me.buffer,Fe=Me.type,Be=Me.bytesPerElement,Ae=i.isWebGL2===!0&&(Fe===n.INT||Fe===n.UNSIGNED_INT||V.gpuType===ml);if(V.isInterleavedBufferAttribute){const $e=V.data,O=$e.stride,Dt=V.offset;if($e.isInstancedInterleavedBuffer){for(let ye=0;ye<Q.locationSize;ye++)D(Q.location+ye,$e.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=$e.meshPerAttribute*$e.count)}else for(let ye=0;ye<Q.locationSize;ye++)b(Q.location+ye);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let ye=0;ye<Q.locationSize;ye++)R(Q.location+ye,he/Q.locationSize,Fe,Z,O*Be,(Dt+he/Q.locationSize*ye)*Be,Ae)}else{if(V.isInstancedBufferAttribute){for(let $e=0;$e<Q.locationSize;$e++)D(Q.location+$e,V.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let $e=0;$e<Q.locationSize;$e++)b(Q.location+$e);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let $e=0;$e<Q.locationSize;$e++)R(Q.location+$e,he/Q.locationSize,Fe,Z,he*Be,he/Q.locationSize*$e*Be,Ae)}}else if(j!==void 0){const Z=j[J];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(Q.location,Z);break;case 3:n.vertexAttrib3fv(Q.location,Z);break;case 4:n.vertexAttrib4fv(Q.location,Z);break;default:n.vertexAttrib1fv(Q.location,Z)}}}}A()}function M(){N();for(const P in o){const I=o[P];for(const F in I){const X=I[F];for(const q in X)v(X[q].object),delete X[q];delete I[F]}delete o[P]}}function w(P){if(o[P.id]===void 0)return;const I=o[P.id];for(const F in I){const X=I[F];for(const q in X)v(X[q].object),delete X[q];delete I[F]}delete o[P.id]}function k(P){for(const I in o){const F=o[I];if(F[P.id]===void 0)continue;const X=F[P.id];for(const q in X)v(X[q].object),delete X[q];delete F[P.id]}}function N(){K(),h=!0,c!==l&&(c=l,g(c.object))}function K(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:N,resetDefaultState:K,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:k,initAttributes:y,enableAttribute:b,disableUnusedAttributes:A}}function Sf(n,e,t,i){const r=i.isWebGL2;let s;function a(h){s=h}function o(h,f){n.drawArrays(s,h,f),t.update(f,s,1)}function l(h,f,u){if(u===0)return;let g,v;if(r)g=n,v="drawArraysInstanced";else if(g=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",g===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[v](s,h,f,u),t.update(f,s,u)}function c(h,f,u){if(u===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let v=0;v<u;v++)this.render(h[v],f[v]);else{g.multiDrawArraysWEBGL(s,h,0,f,0,u);let v=0;for(let _=0;_<u;_++)v+=f[_];t.update(v,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function yf(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),u=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),d=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=u>0,b=a||e.has("OES_texture_float"),D=y&&b,A=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:u,maxTextureSize:g,maxCubemapSize:v,maxAttributes:_,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:T,vertexTextures:y,floatFragmentTextures:b,floatVertexTextures:D,maxSamples:A}}function Ef(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new qn,o=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const g=f.length!==0||u||i!==0||r;return r=u,i=f.length,g},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,g){const v=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!r||v===null||v.length===0||s&&!m)s?h(null):c();else{const T=s?0:i,y=T*4;let b=d.clippingState||null;l.value=b,b=h(v,u,y,g);for(let D=0;D!==y;++D)b[D]=t[D];d.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,u,g,v){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,v!==!0||m===null){const d=g+_*4,T=u.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<d)&&(m=new Float32Array(d));for(let y=0,b=g;y!==_;++y,b+=4)a.copy(f[y]).applyMatrix4(T,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Tf(n){let e=new WeakMap;function t(a,o){return o===Is?a.mapping=wi:o===Us&&(a.mapping=bi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Is||o===Us)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Nh(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Fl extends Il{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const _i=4,So=[.125,.215,.35,.446,.526,.582],jn=20,Ms=new Fl,yo=new Ne;let Ss=null,ys=0,Es=0;const Yn=(1+Math.sqrt(5))/2,gi=1/Yn,Eo=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Yn,gi),new L(0,Yn,-gi),new L(gi,0,Yn),new L(-gi,0,Yn),new L(Yn,gi,0),new L(-Yn,gi,0)];class To{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Ss=this._renderer.getRenderTarget(),ys=this._renderer.getActiveCubeFace(),Es=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ao(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ss,ys,Es),e.scissorTest=!1,xr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ss=this._renderer.getRenderTarget(),ys=this._renderer.getActiveCubeFace(),Es=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:Xi,format:rn,colorSpace:Sn,depthBuffer:!1},r=wo(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wo(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wf(s)),this._blurMaterial=bf(s,e,t)}return r}_compileMaterial(e){const t=new re(this._lodPlanes[0],e);this._renderer.compile(t,Ms)}_sceneToCubeUV(e,t,i,r){const o=new jt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,u=h.toneMapping;h.getClearColor(yo),h.toneMapping=In,h.autoClear=!1;const g=new ht({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),v=new re(new Ue,g);let _=!1;const m=e.background;m?m.isColor&&(g.color.copy(m),e.background=null,_=!0):(g.color.copy(yo),_=!0);for(let d=0;d<6;d++){const T=d%3;T===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):T===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const y=this._cubeSize;xr(r,T*y,d>2?y:0,y,y),h.setRenderTarget(r),_&&h.render(v,o),h.render(e,o)}v.geometry.dispose(),v.material.dispose(),h.toneMapping=u,h.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===wi||e.mapping===bi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ao()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bo());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new re(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;xr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ms)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Eo[(r-1)%Eo.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new re(this._lodPlanes[r],c),u=c.uniforms,g=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*g):2*Math.PI/(2*jn-1),_=s/v,m=isFinite(s)?1+Math.floor(h*_):jn;m>jn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${jn}`);const d=[];let T=0;for(let R=0;R<jn;++R){const $=R/_,M=Math.exp(-$*$/2);d.push(M),R===0?T+=M:R<m&&(T+=2*M)}for(let R=0;R<d.length;R++)d[R]=d[R]/T;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=d,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=v,u.mipInt.value=y-i;const b=this._sizeLods[r],D=3*b*(r>y-_i?r-y+_i:0),A=4*(this._cubeSize-b);xr(t,D,A,3*b,2*b),l.setRenderTarget(t),l.render(f,Ms)}}function wf(n){const e=[],t=[],i=[];let r=n;const s=n-_i+1+So.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-_i?l=So[a-n+_i-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],g=6,v=6,_=3,m=2,d=1,T=new Float32Array(_*v*g),y=new Float32Array(m*v*g),b=new Float32Array(d*v*g);for(let A=0;A<g;A++){const R=A%3*2/3-1,$=A>2?0:-1,M=[R,$,0,R+2/3,$,0,R+2/3,$+1,0,R,$,0,R+2/3,$+1,0,R,$+1,0];T.set(M,_*v*A),y.set(u,m*v*A);const w=[A,A,A,A,A,A];b.set(w,d*v*A)}const D=new dn;D.setAttribute("position",new hn(T,_)),D.setAttribute("uv",new hn(y,m)),D.setAttribute("faceIndex",new hn(b,d)),e.push(D),r>_i&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function wo(n,e,t){const i=new Qn(n,e,t);return i.texture.mapping=Br,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function bf(n,e,t){const i=new Float32Array(jn),r=new L(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:jn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:oa(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function bo(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oa(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Ao(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function oa(){return`

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
	`}function Af(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Is||l===Us,h=l===wi||l===bi;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new To(n)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(c&&f&&f.height>0||h&&f&&r(f)){t===null&&(t=new To(n));const u=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,u),o.addEventListener("dispose",s),u.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Rf(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Cf(n,e,t,i){const r={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const v in u.attributes)e.remove(u.attributes[v]);for(const v in u.morphAttributes){const _=u.morphAttributes[v];for(let m=0,d=_.length;m<d;m++)e.remove(_[m])}u.removeEventListener("dispose",a),delete r[u.id];const g=s.get(u);g&&(e.remove(g),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(f){const u=f.attributes;for(const v in u)e.update(u[v],n.ARRAY_BUFFER);const g=f.morphAttributes;for(const v in g){const _=g[v];for(let m=0,d=_.length;m<d;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(f){const u=[],g=f.index,v=f.attributes.position;let _=0;if(g!==null){const T=g.array;_=g.version;for(let y=0,b=T.length;y<b;y+=3){const D=T[y+0],A=T[y+1],R=T[y+2];u.push(D,A,A,R,R,D)}}else if(v!==void 0){const T=v.array;_=v.version;for(let y=0,b=T.length/3-1;y<b;y+=3){const D=y+0,A=y+1,R=y+2;u.push(D,A,A,R,R,D)}}else return;const m=new(Tl(u)?Dl:Pl)(u,1);m.version=_;const d=s.get(f);d&&e.remove(d),s.set(f,m)}function h(f){const u=s.get(f);if(u){const g=f.index;g!==null&&u.version<g.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function Pf(n,e,t,i){const r=i.isWebGL2;let s;function a(g){s=g}let o,l;function c(g){o=g.type,l=g.bytesPerElement}function h(g,v){n.drawElements(s,v,o,g*l),t.update(v,s,1)}function f(g,v,_){if(_===0)return;let m,d;if(r)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](s,v,o,g*l,_),t.update(v,s,_)}function u(g,v,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<_;d++)this.render(g[d]/l,v[d]);else{m.multiDrawElementsWEBGL(s,v,0,o,g,0,_);let d=0;for(let T=0;T<_;T++)d+=v[T];t.update(d,s,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=f,this.renderMultiDraw=u}function Df(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Lf(n,e){return n[0]-e[0]}function If(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Uf(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new St,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,f){const u=c.morphTargetInfluences;if(e.isWebGL2===!0){const v=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=v!==void 0?v.length:0;let m=s.get(h);if(m===void 0||m.count!==_){let I=function(){K.dispose(),s.delete(h),h.removeEventListener("dispose",I)};var g=I;m!==void 0&&m.texture.dispose();const y=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,D=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],R=h.morphAttributes.normal||[],$=h.morphAttributes.color||[];let M=0;y===!0&&(M=1),b===!0&&(M=2),D===!0&&(M=3);let w=h.attributes.position.count*M,k=1;w>e.maxTextureSize&&(k=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const N=new Float32Array(w*k*4*_),K=new Al(N,w,k,_);K.type=Dn,K.needsUpdate=!0;const P=M*4;for(let F=0;F<_;F++){const X=A[F],q=R[F],Y=$[F],j=w*k*4*F;for(let J=0;J<X.count;J++){const Q=J*P;y===!0&&(a.fromBufferAttribute(X,J),N[j+Q+0]=a.x,N[j+Q+1]=a.y,N[j+Q+2]=a.z,N[j+Q+3]=0),b===!0&&(a.fromBufferAttribute(q,J),N[j+Q+4]=a.x,N[j+Q+5]=a.y,N[j+Q+6]=a.z,N[j+Q+7]=0),D===!0&&(a.fromBufferAttribute(Y,J),N[j+Q+8]=a.x,N[j+Q+9]=a.y,N[j+Q+10]=a.z,N[j+Q+11]=Y.itemSize===4?a.w:1)}}m={count:_,texture:K,size:new je(w,k)},s.set(h,m),h.addEventListener("dispose",I)}let d=0;for(let y=0;y<u.length;y++)d+=u[y];const T=h.morphTargetsRelative?1:1-d;f.getUniforms().setValue(n,"morphTargetBaseInfluence",T),f.getUniforms().setValue(n,"morphTargetInfluences",u),f.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const v=u===void 0?0:u.length;let _=i[h.id];if(_===void 0||_.length!==v){_=[];for(let b=0;b<v;b++)_[b]=[b,0];i[h.id]=_}for(let b=0;b<v;b++){const D=_[b];D[0]=b,D[1]=u[b]}_.sort(If);for(let b=0;b<8;b++)b<v&&_[b][1]?(o[b][0]=_[b][0],o[b][1]=_[b][1]):(o[b][0]=Number.MAX_SAFE_INTEGER,o[b][1]=0);o.sort(Lf);const m=h.morphAttributes.position,d=h.morphAttributes.normal;let T=0;for(let b=0;b<8;b++){const D=o[b],A=D[0],R=D[1];A!==Number.MAX_SAFE_INTEGER&&R?(m&&h.getAttribute("morphTarget"+b)!==m[A]&&h.setAttribute("morphTarget"+b,m[A]),d&&h.getAttribute("morphNormal"+b)!==d[A]&&h.setAttribute("morphNormal"+b,d[A]),r[b]=R,T+=R):(m&&h.hasAttribute("morphTarget"+b)===!0&&h.deleteAttribute("morphTarget"+b),d&&h.hasAttribute("morphNormal"+b)===!0&&h.deleteAttribute("morphNormal"+b),r[b]=0)}const y=h.morphTargetsRelative?1:1-T;f.getUniforms().setValue(n,"morphTargetBaseInfluence",y),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function Nf(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,f=e.get(l,h);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;r.get(u)!==c&&(u.update(),r.set(u,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class Ol extends Wt{constructor(e,t,i,r,s,a,o,l,c,h){if(h=h!==void 0?h:Zn,h!==Zn&&h!==Ai)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Zn&&(i=Pn),i===void 0&&h===Ai&&(i=Kn),super(null,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Nt,this.minFilter=l!==void 0?l:Nt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Bl=new Wt,zl=new Ol(1,1);zl.compareFunction=El;const Gl=new Al,Hl=new _h,kl=new Ul,Ro=[],Co=[],Po=new Float32Array(16),Do=new Float32Array(9),Lo=new Float32Array(4);function Li(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ro[r];if(s===void 0&&(s=new Float32Array(r),Ro[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function mt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Hr(n,e){let t=Co[e];t===void 0&&(t=new Int32Array(e),Co[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ff(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Of(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2fv(this.addr,e),mt(t,e)}}function Bf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;n.uniform3fv(this.addr,e),mt(t,e)}}function zf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4fv(this.addr,e),mt(t,e)}}function Gf(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;Lo.set(i),n.uniformMatrix2fv(this.addr,!1,Lo),mt(t,i)}}function Hf(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;Do.set(i),n.uniformMatrix3fv(this.addr,!1,Do),mt(t,i)}}function kf(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;Po.set(i),n.uniformMatrix4fv(this.addr,!1,Po),mt(t,i)}}function Vf(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Wf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2iv(this.addr,e),mt(t,e)}}function Xf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3iv(this.addr,e),mt(t,e)}}function qf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4iv(this.addr,e),mt(t,e)}}function Yf(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function $f(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2uiv(this.addr,e),mt(t,e)}}function jf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3uiv(this.addr,e),mt(t,e)}}function Kf(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4uiv(this.addr,e),mt(t,e)}}function Zf(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?zl:Bl;t.setTexture2D(e||s,r)}function Jf(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Hl,r)}function Qf(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||kl,r)}function ep(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Gl,r)}function tp(n){switch(n){case 5126:return Ff;case 35664:return Of;case 35665:return Bf;case 35666:return zf;case 35674:return Gf;case 35675:return Hf;case 35676:return kf;case 5124:case 35670:return Vf;case 35667:case 35671:return Wf;case 35668:case 35672:return Xf;case 35669:case 35673:return qf;case 5125:return Yf;case 36294:return $f;case 36295:return jf;case 36296:return Kf;case 35678:case 36198:case 36298:case 36306:case 35682:return Zf;case 35679:case 36299:case 36307:return Jf;case 35680:case 36300:case 36308:case 36293:return Qf;case 36289:case 36303:case 36311:case 36292:return ep}}function np(n,e){n.uniform1fv(this.addr,e)}function ip(n,e){const t=Li(e,this.size,2);n.uniform2fv(this.addr,t)}function rp(n,e){const t=Li(e,this.size,3);n.uniform3fv(this.addr,t)}function sp(n,e){const t=Li(e,this.size,4);n.uniform4fv(this.addr,t)}function ap(n,e){const t=Li(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function op(n,e){const t=Li(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function lp(n,e){const t=Li(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function cp(n,e){n.uniform1iv(this.addr,e)}function hp(n,e){n.uniform2iv(this.addr,e)}function dp(n,e){n.uniform3iv(this.addr,e)}function up(n,e){n.uniform4iv(this.addr,e)}function fp(n,e){n.uniform1uiv(this.addr,e)}function pp(n,e){n.uniform2uiv(this.addr,e)}function mp(n,e){n.uniform3uiv(this.addr,e)}function gp(n,e){n.uniform4uiv(this.addr,e)}function _p(n,e,t){const i=this.cache,r=e.length,s=Hr(t,r);pt(i,s)||(n.uniform1iv(this.addr,s),mt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Bl,s[a])}function vp(n,e,t){const i=this.cache,r=e.length,s=Hr(t,r);pt(i,s)||(n.uniform1iv(this.addr,s),mt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Hl,s[a])}function xp(n,e,t){const i=this.cache,r=e.length,s=Hr(t,r);pt(i,s)||(n.uniform1iv(this.addr,s),mt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||kl,s[a])}function Mp(n,e,t){const i=this.cache,r=e.length,s=Hr(t,r);pt(i,s)||(n.uniform1iv(this.addr,s),mt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Gl,s[a])}function Sp(n){switch(n){case 5126:return np;case 35664:return ip;case 35665:return rp;case 35666:return sp;case 35674:return ap;case 35675:return op;case 35676:return lp;case 5124:case 35670:return cp;case 35667:case 35671:return hp;case 35668:case 35672:return dp;case 35669:case 35673:return up;case 5125:return fp;case 36294:return pp;case 36295:return mp;case 36296:return gp;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return vp;case 35680:case 36300:case 36308:case 36293:return xp;case 36289:case 36303:case 36311:case 36292:return Mp}}class yp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=tp(t.type)}}class Ep{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sp(t.type)}}class Tp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Ts=/(\w+)(\])?(\[|\.)?/g;function Io(n,e){n.seq.push(e),n.map[e.id]=e}function wp(n,e,t){const i=n.name,r=i.length;for(Ts.lastIndex=0;;){const s=Ts.exec(i),a=Ts.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Io(t,c===void 0?new yp(o,n,e):new Ep(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Tp(o),Io(t,f)),t=f}}}class Er{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);wp(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Uo(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const bp=37297;let Ap=0;function Rp(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function Cp(n){const e=Qe.getPrimaries(Qe.workingColorSpace),t=Qe.getPrimaries(n);let i;switch(e===t?i="":e===Dr&&t===Pr?i="LinearDisplayP3ToLinearSRGB":e===Pr&&t===Dr&&(i="LinearSRGBToLinearDisplayP3"),n){case Sn:case zr:return[i,"LinearTransferOETF"];case yt:case ra:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function No(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Rp(n.getShaderSource(e),a)}else return r}function Pp(n,e){const t=Cp(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Dp(n,e){let t;switch(e){case Gc:t="Linear";break;case Hc:t="Reinhard";break;case kc:t="OptimizedCineon";break;case Vc:t="ACESFilmic";break;case Xc:t="AgX";break;case Wc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Lp(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(vi).join(`
`)}function Ip(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(vi).join(`
`)}function Up(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Np(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function vi(n){return n!==""}function Fo(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Oo(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Fp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gs(n){return n.replace(Fp,Bp)}const Op=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Bp(n,e){let t=Ge[e];if(t===void 0){const i=Op.get(e);if(i!==void 0)t=Ge[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Gs(t)}const zp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bo(n){return n.replace(zp,Gp)}function Gp(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function zo(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Hp(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===fl?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===pc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===xn&&(e="SHADOWMAP_TYPE_VSM"),e}function kp(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case wi:case bi:e="ENVMAP_TYPE_CUBE";break;case Br:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Vp(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case bi:e="ENVMAP_MODE_REFRACTION";break}return e}function Wp(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Or:e="ENVMAP_BLENDING_MULTIPLY";break;case Bc:e="ENVMAP_BLENDING_MIX";break;case zc:e="ENVMAP_BLENDING_ADD";break}return e}function Xp(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function qp(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Hp(t),c=kp(t),h=Vp(t),f=Wp(t),u=Xp(t),g=t.isWebGL2?"":Lp(t),v=Ip(t),_=Up(s),m=r.createProgram();let d,T,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(vi).join(`
`),d.length>0&&(d+=`
`),T=[g,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(vi).join(`
`),T.length>0&&(T+=`
`)):(d=[zo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vi).join(`
`),T=[g,zo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==In?"#define TONE_MAPPING":"",t.toneMapping!==In?Ge.tonemapping_pars_fragment:"",t.toneMapping!==In?Dp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Pp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vi).join(`
`)),a=Gs(a),a=Fo(a,t),a=Oo(a,t),o=Gs(o),o=Fo(o,t),o=Oo(o,t),a=Bo(a),o=Bo(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,T=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===no?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===no?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);const b=y+d+a,D=y+T+o,A=Uo(r,r.VERTEX_SHADER,b),R=Uo(r,r.FRAGMENT_SHADER,D);r.attachShader(m,A),r.attachShader(m,R),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function $(N){if(n.debug.checkShaderErrors){const K=r.getProgramInfoLog(m).trim(),P=r.getShaderInfoLog(A).trim(),I=r.getShaderInfoLog(R).trim();let F=!0,X=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(F=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,A,R);else{const q=No(r,A,"vertex"),Y=No(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+K+`
`+q+`
`+Y)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(P===""||I==="")&&(X=!1);X&&(N.diagnostics={runnable:F,programLog:K,vertexShader:{log:P,prefix:d},fragmentShader:{log:I,prefix:T}})}r.deleteShader(A),r.deleteShader(R),M=new Er(r,m),w=Np(r,m)}let M;this.getUniforms=function(){return M===void 0&&$(this),M};let w;this.getAttributes=function(){return w===void 0&&$(this),w};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(m,bp)),k},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ap++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=R,this}let Yp=0;class $p{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new jp(e),t.set(e,i)),i}}class jp{constructor(e){this.id=Yp++,this.code=e,this.usedTimes=0}}function Kp(n,e,t,i,r,s,a){const o=new Rl,l=new $p,c=[],h=r.isWebGL2,f=r.logarithmicDepthBuffer,u=r.vertexTextures;let g=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,w,k,N,K){const P=N.fog,I=K.geometry,F=M.isMeshStandardMaterial?N.environment:null,X=(M.isMeshStandardMaterial?t:e).get(M.envMap||F),q=X&&X.mapping===Br?X.image.height:null,Y=v[M.type];M.precision!==null&&(g=r.getMaxPrecision(M.precision),g!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",g,"instead."));const j=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,J=j!==void 0?j.length:0;let Q=0;I.morphAttributes.position!==void 0&&(Q=1),I.morphAttributes.normal!==void 0&&(Q=2),I.morphAttributes.color!==void 0&&(Q=3);let V,Z,he,Me;if(Y){const Lt=cn[Y];V=Lt.vertexShader,Z=Lt.fragmentShader}else V=M.vertexShader,Z=M.fragmentShader,l.update(M),he=l.getVertexShaderID(M),Me=l.getFragmentShaderID(M);const xe=n.getRenderTarget(),Fe=K.isInstancedMesh===!0,Be=K.isBatchedMesh===!0,Ae=!!M.map,$e=!!M.matcap,O=!!X,Dt=!!M.aoMap,ye=!!M.lightMap,Le=!!M.bumpMap,ge=!!M.normalMap,rt=!!M.displacementMap,He=!!M.emissiveMap,E=!!M.metalnessMap,x=!!M.roughnessMap,z=M.anisotropy>0,ne=M.clearcoat>0,te=M.iridescence>0,ie=M.sheen>0,_e=M.transmission>0,de=z&&!!M.anisotropyMap,pe=ne&&!!M.clearcoatMap,be=ne&&!!M.clearcoatNormalMap,ke=ne&&!!M.clearcoatRoughnessMap,ee=te&&!!M.iridescenceMap,Je=te&&!!M.iridescenceThicknessMap,Ye=ie&&!!M.sheenColorMap,De=ie&&!!M.sheenRoughnessMap,Se=!!M.specularMap,me=!!M.specularColorMap,ze=!!M.specularIntensityMap,Ze=_e&&!!M.transmissionMap,at=_e&&!!M.thicknessMap,We=!!M.gradientMap,se=!!M.alphaMap,C=M.alphaTest>0,le=!!M.alphaHash,ce=!!M.extensions,Re=!!I.attributes.uv1,Ee=!!I.attributes.uv2,et=!!I.attributes.uv3;let tt=In;return M.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(tt=n.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:M.type,shaderName:M.name,vertexShader:V,fragmentShader:Z,defines:M.defines,customVertexShaderID:he,customFragmentShaderID:Me,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:g,batching:Be,instancing:Fe,instancingColor:Fe&&K.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:xe===null?n.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:Sn,map:Ae,matcap:$e,envMap:O,envMapMode:O&&X.mapping,envMapCubeUVHeight:q,aoMap:Dt,lightMap:ye,bumpMap:Le,normalMap:ge,displacementMap:u&&rt,emissiveMap:He,normalMapObjectSpace:ge&&M.normalMapType===ih,normalMapTangentSpace:ge&&M.normalMapType===ia,metalnessMap:E,roughnessMap:x,anisotropy:z,anisotropyMap:de,clearcoat:ne,clearcoatMap:pe,clearcoatNormalMap:be,clearcoatRoughnessMap:ke,iridescence:te,iridescenceMap:ee,iridescenceThicknessMap:Je,sheen:ie,sheenColorMap:Ye,sheenRoughnessMap:De,specularMap:Se,specularColorMap:me,specularIntensityMap:ze,transmission:_e,transmissionMap:Ze,thicknessMap:at,gradientMap:We,opaque:M.transparent===!1&&M.blending===Mi,alphaMap:se,alphaTest:C,alphaHash:le,combine:M.combine,mapUv:Ae&&_(M.map.channel),aoMapUv:Dt&&_(M.aoMap.channel),lightMapUv:ye&&_(M.lightMap.channel),bumpMapUv:Le&&_(M.bumpMap.channel),normalMapUv:ge&&_(M.normalMap.channel),displacementMapUv:rt&&_(M.displacementMap.channel),emissiveMapUv:He&&_(M.emissiveMap.channel),metalnessMapUv:E&&_(M.metalnessMap.channel),roughnessMapUv:x&&_(M.roughnessMap.channel),anisotropyMapUv:de&&_(M.anisotropyMap.channel),clearcoatMapUv:pe&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:be&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ye&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:De&&_(M.sheenRoughnessMap.channel),specularMapUv:Se&&_(M.specularMap.channel),specularColorMapUv:me&&_(M.specularColorMap.channel),specularIntensityMapUv:ze&&_(M.specularIntensityMap.channel),transmissionMapUv:Ze&&_(M.transmissionMap.channel),thicknessMapUv:at&&_(M.thicknessMap.channel),alphaMapUv:se&&_(M.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ge||z),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:Re,vertexUv2s:Ee,vertexUv3s:et,pointsUvs:K.isPoints===!0&&!!I.attributes.uv&&(Ae||se),fog:!!P,useFog:M.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:K.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:Q,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:tt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ae&&M.map.isVideoTexture===!0&&Qe.getTransfer(M.map.colorSpace)===it,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Mt,flipSided:M.side===Gt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ce&&M.extensions.derivatives===!0,extensionFragDepth:ce&&M.extensions.fragDepth===!0,extensionDrawBuffers:ce&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ce&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ce&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function d(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const k in M.defines)w.push(k),w.push(M.defines[k]);return M.isRawShaderMaterial===!1&&(T(w,M),y(w,M),w.push(n.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function T(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function y(M,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),M.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function b(M){const w=v[M.type];let k;if(w){const N=cn[w];k=Dh.clone(N.uniforms)}else k=M.uniforms;return k}function D(M,w){let k;for(let N=0,K=c.length;N<K;N++){const P=c[N];if(P.cacheKey===w){k=P,++k.usedTimes;break}}return k===void 0&&(k=new qp(n,w,M,s),c.push(k)),k}function A(M){if(--M.usedTimes===0){const w=c.indexOf(M);c[w]=c[c.length-1],c.pop(),M.destroy()}}function R(M){l.remove(M)}function $(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:b,acquireProgram:D,releaseProgram:A,releaseShaderCache:R,programs:c,dispose:$}}function Zp(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Jp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Go(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ho(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f,u,g,v,_,m){let d=n[e];return d===void 0?(d={id:f.id,object:f,geometry:u,material:g,groupOrder:v,renderOrder:f.renderOrder,z:_,group:m},n[e]=d):(d.id=f.id,d.object=f,d.geometry=u,d.material=g,d.groupOrder=v,d.renderOrder=f.renderOrder,d.z=_,d.group=m),e++,d}function o(f,u,g,v,_,m){const d=a(f,u,g,v,_,m);g.transmission>0?i.push(d):g.transparent===!0?r.push(d):t.push(d)}function l(f,u,g,v,_,m){const d=a(f,u,g,v,_,m);g.transmission>0?i.unshift(d):g.transparent===!0?r.unshift(d):t.unshift(d)}function c(f,u){t.length>1&&t.sort(f||Jp),i.length>1&&i.sort(u||Go),r.length>1&&r.sort(u||Go)}function h(){for(let f=e,u=n.length;f<u;f++){const g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:h,sort:c}}function Qp(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Ho,n.set(i,[a])):r>=s.length?(a=new Ho,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function em(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ne};break;case"SpotLight":t={position:new L,direction:new L,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function tm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new je,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let nm=0;function im(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function rm(n,e){const t=new em,i=tm(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new L);const s=new L,a=new ft,o=new ft;function l(h,f){let u=0,g=0,v=0;for(let N=0;N<9;N++)r.probe[N].set(0,0,0);let _=0,m=0,d=0,T=0,y=0,b=0,D=0,A=0,R=0,$=0,M=0;h.sort(im);const w=f===!0?Math.PI:1;for(let N=0,K=h.length;N<K;N++){const P=h[N],I=P.color,F=P.intensity,X=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=I.r*F*w,g+=I.g*F*w,v+=I.b*F*w;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)r.probe[Y].addScaledVector(P.sh.coefficients[Y],F);M++}else if(P.isDirectionalLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*w),P.castShadow){const j=P.shadow,J=i.get(P);J.shadowBias=j.bias,J.shadowNormalBias=j.normalBias,J.shadowRadius=j.radius,J.shadowMapSize=j.mapSize,r.directionalShadow[_]=J,r.directionalShadowMap[_]=q,r.directionalShadowMatrix[_]=P.shadow.matrix,b++}r.directional[_]=Y,_++}else if(P.isSpotLight){const Y=t.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(I).multiplyScalar(F*w),Y.distance=X,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,r.spot[d]=Y;const j=P.shadow;if(P.map&&(r.spotLightMap[R]=P.map,R++,j.updateMatrices(P),P.castShadow&&$++),r.spotLightMatrix[d]=j.matrix,P.castShadow){const J=i.get(P);J.shadowBias=j.bias,J.shadowNormalBias=j.normalBias,J.shadowRadius=j.radius,J.shadowMapSize=j.mapSize,r.spotShadow[d]=J,r.spotShadowMap[d]=q,A++}d++}else if(P.isRectAreaLight){const Y=t.get(P);Y.color.copy(I).multiplyScalar(F),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),r.rectArea[T]=Y,T++}else if(P.isPointLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*w),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const j=P.shadow,J=i.get(P);J.shadowBias=j.bias,J.shadowNormalBias=j.normalBias,J.shadowRadius=j.radius,J.shadowMapSize=j.mapSize,J.shadowCameraNear=j.camera.near,J.shadowCameraFar=j.camera.far,r.pointShadow[m]=J,r.pointShadowMap[m]=q,r.pointShadowMatrix[m]=P.shadow.matrix,D++}r.point[m]=Y,m++}else if(P.isHemisphereLight){const Y=t.get(P);Y.skyColor.copy(P.color).multiplyScalar(F*w),Y.groundColor.copy(P.groundColor).multiplyScalar(F*w),r.hemi[y]=Y,y++}}T>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_FLOAT_1,r.rectAreaLTC2=ae.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ae.LTC_HALF_1,r.rectAreaLTC2=ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=u,r.ambient[1]=g,r.ambient[2]=v;const k=r.hash;(k.directionalLength!==_||k.pointLength!==m||k.spotLength!==d||k.rectAreaLength!==T||k.hemiLength!==y||k.numDirectionalShadows!==b||k.numPointShadows!==D||k.numSpotShadows!==A||k.numSpotMaps!==R||k.numLightProbes!==M)&&(r.directional.length=_,r.spot.length=d,r.rectArea.length=T,r.point.length=m,r.hemi.length=y,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=D,r.pointShadowMap.length=D,r.spotShadow.length=A,r.spotShadowMap.length=A,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=D,r.spotLightMatrix.length=A+R-$,r.spotLightMap.length=R,r.numSpotLightShadowsWithMaps=$,r.numLightProbes=M,k.directionalLength=_,k.pointLength=m,k.spotLength=d,k.rectAreaLength=T,k.hemiLength=y,k.numDirectionalShadows=b,k.numPointShadows=D,k.numSpotShadows=A,k.numSpotMaps=R,k.numLightProbes=M,r.version=nm++)}function c(h,f){let u=0,g=0,v=0,_=0,m=0;const d=f.matrixWorldInverse;for(let T=0,y=h.length;T<y;T++){const b=h[T];if(b.isDirectionalLight){const D=r.directional[u];D.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),D.direction.sub(s),D.direction.transformDirection(d),u++}else if(b.isSpotLight){const D=r.spot[v];D.position.setFromMatrixPosition(b.matrixWorld),D.position.applyMatrix4(d),D.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),D.direction.sub(s),D.direction.transformDirection(d),v++}else if(b.isRectAreaLight){const D=r.rectArea[_];D.position.setFromMatrixPosition(b.matrixWorld),D.position.applyMatrix4(d),o.identity(),a.copy(b.matrixWorld),a.premultiply(d),o.extractRotation(a),D.halfWidth.set(b.width*.5,0,0),D.halfHeight.set(0,b.height*.5,0),D.halfWidth.applyMatrix4(o),D.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const D=r.point[g];D.position.setFromMatrixPosition(b.matrixWorld),D.position.applyMatrix4(d),g++}else if(b.isHemisphereLight){const D=r.hemi[m];D.direction.setFromMatrixPosition(b.matrixWorld),D.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:r}}function ko(n,e){const t=new rm(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(f){i.push(f)}function o(f){r.push(f)}function l(f){t.setup(i,f)}function c(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function sm(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new ko(n,e),t.set(s,[l])):a>=o.length?(l=new ko(n,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class am extends Di{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class om extends Di{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const lm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cm=`uniform sampler2D shadow_pass;
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
}`;function hm(n,e,t){let i=new aa;const r=new je,s=new je,a=new St,o=new am({depthPacking:nh}),l=new om,c={},h=t.maxTextureSize,f={[Nn]:Gt,[Gt]:Nn,[Mt]:Mt},u=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new je},radius:{value:4}},vertexShader:lm,fragmentShader:cm}),g=u.clone();g.defines.HORIZONTAL_PASS=1;const v=new dn;v.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new re(v,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fl;let d=this.type;this.render=function(A,R,$){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const M=n.getRenderTarget(),w=n.getActiveCubeFace(),k=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Ln),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const K=d!==xn&&this.type===xn,P=d===xn&&this.type!==xn;for(let I=0,F=A.length;I<F;I++){const X=A[I],q=X.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const Y=q.getFrameExtents();if(r.multiply(Y),s.copy(q.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Y.x),r.x=s.x*Y.x,q.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Y.y),r.y=s.y*Y.y,q.mapSize.y=s.y)),q.map===null||K===!0||P===!0){const J=this.type!==xn?{minFilter:Nt,magFilter:Nt}:{};q.map!==null&&q.map.dispose(),q.map=new Qn(r.x,r.y,J),q.map.texture.name=X.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const j=q.getViewportCount();for(let J=0;J<j;J++){const Q=q.getViewport(J);a.set(s.x*Q.x,s.y*Q.y,s.x*Q.z,s.y*Q.w),N.viewport(a),q.updateMatrices(X,J),i=q.getFrustum(),b(R,$,q.camera,X,this.type)}q.isPointLightShadow!==!0&&this.type===xn&&T(q,$),q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(M,w,k)};function T(A,R){const $=e.update(_);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,g.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,g.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Qn(r.x,r.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(R,null,$,u,_,null),g.uniforms.shadow_pass.value=A.mapPass.texture,g.uniforms.resolution.value=A.mapSize,g.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(R,null,$,g,_,null)}function y(A,R,$,M){let w=null;const k=$.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(k!==void 0)w=k;else if(w=$.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const N=w.uuid,K=R.uuid;let P=c[N];P===void 0&&(P={},c[N]=P);let I=P[K];I===void 0&&(I=w.clone(),P[K]=I,R.addEventListener("dispose",D)),w=I}if(w.visible=R.visible,w.wireframe=R.wireframe,M===xn?w.side=R.shadowSide!==null?R.shadowSide:R.side:w.side=R.shadowSide!==null?R.shadowSide:f[R.side],w.alphaMap=R.alphaMap,w.alphaTest=R.alphaTest,w.map=R.map,w.clipShadows=R.clipShadows,w.clippingPlanes=R.clippingPlanes,w.clipIntersection=R.clipIntersection,w.displacementMap=R.displacementMap,w.displacementScale=R.displacementScale,w.displacementBias=R.displacementBias,w.wireframeLinewidth=R.wireframeLinewidth,w.linewidth=R.linewidth,$.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const N=n.properties.get(w);N.light=$}return w}function b(A,R,$,M,w){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&w===xn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld);const K=e.update(A),P=A.material;if(Array.isArray(P)){const I=K.groups;for(let F=0,X=I.length;F<X;F++){const q=I[F],Y=P[q.materialIndex];if(Y&&Y.visible){const j=y(A,Y,M,w);A.onBeforeShadow(n,A,R,$,K,j,q),n.renderBufferDirect($,null,K,j,A,q),A.onAfterShadow(n,A,R,$,K,j,q)}}}else if(P.visible){const I=y(A,P,M,w);A.onBeforeShadow(n,A,R,$,K,I,null),n.renderBufferDirect($,null,K,I,A,null),A.onAfterShadow(n,A,R,$,K,I,null)}}const N=A.children;for(let K=0,P=N.length;K<P;K++)b(N[K],R,$,M,w)}function D(A){A.target.removeEventListener("dispose",D);for(const $ in c){const M=c[$],w=A.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function dm(n,e,t){const i=t.isWebGL2;function r(){let C=!1;const le=new St;let ce=null;const Re=new St(0,0,0,0);return{setMask:function(Ee){ce!==Ee&&!C&&(n.colorMask(Ee,Ee,Ee,Ee),ce=Ee)},setLocked:function(Ee){C=Ee},setClear:function(Ee,et,tt,gt,Lt){Lt===!0&&(Ee*=gt,et*=gt,tt*=gt),le.set(Ee,et,tt,gt),Re.equals(le)===!1&&(n.clearColor(Ee,et,tt,gt),Re.copy(le))},reset:function(){C=!1,ce=null,Re.set(-1,0,0,0)}}}function s(){let C=!1,le=null,ce=null,Re=null;return{setTest:function(Ee){Ee?Be(n.DEPTH_TEST):Ae(n.DEPTH_TEST)},setMask:function(Ee){le!==Ee&&!C&&(n.depthMask(Ee),le=Ee)},setFunc:function(Ee){if(ce!==Ee){switch(Ee){case Dc:n.depthFunc(n.NEVER);break;case Lc:n.depthFunc(n.ALWAYS);break;case Ic:n.depthFunc(n.LESS);break;case Rr:n.depthFunc(n.LEQUAL);break;case Uc:n.depthFunc(n.EQUAL);break;case Nc:n.depthFunc(n.GEQUAL);break;case Fc:n.depthFunc(n.GREATER);break;case Oc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=Ee}},setLocked:function(Ee){C=Ee},setClear:function(Ee){Re!==Ee&&(n.clearDepth(Ee),Re=Ee)},reset:function(){C=!1,le=null,ce=null,Re=null}}}function a(){let C=!1,le=null,ce=null,Re=null,Ee=null,et=null,tt=null,gt=null,Lt=null;return{setTest:function(nt){C||(nt?Be(n.STENCIL_TEST):Ae(n.STENCIL_TEST))},setMask:function(nt){le!==nt&&!C&&(n.stencilMask(nt),le=nt)},setFunc:function(nt,It,on){(ce!==nt||Re!==It||Ee!==on)&&(n.stencilFunc(nt,It,on),ce=nt,Re=It,Ee=on)},setOp:function(nt,It,on){(et!==nt||tt!==It||gt!==on)&&(n.stencilOp(nt,It,on),et=nt,tt=It,gt=on)},setLocked:function(nt){C=nt},setClear:function(nt){Lt!==nt&&(n.clearStencil(nt),Lt=nt)},reset:function(){C=!1,le=null,ce=null,Re=null,Ee=null,et=null,tt=null,gt=null,Lt=null}}}const o=new r,l=new s,c=new a,h=new WeakMap,f=new WeakMap;let u={},g={},v=new WeakMap,_=[],m=null,d=!1,T=null,y=null,b=null,D=null,A=null,R=null,$=null,M=new Ne(0,0,0),w=0,k=!1,N=null,K=null,P=null,I=null,F=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Y=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(j)[1]),q=Y>=1):j.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),q=Y>=2);let J=null,Q={};const V=n.getParameter(n.SCISSOR_BOX),Z=n.getParameter(n.VIEWPORT),he=new St().fromArray(V),Me=new St().fromArray(Z);function xe(C,le,ce,Re){const Ee=new Uint8Array(4),et=n.createTexture();n.bindTexture(C,et),n.texParameteri(C,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(C,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let tt=0;tt<ce;tt++)i&&(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)?n.texImage3D(le,0,n.RGBA,1,1,Re,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(le+tt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return et}const Fe={};Fe[n.TEXTURE_2D]=xe(n.TEXTURE_2D,n.TEXTURE_2D,1),Fe[n.TEXTURE_CUBE_MAP]=xe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Fe[n.TEXTURE_2D_ARRAY]=xe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Fe[n.TEXTURE_3D]=xe(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Be(n.DEPTH_TEST),l.setFunc(Rr),He(!1),E(ya),Be(n.CULL_FACE),ge(Ln);function Be(C){u[C]!==!0&&(n.enable(C),u[C]=!0)}function Ae(C){u[C]!==!1&&(n.disable(C),u[C]=!1)}function $e(C,le){return g[C]!==le?(n.bindFramebuffer(C,le),g[C]=le,i&&(C===n.DRAW_FRAMEBUFFER&&(g[n.FRAMEBUFFER]=le),C===n.FRAMEBUFFER&&(g[n.DRAW_FRAMEBUFFER]=le)),!0):!1}function O(C,le){let ce=_,Re=!1;if(C)if(ce=v.get(le),ce===void 0&&(ce=[],v.set(le,ce)),C.isWebGLMultipleRenderTargets){const Ee=C.texture;if(ce.length!==Ee.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let et=0,tt=Ee.length;et<tt;et++)ce[et]=n.COLOR_ATTACHMENT0+et;ce.length=Ee.length,Re=!0}}else ce[0]!==n.COLOR_ATTACHMENT0&&(ce[0]=n.COLOR_ATTACHMENT0,Re=!0);else ce[0]!==n.BACK&&(ce[0]=n.BACK,Re=!0);Re&&(t.isWebGL2?n.drawBuffers(ce):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ce))}function Dt(C){return m!==C?(n.useProgram(C),m=C,!0):!1}const ye={[$n]:n.FUNC_ADD,[gc]:n.FUNC_SUBTRACT,[_c]:n.FUNC_REVERSE_SUBTRACT};if(i)ye[ba]=n.MIN,ye[Aa]=n.MAX;else{const C=e.get("EXT_blend_minmax");C!==null&&(ye[ba]=C.MIN_EXT,ye[Aa]=C.MAX_EXT)}const Le={[vc]:n.ZERO,[xc]:n.ONE,[Mc]:n.SRC_COLOR,[Ds]:n.SRC_ALPHA,[bc]:n.SRC_ALPHA_SATURATE,[Tc]:n.DST_COLOR,[yc]:n.DST_ALPHA,[Sc]:n.ONE_MINUS_SRC_COLOR,[Ls]:n.ONE_MINUS_SRC_ALPHA,[wc]:n.ONE_MINUS_DST_COLOR,[Ec]:n.ONE_MINUS_DST_ALPHA,[Ac]:n.CONSTANT_COLOR,[Rc]:n.ONE_MINUS_CONSTANT_COLOR,[Cc]:n.CONSTANT_ALPHA,[Pc]:n.ONE_MINUS_CONSTANT_ALPHA};function ge(C,le,ce,Re,Ee,et,tt,gt,Lt,nt){if(C===Ln){d===!0&&(Ae(n.BLEND),d=!1);return}if(d===!1&&(Be(n.BLEND),d=!0),C!==mc){if(C!==T||nt!==k){if((y!==$n||A!==$n)&&(n.blendEquation(n.FUNC_ADD),y=$n,A=$n),nt)switch(C){case Mi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ea:n.blendFunc(n.ONE,n.ONE);break;case Ta:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wa:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Mi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ea:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ta:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wa:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}b=null,D=null,R=null,$=null,M.set(0,0,0),w=0,T=C,k=nt}return}Ee=Ee||le,et=et||ce,tt=tt||Re,(le!==y||Ee!==A)&&(n.blendEquationSeparate(ye[le],ye[Ee]),y=le,A=Ee),(ce!==b||Re!==D||et!==R||tt!==$)&&(n.blendFuncSeparate(Le[ce],Le[Re],Le[et],Le[tt]),b=ce,D=Re,R=et,$=tt),(gt.equals(M)===!1||Lt!==w)&&(n.blendColor(gt.r,gt.g,gt.b,Lt),M.copy(gt),w=Lt),T=C,k=!1}function rt(C,le){C.side===Mt?Ae(n.CULL_FACE):Be(n.CULL_FACE);let ce=C.side===Gt;le&&(ce=!ce),He(ce),C.blending===Mi&&C.transparent===!1?ge(Ln):ge(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),l.setFunc(C.depthFunc),l.setTest(C.depthTest),l.setMask(C.depthWrite),o.setMask(C.colorWrite);const Re=C.stencilWrite;c.setTest(Re),Re&&(c.setMask(C.stencilWriteMask),c.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),c.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),z(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?Be(n.SAMPLE_ALPHA_TO_COVERAGE):Ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(C){N!==C&&(C?n.frontFace(n.CW):n.frontFace(n.CCW),N=C)}function E(C){C!==dc?(Be(n.CULL_FACE),C!==K&&(C===ya?n.cullFace(n.BACK):C===uc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ae(n.CULL_FACE),K=C}function x(C){C!==P&&(q&&n.lineWidth(C),P=C)}function z(C,le,ce){C?(Be(n.POLYGON_OFFSET_FILL),(I!==le||F!==ce)&&(n.polygonOffset(le,ce),I=le,F=ce)):Ae(n.POLYGON_OFFSET_FILL)}function ne(C){C?Be(n.SCISSOR_TEST):Ae(n.SCISSOR_TEST)}function te(C){C===void 0&&(C=n.TEXTURE0+X-1),J!==C&&(n.activeTexture(C),J=C)}function ie(C,le,ce){ce===void 0&&(J===null?ce=n.TEXTURE0+X-1:ce=J);let Re=Q[ce];Re===void 0&&(Re={type:void 0,texture:void 0},Q[ce]=Re),(Re.type!==C||Re.texture!==le)&&(J!==ce&&(n.activeTexture(ce),J=ce),n.bindTexture(C,le||Fe[C]),Re.type=C,Re.texture=le)}function _e(){const C=Q[J];C!==void 0&&C.type!==void 0&&(n.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function de(){try{n.compressedTexImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function pe(){try{n.compressedTexImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function be(){try{n.texSubImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ke(){try{n.texSubImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ee(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Je(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ye(){try{n.texStorage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function De(){try{n.texStorage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Se(){try{n.texImage2D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function me(){try{n.texImage3D.apply(n,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ze(C){he.equals(C)===!1&&(n.scissor(C.x,C.y,C.z,C.w),he.copy(C))}function Ze(C){Me.equals(C)===!1&&(n.viewport(C.x,C.y,C.z,C.w),Me.copy(C))}function at(C,le){let ce=f.get(le);ce===void 0&&(ce=new WeakMap,f.set(le,ce));let Re=ce.get(C);Re===void 0&&(Re=n.getUniformBlockIndex(le,C.name),ce.set(C,Re))}function We(C,le){const Re=f.get(le).get(C);h.get(le)!==Re&&(n.uniformBlockBinding(le,Re,C.__bindingPointIndex),h.set(le,Re))}function se(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},J=null,Q={},g={},v=new WeakMap,_=[],m=null,d=!1,T=null,y=null,b=null,D=null,A=null,R=null,$=null,M=new Ne(0,0,0),w=0,k=!1,N=null,K=null,P=null,I=null,F=null,he.set(0,0,n.canvas.width,n.canvas.height),Me.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Be,disable:Ae,bindFramebuffer:$e,drawBuffers:O,useProgram:Dt,setBlending:ge,setMaterial:rt,setFlipSided:He,setCullFace:E,setLineWidth:x,setPolygonOffset:z,setScissorTest:ne,activeTexture:te,bindTexture:ie,unbindTexture:_e,compressedTexImage2D:de,compressedTexImage3D:pe,texImage2D:Se,texImage3D:me,updateUBOMapping:at,uniformBlockBinding:We,texStorage2D:Ye,texStorage3D:De,texSubImage2D:be,texSubImage3D:ke,compressedTexSubImage2D:ee,compressedTexSubImage3D:Je,scissor:ze,viewport:Ze,reset:se}}function um(n,e,t,i,r,s,a){const o=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let f;const u=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(E,x){return g?new OffscreenCanvas(E,x):Ir("canvas")}function _(E,x,z,ne){let te=1;if((E.width>ne||E.height>ne)&&(te=ne/Math.max(E.width,E.height)),te<1||x===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const ie=x?zs:Math.floor,_e=ie(te*E.width),de=ie(te*E.height);f===void 0&&(f=v(_e,de));const pe=z?v(_e,de):f;return pe.width=_e,pe.height=de,pe.getContext("2d").drawImage(E,0,0,_e,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+_e+"x"+de+")."),pe}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return io(E.width)&&io(E.height)}function d(E){return o?!1:E.wrapS!==nn||E.wrapT!==nn||E.minFilter!==Nt&&E.minFilter!==$t}function T(E,x){return E.generateMipmaps&&x&&E.minFilter!==Nt&&E.minFilter!==$t}function y(E){n.generateMipmap(E)}function b(E,x,z,ne,te=!1){if(o===!1)return x;if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ie=x;if(x===n.RED&&(z===n.FLOAT&&(ie=n.R32F),z===n.HALF_FLOAT&&(ie=n.R16F),z===n.UNSIGNED_BYTE&&(ie=n.R8)),x===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(ie=n.R8UI),z===n.UNSIGNED_SHORT&&(ie=n.R16UI),z===n.UNSIGNED_INT&&(ie=n.R32UI),z===n.BYTE&&(ie=n.R8I),z===n.SHORT&&(ie=n.R16I),z===n.INT&&(ie=n.R32I)),x===n.RG&&(z===n.FLOAT&&(ie=n.RG32F),z===n.HALF_FLOAT&&(ie=n.RG16F),z===n.UNSIGNED_BYTE&&(ie=n.RG8)),x===n.RGBA){const _e=te?Cr:Qe.getTransfer(ne);z===n.FLOAT&&(ie=n.RGBA32F),z===n.HALF_FLOAT&&(ie=n.RGBA16F),z===n.UNSIGNED_BYTE&&(ie=_e===it?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function D(E,x,z){return T(E,z)===!0||E.isFramebufferTexture&&E.minFilter!==Nt&&E.minFilter!==$t?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function A(E){return E===Nt||E===Ra||E===jr?n.NEAREST:n.LINEAR}function R(E){const x=E.target;x.removeEventListener("dispose",R),M(x),x.isVideoTexture&&h.delete(x)}function $(E){const x=E.target;x.removeEventListener("dispose",$),k(x)}function M(E){const x=i.get(E);if(x.__webglInit===void 0)return;const z=E.source,ne=u.get(z);if(ne){const te=ne[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&w(E),Object.keys(ne).length===0&&u.delete(z)}i.remove(E)}function w(E){const x=i.get(E);n.deleteTexture(x.__webglTexture);const z=E.source,ne=u.get(z);delete ne[x.__cacheKey],a.memory.textures--}function k(E){const x=E.texture,z=i.get(E),ne=i.get(x);if(ne.__webglTexture!==void 0&&(n.deleteTexture(ne.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(z.__webglFramebuffer[te]))for(let ie=0;ie<z.__webglFramebuffer[te].length;ie++)n.deleteFramebuffer(z.__webglFramebuffer[te][ie]);else n.deleteFramebuffer(z.__webglFramebuffer[te]);z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer[te])}else{if(Array.isArray(z.__webglFramebuffer))for(let te=0;te<z.__webglFramebuffer.length;te++)n.deleteFramebuffer(z.__webglFramebuffer[te]);else n.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&n.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let te=0;te<z.__webglColorRenderbuffer.length;te++)z.__webglColorRenderbuffer[te]&&n.deleteRenderbuffer(z.__webglColorRenderbuffer[te]);z.__webglDepthRenderbuffer&&n.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let te=0,ie=x.length;te<ie;te++){const _e=i.get(x[te]);_e.__webglTexture&&(n.deleteTexture(_e.__webglTexture),a.memory.textures--),i.remove(x[te])}i.remove(x),i.remove(E)}let N=0;function K(){N=0}function P(){const E=N;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),N+=1,E}function I(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function F(E,x){const z=i.get(E);if(E.isVideoTexture&&rt(E),E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){const ne=E.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{he(z,E,x);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+x)}function X(E,x){const z=i.get(E);if(E.version>0&&z.__version!==E.version){he(z,E,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+x)}function q(E,x){const z=i.get(E);if(E.version>0&&z.__version!==E.version){he(z,E,x);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+x)}function Y(E,x){const z=i.get(E);if(E.version>0&&z.__version!==E.version){Me(z,E,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+x)}const j={[Ns]:n.REPEAT,[nn]:n.CLAMP_TO_EDGE,[Fs]:n.MIRRORED_REPEAT},J={[Nt]:n.NEAREST,[Ra]:n.NEAREST_MIPMAP_NEAREST,[jr]:n.NEAREST_MIPMAP_LINEAR,[$t]:n.LINEAR,[qc]:n.LINEAR_MIPMAP_NEAREST,[Wi]:n.LINEAR_MIPMAP_LINEAR},Q={[rh]:n.NEVER,[hh]:n.ALWAYS,[sh]:n.LESS,[El]:n.LEQUAL,[ah]:n.EQUAL,[ch]:n.GEQUAL,[oh]:n.GREATER,[lh]:n.NOTEQUAL};function V(E,x,z){if(z?(n.texParameteri(E,n.TEXTURE_WRAP_S,j[x.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,j[x.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,j[x.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,J[x.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,J[x.minFilter])):(n.texParameteri(E,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(E,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(x.wrapS!==nn||x.wrapT!==nn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(E,n.TEXTURE_MAG_FILTER,A(x.magFilter)),n.texParameteri(E,n.TEXTURE_MIN_FILTER,A(x.minFilter)),x.minFilter!==Nt&&x.minFilter!==$t&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Q[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ne=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===Nt||x.minFilter!==jr&&x.minFilter!==Wi||x.type===Dn&&e.has("OES_texture_float_linear")===!1||o===!1&&x.type===Xi&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||i.get(x).__currentAnisotropy)&&(n.texParameterf(E,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy)}}function Z(E,x){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",R));const ne=x.source;let te=u.get(ne);te===void 0&&(te={},u.set(ne,te));const ie=I(x);if(ie!==E.__cacheKey){te[ie]===void 0&&(te[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),te[ie].usedTimes++;const _e=te[E.__cacheKey];_e!==void 0&&(te[E.__cacheKey].usedTimes--,_e.usedTimes===0&&w(x)),E.__cacheKey=ie,E.__webglTexture=te[ie].texture}return z}function he(E,x,z){let ne=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ne=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ne=n.TEXTURE_3D);const te=Z(E,x),ie=x.source;t.bindTexture(ne,E.__webglTexture,n.TEXTURE0+z);const _e=i.get(ie);if(ie.version!==_e.__version||te===!0){t.activeTexture(n.TEXTURE0+z);const de=Qe.getPrimaries(Qe.workingColorSpace),pe=x.colorSpace===Kt?null:Qe.getPrimaries(x.colorSpace),be=x.colorSpace===Kt||de===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const ke=d(x)&&m(x.image)===!1;let ee=_(x.image,ke,!1,r.maxTextureSize);ee=He(x,ee);const Je=m(ee)||o,Ye=s.convert(x.format,x.colorSpace);let De=s.convert(x.type),Se=b(x.internalFormat,Ye,De,x.colorSpace,x.isVideoTexture);V(ne,x,Je);let me;const ze=x.mipmaps,Ze=o&&x.isVideoTexture!==!0&&Se!==Sl,at=_e.__version===void 0||te===!0,We=D(x,ee,Je);if(x.isDepthTexture)Se=n.DEPTH_COMPONENT,o?x.type===Dn?Se=n.DEPTH_COMPONENT32F:x.type===Pn?Se=n.DEPTH_COMPONENT24:x.type===Kn?Se=n.DEPTH24_STENCIL8:Se=n.DEPTH_COMPONENT16:x.type===Dn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Zn&&Se===n.DEPTH_COMPONENT&&x.type!==na&&x.type!==Pn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=Pn,De=s.convert(x.type)),x.format===Ai&&Se===n.DEPTH_COMPONENT&&(Se=n.DEPTH_STENCIL,x.type!==Kn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Kn,De=s.convert(x.type))),at&&(Ze?t.texStorage2D(n.TEXTURE_2D,1,Se,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,Se,ee.width,ee.height,0,Ye,De,null));else if(x.isDataTexture)if(ze.length>0&&Je){Ze&&at&&t.texStorage2D(n.TEXTURE_2D,We,Se,ze[0].width,ze[0].height);for(let se=0,C=ze.length;se<C;se++)me=ze[se],Ze?t.texSubImage2D(n.TEXTURE_2D,se,0,0,me.width,me.height,Ye,De,me.data):t.texImage2D(n.TEXTURE_2D,se,Se,me.width,me.height,0,Ye,De,me.data);x.generateMipmaps=!1}else Ze?(at&&t.texStorage2D(n.TEXTURE_2D,We,Se,ee.width,ee.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee.width,ee.height,Ye,De,ee.data)):t.texImage2D(n.TEXTURE_2D,0,Se,ee.width,ee.height,0,Ye,De,ee.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ze&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,We,Se,ze[0].width,ze[0].height,ee.depth);for(let se=0,C=ze.length;se<C;se++)me=ze[se],x.format!==rn?Ye!==null?Ze?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,me.width,me.height,ee.depth,Ye,me.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,Se,me.width,me.height,ee.depth,0,me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,me.width,me.height,ee.depth,Ye,De,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,Se,me.width,me.height,ee.depth,0,Ye,De,me.data)}else{Ze&&at&&t.texStorage2D(n.TEXTURE_2D,We,Se,ze[0].width,ze[0].height);for(let se=0,C=ze.length;se<C;se++)me=ze[se],x.format!==rn?Ye!==null?Ze?t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,me.width,me.height,Ye,me.data):t.compressedTexImage2D(n.TEXTURE_2D,se,Se,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage2D(n.TEXTURE_2D,se,0,0,me.width,me.height,Ye,De,me.data):t.texImage2D(n.TEXTURE_2D,se,Se,me.width,me.height,0,Ye,De,me.data)}else if(x.isDataArrayTexture)Ze?(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,We,Se,ee.width,ee.height,ee.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,Ye,De,ee.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Se,ee.width,ee.height,ee.depth,0,Ye,De,ee.data);else if(x.isData3DTexture)Ze?(at&&t.texStorage3D(n.TEXTURE_3D,We,Se,ee.width,ee.height,ee.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,Ye,De,ee.data)):t.texImage3D(n.TEXTURE_3D,0,Se,ee.width,ee.height,ee.depth,0,Ye,De,ee.data);else if(x.isFramebufferTexture){if(at)if(Ze)t.texStorage2D(n.TEXTURE_2D,We,Se,ee.width,ee.height);else{let se=ee.width,C=ee.height;for(let le=0;le<We;le++)t.texImage2D(n.TEXTURE_2D,le,Se,se,C,0,Ye,De,null),se>>=1,C>>=1}}else if(ze.length>0&&Je){Ze&&at&&t.texStorage2D(n.TEXTURE_2D,We,Se,ze[0].width,ze[0].height);for(let se=0,C=ze.length;se<C;se++)me=ze[se],Ze?t.texSubImage2D(n.TEXTURE_2D,se,0,0,Ye,De,me):t.texImage2D(n.TEXTURE_2D,se,Se,Ye,De,me);x.generateMipmaps=!1}else Ze?(at&&t.texStorage2D(n.TEXTURE_2D,We,Se,ee.width,ee.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ye,De,ee)):t.texImage2D(n.TEXTURE_2D,0,Se,Ye,De,ee);T(x,Je)&&y(ne),_e.__version=ie.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Me(E,x,z){if(x.image.length!==6)return;const ne=Z(E,x),te=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+z);const ie=i.get(te);if(te.version!==ie.__version||ne===!0){t.activeTexture(n.TEXTURE0+z);const _e=Qe.getPrimaries(Qe.workingColorSpace),de=x.colorSpace===Kt?null:Qe.getPrimaries(x.colorSpace),pe=x.colorSpace===Kt||_e===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const be=x.isCompressedTexture||x.image[0].isCompressedTexture,ke=x.image[0]&&x.image[0].isDataTexture,ee=[];for(let se=0;se<6;se++)!be&&!ke?ee[se]=_(x.image[se],!1,!0,r.maxCubemapSize):ee[se]=ke?x.image[se].image:x.image[se],ee[se]=He(x,ee[se]);const Je=ee[0],Ye=m(Je)||o,De=s.convert(x.format,x.colorSpace),Se=s.convert(x.type),me=b(x.internalFormat,De,Se,x.colorSpace),ze=o&&x.isVideoTexture!==!0,Ze=ie.__version===void 0||ne===!0;let at=D(x,Je,Ye);V(n.TEXTURE_CUBE_MAP,x,Ye);let We;if(be){ze&&Ze&&t.texStorage2D(n.TEXTURE_CUBE_MAP,at,me,Je.width,Je.height);for(let se=0;se<6;se++){We=ee[se].mipmaps;for(let C=0;C<We.length;C++){const le=We[C];x.format!==rn?De!==null?ze?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,0,0,le.width,le.height,De,le.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,me,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,0,0,le.width,le.height,De,Se,le.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,me,le.width,le.height,0,De,Se,le.data)}}}else{We=x.mipmaps,ze&&Ze&&(We.length>0&&at++,t.texStorage2D(n.TEXTURE_CUBE_MAP,at,me,ee[0].width,ee[0].height));for(let se=0;se<6;se++)if(ke){ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ee[se].width,ee[se].height,De,Se,ee[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,me,ee[se].width,ee[se].height,0,De,Se,ee[se].data);for(let C=0;C<We.length;C++){const ce=We[C].image[se].image;ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,0,0,ce.width,ce.height,De,Se,ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,me,ce.width,ce.height,0,De,Se,ce.data)}}else{ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,De,Se,ee[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,me,De,Se,ee[se]);for(let C=0;C<We.length;C++){const le=We[C];ze?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,0,0,De,Se,le.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,me,De,Se,le.image[se])}}}T(x,Ye)&&y(n.TEXTURE_CUBE_MAP),ie.__version=te.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function xe(E,x,z,ne,te,ie){const _e=s.convert(z.format,z.colorSpace),de=s.convert(z.type),pe=b(z.internalFormat,_e,de,z.colorSpace);if(!i.get(x).__hasExternalTextures){const ke=Math.max(1,x.width>>ie),ee=Math.max(1,x.height>>ie);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,ie,pe,ke,ee,x.depth,0,_e,de,null):t.texImage2D(te,ie,pe,ke,ee,0,_e,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),ge(x)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,te,i.get(z).__webglTexture,0,Le(x)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ne,te,i.get(z).__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Fe(E,x,z){if(n.bindRenderbuffer(n.RENDERBUFFER,E),x.depthBuffer&&!x.stencilBuffer){let ne=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(z||ge(x)){const te=x.depthTexture;te&&te.isDepthTexture&&(te.type===Dn?ne=n.DEPTH_COMPONENT32F:te.type===Pn&&(ne=n.DEPTH_COMPONENT24));const ie=Le(x);ge(x)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,ne,x.width,x.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,ne,x.width,x.height)}else n.renderbufferStorage(n.RENDERBUFFER,ne,x.width,x.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,E)}else if(x.depthBuffer&&x.stencilBuffer){const ne=Le(x);z&&ge(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,n.DEPTH24_STENCIL8,x.width,x.height):ge(x)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,n.DEPTH24_STENCIL8,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,E)}else{const ne=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let te=0;te<ne.length;te++){const ie=ne[te],_e=s.convert(ie.format,ie.colorSpace),de=s.convert(ie.type),pe=b(ie.internalFormat,_e,de,ie.colorSpace),be=Le(x);z&&ge(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,be,pe,x.width,x.height):ge(x)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be,pe,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,pe,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Be(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),F(x.depthTexture,0);const ne=i.get(x.depthTexture).__webglTexture,te=Le(x);if(x.depthTexture.format===Zn)ge(x)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(x.depthTexture.format===Ai)ge(x)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ae(E){const x=i.get(E),z=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Be(x.__webglFramebuffer,E)}else if(z){x.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[ne]),x.__webglDepthbuffer[ne]=n.createRenderbuffer(),Fe(x.__webglDepthbuffer[ne],E,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=n.createRenderbuffer(),Fe(x.__webglDepthbuffer,E,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(E,x,z){const ne=i.get(E);x!==void 0&&xe(ne.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Ae(E)}function O(E){const x=E.texture,z=i.get(E),ne=i.get(x);E.addEventListener("dispose",$),E.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture()),ne.__version=x.version,a.memory.textures++);const te=E.isWebGLCubeRenderTarget===!0,ie=E.isWebGLMultipleRenderTargets===!0,_e=m(E)||o;if(te){z.__webglFramebuffer=[];for(let de=0;de<6;de++)if(o&&x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[de]=[];for(let pe=0;pe<x.mipmaps.length;pe++)z.__webglFramebuffer[de][pe]=n.createFramebuffer()}else z.__webglFramebuffer[de]=n.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let de=0;de<x.mipmaps.length;de++)z.__webglFramebuffer[de]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ie)if(r.drawBuffers){const de=E.texture;for(let pe=0,be=de.length;pe<be;pe++){const ke=i.get(de[pe]);ke.__webglTexture===void 0&&(ke.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&ge(E)===!1){const de=ie?x:[x];z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let pe=0;pe<de.length;pe++){const be=de[pe];z.__webglColorRenderbuffer[pe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[pe]);const ke=s.convert(be.format,be.colorSpace),ee=s.convert(be.type),Je=b(be.internalFormat,ke,ee,be.colorSpace,E.isXRRenderTarget===!0),Ye=Le(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ye,Je,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,z.__webglColorRenderbuffer[pe])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Fe(z.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(te){t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),V(n.TEXTURE_CUBE_MAP,x,_e);for(let de=0;de<6;de++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let pe=0;pe<x.mipmaps.length;pe++)xe(z.__webglFramebuffer[de][pe],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,pe);else xe(z.__webglFramebuffer[de],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);T(x,_e)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){const de=E.texture;for(let pe=0,be=de.length;pe<be;pe++){const ke=de[pe],ee=i.get(ke);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture),V(n.TEXTURE_2D,ke,_e),xe(z.__webglFramebuffer,E,ke,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,0),T(ke,_e)&&y(n.TEXTURE_2D)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?de=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(de,ne.__webglTexture),V(de,x,_e),o&&x.mipmaps&&x.mipmaps.length>0)for(let pe=0;pe<x.mipmaps.length;pe++)xe(z.__webglFramebuffer[pe],E,x,n.COLOR_ATTACHMENT0,de,pe);else xe(z.__webglFramebuffer,E,x,n.COLOR_ATTACHMENT0,de,0);T(x,_e)&&y(de),t.unbindTexture()}E.depthBuffer&&Ae(E)}function Dt(E){const x=m(E)||o,z=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ne=0,te=z.length;ne<te;ne++){const ie=z[ne];if(T(ie,x)){const _e=E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,de=i.get(ie).__webglTexture;t.bindTexture(_e,de),y(_e),t.unbindTexture()}}}function ye(E){if(o&&E.samples>0&&ge(E)===!1){const x=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],z=E.width,ne=E.height;let te=n.COLOR_BUFFER_BIT;const ie=[],_e=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=i.get(E),pe=E.isWebGLMultipleRenderTargets===!0;if(pe)for(let be=0;be<x.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let be=0;be<x.length;be++){ie.push(n.COLOR_ATTACHMENT0+be),E.depthBuffer&&ie.push(_e);const ke=de.__ignoreDepthValues!==void 0?de.__ignoreDepthValues:!1;if(ke===!1&&(E.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),pe&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[be]),ke===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[_e]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_e])),pe){const ee=i.get(x[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ee,0)}n.blitFramebuffer(0,0,z,ne,0,0,z,ne,te,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pe)for(let be=0;be<x.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,de.__webglColorRenderbuffer[be]);const ke=i.get(x[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}}function Le(E){return Math.min(r.maxSamples,E.samples)}function ge(E){const x=i.get(E);return o&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function rt(E){const x=a.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function He(E,x){const z=E.colorSpace,ne=E.format,te=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Os||z!==Sn&&z!==Kt&&(Qe.getTransfer(z)===it?o===!1?e.has("EXT_sRGB")===!0&&ne===rn?(E.format=Os,E.minFilter=$t,E.generateMipmaps=!1):x=wl.sRGBToLinear(x):(ne!==rn||te!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}this.allocateTextureUnit=P,this.resetTextureUnits=K,this.setTexture2D=F,this.setTexture2DArray=X,this.setTexture3D=q,this.setTextureCube=Y,this.rebindTextures=$e,this.setupRenderTarget=O,this.updateRenderTargetMipmap=Dt,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ge}function fm(n,e,t){const i=t.isWebGL2;function r(s,a=Kt){let o;const l=Qe.getTransfer(a);if(s===Un)return n.UNSIGNED_BYTE;if(s===gl)return n.UNSIGNED_SHORT_4_4_4_4;if(s===_l)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Yc)return n.BYTE;if(s===$c)return n.SHORT;if(s===na)return n.UNSIGNED_SHORT;if(s===ml)return n.INT;if(s===Pn)return n.UNSIGNED_INT;if(s===Dn)return n.FLOAT;if(s===Xi)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===jc)return n.ALPHA;if(s===rn)return n.RGBA;if(s===Kc)return n.LUMINANCE;if(s===Zc)return n.LUMINANCE_ALPHA;if(s===Zn)return n.DEPTH_COMPONENT;if(s===Ai)return n.DEPTH_STENCIL;if(s===Os)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Jc)return n.RED;if(s===vl)return n.RED_INTEGER;if(s===Qc)return n.RG;if(s===xl)return n.RG_INTEGER;if(s===Ml)return n.RGBA_INTEGER;if(s===Kr||s===Zr||s===Jr||s===Qr)if(l===it)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Kr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Zr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Jr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Qr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Kr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Zr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Jr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Qr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ca||s===Pa||s===Da||s===La)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Ca)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Pa)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Da)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===La)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Sl)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Ia||s===Ua)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Ia)return l===it?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Ua)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Na||s===Fa||s===Oa||s===Ba||s===za||s===Ga||s===Ha||s===ka||s===Va||s===Wa||s===Xa||s===qa||s===Ya||s===$a)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Na)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Fa)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Oa)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ba)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===za)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ga)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ha)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ka)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Va)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Wa)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Xa)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===qa)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ya)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===$a)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===es||s===ja||s===Ka)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===es)return l===it?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===ja)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ka)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===eh||s===Za||s===Ja||s===Qa)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===es)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Za)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ja)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Qa)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Kn?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class pm extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class zt extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mm={type:"move"};class ws{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),g=.02,v=.005;c.inputState.pinching&&u>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mm)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new zt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class gm extends Ci{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,g=null,v=null;const _=t.getContextAttributes();let m=null,d=null;const T=[],y=[],b=new je;let D=null;const A=new jt;A.layers.enable(1),A.viewport=new St;const R=new jt;R.layers.enable(2),R.viewport=new St;const $=[A,R],M=new pm;M.layers.enable(1),M.layers.enable(2);let w=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Z=T[V];return Z===void 0&&(Z=new ws,T[V]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(V){let Z=T[V];return Z===void 0&&(Z=new ws,T[V]=Z),Z.getGripSpace()},this.getHand=function(V){let Z=T[V];return Z===void 0&&(Z=new ws,T[V]=Z),Z.getHandSpace()};function N(V){const Z=y.indexOf(V.inputSource);if(Z===-1)return;const he=T[Z];he!==void 0&&(he.update(V.inputSource,V.frame,c||a),he.dispatchEvent({type:V.type,data:V.inputSource}))}function K(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",P);for(let V=0;V<T.length;V++){const Z=y[V];Z!==null&&(y[V]=null,T[V].disconnect(Z))}w=null,k=null,e.setRenderTarget(m),g=null,u=null,f=null,r=null,d=null,Q.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return u!==null?u:g},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(V){if(r=V,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",K),r.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};g=new XRWebGLLayer(r,t,Z),r.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),d=new Qn(g.framebufferWidth,g.framebufferHeight,{format:rn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Z=null,he=null,Me=null;_.depth&&(Me=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=_.stencil?Ai:Zn,he=_.stencil?Kn:Pn);const xe={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:s};f=new XRWebGLBinding(r,t),u=f.createProjectionLayer(xe),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),d=new Qn(u.textureWidth,u.textureHeight,{format:rn,type:Un,depthTexture:new Ol(u.textureWidth,u.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Fe=e.properties.get(d);Fe.__ignoreDepthValues=u.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Q.setContext(r),Q.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P(V){for(let Z=0;Z<V.removed.length;Z++){const he=V.removed[Z],Me=y.indexOf(he);Me>=0&&(y[Me]=null,T[Me].disconnect(he))}for(let Z=0;Z<V.added.length;Z++){const he=V.added[Z];let Me=y.indexOf(he);if(Me===-1){for(let Fe=0;Fe<T.length;Fe++)if(Fe>=y.length){y.push(he),Me=Fe;break}else if(y[Fe]===null){y[Fe]=he,Me=Fe;break}if(Me===-1)break}const xe=T[Me];xe&&xe.connect(he)}}const I=new L,F=new L;function X(V,Z,he){I.setFromMatrixPosition(Z.matrixWorld),F.setFromMatrixPosition(he.matrixWorld);const Me=I.distanceTo(F),xe=Z.projectionMatrix.elements,Fe=he.projectionMatrix.elements,Be=xe[14]/(xe[10]-1),Ae=xe[14]/(xe[10]+1),$e=(xe[9]+1)/xe[5],O=(xe[9]-1)/xe[5],Dt=(xe[8]-1)/xe[0],ye=(Fe[8]+1)/Fe[0],Le=Be*Dt,ge=Be*ye,rt=Me/(-Dt+ye),He=rt*-Dt;Z.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(He),V.translateZ(rt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const E=Be+rt,x=Ae+rt,z=Le-He,ne=ge+(Me-He),te=$e*Ae/x*E,ie=O*Ae/x*E;V.projectionMatrix.makePerspective(z,ne,te,ie,E,x),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function q(V,Z){Z===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Z.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(r===null)return;M.near=R.near=A.near=V.near,M.far=R.far=A.far=V.far,(w!==M.near||k!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,k=M.far);const Z=V.parent,he=M.cameras;q(M,Z);for(let Me=0;Me<he.length;Me++)q(he[Me],Z);he.length===2?X(M,A,R):M.projectionMatrix.copy(A.projectionMatrix),Y(V,M,Z)};function Y(V,Z,he){he===null?V.matrix.copy(Z.matrixWorld):(V.matrix.copy(he.matrixWorld),V.matrix.invert(),V.matrix.multiply(Z.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Bs*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&g===null))return l},this.setFoveation=function(V){l=V,u!==null&&(u.fixedFoveation=V),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=V)};let j=null;function J(V,Z){if(h=Z.getViewerPose(c||a),v=Z,h!==null){const he=h.views;g!==null&&(e.setRenderTargetFramebuffer(d,g.framebuffer),e.setRenderTarget(d));let Me=!1;he.length!==M.cameras.length&&(M.cameras.length=0,Me=!0);for(let xe=0;xe<he.length;xe++){const Fe=he[xe];let Be=null;if(g!==null)Be=g.getViewport(Fe);else{const $e=f.getViewSubImage(u,Fe);Be=$e.viewport,xe===0&&(e.setRenderTargetTextures(d,$e.colorTexture,u.ignoreDepthValues?void 0:$e.depthStencilTexture),e.setRenderTarget(d))}let Ae=$[xe];Ae===void 0&&(Ae=new jt,Ae.layers.enable(xe),Ae.viewport=new St,$[xe]=Ae),Ae.matrix.fromArray(Fe.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Fe.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(Be.x,Be.y,Be.width,Be.height),xe===0&&(M.matrix.copy(Ae.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Me===!0&&M.cameras.push(Ae)}}for(let he=0;he<T.length;he++){const Me=y[he],xe=T[he];Me!==null&&xe!==void 0&&xe.update(Me,Z,c||a)}j&&j(V,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),v=null}const Q=new Nl;Q.setAnimationLoop(J),this.setAnimationLoop=function(V){j=V},this.dispose=function(){}}}function _m(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Ll(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,T,y,b){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),h(m,d)):d.isMeshStandardMaterial?(s(m,d),u(m,d),d.isMeshPhysicalMaterial&&g(m,d,b)):d.isMeshMatcapMaterial?(s(m,d),v(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,T,y):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Gt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Gt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const T=e.get(d).envMap;if(T&&(m.envMap.value=T,m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const y=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*y,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,T,y){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*T,m.scale.value=y*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function u(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function g(m,d,T){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Gt&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const T=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function vm(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(T,y){const b=y.program;i.uniformBlockBinding(T,b)}function c(T,y){let b=r[T.id];b===void 0&&(v(T),b=h(T),r[T.id]=b,T.addEventListener("dispose",m));const D=y.program;i.updateUBOMapping(T,D);const A=e.render.frame;s[T.id]!==A&&(u(T),s[T.id]=A)}function h(T){const y=f();T.__bindingPointIndex=y;const b=n.createBuffer(),D=T.__size,A=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,D,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,b),b}function f(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(T){const y=r[T.id],b=T.uniforms,D=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let A=0,R=b.length;A<R;A++){const $=Array.isArray(b[A])?b[A]:[b[A]];for(let M=0,w=$.length;M<w;M++){const k=$[M];if(g(k,A,M,D)===!0){const N=k.__offset,K=Array.isArray(k.value)?k.value:[k.value];let P=0;for(let I=0;I<K.length;I++){const F=K[I],X=_(F);typeof F=="number"||typeof F=="boolean"?(k.__data[0]=F,n.bufferSubData(n.UNIFORM_BUFFER,N+P,k.__data)):F.isMatrix3?(k.__data[0]=F.elements[0],k.__data[1]=F.elements[1],k.__data[2]=F.elements[2],k.__data[3]=0,k.__data[4]=F.elements[3],k.__data[5]=F.elements[4],k.__data[6]=F.elements[5],k.__data[7]=0,k.__data[8]=F.elements[6],k.__data[9]=F.elements[7],k.__data[10]=F.elements[8],k.__data[11]=0):(F.toArray(k.__data,P),P+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,k.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(T,y,b,D){const A=T.value,R=y+"_"+b;if(D[R]===void 0)return typeof A=="number"||typeof A=="boolean"?D[R]=A:D[R]=A.clone(),!0;{const $=D[R];if(typeof A=="number"||typeof A=="boolean"){if($!==A)return D[R]=A,!0}else if($.equals(A)===!1)return $.copy(A),!0}return!1}function v(T){const y=T.uniforms;let b=0;const D=16;for(let R=0,$=y.length;R<$;R++){const M=Array.isArray(y[R])?y[R]:[y[R]];for(let w=0,k=M.length;w<k;w++){const N=M[w],K=Array.isArray(N.value)?N.value:[N.value];for(let P=0,I=K.length;P<I;P++){const F=K[P],X=_(F),q=b%D;q!==0&&D-q<X.boundary&&(b+=D-q),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=b,b+=X.storage}}}const A=b%D;return A>0&&(b+=D-A),T.__size=b,T.__cache={},this}function _(T){const y={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(y.boundary=4,y.storage=4):T.isVector2?(y.boundary=8,y.storage=8):T.isVector3||T.isColor?(y.boundary=16,y.storage=12):T.isVector4?(y.boundary=16,y.storage=16):T.isMatrix3?(y.boundary=48,y.storage=48):T.isMatrix4?(y.boundary=64,y.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),y}function m(T){const y=T.target;y.removeEventListener("dispose",m);const b=a.indexOf(y.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function d(){for(const T in r)n.deleteBuffer(r[T]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class Vl{constructor(e={}){const{canvas:t=uh(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let u;i!==null?u=i.getContextAttributes().alpha:u=a;const g=new Uint32Array(4),v=new Int32Array(4);let _=null,m=null;const d=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yt,this._useLegacyLights=!1,this.toneMapping=In,this.toneMappingExposure=1;const y=this;let b=!1,D=0,A=0,R=null,$=-1,M=null;const w=new St,k=new St;let N=null;const K=new Ne(0);let P=0,I=t.width,F=t.height,X=1,q=null,Y=null;const j=new St(0,0,I,F),J=new St(0,0,I,F);let Q=!1;const V=new aa;let Z=!1,he=!1,Me=null;const xe=new ft,Fe=new je,Be=new L,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function $e(){return R===null?X:1}let O=i;function Dt(S,U){for(let G=0;G<S.length;G++){const H=S[G],B=t.getContext(H,U);if(B!==null)return B}return null}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ta}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",C,!1),t.addEventListener("webglcontextcreationerror",le,!1),O===null){const U=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&U.shift(),O=Dt(U,S),O===null)throw Dt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ye,Le,ge,rt,He,E,x,z,ne,te,ie,_e,de,pe,be,ke,ee,Je,Ye,De,Se,me,ze,Ze;function at(){ye=new Rf(O),Le=new yf(O,ye,e),ye.init(Le),me=new fm(O,ye,Le),ge=new dm(O,ye,Le),rt=new Df(O),He=new Zp,E=new um(O,ye,ge,He,Le,me,rt),x=new Tf(y),z=new Af(y),ne=new Bh(O,Le),ze=new Mf(O,ye,ne,Le),te=new Cf(O,ne,rt,ze),ie=new Nf(O,te,ne,rt),Ye=new Uf(O,Le,E),ke=new Ef(He),_e=new Kp(y,x,z,ye,Le,ze,ke),de=new _m(y,He),pe=new Qp,be=new sm(ye,Le),Je=new xf(y,x,z,ge,ie,u,l),ee=new hm(y,ie,Le),Ze=new vm(O,rt,Le,ge),De=new Sf(O,ye,rt,Le),Se=new Pf(O,ye,rt,Le),rt.programs=_e.programs,y.capabilities=Le,y.extensions=ye,y.properties=He,y.renderLists=pe,y.shadowMap=ee,y.state=ge,y.info=rt}at();const We=new gm(y,O);this.xr=We,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=ye.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ye.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(S){S!==void 0&&(X=S,this.setSize(I,F,!1))},this.getSize=function(S){return S.set(I,F)},this.setSize=function(S,U,G=!0){if(We.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=S,F=U,t.width=Math.floor(S*X),t.height=Math.floor(U*X),G===!0&&(t.style.width=S+"px",t.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(I*X,F*X).floor()},this.setDrawingBufferSize=function(S,U,G){I=S,F=U,X=G,t.width=Math.floor(S*G),t.height=Math.floor(U*G),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(w)},this.getViewport=function(S){return S.copy(j)},this.setViewport=function(S,U,G,H){S.isVector4?j.set(S.x,S.y,S.z,S.w):j.set(S,U,G,H),ge.viewport(w.copy(j).multiplyScalar(X).floor())},this.getScissor=function(S){return S.copy(J)},this.setScissor=function(S,U,G,H){S.isVector4?J.set(S.x,S.y,S.z,S.w):J.set(S,U,G,H),ge.scissor(k.copy(J).multiplyScalar(X).floor())},this.getScissorTest=function(){return Q},this.setScissorTest=function(S){ge.setScissorTest(Q=S)},this.setOpaqueSort=function(S){q=S},this.setTransparentSort=function(S){Y=S},this.getClearColor=function(S){return S.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(S=!0,U=!0,G=!0){let H=0;if(S){let B=!1;if(R!==null){const ue=R.texture.format;B=ue===Ml||ue===xl||ue===vl}if(B){const ue=R.texture.type,ve=ue===Un||ue===Pn||ue===na||ue===Kn||ue===gl||ue===_l,we=Je.getClearColor(),Pe=Je.getClearAlpha(),Ve=we.r,Ie=we.g,Oe=we.b;ve?(g[0]=Ve,g[1]=Ie,g[2]=Oe,g[3]=Pe,O.clearBufferuiv(O.COLOR,0,g)):(v[0]=Ve,v[1]=Ie,v[2]=Oe,v[3]=Pe,O.clearBufferiv(O.COLOR,0,v))}else H|=O.COLOR_BUFFER_BIT}U&&(H|=O.DEPTH_BUFFER_BIT),G&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",C,!1),t.removeEventListener("webglcontextcreationerror",le,!1),pe.dispose(),be.dispose(),He.dispose(),x.dispose(),z.dispose(),ie.dispose(),ze.dispose(),Ze.dispose(),_e.dispose(),We.dispose(),We.removeEventListener("sessionstart",Lt),We.removeEventListener("sessionend",nt),Me&&(Me.dispose(),Me=null),It.stop()};function se(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function C(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const S=rt.autoReset,U=ee.enabled,G=ee.autoUpdate,H=ee.needsUpdate,B=ee.type;at(),rt.autoReset=S,ee.enabled=U,ee.autoUpdate=G,ee.needsUpdate=H,ee.type=B}function le(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ce(S){const U=S.target;U.removeEventListener("dispose",ce),Re(U)}function Re(S){Ee(S),He.remove(S)}function Ee(S){const U=He.get(S).programs;U!==void 0&&(U.forEach(function(G){_e.releaseProgram(G)}),S.isShaderMaterial&&_e.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,G,H,B,ue){U===null&&(U=Ae);const ve=B.isMesh&&B.matrixWorld.determinant()<0,we=ac(S,U,G,H,B);ge.setMaterial(H,ve);let Pe=G.index,Ve=1;if(H.wireframe===!0){if(Pe=te.getWireframeAttribute(G),Pe===void 0)return;Ve=2}const Ie=G.drawRange,Oe=G.attributes.position;let ct=Ie.start*Ve,Ht=(Ie.start+Ie.count)*Ve;ue!==null&&(ct=Math.max(ct,ue.start*Ve),Ht=Math.min(Ht,(ue.start+ue.count)*Ve)),Pe!==null?(ct=Math.max(ct,0),Ht=Math.min(Ht,Pe.count)):Oe!=null&&(ct=Math.max(ct,0),Ht=Math.min(Ht,Oe.count));const _t=Ht-ct;if(_t<0||_t===1/0)return;ze.setup(B,H,we,G,Pe);let fn,st=De;if(Pe!==null&&(fn=ne.get(Pe),st=Se,st.setIndex(fn)),B.isMesh)H.wireframe===!0?(ge.setLineWidth(H.wireframeLinewidth*$e()),st.setMode(O.LINES)):st.setMode(O.TRIANGLES);else if(B.isLine){let Xe=H.linewidth;Xe===void 0&&(Xe=1),ge.setLineWidth(Xe*$e()),B.isLineSegments?st.setMode(O.LINES):B.isLineLoop?st.setMode(O.LINE_LOOP):st.setMode(O.LINE_STRIP)}else B.isPoints?st.setMode(O.POINTS):B.isSprite&&st.setMode(O.TRIANGLES);if(B.isBatchedMesh)st.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)st.renderInstances(ct,_t,B.count);else if(G.isInstancedBufferGeometry){const Xe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Xr=Math.min(G.instanceCount,Xe);st.renderInstances(ct,_t,Xr)}else st.render(ct,_t)};function et(S,U,G){S.transparent===!0&&S.side===Mt&&S.forceSinglePass===!1?(S.side=Gt,S.needsUpdate=!0,Zi(S,U,G),S.side=Nn,S.needsUpdate=!0,Zi(S,U,G),S.side=Mt):Zi(S,U,G)}this.compile=function(S,U,G=null){G===null&&(G=S),m=be.get(G),m.init(),T.push(m),G.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),S!==G&&S.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights(y._useLegacyLights);const H=new Set;return S.traverse(function(B){const ue=B.material;if(ue)if(Array.isArray(ue))for(let ve=0;ve<ue.length;ve++){const we=ue[ve];et(we,G,B),H.add(we)}else et(ue,G,B),H.add(ue)}),T.pop(),m=null,H},this.compileAsync=function(S,U,G=null){const H=this.compile(S,U,G);return new Promise(B=>{function ue(){if(H.forEach(function(ve){He.get(ve).currentProgram.isReady()&&H.delete(ve)}),H.size===0){B(S);return}setTimeout(ue,10)}ye.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let tt=null;function gt(S){tt&&tt(S)}function Lt(){It.stop()}function nt(){It.start()}const It=new Nl;It.setAnimationLoop(gt),typeof self<"u"&&It.setContext(self),this.setAnimationLoop=function(S){tt=S,We.setAnimationLoop(S),S===null?It.stop():It.start()},We.addEventListener("sessionstart",Lt),We.addEventListener("sessionend",nt),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(We.cameraAutoUpdate===!0&&We.updateCamera(U),U=We.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,U,R),m=be.get(S,T.length),m.init(),T.push(m),xe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),V.setFromProjectionMatrix(xe),he=this.localClippingEnabled,Z=ke.init(this.clippingPlanes,he),_=pe.get(S,d.length),_.init(),d.push(_),on(S,U,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(q,Y),this.info.render.frame++,Z===!0&&ke.beginShadows();const G=m.state.shadowsArray;if(ee.render(G,S,U),Z===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(_,S),m.setupLights(y._useLegacyLights),U.isArrayCamera){const H=U.cameras;for(let B=0,ue=H.length;B<ue;B++){const ve=H[B];ga(_,S,ve,ve.viewport)}}else ga(_,S,U);R!==null&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(y,S,U),ze.resetDefaultState(),$=-1,M=null,T.pop(),T.length>0?m=T[T.length-1]:m=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function on(S,U,G,H){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||V.intersectsSprite(S)){H&&Be.setFromMatrixPosition(S.matrixWorld).applyMatrix4(xe);const ve=ie.update(S),we=S.material;we.visible&&_.push(S,ve,we,G,Be.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||V.intersectsObject(S))){const ve=ie.update(S),we=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Be.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Be.copy(ve.boundingSphere.center)),Be.applyMatrix4(S.matrixWorld).applyMatrix4(xe)),Array.isArray(we)){const Pe=ve.groups;for(let Ve=0,Ie=Pe.length;Ve<Ie;Ve++){const Oe=Pe[Ve],ct=we[Oe.materialIndex];ct&&ct.visible&&_.push(S,ve,ct,G,Be.z,Oe)}}else we.visible&&_.push(S,ve,we,G,Be.z,null)}}const ue=S.children;for(let ve=0,we=ue.length;ve<we;ve++)on(ue[ve],U,G,H)}function ga(S,U,G,H){const B=S.opaque,ue=S.transmissive,ve=S.transparent;m.setupLightsView(G),Z===!0&&ke.setGlobalState(y.clippingPlanes,G),ue.length>0&&sc(B,ue,U,G),H&&ge.viewport(w.copy(H)),B.length>0&&Ki(B,U,G),ue.length>0&&Ki(ue,U,G),ve.length>0&&Ki(ve,U,G),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function sc(S,U,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const ue=Le.isWebGL2;Me===null&&(Me=new Qn(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?Xi:Un,minFilter:Wi,samples:ue?4:0})),y.getDrawingBufferSize(Fe),ue?Me.setSize(Fe.x,Fe.y):Me.setSize(zs(Fe.x),zs(Fe.y));const ve=y.getRenderTarget();y.setRenderTarget(Me),y.getClearColor(K),P=y.getClearAlpha(),P<1&&y.setClearColor(16777215,.5),y.clear();const we=y.toneMapping;y.toneMapping=In,Ki(S,G,H),E.updateMultisampleRenderTarget(Me),E.updateRenderTargetMipmap(Me);let Pe=!1;for(let Ve=0,Ie=U.length;Ve<Ie;Ve++){const Oe=U[Ve],ct=Oe.object,Ht=Oe.geometry,_t=Oe.material,fn=Oe.group;if(_t.side===Mt&&ct.layers.test(H.layers)){const st=_t.side;_t.side=Gt,_t.needsUpdate=!0,_a(ct,G,H,Ht,_t,fn),_t.side=st,_t.needsUpdate=!0,Pe=!0}}Pe===!0&&(E.updateMultisampleRenderTarget(Me),E.updateRenderTargetMipmap(Me)),y.setRenderTarget(ve),y.setClearColor(K,P),y.toneMapping=we}function Ki(S,U,G){const H=U.isScene===!0?U.overrideMaterial:null;for(let B=0,ue=S.length;B<ue;B++){const ve=S[B],we=ve.object,Pe=ve.geometry,Ve=H===null?ve.material:H,Ie=ve.group;we.layers.test(G.layers)&&_a(we,U,G,Pe,Ve,Ie)}}function _a(S,U,G,H,B,ue){S.onBeforeRender(y,U,G,H,B,ue),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(y,U,G,H,S,ue),B.transparent===!0&&B.side===Mt&&B.forceSinglePass===!1?(B.side=Gt,B.needsUpdate=!0,y.renderBufferDirect(G,U,H,B,S,ue),B.side=Nn,B.needsUpdate=!0,y.renderBufferDirect(G,U,H,B,S,ue),B.side=Mt):y.renderBufferDirect(G,U,H,B,S,ue),S.onAfterRender(y,U,G,H,B,ue)}function Zi(S,U,G){U.isScene!==!0&&(U=Ae);const H=He.get(S),B=m.state.lights,ue=m.state.shadowsArray,ve=B.state.version,we=_e.getParameters(S,B.state,ue,U,G),Pe=_e.getProgramCacheKey(we);let Ve=H.programs;H.environment=S.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(S.isMeshStandardMaterial?z:x).get(S.envMap||H.environment),Ve===void 0&&(S.addEventListener("dispose",ce),Ve=new Map,H.programs=Ve);let Ie=Ve.get(Pe);if(Ie!==void 0){if(H.currentProgram===Ie&&H.lightsStateVersion===ve)return xa(S,we),Ie}else we.uniforms=_e.getUniforms(S),S.onBuild(G,we,y),S.onBeforeCompile(we,y),Ie=_e.acquireProgram(we,Pe),Ve.set(Pe,Ie),H.uniforms=we.uniforms;const Oe=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Oe.clippingPlanes=ke.uniform),xa(S,we),H.needsLights=lc(S),H.lightsStateVersion=ve,H.needsLights&&(Oe.ambientLightColor.value=B.state.ambient,Oe.lightProbe.value=B.state.probe,Oe.directionalLights.value=B.state.directional,Oe.directionalLightShadows.value=B.state.directionalShadow,Oe.spotLights.value=B.state.spot,Oe.spotLightShadows.value=B.state.spotShadow,Oe.rectAreaLights.value=B.state.rectArea,Oe.ltc_1.value=B.state.rectAreaLTC1,Oe.ltc_2.value=B.state.rectAreaLTC2,Oe.pointLights.value=B.state.point,Oe.pointLightShadows.value=B.state.pointShadow,Oe.hemisphereLights.value=B.state.hemi,Oe.directionalShadowMap.value=B.state.directionalShadowMap,Oe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Oe.spotShadowMap.value=B.state.spotShadowMap,Oe.spotLightMatrix.value=B.state.spotLightMatrix,Oe.spotLightMap.value=B.state.spotLightMap,Oe.pointShadowMap.value=B.state.pointShadowMap,Oe.pointShadowMatrix.value=B.state.pointShadowMatrix),H.currentProgram=Ie,H.uniformsList=null,Ie}function va(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=Er.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function xa(S,U){const G=He.get(S);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function ac(S,U,G,H,B){U.isScene!==!0&&(U=Ae),E.resetTextureUnits();const ue=U.fog,ve=H.isMeshStandardMaterial?U.environment:null,we=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Sn,Pe=(H.isMeshStandardMaterial?z:x).get(H.envMap||ve),Ve=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ie=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Oe=!!G.morphAttributes.position,ct=!!G.morphAttributes.normal,Ht=!!G.morphAttributes.color;let _t=In;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(_t=y.toneMapping);const fn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,st=fn!==void 0?fn.length:0,Xe=He.get(H),Xr=m.state.lights;if(Z===!0&&(he===!0||S!==M)){const qt=S===M&&H.id===$;ke.setState(H,S,qt)}let ot=!1;H.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==Xr.state.version||Xe.outputColorSpace!==we||B.isBatchedMesh&&Xe.batching===!1||!B.isBatchedMesh&&Xe.batching===!0||B.isInstancedMesh&&Xe.instancing===!1||!B.isInstancedMesh&&Xe.instancing===!0||B.isSkinnedMesh&&Xe.skinning===!1||!B.isSkinnedMesh&&Xe.skinning===!0||B.isInstancedMesh&&Xe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Xe.instancingColor===!1&&B.instanceColor!==null||Xe.envMap!==Pe||H.fog===!0&&Xe.fog!==ue||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==ke.numPlanes||Xe.numIntersection!==ke.numIntersection)||Xe.vertexAlphas!==Ve||Xe.vertexTangents!==Ie||Xe.morphTargets!==Oe||Xe.morphNormals!==ct||Xe.morphColors!==Ht||Xe.toneMapping!==_t||Le.isWebGL2===!0&&Xe.morphTargetsCount!==st)&&(ot=!0):(ot=!0,Xe.__version=H.version);let On=Xe.currentProgram;ot===!0&&(On=Zi(H,U,B));let Ma=!1,Ii=!1,qr=!1;const wt=On.getUniforms(),Bn=Xe.uniforms;if(ge.useProgram(On.program)&&(Ma=!0,Ii=!0,qr=!0),H.id!==$&&($=H.id,Ii=!0),Ma||M!==S){wt.setValue(O,"projectionMatrix",S.projectionMatrix),wt.setValue(O,"viewMatrix",S.matrixWorldInverse);const qt=wt.map.cameraPosition;qt!==void 0&&qt.setValue(O,Be.setFromMatrixPosition(S.matrixWorld)),Le.logarithmicDepthBuffer&&wt.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&wt.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,Ii=!0,qr=!0)}if(B.isSkinnedMesh){wt.setOptional(O,B,"bindMatrix"),wt.setOptional(O,B,"bindMatrixInverse");const qt=B.skeleton;qt&&(Le.floatVertexTextures?(qt.boneTexture===null&&qt.computeBoneTexture(),wt.setValue(O,"boneTexture",qt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}B.isBatchedMesh&&(wt.setOptional(O,B,"batchingTexture"),wt.setValue(O,"batchingTexture",B._matricesTexture,E));const Yr=G.morphAttributes;if((Yr.position!==void 0||Yr.normal!==void 0||Yr.color!==void 0&&Le.isWebGL2===!0)&&Ye.update(B,G,On),(Ii||Xe.receiveShadow!==B.receiveShadow)&&(Xe.receiveShadow=B.receiveShadow,wt.setValue(O,"receiveShadow",B.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Bn.envMap.value=Pe,Bn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),Ii&&(wt.setValue(O,"toneMappingExposure",y.toneMappingExposure),Xe.needsLights&&oc(Bn,qr),ue&&H.fog===!0&&de.refreshFogUniforms(Bn,ue),de.refreshMaterialUniforms(Bn,H,X,F,Me),Er.upload(O,va(Xe),Bn,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Er.upload(O,va(Xe),Bn,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&wt.setValue(O,"center",B.center),wt.setValue(O,"modelViewMatrix",B.modelViewMatrix),wt.setValue(O,"normalMatrix",B.normalMatrix),wt.setValue(O,"modelMatrix",B.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const qt=H.uniformsGroups;for(let $r=0,cc=qt.length;$r<cc;$r++)if(Le.isWebGL2){const Sa=qt[$r];Ze.update(Sa,On),Ze.bind(Sa,On)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return On}function oc(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function lc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,U,G){He.get(S.texture).__webglTexture=U,He.get(S.depthTexture).__webglTexture=G;const H=He.get(S);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,U){const G=He.get(S);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,G=0){R=S,D=U,A=G;let H=!0,B=null,ue=!1,ve=!1;if(S){const Pe=He.get(S);Pe.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(O.FRAMEBUFFER,null),H=!1):Pe.__webglFramebuffer===void 0?E.setupRenderTarget(S):Pe.__hasExternalTextures&&E.rebindTextures(S,He.get(S.texture).__webglTexture,He.get(S.depthTexture).__webglTexture);const Ve=S.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(ve=!0);const Ie=He.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ie[U])?B=Ie[U][G]:B=Ie[U],ue=!0):Le.isWebGL2&&S.samples>0&&E.useMultisampledRTT(S)===!1?B=He.get(S).__webglMultisampledFramebuffer:Array.isArray(Ie)?B=Ie[G]:B=Ie,w.copy(S.viewport),k.copy(S.scissor),N=S.scissorTest}else w.copy(j).multiplyScalar(X).floor(),k.copy(J).multiplyScalar(X).floor(),N=Q;if(ge.bindFramebuffer(O.FRAMEBUFFER,B)&&Le.drawBuffers&&H&&ge.drawBuffers(S,B),ge.viewport(w),ge.scissor(k),ge.setScissorTest(N),ue){const Pe=He.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,Pe.__webglTexture,G)}else if(ve){const Pe=He.get(S.texture),Ve=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Pe.__webglTexture,G||0,Ve)}$=-1},this.readRenderTargetPixels=function(S,U,G,H,B,ue,ve){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=He.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we){ge.bindFramebuffer(O.FRAMEBUFFER,we);try{const Pe=S.texture,Ve=Pe.format,Ie=Pe.type;if(Ve!==rn&&me.convert(Ve)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Oe=Ie===Xi&&(ye.has("EXT_color_buffer_half_float")||Le.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Ie!==Un&&me.convert(Ie)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ie===Dn&&(Le.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-H&&G>=0&&G<=S.height-B&&O.readPixels(U,G,H,B,me.convert(Ve),me.convert(Ie),ue)}finally{const Pe=R!==null?He.get(R).__webglFramebuffer:null;ge.bindFramebuffer(O.FRAMEBUFFER,Pe)}}},this.copyFramebufferToTexture=function(S,U,G=0){const H=Math.pow(2,-G),B=Math.floor(U.image.width*H),ue=Math.floor(U.image.height*H);E.setTexture2D(U,0),O.copyTexSubImage2D(O.TEXTURE_2D,G,0,0,S.x,S.y,B,ue),ge.unbindTexture()},this.copyTextureToTexture=function(S,U,G,H=0){const B=U.image.width,ue=U.image.height,ve=me.convert(G.format),we=me.convert(G.type);E.setTexture2D(G,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment),U.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,H,S.x,S.y,B,ue,ve,we,U.image.data):U.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,H,S.x,S.y,U.mipmaps[0].width,U.mipmaps[0].height,ve,U.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,H,S.x,S.y,ve,we,U.image),H===0&&G.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(S,U,G,H,B=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ue=S.max.x-S.min.x+1,ve=S.max.y-S.min.y+1,we=S.max.z-S.min.z+1,Pe=me.convert(H.format),Ve=me.convert(H.type);let Ie;if(H.isData3DTexture)E.setTexture3D(H,0),Ie=O.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)E.setTexture2DArray(H,0),Ie=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment);const Oe=O.getParameter(O.UNPACK_ROW_LENGTH),ct=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ht=O.getParameter(O.UNPACK_SKIP_PIXELS),_t=O.getParameter(O.UNPACK_SKIP_ROWS),fn=O.getParameter(O.UNPACK_SKIP_IMAGES),st=G.isCompressedTexture?G.mipmaps[B]:G.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,st.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,st.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,S.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,S.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,S.min.z),G.isDataTexture||G.isData3DTexture?O.texSubImage3D(Ie,B,U.x,U.y,U.z,ue,ve,we,Pe,Ve,st.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Ie,B,U.x,U.y,U.z,ue,ve,we,Pe,st.data)):O.texSubImage3D(Ie,B,U.x,U.y,U.z,ue,ve,we,Pe,Ve,st),O.pixelStorei(O.UNPACK_ROW_LENGTH,Oe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ct),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ht),O.pixelStorei(O.UNPACK_SKIP_ROWS,_t),O.pixelStorei(O.UNPACK_SKIP_IMAGES,fn),B===0&&H.generateMipmaps&&O.generateMipmap(Ie),ge.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),ge.unbindTexture()},this.resetState=function(){D=0,A=0,R=null,ge.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ra?"display-p3":"srgb",t.unpackColorSpace=Qe.workingColorSpace===zr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===yt?Jn:yl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Jn?yt:Sn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class xm extends Vl{}xm.prototype.isWebGL1Renderer=!0;class la{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ne(e),this.density=t}clone(){return new la(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ca{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=i}clone(){return new ca(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Mm extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Ct extends dn{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],f=[],u=[],g=[];let v=0;const _=[],m=i/2;let d=0;T(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Pt(f,3)),this.setAttribute("normal",new Pt(u,3)),this.setAttribute("uv",new Pt(g,2));function T(){const b=new L,D=new L;let A=0;const R=(t-e)/i;for(let $=0;$<=s;$++){const M=[],w=$/s,k=w*(t-e)+e;for(let N=0;N<=r;N++){const K=N/r,P=K*l+o,I=Math.sin(P),F=Math.cos(P);D.x=k*I,D.y=-w*i+m,D.z=k*F,f.push(D.x,D.y,D.z),b.set(I,R,F).normalize(),u.push(b.x,b.y,b.z),g.push(K,1-w),M.push(v++)}_.push(M)}for(let $=0;$<r;$++)for(let M=0;M<s;M++){const w=_[M][$],k=_[M+1][$],N=_[M+1][$+1],K=_[M][$+1];h.push(w,k,K),h.push(k,N,K),A+=6}c.addGroup(d,A,0),d+=A}function y(b){const D=v,A=new je,R=new L;let $=0;const M=b===!0?e:t,w=b===!0?1:-1;for(let N=1;N<=r;N++)f.push(0,m*w,0),u.push(0,w,0),g.push(.5,.5),v++;const k=v;for(let N=0;N<=r;N++){const P=N/r*l+o,I=Math.cos(P),F=Math.sin(P);R.x=M*F,R.y=m*w,R.z=M*I,f.push(R.x,R.y,R.z),u.push(0,w,0),A.x=I*.5+.5,A.y=F*.5*w+.5,g.push(A.x,A.y),v++}for(let N=0;N<r;N++){const K=D+N,P=k+N;b===!0?h.push(P,P+1,K):h.push(P+1,P,K),$+=3}c.addGroup(d,$,b===!0?1:2),d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ct(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ji extends Ct{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ji(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yn extends dn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new L,u=new L,g=[],v=[],_=[],m=[];for(let d=0;d<=i;d++){const T=[],y=d/i;let b=0;d===0&&a===0?b=.5/t:d===i&&l===Math.PI&&(b=-.5/t);for(let D=0;D<=t;D++){const A=D/t;f.x=-e*Math.cos(r+A*s)*Math.sin(a+y*o),f.y=e*Math.cos(a+y*o),f.z=e*Math.sin(r+A*s)*Math.sin(a+y*o),v.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(A+b,1-y),T.push(c++)}h.push(T)}for(let d=0;d<i;d++)for(let T=0;T<t;T++){const y=h[d][T+1],b=h[d][T],D=h[d+1][T],A=h[d+1][T+1];(d!==0||a>0)&&g.push(y,b,A),(d!==i-1||l<Math.PI)&&g.push(b,D,A)}this.setIndex(g),this.setAttribute("position",new Pt(v,3)),this.setAttribute("normal",new Pt(_,3)),this.setAttribute("uv",new Pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ha extends dn{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],l=[],c=[],h=new L,f=new L,u=new L;for(let g=0;g<=i;g++)for(let v=0;v<=r;v++){const _=v/r*s,m=g/i*Math.PI*2;f.x=(e+t*Math.cos(m))*Math.cos(_),f.y=(e+t*Math.cos(m))*Math.sin(_),f.z=t*Math.sin(m),o.push(f.x,f.y,f.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),u.subVectors(f,h).normalize(),l.push(u.x,u.y,u.z),c.push(v/r),c.push(g/i)}for(let g=1;g<=i;g++)for(let v=1;v<=r;v++){const _=(r+1)*g+v-1,m=(r+1)*(g-1)+v-1,d=(r+1)*(g-1)+v,T=(r+1)*g+v;a.push(_,m,T),a.push(m,d,T)}this.setIndex(a),this.setAttribute("position",new Pt(o,3)),this.setAttribute("normal",new Pt(l,3)),this.setAttribute("uv",new Pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ha(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Vo extends Di{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ne(16777215),this.specular=new Ne(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ia,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Or,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Te extends Di{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ia,this.normalScale=new je(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Or,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wl extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const bs=new ft,Wo=new L,Xo=new L;class Sm{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new je(512,512),this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new aa,this._frameExtents=new je(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Wo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wo),Xo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xo),t.updateMatrixWorld(),bs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bs),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(bs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ym extends Sm{constructor(){super(new Fl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Em extends Wl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new ym}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Tm extends Wl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}let Mr;class wm{static getContext(){return Mr===void 0&&(Mr=new(window.AudioContext||window.webkitAudioContext)),Mr}static setContext(e){Mr=e}}class bm{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qo(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=qo();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function qo(){return(typeof performance>"u"?Date:performance).now()}const Vn=new L,Yo=new Pi,Am=new L,Wn=new L;class Rm extends Tt{constructor(){super(),this.type="AudioListener",this.context=wm.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new bm}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,i=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Vn,Yo,Am),Wn.set(0,0,-1).applyQuaternion(Yo),t.positionX){const r=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(Vn.x,r),t.positionY.linearRampToValueAtTime(Vn.y,r),t.positionZ.linearRampToValueAtTime(Vn.z,r),t.forwardX.linearRampToValueAtTime(Wn.x,r),t.forwardY.linearRampToValueAtTime(Wn.y,r),t.forwardZ.linearRampToValueAtTime(Wn.z,r),t.upX.linearRampToValueAtTime(i.x,r),t.upY.linearRampToValueAtTime(i.y,r),t.upZ.linearRampToValueAtTime(i.z,r)}else t.setPosition(Vn.x,Vn.y,Vn.z),t.setOrientation(Wn.x,Wn.y,Wn.z,i.x,i.y,i.z)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ta}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ta);const fe=new Mm;fe.background=new Ne(8900331);fe.fog=new ca(8900331,3e3,6e3);const Ke=new jt(75,window.innerWidth/window.innerHeight,.1,3e3),Cm=new Rm;Ke.add(Cm);const Fn=new Vl({antialias:!1,powerPreference:"high-performance"});Fn.setSize(window.innerWidth,window.innerHeight);Fn.shadowMap.enabled=!0;Fn.shadowMap.type=fc;const Pm=new Tm(16777215,.6);fe.add(Pm);const un=new Em(16777215,.8);un.position.set(500,1e3,500);un.castShadow=!0;un.shadow.mapSize.width=1024;un.shadow.mapSize.height=1024;un.shadow.camera.far=2e3;un.shadow.camera.left=-1e3;un.shadow.camera.right=1e3;un.shadow.camera.top=1e3;un.shadow.camera.bottom=-1e3;fe.add(un);const Xl={standard:{color:255,speed:250,scale:1,name:"Politibil",health:50},interceptor:{color:1118481,speed:300,scale:1,name:"Interceptor",health:40},swat:{color:3355443,speed:220,scale:1.5,name:"SWAT",health:150},military:{color:5597999,speed:350,scale:1.2,name:"Militær",health:300}},En={standard:{name:"Standard Bil",price:0,maxSpeed:80,acceleration:.3,handling:.05,health:100,color:16711680},sport:{name:"Sportsvogn",price:2500,maxSpeed:110,acceleration:.45,handling:.07,health:80,color:16776960},muscle:{name:"Muscle Car",price:8e3,maxSpeed:100,acceleration:.5,handling:.04,health:120,color:255},super:{name:"Superbil",price:25e3,maxSpeed:150,acceleration:.7,handling:.09,health:70,color:16711935},hyper:{name:"Hyperbil",price:75e3,maxSpeed:200,acceleration:1,handling:.12,health:150,color:65535},tank:{name:"Kampvogn",price:2e5,maxSpeed:60,acceleration:.2,handling:.08,health:500,color:3100495,type:"tank",reqRebirth:0},ufo:{name:"UFO Prototype",price:5e5,maxSpeed:300,acceleration:2,handling:.2,health:150,color:10066329,type:"ufo",reqRebirth:1}},lt={wheel:new Ct(5,5,8,16),coin:new Ct(5,5,2,8),carBody:new Ue(20,12,45),carRoof:new Ue(18,8,20),policeStripe:new Ue(20,2,45),policeLight:new Ue(8,3,8),tankBody:new Ue(26,14,50),militaryCamo:new Ue(18,5,40),militaryTurretBase:new Ct(6,8,5,8),militaryTurretBarrel:new Ct(1.5,1.5,20,8),projectile:new yn(3,8,8),spark:new Ue(1,1,3),speedParticle:new Ue(.5,.5,3),smoke:new Ue(3,3,3),tireMark:new Xt(3,8)},xt={wheel:new Te({color:0}),coin:new Te({color:16766720}),redLight:new ht({color:16711680}),blueLight:new ht({color:255}),projectile:new ht({color:16729088}),spark:new ht({color:16755200}),white:new Te({color:16777215}),camo:new Te({color:3885605}),darkGrey:new Te({color:2763306}),smoke:new ht({color:3355443,transparent:!0,opacity:.6}),fire:new ht({color:16729088,transparent:!0,opacity:.8}),speedParticle:new ht({color:16777215,transparent:!0,opacity:.6}),tireMark:new ht({color:1118481,transparent:!0,opacity:.7,side:Mt})};Object.values(Xl).forEach(n=>{n.bodyMaterial=new Te({color:n.color}),n.roofMaterial=new Te({color:n.color}),n.roofMaterial.color.multiplyScalar(.8)});const Vi={spark:[],smoke:[],fire:[],speed:[]};function kr(n,e,t){let i;return Vi[n]&&Vi[n].length>0?(i=Vi[n].pop(),i.visible=!0,i.scale.set(1,1,1),i.material.opacity!==void 0&&(i.material.opacity=1)):i=new re(e,t.clone()),i}function Ur(n,e){n.visible=!1,fe.remove(n),Vi[e]&&Vi[e].push(n)}function da(n){if(!W)return;const e=kr("spark",lt.spark,xt.spark);if(n)e.position.copy(n),e.position.y+=Math.random();else{const i=W.rotation.y,r=(Math.random()-.5)*15;e.position.set(W.position.x-Math.sin(i)*25+r,1+Math.random()*3,W.position.z-Math.cos(i)*25)}const t=W.rotation.y;e.userData={velocity:new L((Math.random()-.5)*2-Math.sin(t)*3,Math.random()*3+1,(Math.random()-.5)*2-Math.cos(t)*3),lifetime:500,spawnTime:Date.now(),type:"spark"},e.material.opacity=1,fe.add(e),p.sparks.push(e)}function Ft(n,e=1){if(p.sparks.length>300)return;const t=kr("smoke",lt.smoke,xt.smoke);t.position.copy(n),t.position.y+=(5+Math.random()*5)*e,t.scale.set(e,e,e),t.userData={velocity:new L((Math.random()-.5)*2*e,(Math.random()*3+2)*e,(Math.random()-.5)*2*e),lifetime:2e3*e,spawnTime:Date.now(),type:"smoke"},t.material.opacity=.6*e,fe.add(t),p.sparks.push(t)}function Dm(n){if(p.sparks.length>300)return;const e=kr("fire",lt.spark,xt.fire);e.position.copy(n),e.position.x+=(Math.random()-.5)*10,e.position.z+=(Math.random()-.5)*10,e.position.y+=8+Math.random()*5,e.scale.set(2+Math.random(),3+Math.random()*2,2+Math.random()),e.userData={velocity:new L((Math.random()-.5)*1,Math.random()*4+3,(Math.random()-.5)*1),lifetime:800,spawnTime:Date.now(),type:"fire"},e.material.opacity=.9,fe.add(e),p.sparks.push(e)}function Lm(){const n=Date.now();for(let e=p.sparks.length-1;e>=0;e--){const t=p.sparks[e],i=n-t.userData.spawnTime;if(i>t.userData.lifetime){const r=t.userData.type==="fire"?"fire":t.userData.type;Ur(t,r),p.sparks.splice(e,1);continue}if(t.position.add(t.userData.velocity),t.userData.type==="spark"){if(t.userData.velocity.y-=.15,t.position.y<0){Ur(t,"spark"),p.sparks.splice(e,1);continue}}else t.userData.type==="smoke"?(t.scale.multiplyScalar(1.02),t.userData.velocity.multiplyScalar(.95)):t.userData.type==="fire"&&(t.scale.multiplyScalar(1.03),t.userData.velocity.multiplyScalar(.92),t.material.opacity=(1-i/t.userData.lifetime)*.8*(.7+Math.random()*.3));t.userData.type!=="fire"&&(t.material.opacity=(1-i/t.userData.lifetime)*(t.userData.type==="smoke"?.6:1))}}function ql(n,e){if(!W||p.speedParticles.length>60)return;const t=kr("speed",lt.speedParticle,xt.speedParticle);if(e&&n)t.position.copy(n),t.rotation.y=Math.random()*Math.PI*2;else{const s=50+Math.random()*100,a=W.rotation.y+(Math.random()-.5)*1.5;t.position.set(W.position.x+Math.sin(a)*s+(Math.random()-.5)*150,5+Math.random()*40,W.position.z+Math.cos(a)*s+(Math.random()-.5)*150),t.rotation.y=W.rotation.y}const i=.7+Math.random()*.3;t.material.color.setRGB(i,i,i),t.material.opacity=.3+Math.random()*.4,t.userData={lifetime:800+Math.random()*400,spawnTime:Date.now()},fe.add(t),p.speedParticles.push(t)}function Im(n){if(!W)return;const e=Date.now(),t=Math.abs(p.speed)/p.maxSpeed;for(let i=p.speedParticles.length-1;i>=0;i--){const r=p.speedParticles[i],s=e-r.userData.spawnTime;if(s>r.userData.lifetime){Ur(r,"speed"),p.speedParticles.splice(i,1);continue}const a=(p.speed*1.5+20)*n;r.position.x-=Math.sin(W.rotation.y)*a,r.position.z-=Math.cos(W.rotation.y)*a,r.scale.z=1+t*4;const o=s/r.userData.lifetime;r.material.opacity=(1-o)*(.3+t*.5)}}function Um(n){if(!W)return;const e=Math.abs(p.speed)/p.maxSpeed,t=p.baseFOV+e*20;if(p.currentFOV+=(t-p.currentFOV)*.1,Math.abs(Ke.fov-p.currentFOV)>.01&&(Ke.fov=p.currentFOV,Ke.updateProjectionMatrix()),e>.8?p.screenShake=(e-.8)*5:p.screenShake*=.9,e>.7&&Math.random()<e*.3&&da(),p.sparks.length>30){const i=p.sparks.length-30;for(let r=0;r<i;r++){const s=p.sparks[r];if(!s)continue;const a=s.userData&&s.userData.type,o=a==="fire"?"fire":a;o==="spark"||o==="smoke"||o==="fire"?Ur(s,o):fe.remove(s)}p.sparks.splice(0,i)}if(e>.2){const i=Math.floor(e*3);for(let r=0;r<i;r++)Math.random()<.4&&ql()}Im(n)}const Nm=new Xt(3,8);new ht({color:1118481,transparent:!0,opacity:.5,side:Mt});const Hs=[];for(let n=0;n<20;n++)Hs.push(new ht({color:1118481,transparent:!0,opacity:.5,side:Mt}));let As=0;function Fm(n,e,t){const s=p.tireMarks.length+2-100;if(s>0){for(let h=0;h<s;h++){const f=p.tireMarks[h];f&&fe.remove(f)}p.tireMarks.splice(0,s)}const a=10,o=Math.cos(t),l=Math.sin(t),c=Date.now();for(let h=-1;h<=1;h+=2){const f=Hs[As];As=(As+1)%Hs.length,f.opacity=.5;const u=new re(Nm,f);u.rotation.x=-Math.PI/2,u.rotation.z=t,u.position.set(n+o*a*h,.12,e-l*a*h),u.userData={spawnTime:c,lifetime:5e3},fe.add(u),p.tireMarks.push(u)}}function Om(){const n=Date.now();for(let e=p.tireMarks.length-1;e>=0;e--){const t=p.tireMarks[e],i=n-t.userData.spawnTime;if(i>t.userData.lifetime){fe.remove(t),p.tireMarks.splice(e,1);continue}t.material.opacity=.5*(1-i/t.userData.lifetime)}}const $o=new L;let Nr={triggerDamageEffect:()=>{},updateHealthUI:()=>{}};function Bm(n){Nr={...Nr,...n}}let W;function Yl(n=16711680,e="standard"){const t=new zt;if(t.position.set(0,0,0),e==="tank"){const i=new Ue(26,14,50),r=new Te({color:n}),s=new re(i,r);s.position.y=7,s.castShadow=!0,s.receiveShadow=!0,s.name="carBody",t.add(s);const a=new Ue(16,8,20),o=new Ne(n).multiplyScalar(.8),l=new Te({color:o}),c=new re(a,l);c.position.set(0,18,0),c.castShadow=!0,c.receiveShadow=!0,c.name="carRoof",t.add(c);const h=new Ct(2,2,30,16),f=new Te({color:3355443}),u=new re(h,f);u.rotation.x=-Math.PI/2,u.position.set(0,18,20),u.castShadow=!0,t.add(u);const g=new Ue(6,12,48),v=new Te({color:1118481}),_=new re(g,v);_.position.set(-14,6,0),t.add(_);const m=new re(g,v);m.position.set(14,6,0),t.add(m)}else if(e==="ufo"){const i=new Ct(15,25,8,32),r=new Vo({color:n,shininess:100,emissive:2236962}),s=new re(i,r);s.position.y=10,s.castShadow=!0,s.name="carBody",t.add(s);const a=new yn(8,32,16,0,Math.PI*2,0,Math.PI/2),o=new Vo({color:8965375,transparent:!0,opacity:.8,shininess:150}),l=new re(a,o);l.position.y=12,t.add(l);const c=new yn(1,8,8),h=new ht({color:65280});for(let f=0;f<8;f++){const u=new re(c,h),g=f/8*Math.PI*2;u.position.set(Math.cos(g)*22,10,Math.sin(g)*22),t.add(u)}}else{const i=new re(lt.carBody,new Te({color:n}));i.position.y=6,i.castShadow=!0,i.receiveShadow=!0,i.name="carBody",t.add(i);const r=new Ne(n).multiplyScalar(.8),s=new re(lt.carRoof,new Te({color:r}));s.position.set(0,16,-5),s.castShadow=!0,s.receiveShadow=!0,s.name="carRoof",t.add(s);const a=new re(lt.window,xt.window);a.position.set(0,16,5),t.add(a);const o=new re(lt.window,xt.window);o.position.set(0,16,-12),t.add(o);const l=[[-12,5,12],[12,5,12],[-12,5,-12],[12,5,-12]];t.userData.wheels=[],l.forEach((c,h)=>{const f=new re(lt.wheel,xt.wheel);f.rotation.z=Math.PI/2,f.position.set(...c),f.userData.baseY=c[1],f.userData.wobbleOffset=h*Math.PI/2,t.userData.wheels.push(f),t.add(f)})}return fe.add(t),W=t,t}function ua(n=null){W&&fe.remove(W);const e=En[p.selectedCar],t=n!==null?n:e.color;Yl(t,e.type)}function zm(n){if(!W)return;const e=W.getObjectByName("carBody"),t=W.getObjectByName("carRoof");e&&e.material.color.setHex(n),t&&t.material.color.setHex(n).multiplyScalar(.8)}function jo(n){const e=En[n];p.maxSpeed=e.maxSpeed,p.acceleration=e.acceleration,p.handling=e.handling,zm(e.color)}function yi(n){p.arrested||(p.selectedCar==="tank"&&(n*=.2),p.selectedCar==="ufo"&&(n*=.5),p.health-=n,Nr.triggerDamageEffect(),Nr.updateHealthUI(),p.health<=0&&(p.health=0))}function Gm(n,e){if(!W||p.arrested)return;if(p.health<=0){p.speed*=.95,Math.abs(p.speed)<1&&(p.speed=0),W.position.x+=p.velocityX*n*.5,W.position.z+=p.velocityZ*n*.5,p.velocityX*=.95,p.velocityZ*=.95,Math.random()<.3&&Ft(W.position);return}let t=Math.max(0,p.health)/100;t=Math.min(1,t);const i=.2+.8*t;let r=p.maxSpeed*i;p.health>0&&r<10&&(r=10);const s=p.handling||.05,a=Math.abs(p.speed),o=a/p.maxSpeed;let l=0;if((en.a||en.arrowleft)&&(l=1),(en.d||en.arrowright)&&(l=-1),p.health<30&&p.health>0&&Math.random()<.05&&(l+=(Math.random()-.5)*1.5),en.w||en.arrowup){const A=1-o*.3;p.speed<r?p.speed=Math.min(p.speed+p.acceleration*A*n,r):p.speed*=Math.pow(.95,n)}(en.s||en.arrowdown)&&(p.speed>0?p.speed=Math.max(0,p.speed-p.acceleration*2*n):p.speed=Math.max(p.speed-p.acceleration*.5*n,-30));const c=en[" "];if(c){const A=a>30?.985:.97;p.speed*=Math.pow(A,n);const R=a>15?.2:.08;p.driftFactor=Math.min(p.driftFactor+R*n,.95)}else p.driftFactor=Math.max(p.driftFactor-.06*n,0);const h=Math.max(.25,1.4-o*1.1),f=.25+Math.min(a,50)/50,u=s*h*(1+p.driftFactor*.8),g=l*u*f;p.angularVelocity+=(g-p.angularVelocity)*.15*n,p.angularVelocity*=.92,W.rotation.y+=p.angularVelocity*n;const v=Math.sin(W.rotation.y),_=Math.cos(W.rotation.y),m=1-Math.min(.95,p.driftFactor+(c?.15:0));let d=v*p.speed,T=_*p.speed;if(p.driftFactor>.1&&a>10){const A=Math.cos(W.rotation.y),R=-Math.sin(W.rotation.y),$=p.driftFactor*l*a*.35;d+=A*$,T+=R*$,c&&Math.random()<.25&&($o.set(W.position.x-v*12,W.position.y+2,W.position.z-_*12),Ft($o,.6))}p.velocityX+=(d-p.velocityX)*(.1+m*.15)*n,p.velocityZ+=(T-p.velocityZ)*(.1+m*.15)*n,p.speed*=Math.pow(p.friction,n),p.velocityX*=Math.pow(.98,n),p.velocityZ*=Math.pow(.98,n);const y=p.slowEffect>0?1-p.slowEffect:1;p.health<30&&Math.random()<.1&&Ft(W.position),p.health<=0&&Math.random()<.3&&(Ft(W.position),Math.random()<.1&&da()),W.position.x+=p.velocityX*n*y,W.position.z+=p.velocityZ*n*y,p.wheelAngle=l*.4;const b=-p.angularVelocity*o*.3;p.carTilt+=(b-p.carTilt)*.1*n,W.rotation.z=p.carTilt,p.driftFactor>.2&&a>10&&Fm(W.position.x,W.position.z,W.rotation.y),Om(),W.userData.wheels&&W.userData.wheels.forEach(A=>{const R=Math.sin(e*.05+A.userData.wobbleOffset)*.3,$=a>30?(Math.random()-.5)*(a/100):0;A.position.y=A.userData.baseY+R+$});const D=4e3;W.position.x=Math.max(-D,Math.min(D,W.position.x)),W.position.z=Math.max(-D,Math.min(D,W.position.z))}function fa(n=65280,e="standard"){const t=new zt;if(e==="tank"){const i=new Ue(26,14,50),r=new Te({color:n}),s=new re(i,r);s.position.y=7,s.castShadow=!0,s.receiveShadow=!0,t.add(s);const a=new Ue(16,8,20),o=new Te({color:new Ne(n).multiplyScalar(.8)}),l=new re(a,o);l.position.set(0,18,0),l.castShadow=!0,t.add(l);const c=new Ct(2,2,30,16),h=new Te({color:3355443}),f=new re(c,h);f.rotation.x=-Math.PI/2,f.position.set(0,18,20),f.castShadow=!0,t.add(f);const u=new Ue(6,12,48),g=new Te({color:1118481}),v=new re(u,g);v.position.set(-14,6,0),t.add(v);const _=new re(u,g);_.position.set(14,6,0),t.add(_)}else if(e==="ufo"){const i=new Ct(18,22,8,32),r=new Te({color:n}),s=new re(i,r);s.position.y=15,s.castShadow=!0,t.add(s);const a=new yn(10,32,16,0,Math.PI*2,0,Math.PI/2),o=new Te({color:8965375,transparent:!0,opacity:.7}),l=new re(a,o);l.position.y=19,t.add(l);const c=new ha(20,1.5,8,16),h=new ht({color:65535}),f=new re(c,h);f.rotation.x=Math.PI/2,f.position.y=15,t.add(f)}else{const i=lt.carBody||new Ue(20,8,40),r=new Te({color:n}),s=new re(i,r);s.position.y=6,s.castShadow=!0,s.receiveShadow=!0,t.add(s);const a=lt.carRoof||new Ue(16,6,20),o=new Te({color:new Ne(n).multiplyScalar(.8)}),l=new re(a,o);l.position.set(0,13,-2),l.castShadow=!0,t.add(l);const c=lt.wheel||new Ct(4,4,3,16),h=xt.wheel||new Te({color:1118481});[{x:-10,y:4,z:12},{x:10,y:4,z:12},{x:-10,y:4,z:-12},{x:10,y:4,z:-12}].forEach(u=>{const g=new re(c,h);g.rotation.z=Math.PI/2,g.position.set(u.x,u.y,u.z),g.castShadow=!0,t.add(g)})}return fe.add(t),t}function Hm(n,e){if(!n||!e)return;const t=.3;n.position.x+=(e.x-n.position.x)*t,n.position.z+=(e.z-n.position.z)*t;let i=e.rotY!==void 0?e.rotY:e.rotation,r=n.rotation.y,s=i-r;s>Math.PI&&(s-=Math.PI*2),s<-Math.PI&&(s+=Math.PI*2),n.rotation.y+=s*t}function km(n){n&&fe.remove(n)}function Vm(n,e){const t=parseInt(n.replace("#",""),16),i=Math.round(2.55*e),r=Math.max(0,(t>>16)-i),s=Math.max(0,(t>>8&255)-i),a=Math.max(0,(t&255)-i);return"#"+(16777216+r*65536+s*256+a).toString(16).slice(1)}function Wm(n){for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n}function $l(n,e,t){return Math.max(e,Math.min(t,n))}let ks=null,Ko=!1,ln=null,zi=null;function Xm(n){ks=n}const oe={speed:document.getElementById("speed"),speedFill:document.getElementById("speedFill"),time:document.getElementById("time"),heatLevel:document.getElementById("heatLevel"),policeCount:document.getElementById("policeCount"),deadPoliceCount:document.getElementById("deadPoliceCount"),money:document.getElementById("money"),policeDistance:document.getElementById("policeDistance"),status:document.getElementById("status"),gameOver:document.getElementById("gameOver"),gameOverMessage:document.getElementById("gameOverMessage"),gameOverTime:document.getElementById("gameOverTime"),gameOverMoney:document.getElementById("gameOverMoney"),gameOverPoliceKilled:document.getElementById("gameOverPoliceKilled"),gameOverMaxHeat:document.getElementById("gameOverMaxHeat"),shop:document.getElementById("shop"),shopMoney:document.getElementById("shopMoney"),carList:document.getElementById("carList"),driftIndicator:document.getElementById("driftIndicator"),healthValue:document.getElementById("healthValue"),healthFill:document.getElementById("healthFill"),playBtn:document.getElementById("playBtn"),gameOverShopBtn:document.getElementById("gameOverShopBtn")};function qm(n){const e=Math.round(p.speed*3.6);oe.speed.textContent=e,oe.speedFill.style.width=$l(p.speed/p.maxSpeed*100,0,100)+"%",p.speed>p.maxSpeedWarning?oe.speedFill.style.background="linear-gradient(to right, #ffff00, #ff0000)":oe.speedFill.style.background="linear-gradient(to right, #00ff00, #ffff00, #ff0000)",p.driftFactor>.3?(oe.driftIndicator.style.display="block",oe.driftIndicator.style.opacity=Math.min(1,p.driftFactor*1.5)):oe.driftIndicator.style.display="none";const t=Date.now();let i;p.arrested&&p.elapsedTime?i=Math.floor(p.elapsedTime):i=Math.floor((t-p.startTime)/1e3),oe.time.textContent=i,oe.heatLevel.textContent=p.heatLevel;let r=0;for(let o=0;o<p.policeCars.length;o++)p.policeCars[o].userData.dead&&r++;const s=p.policeCars.length-r;oe.policeCount.textContent=s,oe.deadPoliceCount.textContent=r;const a=["#00ff00","#99ff00","#ffff00","#ff8800","#ff4400","#ff0000"][p.heatLevel-1]||"#ff0000";if(oe.heatLevel.style.color=a,p.elapsedTime=i,i>0&&i%ut.passiveIncomeInterval===0&&t-p.lastMoneyCheckTime>500){const o=(p.rebirthPoints||0)+1;Cn(ut.passiveIncomeBase*p.heatLevel*o),p.lastMoneyCheckTime=t}oe.money.textContent=p.money,n>0&&(oe.policeDistance.textContent=Math.round(n),p.arrestCountdown>0?(oe.status.textContent=`ANHOLDELSE: ${Math.ceil(p.arrestCountdown)}`,oe.status.style.color="#ff0000",oe.status.style.fontSize="24px",oe.status.style.animation="pulse 0.5s infinite"):n<p.arrestDistance+100?(oe.status.textContent="I FARE!",oe.status.style.color="#ff0000",oe.status.style.fontSize="",oe.status.style.animation=""):(oe.status.textContent="Fri",oe.status.style.color="#00ff00",oe.status.style.fontSize="",oe.status.style.animation=""))}function Cn(n){n<=0||p.arrested||Math.abs(p.speed)/p.maxSpeed<.05||(p.money+=n,oe.money.parentElement.classList.remove("hud-money-pop"),oe.money.parentElement.offsetWidth,oe.money.parentElement.classList.add("hud-money-pop"))}function Zo(n){p.policeCars.forEach(o=>fe.remove(o)),p.policeCars=[],p.collectibles.forEach(o=>fe.remove(o)),p.collectibles=[],p.projectiles.forEach(o=>fe.remove(o)),p.projectiles=[],oe.gameOverMessage.textContent="Du blev fanget af politiet og sat i fængsel!",oe.gameOver.style.display="block";const e=document.getElementById("gameOverRejoinBtn");e&&(e.style.display=p.isMultiplayer?"inline-block":"none");const t=document.getElementById("gameOverMpShopBtn");t&&(t.style.display=p.isMultiplayer?"inline-block":"none");const i=Math.round(p.elapsedTime),r=p.money,s=p.policeKilled||0,a=p.heatLevel;oe.gameOverTime.textContent="0",oe.gameOverMoney.textContent="0",oe.gameOverPoliceKilled.textContent="0",oe.gameOverMaxHeat.textContent="1",setTimeout(()=>Sr(oe.gameOverTime,i,600),200),setTimeout(()=>Sr(oe.gameOverMoney,r,800),400),setTimeout(()=>Sr(oe.gameOverPoliceKilled,s,500),600),setTimeout(()=>Sr(oe.gameOverMaxHeat,a,300),800)}function Sr(n,e,t){const i=parseInt(n.textContent)||0,r=performance.now();function s(a){const o=a-r,l=Math.min(o/t,1),c=1-Math.pow(1-l,3),h=Math.round(i+(e-i)*c);n.textContent=h,l<1&&requestAnimationFrame(s)}requestAnimationFrame(s)}let Tr=!1,Gi=null;function Ym(n){Gi=n}function pa(n=!1){Tr=n,p.totalMoney+=p.money,oe.shop.style.display="flex";const e=document.getElementById("respawnNotice");e&&(e.style.display=n?"block":"none"),oe.playBtn&&(n||p.isMultiplayer?oe.playBtn.textContent="🚀 SPAWN":oe.playBtn.textContent="🚀 KØR NU"),$m(),Fr()}let Hi="all";function jl(n,e){return e.type==="tank"||e.type==="ufo"||e.reqRebirth?"special":e.price>=5e4?"premium":e.price>=5e3?"sport":e.price<5e3?"budget":"all"}function $m(){if(Ko)return;Ko=!0;const n=document.querySelectorAll(".shop-tab");n.forEach(e=>{e.addEventListener("click",()=>{n.forEach(t=>t.classList.remove("active")),e.classList.add("active"),Hi=e.dataset.category,Fr()})})}function jm(){let n={all:0,budget:0,sport:0,premium:0,special:0};Object.entries(En).forEach(([e,t])=>{if(t.reqRebirth&&(p.rebirthPoints||0)<t.reqRebirth)return;n.all++;const i=jl(e,t);n[i]!==void 0&&n[i]++}),Object.entries(n).forEach(([e,t])=>{const i=document.getElementById(`tabCount${e.charAt(0).toUpperCase()+e.slice(1)}`);i&&(i.textContent=t)})}function Fr(){if(oe.shopMoney.textContent=p.totalMoney.toLocaleString(),oe.carList.innerHTML="",jm(),(Hi==="all"||Hi==="special")&&p.heatLevel>=6&&p.totalMoney>=2e5&&(p.rebirthPoints||0)<5){const n=document.createElement("div");n.className="carCard",n.style.background="linear-gradient(135deg, rgba(255,0,255,0.2) 0%, rgba(0,255,255,0.2) 100%)",n.style.borderColor="rgba(255,0,255,0.5)",n.innerHTML=`
                <div class="car-preview-box" style="background: linear-gradient(135deg, #1a0a1a 0%, #0a1a1a 100%);">
                    <div style="font-size: 48px; animation: pulse 2s infinite;">✨</div>
                </div>
                <div class="card-content">
                    <h3>REBIRTH SYSTEM <span class="car-type-badge special">PRESTIGE</span></h3>
                    <div class="stats-container" style="text-align: center; color: #aaa;">
                        <p style="margin: 5px 0;">🔥 Kræver: Heat 6 + 200.000 kr</p>
                        <p style="margin: 5px 0;">🎁 Belønning: Special biler + 2x Penge</p>
                        <p style="margin: 5px 0; color: #ff00ff;">Rebirth Points: ${p.rebirthPoints||0}/5</p>
                    </div>
                </div>
                <div class="card-footer">
                    <span class="price-tag" style="color: #ff00ff;">200.000 kr</span>
                    <span class="action-indicator" style="background: linear-gradient(135deg, #ff00ff, #00ffff); color: #000;">REBIRTH NU</span>
                </div>
            `,n.addEventListener("click",()=>{confirm("Er du sikker? Dette nulstiller dine biler og penge, men låser op for nyt indhold!")&&Km()}),oe.carList.appendChild(n)}Object.entries(En).forEach(([n,e])=>{if(e.reqRebirth&&(p.rebirthPoints||0)<e.reqRebirth)return;const t=jl(n,e);if(Hi!=="all"&&t!==Hi)return;const i=p.ownedCars&&p.ownedCars[n]||n==="standard",r=p.selectedCar===n,s=p.totalMoney>=e.price;if(Tr&&!i)return;const a=document.createElement("div");let o=["carCard"];i&&o.push("owned"),r&&o.push("selected"),i||(s?o.push("affordable"):o.push("expensive")),a.className=o.join(" ");const l=Math.min(e.maxSpeed/200*100,100),c=Math.min(e.acceleration/1.5*100,100),h=Math.min(e.handling/.2*100,100),f=Math.min((e.health||100)/500*100,100),u="#"+e.color.toString(16).padStart(6,"0"),g=Vm(u,40);let v="",_="";r?(v="VALGT",_="✓"):i?(v="VÆLG",_="→"):s?(v="KØB",_="🛒"):(v="LÅST",_="🔒");let m="";t==="special"?m=`<span class="car-type-badge ${t==="special"?"special":""}">SPECIAL</span>`:t==="premium"?m='<span class="car-type-badge">PREMIUM</span>':t==="sport"&&(m='<span class="car-type-badge">SPORT</span>'),a.innerHTML=`
            <div class="car-preview-box">
                <div class="floor-grid"></div>
                <div class="car-model-3d">
                    <div class="car-body" style="background: linear-gradient(135deg, ${u} 0%, ${g} 100%);">
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
                <h3>${e.name} ${m}</h3>
                
                <div class="stats-container">
                    <div class="stat-row">
                        <span class="stat-icon">⚡</span>
                        <span class="stat-label">Fart</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill speed" style="width: ${l}%"></div></div>
                        <span class="stat-value">${Math.round(e.maxSpeed*3.6)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">🚀</span>
                        <span class="stat-label">Acc</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill accel" style="width: ${c}%"></div></div>
                        <span class="stat-value">${(e.acceleration*10).toFixed(1)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">🎯</span>
                        <span class="stat-label">Styr</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill handle" style="width: ${h}%"></div></div>
                        <span class="stat-value">${(e.handling*100).toFixed(0)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-icon">❤️</span>
                        <span class="stat-label">HP</span>
                        <div class="stat-bar-bg"><div class="stat-bar-fill health" style="width: ${f}%"></div></div>
                        <span class="stat-value">${e.health||100}</span>
                    </div>
                </div>
            </div>

            <div class="card-footer">
                <span class="price-tag">${e.price>0?e.price.toLocaleString()+" kr":"GRATIS"}</span>
                <span class="action-indicator">${_} ${v}</span>
            </div>
        `,a.addEventListener("click",()=>{i?(p.selectedCar=n,jo(n),Fr(),Tr&&Gi&&Gi(n)):s&&confirm(`Køb ${e.name} for ${e.price.toLocaleString()} kr?`)&&(p.totalMoney-=e.price,p.ownedCars||(p.ownedCars={}),p.ownedCars[n]=!0,p.selectedCar=n,jo(n),Fr(),Tr&&Gi&&Gi(n))}),oe.carList.appendChild(a)})}function Km(){p.rebirthPoints=(p.rebirthPoints||0)+1,p.totalMoney=0,p.money=0,p.ownedCars={standard:!0},p.selectedCar="standard",ks&&ks(),p.rebirthPoints>0&&(fe.fog=new la(1114163,.002),Fn.setClearColor(1114163),alert(`REBIRTH SUCCESSFUL! Count: ${p.rebirthPoints}
New Cars Unlocked!
Money gained is doubled!`))}function Vr(){oe.healthValue&&(oe.healthValue.textContent=Math.ceil(p.health)),oe.healthFill&&(oe.healthFill.style.width=Math.max(0,p.health)+"%",oe.healthFill.style.background=p.health<30?"#ff0000":p.health<60?"#ffa500":"#00ff00")}function Zm(){oe.status&&(oe.status.style.color="red",setTimeout(()=>{!p.arrested&&oe.status.textContent!=="I FARE!"?oe.status.style.color="#00ff00":oe.status.textContent==="I FARE!"&&(oe.status.style.color="#ff0000")},200)),Jm()}function Jm(){ln||(ln=document.createElement("div"),ln.style.cssText=`
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(255, 0, 0, 0.4);
            pointer-events: none;
            z-index: 1000;
            display: none;
        `,document.body.appendChild(ln)),zi&&(clearTimeout(zi),zi=null),ln.style.display="block",ln.style.animation="none",ln.offsetWidth,ln.style.animation="flashFade 0.3s ease-out forwards",zi=setTimeout(()=>{ln&&(ln.style.display="none"),zi=null},300)}if(!document.getElementById("damageFlashStyle")){const n=document.createElement("style");n.id="damageFlashStyle",n.textContent=`
        @keyframes flashFade {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `,document.head.appendChild(n)}let Et=null,an=!1,qi=!1,wr=null,br=new Map;const Qm="SPIL";let Xn=[],Kl=null,e0=null,Vs=null,Ws=null,Xs=null,qs=null,Ys=null,$s=null,js=null,Ks=null,Zs=null,Js=null;async function t0(n=null){Xn=[];const e=window.location.hostname;if(e==="localhost"||e==="127.0.0.1"){const l=await Rs("localhost");return l&&Xn.push(l),Xn}const t=e.split(".");if(t.length!==4)return Xn;const i=`${t[0]}.${t[1]}.${t[2]}`,r=await Rs(e);r&&Xn.push(r);const s=[],a=[1,2,100,101,102,103,104,105,50,51,52];for(const l of a){const c=`${i}.${l}`;c!==e&&s.push(Rs(c))}return n&&n(0,a.length),(await Promise.all(s)).forEach(l=>{l&&Xn.push(l)}),n&&n(a.length,a.length),Xn}async function Rs(n){try{const e=new AbortController,t=setTimeout(()=>e.abort(),500),i=await fetch(`http://${n}:3000/api/discover`,{signal:e.signal});if(clearTimeout(t),i.ok){const r=await i.json();return{ip:n,...r}}}catch{}return null}function n0(n){Kl=n}function i0(){const n=window.location.protocol==="https:"?"wss:":"ws:",e=Kl||window.location.hostname;return`${n}//${e}:3001`}function r0(){return new Promise((n,e)=>{try{Et=new WebSocket(i0()),Et.onopen=()=>{an=!0,console.log("Connected to multiplayer server"),n()},Et.onclose=()=>{an=!1,console.log("Disconnected from server")},Et.onerror=t=>{console.error("WebSocket error:",t),e(t)},Et.onmessage=t=>{try{const i=JSON.parse(t.data);s0(i)}catch(i){console.error("Message parse error:",i)}}}catch(t){e(t)}})}function s0(n){switch(n.type){case"joined":qi=n.isHost||!1,wr=n.playerId,n.roomCode,Vs&&Vs(n.roomCode,n.playerId,n.players,n.isHost);break;case"playerJoined":Ws&&Ws(n.player,n.players,n.dropIn);break;case"playerLeft":br.delete(n.playerId),Xs&&Xs(n.playerId,n.playerName);break;case"hostChanged":n.newHostId===wr&&(qi=!0,console.log("You are now the host!")),Js&&Js(n.newHostId,n.newHostName);break;case"gameStart":qs&&qs(n.players,n.config,n.dropIn);break;case"gameReset":break;case"playerState":n.playerId!==wr&&(br.set(n.playerId,{...br.get(n.playerId),state:n.state}),Ys&&Ys(n.playerId,n.state));break;case"policeState":$s&&$s(n.police);break;case"gameEvent":js&&js(n.playerId,n.event,n.data);break;case"chat":break;case"error":console.error("Server error:",n.message),Ks&&Ks(n.message);break;case"respawned":Zs&&Zs(n.spawnPos,n.car,n.resetHeat);break}}function a0(n,e="standard",t=null){an&&Et.send(JSON.stringify({type:"join",roomCode:t||Qm,playerName:n,car:e}))}function o0(n={}){!an||!qi||Et.send(JSON.stringify({type:"startGame",config:n}))}let Jo=0;const l0=50;function c0(n){if(!an)return;const e=performance.now();e-Jo<l0||(Jo=e,Et.send(JSON.stringify({type:"playerState",state:n})))}let Qo=0;const h0=100;function d0(n){if(!an||!qi)return;const e=performance.now();e-Qo<h0||(Qo=e,Et.send(JSON.stringify({type:"policeState",police:n})))}function el(n,e){an&&Et.send(JSON.stringify({type:"gameEvent",event:n,data:e}))}function u0(){an&&Et.send(JSON.stringify({type:"respawn"}))}function Zl(n){an&&Et.send(JSON.stringify({type:"respawn",car:n}))}function f0(n){Vs=n}function p0(n){Ws=n}function m0(n){Xs=n}function g0(n){qs=n}function _0(n){Ys=n}function v0(n){$s=n}function x0(n){js=n}function M0(n){Ks=n}function S0(n){Zs=n}function y0(n){Js=n}function E0(){return an&&Et&&Et.readyState===1}function Ei(){Et&&(Et.close(),Et=null),an=!1,qi=!1,wr=null,br.clear()}const Jl=new yn(2,8,8);function Ql(n="standard"){const e=Xl[n],t=new zt;t.position.set(0,0,-500),t.scale.set(e.scale,e.scale,e.scale),t.userData={type:n,speed:e.speed,health:e.health,maxHealth:e.health};const i=e.bodyMaterial||new Te({color:e.color}),r=new re(lt.carBody,i);if(r.position.y=6,r.castShadow=!0,t.add(r),n==="standard"||n==="interceptor"){const h=new re(lt.policeStripe,xt.white);h.position.set(0,12.5,0),t.add(h)}else if(n==="military"){const h=new re(lt.militaryCamo,xt.camo);h.position.set(0,8,0),t.add(h);const f=new re(lt.militaryTurretBase,xt.camo);f.position.set(0,15,-5),t.add(f);const u=new re(lt.militaryTurretBarrel,xt.darkGrey);u.rotation.x=Math.PI/2,u.position.set(0,17,10),u.name="turretBarrel",t.add(u),t.userData.lastShotTime=0,t.userData.fireRate=2e3}const s=e.roofMaterial||new Te({color:e.color}),a=new re(lt.carRoof,s);a.position.set(0,16,-5),a.castShadow=!0,t.add(a);const o=new re(lt.policeLight,xt.redLight);o.position.set(-4,20,-8),t.add(o);const l=new re(lt.policeLight,xt.blueLight);if(l.position.set(4,20,-8),t.add(l),[[-12,5,12],[12,5,12],[-12,5,-12],[12,5,-12]].forEach(h=>{const f=new re(lt.wheel,xt.wheel);f.rotation.z=Math.PI/2,f.position.set(...h),t.add(f)}),e.health){const h=new re(new Xt(14,2),new ht({color:0,side:Mt}));h.position.set(0,25,0),h.name="hpBg",t.add(h);const f=new re(new Xt(13.6,1.6),new ht({color:65280,side:Mt}));f.position.set(0,25,.1),f.name="hpBar",t.add(f)}return fe.add(t),t}let ec=1;function T0(){ec=1,console.log("[POLICE] Network IDs reset")}function Wr(){if(!W)return;let n="standard";const e=Math.random();p.heatLevel>=2&&e>.6&&(n="interceptor"),p.heatLevel>=3&&e>.7&&(n="swat"),p.heatLevel>=4&&e>.8&&(n="military");const t=Ql(n);t.userData.networkId=ec++;const i=3500;let r,s;do r=(Math.random()-.5)*i*2,s=(Math.random()-.5)*i*2;while(Math.abs(r-W.position.x)<300&&Math.abs(s-W.position.z)<300);return t.position.x=r,t.position.z=s,p.policeCars.push(t),p.isMultiplayer&&console.log(`[POLICE] Spawned police #${t.userData.networkId} (${n}) at (${Math.round(r)}, ${Math.round(s)}). Total: ${p.policeCars.length}`),t}function w0(n){if(!W)return 1e4;let e=1e4;if(p.policeCars.forEach((a,o)=>{if(a.userData.dead){if(a.userData.speed*=Math.pow(.9,n||1),a.userData.speed>1){const I=a.userData.speed*.016*(n||1);a.position.x+=Math.sin(a.rotation.y)*I,a.position.z+=Math.cos(a.rotation.y)*I}else a.userData.speed=0;if(W){const I=W.position.x-a.position.x,F=W.position.z-a.position.z,X=Math.sqrt(I*I+F*F),q=25;if(X<q){const Y=q-X,j=X>0?I/X:1,J=X>0?F/X:0;W.position.x+=j*Y*.8,W.position.z+=J*Y*.8;const Q=Date.now();if(Q-(a.userData.lastDeadCollision||0)>500){a.userData.lastDeadCollision=Q;const V=Math.abs(p.speed)*3.6;if(V>20){const Z=Math.max(ut.minCrashDamage,V*ut.playerCrashDamageMultiplier*.5);yi(Z),p.speed*=.5,p.screenShake=.2,Ft(a.position)}}}}const N=Date.now(),K=N-a.userData.deathTime,P=a.userData.lastParticleTime||0;N-P>100&&(a.userData.lastParticleTime=N,Math.random()<.4&&Ft(a.position),K>2e3&&Math.random()<.3&&Dm(a.position));return}for(let N=o+1;N<p.policeCars.length;N++){const K=p.policeCars[N],P=a.position.x-K.position.x,I=a.position.z-K.position.z,F=P*P+I*I,X=30,q=50;if(F<X*X){const Y=Math.sqrt(F),j=(X-Y)*.5,J=Y>0?P/Y:1,Q=Y>0?I/Y:0;K.userData.dead?(a.position.x+=J*j*1.5,a.position.z+=Q*j*1.5,K.position.x-=J*j*.1,K.position.z-=Q*j*.1):(a.position.x+=J*j,a.position.z+=Q*j,K.position.x-=J*j,K.position.z-=Q*j);const V=Math.abs(a.userData.speed||0)+Math.abs(K.userData.speed||0),Z=Date.now();if(Z-(a.userData.lastPoliceCollision||0)>500){a.userData.lastPoliceCollision=Z;const he=Math.max(ut.minCrashDamage,V*.05);a.userData.health-=he,K.userData.dead||(K.userData.lastPoliceCollision=Z,K.userData.health-=he,K.userData.health<=0&&(K.userData.dead=!0,K.userData.deathTime=Z,Cn(p.heatLevel*100),p.policeKilled=(p.policeKilled||0)+1)),Ft(a.position),p.screenShake=.15,a.userData.health<=0&&(a.userData.dead=!0,a.userData.deathTime=Z,Cn(p.heatLevel*100),p.policeKilled=(p.policeKilled||0)+1)}}else if(F<q*q&&!K.userData.dead){const Y=Math.sqrt(F),j=.3*(1-Y/q),J=P/Y,Q=I/Y;a.position.x+=J*j,a.position.z+=Q*j}}const l=W.position.x-a.position.x,c=W.position.z-a.position.z,h=Math.sqrt(l*l+c*c),f=En[p.selectedCar];if(f&&f.type==="tank"&&h<50){a.userData.dead=!0,a.userData.deathTime=Date.now(),Cn(p.heatLevel*100),p.policeKilled=(p.policeKilled||0)+1,Ft(a.position),p.screenShake=.5;return}const u=1+(p.heatLevel-1)*.3,g=Math.atan2(l,c),_=.06*u,m=Wm(g-a.rotation.y);a.rotation.y+=$l(m,-_,_)*(n||1);let d=(a.userData.speed||250)*(1+(u-1)*.5);const T=Math.abs(p.speed)*3.6,b=p.maxSpeed*3.6*.1;if(h<150&&T<b){const N=Math.max(.1,h/150);d*=N}p.heatLevel>=3&&h<100&&h>30&&(d*=1.3);const D=d*.016*(n||1);a.position.z+=Math.cos(a.rotation.y)*D,a.position.x+=Math.sin(a.rotation.y)*D;const A=p.chunkGridSize,R=Math.floor(a.position.x/A),$=Math.floor(a.position.z/A);for(let N=R-1;N<=R+1;N++)for(let K=$-1;K<=$+1;K++){const P=`${N},${K}`,I=p.chunkGrid[P];if(I)for(let F=0;F<I.length;F++){const X=I[F];if(X.userData.isHit)continue;const q=X.position.x-a.position.x,Y=X.position.z-a.position.z,j=Math.sqrt(q*q+Y*Y);if(j<30&&Math.abs(X.position.y-15)<X.userData.height){X.userData.isHit=!0,p.activeChunks.push(X);const J=a.rotation.y,Q=d*.01;X.userData.velocity.set(Math.sin(J)*Q+q/j*3,3+Math.random()*3,Math.cos(J)*Q+Y/j*3),X.userData.rotVelocity.set((Math.random()-.5)*.3,(Math.random()-.5)*.3,(Math.random()-.5)*.3),a.userData.health-=15,Ft(X.position),a.userData.health<=0&&(a.userData.dead=!0,a.userData.deathTime=Date.now())}}}const M=a.getObjectByName("hpBar"),w=a.getObjectByName("hpBg");if(M&&w){M.lookAt(Ke.position),w.lookAt(Ke.position);const N=Math.max(0,a.userData.health/a.userData.maxHealth);M.scale.x=N,M.material.color.setHSL(N*.3,1,.5)}if(a.userData.type==="military"){const N=Date.now();N-a.userData.lastShotTime>a.userData.fireRate&&h<800&&(b0(a),a.userData.lastShotTime=N)}const k=25;if(h<k&&!a.userData.dead){const N=k-h,K=l/h,P=c/h;W.position.x+=K*N*.6,W.position.z+=P*N*.6,a.position.x-=K*N*.4,a.position.z-=P*N*.4;const I=Date.now();if(I-(a.userData.lastCollisionDamage||0)>300){a.userData.lastCollisionDamage=I;const F=Math.abs(p.speed)*3.6,X=Math.max(ut.minCrashDamage,F*ut.playerCrashDamageMultiplier);yi(X);const q=Math.max(ut.minCrashDamage,F*ut.policeCrashDamageMultiplier);a.userData.health-=q,a.userData.health<=0&&(a.userData.dead=!0,a.userData.deathTime=I,Cn(p.heatLevel*100),p.policeKilled=(p.policeKilled||0)+1),Ft(W.position),p.screenShake=.2}}if(h<p.arrestDistance&&!p.arrested){const N=Math.abs(p.speed)*3.6,P=p.maxSpeed*3.6*.1;if(N>=P){const I=Date.now();if(I-(a.userData.lastHit||0)<500)return;a.userData.lastHit=I;const F=W.position.x-a.position.x,X=W.position.z-a.position.z,q=Math.sqrt(F*F+X*X),Y=q>0?F/q:1,j=q>0?X/q:0,J=Math.max(20,N*.5);p.speed*=-.4,p.velocityX+=Y*J,p.velocityZ+=j*J,a.position.x-=Y*15,a.position.z-=j*15,a.userData.health-=Math.max(5,N*.2),a.userData.health<=0&&(a.userData.dead=!0,a.userData.deathTime=Date.now(),Cn(p.heatLevel*100),p.policeKilled=(p.policeKilled||0)+1);const Q=Math.max(5,N*.3);yi(Q),p.screenShake=.3,Ft(W.position)}}e=Math.min(e,h)}),ut.touchArrest)return e<p.arrestDistance&&!p.arrested&&(p.arrested=!0,p.arrestCountdown=0,p.arrestStartTime=0,p.elapsedTime=(Date.now()-p.startTime)/1e3,p.isMultiplayer&&el("arrested",{time:p.elapsedTime}),Zo()),p.policeCars=p.policeCars.filter(a=>!a.userData.remove),e;const t=p.maxSpeed*3.6,i=Math.abs(p.speed)*3.6,r=t*ut.arrestSpeedThreshold,s=i<r;if(e<p.arrestDistance&&s&&!p.arrested){p.arrestStartTime===0&&(p.arrestStartTime=Date.now());const a=(Date.now()-p.arrestStartTime)/1e3;p.arrestCountdown=Math.max(0,ut.arrestCountdownTime-a),p.arrestCountdown<=0&&(p.arrested=!0,p.elapsedTime=(Date.now()-p.startTime)/1e3,p.isMultiplayer&&el("arrested",{time:p.elapsedTime}),Zo())}else(e>=p.arrestDistance||!s)&&(p.arrestCountdown=0,p.arrestStartTime=0);return p.policeCars=p.policeCars.filter(a=>!a.userData.remove),e}function b0(n){if(!W)return;const e=new re(Jl,xt.projectile);e.position.copy(n.position),e.position.y=17*n.scale.y;const t=W.position.x-n.position.x,i=W.position.z-n.position.z,r=Math.atan2(t,i);e.position.x+=Math.sin(r)*15*n.scale.x,e.position.z+=Math.cos(r)*15*n.scale.z;const s=15;e.userData={velocity:new L(Math.sin(r)*s,0,Math.cos(r)*s),lifetime:3e3,spawnTime:Date.now()},fe.add(e),p.projectiles.push(e)}function A0(){if(!W||p.arrested)return;const n=new re(Jl,xt.projectile),e=W.rotation.y;n.position.copy(W.position),n.position.y=18,n.position.x+=Math.sin(e)*35,n.position.z+=Math.cos(e)*35,n.userData={velocity:new L(Math.sin(e)*60,0,Math.cos(e)*60),lifetime:2e3,spawnTime:Date.now(),isPlayerShot:!0},fe.add(n),p.projectiles.push(n),p.speed-=2}function R0(n){if(!W)return;const e=Date.now(),t=W.position;for(let i=p.projectiles.length-1;i>=0;i--){const r=p.projectiles[i];if(r.position.x+=r.userData.velocity.x*(n||1),r.position.y+=r.userData.velocity.y*(n||1),r.position.z+=r.userData.velocity.z*(n||1),e-r.userData.spawnTime>r.userData.lifetime){fe.remove(r),p.projectiles.splice(i,1);continue}if(r.userData.isPlayerShot){let s=!1;for(let a=0;a<p.policeCars.length;a++){const o=p.policeCars[a];if(o.userData.dead)continue;const l=o.position.x-r.position.x,c=o.position.z-r.position.z;if(l*l+c*c<600){s=!0,o.userData.dead=!0,o.userData.deathTime=e,Cn(p.heatLevel*100),p.policeKilled=(p.policeKilled||0)+1;for(let h=0;h<5;h++)ql(o.position,!0);break}}if(s){fe.remove(r),p.projectiles.splice(i,1);continue}}else{const s=t.x-r.position.x,a=t.z-r.position.z;Math.sqrt(s*s+a*a)<20&&(fe.remove(r),p.projectiles.splice(i,1),yi(34))}}}function C0(n){if(!n||!Array.isArray(n))return;p.policeCars.length;const e=new Map;p.policeCars.forEach((i,r)=>{i.userData.networkId!==void 0&&e.set(i.userData.networkId,{car:i,index:r})});const t=new Set;n.forEach(i=>{if(t.add(i.id),e.has(i.id)){const{car:r}=e.get(i.id),s=.3;r.position.x+=(i.x-r.position.x)*s,r.position.z+=(i.z-r.position.z)*s;let a=i.rotation-r.rotation.y;a>Math.PI&&(a-=Math.PI*2),a<-Math.PI&&(a+=Math.PI*2),r.rotation.y+=a*s,r.userData.health=i.health,r.userData.speed=i.speed}else{const r=i.type||"standard",s=Ql(r);s.position.set(i.x,0,i.z),s.rotation.y=i.rotation,s.userData.networkId=i.id,s.userData.health=i.health,s.userData.speed=i.speed,fe.add(s),p.policeCars.push(s)}});for(let i=p.policeCars.length-1;i>=0;i--){const r=p.policeCars[i];r.userData.networkId!==void 0&&!t.has(r.userData.networkId)&&(fe.remove(r),p.policeCars.splice(i,1))}}function P0(){return p.policeCars.filter(n=>n.userData.networkId!==void 0&&!n.userData.dead).map(n=>({id:n.userData.networkId,x:n.position.x,z:n.position.z,rotation:n.rotation.y,health:n.userData.health,speed:n.userData.speed,type:n.userData.type}))}function D0(){const n=new Xt(1e4,1e4),e=new Te({color:4473924}),t=new re(n,e);t.rotation.x=-Math.PI/2,t.receiveShadow=!0,fe.add(t);const i=new Ue(300,.4,1e4),r=new Te({color:2236962}),s=new re(i,r);s.position.set(0,.2,0),s.receiveShadow=!0,fe.add(s);const a=new re(i,r);a.rotation.y=Math.PI/2,a.position.set(0,.2,0),a.receiveShadow=!0,fe.add(a);const o=new Xt(5,150),l=new Te({color:16776960});for(let c=-2500;c<2500;c+=300){const h=new re(o,l);h.rotation.x=-Math.PI/2,h.position.set(0,.45,c),h.receiveShadow=!0,fe.add(h)}for(let c=-2500;c<2500;c+=300){const h=new re(o,l);h.rotation.x=-Math.PI/2,h.position.set(c,.45,0),h.receiveShadow=!0,fe.add(h)}}function L0(){const n=[[-300,-1500],[300,-1500],[-1500,-1200],[1500,-1200],[-1600,500],[1600,500],[-200,1500],[200,1500],[-1400,1200],[1400,1200],[-800,-2e3],[800,-2e3],[0,2e3],[-900,-400],[900,-400],[-1100,600],[1100,600],[-500,1800],[500,1800],[-1800,-800],[1800,-800],[-2200,400],[2200,400]],e=new Ct(8,12,50,8),t=new Te({color:6111287}),i=new ji(35,70,8),r=new Te({color:3046706});n.forEach(s=>{const a=new re(e,t.clone());a.position.set(s[0],25,s[1]),a.castShadow=!0,a.userData={isTree:!0,isHit:!1,health:2,velocity:new L,rotVelocity:new L,width:20,height:50,depth:20},fe.add(a),p.chunks.push(a);const o=Math.floor(a.position.x/p.chunkGridSize),l=Math.floor(a.position.z/p.chunkGridSize),c=`${o},${l}`;p.chunkGrid[c]||(p.chunkGrid[c]=[]),p.chunkGrid[c].push(a);const h=new re(i,r.clone());h.position.set(s[0],80,s[1]),h.castShadow=!0,h.userData={isTreeFoliage:!0,linkedTrunk:a,isHit:!1,velocity:new L,rotVelocity:new L,width:35,height:70,depth:35},fe.add(h),a.userData.linkedFoliage=h})}const Ce={GENERIC:{name:"generic",colors:[9268835,7951688,7162945,10586239]},SHOP:{name:"shop",colors:[1668818,2201331,4367861],hasAwning:!0,signColor:16771899},BANK:{name:"bank",colors:[3622735,4545124,5533306],hasColumns:!0,signColor:16766720},PIZZERIA:{name:"pizzeria",colors:[13840175,12986408,12000284],hasAwning:!0,signColor:16761095},CHURCH:{name:"church",colors:[15527921,13621468,11583173],hasTower:!0,hasRoof:!0},POLICE_STATION:{name:"police",colors:[1402304,870305],hasFlagpole:!0,signColor:16777215},PARLIAMENT:{name:"parliament",colors:[14142664,12364452,10586239],hasDome:!0,hasColumns:!0,hasCow:!0},RESIDENTIAL:{name:"residential",colors:[16764092,16755601,16747109,12434877]},OFFICE:{name:"office",colors:[9489145,6600182,4367861],isGlass:!0},WAREHOUSE:{name:"warehouse",colors:[7697781,6381921,4342338],hasRollerDoor:!0}};function yr(n,e,t,i,r,s,a){const o=new Xt(r,s),l=a?Math.random()>.5?16775620:16769154:2503224,c=new ht({color:l,side:Mt}),h=new re(o,c);return h.position.set(n,e,t),h.rotation.y=i,h}function I0(n,e,t,i,r,s,a){const f=Math.floor((i-20)/25),u=Math.floor((s-20)/35),g=a.isGlass;for(let _=0;_<u;_++)for(let m=0;m<f;m++){const d=Math.random()>.4,T=e-i/2+15+m*25,y=20+_*35,b=yr(T,y,t+r/2+.5,0,g?22:12,g?30:15,d);n.add(b);const D=yr(T,y,t-r/2-.5,Math.PI,g?22:12,g?30:15,d);n.add(D)}const v=Math.floor((r-20)/25);for(let _=0;_<u;_++)for(let m=0;m<v;m++){const d=Math.random()>.4,T=t-r/2+15+m*25,y=20+_*35,b=yr(e-i/2-.5,y,T,Math.PI/2,g?22:12,g?30:15,d);n.add(b);const D=yr(e+i/2+.5,y,T,-Math.PI/2,g?22:12,g?30:15,d);n.add(D)}}function U0(n,e,t,i,r){const s=new Ue(t+10,3,20),a=new Te({color:r}),o=new re(s,a);return o.position.set(n,35,e+i/2+10),o.rotation.x=-.2,o}function N0(n,e,t,i,r,s){const a=new zt,o=new Ct(4,5,r*.6,8),l=new Te({color:15527921}),c=t/(s+1);for(let h=1;h<=s;h++){const f=new re(o,l);f.position.set(n-t/2+h*c,r*.3,e+i/2+8),f.castShadow=!0,a.add(f)}return a}function F0(n,e,t){const i=new zt,r=new Ue(25,80,25),s=new Te({color:15527921}),a=new re(r,s);a.position.set(n,t+40,e),i.add(a);const o=new ji(15,50,4),l=new Te({color:6111287}),c=new re(o,l);c.position.set(n,t+105,e),i.add(c);const h=new re(new Ue(3,20,3),new Te({color:16766720}));h.position.set(n,t+140,e),i.add(h);const f=new re(new Ue(12,3,3),new Te({color:16766720}));return f.position.set(n,t+145,e),i.add(f),i}function O0(n,e,t,i){const r=new zt,s=new Ct(i,i+5,15,16),a=new Te({color:12364452}),o=new re(s,a);o.position.set(n,t+7.5,e),r.add(o);const l=new yn(i,16,8,0,Math.PI*2,0,Math.PI/2),c=new Te({color:7901340}),h=new re(l,c);return h.position.set(n,t+15,e),r.add(h),r}function B0(n,e,t){const i=new zt,r=new Ue(20,12,10),s=new Te({color:16119285}),a=new re(r,s);a.position.set(n,t+6,e),i.add(a);const o=new Te({color:1710618}),l=new re(new Ue(6,5,.5),o);l.position.set(n-3,t+7,e+5.3),i.add(l);const c=new re(new Ue(5,4,.5),o);c.position.set(n+5,t+5,e+5.3),i.add(c);const h=new Ue(8,8,8),f=new re(h,s);f.position.set(n+14,t+8,e),i.add(f);const u=new Ue(4,4,4),g=new Te({color:16764370}),v=new re(u,g);v.position.set(n+19,t+6,e),i.add(v);const _=new ji(1.5,6,6),m=new Te({color:9268835}),d=new re(_,m);d.position.set(n+12,t+14,e-3),d.rotation.z=-.3,i.add(d);const T=new re(_,m);T.position.set(n+12,t+14,e+3),T.rotation.z=-.3,i.add(T);const y=new Ue(3,8,3),b=new Te({color:16119285});[[-6,-3],[-6,3],[6,-3],[6,3]].forEach(([R,$])=>{const M=new re(y,b);M.position.set(n+R,t-4,e+$),i.add(M)});const D=new Ue(2,10,2),A=new re(D,s);return A.position.set(n-12,t+2,e),A.rotation.z=.5,i.add(A),i}function z0(n,e,t,i,r,s,a){const o=new zt,l=new re(new Ue(t*.6,15,3),new Te({color:s}));return l.position.set(n,i-20,e),o.add(l),o}function G0(n,e,t){const i=new zt,r=new re(new Ct(1,1.5,60,8),new Te({color:10395294}));r.position.set(n,t/2+30,e),i.add(r);const s=new Xt(25,15),a=new Te({color:12986408,side:Mt}),o=new re(s,a);o.position.set(n+13,t/2+52,e),i.add(o);const l=new re(new Xt(25,3),new ht({color:16777215,side:Mt}));l.position.set(n+13,t/2+52,e+.1),i.add(l);const c=new re(new Xt(3,15),new ht({color:16777215,side:Mt}));return c.position.set(n+8,t/2+52,e+.1),i.add(c),i}function H0(){const n=[[-600,-800,100,80,150,Ce.SHOP],[-700,-500,120,90,180,Ce.OFFICE],[-550,-200,90,70,140,Ce.PIZZERIA],[-800,100,110,85,160,Ce.BANK],[-650,400,100,75,150,Ce.RESIDENTIAL],[-750,700,130,95,190,Ce.OFFICE],[-600,1e3,95,80,145,Ce.SHOP],[600,-800,105,85,155,Ce.RESIDENTIAL],[700,-500,115,88,175,Ce.SHOP],[550,-200,95,72,145,Ce.WAREHOUSE],[800,100,120,90,170,Ce.OFFICE],[650,400,105,78,155,Ce.PIZZERIA],[750,700,125,92,185,Ce.BANK],[600,1e3,100,82,150,Ce.RESIDENTIAL],[-350,600,140,100,120,Ce.POLICE_STATION],[350,-600,180,120,140,Ce.PARLIAMENT],[0,-2800,120,80,100,Ce.CHURCH],[-1200,-600,90,70,140,Ce.RESIDENTIAL],[-1300,200,110,85,160,Ce.SHOP],[-1100,800,100,78,150,Ce.WAREHOUSE],[1200,-600,95,75,145,Ce.OFFICE],[1300,200,115,88,170,Ce.RESIDENTIAL],[1100,800,105,80,155,Ce.SHOP],[-400,-1200,85,65,130,Ce.RESIDENTIAL],[400,-1200,90,70,135,Ce.SHOP],[-1100,-400,100,75,150,Ce.GENERIC],[1100,-400,105,80,155,Ce.GENERIC],[-800,1800,120,90,200,Ce.OFFICE],[0,2200,150,100,220,Ce.GENERIC],[800,1800,110,85,180,Ce.RESIDENTIAL],[-1500,2e3,100,80,160,Ce.WAREHOUSE],[1500,2e3,105,82,170,Ce.SHOP],[-800,-1800,115,88,190,Ce.RESIDENTIAL],[800,-1800,100,80,175,Ce.OFFICE],[-1500,-2e3,95,75,155,Ce.GENERIC],[1500,-2e3,110,85,165,Ce.SHOP],[-2e3,-1e3,130,95,200,Ce.OFFICE],[-2200,0,140,100,230,Ce.GENERIC],[-2e3,1e3,120,90,190,Ce.RESIDENTIAL],[-2500,-500,100,80,160,Ce.WAREHOUSE],[-2500,500,105,82,170,Ce.GENERIC],[2e3,-1e3,125,92,195,Ce.OFFICE],[2200,0,145,98,225,Ce.GENERIC],[2e3,1e3,115,88,185,Ce.RESIDENTIAL],[2500,-500,98,78,155,Ce.SHOP],[2500,500,102,80,165,Ce.GENERIC]],e=30;n.forEach(([t,i,r,s,a,o])=>{const l=new zt,c=o.colors,h=c[Math.floor(Math.random()*c.length)],f=Math.ceil(r/e),u=Math.ceil(a/e),g=Math.ceil(s/e),v=r/f,_=a/u,m=s/g,d=new Ue(v,_,m),T=new Te({color:h}),y=t-r/2+v/2,b=_/2,D=i-s/2+m/2;for(let A=0;A<f;A++)for(let R=0;R<u;R++)for(let $=0;$<g;$++){const M=new re(d,T.clone());M.position.set(y+A*v,b+R*_,D+$*m),M.userData={isHit:!1,buildingType:o.name,velocity:new L,rotVelocity:new L,width:v,height:_,depth:m},fe.add(M),p.chunks.push(M);const w=Math.floor(M.position.x/p.chunkGridSize),k=Math.floor(M.position.z/p.chunkGridSize),N=`${w},${k}`;p.chunkGrid[N]||(p.chunkGrid[N]=[]),p.chunkGrid[N].push(M)}if(I0(l,t,i,r,s,a,o),o.hasAwning){const A=o.name==="pizzeria"?3706428:1402304,R=U0(t,i,r,s,A);l.add(R)}if(o.hasColumns){const A=o.name==="parliament"?6:4,R=N0(t,i,r,s,a,A);l.add(R)}if(o.hasTower){const A=F0(t,i-s/4,a);l.add(A)}if(o.hasDome){const A=O0(t,i,a,30);l.add(A)}if(o.hasCow){const A=B0(t,i,a+45);l.add(A)}if(o.hasFlagpole){const A=G0(t+r/2+15,i+s/2+10,0);l.add(A)}if(o.signColor){const A=z0(t,i+s/2+2,r,a,o.name,o.signColor);l.add(A)}fe.add(l)})}function k0(n){if(!W)return;const e=n||1;for(let o=p.activeChunks.length-1;o>=0;o--){const l=p.activeChunks[o];l.position.x+=l.userData.velocity.x*e,l.position.y+=l.userData.velocity.y*e,l.position.z+=l.userData.velocity.z*e,l.rotation.x+=l.userData.rotVelocity.x*e,l.rotation.y+=l.userData.rotVelocity.y*e,l.rotation.z+=l.userData.rotVelocity.z*e;const c=l.userData.gravity||.5;l.userData.velocity.y-=c*e;const h=l.userData.height?l.userData.height/2:.5;if(l.position.y<h){l.position.y=h,l.userData.velocity.y*=-.4;const f=Math.pow(.75,e);l.userData.velocity.x*=f,l.userData.velocity.z*=f,l.userData.rotVelocity.multiplyScalar(f)}l.userData.isSmallDebris&&(l.userData.velocity.x*=.98,l.userData.velocity.z*=.98),Math.abs(l.userData.velocity.y)<.1&&Math.abs(l.userData.velocity.x)<.1&&Math.abs(l.userData.velocity.z)<.1&&l.position.y<=h+.1&&(p.activeChunks.splice(o,1),l.userData.isSmallDebris||(l.userData.isFallenDebris=!0,p.fallenDebris||(p.fallenDebris=[]),p.fallenDebris.push(l)))}const t=W.position,i=15,r=p.chunkGridSize,s=Math.floor(t.x/r),a=Math.floor(t.z/r);for(let o=s-1;o<=s+1;o++)for(let l=a-1;l<=a+1;l++){const c=`${o},${l}`,h=p.chunkGrid[c];if(h)for(let f=0;f<h.length;f++){const u=h[f];if(!u.userData.isHit&&Math.abs(u.position.x-t.x)<40&&Math.abs(u.position.z-t.z)<40){const g=u.position.x-t.x,v=u.position.z-t.z;if(g*g+v*v<(i+u.userData.width/2+5)**2&&Math.abs(u.position.y-t.y)<u.userData.height/2+10){const m=Math.abs(p.speed),d=W.rotation.y,T=Math.atan2(g,v);if(u.userData.isTree){if(u.userData.health--,u.userData.health<=0||m>25){if(u.userData.isHit=!0,p.activeChunks.push(u),u.userData.velocity.set(Math.sin(d)*m*.3,2+Math.random()*3,Math.cos(d)*m*.3),u.userData.rotVelocity.set((Math.random()-.5)*.3,0,(Math.random()-.5)*.3),u.userData.linkedFoliage){const y=u.userData.linkedFoliage;y.userData.isHit=!0,p.activeChunks.push(y),y.userData.velocity=u.userData.velocity.clone(),y.userData.velocity.y+=3,y.userData.rotVelocity=new L((Math.random()-.5)*.5,(Math.random()-.5)*.3,(Math.random()-.5)*.5)}V0(u.position,m)}else p.screenShake=.2;p.speed*=.85,yi(Math.floor(m*.15)+8),p.screenShake=.4,Ft(u.position)}else u.userData.isHit=!0,p.activeChunks.push(u),u.userData.velocity.set(Math.sin(d)*m*.2+Math.sin(T)*5,Math.abs(m)*.1+5+Math.random()*5,Math.cos(d)*m*.2+Math.cos(T)*5),u.userData.rotVelocity.set((Math.random()-.5)*.5,(Math.random()-.5)*.5,(Math.random()-.5)*.5),W0(u.position,u.material.color,m),p.speed*=.95,yi(Math.floor(m*.1)+5),p.screenShake=.3,Ft(u.position)}}}}if(p.fallenDebris&&p.fallenDebris.length>0)for(let o=p.fallenDebris.length-1;o>=0;o--){const l=p.fallenDebris[o];if(!l||!l.userData||!l.userData.isFallenDebris)continue;const c=l.position.x-t.x,h=l.position.z-t.z,f=c*c+h*h,u=Math.max(l.userData.width||10,l.userData.depth||10)/2,g=i+u+2;if(f<g*g){const v=Math.sqrt(f)||1,_=Math.abs(p.speed),m=-c/v,d=-h/v,T=g-v;if(T>0&&(W.position.x+=m*T*1.2,W.position.z+=d*T*1.2),_>8){p.fallenDebris.splice(o,1),fe.remove(l);const y=Math.min(12,Math.floor(_/3));X0(l,_,y),p.speed*=.85,p.screenShake=Math.min(.3,_/40)}else{p.speed*=.6;const y=Math.max(2,_*.5);l.position.x+=-m*y,l.position.z+=-d*y,l.rotation.y+=(Math.random()-.5)*.3}}}if(p.smallDebris&&p.smallDebris.length>0)for(let o=p.smallDebris.length-1;o>=0;o--){const l=p.smallDebris[o];if(!l||!l.userData)continue;const c=l.position.x-t.x,h=l.position.z-t.z,f=c*c+h*h,u=(l.userData.width||3)/2,g=i+u;if(f<g*g){const v=Math.abs(p.speed);if(v>5&&l.userData.width>1.5){fe.remove(l),p.smallDebris.splice(o,1);const _=p.activeChunks.indexOf(l);_>-1&&p.activeChunks.splice(_,1),q0(l.position,l.material,v),p.speed*=.95}else{const _=Math.sqrt(f)||1,m=-c/_*(v*.8),d=-h/_*(v*.8);l.userData.velocity&&(l.userData.velocity.x+=m,l.userData.velocity.z+=d,l.userData.velocity.y+=v*.3),p.speed*=.98}}}}function V0(n,e){const t=Math.sin((W==null?void 0:W.rotation.y)||0),i=Math.cos((W==null?void 0:W.rotation.y)||0),r=new Te({color:6111287});for(let a=0;a<6;a++){const o=new Ue(2+Math.random()*3,8+Math.random()*15,2+Math.random()*3),l=new re(o,r.clone());l.position.copy(n),l.position.y+=Math.random()*30,l.position.x+=(Math.random()-.5)*10,l.position.z+=(Math.random()-.5)*10,l.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),l.userData={isSmallDebris:!0,velocity:new L(t*e*.3+(Math.random()-.5)*10,5+Math.random()*8,i*e*.3+(Math.random()-.5)*10),rotVelocity:new L((Math.random()-.5)*.6,(Math.random()-.5)*.6,(Math.random()-.5)*.6),width:3,height:10,depth:3,lifetime:300,gravity:.3},fe.add(l),p.activeChunks.push(l),p.smallDebris||(p.smallDebris=[]),p.smallDebris.push(l)}const s=new Te({color:3046706});for(let a=0;a<12;a++){const o=new Ue(3+Math.random()*4,1,3+Math.random()*4),l=new re(o,s.clone());l.position.copy(n),l.position.y+=40+Math.random()*40,l.position.x+=(Math.random()-.5)*30,l.position.z+=(Math.random()-.5)*30,l.userData={isSmallDebris:!0,velocity:new L((Math.random()-.5)*8,2+Math.random()*4,(Math.random()-.5)*8),rotVelocity:new L((Math.random()-.5)*.4,(Math.random()-.5)*.4,(Math.random()-.5)*.4),width:4,height:1,depth:4,lifetime:400,gravity:.08},fe.add(l),p.activeChunks.push(l),p.smallDebris||(p.smallDebris=[]),p.smallDebris.push(l)}}function W0(n,e,t){const i=Math.sin((W==null?void 0:W.rotation.y)||0),r=Math.cos((W==null?void 0:W.rotation.y)||0),s=Math.min(15,4+Math.floor(t/5)),a=e||new Ne(9268835);for(let c=0;c<s;c++){const h=1+Math.random()*4,f=new Ue(h*(.5+Math.random()),h*(.5+Math.random()),h*(.5+Math.random())),u=a.clone();u.offsetHSL(0,(Math.random()-.5)*.1,(Math.random()-.5)*.2);const g=new Te({color:u}),v=new re(f,g);v.position.copy(n),v.position.y+=Math.random()*20,v.position.x+=(Math.random()-.5)*15,v.position.z+=(Math.random()-.5)*15,v.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const _=Math.random()*Math.PI*2,m=3+Math.random()*t*.4;v.userData={isSmallDebris:!0,velocity:new L(i*t*.25+Math.sin(_)*m,3+Math.random()*(t*.3),r*t*.25+Math.cos(_)*m),rotVelocity:new L((Math.random()-.5)*.8,(Math.random()-.5)*.8,(Math.random()-.5)*.8),width:h,height:h,depth:h,lifetime:250+Math.floor(Math.random()*150),gravity:.35},fe.add(v),p.activeChunks.push(v),p.smallDebris||(p.smallDebris=[]),p.smallDebris.push(v)}const o=Math.min(8,2+Math.floor(t/8));for(let c=0;c<o;c++){const h=new Ue(.5+Math.random()*2,.2,.5+Math.random()*2),f=new ht({color:Math.random()>.3?9489145:14938877,transparent:!0,opacity:.7}),u=new re(h,f);u.position.copy(n),u.position.y+=10+Math.random()*30,u.position.x+=(Math.random()-.5)*20,u.position.z+=(Math.random()-.5)*20,u.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),u.userData={isSmallDebris:!0,velocity:new L((Math.random()-.5)*12,2+Math.random()*6,(Math.random()-.5)*12),rotVelocity:new L((Math.random()-.5)*1.2,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2),width:1.5,height:.2,depth:1.5,lifetime:180+Math.floor(Math.random()*100),gravity:.25},fe.add(u),p.activeChunks.push(u),p.smallDebris||(p.smallDebris=[]),p.smallDebris.push(u)}const l=Math.min(10,3+Math.floor(t/6));for(let c=0;c<l;c++){const h=new yn(1+Math.random()*2,6,6),f=new ht({color:10395294,transparent:!0,opacity:.4+Math.random()*.3}),u=new re(h,f);u.position.copy(n),u.position.y+=Math.random()*15,u.position.x+=(Math.random()-.5)*10,u.position.z+=(Math.random()-.5)*10,u.userData={isSmallDebris:!0,isDust:!0,velocity:new L(i*t*.15+(Math.random()-.5)*5,1+Math.random()*3,r*t*.15+(Math.random()-.5)*5),rotVelocity:new L(0,0,0),width:2,height:2,depth:2,lifetime:120+Math.floor(Math.random()*80),gravity:-.02},fe.add(u),p.activeChunks.push(u),p.smallDebris||(p.smallDebris=[]),p.smallDebris.push(u)}tc(n,Math.min(6,Math.floor(t/5)))}function X0(n,e=15,t=6){const i=Math.max(4,t+Math.floor(Math.random()*3)),r=Math.min(n.userData.width,n.userData.height,n.userData.depth)/2,s=Math.sin((W==null?void 0:W.rotation.y)||0),a=Math.cos((W==null?void 0:W.rotation.y)||0);for(let o=0;o<i;o++){const l=r*(.2+Math.random()*.5),c=new Ue(l,l*(.5+Math.random()*.5),l),h=new re(c,n.material.clone());h.position.set(n.position.x+(Math.random()-.5)*n.userData.width,n.position.y+Math.random()*3,n.position.z+(Math.random()-.5)*n.userData.depth),h.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);const f=(Math.random()-.5)*e*.6,u=(Math.random()-.5)*e*.6;h.userData={isSmallDebris:!0,canShatter:l>2,velocity:new L(s*e*.4+f,2+Math.random()*(e*.3),a*e*.4+u),rotVelocity:new L((Math.random()-.5)*.5,(Math.random()-.5)*.5,(Math.random()-.5)*.5),width:l,height:l,depth:l,lifetime:400+Math.floor(Math.random()*200),gravity:.15+Math.random()*.1},fe.add(h),p.activeChunks.push(h),p.smallDebris||(p.smallDebris=[]),p.smallDebris.push(h)}Ft(n.position),tc(n.position,Math.min(8,Math.floor(e/3)))}function q0(n,e,t){const i=3+Math.floor(Math.random()*4),r=Math.sin((W==null?void 0:W.rotation.y)||0),s=Math.cos((W==null?void 0:W.rotation.y)||0);for(let a=0;a<i;a++){const o=.3+Math.random()*.7,l=new Ue(o,o,o),c=new re(l,e.clone());c.position.copy(n),c.position.y+=Math.random()*2,c.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),c.userData={isSmallDebris:!0,canShatter:!1,velocity:new L(r*t*.5+(Math.random()-.5)*t*.8,1+Math.random()*t*.2,s*t*.5+(Math.random()-.5)*t*.8),rotVelocity:new L((Math.random()-.5)*.8,(Math.random()-.5)*.8,(Math.random()-.5)*.8),width:o,height:o,depth:o,lifetime:150+Math.floor(Math.random()*100),gravity:.25},fe.add(c),p.activeChunks.push(c),p.smallDebris||(p.smallDebris=[]),p.smallDebris.push(c)}Ft(n,.5)}function tc(n,e=5){for(let t=0;t<e;t++)da(n)}function Y0(){if(p.smallDebris)for(let n=p.smallDebris.length-1;n>=0;n--){const e=p.smallDebris[n];if(e.userData.lifetime!==void 0&&(e.userData.lifetime--,e.userData.lifetime<=0)){fe.remove(e),p.smallDebris.splice(n,1);const t=p.activeChunks.indexOf(e);t>-1&&p.activeChunks.splice(t,1)}}}function $0(){const n=new re(lt.coin,xt.coin),e=3500;n.position.set((Math.random()-.5)*e*2,5,(Math.random()-.5)*e*2),n.rotation.z=Math.PI/2,n.castShadow=!0,fe.add(n),p.collectibles.push(n)}function j0(){if(p.arrested)return;if(Math.random()<.02&&($0(),p.collectibles.length>50)){const i=p.collectibles.length-50;for(let r=0;r<i;r++){const s=p.collectibles[r];s&&fe.remove(s)}p.collectibles.splice(0,i)}const n=W?W.position.x:0,e=W?W.position.z:0,t=400;for(let i=p.collectibles.length-1;i>=0;i--){const r=p.collectibles[i];if(r.rotation.y+=.05,!W)continue;const s=n-r.position.x,a=e-r.position.z;if(s*s+a*a<t){fe.remove(r),p.collectibles.splice(i,1);const o=(p.arrested?p.elapsedTime:(Date.now()-p.startTime)/1e3)||0,l=ut.coinBaseValue,c=Math.floor(o/10)*10,h=(p.rebirthPoints||0)+1;Cn((l+c)*h)}}}document.getElementById("gameContainer").appendChild(Fn.domElement);const K0=window.location.pathname==="/start"||window.location.pathname==="/start/",Ti=document.getElementById("multiplayerLobby"),tl=document.getElementById("lobbyCloseBtn"),xi=document.getElementById("joinGameBtn"),Qs=document.getElementById("playerNameInput"),sn=document.getElementById("lobbyError"),Z0=document.getElementById("lobbyConnect"),J0=document.getElementById("lobbyRoom");document.getElementById("displayRoomCode");const nl=document.getElementById("playersList"),Q0=document.getElementById("playerCount"),il=document.getElementById("hostControls"),rl=document.getElementById("waitingMessage"),sl=document.getElementById("startMultiplayerBtn"),Cs=document.getElementById("hostTouchArrest"),Ps=document.getElementById("hostDropInEnabled"),al=document.getElementById("otherPlayersHUD"),ol=document.getElementById("gameOverRejoinBtn"),ll=document.getElementById("gameOverMpShopBtn"),Rt=document.getElementById("gameModeModal"),cl=document.getElementById("soloModeBtn"),hl=document.getElementById("multiplayerModeBtn"),ea=[16711680,26367,65280,16755200];oe.playBtn&&oe.playBtn.addEventListener("click",()=>{if(p.isMultiplayer&&E0()){oe.shop.style.display="none",Zl(p.selectedCar);return}Rt.style.display="flex"});cl&&cl.addEventListener("click",()=>{Rt.style.display="none",ma()});const dl=document.getElementById("menuShopBtn");dl&&dl.addEventListener("click",()=>{Rt.style.display="none",pa(!1)});hl&&hl.addEventListener("click",async()=>{Rt.style.display="none",Ti.style.display="flex",sn.textContent="",Ar()});async function Ar(){const n=document.getElementById("serverDiscovery"),e=document.getElementById("lobbyConnect"),t=document.getElementById("lobbyRoom"),i=document.getElementById("scanningStatus"),r=document.getElementById("discoveredServers"),s=document.getElementById("noServersFound"),a=document.getElementById("serverList");n&&(n.style.display="block"),e&&(e.style.display="none"),t&&(t.style.display="none"),i&&(i.style.display="block"),r&&(r.style.display="none"),s&&(s.style.display="none");const o=await t0();i&&(i.style.display="none"),o.length>0?(r&&(r.style.display="block"),a&&(a.innerHTML=o.map(l=>`
                <div class="server-card ${l.gameStarted?"in-game":""}" data-ip="${l.ip}" data-players="${l.players}">
                    <div class="server-name">🖥️ ${l.ip==="localhost"?"Lokal Server":l.ip}</div>
                    <span class="server-players">
                        ${l.gameStarted?"🎮 I gang - ":"⏳ Venter - "}${l.players}/${l.maxPlayers} spillere
                    </span>
                </div>
            `).join(""),a.querySelectorAll(".server-card").forEach(l=>{l.addEventListener("click",()=>{nc(l.dataset.ip,l.dataset.players)})}))):s&&(s.style.display="block")}function nc(n,e){n0(n);const t=document.getElementById("serverDiscovery"),i=document.getElementById("lobbyConnect"),r=document.getElementById("selectedServerInfo");t&&(t.style.display="none"),i&&(i.style.display="block"),r&&(r.textContent=`🖥️ Server: ${n} (${e} spillere online)`);const s=document.getElementById("playerNameInput");s&&s.focus()}document.addEventListener("DOMContentLoaded",()=>{const n=localStorage.getItem("playerName");n&&Qs&&(Qs.value=n);const e=document.getElementById("backToServersBtn"),t=document.getElementById("rescanBtn"),i=document.getElementById("rescanBtnEmpty"),r=document.getElementById("hostOwnServerBtn");e&&e.addEventListener("click",()=>{Ei(),Ar()}),t&&t.addEventListener("click",Ar),i&&i.addEventListener("click",Ar),r&&r.addEventListener("click",()=>{nc("localhost","?")})});oe.gameOverShopBtn&&oe.gameOverShopBtn.addEventListener("click",()=>{p.isMultiplayer&&(Ei(),p.isMultiplayer=!1),pa(),Rt.style.display="flex"});ol&&ol.addEventListener("click",()=>{u0()});ll&&ll.addEventListener("click",()=>{oe.gameOver.style.display="none",pa(!0)});Ym(n=>{console.log("Multiplayer shop: selected car",n),oe.shop.style.display="none",Zl(n)});Rt&&Rt.addEventListener("click",n=>{n.target===Rt&&(Rt.style.display="none")});document.addEventListener("keydown",n=>{if(n.key==="Escape"){if(Rt&&Rt.style.display==="flex"){Rt.style.display="none";return}if(Ti&&Ti.style.display==="flex"){Ti.style.display="none",Ei();return}if(oe.shop&&oe.shop.style.display==="flex"){oe.shop.style.display="none",Rt.style.display="flex";return}if(oe.gameOver&&oe.gameOver.style.display==="block"){oe.gameOver.style.display="none",p.isMultiplayer&&(Ei(),p.isMultiplayer=!1),Rt.style.display="flex";return}!p.arrested&&p.startTime>0&&(p.arrested=!0,p.isMultiplayer&&(Ei(),p.isMultiplayer=!1),p.policeCars.forEach(e=>fe.remove(e)),p.policeCars=[],p.collectibles.forEach(e=>fe.remove(e)),p.collectibles=[],p.projectiles.forEach(e=>fe.remove(e)),p.projectiles=[],oe.gameOver.style.display="none",Rt.style.display="flex")}});tl&&tl.addEventListener("click",()=>{Ti.style.display="none",Ei()});xi&&xi.addEventListener("click",async()=>{const n=Qs.value.trim()||"Spiller",e=p.selectedCar||"standard";localStorage.setItem("playerName",n),xi.disabled=!0,sn.textContent="Forbinder...",sn.style.color="#888";try{await r0(),sn.textContent="Joiner spil...",a0(n,e)}catch{sn.textContent="Kunne ikke forbinde til server",sn.style.color="#ff4444",xi.disabled=!1}});sl&&sl.addEventListener("click",()=>{const n={...ut,touchArrest:(Cs==null?void 0:Cs.checked)||!1,dropInEnabled:(Ps==null?void 0:Ps.checked)!==!1};o0(n)});f0((n,e,t,i)=>{p.isMultiplayer=!0,p.isHost=i,p.playerId=e,p.roomCode=n;const r=t.findIndex(s=>s.id===e);p.playerColor=ea[r]||ea[0],eg(n,t,i),console.log(`Joined as ${i?"HOST":"player"}`)});y0((n,e)=>{const t=p.isHost;if(p.isHost=n===p.playerId,p.isHost&&!t){const i=document.getElementById("hostControls"),r=document.getElementById("waitingMessage");i&&(i.style.display="block"),r&&(r.style.display="none"),sn.textContent="Du er nu værten!",sn.style.color="#00ff00",setTimeout(()=>{sn.textContent=""},3e3)}console.log(`Host changed to: ${e} (isHost: ${p.isHost})`)});p0((n,e,t)=>{if(ic(e),t&&p.isMultiplayer&&!p.arrested){const i=fa(n.color||26367,n.car||"standard");i.position.set(0,0,100),p.otherPlayers.set(n.id,{name:n.name,car:n.car,color:n.color,mesh:i,state:null}),console.log(`${n.name} dropped into the game!`)}});m0((n,e)=>{tg(n),console.log(`${e||"Player"} left the game`)});g0((n,e,t)=>{Ti.style.display="none";const i=n.find(r=>r.id===p.playerId);n.forEach(r=>{if(r.id!==p.playerId){const s=fa(r.color||26367,r.car||"standard");s.position.set(r.spawnPos.x,0,r.spawnPos.z),p.otherPlayers.set(r.id,{name:r.name,car:r.car,color:r.color,mesh:s,state:null})}}),ng(i.spawnPos)});_0((n,e)=>{const t=p.otherPlayers.get(n);t&&t.mesh&&(Hm(t.mesh,e),t.state=e)});v0(n=>{p.isHost||C0(n)});x0((n,e,t)=>{if(e==="arrested"){const i=p.otherPlayers.get(n);i&&console.log(`${i.name} blev arresteret!`)}else if(e==="respawned"){const i=p.otherPlayers.get(n);i&&t&&(console.log(`Player ${n} respawned with car: ${t.car}`),t.car&&t.car!==i.car&&(i.car=t.car,i.mesh&&fe.remove(i.mesh),i.mesh=fa(i.color||26367,t.car)),i.mesh&&t.spawnPos&&i.mesh.position.set(t.spawnPos.x,.5,t.spawnPos.z))}});M0(n=>{sn.textContent=n});S0((n,e,t)=>{console.log("Respawned at:",n,"with car:",e,"resetHeat:",t),oe.gameOver.style.display="none",oe.shop.style.display="none",e&&e!==p.selectedCar&&(p.selectedCar=e,ua(p.playerColor)),p.arrested=!1;const i=En[p.selectedCar];p.health=(i==null?void 0:i.health)||100,p.arrestCountdown=0,p.arrestStartTime=0,t&&(console.log("[RESPAWN] Solo player - resetting heat level and police"),p.heatLevel=1,p.startTime=Date.now(),p.policeKilled=0,p.policeCars.forEach(r=>fe.remove(r)),p.policeCars=[],p.isHost&&Wr()),W&&(W.position.set(n.x,.5,n.z),W.rotation.y=0,p.speed=0,Ke&&(Ke.position.set(n.x,50,n.z+80),Ke.lookAt(W.position))),Vr()});function eg(n,e,t){const i=document.getElementById("serverDiscovery");i&&(i.style.display="none"),Z0.style.display="none",J0.style.display="block",xi&&(xi.disabled=!1),sn.textContent="",t?(il.style.display="block",rl.style.display="none"):(il.style.display="none",rl.style.display="block"),ic(e)}function ic(n){Q0.textContent=n.length,nl.innerHTML="",n.forEach((e,t)=>{const i=document.createElement("div");i.className="player-item",i.innerHTML=`
            <div class="player-color" style="background: #${(e.color||ea[t]).toString(16).padStart(6,"0")}"></div>
            <span class="player-name">${e.name}</span>
            ${e.isHost?'<span class="player-host">HOST</span>':""}
        `,nl.appendChild(i)})}function tg(n){const e=p.otherPlayers.get(n);e&&e.mesh&&km(e.mesh),p.otherPlayers.delete(n)}window.addEventListener("resize",()=>{Ke.aspect=window.innerWidth/window.innerHeight,Ke.updateProjectionMatrix(),Fn.setSize(window.innerWidth,window.innerHeight)});window.addEventListener("keydown",n=>{if(en[n.key.toLowerCase()]=!0,(n.key==="c"||n.key==="C")&&(p.is2DMode=!p.is2DMode),n.key==="f"||n.key==="F"){const e=En[p.selectedCar];if(e&&e.type==="tank"){const t=Date.now();t-(p.lastPlayerShot||0)>800&&(A0(),p.lastPlayerShot=t)}}n.key===" "&&n.preventDefault()});window.addEventListener("keyup",n=>{en[n.key.toLowerCase()]=!1});D0();H0();L0();Yl();function ma(){oe.shop.style.display="none",oe.gameOver.style.display="none",p.speed=0,p.money=0,p.heatLevel=1;const n=En[p.selectedCar];p.health=n.health||100,Vr(),p.arrested=!1,p.startTime=Date.now(),p.lastMoneyCheckTime=Date.now(),p.lastPoliceSpawnTime=Date.now(),p.policeCars.forEach(e=>fe.remove(e)),p.policeCars=[],p.collectibles.forEach(e=>fe.remove(e)),p.collectibles=[],p.projectiles.forEach(e=>fe.remove(e)),p.projectiles=[],p.slowEffect=0,p.slowDuration=0,p.arrestCountdown=0,p.arrestStartTime=0,p.policeKilled=0,p.sparks.forEach(e=>fe.remove(e)),p.sparks=[],p.currentFOV=p.baseFOV,Ke.fov=p.baseFOV,Ke.updateProjectionMatrix(),ua(),Wr()}function ng(n){oe.shop.style.display="none",oe.gameOver.style.display="none",p.speed=0,p.money=0,p.heatLevel=1;const e=En[p.selectedCar];p.health=e.health||100,Vr(),p.arrested=!1,p.startTime=Date.now(),p.lastMoneyCheckTime=Date.now(),p.lastPoliceSpawnTime=Date.now(),p.policeCars.forEach(t=>fe.remove(t)),p.policeCars=[],p.collectibles.forEach(t=>fe.remove(t)),p.collectibles=[],p.projectiles.forEach(t=>fe.remove(t)),p.projectiles=[],p.slowEffect=0,p.slowDuration=0,p.arrestCountdown=0,p.arrestStartTime=0,p.policeKilled=0,p.sparks.forEach(t=>fe.remove(t)),p.sparks=[],p.currentFOV=p.baseFOV,Ke.fov=p.baseFOV,Ke.updateProjectionMatrix(),ua(p.playerColor),W&&n&&W.position.set(n.x,0,n.z),p.isHost?(T0(),Wr(),console.log(`[MULTIPLAYER] Host started game. isHost: ${p.isHost}, isMultiplayer: ${p.isMultiplayer}`)):console.log(`[MULTIPLAYER] Client started game. isHost: ${p.isHost}, isMultiplayer: ${p.isMultiplayer}`)}let ul=performance.now();function rc(){requestAnimationFrame(rc);const n=performance.now(),e=Math.min((n-ul)/16.67,2);if(ul=n,!p.arrested){Gm(e,n),p.isMultiplayer&&W&&c0({x:W.position.x,y:W.position.y,z:W.position.z,rotY:W.rotation.y,speed:p.speed,health:p.health,arrested:p.arrested});const t=Math.floor((Date.now()-p.startTime)/1e3);(!p.isMultiplayer||p.isHost)&&t>0&&t%ut.policeSpawnInterval===0&&Date.now()-p.lastPoliceSpawnTime>500&&(p.isMultiplayer&&console.log(`[SPAWN] Triggering police spawn at ${t}s (isHost: ${p.isHost}, interval: ${ut.policeSpawnInterval})`),Wr(),p.lastPoliceSpawnTime=Date.now());const r=Math.min(ut.maxHeatLevel,1+Math.floor(t/ut.heatIncreaseInterval));r>p.heatLevel&&(p.heatLevel=r),k0(e),Y0(),j0(),R0(e);const s=w0(e);if(p.isMultiplayer&&p.isHost){const a=P0();d0(a)}qm(s),p.isMultiplayer&&ig()}if(Lm(),Um(e),!W){Fn.render(fe,Ke);return}if(p.is2DMode)Ke.up.set(0,0,-1),Ke.position.x=W.position.x,Ke.position.z=W.position.z,Ke.position.y=800,Ke.lookAt(W.position);else{Ke.up.set(0,1,0);const t=80,i=40,r=W.position.x-Math.sin(W.rotation.y)*t,s=W.position.z-Math.cos(W.rotation.y)*t;Ke.position.x+=(r-Ke.position.x)*.1,Ke.position.y=W.position.y+i,Ke.position.z+=(s-Ke.position.z)*.1,p.screenShake>.01&&(Ke.position.x+=(Math.random()-.5)*p.screenShake,Ke.position.y+=(Math.random()-.5)*p.screenShake*.5),Ke.lookAt(W.position.x,W.position.y+10,W.position.z)}Fn.render(fe,Ke)}function ig(){if(!al)return;let n="";p.otherPlayers.forEach((e,t)=>{if(e.state){const i="#"+(e.color||26367).toString(16).padStart(6,"0");n+=`
                <div class="other-player-card" style="border-color: ${i}">
                    <div class="name" style="color: ${i}">${e.name}</div>
                    <div class="stats">
                        HP: ${Math.round(e.state.health||100)}% | 
                        ${Math.round(Math.abs(e.state.speed||0)*3.6)} km/t
                        ${e.state.arrested?" | 🚔 FANGET":""}
                    </div>
                </div>
            `}}),al.innerHTML=n}Xm(ma);Bm({triggerDamageEffect:Zm,updateHealthUI:Vr});K0?ma():setTimeout(()=>{Rt.style.display="flex"},500);rc();
//# sourceMappingURL=main-C5SbATzF.js.map
