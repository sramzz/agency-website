/* Preview only. The sole page target is the existing hero animation container. */
(() => {
 const host=document.querySelector('.solutions-hero-signal');
 const picker=document.querySelector('.proto-picker');
 const buttons=[...picker.querySelectorAll('[data-variant]')];
 const highlight=picker.querySelector('.proto-picker-highlight');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const names=['Recorrido','Ventanas con profundidad','Web que convierte','Mecanismo de oportunidades','Historia editorial'];
 const top=(i)=>`<div class="motion-top"><span>HOW GROWTH MOVES</span><span>0${i+1} / 05</span></div>`;
 const bottom=`<div class="motion-bottom"><span>Found. Contacted. Handled better.</span><span>RANKING REBELS</span></div>`;
 const bar=s=>`<div class="motion-bar"><i></i><i></i><i></i><span style="margin-left:8px">${s}</span></div>`;
 const search=`<div class="motion-window motion-search">${bar('SEARCH / DISCOVER')}<div class="motion-content"><div class="motion-query"><img src="/assets/images/platforms/logo-google.svg" alt="">Personal trainer near me</div><span class="motion-title">Northside Studio</span><p class="motion-small">Personal coaching. A clear next step.</p></div></div>`;
 const visit=`<div class="motion-window motion-visit">${bar('WEBSITE / CONTACT')}<div class="motion-content"><span class="motion-kicker">Your next training session</span><span class="motion-title" style="font-size:21px">Start with a conversation.</span><span class="motion-button">Book a first session ↗</span></div></div>`;
 const enquiry=`<div class="motion-window motion-enquiry"><div class="motion-content"><span class="motion-kicker">FOLLOW-UP / HUMAN REVIEW</span><span class="motion-title">New enquiry. Next step ready.</span><p class="motion-small">Acknowledged, organised and ready for your team.</p></div></div>`;
 const depthFlow=()=>`${[0,1].map(j=>`<div class="motion-flow-link" style="top:${130+j*115}px"><span></span><b>↓</b></div>`).join('')}${[
  ['01','Organic discovery','Found','Earn visibility where customers search.','<div class="motion-flow-channels"><span><img src="/assets/images/platforms/logo-google.svg" alt="">Google</span><span><img src="/assets/images/platforms/logo-google-maps.svg" alt="">Maps</span><span><img src="/assets/images/platforms/logo-chatgpt.svg" alt="">AI</span></div><div class="motion-flow-search">Your service near me</div><div class="motion-flow-result">↗ Your business</div>'],
  ['02','Paid demand','Contacted','Turn relevant attention into enquiries.','<div class="motion-flow-message">I’d like to know more.</div><div class="motion-flow-response">New enquiry received ↗</div>'],
  ['03','AI automation','Handled better','Move follow-up and repeatable work forward.','<div class="motion-flow-task"><b>✓</b> Response prepared</div><div class="motion-flow-task"><b>→</b> Human review</div>']
 ].map(([n,label,title,description,detail],j)=>`<span class="motion-flow-number" style="top:${110+j*115}px">${n}</span><div class="motion-window motion-flow-window" style="top:${80+j*115}px"><div class="motion-flow-accent"></div>${bar(label.toUpperCase())}<div class="motion-flow-content"><div><span class="motion-title">${title}</span><p class="motion-small">${description}</p></div><div class="motion-flow-detail">${detail}</div></div></div>`).join('')}`;
 const variants=[
 ()=>`<div class="motion-route-one motion-connector"></div><div class="motion-route-two motion-connector"></div>${search}${visit}${enquiry}<div class="motion-cursor"></div><div class="motion-ring"></div>`,
 ()=>depthFlow(),
 ()=>`<div class="motion-window motion-site">${bar('NORTHSIDE STUDIO / ILLUSTRATIVE WEBSITE')}<div class="motion-content"><div class="motion-site-brand">NORTHSIDE / PERSONAL TRAINING</div><span class="motion-title">A stronger start.<br>Your own pace.</span><p class="motion-small">Personal coaching built around you.</p><span class="motion-button">Book your first session ↗</span><div class="motion-site-art"></div></div></div><div class="motion-cursor"></div><div class="motion-ring"></div><div class="motion-site-route motion-connector"></div><div class="motion-site-enquiry"><b>New enquiry received.</b><span>Response prepared → Your team takes over</span></div>`,
 ()=>`<div class="motion-machine">${[['01','↗','Found','Organic discovery'],['02','+','Contacted','Paid demand'],['03','✓','Handled<br>better','AI automation']].map(([n,s,title,sub])=>`<div class="motion-piece"><span class="motion-kicker">${n} / ${sub}</span><div class="motion-piece-symbol" style="margin-top:20px">${s}</div><span class="motion-title">${title}</span><p class="motion-small">${sub}</p></div>`).join('')}<div class="motion-energy"></div></div><div class="motion-machine-line motion-connector"></div>`,
 ()=>`<div class="motion-editorial">${[['01','Found','Organic discovery','<div class="motion-mini-search">⌕ Near me</div><div class="motion-mini-result">Your business</div>'],['02','Contacted','Paid demand','<div class="motion-mini-chat">Let’s talk.</div><div class="motion-mini-reply">Happy to help.</div>'],['03','Handled better','AI automation','<div class="motion-mini-task"><b>✓</b> Acknowledged</div><div class="motion-mini-task"><b>✓</b> Follow-up ready</div>']].map(([n,w,l,m])=>`<div class="motion-editorial-row"><span class="motion-editorial-number">${n}</span><div class="motion-word-mask"><span class="motion-word">${w}</span><span class="motion-word-label">${l}</span></div><div class="motion-mini">${m}</div></div>`).join('')}</div>`
 ];
 let current=0,animations=[],resizeObserver,visibilityObserver,visible=true;
 const classes=['motion-route','motion-depth','motion-web','motion-mechanism','motion-story'];
 function animate(el,frames,start,duration=800){if(!el||reduce.matches)return;animations.push(el.animate(frames,{duration,delay:start,fill:'backwards',easing:'cubic-bezier(.23,1,.32,1)'}));}
 function show(i){
  current=i;animations.forEach(a=>a.cancel());animations=[];resizeObserver?.disconnect();visibilityObserver?.disconnect();
  host.innerHTML=`<div class="motion-demo ${classes[i]}" data-option="${i+1}"><div class="motion-board">${top(i)}${variants[i]()}${bottom}</div></div>`;
  const board=host.querySelector('.motion-board');
  const size=()=>{const w=host.clientWidth,h=host.clientHeight,s=Math.min(w/600,h/470);board.style.transform=`translate(${(w-s*600)/2}px, ${(h-s*470)/2}px) scale(${s})`;};
  resizeObserver=new ResizeObserver(size);resizeObserver.observe(host);size();
  buttons.forEach((b,j)=>{b.toggleAttribute('data-active',j===i);if(j===i)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
  const button=buttons[i];highlight.style.width=button.offsetWidth+'px';highlight.style.transform=`translateX(${button.offsetLeft}px)`;
  const url=new URL(location);url.searchParams.delete('restored');url.searchParams.set('v',i+1);history.replaceState(null,'',url);
  picker.setAttribute('aria-label',`Opciones de animación: ${names[i]}`);
  const all=s=>[...host.querySelectorAll(s)],one=s=>host.querySelector(s);
  if(i===0){all('.motion-window').forEach((el,j)=>animate(el,[{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],j*1700));all('.motion-connector').forEach((el,j)=>{const rotate=j?'143deg':'35deg';animate(el,[{opacity:0,transform:`rotate(${rotate}) scaleX(0)`},{opacity:1,transform:`rotate(${rotate}) scaleX(1)`}],1300+j*1900,1100);});animate(one('.motion-cursor'),[{opacity:0,transform:'translate(-80px,-45px)'},{opacity:1,transform:'translate(0,0)'}],2200,900);animate(one('.motion-ring'),[{opacity:0,transform:'scale(.65)'},{opacity:.8,offset:.35,transform:'scale(.9)'},{opacity:0,transform:'scale(1.4)'}],3050,650);}
  if(i===1){
   all('.motion-flow-window').forEach((el,j)=>animate(el,[{opacity:.65,transform:'translateY(10px) rotateY(-8deg) rotateX(3deg)'},{opacity:1,transform:'translateY(0) rotateY(-6deg) rotateX(3deg)'}],j*1900,1000));
   all('.motion-flow-accent').forEach((el,j)=>animate(el,[{opacity:.25},{opacity:1,offset:.4},{opacity:.35}],j*1900,1700));
   all('.motion-flow-number').forEach((el,j)=>animate(el,[{opacity:.6},{opacity:1}],j*1900,800));
   all('.motion-flow-link span').forEach((el,j)=>animate(el,[{transform:'scaleY(.02)',opacity:0},{transform:'scaleY(1)',opacity:1}],1200+j*1900,900));
   animate(one('.motion-flow-result'),[{opacity:0,transform:'translateX(8px)'},{opacity:1,transform:'translateX(0)'}],600);
   animate(one('.motion-flow-response'),[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],2500);
   all('.motion-flow-task').forEach((el,j)=>animate(el,[{opacity:0,transform:'translateX(8px)'},{opacity:1,transform:'translateX(0)'}],4200+j*450));
  }
  if(i===2){animate(one('.motion-site'),[{opacity:0,transform:'translateY(25px) scale(.96)'},{opacity:1,transform:'translateY(0) scale(1)'}],0,1300);animate(one('.motion-cursor'),[{opacity:0,transform:'translate(250px,-155px)'},{opacity:1,offset:.2,transform:'translate(240px,-150px)'},{opacity:1,transform:'translate(0,0)'}],1200,1800);animate(one('.motion-ring'),[{opacity:0,transform:'scale(.65)'},{opacity:.8,offset:.35,transform:'scale(.9)'},{opacity:0,transform:'scale(1.4)'}],3000,650);animate(one('.motion-site-route'),[{opacity:0,transform:'rotate(22deg) scaleX(0)'},{opacity:1,transform:'rotate(22deg) scaleX(1)'}],3200,950);animate(one('.motion-site-enquiry'),[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],4200,900);}
  if(i===3){all('.motion-piece').forEach((el,j)=>animate(el,[{opacity:0,transform:`translate(${(j-1)*85}px,${j===1?-65:40}px)`},{opacity:1,transform:'translate(0,0)'}],j*600,1600));animate(one('.motion-energy'),[{opacity:0,transform:'translateX(0)'},{opacity:1,offset:.1,transform:'translateX(20px)'},{opacity:1,offset:.85,transform:'translateX(430px)'},{opacity:0,transform:'translateX(490px)'}],3000,1700);animate(one('.motion-machine-line'),[{opacity:0,transform:'scaleX(0)'},{opacity:1,transform:'scaleX(1)'}],4400,1000);}
  if(i===4){all('.motion-word').forEach((el,j)=>animate(el,[{opacity:0,transform:'translateY(110%)'},{opacity:1,transform:'translateY(0)'}],j*1500,1000));all('.motion-mini').forEach((el,j)=>animate(el,[{opacity:0,transform:'translateX(15px)'},{opacity:1,transform:'translateX(0)'}],500+j*1500));all('.motion-word-label').forEach((el,j)=>animate(el,[{opacity:0},{opacity:1}],600+j*1500));animate(one('.motion-mini-reply'),[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],2500);}
  const visibility=()=>animations.forEach(a=>{if(document.hidden||!visible)a.pause();else if(a.playState==='paused')a.play();});
  visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visibility();},{threshold:.1});visibilityObserver.observe(host);
  if(document.hidden)visibility();
 }
 buttons.forEach((b,i)=>b.addEventListener('click',()=>show(i)));
 picker.querySelector('.proto-picker-replay').addEventListener('click',()=>show(current));
 document.addEventListener('keydown',e=>{if(/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)||e.target.isContentEditable||e.ctrlKey||e.metaKey||e.altKey)return;if(/^[1-5]$/.test(e.key))show(Number(e.key)-1);if(e.key==='r'||e.key==='R')show(current);if(e.key==='ArrowRight')show((current+1)%5);if(e.key==='ArrowLeft')show((current+4)%5);});
 document.addEventListener('visibilitychange',()=>animations.forEach(a=>{if(document.hidden)a.pause();else if(visible&&a.playState==='paused')a.play();}));
 reduce.addEventListener('change',()=>show(current));
 window.addEventListener('resize',()=>{const b=buttons[current];highlight.style.width=b.offsetWidth+'px';highlight.style.transform=`translateX(${b.offsetLeft}px)`;});
 const n=Number(new URLSearchParams(location.search).get('v'));show(n>=1&&n<=5?n-1:0);
 requestAnimationFrame(()=>requestAnimationFrame(()=>picker.setAttribute('data-ready','')));
})();
