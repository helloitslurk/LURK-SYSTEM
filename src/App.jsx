// Production deployment sync: customer form, day controls, and neutral table styling.
import{useState,useEffect,useRef}from"react";
import { createKeyedWriteQueue } from "./writeQueue.js";
import { validateMenuItemInput } from "./menuValidation.js";
import { validatePayment } from "./paymentValidation.js";

const SB_URL="https://dpucptcrxoddfpvaqsdl.supabase.co";
const SB_KEY="sb_publishable_YiTDrcX7nnotBkoWqEWaHQ_tYHlT3NK";
let lastStorageWriteError="";

const MENU=[
{id:101,name:"SİGARALIK FİLTRE",price:50,cat:"Kahve",on:true},
{id:102,name:"FILTER COFFEE",price:180,cat:"Kahve",on:true},
{id:103,name:"AMERICANO",price:200,cat:"Kahve",on:true},
{id:104,name:"LATTE",price:220,cat:"Kahve",on:true},
{id:105,name:"SALTED CARAMEL LATTE",price:270,cat:"Kahve",on:true},
{id:106,name:"CORTADO",price:190,cat:"Kahve",on:true},
{id:107,name:"FLAT WHITE",price:210,cat:"Kahve",on:true},
{id:109,name:"MOCHA",price:250,cat:"Kahve",on:true},
{id:110,name:"VANILLA LATTE",price:250,cat:"Kahve",on:true},
{id:112,name:"V60",price:240,cat:"Kahve",on:true},
{id:113,name:"ESPRESSO",price:180,cat:"Kahve",on:true},
{id:114,name:"CAPPUCCINO",price:220,cat:"Kahve",on:true},
{id:210,name:"PURE MATCHA",price:285,cat:"Matcha",on:true},
{id:202,name:"STRAWBERRY MATCHA",price:310,cat:"Matcha",on:true},
{id:203,name:"BERRY MATCHA",price:310,cat:"Matcha",on:true},
{id:204,name:"VANILLA MATCHA",price:310,cat:"Matcha",on:true},
{id:211,name:"APPLE CINNAMON",price:310,cat:"Matcha",on:true},

{id:206,name:"CREME BRULEE MATCHA",price:280,cat:"Matcha",on:true},
{id:301,name:"SİYAH ÇAY",price:50,cat:"Cay",on:true},
{id:302,name:"BİTKİ ÇAYI",price:180,cat:"Cay",on:true},
{id:303,name:"ICE TEA",price:220,cat:"Cay",on:true},
{id:610,name:"HOMEMADE AZAHAR LEMONADE",price:350,cat:"Signature Drinks",on:true},
{id:611,name:"SMOOTHIE",price:350,cat:"Signature Drinks",on:true},
{id:612,name:"HOMEMADE AYRAN",price:250,cat:"Signature Drinks",on:true},
{id:613,name:"HOMEMADE ICE TEA",price:250,cat:"Signature Drinks",on:true},
{id:614,name:"COLA & ICE TEA",price:100,cat:"Soft Drinks",on:true},
{id:615,name:"ICE",price:20,cat:"Ekstra",on:true},
{id:616,name:"+ ESPRESSO",price:50,cat:"Ekstra",on:true},
{id:617,name:"TURKISH COFFEE",price:100,cat:"Kahve",on:true},
{id:401,name:"MUHAMMARA SANDVİÇ",price:330,cat:"Sandvic",on:true},
{id:402,name:"RENÇ SANDVİÇ",price:330,cat:"Sandvic",on:true},
{id:403,name:"PESTO SANDVİÇ",price:300,cat:"Sandvic",on:true},
{id:404,name:"TON BALIĞI SANDVİÇ",price:300,cat:"Sandvic",on:true},
{id:501,name:"TIRAMISU",price:290,cat:"Tatli",on:true},
{id:502,name:"SOFT COOKIE",price:175,cat:"Tatli",on:true},
{id:601,name:"+ VEGAN MILK",price:70,cat:"Ekstra",on:true},
{id:602,name:"SICAK CIKOLATA",price:220,cat:"Ekstra",on:true},
{id:603,name:"SAHLEP",price:200,cat:"Ekstra",on:true},
{id:604,name:"SODA",price:100,cat:"Ekstra",on:true},
{id:605,name:"BAILEYS MATCHA",price:340,cat:"Ekstra",on:true},
{id:606,name:"SERVIS",price:200,cat:"Ekstra",on:true},
{id:607,name:"ORALET",price:50,cat:"Ekstra",on:true},
{id:609,name:"CHURCHILL",price:130,cat:"Ekstra",on:true},
{id:618,name:"SALEP",price:200,cat:"Soft Drinks",on:true},
];

const HISTORY=[
{id:"h01",date:"2026-07-31",oa:"2026-07-31T11:25:00Z",ca:"2026-07-31T21:03:00Z",inc:2120,count:8},
{id:"h02",date:"2026-07-30",oa:"2026-07-30T13:38:00Z",ca:"2026-07-30T20:29:00Z",inc:1510,count:6},
{id:"h03",date:"2026-07-29",oa:"2026-07-29T12:33:00Z",ca:"2026-07-29T22:28:00Z",inc:2500,count:10},
{id:"h04",date:"2026-07-28",oa:"2026-07-28T13:34:00Z",ca:"2026-07-28T21:33:00Z",inc:2100,count:7},
{id:"h05",date:"2026-07-26",oa:"2026-07-26T11:41:00Z",ca:"2026-07-26T21:34:00Z",inc:4170,count:13},
{id:"h06",date:"2026-07-25",oa:"2026-07-25T15:55:00Z",ca:"2026-07-25T21:57:00Z",inc:1920,count:4},
{id:"h07",date:"2026-07-24",oa:"2026-07-24T12:00:00Z",ca:"2026-07-24T22:59:00Z",inc:1300,count:6},
{id:"h08",date:"2026-07-23",oa:"2026-07-23T13:36:00Z",ca:"2026-07-23T22:02:00Z",inc:2720,count:14},
{id:"h09",date:"2026-07-22",oa:"2026-07-22T12:00:00Z",ca:"2026-07-22T22:00:00Z",inc:2503,count:8},
{id:"h10",date:"2026-07-21",oa:"2026-07-21T12:00:00Z",ca:"2026-07-21T22:00:00Z",inc:2503,count:8},
{id:"h11",date:"2026-07-20",oa:"2026-07-20T12:00:00Z",ca:"2026-07-20T22:00:00Z",inc:2503,count:8},
{id:"h12",date:"2026-07-19",oa:"2026-07-19T12:00:00Z",ca:"2026-07-19T22:00:00Z",inc:2503,count:8},
{id:"h13",date:"2026-07-18",oa:"2026-07-18T12:00:00Z",ca:"2026-07-18T22:00:00Z",inc:2503,count:8},
{id:"h14",date:"2026-07-17",oa:"2026-07-17T12:00:00Z",ca:"2026-07-17T22:00:00Z",inc:2503,count:8},
{id:"h15",date:"2026-07-16",oa:"2026-07-16T12:00:00Z",ca:"2026-07-16T22:00:00Z",inc:2503,count:8},
{id:"h16",date:"2026-07-15",oa:"2026-07-15T12:00:00Z",ca:"2026-07-15T22:00:00Z",inc:2503,count:8},
{id:"h17",date:"2026-07-14",oa:"2026-07-14T12:00:00Z",ca:"2026-07-14T22:00:00Z",inc:2503,count:8},
{id:"h18",date:"2026-07-13",oa:"2026-07-13T12:00:00Z",ca:"2026-07-13T22:00:00Z",inc:2503,count:8},
{id:"h19",date:"2026-07-12",oa:"2026-07-12T12:00:00Z",ca:"2026-07-12T22:00:00Z",inc:2503,count:8},
{id:"h20",date:"2026-07-11",oa:"2026-07-11T12:00:00Z",ca:"2026-07-11T22:00:00Z",inc:2503,count:8},
{id:"h21",date:"2026-07-10",oa:"2026-07-10T12:00:00Z",ca:"2026-07-10T22:00:00Z",inc:2503,count:8},
{id:"h22",date:"2026-07-09",oa:"2026-07-09T12:00:00Z",ca:"2026-07-09T22:00:00Z",inc:2503,count:8},
{id:"h23",date:"2026-07-08",oa:"2026-07-08T12:00:00Z",ca:"2026-07-08T22:00:00Z",inc:2430,count:8},
{id:"h24",date:"2026-07-07",oa:"2026-07-07T12:00:00Z",ca:"2026-07-07T22:00:00Z",inc:2430,count:8},
{id:"h25",date:"2026-07-06",oa:"2026-07-06T12:00:00Z",ca:"2026-07-06T22:00:00Z",inc:2430,count:8},
{id:"h26",date:"2026-08-05",oa:"2026-08-05T12:00:00Z",ca:"2026-08-05T22:00:00Z",inc:3112,count:7},
{id:"h27",date:"2026-08-04",oa:"2026-08-04T12:00:00Z",ca:"2026-08-04T22:00:00Z",inc:3111,count:7},
{id:"h28",date:"2026-08-03",oa:"2026-08-03T12:00:00Z",ca:"2026-08-03T22:00:00Z",inc:3111,count:7},
{id:"h29",date:"2026-08-02",oa:"2026-08-02T12:00:00Z",ca:"2026-08-02T22:00:00Z",inc:3111,count:7},
];

const T={
  bg:"#090B0A",bg2:"rgba(255,255,255,0.055)",bg3:"rgba(255,255,255,0.085)",
  border:"rgba(255,255,255,0.12)",border2:"rgba(255,255,255,0.2)",
  accent:"#34C759",accentL:"#34C759",accentD:"#248A3D",
  text:"#F5F5F5",textSub:"#A0A0A0",textDim:"#666",
  danger:"#FF453A",warn:"#FF9F0A",
};

function posSessionToken(){
  try{return sessionStorage.getItem("lurk_pos_session")||"";}catch(e){return "";}
}
async function sbGet(key,fb){
  const token=posSessionToken();
  if(!token)throw new Error("POS oturumu bulunamadı.");
  const r=await fetch(SB_URL+"/rest/v1/rpc/lurk_pos_storage_get",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_session_token:token,p_key:key})});
  if(!r.ok)throw new Error("Supabase read failed for "+key+" ("+r.status+")");
  const value=await r.json();
  if(value===null)return fb;
  if(typeof value==="string"){try{return JSON.parse(value);}catch(e){return fb;}}
  return value;
}
async function sbSetNow(key,val){
  const token=posSessionToken();
  if(!token){lastStorageWriteError="POS oturumu bulunamadı. PIN ile yeniden giriş yap.";console.error(lastStorageWriteError);return false;}
  let lastError;
  for(let attempt=0;attempt<3;attempt++){
    try{
      const r=await fetch(SB_URL+"/rest/v1/rpc/lurk_pos_storage_set",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_session_token:token,p_key:key,p_value:val})});
      const responseText=await r.text();
      if(r.ok){
        if(responseText.trim()==="false")throw new Error("Supabase oturumu geçersiz veya kayıt reddedildi ("+key+").");
        lastStorageWriteError="";
        return true;
      }
      let detail=responseText;
      try{const parsed=JSON.parse(responseText);detail=parsed.message||parsed.details||parsed.hint||responseText;}catch(e){}
      lastError=new Error("Kayıt hatası "+key+" (HTTP "+r.status+"): "+String(detail).slice(0,260));
    }catch(e){lastError=e;}
    if(attempt<2)await new Promise(resolve=>setTimeout(resolve,350*(attempt+1)));
  }
  lastStorageWriteError=(lastError&&lastError.message)||("Supabase write failed for "+key);
  console.error(lastStorageWriteError);
  return false;
}
const sbSet=createKeyedWriteQueue(sbSetNow);

function fm(v){return(v||0).toLocaleString("tr-TR",{minimumFractionDigits:2})+" TL";}
function paymentAmount(order,method){if(Array.isArray(order.payments))return order.payments.filter(p=>p.method===method).reduce((sum,p)=>sum+(Number(p.amount)||0),0);return order.pt===method?(Number(order.total)||0):0;}
function tod(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function thisMonth(){return tod().slice(0,7);}
function uid(){return Math.random().toString(36).slice(2)+Date.now().toString(36);}
function ft(iso){if(!iso)return"—";const d=new Date(iso);return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");}

export default function App(){
  const customerToken=new URLSearchParams(window.location.search).get("lurkplus");
  const [auth,setAuth]=useState("checking");
  useEffect(()=>{
    if(customerToken)return;
    let active=true;
    const token=posSessionToken();
    if(!token){setAuth("locked");return;}
    fetch(SB_URL+"/rest/v1/rpc/lurk_pos_session_valid",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_session_token:token})})
      .then(r=>r.ok?r.json():false)
      .then(valid=>{if(active)setAuth(valid?"open":"locked");})
      .catch(()=>{if(active)setAuth("locked");});
    return()=>{active=false;};
  },[customerToken]);
  if(customerToken)return <LurkPlusPortal token={customerToken}/>;
  if(auth==="checking")return <div style={{minHeight:"100vh",background:"#090B0A",color:"#A0A0A0",display:"grid",placeItems:"center",fontFamily:"sans-serif"}}>LURK POS kontrol ediliyor…</div>;
  if(auth==="locked")return <POSLogin onLogin={()=>setAuth("open")}/>;
  return <POSApp onLock={()=>{try{sessionStorage.removeItem("lurk_pos_session");}catch(e){}setAuth("locked");}}/>;
}

function POSLogin({onLogin}){
  const [pin,setPin]=useState("");
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  async function submit(e){
    e.preventDefault();
    if(busy)return;
    setBusy(true);setError("");
    try{
      const r=await fetch(SB_URL+"/rest/v1/rpc/lurk_pos_login",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_pin:pin})});
      if(!r.ok)throw new Error("Giriş doğrulanamadı.");
      const token=await r.json();
      if(typeof token!=="string"||token.length<32){setError("PIN hatalı. Tekrar dene.");return;}
      sessionStorage.setItem("lurk_pos_session",token);
      onLogin();
    }catch(e){setError(e.message||"Bağlantı hatası. Tekrar dene.");}
    finally{setBusy(false);}
  }
  return <div style={{minHeight:"100vh",background:"#090B0A",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"sans-serif",color:"#F5F5F5",position:"relative"}}>
        <form onSubmit={submit} style={{width:"100%",maxWidth:340,background:"#151916",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:26,boxSizing:"border-box",textAlign:"center"}}>
      <img src="/lurk-logo.svg" alt="LURK." style={{display:"block",width:230,maxWidth:"72vw",height:"auto",margin:"0 auto 18px"}} />
      <div style={{fontSize:11,letterSpacing:3,color:"#34C759",marginTop:0,marginBottom:28}}>POS SYSTEM</div>
      <div style={{fontSize:14,color:"#A0A0A0",marginBottom:12}}>Devam etmek için PIN kodunu gir.</div>
      <input type="password" inputMode="numeric" autoComplete="current-password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="••••••" maxLength={32} autoFocus style={{width:"100%",boxSizing:"border-box",padding:15,borderRadius:11,border:"1px solid rgba(255,255,255,.15)",background:"#090B0A",color:"#fff",fontSize:22,letterSpacing:8,textAlign:"center",outline:"none"}}/>
      {error&&<div role="alert" style={{fontSize:12,color:"#FF453A",marginTop:12}}>{error}</div>}
      <button type="submit" disabled={busy||pin.length<6} style={{width:"100%",padding:14,marginTop:18,border:0,borderRadius:11,background:"#34C759",color:"#071009",fontWeight:800,fontSize:14,cursor:"pointer",opacity:busy||pin.length<6?.55:1}}>{busy?"Kontrol ediliyor…":"Giriş Yap"}</button>
    </form>
  </div>;
}

