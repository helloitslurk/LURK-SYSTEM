// Production deployment sync: customer form, day controls, and neutral table styling.
import{useState,useEffect,useRef}from"react";
import "./design-system.css";
import { createKeyedWriteQueue } from "./writeQueue.js";
import { validateMenuItemInput } from "./menuValidation.js";
import { validatePayment } from "./paymentValidation.js";

const SB_URL="https://dpucptcrxoddfpvaqsdl.supabase.co";
const SB_KEY="sb_publishable_YiTDrcX7nnotBkoWqEWaHQ_tYHlT3NK";
let lastStorageWriteError="";

const MENU=[
{id:101,name:"CIGARETTE FILTER",price:50,cat:"Kahve",on:true},
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
{id:301,name:"BLACK TEA",price:50,cat:"Cay",on:true},
{id:302,name:"HERBAL TEA",price:180,cat:"Cay",on:true},
{id:303,name:"ICE TEA",price:220,cat:"Cay",on:true},
{id:610,name:"HOMEMADE AZAHAR LEMONADE",price:350,cat:"Signature Drinks",on:true},
{id:611,name:"SMOOTHIE",price:350,cat:"Signature Drinks",on:true},
{id:612,name:"HOMEMADE AYRAN",price:250,cat:"Signature Drinks",on:true},
{id:613,name:"HOMEMADE ICE TEA",price:250,cat:"Signature Drinks",on:true},
{id:614,name:"COLA & ICE TEA",price:100,cat:"Soft Drinks",on:true},
{id:615,name:"ICE",price:20,cat:"Ekstra",on:true},
{id:616,name:"+ ESPRESSO",price:50,cat:"Ekstra",on:true},
{id:617,name:"TURKISH COFFEE",price:100,cat:"Kahve",on:true},
{id:401,name:"MUHAMMARA SANDWICH",price:330,cat:"Sandvic",on:true},
{id:402,name:"ROASTED PEPPER SANDWICH",price:330,cat:"Sandvic",on:true},
{id:403,name:"PESTO SANDWICH",price:300,cat:"Sandvic",on:true},
{id:404,name:"TUNA SANDWICH",price:300,cat:"Sandvic",on:true},
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
  bg:"#F7F8F6",bg2:"#FFFFFF",bg3:"#EEF3EE",
  border:"#E4EAE4",border2:"#D4DED4",
  accent:"#168D35",accentL:"#258E3D",accentD:"#126C2B",
  text:"#172019",textSub:"#68756B",textDim:"#929C94",
  danger:"#D94841",warn:"#C98518",
};

function posSessionToken(){
  try{
    const persistent=localStorage.getItem("lurk_pos_session");
    if(persistent)return persistent;
    const legacy=sessionStorage.getItem("lurk_pos_session")||"";
    if(legacy)localStorage.setItem("lurk_pos_session",legacy);
    return legacy;
  }catch(e){try{return sessionStorage.getItem("lurk_pos_session")||"";}catch(_){return "";}}
}
async function sbGet(key,fb){
  const token=posSessionToken();
  if(!token)throw new Error("POS session not found.");
  const r=await fetch(SB_URL+"/rest/v1/rpc/lurk_pos_storage_get",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_session_token:token,p_key:key})});
  if(!r.ok)throw new Error("Supabase read failed for "+key+" ("+r.status+")");
  const value=await r.json();
  if(value===null)return fb;
  if(typeof value==="string"){try{return JSON.parse(value);}catch(e){return fb;}}
  return value;
}
async function sbSetNow(key,val){
  const token=posSessionToken();
  if(!token){lastStorageWriteError="POS session not found. Please sign in again with your PIN.";console.error(lastStorageWriteError);return false;}
  let lastError;
  for(let attempt=0;attempt<3;attempt++){
    try{
      const r=await fetch(SB_URL+"/rest/v1/rpc/lurk_pos_storage_set",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_session_token:token,p_key:key,p_value:val})});
      const responseText=await r.text();
      if(r.ok){
        if(responseText.trim()==="false")throw new Error("Supabase session is invalid or the write was rejected ("+key+").");
        lastStorageWriteError="";
        return true;
      }
      let detail=responseText;
      try{const parsed=JSON.parse(responseText);detail=parsed.message||parsed.details||parsed.hint||responseText;}catch(e){}
      lastError=new Error("Save error "+key+" (HTTP "+r.status+"): "+String(detail).slice(0,260));
    }catch(e){lastError=e;}
    if(attempt<2)await new Promise(resolve=>setTimeout(resolve,350*(attempt+1)));
  }
  lastStorageWriteError=(lastError&&lastError.message)||("Supabase write failed for "+key);
  console.error(lastStorageWriteError);
  return false;
}
const sbSet=createKeyedWriteQueue(sbSetNow);

