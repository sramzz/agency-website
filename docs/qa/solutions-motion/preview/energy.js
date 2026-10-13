(() => {
 const card=document.querySelector('.solutions-hero-signal'),flow=card.querySelector('.solutions-signal-flow');
 const steps=[...flow.querySelectorAll('.solutions-signal-step')],picker=document.querySelector('.proto-picker');
 const buttons=[...picker.querySelectorAll('[data-variant]')],highlight=picker.querySelector('.proto-picker-highlight');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,animations=[],visible=true;
 const titles=['Latido suave','Borde que se recorre','Flujo continuo','Doble latido','Encendido acumulativo'];
 steps.forEach(step=>{const number=step.textContent;for(const [cls,text] of [['energy-rim',''],['energy-halo',''],['energy-number',number]]){const el=document.createElement('span');el.className=cls;el.textContent=text;el.setAttribute('aria-hidden','true');step.append(el);}});
 const links=document.createElement('div');links.className='energy-links';links.setAttribute('aria-hidden','true');flow.prepend(links);
 for(let i=0;i<2;i++){const el=document.createElement('span');el.className='energy-link';links.append(el);}
 const segments=[...links.children];
 const duration=6000;
 function loop(el,frames){if(reduced.matches)return;animations.push(el.animate(frames,{duration,iterations:Infinity,easing:'linear'}));}
 const frame=(offset,opacity,extra={})=>({offset,opacity,...extra});
 function pulse(el,j,double=false,accumulate=false){
  const s=.06+j*.26,e=s+.20;
  const frames=double?[frame(0,0),frame(s,0),frame(s+.025,1),frame(s+.07,.15),frame(s+.105,1),frame(e,0),frame(1,0)]:accumulate?[frame(0,0),frame(s,0),frame(s+.07,1),frame(.82,1),frame(.94,0),frame(1,0)]:[frame(0,0),frame(s,0),frame(s+.055,1),frame(s+.11,.85),frame(e,0),frame(1,0)];
  loop(el,frames);
 }
 function render(){
  animations.forEach(a=>a.cancel());animations=[];card.dataset.energy=String(current+1);
  steps.forEach((step,j)=>{
   const halo=step.querySelector('.energy-halo'),rim=step.querySelector('.energy-rim'),num=step.querySelector('.energy-number');
   pulse(num,j,current===3,current===4);
   if(current!==1)pulse(halo,j,current===3,current===4);
   if(current===1){const s=.06+j*.26;loop(rim,[frame(0,0,{transform:'rotate(0deg)'}),frame(s,0,{transform:'rotate(0deg)'}),frame(s+.015,1,{transform:'rotate(0deg)'}),frame(s+.195,1,{transform:'rotate(360deg)'}),frame(s+.22,0,{transform:'rotate(360deg)'}),frame(1,0,{transform:'rotate(360deg)'})]);}
  });
  segments.forEach((el,j)=>{
   if(current===0||current===3){const s=.23+j*.26;loop(el,[frame(0,0),frame(s,0),frame(s+.02,.9),frame(s+.06,0),frame(1,0)]);}
   if(current===1||current===2){const s=.23+j*.26;loop(el,[frame(0,0,{transform:'scaleY(.02)'}),frame(s,0,{transform:'scaleY(.02)'}),frame(s+.015,1,{transform:'scaleY(.03)'}),frame(s+.085,1,{transform:'scaleY(1)'}),frame(s+.15,0,{transform:'scaleY(1)'}),frame(1,0,{transform:'scaleY(1)'})]);}
   if(current===4){const s=.23+j*.26;loop(el,[frame(0,0),frame(s,0),frame(s+.09,.9),frame(.82,.9),frame(.94,0),frame(1,0)]);}
  });
  pauseIfNeeded();
 }
 function geometry(){const base=flow.getBoundingClientRect(),r=steps.map(s=>s.getBoundingClientRect());segments.forEach((el,j)=>{el.style.left=(r[j].left+r[j].width/2-base.left-1)+'px';el.style.top=(r[j].bottom-base.top)+'px';el.style.height=Math.max(0,r[j+1].top-r[j].bottom)+'px';});}
 function pauseIfNeeded(){animations.forEach(a=>{if(document.hidden||!visible)a.pause();else if(a.playState==='paused')a.play();});}
 function select(i){current=i;buttons.forEach((b,j)=>{b.toggleAttribute('data-active',j===i);if(j===i)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});const b=buttons[i];highlight.style.width=b.offsetWidth+'px';highlight.style.transform=`translateX(${b.offsetLeft}px)`;picker.setAttribute('aria-label',titles[i]);const url=new URL(location);url.searchParams.set('v',i+1);history.replaceState(null,'',url);geometry();render();}
 buttons.forEach((b,i)=>b.addEventListener('click',()=>select(i)));
 picker.querySelector('.proto-picker-replay').addEventListener('click',render);
 document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.target.isContentEditable||e.ctrlKey||e.metaKey||e.altKey)return;if(/^[1-5]$/.test(e.key))select(Number(e.key)-1);if(e.key.toLowerCase()==='r')render();if(e.key==='ArrowRight')select((current+1)%5);if(e.key==='ArrowLeft')select((current+4)%5);});
 const resize=new ResizeObserver(geometry);resize.observe(flow);
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;pauseIfNeeded();},{threshold:.1});observer.observe(card);
 document.addEventListener('visibilitychange',pauseIfNeeded);reduced.addEventListener('change',render);
 window.addEventListener('resize',()=>{const b=buttons[current];highlight.style.width=b.offsetWidth+'px';highlight.style.transform=`translateX(${b.offsetLeft}px)`;});
 const requested=Number(new URLSearchParams(location.search).get('v'));select(requested>=1&&requested<=5?requested-1:0);
 document.fonts.ready.then(geometry);requestAnimationFrame(()=>requestAnimationFrame(()=>picker.setAttribute('data-ready','')));
})();
