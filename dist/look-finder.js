const looks={traditional:'Silk & celebration — Traditional glamour',soft:'Quietly radiant — Soft glow'};
const storageKey='thanushiya-favourites-v1';
let favourites=new Set(),activeFilter='all',storageAvailable=true;
try{const stored=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(stored))favourites=new Set(stored.filter(id=>Object.hasOwn(looks,id)));}catch{storageAvailable=false;}
const saveButtons=[...document.querySelectorAll('[data-look]')],filterButtons=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('.look-card')];
function renderLooks(){
 saveButtons.forEach(button=>{const saved=favourites.has(button.dataset.look);button.setAttribute('aria-pressed',String(saved));button.textContent=saved?'Saved · remove':'Save this look';});
 filterButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===activeFilter)));
 let visible=0;cards.forEach(card=>{const id=card.dataset.style;card.hidden=!(activeFilter==='all'||activeFilter===id||(activeFilter==='saved'&&favourites.has(id)));if(!card.hidden)visible++;});
 document.getElementById('look-status').textContent=`${visible} ${visible===1?'look':'looks'} ${activeFilter==='saved'?'in your favourites':'to explore'} · ${favourites.size} saved`;
 document.getElementById('empty-looks').hidden=visible!==0;
 const names=[...favourites].map(id=>looks[id]).join('; ');
 document.getElementById('shortlist-summary').textContent=names||'Save a look to include it in your enquiry.';
 document.getElementById('enquiry-shortlist').textContent=names?'Your selected inspiration: '+names:'No favourite looks selected yet. You can still enquire below.';
 document.getElementById('clear-looks').hidden=favourites.size===0;
 if(!storageAvailable)document.getElementById('storage-note').textContent='Favourites are available for this visit. Your browser could not save them for later.';
}
function persistLooks(){try{localStorage.setItem(storageKey,JSON.stringify([...favourites]));}catch{storageAvailable=false;}renderLooks();}
saveButtons.forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.look;favourites.has(id)?favourites.delete(id):favourites.add(id);persistLooks();}));
filterButtons.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;renderLooks();}));
document.getElementById('clear-looks').addEventListener('click',()=>{favourites.clear();persistLooks();});
const occasion=document.querySelector('[name="occasion"]'),lookOccasion=document.getElementById('look-occasion');
lookOccasion.addEventListener('change',()=>{occasion.value=lookOccasion.value;});occasion.addEventListener('change',()=>{lookOccasion.value=occasion.value;});renderLooks();
document.getElementById('year').textContent=new Date().getFullYear();
const dateInput=document.querySelector('input[type="date"]'),now=new Date();dateInput.min=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
document.getElementById('enquiry-form').addEventListener('submit',function(event){
 event.preventDefault();const data=new FormData(this);
 const selected=[...favourites].map(id=>looks[id]).join('; ')||'I would love your guidance.';
 const message=`Hello Magila / Thanushiya Bridal Studio!\nName: ${data.get('name')}\nEvent date: ${data.get('date')}\nOccasion: ${data.get('occasion')}\nLocation: ${data.get('location')}\nFavourite looks: ${selected}\nMy vision: ${data.get('vision')||'I would love your guidance.'}\nPlease share availability and a personalised quote.`;
 const url='https://api.whatsapp.com/send?phone=917418086824&text='+encodeURIComponent(message);window.open(url,'_blank','noopener,noreferrer');
 const note=document.getElementById('form-note');note.textContent='Your enquiry is prepared. Press Send in WhatsApp to contact the studio. If it did not open, ';
 const retry=document.createElement('a');retry.href=url;retry.target='_blank';retry.rel='noopener noreferrer';retry.textContent='open your prepared enquiry here';note.append(retry);
});