function lurkPlusSlug(name){
  const slug=String(name||"uye").trim().toLocaleLowerCase("en-US")
    .replace(/ı/g,"i").replace(/ğ/g,"g").replace(/ü/g,"u")
    .replace(/ş/g,"s").replace(/ö/g,"o").replace(/ç/g,"c")
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  return slug||"uye";
}
const LURK_PLUS_ORIGIN="https://plus.lurk.com.tr";
function lurkPlusUrl(member,token,members=[]){
  const base=lurkPlusSlug(member?.name);
  const duplicate=members.some(m=>m.id!==member?.id&&lurkPlusSlug(m.name)===base);
  const slug=duplicate?base+"-"+String(member?.id||"").slice(-5):base;
  return LURK_PLUS_ORIGIN+"/"+slug+"?lurkplus="+encodeURIComponent(token);
}
function fm(v){return(v||0).toLocaleString("en-US",{minimumFractionDigits:2})+" TL";}
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
  return <POSApp onLock={()=>{try{localStorage.removeItem("lurk_pos_session");sessionStorage.removeItem("lurk_pos_session");}catch(e){}setAuth("locked");}}/>;
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
      if(!r.ok)throw new Error("Authentication failed.");
      const token=await r.json();
      if(typeof token!=="string"||token.length<32){setError("Incorrect PIN. Please try again.");return;}
      let stored=false;
      try{localStorage.setItem("lurk_pos_session",token);stored=true;}catch(storageError){}
      try{sessionStorage.setItem("lurk_pos_session",token);stored=true;}catch(storageError){}
      if(!stored)throw new Error("The session could not be stored in this browser. Check your privacy settings.");
      onLogin();
    }catch(e){setError(e.message||"Connection error. Please try again.");}
    finally{setBusy(false);}
  }
  return <div style={{minHeight:"100vh",background:"#090B0A",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"sans-serif",color:"#F5F5F5",position:"relative"}}>
        <form onSubmit={submit} style={{width:"100%",maxWidth:340,background:"#151916",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:26,boxSizing:"border-box",textAlign:"center"}}>
      <img src="/lurk-logo.svg" alt="LURK." style={{display:"block",width:230,maxWidth:"72vw",height:"auto",margin:"0 auto 18px"}} />
      <div style={{fontSize:11,letterSpacing:3,color:"#34C759",marginTop:0,marginBottom:28}}>POS SYSTEM</div>
      <div style={{fontSize:14,color:"#A0A0A0",marginBottom:12}}>Enter your PIN to continue.</div>
      <input type="password" inputMode="numeric" autoComplete="current-password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="••••••" maxLength={32} autoFocus style={{width:"100%",boxSizing:"border-box",padding:15,borderRadius:11,border:"1px solid rgba(255,255,255,.15)",background:"#090B0A",color:"#fff",fontSize:22,letterSpacing:8,textAlign:"center",outline:"none"}}/>
      {error&&<div role="alert" style={{fontSize:12,color:"#FF453A",marginTop:12}}>{error}</div>}
      <button type="submit" disabled={busy||pin.length<6} style={{width:"100%",padding:14,marginTop:18,border:0,borderRadius:11,background:"#34C759",color:"#071009",fontWeight:800,fontSize:14,cursor:"pointer",opacity:busy||pin.length<6?.55:1}}>{busy?"Checking…":"Sign In"}</button>
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
  const[sidebarCollapsed,setSidebarCollapsed]=useState(false);
  const[balancesVisible,setBalancesVisible]=useState(()=>{try{return localStorage.getItem("lurk_amounts_visible")!=="false";}catch(e){return true;}});
  const[profileOpen,setProfileOpen]=useState(false);
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
  useEffect(()=>{try{localStorage.setItem("lurk_amounts_visible",String(balancesVisible));}catch(e){}},[balancesVisible]);
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
        msg("Save failed: "+(lastStorageWriteError||"Unknown save error"));
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
      msg("Save failed. Tap the alert above to try again.");
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
      setTbl((Array.isArray(t)?t:[]).map(table=>{
        const legacyName=String(table?.lbl||"").trim();
        if(/^masa\\s*1$/i.test(legacyName)||/^table\\s*0?1$/i.test(legacyName))return {...table,lbl:"MOJO"};
        if(/^masa\\s*2$/i.test(legacyName)||/^table\\s*0?2$/i.test(legacyName))return {...table,lbl:"DEREN"};
        return table;
      }));
      setOrd((Array.isArray(o)?o:[]).slice().reverse().map((order,index)=>({...order,orderNumber:Number(order.orderNumber)||index+1})).reverse());
      setCustomers(Array.isArray(c)?c:[]);
      setCreditEntries(Array.isArray(ce)?ce:[]);
      setLurkPlusMembers(Array.isArray(lp)?lp:[]);
      setPersonalDebts((Array.isArray(pd)?pd:PERSONAL_DEBT_SEED).map(x=>x.id==="hepsiburada-limiti"&&Number(x.total)===6880&&!(x.payments||[]).length?{...x,total:22000,payments:[{id:"hepsiburada-history",amount:15120,date:null,note:"Previously paid amount (date not specified)",historical:true}]}:x).map(x=>x.id==="ucuncuoglu"?{...x,total:130000,installments:(x.installments||[]).map((it,i)=>i===8?{...it,amount:10000}:it)}:x));
      const existing=new Set((Array.isArray(l)?l:[]).map(x=>x.date));
      const merged=[...(Array.isArray(l)?l:[]),...HISTORY.filter(h=>!existing.has(h.date))].sort((a,b)=>b.date.localeCompare(a.date));
      setLogs(merged);
      if(m&&Array.isArray(m)){
        const ids=new Set(MENU.map(x=>x.id));
        const refreshedIds=new Set([102,103,104,106,107,110,113,114,201,202,203,204,205,601]);
        const retiredIds=new Set([201,205]);
        let mm=MENU.map(mi=>{const f=m.find(x=>x.id===mi.id);return f?{...mi,name:refreshedIds.has(mi.id)?mi.name:(f.name||mi.name),price:refreshedIds.has(mi.id)?mi.price:f.price,on:f.on,cat:refreshedIds.has(mi.id)?mi.cat:(f.cat||mi.cat)}:mi;});
        m.filter(x=>!ids.has(x.id)&&!retiredIds.has(x.id)).forEach(x=>mm.push(x));
        const coffeeKey=name=>String(name||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/İ/g,"I").replace(/ı/g,"I").toUpperCase().replace(/\s+/g," ").trim();
        const isCoffeeName=name=>["TURKISH COFFEE","TURK KAHVESI"].includes(coffeeKey(name));
        const savedCoffee=m.filter(x=>isCoffeeName(x.name));
        const canonicalCoffee=savedCoffee.find(x=>coffeeKey(x.name)==="TURKISH COFFEE")||savedCoffee.find(x=>coffeeKey(x.name)==="TURK KAHVESI")||mm.find(x=>x.id===617)||mm.find(x=>isCoffeeName(x.name));
        if(canonicalCoffee){
          const unifiedCoffee={...canonicalCoffee,name:"TURKISH COFFEE",cat:canonicalCoffee.cat||"Kahve"};
          const firstCoffeeIndex=mm.findIndex(x=>isCoffeeName(x.name));
          mm=mm.filter(x=>!isCoffeeName(x.name));
          mm.splice(Math.max(0,firstCoffeeIndex),0,unifiedCoffee);
        }
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
    msg("Day closed · "+fm(inc));
  }

  function addItem(tid,item){
    const table=tables.find(t=>t.id===tid);
    const member=table?.lurkPlusId?lurkPlusMembers.find(m=>m.id===table.lurkPlusId):null;
    const isCoffeeMember=member?.membershipType==="coffee";
    const charged=!!member;
    if(member&&isCoffeeMember&&(Number(member.coffeeCredits)||0)<1){msg("No coffee credits remaining. "+member.name);return false;}
        if(charged)setLurkPlusMembers(prev=>prev.map(m=>{
      if(m.id!==member.id)return m;
      const date=new Date().toISOString();
      if(m.name.trim().toLocaleLowerCase("en-US")==="beliz"){
        const kisses=(m.history||[]).reduce((n,h)=>n+(h.type==="kiss_debt"?(Number(h.amount)||0):h.type==="kiss_refund"?-(Number(h.amount)||0):0),0)+1;
        return{...m,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:"kiss_debt",date,amount:1,balanceAfter:kisses,itemName:item.name,table:table?.lbl||""}]};
      }
      if(m.membershipType==="coffee"){
        const nextCredits=Math.max(0,(Number(m.coffeeCredits)||0)-1);
        return{...m,coffeeCredits:nextCredits,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:"credit_use",date,amount:1,balanceAfter:nextCredits,itemName:item.name,table:table?.lbl||""}]};
      }
      const nextBalance=m.unlimited?(Number(m.balance)||0):Math.round(((Number(m.balance)||0)-Number(item.price||0))*100)/100;
      return{...m,balance:nextBalance,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:"purchase",date,amount:Number(item.price)||0,balanceAfter:m.unlimited?"Unlimited":nextBalance,itemName:item.name,table:table?.lbl||""}]};
    }));
    setTbl(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      return{...t,s:"o",oa:t.oa||new Date().toISOString(),order:[...t.order,{...item,qty:1,oid:uid(),addedAt:new Date().toISOString(),revenueExcluded:member?.name?.trim().toLocaleLowerCase("en-US")==="beliz",lurkPlusCharged:charged,lurkPlusCreditCharged:charged&&isCoffeeMember}]};
    }));
    if(charged)msg(member.name.trim().toLocaleLowerCase("en-US")==="beliz"?"Beliz · owes 1 kiss 💋":isCoffeeMember?member.name+" · 1 coffee credit deducted.":member.name+" · "+fm(item.price)+" deducted from the LURK+ balance.");
    return true;
  }
  function setTableCustomer(tid,customer){
    const clean=typeof customer==="string"?customer.trim():(customer?.name||"").trim();
    setTbl(prev=>prev.map(t=>t.id===tid?{...t,g:clean,customerId:typeof customer==="object"&&customer?.id?customer.id:null,lurkPlusId:typeof customer==="object"&&customer?.legacyLurkPlus?customer.id:null}:t));
  }
  function chQ(tid,lineId,d){
    const table=tables.find(t=>t.id===tid);
    const line=table?.order.find(o=>(o.oid||String(o.id))===lineId);
    const member=table?.lurkPlusId?lurkPlusMembers.find(m=>m.id===table.lurkPlusId):null;
    if(member&&line?.lurkPlusCharged){
      if(member.name.trim().toLocaleLowerCase("en-US")==="beliz"){
         setLurkPlusMembers(prev=>prev.map(m=>{if(m.id!==member.id)return m;const date=new Date().toISOString();const kisses=(m.history||[]).reduce((n,h)=>n+(h.type==="kiss_debt"?(Number(h.amount)||0):h.type==="kiss_refund"?-(Number(h.amount)||0):0),0)-d;return{...m,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:d<0?"kiss_debt":"kiss_refund",date,amount:Math.abs(d),balanceAfter:kisses,itemName:line.name,table:table?.lbl||""}]};}));
       }else if(line.lurkPlusCreditCharged){
        if(d>0&&(Number(member.coffeeCredits)||0)<d){msg("Note enough coffee credits.");return;}
        setLurkPlusMembers(prev=>prev.map(m=>{if(m.id!==member.id)return m;const date=new Date().toISOString();const nextCredits=Math.max(0,(Number(m.coffeeCredits)||0)-d);return{...m,coffeeCredits:nextCredits,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:d<0?"credit_refund":"credit_use",date,amount:Math.abs(d),balanceAfter:nextCredits,itemName:line.name,table:table?.lbl||""}]};}));
      }else{
                setLurkPlusMembers(prev=>prev.map(m=>{if(m.id!==member.id)return m;const amount=Math.abs(d*Number(line.price||0));const nextBalance=Math.round(((Number(m.balance)||0)-(d*Number(line.price||0)))*100)/100;return{...m,balance:nextBalance,updatedAt:new Date().toISOString(),history:[...(m.history||[]),{id:uid(),type:d<0?"refund":"purchase",date:new Date().toISOString(),amount,balanceAfter:nextBalance,itemName:line.name,table:table?.lbl||""}]};}));
      }
    }
    setTbl(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      const order=t.order.map(o=>(o.oid||String(o.id))===lineId?{...o,qty:o.qty+d}:o).filter(o=>o.qty>0);
      return{...t,order,s:order.length>0?"o":"free"};
    }));
  }
  function moveTableOrder(sourceId,targetId,selections){
    if(sourceId===targetId){msg("You need to move items to a different table.");return;}
    const source=tables.find(t=>t.id===sourceId);
    const target=tables.find(t=>t.id===targetId);
    if(!source||!target||!Array.isArray(source.order)||source.order.length===0){msg("No open order found to move.");return;}
    const requested=Array.isArray(selections)?selections:[];
    const moving=[],remaining=[];
    source.order.forEach(line=>{
      const key=line.oid||String(line.id);
      const qty=Math.max(0,Math.min(Number(line.qty)||0,Number(requested.find(x=>x.key===key)?.qty)||0));
      if(qty>0)moving.push({...line,qty});
      if((Number(line.qty)||0)-qty>0)remaining.push({...line,qty:(Number(line.qty)||0)-qty});
    });
    if(!moving.length){msg("Select at least one item/quantity to move.");return;}
    if(source.partialPayments?.length&&remaining.length){msg("Before splitting an order with a partial payment, keep all remaining items on the same table.");return;}
    if((source.lurkPlusId||target.lurkPlusId)&&source.lurkPlusId!==target.lurkPlusId){msg("Items linked to a LURK+ balance cannot be moved to a table assigned to another member.");return;}
    setTbl(prev=>prev.map(t=>{
      if(t.id===sourceId)return {...t,order:remaining,partialPayments:remaining.length?(t.partialPayments||[]):[],s:remaining.length?"o":"free",g:remaining.length?t.g:"",customerId:remaining.length?t.customerId:null,lurkPlusId:remaining.length?t.lurkPlusId:null,oa:remaining.length?t.oa:null};
      if(t.id===targetId)return {...t,order:[...(Array.isArray(t.order)?t.order:[]),...moving],partialPayments:[...(Array.isArray(t.partialPayments)?t.partialPayments:[]),...(remaining.length?[]:(source.partialPayments||[]))],s:"o",oa:t.oa||new Date().toISOString(),g:t.g||"",customerId:t.customerId||null,lurkPlusId:t.lurkPlusId||null};
      return t;
    }));
    msg(moving.reduce((sum,line)=>sum+line.qty,0)+" items "+target.lbl+" moved to the table.");
    setSel(null);setV("tables");
  }

  function pay(tid,pt,disc,payments,partial=false){
    if(paymentInProgress.current)return;
    const t=tables.find(x=>x.id===tid);
    if(!t)return;
    const grossSubtotal=t.order.reduce((s,o)=>s+(o.revenueExcluded?0:(Number(o.price)||0)*(Number(o.qty)||0)),0);
    const itemDiscountTotal=t.order.reduce((s,o)=>s+(o.revenueExcluded?0:Math.min((Number(o.price)||0)*(Number(o.qty)||0),Math.max(0,Number(o.discount)||0))),0);
    const sub=Math.max(0,grossSubtotal-itemDiscountTotal);
    const previousPayments=Array.isArray(t.partialPayments)?t.partialPayments:[];
    const previousPaid=previousPayments.reduce((sum,p)=>sum+(Number(p.amount)||0),0);
    const isCredit=pt==="credit";
    const isLurkPlus=!!t.lurkPlusId;
    if(partial&&(isCredit||isLurkPlus)){msg("Partial payments are currently available only for cash/card orders.");return;}
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
      msg("Partial payment recorded · "+fm(paidNow)+" · Remaining "+fm(due-paidNow));
      return;
    }
    const allPayments=normalized;
    const orderId=uid();
    let storedNext=1;try{storedNext=Number(localStorage.getItem("lurk_next_order_number"))||1;}catch(e){}
    const orderNumber=Math.max(storedNext,orders.reduce((max,o)=>Math.max(max,Number(o.orderNumber)||0),0)+1);
    try{localStorage.setItem("lurk_next_order_number",String(orderNumber+1));}catch(e){}
    const methodSet=[...new Set(allPayments.map(p=>p.method))];
    const order={id:orderId,orderNumber,date:tod(),status:"completed",total:finalTotal,subtotal:grossSubtotal,itemDiscount:itemDiscountTotal,orderDiscount:Math.max(0,sub-finalTotal),discount:itemDiscountTotal+Math.max(0,sub-finalTotal),pt:isLurkPlus?"lurkPlus":isCredit?"credit":(methodSet.length>1?"split":(methodSet[0]||pt)),payments:allPayments,g:t.g||"",customerId:t.customerId||null,table:t.lbl,items:t.order.map(o=>({name:o.name,qty:o.qty,price:o.revenueExcluded?0:o.price,discount:Number(o.discount)||0,cat:o.cat,oid:o.oid||uid(),addedAt:o.addedAt||null,revenueExcluded:!!o.revenueExcluded}))};
    paymentInProgress.current=true;setTimeout(()=>{paymentInProgress.current=false;},900);
    setOrd(prev=>[order,...prev]);
    if(isCredit&&finalTotal>0)setCreditEntries(prev=>[{id:uid(),customerId:t.customerId,customerName:t.g||"",type:"debt",amount:finalTotal,method:"credit",date:new Date().toISOString(),orderId,note:"Adisyon veresiye"},...prev]);
    setTbl(prev=>prev.map(tb=>tb.id===tid?{...tb,order:[],partialPayments:[],s:"free",g:"",customerId:null,lurkPlusId:null}:tb));
    msg(isLurkPlus?"LURK+ order closed · "+fm(finalTotal):isCredit?"On account kaydedildi · "+fm(finalTotal):"Payment received · "+fm(finalTotal));
    setSel(null);setV("tables");
  }

  const curT=tables.find(t=>t.id===sel);
  const cats=[...new Set(menu.filter(m=>m.on).map(m=>m.cat))];

  if(loadError)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:T.bg,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",padding:24,color:T.text}}>
      <div style={{maxWidth:420,textAlign:"center",background:T.bg2,border:"1px solid rgba(255,255,255,.1)",borderRadius:18,padding:24}}>
        <div style={{fontSize:26,marginBottom:12}}>⚠</div>
        <div style={{fontSize:18,fontWeight:800,marginBottom:8}}>Data could not be loaded</div>
        <div style={{fontSize:13,lineHeight:1.6,color:T.textSub,marginBottom:18}}>The app was paused to prevent overwriting records because the Supabase connection failed. Check your internet connection and try again.</div>
        <button onClick={()=>window.location.reload()} style={{width:"100%",padding:13,border:0,borderRadius:10,background:T.accent,color:"#fff",fontWeight:800,cursor:"pointer"}}>Try Again</button>
      </div>
    </div>
  );

  if(!ok)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>
      <div style={{textAlign:"center"}}>
        <img src="/lurk-logo.svg" alt="LURK." style={{display:"block",width:190,maxWidth:"65vw",height:"auto",margin:"0 auto 18px"}} />
        <div style={{fontSize:13,color:T.textSub}}>Loading...</div>
      </div>
    </div>
  );

  const NAV=[
    {k:"home",label:"Dashboard",icon:"⌂"},
    {k:"reports",label:"Reports",icon:"≡"},
    {k:"tables",label:"Tables",icon:"⊞"},
    {k:"lurkPlus",label:"LURK+",icon:"＋"},
  ];

  return(
    <div className={"lurk-root"+(sidebarCollapsed?" lurk-root-collapsed":"")}>
      <aside className="lurk-shell-sidebar" aria-label="Ana gezinme">
        <div className="lurk-shell-brand">
          <img src="/lurk-logo.svg" alt="LURK."/>
          <span className={"lurk-pos-status "+(day?"is-open":"is-closed")} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:36,padding:"5px 8px",borderRadius:7,fontSize:10,fontWeight:850,letterSpacing:".14em",color:day?"#137a3c":"#c33c3c",background:day?"#e1f5e8":"#fde9e8",boxShadow:day?"inset 0 0 0 1px #bce8cb":"inset 0 0 0 1px #f5c8c5"}} title={day?"Business day started":"Business day closed"}>POS</span>
          <button className="lurk-sidebar-toggle" onClick={()=>setSidebarCollapsed(v=>!v)} aria-label={sidebarCollapsed?"Expand menu":"Collapse menu"} title={sidebarCollapsed?"Expand menu":"Collapse menu"}>{sidebarCollapsed?"»":"«"}</button>
        </div>
        <div className="lurk-shell-section-label">{sidebarCollapsed?"MENU":"WORKSPACE"}</div>
        <nav className="lurk-shell-nav">
          {[{k:"home",label:"Dashboard",icon:"⌂"},{k:"reports",label:"Reports",icon:"▤"},{k:"tables",label:"Tables",icon:"▦"},{k:"lurkPlus",label:"LURK+",icon:"✳"}].map(n=><button key={n.k} className={view===n.k?"active":""} onClick={()=>setV(n.k)} aria-current={view===n.k?"page":undefined} title={sidebarCollapsed?n.label:undefined}><span className="lurk-shell-nav-icon">{n.icon}</span><span className="lurk-shell-nav-label">{n.label}</span>{view===n.k&&<i/>}</button>)}
        </nav>
        <div className="lurk-shell-sidebar-footer"><i className={day?"online-dot":"offline-dot"}/><div><b>LURK Coffee</b><small>{day?"Business open":"Business closed"}</small></div><button onClick={onLock} aria-label="Lock screen">⌑</button></div>
      </aside>
      <div style={{position:"relative"}}><div className="lurk-app" style={{background:T.bg,minHeight:view==="order"?"100dvh":"100vh",height:view==="order"?"100dvh":"auto",overflow:view==="order"?"hidden":"visible",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",color:T.text,width:"100%",margin:"0 auto",paddingBottom:view==="order"?0:76,boxSizing:"border-box"}}>
      <div className="lurk-global-topbar">
        <div className="lurk-global-brand">LURK<span>.</span></div>
        <div className="lurk-global-actions">
          <span className="lurk-global-date">{new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"})}</span>
          <button className="lurk-icon-button" onClick={()=>setBalancesVisible(v=>!v)} aria-label={balancesVisible?"Hide amounts":"Show amounts"} title={balancesVisible?"Hide amounts":"Show amounts"}>{balancesVisible?"◉":"⊘"}</button>
          <div className="lurk-profile-wrap">
            <button className="lurk-profile-avatar" onClick={()=>setProfileOpen(v=>!v)} aria-expanded={profileOpen} aria-label="Open profile menu">L</button>
            {profileOpen&&<div className="lurk-profile-menu">
              <div className="lurk-profile-menu-heading">LURK POS</div>
              <button onClick={()=>{setV("personal");setProfileOpen(false);}}>Personal Finance</button>
              <button onClick={()=>{setV("menu");setProfileOpen(false);}}>Menu & Products</button>
              <button onClick={()=>{setV("settings");setProfileOpen(false);}}>Settings</button>
              <button onClick={()=>{setProfileOpen(false);onLock();}}>Lock Screen</button>
            </div>}
          </div>
        </div>
      </div>
      <style>{`        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .lurk-app { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
        .lurk-app button, .lurk-app button div, .lurk-app button span { font-family: Inter, "Helvetica Neue", Arial, sans-serif; }
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
          .lurk-home-screen { height: calc(100dvh - 76px); min-height: 620px; display: flex; flex-direction: column; overflow: hidden; }
          .lurk-home-screen > div:first-child { padding: 18px 32px 16px !important; flex: 0 0 auto; }
          .lurk-home-screen > div:first-child .lurk-home-stats { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 10px !important; }
          .lurk-home-screen > div:nth-child(2) { padding: 14px 32px 0 !important; flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; }
          .lurk-home-screen > div:nth-child(2) .lurk-home-pages-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 12px !important; flex: 1 1 auto; min-height: 0; }
          .lurk-home-screen .lurk-home-page-card { min-height: 0 !important; height: 100%; padding: 20px 22px !important; display: flex; flex-direction: column; justify-content: center; }
          .lurk-home-screen .lurk-home-page-card > div:nth-child(2) { font-size: 30px !important; margin-bottom: 16px !important; }
          .lurk-home-screen .lurk-home-page-card > div:nth-child(3) { font-size: 19px !important; }
          .lurk-home-screen .lurk-home-page-card > div:nth-child(4) { font-size: 13px !important; }
          .lurk-home-screen > div:nth-child(3) { padding: 12px 32px 14px !important; flex: 0 0 auto; }
          .lurk-home-screen > div:nth-child(3) button { min-height: 50px; }
          .lurk-tables-screen > div:nth-child(2), .lurk-reports-screen > div:nth-child(n+2), .lurk-customers-screen > div:nth-child(n+2), .lurk-menu-screen > div:nth-child(2), .lurk-settings-screen > div:nth-child(2) { padding-left: 28px !important; padding-right: 28px !important; }
          .lurk-tables-screen > div:nth-child(2), .lurk-reports-screen > div:nth-child(n+2), .lurk-customers-screen > div:nth-child(n+2), .lurk-menu-screen > div:nth-child(2), .lurk-settings-screen > div:nth-child(2) { padding-left: 28px !important; padding-right: 28px !important; }
          .lurk-order-screen { height: 100vh; }
          .lurk-order-screen > div:first-child { padding: 16px 24px !important; }
          .lurk-order-screen > div:nth-child(2) { max-width: 1500px; width: 100%; margin: 0 auto; }
        }
        @media (min-width: 700px) and (max-width: 1099px) {
          .lurk-app [style*="grid-template-columns: 1fr 1fr"], .lurk-product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 699px) {\n          .lurk-home-stats > div { padding: 9px 6px !important; border-radius: 10px !important; }\n          .lurk-home-stats > div > div:nth-child(2) { font-size: clamp(10px, 2.65vw, 13px) !important; letter-spacing: -0.55px !important; }\n        }\n        .lurk-folder-debt-list { grid-template-columns: 1fr !important; }
        .lurk-folder-debt-row { display:grid; grid-template-columns:minmax(170px,1.1fr) minmax(180px,.9fr) minmax(180px,.9fr); align-items:center; column-gap:16px; }
        .lurk-folder-debt-row > div:first-child { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important; font-size:16px !important; font-weight:800 !important; letter-spacing:-.25px; line-height:1.3 !important; }
        .lurk-folder-debt-row > div:first-child { grid-column:1; }
        .lurk-folder-debt-row > div:nth-child(2) { grid-column:2; margin-top:0 !important; }
        .lurk-folder-debt-row > div:nth-child(3) { grid-column:3; margin-top:0 !important; }
        .lurk-folder-debt-row > div:nth-child(4) { grid-column:1 / -1; }
        .lurk-folder-debt-row > button, .lurk-folder-debt-row > div:nth-child(n+5) { grid-column:1 / -1; }
        @media (max-width: 699px) {
          .lurk-folder-debt-row { grid-template-columns:minmax(0,1fr) minmax(0,1fr); row-gap:9px; }
          .lurk-folder-debt-row > div:first-child { grid-column:1 / -1; }
          .lurk-folder-debt-row > div:nth-child(2), .lurk-folder-debt-row > div:nth-child(3) { grid-column:auto; }
          .lurk-folder-debt-row > div:nth-child(4), .lurk-folder-debt-row > button, .lurk-folder-debt-row > div:nth-child(n+5) { grid-column:1 / -1; }
        }
        .lurk-personal-debt-list { grid-template-columns: 1fr !important; }
        .lurk-personal-debt-row { display: grid; grid-template-columns: minmax(0,1fr) minmax(220px,.9fr); align-items: center; column-gap: 18px; }
        .lurk-personal-debt-row > div:nth-child(2) { margin-top: 0 !important; }
        .lurk-personal-debt-row > div:nth-child(n+3) { grid-column: 1 / -1; }
        @media (max-width: 699px) {
          .lurk-personal-debt-row { grid-template-columns: minmax(0,1fr); row-gap: 10px; }
          .lurk-personal-debt-row > div:nth-child(2) { grid-column: 1; }
        }
        .lurk-customer-grid { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
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
        .lurk-month-review-select { background: #E9E1CF !important; background-color: #E9E1CF !important; color: #171914 !important; border-color: #F6EFDF !important; color-scheme: light; }
        .lurk-month-review-select option { background: #E9E1CF !important; color: #171914 !important; }
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
          .lurk-app { padding-left: 248px !important; padding-bottom: 0 !important; }
          .lurk-bottom-nav { display: none !important; }
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
          .lurk-screen:not(.lurk-order-screen) { width: 100% !important; max-width: none !important; margin-left: 0 !important; margin-right: 0 !important; }
          .lurk-order-screen { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
        }

        @media (min-width: 700px) {
          .lurk-modal-backdrop { align-items: center !important; padding: 24px; }
          .lurk-modal-panel { max-width: 520px !important; border-radius: 20px !important; padding: 28px !important; box-shadow: 0 24px 80px rgba(0,0,0,.5); }
        }

        /* LURK POS 5.0 · Editorial Green home */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        .lurk-app { font-family: Manrope, Inter, sans-serif !important; }
        .lurk-app .editorial-home { background:#F7F8F4 !important; color:#193B2B !important; min-height:calc(100vh - 76px); }
        .lurk-app .editorial-home-header { background:#FFFFFF !important; border-bottom:1px solid #E7EBE4 !important; padding:28px 34px 24px !important; }
        .lurk-app .editorial-home-header img { width:184px !important; }
        .lurk-app .editorial-home-header span { color:#718176 !important; }
        .lurk-app .editorial-home-header span[style*="font-weight: 750"] { color:#278653 !important; }
        .lurk-app .editorial-home-header button { background:#F4F7F2 !important; border:1px solid #E2E9E0 !important; color:#315842 !important; }
        .lurk-app .editorial-home-header > div > div:last-child > div { background:#EEF5EE !important; border:1px solid #DCE9DD !important; }
        .lurk-app .editorial-home-header > div > div:last-child > div span { color:#24613F !important; }
        .lurk-app .editorial-home-stat { background:#F7F9F5 !important; border:1px solid #E7ECE5 !important; border-radius:14px !important; padding:16px 18px !important; }
        .lurk-app .editorial-home-stat > div:first-child { color:#78867B !important; letter-spacing:1px !important; }
        .lurk-app .editorial-home-stat > div:nth-child(2) { color:#174C35 !important; font-size:clamp(18px,2vw,26px) !important; letter-spacing:-1px !important; }
        .lurk-app .editorial-home-stat > div:last-child { color:#89958B !important; font-size:10px !important; }
        .lurk-app .editorial-home-pages { padding:26px 34px 0 !important; }
        .lurk-app .editorial-home-pages > div:first-child { color:#718176 !important; font-size:11px !important; letter-spacing:1.5px !important; margin-bottom:14px !important; }
        .lurk-app .editorial-home-page-card { background:#FFFFFF !important; border:1px solid #E5EBE4 !important; border-radius:12px !important; color:#174C35 !important; box-shadow:0 3px 12px rgba(26,64,43,.035) !important; }
        .lurk-app .editorial-home-page-card > div:first-child { background:rgba(57,169,107,.08) !important; }
        .lurk-app .editorial-home-page-card > div:nth-child(2) { color:#39A96B !important; opacity:1 !important; font-size:25px !important; }
        .lurk-app .editorial-home-page-card > div:nth-child(3) { color:#174C35 !important; font-size:16px !important; font-weight:800 !important; }
        .lurk-app .editorial-home-page-card > div:nth-child(4) { color:#829087 !important; font-size:12px !important; }
        .lurk-app .editorial-home-page-card:hover { border-color:#B9D5C1 !important; box-shadow:0 8px 22px rgba(26,64,43,.08) !important; }
        .lurk-app .editorial-home-day { padding:18px 34px 26px !important; }
        .lurk-app .editorial-home-day button { background:#174C35 !important; border:1px solid #174C35 !important; color:#FFFFFF !important; border-radius:9px !important; font-weight:800 !important; }
        .lurk-bottom-nav { background:#FFFFFF !important; border:0 !important; border-top:1px solid #E5EBE4 !important; box-shadow:0 -5px 24px rgba(20,55,35,.05) !important; }
        .lurk-nav-button span:first-child { color:#8A998D !important; }
        .lurk-nav-button span:last-child { color:#78867B !important; }
        .lurk-nav-button:hover { background:#F3F7F2 !important; }
        @media (min-width:1000px) {
          .lurk-app .editorial-home { min-height:100vh !important; height:100vh !important; }
          .lurk-app .editorial-home-header { padding:34px 48px 26px !important; }
          .lurk-app .editorial-home-pages { padding:30px 48px 0 !important; }
          .lurk-app .editorial-home-page-card { padding:26px 28px !important; }
          .lurk-app .editorial-home-day { padding:20px 48px 28px !important; }
          .lurk-bottom-nav { background:#FFFFFF !important; border-right:1px solid #E5EBE4 !important; }
          .lurk-nav-button { border-radius:10px !important; }
        }
        @media (max-width:699px) {
          .lurk-app .editorial-home-header { padding:18px 16px 16px !important; }
          .lurk-app .editorial-home-header img { width:148px !important; }
          .lurk-app .editorial-home-pages { padding:18px 14px 0 !important; }
          .lurk-app .editorial-home-day { padding:14px 14px 18px !important; }
        }

        /* Structural redesign: editorial operations dashboard */
        .lurk-app .editorial-home{background:#F7F8F4!important;color:#174C35!important;min-height:100vh;font-family:Manrope,Inter,sans-serif!important}
        .home-topbar{height:82px;background:#fff;border-bottom:1px solid #E5EBE4;padding:0 4%;display:flex;align-items:center;justify-content:space-between}
        .home-brand,.home-top-actions{display:flex;align-items:center;gap:16px}.home-brand img{width:145px}.home-brand span{font-size:9px;letter-spacing:1.6px;color:#849187;border-left:1px solid #E2E9E1;padding-left:16px;font-weight:800}
        .home-clock{display:flex;flex-direction:column;align-items:flex-end;gap:3px;color:#87948A;font-size:10px;text-transform:capitalize}.home-clock b{font-size:14px;color:#174C35}
        .home-top-actions button{width:36px;height:36px;border:1px solid #E3EAE1;border-radius:50%;background:#F5F8F3;color:#315C41;cursor:pointer}
        .home-dashboard{width:min(1380px,92%);margin:auto;padding:34px 0 30px}
        .home-intro{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px}.home-eyebrow,.home-section-title>div>span,.home-day-action>div>span{font-size:9px;font-weight:800;letter-spacing:1.7px;color:#87958A}
        .home-intro h1{font-size:clamp(34px,4vw,48px);line-height:1.02;letter-spacing:-2.5px;margin:10px 0 7px;color:#174C35}.home-intro p{margin:0;color:#8A968D;font-size:12px}
        .home-day-pill{display:flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid #E2E9E1;border-radius:30px;background:#fff;color:#849187;font-size:9px;font-weight:800;letter-spacing:1px}.home-day-pill i,.home-revenue-head b i{width:7px;height:7px;border-radius:50%;background:#B6C1B7}.home-day-pill.active{background:#EDF6EF;color:#287047;border-color:#D5E8D9}.home-day-pill.active i,.home-revenue-head b i{background:#5AC987}
        .home-overview{display:grid;grid-template-columns:1.2fr .8fr;gap:14px}
        .home-revenue{background:#174C35;color:#fff;border-radius:16px;padding:26px 29px;min-height:260px;box-shadow:0 12px 32px #174c3518}
        .home-revenue-head,.home-month-head{display:flex;justify-content:space-between;align-items:center}.home-revenue-head>span,.home-revenue-head b{font-size:9px;font-weight:800;letter-spacing:1.4px;color:#B7D2BF}.home-revenue-head b{display:flex;align-items:center;gap:7px;color:#D4E8D9}
        .home-revenue-number{font-size:clamp(42px,5vw,64px);font-weight:800;letter-spacing:-3px;margin:24px 0 8px;line-height:1}.home-revenue-number small{font-size:24px;color:#A5CDB0;margin-left:8px}.home-revenue-note{font-size:10px;color:#B7D2BF}
        .home-revenue-details{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;border-top:1px solid #ffffff2b;margin-top:22px;padding-top:15px}.home-revenue-details div{display:flex;flex-direction:column;gap:7px;min-width:0}.home-revenue-details span{font-size:8px;letter-spacing:1.3px;color:#9FC2AA;font-weight:800}.home-revenue-details b{font-size:13px;white-space:nowrap}
        .home-month{background:#fff;border:1px solid #E5EBE4;border-radius:16px;padding:23px;min-height:260px}.home-month-head>div{display:flex;flex-direction:column;gap:7px}.home-month-head span{font-size:9px;letter-spacing:1.4px;color:#87958A;font-weight:800}.home-month-head b{font-size:17px;text-transform:capitalize}.home-month-head button{background:#EFF6F0;border:0;border-radius:7px;padding:8px 10px;color:#286342;font-size:10px;font-weight:800;cursor:pointer}.home-month>strong{display:block;font-size:25px;letter-spacing:-1px;margin:18px 0 14px}.home-bars{height:72px;display:flex;align-items:flex-end;gap:3px;border-bottom:1px solid #E8EEE7}.home-bars>div{height:100%;flex:1;display:flex;align-items:flex-end;min-width:0}.home-bars i{width:100%;display:block;min-height:2px;background:#DCE9DE;border-radius:3px 3px 0 0}.home-bars .today i{background:#39A96B}.home-bar-labels{display:flex;justify-content:space-between;margin-top:8px;color:#9AA69C;font-size:8px;letter-spacing:1px}
        .home-workspace{margin-top:32px}.home-section-title{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:13px}.home-section-title h2{font-size:22px;letter-spacing:-.8px;margin:5px 0 0}.home-section-title small{font-size:9px;color:#9BA79D;letter-spacing:1px}
        .home-page-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.home-page-grid>button{position:relative;min-height:137px;padding:17px 19px;text-align:left;display:flex;flex-direction:column;align-items:flex-start;background:#fff;border:1px solid #E4EBE3;border-radius:11px;color:#174C35;cursor:pointer;transition:.16s}.home-page-grid>button:hover{transform:translateY(-2px);border-color:#B9D6C0;box-shadow:0 8px 20px #174c3510}.home-page-number{font-size:9px;color:#9BA89D;font-weight:800;letter-spacing:1px}.home-page-icon{font-size:21px;color:#39A96B;margin:12px 0 7px}.home-page-grid b{font-size:14px}.home-page-grid small{font-size:10px;color:#89968C;margin-top:4px}.home-page-grid em{position:absolute;right:17px;bottom:17px;font-style:normal;color:#9BAC9F}.home-page-grid>button.featured{background:#EFF6F0;border-color:#DCEADF}.home-page-grid>button.month-feature{background:#E6F0E7;border-color:#D5E5D7}.month-feature>span{font-size:8px;letter-spacing:1.3px;color:#6D8A74;font-weight:800;margin-top:4px}.month-feature>b{font-size:23px;line-height:1.02;letter-spacing:-1px;margin-top:10px}.month-feature>small{color:#66816D!important;margin-top:9px!important}
        .home-day-action{border-top:1px solid #E4EAE2;margin-top:20px;padding-top:17px;display:flex;align-items:center;justify-content:space-between}.home-day-action>div{display:flex;flex-direction:column;gap:5px}.home-day-action>div>b{font-size:12px}.home-day-action button{background:#174C35;color:#fff;border:0;border-radius:7px;padding:13px 17px;font-size:9px;font-weight:800;letter-spacing:1px;cursor:pointer}
        .lurk-bottom-nav{background:#fff!important;border-top:1px solid #E5EBE4!important;box-shadow:0 -5px 20px #174c3508!important}.lurk-nav-button span:first-child{color:#829387!important}.lurk-nav-button span:last-child{color:#78877C!important}
        @media(max-width:999px){.home-topbar{height:70px;padding:0 20px}.home-dashboard{width:calc(100% - 36px);padding-top:25px}.home-overview{grid-template-columns:1fr 1fr}.home-page-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.lurk-app .editorial-home{padding-bottom:76px!important}}
        @media(max-width:650px){.home-brand img{width:105px}.home-brand span{display:none}.home-top-actions{gap:7px}.home-clock{font-size:9px}.home-clock b{font-size:12px}.home-top-actions button{width:31px;height:31px}.home-dashboard{width:calc(100% - 28px);padding-top:22px}.home-intro h1{font-size:35px}.home-overview{grid-template-columns:1fr;gap:9px}.home-revenue{padding:21px 19px;min-height:0}.home-revenue-number{font-size:47px;margin:18px 0 7px}.home-revenue-details{margin-top:17px}.home-revenue-details b{font-size:11px}.home-month{min-height:0;padding:18px}.home-month>strong{margin:13px 0 10px}.home-bars{height:55px}.home-workspace{margin-top:24px}.home-page-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.home-page-grid>button{min-height:125px;padding:14px}.month-feature>b{font-size:21px}.home-day-action{gap:10px}.home-day-action button{padding:12px 11px;white-space:nowrap}}
      
/* Global horizontal-overflow guard; vertical scrolling remains owned by each screen */
html,body,#root{width:100%;max-width:100%;margin:0;overflow-x:hidden}
.lurk-app{width:100%;max-width:100vw;overflow-x:hidden}
/* Approved LURK POS home design */
.lurk-app:has(.ref-dashboard){height:100dvh!important;min-height:100dvh!important;max-height:100dvh!important;overflow:hidden!important;padding:0!important}
.lurk-app:has(.ref-dashboard) .lurk-bottom-nav{display:none!important}
.lurk-app:has(.ref-dashboard) .ref-dashboard{height:100dvh!important;min-height:0!important;max-height:100dvh!important;width:100%!important;display:grid!important;grid-template-columns:260px minmax(0,1fr)!important;overflow:hidden!important;background:#f8f9f7!important;padding:0!important}
.ref-dashboard,.ref-dashboard *{box-sizing:border-box}
.ref-sidebar{height:100dvh;min-height:0;background:#101311;color:#f7faf7;padding:26px 20px 20px;display:flex;flex-direction:column;overflow:hidden}
.ref-side-brand{height:66px;flex:0 0 66px;display:flex;align-items:center;gap:10px;padding:0 12px 22px}.ref-side-brand img{width:122px;height:48px;object-fit:contain;object-position:left center}.ref-side-brand>span,.ref-mobile-brand>span{background:#8bdc18;color:#10200f;font-size:13px;font-weight:900;padding:5px 10px;border-radius:9px;transform:translateX(-3px)}
.ref-nav{display:flex;flex-direction:column;gap:7px;margin-top:24px;min-height:0}.ref-nav button{height:49px;min-height:49px;border:0;border-radius:14px;padding:0 15px;background:transparent;color:#d2d9d3;display:flex;align-items:center;gap:14px;text-align:left;font-size:14px;cursor:pointer;white-space:nowrap}.ref-nav button.selected{background:#168c35;color:white;font-weight:700;box-shadow:0 5px 15px #0b7d302b}.ref-nav button>i{width:22px;text-align:center;font-size:19px;font-style:normal}.ref-sidebar-bottom{margin-top:auto;border:1px solid #303a33;border-radius:14px;padding:12px;display:flex;align-items:center;gap:10px;flex:0 0 auto}.ref-sidebar-bottom>i{width:10px;height:10px;border-radius:50%;background:#34c759;box-shadow:0 0 0 4px #24452c}.ref-sidebar-bottom div{display:flex;flex-direction:column;gap:3px}.ref-sidebar-bottom b{font-size:12px}.ref-sidebar-bottom small{font-size:10px;color:#9ba69e}.ref-sidebar-bottom button{margin-left:auto;background:transparent;border:0;color:#dce5dd;font-size:19px}
.ref-main{height:100dvh;min-height:0;min-width:0;background:#f8f9f7;margin:0;border-radius:0;overflow:hidden;display:flex;flex-direction:column}
.ref-topbar{height:116px;min-height:116px;flex:0 0 116px;display:flex;align-items:center;gap:18px;padding:0 clamp(24px,3vw,48px);background:#fff;border-bottom:1px solid #edf0ec}.ref-heading-copy h1{font-size:clamp(26px,2.5vw,36px);line-height:1.1;letter-spacing:-.045em;margin:0 0 7px;color:#141915}.ref-heading-copy p{margin:0;color:#707b73;font-size:13px}.ref-top-actions{margin-left:auto;display:flex;align-items:center;gap:12px}.ref-date{font-size:12px;color:#68746b;white-space:nowrap}.ref-top-actions button{width:39px;height:39px;border:1px solid #e8ede8;border-radius:50%;background:#fff;color:#243329;font-size:18px;cursor:pointer}.ref-avatar{width:39px;height:39px;border-radius:50%;background:#dff3df;color:#176b32;display:grid;place-items:center}.ref-mobile-brand{display:none}
.ref-content{padding:clamp(20px,3vh,34px) clamp(24px,3vw,48px);width:100%;max-width:1700px;margin:0 auto;min-height:0;flex:1;overflow:auto;overscroll-behavior:contain}
.ref-stat-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:24px}.ref-stat-card,.ref-panel{background:#fff;border:1px solid #e5eae5;border-radius:20px;box-shadow:0 2px 10px #15261a06;min-width:0}.ref-stat-card{padding:20px 22px}.ref-stat-card>div{display:flex;align-items:center;justify-content:space-between;gap:8px;color:#4d5b51;font-size:13px}.ref-stat-card i{font-style:normal;width:43px;height:43px;flex:0 0 43px;border-radius:13px;background:#e1f8e2;color:#168a38;display:grid;place-items:center;font-size:21px}.ref-stat-card strong{display:block;font-size:clamp(23px,2.1vw,32px);letter-spacing:-.045em;margin:13px 0 8px;color:#101612;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ref-stat-card small{font-size:11px;color:#879188}
.ref-dashboard-grid{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(300px,.9fr);gap:18px;align-items:stretch}.ref-panel{padding:24px 26px;min-width:0}.ref-panel-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.ref-panel-heading h2{font-size:23px;letter-spacing:-.035em;margin:0 0 5px;color:#171d18}.ref-panel-heading p{font-size:12px;color:#879188;margin:0}.ref-chart-period{font-size:10px;font-weight:800;letter-spacing:.1em;color:#39824a;background:#edf8ed;padding:8px 11px;border-radius:20px;white-space:nowrap}
.ref-chart{height:clamp(280px,47vh,440px);display:flex;gap:13px;margin-top:24px}.ref-chart-axis{display:flex;flex-direction:column;justify-content:space-between;color:#8b958d;font-size:10px;white-space:nowrap;padding-bottom:42px}.ref-chart-bars{display:flex;align-items:stretch;justify-content:space-around;gap:10px;flex:1;min-width:0;border-bottom:1px solid #e7ece7;background:repeating-linear-gradient(to bottom,transparent 0,transparent calc(25% - 1px),#edf0ed calc(25% - 1px),#edf0ed 25%)}.ref-chart-day{height:100%;flex:1;min-width:0;max-width:80px;position:relative;display:flex;align-items:center;justify-content:flex-end;flex-direction:column;outline:none}.ref-chart-day>i{width:min(66%,54px);min-height:0;background:#91df8a;border-radius:11px 11px 0 0;transition:filter .15s,background .15s;cursor:pointer}.ref-chart-day.current>i,.ref-chart-day.hovered>i,.ref-chart-day:focus>i{background:#168d35}.ref-chart-day-label{position:absolute;bottom:-23px;font-size:11px;color:#566258;text-transform:capitalize}.ref-chart-day>small{position:absolute;bottom:-41px;font-size:9px;color:#929c94;white-space:nowrap}.ref-chart-tooltip{position:absolute;z-index:3;bottom:calc(var(--bar-height, 40%) + 17px);left:50%;transform:translateX(-50%);min-width:112px;background:#111613;color:#fff;border-radius:12px;padding:10px 12px;text-align:center;box-shadow:0 7px 20px #0002;white-space:nowrap;pointer-events:none}.ref-chart-tooltip:after{content:"";position:absolute;bottom:-7px;left:calc(50% - 7px);border-left:7px solid transparent;border-right:7px solid transparent;border-top:8px solid #111613}.ref-chart-tooltip small{display:block;font-size:10px;color:#c3cdc5;margin-bottom:4px}.ref-chart-tooltip b{font-size:16px}
.ref-ops{display:flex;flex-direction:column}.ref-op-row{display:flex;align-items:center;gap:13px;padding:20px 0;border-bottom:1px solid #edf0ed;font-size:13px;color:#303b33}.ref-op-row i{width:34px;height:34px;flex:0 0 34px;border-radius:10px;background:#eef8ee;color:#24833d;display:grid;place-items:center;font-size:16px;font-style:normal}.ref-op-row b{margin-left:auto;font-size:16px;color:#172019}.ref-business-status{margin-top:auto;display:flex;align-items:center;gap:10px;background:#e8f8e8;border-radius:14px;padding:15px;color:#145d2b}.ref-business-status>i{width:11px;height:11px;border-radius:50%;background:#9ba69d}.ref-business-status.active>i{background:#20b44b;box-shadow:0 0 0 5px #c9efca}.ref-business-status b{font-size:13px}.ref-business-status span{margin-left:auto;font-size:11px;color:#47744f}.ref-primary-action{width:100%;margin-top:14px;border:0;border-radius:11px;background:#168d35;color:#fff;padding:13px;font-size:11px;font-weight:850;cursor:pointer}
@media(max-height:760px) and (min-width:701px){.ref-topbar{height:88px;min-height:88px;flex-basis:88px}.ref-content{padding-top:14px;padding-bottom:14px}.ref-stat-grid{gap:10px;margin-bottom:14px}.ref-stat-card{padding:13px 16px}.ref-stat-card strong{margin:8px 0 4px}.ref-stat-card i{width:34px;height:34px}.ref-dashboard-grid{gap:12px}.ref-panel{padding:17px 19px}.ref-chart{height:clamp(190px,38vh,280px);margin-top:15px}.ref-op-row{padding:12px 0}.ref-business-status{padding:10px}.ref-primary-action{padding:10px;margin-top:9px}}
@media(max-width:1100px) and (min-width:701px){.lurk-app:has(.ref-dashboard) .ref-dashboard{grid-template-columns:220px minmax(0,1fr)!important}.ref-sidebar{padding:20px 14px}.ref-nav button{height:44px;min-height:44px;font-size:12px}.ref-topbar{padding:0 22px}.ref-content{padding:18px 22px}.ref-stat-grid{gap:9px}.ref-stat-card{padding:14px}.ref-dashboard-grid{grid-template-columns:minmax(0,1.4fr) minmax(245px,1fr);gap:10px}.ref-panel{padding:16px}.ref-chart{height:260px}}
@media(max-width:700px){.lurk-app:has(.ref-dashboard){height:100dvh!important;overflow:hidden!important}.lurk-app:has(.ref-dashboard) .ref-dashboard{display:block!important;overflow:hidden!important}.ref-sidebar{display:none}.ref-main{height:100dvh}.ref-topbar{height:68px;min-height:68px;flex-basis:68px;padding:0 14px;gap:10px}.ref-heading-copy{display:none}.ref-mobile-brand{display:flex;align-items:center;gap:7px}.ref-mobile-brand img{width:93px;height:40px;object-fit:contain}.ref-mobile-brand>span{font-size:10px;padding:4px 7px}.ref-top-actions{gap:6px}.ref-date{display:none}.ref-top-actions button{width:33px;height:33px}.ref-avatar{width:33px;height:33px}.ref-content{height:calc(100dvh - 68px);padding:14px 12px;overflow:auto}.ref-stat-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:10px}.ref-stat-card{padding:12px;border-radius:14px}.ref-stat-card>div{font-size:10px}.ref-stat-card i{width:28px;height:28px;flex-basis:28px;font-size:14px}.ref-stat-card strong{font-size:19px;margin:7px 0 4px}.ref-stat-card small{font-size:8px}.ref-dashboard-grid{grid-template-columns:1fr;gap:9px}.ref-panel{padding:15px;border-radius:15px}.ref-panel-heading h2{font-size:18px}.ref-chart{height:230px;margin-top:18px;gap:7px}.ref-chart-axis{font-size:8px}.ref-chart-bars{gap:3px}.ref-chart-day-label{font-size:9px}.ref-chart-day>small{font-size:8px}.ref-chart-tooltip{min-width:90px;padding:8px}.ref-chart-tooltip b{font-size:13px}.ref-op-row{padding:12px 0}.ref-business-status{margin-top:15px;padding:12px}}

/* Reference dashboard: viewport-safe layout overrides */
.lurk-app:has(.ref-dashboard){height:100dvh!important;min-height:100dvh!important;max-height:100dvh!important;overflow:hidden!important;padding-bottom:0!important}
.lurk-app:has(.ref-dashboard) .lurk-bottom-nav{display:none!important}
.lurk-app:has(.ref-dashboard) .ref-dashboard{height:100dvh!important;min-height:0!important;max-height:100dvh!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important;display:grid!important;grid-template-columns:248px minmax(0,1fr)!important;overflow:hidden!important;background:#f7f8f6!important;color:#172019!important}
.ref-dashboard,.ref-dashboard *{box-sizing:border-box}
.ref-sidebar{height:100dvh;min-height:0;background:#111513;color:#f6f8f5;padding:24px 18px 18px;display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden}
.ref-side-brand{display:flex;align-items:center;gap:10px;padding:0 7px 25px}.ref-brand-mark{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#8bdc18;color:#14200d;font-weight:900;font-style:normal}.ref-side-brand>div:nth-child(2){display:flex;flex-direction:column;gap:2px}.ref-side-brand b{font-size:17px}.ref-side-brand small{font-size:9px;letter-spacing:.15em;color:#9ca69f}
.ref-side-search{height:40px;flex:0 0 40px;border-radius:22px;background:#252b27;padding:0 13px;color:#aeb8b1;font-size:12px;margin-bottom:26px;display:flex;align-items:center;gap:10px}.ref-side-search span{white-space:nowrap}
.ref-nav-label{font-size:10px;font-weight:800;letter-spacing:.13em;color:#7e8a82;padding:0 11px 10px}.ref-nav{display:flex;flex-direction:column;gap:5px}.ref-nav button{height:42px;min-height:42px;border:0;border-radius:23px;padding:0 12px;background:transparent;color:#b7c0ba;display:flex;align-items:center;gap:11px;text-align:left;font-size:12px;cursor:pointer;white-space:nowrap}.ref-nav button.selected{background:#8bdc18;color:#10170c;font-weight:700}.ref-nav button>i{width:19px;text-align:center;font-size:17px;font-style:normal}.ref-nav button small{margin-left:auto;font-size:9px}.ref-settings-label{margin-top:25px}.ref-sidebar-bottom{margin-top:auto;border:1px solid #303a33;border-radius:11px;padding:11px;font-size:11px;flex:0 0 auto}.ref-sidebar-bottom i{display:inline-block;width:8px;height:8px;border-radius:50%;background:#8bdc18;margin-right:8px}
.ref-main{height:calc(100dvh - 16px);min-height:0;min-width:0;background:#f7f8f6;border-radius:25px 0 0 25px;margin:8px 0 8px -1px;overflow:hidden;display:flex;flex-direction:column}
.ref-topbar{height:62px;min-height:62px;flex:0 0 62px;display:flex;align-items:center;gap:16px;padding:0 28px;border-bottom:1px solid #ecefeb;background:#fff;color:#818b84;font-size:11px}.ref-top-actions{margin-left:auto;display:flex;align-items:center;gap:9px}.ref-top-actions button{width:35px;height:35px;border:0;border-radius:50%;background:#f4f6f3;color:#26342a;font-size:17px;cursor:pointer}.ref-avatar{width:34px;height:34px;border-radius:50%;background:#dce8d8;color:#245239;display:grid;place-items:center}.ref-mobile-brand{display:none}
.ref-content{padding:clamp(16px,2.2vh,26px) clamp(18px,2.5vw,34px) 18px;max-width:1600px;width:100%;margin:0 auto;min-height:0;flex:1;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain}
.ref-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:14px;margin-bottom:clamp(12px,1.8vh,20px)}.ref-heading>div>small,.ref-panel-heading small,.ref-quick-heading small{font-size:9px;font-weight:800;letter-spacing:.13em;color:#829087}.ref-heading h1{font-size:clamp(25px,2.5vw,34px);line-height:1.08;letter-spacing:-.04em;margin:7px 0 5px;font-weight:650}.ref-heading p{font-size:12px;color:#7b857e;margin:0}.ref-day-state{border:1px solid #e6ebe5;background:#fff;padding:8px 11px;border-radius:25px;font-size:9px;font-weight:800;color:#8a938d;white-space:nowrap}.ref-day-state.is-open{color:#287449}
.ref-stat-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:14px}.ref-stat-card,.ref-panel{background:#fff;border:1px solid #e9ede8;border-radius:15px;box-shadow:0 2px 8px #14231905;min-width:0}.ref-stat-card{padding:14px 15px}.ref-stat-card>div{display:flex;align-items:center;justify-content:space-between;gap:6px;color:#66736a;font-size:11px}.ref-stat-card i{font-style:normal;width:29px;height:29px;flex:0 0 29px;border-radius:50%;background:#f2f5f1;display:grid;place-items:center;font-size:14px}.ref-stat-card strong{display:block;font-size:clamp(17px,1.9vw,25px);letter-spacing:-.04em;margin:9px 0 5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ref-stat-card small{font-size:9px;color:#879189;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
.ref-dashboard-grid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(250px,1fr);gap:13px}.ref-panel{padding:16px 18px}.ref-panel-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.ref-panel-heading h2,.ref-quick-heading h2{font-size:18px;letter-spacing:-.03em;margin:4px 0 2px;font-weight:650}.ref-panel-heading p{font-size:10px;color:#89938c;margin:0}.ref-panel-heading button{border:1px solid #e7ece7;border-radius:8px;background:#fff;padding:7px 9px;color:#3c4940;font-size:10px;cursor:pointer}.ref-chart-summary{display:flex;flex-direction:column;gap:2px;margin-top:10px}.ref-chart-summary b{font-size:22px;letter-spacing:-.04em}.ref-chart-summary span{font-size:9px;color:#89938c}.ref-chart{height:clamp(105px,17vh,160px);display:flex;gap:9px;margin-top:9px}.ref-chart-axis{display:flex;flex-direction:column;justify-content:space-between;color:#9aa39c;font-size:8px}.ref-chart-bars{display:flex;align-items:stretch;justify-content:space-between;gap:4px;flex:1;min-width:0;border-bottom:1px solid #e9eee9;background:repeating-linear-gradient(to bottom,transparent 0,transparent calc(25% - 1px),#edf0ed calc(25% - 1px),#edf0ed 25%)}.ref-chart-bars>div{height:100%;flex:1;display:flex;align-items:flex-end;justify-content:center;min-width:0}.ref-chart-bars i{display:block;width:min(72%,16px);background:#dfe6df;border-radius:5px 5px 0 0;min-height:2px}.ref-chart-bars>div.current i{background:#8bdc18}.ref-chart-foot{display:flex;justify-content:space-between;margin:7px 0 0 25px;color:#98a199;font-size:8px}
.ref-live{font-size:8px;font-weight:800;color:#258452;background:#edf7ef;padding:6px 8px;border-radius:18px;white-space:nowrap}.ref-op-row{display:flex;align-items:center;gap:9px;padding:clamp(9px,1.5vh,14px) 0;border-bottom:1px solid #eef1ed;font-size:10px}.ref-op-row i{width:29px;height:29px;flex:0 0 29px;border-radius:9px;background:#eff7e9;color:#4a8b25;display:grid;place-items:center;font-style:normal}.ref-op-row b{margin-left:auto;white-space:nowrap}.ref-primary-action{width:100%;margin-top:12px;border:0;border-radius:9px;background:#8bdc18;color:#17200f;padding:11px;font-size:9px;font-weight:850;cursor:pointer}
.ref-quick-section{margin-top:14px}.ref-quick-heading{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:9px}.ref-quick-heading h2{margin-bottom:0}.ref-quick-heading>span{font-size:8px;letter-spacing:.12em;color:#9aa39c}.ref-quick-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.ref-quick-grid button{background:#fff;border:1px solid #e9ede8;border-radius:11px;min-height:61px;padding:10px;display:grid;grid-template-columns:1fr auto;grid-template-rows:1fr auto;gap:5px;text-align:left;cursor:pointer;color:#202820;min-width:0}.ref-quick-grid i{font-size:15px;color:#54942b;font-style:normal}.ref-quick-grid b{font-size:9px;align-self:end;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ref-quick-grid span{grid-column:2;grid-row:1/3;color:#8c988f;font-size:10px}
@media(max-height:760px) and (min-width:701px){.ref-content{padding-top:12px;padding-bottom:10px}.ref-heading{margin-bottom:10px}.ref-heading h1{font-size:25px}.ref-stat-card{padding:10px 12px}.ref-stat-card strong{margin:6px 0 3px}.ref-dashboard-grid{gap:10px}.ref-panel{padding:12px 14px}.ref-chart{height:105px}.ref-quick-section{margin-top:10px}.ref-quick-grid button{min-height:52px;padding:8px}.ref-op-row{padding:8px 0}.ref-primary-action{padding:9px;margin-top:8px}}
@media(max-width:1100px) and (min-width:701px){.lurk-app:has(.ref-dashboard) .ref-dashboard{grid-template-columns:205px minmax(0,1fr)!important}.ref-sidebar{padding:20px 13px}.ref-content{padding-left:18px;padding-right:18px}.ref-stat-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ref-dashboard-grid{grid-template-columns:minmax(0,1.2fr) minmax(220px,1fr)}.ref-quick-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:700px){.lurk-app:has(.ref-dashboard){height:100dvh!important;overflow:hidden!important}.lurk-app:has(.ref-dashboard) .ref-dashboard{display:block!important;overflow:hidden!important}.ref-sidebar{display:none}.ref-main{height:100dvh;margin:0;border-radius:0;overflow:hidden}.ref-topbar{height:56px;min-height:56px;padding:0 14px;justify-content:space-between}.ref-mobile-brand{display:flex;align-items:center;gap:8px;color:#19231b}.ref-mobile-brand .ref-brand-mark{width:28px;height:28px}.ref-topbar>span{display:none}.ref-top-actions{gap:6px}.ref-top-actions button{width:32px;height:32px}.ref-avatar{width:30px;height:30px}.ref-content{height:calc(100dvh - 56px);padding:17px 13px 18px;overflow-y:auto}.ref-heading{align-items:flex-start;margin-bottom:13px}.ref-heading h1{font-size:25px}.ref-heading p{font-size:10px}.ref-day-state{font-size:8px;padding:7px 8px}.ref-stat-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:10px}.ref-stat-card{padding:11px}.ref-stat-card>div{font-size:10px}.ref-stat-card strong{font-size:18px;margin:7px 0 3px}.ref-stat-card small{font-size:8px}.ref-stat-card i{width:25px;height:25px;flex-basis:25px}.ref-dashboard-grid{grid-template-columns:1fr;gap:9px}.ref-panel{padding:13px}.ref-panel-heading h2{font-size:16px}.ref-chart{height:115px}.ref-quick-section{margin-top:11px}.ref-quick-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.ref-quick-grid button{min-height:54px;padding:8px}.ref-quick-grid b{font-size:9px}}


/* Comprehensive legacy-inline-style migration: force every routed screen onto the approved light dashboard palette */
.lurk-screen:not(.ref-dashboard){font-family:Inter,"Manrope","Helvetica Neue",Arial,sans-serif!important;background:#f7f8f6!important;color:#172019!important;min-height:100dvh!important;max-width:100vw!important;overflow-x:clip!important}
.lurk-screen:not(.ref-dashboard) *{box-sizing:border-box}
.lurk-screen:not(.ref-dashboard) [style*="#090A08"],.lurk-screen:not(.ref-dashboard) [style*="#080A08"],.lurk-screen:not(.ref-dashboard) [style*="#0B0D0A"],.lurk-screen:not(.ref-dashboard) [style*="#11140F"],.lurk-screen:not(.ref-dashboard) [style*="#101510"],.lurk-screen:not(.ref-dashboard) [style*="#101311"],.lurk-screen:not(.ref-dashboard) [style*="#1A1A1A"],.lurk-screen:not(.ref-dashboard) [style*="#102019"],.lurk-screen:not(.ref-dashboard) [style*="#171f1a"],.lurk-screen:not(.ref-dashboard) [style*="#121a15"],.lurk-screen:not(.ref-dashboard) [style*="#171c19"],.lurk-screen:not(.ref-dashboard) [style*="#121614"],.lurk-screen:not(.ref-dashboard) [style*="#111411"],.lurk-screen:not(.ref-dashboard) [style*="#0D100D"],.lurk-screen:not(.ref-dashboard) [style*="#14231c"],.lurk-screen:not(.ref-dashboard) [style*="#17271f"],.lurk-screen:not(.ref-dashboard) [style*="#061008"],.lurk-screen:not(.ref-dashboard) [style*="#06200d"]{background:#fff!important;background-image:none!important;color:#172019!important;border-color:#e2e9e2!important;box-shadow:0 3px 14px #17201908!important}
.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#11140F"],.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#102019"],.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#171f1a"],.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#171c19"],.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#111411"],.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#0D100D"]{background:#fff!important;background-image:none!important;color:#172019!important;border:1px solid #e2e9e2!important;box-shadow:0 3px 14px #17201908!important}
.lurk-screen:not(.ref-dashboard) [style*="rgba(13,13,13"],.lurk-screen:not(.ref-dashboard) [style*="rgba(255,255,255,0.0"],.lurk-screen:not(.ref-dashboard) [style*="rgba(255,255,255,.0"]{background:#f3f6f2!important;background-image:none!important;color:#26342a!important;border-color:#e2e9e2!important}
.lurk-screen:not(.ref-dashboard) [style*="#F0EBDD"],.lurk-screen:not(.ref-dashboard) [style*="#F1EEE6"],.lurk-screen:not(.ref-dashboard) [style*="#D8D2C3"],.lurk-screen:not(.ref-dashboard) [style*="#B9B7A9"],.lurk-screen:not(.ref-dashboard) [style*="#A0A0A0"],.lurk-screen:not(.ref-dashboard) [style*="#92958A"],.lurk-screen:not(.ref-dashboard) [style*="#B7B4A9"],.lurk-screen:not(.ref-dashboard) [style*="#A8C17D"]{color:#68756b!important}
.lurk-screen:not(.ref-dashboard) [style*="#171914"],.lurk-screen:not(.ref-dashboard) [style*="#061008"],.lurk-screen:not(.ref-dashboard) [style*="#06200d"]{color:#172019!important}
.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#EDE5D4"],.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#F1EBDD"],.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#EDE5D4"]{background:#fff!important;background-image:none!important;color:#172019!important;border:1px solid #e2e9e2!important;box-shadow:0 3px 14px #17201908!important}
.lurk-screen:not(.ref-dashboard) [style*="background:#24452B"],.lurk-screen:not(.ref-dashboard) [style*="background: #24452B"],.lurk-screen:not(.ref-dashboard) [style*="background:#34C759"],.lurk-screen:not(.ref-dashboard) [style*="background: T.accent"],.lurk-screen:not(.ref-dashboard) [style*="background:T.accent"]{background:#168d35!important;color:#fff!important;border-color:#168d35!important}
.lurk-screen:not(.ref-dashboard) [style*="color:#F0EBDD"],.lurk-screen:not(.ref-dashboard) [style*="color: #F0EBDD"],.lurk-screen:not(.ref-dashboard) [style*="color:T.text"],.lurk-screen:not(.ref-dashboard) [style*="color: T.text"]{color:#172019!important}
.lurk-screen:not(.ref-dashboard) [style*="borderBottom:1px solid rgba(233,225,207"],.lurk-screen:not(.ref-dashboard) [style*="border:1px solid rgba(233,225,207"],.lurk-screen:not(.ref-dashboard) [style*="border: 1px solid rgba(233,225,207"]{border-color:#e2e9e2!important}
.lurk-screen:not(.ref-dashboard) button{color:#26342a;font-family:inherit}
.lurk-screen:not(.ref-dashboard) input,.lurk-screen:not(.ref-dashboard) select,.lurk-screen:not(.ref-dashboard) textarea{background:#fff!important;color:#172019!important;border:1px solid #dfe7df!important}
.lurk-screen:not(.ref-dashboard) input::placeholder,.lurk-screen:not(.ref-dashboard) textarea::placeholder{color:#929c94!important}
.lurk-screen:not(.ref-dashboard) .ref-stat-card,.lurk-screen:not(.ref-dashboard) .ref-panel{background:#fff!important;color:#172019!important}
.lurk-screen:not(.ref-dashboard){padding-bottom:calc(86px + env(safe-area-inset-bottom))!important}
.lurk-order-screen{height:100dvh!important;max-height:100dvh!important;min-height:0!important;padding-bottom:0!important;overflow:hidden!important}
.lurk-order-screen>div:first-child{background:#fff!important;color:#172019!important;border-bottom:1px solid #e5ebe5!important}
.lurk-order-screen>div:not(:first-child){min-width:0}
.lurk-order-screen [style*="background:rgba(13,13,13"],.lurk-order-screen [style*="background:rgba(255,255,255"]{background:#f3f6f2!important;color:#172019!important;border-color:#e2e9e2!important}
.lurk-order-screen [style*="background:#090A08"],.lurk-order-screen [style*="background:#0B0D0A"],.lurk-order-screen [style*="background:#11140F"]{background:#fff!important;color:#172019!important;border-color:#e2e9e2!important}
.lurk-order-screen [style*="color:T.text"],.lurk-order-screen [style*="color: T.text"]{color:#172019!important}
.lurk-bottom-nav{background:rgba(255,255,255,.97)!important;border-top:1px solid #e3eae3!important;box-shadow:0 -5px 18px #1720190a!important;backdrop-filter:blur(24px)!important}
.lurk-bottom-nav button{color:#66736a!important}
@media(max-width:700px){.lurk-screen:not(.ref-dashboard){min-height:calc(100dvh - 68px)!important;padding-bottom:calc(82px + env(safe-area-inset-bottom))!important}.lurk-order-screen{height:100dvh!important;max-height:100dvh!important;padding-bottom:0!important}.lurk-tables-screen,.lurk-reports-screen,.lurk-customers-screen,.lurk-menu-screen,.lurk-settings-screen{overflow-x:clip!important}.lurk-screen:not(.ref-dashboard)>div:nth-child(2){max-width:100%!important}}

/* LURK POS shared light-green design system for all operational screens */
.lurk-screen:not(.ref-dashboard){background:#f7f8f6!important;color:#172019!important;min-height:calc(100dvh - 76px)!important;max-width:100vw;overflow-x:hidden}
.lurk-screen:not(.ref-dashboard)>div:first-child{background:#fff!important;color:#172019!important;border-bottom:1px solid #e5ebe5!important;box-shadow:0 2px 8px #17201905}
.lurk-screen:not(.ref-dashboard) button{font-family:Inter,"Helvetica Neue",Arial,sans-serif}
.lurk-screen:not(.ref-dashboard) input,.lurk-screen:not(.ref-dashboard) select,.lurk-screen:not(.ref-dashboard) textarea{background:#fff!important;color:#172019!important;border:1px solid #dfe7df!important;border-radius:10px}
.lurk-screen:not(.ref-dashboard) input::placeholder,.lurk-screen:not(.ref-dashboard) textarea::placeholder{color:#929c94!important}
.lurk-screen:not(.ref-dashboard) button[style*="background:#0B0D0A"],.lurk-screen:not(.ref-dashboard) button[style*="background: #0B0D0A"],.lurk-screen:not(.ref-dashboard) button[style*="background:#11140F"]{background:#fff!important;color:#26342a!important;border:1px solid #e1e9e1!important}
.lurk-screen:not(.ref-dashboard) [style*="linear-gradient(145deg,#EDE5D4"]{background:#fff!important;color:#172019!important;border:1px solid #e2e9e2!important;box-shadow:0 3px 12px #17201908!important}
.lurk-screen:not(.ref-dashboard) [style*="background:T.bg2"],.lurk-screen:not(.ref-dashboard) [style*="background: T.bg2"]{background:#fff!important;border-color:#e3eae3!important;color:#172019!important}
.lurk-screen:not(.ref-dashboard) [style*="rgba(13,13,13"]{background:#fff!important;color:#172019!important;border-color:#e5ebe5!important}
.lurk-screen:not(.ref-dashboard) [style*="rgba(255,255,255,0.05)"],.lurk-screen:not(.ref-dashboard) [style*="rgba(255,255,255,0.06)"],.lurk-screen:not(.ref-dashboard) [style*="rgba(255,255,255,0.055)"]{background:#f1f5f1!important;border-color:#e1e9e1!important;color:#26342a!important}
.lurk-screen:not(.ref-dashboard) [style*="color:T.text"],.lurk-screen:not(.ref-dashboard) [style*="color: T.text"]{color:#172019!important}
.lurk-screen:not(.ref-dashboard) [style*="color:T.textSub"],.lurk-screen:not(.ref-dashboard) [style*="color: T.textSub"]{color:#68756b!important}
.lurk-screen:not(.ref-dashboard) [style*="color:T.textDim"],.lurk-screen:not(.ref-dashboard) [style*="color: T.textDim"]{color:#929c94!important}
.lurk-bottom-nav{background:rgba(255,255,255,.97)!important;border-top:1px solid #e3eae3!important;box-shadow:0 -5px 18px #1720190a!important;backdrop-filter:blur(24px)!important}
.lurk-bottom-nav button{color:#66736a!important}
.lurk-bottom-nav button[aria-current="page"],.lurk-bottom-nav button.active{color:#168d35!important}
.lurk-tables-screen,.lurk-reports-screen,.lurk-customers-screen,.lurk-menu-screen,.lurk-settings-screen,.personal-finance{padding-bottom:calc(86px + env(safe-area-inset-bottom))!important}
.lurk-tables-screen>div:nth-child(2),.lurk-reports-screen>div:nth-child(2),.lurk-customers-screen>div:nth-child(2),.lurk-menu-screen>div:nth-child(2),.lurk-settings-screen>div:nth-child(2){max-width:1440px;margin:0 auto;width:100%}
.lurk-tables-screen [style*="gridTemplateColumns"],.lurk-menu-screen [style*="gridTemplateColumns"]{min-width:0}
.lurk-order-screen{background:#f7f8f6!important;color:#172019!important}
.lurk-order-screen>div:first-child{background:#fff!important;color:#172019!important;border-bottom:1px solid #e5ebe5!important}
.lurk-order-screen [style*="background:rgba(13,13,13"]{background:#fff!important;color:#172019!important;border-color:#e5ebe5!important}
.lurk-order-screen [style*="background:T.bg2"],.lurk-order-screen [style*="background: T.bg2"]{background:#fff!important;color:#172019!important;border-color:#e3eae3!important}
.lurk-order-screen [style*="color:T.text"],.lurk-order-screen [style*="color: T.text"]{color:#172019!important}
.lurk-order-screen [style*="color:T.textSub"],.lurk-order-screen [style*="color: T.textSub"]{color:#68756b!important}
.lurk-order-screen button{border-radius:10px}
.personal-finance form{background:#fff!important;border:1px solid #e3eae3!important;box-shadow:0 8px 30px #1720190b}
@media(max-width:700px){.lurk-screen:not(.ref-dashboard){min-height:calc(100dvh - 68px)!important;padding-bottom:calc(82px + env(safe-area-inset-bottom))!important}.lurk-tables-screen>div:nth-child(2),.lurk-reports-screen>div:nth-child(2),.lurk-customers-screen>div:nth-child(2),.lurk-menu-screen>div:nth-child(2),.lurk-settings-screen>div:nth-child(2){padding-left:12px!important;padding-right:12px!important}.lurk-order-screen{height:100dvh!important;max-height:100dvh!important}.lurk-order-screen>div:first-child{padding-top:max(10px,env(safe-area-inset-top))!important}}


/* FINAL HOME GRID FIX: the shared outer sidebar already owns navigation.
   Remove the retired dashboard's second, empty sidebar column. */
.lurk-app:has(.ref-dashboard) .ref-dashboard{
  display:block!important;
  grid-template-columns:minmax(0,1fr)!important;
  width:100%!important;max-width:none!important;
}
.lurk-app:has(.ref-dashboard) .ref-main{
  width:100%!important;max-width:none!important;min-width:0!important;
  margin:0!important;border-radius:0!important;
}
.lurk-app:has(.ref-dashboard) .ref-content{
  width:100%!important;max-width:1600px!important;
  margin:0 auto!important;min-width:0!important;
}
@media(min-width:1000px){
 .lurk-app:has(.ref-dashboard){height:auto!important;min-height:100dvh!important;max-height:none!important;overflow:visible!important}
 .lurk-app:has(.ref-dashboard) .ref-dashboard{height:auto!important;min-height:100dvh!important;max-height:none!important;overflow:visible!important}
 .lurk-app:has(.ref-dashboard) .ref-main{height:auto!important;min-height:100dvh!important;max-height:none!important;overflow:visible!important}
 .lurk-app:has(.ref-dashboard) .ref-content{height:auto!important;overflow:visible!important;padding:24px clamp(22px,3vw,44px) 40px!important}
}
@media(max-width:999px){
 .lurk-app:has(.ref-dashboard){height:auto!important;min-height:100dvh!important;max-height:none!important;overflow:visible!important}
 .lurk-app:has(.ref-dashboard) .ref-dashboard{height:auto!important;min-height:100dvh!important;max-height:none!important;overflow:visible!important}
 .lurk-app:has(.ref-dashboard) .ref-main{height:auto!important;min-height:100dvh!important;overflow:visible!important}
 .lurk-app:has(.ref-dashboard) .ref-content{height:auto!important;overflow:visible!important;padding:18px 14px 30px!important}
}
`}</style>
      {view!=="order"&&<aside className="lurk-shell-sidebar" aria-label="Ana navigasyon">
        <div className="lurk-shell-brand"><img src="/lurk-logo.svg" alt="LURK"/><span>POS</span></div>
        <div className="lurk-shell-section-label">WORKSPACE</div>
        <nav className="lurk-shell-nav">
          {[{k:"home",label:"Dashboard",icon:"⌂"},{k:"tables",label:"Tables",icon:"▦"},{k:"reports",label:"Reports",icon:"▤"},{k:"customers",label:"Customers",icon:"♙"},{k:"lurkPlus",label:"LURK+",icon:"✳"}].map(n=><button key={n.k} type="button" className={view===n.k?"active":""} onClick={()=>{if(view==="personal"&&n.k!=="personal")window.dispatchEvent(new Event("lurk-personal-leave"));setV(n.k);}}><span className="lurk-shell-nav-icon">{n.icon}</span><span>{n.label}</span>{view===n.k&&<i/>}</button>)}
        </nav>
        <div className="lurk-shell-sidebar-footer"><span className={day?"online-dot":"offline-dot"}/><div><b>LURK Coffee</b><small>{day?"Business open":"Business closed"}</small></div><button type="button" aria-label="Lock screen" onClick={onLock}>⌑</button></div>
      </aside>}
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#34C759",color:"#fff",padding:"9px 18px",borderRadius:20,fontSize:13,fontWeight:700,zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(52,199,89,0.45)"}}>{toast}</div>}
      <button type="button" role="status" aria-live="polite" onClick={async()=>{if(saveStatus!=="error")return;const entries=Object.entries(failedWrites.current);if(!entries.length){setSaveStatus("saved");return;}pendingSaves.failed=false;await Promise.all(entries.map(([key,value])=>persistDirect(key,value)));}} style={{position:"absolute",top:12,right:12,zIndex:90,padding:"5px 9px",borderRadius:20,fontSize:10,fontWeight:750,background:saveStatus==="error"?"rgba(255,59,48,.16)":saveStatus==="saving"?"rgba(255,149,0,.16)":"rgba(121,166,106,.13)",color:saveStatus==="error"?T.danger:saveStatus==="saving"?T.warn:T.accentL,border:"1px solid "+(saveStatus==="error"?"rgba(255,59,48,.3)":saveStatus==="saving"?"rgba(255,149,0,.3)":"rgba(52,199,89,.25)" ),cursor:saveStatus==="error"?"pointer":"default"}}>{saveStatus==="error"?"↻ Tekrar dene":saveStatus==="saving"?"Saving…":"Saved"}</button>

      {view==="home"&&<HomeScreen tables={tables} orders={orders} logs={logs} day={day} openDay={openDay} closeDay={closeDay} setV={setV} onLock={onLock} balancesVisible={balancesVisible} setBalancesVisible={setBalancesVisible}/>}
      {view==="tables"&&<TablesScreen tables={tables} customers={customers} lurkPlusMembers={lurkPlusMembers} setTbl={setTbl} setCustomers={setCustomers} setV={setV} setSel={setSel} msg={msg}/>}
      {view==="order"&&curT&&<OrderScreen table={curT} tables={tables} menu={menu} cats={cats} customers={customers} lurkPlusMembers={lurkPlusMembers} setTableCustomer={setTableCustomer} addItem={addItem} chQ={chQ} pay={pay} moveTableOrder={moveTableOrder} setTbl={setTbl} setV={setV} setSel={setSel}/>}
      {view==="reports"&&<ReportsScreen orders={orders} logs={logs} creditEntries={creditEntries} setCreditEntries={setCreditEntries} lurkPlusMembers={lurkPlusMembers} setV={setV}/>}
      {view==="salesHistory"&&<SalesHistoryScreen orders={orders} setOrders={setOrd} balancesVisible={balancesVisible} setV={setV}/>}
      {view==="monthReview"&&<MonthReviewScreen orders={orders} tables={tables} creditEntries={creditEntries} setV={setV}/>}
      {view==="lurkPlus"&&<LurkPlusScreen members={lurkPlusMembers} setMembers={setLurkPlusMembers} msg={msg} setV={setV}/>}
      {view==="personal"&&<PersonalFinanceScreen debts={personalDebts} setDebts={setPersonalDebts} setV={setV} msg={msg}/>}
      {view==="customers"&&<CustomersScreen orders={orders} customers={customers} setCustomers={setCustomers} setV={setV} msg={msg} balancesVisible={balancesVisible}/>}
      {view==="menu"&&<MenuScreen menu={menu} setMenu={setMenu} setV={setV}/>}
      {view==="settings"&&<SettingsScreen setV={setV} balancesVisible={balancesVisible} setBalancesVisible={setBalancesVisible} tables={tables} orders={orders} logs={logs} customers={customers} creditEntries={creditEntries} menu={menu} day={day} personalDebts={personalDebts} setPersonalDebts={setPersonalDebts} setTables={setTbl} setOrders={setOrd} setLogs={setLogs} setCustomers={setCustomers} setCreditEntries={setCreditEntries} setMenu={setMenu} setDay={setDay}/>}
      {view!=="order"&&(
        <div className="lurk-bottom-nav" style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"none",background:"rgba(13,13,13,0.97)",backdropFilter:"blur(40px)",borderTop:"0.5px solid rgba(255,255,255,0.08)",display:"flex",zIndex:50}}>
          {NAV.map(n=>(
            <button className={"lurk-nav-button"+(view===n.k?" active":"")} aria-current={view===n.k?"page":undefined} aria-label={n.label} key={n.k} onClick={()=>{if(view==="personal"&&n.k!=="personal")window.dispatchEvent(new Event("lurk-personal-leave"));setV(n.k);}} style={{flex:1,padding:"10px 0 14px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontSize:20,lineHeight:1,color:view===n.k?T.accent:T.textDim}}>{n.icon}</span>
              <span style={{fontSize:10,fontWeight:view===n.k?700:400,color:view===n.k?T.accent:T.textDim}}>{n.label}</span>
            </button>
          ))}
        </div>
      )}
    </div></div></div>
  );
}

/* ─── HOME ─── */
function HomeScreen({tables,orders,logs,day,openDay,closeDay,setV,onLock,balancesVisible,setBalancesVisible}){
 const [clock,setClock]=useState(()=>new Date());
 const [hoveredDay,setHoveredDay]=useState(null);
 useEffect(()=>{const timer=setInterval(()=>setClock(new Date()),60000);return()=>clearInterval(timer);},[]);
 const today=tod();
 const recentDays=Array.from({length:7},(_,i)=>{const d=new Date(clock.getFullYear(),clock.getMonth(),clock.getDate()-6+i),key=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");const amount=orders.filter(o=>o.date===key&&!o.partialPayment&&o.status!=="cancelled").reduce((sum,o)=>sum+(Number(o.total)||0),0);return{key,date:d,amount,label:d.toLocaleDateString("en-US",{weekday:"short"}),dateLabel:d.toLocaleDateString("en-US",{day:"numeric",month:"short"})};});
 const todayOrders=orders.filter(o=>o.date===today&&!o.partialPayment&&o.status!=="cancelled");
 const todayRevenue=todayOrders.reduce((sum,o)=>sum+(Number(o.total)||0),0);
 const avgOrder=todayOrders.length?todayRevenue/todayOrders.length:0;
 const maxDay=Math.max(1,...recentDays.map(d=>d.amount));
 const money=v=>balancesVisible?fm(v):"••••••";
 const total7=recentDays.reduce((sum,d)=>sum+d.amount,0);
 const openTables=tables.filter(t=>t.s==="o");
 return <div className="lurk-screen lurk-home-screen ds-home lurk-dashboard-v2">
  <div className="lurk-dashboard-heading"><div><span className="lurk-eyebrow">LURK COFFEE</span><h1>Dashboard</h1></div><span className={"lurk-open-status "+(day?"is-open":"")}>{day?"Business Open":"Business Closed"}</span></div>
  <section className="lurk-kpi-grid">
   <article className="lurk-kpi-card lurk-kpi-primary"><span>Today's Revenue</span><strong>{money(todayRevenue)}</strong><small>{todayOrders.length} completed orders</small></article>
   <article className="lurk-kpi-card pf-kpi-card"><span>Orders</span><strong>{todayOrders.length}</strong><small>Today</small></article>
   <article className="lurk-kpi-card"><span>Average Order Value</span><strong>{money(avgOrder)}</strong><small>Today</small></article>
  </section>
  <section className="lurk-dashboard-lower">
   <article className="lurk-chart-card">
    <h2>SALES OVER THE LAST 7 DAYS</h2>
    <div className="lurk-weekly-chart" role="group" aria-label="Sales over the last seven days">
     {recentDays.map(d=><button key={d.key} className={"lurk-weekly-bar-wrap "+(hoveredDay===d.key?"is-active":"")} onMouseEnter={()=>setHoveredDay(d.key)} onMouseLeave={()=>setHoveredDay(null)} onFocus={()=>setHoveredDay(d.key)} onBlur={()=>setHoveredDay(null)} onClick={()=>setHoveredDay(hoveredDay===d.key?null:d.key)} aria-label={d.dateLabel+", "+money(d.amount)}>
      {hoveredDay===d.key&&<span className="lurk-chart-tooltip"><b>{d.dateLabel}</b><strong>{money(d.amount)}</strong></span>}
      <span className="lurk-chart-value">{money(d.amount).replace(" TL","")}</span><span className="lurk-weekly-bar" style={{height:Math.max(5,(d.amount/maxDay)*100)+"%"}}/>
      <small>{d.label}</small>
     </button>)}
    </div>
   </article>
   <article className="lurk-kpi-card lurk-kpi-primary lurk-weekly-total"><span>Last 7 Days Revenue</span><strong>{money(total7)}</strong><small>Automatically updated</small></article>
   <article className="lurk-ops-card"><div><span>Open Tables</span><strong>{openTables.length}</strong></div><button onClick={()=>setV("tables")}>View Tables <b>↗</b></button><div className="lurk-day-action"><span>{day?"Business is open":"Business is closed"}</span><button onClick={day?closeDay:openDay}>{day?"Close Day":"Start Day"}</button></div></article>
  </section>
 </div>;
}
/* ─── TABLES ─── */
function TablesScreen({tables,customers=[],lurkPlusMembers=[],setTbl,setCustomers,setV,setSel,msg}){
 const [showAdd,setShowAdd]=useState(false);
 const [tableName,setTableName]=useState("");
 const [newTableMemberId,setNewTableMemberId]=useState("");
 const [deleteId,setDeleteId]=useState(null);
 const [editId,setEditId]=useState(null);
 const [editName,setEditName]=useState("");
 const [actionId,setActionId]=useState(null);
 const [filter,setFilter]=useState("all");
 const visible=tables.filter(t=>filter==="all"||(filter==="occupied"?t.s==="o":t.s!=="o"));
 function saveTableName(){
  const clean=editName.trim();
  if(!clean){msg("Enter a table name.");return;}
  if(tables.some(t=>t.id!==editId&&(t.lbl||"").trim().toLowerCase()===clean.toLowerCase())){msg("A table with this name already exists.");return;}
  setTbl(prev=>prev.map(t=>t.id===editId?{...t,lbl:clean}:t));
  setEditId(null);setEditName("");setActionId(null);msg("Table name updated.");
 }
 function addTable(){
  const member=lurkPlusMembers.find(m=>m.id===newTableMemberId)||null;
  const clean=tableName.trim()||(member?member.name.trim():"");
  if(!clean){msg("Enter a table name or select a LURK+ member.");return;}
  if(tables.some(t=>(t.lbl||"").trim().toLowerCase()===clean.toLowerCase())){msg("A table with this name already exists.");return;}
  const id=uid();
  setTbl(prev=>[...prev,{id,lbl:clean,s:"free",order:[],g:member?.name||"",customerId:null,lurkPlusId:member?.id||null,partialPayments:[]}]);
  setTableName("");setNewTableMemberId("");setShowAdd(false);msg(member?"Table added · linked to "+member.name+".":"Table added.");
 }
 return <div className="lurk-screen lurk-tables-screen ds-tables lurk-tables-list">
  <header className="ds-page-head"><div><div className="ds-eyebrow">LURK / FLOOR MANAGEMENT</div><h1>Tables</h1></div><button className="ds-button ds-primary-button" onClick={()=>setShowAdd(true)}>＋ Add Table</button></header>
  <section className="lurk-table-list-toolbar lurk-table-list-toolbar-simple">
   <span>{visible.length} tables</span>
  </section>
  <div className="lurk-table-list-wrap">
   <div className="lurk-table-list-head"><span>TABLE</span><span>STATUS</span><span>ORDER</span><span>AMOUNT</span><span>TIME</span><span></span></div>
   {visible.length===0?<div className="lurk-table-empty"><h3>{tables.length?"No tables match this filter":"No tables yet"}</h3><p>Add a table to start taking orders.</p><button className="ds-button ds-primary-button" onClick={()=>setShowAdd(true)}>＋ Add Table</button></div>:visible.map(t=>{
    const occupied=t.s==="o";
    const count=(t.order||[]).reduce((n,line)=>n+(Number(line.qty)||0),0);
    const amount=(t.order||[]).reduce((n,line)=>n+(Number(line.price)||0)*(Number(line.qty)||0),0);
    const started=t.oa?new Date(t.oa):null;
    const duration=started&&!Number.isNaN(started.getTime())?Math.max(0,Math.floor((Date.now()-started.getTime())/60000))+" min":"—";
    return <div className="lurk-table-list-row" key={t.id}>
     <b>{t.lbl}</b><span className={"lurk-status "+(occupied?"occupied":"available")}>{occupied?"Occupied":"Available"}</span>
     <span>{occupied?count+" items":"—"}</span><strong>{occupied?fm(amount):"—"}</strong><span>{occupied?duration:"—"}</span>
     <div className="lurk-table-row-actions">
      <button className="lurk-open-table" onClick={()=>{setSel(t.id);setV("order");}}>{occupied?"Open Order":"Open Table"} ↗</button>
      <div className="lurk-table-actions-menu">
       <button className="lurk-delete-table" aria-label={"More options for "+t.lbl} aria-haspopup="menu" aria-expanded={actionId===t.id} title="Table options" onClick={()=>setActionId(actionId===t.id?null:t.id)}>···</button>
       {actionId===t.id&&<div className="lurk-table-actions-popover" role="menu">
        <button role="menuitem" onClick={()=>{setEditId(t.id);setEditName(t.lbl||"");setActionId(null);}}>✎ Rename Table</button>
        <button role="menuitem" className="danger" onClick={()=>{setDeleteId(t.id);setActionId(null);}}>⌫ Delete Table</button>
       </div>}
      </div>
     </div>
    </div>;
   })}
  </div>
  {showAdd&&<Modal><div className="lurk-simple-modal"><div className="lurk-eyebrow">TABLE MANAGEMENT</div><h2>Add Table</h2><label htmlFor="lurk-table-name">Table Name</label><input id="lurk-table-name" autoFocus value={tableName} onChange={e=>setTableName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTable()} placeholder="e.g. MOJO"/><label htmlFor="lurk-new-table-member" style={{display:"block",marginTop:14}}>LURK+ Member (Optional)</label><select id="lurk-new-table-member" value={newTableMemberId} onChange={e=>setNewTableMemberId(e.target.value)} style={{width:"100%",padding:12,margin:"7px 0 16px",border:"1px solid #dfe6dc",borderRadius:10,background:"#fff",color:"#202820"}}><option value="">No member linked</option>{lurkPlusMembers.map(m=><option key={m.id} value={m.id}>{m.name} · {m.membershipType==="coffee"?(Number(m.coffeeCredits)||0)+" coffee credits":m.unlimited?"Unlimited":fm(m.balance)}</option>)}</select><button className="ds-button ds-primary-button" onClick={addTable}>Add Table</button><button className="lurk-modal-cancel" onClick={()=>{setShowAdd(false);setTableName("");}}>Cancel</button></div></Modal>}
  {editId&&<Modal><div className="lurk-simple-modal"><div className="lurk-eyebrow">TABLE MANAGEMENT</div><h2>Rename Table</h2><label htmlFor="lurk-edit-table-name">Table Name</label><input id="lurk-edit-table-name" autoFocus value={editName} onChange={e=>setEditName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveTableName()}/><button className="ds-button ds-primary-button" onClick={saveTableName}>Save Name</button><button className="lurk-modal-cancel" onClick={()=>{setEditId(null);setEditName("");}}>Cancel</button></div></Modal>}
  {deleteId&&<Confirm title="Delete Table" msg="This table will be removed." onOk={()=>{const t=tables.find(x=>x.id===deleteId);if(t&&(t.s==="o"||(t.order||[]).length)){msg("Close the active order before deleting this table.");setDeleteId(null);return;}setTbl(prev=>prev.filter(x=>x.id!==deleteId));setDeleteId(null);msg("Table deleted.");}} onCancel={()=>setDeleteId(null)}/>}
 </div>;
}
/* ─── ORDER ─── */
function OrderScreen({table,tables,menu,cats,customers,lurkPlusMembers=[],setTableCustomer,addItem,chQ,pay,moveTableOrder,setTbl,setV,setSel}){
  const[showMenu,setShowMenu]=useState(table.order.length===0);
  const[selCat,setSelCat]=useState(cats[0]||"");
  const[showPay,setShowPay]=useState(false);
  const[showName,setShowName]=useState(false);
  const[showFis,setShowFis]=useState(false);
  const[showMove,setShowMove]=useState(false);
  const[moveSelections,setMoveSelections]=useState({});
  const[name,setName]=useState(table.g||"");
  const[disc,setDisc]=useState("");
  const[search,setSearch]=useState("");
  const[flash,setFlash]=useState(null);
  const [lineActionId,setLineActionId]=useState(null);
  const[pt,setPt]=useState("cash");
  const[splitMode,setSplitMode]=useState(false);
  const[partialMode,setPartialMode]=useState(false);
  const[partialAmount,setPartialAmount]=useState("");
  const[cashPart,setCashPart]=useState("");
  const[cardPart,setCardPart]=useState("");
  const sub=table.order.reduce((s,o)=>s+Math.max(0,(Number(o.price)||0)*(Number(o.qty)||0)-(Number(o.discount)||0)),0);
  const previousPaid=(Array.isArray(table.partialPayments)?table.partialPayments:[]).reduce((sum,p)=>sum+(Number(p.amount)||0),0);
  const discVal=Math.min(Math.max(0,sub-previousPaid),Math.max(0,parseFloat(disc)||0));
  const total=Math.max(0,Math.round((sub-previousPaid-discVal)*100)/100);
  const paymentTarget=partialMode?Math.min(total,Math.max(0,parseFloat(partialAmount)||0)):total;
  const itemCount=table.order.reduce((s,o)=>s+o.qty,0);

  function setLineDiscount(item){
    const current=Number(item.discount)||0;
    const raw=window.prompt("Item discount (TL):",current?String(current):"");
    if(raw===null)return;
    const value=Math.round(Number(String(raw).replace(",","."))*100)/100;
    const max=Math.max(0,(Number(item.price)||0)*(Number(item.qty)||0));
    if(!Number.isFinite(value)||value<0||value>max){window.alert("Enter a valid TL discount up to "+fm(max)+".");return;}
    const key=item.oid||String(item.id);
    setTbl(prev=>prev.map(t=>t.id!==table.id?t:{...t,order:t.order.map(line=>(line.oid||String(line.id))===key?{...line,discount:value}:line)}));
  }

  function handleAdd(item){
    addItem(table.id,item);
    setFlash(item.id);
    setTimeout(()=>setFlash(null),400);
  }

  const grouped=table.order;

  return(
    <div className="lurk-screen lurk-order-screen ds-order" style={{display:"flex",flexDirection:"column",height:"100dvh",maxHeight:"100dvh",minHeight:0,overflow:"hidden",background:T.bg}}>
      {/* Top bar */}
      <div className="ds-order-header" style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"10px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <button onClick={()=>{setSel(null);setV("tables");}} style={{background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"6px 12px",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600}}>← Tables</button>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:15,color:T.text}}>{table.lbl}</div>
          {table.g&&<div style={{fontSize:11,color:T.accentL,fontWeight:600}}>{table.g}</div>}
        </div>
        <button onClick={()=>setShowName(true)} style={{background:"rgba(255,255,255,0.05)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,cursor:"pointer",color:table.g?T.accentL:T.textSub}}>{table.g||"+ Name"}</button>
      </div>

      {/* ORDER VIEW */}
      {!showMenu&&(
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minHeight:0}}>
          <div style={{flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch",padding:"8px 10px"}}>
            {table.order.length===0
              ?<div style={{textAlign:"center",padding:"60px 20px",color:T.textDim}}>
                  <div style={{fontSize:36,marginBottom:12}}>☕</div>
                  <div style={{fontSize:14,fontWeight:600,color:T.textSub}}>No orders yet</div>
                </div>
              :grouped.map((item,index)=>(
                <div className="ds-order-line lurk-order-compact-line" key={item.oid||item.id}>
                  <div className="lurk-order-line-main">
                    <div className="lurk-order-line-copy">
                      <div className="lurk-order-line-name">{item.name}</div>
                      <div className="lurk-order-line-meta">{item.addedAt?new Date(item.addedAt).toLocaleString("en-US",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"Time added not recorded"}</div>
                    </div>
                    <div className="lurk-order-line-price">
                      <span>{fm(item.price)} × {item.qty}</span>
                      <strong>{fm(Math.max(0,item.price*item.qty-(Number(item.discount)||0)))}</strong>
                      {Number(item.discount)>0&&<small>−{fm(item.discount)} discount</small>}
                    </div>
                    <div className="lurk-order-line-menu">
                      <button className="lurk-order-line-more" aria-label={"Options for "+item.name} aria-haspopup="menu" aria-expanded={lineActionId===(item.oid||String(item.id))} onClick={()=>setLineActionId(lineActionId===(item.oid||String(item.id))?null:(item.oid||String(item.id)))}>···</button>
                      {lineActionId===(item.oid||String(item.id))&&<div className="lurk-order-line-popover" role="menu">
                        <button role="menuitem" onClick={()=>{chQ(table.id,item.oid||String(item.id),-1);setLineActionId(null);}}>− Decrease quantity</button>
                        <button role="menuitem" onClick={()=>{addItem(table.id,{id:item.id,name:item.name,price:item.price,cat:item.cat,on:item.on});setLineActionId(null);}}>＋ Increase quantity</button>
                        <button role="menuitem" onClick={()=>{setLineDiscount(item);setLineActionId(null);}}>％ Discount</button>
                      </div>}
                    </div>
                  </div>
                  <div className="lurk-order-line-qty">Quantity: <b>{item.qty}</b></div>
                </div>
              ))
            }
          </div>
          {/* Bottom bar */}
          <div className="ds-order-footer" style={{flexShrink:0,padding:"8px 10px max(12px, env(safe-area-inset-bottom))",borderTop:"0.5px solid rgba(255,255,255,0.08)",background:"rgba(13,13,13,0.97)",backdropFilter:"blur(20px)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:14,color:T.textSub,fontWeight:600}}>Total</span>
              <span style={{fontSize:"clamp(20px,5vw,24px)",fontWeight:800,color:T.accentL,letterSpacing:"-0.5px"}}>{fm(Math.max(0,sub-previousPaid))}</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowMenu(true)} style={{flex:1,padding:"13px",background:T.bg3,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.text,fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Add Order</button>
              <button onClick={()=>setShowMove(true)} disabled={table.order.length===0||tables.filter(t=>t.id!==table.id).length===0} style={{flex:1,padding:"13px",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:table.order.length===0?T.textDim:T.textSub,fontWeight:600,fontSize:12,cursor:table.order.length===0?"not-allowed":"pointer"}}>⇄ Move</button>
              <button onClick={()=>setShowFis(true)} style={{flex:1,padding:"13px",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.textSub,fontWeight:600,fontSize:13,cursor:"pointer"}}>Receipt</button>
              <button onClick={()=>setShowPay(true)} disabled={table.order.length===0} style={{flex:2,padding:"13px",background:table.order.length===0?T.bg3:"linear-gradient(135deg,#34C759,#248A3D)",color:table.order.length===0?T.textDim:"#fff",border:"none",borderRadius:12,fontWeight:800,fontSize:14,cursor:table.order.length===0?"not-allowed":"pointer",boxShadow:table.order.length>0?"0 4px 16px rgba(52,199,89,0.35)":"none"}}>Collect Payment ↑</button>
            </div>
          </div>
        </div>
      )}

      {/* MENU VIEW */}
      {showMenu&&(
        <div className="ds-order-menu" style={{flex:1,display:"flex",overflow:"hidden"}}>
          {/* Left: vertical categories */}
          <div className="ds-order-categories" style={{width:72,background:"rgba(255,255,255,0.02)",borderRight:"0.5px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",overflowY:"auto",flexShrink:0}}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setSelCat(c)} style={{padding:"14px 4px",border:"none",background:selCat===c?"rgba(52,199,89,0.12)":"transparent",borderLeft:"3px solid "+(selCat===c?T.accent:"transparent"),color:selCat===c?T.accent:T.textSub,fontSize:11,fontWeight:selCat===c?700:500,cursor:"pointer",textAlign:"center",lineHeight:1.3,flexShrink:0}}>{c}</button>
            ))}
          </div>
          {/* Right: product grid */}
          <div className="ds-order-catalog" style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <div style={{flex:1,overflowY:"auto",padding:"10px 10px "+(itemCount>0?"80px":"20px")}}>
              <input className="ds-order-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products…" aria-label="Search menu items" style={{width:"100%",boxSizing:"border-box",padding:"11px 13px",marginBottom:10,borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.04)",color:T.text,fontSize:13,outline:"none"}} />
              <div className="lurk-product-grid ds-product-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
                {menu.filter(m=>m.on&&(search.trim()?m.name.toLocaleLowerCase("en-US").includes(search.trim().toLocaleLowerCase("en-US")):m.cat===selCat)).map(item=>{
                  const inCart=table.order.filter(o=>o.id===item.id).reduce((sum,o)=>sum+o.qty,0);
                  const isFlash=flash===item.id;
                  return(                    <button className="ds-product-button" key={item.id} onClick={()=>handleAdd(item)} style={{background:isFlash?"rgba(52,199,89,0.25)":inCart>0?"rgba(52,199,89,0.1)":T.bg2,border:"0.5px solid "+(inCart>0?"rgba(52,199,89,0.35)":"rgba(255,255,255,0.08)"),borderRadius:12,padding:"12px 10px",cursor:"pointer",textAlign:"left",color:T.text,position:"relative",transition:"background 0.15s",outline:"none"}}>
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
                    <span style={{fontSize:12,color:T.textSub,flex:1}}>Back to Order →</span>
                  </button>
                  <button onClick={()=>setShowPay(true)} style={{background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,padding:"11px 18px",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.35)",whiteSpace:"nowrap",flexShrink:0}}>{fm(sub)}</button>
                </div>
              </div>
            )}
            {itemCount===0&&(
              <div style={{flexShrink:0,padding:"10px 12px 20px",borderTop:"0.5px solid rgba(255,255,255,0.08)"}}>
                <button onClick={()=>setShowMenu(false)} style={{width:"100%",padding:"13px",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.textSub,fontWeight:600,fontSize:13,cursor:"pointer"}}>← Back to Order</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showMove&&(
        <Modal>
          <div style={{fontWeight:800,fontSize:18,color:T.text,marginBottom:6}}>Move Items to Another Table</div>
          <div style={{fontSize:12,color:T.textSub,lineHeight:1.5,marginBottom:12}}>Select the items and quantities to move. Unselected items will remain at this table.</div>
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
                <span><b style={{display:"block",fontSize:14}}>{target.lbl}</b><span style={{fontSize:11,color:T.textSub}}>{target.s==="o"?"Occupied table · "+fm(targetTotal):"Available table"}</span></span>
                <span style={{color:T.accentL,fontSize:18}}>→</span>
              </button>;
            })}
          </div>
          <button onClick={()=>{setMoveSelections({});setShowMove(false);}} style={{width:"100%",padding:12,marginTop:12,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Cancel</button>
        </Modal>
      )}

      {/* Receipt modal */}
      {showFis&&(
        <Modal>
          <div style={{textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.5px",color:T.text}}>LURK.</div>
            <div style={{fontSize:11,color:T.textSub,marginTop:2}}>Besiktas, Istanbul</div>
          </div>
          <div style={{borderTop:"1px dashed rgba(255,255,255,0.1)",marginBottom:12}}/>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,color:T.textSub}}>{table.lbl}</div>
            {table.g&&<div style={{fontSize:14,fontWeight:600,marginTop:1,color:T.text}}>{table.g}</div>}
            <div style={{fontSize:11,color:T.textSub,marginTop:2}}>{new Date().toLocaleDateString("en-US",{day:"numeric",month:"long"})} · {ft(new Date().toISOString())}</div>
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
            <span style={{fontSize:15,fontWeight:700,color:T.text}}>Total</span>
            <span style={{fontSize:15,fontWeight:800,color:T.accentL}}>{fm(sub)}</span>
          </div>
          <div style={{textAlign:"center",marginTop:16,fontSize:11,color:T.textDim}}>Thank you ✦</div>
          <button onClick={()=>setShowFis(false)} style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,color:T.textSub,fontSize:13,cursor:"pointer",marginTop:16}}>Kapat</button>
        </Modal>
      )}

      {showName&&(
        <Modal>
          <div className="lurk-simple-modal">
            <div className="lurk-eyebrow">ORDER CUSTOMER</div><h2>Select Customer</h2>
            <p className="lurk-modal-copy">Customer selection is optional. You can continue as a guest.</p>
            <div className="lurk-customer-picker">
              {customers.map(c=><button key={c.id} onClick={()=>{setTableCustomer(table.id,c);setName(c.name);setShowName(false);}}><span>{c.name}</span>{c.lurkPlus&&<small>LURK+</small>}</button>)}
            </div>
            <button className="ds-button ds-primary-button" onClick={()=>{setTableCustomer(table.id,null);setName("");setShowName(false);}}>Continue as Guest</button>
            <button className="lurk-modal-cancel" onClick={()=>setShowName(false)}>Cancel</button>
          </div>
        </Modal>
      )}

      {/* Payment modal */}
      {showPay&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:4,color:T.text}}>Collect Payment</div>
          {previousPaid>0&&<div style={{fontSize:11,color:T.accentL,marginBottom:8}}>Previously Collected: {fm(previousPaid)}</div>}
          <div style={{fontSize:12,color:T.textSub,marginBottom:16}}>{table.lbl}{table.g?" · "+table.g:""}</div>
          <div style={{background:T.bg2,borderRadius:12,padding:"12px 14px",marginBottom:14,border:"0.5px solid rgba(255,255,255,0.08)"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:8}}><span>Subtotal</span><span>{fm(sub)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:8}}><span>Discount</span><span style={{color:discVal>0?T.accentL:T.textSub}}>−{fm(discVal)}</span></div>
            <div style={{height:1,background:"rgba(255,255,255,0.09)",marginBottom:8}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:13,fontWeight:700,color:T.text}}>Amount Due</span><span style={{fontSize:25,fontWeight:800,color:T.accentL,letterSpacing:"-1px"}}>{fm(total)}</span></div>
          </div>
          <input type="number" min="0" max={sub} placeholder="Discount (TRY)" value={disc} disabled={partialMode||previousPaid>0} onChange={e=>setDisc(e.target.value)}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:8,background:"rgba(255,255,255,0.07)",color:T.text,opacity:partialMode||previousPaid>0?0.5:1}}/>
          {!table.lurkPlusId&&pt!=="credit"&&<button onClick={()=>{setPartialMode(v=>!v);setPartialAmount("");setSplitMode(false);setDisc("");}} style={{width:"100%",padding:10,marginBottom:10,background:partialMode?"rgba(52,199,89,.15)":T.bg2,border:"1px solid "+(partialMode?"rgba(52,199,89,.4)":"rgba(255,255,255,.1)"),borderRadius:10,color:partialMode?T.accentL:T.textSub,fontWeight:700,fontSize:12}}>{partialMode?"✓ Partial payment enabled":"＋ Make partial payment"}</button>}
          {partialMode&&<input type="number" min="0.01" max={total} value={partialAmount} onChange={e=>{setPartialAmount(e.target.value);setCashPart(e.target.value);setCardPart("");}} placeholder={"Amount to collect now · remaining "+fm(total)} style={{width:"100%",padding:"12px 14px",border:"1px solid rgba(52,199,89,.35)",borderRadius:10,fontSize:16,boxSizing:"border-box",marginBottom:12,background:"rgba(255,255,255,.06)",color:T.text}}/>}
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {["cash","card","credit"].map(p=>(
              <button key={p} onClick={()=>{setPt(p);setSplitMode(false);if(p==="credit")setPartialMode(false);}} style={{flex:1,padding:"12px",border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",background:!splitMode&&pt===p?"rgba(52,199,89,0.15)":"rgba(255,255,255,0.05)",color:!splitMode&&pt===p?T.accentL:T.textSub,borderColor:!splitMode&&pt===p?"rgba(52,199,89,0.4)":"rgba(255,255,255,0.12)"}}>
                {p==="cash"?"Cash":p==="card"?"Card":"On account"}
              </button>
            ))}
          </div>
          <button onClick={()=>{setSplitMode(v=>{if(!v)setPt("cash");return !v;});setCashPart(partialMode?partialAmount:"");setCardPart("");}} style={{width:"100%",padding:"9px",marginBottom:12,background:splitMode?"rgba(52,199,89,0.14)":"rgba(255,255,255,0.05)",border:"0.5px solid "+(splitMode?"rgba(52,199,89,0.4)":"rgba(255,255,255,0.12)"),borderRadius:10,color:splitMode?T.accentL:T.textSub,fontSize:12,fontWeight:700,cursor:"pointer"}}>{splitMode?"Disable split payment":"Split between cash and card"}</button>
          {splitMode&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            <label style={{fontSize:11,color:T.textSub}}>Cash (TL)<input type="number" min="0" max={total} value={cashPart} onChange={e=>{setCashPart(e.target.value);setCardPart(String(Math.max(0,Math.round(((partialMode?paymentTarget:total)-(parseFloat(e.target.value)||0))*100)/100)));}} placeholder="0,00" style={{width:"100%",marginTop:5,padding:"10px",background:T.bg2,color:T.text,border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:9}}/></label>
            <label style={{fontSize:11,color:T.textSub}}>Card (TL)<input type="number" min="0" max={total} value={cardPart} onChange={e=>setCardPart(e.target.value)} placeholder="0,00" style={{width:"100%",marginTop:5,padding:"10px",background:T.bg2,color:T.text,border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:9}}/></label>
          </div>}
          {splitMode&&<div style={{fontSize:11,color:Math.abs((parseFloat(cashPart)||0)+(parseFloat(cardPart)||0)-total)<0.009?T.accentL:"#FF6B6B",marginBottom:12}}>Payment total: {fm((parseFloat(cashPart)||0)+(parseFloat(cardPart)||0))} / {fm(total)}</div>}
          <button onClick={()=>{const target=partialMode?paymentTarget:total;const payments=splitMode?[{method:"cash",amount:parseFloat(cashPart)||0},{method:"card",amount:parseFloat(cardPart)||0}]:[{method:pt,amount:target}];if(partialMode&&(!(target>0)||target>total+0.009)){msg("Partial payment cannot exceed the remaining balance.");return;}if(splitMode&&Math.abs((parseFloat(cashPart)||0)+(parseFloat(cardPart)||0)-target)>0.009){msg("The cash and card amounts must match the amount being collected.");return;}pay(table.id,pt,discVal,pt==="credit"?[{method:"credit",amount:total}]:payments,partialMode);if(pt==="credit"&&table.customerId)setShowPay(false);else if(partialMode&&target<total-0.009)setShowPay(false);}} style={{width:"100%",padding:"15px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.35)"}}>{partialMode?"Collect Partial Payment · "+fm(paymentTarget):"Collect Payment · "+fm(total)}</button>
          <button onClick={()=>setShowPay(false)} style={{width:"100%",padding:"11px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>Cancel</button>
        </Modal>
      )}
    </div>
  );
}

/* ─── MONTH REVIEW ─── */
function MonthReviewScreen({orders,tables,creditEntries=[],setV}){
  const now=new Date();
  const [selectedMonth,setSelectedMonth]=useState(thisMonth());
  const months=[...new Set([thisMonth(),...orders.map(o=>(o.date||"").slice(0,7)).filter(m=>/^\d{4}-\d{2}$/.test(m)),...creditEntries.filter(e=>e.type==="manual_cash").map(e=>(e.date||"").slice(0,7)).filter(m=>/^\d{4}-\d{2}$/.test(m))])].sort((a,b)=>b.localeCompare(a));
  const [year,setYear]=useState(String(now.getFullYear()));
  const monthLabel=(m)=>{const [y,mm]=m.split("-").map(Number);return new Date(y,mm-1,1).toLocaleDateString("en-US",{month:"long",year:"numeric"});};
  const monthOrders=orders.filter(o=>(o.date||"").slice(0,7)===selectedMonth);
  const openOrders=tables.flatMap(t=>(t.order||[]).length?[{date:tod(),total:(t.order||[]).reduce((s,i)=>s+(i.revenueExcluded?0:(Number(i.price)||0)*(Number(i.qty)||0)),0),items:t.order.filter(i=>!i.revenueExcluded)}]:[]);
  const closedRevenue=monthOrders.reduce((s,o)=>s+(Number(o.total)||0),0);
  const openRevenue=selectedMonth===thisMonth()?openOrders.reduce((s,o)=>s+o.total,0):0;
  const manualCashRevenue=creditEntries.filter(e=>e.type==="manual_cash"&&(e.date||"").slice(0,7)===selectedMonth).reduce((sum,e)=>sum+(Number(e.amount)||0),0);
  const revenue=closedRevenue+openRevenue+manualCashRevenue;
  const productTotals={};
  [...monthOrders,...(selectedMonth===thisMonth()?openOrders:[])].forEach(o=>(o.items||[]).forEach(item=>{
    const key=(item.name||"Product").trim();
    if(!productTotals[key])productTotals[key]={name:key,revenue:0,qty:0};
    productTotals[key].revenue+=(Number(item.price)||0)*(Number(item.qty)||0);
    productTotals[key].qty+=Number(item.qty)||0;
  }));
  const topProducts=Object.values(productTotals).sort((a,b)=>b.revenue-a.revenue).slice(0,5);
  const yearRevenue=orders.filter(o=>(o.date||"").startsWith(year+"-")).reduce((s,o)=>s+(Number(o.total)||0),0)+creditEntries.filter(e=>e.type==="manual_cash"&&(e.date||"").startsWith(year+"-")).reduce((s,e)=>s+(Number(e.amount)||0),0);
  const yearOptions=[...new Set([String(now.getFullYear()),...orders.map(o=>(o.date||"").slice(0,4)).filter(y=>/^\d{4}$/.test(y))])].sort((a,b)=>b.localeCompare(a));
  return(
    <div className="lurk-screen lurk-reports-screen ds-month-review" style={{background:"#090A08",minHeight:"100vh",color:"#F0EBDD"}}>
      <div style={{background:"#0B0D0A",borderBottom:"1px solid rgba(233,225,207,.13)",padding:"20px 16px 17px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:23,fontWeight:900,letterSpacing:"-1px",flex:1,color:"#F0EBDD"}}>How Was This Month?<div style={{fontSize:9,fontWeight:750,letterSpacing:"2.4px",color:"#92958A",marginTop:4}}>LURK / MONTHLY REVIEW</div></div>
      </div>
      <div style={{padding:"16px 14px"}}>
        <label style={{display:"block",fontSize:9,fontWeight:850,letterSpacing:"1.6px",color:"#B9B7A9",marginBottom:7}}>REPORTING PERIOD</label>
        <select className="lurk-month-review-select" value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)} style={{width:"100%",padding:13,marginBottom:15,background:"#E9E1CF",color:"#171914",border:"1px solid #F6EFDF",borderRadius:9,textTransform:"capitalize",fontWeight:800,letterSpacing:".2px"}}>
          {months.map(m=><option key={m} value={m}>{monthLabel(m)}</option>)}
        </select>
        <div style={{background:"linear-gradient(145deg,#EDE5D4 0%,#E3DAC6 100%)",color:"#171914",border:"1px solid rgba(255,255,255,.55)",borderRadius:13,padding:18,marginBottom:13,boxShadow:"0 9px 22px rgba(0,0,0,.24)"}}>
          <div style={{fontSize:10,color:"#62665A",fontWeight:850,letterSpacing:"1.3px",textTransform:"capitalize"}}>{monthLabel(selectedMonth)} REVENUE</div>
          <div style={{fontSize:31,fontWeight:950,color:"#24452B",letterSpacing:"-1.2px",marginTop:7}}>{fm(revenue)}</div>
          <div style={{fontSize:10,color:"#77796E",fontWeight:650,marginTop:7}}>Kapanan orderslar{selectedMonth===thisMonth()?" + current items on open tables":""}{manualCashRevenue>0?" + manual cash collections":""}</div>
        </div>
        <div style={{background:"linear-gradient(145deg,#11140F,#0D100D)",border:"1px solid rgba(233,225,207,.16)",borderRadius:12,padding:16,marginBottom:17,boxShadow:"0 7px 18px rgba(0,0,0,.18)"}}>
          <div style={{fontSize:10,fontWeight:850,color:"#D8D2C3",letterSpacing:"1.8px",marginBottom:4}}>ANNUAL REVENUE</div>
          <label style={{display:"block",fontSize:11,color:T.textSub,margin:"10px 0 6px"}}>Select Year</label>
          <select className="lurk-month-review-select" value={year} onChange={e=>setYear(e.target.value)} style={{width:"100%",padding:11,background:"#E9E1CF",color:"#171914",border:"1px solid #F6EFDF",borderRadius:9,fontWeight:800}}>
            {yearOptions.map(y=><option key={y} value={y}>{y}</option>)}
          </select>
          <div style={{fontSize:25,fontWeight:950,color:"#A8C17D",letterSpacing:"-.8px",marginTop:12}}>{fm(yearRevenue)}</div>
          <div style={{fontSize:10,color:T.textDim,marginTop:3}}>Orders and manual cash collections for the selected year</div>
        </div>
        <div style={{fontSize:15,fontWeight:900,color:"#F0EBDD",letterSpacing:"-.3px",marginBottom:5}}>Top 5 Revenue-Generating Products</div>
        <div style={{fontSize:10,color:"#92958A",marginBottom:11}}>Ranked by sales revenue, not quantity sold.</div>
        {topProducts.length?topProducts.map((p,i)=><div key={p.name} style={{display:"flex",alignItems:"center",gap:10,background:"linear-gradient(145deg,#EDE5D4,#E3DAC6)",border:"1px solid rgba(255,255,255,.5)",borderRadius:10,padding:13,marginBottom:8}}>
          <div style={{width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:9,background:"rgba(36,69,43,.12)",color:"#24452B",fontSize:13,fontWeight:800,flexShrink:0}}>{i+1}</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:850,color:"#171914"}}>{p.name}</div><div style={{fontSize:10,color:"#686B60",marginTop:3}}>{p.qty} items sold</div></div>
          <div style={{fontSize:13,fontWeight:950,color:"#24452B",textAlign:"right",whiteSpace:"nowrap"}}>{fm(p.revenue)}</div>
        </div>):<div style={{padding:20,textAlign:"center",background:T.bg2,borderRadius:12,color:T.textSub,fontSize:12}}>No product sales recorded for this month.</div>}
      </div>
    </div>
  );
}

/* ─── SALES HISTORY ─── */
function SalesHistoryScreen({orders,setOrders,balancesVisible,setV}){
 const [query,setQuery]=useState("");
 const [payment,setPayment]=useState("all");
 const [status,setStatus]=useState("all");
 const [table,setTable]=useState("all");
 const [from,setFrom]=useState("");
 const [to,setTo]=useState("");
 const [selected,setSelected]=useState(null);
 const money=v=>balancesVisible?fm(v):"••••••";
 const rows=orders.filter(o=>!o.partialPayment).filter(o=>{
  const no=String(o.orderNumber||"").padStart(5,"0");
  const method=o.pt==="split"?"split":o.pt==="cash"?"cash":o.pt==="card"?"card":o.pt||"other";
  const state=o.status==="cancelled"?"cancelled":"completed";
  return (!query||no.includes(query.replace(/^#/,""))||String(o.orderNumber||"").includes(query.replace(/^#/,""))) &&
   (payment==="all"||method===payment) && (status==="all"||state===status) &&
   (table==="all"||(o.table||"")===table) && (!from||o.date>=from) && (!to||o.date<=to);
 }).sort((a,b)=>(Number(b.orderNumber)||0)-(Number(a.orderNumber)||0)||String(b.date||"").localeCompare(String(a.date||"")));
 const completed=orders.filter(o=>!o.partialPayment&&o.status!=="cancelled");
 const revenue=completed.reduce((sum,o)=>sum+(Number(o.total)||0),0);
 const tableNames=[...new Set(orders.map(o=>o.table).filter(Boolean))].sort();
 function exportCsv(){
  const data=[["Order ID","Date","Table","Customer","Items","Discount","Total","Payment Method","Status"],...rows.map(o=>["#"+String(o.orderNumber||"").padStart(5,"0"),o.date,o.table||"",o.g||"",(o.items||[]).map(i=>i.name+" x"+i.qty).join(" | "),Number(o.discount)||0,Number(o.total)||0,o.pt||"",o.status==="cancelled"?"Cancelled":"Completed"])];
  const csv=data.map(row=>row.map(v=>'"'+String(v??"").replace(/"/g,'""')+'"').join(";")).join("\r\n");
  const blob=new Blob(["\uFEFF",csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="lurk-sales-history-"+tod()+".csv";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 function cancelOrder(order){
  if(!window.confirm("Cancel order #"+String(order.orderNumber||"").padStart(5,"0")+"? It will remain in Sales History and be excluded from revenue."))return;
  setOrders(prev=>prev.map(o=>o.id===order.id?{...o,status:"cancelled",cancelledAt:new Date().toISOString()}:o));
  setSelected(null);
 }
 return <div className="lurk-screen lurk-sales-history">
  <header className="ds-page-head"><div><div className="ds-eyebrow">LURK / SALES</div><h1>Sales History</h1></div><button className="ds-button ds-primary-button" onClick={exportCsv}>↓ Export CSV</button></header>
  <div className="lurk-history-kpis">
   <div className="lurk-kpi-card lurk-kpi-primary"><span>Total Orders</span><strong>{completed.length.toLocaleString("en-US")}</strong><small>Completed orders</small></div>
   <div className="lurk-kpi-card lurk-kpi-primary"><span>Total Revenue</span><strong>{money(revenue)}</strong><small>Cancelled orders excluded</small></div>
   <div className="lurk-kpi-card"><span>Cancelled</span><strong>{orders.filter(o=>!o.partialPayment&&o.status==="cancelled").length}</strong><small>Order records retained</small></div>
  </div>
  <div className="lurk-history-filters">
   <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Order ID"/>
   <select value={payment} onChange={e=>setPayment(e.target.value)}><option value="all">All Payments</option><option value="cash">Cash</option><option value="card">Credit Card</option><option value="split">Split</option></select>
   <select value={status} onChange={e=>setStatus(e.target.value)}><option value="all">All Statuses</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
   <select value={table} onChange={e=>setTable(e.target.value)}><option value="all">All Tables</option>{tableNames.map(t=><option key={t}>{t}</option>)}</select>
   <input aria-label="From date" type="date" value={from} onChange={e=>setFrom(e.target.value)}/>
   <input aria-label="To date" type="date" value={to} onChange={e=>setTo(e.target.value)}/>
  </div>
  <div className="lurk-history-table-wrap">
   <table className="lurk-history-table"><thead><tr><th>ORDER ID</th><th>DATE</th><th>TABLE</th><th>ITEMS</th><th>PAYMENT</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>
    {rows.map(o=><tr key={o.id} onClick={()=>setSelected(o)}><td><b>#{String(o.orderNumber||"").padStart(5,"0")}</b></td><td>{o.date}</td><td>{o.table||"—"}</td><td>{(o.items||[]).reduce((n,i)=>n+(Number(i.qty)||0),0)}</td><td>{o.pt==="split"?"Split":o.pt==="cash"?"Cash":o.pt==="card"?"Credit Card":o.pt||"Other"}</td><td><strong>{money(o.total)}</strong></td><td><span className={"lurk-status "+(o.status==="cancelled"?"occupied":"available")}>{o.status==="cancelled"?"Cancelled":"Completed"}</span></td></tr>)}
   </tbody></table>
   {!rows.length&&<div className="lurk-table-empty"><h3>No sales found</h3><p>Try changing your filters.</p></div>}
  </div>
  {selected&&<Modal><div className="lurk-history-detail"><div className="lurk-eyebrow">ORDER DETAILS</div><h2>#{String(selected.orderNumber||"").padStart(5,"0")}</h2><p>{selected.date} · {selected.table||"No table"} · {selected.g||"Guest"}</p>
   <div className="lurk-history-detail-lines">{(selected.items||[]).map((item,i)=><div key={item.oid||i}><span>{item.name} × {item.qty}</span><b>{money((Number(item.price)||0)*(Number(item.qty)||0))}</b></div>)}</div>
   <div className="lurk-history-detail-total"><span>Total</span><strong>{money(selected.total)}</strong></div>
   <button className="ds-button ds-primary-button" onClick={()=>window.print()}>Print Receipt</button>
   {selected.status!=="cancelled"&&<button className="lurk-cancel-order" onClick={()=>cancelOrder(selected)}>Cancel Order</button>}
   <button className="lurk-modal-cancel" onClick={()=>setSelected(null)}>Close</button>
  </div></Modal>}
 </div>;
}

/* ─── REPORTS ─── */
function ReportsScreen({orders,logs,creditEntries,setCreditEntries,lurkPlusMembers=[],setV}){
  const months=[...new Set([...orders.map(o=>o.date?o.date.slice(0,7):""),...logs.map(l=>l.date?l.date.slice(0,7):""),...creditEntries.map(e=>e.date?e.date.slice(0,7):""),...lurkPlusMembers.flatMap(m=>(m.history||[]).filter(h=>h.type==="topup"&&h.date).map(h=>h.date.slice(0,7)))].filter(Boolean))].sort((a,b)=>b.localeCompare(a));
  const now=thisMonth();
  const[sel,setSel]=useState(months[0]||now);
  const[exp,setExp]=useState(null);
  function ml(m){const[y,mo]=m.split("-");return new Date(y,parseInt(mo)-1).toLocaleDateString("en-US",{month:"long",year:"numeric"});}
  function addManualCash(){const name=window.prompt("Name of the person making the payment:");if(name===null||!name.trim())return;const raw=window.prompt(name.trim()+"Cash amount received for ");if(raw===null)return;const amount=Math.round(Number(raw.replace(",","."))*100)/100;if(!Number.isFinite(amount)||amount<=0){window.alert("Enter a valid amount.");return;}const date=new Date().toISOString();setCreditEntries(prev=>[{id:"manual-cash-"+Date.now()+"-"+Math.random().toString(36).slice(2,7),type:"manual_cash",method:"cash",customerName:name.trim(),amount,date,note:"Manual cash collection"},...prev]);}
  function exportMonthCsv(){
    const headers=["Date","Table","Customer","Subtotal","Discount","Total","Cash","Card","On account","Payment Method","Productler"];
    const rows=mo.map(o=>[o.date,o.table||"",o.g||"",Number(o.subtotal??o.total)||0,Number(o.discount)||0,Number(o.total)||0,paymentAmount(o,"cash"),paymentAmount(o,"card"),o.pt==="credit"?(Number(o.total)||0):0,o.pt==="split"?"Cash + Card":o.pt==="cash"?"Cash":o.pt==="card"?"Card":o.pt==="credit"?"On account":"Other",(o.items||[]).map(i=>i.name+" x"+i.qty).join("; ")]);
    const ledgerRows=creditEntries.filter(e=>(e.date||"").slice(0,7)===sel).map(e=>[(e.date||"").slice(0,10),e.type==="manual_cash"?"Manual cash collection":"On account defteri",e.customerName||"",0,0,0,((e.type==="payment"&&e.method==="cash")||e.type==="manual_cash")?(Number(e.amount)||0):0,e.type==="payment"&&e.method==="card"?(Number(e.amount)||0):0,e.type==="debt"?(Number(e.amount)||0):0,e.type==="debt"?"Debt record":e.type==="manual_cash"?"Manual · Cash":"Collection · "+(e.method==="cash"?"Cash":e.method==="card"?"Card":"Other"),e.note||""]);
    const topupRows=lurkPlusMembers.flatMap(m=>(m.history||[]).filter(h=>h.type==="topup"&&h.date&&(h.date||"").slice(0,7)===sel).map(h=>{const method=h.method||"cash";const amount=Number(h.amount)||0;return[(h.date||"").slice(0,10),"LURK+ balance top-up",m.name,0,0,amount,method==="cash"?amount:0,method==="card"?amount:0,0,"LURK+ · "+(method==="cash"?"Cash":"Card"),""];}));
    const csv=[headers,...rows,...ledgerRows,...topupRows].map(row=>row.map(v=>{const x=String(v??"");return '"'+x.replace(/"/g,'""')+'"';}).join(";")).join("\r\n");
    const blob=new Blob(["\uFEFF",csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="lurk-satis-"+sel+".csv";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  const ms=sel+"-01";
  const me=sel+"-"+String(new Date(parseInt(sel.slice(0,4)),parseInt(sel.slice(5,7)),0).getDate()).padStart(2,"0");
  const mo=orders.filter(o=>o.date&&o.date>=ms&&o.date<=me);
  const ml2=logs.filter(l=>l.date&&l.date>=ms&&l.date<=me);
  const salesInc=mo.reduce((s,o)=>s+o.total,0)||ml2.reduce((s,l)=>s+(l.inc||0),0);
  const manualCashTotal=creditEntries.filter(e=>e.type==="manual_cash"&&(e.date||"").slice(0,7)===sel).reduce((sum,e)=>sum+(Number(e.amount)||0),0);

  const monthLedger=creditEntries.filter(e=>(e.date||"").slice(0,7)===sel);
  const lurkPlusTopups=lurkPlusMembers.flatMap(m=>(m.history||[]).filter(h=>h.type==="topup"&&h.date&&(h.date||"").slice(0,7)===sel).map(h=>({...h,method:h.method||"cash",memberName:m.name})));
  const topupTotal=lurkPlusTopups.reduce((sum,e)=>sum+(Number(e.amount)||0),0);
  const totalInc=salesInc+manualCashTotal+topupTotal;
  const topupCash=lurkPlusTopups.filter(e=>e.method==="cash").reduce((sum,e)=>sum+(Number(e.amount)||0),0);
  const topupCard=lurkPlusTopups.filter(e=>e.method==="card").reduce((sum,e)=>sum+(Number(e.amount)||0),0);
  const topupTotalDisplay=topupTotal;
  const totalCash=mo.reduce((s,o)=>s+paymentAmount(o,"cash"),0)+monthLedger.filter(e=>(e.type==="payment"&&e.method==="cash")||e.type==="manual_cash").reduce((s,e)=>s+(Number(e.amount)||0),0)+topupCash;
  const totalCard=mo.reduce((s,o)=>s+paymentAmount(o,"card"),0)+monthLedger.filter(e=>e.type==="payment"&&e.method==="card").reduce((s,e)=>s+(Number(e.amount)||0),0)+topupCard;
  const dayMap={};
  lurkPlusTopups.forEach(e=>{const d=(e.date||"").slice(0,10);if(!d)return;if(!dayMap[d])dayMap[d]={date:d,orders:[],inc:0};dayMap[d].inc+=(Number(e.amount)||0);if(!dayMap[d].topups)dayMap[d].topups=[];dayMap[d].topups.push(e);});
  mo.forEach(o=>{if(!dayMap[o.date])dayMap[o.date]={date:o.date,orders:[],inc:0};dayMap[o.date].orders.push(o);dayMap[o.date].inc+=o.total;});
  ml2.forEach(l=>{if(!dayMap[l.date])dayMap[l.date]={date:l.date,orders:[],inc:l.inc||0,log:l};else{if(!dayMap[l.date].inc)dayMap[l.date].inc=l.inc||0;dayMap[l.date].log=l;}});
  monthLedger.filter(e=>e.type==="manual_cash"&&e.date).forEach(e=>{const d=e.date.slice(0,10);if(!dayMap[d])dayMap[d]={date:d,orders:[],inc:0};dayMap[d].inc+=(Number(e.amount)||0);if(!dayMap[d].manualCash)dayMap[d].manualCash=[];dayMap[d].manualCash.push(e);});
  const days=Object.values(dayMap).sort((a,b)=>b.date.localeCompare(a.date));

  return(
    <div className="lurk-screen lurk-reports-screen ds-sales-report" style={{background:"#F6F8F5",minHeight:"100vh",color:"#18251D"}}>
      <div style={{background:"#FFFFFF",borderBottom:"1px solid #DDE5DD",padding:"20px 16px 17px",display:"flex",alignItems:"center",gap:11}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:25,fontWeight:900,letterSpacing:"-1px",flex:1,color:"#18251D"}}>Revenue<div style={{fontSize:9,fontWeight:700,letterSpacing:"2.4px",color:"#66746A",marginTop:4}}>LURK / BUSINESS PERFORMANCE</div></div><button onClick={()=>setV("salesHistory")} style={{background:"#22251F",color:"#FFFFFF",border:0,borderRadius:9,padding:"10px 11px",fontSize:10,fontWeight:850,cursor:"pointer",whiteSpace:"nowrap"}}>Sales History</button><button onClick={()=>setV("customers")} style={{background:"#EDF4DF",color:"#34451C",border:"1px solid #DCE9C6",borderRadius:9,padding:"10px 11px",fontSize:10,fontWeight:850,cursor:"pointer",whiteSpace:"nowrap"}}>Customers</button><button onClick={addManualCash} style={{background:"#176B32",color:"#FFFFFF",border:"1px solid #176B32",borderRadius:9,padding:"10px 11px",fontSize:10,fontWeight:850,cursor:"pointer",whiteSpace:"nowrap"}}>＋ Add Cash</button><button onClick={exportMonthCsv} style={{background:"#E8F3E9",color:"#176B32",border:"1px solid #CFE3D1",borderRadius:9,padding:"10px 13px",fontSize:11,fontWeight:850,cursor:"pointer"}}>↓ CSV</button>
      </div>

      {/* Month selector */}
      <div style={{display:"flex",gap:7,padding:"14px 14px",overflowX:"auto",borderBottom:"1px solid #E4EAE4",background:"#FFFFFF"}}>
        {(months.length?months:[now]).map(m=>(
          <button key={m} onClick={()=>setSel(m)} style={{padding:"8px 15px",border:"1px solid "+(sel===m?"#A9CDAE":"#DDE5DD"),borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:800,whiteSpace:"nowrap",flexShrink:0,background:sel===m?"#E8F3E9":"#F7F9F7",color:sel===m?"#176B32":"#536258",boxShadow:sel===m?"0 2px 8px rgba(24,37,29,.08)":"none"}}>
            {ml(m)}
          </button>
        ))}
      </div>

      {/* Stat kartlar */}
      <div style={{padding:"15px 14px",display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:8}}>
        {[
          {label:"Sales",val:fm(totalInc),color:T.accentL},
          {label:"Cash collected",val:fm(totalCash),color:T.text},
          {label:"Card collected",val:fm(totalCard),color:T.text},
          {label:"LURK+ top-ups",val:fm(topupTotalDisplay),color:T.text},
        ].map((s,i)=>(
          <div key={i} style={{background:"#E9E1CF",color:"#171914",borderRadius:11,padding:"13px 10px",border:"1px solid #F6EFDF",minWidth:0,boxShadow:"0 7px 18px rgba(0,0,0,.2)"}}>
            <div style={{fontSize:9,color:"#536258",fontWeight:850,textTransform:"uppercase",letterSpacing:"1px",marginBottom:7,whiteSpace:"nowrap"}}>{s.label}</div>
            <div style={{fontSize:13,fontWeight:950,color:i===0?"#24452B":"#171914",letterSpacing:"-.4px",whiteSpace:"nowrap"}}>{s.val.replace(" TL","")}</div>
            <div style={{fontSize:9,color:"#66746A",marginTop:3,fontWeight:750,letterSpacing:"1px"}}>TL</div>
          </div>
        ))}
      </div>

      {/* Days */}
      <div style={{padding:"0 14px 14px"}}>
        <div style={{fontSize:10,fontWeight:850,color:"#B9B7A9",textTransform:"uppercase",letterSpacing:"2px",marginBottom:12}}>DAILY RECORDS</div>
        {days.length===0&&<div style={{padding:"24px",textAlign:"center",fontSize:13,color:T.textSub,background:T.bg2,borderRadius:14}}>No records for this month</div>}
        {days.map(day=>{
          const isExp=exp===day.date;
          const log=day.log;
          return(
            <div key={day.date} style={{background:"#FFFFFF",borderRadius:12,marginBottom:9,border:"1px solid #DDE5DD",overflow:"hidden",boxShadow:"0 3px 12px rgba(24,37,29,.06)"}}>
              <div onClick={()=>setExp(isExp?null:day.date)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px 14px",cursor:"pointer"}}>
                <div>
                  <div style={{fontSize:14,fontWeight:800,color:"#18251D",letterSpacing:"-.2px"}}>{new Date(day.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",day:"numeric",month:"long"})}</div>
                  <div style={{fontSize:10,color:"#66746A",marginTop:4}}>{log?ft(log.oa)+" – "+ft(log.ca)+" · ":""}{day.orders.filter(o=>!o.partialPayment).length||log?.count||0} orders</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:15,fontWeight:900,color:"#176B32"}}>{fm(day.inc)}</div>
                  <div style={{fontSize:11,color:T.textDim,marginTop:2}}>{isExp?"▲":"▽"}</div>
                </div>
              </div>
              {isExp&&(day.topups||[]).map((e,i)=><div key={"lurkplus-topup-"+i} style={{display:"flex",justifyContent:"space-between",padding:"10px 20px",borderTop:"1px solid #E8EEE8",background:"#F5F8ED"}}><div><div style={{fontSize:13,color:T.text}}>{e.memberName||"LURK+ member"}</div><div style={{fontSize:11,color:T.textSub,marginTop:1}}>LURK+ balance top-up · {e.method==="card"?"Card":"Cash"}</div></div><div style={{fontSize:13,fontWeight:700,color:T.accentL}}>{fm(e.amount)}</div></div>)}
              {isExp&&(day.manualCash||[]).map((e,i)=><div key={"manual-cash-"+i} style={{display:"flex",justifyContent:"space-between",padding:"10px 20px",borderTop:"1px solid #E8EEE8",background:"#F1F7F1"}}><div><div style={{fontSize:13,color:T.text}}>{e.customerName||"Manual collection"}</div><div style={{fontSize:11,color:T.textSub,marginTop:1}}>Manual cash collection</div></div><div style={{fontSize:13,fontWeight:700,color:T.accentL}}>{fm(e.amount)}</div></div>)}
               {isExp&&day.orders.filter(o=>!o.partialPayment).length>0&&day.orders.filter(o=>!o.partialPayment).map((o,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 20px",borderTop:"1px solid #E8EEE8",background:"#FAFBFA"}}>
                  <div>
                    <div style={{fontSize:13,color:T.text}}>{o.g||"—"}</div>
                    <div style={{fontSize:11,color:T.textSub,marginTop:1}}>{o.pt==="cash"?"Cash":o.pt==="credit"?"On account":o.pt==="split"?"Cash + Card":"Card"}</div>
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
  {id:"beliz",group:"Personal",name:"Beliz",total:10000,note:"",payments:[],installments:[]},
  {id:"ryze",group:"Personal",name:"Ryze",total:2000,note:"3K deren'den",payments:[],installments:[]},
  {id:"ahmet-bakkal",group:"Personal",name:"Ahmet Abi Bakkal",total:1500,payments:[],installments:[]},
  {id:"vodafone",group:"Personal",name:"Vodafone",total:23856,note:"30 Ekim",payments:[],installments:[]},
  {id:"hepsiburada-limiti",group:"Personal",name:"Allburada Limiti",total:22000,payments:[{id:"hepsiburada-history",amount:15120,date:null,note:"Previously paid amount (date not specified)",historical:true}],installments:[]},
  {id:"hepsifinans",group:"Personal",name:"Allfinans",total:56500,note:"30 Ekim",payments:[],installments:[]},
  {id:"holdon",group:"Business",name:"Holdon Coffee",total:7000,payments:[],installments:[]},
  {id:"mozaik",group:"Business",name:"Mozaik Occupational Health",total:7000,payments:[],installments:[]},
  {id:"yemeksepeti",group:"Business",name:"Yemeksepeti",total:3879,note:"November 2",payments:[],installments:[]},
  {id:"kyk",group:"Business",name:"KYK",total:9400,installments:[1,2,3,4].map(n=>({id:"kyk-"+n,label:n+". Installment",amount:2350,due:"",paid:0})),payments:[]},
  {id:"ucuncuoglu",group:"Business",name:"Ucuncuoglu Real Estate",total:130000,installments:Array.from({length:9},(_,i)=>({id:"uc-"+(i+1),label:(i+1)+". Installment",amount:i===8?10000:15000,due:["2026-11-11","2026-12-01","2027-01-01","2027-02-01","2027-03-01","2027-04-01","2027-05-01","2027-06-01","2027-07-01"][i],paid:0})),payments:[]},
  {id:"heyz",group:"Business",name:"Heyz Installment",total:60000,installments:Array.from({length:6},(_,i)=>({id:"heyz-"+(i+1),label:(i+1)+". Installment",amount:10000,due:["2026-11-10","2026-12-10","2027-01-10","2027-02-10","2027-03-10","2027-04-10"][i],paid:0})),payments:[]},
  {id:"fiddle",group:"Personal",name:"Taha Fiddle III Installment",total:55000,note:"20.000 TL paid · 27 Ekim 2026",payments:[{id:"fiddle-paid-1",amount:20000,date:"2026-10-27",note:"Previously paid"}],installments:[]},
  {id:"fiddle-tyres",group:"Personal",name:"Fiddle III · Lastikler",total:4000,note:"Estimated",payments:[],installments:[]},
  {id:"fiddle-stop",group:"Personal",name:"Fiddle III · Front indicator light",total:200,note:"Estimated",payments:[],installments:[]},
  {id:"fiddle-inspection",group:"Personal",name:"Fiddle III · Muayene",total:1500,note:"Estimated",payments:[],installments:[]},
  {id:"fiddle-insurance",group:"Personal",name:"Fiddle III · Sigorta",total:3500,note:"Estimated",payments:[],installments:[]},
  {id:"yildiz",group:"Personal",name:"Yildiz Driving School",total:13000,payments:[],installments:[]},
  {id:"a2",group:"Personal",name:"A2 Exam Fee",total:2000,payments:[],installments:[]},
  {id:"beliz-plan",group:"Personal",name:"Beliz Installment",total:72000,note:"Installment 1 completed; TRY 3,000 paid toward installment 2, TRY 5,000 remaining.",payments:[{id:"beliz-paid-1",amount:3000,date:"2026-10-27",note:"2. installment previously paid for installment ",installmentId:"beliz-2"}],installments:[
    {id:"beliz-2",label:"2. Installment",amount:8000,due:"2026-11-05",paid:3000},
    ...Array.from({length:8},(_,i)=>({id:"beliz-"+(i+3),label:(i+3)+". Installment",amount:8000,due:["2026-12-05","2027-01-05","2027-02-05","2027-03-05","2027-04-05","2027-05-05","2027-06-05","2027-07-05"][i],paid:0}))
  ]},
  {id:"ruhsat",group:"Personal",name:"Annem Ruhsat Installmenti",total:119000,note:"14 installments × TRY 8,500; first 3 installments completed.",payments:[],installments:Array.from({length:14},(_,i)=>({id:"ruhsat-"+(i+1),label:(i+1)+". Installment",amount:8500,due:"",paid:i<3?8500:0}))}
];
function PersonalFinanceScreen({debts,setDebts,setV,msg}){
  const [unlocked,setUnlocked]=useState(false);
  const [pin,setPin]=useState("");
  const [pinError,setPinError]=useState("");
  const [checking,setChecking]=useState(false);
  const [paymentFor,setPaymentFor]=useState(null);
  const [amount,setAmount]=useState("");
  const [note,setNotee]=useState("");
  const [showHistory,setShowHistory]=useState(false);
  const [expanded,setExpanded]=useState({});
  const [showLurk,setShowLurk]=useState(false);
  const [showCompletedLurk,setShowCompletedLurk]=useState(false);
  const [showCompletedInstallments,setShowCompletedInstallments]=useState(false);
  const [showCompletedFiddle,setShowCompletedFiddle]=useState(false);
  const [showInstallments,setShowInstallments]=useState(false);
  const [showFiddle,setShowFiddle]=useState(false);
  const [showFreedom,setShowFreedom]=useState(false);
  const [filter,setFilter]=useState("All");
  const [showCompletedPersonalDebts,setShowCompletedPersonalDebts]=useState(false);
  const [draggingDebtId,setDraggingDebtId]=useState(null);
  const [editingInstallment,setEditingInstallment]=useState(null);
  const [installmentTotal,setInstallmentTotal]=useState("");
  const [installmentAmount,setInstallmentAmount]=useState("");
  const [installmentCount,setInstallmentCount]=useState("");
  const [installmentStartDate,setInstallmentStartDate]=useState("");
  useEffect(()=>{const lock=()=>{setUnlocked(false);setPin("");};window.addEventListener("lurk-personal-leave",lock);return()=>window.removeEventListener("lurk-personal-leave",lock);},[]);
  useEffect(()=>{
    if(!unlocked)return;
    const movedIds=new Set(["ucuncuoglu","beliz-plan"]);
    const lurkIds=new Set(["holdon","yemeksepeti","mozaik","ruhsat","heyz"]);
    const fiddleIds=new Set(["fiddle","fiddle-tyres","fiddle-stop","fiddle-insurance","fiddle-inspection","yildiz","a2"]);
    const placeholderIds=new Set(["lurk-installment-annem","lurk-installment-ucuncuoglu","lurk-installment-beliz"]);
    setDebts(prev=>prev
      .filter(d=>!placeholderIds.has(d.id))
      .map(d=>d.id==="ahmet-bakkal"&&Number(d.total)===1000?{...d,total:1500}:d.id==="beliz"&&Number(d.total)===8000?{...d,total:10000}:d.id==="yemeksepeti"&&Number(d.total)===3879&&(d.payments||[]).length===0?{...d,total:12000,payments:[{id:"yemeksepeti-paid-history",amount:8121,date:null,note:"Previously paid amount (date not specified)",historical:true}]}:d)
      .map(d=>movedIds.has(d.id)?{
        ...d,
        name:d.id==="ruhsat"?"Annem Ruhsat Installmenti":d.id==="ucuncuoglu"?"Ucuncuoglu Real Estate":d.id==="beliz-plan"?"Beliz Installment":"Heyz Installment",
        category:"installment",
        group:"Installments"
      } :lurkIds.has(d.id)?{...d,category:"lurk",folder:"LURK"}:fiddleIds.has(d.id)?{
        ...d,
        name:d.id==="fiddle"?"Fiddle III Installment":d.id==="fiddle-tyres"?"Tires":d.id==="fiddle-stop"?"Front Indicator Light":d.id==="fiddle-insurance"?"Insurance":d.id==="fiddle-inspection"?"Vehicle Inspection":d.id==="yildiz"?"Driving School":"Driving License · A2 Exam Fee",
        category:"fiddle",
        folder:"FIDDLE III"
      }:d));
  },[unlocked]);
  const money=n=>(Number(n)||0).toLocaleString("en-US",{maximumFractionDigits:2})+" ₺";
  const paid=d=>(d.installments||[]).reduce((s,i)=>s+(Number(i.paid)||0),0)+(d.payments||[]).filter(p=>!p.installmentId).reduce((s,p)=>s+(Number(p.amount)||0),0);
  const remaining=d=>Math.max(0,(Number(d.total)||0)-paid(d));
  const pct=d=>Number(d.total)>0?Math.min(100,paid(d)/Number(d.total)*100):100;
  const allHistory=debts.flatMap(d=>(d.payments||[]).map(p=>({...p,debtName:d.name,debtId:d.id}))).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  const total=debts.reduce((s,d)=>s+remaining(d),0);
  async function unlock(e){e.preventDefault();if(checking||pin.length<6)return;setChecking(true);setPinError("");try{const r=await fetch(SB_URL+"/rest/v1/rpc/lurk_pos_login",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_pin:pin})});if(!r.ok)throw new Error("PIN service returned an error (HTTP "+r.status+").");const token=await r.json();if(typeof token!=="string"||token.length<32)throw new Error("Incorrect PIN. Use the same PIN as your POS login.");setUnlocked(true);setPin("");}catch(err){setPinError(err.message||"Unable to verify.");}finally{setChecking(false);}}
  function addPayment(){const value=Math.round(Number(String(amount).replace(",","."))*100)/100;if(!paymentFor||!Number.isFinite(value)||value<=0||value>remaining(paymentFor)+0.001){msg("Enter a valid amount. Payment cannot exceed the remaining balance.");return;}const date=new Date().toISOString();setDebts(prev=>prev.map(d=>d.id!==paymentFor.id?d:{...d,payments:[...(d.payments||[]),{id:"pay-"+Date.now()+"-"+Math.random().toString(36).slice(2,7),amount:value,date,note:note.trim()}]}));msg(money(value)+" payment recorded.");setPaymentFor(null);setAmount("");setNotee("");}
  function payInstallment(debt,inst){const due=Math.max(0,Number(inst.amount||0)-Number(inst.paid||0));if(!due)return;setPaymentFor({debt,installment:inst,quick:true});setAmount(String(due));}
  function addInstallmentPayment(){const value=Math.round(Number(String(amount).replace(",","."))*100)/100;const debt=paymentFor?.debt,inst=paymentFor?.installment;if(!debt||!inst||value<=0||value>Number(inst.amount)-Number(inst.paid||0)+0.001){msg("Enter a valid installment amount.");return;}const date=new Date().toISOString();setDebts(prev=>prev.map(d=>d.id!==debt.id?d:{...d,installments:d.installments.map(i=>i.id!==inst.id?i:{...i,paid:(Number(i.paid)||0)+value}),payments:[...(d.payments||[]),{id:"pay-"+Date.now(),amount:value,date,note:note.trim(),installmentId:inst.id,installmentLabel:inst.label}]}));msg(money(value)+" installment payment recorded.");setPaymentFor(null);setAmount("");setNotee("");}
  function reversePayment(debt,payment){if(!window.confirm(money(payment.amount)+" payment record be reversed?"))return;setDebts(prev=>prev.map(d=>d.id!==debt.id?d:{...d,payments:(d.payments||[]).filter(p=>p.id!==payment.id),installments:(d.installments||[]).map(i=>i.id===payment.installmentId?{...i,paid:Math.max(0,(Number(i.paid)||0)-Number(payment.amount||0))}:i)}));}
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
      msg("Check the total amount, installment amount, number of installments, and first payment date.");return;
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
      return {id:old?.id||"inst-"+Date.now()+"-"+index,label:(index+1)+". installment",amount,paid:Math.min(Number(old?.paid)||0,amount),due};
    });
    setDebts(prev=>prev.map(d=>d.id!==debt.id?d:{...d,total:totalValue,installments:schedule}));
    setEditingInstallment(null);
    msg("Installment Plan kaydedildi.");
  }
  if(!unlocked)return <div className="lurk-screen personal-finance ds-personal-finance" style={{minHeight:"70vh",padding:"20px 14px",display:"grid",placeItems:"center"}}><form onSubmit={unlock} style={{width:"100%",maxWidth:360,background:T.bg2,border:"1px solid "+T.border,borderRadius:20,padding:24,textAlign:"center"}}><div style={{fontSize:34,color:T.accent,marginBottom:10}}>₺</div><div style={{fontSize:21,fontWeight:850,marginBottom:7}}>Personal</div><div style={{fontSize:12,color:T.textSub,marginBottom:18}}>Enter your POS PIN to access Personal.</div><input type="password" inputMode="numeric" autoComplete="current-password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="••••••" maxLength={32} autoFocus style={{width:"100%",padding:15,borderRadius:11,border:"1px solid "+T.border,background:T.bg,color:T.text,fontSize:22,letterSpacing:8,textAlign:"center",boxSizing:"border-box"}}/>{pinError&&<div role="alert" style={{color:T.danger,fontSize:12,marginTop:10}}>{pinError}</div>}<button disabled={checking||pin.length<6} style={{width:"100%",padding:14,marginTop:16,border:0,borderRadius:11,background:T.accent,color:"#061008",fontWeight:850,opacity:checking||pin.length<6?.5:1}}>{checking?"Checking…":"Unlock"}</button></form></div>;
  const paidTotal=debts.reduce((sum,d)=>sum+paid(d),0);
  const originalTotal=debts.reduce((sum,d)=>sum+Number(d.total||0),0);
  const groupTotals=["Personal","Business"].map(group=>({group,value:debts.filter(d=>d.group===group).reduce((sum,d)=>sum+remaining(d),0)}));
  const groupTotal=groupTotals.reduce((sum,g)=>sum+g.value,0)||1;

  const upcoming=debts.flatMap(d=>(d.installments||[]).filter(i=>Number(i.paid||0)<Number(i.amount||0)&&i.due).map(i=>({debt:d,inst:i,amount:Number(i.amount||0)-Number(i.paid||0)}))).sort((a,b)=>String(a.inst.due).localeCompare(String(b.inst.due))).slice(0,5);
  const lurkOrder=["holdon","yemeksepeti","mozaik"];
  const lurkDebts=debts.filter(d=>d.category==="lurk").sort((a,b)=>lurkOrder.indexOf(a.id)-lurkOrder.indexOf(b.id));
  const installmentDebts=debts.filter(d=>d.category==="installment").sort((a,b)=>["beliz-plan","ruhsat","ucuncuoglu","heyz"].indexOf(a.id)-["beliz-plan","ruhsat","ucuncuoglu","heyz"].indexOf(b.id));
  const fiddleOrder=["fiddle","fiddle-tyres","fiddle-stop","fiddle-insurance","fiddle-inspection","yildiz","a2"];
  const fiddleDebts=debts.filter(d=>d.category==="fiddle").sort((a,b)=>fiddleOrder.indexOf(a.id)-fiddleOrder.indexOf(b.id));
  const folderStats=list=>{
    const total=list.reduce((sum,d)=>sum+(Number(d.total)||0),0);
    const paidAmount=list.reduce((sum,d)=>sum+paid(d),0);
    const left=list.reduce((sum,d)=>sum+remaining(d),0);
    return {total,paid:paidAmount,left,pct:total>0?Math.min(100,paidAmount/total*100):0};
  };
  const lurkStats=folderStats(lurkDebts);
  const activeLurkDebts=lurkDebts.filter(d=>remaining(d)>0);
  const completedLurkDebts=lurkDebts.filter(d=>remaining(d)<=0);
  const activeInstallmentDebts=installmentDebts.filter(d=>remaining(d)>0);
  const completedInstallmentDebts=installmentDebts.filter(d=>remaining(d)<=0);
  const activeFiddleDebts=fiddleDebts.filter(d=>remaining(d)>0);
  const completedFiddleDebts=fiddleDebts.filter(d=>remaining(d)<=0);
  const installmentStats=folderStats(installmentDebts);
  const fiddleStats=folderStats(fiddleDebts);
  const freedomIds=["kyk","hepsifinans","vodafone","hepsiburada-limiti"];
  const freedomDebts=debts.filter(d=>freedomIds.includes(d.id));  const activeFreedomDebts=freedomDebts.filter(d=>remaining(d)>0);
  const completedFreedomDebts=freedomDebts.filter(d=>remaining(d)<=0);
  const freedomStats=folderStats(freedomDebts);
  function reorderVisibleDebts(sourceId,targetId){
    if(!sourceId||!targetId||sourceId===targetId)return;
    const ordered=visibleDebts.slice();
    const from=ordered.findIndex(d=>d.id===sourceId),to=ordered.findIndex(d=>d.id===targetId);
    if(from<0||to<0)return;
    const [moved]=ordered.splice(from,1);ordered.splice(to,0,moved);
    const positions=new Map(ordered.map((d,i)=>[d.id,i]));
    setDebts(prev=>prev.map(d=>positions.has(d.id)?{...d,sortOrder:positions.get(d.id)}:d));
  }
  const personalDebtPool=debts.filter(d=>d.category!=="lurk"&&d.category!=="installment"&&d.category!=="fiddle"&&!freedomIds.includes(d.id)&&(filter==="All"||d.group===filter));
  const completedPersonalDebts=personalDebtPool.filter(d=>remaining(d)<=0);
  const visibleDebts=personalDebtPool.filter(d=>remaining(d)>0).sort((a,b)=>{
    const ao=a.sortOrder!==undefined?Number(a.sortOrder):null;
    const bo=b.sortOrder!==undefined?Number(b.sortOrder):null;
    if(ao!==null&&bo!==null)return ao-bo;
    if(ao!==null)return -1;if(bo!==null)return 1;
    return remaining(a)-remaining(b);
  });
  return <div className="lurk-screen personal-finance" style={{paddingBottom:16}}>
    <div style={{padding:"16px 18px 12px",borderBottom:"1px solid "+T.border,display:"flex",alignItems:"center",gap:12}}>
      <button onClick={()=>{setUnlocked(false);setV("home");}} style={{background:"none",border:0,color:T.textSub,fontSize:22}}>←</button>
      <div style={{flex:1}}><div style={{fontSize:20,fontWeight:850}}>Personal</div><div style={{fontSize:11,color:T.textSub,marginTop:3}}>Personal payment tracker</div></div>
      <button onClick={()=>{setUnlocked(false);setV("home");}} style={{padding:"8px 12px",background:T.bg3,color:T.text,border:"1px solid "+T.border,borderRadius:10,fontSize:11}}>Lock</button>
    </div>
    <div style={{padding:16,width:"100%",maxWidth:"none",margin:0,boxSizing:"border-box"}}>
      <div className="pf-summary-card" style={{background:"linear-gradient(145deg,#102019,#0c1712)",border:"1px solid #294638",borderRadius:14,padding:14,marginBottom:16}}>
        <button onClick={()=>setShowLurk(v=>!v)} aria-expanded={showLurk} style={{width:"100%",display:"grid",gridTemplateColumns:"minmax(260px,1.7fr) repeat(3,minmax(110px,1fr)) minmax(150px,auto) 18px",alignItems:"center",columnGap:18,textAlign:"left",background:"transparent",border:0,padding:0,color:T.text,cursor:"pointer",flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,flex:"1 1 230px",minWidth:190}}>
            <div style={{width:44,height:44,borderRadius:13,background:"linear-gradient(145deg,#245b37,#173d27)",display:"grid",placeItems:"center",color:"#70f28a",fontSize:20,flexShrink:0}}>◈</div>
            <div style={{minWidth:0,fontFamily:"Inter,Helvetica Neue,Arial,sans-serif",textRendering:"optimizeLegibility"}}><div style={{fontSize:17,fontWeight:850,letterSpacing:"-.4px"}}>LURK</div><div style={{fontSize:11,color:"#a9b8ad",marginTop:3}}>Business expenses · {lurkDebts.length} records</div></div>
          </div>
          <div style={{display:"contents"}}>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>TOTAL DEBT</div><div style={{fontSize:15,fontWeight:900,marginTop:4}}>{money(lurkStats.total)}</div></div>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>PAID</div><div style={{fontSize:15,fontWeight:900,color:"#54d783",marginTop:4}}>{money(lurkStats.paid)}</div></div>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>REMAINING</div><div style={{fontSize:15,fontWeight:900,marginTop:4}}>{money(lurkStats.left)}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"conic-gradient(#54d783 0deg "+(lurkStats.pct/100*360)+"deg,rgba(255,255,255,.12) "+(lurkStats.pct/100*360)+"deg 360deg)",display:"grid",placeItems:"center",flexShrink:0}}><div style={{width:38,height:38,borderRadius:"50%",background:"#102019",display:"grid",placeItems:"center",fontSize:10,fontWeight:900}}>{lurkStats.pct.toFixed(0)}%</div></div>
              <div style={{fontSize:9,color:"#a9b8ad",fontWeight:800,whiteSpace:"nowrap"}}>PAYMENT RATE</div>
            </div>
          </div>          <div style={{fontSize:15,color:T.textSub,fontWeight:800,marginLeft:"auto"}}>{showLurk?"⌃":"⌄"}</div>
        </button>
        {showLurk&&<div className="lurk-folder-debt-list" style={{display:"grid",gridTemplateColumns:"1fr",gap:8,marginTop:12}}>
          {activeLurkDebts.map(d=><div key={d.id} className="lurk-folder-debt-row" style={{background:"linear-gradient(145deg,#171f1a,#121a15)",border:"1px solid rgba(255,255,255,.10)",borderRadius:13,padding:"12px 14px",minWidth:0}}>
            <div style={{fontSize:11,fontWeight:800,minHeight:28,lineHeight:1.35}}>{d.name}</div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>TOPLAM</div>
            <div style={{fontSize:14,fontWeight:900,marginTop:2}}>{money(d.total)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,marginTop:5}}><span style={{fontSize:9,color:T.textDim}}>REMAINING</span><b style={{fontSize:12,color:T.accent}}>{money(remaining(d))}</b></div>
            <div style={{height:5,background:"#293a30",borderRadius:8,overflow:"hidden",marginTop:8}}><div style={{height:"100%",width:pct(d)+"%",background:"linear-gradient(90deg,#35c95b,#70f28a)",borderRadius:8}}/></div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>{pct(d).toFixed(0)}% paid · {money(paid(d))} / {money(d.total)}</div>
            <div style={{display:"flex",gap:6,marginTop:9}}>
              {remaining(d)>0&&<button onClick={()=>{setPaymentFor(d);setAmount("");setNotee("");}} style={{flex:1,padding:8,borderRadius:8,border:0,background:"linear-gradient(100deg,#54e875,#2dc957)",color:"#06200d",fontSize:10,fontWeight:900}}>+ Payment</button>}
              <button onClick={()=>setShowHistory(v=>!v)} style={{padding:"8px 9px",borderRadius:8,border:"1px solid "+T.border,background:"#17271f",color:"#b5c7b9",fontSize:9}}>Hareketler</button>
            </div>
            {showHistory&&<div style={{marginTop:7,borderTop:"1px solid "+T.border,paddingTop:6}}>{(d.payments||[]).map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",gap:6,padding:"4px 0",fontSize:9}}><span>{p.note||"Payment"} · {new Date(p.date).toLocaleDateString("en-US")}</span><b>{money(p.amount)}</b></div>)}</div>}
          </div>)}
          {completedLurkDebts.length>0&&<div style={{gridColumn:"1 / -1"}}><button onClick={()=>setShowCompletedLurk(v=>!v)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 11px",borderRadius:9,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.025)",color:"#9aaa9f",fontSize:10,fontWeight:800,textAlign:"left"}}><span>TAMAMLANANLAR · {completedLurkDebts.length}</span><span>{showCompletedLurk?"Hide ⌃":"Show ⌄"}</span></button>{showCompletedLurk&&<div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:6,marginTop:6}}>{completedLurkDebts.map(d=><div key={d.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"8px 10px",borderRadius:9,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",opacity:.72,minWidth:0}}><div style={{minWidth:0}}><div style={{fontSize:10,fontWeight:750,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.name}</div><div style={{fontSize:9,color:"#70c98b",marginTop:2}}>Completed</div></div><b style={{fontSize:10,color:"#70c98b",whiteSpace:"nowrap"}}>✓ {money(d.total)}</b></div>)}</div>}</div>}
        </div>}
      </div>
      <div className="pf-summary-card" style={{background:"linear-gradient(145deg,#102019,#0c1712)",border:"1px solid #294638",borderRadius:14,padding:14,marginBottom:16}}>
        <button onClick={()=>setShowInstallments(v=>!v)} aria-expanded={showInstallments} style={{width:"100%",display:"grid",gridTemplateColumns:"minmax(260px,1.7fr) repeat(3,minmax(110px,1fr)) minmax(150px,auto) 18px",alignItems:"center",columnGap:18,textAlign:"left",background:"transparent",border:0,padding:0,color:T.text,cursor:"pointer",flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,flex:"1 1 230px",minWidth:190}}>
            <div style={{width:44,height:44,borderRadius:13,background:"linear-gradient(145deg,#245b37,#173d27)",display:"grid",placeItems:"center",color:"#70f28a",fontSize:20,flexShrink:0}}>▣</div>
            <div style={{minWidth:0,fontFamily:"Inter,Helvetica Neue,Arial,sans-serif",textRendering:"optimizeLegibility"}}><div style={{fontSize:17,fontWeight:850,letterSpacing:"-.4px"}}>Installments</div><div style={{fontSize:11,color:"#a9b8ad",marginTop:3}}>Separate installment records · {installmentDebts.length} records</div></div>
          </div>
          <div style={{display:"contents"}}>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>TOTAL DEBT</div><div style={{fontSize:15,fontWeight:900,marginTop:4}}>{money(installmentStats.total)}</div></div>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>PAID</div><div style={{fontSize:15,fontWeight:900,color:"#54d783",marginTop:4}}>{money(installmentStats.paid)}</div></div>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>REMAINING</div><div style={{fontSize:15,fontWeight:900,marginTop:4}}>{money(installmentStats.left)}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"conic-gradient(#54d783 0deg "+(installmentStats.pct/100*360)+"deg,rgba(255,255,255,.12) "+(installmentStats.pct/100*360)+"deg 360deg)",display:"grid",placeItems:"center",flexShrink:0}}><div style={{width:38,height:38,borderRadius:"50%",background:"#102019",display:"grid",placeItems:"center",fontSize:10,fontWeight:900}}>{installmentStats.pct.toFixed(0)}%</div></div>
              <div style={{fontSize:9,color:"#a9b8ad",fontWeight:800,whiteSpace:"nowrap"}}>PAYMENT RATE</div>
            </div>
          </div>
          <div style={{fontSize:15,color:T.textSub,fontWeight:800,marginLeft:"auto"}}>{showInstallments?"⌃":"⌄"}</div>
        </button>
        {showInstallments&&<div className="lurk-folder-debt-list" style={{display:"grid",gridTemplateColumns:"1fr",gap:8,marginTop:12}}> 
          {activeInstallmentDebts.map(d=><div key={d.id} className="lurk-folder-debt-row" style={{background:"linear-gradient(145deg,#171f1a,#121a15)",border:"1px solid rgba(255,255,255,.10)",borderRadius:13,padding:"12px 14px",minWidth:0}}>
            <div style={{fontSize:11,fontWeight:800,minHeight:30,lineHeight:1.35}}>{d.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
              <div style={{width:76,height:76,borderRadius:"50%",background:"conic-gradient(#54e875 0deg "+(pct(d)/100*360)+"deg,#304638 "+(pct(d)/100*360)+"deg 360deg)",display:"grid",placeItems:"center",flexShrink:0}}>
                <div style={{width:60,height:60,borderRadius:"50%",background:"#14231c",display:"grid",placeItems:"center",textAlign:"center"}}>
                  <div><div style={{fontSize:8,color:"#a9b8ad",fontWeight:700}}>PAID</div><div style={{fontSize:10,fontWeight:900,color:"#70f28a",lineHeight:1.25}}>{money(paid(d))}</div></div>
                </div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:9,color:T.textDim}}>TOTAL DEBT</div>
                <div style={{fontSize:13,fontWeight:900,marginTop:2}}>{money(d.total)}</div>
                <div style={{fontSize:9,color:T.textDim,marginTop:5}}>REMAINING</div>
                <div style={{fontSize:12,fontWeight:850,color:"#70f28a"}}>{money(remaining(d))}</div>
                <div style={{fontSize:9,color:T.textDim,marginTop:5}}>{(d.installments||[]).filter(i=>Number(i.paid||0)>=Number(i.amount||0)).length}/{(d.installments||[]).length} installments paid</div>
              </div>
            </div>
            <div style={{display:"flex",gap:7,marginTop:9}}>
              {(d.installments||[]).some(inst=>Number(inst.paid||0)<Number(inst.amount||0))&&<button onClick={()=>{const next=(d.installments||[]).find(inst=>Number(inst.paid||0)<Number(inst.amount||0));if(next)payInstallment(d,next);}} style={{flex:1,minWidth:0,padding:9,borderRadius:8,border:0,background:"linear-gradient(100deg,#54e875,#2dc957)",color:"#06200d",fontSize:10,fontWeight:900}}>＋ Pay Next Installment</button>}
              <button onClick={()=>openInstallmentEditor(d)} style={{flex:1,minWidth:0,padding:9,borderRadius:8,border:"1px solid "+T.border,background:"#17271f",color:"#e7f1e9",fontSize:10,fontWeight:800}}>Edit Plan</button>
            </div>
            {(d.installments||[]).length>0&&<button onClick={()=>setExpanded(p=>({...p,[d.id]:!p[d.id]}))} style={{width:"100%",padding:7,marginTop:5,border:0,background:"transparent",color:T.textSub,fontSize:10}}>{expanded[d.id]?"Hide Installments":"View Other Installments"}</button>}
            {expanded[d.id]&&(d.installments||[]).map(inst=><div key={inst.id} style={{padding:"7px 0",borderTop:"1px solid "+T.border}}>
              <div style={{fontSize:10,fontWeight:750}}>{inst.label}</div><div style={{fontSize:9,color:T.textDim,marginTop:2}}>{inst.due} · {money(Math.max(0,Number(inst.amount||0)-Number(inst.paid||0)))} remaining</div>
              {Number(inst.paid||0)<Number(inst.amount||0)&&<button onClick={()=>payInstallment(d,inst)} style={{padding:"5px 8px",marginTop:5,border:0,borderRadius:6,background:T.accent,color:"#061008",fontSize:9,fontWeight:850}}>Record Payment</button>}
            </div>)}
          </div>)}
          {completedInstallmentDebts.length>0&&<div style={{gridColumn:"1 / -1"}}><button onClick={()=>setShowCompletedInstallments(v=>!v)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 11px",borderRadius:9,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.025)",color:"#9aaa9f",fontSize:10,fontWeight:800,textAlign:"left"}}><span>TAMAMLANANLAR · {completedInstallmentDebts.length}</span><span>{showCompletedInstallments?"Hide ⌃":"Show ⌄"}</span></button>{showCompletedInstallments&&<div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:6,marginTop:6}}>{completedInstallmentDebts.map(d=><div key={d.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"8px 10px",borderRadius:9,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",opacity:.72,minWidth:0}}><div style={{minWidth:0}}><div style={{fontSize:10,fontWeight:750,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.name}</div><div style={{fontSize:9,color:"#70c98b",marginTop:2}}>Completed</div></div><b style={{fontSize:10,color:"#70c98b",whiteSpace:"nowrap"}}>✓ {money(d.total)}</b></div>)}</div>}</div>}
        </div>}
      </div>
      <div className="pf-summary-card" style={{background:"linear-gradient(145deg,#102019,#0c1712)",border:"1px solid #294638",borderRadius:14,padding:14,marginBottom:16}}>
        <button onClick={()=>setShowFiddle(v=>!v)} aria-expanded={showFiddle} style={{width:"100%",display:"grid",gridTemplateColumns:"minmax(260px,1.7fr) repeat(3,minmax(110px,1fr)) minmax(150px,auto) 18px",alignItems:"center",columnGap:18,textAlign:"left",background:"transparent",border:0,padding:0,color:T.text,cursor:"pointer",flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,flex:"1 1 230px",minWidth:190}}>
            <div style={{width:44,height:44,borderRadius:13,background:"linear-gradient(145deg,#245b37,#173d27)",display:"grid",placeItems:"center",color:"#70f28a",fontSize:20,flexShrink:0}}>🏍️</div>
            <div style={{minWidth:0,fontFamily:"Inter,Helvetica Neue,Arial,sans-serif",textRendering:"optimizeLegibility"}}><div style={{fontSize:17,fontWeight:850,letterSpacing:"-.4px"}}>FIDDLE III</div><div style={{fontSize:11,color:"#a9b8ad",marginTop:3}}>Scooter, maintenance and license expenses · {fiddleDebts.length} records</div></div>
          </div>
          <div style={{display:"contents"}}>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>TOTAL DEBT</div><div style={{fontSize:15,fontWeight:900,marginTop:4}}>{money(fiddleStats.total)}</div></div>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>PAID</div><div style={{fontSize:15,fontWeight:900,color:"#54d783",marginTop:4}}>{money(fiddleStats.paid)}</div></div>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>REMAINING</div><div style={{fontSize:15,fontWeight:900,marginTop:4}}>{money(fiddleStats.left)}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"conic-gradient(#54d783 0deg "+(fiddleStats.pct/100*360)+"deg,rgba(255,255,255,.12) "+(fiddleStats.pct/100*360)+"deg 360deg)",display:"grid",placeItems:"center",flexShrink:0}}><div style={{width:38,height:38,borderRadius:"50%",background:"#102019",display:"grid",placeItems:"center",fontSize:10,fontWeight:900}}>{fiddleStats.pct.toFixed(0)}%</div></div>
              <div style={{fontSize:9,color:"#a9b8ad",fontWeight:800,whiteSpace:"nowrap"}}>PAYMENT RATE</div>
            </div>
          </div>
          <div style={{fontSize:15,color:T.textSub,fontWeight:800,marginLeft:"auto"}}>{showFiddle?"⌃":"⌄"}</div>
        </button>
        {showFiddle&&<div className="lurk-folder-debt-list" style={{display:"grid",gridTemplateColumns:"1fr",gap:8,marginTop:12}}>
          {activeFiddleDebts.map(d=><div key={d.id} className="lurk-folder-debt-row" style={{background:"linear-gradient(145deg,#171f1a,#121a15)",border:"1px solid rgba(255,255,255,.10)",borderRadius:13,padding:"12px 14px",minWidth:0}}>
            <div style={{fontSize:11,fontWeight:800,minHeight:28,lineHeight:1.35}}>{d.name}</div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>TOPLAM</div>
            <div style={{fontSize:14,fontWeight:900,marginTop:2}}>{money(d.total)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,marginTop:5}}><span style={{fontSize:9,color:T.textDim}}>REMAINING</span><b style={{fontSize:12,color:T.accent}}>{money(remaining(d))}</b></div>
            <div style={{height:5,background:"#293a30",borderRadius:8,overflow:"hidden",marginTop:8}}><div style={{height:"100%",width:pct(d)+"%",background:"linear-gradient(90deg,#35c95b,#70f28a)",borderRadius:8}}/></div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>{pct(d).toFixed(0)}% paid · {money(paid(d))} / {money(d.total)}</div>
            <div style={{display:"flex",gap:6,marginTop:9}}>
              {remaining(d)>0&&<button onClick={()=>{setPaymentFor(d);setAmount("");setNotee("");}} style={{flex:1,padding:8,borderRadius:8,border:0,background:"linear-gradient(100deg,#54e875,#2dc957)",color:"#06200d",fontSize:10,fontWeight:900}}>+ Payment</button>}
              <button onClick={()=>setShowHistory(v=>!v)} style={{padding:"8px 9px",borderRadius:8,border:"1px solid "+T.border,background:"#17271f",color:"#b5c7b9",fontSize:9}}>Hareketler</button>
            </div>
            {showHistory&&<div style={{marginTop:7,borderTop:"1px solid "+T.border,paddingTop:6}}>{(d.payments||[]).map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",gap:6,padding:"4px 0",fontSize:9}}><span>{p.note||"Payment"} · {new Date(p.date).toLocaleDateString("en-US")}</span><b>{money(p.amount)}</b></div>)}</div>}
          </div>)}
          {completedFiddleDebts.length>0&&<div style={{gridColumn:"1 / -1"}}><button onClick={()=>setShowCompletedFiddle(v=>!v)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 11px",borderRadius:9,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.025)",color:"#9aaa9f",fontSize:10,fontWeight:800,textAlign:"left"}}><span>TAMAMLANANLAR · {completedFiddleDebts.length}</span><span>{showCompletedFiddle?"Hide ⌃":"Show ⌄"}</span></button>{showCompletedFiddle&&<div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:6,marginTop:6}}>{completedFiddleDebts.map(d=><div key={d.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"8px 10px",borderRadius:9,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",opacity:.72,minWidth:0}}><div style={{minWidth:0}}><div style={{fontSize:10,fontWeight:750,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.name}</div><div style={{fontSize:9,color:"#70c98b",marginTop:2}}>Completed</div></div><b style={{fontSize:10,color:"#70c98b",whiteSpace:"nowrap"}}>✓ {money(d.total)}</b></div>)}</div>}</div>}
        </div>}
      </div>
            <div className="pf-summary-card" style={{background:"linear-gradient(145deg,#102019,#0c1712)",border:"1px solid #294638",borderRadius:14,padding:14,marginBottom:16}}>
        <button onClick={()=>setShowFreedom(v=>!v)} aria-expanded={showFreedom} style={{width:"100%",display:"grid",gridTemplateColumns:"minmax(260px,1.7fr) repeat(3,minmax(110px,1fr)) minmax(150px,auto) 18px",alignItems:"center",columnGap:18,textAlign:"left",background:"transparent",border:0,padding:0,color:T.text,cursor:"pointer",flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,flex:"1 1 230px",minWidth:190}}>
            <div style={{width:44,height:44,borderRadius:13,background:"linear-gradient(145deg,#245b37,#173d27)",display:"grid",placeItems:"center",color:"#70f28a",fontSize:20,flexShrink:0}}>✦</div>
            <div style={{minWidth:0,fontFamily:"Inter,Helvetica Neue,Arial,sans-serif",textRendering:"optimizeLegibility"}}><div style={{fontSize:17,fontWeight:850,letterSpacing:"-.4px"}}>FREEDOM PLAN</div><div style={{fontSize:11,color:"#a9b8ad",marginTop:3}}>4 records</div></div>
          </div>
          <div style={{display:"contents"}}>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>TOTAL DEBT</div><div style={{fontSize:15,fontWeight:900,marginTop:4}}>{money(freedomStats.total)}</div></div>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>PAID</div><div style={{fontSize:15,fontWeight:900,color:"#54d783",marginTop:4}}>{money(freedomStats.paid)}</div></div>
            <div><div style={{fontSize:9,color:"#9aaa9f",fontWeight:800,letterSpacing:".6px"}}>REMAINING</div><div style={{fontSize:15,fontWeight:900,marginTop:4}}>{money(freedomStats.left)}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"conic-gradient(#54d783 0deg "+(freedomStats.pct/100*360)+"deg,rgba(255,255,255,.12) "+(freedomStats.pct/100*360)+"deg 360deg)",display:"grid",placeItems:"center",flexShrink:0}}><div style={{width:38,height:38,borderRadius:"50%",background:"#102019",display:"grid",placeItems:"center",fontSize:10,fontWeight:900}}>{freedomStats.pct.toFixed(0)}%</div></div>
              <div style={{fontSize:9,color:"#a9b8ad",fontWeight:800,whiteSpace:"nowrap"}}>PAYMENT RATE</div>
            </div>
          </div>
          <div style={{fontSize:15,color:T.textSub,fontWeight:800,marginLeft:"auto"}}>{showFreedom?"⌃":"⌄"}</div>
        </button>
        {showFreedom&&<div className="lurk-folder-debt-list" style={{display:"grid",gridTemplateColumns:"1fr",gap:8,marginTop:12}}>
          {activeFreedomDebts.map(d=><div key={d.id} className="lurk-folder-debt-row" style={{background:"linear-gradient(145deg,#171f1a,#121a15)",border:"1px solid rgba(255,255,255,.10)",borderRadius:13,padding:"12px 14px",minWidth:0}}>
            <div style={{fontSize:16,fontWeight:900,textTransform:"uppercase",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>{d.name}</div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>TOPLAM</div><div style={{fontSize:14,fontWeight:900,marginTop:2}}>{money(d.total)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,marginTop:5}}><span style={{fontSize:9,color:T.textDim}}>REMAINING</span><b style={{fontSize:12,color:T.accent}}>{money(remaining(d))}</b></div>
            <div style={{height:5,background:"#293a30",borderRadius:8,overflow:"hidden",marginTop:8}}><div style={{height:"100%",width:pct(d)+"%",background:"linear-gradient(90deg,#35c95b,#70f28a)",borderRadius:8}}/></div>
            <div style={{fontSize:9,color:T.textDim,marginTop:5}}>{pct(d).toFixed(0)}% paid · {money(paid(d))} / {money(d.total)}</div>
            <div style={{display:"flex",gap:6,marginTop:9}}>
              {remaining(d)>0&&<button onClick={()=>{setPaymentFor(d);setAmount("");setNotee("");}} style={{flex:1,padding:8,borderRadius:8,border:0,background:"linear-gradient(100deg,#54e875,#2dc957)",color:"#06200d",fontSize:10,fontWeight:900}}>+ Payment</button>}
              <button onClick={()=>setShowHistory(v=>!v)} style={{padding:"8px 9px",borderRadius:8,border:"1px solid "+T.border,background:"#17271f",color:"#b5c7b9",fontSize:9}}>Hareketler</button>
            </div>
            {showHistory&&<div style={{marginTop:7,borderTop:"1px solid "+T.border,paddingTop:6}}>{(d.payments||[]).map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",gap:6,padding:"4px 0",fontSize:9}}><span>{p.note||"Payment"} · {p.date?new Date(p.date).toLocaleDateString("en-US"):"Date not specified"}</span><b>{money(p.amount)}</b></div>)}</div>}
          </div>)}
          {completedFreedomDebts.length>0&&<div style={{fontSize:10,color:"#70c98b",fontWeight:800}}>TAMAMLANANLAR · {completedFreedomDebts.length}</div>}
        </div>}
      </div>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:10,marginBottom:12}}>
        {[{label:"TOTAL DEBT",value:money(originalTotal)},{label:"PAID",value:money(paidTotal)},{label:"REMAINING",value:money(total)},{label:"PAYMENT RATE",value:(originalTotal>0?paidTotal/originalTotal*100:0).toFixed(1).replace(".",",")+"%"}].map((x,i)=><div key={x.label} style={{background:i===0?"linear-gradient(135deg,rgba(52,199,89,.16),"+T.bg2+")":T.bg2,border:"1px solid "+T.border,borderRadius:13,padding:"13px 14px",minWidth:0}}><div style={{fontSize:10,fontWeight:800,color:T.textSub,letterSpacing:.7}}>{x.label}</div><div style={{fontSize:19,fontWeight:900,color:i===1||i===3?T.accent:T.text,marginTop:7,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{x.value}</div></div>)}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
        <div style={{fontSize:15,fontWeight:850,flex:1}}>My Debts <span style={{fontSize:11,color:T.textDim,fontWeight:500}}>({visibleDebts.length})</span><div style={{fontSize:9,color:T.textDim,fontWeight:500,marginTop:2}}>Drag cards to reorder them</div></div>
        <div style={{display:"flex",gap:5}}>{["All","Personal","Business"].map(x=><button key={x} onClick={()=>setFilter(x)} style={{padding:"7px 11px",borderRadius:18,border:"1px solid "+(filter===x?T.accent:T.border),background:filter===x?"rgba(52,199,89,.14)":T.bg2,color:filter===x?T.accent:T.textSub,fontWeight:750,fontSize:10}}>{x}</button>)}</div>
        <button onClick={()=>{const name=window.prompt("Debt / payment name:");if(!name?.trim())return;const totalValue=Number(window.prompt("Total amount (TRY):"));if(!Number.isFinite(totalValue)||totalValue<=0)return;const group=window.prompt("Group: Personal or Business","Personal")==="Business"?"Business":"Personal";setDebts(prev=>[...prev,{id:"debt-"+Date.now(),group,name:name.trim(),total:totalValue,payments:[],installments:[]}]);}} style={{padding:"8px 12px",borderRadius:9,border:0,background:T.accent,color:"#061008",fontWeight:850,fontSize:11}}>+ Add Debt</button>
      </div>
      <div className="lurk-personal-debt-list" style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
        {visibleDebts.map(d=><div key={d.id} draggable onDragStart={e=>{setDraggingDebtId(d.id);e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("text/plain",d.id);}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();reorderVisibleDebts(draggingDebtId||e.dataTransfer.getData("text/plain"),d.id);setDraggingDebtId(null);}} onDragEnd={()=>setDraggingDebtId(null)} className="lurk-personal-debt-row pf-debt-card" style={{background:"linear-gradient(145deg,#171c19,#121614)",border:"1px solid "+(draggingDebtId===d.id?"#34C759":"rgba(255,255,255,.10)"),borderRadius:13,padding:"12px 14px",minWidth:0,opacity:draggingDebtId===d.id?0.55:1,cursor:"grab",transition:"border-color .15s,opacity .15s",boxShadow:"0 5px 18px rgba(0,0,0,.12)"}}>
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:7,minWidth:0}}>
                <div style={{fontSize:18,fontWeight:900,letterSpacing:"-.35px",textTransform:"uppercase",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5}}>
                <span style={{fontSize:9,fontWeight:750,color:d.group==="Personal"?"#71d993":"#9bbec7",background:d.group==="Personal"?"rgba(52,199,89,.10)":"rgba(109,158,172,.12)",padding:"3px 7px",borderRadius:20}}>{d.group}</span>
                <span style={{fontSize:10,color:T.textDim}}>Total {money(d.total)}</span>
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0,paddingLeft:8}}>
              <div style={{fontSize:16,fontWeight:900,letterSpacing:"-.3px"}}>{money(remaining(d))}</div>
              <div style={{fontSize:9,color:T.textDim,marginTop:2}}>REMAINING DEBT</div>
            </div>
          </div>
          <div style={{marginTop:15,padding:"11px 12px",borderRadius:10,background:"rgba(255,255,255,.035)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:10,marginBottom:7}}>
              <span style={{color:T.textSub,fontWeight:750}}>PAYMENT STATUS</span>
              <span style={{color:"#70d98b",fontWeight:850}}>%{pct(d).toFixed(0)} completed</span>
            </div>
            <div style={{height:7,background:"rgba(255,255,255,.09)",borderRadius:10,overflow:"hidden"}}>
              <div style={{height:"100%",width:pct(d)+"%",background:"linear-gradient(90deg,#248A3D,#5BD77B)",borderRadius:10}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",gap:8,fontSize:10,color:T.textSub,marginTop:7}}>
              <span>Paid <b style={{color:T.text}}>{money(paid(d))}</b></span>
              <span>Total <b style={{color:T.text}}>{money(d.total)}</b></span>
            </div>
          </div>
          {(d.installments||[]).length>0&&<div style={{marginTop:9,border:"1px solid rgba(255,255,255,.08)",borderRadius:9,padding:"2px 10px"}}>
            <button onClick={()=>setExpanded(p=>({...p,[d.id]:!p[d.id]}))} style={{width:"100%",background:"transparent",border:0,color:T.textSub,textAlign:"left",fontSize:10,fontWeight:750,padding:"8px 0"}}>{expanded[d.id]?"▾":"▸"} Installment Plan <span style={{color:T.textDim}}>· {(d.installments||[]).filter(i=>Number(i.paid||0)>=Number(i.amount||0)).length}/{d.installments.length} paid</span></button>
            {expanded[d.id]&&(d.installments||[]).map(inst=><div key={inst.id} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 0",borderTop:"1px solid rgba(255,255,255,.06)"}}>
              <div style={{flex:1,minWidth:0}}><div style={{fontSize:10,fontWeight:700}}>{inst.label}</div><div style={{fontSize:9,color:T.textDim,marginTop:2}}>{inst.due||"Date yok"} · {money(inst.paid)} / {money(inst.amount)}</div></div>
              {Number(inst.paid||0)<Number(inst.amount||0)&&<button onClick={()=>payInstallment(d,inst)} style={{padding:"6px 9px",borderRadius:7,border:0,background:T.accent,color:"#061008",fontSize:9,fontWeight:850}}>Pay</button>}
            </div>)}
          </div>}
          <div style={{display:"flex",gap:8,marginTop:11}}>
            <button onClick={()=>{setPaymentFor(d);setAmount("");setNotee("");}} style={{flex:1,padding:11,borderRadius:9,border:0,background:"linear-gradient(100deg,#34C759,#2dbb50)",color:"#061008",fontSize:11,fontWeight:900}}>+ Payment Yap</button>
            <button onClick={()=>setShowHistory(v=>!v)} style={{padding:"10px 13px",borderRadius:9,border:"1px solid "+T.border,background:"rgba(255,255,255,.045)",color:T.textSub,fontSize:10,fontWeight:700}}>Hareketler</button>
          </div>
          {showHistory&&<div style={{marginTop:10,borderTop:"1px solid "+T.border,paddingTop:7}}>{(d.payments||[]).slice().reverse().map(p=><div key={p.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0"}}>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:10,fontWeight:700}}>{money(p.amount)} · {p.historical?"Date not specified":new Date(p.date).toLocaleDateString("en-US")}</div><div style={{fontSize:9,color:T.textDim}}>{p.installmentLabel||p.note||"Payment"}</div></div>
            <button onClick={()=>reversePayment(d,p)} style={{color:T.danger,background:"transparent",border:0,fontSize:9}}>Geri al</button>
          </div>)}</div>}
        </div>)}
      </div>
      {completedPersonalDebts.length>0&&<div style={{marginTop:10}}><button onClick={()=>setShowCompletedPersonalDebts(v=>!v)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.025)",color:"#9aaa9f",fontSize:11,fontWeight:800,textAlign:"left"}}><span>TAMAMLANANLAR · {completedPersonalDebts.length}</span><span>{showCompletedPersonalDebts?"Hide ⌃":"Show ⌄"}</span></button>{showCompletedPersonalDebts&&<div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:8,marginTop:7}}>{completedPersonalDebts.map(d=><div key={d.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"10px 11px",borderRadius:10,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",opacity:.75,minWidth:0}}><div style={{minWidth:0}}><div style={{fontSize:11,fontWeight:750,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.name}</div><div style={{fontSize:9,color:"#70c98b",marginTop:3}}>Completed</div></div><b style={{fontSize:10,color:"#70c98b",whiteSpace:"nowrap"}}>✓ {money(d.total)}</b></div>)}</div>}</div>}
      <button onClick={()=>setShowHistory(v=>!v)} style={{width:"100%",padding:11,marginTop:12,background:T.bg3,border:"1px solid "+T.border,borderRadius:10,color:T.text,fontWeight:750,fontSize:11}}>↻ All payment activity</button>
      {showHistory&&<div style={{marginTop:9,background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:12}}>{allHistory.length?allHistory.map(p=><div key={p.id} style={{padding:"8px 0",borderBottom:"1px solid "+T.border,display:"flex",justifyContent:"space-between",gap:8}}><div><div style={{fontSize:11,fontWeight:750}}>{p.debtName}</div><div style={{fontSize:9,color:T.textDim}}>{p.historical?"Date not specified":new Date(p.date).toLocaleString("en-US")} · {p.note||p.installmentLabel||"Payment"}</div></div><div style={{fontSize:11,color:T.accent,fontWeight:850}}>{money(p.amount)}</div></div>):<div style={{fontSize:11,color:T.textDim}}>No payment activity yet.</div>}</div>}
    </div>
{editingInstallment&&<Modal><div style={{fontSize:18,fontWeight:850,marginBottom:5}}>Installment Plan</div><div style={{fontSize:12,color:T.textSub,marginBottom:14}}>{editingInstallment.name}</div>
  <label style={{fontSize:11,color:T.textSub}}>Total debt (TRY)</label><input type="number" min="0.01" step="0.01" value={installmentTotal} onChange={e=>setInstallmentTotal(e.target.value)} placeholder="e.g. 24000" style={{width:"100%",padding:12,marginTop:5,marginBottom:10,borderRadius:9,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/>
  <label style={{fontSize:11,color:T.textSub}}>Amount per installment (TRY)</label><input type="number" min="0.01" step="0.01" value={installmentAmount} onChange={e=>setInstallmentAmount(e.target.value)} placeholder="e.g. 4000" style={{width:"100%",padding:12,marginTop:5,marginBottom:10,borderRadius:9,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/>
  <label style={{fontSize:11,color:T.textSub}}>Number of installments</label><input type="number" min="1" max="120" step="1" value={installmentCount} onChange={e=>setInstallmentCount(e.target.value)} placeholder="e.g. 6" style={{width:"100%",padding:12,marginTop:5,marginBottom:10,borderRadius:9,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/>
  <label style={{fontSize:11,color:T.textSub}}>First payment date</label><input type="date" value={installmentStartDate} onChange={e=>setInstallmentStartDate(e.target.value)} style={{width:"100%",padding:12,marginTop:5,marginBottom:14,borderRadius:9,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/>
  <div style={{fontSize:10,color:T.textDim,lineHeight:1.5,marginBottom:12}}>Installments are created monthly. The final installment is automatically adjusted to match the total. Existing paid amounts are preserved wherever possible.</div>
  <button onClick={saveInstallmentPlan} style={{width:"100%",padding:13,background:T.accent,color:"#061008",border:0,borderRadius:10,fontWeight:850}}>Save Plan</button><button onClick={()=>setEditingInstallment(null)} style={{width:"100%",padding:11,background:"transparent",border:0,color:T.textSub}}>Cancel</button>
</Modal>}
{paymentFor&&<Modal><div style={{fontSize:18,fontWeight:850,marginBottom:5}}>{paymentFor.installment?"Installment Payment":"Record Payment"}</div><div style={{fontSize:12,color:T.textSub,marginBottom:14}}>{paymentFor.name||paymentFor.debt?.name} · {paymentFor.installment?(paymentFor.installment.label+" · "):""}Remaining {money(paymentFor.debt?Math.max(0,paymentFor.installment.amount-paymentFor.installment.paid):remaining(paymentFor))}</div><label style={{fontSize:11,color:T.textSub}}>Payment amount (TRY)</label><input autoFocus type="number" min="0.01" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="e.g. 2000" style={{width:"100%",padding:14,marginTop:6,marginBottom:5,borderRadius:10,border:"1px solid "+T.border,background:T.bg,color:T.text,fontSize:20,boxSizing:"border-box"}}/>{paymentFor.installment&&<div style={{fontSize:11,color:T.accentL,marginBottom:12,lineHeight:1.5}}>You can make a partial payment by entering any amount. The remaining installment balance updates automatically.</div>}<label style={{fontSize:11,color:T.textSub}}>Note (optional)</label><input value={note} onChange={e=>setNotee(e.target.value)} placeholder="Payment note" style={{width:"100%",padding:12,marginTop:6,marginBottom:14,borderRadius:10,border:"1px solid "+T.border,background:T.bg,color:T.text,boxSizing:"border-box"}}/><button onClick={paymentFor.debt?addInstallmentPayment:addPayment} style={{width:"100%",padding:14,background:T.accent,color:"#061008",border:0,borderRadius:11,fontWeight:850}}>Save Payment</button><button onClick={()=>setPaymentFor(null)} style={{width:"100%",padding:11,background:"transparent",border:0,color:T.textSub}}>Cancel</button></Modal>}
  </div>;
}

/* ─── LURK+ ─── */
function LurkPlusScreen({members,setMembers,msg,setV}){
  useEffect(()=>{
    if(members.some(m=>m.name.trim().toLocaleLowerCase("en-US")==="beliz"))return;
    const createdAt=new Date().toISOString();
    setMembers(prev=>prev.some(m=>m.name.trim().toLocaleLowerCase("en-US")==="beliz")?prev:[{id:uid(),name:"Beliz",membershipType:"balance",balance:0,unlimited:true,coffeeCredits:0,createdAt,history:[]} ,...prev]);
  },[members,setMembers]);
  const [linkBusy,setLinkBusy]=useState(false);
  const [issuedLinks,setIssuedLinks]=useState({});
  const [linkAdminSecret,setLinkAdminSecret]=useState("");
  async function loadMemberLink(memberId){
    if(!linkAdminSecret||issuedLinks[memberId]!==undefined||linkBusy)return;
    setLinkBusy(true);
    try{
      const response=await fetch(SB_URL+"/rest/v1/rpc/lurk_plus_get_link",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_member_id:memberId,p_admin_secret:linkAdminSecret})});
      const result=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(result?.message||"Unable to load link");
      const token=typeof result==="string"?result:result?.url;
      const url=token?(token.startsWith("http")?token:lurkPlusUrl(members.find(m=>m.id===memberId)||{id:memberId,name:"uye"},token,members)):null;
      setIssuedLinks(prev=>({...prev,[memberId]:url}));
    }catch(e){msg(e.message||"Unable to load link.");}
    finally{setLinkBusy(false);}
  }
  function selectLurkPlusMember(memberId){
    setSelectedMemberId(memberId);
    if(linkAdminSecret)loadMemberLink(memberId);
  }
  async function getLinkSecret(){
    if(linkAdminSecret)return linkAdminSecret;
    const secret=window.prompt("Enter the LURK+ link management key:");
    if(!secret)return null;
    if(secret.length<24){msg("The management key must be at least 24 characters.");return null;}
    setLinkAdminSecret(secret);
    return secret;
  }
  async function revealMemberLink(member){
    if(linkBusy)return;
    const secret=await getLinkSecret();
    if(!secret)return;
    setLinkBusy(true);
    try{
      const response=await fetch(SB_URL+"/rest/v1/rpc/lurk_plus_get_link",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_member_id:member.id,p_admin_secret:secret})});
      const result=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(result?.message||"Unable to load link");
      const token=typeof result==="string"?result:result?.url;
      const url=token?(token.startsWith("http")?token:lurkPlusUrl(member,token,members)):null;
      setIssuedLinks(prev=>({...prev,[member.id]:url}));
      if(url)msg("Showing the existing customer link.");
      else msg("No active link found for this member.");
    }catch(e){msg(e.message||"Unable to load link.");}
    finally{setLinkBusy(false);}
  }
  async function manageLink(member,action){
    if(linkBusy)return;
    const secret=await getLinkSecret();
    if(!secret)return;
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
        if(!response.ok)throw new Error(result?.message||"Unable to create link");
        const url=lurkPlusUrl(member,token,members);
        setIssuedLinks(prev=>({...prev,[member.id]:url}));

        try{await navigator.clipboard.writeText(url);msg("Customer link created and copied.");}
        catch(e){msg("Link created. You can copy it below.");}
      }else{
        rpc="lurk_plus_revoke_links";
        body={p_member_id:member.id,p_admin_secret:secret};
        const response=await fetch(SB_URL+"/rest/v1/rpc/"+rpc,{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify(body)});
        const result=await response.json().catch(()=>null);
        if(!response.ok)throw new Error(result?.message||"Unable to revoke link");
        setIssuedLinks(prev=>({...prev,[member.id]:null}));
        msg("All customer links for this member have been revoked.");
      }
    }catch(e){msg(e.message||"Action failed.");}
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
    if(!clean){msg("Enter a member name.");return;}
    if(!balance.trim()||!Number.isFinite(amount)||amount<0||(memberType==="balance"&&!Number.isFinite(Number(balance)))){msg(memberType==="coffee"?"Enter a valid number of coffee credits.":"Enter a valid balance.");return;}
    if(members.some(m=>m.name.trim().toLocaleLowerCase("en-US")===clean.toLocaleLowerCase("en-US"))){msg("A LURK+ member with this name already exists.");return;}
    const createdAt=new Date().toISOString();
    const entry=memberType==="coffee"
      ?{id:uid(),type:"credit_topup",date:createdAt,amount,balanceAfter:amount,note:"Starting coffee credits"}
      :{id:uid(),type:"topup",date:createdAt,amount:Number(balance),balanceAfter:Number(balance),note:"Starting balance"};
    setMembers(prev=>[{id:uid(),name:clean,membershipType:memberType,balance:memberType==="balance"?Math.round(Number(balance)*100)/100:0,coffeeCredits:memberType==="coffee"?amount:0,createdAt,history:[entry]},...prev]);
    setName("");setBalance("");setMemberType("balance");setShowForm(false);msg("LURK+ member added.");
  }
  function addMemberBalance(member){
     const raw=window.prompt(member.name+" balance to add (TRY):");
     if(raw===null)return;
     const amount=Number(raw.replace(",","."));
     if(!Number.isFinite(amount)||amount<=0){msg("Enter a valid balance amount.");return;}
     const method=window.confirm("Was the payment made by card?\n\nOK: Card\nCancel: Cash")?"card":"cash";
     const date=new Date().toISOString();
     setMembers(prev=>prev.map(m=>{if(m.id!==member.id)return m;const nextBalance=Math.round(((Number(m.balance)||0)+amount)*100)/100;return{...m,balance:nextBalance,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:"topup",date,amount,method,balanceAfter:nextBalance,note:"Balance topped up"}]};}));
     msg(member.name+" · "+fm(amount)+" balance added via "+(method==="card"?"card":"cash")+".");
   }
   function addCoffeeCredits(member){
    const raw=window.prompt(member.name+" coffee credits to add:");
    if(raw===null)return;
    const amount=Number(raw);
    if(!Number.isInteger(amount)||amount<1){msg("Enter at least 1 whole coffee credit.");return;}
    const date=new Date().toISOString();
    setMembers(prev=>prev.map(m=>m.id!==member.id?m:{...m,coffeeCredits:(Number(m.coffeeCredits)||0)+amount,updatedAt:date,history:[...(m.history||[]),{id:uid(),type:"credit_topup",date,amount,balanceAfter:(Number(m.coffeeCredits)||0)+amount,note:"Coffee credits added"}]}));
    msg(member.name+" · "+amount+" coffee credits added.");
  }
  async function deleteMember(member){
    if(!window.confirm(member.name+"Are you sure you want to delete the LURK+ member named ? Their balance/coffee credits and activity history will be removed from the member list. Customer links will also be revoked."))return;
    const secret=window.prompt("Enter the LURK+ link management key:");
    if(!secret)return;
    if(secret.length<24){msg("The management key must be at least 24 characters.");return;}
    setLinkBusy(true);
    try{
      const response=await fetch(SB_URL+"/rest/v1/rpc/lurk_plus_revoke_links",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"},body:JSON.stringify({p_member_id:member.id,p_admin_secret:secret})});
      const result=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(result?.message||"Unable to revoke member links. The member was not deleted.");
      setMembers(prev=>prev.filter(m=>m.id!==member.id));
      setSelectedMemberId(null);
      setIssuedLinks(prev=>{const next={...prev};delete next[member.id];return next;});
      msg(member.name+" LURK+ listesinden silindi.");
    }catch(e){msg(e.message||"Could not delete member.");}
    finally{setLinkBusy(false);}
  }
  return(
    <div className="lurk-screen ds-lurk-plus">
      <div style={{background:"rgba(13,13,13,0.98)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"18px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setV("home")} style={{background:"transparent",border:0,color:T.textSub,fontSize:24,cursor:"pointer"}}>←</button>
        <div style={{flex:1}}><div style={{fontSize:24,fontWeight:850,letterSpacing:"-0.8px",color:T.text}}>LURK<span style={{color:T.accentL}}>+</span></div><div style={{fontSize:11,color:T.textSub,marginTop:2}}>Balance and coffee credit memberships</div></div>
        <button onClick={()=>setShowForm(true)} style={{background:T.accent,border:0,borderRadius:22,padding:"9px 15px",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer"}}>+ Add Member</button>
      </div>
      <div style={{padding:14}}>
        {members.length===0?<div style={{padding:"42px 20px",textAlign:"center",color:T.textSub,background:T.bg2,borderRadius:14}}><div style={{fontSize:30,marginBottom:10}}>＋</div><div style={{fontWeight:700,color:T.text,marginBottom:5}}>No LURK+ members yet</div><div style={{fontSize:12}}>Add your first member and set their starting balance.</div></div>:members.slice().sort((a,b)=>a.name.localeCompare(b.name,"tr")).map(m=><button key={m.id} onClick={()=>selectLurkPlusMember(m.id)} style={{display:"flex",alignItems:"center",gap:12,width:"100%",textAlign:"left",background:T.bg2,border:"1px solid "+(selectedMemberId===m.id?"rgba(52,199,89,.35)":"rgba(255,255,255,.07)"),borderRadius:13,padding:12,marginBottom:8,cursor:"pointer",color:T.text}}><div style={{width:38,height:38,borderRadius:11,background:"rgba(52,199,89,.12)",display:"flex",alignItems:"center",justifyContent:"center",color:T.accentL,fontSize:16,fontWeight:800,flexShrink:0}}>{m.name.trim().charAt(0).toLocaleUpperCase("en-US")}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:750,overflowWrap:"anywhere"}}>{m.name}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>Membership: {new Date(m.createdAt||Date.now()).toLocaleDateString("en-US")}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:15,fontWeight:850,color:m.name.trim().toLocaleLowerCase("en-US")==="beliz"?"#FF69B4":m.membershipType!=="coffee"&&!m.unlimited&&(Number(m.balance)||0)<0?"#FF453A":T.accentL,whiteSpace:"nowrap"}}>{m.name.trim().toLocaleLowerCase("en-US")==="beliz"?(m.history||[]).reduce((n,h)=>n+(h.type==="kiss_debt"?(Number(h.amount)||0):h.type==="kiss_refund"?-(Number(h.amount)||0):0),0)+" kisses":m.membershipType==="coffee"?(Number(m.coffeeCredits)||0)+" coffee credits":m.unlimited?"Unlimited":fm(m.balance)}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>{m.membershipType==="coffee"?"Coffee credit membership":"Balance membership"} · View activity ›</div></div></button>)}
        {selectedMemberId&&members.filter(m=>m.id===selectedMemberId).map(m=><div key={m.id} style={{marginTop:12,background:"rgba(255,255,255,.035)",border:"1px solid rgba(255,255,255,.09)",borderRadius:14,padding:13}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:10}}><div><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{fontSize:16,fontWeight:800,color:T.text}}>{m.name}</div><button onClick={()=>{const next=window.prompt("New name for the LURK+ member:",m.name);if(next===null)return;const clean=next.trim();if(!clean){msg("Member name cannot be empty.");return;}if(members.some(x=>x.id!==m.id&&x.name.trim().toLocaleLowerCase("en-US")===clean.toLocaleLowerCase("en-US"))){msg("Another LURK+ member with this name already exists.");return;}setMembers(prev=>prev.map(x=>x.id===m.id?{...x,name:clean,updatedAt:new Date().toISOString()}:x));msg("Member name updated.");}} style={{padding:"4px 8px",background:"rgba(255,255,255,.06)",color:T.textSub,border:"1px solid rgba(255,255,255,.14)",borderRadius:7,fontSize:10,fontWeight:750,cursor:"pointer",whiteSpace:"nowrap"}}>Edit</button></div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>{m.name.trim().toLocaleLowerCase("en-US")==="beliz"?"Kiss balance":m.membershipType==="coffee"?"Remaining coffee credits":"Current balance"}</div></div><div style={{fontSize:18,fontWeight:850,color:m.membershipType!=="coffee"&&!m.unlimited&&m.name.trim().toLocaleLowerCase("en-US")!=="beliz"&&(Number(m.balance)||0)<0?"#FF453A":T.accentL}}>{m.membershipType==="coffee"?(Number(m.coffeeCredits)||0)+" / toplam hak":m.unlimited?"Unlimited usage":" "+fm(m.balance)}</div></div>
          {m.membershipType!=="coffee"&&!m.unlimited&&m.name.trim().toLocaleLowerCase("en-US")!=="beliz"&&<button onClick={()=>addMemberBalance(m)} style={{width:"100%",padding:9,marginBottom:12,background:"rgba(52,199,89,.1)",color:T.accentL,border:"1px solid rgba(52,199,89,.2)",borderRadius:8,fontSize:11,fontWeight:800,cursor:"pointer"}}>+ Add balance</button>}
           {m.membershipType==="coffee"&&<button onClick={()=>addCoffeeCredits(m)} style={{width:"100%",padding:9,marginBottom:12,background:"rgba(52,199,89,.1)",color:T.accentL,border:"1px solid rgba(52,199,89,.2)",borderRadius:8,fontSize:11,fontWeight:800,cursor:"pointer"}}>+ Add coffee credits</button>}
          <div style={{background:"rgba(52,199,89,.07)",border:"1px solid rgba(52,199,89,.18)",borderRadius:11,padding:11,marginBottom:13}}>
            <div style={{fontSize:12,fontWeight:800,color:T.text,marginBottom:5}}>Customer Link</div>
            <div style={{fontSize:10,color:T.textSub,lineHeight:1.5,marginBottom:9}}>Send this link to the customer. Anyone with the link can view only this member's balance and activity.</div>
            <button disabled={linkBusy} onClick={()=>manageLink(m,"create")} style={{width:"100%",padding:10,background:T.accent,color:"#fff",border:0,borderRadius:9,fontWeight:800,fontSize:11,cursor:"pointer",opacity:linkBusy?0.6:1}}>{linkBusy?"Processing…":"Create / renew link"}</button>
            <button disabled={linkBusy} onClick={()=>revealMemberLink(m)} style={{width:"100%",padding:9,marginTop:7,background:"rgba(255,255,255,.06)",color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:8,fontSize:11,fontWeight:750,cursor:"pointer",opacity:linkBusy?0.6:1}}>{linkBusy?"Loading…":"Show existing link"}</button>
            {issuedLinks[m.id]&&<><div style={{fontSize:10,color:T.textSub,overflowWrap:"anywhere",padding:"8px 0"}}>{issuedLinks[m.id]}</div><button onClick={()=>navigator.clipboard.writeText(issuedLinks[m.id]).then(()=>msg("Link copied."))} style={{width:"100%",padding:9,background:T.bg3,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:8,fontSize:11,cursor:"pointer",marginBottom:7}}>Copy Link</button><button onClick={()=>window.open("https://wa.me/?text="+encodeURIComponent(m.name+" your LURK+ balance link: "+issuedLinks[m.id]),"_blank","noopener,noreferrer")} style={{width:"100%",padding:9,background:"rgba(37,211,102,.12)",color:"#55D98B",border:"1px solid rgba(37,211,102,.25)",borderRadius:8,fontSize:11,cursor:"pointer",marginBottom:7}}>Send via WhatsApp</button></>}
            <button disabled={linkBusy} onClick={()=>manageLink(m,"revoke")} style={{width:"100%",padding:9,background:"transparent",color:T.danger,border:"1px solid rgba(255,69,58,.25)",borderRadius:8,fontSize:11,cursor:"pointer"}}>Revoke All Links</button>
          </div>
          <div style={{fontSize:11,fontWeight:800,color:T.textSub,letterSpacing:".4px",marginBottom:7}}>BALANCE ACTIVITY</div>
          {(!m.history||m.history.length===0)?<div style={{fontSize:12,color:T.textSub,padding:"12px 0"}}>No activity recorded yet.</div>:m.history.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).map(h=><div key={h.id} style={{display:"flex",gap:9,alignItems:"flex-start",padding:"9px 0",borderTop:"1px solid rgba(255,255,255,.07)"}}><div style={{width:28,height:28,borderRadius:9,background:h.type==="topup"?"rgba(52,199,89,.12)":h.type==="refund"?"rgba(52,199,89,.1)":"rgba(255,69,58,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:h.type==="purchase"?T.danger:T.accentL,flexShrink:0}}>{h.type==="topup"?"＋":h.type==="refund"?"↩":"−"}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:750,color:T.text}}>{h.type==="kiss_debt"?"Kiss owed 💋":h.type==="kiss_refund"?"Kiss refunded":h.type==="topup"?(h.note||"Balance topped up"):h.type==="credit_topup"?(h.note||"Coffee credits added"):h.type==="credit_use"?(h.itemName||"Coffee credit used"):h.type==="credit_refund"?(h.itemName?h.itemName+" refunded":"Coffee credit refunded"):h.type==="refund"?"Product refund":(h.itemName||"Product purchase")}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>{new Date(h.date).toLocaleString("en-US",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}{h.table?" · "+h.table:""}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>After transaction: {m.membershipType==="coffee"?(Number(h.balanceAfter)||0)+" coffee credits":fm(h.balanceAfter)}</div></div><div style={{fontSize:12,fontWeight:800,color:m.name.trim().toLocaleLowerCase("en-US")==="beliz"?"#FF69B4":h.type==="purchase"?T.danger:T.accentL,whiteSpace:"nowrap"}}>{m.name.trim().toLocaleLowerCase("en-US")==="beliz"?(h.type==="kiss_debt"?"+":"−")+h.amount+" kisses":m.membershipType==="coffee"?(h.type==="credit_use"?"−":h.type==="credit_refund"||h.type==="credit_topup"?"+":"")+h.amount+" credits":(h.type==="purchase"?"−":"+")+fm(h.amount)}</div></div>)}
          <button disabled={linkBusy} onClick={()=>deleteMember(m)} style={{width:"100%",marginTop:12,padding:10,background:"rgba(255,69,58,.08)",border:"1px solid rgba(255,69,58,.3)",borderRadius:9,color:T.danger,fontSize:12,fontWeight:800,cursor:"pointer",opacity:linkBusy?0.6:1}}>Delete Membership</button>
          <button onClick={()=>setSelectedMemberId(null)} style={{width:"100%",marginTop:8,padding:9,background:"transparent",border:"1px solid rgba(255,255,255,.1)",borderRadius:9,color:T.textSub,fontSize:11,cursor:"pointer"}}>Close Details</button>
        </div>)}
      </div>
      {showForm&&<Modal><div style={{fontSize:18,fontWeight:800,color:T.text,marginBottom:6}}>New LURK+ Member</div><div style={{fontSize:12,color:T.textSub,marginBottom:16}}>Choose a membership type and enter the starting value.</div><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Member name *</label><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:"100%",padding:12,marginBottom:12,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10}}/><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Membership type *</label><select value={memberType} onChange={e=>setMemberType(e.target.value)} style={{width:"100%",padding:12,marginBottom:12,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10}}><option value="balance">Balance membership (TRY)</option><option value="coffee">Coffee credit membership</option></select><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>{memberType==="coffee"?"Starting coffee credits *":"Starting balance (TL) *"}</label><input value={balance} onChange={e=>setBalance(e.target.value)} inputMode={memberType==="coffee"?"numeric":"decimal"} placeholder={memberType==="coffee"?"e.g. 6":"e.g. 500"} onKeyDown={e=>{if(e.key==="Enter")addMember();}} style={{width:"100%",padding:12,marginBottom:16,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10}}/><button onClick={addMember} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>Save Member</button><button onClick={()=>setShowForm(false)} style={{width:"100%",padding:12,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Cancel</button></Modal>}
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
      if(!r.ok)throw new Error("Unable to retrieve data");
      const data=await r.json();
      if(!data||!data.name)throw new Error("Link is invalid or has been revoked");
      setMember(data);setUpdated(new Date());
    }catch(e){setMember(null);setError(true);}
    finally{setLoading(false);}
  }
  useEffect(()=>{refresh();},[token]);
  const history=Array.isArray(member?.history)?member.history.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)):[];
  const cream="#E9E1CF", ink="#171914", green="#34C759";
  const kissCount=(member?.history||[]).reduce((n,h)=>n+(h.type==="kiss_debt"?(Number(h.amount)||0):h.type==="kiss_refund"?-(Number(h.amount)||0):0),0);
  const isBeliz=member?.name?.trim().toLocaleLowerCase("en-US")==="beliz";
  const memberValue=isBeliz?kissCount+" KISSES":member?.membershipType==="coffee"?(Number(member.coffeeCredits)||0)+" KAHVE HAKKI":member?.unlimited?"UNLIMITED":fm(Number(member?.balance)||0);
  const memberLabel=isBeliz?"ACCUMULATED KISS DEBT":member?.membershipType==="coffee"?"REMAINING COFFEE CREDITS":member?.unlimited?"MEMBERSHIP CREDITS":"CURRENT BALANCE";
  return <div style={{minHeight:"100vh",background:"#080A08",color:"#F1EEE6",fontFamily:"Inter,Helvetica Neue,Arial,sans-serif",padding:"30px 16px 50px"}}>
    <div style={{maxWidth:520,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
        <div style={{fontSize:29,fontWeight:900,letterSpacing:"-1.5px"}}>LURK<span style={{color:"#79A66A"}}>+</span></div>
        <div style={{fontSize:9,letterSpacing:"3px",lineHeight:1.8,textAlign:"right",color:"#B7B4A9"}}>MEMBER<br/>ACCESS</div>
      </div>
      <div style={{fontSize:11,color:"#8E9289",letterSpacing:"1.4px",marginBottom:27}}>YOUR MEMBERSHIP DETAILS AND USAGE HISTORY</div>
      {loading?<div style={{padding:28,textAlign:"center",color:"#A0A0A0"}}>Loading your account…</div>:error?<div style={{padding:22,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:15}}>
        <div style={{fontSize:17,fontWeight:800,marginBottom:7}}>Unable to open link</div><div style={{fontSize:12,color:"#A0A0A0",lineHeight:1.6}}>This link is invalid, revoked, or temporarily unavailable. Please contact the LURK team.</div><button onClick={refresh} style={{marginTop:16,padding:11,width:"100%",border:0,borderRadius:9,background:"#789B68",color:"#101510",fontWeight:800}}>Newden Dene</button>
      </div>:member&&<>
        <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(145deg,#F1EBDD 0%,#E4DAC5 55%,#D8CDB6 100%)",color:ink,borderRadius:22,padding:"22px 20px 17px",marginBottom:21,boxShadow:"0 18px 42px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.8)",border:"1px solid rgba(255,255,255,.55)"}}>
          <div style={{position:"absolute",inset:0,opacity:.16,pointerEvents:"none",backgroundImage:"repeating-linear-gradient(0deg,rgba(65,52,32,.12) 0px,rgba(65,52,32,.12) 1px,transparent 1px,transparent 4px)"}}/>
          <div style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:12,borderBottom:"1px solid rgba(35,35,27,.35)"}}>
            <div style={{fontSize:25,fontWeight:950,letterSpacing:"-1.3px"}}>LURK<span style={{color:"#668B55"}}>+</span></div>
            <div style={{fontSize:9,fontWeight:800,letterSpacing:"1.8px"}}>MEMBERSHIP CARD</div>
          </div>
          <div style={{position:"relative",paddingTop:17}}>
            <div style={{fontSize:19,fontWeight:750,letterSpacing:"-.4px"}}>{member.name}</div>
            <div style={{fontSize:9,fontWeight:800,letterSpacing:"2px",marginTop:14,color:"#5C6255"}}>{memberLabel}</div>
            <div style={{fontSize:member.unlimited?42:34,fontWeight:950,letterSpacing:"-1.7px",lineHeight:1.15,color:isBeliz?"#FF69B4":member?.membershipType!=="coffee"&&!member?.unlimited&&(Number(member?.balance)||0)<0?"#FF453A":green,marginTop:3,overflowWrap:"anywhere"}}>{memberValue}</div>
            <div style={{position:"absolute",right:0,top:24,border:"1px solid rgba(36,69,43,.65)",borderRadius:"50%",padding:"9px 11px",transform:"rotate(-12deg)",fontSize:9,fontWeight:850,letterSpacing:"1px",color:green,textAlign:"center",lineHeight:1.3}}>LURK<br/>MEMBER</div>
          </div>
          <div style={{height:1,background:"rgba(35,35,27,.35)",marginTop:13,marginBottom:12}}/>
          <div style={{display:"flex",alignItems:"end",justifyContent:"space-between",gap:12}}>
            <div aria-hidden="true" style={{height:27,flex:1,maxWidth:165,background:"repeating-linear-gradient(90deg,#24251F 0px,#24251F 2px,transparent 2px,transparent 4px,#24251F 4px,#24251F 5px,transparent 5px,transparent 8px)",opacity:.82}}/>
            <div style={{fontSize:9,fontWeight:800,letterSpacing:"1.4px",whiteSpace:"nowrap"}}>MEMBER ACCESS</div>
          </div>
          <div style={{position:"absolute",left:-13,top:"48%",width:26,height:26,borderRadius:"50%",background:"#080A08"}}/>
          <div style={{position:"absolute",right:-13,top:"48%",width:26,height:26,borderRadius:"50%",background:"#080A08"}}/>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:11,gap:10}}>
          <div style={{fontSize:15,fontWeight:850,letterSpacing:"-.3px"}}>Hesap hareketleri</div>
          <button onClick={refresh} style={{padding:"9px 13px",background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.15)",borderRadius:11,color:"#F1EEE6",fontSize:11,cursor:"pointer"}}>↻ Refresh</button>
        </div>
        <div style={{background:"linear-gradient(145deg,#111411,#0D100D)",border:"1px solid rgba(255,255,255,.12)",borderRadius:16,padding:"0 14px"}}>
          {!history.length?<div style={{padding:"24px 12px",textAlign:"center",fontSize:12,color:"#999D93"}}><div style={{fontSize:22,marginBottom:8,color:"#91A982"}}>♧</div>No balance activity yet.</div>:history.map(h=><div key={h.id} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"13px 0",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
            <div style={{width:29,height:29,borderRadius:9,background:h.type==="purchase"?"rgba(255,69,58,.12)":"rgba(52,199,89,.13)",display:"grid",placeItems:"center",color:h.type==="purchase"?"#FF6B61":"#91B783",flexShrink:0}}>{h.type==="topup"?"＋":h.type==="refund"?"↩":"−"}</div>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:750}}>{h.type==="topup"?(h.note||"Balance topped up"):h.type==="credit_topup"?(h.note||"Coffee credits added"):h.type==="credit_use"?(h.itemName||"Coffee credit used"):h.type==="credit_refund"?(h.itemName?h.itemName+" refunded":"Coffee credit refunded"):h.type==="refund"?"Product refund":(h.itemName||"Product purchase")}</div><div style={{fontSize:10,color:"#A0A0A0",marginTop:4}}>{h.date?new Date(h.date).toLocaleString("en-US",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"—"}{h.table?" · "+h.table:""}</div><div style={{fontSize:10,color:"#A0A0A0",marginTop:3}}>After transaction: {isBeliz?(Number(h.balanceAfter)||0)+" kisses":member.membershipType==="coffee"?(Number(h.balanceAfter)||0)+" coffee credits":fm(Number(h.balanceAfter)||0)}</div></div>
            <div style={{fontSize:12,fontWeight:850,color:h.type==="purchase"?"#FF6B61":"#34C759",whiteSpace:"nowrap"}}>{isBeliz?(h.type==="kiss_debt"?"+":"−")+h.amount+" kisses":member.membershipType==="coffee"?(h.type==="credit_use"?"−":h.type==="credit_refund"||h.type==="credit_topup"?"+":"")+h.amount+" credits":(h.type==="purchase"?"−":"+")+fm(Number(h.amount)||0)}</div>
          </div>)}
        </div>
        <div style={{fontSize:10,color:"#777",textAlign:"center",marginTop:16,lineHeight:1.5}}>Information is retrieved from the latest record in the LURK system.</div>
      </>}
    </div>
  </div>;
}

/* ─── CUSTOMERS ─── */
function CustomersScreen({orders,customers,setCustomers,setV,msg,balancesVisible=true}){
 const [query,setQuery]=useState("");
 const [showAdd,setShowAdd]=useState(false);
 const [name,setName]=useState("");
 const [detail,setDetail]=useState(null);
 const money=v=>balancesVisible?fm(v):"••••••";
 const customerOrders=c=>orders.filter(o=>!o.partialPayment&&o.status!=="cancelled"&&((o.customerId&&o.customerId===c.id)||(!o.customerId&&o.g&&o.g.trim().toLocaleLowerCase("en-US")===c.name.trim().toLocaleLowerCase("en-US"))));
 const totalFor=c=>customerOrders(c).reduce((sum,o)=>sum+(Number(o.total)||0),0);
 const filtered=customers.filter(c=>c.name.toLocaleLowerCase("en-US").includes(query.trim().toLocaleLowerCase("en-US")));
 const regular=filtered.filter(c=>!c.lurkPlus);
 const members=filtered.filter(c=>!!c.lurkPlus);
 function addCustomer(){
  const clean=name.trim();
  if(!clean){msg("Customer name is required.");return;}
  if(customers.some(c=>c.name.trim().toLowerCase()===clean.toLowerCase())){msg("This customer already exists.");return;}
  setCustomers(prev=>[{id:uid(),name:clean,lurkPlus:false,createdAt:new Date().toISOString()},...prev]);
  setName("");setShowAdd(false);msg("Customer added.");
 }
 function toggleMember(customer){
  const next=!customer.lurkPlus;
  setCustomers(prev=>prev.map(c=>c.id===customer.id?{...c,lurkPlus:next,updatedAt:new Date().toISOString()}:c));
  setDetail(prev=>prev?.id===customer.id?{...prev,lurkPlus:next}:prev);
  msg(next?"LURK+ membership activated.":"LURK+ membership removed.");
 }
 function renderCustomer(c){
  const list=customerOrders(c);
  return <button key={c.id} className="lurk-customer-row" onClick={()=>setDetail(c)}>
   <span className="lurk-customer-avatar">{(c.name||"?").trim().charAt(0).toUpperCase()}</span>
   <span className="lurk-customer-row-main"><b>{c.name}</b><small>{list.length} orders</small></span>
   <strong>{money(totalFor(c))}</strong><span className="lurk-customer-chevron">›</span>
  </button>;
 }
 return <div className="lurk-screen lurk-customers-screen lurk-customers-v2">
  <header className="ds-page-head"><div><div className="ds-eyebrow">LURK / CUSTOMER RELATIONSHIPS</div><h1>Customers</h1></div><button className="ds-button ds-primary-button" onClick={()=>{setName("");setShowAdd(true);}}>＋ Add Customer</button></header>
  <div className="lurk-customer-summary"><div className="lurk-kpi-card lurk-kpi-primary"><span>All Customers</span><strong>{customers.length}</strong></div><div className="lurk-kpi-card lurk-kpi-primary"><span>LURK+ Members</span><strong>{customers.filter(c=>c.lurkPlus).length}</strong></div></div>
  <input className="lurk-customer-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search customers"/>
  <section className="lurk-customer-block"><div className="lurk-customer-block-head"><h2>All Customers</h2><span>{regular.length}</span></div>{regular.length?regular.map(renderCustomer):<div className="lurk-customer-empty">No regular customers found.</div>}</section>
  <section className="lurk-customer-block lurk-plus-block"><div className="lurk-customer-block-head"><h2>LURK+ Members</h2><span>{members.length}</span></div>{members.length?members.map(renderCustomer):<div className="lurk-customer-empty">No LURK+ members yet.</div>}</section>
  {showAdd&&<Modal><div className="lurk-simple-modal"><div className="lurk-eyebrow">CUSTOMER DIRECTORY</div><h2>Add Customer</h2><label htmlFor="new-customer-name">Full Name</label><input id="new-customer-name" autoFocus value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCustomer()} placeholder="Customer name"/><button className="ds-button ds-primary-button" onClick={addCustomer}>Add Customer</button><button className="lurk-modal-cancel" onClick={()=>setShowAdd(false)}>Cancel</button></div></Modal>}
  {detail&&(()=>{const list=customerOrders(detail);const products={};list.forEach(o=>(o.items||[]).forEach(i=>{products[i.name]=(products[i.name]||0)+(Number(i.qty)||0);}));const top=Object.entries(products).sort((a,b)=>b[1]-a[1]).slice(0,5);const total=totalFor(detail);const last=list.slice().sort((a,b)=>String(b.date||"").localeCompare(String(a.date||"")))[0];return <Modal><div className="lurk-customer-detail"><div className="lurk-customer-detail-avatar">{detail.name.trim().charAt(0).toUpperCase()}</div><div className="lurk-eyebrow">CUSTOMER PROFILE</div><h2>{detail.name}</h2><div className="lurk-customer-detail-kpis"><div className="lurk-kpi-card lurk-kpi-primary"><span>Total Spent</span><strong>{money(total)}</strong></div><div className="lurk-kpi-card lurk-kpi-primary"><span>Total Orders</span><strong>{list.length}</strong></div><div className="lurk-kpi-card"><span>Average Order</span><strong>{money(list.length?total/list.length:0)}</strong></div></div><div className="lurk-customer-detail-section"><b>Most Ordered Products</b>{top.length?top.map(([product,count])=><div key={product}><span>{product}</span><strong>{count}</strong></div>):<p>No order history yet.</p>}</div><div className="lurk-customer-last-order">Last Order <b>{last?.date||"—"}</b></div><button className={"lurk-membership-toggle "+(detail.lurkPlus?"is-member":"")} onClick={()=>toggleMember(detail)}>{detail.lurkPlus?"Remove LURK+ Membership":"Make LURK+ Member"}</button><button className="lurk-modal-cancel" onClick={()=>setDetail(null)}>Close</button></div></Modal>})()}
 </div>;
}
/* ─── MENU ─── */
function MenuScreen({menu,setMenu,setV}){
 const [showForm,setShowForm]=useState(false);
 const [editing,setEditing]=useState(null);
 const [name,setName]=useState("");
 const [price,setPrice]=useState("");
 const [category,setCategory]=useState("Coffee");
 const [image,setImage]=useState("");
 const [description,setDescription]=useState("");
 const [error,setError]=useState("");
 const [dragProduct,setDragProduct]=useState(null);
 const [dragCategory,setDragCategory]=useState(null);
 const cats=[...new Set(menu.map(m=>m.cat))];
 function openNew(){setEditing(null);setName("");setPrice("");setCategory(cats[0]||"Coffee");setImage("");setDescription("");setError("");setShowForm(true);}
 function openEdit(item){setEditing(item);setName(item.name);setPrice(String(item.price));setCategory(item.cat);setImage(item.image||"");setDescription(item.description||"");setError("");setShowForm(true);}
 function save(){
  const valid=validateMenuItemInput(name,price);if(valid.error){setError(valid.error);return;}
  const fields={name:valid.name,price:valid.price,cat:category,image:image.trim(),description:description.trim(),on:true};
  if(editing)setMenu(prev=>prev.map(m=>m.id===editing.id?{...m,...fields}:m));
  else setMenu(prev=>[...prev,{id:Date.now(),...fields}]);
  setShowForm(false);setEditing(null);setName("");setPrice("");setImage("");setDescription("");setError("");
 }
 function archive(){
  if(!editing)return;
  setMenu(prev=>prev.map(m=>m.id===editing.id?{...m,on:false}:m));
  setShowForm(false);setEditing(null);
 }
 function reorderProduct(targetId){
  if(!dragProduct||dragProduct===targetId)return;
  setMenu(prev=>{const next=prev.slice();const from=next.findIndex(m=>m.id===dragProduct),to=next.findIndex(m=>m.id===targetId);if(from<0||to<0||next[from].cat!==next[to].cat)return prev;const [item]=next.splice(from,1);next.splice(to,0,item);return next;});
  setDragProduct(null);
 }
 function reorderCategory(target){
  if(!dragCategory||dragCategory===target)return;
  setMenu(prev=>{const ordered=[...new Set(prev.map(m=>m.cat))];const from=ordered.indexOf(dragCategory),to=ordered.indexOf(target);if(from<0||to<0)return prev;const [cat]=ordered.splice(from,1);ordered.splice(to,0,cat);return ordered.flatMap(c=>prev.filter(m=>m.cat===c));});
  setDragCategory(null);
 }
 function addCategory(){const raw=window.prompt("New category name:");if(!raw||!raw.trim())return;const clean=raw.trim();if(cats.some(c=>c.toLowerCase()===clean.toLowerCase()))return;setMenu(prev=>[...prev,{id:Date.now(),name:"New Product",price:0,cat:clean,on:false,archived:true}]);}
 return <div className="lurk-screen lurk-menu-screen lurk-menu-v2">
  <header className="ds-page-head"><div><div className="ds-eyebrow">LURK / CATALOG MANAGEMENT</div><h1>Menu & Products</h1></div><div className="ds-head-actions"><button className="ds-button" onClick={addCategory}>＋ Add Category</button><button className="ds-button ds-primary-button" onClick={openNew}>＋ Add Product</button></div></header>
  <p className="lurk-menu-hint">Drag products to reorder them. Drag category headers to change category order.</p>
  {cats.map(cat=><section key={cat} className="lurk-menu-category" draggable onDragStart={()=>setDragCategory(cat)} onDragOver={e=>e.preventDefault()} onDrop={()=>reorderCategory(cat)}>
   <header><h2>{cat}</h2><span>{menu.filter(m=>m.cat===cat).length} products</span></header>
   <div className="lurk-menu-product-grid">
    {menu.filter(m=>m.cat===cat).map(item=><article key={item.id} className={"lurk-menu-product "+(!item.on?"is-archived":"")} draggable onDragStart={()=>setDragProduct(item.id)} onDragOver={e=>e.preventDefault()} onDrop={()=>reorderProduct(item.id)}>
     <button className="lurk-menu-product-main" onClick={()=>openEdit(item)}>
      {item.image?<img src={item.image} alt="" loading="lazy"/>:<span className="lurk-menu-product-placeholder">☕</span>}
      <b>{item.name}</b><small>{item.description||cat}</small><strong>{fm(item.price)}</strong>
     </button>
     <div className="lurk-menu-product-actions"><span>{item.on?"Available":"Archived"}</span><button onClick={()=>setMenu(prev=>prev.map(m=>m.id===item.id?{...m,on:!m.on}:m))}>{item.on?"Archive":"Restore"}</button></div>
    </article>)}
   </div>
  </section>)}
  {showForm&&<Modal><div className="lurk-simple-modal"><div className="lurk-eyebrow">PRODUCT CATALOG</div><h2>{editing?"Edit Product":"Add Product"}</h2>
   <label>Product Name</label><input autoFocus value={name} onChange={e=>{setName(e.target.value);setError("");}} placeholder="Product name"/>
   <label>Category</label><select value={category} onChange={e=>setCategory(e.target.value)}>{cats.filter(c=>menu.some(m=>m.cat===c&&m.price>0)).map(c=><option key={c} value={c}>{c}</option>)}</select>
   <label>Price (TL)</label><input type="number" min="0.01" step="0.01" value={price} onChange={e=>{setPrice(e.target.value);setError("");}} placeholder="0.00"/>
   <label>Product Image URL</label><input value={image} onChange={e=>setImage(e.target.value)} placeholder="https://..."/>
   <label>Description (Optional)</label><textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Short product description" rows={2}/>
   {error&&<div role="alert" className="lurk-form-error">{error}</div>}
   <button className="ds-button ds-primary-button" onClick={save}>{editing?"Save Changes":"Add Product"}</button>
   {editing&&<button className="lurk-archive-action" onClick={archive}>Archive Product</button>}
   <button className="lurk-modal-cancel" onClick={()=>setShowForm(false)}>Cancel</button>
  </div></Modal>}
 </div>;
}
/* ─── SETTINGS ─── */
function SettingsScreen({setV,balancesVisible,setBalancesVisible,tables,orders,logs,customers,creditEntries,menu,day,personalDebts,setTables,setOrders,setLogs,setCustomers,setCreditEntries,setMenu,setDay,setPersonalDebts}){
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
    if(!clean){setCustomerError("Customer name is required.");return;}
    const duplicate=customers.find(c=>c.id!==customerEditing?.id&&c.name.trim().toLocaleLowerCase("en-US")===clean.toLocaleLowerCase("en-US"));
    if(duplicate){setCustomerError("Another customer with this name already exists.");return;}
    setCustomers(prev=>prev.map(c=>c.id===customerEditing.id?{...c,name:clean,updatedAt:new Date().toISOString()}:c));
    setCustomerEditing(null);setCustomerError("");
  }
  function inspectBackup(file){
    setImportMsg("");setPendingImport(null);
    if(!file)return;
    if(file.size>20*1024*1024){setImportMsg("The file exceeds the 20 MB limit.");return;}
    setImportBusy(true);
    file.text().then(raw=>{
      const parsed=JSON.parse(raw);
      const validationError=validateBackup(parsed);
      if(validationError)throw new Error(validationError);
      setPendingImport({data:parsed.data,filename:file.name});
      setImportMsg("Backup verified. Restoring it will replace existing records.");
    }).catch(e=>setImportMsg(e instanceof SyntaxError?"The file is not valid JSON.":(e?.message||"Unable to read backup."))).finally(()=>setImportBusy(false));
  }
  function applyBackup(){
    if(!pendingImport)return;
    const d=pendingImport.data;
    setTables(d.lurk_t);setOrders(d.lurk_o);setLogs(d.lurk_l);setCustomers(d.lurk_customers);setCreditEntries(d.lurk_credit);setMenu(d.lurk_m);setDay(d.lurk_d);if(Array.isArray(d.lurk_personal_debts))setPersonalDebts(d.lurk_personal_debts);
    setImportMsg("Backup imported. Do not close the app until the save indicator completes.");
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
    setBackupMsg("Backup downloaded. Store it somewhere safe.");
  }
  return(
    <div className="lurk-screen lurk-settings-screen ds-settings">
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:23,fontWeight:850,letterSpacing:"-.7px"}}>Settings</div>
      </div>
      <div style={{padding:"14px"}}>
        <div className="lurk-settings-preference">
          <div><b>System Preferences</b><small>Show or hide monetary amounts across the POS.</small></div>
          <button onClick={()=>setBalancesVisible(v=>!v)} aria-pressed={!balancesVisible} className={"lurk-amount-toggle "+(!balancesVisible?"is-hidden":"")}>{balancesVisible?"Amounts Visible":"Amounts Hidden"}</button>
        </div>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:10}}>Management</div>
        <button onClick={()=>setV("menu")} style={{width:"100%",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"16px 14px",cursor:"pointer",textAlign:"left",color:T.text,display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
          <div style={{width:40,height:40,borderRadius:10,background:"rgba(52,199,89,0.12)",border:"0.5px solid rgba(52,199,89,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>☰</div>
          <div><div style={{fontSize:14,fontWeight:700}}>Menu & Products</div><div style={{fontSize:12,color:T.textSub,marginTop:2}}>Add products and manage prices</div></div>
          <div style={{marginLeft:"auto",fontSize:18,color:T.textDim}}>›</div>
        </button>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",margin:"20px 0 10px"}}>Customer Management</div>
        <div style={{background:T.bg2,border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:14,marginBottom:18}}>
          <div style={{fontSize:13,color:T.textSub,marginBottom:10}}>{customers.length} registered customers · You can edit their details here.</div>
          {customers.length===0?<div style={{fontSize:12,color:T.textDim,padding:"8px 0"}}>No registered customers yet.</div>:customers.slice().sort((a,b)=>a.name.localeCompare(b.name,"tr")).map(customer=><div key={customer.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:"1px solid rgba(255,255,255,.06)"}}>
            <div style={{width:32,height:32,borderRadius:10,background:"rgba(52,199,89,.12)",color:T.accentL,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,flexShrink:0}}>{(customer.name||"?").trim().charAt(0).toLocaleUpperCase("en-US")}</div>
            <div style={{flex:1,minWidth:0,fontSize:13,fontWeight:700,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{customer.name}</div>
            <button onClick={()=>openCustomerEdit(customer)} style={{padding:"7px 11px",background:T.bg3,color:T.text,border:"1px solid rgba(255,255,255,.1)",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Edit</button>
          </div>)}
        </div>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",margin:"20px 0 10px"}}>Data & Backup</div>
        <div style={{background:T.bg2,border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:15}}>
          <div style={{fontSize:14,fontWeight:750,color:T.text}}>Data Backup</div>
          <div style={{fontSize:12,lineHeight:1.5,color:T.textSub,marginTop:5,marginBottom:13}}>Downloads table statuses, orders, reports, customers, the tab ledger, and the menu in a single JSON file. This does not change existing records.</div>
          <button onClick={exportBackup} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>↓ Download Backup</button>
          {backupMsg&&<div role="status" style={{fontSize:12,color:T.accentL,marginTop:10}}>{backupMsg}</div>}
          <div style={{height:1,background:"rgba(255,255,255,.08)",margin:"16px 0"}}/>
          <div style={{fontSize:14,fontWeight:750,color:T.text}}>Restore Backup</div>
          <div style={{fontSize:12,lineHeight:1.5,color:T.textSub,marginTop:5,marginBottom:12}}>Select a valid JSON backup created by LURK POS. Restoring it will replace the existing records.</div>
          <label style={{display:"block",boxSizing:"border-box",padding:13,textAlign:"center",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:10,color:T.text,fontWeight:750,cursor:"pointer"}}>
            {importBusy?"Yedek okunuyor…":"↑ Choose Backup File"}
            <input type="file" accept=".json,application/json" disabled={importBusy} onChange={e=>inspectBackup(e.target.files?.[0])} style={{display:"none"}}/>
          </label>
          {importMsg&&<div role="status" style={{fontSize:12,lineHeight:1.5,color:pendingImport?T.warn:T.textSub,marginTop:10}}>{importMsg}</div>}
          {pendingImport&&<div style={{marginTop:10}}>
            <div style={{fontSize:12,color:T.textSub,marginBottom:10}}>Selected file: <b style={{color:T.text}}>{pendingImport.filename}</b></div>
            <button onClick={applyBackup} style={{width:"100%",padding:13,background:T.danger,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>Replace Existing Data and Restore</button>
            <button onClick={()=>{setPendingImport(null);setImportMsg("Restore cancelled.");}} style={{width:"100%",padding:11,background:"transparent",color:T.textSub,border:0,cursor:"pointer",marginTop:4}}>Cancel</button>
          </div>}
          <div style={{fontSize:11,color:T.textDim,marginTop:10}}>Download a backup of your current data first. Backups may contain sensitive customer and sales information.</div>
        </div>
      </div>
      {customerEditing&&<Modal>
        <div style={{fontSize:17,fontWeight:800,color:T.text,marginBottom:14}}>Customeryi Edit</div>
        <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Ad soyad</label>
        <input autoFocus value={customerName} onChange={e=>{setCustomerName(e.target.value);setCustomerError("");}} placeholder="Customer name" style={{width:"100%",padding:12,marginBottom:10,background:T.bg2,color:T.text,border:"1px solid rgba(255,255,255,.12)",borderRadius:10,boxSizing:"border-box"}}/>
        {customerError&&<div role="alert" style={{fontSize:12,color:T.danger,marginBottom:10}}>{customerError}</div>}
        <button onClick={saveCustomerEdit} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>Save Changes</button>
        <button onClick={()=>setCustomerEditing(null)} style={{width:"100%",padding:11,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Cancel</button>
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
    <div className="lurk-confirm-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onCancel?.();}}>
      <div className="lurk-confirm-card" role="dialog" aria-modal="true" aria-labelledby="lurk-confirm-title">
        <div className="lurk-confirm-icon">!</div>
        <div className="lurk-confirm-eyebrow">CONFIRM ACTION</div>
        <h2 id="lurk-confirm-title">{title}</h2>
        {msg&&<p>{msg}</p>}
        <div className="lurk-confirm-actions">
          <button className="lurk-confirm-cancel" onClick={onCancel}>Cancel</button>
          <button className="lurk-confirm-delete" onClick={onOk}>Delete Table</button>
        </div>
      </div>
    </div>
  );
}