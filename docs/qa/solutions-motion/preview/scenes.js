/* Five explanatory films. All geometry is rendered at device resolution.
   One finite timeline; no unattended loops, invented results or dependencies. */
const concepts = [
 ['Radar local','Un mapa editorial se ilumina desde la intención de búsqueda hasta el negocio. Comunica presencia local y descubrimiento sin prometer posiciones ficticias.','MAKE YOUR\nBUSINESS\nTHE ONE\nTHEY FIND.','Organic discovery, paid media and a website built to turn attention into your next opportunity.','Turn searches into visits.','Search intent. Local presence. A clear next step.'],
 ['Web en construcción','Una composición de dirección de arte: estructura, diseño y conversión se ensamblan en una web completa. La animación demuestra el trabajo que vende la agencia.','A WEBSITE\nWITH A JOB\nTO DO.','Give your brand a sharper presence and your customers a clearer path from first impression to first enquiry.','Designed to move people.','Strategy becomes structure. Structure becomes action.'],
 ['Corriente de demanda','Cinco corrientes de intención forman una ruta común hacia consultas. Una pieza gráfica fluida que explica cómo los canales trabajan juntos.','TURN\nATTENTION\nINTO\nOPPORTUNITY.','Connect search, social and paid media to a website that gives people a reason to get in touch.','Every channel. One direction.','Attention becomes interest. Interest becomes an enquiry.'],
 ['Atención en movimiento','Una consulta atraviesa un recorrido visible: recepción, respuesta, cualificación y revisión humana. Hace tangible la automatización sin fingir un panel de métricas.','MORE\nFOLLOW-UP.\nLESS\nBUSYWORK.','Practical automation helps your team respond, organise and follow up while keeping people in control.','Keep the conversation moving.','From a new enquiry to the right person.'],
 ['Arquitectura de crecimiento','Una arquitectura isométrica se construye por etapas y termina conectada. Expresa el servicio integral: atraer, convertir y dar seguimiento.','BUILD\nTHE SYSTEM\nBEHIND\nYOUR GROWTH.','Bring discovery, conversion and follow-up together. Build the foundations your next stage of growth needs.','Built to work together.','Discovery. Conversion. Follow-up. One connected system.']
];
const variants = concepts.map((c,i)=>()=>`<article class="scene" data-scene="${i}" aria-label="${c[0]}"><canvas aria-hidden="true"></canvas><div class="scene-top"><b>RANKING REBELS / ${['DISCOVERY','WEB DESIGN','DEMAND','AUTOMATION','GROWTH SYSTEM'][i]}</b><span>0${i+1} — 05</span></div><div class="scene-caption"><h3>${c[4]}</h3><p>${c[5]}</p></div></article>`);
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
let movie = null;
const logos = {};
['google','google-maps','facebook','instagram','chatgpt'].forEach(name=>{ const img = new Image();img.src=`/assets/images/platforms/logo-${name}.svg`;img.onload=()=>movie?.paint();logos[name]=img; });
const clamp = (n)=>Math.max(0,Math.min(1,n));
const ease = n=>1-Math.pow(1-clamp(n),3);
const part=(t,start,duration=1)=>ease((t-start)/duration);
const RED='#ff304f',WHITE='#f4f1eb',MUTED='#778294';
function startMovie(){
 movie?.destroy();
 const root = document.querySelector('.scene');if(!root)return;
 const id=Number(root.dataset.scene), c=concepts[id];
 document.querySelector('h1').innerHTML=c[2].split('\n').join('<br>');
 document.querySelector('.lede').textContent=c[3];
 document.querySelector('#variant-number').textContent=`0${id+1} / 05`;
 document.querySelector('#variant-name').textContent=c[0];
 document.querySelector('#variant-description').textContent=c[1];
 const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d');
 let t=0,last=0,frame=0,paused=false,onscreen=true,dead=false;
 const still=()=>reducedQuery.matches||document.querySelector('#reduce-motion').checked;
 const button=document.querySelector('#pause'),status=document.querySelector('#play-state');
 function text(s,x,y,size=12,color=WHITE,font='Inter',align='left',weight=400){ctx.fillStyle=color;ctx.font=`${weight} ${size}px ${font}`;ctx.textAlign=align;ctx.fillText(s,x,y);}
 function rect(x,y,w,h,fill,stroke,r=0){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}}
 function line(points,color,width=1){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
 function dot(x,y,r,color){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
 function glow(x,y,r,color){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}
 function icon(name,x,y,size=25){rect(x-size/2-9,y-size/2-9,size+18,size+18,name==='chatgpt'?'#293342':'#f4f1eb',null,10);const img=logos[name];if(img?.complete&&img.naturalWidth)ctx.drawImage(img,x-size/2,y-size/2,size,size);}
 function tag(s,x,y,w=150,fill='#171d27',color=WHITE){rect(x,y,w,29,fill,'#ffffff25',5);text(s,x+12,y+19,10,color,'JetBrains Mono');}
 function path(points,p,color,width=2){
  const lengths=points.slice(1).map((b,i)=>Math.hypot(b[0]-points[i][0],b[1]-points[i][1]));
  let remaining=lengths.reduce((a,b)=>a+b,0)*clamp(p);const visible=[points[0]];
  for(let i=0;i<lengths.length;i++){const a=points[i],b=points[i+1],f=Math.min(1,remaining/(lengths[i]||1));visible.push([a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]);remaining-=lengths[i];if(remaining<=0)break;}
  line(visible,color,width);
 }
 function bezier(a,b,c,d,n=70){return Array.from({length:n+1},(_,i)=>{const u=i/n,v=1-u;return [v*v*v*a[0]+3*v*v*u*b[0]+3*v*u*u*c[0]+u*u*u*d[0],v*v*v*a[1]+3*v*v*u*b[1]+3*v*u*u*c[1]+u*u*u*d[1]];});}
 function pin(x,y,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.beginPath();ctx.moveTo(0,13);ctx.bezierCurveTo(-7,4,-15,-4,-15,-13);ctx.arc(0,-13,15,Math.PI,0);ctx.bezierCurveTo(15,-4,7,4,0,13);ctx.fillStyle=RED;ctx.fill();dot(0,-13,5,WHITE);ctx.restore();}
 function mapScene(t){
  glow(330,270,250,'#64223225');
  ctx.save();ctx.translate(300,270);ctx.transform(1,.34,-.7,.58,0,0);
  for(let x=-420;x<420;x+=60)for(let y=-320;y<320;y+=60){rect(x+5,y+5,47,47,'#151a22','#ffffff08',3);}
  const roads=[[-420,-30,420,-30],[-80,-320,-80,320],[100,-320,100,320],[-420,150,420,150]];
  roads.forEach(r=>line([[r[0],r[1]],[r[2],r[3]]],'#343b4b',3));
  const radius=part(t,.6,2.4)*280;
  ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.strokeStyle='#ff304f45';ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,radius*.6,0,Math.PI*2);ctx.strokeStyle='#ff304f25';ctx.stroke();
  const route=[[-260,150],[-80,150],[-80,-30],[0,-30],[0,0]];path(route,part(t,2.5,2),RED,4);
  ctx.restore();
  [[130,252],[445,253],[351,356],[195,347]].forEach(([x,y],i)=>{ctx.globalAlpha=.2+part(t,1+i*.35)*.5;pin(x,y,.48);});ctx.globalAlpha=1;
  const p=part(t,2.2,1.5);ctx.save();ctx.globalAlpha=p;glow(300,262,85,'#ff304f35');pin(300,265-(1-p)*35,1.4);ctx.restore();
  ctx.globalAlpha=part(t,3.6);tag('YOUR BUSINESS',326,220,150,'#ff304f');ctx.globalAlpha=1;
  const q=part(t,.1);ctx.save();ctx.globalAlpha=q;rect(50,88+(1-q)*12,500,55,'#141922','#ffffff30',28);icon('google',79,116,17);text('A customer searches for what you do',108,120,13);ctx.restore();
  ctx.globalAlpha=part(t,4.8);rect(62,372,476,41,'#19131b','#ff304f60',6);text('Search  →  Discover  →  Visit your website',300,398,11,WHITE,'JetBrains Mono','center');ctx.globalAlpha=1;
 }
 function website(t){
  const a=part(t,0,2),b=part(t,1,2),c=part(t,2.2,2);
  for(let j=0;j<3;j++){
   const p=[a,b,c][j];ctx.save();ctx.translate(65+(2-j)*19,112+(2-j)*28+(1-p)*90);ctx.transform(1,-.12,.16,1,0,0);ctx.globalAlpha=.35+p*.65;
   rect(0,0,445,284,j===2?'#faf8f1':'#d5d1c8',j===2?'#b5b2ab':'#a8a69f',6);
   if(j===0){for(let k=0;k<7;k++){line([[22+k*62,15],[22+k*62,267]],'#aaaaa0');}for(let k=0;k<5;k++)line([[15,26+k*54],[430,26+k*54]],'#aaaaa0');text('01 / STRUCTURE',22,257,10,'#33383b','JetBrains Mono');}
   if(j===1){rect(20,49,200,150,null,'#99988e');rect(240,49,185,210,null,'#99988e');text('02 / DESIGN',22,257,10,'#33383b','JetBrains Mono');}
   if(j===2){
    text('STUDIO / NORTH',24,29,12,'#151b19','Inter','left',700);text('Work    About    Contact',419,29,8,'#575d58','Inter','right');line([[20,43],[425,43]],'#cccfc6');
    text('SPACE TO',23,93,34,'#151b19','Oswald');text('THINK BIG.',23,132,34,'#151b19','Oswald');
    text('Architecture for the way you live.',24,157,9,'#656b63');text('Considered spaces. Lasting impressions.',24,173,9,'#656b63');
    rect(23,193,140,32,'#c82c40',null,2);text('Start your project   ↗',36,214,10,WHITE);
    // Architectural illustration: a concrete studio with warm glazing.
    rect(249,61,173,187,'#d1d4c6');rect(267,87,137,140,'#b4b8a9');rect(279,103,99,124,'#4e5a4c');
    rect(279,103,46,124,'#a6b7a0');rect(330,103,48,124,'#758e77');line([[279,158],[378,158]],'#d7ded1',3);
    ctx.beginPath();ctx.moveTo(245,244);ctx.lineTo(411,224);ctx.lineTo(422,249);ctx.lineTo(245,269);ctx.fillStyle='#c3c6b7';ctx.fill();
    text('SELECTED PROJECT / 01',249,279,7,'#656b63','JetBrains Mono');
   }ctx.restore();
  }
  ctx.globalAlpha=part(t,4.8);tag('BUILT AROUND A CLEAR NEXT STEP',71,423,310,'#141b19');ctx.globalAlpha=1;
  const p=part(t,4,1.5);if(p>0){ctx.save();ctx.globalAlpha=p;ctx.translate(222+(1-p)*70,334+(1-p)*35);line([[0,0],[0,22],[6,16],[13,27],[18,24],[11,13],[21,13],[0,0]],'#161c19',2);ctx.restore();}
 }
 function demand(t){
  glow(390,275,230,'#ff304f18');
  const ys=[113,174,235,296,357],names=['google','google-maps','facebook','instagram','chatgpt'],labels=['Search','Maps','Social','Paid','AI discovery'];
  ys.forEach((y,j)=>{
   const p=part(t,j*.25,2);ctx.globalAlpha=p;icon(names[j],54,y,19);text(labels[j],85,y+4,10,MUTED);ctx.globalAlpha=1;
   for(let k=0;k<9;k++){
    const offset=(k-4)*2.5,pts=bezier([159,y+offset],[260,y+offset],[225,250+offset],[385,250+offset]);
    path(pts,part(t,.5+j*.18,3.4),k===4?'#ff687e':`rgba(255,48,79,${.12+k*.015})`,k===4?2:1);
    const u=clamp((t-1-j*.2-k*.09)/3);if(u>0&&u<1){const at=pts[Math.floor(u*70)];dot(...at,1.5,'#ffc8d1');}
   }
  });
  const p=part(t,3,1.5);ctx.globalAlpha=p;
  rect(367,206,91,89,'#1f1220','#ff304f70',12);text('YOUR',412,234,10,MUTED,'JetBrains Mono','center');text('WEBSITE',412,257,14,WHITE,'Oswald','center');text('CONVERT',412,279,8,'#ff8a9e','JetBrains Mono','center');ctx.globalAlpha=1;
  const pts=bezier([458,250],[510,250],[493,345],[526,345]);path(pts,part(t,4.2,1.4),RED,2);
  ctx.globalAlpha=part(t,5.3);rect(449,333,116,57,'#ff304f',null,6);text('NEW ENQUIRY',507,356,11,WHITE,'Oswald','center');text('A conversation starts',507,375,8,WHITE,'Inter','center');ctx.globalAlpha=1;
  ctx.globalAlpha=part(t,6);text('CHANNELS CONNECTED TO A COMMERCIAL PURPOSE',300,423,8,MUTED,'JetBrains Mono','center');ctx.globalAlpha=1;
 }
 function automation(t){
  const nodes=[[85,130],[260,130],[440,130],[440,299],[260,299],[85,299]];
  const labels=['ENQUIRY','ACKNOWLEDGE','QUALIFY','ROUTE','HUMAN REVIEW','FOLLOW UP'];
  const subs=['A customer gets in touch','Confirm receipt','Gather the right details','Assign the next action','Your team stays in control','Keep the opportunity alive'];
  const route=[[85,130],[260,130],[440,130],[514,130],[514,299],[440,299],[260,299],[85,299]];
  line(route,'#29303e',2);path(route,part(t,.3,5.2),RED,2);
  nodes.forEach(([x,y],i)=>{
   const p=part(t,i*.8,.8);ctx.globalAlpha=.25+.75*p;
   glow(x,y,45,i===4?'#ff8a0022':'#ff304f18');rect(x-24,y-24,48,48,i===4?'#3a2514':'#20141d',i===4?'#ff8a00':'#ff304f',12);
   text(['↗','✓','?','→','RR','↻'][i],x,y+7,21,i===4?'#ffb259':WHITE,'Inter','center',600);
   text(labels[i],x,y+50,11,WHITE,'Oswald','center');
   // Keep small captions on two lines for narrow cells.
   const words=subs[i].split(' '),mid=Math.ceil(words.length/2);text(words.slice(0,mid).join(' '),x,y+69,9,MUTED,'Inter','center');text(words.slice(mid).join(' '),x,y+83,9,MUTED,'Inter','center');ctx.globalAlpha=1;
  });
  if(t<5.5&&t>.3){const n=clamp((t-.3)/5.2)*(route.length-1),k=Math.min(route.length-2,Math.floor(n)),f=n-k;const x=route[k][0]+(route[k+1][0]-route[k][0])*f,y=route[k][1]+(route[k+1][1]-route[k][1])*f;glow(x,y,22,'#ff304f50');dot(x,y,5,WHITE);}
  ctx.globalAlpha=part(t,5.8);rect(40,416,520,36,'#1b1916','#ff8a0035',4);text('AUTOMATE THE ADMIN. KEEP PEOPLE IN CONTROL.',300,439,10,'#ffb259','JetBrains Mono','center');ctx.globalAlpha=1;
 }
 function architecture(t){
  const iso=(x,y,z=0)=>[300+(x-y)*1.05,275+(x+y)*.48-z];
  function polygon(points,fill,stroke){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}}
  for(let n=-240;n<=240;n+=40){line([iso(n,-240),iso(n,240)],'#ffffff07');line([iso(-240,n),iso(240,n)],'#ffffff07');}
  const blocks=[[-140,-80,85,80,65,'DISCOVERY','SEO / SEARCH'],[35,-80,100,80,105,'CONVERSION','YOUR WEBSITE'],[-15,85,110,75,55,'FOLLOW-UP','AUTOMATION']];
  blocks.forEach(([x,y,w,d,h,title,sub],i)=>{
   const p=part(t,.4+i*1.1,1.8),z=h*p;
   const A=iso(x,y,z),B=iso(x+w,y,z),C=iso(x+w,y+d,z),D=iso(x,y+d,z),bottomC=iso(x+w,y+d),bottomB=iso(x+w,y),bottomD=iso(x,y+d);
   polygon([D,C,bottomC,bottomD],i===1?'#651b2a':'#202634','#ffffff15');polygon([B,C,bottomC,bottomB],i===1?'#3b1520':'#151b25','#ffffff15');polygon([A,B,C,D],i===1?'#ff304f':'#343d4e',i===1?'#ff889a':'#6a758a');
   ctx.save();ctx.translate(...iso(x+11,y+12,z+2));ctx.transform(1.05,.48,-1.05,.48,0,0);text(title,0,11,13,WHITE,'Oswald');text(sub,0,31,7,i===1?'#ffe4e9':'#bec7d8','JetBrains Mono');
   for(let j=0;j<4;j++)rect(j*17,43,10,3,'#ffffff50');ctx.restore();
  });
  const links=[[iso(-55,-40,66),iso(35,-40,106)],[iso(85,0,106),iso(45,85,56)],[iso(-95,0,66),iso(-15,123,56)]];
  links.forEach(([a,d],i)=>{const pts=bezier(a,[a[0],a[1]-35],[d[0],d[1]-35],d);path(pts,part(t,3.3+i*.45,1.2),i===2?'#ff8a00':RED,2);});
  ctx.globalAlpha=part(t,5);tag('ONE SYSTEM. FEWER DISCONNECTED TACTICS.',86,414,427,'#21131b');ctx.globalAlpha=1;
  text('ATTRACT',91,115,9,MUTED,'JetBrains Mono');text('CONVERT',438,112,9,MUTED,'JetBrains Mono');text('FOLLOW THROUGH',382,368,9,MUTED,'JetBrains Mono');
 }
 function paint(){
  if(dead)return;
  const w=root.clientWidth,h=root.clientHeight,dpr=Math.min(devicePixelRatio||1,2);
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  // Uniform geometry scaling keeps every label and path within the stage on mobile.
  const scale=Math.min(w/600,h/560);ctx.save();ctx.translate((w-600*scale)/2,Math.max(0,(h-560*scale)/2)-12);ctx.scale(scale,scale);
  [mapScene,website,demand,automation,architecture][id](still()?8:t);ctx.restore();
  document.querySelector('#progress').style.transform=`scaleX(${still()?1:clamp(t/8)})`;
  button.textContent=paused?'Continuar':'Pausar';button.disabled=still()||t>=8;
  status.textContent=still()?'Composición sin movimiento':t>=8?'Secuencia completa · Repetir para verla de nuevo':paused?'En pausa':'Secuencia de 8 segundos';
 }
 function tick(now){if(dead)return;frame=0;if(last&&!paused&&onscreen&&!document.hidden&&!still())t=Math.min(8,t+(now-last)/1000);last=now;paint();if(t<8&&!paused&&onscreen&&!document.hidden&&!still())frame=requestAnimationFrame(tick);}
 function resume(){last=0;if(!frame&&!dead)frame=requestAnimationFrame(tick);}
 const ro=new ResizeObserver(paint);ro.observe(root);
 const io=new IntersectionObserver(entries=>{onscreen=entries[0].isIntersecting;if(onscreen)resume();else {cancelAnimationFrame(frame);frame=0;last=0;}},{threshold:.1});io.observe(root);
 const visibility=()=>{if(!document.hidden)resume();else{cancelAnimationFrame(frame);frame=0;last=0;}};document.addEventListener('visibilitychange',visibility);
 movie={paint,toggle(){paused=!paused;if(paused){cancelAnimationFrame(frame);frame=0;paint();}else resume();},destroy(){dead=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',visibility);}};
 paint();resume();
}
new MutationObserver(startMovie).observe(document.querySelector('#stage'),{childList:true});
document.querySelector('#pause').addEventListener('click',()=>movie?.toggle());
document.querySelector('#repeat').addEventListener('click',()=>mount(current));
document.querySelector('#reduce-motion').addEventListener('change',()=>mount(current));
reducedQuery.addEventListener('change',()=>mount(current));
document.fonts.ready.then(()=>movie?.paint());