function POSApp({onLock}){
  const[ok,setOk]=useState(false);
  const[loadError,setLoadError]=useState(false);
  const[saveStatus,setSaveStatus]=useState("saved");
  const[pendingSaves]=useState(()=>({count:0,failed:false}));
  const failedWrites=useRef({});
  const paymentInProgress=useRef(false);
  const[view,setV]=useState("home");
  const[balancesVisible,setBalancesVisible]=useState(true);
  const[sel,setSel]=useState(null);
  const[tables,setTbl]=useState([]);
  const[orders,setOrd]=useState([]);
  const[logs,setLogs]=useState([]);
  const[customers,setCustomers]=useState([]);
  const[lurkPlusMembers,setLurkPlusMembers]=useState([]);
  const[creditEntries,setCreditEntries]=useState([]);
  const[personalDebts,setPersonalDebts]=useState([]);
  const[menu,setMenu]=useState(MENU);
  const[day,setDay]=useState(null);
  const[toast,setToast]=useState(null);
  const loaded=useRef(false);
  const timers=useRef({});

  function save(k,v){
    if(!loaded.current)return;
    clearTimeout(timers.current[k]);
    timers.current[k]=setTimeout(async()=>{
      delete timers.current[k];
      if(pendingSaves.count===0)pendingSaves.failed=false;
      pendingSaves.count++;
      setSaveStatus("saving");
      const success=await sbSet(k,v);
      if(!success){
        failedWrites.current[k]=v;
        pendingSaves.failed=true;
        msg("Kayıt başarısız: "+(lastStorageWriteError||"Bilinmeyen kayıt hatası"));
      }else{
        delete failedWrites.current[k];
      }
      pendingSaves.count=Math.max(0,pendingSaves.count-1);
      if(pendingSaves.count===0)setSaveStatus(pendingSaves.failed?"error":"saved");
    },800);
  }

  async function persistDirect(k,v){
    if(failedWrites.current[k]!==v)return;
    if(pendingSaves.count===0)pendingSaves.failed=false;
    pendingSaves.count++;
    setSaveStatus("saving");
    const success=await sbSet(k,v);
    if(!success){
      failedWrites.current[k]=v;
      pendingSaves.failed=true;
      msg("Kayıt başarısız. Yeniden denemek için üstteki uyarıya dokun.");
    }else{
      delete failedWrites.current[k];
    }
    pendingSaves.count=Math.max(0,pendingSaves.count-1);
    if(pendingSaves.count===0)setSaveStatus(pendingSaves.failed?"error":"saved");
  }

  useEffect(()=>{
    const fb=setTimeout(()=>{if(!ok){setLoadError(true);setOk(true);}},12000);
    (async()=>{
      const t=await sbGet("lurk_t",[]);
      const o=await sbGet("lurk_o",[]);
      const l=await sbGet("lurk_l",[]);
      const m=await sbGet("lurk_m",null);
      const d=await sbGet("lurk_d",null);
      const c=await sbGet("lurk_customers",[]);
      const ce=await sbGet("lurk_credit",[]);
      const lp=await sbGet("lurk_plus_members",[]);
      const pd=await sbGet("lurk_personal_debts",null).catch(()=>null);
      setTbl(Array.isArray(t)?t:[]);
      setOrd(Array.isArray(o)?o:[]);
      setCustomers(Array.isArray(c)?c:[]);
      setCreditEntries(Array.isArray(ce)?ce:[]);
      setLurkPlusMembers(Array.isArray(lp)?lp:[]);
      setPersonalDebts((Array.isArray(pd)?pd:PERSONAL_DEBT_SEED).map(x=>x.id==="ucuncuoglu"?{...x,total:130000,installments:(x.installments||[]).map((it,i)=>i===8?{...it,amount:10000}:it)}:x));
      const existing=new Set((Array.isArray(l)?l:[]).map(x=>x.date));
      const merged=[...(Array.isArray(l)?l:[]),...HISTORY.filter(h=>!existing.has(h.date))].sort((a,b)=>b.date.localeCompare(a.date));
      setLogs(merged);
      if(m&&Array.isArray(m)){
        const ids=new Set(MENU.map(x=>x.id));
        const refreshedIds=new Set([102,103,104,106,107,110,113,114,201,202,203,204,205,601]);
        const retiredIds=new Set([201,205]);
        const mm=MENU.map(mi=>{const f=m.find(x=>x.id===mi.id);return f?{...mi,name:refreshedIds.has(mi.id)?mi.name:(f.name||mi.name),price:refreshedIds.has(mi.id)?mi.price:f.price,on:f.on,cat:refreshedIds.has(mi.id)?mi.cat:(f.cat||mi.cat)}:mi;});
        m.filter(x=>!ids.has(x.id)&&!retiredIds.has(x.id)).forEach(x=>mm.push(x));
        setMenu(mm);
      }
      let savedDay=d;
      try{
        const localDay=JSON.parse(localStorage.getItem("lurk_day_state")||"null");
        const sameLocalDate=x=>x&&(x.date===tod()||(!x.date&&x.oa&&new Date(x.oa).getFullYear()===new Date().getFullYear()&&new Date(x.oa).getMonth()===new Date().getMonth()&&new Date(x.oa).getDate()===new Date().getDate()));
        if(sameLocalDate(localDay)&&(!sameLocalDate(savedDay)||new Date(localDay.oa||0)>new Date(savedDay.oa||0)))savedDay=localDay;
      }catch(e){}
      if(savedDay&&(savedDay.date===tod()||(!savedDay.date&&savedDay.oa&&new Date(savedDay.oa).getFullYear()===new Date().getFullYear()&&new Date(savedDay.oa).getMonth()===new Date().getMonth()&&new Date(savedDay.oa).getDate()===new Date().getDate())))setDay(savedDay);
      else {setDay(null);try{localStorage.removeItem("lurk_day_state");}catch(e){}}
      clearTimeout(fb);
      loaded.current=true;
      setLoadError(false);
      setOk(true);
    })().catch(()=>{clearTimeout(fb);setLoadError(true);setOk(true);});
  },[]);

  useEffect(()=>{save("lurk_t",tables);},[tables]);
  useEffect(()=>{save("lurk_o",orders);},[orders]);
  useEffect(()=>{save("lurk_l",logs);},[logs]);
  useEffect(()=>{save("lurk_customers",customers);},[customers]);
  useEffect(()=>{save("lurk_plus_members",lurkPlusMembers);},[lurkPlusMembers]);
  useEffect(()=>{save("lurk_credit",creditEntries);},[creditEntries]);
  useEffect(()=>{save("lurk_personal_debts",personalDebts);},[personalDebts]);
  useEffect(()=>{save("lurk_m",menu);},[menu]);

  function msg(m){setToast(m);setTimeout(()=>setToast(null),2500);}

  function openDay(){const d={oa:new Date().toISOString(),date:tod()};setDay(d);try{localStorage.setItem("lurk_day_state",JSON.stringify(d));}catch(e){}persistDirect("lurk_d",d);}
  function closeDay(){
    if(!day)return;
    const closed=orders.filter(o=>o.date===tod()&&!o.partialPayment);
    const inc=closed.reduce((s,o)=>s+o.total,0);
    const cash=closed.reduce((s,o)=>s+paymentAmount(o,"cash"),0);
    const card=closed.reduce((s,o)=>s+paymentAmount(o,"card"),0);
    const log={id:uid(),date:tod(),oa:day.oa,ca:new Date().toISOString(),inc,cash,card,count:closed.length};
    setLogs(prev=>[log,...prev]);
    setDay(null);try{localStorage.removeItem("lurk_day_state");}catch(e){}persistDirect("lurk_d",null);
    msg("Gün kapatıldı · "+fm(inc));
  }

  function addItem(tid,item){
    const table=tables.find(t=>t.id===tid);
    const member=table?.lurkPlusId?lurkPlusMembers.find(m=>m.id===table.lurkPlusId):null;
    const isCoffeeOrMatcha=item.cat==="Kahve"||item.cat==="Matcha";
    const isCoffeeMember=member?.membershipType==="coffee";
    const charged=!!member&&(!isCoffeeMember||isCoffeeOrMatcha);
    if(member&&isCoffeeMember&&isCoffeeOrMatcha&&(Number(member.coffeeCredits)||0)<1){msg("Kahve hakkı kalmadı. "+member.name);return false;}
    if(member&&!isCoffeeMember&&(Number(member.balance)||0)<Number(item.price||0)){msg("LURK+ bakiyesi yetersiz. "+member.name+" · "+fm(member.balance));return false;}
    if(charged)setLurkPlusMembers(prev=>prev.map(m=>{
      if(m.id!==member.id)return m;
      const date=new Date().toISOString();
      if(m.membershipType==="coffee"){
        const nextCredits=Math.max(0,(Number(m.coffeeCredits)||0)-1);
        return{...m,coffeeCredits:nextCredits,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:"credit_use",date,amount:1,balanceAfter:nextCredits,itemName:item.name,table:table?.lbl||""}]};
      }
      const nextBalance=Math.max(0,Math.round(((Number(m.balance)||0)-Number(item.price||0))*100)/100);
      return{...m,balance:nextBalance,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:"purchase",date,amount:Number(item.price)||0,balanceAfter:nextBalance,itemName:item.name,table:table?.lbl||""}]};
    }));
    setTbl(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      return{...t,s:"o",oa:t.oa||new Date().toISOString(),order:[...t.order,{...item,qty:1,oid:uid(),addedAt:new Date().toISOString(),lurkPlusCharged:charged,lurkPlusCreditCharged:charged&&isCoffeeMember}]};
    }));
    if(charged)msg(isCoffeeMember?member.name+" · 1 kahve hakkı düşüldü.":member.name+" · "+fm(item.price)+" LURK+ bakiyesinden düştü.");
    else if(member&&isCoffeeMember)msg("Bu ürün kahve hakkına dahil değil; normal hesaba eklendi.");
    return true;
  }
  function setTableCustomer(tid,customer){
    const clean=typeof customer==="string"?customer.trim():(customer?.name||"").trim();
    setTbl(prev=>prev.map(t=>t.id===tid?{...t,g:clean,customerId:typeof customer==="object"&&customer&&!customer.lurkPlus?customer.id:null,lurkPlusId:typeof customer==="object"&&customer?.lurkPlus?customer.id:null}:t));
  }
  function chQ(tid,lineId,d){
    const table=tables.find(t=>t.id===tid);
    const line=table?.order.find(o=>(o.oid||String(o.id))===lineId);
    const member=table?.lurkPlusId?lurkPlusMembers.find(m=>m.id===table.lurkPlusId):null;
    if(member&&line?.lurkPlusCharged){
      if(line.lurkPlusCreditCharged){
        if(d>0&&(Number(member.coffeeCredits)||0)<d){msg("Kahve hakkı yetersiz.");return;}
        setLurkPlusMembers(prev=>prev.map(m=>{if(m.id!==member.id)return m;const date=new Date().toISOString();const nextCredits=Math.max(0,(Number(m.coffeeCredits)||0)-d);return{...m,coffeeCredits:nextCredits,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:d<0?"credit_refund":"credit_use",date,amount:Math.abs(d),balanceAfter:nextCredits,itemName:line.name,table:table?.lbl||""}]};}));
      }else{
        if(d>0&&(Number(member.balance)||0)<Number(d*Number(line.price||0))){msg("LURK+ bakiyesi yetersiz.");return;}
        setLurkPlusMembers(prev=>prev.map(m=>{if(m.id!==member.id)return m;const amount=Math.abs(d*Number(line.price||0));const nextBalance=Math.max(0,Math.round(((Number(m.balance)||0)-(d*Number(line.price||0)))*100)/100);return{...m,balance:nextBalance,updatedAt:new Date().toISOString(),history:[...(m.history||[]),{id:uid(),type:d<0?"refund":"purchase",date:new Date().toISOString(),amount,balanceAfter:nextBalance,itemName:line.name,table:table?.lbl||""}]};}));
      }
    }
    setTbl(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      const order=t.order.map(o=>(o.oid||String(o.id))===lineId?{...o,qty:o.qty+d}:o).filter(o=>o.qty>0);
      return{...t,order,s:order.length>0?"o":"free"};
    }));
  }
  function moveTableOrder(sourceId,targetId,selections){
    if(sourceId===targetId){msg("Ürünleri farklı bir masaya taşımalısın.");return;}
    const source=tables.find(t=>t.id===sourceId);
    const target=tables.find(t=>t.id===targetId);
    if(!source||!target||!Array.isArray(source.order)||source.order.length===0){msg("Taşınacak açık sipariş bulunamadı.");return;}
    const requested=Array.isArray(selections)?selections:[];
    const moving=[],remaining=[];
    source.order.forEach(line=>{
      const key=line.oid||String(line.id);
      const qty=Math.max(0,Math.min(Number(line.qty)||0,Number(requested.find(x=>x.key===key)?.qty)||0));
      if(qty>0)moving.push({...line,qty});
      if((Number(line.qty)||0)-qty>0)remaining.push({...line,qty:(Number(line.qty)||0)-qty});
    });
    if(!moving.length){msg("Taşımak için en az bir ürün/adet seç.");return;}
    if(source.partialPayments?.length&&remaining.length){msg("Kısmi ödeme alınmış bir hesabı bölmeden önce kalan ürünlerin tamamını aynı masada tutmalısın.");return;}
    if((source.lurkPlusId||target.lurkPlusId)&&source.lurkPlusId!==target.lurkPlusId){msg("LURK+ bakiyesiyle ilişkilendirilmiş ürünler farklı üyeye ait masaya taşınamaz.");return;}
    setTbl(prev=>prev.map(t=>{
      if(t.id===sourceId)return {...t,order:remaining,partialPayments:remaining.length?(t.partialPayments||[]):[],s:remaining.length?"o":"free",g:remaining.length?t.g:"",customerId:remaining.length?t.customerId:null,lurkPlusId:remaining.length?t.lurkPlusId:null,oa:remaining.length?t.oa:null};
      if(t.id===targetId)return {...t,order:[...(Array.isArray(t.order)?t.order:[]),...moving],partialPayments:[...(Array.isArray(t.partialPayments)?t.partialPayments:[]),...(remaining.length?[]:(source.partialPayments||[]))],s:"o",oa:t.oa||new Date().toISOString(),g:t.g||"",customerId:t.customerId||null,lurkPlusId:t.lurkPlusId||null};
      return t;
    }));
    msg(moving.reduce((sum,line)=>sum+line.qty,0)+" adet ürün "+target.lbl+" masasına taşındı.");
    setSel(null);setV("tables");
  }

  function pay(tid,pt,disc,payments,partial=false){
    if(paymentInProgress.current)return;
    const t=tables.find(x=>x.id===tid);
    if(!t)return;
    const sub=t.order.reduce((s,o)=>s+o.price*o.qty,0);
    const previousPayments=Array.isArray(t.partialPayments)?t.partialPayments:[];
    const previousPaid=previousPayments.reduce((sum,p)=>sum+(Number(p.amount)||0),0);
    const isCredit=pt==="credit";
    const isLurkPlus=!!t.lurkPlusId;
    if(partial&&(isCredit||isLurkPlus)){msg("Kısmi ödeme şu anda yalnızca nakit/kart adisyonlarında kullanılabilir.");return;}
    const finalTotal=Math.max(0,sub-(partial?0:Math.max(0,Number(disc)||0)));
    const due=Math.max(0,Math.round((finalTotal-previousPaid)*100)/100);
    const validation=isLurkPlus?{error:null,payments:[]}:validatePayment({total:partial?(Array.isArray(payments)?payments.reduce((sum,p)=>sum+(Number(p.amount)||0),0):0):due,isCredit,customerId:t.customerId,payments});
    if(validation.error){msg(validation.error);return;}
    const normalized=isLurkPlus?[{method:"lurkPlus",amount:due}]:isCredit?[{method:"credit",amount:due}]:validation.payments;
    const paidNow=normalized.reduce((sum,p)=>sum+(Number(p.amount)||0),0);
    if(partial&&paidNow<due-0.009){
      paymentInProgress.current=true;setTimeout(()=>{paymentInProgress.current=false;},900);
      const paymentRecord={id:uid(),date:tod(),total:0,subtotal:0,discount:0,pt:normalized.length>1?"split":(normalized[0]?.method||pt),payments:normalized,g:t.g||"",customerId:t.customerId||null,table:t.lbl,items:[],partialPayment:true};
      setOrd(prev=>[paymentRecord,...prev]);
      setTbl(prev=>prev.map(tb=>tb.id===tid?{...tb,partialPayments:[...previousPayments,...normalized],s:"o"}:tb));
      msg("Kısmi tahsilat kaydedildi · "+fm(paidNow)+" · Kalan "+fm(due-paidNow));
      return;
    }
    const allPayments=normalized;
    const orderId=uid();
    const methodSet=[...new Set(allPayments.map(p=>p.method))];
    const order={id:orderId,date:tod(),total:finalTotal,subtotal:sub,discount:Math.max(0,sub-finalTotal),pt:isLurkPlus?"lurkPlus":isCredit?"credit":(methodSet.length>1?"split":(methodSet[0]||pt)),payments:allPayments,g:t.g||"",customerId:t.customerId||null,table:t.lbl,items:t.order.map(o=>({name:o.name,qty:o.qty,price:o.price,cat:o.cat,oid:o.oid||uid(),addedAt:o.addedAt||null}))};
    paymentInProgress.current=true;setTimeout(()=>{paymentInProgress.current=false;},900);
    setOrd(prev=>[order,...prev]);
    if(isCredit&&finalTotal>0)setCreditEntries(prev=>[{id:uid(),customerId:t.customerId,customerName:t.g||"",type:"debt",amount:finalTotal,method:"credit",date:new Date().toISOString(),orderId,note:"Adisyon veresiye"},...prev]);
    setTbl(prev=>prev.map(tb=>tb.id===tid?{...tb,order:[],partialPayments:[],s:"free",g:"",customerId:null,lurkPlusId:null}:tb));
    msg(isLurkPlus?"LURK+ siparişi kapatıldı · "+fm(finalTotal):isCredit?"Veresiye kaydedildi · "+fm(finalTotal):"Ödeme alındı · "+fm(finalTotal));
    setSel(null);setV("tables");
  }

  const curT=tables.find(t=>t.id===sel);
  const cats=[...new Set(menu.filter(m=>m.on).map(m=>m.cat))];

  if(loadError)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:T.bg,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",padding:24,color:T.text}}>
      <div style={{maxWidth:420,textAlign:"center",background:T.bg2,border:"1px solid rgba(255,255,255,.1)",borderRadius:18,padding:24}}>
        <div style={{fontSize:26,marginBottom:12}}>⚠</div>
        <div style={{fontSize:18,fontWeight:800,marginBottom:8}}>Veriler yüklenemedi</div>
        <div style={{fontSize:13,lineHeight:1.6,color:T.textSub,marginBottom:18}}>Supabase bağlantısı başarısız olduğu için kayıtların üzerine yazmayı önlemek amacıyla uygulama durduruldu. İnternet bağlantısını kontrol edip yeniden dene.</div>
        <button onClick={()=>window.location.reload()} style={{width:"100%",padding:13,border:0,borderRadius:10,background:T.accent,color:"#fff",fontWeight:800,cursor:"pointer"}}>Yeniden Dene</button>
      </div>
    </div>
  );

  if(!ok)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>
      <div style={{textAlign:"center"}}>
        <img src="/lurk-logo.svg" alt="LURK." style={{display:"block",width:190,maxWidth:"65vw",height:"auto",margin:"0 auto 18px"}} />
        <div style={{fontSize:13,color:T.textSub}}>Yükleniyor...</div>
      </div>
    </div>
  );

  const NAV=[
    {k:"home",label:"Ana Sayfa",icon:"⌂"},
    {k:"tables",label:"Masalar",icon:"⊞"},
    {k:"customers",label:"Müşteriler",icon:"◎"},
    {k:"lurkPlus",label:"LURK+",icon:"＋"},
    {k:"personal",label:"Kişisel",icon:"₺"},
    {k:"reports",label:"Raporlar",icon:"≡"},
    {k:"settings",label:"Ayarlar",icon:"⚙"},
  ];

  return(
    <div style={{position:"relative"}}><div className="lurk-app" style={{background:T.bg,minHeight:view==="order"?"100dvh":"100vh",height:view==="order"?"100dvh":"auto",overflow:view==="order"?"hidden":"visible",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",color:T.text,width:"100%",margin:"0 auto",paddingBottom:view==="order"?0:76,boxSizing:"border-box"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0D0F0E; }
        button, input, select { font: inherit; }
        button { transition: transform .14s ease, border-color .14s ease, background .14s ease, box-shadow .14s ease; }
        button:hover { filter: brightness(1.08); }
        button:active { transform: translateY(1px) scale(.99); }
        input:focus, select:focus { border-color: rgba(91,220,130,.75) !important; box-shadow: 0 0 0 3px rgba(52,199,89,.1); }
        .lurk-screen:not(.lurk-order-screen) { width: 100%; max-width: 1440px; margin: 0 auto; }
        .lurk-app [style*="grid-template-columns: 1fr 1fr"], .lurk-product-grid { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
        @media (min-width: 1100px) {
          .lurk-home-screen > div:first-child { padding: 28px 32px 24px !important; }
          .lurk-home-screen > div:nth-child(2), .lurk-home-screen > div:nth-child(3) { padding-left: 32px !important; padding-right: 32px !important; }
          .lurk-tables-screen > div:nth-child(2), .lurk-reports-screen > div:nth-child(n+2), .lurk-customers-screen > div:nth-child(n+2), .lurk-menu-screen > div:nth-child(2), .lurk-settings-screen > div:nth-child(2) { padding-left: 28px !important; padding-right: 28px !important; }
          .lurk-order-screen { height: 100vh; }
          .lurk-order-screen > div:first-child { padding: 16px 24px !important; }
          .lurk-order-screen > div:nth-child(2) { max-width: 1500px; width: 100%; margin: 0 auto; }
        }
        @media (min-width: 700px) and (max-width: 1099px) {
          .lurk-app [style*="grid-template-columns: 1fr 1fr"], .lurk-product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 699px) {\n          .lurk-home-stats > div { padding: 9px 6px !important; border-radius: 10px !important; }\n          .lurk-home-stats > div > div:nth-child(2) { font-size: clamp(10px, 2.65vw, 13px) !important; letter-spacing: -0.55px !important; }\n        }\n        .lurk-customer-grid { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
        @media (min-width: 700px) and (max-width: 1099px) {
          .lurk-customer-grid { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 699px) {
          .lurk-app [style*="grid-template-columns: 1fr 1fr"], .lurk-product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .lurk-customer-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 7px !important; }
        }

        /* Liquid Glass-inspired surfaces: translucent layers, fine highlights and soft depth. */
        .lurk-app {
          background:
            radial-gradient(ellipse at 12% 0%, rgba(52,199,89,.075), transparent 34%),
            radial-gradient(ellipse at 88% 18%, rgba(100,160,255,.045), transparent 30%),
            #090B0A !important;
        }
        .lurk-app div[style*="background: rgba(255, 255, 255, 0.055)"],
        .lurk-app div[style*="background:rgba(255,255,255,0.055)"] {
          -webkit-backdrop-filter: blur(22px) saturate(155%);
          backdrop-filter: blur(22px) saturate(155%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.055), 0 10px 30px rgba(0,0,0,.12);
        }
        .lurk-app [style*="background: rgb(26, 26, 26)"],
        .lurk-app [style*="background: rgb(36, 36, 36)"] {
          -webkit-backdrop-filter: blur(22px) saturate(155%);
          backdrop-filter: blur(22px) saturate(155%);
        }
        .lurk-bottom-nav {
          background: rgba(24,27,25,.68) !important;
          -webkit-backdrop-filter: blur(34px) saturate(180%) !important;
          backdrop-filter: blur(34px) saturate(180%) !important;
          border: 1px solid rgba(255,255,255,.13) !important;
          box-shadow: 0 -8px 32px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.09);
        }
        .lurk-nav-button { min-width: 0; border-radius: 14px !important; }
        .lurk-nav-button:focus-visible { outline: 2px solid rgba(91,220,130,.95); outline-offset: -3px; }
        .lurk-nav-button:hover { background: rgba(255,255,255,.07) !important; }
        .lurk-app input, .lurk-app select {
          background-color: rgba(255,255,255,.055) !important;
          border-color: rgba(255,255,255,.14) !important;
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          backdrop-filter: blur(18px) saturate(150%);
        }
        .lurk-modal-backdrop {
          background: rgba(0,0,0,.52) !important;
          -webkit-backdrop-filter: blur(8px) saturate(125%);
          backdrop-filter: blur(8px) saturate(125%);
        }
        .lurk-modal-panel {
          background: rgba(28,32,29,.88) !important;
          border: 1px solid rgba(255,255,255,.16) !important;
          box-shadow: 0 24px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08) !important;
          -webkit-backdrop-filter: blur(36px) saturate(180%) !important;
          backdrop-filter: blur(36px) saturate(180%) !important;
        }
        .lurk-app button:not(.lurk-nav-button) {
          -webkit-tap-highlight-color: transparent;
        }

        .lurk-nav-button:focus-visible { outline: 2px solid rgba(91,220,130,.95); outline-offset: -3px; }
        @media (min-width: 1000px) {
          .lurk-app { padding-left: 104px !important; padding-bottom: 0 !important; }
          .lurk-bottom-nav {
            left: 0 !important; top: 0 !important; bottom: 0 !important;
            transform: none !important; width: 104px !important; max-width: 104px !important;
            flex-direction: column !important; justify-content: flex-start !important;
            gap: 8px !important; padding: 22px 10px !important;
            background: rgba(13,15,14,.98) !important;
            border-top: 0 !important; border-right: 1px solid rgba(255,255,255,.09) !important;
            backdrop-filter: blur(24px) !important;
          }
          .lurk-nav-button {
            flex: 0 0 auto !important; width: 100% !important; min-height: 72px !important;
            padding: 13px 4px !important; border-radius: 14px !important;
          }
          .lurk-nav-button:hover { background: rgba(255,255,255,.055) !important; }
          .lurk-nav-button span:first-child { font-size: 22px !important; }
          .lurk-nav-button span:last-child { font-size: 11px !important; }
          .lurk-screen:not(.lurk-order-screen) { max-width: 1600px !important; }
          .lurk-order-screen { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
        }

        @media (min-width: 700px) {
          .lurk-modal-backdrop { align-items: center !important; padding: 24px; }
          .lurk-modal-panel { max-width: 520px !important; border-radius: 20px !important; padding: 28px !important; box-shadow: 0 24px 80px rgba(0,0,0,.5); }
        }
      `}</style>
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#34C759",color:"#fff",padding:"9px 18px",borderRadius:20,fontSize:13,fontWeight:700,zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(52,199,89,0.45)"}}>{toast}</div>}
      <button type="button" role="status" aria-live="polite" onClick={async()=>{if(saveStatus!=="error")return;const entries=Object.entries(failedWrites.current);if(!entries.length){setSaveStatus("saved");return;}pendingSaves.failed=false;await Promise.all(entries.map(([key,value])=>persistDirect(key,value)));}} style={{position:"absolute",top:12,right:12,zIndex:90,padding:"5px 9px",borderRadius:20,fontSize:10,fontWeight:750,background:saveStatus==="error"?"rgba(255,59,48,.16)":saveStatus==="saving"?"rgba(255,149,0,.16)":"rgba(52,199,89,.13)",color:saveStatus==="error"?T.danger:saveStatus==="saving"?T.warn:T.accentL,border:"1px solid "+(saveStatus==="error"?"rgba(255,59,48,.3)":saveStatus==="saving"?"rgba(255,149,0,.3)":"rgba(52,199,89,.25)" ),cursor:saveStatus==="error"?"pointer":"default"}}>{saveStatus==="error"?"↻ Tekrar dene":saveStatus==="saving"?"Kaydediliyor…":"Kaydedildi"}</button>

      {view==="home"&&<HomeScreen tables={tables} orders={orders} logs={logs} day={day} openDay={openDay} closeDay={closeDay} setV={setV} onLock={onLock} balancesVisible={balancesVisible} setBalancesVisible={setBalancesVisible}/>}
      {view==="tables"&&<TablesScreen tables={tables} customers={customers} lurkPlusMembers={lurkPlusMembers} setTbl={setTbl} setCustomers={setCustomers} setV={setV} setSel={setSel} msg={msg}/>}
      {view==="order"&&curT&&<OrderScreen table={curT} tables={tables} menu={menu} cats={cats} customers={customers} lurkPlusMembers={lurkPlusMembers} setTableCustomer={setTableCustomer} addItem={addItem} chQ={chQ} pay={pay} moveTableOrder={moveTableOrder} setTbl={setTbl} setV={setV} setSel={setSel}/>}
      {view==="reports"&&<ReportsScreen orders={orders} logs={logs} creditEntries={creditEntries} setV={setV}/>}
      {view==="monthReview"&&<MonthReviewScreen orders={orders} tables={tables} setV={setV}/>}
      {view==="lurkPlus"&&<LurkPlusScreen members={lurkPlusMembers} setMembers={setLurkPlusMembers} msg={msg} setV={setV}/>}
      {view==="personal"&&<PersonalFinanceScreen debts={personalDebts} setDebts={setPersonalDebts} setV={setV} msg={msg}/>}
      {view==="customers"&&<CustomersScreen orders={orders} customers={customers} setCustomers={setCustomers} creditEntries={creditEntries} setCreditEntries={setCreditEntries} setV={setV} msg={msg}/>}
      {view==="menu"&&<MenuScreen menu={menu} setMenu={setMenu} setV={setV}/>}
      {view==="settings"&&<SettingsScreen setV={setV} tables={tables} orders={orders} logs={logs} customers={customers} creditEntries={creditEntries} menu={menu} day={day} personalDebts={personalDebts} setPersonalDebts={setPersonalDebts} setTables={setTbl} setOrders={setOrd} setLogs={setLogs} setCustomers={setCustomers} setCreditEntries={setCreditEntries} setMenu={setMenu} setDay={setDay}/>}
      {view!=="order"&&(
        <div className="lurk-bottom-nav" style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"none",background:"rgba(13,13,13,0.97)",backdropFilter:"blur(40px)",borderTop:"0.5px solid rgba(255,255,255,0.08)",display:"flex",zIndex:50}}>
          {NAV.map(n=>(
            <button className="lurk-nav-button" key={n.k} onClick={()=>{if(view==="personal"&&n.k!=="personal")window.dispatchEvent(new Event("lurk-personal-leave"));setV(n.k);}} style={{flex:1,padding:"10px 0 14px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontSize:20,lineHeight:1,color:view===n.k?T.accent:T.textDim}}>{n.icon}</span>
              <span style={{fontSize:10,fontWeight:view===n.k?700:400,color:view===n.k?T.accent:T.textDim}}>{n.label}</span>
            </button>
          ))}
        </div>
      )}
    </div></div>
  );
}

/* ─── HOME ─── */
function HomeScreen({tables,orders,logs,day,openDay,closeDay,setV,onLock,balancesVisible,setBalancesVisible}){
  const[confirm,setConfirm]=useState(false);
  const today=tod();
  const todO=orders.filter(o=>o.date===today&&!o.partialPayment);
  const todInc=todO.reduce((s,o)=>s+o.total,0);
  const todCash=todO.reduce((s,o)=>s+paymentAmount(o,"cash"),0);
  const todCard=todO.reduce((s,o)=>s+paymentAmount(o,"card"),0);
  const openT=tables.filter(t=>t.s==="o");
  const openInc=openT.reduce((s,t)=>s+t.order.reduce((ss,o)=>ss+o.price*o.qty,0),0);
  const monthStart=new Date(new Date().getFullYear(),new Date().getMonth(),1);
  const daysInMonth=new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate();
  const monthDays=Array.from({length:daysInMonth},(_,i)=>{
    const d=new Date(monthStart.getFullYear(),monthStart.getMonth(),i+1);
    const key=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    const closed=orders.filter(o=>o.date===key).reduce((sum,o)=>sum+(Number(o.total)||0),0);
    const open=key===today?openInc:0;
    return {key,day:String(d.getDate()),total:closed+open};
  });
  const chartMax=Math.max(1,...monthDays.map(d=>d.total));
  const chartTicks=[0,0.5,1].map(f=>Math.round(chartMax*f));
  const monthTotal=monthDays.reduce((sum,d)=>sum+d.total,0);

  const PAGES=[
    {k:"tables",label:"Masalar",icon:"⊞",sub:openT.length>0?openT.length+" açık masa":"Tüm masalar"},
    {k:"reports",label:"Raporlar",icon:"≡",sub:"Satış geçmişi"},
    {k:"customers",label:"Müşteriler",icon:"◎",sub:"Aylık sıralama"},
    {k:"lurkPlus",label:"LURK+",icon:"＋",sub:"Ön ödemeli üyeler"},
    {k:"monthReview",label:"Bu ay nasıl geçti?",icon:"↗",sub:"Ciro ve en çok kazandıran 5 ürün"},
    {k:"menu",label:"Menü",icon:"☰",sub:"Ürün yönetimi"},
  ];

  return(
    <div className="lurk-screen lurk-home-screen">
      {/* Header */}
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"20px 16px 16px"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <img src="/lurk-logo.svg" alt="LURK." style={{display:"block",width:112,maxWidth:"38vw",height:"auto"}} />
            <div style={{fontSize:12,color:T.textSub,marginTop:2}}>{new Date().toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button type="button" onClick={onLock} aria-label="POS sistemini kilitle" title="Sistemi kilitle" style={{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:11,color:T.textSub,fontSize:16,cursor:"pointer"}}>⌑</button>
            <button type="button" onClick={()=>setBalancesVisible(v=>!v)} aria-label={balancesVisible?"Bakiyeleri gizle":"Bakiyeleri göster"} title={balancesVisible?"Bakiyeleri gizle":"Bakiyeleri göster"} style={{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:11,color:T.textSub,fontSize:17,cursor:"pointer"}}>{balancesVisible?"◉":"⊘"}</button>
            <div style={{display:"flex",alignItems:"center",gap:6,background:day?"rgba(52,199,89,0.12)":"rgba(255,255,255,0.05)",border:"0.5px solid "+(day?"rgba(52,199,89,0.3)":"rgba(255,255,255,0.1)"),borderRadius:20,padding:"6px 12px"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:day?"#34C759":T.textDim}}/>
              <span style={{fontSize:12,fontWeight:600,color:day?"#34C759":T.textSub}}>{day?"Açık":"Kapalı"}</span>
            </div>
          </div>
        </div>

        {/* Bugün ciro özeti: mobilde taşmayan kompakt kartlar */}
        <div className="lurk-home-stats" style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:6,width:"100%",minWidth:0}}>
          {[
            {label:"Toplam",val:fm(todInc+openInc),sub:todO.length+" kapanan"},
            {label:"Nakit",val:fm(todCash),sub:"bugün"},
            {label:"Kart",val:fm(todCard),sub:"bugün"},
          ].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.035)",borderRadius:11,padding:"10px 8px",border:"1px solid rgba(255,255,255,0.07)",minWidth:0,overflow:"hidden"}}>
              <div style={{fontSize:9,color:T.textSub,fontWeight:650,textTransform:"uppercase",letterSpacing:"0.45px",marginBottom:5,whiteSpace:"nowrap"}}>{s.label}</div>
              <div style={{fontSize:"clamp(11px, 2.8vw, 15px)",fontWeight:800,color:i===0?T.accentL:T.text,letterSpacing:"-0.45px",whiteSpace:"nowrap",fontVariantNumeric:"tabular-nums",filter:balancesVisible?"none":"blur(7px)",userSelect:balancesVisible?"auto":"none"}}>{balancesVisible?s.val.replace(" TL",""):"••••••"}</div>
              <div style={{fontSize:8,color:T.textDim,marginTop:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>TL · {s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hızlı erişim grid */}
      <div style={{padding:"16px 14px 0"}}>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:10}}>Sayfalar</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {PAGES.map((p,i)=>(
            <button key={p.k} onClick={()=>setV(p.k)} style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"16px 14px",cursor:"pointer",textAlign:"left",color:T.text,minHeight:90,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-15,right:-15,width:60,height:60,borderRadius:"50%",background:"rgba(255,255,255,0.03)"}}/>
              <div style={{fontSize:22,marginBottom:10,color:T.textSub,opacity:0.6}}>{p.icon}</div>
              <div style={{fontSize:14,fontWeight:700,color:T.text}}>{p.label}</div>
              <div style={{fontSize:11,color:T.textDim,marginTop:3}}>{p.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 14px 0"}}>
        {day?(
          <button onClick={closeDay} style={{width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:14,color:T.text,fontSize:14,fontWeight:750,cursor:"pointer"}}>
            Günü Kapat
          </button>
        ):(
          <button onClick={openDay} style={{width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:14,color:T.text,fontSize:14,fontWeight:750,cursor:"pointer"}}>
            Günü Başlat
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── TABLES ─── */
function TablesScreen({tables,customers=[],lurkPlusMembers=[],setTbl,setCustomers,setV,setSel,msg}){
  const[showNew,setShowNew]=useState(false);
  const[selectedCustomerId,setSelectedCustomerId]=useState("");
  const[customerQuery,setCustomerQuery]=useState("");
  const[showAll,setShowAll]=useState(true);
  const[delId,setDelId]=useState(null);
  const nameRef=useRef(null);
  const openT=tables.filter(t=>t.s==="o");
  const displayed=showAll?tables:openT;

  function addTable(){
    const selectedMember=selectedCustomerId.startsWith("lurk:")?lurkPlusMembers.find(m=>m.id===selectedCustomerId.slice(5)):null;
    let selectedCustomer=customers.find(c=>c.id===selectedCustomerId);
    const typedName=(nameRef.current?nameRef.current.value:"").trim();
    const customerName=selectedMember?selectedMember.name:selectedCustomer?selectedCustomer.name:typedName;
    if(!customerName){msg("Kayıtlı müşteri seç veya yeni müşteri adını gir.");return;}
    if(!selectedMember&&!selectedCustomer){
      const normalized=customerName.toLocaleLowerCase("tr-TR");
      selectedCustomer=customers.find(c=>c.name.trim().toLocaleLowerCase("tr-TR")===normalized);
      if(!selectedCustomer){
        selectedCustomer={id:uid(),name:customerName,phone:"",createdAt:new Date().toISOString(),points:0,creditBalance:0};
        setCustomers(prev=>prev.some(c=>c.name.trim().toLocaleLowerCase("tr-TR")===normalized)?prev:[selectedCustomer,...prev]);
      }
    }
    const usedNumbers=tables.map(t=>/^Masa (\\d+)$/.exec(t.lbl||"")).filter(Boolean).map(m=>Number(m[1]));
    let number=1;
    while(usedNumbers.includes(number))number++;
    const id=uid();
    setTbl(p=>[...p,{id,lbl:"Masa "+number,s:"free",order:[],g:customerName,customerId:selectedCustomer?.id||null,lurkPlusId:selectedMember?.id||null}]);
    if(nameRef.current)nameRef.current.value="";
    setSelectedCustomerId("");setCustomerQuery("");
    setShowNew(false);
    setSel(id);
    setV("order");
  }

  return(
    <div className="lurk-screen lurk-tables-screen">
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{fontSize:23,fontWeight:850,letterSpacing:"-.7px",flex:1}}>Masalar</div>
        <button onClick={()=>setShowAll(p=>!p)} style={{background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",color:T.textSub,fontWeight:600}}>{showAll?"Açıklar":"Tümü"}</button>
        <button onClick={()=>setShowNew(true)} style={{background:"#34C759",border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",color:"#fff",fontWeight:700}}>+ Masa</button>
      </div>

      <div style={{padding:"14px"}}>
        {displayed.length===0&&(
          <div style={{textAlign:"center",padding:"40px 20px",fontSize:13,color:T.textSub}}>
            {showAll?"Henüz masa yok":"Açık masa yok"}
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {displayed.map(t=>{
            const total=t.order.reduce((s,o)=>s+o.price*o.qty,0);
            const isOpen=t.s==="o";
            return(
              <div key={t.id} style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"16px 14px",position:"relative",overflow:"hidden"}}>
                
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{fontSize:14,fontWeight:700,color:T.text}}>{t.g||t.lbl}</div>
                  <button onClick={()=>setDelId(t.id)} style={{background:"none",border:"none",cursor:"pointer",color:T.textDim,fontSize:16,padding:"0 0 0 8px",lineHeight:1}}>×</button>
                </div>
                
                <div style={{fontSize:12,color:isOpen?T.textSub:T.textDim,marginBottom:12}}>
                  {isOpen?fm(total):"Boş"}
                </div>
                <button onClick={()=>{setSel(t.id);setV("order");}} style={{width:"100%",padding:"9px",background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,color:T.textSub,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  {isOpen?"Siparişe Gir →":"Aç →"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {showNew&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:6,color:T.text}}>Yeni Adisyon</div>
          <div style={{fontSize:12,color:T.textSub,marginBottom:14}}>Kayıtlı müşterini seç veya yeni bir isim gir.</div>
          {(customers.length>0||lurkPlusMembers.length>0)&&<>
            <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Kayıtlı müşteri veya LURK+ üyesi ara</label>
            <input value={customerQuery} onChange={e=>{setCustomerQuery(e.target.value);setSelectedCustomerId("");if(nameRef.current)nameRef.current.value="";}} placeholder="Müşteri ismi yaz..." style={{width:"100%",padding:"11px 12px",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,fontSize:14,boxSizing:"border-box",marginBottom:8,background:"rgba(255,255,255,.06)",color:T.text}}/>
            <div style={{maxHeight:135,overflowY:"auto",marginBottom:12}}>
              {customers.filter(c=>c.name.toLocaleLowerCase("tr-TR").includes(customerQuery.trim().toLocaleLowerCase("tr-TR"))).map(c=><button key={"customer:"+c.id} onClick={()=>{setSelectedCustomerId(c.id);setCustomerQuery(c.name);if(nameRef.current)nameRef.current.value="";}} style={{display:"block",width:"100%",padding:"10px 12px",marginBottom:5,textAlign:"left",background:selectedCustomerId===c.id?"rgba(52,199,89,.15)":T.bg2,color:selectedCustomerId===c.id?T.accentL:T.text,border:"1px solid "+(selectedCustomerId===c.id?"rgba(52,199,89,.4)":"rgba(255,255,255,.08)"),borderRadius:9,cursor:"pointer"}}>{c.name} · Müşteri</button>)}
              {lurkPlusMembers.filter(m=>m.name.toLocaleLowerCase("tr-TR").includes(customerQuery.trim().toLocaleLowerCase("tr-TR"))).map(m=><button key={"lurk:"+m.id} onClick={()=>{setSelectedCustomerId("lurk:"+m.id);setCustomerQuery(m.name);if(nameRef.current)nameRef.current.value="";}} style={{display:"block",width:"100%",padding:"10px 12px",marginBottom:5,textAlign:"left",background:selectedCustomerId==="lurk:"+m.id?"rgba(52,199,89,.15)":T.bg2,color:selectedCustomerId==="lurk:"+m.id?T.accentL:T.text,border:"1px solid "+(selectedCustomerId==="lurk:"+m.id?"rgba(52,199,89,.4)":"rgba(255,255,255,.08)"),borderRadius:9,cursor:"pointer"}}>{m.name} · LURK+ · {fm(m.balance)}</button>)}
              {customers.filter(c=>c.name.toLocaleLowerCase("tr-TR").includes(customerQuery.trim().toLocaleLowerCase("tr-TR"))).length===0&&lurkPlusMembers.filter(m=>m.name.toLocaleLowerCase("tr-TR").includes(customerQuery.trim().toLocaleLowerCase("tr-TR"))).length===0&&<div style={{fontSize:12,color:T.textSub,padding:8}}>Eşleşen kayıt yok. Yeni isim girebilirsin.</div>}
            </div>
          </>}
          <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Yeni müşteri adı</label>
          <input ref={nameRef} placeholder="Yeni müşteri adı"
            onChange={()=>{setSelectedCustomerId("");setCustomerQuery("");}}
            onKeyDown={e=>{if(e.key==="Enter")addTable();}}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <button onClick={addTable}
            style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.3)"}}>
            Müşteriyi Seç ve Siparişe Geç
          </button>
          <button onClick={()=>{setShowNew(false);setSelectedCustomerId("");setCustomerQuery("");}}
            style={{width:"100%",padding:"11px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>
            İptal
          </button>
        </Modal>
      )}
      {delId&&<Confirm title="Masayı Sil" msg="Bu masa silinecek." onOk={()=>{const target=tables.find(t=>t.id===delId);if(target&&(target.s==="o"||(Array.isArray(target.order)&&target.order.length>0))){setDelId(null);msg("Bu masada açık sipariş var. Siparişi kapatmadan masayı silemezsin.");return;}setTbl(p=>p.filter(t=>t.id!==delId));setDelId(null);msg("Masa silindi.");}} onCancel={()=>setDelId(null)}/>}
    </div>
  );
}

/* ─── ORDER ─── */
function OrderScreen({table,tables,menu,cats,customers,lurkPlusMembers=[],setTableCustomer,addItem,chQ,pay,moveTableOrder,setTbl,setV,setSel}){
  const[showMenu,setShowMenu]=useState(table.order.length===0);
  const[selCat,setSelCat]=useState(cats[0]||"");
  const[showPay,setShowPay]=useState(false);
  const[showName,setShowName]=useState(table.order.length===0&&!table.g);
  const[showFis,setShowFis]=useState(false);
  const[showMove,setShowMove]=useState(false);
  const[moveSelections,setMoveSelections]=useState({});
  const[name,setName]=useState(table.g||"");
  const[disc,setDisc]=useState("");
  const[search,setSearch]=useState("");
  const[flash,setFlash]=useState(null);
  const[pt,setPt]=useState("cash");
  const[splitMode,setSplitMode]=useState(false);
  const[partialMode,setPartialMode]=useState(false);
  const[partialAmount,setPartialAmount]=useState("");
  const[cashPart,setCashPart]=useState("");
  const[cardPart,setCardPart]=useState("");
  const sub=table.order.reduce((s,o)=>s+o.price*o.qty,0);
  const previousPaid=(Array.isArray(table.partialPayments)?table.partialPayments:[]).reduce((sum,p)=>sum+(Number(p.amount)||0),0);
  const discVal=Math.min(Math.max(0,sub-previousPaid),Math.max(0,parseFloat(disc)||0));
  const total=Math.max(0,Math.round((sub-previousPaid-discVal)*100)/100);
  const paymentTarget=partialMode?Math.min(total,Math.max(0,parseFloat(partialAmount)||0)):total;
  const itemCount=table.order.reduce((s,o)=>s+o.qty,0);

  function handleAdd(item){
    addItem(table.id,item);
    setFlash(item.id);
    setTimeout(()=>setFlash(null),400);
  }

  const grouped=table.order;

  return(
    <div className="lurk-screen lurk-order-screen" style={{display:"flex",flexDirection:"column",height:"100dvh",maxHeight:"100dvh",minHeight:0,overflow:"hidden",background:T.bg}}>
      {/* Top bar */}
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"10px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <button onClick={()=>{setSel(null);setV("tables");}} style={{background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"6px 12px",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600}}>← Masalar</button>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:15,color:T.text}}>{table.lbl}</div>
          {table.g&&<div style={{fontSize:11,color:T.accentL,fontWeight:600}}>{table.g}</div>}
        </div>
        <button onClick={()=>setShowName(true)} style={{background:"rgba(255,255,255,0.05)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,cursor:"pointer",color:table.g?T.accentL:T.textSub}}>{table.g||"+ İsim"}</button>
      </div>

      {/* SİPARİŞ GÖRÜNÜMÜ */}
      {!showMenu&&(
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minHeight:0}}>
          <div style={{flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",padding:"8px 10px"}}>
            {table.order.length===0
              ?<div style={{textAlign:"center",padding:"60px 20px",color:T.textDim}}>
                  <div style={{fontSize:36,marginBottom:12}}>☕</div>
                  <div style={{fontSize:14,fontWeight:600,color:T.textSub}}>Henüz sipariş yok</div>
                </div>
              :grouped.map((item,index)=>(
                <div key={item.oid||item.id} style={{background:index%2===0?"rgba(25,48,34,0.62)":"rgba(31,35,36,0.78)",borderRadius:10,padding:"7px 9px",marginBottom:4,border:"0.5px solid "+(index%2===0?"rgba(72,130,88,0.20)":"rgba(255,255,255,0.08)")}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,marginBottom:5}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:12,fontWeight:750,color:T.text,lineHeight:1.2,overflowWrap:"anywhere"}}>{item.name}</div>
                      <div style={{fontSize:9,color:T.textDim,marginTop:2}}>{item.addedAt?new Date(item.addedAt).toLocaleString("tr-TR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"Eklenme saati kayıtlı değil"}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:9,color:T.textSub,whiteSpace:"nowrap"}}>{fm(item.price)} × {item.qty}</div>
                      <div style={{fontSize:12,color:T.accentL,fontWeight:800,marginTop:1,whiteSpace:"nowrap"}}>{fm(item.price*item.qty)}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <button aria-label={item.name+" azalt"} onClick={()=>chQ(table.id,item.oid||String(item.id),-1)} style={{flex:1,height:26,borderRadius:7,border:"0.5px solid rgba(255,59,48,0.3)",background:"rgba(255,59,48,0.08)",cursor:"pointer",fontSize:18,color:T.danger,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                    <span style={{minWidth:20,textAlign:"center",fontWeight:800,fontSize:13,color:T.text}}>{item.qty}</span>
                    <button aria-label={item.name+" artır"} onClick={()=>addItem(table.id,{id:item.id,name:item.name,price:item.price,cat:item.cat,on:item.on})} style={{flex:1,height:32,borderRadius:8,border:"0.5px solid rgba(52,199,89,0.3)",background:"rgba(52,199,89,0.12)",cursor:"pointer",fontSize:18,color:T.accentL,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Alt bar */}
          <div style={{flexShrink:0,padding:"8px 10px max(12px, env(safe-area-inset-bottom))",borderTop:"0.5px solid rgba(255,255,255,0.08)",background:"rgba(13,13,13,0.97)",backdropFilter:"blur(20px)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:14,color:T.textSub,fontWeight:600}}>Toplam</span>
              <span style={{fontSize:"clamp(20px,5vw,24px)",fontWeight:800,color:T.accentL,letterSpacing:"-0.5px"}}>{fm(Math.max(0,sub-previousPaid))}</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowMenu(true)} style={{flex:1,padding:"13px",background:T.bg3,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.text,fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Sipariş Ekle</button>
              <button onClick={()=>setShowMove(true)} disabled={table.order.length===0||tables.filter(t=>t.id!==table.id).length===0} style={{flex:1,padding:"13px",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:table.order.length===0?T.textDim:T.textSub,fontWeight:600,fontSize:12,cursor:table.order.length===0?"not-allowed":"pointer"}}>⇄ Taşı</button>
              <button onClick={()=>setShowFis(true)} style={{flex:1,padding:"13px",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.textSub,fontWeight:600,fontSize:13,cursor:"pointer"}}>Fiş</button>
              <button onClick={()=>setShowPay(true)} disabled={table.order.length===0} style={{flex:2,padding:"13px",background:table.order.length===0?T.bg3:"linear-gradient(135deg,#34C759,#248A3D)",color:table.order.length===0?T.textDim:"#fff",border:"none",borderRadius:12,fontWeight:800,fontSize:14,cursor:table.order.length===0?"not-allowed":"pointer",boxShadow:table.order.length>0?"0 4px 16px rgba(52,199,89,0.35)":"none"}}>Ödeme Al ↑</button>
            </div>
          </div>
        </div>
      )}

      {/* MENÜ GÖRÜNÜMÜ */}
      {showMenu&&(
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          {/* Sol: dikey kategori */}
          <div style={{width:72,background:"rgba(255,255,255,0.02)",borderRight:"0.5px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",overflowY:"auto",flexShrink:0}}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setSelCat(c)} style={{padding:"14px 4px",border:"none",background:selCat===c?"rgba(52,199,89,0.12)":"transparent",borderLeft:"3px solid "+(selCat===c?T.accent:"transparent"),color:selCat===c?T.accent:T.textSub,fontSize:11,fontWeight:selCat===c?700:500,cursor:"pointer",textAlign:"center",lineHeight:1.3,flexShrink:0}}>{c}</button>
            ))}
          </div>
          {/* Sağ: ürün grid */}
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <div style={{flex:1,overflowY:"auto",padding:"10px 10px "+(itemCount>0?"80px":"20px")}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ürün ara…" aria-label="Menüde ürün ara" style={{width:"100%",boxSizing:"border-box",padding:"11px 13px",marginBottom:10,borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.04)",color:T.text,fontSize:13,outline:"none"}} />
              <div className="lurk-product-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
                {menu.filter(m=>m.on&&(search.trim()?m.name.toLocaleLowerCase("tr-TR").includes(search.trim().toLocaleLowerCase("tr-TR")):m.cat===selCat)).map(item=>{
                  const inCart=table.order.filter(o=>o.id===item.id).reduce((sum,o)=>sum+o.qty,0);
                  const isFlash=flash===item.id;
                  return(
                    <button key={item.id} onClick={()=>handleAdd(item)} style={{background:isFlash?"rgba(52,199,89,0.25)":inCart>0?"rgba(52,199,89,0.1)":T.bg2,border:"0.5px solid "+(inCart>0?"rgba(52,199,89,0.35)":"rgba(255,255,255,0.08)"),borderRadius:12,padding:"12px 10px",cursor:"pointer",textAlign:"left",color:T.text,position:"relative",transition:"background 0.15s",outline:"none"}}>
                      {inCart>0&&<span style={{position:"absolute",top:6,right:8,background:T.accent,color:"#fff",borderRadius:20,fontSize:10,fontWeight:800,padding:"1px 6px"}}>×{inCart}</span>}
                      {isFlash&&<div style={{position:"absolute",inset:0,borderRadius:12,border:"2px solid #34C759",pointerEvents:"none"}}/>}
                      <div style={{fontSize:11,fontWeight:700,marginBottom:5,paddingRight:inCart>0?28:0,lineHeight:1.3,color:T.text}}>{item.name}</div>
                      <div style={{fontSize:14,fontWeight:800,color:inCart>0?T.accentL:T.textDim}}>{fm(item.price)}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            {itemCount>0&&(
              <div style={{flexShrink:0,padding:"10px 12px 20px",borderTop:"0.5px solid rgba(255,255,255,0.08)",background:"rgba(13,13,13,0.97)",backdropFilter:"blur(20px)"}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <button onClick={()=>setShowMenu(false)} style={{flex:1,background:T.bg3,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"11px 14px",cursor:"pointer",textAlign:"left",color:T.text,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{background:T.accent,color:"#fff",borderRadius:20,fontSize:11,fontWeight:800,padding:"2px 8px",flexShrink:0}}>{itemCount}</span>
                    <span style={{fontSize:12,color:T.textSub,flex:1}}>Siparişe dön →</span>
                  </button>
                  <button onClick={()=>setShowPay(true)} style={{background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,padding:"11px 18px",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.35)",whiteSpace:"nowrap",flexShrink:0}}>{fm(sub)}</button>
                </div>
              </div>
            )}
            {itemCount===0&&(
              <div style={{flexShrink:0,padding:"10px 12px 20px",borderTop:"0.5px solid rgba(255,255,255,0.08)"}}>
                <button onClick={()=>setShowMenu(false)} style={{width:"100%",padding:"13px",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.textSub,fontWeight:600,fontSize:13,cursor:"pointer"}}>← Siparişe Dön</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showMove&&(
        <Modal>
          <div style={{fontWeight:800,fontSize:18,color:T.text,marginBottom:6}}>Ürünleri Başka Masaya Taşı</div>
          <div style={{fontSize:12,color:T.textSub,lineHeight:1.5,marginBottom:12}}>Taşınacak ürünleri ve adetlerini seç. Seçilmeyen ürünler bu masada kalır.</div>
          <div style={{display:"flex",flexDirection:"column",gap:7,maxHeight:"32vh",overflowY:"auto",marginBottom:14}}>
            {table.order.map(line=>{
              const key=line.oid||String(line.id);
              const qty=Math.max(0,Math.min(line.qty,Number(moveSelections[key]??0)));
              return <div key={key} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 10px",background:T.bg2,border:"1px solid rgba(255,255,255,.08)",borderRadius:10}}>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:700,color:T.text}}>{line.name}</div><div style={{fontSize:10,color:T.textSub}}>{fm(line.price)} · mevcut {line.qty}</div></div>
                <button onClick={()=>setMoveSelections(p=>({...p,[key]:Math.max(0,Number(p[key]??0)-1)}))} style={{width:30,height:30,borderRadius:8,border:"1px solid rgba(255,255,255,.12)",background:"transparent",color:T.text,fontSize:18}}>−</button>
                <span style={{minWidth:18,textAlign:"center",fontSize:13,fontWeight:800,color:T.accentL}}>{qty}</span>
                <button onClick={()=>setMoveSelections(p=>({...p,[key]:Math.min(line.qty,Number(p[key]??0)+1)}))} style={{width:30,height:30,borderRadius:8,border:"1px solid rgba(52,199,89,.25)",background:"rgba(52,199,89,.1)",color:T.accentL,fontSize:18}}>+</button>
              </div>;
            })}
          </div>
          <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:8}}>Hedef masa</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:"24vh",overflowY:"auto"}}>
            {tables.filter(t=>t.id!==table.id).map(target=>{
              const targetTotal=(target.order||[]).reduce((sum,item)=>sum+item.price*item.qty,0);
              const selectedQty=table.order.reduce((sum,line)=>sum+Math.max(0,Math.min(line.qty,Number(moveSelections[line.oid||String(line.id)]??0))),0);
              return <button key={target.id} onClick={()=>{moveTableOrder(table.id,target.id,table.order.map(line=>({key:line.oid||String(line.id),qty:Math.max(0,Math.min(line.qty,Number(moveSelections[line.oid||String(line.id)]??0)))})));setMoveSelections({});setShowMove(false);}} style={{width:"100%",padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,textAlign:"left",background:target.s==="o"?"rgba(52,199,89,.1)":T.bg2,border:"1px solid "+(target.s==="o"?"rgba(52,199,89,.3)":"rgba(255,255,255,.1)"),borderRadius:11,color:T.text,cursor:"pointer",opacity:selectedQty?1:.55}}>
                <span><b style={{display:"block",fontSize:14}}>{target.lbl}</b><span style={{fontSize:11,color:T.textSub}}>{target.s==="o"?"Açık masa · "+fm(targetTotal):"Boş masa"}</span></span>
                <span style={{color:T.accentL,fontSize:18}}>→</span>
              </button>;
            })}
          </div>
          <button onClick={()=>{setMoveSelections({});setShowMove(false);}} style={{width:"100%",padding:12,marginTop:12,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Vazgeç</button>
        </Modal>
      )}

      {/* Fiş modal */}
      {showFis&&(
        <Modal>
          <div style={{textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.5px",color:T.text}}>LURK.</div>
            <div style={{fontSize:11,color:T.textSub,marginTop:2}}>Beşiktaş, İstanbul</div>
          </div>
          <div style={{borderTop:"1px dashed rgba(255,255,255,0.1)",marginBottom:12}}/>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,color:T.textSub}}>{table.lbl}</div>
            {table.g&&<div style={{fontSize:14,fontWeight:600,marginTop:1,color:T.text}}>{table.g}</div>}
            <div style={{fontSize:11,color:T.textSub,marginTop:2}}>{new Date().toLocaleDateString("tr-TR",{day:"numeric",month:"long"})} · {ft(new Date().toISOString())}</div>
          </div>
          <div style={{borderTop:"1px dashed rgba(255,255,255,0.1)",marginBottom:8}}/>
          {grouped.map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"0.5px solid rgba(255,255,255,0.05)"}}>
              <div>
                <div style={{fontSize:13,color:T.text}}>{item.name}</div>
                <div style={{fontSize:11,color:T.textSub,marginTop:1}}>{item.qty} × {fm(item.price)}</div>
              </div>
              <div style={{fontSize:13,fontWeight:600,color:T.text}}>{fm(item.price*item.qty)}</div>
            </div>
          ))}
          <div style={{borderTop:"1px dashed rgba(255,255,255,0.1)",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:15,fontWeight:700,color:T.text}}>Toplam</span>
            <span style={{fontSize:15,fontWeight:800,color:T.accentL}}>{fm(sub)}</span>
          </div>
          <div style={{textAlign:"center",marginTop:16,fontSize:11,color:T.textDim}}>Teşekkür ederiz ✦</div>
          <button onClick={()=>setShowFis(false)} style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,color:T.textSub,fontSize:13,cursor:"pointer",marginTop:16}}>Kapat</button>
        </Modal>
      )}

      {/* İsim modal */}
      {showName&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:6,color:T.text}}>Müşteri Seçimi</div>
          <div style={{fontSize:12,color:T.textSub,marginBottom:14}}>Kayıtlı müşteriyi seç veya yeni müşteri adını gir.</div>
          {lurkPlusMembers.length>0&&<div style={{marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:800,color:T.accentL,marginBottom:6}}>LURK+ ÜYELERİ</div>
            <div style={{maxHeight:125,overflowY:"auto"}}>{lurkPlusMembers.map(m=><button key={m.id} onClick={()=>{setTableCustomer(table.id,{...m,lurkPlus:true});setName(m.name);setShowName(false);}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,width:"100%",padding:11,marginBottom:5,textAlign:"left",background:table.lurkPlusId===m.id?"rgba(52,199,89,.13)":T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.08)",borderRadius:9,cursor:"pointer"}}><span>{m.name}</span><span style={{fontSize:11,color:T.accentL,whiteSpace:"nowrap"}}>{fm(m.balance)}</span></button>)}</div>
          </div>}
          {customers?.length>0&&<div style={{maxHeight:150,overflowY:"auto",marginBottom:12}}>{customers.map(c=><button key={c.id} onClick={()=>{setTableCustomer(table.id,c);setName(c.name);setShowName(false);}} style={{display:"block",width:"100%",padding:11,marginBottom:5,textAlign:"left",background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.08)",borderRadius:9,cursor:"pointer"}}>{c.name}<span style={{display:"block",fontSize:11,color:T.textSub,marginTop:3}}>{c.phone||"Telefon yok"}</span></button>)}</div>}
          <input autoFocus placeholder="Yeni müşteri adı (zorunlu)" value={name} onChange={e=>setName(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&name.trim()){setTableCustomer(table.id,name.trim());setShowName(false);}}}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <button disabled={!name.trim()} onClick={()=>{if(!name.trim())return;setTableCustomer(table.id,name.trim());setShowName(false);}} style={{width:"100%",padding:"14px",background:name.trim()?"linear-gradient(135deg,#34C759,#248A3D)":T.bg3,border:"none",borderRadius:12,color:name.trim()?"#fff":T.textDim,fontSize:15,fontWeight:700,cursor:name.trim()?"pointer":"not-allowed"}}>Müşteriyi Onayla</button>
        </Modal>
      )}

      {/* Ödeme modal */}
      {showPay&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:4,color:T.text}}>Ödeme Al</div>
          {previousPaid>0&&<div style={{fontSize:11,color:T.accentL,marginBottom:8}}>Önceden tahsil edilen: {fm(previousPaid)}</div>}
          <div style={{fontSize:12,color:T.textSub,marginBottom:16}}>{table.lbl}{table.g?" · "+table.g:""}</div>
          <div style={{background:T.bg2,borderRadius:12,padding:"12px 14px",marginBottom:14,border:"0.5px solid rgba(255,255,255,0.08)"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:8}}><span>Ara toplam</span><span>{fm(sub)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:8}}><span>İndirim</span><span style={{color:discVal>0?T.accentL:T.textSub}}>−{fm(discVal)}</span></div>
            <div style={{height:1,background:"rgba(255,255,255,0.09)",marginBottom:8}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:13,fontWeight:700,color:T.text}}>Ödenecek</span><span style={{fontSize:25,fontWeight:800,color:T.accentL,letterSpacing:"-1px"}}>{fm(total)}</span></div>
          </div>
          <input type="number" min="0" max={sub} placeholder="İndirim (TL)" value={disc} disabled={partialMode||previousPaid>0} onChange={e=>setDisc(e.target.value)}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:8,background:"rgba(255,255,255,0.07)",color:T.text,opacity:partialMode||previousPaid>0?0.5:1}}/>
          {!table.lurkPlusId&&pt!=="credit"&&<button onClick={()=>{setPartialMode(v=>!v);setPartialAmount("");setSplitMode(false);setDisc("");}} style={{width:"100%",padding:10,marginBottom:10,background:partialMode?"rgba(52,199,89,.15)":T.bg2,border:"1px solid "+(partialMode?"rgba(52,199,89,.4)":"rgba(255,255,255,.1)"),borderRadius:10,color:partialMode?T.accentL:T.textSub,fontWeight:700,fontSize:12}}>{partialMode?"✓ Kısmi ödeme açık":"＋ Kısmi ödeme yap"}</button>}
          {partialMode&&<input type="number" min="0.01" max={total} value={partialAmount} onChange={e=>{setPartialAmount(e.target.value);setCashPart(e.target.value);setCardPart("");}} placeholder={"Şimdi alınacak tutar · kalan "+fm(total)} style={{width:"100%",padding:"12px 14px",border:"1px solid rgba(52,199,89,.35)",borderRadius:10,fontSize:16,boxSizing:"border-box",marginBottom:12,background:"rgba(255,255,255,.06)",color:T.text}}/>}
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {["cash","card","credit"].map(p=>(
              <button key={p} onClick={()=>{setPt(p);setSplitMode(false);if(p==="credit")setPartialMode(false);}} style={{flex:1,padding:"12px",border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",background:!splitMode&&pt===p?"rgba(52,199,89,0.15)":"rgba(255,255,255,0.05)",color:!splitMode&&pt===p?T.accentL:T.textSub,borderColor:!splitMode&&pt===p?"rgba(52,199,89,0.4)":"rgba(255,255,255,0.12)"}}>
                {p==="cash"?"Nakit":p==="card"?"Kart":"Veresiye"}
              </button>
            ))}
          </div>
          <button onClick={()=>{setSplitMode(v=>{if(!v)setPt("cash");return !v;});setCashPart(partialMode?partialAmount:"");setCardPart("");}} style={{width:"100%",padding:"9px",marginBottom:12,background:splitMode?"rgba(52,199,89,0.14)":"rgba(255,255,255,0.05)",border:"0.5px solid "+(splitMode?"rgba(52,199,89,0.4)":"rgba(255,255,255,0.12)"),borderRadius:10,color:splitMode?T.accentL:T.textSub,fontSize:12,fontWeight:700,cursor:"pointer"}}>{splitMode?"Çoklu ödemeyi kapat":"Nakit + kart olarak böl"}</button>
          {splitMode&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            <label style={{fontSize:11,color:T.textSub}}>Nakit (TL)<input type="number" min="0" max={total} value={cashPart} onChange={e=>{setCashPart(e.target.value);setCardPart(String(Math.max(0,Math.round(((partialMode?paymentTarget:total)-(parseFloat(e.target.value)||0))*100)/100)));}} placeholder="0,00" style={{width:"100%",marginTop:5,padding:"10px",background:T.bg2,color:T.text,border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:9}}/></label>
            <label style={{fontSize:11,color:T.textSub}}>Kart (TL)<input type="number" min="0" max={total} value={cardPart} onChange={e=>setCardPart(e.target.value)} placeholder="0,00" style={{width:"100%",marginTop:5,padding:"10px",background:T.bg2,color:T.text,border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:9}}/></label>
          </div>}
          {splitMode&&<div style={{fontSize:11,color:Math.abs((parseFloat(cashPart)||0)+(parseFloat(cardPart)||0)-total)<0.009?T.accentL:"#FF6B6B",marginBottom:12}}>Ödeme toplamı: {fm((parseFloat(cashPart)||0)+(parseFloat(cardPart)||0))} / {fm(total)}</div>}
          <button onClick={()=>{const target=partialMode?paymentTarget:total;const payments=splitMode?[{method:"cash",amount:parseFloat(cashPart)||0},{method:"card",amount:parseFloat(cardPart)||0}]:[{method:pt,amount:target}];if(partialMode&&(!(target>0)||target>total+0.009)){msg("Kısmi ödeme tutarı kalan borçtan büyük olamaz.");return;}if(splitMode&&Math.abs((parseFloat(cashPart)||0)+(parseFloat(cardPart)||0)-target)>0.009){msg("Nakit ve kart toplamı tahsil edilecek tutarla eşleşmeli.");return;}pay(table.id,pt,discVal,pt==="credit"?[{method:"credit",amount:total}]:payments,partialMode);if(pt==="credit"&&table.customerId)setShowPay(false);else if(partialMode&&target<total-0.009)setShowPay(false);}} style={{width:"100%",padding:"15px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.35)"}}>{partialMode?"Kısmi Tahsil Et · "+fm(paymentTarget):"Tahsil Et · "+fm(total)}</button>
          <button onClick={()=>setShowPay(false)} style={{width:"100%",padding:"11px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>Vazgeç</button>
        </Modal>
      )}
    </div>
  );
}

/* ─── MONTH REVIEW ─── */
function MonthReviewScreen({orders,tables,setV}){
  const now=new Date();
  const [selectedMonth,setSelectedMonth]=useState(thisMonth());
  const months=[...new Set([thisMonth(),...orders.map(o=>(o.date||"").slice(0,7)).filter(m=>/^\d{4}-\d{2}$/.test(m))])].sort((a,b)=>b.localeCompare(a));
  const [year,setYear]=useState(String(now.getFullYear()));
  const monthLabel=(m)=>{const [y,mm]=m.split("-").map(Number);return new Date(y,mm-1,1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"});};
  const monthOrders=orders.filter(o=>(o.date||"").slice(0,7)===selectedMonth);
  const openOrders=tables.flatMap(t=>(t.order||[]).length?[{date:tod(),total:(t.order||[]).reduce((s,i)=>s+(Number(i.price)||0)*(Number(i.qty)||0),0),items:t.order}]:[]);
  const closedRevenue=monthOrders.reduce((s,o)=>s+(Number(o.total)||0),0);
  const openRevenue=selectedMonth===thisMonth()?openOrders.reduce((s,o)=>s+o.total,0):0;
  const revenue=closedRevenue+openRevenue;
  const productTotals={};
  [...monthOrders,...(selectedMonth===thisMonth()?openOrders:[])].forEach(o=>(o.items||[]).forEach(item=>{
    const key=(item.name||"Ürün").trim();
    if(!productTotals[key])productTotals[key]={name:key,revenue:0,qty:0};
    productTotals[key].revenue+=(Number(item.price)||0)*(Number(item.qty)||0);
    productTotals[key].qty+=Number(item.qty)||0;
  }));
  const topProducts=Object.values(productTotals).sort((a,b)=>b.revenue-a.revenue).slice(0,5);
  const yearRevenue=orders.filter(o=>(o.date||"").startsWith(year+"-")).reduce((s,o)=>s+(Number(o.total)||0),0);
  const yearOptions=[...new Set([String(now.getFullYear()),...orders.map(o=>(o.date||"").slice(0,4)).filter(y=>/^\d{4}$/.test(y))])].sort((a,b)=>b.localeCompare(a));
  return(
    <div className="lurk-screen lurk-reports-screen">
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:19,fontWeight:800,letterSpacing:"-0.5px",flex:1}}>Bu ay nasıl geçti?</div>
      </div>
      <div style={{padding:14}}>
        <label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:6}}>Ay seç</label>
        <select value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)} style={{width:"100%",padding:12,marginBottom:14,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:10,textTransform:"capitalize"}}>
          {months.map(m=><option key={m} value={m}>{monthLabel(m)}</option>)}
        </select>
        <div style={{background:T.bg2,border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:16,marginBottom:16}}>
          <div style={{fontSize:12,color:T.textSub,textTransform:"capitalize"}}>{monthLabel(selectedMonth)} cirosu</div>
          <div style={{fontSize:28,fontWeight:850,color:T.accentL,marginTop:6}}>{fm(revenue)}</div>
          <div style={{fontSize:11,color:T.textDim,marginTop:6}}>Kapanan adisyonlar{selectedMonth===thisMonth()?" + açık masalardaki mevcut ürünler":""}</div>
        </div>
        <div style={{background:T.bg2,border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:16,marginBottom:16}}>
          <div style={{fontSize:15,fontWeight:800,color:T.text,marginBottom:4}}>Yıllık ciro</div>
          <label style={{display:"block",fontSize:11,color:T.textSub,margin:"10px 0 6px"}}>Yıl seç</label>
          <select value={year} onChange={e=>setYear(e.target.value)} style={{width:"100%",padding:11,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:10}}>
            {yearOptions.map(y=><option key={y} value={y}>{y}</option>)}
          </select>
          <div style={{fontSize:24,fontWeight:800,color:T.accentL,marginTop:12}}>{fm(yearRevenue)}</div>
          <div style={{fontSize:10,color:T.textDim,marginTop:3}}>Seçilen yılın kapanmış adisyon cirosu</div>
        </div>
        <div style={{fontSize:15,fontWeight:800,color:T.text,marginBottom:4}}>En çok kazandıran 5 ürün</div>
        <div style={{fontSize:11,color:T.textSub,marginBottom:10}}>Adede göre değil, ürün satış tutarına göre sıralanır.</div>
        {topProducts.length?topProducts.map((p,i)=><div key={p.name} style={{display:"flex",alignItems:"center",gap:10,background:T.bg2,border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:13,marginBottom:8}}>
          <div style={{width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:9,background:"rgba(52,199,89,.12)",color:T.accentL,fontSize:13,fontWeight:800,flexShrink:0}}>{i+1}</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:T.text}}>{p.name}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>{p.qty} adet satıldı</div></div>
          <div style={{fontSize:13,fontWeight:800,color:T.accentL,textAlign:"right",whiteSpace:"nowrap"}}>{fm(p.revenue)}</div>
        </div>):<div style={{padding:20,textAlign:"center",background:T.bg2,borderRadius:12,color:T.textSub,fontSize:12}}>Bu ay için ürün satışı kaydı bulunamadı.</div>}
      </div>
    </div>
  );
}

/* ─── REPORTS ─── */
function ReportsScreen({orders,logs,creditEntries,setV}){
  const months=[...new Set([...orders.map(o=>o.date?o.date.slice(0,7):""),...logs.map(l=>l.date?l.date.slice(0,7):""),...creditEntries.map(e=>e.date?e.date.slice(0,7):"")].filter(Boolean))].sort((a,b)=>b.localeCompare(a));
  const now=thisMonth();
  const[sel,setSel]=useState(months[0]||now);
  const[exp,setExp]=useState(null);
  function ml(m){const[y,mo]=m.split("-");return new Date(y,parseInt(mo)-1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"});}
  function exportMonthCsv(){
    const headers=["Tarih","Masa","Müşteri","Ara toplam","İndirim","Toplam","Nakit","Kart","Veresiye","Ödeme türü","Ürünler"];
    const rows=mo.map(o=>[o.date,o.table||"",o.g||"",Number(o.subtotal??o.total)||0,Number(o.discount)||0,Number(o.total)||0,paymentAmount(o,"cash"),paymentAmount(o,"card"),o.pt==="credit"?(Number(o.total)||0):0,o.pt==="split"?"Nakit + Kart":o.pt==="cash"?"Nakit":o.pt==="card"?"Kart":o.pt==="credit"?"Veresiye":"Diğer",(o.items||[]).map(i=>i.name+" x"+i.qty).join("; ")]);
    const ledgerRows=creditEntries.filter(e=>(e.date||"").slice(0,7)===sel).map(e=>[(e.date||"").slice(0,10),"Veresiye defteri",e.customerName||"",0,0,0,e.type==="payment"&&e.method==="cash"?(Number(e.amount)||0):0,e.type==="payment"&&e.method==="card"?(Number(e.amount)||0):0,e.type==="debt"?(Number(e.amount)||0):0,e.type==="debt"?"Borç kaydı":"Tahsilat · "+(e.method==="cash"?"Nakit":e.method==="card"?"Kart":"Diğer"),e.note||""]);
    const csv=[headers,...rows,...ledgerRows].map(row=>row.map(v=>{const x=String(v??"");return '"'+x.replace(/"/g,'""')+'"';}).join(";")).join("\r\n");
    const blob=new Blob(["\uFEFF",csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="lurk-satis-"+sel+".csv";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  const ms=sel+"-01";
  const me=sel+"-"+String(new Date(parseInt(sel.slice(0,4)),parseInt(sel.slice(5,7)),0).getDate()).padStart(2,"0");
  const mo=orders.filter(o=>o.date&&o.date>=ms&&o.date<=me);
  const ml2=logs.filter(l=>l.date&&l.date>=ms&&l.date<=me);
  const totalInc=mo.reduce((s,o)=>s+o.total,0)||ml2.reduce((s,l)=>s+(l.inc||0),0);
  const monthLedger=creditEntries.filter(e=>(e.date||"").slice(0,7)===sel);
  const totalCash=mo.reduce((s,o)=>s+paymentAmount(o,"cash"),0)+monthLedger.filter(e=>e.type==="payment"&&e.method==="cash").reduce((s,e)=>s+(Number(e.amount)||0),0);
  const totalCard=mo.reduce((s,o)=>s+paymentAmount(o,"card"),0)+monthLedger.filter(e=>e.type==="payment"&&e.method==="card").reduce((s,e)=>s+(Number(e.amount)||0),0);
  const outstanding=creditEntries.reduce((sum,e)=>sum+(e.type==="debt"?1:-1)*(Number(e.amount)||0),0);
  const creditSales=mo.filter(o=>o.pt==="credit").reduce((sum,o)=>sum+(Number(o.total)||0),0);
  const dayMap={};
  mo.forEach(o=>{if(!dayMap[o.date])dayMap[o.date]={date:o.date,orders:[],inc:0};dayMap[o.date].orders.push(o);dayMap[o.date].inc+=o.total;});
  ml2.forEach(l=>{if(!dayMap[l.date])dayMap[l.date]={date:l.date,orders:[],inc:l.inc||0,log:l};else{if(!dayMap[l.date].inc)dayMap[l.date].inc=l.inc||0;dayMap[l.date].log=l;}});
  const days=Object.values(dayMap).sort((a,b)=>b.date.localeCompare(a.date));

  return(
    <div className="lurk-screen lurk-reports-screen">
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:23,fontWeight:850,letterSpacing:"-.7px",flex:1}}>Raporlar</div><button onClick={exportMonthCsv} style={{background:T.bg2,color:T.accentL,border:"1px solid rgba(255,255,255,.12)",borderRadius:10,padding:"9px 11px",fontSize:12,fontWeight:700,cursor:"pointer"}}>↓ CSV</button>
      </div>

      {/* Ay seçici */}
      <div style={{display:"flex",gap:6,padding:"12px 14px",overflowX:"auto",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
        {(months.length?months:[now]).map(m=>(
          <button key={m} onClick={()=>setSel(m)} style={{padding:"6px 14px",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",flexShrink:0,background:sel===m?"#34C759":"rgba(255,255,255,0.05)",color:sel===m?"#fff":T.textSub,borderColor:sel===m?"#34C759":"rgba(255,255,255,0.1)"}}>
            {ml(m)}
          </button>
        ))}
      </div>

      {/* Stat kartlar */}
      <div style={{padding:"14px",display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:8}}>
        {[
          {label:"Satış",val:fm(totalInc),color:T.accentL},
          {label:"Nakit tahsilat",val:fm(totalCash),color:T.text},
          {label:"Kart tahsilat",val:fm(totalCard),color:T.text},
          {label:"Açık veresiye",val:fm(Math.max(0,outstanding)),color:outstanding>0?T.warn:T.text},
        ].map((s,i)=>(
          <div key={i} style={{background:T.bg2,borderRadius:14,padding:"12px",border:"0.5px solid rgba(255,255,255,0.07)"}}>
            <div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>{s.label}</div>
            <div style={{fontSize:13,fontWeight:800,color:s.color,letterSpacing:"-0.3px"}}>{s.val.replace(" TL","")}</div>
            <div style={{fontSize:9,color:T.textDim,marginTop:2}}>TL</div>
          </div>
        ))}
      </div>

      {/* Günler */}
      <div style={{padding:"0 14px 14px"}}>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:10}}>Günler</div>
        {days.length===0&&<div style={{padding:"24px",textAlign:"center",fontSize:13,color:T.textSub,background:T.bg2,borderRadius:14}}>Bu ay kayıt yok</div>}
        {days.map(day=>{
          const isExp=exp===day.date;
          const log=day.log;
          return(
            <div key={day.date} style={{background:T.bg2,borderRadius:14,marginBottom:8,border:"0.5px solid rgba(255,255,255,0.07)",overflow:"hidden"}}>
              <div onClick={()=>setExp(isExp?null:day.date)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px",cursor:"pointer"}}>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:T.text}}>{new Date(day.date+"T12:00:00").toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</div>
                  <div style={{fontSize:11,color:T.textSub,marginTop:3}}>{log?ft(log.oa)+" – "+ft(log.ca)+" · ":""}{day.orders.filter(o=>!o.partialPayment).length||log?.count||0} adisyon</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:15,fontWeight:800,color:T.accentL}}>{fm(day.inc)}</div>
                  <div style={{fontSize:11,color:T.textDim,marginTop:2}}>{isExp?"▲":"▽"}</div>
                </div>
              </div>
              {isExp&&day.orders.filter(o=>!o.partialPayment).length>0&&day.orders.filter(o=>!o.partialPayment).map((o,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 20px",borderTop:"0.5px solid rgba(255,255,255,0.05)",background:"rgba(255,255,255,0.02)"}}>
                  <div>
                    <div style={{fontSize:13,color:T.text}}>{o.g||"—"}</div>
                    <div style={{fontSize:11,color:T.textSub,marginTop:1}}>{o.pt==="cash"?"Nakit":o.pt==="credit"?"Veresiye":o.pt==="split"?"Nakit + Kart":"Kart"}</div>
                  </div>
                  <div style={{fontSize:13,fontWeight:600,color:T.text}}>{fm(o.total)}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}


/* ─── PERSONAL FINANCE ─── */
const PERSONAL_DEBT_SEED=[
  {id:"beliz",group:"Kişisel",name:"Beliz",total:8000,note:"",payments:[],installments:[]},
  {id:"ryze",group:"Kişisel",name:"Ryze",total:2000,note:"3K deren'den",payments:[],installments:[]},
  {id:"ahmet-bakkal",group:"Kişisel",name:"Ahmet Abi Bakkal",total:1000,payments:[],installments:[]},
  {id:"vodafone",group:"Kişisel",name:"Vodafone",total:23856,note:"30 Ekim",payments:[],installments:[]},
  {id:"hepsiburada-limiti",group:"Kişisel",name:"Hepsiburada Limiti",total:6880,payments:[],installments:[]},
  {id:"hepsifinans",group:"Kişisel",name:"Hepsifinans",total:56500,note:"30 Ekim",payments:[],installments:[]},
  {id:"holdon",group:"Nicchia",name:"Holdon Coffee",total:7000,payments:[],installments:[]},
  {id:"mozaik",group:"Nicchia",name:"Mozaik İş Sağlığı",total:7000,payments:[],installments:[]},
  {id:"yemeksepeti",group:"Nicchia",name:"Yemeksepeti",total:3879,note:"2 Kasım",payments:[],installments:[]},
  {id:"kyk",group:"Nicchia",name:"KYK",total:9400,installments:[1,2,3,4].map(n=>({id:"kyk-"+n,label:n+". Taksit",amount:2350,due:"",paid:0})),payments:[]},
  {id:"ucuncuoglu",group:"Nicchia",name:"Üçüncüoğlu Emlak",total:130000,installments:Array.from({length:9},(_,i)=>({id:"uc-"+(i+1),label:(i+1)+". Taksit",amount:i===8?10000:15000,due:["2026-11-11","2026-12-01","2027-01-01","2027-02-01","2027-03-01","2027-04-01","2027-05-01","2027-06-01","2027-07-01"][i],paid:0})),payments:[]},
  {id:"heyz",group:"Nicchia",name:"Heyz Taksit",total:60000,installments:Array.from({length:6},(_,i)=>({id:"heyz-"+(i+1),label:(i+1)+". Taksit",amount:10000,due:["2026-11-10","2026-12-10","2027-01-10","2027-02-10","2027-03-10","2027-04-10"][i],paid:0})),payments:[]},
  {id:"fiddle",group:"Kişisel",name:"Taha Fiddle III Taksit",total:55000,note:"20.000 TL ödendi · 27 Ekim 2026",payments:[{id:"fiddle-paid-1",amount:20000,date:"2026-10-27",note:"Önceden ödenen"}],installments:[]},
  {id:"fiddle-tyres",group:"Kişisel",name:"Fiddle III · Lastikler",total:4000,note:"Tahmini",payments:[],installments:[]},
  {id:"fiddle-stop",group:"Kişisel",name:"Fiddle III · Ön stop lambası",total:200,note:"Tahmini",payments:[],installments:[]},
  {id:"fiddle-inspection",group:"Kişisel",name:"Fiddle III · Muayene",total:1500,note:"Tahmini",payments:[],installments:[]},
  {id:"fiddle-insurance",group:"Kişisel",name:"Fiddle III · Sigorta",total:3500,note:"Tahmini",payments:[],installments:[]},
  {id:"yildiz",group:"Kişisel",name:"Yıldız Sürücü Kursu",total:13000,payments:[],installments:[]},
  {id:"a2",group:"Kişisel",name:"A2 Sınav Ücreti",total:2000,payments:[],installments:[]},
  {id:"beliz-plan",group:"Kişisel",name:"Beliz Taksit",total:72000,note:"1. taksit tamamlandı; 2. taksitte 3.000 TL ödendi, 5.000 TL kaldı.",payments:[{id:"beliz-paid-1",amount:3000,date:"2026-10-27",note:"2. taksit için önceden ödenen",installmentId:"beliz-2"}],installments:[
    {id:"beliz-2",label:"2. Taksit",amount:8000,due:"2026-11-05",paid:3000},
    ...Array.from({length:8},(_,i)=>({id:"beliz-"+(i+3),label:(i+3)+". Taksit",amount:8000,due:["2026-12-05","2027-01-05","2027-02-05","2027-03-05","2027-04-05","2027-05-05","2027-06-05","2027-07-05"][i],paid:0}))
  ]},
  {id:"ruhsat",group:"Kişisel",name:"Annem Ruhsat Taksiti",total:119000,note:"14 taksit × 8.500 TL; ilk 3 taksit tamamlandı.",payments:[],installments:Array.from({length:14},(_,i)=>({id:"ruhsat-"+(i+1),label:(i+1)+". Taksit",amount:8500,due:"",paid:i<3?8500:0}))}
];
function PersonalFinanceScreen({debts,setDebts,setV,msg}){
  const [unlocked,setUnlocked]=useState(false);
  const [pin,setPin]=useState("");
  const [pinError,setPinError]=useState("");
  const [checking,setChecking]=useState(false);
  const [paymentFor,setPaymentFor]=useState(null);
  const [amount,setAmount]=useState("");
  const [note,setNote]=useState("");
  const [showHistory,setShowHistory]=useState(false);
  const [expanded,setExpanded]=useState({});
  const [showLurk,setShowLurk]=useState(false);
  const [showInstallments,setShowInstallments]=useState(false);
  const [showFiddle,setShowFiddle]=useState(false);
  const [filter,setFilter]=useState("Tümü");
  const [editingInstallment,setEditingInstallment]=useState(null);
  const [installmentTotal,setInstallmentTotal]=useState("");
  const [installmentAmount,setInstallmentAmount]=useState("");
  const [installmentCount,setInstallmentCount]=useState("");
  const [installmentStartDate,setInstallmentStartDate]=useState("");
  useEffect(()=>{const lock=()=>{setUnlocked(false);setPin("");};window.addEventListener("lurk-personal-leave",lock);return()=>window.removeEventListener("lurk-personal-leave",lock);},[]);
  useEffect(()=>{
    if(!unlocked)return;
    const movedIds=new Set(["ruhsat","ucuncuoglu","beliz-plan","heyz"]);
    const lurkIds=new Set(["holdon","yemeksepeti","mozaik"]);
    const fiddleIds=new Set(["fiddle","fiddle-tyres","fiddle-stop","fiddle-insurance","fiddle-inspection","yildiz","a2"]);
    const placeholderIds=new Set(["lurk-installment-annem","lurk-installment-ucuncuoglu","lurk-installment-beliz"]);
    setDebts(prev=>prev
      .filter(d=>!placeholderIds.has(d.id))
      .map(d=>movedIds.has(d.id)?{
        ...d,
        name:d.id==="ruhsat"?"Annem Ruhsat Taksiti":d.id==="ucuncuoglu"?"Üçüncüoğlu Emlak":d.id==="beliz-plan"?"Beliz Taksit":"Heyz Taksit",
        category:"installment",
        group:"Taksitler"
      } :lurkIds.has(d.id)?{...d,category:"lurk",folder:"LURK"}:fiddleIds.has(d.id)?{
        ...d,
        name:d.id==="fiddle"?"Fiddle III Taksit":d.id==="fiddle-tyres"?"Lastik":d.id==="fiddle-stop"?"Ön Stop Lambası":d.id==="fiddle-insurance"?"Sigorta":d.id==="fiddle-inspection"?"Muayene":d.id==="yildiz"?"Sürücü Kursu":"Ehliyet · A2 Sınav Ücreti",
        category:"fiddle",
        folder:"FIDDLE III"
      }:d));
  },[unlocked]);
  const money=n=>(Number(n)||0).toLocaleString("tr-TR",{maximumFractionDigits:2})+" ₺";
  const paid=d=>(d.installments||[]).reduce((s,i)=>s+(Number(i.paid)||0),0)+(d.payments||[]).filter(p=>!p.installmentId).reduce((s,p)=>s+(Number(p.amount)||0),0);
  const remaining=d=>Math.max(0,(Number(d.total)||0)-paid(d));
  const pct=d=>Number(d.total)>0?Math.min(100,paid(d)/Number(d.total)*100):100;
  const allHistory=debts.flatMap(d=>(d.payments||[]).map(p=>({...p,debtName:d.name,debtId:d.id}))).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  const total=debts.reduce((s,d)=>s+remaining(d),0);
  async function unlock(e){e.preventDefault();if(checking||pin.length<6)return;setChecking(true);setPinError("");try{const r=await fetch(SB_URL+"/rest/v1/rpc/lurk_pos_login",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_pin:pin})});if(!r.ok)throw new Error("PIN servisi yanıt vermedi (HTTP "+r.status+").");const token=await r.json();if(typeof token!=="string"||token.length<32)throw new Error("PIN hatalı. POS girişinde kullandığın PIN ile aynı olmalı.");setUnlocked(true);setPin("");}catch(err){setPinError(err.message||"Doğrulama yapılamadı.");}finally{setChecking(false);}}
  function addPayment(){const value=Math.round(Number(String(amount).replace(",","."))*100)/100;if(!paymentFor||!Number.isFinite(value)||value<=0||value>remaining(paymentFor)+0.001){msg("Geçerli bir tutar gir. Ödeme kalan borcu aşamaz.");return;}const date=new Date().toISOString();setDebts(prev=>prev.map(d=>d.id!==paymentFor.id?d:{...d,payments:[...(d.payments||[]),{id:"pay-"+Date.now()+"-"+Math.random().toString(36).slice(2,7),amount:value,date,note:note.trim()}]}));msg(money(value)+" ödeme kaydedildi.");setPaymentFor(null);setAmount("");setNote("");}
  function payInstallment(debt,inst){const due=Math.max(0,Number(inst.amount||0)-Number(inst.paid||0));if(!due)return;setPaymentFor({debt,installment:inst,quick:true});setAmount(String(due));}
  function addInstallmentPayment(){const value=Math.round(Number(String(amount).replace(",","."))*100)/100;const debt=paymentFor?.debt,inst=paymentFor?.installment;if(!debt||!inst||value<=0||value>Number(inst.amount)-Number(inst.paid||0)+0.001){msg("Taksit için geçerli tutar gir.");return;}const date=new Date().toISOString();setDebts(prev=>prev.map(d=>d.id!==debt.id?d:{...d,installments:d.installments.map(i=>i.id!==inst.id?i:{...i,paid:(Number(i.paid)||0)+value}),payments:[...(d.payments||[]),{id:"pay-"+Date.now(),amount:value,date,note:note.trim(),installmentId:inst.id,installmentLabel:inst.label}]}));msg(money(value)+" taksit ödemesi kaydedildi.");setPaymentFor(null);setAmount("");setNote("");}
  function reversePayment(debt,payment){if(!window.confirm(money(payment.amount)+" ödeme hareketi geri alınsın mı?"))return;setDebts(prev=>prev.map(d=>d.id!==debt.id?d:{...d,payments:(d.payments||[]).filter(p=>p.id!==payment.id),installments:(d.installments||[]).map(i=>i.id===payment.installmentId?{...i,paid:Math.max(0,(Number(i.paid)||0)-Number(payment.amount||0))}:i)}));}
  function openInstallmentEditor(debt){
    setEditingInstallment(debt);
    setInstallmentTotal(debt.total?String(debt.total):"");
    setInstallmentAmount(debt.installments?.[0]?.amount?String(debt.installments[0].amount):"");
    setInstallmentCount(debt.installments?.length?String(debt.installments.length):"");
    setInstallmentStartDate(debt.installments?.[0]?.due||new Date().toISOString().slice(0,10));
  }
  function saveInstallmentPlan(){
    const debt=editingInstallment;
    const totalValue=Math.round(Number(String(installmentTotal).replace(",","."))*100)/100;
    const eachValue=Math.round(Number(String(installmentAmount).replace(",","."))*100)/100;
    const count=Number(installmentCount);
    if(!debt||!Number.isFinite(totalValue)||totalValue<=0||!Number.isFinite(eachValue)||eachValue<=0||!Number.isInteger(count)||count<1||count>120||!/^\d{4}-\d{2}-\d{2}$/.test(installmentStartDate)){
      msg("Toplam tutar, taksit tutarı, taksit sayısı ve ilk ödeme tarihi bilgilerini kontrol et.");return;
    }
    const existing=debt.installments||[];
    let allocated=0;
    const schedule=Array.from({length:count},(_,index)=>{
      const amount=index===count-1?Math.round((totalValue-allocated)*100)/100:Math.min(eachValue,Math.round((totalValue-allocated)*100)/100);
      allocated=Math.round((allocated+amount)*100)/100;
      const date=new Date(installmentStartDate+"T12:00:00");
      date.setMonth(date.getMonth()+index);
      const due=date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0");
      const old=existing[index];
      return {id:old?.id||"inst-"+Date.now()+"-"+index,label:(index+1)+". taksit",amount,paid:Math.min(Number(old?.paid)||0,amount),due};
    });
    setDebts(prev=>prev.map(d=>d.id!==debt.id?d:{...d,total:totalValue,installments:schedule}));
    setEditingInstallment(null);
    msg("Taksit planı kaydedildi.");
  }
  if(!unlocked)return <div className="lurk-screen personal-finance" style={{minHeight:"70vh",padding:"20px 14px",display:"grid",placeItems:"center"}}><form onSubmit={unlock} style={{width:"100%",maxWidth:360,background:T.bg2,border:"1px solid "+T.border,borderRadius:20,padding:24,textAlign:"center"}}><div style={{fontSize:34,color:T.accent,marginBottom:10}}>₺</div><div style={{fontSize:21,fontWeight:850,marginBottom:7}}>Kişisel</div><div style={{fontSize:12,color:T.textSub,marginBottom:18}}>Bu sayfaya erişmek için POS PIN'ini tekrar gir.</div><input type="password" inputMode="numeric" autoComplete="current-password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="••••••" maxLength={32} autoFocus style={{width:"100%",padding:15,borderRadius:11,border:"1px solid "+T.border,background:T.bg,color:T.text,fontSize:22,letterSpacing:8,textAlign:"center",boxSizing:"border-box"}}/>{pinError&&<div role="alert" style={{color:T.danger,fontSize:12,marginTop:10}}>{pinError}</div>}<button disabled={checking||pin.length<6} style={{width:"100%",padding:14,marginTop:16,border:0,borderRadius:11,background:T.accent,color:"#061008",fontWeight:850,opacity:checking||pin.length<6?.5:1}}>{checking?"Kontrol ediliyor…":"Kilidi Aç"}</button></form></div>;
  const paidTotal=debts.reduce((sum,d)=>sum+paid(d),0);
  const originalTotal=debts.reduce((sum,d)=>sum+Number(d.total||0),0);
  const groupTotals=["Kişisel","Nicchia"].map(group=>({group,value:debts.filter(d=>d.group===group).reduce((sum,d)=>sum+remaining(d),0)}));
  const groupTotal=groupTotals.reduce((sum,g)=>sum+g.value,0)||1;
  const upcoming=debts.flatMap(d=>(d.installments||[]).filter(i=>Number(i.paid||0)<Number(i.amount||0)&&i.due).map(i=>({debt:d,inst:i,amount:Number(i.amount||0)-Number(i.paid||0)}))).sort((a,b)=>String(a.inst.due).localeCompare(String(b.inst.due))).slice(0,5);
  const lurkOrder=["holdon","yemeksepeti","mozaik"];
  const lurkDebts=debts.filter(d=>d.category==="lurk").sort((a,b)=>lurkOrder.indexOf(a.id)-lurkOrder.indexOf(b.id));
  const installmentDebts=debts.filter(d=>d.category==="installment").sort((a,b)=>["beliz-plan","ruhsat","ucuncuoglu","heyz"].indexOf(a.id)-["beliz-plan","ruhsat","ucuncuoglu","heyz"].indexOf(b.id));
  const fiddleOrder=["fiddle","fiddle-tyres","fiddle-stop","fiddle-insurance","fiddle-inspection","yildiz","a2"];
  const fiddleDebts=debts.filter(d=>d.category==="fiddle").sort((a,b)=>fiddleOrder.indexOf(a.id)-fiddleOrder.indexOf(b.id));
  const visibleDebts=debts.filter(d=>d.category!=="lurk"&&d.category!=="installment"&&d.category!=="fiddle"&&(filter==="Tümü"||d.group===filter)).sort((a,b)=>remaining(a)-remaining(b));
  return <div className="lurk-screen personal-finance" style={{paddingBottom:16}}>
    <div style={{padding:"16px 18px 12px",borderBottom:"1px solid "+T.border,display:"flex",alignItems:"center",gap:12}}>
      <button onClick={()=>{setUnlocked(false);setV("home");}} style={{background:"none",border:0,color:T.textSub,fontSize:22}}>←</button>
      <div style={{flex:1}}><div style={{fontSize:20,fontWeight:850}}>Kişisel / Ödeme Takibi</div><div style={{fontSize:11,color:T.textSub,marginTop:3}}>Finansal durumun · Özel alan</div></div>
      <button onClick={()=>{setUnlocked(false);setV("home");}} style={{padding:"8px 12px",background:T.bg3,color:T.text,border:"1px solid "+T.border,borderRadius:10,fontSize:11}}>Kilitle</button>
    </div>
    <div style={{padding:16,maxWidth:1280,margin:"0 auto"}}>
      <div style={{background:"linear-gradient(145deg,#102019,#0c1712)",border:"1px solid #294638",borderRadius:14,padding:14,marginBottom:16}}>
        <button onClick={()=>setShowLurk(v=>!v)} aria-expanded={showLurk} style={{width:"100%",display:"flex",alignItems:"center",gap:9,textAlign:"left",background:"transparent",border:0,padding:0,color:T.text,cursor:"pointer"}}>
          <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(145deg,#245b37,#173d27)",display:"grid",placeItems:"center",color:"#70f28a",fontSize:16}}>◈</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:850}}>LURK</div><div style={{fontSize:10,color:T.textDim}}>İşletme giderleri · {lurkDebts.length} kayıt</div></div>
          <div style={{fontSize:12,color:T.textSub,fontWeight:800}}>{showLurk?"⌃":"⌄"}</div>
        </button>
        {showLurk&&<div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:9,marginTop:12}}>
          {lurkDebts.map(d=><div key={d.id} style={{background:"linear-gradient(145deg,#192c22,#14231c)",border:"1px solid #304b3b",borderRadius:11,padding:11,minWidth:0}}>
            <div style={{fontSize:11,fontWeight:800,minHeight:28,lineHeight:1.35}}>{d.name}</div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>TOPLAM</div>
            <div style={{fontSize:14,fontWeight:900,marginTop:2}}>{money(d.total)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,marginTop:5}}><span style={{fontSize:9,color:T.textDim}}>KALAN</span><b style={{fontSize:12,color:T.accent}}>{money(remaining(d))}</b></div>
            <div style={{height:5,background:"#293a30",borderRadius:8,overflow:"hidden",marginTop:8}}><div style={{height:"100%",width:pct(d)+"%",background:"linear-gradient(90deg,#35c95b,#70f28a)",borderRadius:8}}/></div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>{pct(d).toFixed(0)}% ödendi · {money(paid(d))} / {money(d.total)}</div>
            <div style={{display:"flex",gap:6,marginTop:9}}>
              {remaining(d)>0&&<button onClick={()=>{setPaymentFor(d);setAmount("");setNote("");}} style={{flex:1,padding:8,borderRadius:8,border:0,background:"linear-gradient(100deg,#54e875,#2dc957)",color:"#06200d",fontSize:10,fontWeight:900}}>+ Ödeme</button>}
              <button onClick={()=>setShowHistory(v=>!v)} style={{padding:"8px 9px",borderRadius:8,border:"1px solid "+T.border,background:"#17271f",color:"#b5c7b9",fontSize:9}}>Hareketler</button>
            </div>
            {showHistory&&<div style={{marginTop:7,borderTop:"1px solid "+T.border,paddingTop:6}}>{(d.payments||[]).map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",gap:6,padding:"4px 0",fontSize:9}}><span>{p.note||"Ödeme"} · {new Date(p.date).toLocaleDateString("tr-TR")}</span><b>{money(p.amount)}</b></div>)}</div>}
          </div>)}
        </div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:10,marginBottom:12}}>
        {[{label:"TOPLAM BORÇ",value:money(originalTotal)},{label:"ÖDENEN",value:money(paidTotal)},{label:"KALAN",value:money(total)},{label:"ÖDEME ORANI",value:(originalTotal>0?paidTotal/originalTotal*100:0).toFixed(1).replace(".",",")+"%"}].map((x,i)=><div key={x.label} style={{background:i===0?"linear-gradient(135deg,rgba(52,199,89,.16),"+T.bg2+")":T.bg2,border:"1px solid "+T.border,borderRadius:13,padding:"13px 14px",minWidth:0}}><div style={{fontSize:10,fontWeight:800,color:T.textSub,letterSpacing:.7}}>{x.label}</div><div style={{fontSize:19,fontWeight:900,color:i===1||i===3?T.accent:T.text,marginTop:7,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{x.value}</div></div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:12,marginBottom:14}}>
        <div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:14,padding:14,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:850,marginBottom:12}}>Borç dağılımı</div>
          <div style={{display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
            <div style={{width:112,height:112,borderRadius:"50%",background:"conic-gradient(#54d783 0deg "+(groupTotals[0].value/groupTotal*360)+"deg,#6d9eac "+(groupTotals[0].value/groupTotal*360)+"deg 360deg)",display:"grid",placeItems:"center",flexShrink:0}}><div style={{width:76,height:76,borderRadius:"50%",background:T.bg2,display:"grid",placeItems:"center",textAlign:"center"}}><div><div style={{fontSize:9,color:T.textSub}}>KALAN</div><div style={{fontSize:12,fontWeight:850}}>{money(total)}</div></div></div></div>
            <div style={{display:"grid",gap:10,flex:1,minWidth:120}}>{groupTotals.map((g,i)=><div key={g.group} style={{display:"flex",alignItems:"center",gap:8,fontSize:11}}><span style={{width:9,height:9,borderRadius:3,background:i===0?"#54d783":"#6d9eac"}}/><span style={{flex:1,color:T.textSub}}>{g.group}</span><b>{money(g.value)}</b><span style={{color:T.textDim}}>{Math.round(g.value/groupTotal*100)}%</span></div>)}</div>
          </div>
        </div>
        <div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:14,padding:14,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:13,fontWeight:850}}>Yaklaşan taksitler</div><div style={{fontSize:10,color:T.textDim}}>Ödenmemiş</div></div>
          {upcoming.length?upcoming.map(({debt,inst,amount})=><div key={debt.id+"-"+inst.id} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderTop:"1px solid "+T.border}}><div style={{width:28,height:28,borderRadius:8,background:"rgba(52,199,89,.12)",display:"grid",placeItems:"center",color:T.accent,fontSize:13}}>₺</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:11,fontWeight:750,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{debt.name}</div><div style={{fontSize:10,color:T.textDim}}>{inst.label} · {inst.due}</div></div><div style={{fontSize:11,fontWeight:850,whiteSpace:"nowrap"}}>{money(amount)}</div><button onClick={()=>payInstallment(debt,inst)} style={{padding:"6px 8px",borderRadius:7,border:0,background:"linear-gradient(100deg,#54e875,#2dc957)",color:"#06200d",fontSize:10,fontWeight:900}}>Öde</button></div>):<div style={{fontSize:11,color:T.textDim,padding:"18px 0"}}>Tarihli, bekleyen taksit bulunmuyor.</div>}
        </div>
      </div>
      <div style={{background:"linear-gradient(145deg,#102019,#0c1712)",border:"1px solid #294638",borderRadius:14,padding:14,marginBottom:16}}>
        <button onClick={()=>setShowInstallments(v=>!v)} aria-expanded={showInstallments} style={{width:"100%",display:"flex",alignItems:"center",gap:9,textAlign:"left",background:"transparent",border:0,padding:0,color:T.text,cursor:"pointer"}}>
          <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(145deg,#245b37,#173d27)",display:"grid",placeItems:"center",color:"#70f28a",fontSize:17}}>▣</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:850}}>Taksitler</div><div style={{fontSize:10,color:T.textDim}}>Ayrı taksit kayıtların · {installmentDebts.length} kayıt</div></div>
          <div style={{fontSize:12,color:T.textSub,fontWeight:800}}>{showInstallments?"⌃":"⌄"}</div>
        </button>
        {showInstallments&&<div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:9,marginTop:12}}> 
          {installmentDebts.map(d=><div key={d.id} style={{background:"linear-gradient(145deg,#192c22,#14231c)",border:"1px solid #304b3b",borderRadius:11,padding:11,minWidth:0}}>
            <div style={{fontSize:11,fontWeight:800,minHeight:30,lineHeight:1.35}}>{d.name}</div>
            <div style={{fontSize:9,color:T.textDim,marginTop:7}}>TOPLAM</div>
            <div style={{fontSize:14,fontWeight:900,marginTop:2}}>{money(d.total)}</div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>KALAN</div>
            <div style={{fontSize:12,fontWeight:850,color:T.accent}}>{money(remaining(d))}</div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>{(d.installments||[]).filter(i=>Number(i.paid||0)>=Number(i.amount||0)).length}/{(d.installments||[]).length} taksit ödendi</div>
            <button onClick={()=>openInstallmentEditor(d)} style={{width:"100%",padding:8,marginTop:9,borderRadius:8,border:"1px solid "+T.border,background:"#17271f",color:"#e7f1e9",fontSize:10,fontWeight:800}}>Planı Düzenle</button>
            {(d.installments||[]).length>0&&<button onClick={()=>setExpanded(p=>({...p,[d.id]:!p[d.id]}))} style={{width:"100%",padding:7,marginTop:5,border:0,background:"transparent",color:T.textSub,fontSize:10}}>{expanded[d.id]?"Taksitleri Gizle":"Taksitleri Gör"}</button>}
            {expanded[d.id]&&(d.installments||[]).map(inst=><div key={inst.id} style={{padding:"7px 0",borderTop:"1px solid "+T.border}}>
              <div style={{fontSize:10,fontWeight:750}}>{inst.label}</div><div style={{fontSize:9,color:T.textDim,marginTop:2}}>{inst.due} · {money(Math.max(0,Number(inst.amount||0)-Number(inst.paid||0)))} kaldı</div>
              {Number(inst.paid||0)<Number(inst.amount||0)&&<button onClick={()=>payInstallment(d,inst)} style={{padding:"5px 8px",marginTop:5,border:0,borderRadius:6,background:T.accent,color:"#061008",fontSize:9,fontWeight:850}}>Ödeme Kaydet</button>}
            </div>)}
          </div>)}
        </div>}
      </div>
      <div style={{background:"linear-gradient(145deg,#102019,#0c1712)",border:"1px solid #294638",borderRadius:14,padding:14,marginBottom:16}}>
        <button onClick={()=>setShowFiddle(v=>!v)} aria-expanded={showFiddle} style={{width:"100%",display:"flex",alignItems:"center",gap:9,textAlign:"left",background:"transparent",border:0,padding:0,color:T.text,cursor:"pointer"}}>
          <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(145deg,#245b37,#173d27)",display:"grid",placeItems:"center",color:"#70f28a",fontSize:16}}>◈</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:850}}>FIDDLE III</div><div style={{fontSize:10,color:T.textDim}}>Scooter, bakım ve ehliyet giderleri · {fiddleDebts.length} kayıt</div></div>
          <div style={{fontSize:12,color:T.textSub,fontWeight:800}}>{showFiddle?"⌃":"⌄"}</div>
        </button>
        {showFiddle&&<div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:9,marginTop:12}}>
          {fiddleDebts.map(d=><div key={d.id} style={{background:"linear-gradient(145deg,#192c22,#14231c)",border:"1px solid #304b3b",borderRadius:11,padding:11,minWidth:0}}>
            <div style={{fontSize:11,fontWeight:800,minHeight:28,lineHeight:1.35}}>{d.name}</div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>TOPLAM</div>
            <div style={{fontSize:14,fontWeight:900,marginTop:2}}>{money(d.total)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,marginTop:5}}><span style={{fontSize:9,color:T.textDim}}>KALAN</span><b style={{fontSize:12,color:T.accent}}>{money(remaining(d))}</b></div>
            <div style={{height:5,background:"#293a30",borderRadius:8,overflow:"hidden",marginTop:8}}><div style={{height:"100%",width:pct(d)+"%",background:"linear-gradient(90deg,#35c95b,#70f28a)",borderRadius:8}}/></div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>{pct(d).toFixed(0)}% ödendi · {money(paid(d))} / {money(d.total)}</div>
            <div style={{display:"flex",gap:6,marginTop:9}}>
              {remaining(d)>0&&<button onClick={()=>{setPaymentFor(d);setAmount("");setNote("");}} style={{flex:1,padding:8,borderRadius:8,border:0,background:"linear-gradient(100deg,#54e875,#2dc957)",color:"#06200d",fontSize:10,fontWeight:900}}>+ Ödeme</button>}
              <button onClick={()=>setShowHistory(v=>!v)} style={{padding:"8px 9px",borderRadius:8,border:"1px solid "+T.border,background:"#17271f",color:"#b5c7b9",fontSize:9}}>Hareketler</button>
            </div>
            {showHistory&&<div style={{marginTop:7,borderTop:"1px solid "+T.border,paddingTop:6}}>{(d.payments||[]).map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",gap:6,padding:"4px 0",fontSize:9}}><span>{p.note||"Ödeme"} · {new Date(p.date).toLocaleDateString("tr-TR")}</span><b>{money(p.amount)}</b></div>)}</div>}
          </div>)}
        </div>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
        <div style={{fontSize:15,fontWeight:850,flex:1}}>Borçlarım <span style={{fontSize:11,color:T.textDim,fontWeight:500}}>({visibleDebts.length})</span></div>
        <div style={{display:"flex",gap:5}}>{["Tümü","Kişisel","Nicchia"].map(x=><button key={x} onClick={()=>setFilter(x)} style={{padding:"7px 11px",borderRadius:18,border:"1px solid "+(filter===x?T.accent:T.border),background:filter===x?"rgba(52,199,89,.14)":T.bg2,color:filter===x?T.accent:T.textSub,fontWeight:750,fontSize:10}}>{x}</button>)}</div>
        <button onClick={()=>{const name=window.prompt("Borç / ödeme adı:");if(!name?.trim())return;const totalValue=Number(window.prompt("Toplam tutar (TL):"));if(!Number.isFinite(totalValue)||totalValue<=0)return;const group=window.prompt("Grup: Kişisel veya Nicchia","Kişisel")==="Nicchia"?"Nicchia":"Kişisel";setDebts(prev=>[...prev,{id:"debt-"+Date.now(),group,name:name.trim(),total:totalValue,payments:[],installments:[]}]);}} style={{padding:"8px 12px",borderRadius:9,border:0,background:T.accent,color:"#061008",fontWeight:850,fontSize:11}}>+ Borç Ekle</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:9}}>
        {visibleDebts.map(d=><div key={d.id} style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:12,minWidth:0}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10}}><div style={{width:34,height:34,borderRadius:10,background:d.group==="Kişisel"?"rgba(52,199,89,.13)":"rgba(109,158,172,.15)",display:"grid",placeItems:"center",color:d.group==="Kişisel"?"#54d783":"#8db9c5",fontSize:16,flexShrink:0}}>₺</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:850,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</div><div style={{fontSize:10,color:T.textDim,marginTop:3}}>{d.group} · {money(d.total)} toplam</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:13,fontWeight:900}}>{money(remaining(d))}</div><div style={{fontSize:9,color:T.textDim}}>kalan</div></div></div>
          <div style={{height:6,background:"rgba(255,255,255,.08)",borderRadius:8,overflow:"hidden",marginTop:11}}><div style={{height:"100%",width:pct(d)+"%",background:"linear-gradient(90deg,#248A3D,#5BD77B)",borderRadius:8}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:T.textSub,marginTop:6}}><span>{pct(d).toFixed(0)}% ödendi</span><span>{money(paid(d))} / {money(d.total)}</span></div>
          {(d.installments||[]).length>0&&<div style={{marginTop:8,borderTop:"1px solid "+T.border,paddingTop:7}}><button onClick={()=>setExpanded(p=>({...p,[d.id]:!p[d.id]}))} style={{width:"100%",background:"transparent",border:0,color:T.textSub,textAlign:"left",fontSize:10,fontWeight:750,padding:"2px 0"}}>{expanded[d.id]?"▾":"▸"} Taksitler · {(d.installments||[]).filter(i=>Number(i.paid||0)>=Number(i.amount||0)).length}/{d.installments.length} ödendi</button>{expanded[d.id]&&d.installments.map(inst=><div key={inst.id} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 0",borderTop:"1px solid rgba(255,255,255,.045)"}}><div style={{flex:1,minWidth:0}}><div style={{fontSize:10,fontWeight:700}}>{inst.label}</div><div style={{fontSize:9,color:T.textDim}}>{inst.due||"Tarih yok"} · {money(inst.paid)} / {money(inst.amount)}</div></div>{Number(inst.paid||0)<Number(inst.amount||0)&&<button onClick={()=>payInstallment(d,inst)} style={{padding:"6px 8px",borderRadius:7,border:0,background:T.accent,color:"#061008",fontSize:9,fontWeight:850}}>Öde</button>}</div>)}</div>}
          <div style={{display:"flex",gap:7,marginTop:9}}><button onClick={()=>{setPaymentFor(d);setAmount("");setNote("");}} style={{flex:1,padding:9,borderRadius:8,border:0,background:T.accent,color:"#061008",fontSize:11,fontWeight:850}}>+ Ödeme Yap</button><button onClick={()=>setShowHistory(v=>!v)} style={{padding:"9px 10px",borderRadius:8,border:"1px solid "+T.border,background:T.bg3,color:T.textSub,fontSize:10}}>Hareketler</button></div>
          {showHistory&&<div style={{marginTop:8,borderTop:"1px solid "+T.border,paddingTop:6}}>{(d.payments||[]).slice().reverse().map(p=><div key={p.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0"}}><div style={{flex:1}}><div style={{fontSize:10,fontWeight:700}}>{money(p.amount)} · {new Date(p.date).toLocaleDateString("tr-TR")}</div><div style={{fontSize:9,color:T.textDim}}>{p.installmentLabel||p.note||"Ödeme"}</div></div><button onClick={()=>reversePayment(d,p)} style={{color:T.danger,background:"transparent",border:0,fontSize:9}}>Geri al</button></div>)}</div>}
        </div>)}
      </div>
      <button onClick={()=>setShowHistory(v=>!v)} style={{width:"100%",padding:11,marginTop:12,background:T.bg3,border:"1px solid "+T.border,borderRadius:10,color:T.text,fontWeight:750,fontSize:11}}>↻ Tüm ödeme hareketleri</button>
      {showHistory&&<div style={{marginTop:9,background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:12}}>{allHistory.length?allHistory.map(p=><div key={p.id} style={{padding:"8px 0",borderBottom:"1px solid "+T.border,display:"flex",justifyContent:"space-between",gap:8}}><div><div style={{fontSize:11,fontWeight:750}}>{p.debtName}</div><div style={{fontSize:9,color:T.textDim}}>{new Date(p.date).toLocaleString("tr-TR")} · {p.note||p.installmentLabel||"Ödeme"}</div></div><div style={{fontSize:11,color:T.accent,fontWeight:850}}>{money(p.amount)}</div></div>):<div style={{fontSize:11,color:T.textDim}}>Henüz ödeme hareketi yok.</div>}</div>}
    </div>
{editingInstallment&&<Modal><div style={{fontSize:18,fontWeight:850,marginBottom:5}}>Taksit planı</div><div style={{fontSize:12,color:T.textSub,marginBottom:14}}>{editingInstallment.name}</div>
  <label style={{fontSize:11,color:T.textSub}}>Toplam borç (TL)</label><input type="number" min="0.01" step="0.01" value={installmentTotal} onChange={e=>setInstallmentTotal(e.target.value)} placeholder="Örn. 24000" style={{width:"100%",padding:12,marginTop:5,marginBottom:10,borderRadius:9,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/>
  <label style={{fontSize:11,color:T.textSub}}>Her taksit tutarı (TL)</label><input type="number" min="0.01" step="0.01" value={installmentAmount} onChange={e=>setInstallmentAmount(e.target.value)} placeholder="Örn. 4000" style={{width:"100%",padding:12,marginTop:5,marginBottom:10,borderRadius:9,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/>
  <label style={{fontSize:11,color:T.textSub}}>Taksit sayısı</label><input type="number" min="1" max="120" step="1" value={installmentCount} onChange={e=>setInstallmentCount(e.target.value)} placeholder="Örn. 6" style={{width:"100%",padding:12,marginTop:5,marginBottom:10,borderRadius:9,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/>
  <label style={{fontSize:11,color:T.textSub}}>İlk ödeme tarihi</label><input type="date" value={installmentStartDate} onChange={e=>setInstallmentStartDate(e.target.value)} style={{width:"100%",padding:12,marginTop:5,marginBottom:14,borderRadius:9,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/>
  <div style={{fontSize:10,color:T.textDim,lineHeight:1.5,marginBottom:12}}>Taksitler aylık olarak oluşturulur. Son taksit, toplam tutarı tamamlayacak şekilde otomatik ayarlanır. Mevcut taksitlerdeki ödenmiş tutarlar mümkün olduğunca korunur.</div>
  <button onClick={saveInstallmentPlan} style={{width:"100%",padding:13,background:T.accent,color:"#061008",border:0,borderRadius:10,fontWeight:850}}>Planı Kaydet</button><button onClick={()=>setEditingInstallment(null)} style={{width:"100%",padding:11,background:"transparent",border:0,color:T.textSub}}>Vazgeç</button>
</Modal>}
{paymentFor&&<Modal><div style={{fontSize:18,fontWeight:850,marginBottom:5}}>Ödeme kaydet</div><div style={{fontSize:12,color:T.textSub,marginBottom:14}}>{paymentFor.name||paymentFor.debt?.name} · Kalan {money(paymentFor.debt?Math.max(0,paymentFor.installment.amount-paymentFor.installment.paid):remaining(paymentFor))}</div><label style={{fontSize:11,color:T.textSub}}>Ödeme tutarı (TL)</label><input autoFocus type="number" min="0.01" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Örn. 2000" style={{width:"100%",padding:14,marginTop:6,marginBottom:12,borderRadius:10,border:"1px solid "+T.border,background:T.bg,color:T.text,fontSize:20,boxSizing:"border-box"}}/><label style={{fontSize:11,color:T.textSub}}>Not (isteğe bağlı)</label><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Ödeme notu" style={{width:"100%",padding:12,marginTop:6,marginBottom:14,borderRadius:10,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/><button onClick={paymentFor.debt?addInstallmentPayment:addPayment} style={{width:"100%",padding:14,background:T.accent,color:"#061008",border:0,borderRadius:11,fontWeight:850}}>Ödemeyi Kaydet</button><button onClick={()=>setPaymentFor(null)} style={{width:"100%",padding:11,background:"transparent",border:0,color:T.textSub}}>Vazgeç</button></Modal>}
  </div>;
}

/* ─── LURK+ ─── */
function LurkPlusScreen({members,setMembers,msg,setV}){
  const [linkBusy,setLinkBusy]=useState(false);
  const [issuedLinks,setIssuedLinks]=useState({});
  async function manageLink(member,action){
    if(linkBusy)return;
    const secret=window.prompt("LURK+ bağlantı yönetim anahtarını gir:");
    if(!secret)return;
    if(secret.length<24){msg("Yönetim anahtarı en az 24 karakter olmalı.");return;}
    setLinkBusy(true);
    try{
      let rpc,body;
      if(action==="create"){
        const bytes=new Uint8Array(32);window.crypto.getRandomValues(bytes);
        const token=Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("");
        rpc="lurk_plus_create_link";
        body={p_member_id:member.id,p_token:token,p_admin_secret:secret};
        const response=await fetch(SB_URL+"/rest/v1/rpc/"+rpc,{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify(body)});
        const result=await response.json().catch(()=>null);
        if(!response.ok)throw new Error(result?.message||"Bağlantı oluşturulamadı");
        const url=window.location.origin+window.location.pathname+"?lurkplus="+token;
        setIssuedLinks(prev=>({...prev,[member.id]:url}));
        try{await navigator.clipboard.writeText(url);msg("Müşteri bağlantısı oluşturuldu ve kopyalandı.");}
        catch(e){msg("Bağlantı oluşturuldu. Aşağıdan kopyalayabilirsin.");}
      }else{
        rpc="lurk_plus_revoke_links";
        body={p_member_id:member.id,p_admin_secret:secret};
        const response=await fetch(SB_URL+"/rest/v1/rpc/"+rpc,{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify(body)});
        const result=await response.json().catch(()=>null);
        if(!response.ok)throw new Error(result?.message||"Bağlantı iptal edilemedi");
        setIssuedLinks(prev=>({...prev,[member.id]:null}));
        msg("Üyenin tüm müşteri bağlantıları iptal edildi.");
      }
    }catch(e){msg(e.message||"İşlem başarısız.");}
    finally{setLinkBusy(false);}
  }
  const [showForm,setShowForm]=useState(false);
  const [selectedMemberId,setSelectedMemberId]=useState(null);
  const [name,setName]=useState("");
  const [balance,setBalance]=useState("");
  const [memberType,setMemberType]=useState("balance");
  function addMember(){
    const clean=name.trim();
    const amount=Math.floor(Number(balance));
    if(!clean){msg("Üye adı gir.");return;}
    if(!balance.trim()||!Number.isFinite(amount)||amount<0||(memberType==="balance"&&!Number.isFinite(Number(balance)))){msg(memberType==="coffee"?"Geçerli kahve hakkı gir.":"Geçerli bir bakiye gir.");return;}
    if(members.some(m=>m.name.trim().toLocaleLowerCase("tr-TR")===clean.toLocaleLowerCase("tr-TR"))){msg("Bu isimde LURK+ üyesi zaten var.");return;}
    const createdAt=new Date().toISOString();
    const entry=memberType==="coffee"
      ?{id:uid(),type:"credit_topup",date:createdAt,amount,balanceAfter:amount,note:"Başlangıç kahve hakkı"}
      :{id:uid(),type:"topup",date:createdAt,amount:Number(balance),balanceAfter:Number(balance),note:"Başlangıç bakiyesi"};
    setMembers(prev=>[{id:uid(),name:clean,membershipType:memberType,balance:memberType==="balance"?Math.round(Number(balance)*100)/100:0,coffeeCredits:memberType==="coffee"?amount:0,createdAt,history:[entry]},...prev]);
    setName("");setBalance("");setMemberType("balance");setShowForm(false);msg("LURK+ üyesi eklendi.");
  }
  function addCoffeeCredits(member){
    const raw=window.prompt(member.name+" için eklenecek kahve hakkı:");
    if(raw===null)return;
    const amount=Number(raw);
    if(!Number.isInteger(amount)||amount<1){msg("En az 1 tam kahve hakkı gir.");return;}
    const date=new Date().toISOString();
    setMembers(prev=>prev.map(m=>m.id!==member.id?m:{...m,coffeeCredits:(Number(m.coffeeCredits)||0)+amount,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:"credit_topup",date,amount,balanceAfter:(Number(m.coffeeCredits)||0)+amount,note:"Kahve hakkı eklendi"}]}));
    msg(member.name+" · "+amount+" kahve hakkı eklendi.");
  }
  async function deleteMember(member){
    if(!window.confirm(member.name+" adlı LURK+ üyesini silmek istediğine emin misin? Bakiye/kahve hakkı ve hareket geçmişi üye listesinden kaldırılacak. Müşteri bağlantıları da iptal edilecek."))return;
    const secret=window.prompt("LURK+ bağlantı yönetim anahtarını gir:");
    if(!secret)return;
    if(secret.length<24){msg("Yönetim anahtarı en az 24 karakter olmalı.");return;}
    setLinkBusy(true);
    try{
      const response=await fetch(SB_URL+"/rest/v1/rpc/lurk_plus_revoke_links",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_member_id:member.id,p_admin_secret:secret})});
      const result=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(result?.message||"Üye bağlantıları iptal edilemedi. Üye silinmedi.");
      setMembers(prev=>prev.filter(m=>m.id!==member.id));
      setSelectedMemberId(null);
      setIssuedLinks(prev=>{const next={...prev};delete next[member.id];return next;});
      msg(member.name+" LURK+ listesinden silindi.");
    }catch(e){msg(e.message||"Üye silinemedi.");}
    finally{setLinkBusy(false);}
  }
  return(
    <div className="lurk-screen">
      <div style={{background:"rgba(13,13,13,0.98)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"18px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setV("home")} style={{background:"transparent",border:0,color:T.textSub,fontSize:24,cursor:"pointer"}}>←</button>
        <div style={{flex:1}}><div style={{fontSize:24,fontWeight:850,letterSpacing:"-0.8px",color:T.text}}>LURK<span style={{color:T.accentL}}>+</span></div><div style={{fontSize:11,color:T.textSub,marginTop:2}}>Bakiye ve kahve hakkı üyelikleri</div></div>
        <button onClick={()=>setShowForm(true)} style={{background:T.accent,border:0,borderRadius:22,padding:"9px 15px",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer"}}>+ Üye Ekle</button>
      </div>
      <div style={{padding:14}}>
        {members.length===0?<div style={{padding:"42px 20px",textAlign:"center",color:T.textSub,background:T.bg2,borderRadius:14}}><div style={{fontSize:30,marginBottom:10}}>＋</div><div style={{fontWeight:700,color:T.text,marginBottom:5}}>Henüz LURK+ üyesi yok</div><div style={{fontSize:12}}>İlk üyeni ekleyip başlangıç bakiyesini belirle.</div></div>:members.slice().sort((a,b)=>a.name.localeCompare(b.name,"tr")).map(m=><button key={m.id} onClick={()=>setSelectedMemberId(m.id)} style={{display:"flex",alignItems:"center",gap:12,width:"100%",textAlign:"left",background:T.bg2,border:"1px solid "+(selectedMemberId===m.id?"rgba(52,199,89,.35)":"rgba(255,255,255,.07)"),borderRadius:13,padding:12,marginBottom:8,cursor:"pointer",color:T.text}}><div style={{width:38,height:38,borderRadius:11,background:"rgba(52,199,89,.12)",display:"flex",alignItems:"center",justifyContent:"center",color:T.accentL,fontSize:16,fontWeight:800,flexShrink:0}}>{m.name.trim().charAt(0).toLocaleUpperCase("tr-TR")}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:750,overflowWrap:"anywhere"}}>{m.name}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>Üyelik: {new Date(m.createdAt||Date.now()).toLocaleDateString("tr-TR")}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:15,fontWeight:850,color:T.accentL,whiteSpace:"nowrap"}}>{m.membershipType==="coffee"?(Number(m.coffeeCredits)||0)+" kahve hakkı":fm(m.balance)}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>{m.membershipType==="coffee"?"Kahve hakkı üyeliği":"Bakiye üyeliği"} · Hareketleri gör ›</div></div></button>)}
        {selectedMemberId&&members.filter(m=>m.id===selectedMemberId).map(m=><div key={m.id} style={{marginTop:12,background:"rgba(255,255,255,.035)",border:"1px solid rgba(255,255,255,.09)",borderRadius:14,padding:13}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:10}}><div><div style={{fontSize:16,fontWeight:800,color:T.text}}>{m.name}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>{m.membershipType==="coffee"?"Kalan kahve hakkı":"Güncel bakiye"}</div></div><div style={{fontSize:18,fontWeight:850,color:T.accentL}}>{m.membershipType==="coffee"?(Number(m.coffeeCredits)||0)+" / toplam hak":" "+fm(m.balance)}</div></div>
          {m.membershipType==="coffee"&&<button onClick={()=>addCoffeeCredits(m)} style={{width:"100%",padding:9,marginBottom:12,background:"rgba(52,199,89,.1)",color:T.accentL,border:"1px solid rgba(52,199,89,.2)",borderRadius:8,fontSize:11,fontWeight:800,cursor:"pointer"}}>+ Kahve hakkı ekle</button>}
          <div style={{background:"rgba(52,199,89,.07)",border:"1px solid rgba(52,199,89,.18)",borderRadius:11,padding:11,marginBottom:13}}>
            <div style={{fontSize:12,fontWeight:800,color:T.text,marginBottom:5}}>Müşteri bağlantısı</div>
            <div style={{fontSize:10,color:T.textSub,lineHeight:1.5,marginBottom:9}}>Bu bağlantıyı müşteriye gönder. Bağlantıyı bilen kişi yalnızca bu üyenin bakiye ve hareketlerini görebilir.</div>
            <button disabled={linkBusy} onClick={()=>manageLink(m,"create")} style={{width:"100%",padding:10,background:T.accent,color:"#fff",border:0,borderRadius:9,fontWeight:800,fontSize:11,cursor:"pointer",opacity:linkBusy?0.6:1}}>{linkBusy?"İşleniyor…":"Yeni bağlantı oluştur / yenile"}</button>
            {issuedLinks[m.id]&&<><div style={{fontSize:10,color:T.textSub,overflowWrap:"anywhere",padding:"8px 0"}}>{issuedLinks[m.id]}</div><button onClick={()=>navigator.clipboard.writeText(issuedLinks[m.id]).then(()=>msg("Bağlantı kopyalandı."))} style={{width:"100%",padding:9,background:T.bg3,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:8,fontSize:11,cursor:"pointer",marginBottom:7}}>Bağlantıyı Kopyala</button><button onClick={()=>window.open("https://wa.me/?text="+encodeURIComponent(m.name+" için LURK+ bakiye bağlantın: "+issuedLinks[m.id]),"_blank","noopener,noreferrer")} style={{width:"100%",padding:9,background:"rgba(37,211,102,.12)",color:"#55D98B",border:"1px solid rgba(37,211,102,.25)",borderRadius:8,fontSize:11,cursor:"pointer",marginBottom:7}}>WhatsApp ile Gönder</button></>}
            <button disabled={linkBusy} onClick={()=>manageLink(m,"revoke")} style={{width:"100%",padding:9,background:"transparent",color:T.danger,border:"1px solid rgba(255,69,58,.25)",borderRadius:8,fontSize:11,cursor:"pointer"}}>Tüm bağlantıları iptal et</button>
          </div>
          <div style={{fontSize:11,fontWeight:800,color:T.textSub,letterSpacing:".4px",marginBottom:7}}>BAKİYE HAREKETLERİ</div>
          {(!m.history||m.history.length===0)?<div style={{fontSize:12,color:T.textSub,padding:"12px 0"}}>Henüz hareket kaydı yok.</div>:m.history.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).map(h=><div key={h.id} style={{display:"flex",gap:9,alignItems:"flex-start",padding:"9px 0",borderTop:"1px solid rgba(255,255,255,.07)"}}><div style={{width:28,height:28,borderRadius:9,background:h.type==="topup"?"rgba(52,199,89,.12)":h.type==="refund"?"rgba(52,199,89,.1)":"rgba(255,69,58,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:h.type==="purchase"?T.danger:T.accentL,flexShrink:0}}>{h.type==="topup"?"＋":h.type==="refund"?"↩":"−"}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:750,color:T.text}}>{h.type==="topup"?(h.note||"Bakiye yüklendi"):h.type==="credit_topup"?(h.note||"Kahve hakkı eklendi"):h.type==="credit_use"?"Kahve hakkı kullanıldı":h.type==="credit_refund"?"Kahve hakkı iade edildi":h.type==="refund"?"Ürün iadesi":(h.itemName||"Ürün alımı")}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>{new Date(h.date).toLocaleString("tr-TR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}{h.table?" · "+h.table:""}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>İşlem sonrası: {m.membershipType==="coffee"?(Number(h.balanceAfter)||0)+" kahve hakkı":fm(h.balanceAfter)}</div></div><div style={{fontSize:12,fontWeight:800,color:h.type==="purchase"?T.danger:T.accentL,whiteSpace:"nowrap"}}>{m.membershipType==="coffee"?(h.type==="credit_use"?"−":h.type==="credit_refund"||h.type==="credit_topup"?"+":"")+h.amount+" hak":(h.type==="purchase"?"−":"+")+fm(h.amount)}</div></div>)}
          <button disabled={linkBusy} onClick={()=>deleteMember(m)} style={{width:"100%",marginTop:12,padding:10,background:"rgba(255,69,58,.08)",border:"1px solid rgba(255,69,58,.3)",borderRadius:9,color:T.danger,fontSize:12,fontWeight:800,cursor:"pointer",opacity:linkBusy?0.6:1}}>Üyeliği Sil</button>
          <button onClick={()=>setSelectedMemberId(null)} style={{width:"100%",marginTop:8,padding:9,background:"transparent",border:"1px solid rgba(255,255,255,.1)",borderRadius:9,color:T.textSub,fontSize:11,cursor:"pointer"}}>Detayı Kapat</button>
        </div>)}
      </div>
      {showForm&&<Modal><div style={{fontSize:18,fontWeight:800,color:T.text,marginBottom:6}}>Yeni LURK+ Üyesi</div><div style={{fontSize:12,color:T.textSub,marginBottom:16}}>Üyelik türünü seçip başlangıç değerini gir.</div><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Üye adı *</label><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Ad soyad" style={{width:"100%",padding:12,marginBottom:12,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10}}/><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Üyelik türü *</label><select value={memberType} onChange={e=>setMemberType(e.target.value)} style={{width:"100%",padding:12,marginBottom:12,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10}}><option value="balance">Bakiye üyeliği (TL)</option><option value="coffee">Kahve hakkı üyeliği</option></select><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>{memberType==="coffee"?"Başlangıç kahve hakkı *":"Başlangıç bakiyesi (TL) *"}</label><input value={balance} onChange={e=>setBalance(e.target.value)} inputMode={memberType==="coffee"?"numeric":"decimal"} placeholder={memberType==="coffee"?"Örn. 6":"Örn. 500"} onKeyDown={e=>{if(e.key==="Enter")addMember();}} style={{width:"100%",padding:12,marginBottom:16,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10}}/><button onClick={addMember} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>Üyeyi Kaydet</button><button onClick={()=>setShowForm(false)} style={{width:"100%",padding:12,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Vazgeç</button></Modal>}
    </div>
  );
}

function LurkPlusPortal({token}){
  const [member,setMember]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [updated,setUpdated]=useState(null);
  async function refresh(){
    setLoading(true);setError(false);
    try{
      const r=await fetch(SB_URL+"/rest/v1/rpc/lurk_plus_member_by_token",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_token:token})});
      if(!r.ok)throw new Error("Veri alınamadı");
      const data=await r.json();
      if(!data||!data.name)throw new Error("Bağlantı geçersiz veya iptal edilmiş");
      setMember(data);setUpdated(new Date());
    }catch(e){setMember(null);setError(true);}
    finally{setLoading(false);}
  }
  useEffect(()=>{refresh();},[token]);
  const history=Array.isArray(member?.history)?member.history.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)):[];
  return <div style={{minHeight:"100vh",background:"#090B0A",color:"#F5F5F5",fontFamily:"Inter,Helvetica Neue,Arial,sans-serif",padding:"28px 16px 50px"}}>
    <div style={{maxWidth:520,margin:"0 auto"}}>
      <div style={{fontSize:26,fontWeight:900,letterSpacing:"-1px",marginBottom:4}}>LURK<span style={{color:"#34C759"}}>+</span></div>
      <div style={{fontSize:12,color:"#A0A0A0",marginBottom:26}}>Üyelik bilgilerin ve kullanım geçmişin</div>
      {loading?<div style={{padding:28,textAlign:"center",color:"#A0A0A0"}}>Hesabın yükleniyor…</div>:error?<div style={{padding:22,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:15}}>
        <div style={{fontSize:17,fontWeight:800,marginBottom:7}}>Bağlantı açılamadı</div><div style={{fontSize:12,color:"#A0A0A0",lineHeight:1.6}}>Bu bağlantı geçersiz, iptal edilmiş veya geçici olarak erişilemiyor. LURK ekibiyle iletişime geçebilirsin.</div><button onClick={refresh} style={{marginTop:16,padding:11,width:"100%",border:0,borderRadius:9,background:"#34C759",color:"#fff",fontWeight:800}}>Yeniden Dene</button>
      </div>:member&&<>
        <div style={{background:"rgba(52,199,89,.09)",border:"1px solid rgba(52,199,89,.22)",borderRadius:18,padding:20,marginBottom:18}}>
          <div style={{fontSize:12,color:"#A0A0A0",marginBottom:7}}>Merhaba, {member.name}</div>
          {member.membershipType==="coffee"?<>
            <div style={{fontSize:11,color:"#A0A0A0",letterSpacing:".5px",fontWeight:750}}>KALAN KAHVE HAKKIN</div>
            <div style={{fontSize:34,fontWeight:900,color:"#34C759",marginTop:5}}>{Number(member.coffeeCredits)||0} hak</div>
          </>:<>
            <div style={{fontSize:11,color:"#A0A0A0",letterSpacing:".5px",fontWeight:750}}>GÜNCEL BAKİYEN</div>
            <div style={{fontSize:34,fontWeight:900,color:"#34C759",marginTop:5}}>{fm(Number(member.balance)||0)}</div>
          </>}
          <div style={{fontSize:10,color:"#A0A0A0",marginTop:10}}>Son kontrol: {updated?.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:14,fontWeight:850}}>Hesap hareketleri</div><button onClick={refresh} style={{padding:"7px 10px",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,color:"#F5F5F5",fontSize:10}}>↻ Güncelle</button></div>
        <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:"0 13px"}}>
          {!history.length?<div style={{padding:18,textAlign:"center",fontSize:12,color:"#A0A0A0"}}>Henüz bakiye hareketi yok.</div>:history.map(h=><div key={h.id} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"13px 0",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
            <div style={{width:29,height:29,borderRadius:9,background:h.type==="purchase"?"rgba(255,69,58,.12)":"rgba(52,199,89,.12)",display:"grid",placeItems:"center",color:h.type==="purchase"?"#FF453A":"#34C759",flexShrink:0}}>{h.type==="topup"?"＋":h.type==="refund"?"↩":"−"}</div>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:750}}>{h.type==="topup"?(h.note||"Bakiye yüklendi"):h.type==="credit_topup"?(h.note||"Kahve hakkı eklendi"):h.type==="credit_use"?"Kahve hakkı kullanıldı":h.type==="credit_refund"?"Kahve hakkı iade edildi":h.type==="refund"?"Ürün iadesi":(h.itemName||"Ürün alımı")}</div><div style={{fontSize:10,color:"#A0A0A0",marginTop:4}}>{h.date?new Date(h.date).toLocaleString("tr-TR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}{h.table?" · "+h.table:""}</div><div style={{fontSize:10,color:"#A0A0A0",marginTop:3}}>İşlem sonrası: {member.membershipType==="coffee"?(Number(h.balanceAfter)||0)+" kahve hakkı":fm(Number(h.balanceAfter)||0)}</div></div>
            <div style={{fontSize:12,fontWeight:850,color:h.type==="purchase"?"#FF453A":"#34C759",whiteSpace:"nowrap"}}>{member.membershipType==="coffee"?(h.type==="credit_use"?"−":h.type==="credit_refund"||h.type==="credit_topup"?"+":"")+h.amount+" hak":(h.type==="purchase"?"−":"+")+fm(Number(h.amount)||0)}</div>
          </div>)}
        </div>
        <div style={{fontSize:10,color:"#777",textAlign:"center",marginTop:15,lineHeight:1.5}}>Bakiye bilgisi LURK sistemindeki güncel kayıttan alınır.</div>
      </>}
    </div>
  </div>;
}

/* ─── CUSTOMERS ─── */
function CustomersScreen({orders,customers,setCustomers,creditEntries,setCreditEntries,setV,msg}){
  const [query,setQuery]=useState("");
  const [editing,setEditing]=useState(null);
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [showForm,setShowForm]=useState(false);
  const [detail,setDetail]=useState(null);
  const [ledgerAction,setLedgerAction]=useState(null);
  const [amount,setAmount]=useState("");
  const [method,setMethod]=useState("cash");
  const [note,setNote]=useState("");
  const [ledgerSubmitting,setLedgerSubmitting]=useState(false);
  const ledgerSubmittingRef=useRef(false);
  const currentMonth=thisMonth();
  const [selectedMonth,setSelectedMonth]=useState(currentMonth);
  const orderMonths=orders.map(o=>(o.date||"").slice(0,7)).filter(m=>/^\d{4}-\d{2}$/.test(m)&&m<=currentMonth);
  const firstMonth=orderMonths.length?orderMonths.reduce((earliest,m)=>m<earliest?m:earliest,currentMonth):currentMonth;
  const availableMonths=[];
  for(let cursor=firstMonth;cursor<=currentMonth;){
    availableMonths.push(cursor);
    const [year,month]=cursor.split("-").map(Number);
    const next=new Date(year,month,1);
    cursor=next.getFullYear()+"-"+String(next.getMonth()+1).padStart(2,"0");
  }
  availableMonths.reverse();
  const monthLabel=(month)=>{const [year,mm]=month.split("-").map(Number);return new Date(year,mm-1,1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"});};
  const matchesCustomer=(o,c)=>(o.customerId&&o.customerId===c.id)||(!o.customerId&&o.g&&o.g.trim().toLocaleLowerCase("tr-TR")===c.name.trim().toLocaleLowerCase("tr-TR"));
  const customerOrders=(c)=>orders.filter(o=>matchesCustomer(o,c));
  const totalFor=(c)=>customerOrders(c).reduce((sum,o)=>sum+(Number(o.total)||0),0);
  const orderCountFor=(c)=>customerOrders(c).filter(o=>!o.partialPayment).length;
  const monthlyTotalFor=(c,month=selectedMonth)=>orders.filter(o=>matchesCustomer(o,c)&&(o.date||"").slice(0,7)===month).reduce((sum,o)=>sum+(Number(o.total)||0),0);
  const pointsFor=(c)=>Math.floor((orders.filter(o=>(o.customerId&&o.customerId===c.id)||(!o.customerId&&o.g&&o.g.trim().toLocaleLowerCase("tr-TR")===c.name.trim().toLocaleLowerCase("tr-TR"))).reduce((sum,o)=>sum+paymentAmount(o,"cash")+paymentAmount(o,"card"),0)+ledgerFor(c).filter(e=>e.type==="payment").reduce((sum,e)=>sum+(Number(e.amount)||0),0))/100);
  const ledgerFor=(c)=>creditEntries.filter(e=>e.customerId===c.id).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  const balanceFor=(c)=>ledgerFor(c).reduce((sum,e)=>sum+(e.type==="debt"?1:-1)*(Number(e.amount)||0),0);
  const filtered=customers.filter(c=>(c.name+" "+(c.phone||"")).toLocaleLowerCase("tr-TR").includes(query.toLocaleLowerCase("tr-TR"))).sort((a,b)=>monthlyTotalFor(b)-monthlyTotalFor(a)||a.name.localeCompare(b.name,"tr"));
  function openNew(){setEditing(null);setName("");setPhone("");setShowForm(true);}
  function openEdit(c){setEditing(c);setName(c.name);setPhone(c.phone||"");setShowForm(true);}
  function saveCustomer(){
    const clean=name.trim(), tel=editing?(editing.phone||""):"";
    if(!clean){msg("Müşteri adı zorunlu.");return;}
    const duplicateName=customers.find(c=>c.id!==editing?.id&&c.name.trim().toLocaleLowerCase("tr-TR")===clean.toLocaleLowerCase("tr-TR"));
    if(duplicateName){msg("Bu isimde bir müşteri zaten kayıtlı. Mevcut kaydı düzenle.");return;}
    if(editing){setCustomers(prev=>prev.map(c=>c.id===editing.id?{...c,name:clean,phone:tel,updatedAt:new Date().toISOString()}:c));setDetail({...editing,name:clean,phone:tel});msg("Müşteri güncellendi.");}
    else{const c={id:uid(),name:clean,phone:tel,createdAt:new Date().toISOString(),points:0,creditBalance:0};setCustomers(prev=>[c,...prev]);msg("Müşteri kaydedildi.");}
    setShowForm(false);
  }
  function saveLedger(){
    if(ledgerSubmittingRef.current)return;
    const value=Math.round(Number(amount)*100)/100;
    if(!detail){return;}
    if(!Number.isFinite(value)||value<=0){msg("Geçerli bir tutar gir.");return;}
    if(ledgerAction==="payment"&&value>Math.max(0,balanceFor(detail))+.009){msg("Tahsilat açık bakiyeden fazla olamaz.");return;}
    ledgerSubmittingRef.current=true;
    setLedgerSubmitting(true);
    const entry={id:uid(),customerId:detail.id,customerName:detail.name,type:ledgerAction==="debt"?"debt":"payment",amount:value,method:ledgerAction==="debt"?"credit":method,date:new Date().toISOString(),note:note.trim()};
    setCreditEntries(prev=>[entry,...prev]);
    setAmount("");setNote("");setLedgerAction(null);
    msg(ledgerAction==="debt"?"Borç kaydedildi.":"Tahsilat kaydedildi.");
  }
  return(
    <div className="lurk-screen lurk-customers-screen">
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"22px 16px 18px",display:"flex",alignItems:"center",gap:12,background:"rgba(13,13,13,0.98)"}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:23,fontWeight:850,letterSpacing:"-.7px",flex:1}}>Müşteriler<div style={{fontSize:11,fontWeight:500,color:T.textSub,marginTop:3,letterSpacing:0}}>Müşteri ilişkileri ve hesap özeti</div></div>
        <button onClick={openNew} style={{padding:"9px 13px",background:T.accent,border:0,borderRadius:12,color:"#fff",fontWeight:750,cursor:"pointer",boxShadow:"0 5px 18px rgba(52,199,89,.18)"}}>＋ Yeni</button>
      </div>
      <div style={{padding:14}}>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Müşteri veya telefon ara…" style={{width:"100%",padding:12,marginBottom:14,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:10}}/>
        <div style={{marginBottom:14}}>
          <div style={{background:"rgba(52,199,89,.09)",border:"1px solid rgba(52,199,89,.18)",borderRadius:16,padding:"15px 14px"}}>
            <div style={{fontSize:10,color:T.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px"}}>Kayıtlı müşteri</div>
            <div style={{fontSize:26,fontWeight:850,color:T.text,marginTop:5}}>{customers.length}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{fontSize:12,color:T.textSub,flex:1}}>{filtered.length} müşteri · {monthLabel(selectedMonth)} harcamasına göre sıralı</div>
          <select value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)} aria-label="Ay seç" style={{maxWidth:155,padding:"8px 10px",background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:9,textTransform:"capitalize",fontSize:11}}>
            {availableMonths.map(month=><option key={month} value={month}>{monthLabel(month)}</option>)}
          </select>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map((c,index)=><button key={c.id} onClick={()=>setDetail(c)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"12px",textAlign:"left",background:"linear-gradient(110deg,rgba(255,255,255,.055),rgba(255,255,255,.025))",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,color:T.text,cursor:"pointer",minWidth:0}}>
          <div style={{width:42,height:42,flexShrink:0,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(52,199,89,.12)",border:"1px solid rgba(52,199,89,.2)",color:T.accentL,fontSize:16,fontWeight:850}}>{(c.name||"?").trim().charAt(0).toLocaleUpperCase("tr-TR")}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:800,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
            <div style={{fontSize:10,color:T.textSub,marginTop:4}}>{orderCountFor(c)} sipariş <span style={{padding:"0 4px",color:T.textDim}}>·</span> Sıra {index+1}</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:12,fontWeight:800,color:T.accentL}}>{fm(monthlyTotalFor(c))}</div>
            <div style={{fontSize:9,color:T.textSub,marginTop:3}}>{monthLabel(selectedMonth)}</div>
          </div>
          <div style={{fontSize:20,color:T.textDim,marginLeft:2}}>›</div>
        </button>)}
        </div>
        {!filtered.length&&<div style={{padding:"30px 20px",textAlign:"center",background:"rgba(255,255,255,.035)",border:"1px dashed rgba(255,255,255,.14)",borderRadius:16,color:T.textSub}}><div style={{fontSize:28,marginBottom:8}}>♙</div><div style={{fontSize:14,fontWeight:750,color:T.text,marginBottom:5}}>{query?"Müşteri bulunamadı":"Henüz müşteri eklenmemiş"}</div><div style={{fontSize:12,lineHeight:1.5,marginBottom:query?0:14}}>{query?"Farklı bir isim veya telefon deneyebilirsin.":"İlk müşteri profilini oluştur, kayıt burada otomatik görünsün."}</div>{!query&&<button onClick={openNew} style={{padding:"10px 14px",background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:750}}>＋ İlk müşteriyi ekle</button>}</div>}
      </div>
      {showForm&&<Modal><div style={{fontSize:18,fontWeight:800,marginBottom:16,color:T.text}}>{editing?"Müşteriyi Düzenle":"Yeni Müşteri"}</div>
        <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Ad soyad *</label><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Müşteri adı" style={{width:"100%",padding:12,marginBottom:12,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10}}/>
        <button onClick={saveCustomer} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>Kaydet</button>
        <button onClick={()=>setShowForm(false)} style={{width:"100%",padding:12,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Vazgeç</button>
      </Modal>}
      {detail&&<Modal><div style={{fontSize:18,fontWeight:800,color:T.text}}>{detail.name}</div><div style={{fontSize:12,color:T.textSub,margin:"5px 0 16px"}}>Müşteri özeti</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}><div style={{background:"rgba(52,199,89,.09)",border:"1px solid rgba(52,199,89,.16)",borderRadius:12,padding:13}}><div style={{fontSize:10,color:T.textSub,marginBottom:5}}>{monthLabel(selectedMonth)} harcaması</div><div style={{fontSize:18,fontWeight:850,color:T.accentL}}>{fm(monthlyTotalFor(detail))}</div></div><div style={{background:T.bg2,border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:13}}><div style={{fontSize:10,color:T.textSub,marginBottom:5}}>Toplam harcama</div><div style={{fontSize:18,fontWeight:850,color:T.text}}>{fm(totalFor(detail))}</div></div></div>
        <div style={{fontWeight:750,fontSize:13,color:T.text,marginBottom:8}}>Son adisyonlar</div>
        {orders.filter(o=>(o.customerId&&o.customerId===detail.id)||(!o.customerId&&o.g&&o.g.trim().toLocaleLowerCase("tr-TR")===detail.name.trim().toLocaleLowerCase("tr-TR"))).slice(0,6).map(o=><div key={o.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.06)",fontSize:12,color:T.text}}><span>{o.date} · {o.table||"Masa"}</span><b>{fm(o.total)}</b></div>)}
        <button onClick={()=>setDetail(null)} style={{width:"100%",padding:12,marginTop:14,background:T.bg3,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:10,fontWeight:700,cursor:"pointer"}}>Kapat</button>
      </Modal>}
      {ledgerAction&&detail&&<Modal><div style={{fontSize:18,fontWeight:800,color:T.text,marginBottom:6}}>{ledgerAction==="debt"?"Borç Ekle":"Tahsilat Al"}</div><div style={{fontSize:12,color:T.textSub,marginBottom:14}}>{detail.name} · Mevcut bakiye {fm(balanceFor(detail))}</div>
        <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Tutar (TL)</label><input autoFocus type="number" min="0.01" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0,00" style={{width:"100%",padding:12,marginBottom:12,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10}}/>
        {ledgerAction==="payment"&&<><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Tahsilat yöntemi</label><div style={{display:"flex",gap:8,marginBottom:12}}>{["cash","card"].map(m=><button key={m} onClick={()=>setMethod(m)} style={{flex:1,padding:10,background:method===m?"rgba(52,199,89,.15)":T.bg2,color:method===m?T.accentL:T.textSub,border:"1px solid "+(method===m?T.accent:"rgba(255,255,255,.1)"),borderRadius:9,cursor:"pointer"}}>{m==="cash"?"Nakit":"Kart"}</button>)}</div></>}
        <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Not (isteğe bağlı)</label><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Örn. önceki sipariş" style={{width:"100%",padding:12,marginBottom:14,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10}}/>
        <button onClick={saveLedger} disabled={ledgerSubmitting} style={{width:"100%",padding:13,background:ledgerSubmitting?T.bg3:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:ledgerSubmitting?"not-allowed":"pointer",opacity:ledgerSubmitting ? 0.65 : 1}}>{ledgerSubmitting?"Kaydediliyor…":ledgerAction==="debt"?"Borcu Kaydet":"Tahsilatı Kaydet"}</button><button onClick={()=>{ledgerSubmittingRef.current=false;setLedgerSubmitting(false);setLedgerAction(null);}} style={{width:"100%",padding:11,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Vazgeç</button>
      </Modal>}
    </div>
  );
}

/* ─── MENU ─── */
function MenuScreen({menu,setMenu,setV}){
  const[showAdd,setShowAdd]=useState(false);
  const[editingItem,setEditingItem]=useState(null);
  const[newName,setNewName]=useState("");
  const[newPrice,setNewPrice]=useState("");
  const[newCat,setNewCat]=useState("Kahve");
  const[addError,setAddError]=useState("");
  const cats=[...new Set(menu.map(m=>m.cat))];
  function openEdit(item){setEditingItem(item);setNewName(item.name);setNewPrice(String(item.price));setNewCat(item.cat);setAddError("");}
  function saveEdit(){
    const validated=validateMenuItemInput(newName,newPrice);
    if(validated.error){setAddError(validated.error);return;}
    setMenu(prev=>prev.map(m=>m.id===editingItem.id?{...m,name:validated.name,price:validated.price}:m));
    setEditingItem(null);setNewName("");setNewPrice("");setAddError("");
  }

  return(
    <div className="lurk-screen lurk-menu-screen">
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("settings")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.5px",flex:1}}>Menü</div>
        <button onClick={()=>setShowAdd(true)} style={{background:"#34C759",border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",color:"#fff",fontWeight:700}}>+ Ürün</button>
      </div>
      <div style={{padding:"14px"}}>
        {cats.map(cat=>(
          <div key={cat} style={{marginBottom:20}}>
            <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:10}}>{cat}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {menu.filter(m=>m.cat===cat).map(item=>(
                <div key={item.id} style={{background:item.on?T.bg2:"rgba(255,255,255,0.02)",border:"0.5px solid "+(item.on?"rgba(255,255,255,0.09)":"rgba(255,255,255,0.04)"),borderRadius:12,padding:"12px",position:"relative"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                    <div style={{fontSize:11,fontWeight:700,color:item.on?T.text:T.textDim,lineHeight:1.3,flex:1,paddingRight:6,textDecoration:item.on?"none":"line-through"}}>{item.name}</div>
                    <div onClick={()=>setMenu(p=>p.map(m=>m.id===item.id?{...m,on:!m.on}:m))} style={{width:28,height:16,borderRadius:8,background:item.on?"#34C759":"#333",position:"relative",cursor:"pointer",flexShrink:0}}>
                      <div style={{width:12,height:12,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:item.on?14:2,transition:"left 0.15s"}}/>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                    <div style={{fontSize:13,fontWeight:800,color:item.on?T.accentL:T.textDim}}>{fm(item.price)}</div>
                    <button onClick={()=>openEdit(item)} style={{padding:"6px 9px",background:T.bg3,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Düzenle</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {editingItem&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:16,color:T.text}}>Ürünü Düzenle</div>
          <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Ürün adı</label>
          <input autoFocus value={newName} onChange={e=>{setNewName(e.target.value);setAddError("");}} placeholder="Ürün adı" style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Fiyat (TL)</label>
          <input type="number" min="0.01" step="0.01" value={newPrice} onChange={e=>{setNewPrice(e.target.value);setAddError("");}} placeholder="Fiyat (TL)" style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          {addError&&<div role="alert" style={{fontSize:12,color:T.danger,marginBottom:10}}>{addError}</div>}
          <button onClick={saveEdit} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>Değişiklikleri Kaydet</button>
          <button onClick={()=>{setEditingItem(null);setAddError("");}} style={{width:"100%",padding:"10px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>İptal</button>
        </Modal>
      )}
      {showAdd&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:16,color:T.text}}>Yeni Ürün</div>
          <input placeholder="Ürün adı" value={newName} onChange={e=>setNewName(e.target.value)} style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:10,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <input type="number" min="0.01" step="0.01" placeholder="Fiyat (TL)" value={newPrice} onChange={e=>{setNewPrice(e.target.value);setAddError("");}} style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:10,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <select value={newCat} onChange={e=>setNewCat(e.target.value)} style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:16,background:"#1A1A1A",color:T.text}}>
            {cats.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          {addError&&<div role="alert" style={{fontSize:12,color:T.danger,marginBottom:10}}>{addError}</div>}
          <button onClick={()=>{const validated=validateMenuItemInput(newName,newPrice);if(validated.error){setAddError(validated.error);return;}setMenu(p=>[...p,{id:Date.now(),name:validated.name,price:validated.price,cat:newCat,on:true}]);setNewName("");setNewPrice("");setAddError("");setShowAdd(false);}} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.3)"}}>Ekle</button>
          <button onClick={()=>setShowAdd(false)} style={{width:"100%",padding:"10px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>İptal</button>
        </Modal>
      )}
    </div>
  );
}

/* ─── SETTINGS ─── */
function SettingsScreen({setV,tables,orders,logs,customers,creditEntries,menu,day,personalDebts,setTables,setOrders,setLogs,setCustomers,setCreditEntries,setMenu,setDay,setPersonalDebts}){
  const [backupMsg,setBackupMsg]=useState("");
  const [importMsg,setImportMsg]=useState("");
  const [pendingImport,setPendingImport]=useState(null);
  const [importBusy,setImportBusy]=useState(false);
  const [customerEditing,setCustomerEditing]=useState(null);
  const [customerName,setCustomerName]=useState("");
  const [customerError,setCustomerError]=useState("");
  function openCustomerEdit(customer){setCustomerEditing(customer);setCustomerName(customer.name||"");setCustomerError("");}
  function saveCustomerEdit(){
    const clean=customerName.trim();
    if(!clean){setCustomerError("Müşteri adı zorunlu.");return;}
    const duplicate=customers.find(c=>c.id!==customerEditing?.id&&c.name.trim().toLocaleLowerCase("tr-TR")===clean.toLocaleLowerCase("tr-TR"));
    if(duplicate){setCustomerError("Bu isimde başka bir müşteri zaten kayıtlı.");return;}
    setCustomers(prev=>prev.map(c=>c.id===customerEditing.id?{...c,name:clean,updatedAt:new Date().toISOString()}:c));
    setCustomerEditing(null);setCustomerError("");
  }
  function inspectBackup(file){
    setImportMsg("");setPendingImport(null);
    if(!file)return;
    if(file.size>20*1024*1024){setImportMsg("Dosya 20 MB sınırını aşıyor.");return;}
    setImportBusy(true);
    file.text().then(raw=>{
      const parsed=JSON.parse(raw);
      const validationError=validateBackup(parsed);
      if(validationError)throw new Error(validationError);
      setPendingImport({data:parsed.data,filename:file.name});
      setImportMsg("Yedek doğrulandı. Geri yükleme mevcut kayıtların yerine geçecek.");
    }).catch(e=>setImportMsg(e instanceof SyntaxError?"Dosya geçerli JSON değil.":(e?.message||"Yedek okunamadı."))).finally(()=>setImportBusy(false));
  }
  function applyBackup(){
    if(!pendingImport)return;
    const d=pendingImport.data;
    setTables(d.lurk_t);setOrders(d.lurk_o);setLogs(d.lurk_l);setCustomers(d.lurk_customers);setCreditEntries(d.lurk_credit);setMenu(d.lurk_m);setDay(d.lurk_d);if(Array.isArray(d.lurk_personal_debts))setPersonalDebts(d.lurk_personal_debts);
    setImportMsg("Yedek içeri aktarıldı. Kayıt göstergesi tamamlanana kadar uygulamayı kapatma.");
    setPendingImport(null);
  }
  function exportBackup(){
    const backup={app:"LURK POS",formatVersion:1,exportedAt:new Date().toISOString(),data:{lurk_t:tables,lurk_o:orders,lurk_l:logs,lurk_customers:customers,lurk_credit:creditEntries,lurk_m:menu,lurk_d:day,lurk_personal_debts:personalDebts}};
    const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download="lurk-pos-yedek-"+tod()+".json";
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    setBackupMsg("Yedek dosyası indirildi. Güvenli bir yerde sakla.");
  }
  return(
    <div className="lurk-screen lurk-settings-screen">
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:23,fontWeight:850,letterSpacing:"-.7px"}}>Ayarlar</div>
      </div>
      <div style={{padding:"14px"}}>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:10}}>Yönetim</div>
        <button onClick={()=>setV("menu")} style={{width:"100%",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"16px 14px",cursor:"pointer",textAlign:"left",color:T.text,display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
          <div style={{width:40,height:40,borderRadius:10,background:"rgba(52,199,89,0.12)",border:"0.5px solid rgba(52,199,89,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>☰</div>
          <div><div style={{fontSize:14,fontWeight:700}}>Menü</div><div style={{fontSize:12,color:T.textSub,marginTop:2}}>Ürün ekle, fiyat güncelle</div></div>
          <div style={{marginLeft:"auto",fontSize:18,color:T.textDim}}>›</div>
        </button>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",margin:"20px 0 10px"}}>Müşteri yönetimi</div>
        <div style={{background:T.bg2,border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:14,marginBottom:18}}>
          <div style={{fontSize:13,color:T.textSub,marginBottom:10}}>{customers.length} kayıtlı müşteri · Bilgilerini buradan düzenleyebilirsin.</div>
          {customers.length===0?<div style={{fontSize:12,color:T.textDim,padding:"8px 0"}}>Henüz kayıtlı müşteri yok.</div>:customers.slice().sort((a,b)=>a.name.localeCompare(b.name,"tr")).map(customer=><div key={customer.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:"1px solid rgba(255,255,255,.06)"}}>
            <div style={{width:32,height:32,borderRadius:10,background:"rgba(52,199,89,.12)",color:T.accentL,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,flexShrink:0}}>{(customer.name||"?").trim().charAt(0).toLocaleUpperCase("tr-TR")}</div>
            <div style={{flex:1,minWidth:0,fontSize:13,fontWeight:700,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{customer.name}</div>
            <button onClick={()=>openCustomerEdit(customer)} style={{padding:"7px 11px",background:T.bg3,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Düzenle</button>
          </div>)}
        </div>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",margin:"20px 0 10px"}}>Veri güvenliği</div>
        <div style={{background:T.bg2,border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:15}}>
          <div style={{fontSize:14,fontWeight:750,color:T.text}}>Veri yedeği</div>
          <div style={{fontSize:12,lineHeight:1.5,color:T.textSub,marginTop:5,marginBottom:13}}>Masa durumları, adisyonlar, raporlar, müşteriler, veresiye defteri ve menüyü tek bir JSON dosyasına indirir. Bu işlem mevcut kayıtları değiştirmez.</div>
          <button onClick={exportBackup} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>↓ Yedek İndir</button>
          {backupMsg&&<div role="status" style={{fontSize:12,color:T.accentL,marginTop:10}}>{backupMsg}</div>}
          <div style={{height:1,background:"rgba(255,255,255,.08)",margin:"16px 0"}}/>
          <div style={{fontSize:14,fontWeight:750,color:T.text}}>Yedekten geri yükle</div>
          <div style={{fontSize:12,lineHeight:1.5,color:T.textSub,marginTop:5,marginBottom:12}}>LURK POS tarafından oluşturulmuş, biçimi doğrulanmış JSON yedeği seç. Geri yükleme mevcut kayıtların yerine geçer.</div>
          <label style={{display:"block",boxSizing:"border-box",padding:13,textAlign:"center",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,color:T.text,fontWeight:750,cursor:"pointer"}}>
            {importBusy?"Yedek okunuyor…":"↑ Yedek Dosyası Seç"}
            <input type="file" accept=".json,application/json" disabled={importBusy} onChange={e=>inspectBackup(e.target.files?.[0])} style={{display:"none"}}/>
          </label>
          {importMsg&&<div role="status" style={{fontSize:12,lineHeight:1.5,color:pendingImport?T.warn:T.textSub,marginTop:10}}>{importMsg}</div>}
          {pendingImport&&<div style={{marginTop:10}}>
            <div style={{fontSize:12,color:T.textSub,marginBottom:10}}>Seçilen dosya: <b style={{color:T.text}}>{pendingImport.filename}</b></div>
            <button onClick={applyBackup} style={{width:"100%",padding:13,background:T.danger,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>Mevcut Verileri Değiştir ve Geri Yükle</button>
            <button onClick={()=>{setPendingImport(null);setImportMsg("Geri yükleme iptal edildi.");}} style={{width:"100%",padding:11,background:"transparent",color:T.textSub,border:0,cursor:"pointer",marginTop:4}}>İptal</button>
          </div>}
          <div style={{fontSize:11,color:T.textDim,marginTop:10}}>Önce mevcut verilerin yedeğini indir. Yedek hassas müşteri ve satış bilgileri içerebilir.</div>
        </div>
      </div>
      {customerEditing&&<Modal>
        <div style={{fontSize:17,fontWeight:800,color:T.text,marginBottom:14}}>Müşteriyi Düzenle</div>
        <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Ad soyad</label>
        <input autoFocus value={customerName} onChange={e=>{setCustomerName(e.target.value);setCustomerError("");}} placeholder="Müşteri adı" style={{width:"100%",padding:12,marginBottom:10,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10,boxSizing:"border-box"}}/>
        {customerError&&<div role="alert" style={{fontSize:12,color:T.danger,marginBottom:10}}>{customerError}</div>}
        <button onClick={saveCustomerEdit} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>Değişiklikleri Kaydet</button>
        <button onClick={()=>setCustomerEditing(null)} style={{width:"100%",padding:11,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Vazgeç</button>
      </Modal>}
    </div>
  );
}
/* ─── SHARED ─── */
function Modal({children}){
  return(
    <div className="lurk-modal-backdrop" style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:100,display:"flex",alignItems:"flex-end"}}>
      <div className="lurk-modal-panel" style={{background:"#171B18",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,margin:"0 auto",padding:"20px 16px 36px",maxHeight:"88vh",overflowY:"auto",border:"1px solid rgba(255,255,255,0.1)"}}>
        {children}
      </div>
    </div>
  );
}

function Confirm({title,msg,onOk,onCancel}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}}>
      <div style={{background:"#1C1C1E",borderRadius:16,width:280,overflow:"hidden",border:"0.5px solid rgba(255,255,255,0.12)"}}>
        <div style={{padding:"22px 18px 16px",textAlign:"center"}}>
          <div style={{fontWeight:700,fontSize:17,marginBottom:6,color:T.text}}>{title}</div>
          {msg&&<div style={{fontSize:13,color:T.textSub}}>{msg}</div>}
        </div>
        <div style={{borderTop:"0.5px solid rgba(255,255,255,0.08)",display:"flex"}}>
          <button onClick={onCancel} style={{flex:1,padding:"15px 0",background:"transparent",border:"none",borderRight:"0.5px solid rgba(255,255,255,0.08)",color:T.text,fontSize:16,cursor:"pointer"}}>İptal</button>
          <button onClick={onOk} style={{flex:1,padding:"15px 0",background:"transparent",border:"none",color:T.danger,fontWeight:700,fontSize:16,cursor:"pointer"}}>Onayla</button>
        </div>
      </div>
    </div>
  );
}
