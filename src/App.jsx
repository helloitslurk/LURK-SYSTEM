// Production deployment sync: customer form, day controls, and neutral table styling.
import{useState,useEffect,useRef}from"react";
import { createKeyedWriteQueue } from "./writeQueue.js";
import { validateMenuItemInput } from "./menuValidation.js";
import { validatePayment } from "./paymentValidation.js";

const SB_URL="https://dpucptcrxoddfpvaqsdl.supabase.co";
const SB_KEY="sb_publishable_YiTDrcX7nnotBkoWqEWaHQ_tYHlT3NK";

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
  bg:"#F7F1E7",bg2:"#FFF9EF",bg3:"#F1E5D4",
  border:"rgba(91,65,43,0.14)",border2:"rgba(91,65,43,0.24)",
  accent:"#F36B3F",accentL:"#F36B3F",accentD:"#D94D2B",
  text:"#302820",textSub:"#75695E",textDim:"#A39789",
  danger:"#D94B43",warn:"#B8751B",
};

async function sbGet(key,fb){
  const r=await fetch(SB_URL+"/rest/v1/app_storage?key=eq."+key+"&select=value",{headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY}});
  if(!r.ok)throw new Error("Supabase read failed for "+key+" ("+r.status+")");
  const d=await r.json();
  if(d&&d[0])return JSON.parse(d[0].value);
  return fb;
}
async function sbSetNow(key,val){
  const body=JSON.stringify({key,value:JSON.stringify(val)});
  let lastError;
  for(let attempt=0;attempt<3;attempt++){
    try{
      const r=await fetch(SB_URL+"/rest/v1/app_storage",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body});
      if(r.ok)return true;
      lastError=new Error("Supabase write failed for "+key+" ("+r.status+")");
    }catch(e){lastError=e;}
    if(attempt<2)await new Promise(resolve=>setTimeout(resolve,350*(attempt+1)));
  }
  console.error(lastError||new Error("Supabase write failed for "+key));
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
  const[ok,setOk]=useState(false);
  const[loadError,setLoadError]=useState(false);
  const[saveStatus,setSaveStatus]=useState("saved");
  const[pendingSaves]=useState(()=>({count:0,failed:false}));
  const failedWrites=useRef({});
  const paymentInProgress=useRef(false);
  const[view,setV]=useState("home");
  const[sel,setSel]=useState(null);
  const[tables,setTbl]=useState([]);
  const[orders,setOrd]=useState([]);
  const[logs,setLogs]=useState([]);
  const[customers,setCustomers]=useState([]);
  const[lurkPlusMembers,setLurkPlusMembers]=useState([]);
  const[creditEntries,setCreditEntries]=useState([]);
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
        msg("Kayıt başarısız. Yeniden denemek için üstteki uyarıya dokun.");
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
      setTbl(Array.isArray(t)?t:[]);
      setOrd(Array.isArray(o)?o:[]);
      setCustomers(Array.isArray(c)?c:[]);
      setCreditEntries(Array.isArray(ce)?ce:[]);
      setLurkPlusMembers(Array.isArray(lp)?lp:[]);
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
    if(member&&(Number(member.balance)||0)<Number(item.price||0)){msg("LURK+ bakiyesi yetersiz. "+member.name+" · "+fm(member.balance));return false;}
    if(member)setLurkPlusMembers(prev=>prev.map(m=>{if(m.id!==member.id)return m;const nextBalance=Math.max(0,Math.round(((Number(m.balance)||0)-Number(item.price||0))*100)/100);return{...m,balance:nextBalance,updatedAt:new Date().toISOString(),history:[...(m.history||[]),{id:uid(),type:"purchase",date:new Date().toISOString(),amount:Number(item.price)||0,balanceAfter:nextBalance,itemName:item.name,table:table?.lbl||""}]};}));
    setTbl(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      return{...t,s:"o",oa:t.oa||new Date().toISOString(),order:[...t.order,{...item,qty:1,oid:uid(),addedAt:new Date().toISOString(),lurkPlusCharged:!!member}]};
    }));
    if(member)msg(member.name+" · "+fm(item.price)+" LURK+ bakiyesinden düştü.");
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
      if(d>0&&(Number(member.balance)||0)<Number(line.price||0)){msg("LURK+ bakiyesi yetersiz.");return;}
      setLurkPlusMembers(prev=>prev.map(m=>{if(m.id!==member.id)return m;const amount=Math.abs(d*Number(line.price||0));const nextBalance=Math.max(0,Math.round(((Number(m.balance)||0)-(d*Number(line.price||0)))*100)/100);return{...m,balance:nextBalance,updatedAt:new Date().toISOString(),history:[...(m.history||[]),{id:uid(),type:d<0?"refund":"purchase",date:new Date().toISOString(),amount,balanceAfter:nextBalance,itemName:line.name,table:table?.lbl||""}]};}));
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
      <div style={{maxWidth:420,textAlign:"center",background:T.bg2,border:"1px solid rgba(91,65,43,.1)",borderRadius:18,padding:24}}>
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
    {k:"tables",label:"Masalar",icon:"🪑"},
    {k:"customers",label:"Müşteriler",icon:"👥"},
    {k:"reports",label:"Raporlar",icon:"⭐"},
    {k:"settings",label:"Ayarlar",icon:"⚙"},
  ];

  return(
    <div style={{position:"relative"}}><div className="lurk-app" style={{background:T.bg,minHeight:view==="order"?"100dvh":"100vh",height:view==="order"?"100dvh":"auto",overflow:view==="order"?"hidden":"visible",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",color:T.text,width:"100%",margin:"0 auto",paddingBottom:view==="order"?0:76,boxSizing:"border-box"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #F7F1E7; }
        button, input, select { font: inherit; }
        button { transition: transform .14s ease, border-color .14s ease, background .14s ease, box-shadow .14s ease; }
        button:hover { filter: brightness(1.08); }
        button:active { transform: translateY(1px) scale(.99); }
        input:focus, select:focus { border-color: rgba(243,107,63,.75) !important; box-shadow: 0 0 0 3px rgba(243,107,63,.1); }
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
            radial-gradient(ellipse at 12% 0%, rgba(243,107,63,.075), transparent 34%),
            radial-gradient(ellipse at 88% 18%, rgba(100,160,255,.045), transparent 30%),
            #F7F1E7 !important;
        }
        .lurk-app div[style*="background: rgba(255, 255, 255, 0.055)"],
        .lurk-app div[style*="background:rgba(91,65,43,0.055)"] {
          -webkit-backdrop-filter: blur(22px) saturate(155%);
          backdrop-filter: blur(22px) saturate(155%);
          box-shadow: inset 0 1px 0 rgba(91,65,43,.055), 0 10px 30px rgba(0,0,0,.12);
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
          border: 1px solid rgba(91,65,43,.13) !important;
          box-shadow: 0 -8px 32px rgba(0,0,0,.22), inset 0 1px 0 rgba(91,65,43,.09);
        }
        .lurk-nav-button { min-width: 0; border-radius: 14px !important; }
        .lurk-nav-button:focus-visible { outline: 2px solid rgba(243,107,63,.95); outline-offset: -3px; }
        .lurk-nav-button:hover { background: rgba(91,65,43,.07) !important; }
        .lurk-app input, .lurk-app select {
          background-color: rgba(91,65,43,.055) !important;
          border-color: rgba(91,65,43,.14) !important;
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          backdrop-filter: blur(18px) saturate(150%);
        }
        .lurk-modal-backdrop {
          background: rgba(0,0,0,.52) !important;
          -webkit-backdrop-filter: blur(8px) saturate(125%);
          backdrop-filter: blur(8px) saturate(125%);
        }
        .lurk-modal-panel {
          background: rgba(255,249,239,.97) !important;
          border: 1px solid rgba(91,65,43,.16) !important;
          box-shadow: 0 24px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(91,65,43,.08) !important;
          -webkit-backdrop-filter: blur(36px) saturate(180%) !important;
          backdrop-filter: blur(36px) saturate(180%) !important;
        }
        .lurk-app button:not(.lurk-nav-button) {
          -webkit-tap-highlight-color: transparent;
        }

        .lurk-nav-button:focus-visible { outline: 2px solid rgba(243,107,63,.95); outline-offset: -3px; }
        @media (min-width: 1000px) {
          .lurk-app { padding-left: 104px !important; padding-bottom: 0 !important; }
          .lurk-bottom-nav {
            left: 0 !important; top: 0 !important; bottom: 0 !important;
            transform: none !important; width: 104px !important; max-width: 104px !important;
            flex-direction: column !important; justify-content: flex-start !important;
            gap: 8px !important; padding: 22px 10px !important;
            background: rgba(13,15,14,.98) !important;
            border-top: 0 !important; border-right: 1px solid rgba(91,65,43,.09) !important;
            backdrop-filter: blur(24px) !important;
          }
          .lurk-nav-button {
            flex: 0 0 auto !important; width: 100% !important; min-height: 72px !important;
            padding: 13px 4px !important; border-radius: 14px !important;
          }
          .lurk-nav-button:hover { background: rgba(91,65,43,.055) !important; }
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

        .lurk-play-hero button:hover { transform:translateY(-2px) !important; box-shadow:0 5px 0 rgba(139,57,31,.22) !important; }
        .lurk-home-screen > div:nth-child(3) button {
          min-height:126px !important;
          padding:17px 15px !important;
          border-radius:22px !important;
          border:1px solid #E9D9C5 !important;
          background:linear-gradient(145deg,#FFFCF7,#F5EBDD) !important;
          box-shadow:0 5px 0 #E7D5BE,0 10px 22px rgba(91,65,43,.07) !important;
        }
        .lurk-home-screen > div:nth-child(3) button > div:nth-child(2) {
          width:48px;height:48px;border-radius:17px;
          display:flex;align-items:center;justify-content:center;
          background:#FCE0D2;
          margin-bottom:11px;
          font-size:25px !important;
          opacity:1 !important;
          filter:saturate(1.12);
        }
        .lurk-home-screen > div:nth-child(3) button:nth-child(1) > div:nth-child(2) { background:#FCE0D2; }
        .lurk-home-screen > div:nth-child(3) button:nth-child(2) > div:nth-child(2) { background:#DCEBDD; }
        .lurk-home-screen > div:nth-child(3) button:nth-child(3) > div:nth-child(2) { background:#E5E0F5; }
        .lurk-home-screen > div:nth-child(3) button:nth-child(4) > div:nth-child(2) { background:#F8E8B9; }
        .lurk-home-screen > div:nth-child(3) button:nth-child(5) > div:nth-child(2) { background:#DCEAF4; }
        .lurk-home-screen > div:nth-child(3) button:nth-child(6) > div:nth-child(2) { background:#F5DFE5; }
        .lurk-home-screen > div:nth-child(3) button:hover { transform:translateY(-2px); }
        .lurk-home-screen > div:nth-child(3) button:active { transform:translateY(3px) !important; }
        @media(max-width:699px) {
          .lurk-play-hero > div { min-height:154px !important; }
          .lurk-play-hero button { right:11px !important; bottom:11px !important; }
        }

        /* LURK PLAYFUL / NINTENDO-INSPIRED THEME */
        body { background:#F7F1E7 !important; color:#302820 !important; }
        .lurk-app {
          color:#302820 !important;
          background:
            radial-gradient(ellipse at 8% 0%, rgba(243,107,63,.11), transparent 34%),
            radial-gradient(ellipse at 92% 14%, rgba(75,170,116,.09), transparent 28%),
            #F7F1E7 !important;
          font-family: Inter, "Arial Rounded MT Bold", ui-rounded, system-ui, sans-serif !important;
        }
        .lurk-app [style*="rgba(13,13,13"] {
          background:rgba(255,249,239,.97) !important;
          border-color:rgba(91,65,43,.12) !important;
          color:#302820 !important;
        }
        .lurk-app [style*="#090B0A"], .lurk-app [style*="#0D0F0E"],
        .lurk-app [style*="#171B18"], .lurk-app [style*="#1C1C1E"] {
          background:#FFF9EF !important;
          color:#302820 !important;
        }
        .lurk-app [style*="rgba(255,255,255"] {
          border-color:rgba(91,65,43,.13) !important;
        }
        .lurk-app input, .lurk-app select, .lurk-app textarea {
          background:#FFFCF6 !important;
          color:#302820 !important;
          border:1px solid #E5D7C5 !important;
          border-radius:13px !important;
        }
        .lurk-app input::placeholder { color:#A39789 !important; }
        .lurk-app button {
          border-radius:15px;
          font-family:inherit !important;
        }
        .lurk-home-screen > div:first-child {
          background:linear-gradient(135deg,#FFF9EF 0%,#F6EBDD 100%) !important;
          border-bottom:1px solid #E9DCCB !important;
        }
        .lurk-home-screen > div:nth-child(3) button {
          border:1px solid #E9D9C5 !important;
          border-radius:21px !important;
          background:linear-gradient(145deg,#FFFCF6,#F5EBDD) !important;
          box-shadow:0 5px 0 #E7D5BE,0 10px 22px rgba(91,65,43,.08) !important;
          transition:transform .16s ease,box-shadow .16s ease !important;
        }
        .lurk-home-screen > div:nth-child(3) button:active {
          transform:translateY(3px) !important;
          box-shadow:0 2px 0 #E7D5BE,0 5px 12px rgba(91,65,43,.07) !important;
        }
        .lurk-home-screen > div:nth-child(3) button > div:nth-child(2) {
          font-size:30px !important;
          opacity:1 !important;
          filter:saturate(1.15);
        }
        .lurk-home-stats > div {
          background:#FFFDF8 !important;
          border:1px solid #E9DCCB !important;
          box-shadow:0 3px 10px rgba(91,65,43,.045) !important;
        }
        .lurk-bottom-nav {
          background:rgba(255,249,239,.96) !important;
          border:1px solid #E7D8C6 !important;
          box-shadow:0 -5px 24px rgba(91,65,43,.09) !important;
          backdrop-filter:blur(22px) saturate(140%) !important;
        }
        .lurk-nav-button.is-active {
          background:#F7E8DA !important;
          box-shadow:inset 0 -3px 0 #F36B3F !important;
        }
        .lurk-nav-button.is-active span:first-child {
          width:36px;height:30px;border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          background:#FCE0D2;
          color:#D94D2B !important;
        }
        .lurk-nav-button.is-active span:last-child { color:#A94327 !important;font-weight:850 !important; }
        .lurk-nav-button:hover { background:#F4E8D9 !important; }
        .lurk-modal-backdrop { background:rgba(49,38,28,.35) !important; }
        .lurk-modal-panel {
          background:#FFF9EF !important;
          border:1px solid #E7D8C6 !important;
          box-shadow:0 22px 65px rgba(49,38,28,.2) !important;
        }
        .lurk-app [style*="linear-gradient(135deg,#F36B3F"] {
          color:#fff !important;
          box-shadow:0 4px 0 #D94D2B,0 8px 18px rgba(243,107,63,.18) !important;
        }
        @media (min-width:1000px) {
          .lurk-bottom-nav {
            background:rgba(255,249,239,.98) !important;
            border-right:1px solid #E7D8C6 !important;
            box-shadow:5px 0 24px rgba(91,65,43,.07) !important;
          }
        }


        /* STEP 1 · HORIZONTAL CONSOLE SHELL */
        html, body, #root { min-height:100%; }
        body { overflow-x:hidden; }
        .lurk-app {
          width:100% !important; min-height:100dvh !important;
          padding:0 0 82px !important; margin:0 !important;
          overflow-x:hidden !important; background:#E9E0D2 !important;
        }
        .lurk-screen:not(.lurk-order-screen) {
          width:100% !important; max-width:none !important;
          min-height:calc(100dvh - 82px); margin:0 !important;
        }
        .lurk-bottom-nav {
          position:fixed !important; left:0 !important; right:0 !important;
          top:auto !important; bottom:0 !important; transform:none !important;
          width:100% !important; max-width:none !important; height:76px !important;
          padding:7px max(12px,env(safe-area-inset-right)) calc(7px + env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left)) !important;
          display:flex !important; flex-direction:row !important; justify-content:center !important;
          gap:8px !important; border-radius:18px 18px 0 0 !important; z-index:80 !important;
        }
        .lurk-nav-button {
          flex:1 1 0 !important; width:auto !important; min-height:56px !important;
          max-width:190px !important; padding:7px 8px !important;
          display:flex !important; flex-direction:row !important;
          justify-content:center !important; align-items:center !important; gap:8px !important;
        }
        .lurk-nav-button span:first-child { font-size:21px !important; }
        .lurk-nav-button span:last-child { font-size:12px !important; white-space:nowrap; }
        .lurk-order-screen { width:100% !important; height:100dvh !important; min-height:100dvh !important; overflow:hidden !important; }
        .lurk-landscape-gate { display:none; }
        @media (max-width:760px) and (orientation:portrait) {
          .lurk-landscape-gate {
            position:fixed; inset:0; z-index:10000; display:flex;
            flex-direction:column; align-items:center; justify-content:center;
            gap:16px; padding:32px; text-align:center; color:#302820;
            background:linear-gradient(145deg,#FFF9EF,#F2E3D1);
          }
          .lurk-landscape-gate .gate-icon { font-size:54px; }
          .lurk-landscape-gate strong { font-size:23px; letter-spacing:-.6px; }
          .lurk-landscape-gate span { max-width:280px; font-size:14px; line-height:1.55; color:#75695E; }
        }
        @media (min-width:761px) {
          .lurk-app { padding-bottom:82px !important; padding-left:0 !important; }
          .lurk-bottom-nav { background:#FFF9EF !important; }
        }
        @media (orientation:landscape) and (max-height:520px) {
          .lurk-app { padding-bottom:68px !important; }
          .lurk-bottom-nav { height:64px !important; }
          .lurk-nav-button { min-height:48px !important; }
          .lurk-screen:not(.lurk-order-screen) { min-height:calc(100dvh - 68px); }
        }
      
        /* STEP 2 · LURK CONSOLE HOME */
        .lurk-console-home{min-height:calc(100dvh - 82px)!important;padding:clamp(18px,2.5vw,36px) clamp(18px,4vw,58px) 22px!important;display:flex;flex-direction:column;gap:clamp(16px,2.2vh,26px);background:radial-gradient(ellipse at 78% 24%,rgba(244,174,111,.24),transparent 30%),radial-gradient(ellipse at 12% 88%,rgba(143,177,137,.16),transparent 34%),linear-gradient(135deg,#F7F0E4,#F1E5D4)!important;overflow:hidden}
        .lurk-console-topbar{display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:48px}
        .lurk-console-brand{display:flex;align-items:center;gap:17px}.lurk-console-brand img{width:clamp(94px,10vw,142px);height:auto;display:block}.lurk-console-brand>span{font-size:10px;font-weight:900;letter-spacing:1.8px;color:#75695E;line-height:1.5;max-width:110px}
        .lurk-console-meta{display:flex;align-items:center;gap:16px;color:#5E5145;font-size:12px;font-weight:750}.lurk-console-clock{font-variant-numeric:tabular-nums;font-size:14px}
        .lurk-console-open{display:flex;align-items:center;gap:7px;padding:8px 13px;border:1px solid #E3D5C3;border-radius:99px;background:rgba(255,251,244,.76)}.lurk-console-open i{width:8px;height:8px;border-radius:50%;background:#A89B8D}.lurk-console-open.is-open i{background:#6FA36C;box-shadow:0 0 0 4px #DDEBDD}
        .lurk-console-stage{position:relative;isolation:isolate;min-height:clamp(190px,27vh,290px);border:1px solid rgba(111,79,51,.13);border-radius:27px;overflow:hidden;display:flex;align-items:center;padding:clamp(22px,4vw,48px);background:linear-gradient(105deg,#E9A36F,#F2C69B 48%,#E5CDA9);box-shadow:0 7px 0 #D8B18D,0 18px 38px rgba(91,65,43,.10)}
        .lurk-console-stage:before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(255,246,230,.94),rgba(255,246,230,.78) 44%,rgba(255,246,230,.04))}
        .lurk-console-stage:after{content:"";position:absolute;right:19%;top:-48%;width:360px;height:360px;border:1px solid rgba(255,255,255,.34);border-radius:50%;box-shadow:0 0 0 28px rgba(255,255,255,.08),0 0 0 58px rgba(255,255,255,.06);z-index:-1}
        .lurk-console-copy{position:relative;z-index:2;max-width:54%}.lurk-console-eyebrow{font-size:10px;letter-spacing:2px;font-weight:950;color:#9B4E31}.lurk-console-copy h1{font-size:clamp(28px,4.3vw,54px);line-height:.99;letter-spacing:-2.4px;color:#302820;margin:12px 0 10px;font-weight:950}.lurk-console-copy h1 em{font-style:normal;color:#C95C38}.lurk-console-copy p{font-size:clamp(11px,1.2vw,14px);color:#705B4A;margin:0;max-width:380px;line-height:1.5}
        .lurk-console-live{display:flex;align-items:center;gap:12px;margin-top:20px;font-size:11px;color:#725A47}.lurk-console-live b{font-size:13px;color:#302820}.lurk-console-live-dot{width:5px;height:5px;border-radius:50%;background:#C96A43}
        .lurk-console-art{position:absolute;right:4%;top:0;bottom:0;width:43%;display:flex;align-items:center;justify-content:center}.lurk-art-sun{position:absolute;width:clamp(130px,18vw,230px);aspect-ratio:1;border-radius:50%;background:linear-gradient(145deg,#F9E6B7,#E89B63);right:17%;top:5%;box-shadow:0 12px 40px rgba(160,92,48,.12)}.lurk-art-window{position:absolute;right:2%;bottom:0;width:42%;height:78%;border:9px solid rgba(110,75,50,.74);border-bottom:0;border-radius:12px 12px 0 0;background:linear-gradient(140deg,rgba(94,137,105,.75),rgba(209,179,119,.4));display:flex;justify-content:space-evenly;overflow:hidden}.lurk-art-window span{width:2px;height:100%;background:rgba(110,75,50,.6)}.lurk-art-plant{position:absolute;right:44%;bottom:8%;font-size:clamp(54px,8vw,100px);color:#567C51;text-shadow:0 8px 8px rgba(54,75,43,.16)}.lurk-art-cup{position:absolute;right:24%;bottom:4%;font-size:clamp(68px,10vw,122px);filter:drop-shadow(0 12px 7px rgba(70,45,25,.2))}.lurk-art-caption{position:absolute;right:0;top:13%;font-size:clamp(11px,1.4vw,17px);font-weight:950;letter-spacing:1.5px;line-height:1.08;color:#75472E;transform:rotate(5deg)}
        .lurk-console-launcher{display:flex;flex-direction:column;gap:15px}.lurk-console-section-title{display:flex;align-items:flex-end;justify-content:space-between;gap:16px}.lurk-console-section-title>div>span{font-size:9px;letter-spacing:1.8px;font-weight:950;color:#A16B4C}.lurk-console-section-title h2{margin:4px 0 0;font-size:clamp(18px,2vw,24px);letter-spacing:-.7px;color:#302820}.lurk-console-hint{font-size:11px;color:#8C7A69;font-weight:650}.lurk-console-hint b{color:#C95C38;font-size:17px;margin-left:5px}
        .lurk-console-apps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:clamp(9px,1.2vw,16px)}.lurk-console-app{position:relative;min-width:0;min-height:clamp(116px,17vh,164px);padding:15px 14px 13px;border:1px solid rgba(103,77,54,.15);border-radius:21px;background:linear-gradient(145deg,#FFFCF6,#F3E9DB);box-shadow:0 5px 0 #E2D2BE,0 11px 22px rgba(91,65,43,.07);display:flex;flex-direction:column;align-items:flex-start;text-align:left;cursor:pointer;color:#302820;transition:transform .16s ease,box-shadow .16s ease}.lurk-console-app:hover{transform:translateY(-4px);box-shadow:0 8px 0 #E2D2BE,0 15px 25px rgba(91,65,43,.10)}.lurk-console-app:active{transform:translateY(3px);box-shadow:0 2px 0 #E2D2BE}
        .lurk-console-app-icon{width:clamp(42px,4.2vw,58px);height:clamp(42px,4.2vw,58px);display:grid;place-items:center;border-radius:17px;font-size:clamp(23px,2.8vw,34px);background:#F9DFD0;margin-bottom:12px;box-shadow:inset 0 2px 0 rgba(255,255,255,.75)}.lurk-console-app-name{font-size:clamp(12px,1.2vw,15px);font-weight:900;letter-spacing:-.3px}.lurk-console-app-sub{font-size:clamp(9px,.9vw,11px);color:#89796A;margin-top:4px}.lurk-console-app-arrow{position:absolute;right:13px;top:13px;color:#A89582;font-size:15px}
        .lurk-console-app.is-primary{background:linear-gradient(145deg,#F47A4B,#E95F35);border:1px solid #D95731;box-shadow:0 5px 0 #C94D2C,0 12px 25px rgba(201,77,44,.18);color:#fff}.lurk-console-app.is-primary .lurk-console-app-icon{background:#FFE5D5}.lurk-console-app.is-primary .lurk-console-app-sub,.lurk-console-app.is-primary .lurk-console-app-arrow{color:rgba(255,255,255,.82)}
        .lurk-tone-sage .lurk-console-app-icon{background:#DCEBDD}.lurk-tone-butter .lurk-console-app-icon{background:#F7E9BD}.lurk-tone-lilac .lurk-console-app-icon{background:#E7E0F4}.lurk-tone-blue .lurk-console-app-icon{background:#DCEAF4}.lurk-tone-rose .lurk-console-app-icon{background:#F3DFE4}
        .lurk-console-footer{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:4px}.lurk-console-footer-note{display:flex;align-items:center;gap:9px;font-size:9px;font-weight:950;letter-spacing:1.7px;color:#9A826D}.lurk-footer-star{font-size:22px;color:#E38A52}.lurk-console-day-button{border:1px solid #E0CFBB;border-radius:13px;padding:10px 16px;background:#FFF9EF;color:#594737;font-size:11px;font-weight:850;cursor:pointer;box-shadow:0 3px 0 #E4D5C3}.lurk-console-day-button span{margin-right:8px;color:#C95C38}.lurk-console-day-button.is-closing{background:#F1E5D4}
        @media(max-width:1000px){.lurk-console-apps{grid-template-columns:repeat(3,minmax(0,1fr))}.lurk-console-stage{min-height:210px}.lurk-console-home{overflow:visible}}
        @media(max-width:760px){.lurk-console-home{padding:15px 14px 18px!important;gap:16px}.lurk-console-brand>span{display:none}.lurk-console-meta{gap:8px}.lurk-console-stage{min-height:190px;padding:20px;border-radius:21px}.lurk-console-copy{max-width:67%}.lurk-console-copy h1{letter-spacing:-1.4px}.lurk-console-art{right:-7%;width:48%;opacity:.86}.lurk-console-apps{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.lurk-console-app{min-height:118px}.lurk-console-hint{display:none}.lurk-console-footer-note{font-size:8px}}
        @media(max-height:650px) and (orientation:landscape){.lurk-console-home{gap:10px;padding-top:12px!important;padding-bottom:12px!important}.lurk-console-stage{min-height:150px;padding:18px 28px}.lurk-console-copy h1{font-size:clamp(24px,4vh,36px);margin:6px 0}.lurk-console-live{margin-top:10px}.lurk-console-apps{gap:9px}.lurk-console-app{min-height:98px;padding:10px}.lurk-console-app-icon{width:38px;height:38px;font-size:22px;margin-bottom:6px}}

        /* STEP 3 · THREE-PANEL ORDER TERMINAL */
        .lurk-pos-workspace{flex:1;min-height:0;display:grid;grid-template-columns:clamp(118px,13vw,178px) minmax(0,1fr) clamp(280px,29vw,390px);overflow:hidden;background:#F1E8DA}
        .lurk-pos-categories{min-width:0;overflow-y:auto;padding:18px 10px;background:#F8F1E6;border-right:1px solid #E4D8C8;display:flex;flex-direction:column;gap:7px}
        .lurk-pos-side-label,.lurk-pos-eyebrow{font-size:9px;font-weight:950;letter-spacing:1.6px;color:#A17A5B}
        .lurk-pos-side-label{padding:2px 10px 8px}
        .lurk-pos-category{width:100%;min-height:48px;display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid transparent;border-radius:13px;background:transparent;color:#62564A;font-size:11px;font-weight:750;text-align:left;cursor:pointer;transition:.15s}
        .lurk-pos-category-icon{width:29px;height:29px;flex:0 0 29px;border-radius:9px;background:#EEE2D2;display:grid;place-items:center;font-size:17px}
        .lurk-pos-category.is-selected{background:#F36B3F;color:#fff;border-color:#DF603B;box-shadow:0 3px 0 #D34F2D}
        .lurk-pos-category.is-selected .lurk-pos-category-icon{background:#FFE0CE}
        .lurk-pos-catalog{min-width:0;min-height:0;display:flex;flex-direction:column;overflow:hidden;padding:20px clamp(14px,2vw,26px)}
        .lurk-pos-catalog-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:16px;flex-shrink:0}
        .lurk-pos-catalog-head h2,.lurk-pos-ticket-head h2{margin:4px 0 0;color:#302820;font-size:clamp(18px,1.8vw,25px);letter-spacing:-.8px}
        .lurk-pos-search{display:flex;align-items:center;gap:8px;width:min(260px,45%);padding:9px 12px;border:1px solid #E1D4C4;border-radius:12px;background:#FFFBF5;color:#A18D79}
        .lurk-pos-search>span{font-size:20px}.lurk-pos-search input{width:100%;min-width:0;border:0;outline:0;background:transparent;color:#302820;font-size:12px}
        .lurk-pos-product-grid{min-height:0;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));align-content:start;gap:12px;padding:2px 5px 12px 2px}
        .lurk-pos-product{position:relative;min-width:0;min-height:158px;padding:12px 11px 11px;border:1px solid #E2D5C4;border-radius:17px;background:linear-gradient(145deg,#FFFCF6,#F4EBDD);box-shadow:0 4px 0 #E1D3C1,0 8px 16px rgba(82,60,39,.06);display:flex;flex-direction:column;align-items:center;text-align:center;color:#302820;cursor:pointer;transition:transform .14s,box-shadow .14s}
        .lurk-pos-product:hover{transform:translateY(-3px);box-shadow:0 7px 0 #E1D3C1,0 12px 20px rgba(82,60,39,.09)}
        .lurk-pos-product:active,.lurk-pos-product.is-flash{transform:translateY(2px);background:#FCE2D4;box-shadow:0 1px 0 #E1D3C1}
        .lurk-pos-product-art{width:100%;height:76px;display:grid;place-items:center;margin-bottom:8px;border-radius:11px;background:radial-gradient(circle at 50% 38%,#FFF8EA,#EEDFCB);font-size:47px;filter:drop-shadow(0 5px 3px rgba(74,49,28,.13))}
        .lurk-pos-product-name{font-size:11px;line-height:1.25;font-weight:850;min-height:28px;display:flex;align-items:center;justify-content:center}
        .lurk-pos-product-price{font-size:12px;font-weight:900;color:#C95C38;margin-top:5px}
        .lurk-pos-product-count{position:absolute;right:8px;top:8px;z-index:1;border-radius:30px;background:#F36B3F;color:white;padding:4px 7px;font-size:10px;font-weight:900}
        .lurk-pos-product-add{position:absolute;right:9px;bottom:9px;width:22px;height:22px;display:grid;place-items:center;border-radius:8px;background:#F5E0D1;color:#C95C38;font-size:17px;font-weight:900}
        .lurk-pos-empty{grid-column:1/-1;padding:40px;text-align:center;color:#958675;font-size:13px}
        .lurk-pos-ticket{min-width:0;min-height:0;display:flex;flex-direction:column;background:#FFFBF4;border-left:1px solid #E2D5C4;box-shadow:-8px 0 22px rgba(74,54,35,.035);overflow:hidden}
        .lurk-pos-ticket-head{padding:20px 18px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;border-bottom:1px solid #EEE4D7}
        .lurk-pos-ticket-head h2 small{font-size:12px;color:#A08F7C}
        .lurk-pos-guest{max-width:46%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:1px solid #E4D5C3;border-radius:10px;padding:8px 10px;background:#F7EFE4;color:#725F4D;font-size:10px;font-weight:800;cursor:pointer}
        .lurk-pos-ticket-table{display:grid;grid-template-columns:minmax(0,1fr) 38px 76px;gap:8px;padding:10px 17px;background:#F8F1E7;color:#958573;font-size:9px;font-weight:850;letter-spacing:.3px}
        .lurk-pos-ticket-table span:last-child{text-align:right}
        .lurk-pos-ticket-lines{flex:1;min-height:0;overflow-y:auto;padding:7px 15px}
        .lurk-pos-ticket-line{display:grid;grid-template-columns:minmax(0,1fr) 30px 76px;align-items:start;gap:8px;padding:12px 2px;border-bottom:1px solid #F0E7DC}
        .lurk-pos-line-info{min-width:0}.lurk-pos-line-info>b{display:block;font-size:11px;line-height:1.3;color:#3A3027;overflow-wrap:anywhere}.lurk-pos-line-info small{display:block;font-size:9px;color:#9A8977;margin-top:3px}
        .lurk-pos-qty{display:flex;align-items:center;gap:8px;margin-top:8px}.lurk-pos-qty button{width:23px;height:23px;border:1px solid #E8D8C7;border-radius:7px;background:#F7EEE3;color:#8C6149;font-size:15px;cursor:pointer}.lurk-pos-qty b{font-size:10px;min-width:10px;text-align:center}
        .lurk-pos-line-qty{padding-top:2px;text-align:center;font-size:11px;font-weight:850;color:#655648}.lurk-pos-line-total{text-align:right;padding-top:2px;font-size:10px;color:#493B2E;white-space:nowrap}
        .lurk-pos-ticket-empty{height:100%;min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;color:#8D7B69}.lurk-pos-ticket-empty span{font-size:42px}.lurk-pos-ticket-empty b{font-size:12px;color:#5D4D3E}.lurk-pos-ticket-empty small{font-size:10px}
        .lurk-pos-ticket-bottom{padding:12px 16px 14px;border-top:1px solid #EDE2D5;background:#FFF9F0}
        .lurk-pos-ticket-count{display:flex;align-items:center;gap:7px;margin-bottom:12px;color:#8B7B69;font-size:10px}.lurk-pos-ticket-count span{margin-right:auto}.lurk-pos-ticket-count button{border:1px solid #E6D8C7;border-radius:8px;background:#F8F0E5;padding:6px 8px;color:#75624F;font-size:9px;font-weight:750;cursor:pointer}.lurk-pos-ticket-count button:disabled{opacity:.4;cursor:not-allowed}
        .lurk-pos-grand-total{display:flex;align-items:center;justify-content:space-between;margin:5px 0 12px;color:#4C3D30;font-size:13px;font-weight:800}.lurk-pos-grand-total b{font-size:clamp(19px,2vw,26px);letter-spacing:-.7px;color:#302820}
        .lurk-pos-checkout{width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border:0;border-radius:13px;background:linear-gradient(135deg,#F5794A,#E85D35);box-shadow:0 4px 0 #CA4F2D,0 9px 18px rgba(201,77,44,.16);color:white;font-size:14px;font-weight:900;cursor:pointer}.lurk-pos-checkout b{font-size:20px}.lurk-pos-checkout:disabled{opacity:.42;cursor:not-allowed;box-shadow:none}
        .lurk-pos-back-tables{width:100%;padding:10px 4px 0;border:0;background:transparent;color:#9B8977;font-size:10px;font-weight:750;cursor:pointer}
        @media(max-width:900px){.lurk-pos-workspace{grid-template-columns:96px minmax(0,1fr) 270px}.lurk-pos-categories{padding:12px 7px}.lurk-pos-category{padding:7px 6px;gap:6px;font-size:10px}.lurk-pos-product-grid{grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px}.lurk-pos-product{min-height:140px}.lurk-pos-product-art{height:62px;font-size:40px}}
        @media(max-width:650px) and (orientation:landscape){.lurk-pos-workspace{grid-template-columns:82px minmax(0,1fr) 245px}.lurk-pos-catalog{padding:12px 10px}.lurk-pos-ticket-head{padding:12px}.lurk-pos-ticket-bottom{padding:9px 11px}.lurk-pos-product-grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}}

/* STEP 4 · ILLUSTRATED FLOOR PLAN */
.lurk-tables-screen{min-height:calc(100dvh - 82px)!important;background:radial-gradient(ellipse at 88% 12%,rgba(237,190,144,.18),transparent 30%),#F5EEE3!important}
.lurk-floor-topbar{padding:22px clamp(18px,3vw,42px) 18px;display:flex;align-items:center;gap:12px;background:rgba(255,250,242,.94);border-bottom:1px solid #E8DCCB}
.lurk-floor-heading{flex:1}.lurk-floor-heading>div{margin-top:5px}.lurk-floor-heading small{display:block;margin-top:4px;color:#8D7B69;font-size:11px}
.lurk-floor-topbar>button{border-radius:12px!important;padding:10px 15px!important;font-weight:850!important;box-shadow:0 3px 0 rgba(91,65,43,.08)}
.lurk-floor-content{padding:clamp(16px,2.4vw,32px) clamp(18px,3vw,42px) 30px}
.lurk-floor-overview{display:grid;grid-template-columns:repeat(3,minmax(110px,1fr)) minmax(180px,1.5fr);gap:12px;margin-bottom:28px}
.lurk-floor-stat,.lurk-floor-total{min-height:78px;border:1px solid #E6D9C8;border-radius:17px;background:#FFFAF3;display:flex;align-items:center;gap:12px;padding:13px 16px;box-shadow:0 4px 0 #E8DCCB}
.lurk-floor-stat .stat-icon{width:38px;height:38px;display:grid;place-items:center;border-radius:12px;background:#F2E5D6;color:#C76B45;font-size:20px}
.lurk-floor-stat.is-active .stat-icon{background:#FCE2D4;color:#E36B43;font-size:15px}
.lurk-floor-stat b,.lurk-floor-total b{display:block;font-size:23px;line-height:1;font-weight:950;color:#302820;font-variant-numeric:tabular-nums}
.lurk-floor-stat small,.lurk-floor-total small{display:block;margin-top:5px;font-size:10px;color:#8D7B69;font-weight:700}
.lurk-floor-total{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:3px;background:linear-gradient(110deg,#F9E5D4,#FFF8EC)}
.lurk-floor-total b{font-size:clamp(19px,2vw,25px);color:#C95C38}
.lurk-floor-section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:15px}
.lurk-floor-section-head>div span{display:block;font-size:9px;letter-spacing:1.8px;color:#A17A5B;font-weight:950}
.lurk-floor-section-head>div b{display:block;margin-top:4px;font-size:20px;letter-spacing:-.5px;color:#302820}
.lurk-floor-section-head>small{font-size:10px;color:#968572}
.lurk-floor-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:16px}
.lurk-floor-table{position:relative;min-height:174px;padding:17px;border:1px solid #E5D8C7;border-radius:21px;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 5px 0 #E4D7C6,0 12px 24px rgba(83,60,38,.055);transition:transform .16s,box-shadow .16s}
.lurk-floor-table:before{content:"";position:absolute;right:-27px;top:-40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.36)}
.lurk-floor-table.is-occupied{background:linear-gradient(145deg,#FFF0E5,#FCE4D5);border-color:#EFCAB6}.lurk-floor-table.is-free{background:linear-gradient(145deg,#FFFDF8,#F2EBDD)}
.lurk-floor-table-head{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px}
.lurk-floor-table-name{display:flex;align-items:center;gap:11px;min-width:0}.lurk-floor-chair{width:43px;height:43px;flex:0 0 43px;border-radius:14px;display:grid;place-items:center;background:rgba(255,255,255,.7);color:#A66A4B;font-size:24px}
.lurk-floor-table-name b{display:block;font-size:15px;font-weight:950;color:#302820}.lurk-floor-table-name small{display:block;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:4px;font-size:10px;color:#897765}
.lurk-floor-table-head>button{position:relative;z-index:2;background:rgba(255,255,255,.52)!important;border-radius:8px!important;padding:3px 7px!important}
.lurk-floor-table-status{position:relative;z-index:1;display:flex;align-items:center;gap:7px;min-height:29px;margin-bottom:13px;font-size:13px;font-weight:900;color:#B65A39}.lurk-floor-table.is-free .lurk-floor-table-status{color:#948675}
.lurk-floor-table-action{position:relative;z-index:1;width:100%;padding:11px 12px;border:1px solid #E5D7C6;border-radius:12px;background:#F1E7D9;color:#5F4D3D;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 3px 0 rgba(104,77,53,.08);transition:.14s}
.lurk-floor-table.is-occupied .lurk-floor-table-action{border-color:#E96740;background:linear-gradient(120deg,#F47A4B,#E85D35);color:#fff;box-shadow:0 3px 0 #CF5532}
.lurk-floor-table-action:active{transform:translateY(2px);box-shadow:none}
@media(max-width:850px){.lurk-floor-overview{grid-template-columns:repeat(2,minmax(0,1fr))}.lurk-floor-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}}
@media(max-width:560px){.lurk-floor-topbar{padding:15px 13px;flex-wrap:wrap}.lurk-floor-heading{min-width:100%;margin-bottom:4px}.lurk-floor-content{padding:13px}.lurk-floor-overview{gap:8px;margin-bottom:20px}.lurk-floor-stat,.lurk-floor-total{padding:10px;min-height:68px}.lurk-floor-stat .stat-icon{width:30px;height:30px}.lurk-floor-stat b{font-size:19px}.lurk-floor-total b{font-size:18px}.lurk-floor-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.lurk-floor-table{padding:12px;min-height:155px}.lurk-floor-chair{width:34px;height:34px;flex-basis:34px;font-size:19px}.lurk-floor-table-name b{font-size:13px}}
@media(max-height:600px) and (orientation:landscape){.lurk-floor-content{padding-top:12px}.lurk-floor-overview{margin-bottom:14px}.lurk-floor-stat,.lurk-floor-total{min-height:60px}.lurk-floor-table{min-height:145px}}
`}
.lurk-catalog-screen{background:#F4EBDD!important;min-height:100%;color:#302820}
.lurk-catalog-topbar{display:flex;align-items:center;gap:18px;padding:22px 28px;background:#FFF9EF;border-bottom:1px solid #E9DDCE;position:sticky;top:0;z-index:5}
.lurk-catalog-back{width:38px;height:38px;border:1px solid #E8DCCD;border-radius:11px;background:#F5EBDD;color:#725D4A;font-size:21px;cursor:pointer}
.lurk-catalog-heading{flex:1}.lurk-catalog-heading>span,.lurk-catalog-eyebrow{font-size:9px;letter-spacing:1.8px;font-weight:900;color:#C66A45}.lurk-catalog-heading h1{font-size:25px;letter-spacing:-1px;margin:4px 0;color:#302820}.lurk-catalog-heading p{font-size:12px;color:#8A7A68;margin:0}
.lurk-catalog-top-actions{display:flex;align-items:center;gap:16px}.lurk-catalog-live{font-size:11px;font-weight:800;color:#786B5D;white-space:nowrap}.lurk-catalog-live i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#6E9A68;margin-right:5px}
.lurk-catalog-add{border:0;border-radius:10px;background:#F36B3F;color:#fff;padding:12px 17px;font-size:12px;font-weight:900;cursor:pointer;box-shadow:0 4px 0 #D65331}
.lurk-catalog-workspace{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:calc(100vh - 90px)}
.lurk-catalog-sidebar{padding:25px 15px;background:#F8F0E5;border-right:1px solid #E8DCCD}.lurk-catalog-side-label{font-size:9px;letter-spacing:1.5px;font-weight:900;color:#A18E79;margin:0 10px 13px}
.lurk-catalog-category{display:flex;align-items:center;gap:10px;width:100%;padding:12px 11px;border:0;border-radius:10px;background:transparent;color:#6F6255;text-align:left;cursor:pointer;margin-bottom:4px}.lurk-catalog-category>span{font-size:17px;width:22px}.lurk-catalog-category b{font-size:12px;flex:1}.lurk-catalog-category small{font-size:10px;color:#A99A89}.lurk-catalog-category.active{background:#FBE0D2;color:#B84D2D;box-shadow:inset 3px 0 #F36B3F}
.lurk-catalog-side-note{margin:34px 8px 0;padding:15px 13px;border-radius:13px;background:#EFE2D1;border:1px solid #E6D5C0}.lurk-catalog-side-note>b{display:block;font-size:9px;letter-spacing:1.2px;color:#9A826B}.lurk-catalog-side-note strong{display:block;font-size:27px;color:#4B3B2D;margin:7px 0 2px}.lurk-catalog-side-note strong small{font-size:13px;color:#A18E79}.lurk-catalog-side-note>span{font-size:10px;color:#8A7967}
.lurk-catalog-main{padding:26px 30px 40px;min-width:0}.lurk-catalog-toolbar{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:22px}.lurk-catalog-toolbar h2{font-size:23px;letter-spacing:-.7px;margin:4px 0;color:#352A20}.lurk-catalog-toolbar p{font-size:11px;color:#958573;margin:0}.lurk-catalog-search{width:min(280px,40%);height:42px;display:flex;align-items:center;gap:9px;padding:0 13px;border:1px solid #E5D7C7;border-radius:10px;background:#FFF9EF;color:#A18E79}.lurk-catalog-search>span{font-size:23px}.lurk-catalog-search input{width:100%;border:0!important;outline:0;background:transparent;color:#3D3025;font-size:12px;box-shadow:none!important}
.lurk-catalog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:16px}.lurk-catalog-product{overflow:hidden;border:1px solid #E7D9C8;border-radius:15px;background:#FFF9EF;box-shadow:0 4px 12px rgba(86,62,40,.045);min-width:0}.lurk-catalog-product-art{height:118px;display:flex;align-items:center;justify-content:center;position:relative;background:linear-gradient(145deg,#F5E5D3,#EAD4BB);overflow:hidden}.lurk-catalog-product-art:after{content:"";position:absolute;width:140px;height:140px;border:1px solid rgba(150,104,67,.13);border-radius:50%;box-shadow:0 0 0 18px rgba(255,255,255,.12),0 0 0 38px rgba(255,255,255,.1)}.lurk-catalog-product-art>span{font-size:43px;filter:drop-shadow(0 5px 3px rgba(82,57,36,.13));z-index:1}.lurk-catalog-product-art>small{position:absolute;bottom:9px;left:11px;font-size:8px;font-weight:900;letter-spacing:1px;color:#8A7059;z-index:1;text-transform:uppercase}.lurk-catalog-product-body{padding:13px}.lurk-catalog-product-title{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;min-height:35px}.lurk-catalog-product-title h3{font-size:13px;line-height:1.3;margin:0;color:#392D22}.lurk-catalog-state{font-size:8px;font-weight:900;letter-spacing:.5px;color:#A39788;background:#F0E8DE;padding:5px 6px;border-radius:5px;white-space:nowrap}.lurk-catalog-state.on{color:#5C8757;background:#E8F0E3}.lurk-catalog-product-bottom{display:flex;align-items:center;justify-content:space-between;margin:11px 0 12px}.lurk-catalog-product-bottom strong{font-size:16px;color:#C85B36}.lurk-catalog-product-bottom button{border:1px solid #E8D9C8;border-radius:7px;background:#F8F0E6;padding:7px 9px;color:#715B46;font-size:10px;font-weight:800;cursor:pointer}.lurk-catalog-product-bottom button span{margin-left:4px}.lurk-catalog-toggle{display:flex;align-items:center;gap:7px;border:0;background:transparent;padding:2px 0;color:#A09588;font-size:10px;font-weight:700;cursor:pointer}.lurk-catalog-toggle i{width:22px;height:12px;border-radius:10px;background:#C9BFB2;position:relative}.lurk-catalog-toggle i:after{content:"";position:absolute;width:8px;height:8px;left:2px;top:2px;border-radius:50%;background:white;transition:.15s}.lurk-catalog-toggle.on{color:#68865F}.lurk-catalog-toggle.on i{background:#79A16D}.lurk-catalog-toggle.on i:after{left:12px}.lurk-catalog-product.is-off{opacity:.7}.lurk-catalog-empty{grid-column:1/-1;padding:60px 20px;text-align:center;color:#948573}.lurk-catalog-empty>span{font-size:36px}.lurk-catalog-empty b{display:block;margin:10px 0;color:#514131}.lurk-catalog-empty p{font-size:12px}
@media(max-width:800px){.lurk-catalog-topbar{padding:16px;gap:11px;flex-wrap:wrap}.lurk-catalog-heading h1{font-size:21px}.lurk-catalog-top-actions{width:100%;justify-content:space-between;padding-left:49px}.lurk-catalog-workspace{grid-template-columns:1fr}.lurk-catalog-sidebar{display:flex;gap:6px;overflow-x:auto;padding:10px 13px;border-right:0;border-bottom:1px solid #E8DCCD}.lurk-catalog-side-label,.lurk-catalog-side-note{display:none}.lurk-catalog-category{width:auto;flex:0 0 auto;margin:0;padding:9px 12px}.lurk-catalog-category b{white-space:nowrap}.lurk-catalog-main{padding:19px 15px 30px}.lurk-catalog-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.lurk-catalog-product-art{height:100px}.lurk-catalog-product-body{padding:10px}.lurk-catalog-product-title h3{font-size:12px}}
@media(max-width:430px){.lurk-catalog-toolbar{align-items:stretch;flex-direction:column}.lurk-catalog-search{width:100%}.lurk-catalog-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lurk-catalog-product-art{height:88px}}
@media(orientation:landscape) and (max-height:650px){.lurk-catalog-topbar{padding:12px 22px}.lurk-catalog-heading h1{font-size:21px}.lurk-catalog-workspace{min-height:calc(100vh - 68px)}.lurk-catalog-main{padding-top:17px}.lurk-catalog-product-art{height:92px}.lurk-catalog-grid{grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:12px}}

.lurk-crm-screen{min-height:100%;background:#F4EBDD!important;color:#34291F}
.lurk-crm-header{display:flex;align-items:center;gap:18px;padding:22px 28px;background:#FFF9EF;border-bottom:1px solid #E9DDCE;position:sticky;top:0;z-index:5}
.lurk-crm-back{width:38px;height:38px;border:1px solid #E8DCCD;border-radius:11px;background:#F5EBDD;color:#725D4A;font-size:21px;cursor:pointer}
.lurk-crm-title{flex:1}.lurk-crm-title>span,.lurk-crm-directory-head>div:first-child>span{font-size:9px;letter-spacing:1.8px;font-weight:900;color:#C66A45}.lurk-crm-title h1{font-size:25px;letter-spacing:-1px;margin:4px 0;color:#302820}.lurk-crm-title p{font-size:12px;color:#8A7A68;margin:0}
.lurk-crm-add{border:0;border-radius:10px;background:#F36B3F;color:#fff;padding:12px 17px;font-size:12px;font-weight:900;cursor:pointer;box-shadow:0 4px 0 #D65331}
.lurk-crm-content{padding:25px 28px 40px;max-width:1500px;margin:auto}.lurk-crm-overview{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-bottom:27px}.lurk-crm-stat{padding:18px 20px;border:1px solid #E6D8C7;border-radius:14px;background:#FFF9EF;min-height:115px;box-shadow:0 4px 12px rgba(86,62,40,.035)}.lurk-crm-stat.featured{background:#FBE2D3;border-color:#F1C9B3}.lurk-crm-stat>span{display:block;font-size:9px;letter-spacing:1.4px;font-weight:900;color:#9B8068}.lurk-crm-stat>b{display:block;font-size:27px;letter-spacing:-.8px;color:#3B2E23;margin:8px 0 3px}.lurk-crm-stat.featured>b{color:#C85B36}.lurk-crm-stat>small{font-size:10px;color:#958371}
.lurk-crm-directory{border:1px solid #E7D9C8;border-radius:15px;background:#FFF9EF;overflow:hidden;box-shadow:0 5px 18px rgba(86,62,40,.04)}.lurk-crm-directory-head{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 22px;border-bottom:1px solid #EDE2D5}.lurk-crm-directory-head h2{font-size:21px;letter-spacing:-.6px;margin:4px 0;color:#392D22}.lurk-crm-directory-head p{font-size:10px;color:#958573;margin:0}.lurk-crm-tools{display:flex;gap:9px;align-items:center}.lurk-crm-search{width:250px;height:40px;display:flex;align-items:center;gap:8px;padding:0 11px;border:1px solid #E5D7C7;border-radius:9px;background:#FBF5EC;color:#A18E79}.lurk-crm-search>span{font-size:22px}.lurk-crm-search input{width:100%;border:0!important;outline:0;background:transparent;color:#3D3025;font-size:11px;box-shadow:none!important}.lurk-crm-tools select{max-width:160px;height:40px;padding:0 10px;border:1px solid #E5D7C7;border-radius:9px;background:#FBF5EC;color:#665342;font-size:10px}
.lurk-crm-table-head,.lurk-crm-row{display:grid;grid-template-columns:minmax(220px,2fr) .7fr 1fr 1fr 1.15fr;align-items:center;gap:14px;padding:12px 22px}.lurk-crm-table-head{background:#F8F0E6;color:#9B8A77;font-size:8px;font-weight:900;letter-spacing:1.1px}.lurk-crm-row{min-height:76px;border-top:1px solid #F0E7DC}.lurk-crm-guest{display:flex;align-items:center;gap:11px;text-align:left;border:0;background:transparent;padding:0;cursor:pointer;color:#3D3025;min-width:0}.lurk-crm-avatar{width:38px;height:38px;display:grid;place-items:center;flex:0 0 38px;border-radius:12px;background:#FBE0D2;border:1px solid #F1C9B3;color:#B95735;font-size:11px;font-weight:900}.lurk-crm-guest b,.lurk-crm-guest small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lurk-crm-guest b{font-size:12px}.lurk-crm-guest small{font-size:9px;color:#9B8A77;margin-top:4px}.lurk-crm-orders b,.lurk-crm-orders small{display:block}.lurk-crm-orders b{font-size:14px;color:#4A3A2C}.lurk-crm-orders small{font-size:9px;color:#9B8A77;margin-top:2px}.lurk-crm-total,.lurk-crm-month{font-size:12px;color:#574535}.lurk-crm-month{color:#C15D38}.lurk-crm-actions{display:flex;gap:6px}.lurk-crm-actions button{padding:7px 9px;border:1px solid #E8D9C8;border-radius:7px;background:#F8F0E6;color:#725B45;font-size:9px;font-weight:800;cursor:pointer}.lurk-crm-actions button:first-child{background:#FBE4D7;border-color:#F0CCB8;color:#B95735}
.lurk-crm-empty{padding:60px 20px;text-align:center;color:#958573}.lurk-crm-empty>span{font-size:35px}.lurk-crm-empty b{display:block;margin:9px 0 5px;color:#514131}.lurk-crm-empty p{font-size:11px}.lurk-crm-empty button{padding:10px 14px;border:0;border-radius:9px;background:#F36B3F;color:white;font-weight:800}
@media(max-width:850px){.lurk-crm-header{padding:16px}.lurk-crm-content{padding:17px 14px}.lurk-crm-overview{gap:8px}.lurk-crm-stat{padding:13px;min-height:98px}.lurk-crm-stat>b{font-size:21px}.lurk-crm-directory-head{align-items:stretch;flex-direction:column;padding:16px}.lurk-crm-tools{width:100%}.lurk-crm-search{flex:1;width:auto}.lurk-crm-table-wrap{overflow-x:auto}.lurk-crm-table-head,.lurk-crm-row{min-width:760px;padding-left:16px;padding-right:16px}}
@media(max-width:480px){.lurk-crm-title h1{font-size:20px}.lurk-crm-title p{font-size:10px}.lurk-crm-add{padding:10px 11px;font-size:10px}.lurk-crm-overview{grid-template-columns:1fr 1fr}.lurk-crm-stat:last-child{grid-column:1/-1}.lurk-crm-stat:last-child>b{font-size:20px}}
@media(orientation:landscape) and (max-height:650px){.lurk-crm-header{padding:12px 22px}.lurk-crm-content{padding-top:15px}.lurk-crm-overview{margin-bottom:16px}.lurk-crm-stat{min-height:86px;padding:12px 16px}.lurk-crm-stat>b{font-size:22px}.lurk-crm-row{min-height:64px}}

.lurk-analytics-screen{min-height:100%;background:#F4EBDD!important;color:#34291F}
.lurk-analytics-header{display:flex;align-items:center;gap:18px;padding:22px 28px;background:#FFF9EF;border-bottom:1px solid #E9DDCE;position:sticky;top:0;z-index:5}.lurk-analytics-header>button:first-child{width:38px;height:38px;border:1px solid #E8DCCD;border-radius:11px;background:#F5EBDD;color:#725D4A;font-size:21px;cursor:pointer}.lurk-analytics-header>div{flex:1}.lurk-analytics-header span,.lurk-analytics-period>div:first-child>span,.lurk-analytics-panel-head span{font-size:9px;letter-spacing:1.6px;font-weight:900;color:#C66A45}.lurk-analytics-header h1{font-size:25px;letter-spacing:-1px;margin:4px 0;color:#302820}.lurk-analytics-header p{font-size:12px;color:#8A7A68;margin:0}.lurk-analytics-export{border:0;border-radius:10px;background:#F36B3F;color:#fff;padding:12px 16px;font-size:11px;font-weight:900;cursor:pointer}
.lurk-analytics-content{max-width:1500px;margin:auto;padding:22px 28px 40px}.lurk-analytics-period{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:18px}.lurk-analytics-period>div:first-child>b{display:block;margin-top:5px;font-size:16px;text-transform:capitalize;color:#3B2E23}.lurk-analytics-months{display:flex;gap:6px;overflow-x:auto}.lurk-analytics-months button{white-space:nowrap;padding:8px 12px;border:1px solid #E5D7C7;border-radius:8px;background:#FFF9EF;color:#806E5C;font-size:10px;font-weight:800;cursor:pointer}.lurk-analytics-months button.active{background:#FBE0D2;border-color:#F1C9B3;color:#B95735}
.lurk-analytics-kpis{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:11px;margin-bottom:17px}.lurk-analytics-kpis article{position:relative;padding:16px;border:1px solid #E6D8C7;border-radius:13px;background:#FFF9EF;min-width:0}.lurk-analytics-kpis article.primary{background:#FBE2D3;border-color:#F1C9B3}.lurk-analytics-kpis article>span{display:block;font-size:8px;letter-spacing:1.2px;font-weight:900;color:#9B8068}.lurk-analytics-kpis article>b{display:block;font-size:clamp(15px,1.5vw,23px);letter-spacing:-.7px;color:#3B2E23;margin:10px 0 5px;white-space:nowrap}.lurk-analytics-kpis article.primary>b{color:#C85B36}.lurk-analytics-kpis article>small{font-size:9px;color:#958371}.lurk-analytics-kpis article>i{position:absolute;right:14px;top:11px;font-style:normal;color:#D87954}
.lurk-analytics-panels{display:grid;grid-template-columns:1.35fr 1fr;gap:14px;align-items:stretch}.lurk-analytics-panel{padding:18px 19px;border:1px solid #E7D9C8;border-radius:14px;background:#FFF9EF;box-shadow:0 4px 14px rgba(86,62,40,.035);min-width:0}.lurk-analytics-panel-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px}.lurk-analytics-panel-head h2{font-size:17px;letter-spacing:-.4px;color:#392D22;margin:4px 0 0}.lurk-analytics-panel-head>small{font-size:9px;color:#9B8A77}
.lurk-analytics-bars{height:190px;display:flex;align-items:stretch;gap:7px;overflow-x:auto;padding:5px 2px 0}.lurk-analytics-bar-col{flex:1;min-width:32px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:7px}.lurk-analytics-bar-value{font-size:8px;color:#9B8A77;white-space:nowrap}.lurk-analytics-bar-track{height:125px;width:min(27px,75%);display:flex;align-items:flex-end;background:#F3E9DD;border-radius:6px 6px 3px 3px;overflow:hidden}.lurk-analytics-bar-track i{display:block;width:100%;min-height:3px;background:linear-gradient(180deg,#F58A62,#E85E36);border-radius:6px 6px 2px 2px}.lurk-analytics-bar-col>small{font-size:8px;color:#9B8A77;white-space:nowrap}
.lurk-analytics-payment{display:flex;align-items:center;justify-content:space-around;gap:15px;min-height:170px}.lurk-analytics-donut{width:138px;height:138px;border-radius:50%;display:grid;place-items:center;flex:0 0 auto}.lurk-analytics-donut>div{width:94px;height:94px;border-radius:50%;background:#FFF9EF;display:flex;flex-direction:column;align-items:center;justify-content:center}.lurk-analytics-donut b{font-size:20px;color:#3B2E23}.lurk-analytics-donut small{font-size:9px;color:#9B8A77}.lurk-analytics-legend{display:grid;gap:13px;min-width:0}.lurk-analytics-legend>div{display:grid;grid-template-columns:9px auto;gap:5px 8px;align-items:center;font-size:10px;color:#806E5C}.lurk-analytics-legend i{width:8px;height:8px;border-radius:3px}.lurk-analytics-legend i.cash{background:#F36B3F}.lurk-analytics-legend i.card{background:#D9C9B6}.lurk-analytics-legend b{grid-column:2;font-size:11px;color:#3B2E23}
.lurk-analytics-item{display:grid;grid-template-columns:27px minmax(0,1fr) auto;align-items:center;gap:9px;margin:14px 0}.lurk-analytics-item .rank{font-size:10px;color:#C66A45;font-weight:900}.lurk-analytics-item>div>b{font-size:11px;color:#4B3B2D}.lurk-analytics-item>div{min-width:0}.lurk-analytics-item-track{height:5px;background:#F0E6DA;border-radius:9px;margin-top:7px;overflow:hidden}.lurk-analytics-item-track i{height:100%;display:block;background:#E77A50;border-radius:9px}.lurk-analytics-item>strong{font-size:10px;color:#8A7967;white-space:nowrap}
.lurk-analytics-day{border-top:1px solid #F0E7DC}.lurk-analytics-day>button{display:flex;align-items:center;gap:12px;width:100%;padding:12px 0;border:0;background:transparent;text-align:left;cursor:pointer}.lurk-analytics-day>button>span{flex:1}.lurk-analytics-day>button b,.lurk-analytics-day>button small{display:block}.lurk-analytics-day>button b{font-size:11px;color:#4A3A2C}.lurk-analytics-day>button small{font-size:9px;color:#9B8A77;margin-top:4px}.lurk-analytics-day>button strong{font-size:11px;color:#C15D38}.lurk-analytics-day>button i{font-style:normal;color:#A18E79}.lurk-analytics-order{display:flex;justify-content:space-between;padding:8px 12px;border-top:1px solid #F2EADF;background:#FBF5EC;font-size:10px;color:#776451}.lurk-analytics-order b{color:#4A3A2C}.lurk-analytics-empty{padding:35px 15px;text-align:center;font-size:11px;color:#9B8A77;background:#FBF5EC;border-radius:9px}
@media(max-width:1000px){.lurk-analytics-kpis{grid-template-columns:repeat(3,minmax(0,1fr))}.lurk-analytics-panels{grid-template-columns:1fr 1fr}}
@media(max-width:700px){.lurk-analytics-header{padding:15px;gap:10px}.lurk-analytics-header h1{font-size:21px}.lurk-analytics-header p{font-size:10px}.lurk-analytics-export{padding:10px;font-size:9px}.lurk-analytics-content{padding:16px 13px 30px}.lurk-analytics-period{align-items:flex-start;flex-direction:column}.lurk-analytics-months{max-width:100%}.lurk-analytics-kpis{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.lurk-analytics-panels{grid-template-columns:1fr}.lurk-analytics-payment{justify-content:center}}
@media(orientation:landscape) and (max-height:650px){.lurk-analytics-header{padding:11px 20px}.lurk-analytics-content{padding-top:14px}.lurk-analytics-kpis article{padding:12px}.lurk-analytics-panels{grid-template-columns:1.2fr 1fr}.lurk-analytics-bars{height:145px}}

.lurk-settings-v2{min-height:100%;background:#F7F1E7;color:#302820}
.lurk-settings-header{display:flex;align-items:center;gap:18px;padding:22px 4.2%;background:#FFF9EF;border-bottom:1px solid rgba(91,65,43,.1)}
.lurk-settings-header>button{width:42px;height:42px;border:1px solid #E9DDCE;border-radius:13px;background:#F7F1E7;color:#655343;font-size:24px;cursor:pointer}
.lurk-settings-header>div:nth-child(2){flex:1}.lurk-settings-header span,.lurk-settings-eyebrow{font-size:9px;font-weight:850;letter-spacing:1.6px;color:#A18A73}
.lurk-settings-header h1{font-size:25px;letter-spacing:-.8px;margin:4px 0 2px}.lurk-settings-header p{font-size:11px;color:#897968;margin:0}
.lurk-settings-mark{width:46px;height:46px;border-radius:15px;background:#F36B3F;color:white;display:grid;place-items:center;font-family:Georgia,serif;font-size:27px;font-weight:bold}
.lurk-settings-layout{display:grid;grid-template-columns:230px minmax(0,1fr);gap:28px;padding:28px 4.2%;max-width:1500px;margin:auto}
.lurk-settings-rail{display:flex;flex-direction:column;gap:12px}.lurk-settings-railitem{display:flex;align-items:center;gap:12px;padding:14px;border:1px solid #E9DDCE;border-radius:13px;background:#FFF9EF;color:#554638;text-align:left;cursor:pointer}
.lurk-settings-railitem.active{background:#FBE5D8;border-color:#F1C6B2}.lurk-settings-railitem>b{font-size:10px;color:#D66A43}.lurk-settings-railitem span{font-size:12px;font-weight:800;flex:1}.lurk-settings-railitem small{display:block;font-size:10px;color:#9A8875;font-weight:500;margin-top:3px}.lurk-settings-railitem i{font-style:normal;color:#D66A43}
.lurk-settings-note{margin-top:auto;padding:18px;border-radius:14px;background:#EEE3D4;display:grid;gap:8px}.lurk-settings-note>span{font-size:22px;color:#D66A43}.lurk-settings-note b{font-size:12px}.lurk-settings-note small{font-size:10px;line-height:1.6;color:#847361}
.lurk-settings-main{min-width:0}.lurk-settings-overview{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:20px}.lurk-settings-overview h2,.lurk-settings-sectionhead h2{font-size:21px;letter-spacing:-.6px;margin:6px 0}.lurk-settings-overview p{font-size:11px;color:#897968;margin:0}.lurk-settings-live{padding:9px 12px;border-radius:30px;background:#E6F0E3;color:#52744B;font-size:9px;font-weight:850;letter-spacing:.6px;white-space:nowrap}.lurk-settings-live i{display:inline-block;width:6px;height:6px;background:#6E9C62;border-radius:50%;margin-right:6px}
.lurk-settings-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:28px}.lurk-settings-stats article{padding:16px;border:1px solid #E9DDCE;border-radius:13px;background:#FFF9EF}.lurk-settings-stats article span{display:block;font-size:8px;letter-spacing:1px;font-weight:850;color:#A18A73}.lurk-settings-stats article b{display:block;font-size:26px;margin:8px 0 2px}.lurk-settings-stats article small{font-size:10px;color:#998876}
.lurk-settings-sectionhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.lurk-settings-sectionhead h2{font-size:17px}.lurk-settings-shield{font-size:22px;color:#D66A43}.lurk-settings-backupgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.lurk-settings-backupcard{padding:20px;border:1px solid #E9DDCE;border-radius:16px;background:#FFF9EF;min-width:0}.lurk-settings-cardicon{width:38px;height:38px;border-radius:12px;background:#EEE5D9;display:grid;place-items:center;font-size:20px;color:#735D48;margin-bottom:15px}.lurk-settings-cardicon.orange{background:#FBE5D8;color:#D85D36}.lurk-settings-backupcard h3{font-size:16px;margin:6px 0}.lurk-settings-backupcard p{font-size:11px;line-height:1.7;color:#897968;min-height:58px;margin:0 0 16px}.lurk-settings-primary,.lurk-settings-upload{display:flex;justify-content:space-between;align-items:center;width:100%;box-sizing:border-box;padding:12px 14px;border:0;border-radius:10px;background:#F36B3F;color:white;font-size:11px;font-weight:850;cursor:pointer}.lurk-settings-upload{background:#EEE5D9;color:#554638;border:1px solid #E2D5C5}.lurk-settings-upload input{display:none}.lurk-settings-message{font-size:10px;line-height:1.5;color:#B35D39;margin-top:10px}.lurk-settings-confirm{margin-top:12px;padding:11px;border-radius:10px;background:#F8EBDD;display:grid;gap:8px}.lurk-settings-confirm small{font-size:10px;color:#796957;overflow-wrap:anywhere}.lurk-settings-confirm>button{padding:10px;border:0;border-radius:8px;background:#D94B43;color:white;font-size:10px;font-weight:800;cursor:pointer}.lurk-settings-confirm>.lurk-settings-cancel{background:transparent;color:#796957}.lurk-settings-footnote{font-size:10px;color:#A18F7D;margin-top:14px}
@media(max-width:850px){.lurk-settings-layout{grid-template-columns:1fr;padding:18px}.lurk-settings-rail{display:grid;grid-template-columns:1fr 1fr}.lurk-settings-note{display:none}}
@media(max-width:560px){.lurk-settings-header{padding:15px}.lurk-settings-header h1{font-size:21px}.lurk-settings-layout{padding:14px}.lurk-settings-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.lurk-settings-backupgrid{grid-template-columns:1fr}.lurk-settings-overview{align-items:flex-start;flex-direction:column}.lurk-settings-backupcard p{min-height:0}}
@media(orientation:landscape) and (max-height:650px){.lurk-settings-header{padding:12px 3%}.lurk-settings-layout{grid-template-columns:190px minmax(0,1fr);padding:15px 3%;gap:18px}.lurk-settings-stats{margin-bottom:15px}.lurk-settings-stats article{padding:10px}.lurk-settings-stats article b{font-size:21px}.lurk-settings-backupcard{padding:14px}.lurk-settings-backupcard p{min-height:48px}}

.lurk-month-review{min-height:100%;background:#F7F1E7;color:#302820}.lurk-month-header{display:flex;align-items:center;gap:16px;padding:22px 4.2%;background:#FFF9EF;border-bottom:1px solid #E9DDCE}.lurk-month-header>button{width:42px;height:42px;border:1px solid #E9DDCE;border-radius:13px;background:#F7F1E7;color:#655343;font-size:24px;cursor:pointer}.lurk-month-header>div:nth-child(2){flex:1}.lurk-month-header span,.lurk-month-kicker{font-size:9px;font-weight:850;letter-spacing:1.5px;color:#A18A73}.lurk-month-header h1{font-size:25px;margin:5px 0 2px;letter-spacing:-.8px}.lurk-month-header p{font-size:11px;color:#897968;margin:0}.lurk-month-stamp{width:46px;height:46px;display:grid;place-items:center;border-radius:15px;background:#F36B3F;color:#fff;font: bold 27px Georgia}.lurk-month-content{max-width:1250px;margin:auto;padding:26px 4.2%;display:grid;grid-template-columns:1fr 1fr;gap:16px}.lurk-month-hero{grid-column:1/-1;position:relative;overflow:hidden;display:grid;grid-template-columns:1fr auto;gap:12px;padding:25px 28px;border-radius:19px;background:#FBE4D6;border:1px solid #F1C9B4}.lurk-month-hero h2{font-size:24px;text-transform:capitalize;margin:7px 0 3px}.lurk-month-hero p,.lurk-month-year p,.lurk-month-products>p{font-size:11px;color:#8C7563;margin:0}.lurk-month-hero select,.lurk-month-year select{align-self:start;padding:10px 12px;border:1px solid #E8C9B8;border-radius:9px;background:#FFF9EF;color:#554638;font-size:11px;text-transform:capitalize}.lurk-month-total{grid-column:1/-1;font-size:clamp(32px,5vw,48px);font-weight:900;letter-spacing:-1.8px;color:#C9512E}.lurk-month-spark{position:absolute;right:26px;bottom:10px;font-size:90px;color:rgba(201,81,46,.1)}.lurk-month-year,.lurk-month-products{padding:21px;border:1px solid #E9DDCE;border-radius:16px;background:#FFF9EF}.lurk-month-year{display:grid;grid-template-columns:1fr auto;gap:10px}.lurk-month-year h3,.lurk-month-sectionhead h3{font-size:17px;margin:6px 0}.lurk-month-year>b{grid-column:1/-1;font-size:29px;color:#C9512E}.lurk-month-products{grid-row:span 2}.lurk-month-sectionhead{display:flex;justify-content:space-between;align-items:center;gap:10px}.lurk-month-sectionhead>span{font-size:9px;font-weight:900;color:#C9512E;background:#FBE5D8;padding:8px;border-radius:8px}.lurk-month-products>p{margin:0 0 14px}.lurk-month-products article{display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #F0E7DC}.lurk-month-rank{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;background:#FBE5D8;color:#C9512E;font-size:11px;font-weight:900}.lurk-month-productinfo{flex:1;min-width:0}.lurk-month-productinfo b,.lurk-month-productinfo small{display:block}.lurk-month-productinfo b{font-size:12px}.lurk-month-productinfo small{font-size:10px;color:#998876;margin-top:3px}.lurk-month-products article>strong{font-size:12px;white-space:nowrap;color:#C15D38}.lurk-month-track{height:4px;background:#F0E7DC;border-radius:5px;margin-top:8px;overflow:hidden}.lurk-month-track i{display:block;height:100%;background:#F36B3F;border-radius:5px}.lurk-month-empty{padding:24px;text-align:center;color:#998876;font-size:11px;background:#FBF5EC;border-radius:10px}
@media(max-width:700px){.lurk-month-content{grid-template-columns:1fr;padding:15px}.lurk-month-products{grid-row:auto}.lurk-month-header{padding:15px}.lurk-month-header h1{font-size:21px}.lurk-month-hero{padding:20px}.lurk-month-hero h2{font-size:20px}}
@media(orientation:landscape) and (max-height:650px){.lurk-month-header{padding:11px 3%}.lurk-month-content{padding:14px 3%;grid-template-columns:1fr 1fr}.lurk-month-hero{padding:16px 22px}.lurk-month-total{font-size:34px}.lurk-month-year,.lurk-month-products{padding:15px}}

.lurk-plus-v2{min-height:100%;background:#F7F1E7;color:#302820}.lurk-plus-header{display:flex;align-items:center;gap:17px;padding:20px 4.2%;background:#FFF9EF;border-bottom:1px solid #E9DDCE}.lurk-plus-header>button:first-child{width:42px;height:42px;border:1px solid #E9DDCE;border-radius:13px;background:#F7F1E7;color:#655343;font-size:24px;cursor:pointer}.lurk-plus-header>div{flex:1}.lurk-plus-header span,.lurk-plus-introcopy>span,.lurk-plus-sectionhead>div>span,.lurk-plus-detailtop span,.lurk-plus-form>span{font-size:9px;letter-spacing:1.6px;font-weight:900;color:#A18A73}.lurk-plus-header h1{font-size:25px;margin:3px 0}.lurk-plus-header h1 span{font-size:inherit;color:#F36B3F}.lurk-plus-header p{font-size:11px;color:#897968;margin:0}.lurk-plus-header .lurk-plus-add{border:0;border-radius:10px;background:#F36B3F;color:#fff;padding:12px 16px;font-size:11px;font-weight:850;cursor:pointer}.lurk-plus-layout{max-width:1400px;margin:auto;padding:24px 4.2%}.lurk-plus-intro{position:relative;overflow:hidden;min-height:200px;padding:24px 28px;border-radius:19px;background:#FBE4D6;border:1px solid #F1C9B4}.lurk-plus-introcopy h2{font:700 27px Georgia,serif;line-height:1.12;margin:10px 0;color:#49372A}.lurk-plus-introcopy p{font-size:11px;color:#8C7563}.lurk-plus-emblem{position:absolute;right:7%;top:10px;font:italic 105px Georgia;color:rgba(201,81,46,.15)}.lurk-plus-emblem span{font-size:48px}.lurk-plus-stats{position:absolute;right:26px;bottom:20px;display:flex;gap:22px}.lurk-plus-stats article{display:grid;gap:5px}.lurk-plus-stats small{font-size:8px;letter-spacing:.8px;color:#987D69;font-weight:850}.lurk-plus-stats b{font-size:17px;color:#C9512E}.lurk-plus-body{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(300px,.8fr);gap:15px;margin-top:18px}.lurk-plus-list,.lurk-plus-detail{padding:19px;border:1px solid #E9DDCE;border-radius:16px;background:#FFF9EF;min-width:0}.lurk-plus-sectionhead,.lurk-plus-detailtop,.lurk-plus-historyhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.lurk-plus-sectionhead h2,.lurk-plus-detailtop h2{font-size:18px;margin:4px 0}.lurk-plus-sectionhead>small,.lurk-plus-historyhead span{font-size:9px;color:#A18A73;font-weight:850;letter-spacing:.8px}.lurk-plus-member{display:flex;align-items:center;gap:12px;width:100%;padding:12px 9px;border:0;border-top:1px solid #F0E7DC;background:transparent;text-align:left;color:#302820;cursor:pointer}.lurk-plus-member.selected{background:#FBEDE3;border-radius:10px}.lurk-plus-avatar{width:39px;height:39px;display:grid;place-items:center;border-radius:12px;background:#FBE5D8;color:#C9512E;font-size:16px;font-weight:900}.lurk-plus-membername{flex:1;min-width:0}.lurk-plus-membername b,.lurk-plus-membername small,.lurk-plus-balance b,.lurk-plus-balance small{display:block}.lurk-plus-membername b{font-size:12px}.lurk-plus-membername small{font-size:9px;color:#998876;margin-top:4px}.lurk-plus-balance{text-align:right}.lurk-plus-balance b{font-size:12px;color:#C15D38}.lurk-plus-balance small{font-size:8px;color:#A18A73;margin-top:3px}.lurk-plus-chevron{font-size:21px;color:#C7B6A4}.lurk-plus-detailtop button{border:0;background:#F2E9DE;border-radius:8px;width:29px;height:29px;font-size:19px;color:#806C58;cursor:pointer}.lurk-plus-balancehero{padding:18px;border-radius:13px;background:#FBE4D6;display:grid;gap:7px}.lurk-plus-balancehero small,.lurk-plus-balancehero span{font-size:8px;letter-spacing:1px;color:#9B735C;font-weight:850}.lurk-plus-balancehero b{font-size:29px;color:#C9512E}.lurk-plus-balancehero span{font-size:7px}.lurk-plus-historyhead{margin:18px 0 6px}.lurk-plus-historyhead b{font-size:12px}.lurk-plus-history article{display:flex;align-items:flex-start;gap:9px;padding:11px 0;border-top:1px solid #F0E7DC}.lurk-plus-hicon{width:28px;height:28px;display:grid;place-items:center;border-radius:9px;background:#FBE5D8;color:#C9512E}.lurk-plus-hicon.purchase{background:#F8E5E2;color:#C94C43}.lurk-plus-htext{flex:1;min-width:0}.lurk-plus-htext b,.lurk-plus-htext small{display:block}.lurk-plus-htext b{font-size:10px}.lurk-plus-htext small{font-size:9px;color:#998876;margin-top:4px}.lurk-plus-history article strong{font-size:10px;color:#C15D38;white-space:nowrap}.lurk-plus-history article strong.negative{color:#C94C43}.lurk-plus-detailempty,.lurk-plus-empty{min-height:180px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;gap:8px;color:#8F7D6B}.lurk-plus-detailempty>div,.lurk-plus-empty>span{font-size:28px;color:#D66A43}.lurk-plus-detailempty b,.lurk-plus-empty b{font-size:13px;color:#514234}.lurk-plus-detailempty small,.lurk-plus-empty small{font-size:10px}.lurk-plus-empty button{margin-top:7px;border:0;border-radius:9px;padding:10px 14px;background:#F36B3F;color:white;font-weight:800;font-size:10px}.lurk-plus-form>span{display:block}.lurk-plus-form h2{font-size:20px;margin:7px 0}.lurk-plus-form p{font-size:11px;color:#897968;margin-bottom:18px}.lurk-plus-form label{display:block;font-size:11px;color:#75695E;margin:12px 0 6px}.lurk-plus-form input{box-sizing:border-box;width:100%;padding:12px;border:1px solid #E9DDCE;border-radius:9px;background:#FFF9EF;color:#302820}.lurk-plus-form>button{width:100%;margin-top:15px;padding:13px;border:0;border-radius:10px;background:#F36B3F;color:#fff;font-weight:850;cursor:pointer}.lurk-plus-form>.lurk-plus-cancel{margin-top:4px;background:transparent;color:#897968}
@media(max-width:760px){.lurk-plus-layout{padding:14px}.lurk-plus-body{grid-template-columns:1fr}.lurk-plus-intro{padding:20px}.lurk-plus-stats{position:static;margin-top:20px;flex-wrap:wrap;gap:15px}.lurk-plus-emblem{right:15px;top:8px;font-size:70px}.lurk-plus-header{padding:14px}.lurk-plus-header h1{font-size:21px}}
@media(orientation:landscape) and (max-height:650px){.lurk-plus-layout{padding:14px 3%}.lurk-plus-intro{min-height:155px;padding:16px 22px}.lurk-plus-introcopy h2{font-size:22px}.lurk-plus-stats{bottom:14px;right:20px}.lurk-plus-body{grid-template-columns:1.1fr .9fr;margin-top:12px}.lurk-plus-list,.lurk-plus-detail{padding:14px}}
</style>
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#F36B3F",color:"#fff",padding:"9px 18px",borderRadius:20,fontSize:13,fontWeight:700,zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(243,107,63,0.45)"}}>{toast}</div>}
      <button type="button" role="status" aria-live="polite" onClick={async()=>{if(saveStatus!=="error")return;const entries=Object.entries(failedWrites.current);if(!entries.length){setSaveStatus("saved");return;}pendingSaves.failed=false;await Promise.all(entries.map(([key,value])=>persistDirect(key,value)));}} style={{position:"absolute",top:12,right:12,zIndex:90,padding:"5px 9px",borderRadius:20,fontSize:10,fontWeight:750,background:saveStatus==="error"?"rgba(255,59,48,.16)":saveStatus==="saving"?"rgba(255,149,0,.16)":"rgba(243,107,63,.13)",color:saveStatus==="error"?T.danger:saveStatus==="saving"?T.warn:T.accentL,border:"1px solid "+(saveStatus==="error"?"rgba(255,59,48,.3)":saveStatus==="saving"?"rgba(255,149,0,.3)":"rgba(243,107,63,.25)" ),cursor:saveStatus==="error"?"pointer":"default"}}>{saveStatus==="error"?"↻ Tekrar dene":saveStatus==="saving"?"Kaydediliyor…":"Kaydedildi"}</button>

      {view==="home"&&<HomeScreen tables={tables} orders={orders} logs={logs} day={day} openDay={openDay} closeDay={closeDay} setV={setV}/>}
      {view==="tables"&&<TablesScreen tables={tables} customers={customers} lurkPlusMembers={lurkPlusMembers} setTbl={setTbl} setCustomers={setCustomers} setV={setV} setSel={setSel} msg={msg}/>}
      {view==="order"&&curT&&<OrderScreen table={curT} tables={tables} menu={menu} cats={cats} customers={customers} lurkPlusMembers={lurkPlusMembers} setTableCustomer={setTableCustomer} addItem={addItem} chQ={chQ} pay={pay} moveTableOrder={moveTableOrder} setTbl={setTbl} setV={setV} setSel={setSel}/>}
      {view==="reports"&&<ReportsScreen orders={orders} logs={logs} creditEntries={creditEntries} setV={setV}/>}
      {view==="monthReview"&&<MonthReviewScreen orders={orders} tables={tables} setV={setV}/>}
      {view==="lurkPlus"&&<LurkPlusScreen members={lurkPlusMembers} setMembers={setLurkPlusMembers} msg={msg} setV={setV}/>}
      {view==="customers"&&<CustomersScreen orders={orders} customers={customers} setCustomers={setCustomers} creditEntries={creditEntries} setCreditEntries={setCreditEntries} setV={setV} msg={msg}/>}
      {view==="menu"&&<MenuScreen menu={menu} setMenu={setMenu} setV={setV}/>}
      {view==="settings"&&<SettingsScreen setV={setV} tables={tables} orders={orders} logs={logs} customers={customers} creditEntries={creditEntries} lurkPlusMembers={lurkPlusMembers} menu={menu} day={day} setTables={setTbl} setOrders={setOrd} setLogs={setLogs} setCustomers={setCustomers} setCreditEntries={setCreditEntries} setLurkPlusMembers={setLurkPlusMembers} setMenu={setMenu} setDay={setDay}/>}
      <div className="lurk-landscape-gate" role="status" aria-live="polite">
        <div className="gate-icon">↻</div>
        <strong>LURK POS yatay kullanılır</strong>
        <span>Daha geniş çalışma alanı için cihazını yatay konuma çevir. Bu arayüzü yatay ekran deneyimi için tasarlıyoruz.</span>
      </div>
      {view!=="order"&&(
        <div className="lurk-bottom-nav" style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"none",background:"rgba(255,249,239,0.97)",backdropFilter:"blur(40px)",borderTop:"0.5px solid rgba(91,65,43,0.08)",display:"flex",zIndex:50}}>
          {NAV.map(n=>(
            <button className={"lurk-nav-button"+(view===n.k?" is-active":"")} aria-current={view===n.k?"page":undefined} key={n.k} onClick={()=>setV(n.k)} style={{flex:1,padding:"10px 0 14px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
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
function HomeScreen({tables,orders,logs,day,openDay,closeDay,setV}){
  const openT=tables.filter(t=>t.s==="o");
  const apps=[
    {k:"tables",label:"Adisyon",sub:"Yeni sipariş oluştur",icon:"☕",primary:true},
    {k:"menu",label:"Ürünler",sub:"Menü ve stok",icon:"🍄"},
    {k:"customers",label:"Müşteriler",sub:"Müşteri kartları",icon:"⭐"},
    {k:"reports",label:"Raporlar",sub:"Günlük satışlar",icon:"🟩"},
    {k:"settings",label:"Ayarlar",sub:"Sistem ayarları",icon:"⚙️"}
  ];
  return <main className="lurk-screen lurk-home-screen lurk-reference-home">
    <div className="lurk-reference-backdrop" aria-hidden="true"><span className="lurk-reference-plant">✳</span><span className="lurk-reference-slogan">COFFEE<br/>PEOPLE<br/>GOOD MOOD<br/>LURK</span></div>
    <header className="lurk-reference-top">
      <div className="lurk-reference-brand"><img src="/lurk-logo.svg" alt="LURK"/><b>POS</b></div>
      <div className="lurk-reference-user"><span className="lurk-reference-wifi">◉</span><span className="lurk-reference-avatar">👨🏻‍🍳</span><b>Kasiyer</b><span>⌄</span></div>
    </header>
    <section className="lurk-reference-launcher" aria-label="Ana menü">
      {apps.map(p=><button key={p.k} className={"lurk-reference-app"+(p.primary?" is-active":"")} onClick={()=>setV(p.k)}>
        <span className="lurk-reference-icon">{p.icon}</span><b>{p.label}</b><small>{p.sub}</small>
      </button>)}
    </section>
    <footer className="lurk-reference-controls">
      <span><i className="lurk-key key-a">A</i> Seç</span><span><i className="lurk-key key-b">B</i> Geri</span><span><i className="lurk-key key-x">X</i> Arama</span>
      <button onClick={()=>setV("tables")}><i className="lurk-key key-y">Y</i> Hızlı Adisyon</button>
    </footer>
    <div className="lurk-reference-status"><span className={day?"is-open":""}/>{day?"Gün açık":"Gün kapalı"} · {openT.length} açık masa</div>
    <button className="lurk-reference-day" onClick={day?closeDay:openDay}>{day?"Günü kapat":"Günü başlat"}</button>
  </main>;
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
      <div className="lurk-floor-topbar">
        <div className="lurk-floor-heading"><span className="lurk-pos-eyebrow">LURK FLOOR PLAN</span><div style={{fontSize:26,fontWeight:950,letterSpacing:"-.9px",color:"#302820"}}>Masa düzeni</div><small>Alanını seç, masanı aç, servise devam et.</small></div>
        <button onClick={()=>setShowAll(p=>!p)} style={{background:"rgba(91,65,43,0.06)",border:"0.5px solid rgba(91,65,43,0.12)",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",color:T.textSub,fontWeight:600}}>{showAll?"Açıklar":"Tümü"}</button>
        <button onClick={()=>setShowNew(true)} style={{background:"#F36B3F",border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",color:"#fff",fontWeight:700}}>+ Masa</button>
      </div>

      <div className="lurk-floor-content">
        <div className="lurk-floor-overview"><div className="lurk-floor-stat"><span className="stat-icon">🪑</span><div><b>{tables.length}</b><small>Toplam masa</small></div></div><div className="lurk-floor-stat is-active"><span className="stat-icon">●</span><div><b>{openT.length}</b><small>Serviste</small></div></div><div className="lurk-floor-stat"><span className="stat-icon">○</span><div><b>{tables.length-openT.length}</b><small>Boş masa</small></div></div><div className="lurk-floor-total"><small>Açık adisyon toplamı</small><b>{fm(openT.reduce((sum,t)=>sum+t.order.reduce((v,o)=>v+o.price*o.qty,0),0))}</b></div></div>
        <div className="lurk-floor-section-head"><div><span>YOUR SPACE</span><b>Masa haritası</b></div><small>{showAll?"Tüm masalar":"Yalnızca açık masalar"}</small></div>
        {displayed.length===0&&(
          <div style={{textAlign:"center",padding:"40px 20px",fontSize:13,color:T.textSub}}>
            {showAll?"Henüz masa yok":"Açık masa yok"}
          </div>
        )}
        <div className="lurk-floor-grid">
          {displayed.map(t=>{
            const total=t.order.reduce((s,o)=>s+o.price*o.qty,0);
            const isOpen=t.s==="o";
            return(
              <div key={t.id} className={"lurk-floor-table"+(isOpen?" is-occupied":" is-free")}>
                
                <div className="lurk-floor-table-head">
                  <div className="lurk-floor-table-name"><span className="lurk-floor-chair">▧</span><div><b>{t.lbl}</b><small>{t.g||"Misafir bekliyor"}</small></div></div>
                  <button onClick={()=>setDelId(t.id)} style={{background:"none",border:"none",cursor:"pointer",color:T.textDim,fontSize:16,padding:"0 0 0 8px",lineHeight:1}}>×</button>
                </div>
                
                <div className="lurk-floor-table-status">
                  <span style={{width:8,height:8,borderRadius:"50%",background:isOpen?"#F36B3F":"#C9BFB2",boxShadow:isOpen?"0 0 0 3px rgba(243,107,63,.12)":"none"}}/>
                  {isOpen?fm(total):"Şimdilik boş"}
                </div>
                <button className="lurk-floor-table-action" onClick={()=>{setSel(t.id);setV("order");}}>
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
            <input value={customerQuery} onChange={e=>{setCustomerQuery(e.target.value);setSelectedCustomerId("");if(nameRef.current)nameRef.current.value="";}} placeholder="Müşteri ismi yaz..." style={{width:"100%",padding:"11px 12px",border:"1px solid rgba(91,65,43,.12)",borderRadius:10,fontSize:14,boxSizing:"border-box",marginBottom:8,background:"rgba(91,65,43,.06)",color:T.text}}/>
            <div style={{maxHeight:135,overflowY:"auto",marginBottom:12}}>
              {customers.filter(c=>c.name.toLocaleLowerCase("tr-TR").includes(customerQuery.trim().toLocaleLowerCase("tr-TR"))).map(c=><button key={"customer:"+c.id} onClick={()=>{setSelectedCustomerId(c.id);setCustomerQuery(c.name);if(nameRef.current)nameRef.current.value="";}} style={{display:"block",width:"100%",padding:"10px 12px",marginBottom:5,textAlign:"left",background:selectedCustomerId===c.id?"rgba(243,107,63,.15)":T.bg2,color:selectedCustomerId===c.id?T.accentL:T.text,border:"1px solid "+(selectedCustomerId===c.id?"rgba(243,107,63,.4)":"rgba(91,65,43,.08)"),borderRadius:9,cursor:"pointer"}}>{c.name} · Müşteri</button>)}
              {lurkPlusMembers.filter(m=>m.name.toLocaleLowerCase("tr-TR").includes(customerQuery.trim().toLocaleLowerCase("tr-TR"))).map(m=><button key={"lurk:"+m.id} onClick={()=>{setSelectedCustomerId("lurk:"+m.id);setCustomerQuery(m.name);if(nameRef.current)nameRef.current.value="";}} style={{display:"block",width:"100%",padding:"10px 12px",marginBottom:5,textAlign:"left",background:selectedCustomerId==="lurk:"+m.id?"rgba(243,107,63,.15)":T.bg2,color:selectedCustomerId==="lurk:"+m.id?T.accentL:T.text,border:"1px solid "+(selectedCustomerId==="lurk:"+m.id?"rgba(243,107,63,.4)":"rgba(91,65,43,.08)"),borderRadius:9,cursor:"pointer"}}>{m.name} · LURK+ · {fm(m.balance)}</button>)}
              {customers.filter(c=>c.name.toLocaleLowerCase("tr-TR").includes(customerQuery.trim().toLocaleLowerCase("tr-TR"))).length===0&&lurkPlusMembers.filter(m=>m.name.toLocaleLowerCase("tr-TR").includes(customerQuery.trim().toLocaleLowerCase("tr-TR"))).length===0&&<div style={{fontSize:12,color:T.textSub,padding:8}}>Eşleşen kayıt yok. Yeni isim girebilirsin.</div>}
            </div>
          </>}
          <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Yeni müşteri adı</label>
          <input ref={nameRef} placeholder="Yeni müşteri adı"
            onChange={()=>{setSelectedCustomerId("");setCustomerQuery("");}}
            onKeyDown={e=>{if(e.key==="Enter")addTable();}}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(91,65,43,0.07)",color:T.text}}/>
          <button onClick={addTable}
            style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#F36B3F,#D94D2B)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(243,107,63,0.3)"}}>
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
  const[showMenu,setShowMenu]=useState(true);
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
      <div style={{background:"rgba(255,249,239,0.97)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(91,65,43,0.08)",padding:"10px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <button onClick={()=>{setSel(null);setV("tables");}} style={{background:"rgba(91,65,43,0.06)",border:"0.5px solid rgba(91,65,43,0.12)",borderRadius:8,padding:"6px 12px",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600}}>← Masalar</button>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:15,color:T.text}}>{table.lbl}</div>
          {table.g&&<div style={{fontSize:11,color:T.accentL,fontWeight:600}}>{table.g}</div>}
        </div>
        <button onClick={()=>setShowName(true)} style={{background:"rgba(91,65,43,0.05)",border:"0.5px solid rgba(91,65,43,0.1)",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,cursor:"pointer",color:table.g?T.accentL:T.textSub}}>{table.g||"+ İsim"}</button>
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
                <div key={item.oid||item.id} style={{background:index%2===0?"#FFF9EF":"#F8EFE3",borderRadius:10,padding:"7px 9px",marginBottom:4,border:"0.5px solid "+(index%2===0?"rgba(91,65,43,0.10)":"rgba(91,65,43,0.07)")}}>
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
                    <button aria-label={item.name+" azalt"} onClick={()=>chQ(table.id,item.oid||String(item.id),-1)} style={{flex:1,height:26,borderRadius:7,border:"1px solid rgba(217,75,67,0.24)",background:"rgba(217,75,67,0.08)",cursor:"pointer",fontSize:18,color:T.danger,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                    <span style={{minWidth:20,textAlign:"center",fontWeight:800,fontSize:13,color:T.text}}>{item.qty}</span>
                    <button aria-label={item.name+" artır"} onClick={()=>addItem(table.id,{id:item.id,name:item.name,price:item.price,cat:item.cat,on:item.on})} style={{flex:1,height:32,borderRadius:8,border:"0.5px solid rgba(243,107,63,0.3)",background:"rgba(243,107,63,0.12)",cursor:"pointer",fontSize:18,color:T.accentL,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Alt bar */}
          <div style={{flexShrink:0,padding:"8px 10px max(12px, env(safe-area-inset-bottom))",borderTop:"0.5px solid rgba(91,65,43,0.08)",background:"rgba(255,249,239,0.97)",backdropFilter:"blur(20px)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:14,color:T.textSub,fontWeight:600}}>Toplam</span>
              <span style={{fontSize:"clamp(20px,5vw,24px)",fontWeight:800,color:T.accentL,letterSpacing:"-0.5px"}}>{fm(Math.max(0,sub-previousPaid))}</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowMenu(true)} style={{flex:1,padding:"13px",background:T.bg3,border:"0.5px solid rgba(91,65,43,0.1)",borderRadius:12,color:T.text,fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Sipariş Ekle</button>
              <button onClick={()=>setShowMove(true)} disabled={table.order.length===0||tables.filter(t=>t.id!==table.id).length===0} style={{flex:1,padding:"13px",background:T.bg2,border:"0.5px solid rgba(91,65,43,0.1)",borderRadius:12,color:table.order.length===0?T.textDim:T.textSub,fontWeight:600,fontSize:12,cursor:table.order.length===0?"not-allowed":"pointer"}}>⇄ Taşı</button>
              <button onClick={()=>setShowFis(true)} style={{flex:1,padding:"13px",background:T.bg2,border:"0.5px solid rgba(91,65,43,0.1)",borderRadius:12,color:T.textSub,fontWeight:600,fontSize:13,cursor:"pointer"}}>Fiş</button>
              <button onClick={()=>setShowPay(true)} disabled={table.order.length===0} style={{flex:2,padding:"13px",background:table.order.length===0?T.bg3:"linear-gradient(135deg,#F36B3F,#D94D2B)",color:table.order.length===0?T.textDim:"#fff",border:"none",borderRadius:12,fontWeight:800,fontSize:14,cursor:table.order.length===0?"not-allowed":"pointer",boxShadow:table.order.length>0?"0 4px 16px rgba(243,107,63,0.35)":"none"}}>Ödeme Al ↑</button>
            </div>
          </div>
        </div>
      )}

      {/* NINTENDO-INSPIRED THREE-PANEL POS */}
      {showMenu&&(
        <div className="lurk-pos-workspace">
          <aside className="lurk-pos-categories">
            <div className="lurk-pos-side-label">MENÜ</div>
            {cats.map((c,i)=>(
              <button key={c} className={"lurk-pos-category"+(selCat===c?" is-selected":"")} onClick={()=>setSelCat(c)}>
                <span className="lurk-pos-category-icon">{(/kahve/i.test(c)?"☕":/matcha/i.test(c)?"🍃":/tatli|tatlı/i.test(c)?"🍰":/sandvic|sandviç/i.test(c)?"🥪":/cay|çay/i.test(c)?"🫖":/signature/i.test(c)?"🥤":"✳")}</span>
                <span>{c}</span>
              </button>
            ))}
          </aside>

          <main className="lurk-pos-catalog">
            <div className="lurk-pos-catalog-head">
              <div><span className="lurk-pos-eyebrow">LURK MENU</span><h2>{selCat||"Tüm ürünler"}</h2></div>
              <label className="lurk-pos-search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ürün ara..." aria-label="Menüde ürün ara"/></label>
            </div>
            <div className="lurk-pos-product-grid">
              {menu.filter(m=>m.on&&(search.trim()?m.name.toLocaleLowerCase("tr-TR").includes(search.trim().toLocaleLowerCase("tr-TR")):m.cat===selCat)).map(item=>{
                const inCart=table.order.filter(o=>o.id===item.id).reduce((sum,o)=>sum+o.qty,0);
                const isFlash=flash===item.id;
                const art=/matcha/i.test(item.name)?"🍵":/latte|cappuccino|flat white|mocha|americano|espresso|filter|cortado/i.test(item.name)?"☕":/çay|cay|tea/i.test(item.name)?"🫖":/sandviç|sandvic/i.test(item.name)?"🥪":/tiramisu|cookie/i.test(item.name)?"🍰":/limon|soda|smoothie|ayran|ice/i.test(item.name)?"🥤":"✳";
                return <button key={item.id} className={"lurk-pos-product"+(inCart?" is-in-cart":"")+(isFlash?" is-flash":"")} onClick={()=>handleAdd(item)}>
                  <span className="lurk-pos-product-art">{art}</span>
                  {inCart>0&&<span className="lurk-pos-product-count">×{inCart}</span>}
                  <span className="lurk-pos-product-name">{item.name}</span>
                  <span className="lurk-pos-product-price">{fm(item.price)}</span>
                  <span className="lurk-pos-product-add">+</span>
                </button>;
              })}
              {menu.filter(m=>m.on&&(search.trim()?m.name.toLocaleLowerCase("tr-TR").includes(search.trim().toLocaleLowerCase("tr-TR")):m.cat===selCat)).length===0&&<div className="lurk-pos-empty">Bu kategoride ürün bulunamadı.</div>}
            </div>
          </main>

          <aside className="lurk-pos-ticket">
            <div className="lurk-pos-ticket-head">
              <div><span className="lurk-pos-eyebrow">CURRENT ORDER</span><h2>Adisyon <small>#{String(table.id).slice(-4)}</small></h2></div>
              <button className="lurk-pos-guest" onClick={()=>setShowName(true)}>{table.g||"+ Müşteri"}</button>
            </div>
            <div className="lurk-pos-ticket-table"><span>Ürün</span><span>Adet</span><span>Tutar</span></div>
            <div className="lurk-pos-ticket-lines">
              {table.order.length===0?<div className="lurk-pos-ticket-empty"><span>☕</span><b>Henüz sipariş yok</b><small>Soldan bir ürün seçerek başlayın.</small></div>:table.order.map((item,index)=>(
                <div className="lurk-pos-ticket-line" key={item.oid||item.id}>
                  <div className="lurk-pos-line-info"><b>{item.name}</b><small>{fm(item.price)} / adet</small><div className="lurk-pos-qty"><button aria-label="Adet azalt" onClick={()=>chQ(table.id,item.oid||String(item.id),-1)}>−</button><b>{item.qty}</b><button aria-label="Adet artır" onClick={()=>addItem(table.id,{id:item.id,name:item.name,price:item.price,cat:item.cat,on:item.on})}>+</button></div></div>
                  <span className="lurk-pos-line-qty">{item.qty}</span><b className="lurk-pos-line-total">{fm(item.price*item.qty)}</b>
                </div>
              ))}
            </div>
            <div className="lurk-pos-ticket-bottom">
              <div className="lurk-pos-ticket-count"><span>{itemCount} ürün</span><button onClick={()=>setShowMove(true)} disabled={table.order.length===0}>⇄ Masa taşı</button><button onClick={()=>setShowFis(true)} disabled={table.order.length===0}>Fiş</button></div>
              <div className="lurk-pos-grand-total"><span>Toplam</span><b>{fm(Math.max(0,sub-previousPaid))}</b></div>
              <button className="lurk-pos-checkout" onClick={()=>setShowPay(true)} disabled={table.order.length===0}><span>Tahsilat</span><b>→</b></button>
              <button className="lurk-pos-back-tables" onClick={()=>{setSel(null);setV("tables");}}>← Masa düzenine dön</button>
            </div>
          </aside>
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
              return <div key={key} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 10px",background:T.bg2,border:"1px solid rgba(91,65,43,.08)",borderRadius:10}}>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:700,color:T.text}}>{line.name}</div><div style={{fontSize:10,color:T.textSub}}>{fm(line.price)} · mevcut {line.qty}</div></div>
                <button onClick={()=>setMoveSelections(p=>({...p,[key]:Math.max(0,Number(p[key]??0)-1)}))} style={{width:30,height:30,borderRadius:8,border:"1px solid rgba(91,65,43,.12)",background:"transparent",color:T.text,fontSize:18}}>−</button>
                <span style={{minWidth:18,textAlign:"center",fontSize:13,fontWeight:800,color:T.accentL}}>{qty}</span>
                <button onClick={()=>setMoveSelections(p=>({...p,[key]:Math.min(line.qty,Number(p[key]??0)+1)}))} style={{width:30,height:30,borderRadius:8,border:"1px solid rgba(243,107,63,.25)",background:"rgba(243,107,63,.1)",color:T.accentL,fontSize:18}}>+</button>
              </div>;
            })}
          </div>
          <div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:8}}>Hedef masa</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:"24vh",overflowY:"auto"}}>
            {tables.filter(t=>t.id!==table.id).map(target=>{
              const targetTotal=(target.order||[]).reduce((sum,item)=>sum+item.price*item.qty,0);
              const selectedQty=table.order.reduce((sum,line)=>sum+Math.max(0,Math.min(line.qty,Number(moveSelections[line.oid||String(line.id)]??0))),0);
              return <button key={target.id} onClick={()=>{moveTableOrder(table.id,target.id,table.order.map(line=>({key:line.oid||String(line.id),qty:Math.max(0,Math.min(line.qty,Number(moveSelections[line.oid||String(line.id)]??0)))})));setMoveSelections({});setShowMove(false);}} style={{width:"100%",padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,textAlign:"left",background:target.s==="o"?"rgba(243,107,63,.1)":T.bg2,border:"1px solid "+(target.s==="o"?"rgba(243,107,63,.3)":"rgba(91,65,43,.1)"),borderRadius:11,color:T.text,cursor:"pointer",opacity:selectedQty?1:.55}}>
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
          <div style={{borderTop:"1px dashed rgba(91,65,43,0.1)",marginBottom:12}}/>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,color:T.textSub}}>{table.lbl}</div>
            {table.g&&<div style={{fontSize:14,fontWeight:600,marginTop:1,color:T.text}}>{table.g}</div>}
            <div style={{fontSize:11,color:T.textSub,marginTop:2}}>{new Date().toLocaleDateString("tr-TR",{day:"numeric",month:"long"})} · {ft(new Date().toISOString())}</div>
          </div>
          <div style={{borderTop:"1px dashed rgba(91,65,43,0.1)",marginBottom:8}}/>
          {grouped.map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"0.5px solid rgba(91,65,43,0.05)"}}>
              <div>
                <div style={{fontSize:13,color:T.text}}>{item.name}</div>
                <div style={{fontSize:11,color:T.textSub,marginTop:1}}>{item.qty} × {fm(item.price)}</div>
              </div>
              <div style={{fontSize:13,fontWeight:600,color:T.text}}>{fm(item.price*item.qty)}</div>
            </div>
          ))}
          <div style={{borderTop:"1px dashed rgba(91,65,43,0.1)",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:15,fontWeight:700,color:T.text}}>Toplam</span>
            <span style={{fontSize:15,fontWeight:800,color:T.accentL}}>{fm(sub)}</span>
          </div>
          <div style={{textAlign:"center",marginTop:16,fontSize:11,color:T.textDim}}>Teşekkür ederiz ✦</div>
          <button onClick={()=>setShowFis(false)} style={{width:"100%",padding:"12px",background:"rgba(91,65,43,0.06)",border:"0.5px solid rgba(91,65,43,0.1)",borderRadius:10,color:T.textSub,fontSize:13,cursor:"pointer",marginTop:16}}>Kapat</button>
        </Modal>
      )}

      {/* İsim modal */}
      {showName&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:6,color:T.text}}>Müşteri Seçimi</div>
          <div style={{fontSize:12,color:T.textSub,marginBottom:14}}>Kayıtlı müşteriyi seç veya yeni müşteri adını gir.</div>
          {lurkPlusMembers.length>0&&<div style={{marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:800,color:T.accentL,marginBottom:6}}>LURK+ ÜYELERİ</div>
            <div style={{maxHeight:125,overflowY:"auto"}}>{lurkPlusMembers.map(m=><button key={m.id} onClick={()=>{setTableCustomer(table.id,{...m,lurkPlus:true});setName(m.name);setShowName(false);}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,width:"100%",padding:11,marginBottom:5,textAlign:"left",background:table.lurkPlusId===m.id?"rgba(243,107,63,.13)":T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.08)",borderRadius:9,cursor:"pointer"}}><span>{m.name}</span><span style={{fontSize:11,color:T.accentL,whiteSpace:"nowrap"}}>{fm(m.balance)}</span></button>)}</div>
          </div>}
          {customers?.length>0&&<div style={{maxHeight:150,overflowY:"auto",marginBottom:12}}>{customers.map(c=><button key={c.id} onClick={()=>{setTableCustomer(table.id,c);setName(c.name);setShowName(false);}} style={{display:"block",width:"100%",padding:11,marginBottom:5,textAlign:"left",background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.08)",borderRadius:9,cursor:"pointer"}}>{c.name}<span style={{display:"block",fontSize:11,color:T.textSub,marginTop:3}}>{c.phone||"Telefon yok"}</span></button>)}</div>}
          <input autoFocus placeholder="Yeni müşteri adı (zorunlu)" value={name} onChange={e=>setName(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&name.trim()){setTableCustomer(table.id,name.trim());setShowName(false);}}}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(91,65,43,0.07)",color:T.text}}/>
          <button disabled={!name.trim()} onClick={()=>{if(!name.trim())return;setTableCustomer(table.id,name.trim());setShowName(false);}} style={{width:"100%",padding:"14px",background:name.trim()?"linear-gradient(135deg,#F36B3F,#D94D2B)":T.bg3,border:"none",borderRadius:12,color:name.trim()?"#fff":T.textDim,fontSize:15,fontWeight:700,cursor:name.trim()?"pointer":"not-allowed"}}>Müşteriyi Onayla</button>
        </Modal>
      )}

      {/* Ödeme modal */}
      {showPay&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:4,color:T.text}}>Ödeme Al</div>
          {previousPaid>0&&<div style={{fontSize:11,color:T.accentL,marginBottom:8}}>Önceden tahsil edilen: {fm(previousPaid)}</div>}
          <div style={{fontSize:12,color:T.textSub,marginBottom:16}}>{table.lbl}{table.g?" · "+table.g:""}</div>
          <div style={{background:T.bg2,borderRadius:12,padding:"12px 14px",marginBottom:14,border:"0.5px solid rgba(91,65,43,0.08)"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:8}}><span>Ara toplam</span><span>{fm(sub)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:8}}><span>İndirim</span><span style={{color:discVal>0?T.accentL:T.textSub}}>−{fm(discVal)}</span></div>
            <div style={{height:1,background:"rgba(91,65,43,0.09)",marginBottom:8}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:13,fontWeight:700,color:T.text}}>Ödenecek</span><span style={{fontSize:25,fontWeight:800,color:T.accentL,letterSpacing:"-1px"}}>{fm(total)}</span></div>
          </div>
          <input type="number" min="0" max={sub} placeholder="İndirim (TL)" value={disc} disabled={partialMode||previousPaid>0} onChange={e=>setDisc(e.target.value)}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:8,background:"rgba(91,65,43,0.07)",color:T.text,opacity:partialMode||previousPaid>0?0.5:1}}/>
          {!table.lurkPlusId&&pt!=="credit"&&<button onClick={()=>{setPartialMode(v=>!v);setPartialAmount("");setSplitMode(false);setDisc("");}} style={{width:"100%",padding:10,marginBottom:10,background:partialMode?"rgba(243,107,63,.15)":T.bg2,border:"1px solid "+(partialMode?"rgba(243,107,63,.4)":"rgba(91,65,43,.1)"),borderRadius:10,color:partialMode?T.accentL:T.textSub,fontWeight:700,fontSize:12}}>{partialMode?"✓ Kısmi ödeme açık":"＋ Kısmi ödeme yap"}</button>}
          {partialMode&&<input type="number" min="0.01" max={total} value={partialAmount} onChange={e=>{setPartialAmount(e.target.value);setCashPart(e.target.value);setCardPart("");}} placeholder={"Şimdi alınacak tutar · kalan "+fm(total)} style={{width:"100%",padding:"12px 14px",border:"1px solid rgba(243,107,63,.35)",borderRadius:10,fontSize:16,boxSizing:"border-box",marginBottom:12,background:"rgba(91,65,43,.06)",color:T.text}}/>}
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {["cash","card","credit"].map(p=>(
              <button key={p} onClick={()=>{setPt(p);setSplitMode(false);if(p==="credit")setPartialMode(false);}} style={{flex:1,padding:"12px",border:"0.5px solid rgba(91,65,43,0.12)",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",background:!splitMode&&pt===p?"rgba(243,107,63,0.15)":"rgba(91,65,43,0.05)",color:!splitMode&&pt===p?T.accentL:T.textSub,borderColor:!splitMode&&pt===p?"rgba(243,107,63,0.4)":"rgba(91,65,43,0.12)"}}>
                {p==="cash"?"Nakit":p==="card"?"Kart":"Veresiye"}
              </button>
            ))}
          </div>
          <button onClick={()=>{setSplitMode(v=>{if(!v)setPt("cash");return !v;});setCashPart(partialMode?partialAmount:"");setCardPart("");}} style={{width:"100%",padding:"9px",marginBottom:12,background:splitMode?"rgba(243,107,63,0.14)":"rgba(91,65,43,0.05)",border:"0.5px solid "+(splitMode?"rgba(243,107,63,0.4)":"rgba(91,65,43,0.12)"),borderRadius:10,color:splitMode?T.accentL:T.textSub,fontSize:12,fontWeight:700,cursor:"pointer"}}>{splitMode?"Çoklu ödemeyi kapat":"Nakit + kart olarak böl"}</button>
          {splitMode&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            <label style={{fontSize:11,color:T.textSub}}>Nakit (TL)<input type="number" min="0" max={total} value={cashPart} onChange={e=>{setCashPart(e.target.value);setCardPart(String(Math.max(0,Math.round(((partialMode?paymentTarget:total)-(parseFloat(e.target.value)||0))*100)/100)));}} placeholder="0,00" style={{width:"100%",marginTop:5,padding:"10px",background:T.bg2,color:T.text,border:"0.5px solid rgba(91,65,43,0.12)",borderRadius:9}}/></label>
            <label style={{fontSize:11,color:T.textSub}}>Kart (TL)<input type="number" min="0" max={total} value={cardPart} onChange={e=>setCardPart(e.target.value)} placeholder="0,00" style={{width:"100%",marginTop:5,padding:"10px",background:T.bg2,color:T.text,border:"0.5px solid rgba(91,65,43,0.12)",borderRadius:9}}/></label>
          </div>}
          {splitMode&&<div style={{fontSize:11,color:Math.abs((parseFloat(cashPart)||0)+(parseFloat(cardPart)||0)-total)<0.009?T.accentL:T.danger,marginBottom:12}}>Ödeme toplamı: {fm((parseFloat(cashPart)||0)+(parseFloat(cardPart)||0))} / {fm(total)}</div>}
          <button onClick={()=>{const target=partialMode?paymentTarget:total;const payments=splitMode?[{method:"cash",amount:parseFloat(cashPart)||0},{method:"card",amount:parseFloat(cardPart)||0}]:[{method:pt,amount:target}];if(partialMode&&(!(target>0)||target>total+0.009)){msg("Kısmi ödeme tutarı kalan borçtan büyük olamaz.");return;}if(splitMode&&Math.abs((parseFloat(cashPart)||0)+(parseFloat(cardPart)||0)-target)>0.009){msg("Nakit ve kart toplamı tahsil edilecek tutarla eşleşmeli.");return;}pay(table.id,pt,discVal,pt==="credit"?[{method:"credit",amount:total}]:payments,partialMode);if(pt==="credit"&&table.customerId)setShowPay(false);else if(partialMode&&target<total-0.009)setShowPay(false);}} style={{width:"100%",padding:"15px",background:"linear-gradient(135deg,#F36B3F,#D94D2B)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 16px rgba(243,107,63,0.35)"}}>{partialMode?"Kısmi Tahsil Et · "+fm(paymentTarget):"Tahsil Et · "+fm(total)}</button>
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
  const months=[...new Set([thisMonth(),...orders.map(o=>(o.date||"").slice(0,7)).filter(m=>/^\\d{4}-\\d{2}$/.test(m))])].sort((a,b)=>b.localeCompare(a));
  const [year,setYear]=useState(String(now.getFullYear()));
  const monthLabel=(m)=>{const [y,mm]=m.split("-").map(Number);return new Date(y,mm-1,1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"});};
  const monthOrders=orders.filter(o=>(o.date||"").slice(0,7)===selectedMonth);
  const openOrders=tables.flatMap(t=>(t.order||[]).length?[{date:tod(),total:(t.order||[]).reduce((s,i)=>s+(Number(i.price)||0)*(Number(i.qty)||0),0),items:t.order}]:[]);
  const closedRevenue=monthOrders.reduce((s,o)=>s+(Number(o.total)||0),0);
  const openRevenue=selectedMonth===thisMonth()?openOrders.reduce((s,o)=>s+o.total,0):0;
  const revenue=closedRevenue+openRevenue;
  const productTotals={};
  [...monthOrders,...(selectedMonth===thisMonth()?openOrders:[])].forEach(o=>(o.items||[]).forEach(item=>{const key=(item.name||"Ürün").trim();if(!productTotals[key])productTotals[key]={name:key,revenue:0,qty:0};productTotals[key].revenue+=(Number(item.price)||0)*(Number(item.qty)||0);productTotals[key].qty+=Number(item.qty)||0;}));
  const topProducts=Object.values(productTotals).sort((a,b)=>b.revenue-a.revenue).slice(0,5);
  const yearRevenue=orders.filter(o=>(o.date||"").startsWith(year+"-")).reduce((s,o)=>s+(Number(o.total)||0),0);
  const yearOptions=[...new Set([String(now.getFullYear()),...orders.map(o=>(o.date||"").slice(0,4)).filter(y=>/^\\d{4}$/.test(y))])].sort((a,b)=>b.localeCompare(a));
  const maxProduct=Math.max(1,...topProducts.map(p=>p.revenue));
  return <div className="lurk-screen lurk-month-review">
    <header className="lurk-month-header"><button onClick={()=>setV("home")}>←</button><div><span>THE LURK JOURNAL · MONTHLY EDITION</span><h1>Bu ay nasıl geçti?</h1><p>İşletmenin ritmini ve satış hikâyesini keşfet.</p></div><div className="lurk-month-stamp">L.</div></header>
    <main className="lurk-month-content">
      <section className="lurk-month-hero"><div><span className="lurk-month-kicker">AYLIK PERFORMANS</span><h2>{monthLabel(selectedMonth)}</h2><p>Kapanan adisyonlar{selectedMonth===thisMonth()?" ve açık masalardaki ürünler":""}</p></div><select value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)}>{months.map(m=><option key={m} value={m}>{monthLabel(m)}</option>)}</select><div className="lurk-month-total">{fm(revenue)}</div><span className="lurk-month-spark">✳</span></section>
      <section className="lurk-month-year"><div><span className="lurk-month-kicker">BÜYÜK RESİM</span><h3>Yıllık ciro</h3><p>Seçilen yılın kapanmış adisyon cirosu</p></div><select value={year} onChange={e=>setYear(e.target.value)}>{yearOptions.map(y=><option key={y} value={y}>{y}</option>)}</select><b>{fm(yearRevenue)}</b></section>
      <section className="lurk-month-products"><div className="lurk-month-sectionhead"><div><span className="lurk-month-kicker">MENÜNÜN YILDIZLARI</span><h3>En çok kazandıran 5 ürün</h3></div><span>₺ TOP 5</span></div><p>Ürünler satış tutarına göre sıralanır.</p>
        {topProducts.length?topProducts.map((p,i)=><article key={p.name}><div className="lurk-month-rank">{String(i+1).padStart(2,"0")}</div><div className="lurk-month-productinfo"><b>{p.name}</b><small>{p.qty} adet satıldı</small><div className="lurk-month-track"><i style={{width:(p.revenue/maxProduct*100)+"%"}}/></div></div><strong>{fm(p.revenue)}</strong></article>):<div className="lurk-month-empty">Bu ay için ürün satışı kaydı bulunamadı.</div>}
      </section>
    </main>
  </div>;
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

  const avgTicket=mo.length?totalInc/mo.length:0;
  const orderCount=mo.filter(o=>!o.partialPayment).length;
  const topItems=(()=>{const map={};mo.forEach(o=>(o.items||[]).forEach(it=>{const key=it.name||"Ürün";map[key]=(map[key]||0)+(Number(it.qty)||0);}));return Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,6);})();
  const maxDay=Math.max(1,...days.map(d=>Number(d.inc)||0));
  const maxItem=Math.max(1,...topItems.map(x=>x[1]));
  const cashShare=totalCash+totalCard?Math.round(totalCash/(totalCash+totalCard)*100):0;
  const cardShare=totalCash+totalCard?100-cashShare:0;
  return(
    <div className="lurk-screen lurk-reports-screen lurk-analytics-screen">
      <header className="lurk-analytics-header"><button onClick={()=>setV("home")}>←</button><div><span>BUSINESS INTELLIGENCE / LURK</span><h1>İşletme analizi</h1><p>Satış performansını tek ekranda takip et.</p></div><button className="lurk-analytics-export" onClick={exportMonthCsv}>↓ CSV dışa aktar</button></header>
      <main className="lurk-analytics-content">
        <div className="lurk-analytics-period"><div><span>RAPOR DÖNEMİ</span><b>{ml(sel)}</b></div><div className="lurk-analytics-months">{(months.length?months:[now]).map(m=><button key={m} className={sel===m?"active":""} onClick={()=>setSel(m)}>{ml(m)}</button>)}</div></div>
        <section className="lurk-analytics-kpis">
          <article className="primary"><span>TOPLAM SATIŞ</span><b>{fm(totalInc)}</b><small>{orderCount} tamamlanan adisyon</small><i>↗</i></article>
          <article><span>ORTALAMA FİŞ</span><b>{fm(avgTicket)}</b><small>Adisyon başına satış</small></article>
          <article><span>NAKİT TAHSİLAT</span><b>{fm(totalCash)}</b><small>Toplam tahsilatın %{cashShare}’i</small></article>
          <article><span>KART TAHSİLAT</span><b>{fm(totalCard)}</b><small>Toplam tahsilatın %{cardShare}’i</small></article>
          <article><span>AÇIK VERESİYE</span><b>{fm(Math.max(0,outstanding))}</b><small>{creditSales?fm(creditSales)+" veresiye satış": "Açık satış kaydı yok"}</small></article>
        </section>
        <section className="lurk-analytics-panels">
          <article className="lurk-analytics-panel lurk-analytics-chart"><div className="lurk-analytics-panel-head"><div><span>GÜNLÜK PERFORMANS</span><h2>Satış hareketi</h2></div><small>{days.length} kayıtlı gün</small></div>
            {days.length?<div className="lurk-analytics-bars">{days.slice().reverse().map(d=><div className="lurk-analytics-bar-col" key={d.date}><div className="lurk-analytics-bar-value">{fm(d.inc)}</div><div className="lurk-analytics-bar-track"><i style={{height:Math.max(3,(Number(d.inc)||0)/maxDay*100)+"%"}}/></div><small>{new Date(d.date+"T12:00:00").toLocaleDateString("tr-TR",{day:"2-digit",month:"short"})}</small></div>)}</div>:<div className="lurk-analytics-empty">Bu dönem için satış kaydı yok.</div>}
          </article>
          <article className="lurk-analytics-panel"><div className="lurk-analytics-panel-head"><div><span>ÖDEME DAĞILIMI</span><h2>Tahsilat kanalları</h2></div></div>
            <div className="lurk-analytics-payment"><div className="lurk-analytics-donut" style={{background:"conic-gradient(#F36B3F 0 "+cashShare+"%,#D9C9B6 "+cashShare+"% 100%)"}}><div><b>{cashShare+cardShare?cashShare+"%": "0%"}</b><small>nakit payı</small></div></div><div className="lurk-analytics-legend"><div><i className="cash"/> <span>Nakit</span><b>{fm(totalCash)}</b></div><div><i className="card"/> <span>Kart</span><b>{fm(totalCard)}</b></div></div></div>
          </article>
          <article className="lurk-analytics-panel"><div className="lurk-analytics-panel-head"><div><span>ÜRÜN PERFORMANSI</span><h2>En çok satılanlar</h2></div></div>
            {topItems.length?topItems.map(([name,qty],i)=><div className="lurk-analytics-item" key={name}><span className="rank">{String(i+1).padStart(2,"0")}</span><div><b>{name}</b><div className="lurk-analytics-item-track"><i style={{width:qty/maxItem*100+"%"}}/></div></div><strong>{qty} adet</strong></div>):<div className="lurk-analytics-empty">Ürün bazlı satış verisi bulunamadı.</div>}
          </article>
          <article className="lurk-analytics-panel lurk-analytics-days"><div className="lurk-analytics-panel-head"><div><span>GÜN GÜN KAYIT</span><h2>İşlem geçmişi</h2></div></div>
            {days.map(day=>{const isExp=exp===day.date;const log=day.log;return <div className="lurk-analytics-day" key={day.date}><button onClick={()=>setExp(isExp?null:day.date)}><span><b>{new Date(day.date+"T12:00:00").toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</b><small>{log?ft(log.oa)+" – "+ft(log.ca)+" · ":""}{day.orders.filter(o=>!o.partialPayment).length||log?.count||0} adisyon</small></span><strong>{fm(day.inc)}</strong><i>{isExp?"−":"＋"}</i></button>{isExp&&day.orders.filter(o=>!o.partialPayment).map((o,i)=><div className="lurk-analytics-order" key={i}><span>{o.g||"Misafir"} · {o.table||"Masa"}</span><b>{fm(o.total)}</b></div>)}</div>})}
            {!days.length&&<div className="lurk-analytics-empty">Bu ay kayıt yok.</div>}
          </article>
        </section>
      </main>
    </div>
  );
}

/* ─── LURK+ ─── */
function LurkPlusScreen({members,setMembers,msg,setV}){
  const [showForm,setShowForm]=useState(false),[selectedMemberId,setSelectedMemberId]=useState(null),[name,setName]=useState(""),[balance,setBalance]=useState("");
  function addMember(){
    const clean=name.trim(),amount=Math.round(Number(balance)*100)/100;
    if(!clean){msg("Üye adı gir.");return;}
    if(!balance.trim()||!Number.isFinite(amount)||amount<0){msg("Geçerli bir bakiye gir.");return;}
    if(members.some(m=>m.name.trim().toLocaleLowerCase("tr-TR")===clean.toLocaleLowerCase("tr-TR"))){msg("Bu isimde LURK+ üyesi zaten var.");return;}
    const createdAt=new Date().toISOString();
    setMembers(prev=>[{id:uid(),name:clean,balance:amount,createdAt,history:[{id:uid(),type:"topup",date:createdAt,amount,balanceAfter:amount,note:"Başlangıç bakiyesi"}]},...prev]);
    setName("");setBalance("");setShowForm(false);msg("LURK+ üyesi eklendi.");
  }
  const sorted=members.slice().sort((a,b)=>a.name.localeCompare(b.name,"tr"));
  const totalBalance=members.reduce((sum,m)=>sum+(Number(m.balance)||0),0);
  const selected=members.find(m=>m.id===selectedMemberId);
  return <div className="lurk-screen lurk-plus-v2">
    <header className="lurk-plus-header"><button onClick={()=>setV("home")}>←</button><div><span>THE LURK CLUB · MEMBERSHIP</span><h1>LURK<span>+</span></h1><p>Sadık misafirler, güzel alışkanlıklar.</p></div><button className="lurk-plus-add" onClick={()=>setShowForm(true)}>＋ Üye ekle</button></header>
    <main className="lurk-plus-layout">
      <section className="lurk-plus-intro"><div className="lurk-plus-introcopy"><span>GOOD PEOPLE. GOOD COFFEE.</span><h2>LURK'un müdavimleri<br/>burada buluşuyor.</h2><p>Üyelik bakiyelerini ve tüm hareketleri tek ekrandan takip et.</p></div><div className="lurk-plus-emblem">L<span>+</span></div><div className="lurk-plus-stats"><article><small>TOPLAM ÜYE</small><b>{members.length}</b></article><article><small>TOPLAM ÜYE BAKİYESİ</small><b>{fm(totalBalance)}</b></article><article><small>ORTALAMA BAKİYE</small><b>{fm(members.length?totalBalance/members.length:0)}</b></article></div></section>
      <div className="lurk-plus-body"><section className="lurk-plus-list"><div className="lurk-plus-sectionhead"><div><span>THE REGULARS</span><h2>Üye listesi</h2></div><small>{members.length} KAYIT</small></div>
        {sorted.length?sorted.map(m=><button className={"lurk-plus-member "+(selectedMemberId===m.id?"selected":"")} key={m.id} onClick={()=>setSelectedMemberId(selectedMemberId===m.id?null:m.id)}><div className="lurk-plus-avatar">{m.name.trim().charAt(0).toLocaleUpperCase("tr-TR")}</div><div className="lurk-plus-membername"><b>{m.name}</b><small>Üyelik {new Date(m.createdAt||Date.now()).toLocaleDateString("tr-TR")}</small></div><div className="lurk-plus-balance"><b>{fm(m.balance)}</b><small>BAKİYE</small></div><span className="lurk-plus-chevron">›</span></button>):<div className="lurk-plus-empty"><span>＋</span><b>İlk müdavimini ekle.</b><small>Yeni bir LURK+ üyeliği oluşturarak başlayabilirsin.</small><button onClick={()=>setShowForm(true)}>Üye oluştur</button></div>}
      </section>
      <aside className="lurk-plus-detail">{selected?<><div className="lurk-plus-detailtop"><div><span>MEMBER PROFILE</span><h2>{selected.name}</h2></div><button onClick={()=>setSelectedMemberId(null)}>×</button></div><div className="lurk-plus-balancehero"><small>GÜNCEL ÜYE BAKİYESİ</small><b>{fm(selected.balance)}</b><span>LURK+ WALLET</span></div><div className="lurk-plus-historyhead"><b>Bakiye hareketleri</b><span>{(selected.history||[]).length} İŞLEM</span></div><div className="lurk-plus-history">{(!selected.history||!selected.history.length)?<p>Henüz hareket kaydı yok.</p>:selected.history.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).map(h=><article key={h.id}><div className={"lurk-plus-hicon "+h.type}>{h.type==="topup"?"＋":h.type==="refund"?"↩":"−"}</div><div className="lurk-plus-htext"><b>{h.type==="topup"?(h.note||"Bakiye yüklendi"):h.type==="refund"?"Ürün iadesi":(h.itemName||"Ürün alımı")}</b><small>{new Date(h.date).toLocaleString("tr-TR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}{h.table?" · "+h.table:""}</small><small>İşlem sonrası bakiye: {fm(h.balanceAfter)}</small></div><strong className={h.type==="purchase"?"negative":""}>{h.type==="purchase"?"−":"+"}{fm(h.amount)}</strong></article>)}</div></>:<div className="lurk-plus-detailempty"><div>✳</div><b>Bir üye seç.</b><small>Üyenin bakiye geçmişi ve işlem detayları burada görünecek.</small></div>}</aside></div>
    </main>
    {showForm&&<Modal><div className="lurk-plus-form"><span>WELCOME TO THE CLUB</span><h2>Yeni LURK+ üyesi</h2><p>Üyenin adını ve başlangıç bakiyesini belirle.</p><label>Üye adı *</label><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Ad soyad"/><label>Başlangıç bakiyesi (TL) *</label><input value={balance} onChange={e=>setBalance(e.target.value)} inputMode="decimal" placeholder="Örn. 500" onKeyDown={e=>{if(e.key==="Enter")addMember();}}/><button onClick={addMember}>Üyeyi kaydet ↗</button><button className="lurk-plus-cancel" onClick={()=>setShowForm(false)}>Vazgeç</button></div></Modal>}
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
  const availableMonths=[...new Set([currentMonth,...orders.map(o=>(o.date||"").slice(0,7)).filter(m=>/^\\d{4}-\\d{2}$/.test(m))])].sort((a,b)=>b.localeCompare(a));
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
    <div className="lurk-screen lurk-customers-screen lurk-crm-screen">
      <header className="lurk-crm-header">
        <button className="lurk-crm-back" onClick={()=>setV("home")}>←</button>
        <div className="lurk-crm-title"><span>GUEST RELATIONSHIP / LURK</span><h1>Müşteri defteri</h1><p>Misafirlerini tanı, ziyaretlerini takip et.</p></div>
        <button className="lurk-crm-add" onClick={openNew}>＋ Yeni müşteri</button>
      </header>
      <main className="lurk-crm-content">
        <section className="lurk-crm-overview">
          <div className="lurk-crm-stat"><span>KAYITLI MİSAFİR</span><b>{customers.length}</b><small>Toplam müşteri profili</small></div>
          <div className="lurk-crm-stat featured"><span>TOPLAM HARCAMA</span><b>{fm(customers.reduce((sum,c)=>sum+totalFor(c),0))}</b><small>Kayıtlı müşterilerin adisyonları</small></div>
          <div className="lurk-crm-stat"><span>BU AY AKTİF</span><b>{customers.filter(c=>monthlyTotalFor(c)>0).length}</b><small>En az bir alışveriş yapan</small></div>
        </section>
        <section className="lurk-crm-directory">
          <div className="lurk-crm-directory-head"><div><span>MÜŞTERİ PORTFÖYÜ</span><h2>Misafirler</h2><p>{filtered.length} kayıt · {monthLabel(selectedMonth)} harcamasına göre sıralı</p></div>
            <div className="lurk-crm-tools"><label className="lurk-crm-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="İsim veya telefon ara..."/></label>
            <select value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)} aria-label="Ay seç">{availableMonths.map(month=><option key={month} value={month}>{monthLabel(month)}</option>)}</select></div>
          </div>
          <div className="lurk-crm-table-wrap"><div className="lurk-crm-table-head"><span>MİSAFİR</span><span>ZİYARET</span><span>TOPLAM HARCAMA</span><span>SEÇİLİ AY</span><span>İŞLEM</span></div>
            {filtered.map((c,index)=><article className="lurk-crm-row" key={c.id}>
              <button className="lurk-crm-guest" onClick={()=>setDetail(c)}><span className="lurk-crm-avatar">{c.name.trim().split(/\\s+/).slice(0,2).map(x=>x[0]).join("").toLocaleUpperCase("tr-TR")}</span><span><b>{c.name}</b><small>{c.phone||"Telefon eklenmemiş"}</small></span></button>
              <div className="lurk-crm-orders"><b>{orderCountFor(c)}</b><small>sipariş</small></div>
              <strong className="lurk-crm-total">{fm(totalFor(c))}</strong>
              <strong className="lurk-crm-month">{fm(monthlyTotalFor(c))}</strong>
              <div className="lurk-crm-actions"><button onClick={()=>setDetail(c)}>Detay</button><button onClick={()=>openEdit(c)}>Düzenle</button></div>
            </article>)}
            {!filtered.length&&<div className="lurk-crm-empty"><span>♙</span><b>{query?"Müşteri bulunamadı":"Henüz müşteri yok"}</b><p>{query?"Arama kelimesini değiştirip tekrar dene.":"İlk müşteri profilini oluşturarak başlayabilirsin."}</p>{!query&&<button onClick={openNew}>＋ İlk müşteriyi ekle</button>}</div>}
          </div>
        </section>
      </main>
      {showForm&&<Modal><div style={{fontSize:18,fontWeight:800,marginBottom:16,color:T.text}}>{editing?"Müşteriyi Düzenle":"Yeni Müşteri"}</div>
        <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Ad soyad *</label><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Müşteri adı" style={{width:"100%",padding:12,marginBottom:12,background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.12)",borderRadius:10}}/>
        <button onClick={saveCustomer} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>Kaydet</button>
        <button onClick={()=>setShowForm(false)} style={{width:"100%",padding:12,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Vazgeç</button>
      </Modal>}
      {detail&&<Modal><div style={{fontSize:18,fontWeight:800,color:T.text}}>{detail.name}</div><div style={{fontSize:12,color:T.textSub,margin:"5px 0 16px"}}>Müşteri özeti</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}><div style={{background:"rgba(243,107,63,.09)",border:"1px solid rgba(243,107,63,.16)",borderRadius:12,padding:13}}><div style={{fontSize:10,color:T.textSub,marginBottom:5}}>{monthLabel(selectedMonth)} harcaması</div><div style={{fontSize:18,fontWeight:850,color:T.accentL}}>{fm(monthlyTotalFor(detail))}</div></div><div style={{background:T.bg2,border:"1px solid rgba(91,65,43,.07)",borderRadius:12,padding:13}}><div style={{fontSize:10,color:T.textSub,marginBottom:5}}>Toplam harcama</div><div style={{fontSize:18,fontWeight:850,color:T.text}}>{fm(totalFor(detail))}</div></div></div>
        <div style={{fontWeight:750,fontSize:13,color:T.text,marginBottom:8}}>Son adisyonlar</div>
        {orders.filter(o=>(o.customerId&&o.customerId===detail.id)||(!o.customerId&&o.g&&o.g.trim().toLocaleLowerCase("tr-TR")===detail.name.trim().toLocaleLowerCase("tr-TR"))).slice(0,6).map(o=><div key={o.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(91,65,43,.06)",fontSize:12,color:T.text}}><span>{o.date} · {o.table||"Masa"}</span><b>{fm(o.total)}</b></div>)}
        <button onClick={()=>setDetail(null)} style={{width:"100%",padding:12,marginTop:14,background:T.bg3,color:T.text,border:"1px solid rgba(91,65,43,.1)",borderRadius:10,fontWeight:700,cursor:"pointer"}}>Kapat</button>
      </Modal>}
      {ledgerAction&&detail&&<Modal><div style={{fontSize:18,fontWeight:800,color:T.text,marginBottom:6}}>{ledgerAction==="debt"?"Borç Ekle":"Tahsilat Al"}</div><div style={{fontSize:12,color:T.textSub,marginBottom:14}}>{detail.name} · Mevcut bakiye {fm(balanceFor(detail))}</div>
        <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Tutar (TL)</label><input autoFocus type="number" min="0.01" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0,00" style={{width:"100%",padding:12,marginBottom:12,background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.12)",borderRadius:10}}/>
        {ledgerAction==="payment"&&<><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Tahsilat yöntemi</label><div style={{display:"flex",gap:8,marginBottom:12}}>{["cash","card"].map(m=><button key={m} onClick={()=>setMethod(m)} style={{flex:1,padding:10,background:method===m?"rgba(243,107,63,.15)":T.bg2,color:method===m?T.accentL:T.textSub,border:"1px solid "+(method===m?T.accent:"rgba(91,65,43,.1)"),borderRadius:9,cursor:"pointer"}}>{m==="cash"?"Nakit":"Kart"}</button>)}</div></>}
        <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Not (isteğe bağlı)</label><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Örn. önceki sipariş" style={{width:"100%",padding:12,marginBottom:14,background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.12)",borderRadius:10}}/>
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
  const[activeCat,setActiveCat]=useState("Tümü");
  const[search,setSearch]=useState("");
  const cats=[...new Set(menu.map(m=>m.cat))];
  const enabledCount=menu.filter(m=>m.on).length;
  const visibleItems=menu.filter(m=>(activeCat==="Tümü"||m.cat===activeCat)&&m.name.toLocaleLowerCase("tr").includes(search.toLocaleLowerCase("tr")));
  function openEdit(item){setEditingItem(item);setNewName(item.name);setNewPrice(String(item.price));setNewCat(item.cat);setAddError("");}
  function saveEdit(){
    const validated=validateMenuItemInput(newName,newPrice);
    if(validated.error){setAddError(validated.error);return;}
    setMenu(prev=>prev.map(m=>m.id===editingItem.id?{...m,name:validated.name,price:validated.price}:m));
    setEditingItem(null);setNewName("");setNewPrice("");setAddError("");
  }
  function resetForm(){setNewName("");setNewPrice("");setNewCat(cats[0]||"Kahve");setAddError("");}
  return(
    <div className="lurk-screen lurk-menu-screen lurk-catalog-screen">
      <div className="lurk-catalog-topbar">
        <button className="lurk-catalog-back" onClick={()=>setV("settings")}>←</button>
        <div className="lurk-catalog-heading"><span>ÜRÜN YÖNETİMİ / LURK MENU</span><h1>Menü kataloğu</h1><p>Ürünlerini, fiyatlarını ve satış durumlarını tek yerden yönet.</p></div>
        <div className="lurk-catalog-top-actions"><span className="lurk-catalog-live"><i/> {enabledCount} ürün satışta</span><button className="lurk-catalog-add" onClick={()=>{resetForm();setShowAdd(true);}}>＋ Yeni ürün</button></div>
      </div>
      <div className="lurk-catalog-workspace">
        <aside className="lurk-catalog-sidebar">
          <div className="lurk-catalog-side-label">KATEGORİLER</div>
          <button className={"lurk-catalog-category"+(activeCat==="Tümü"?" active":"")} onClick={()=>setActiveCat("Tümü")}><span>▦</span><b>Tüm ürünler</b><small>{menu.length}</small></button>
          {cats.map((cat,i)=><button key={cat} className={"lurk-catalog-category"+(activeCat===cat?" active":"")} onClick={()=>setActiveCat(cat)}><span>{["☕","🍵","🥐","🍰","🧃"][i%5]}</span><b>{cat}</b><small>{menu.filter(m=>m.cat===cat).length}</small></button>)}
          <div className="lurk-catalog-side-note"><b>MENÜ DURUMU</b><strong>{enabledCount}<small> / {menu.length}</small></strong><span>ürün aktif olarak listeleniyor</span></div>
        </aside>
        <main className="lurk-catalog-main">
          <div className="lurk-catalog-toolbar"><div><span className="lurk-catalog-eyebrow">ÜRÜN ENVANTERİ</span><h2>{activeCat==="Tümü"?"Tüm ürünler":activeCat}</h2><p>{visibleItems.length} ürün görüntüleniyor</p></div><label className="lurk-catalog-search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ürün ara..."/></label></div>
          <div className="lurk-catalog-grid">
            {visibleItems.map(item=><article className={"lurk-catalog-product"+(!item.on?" is-off":"")} key={item.id}>
              <div className={"lurk-catalog-product-art cat-"+(item.cat||"").toLocaleLowerCase("tr").replace(/[^a-z0-9]+/g,"-")}><span>{item.cat?.toLocaleLowerCase("tr").includes("matcha")?"🍵":item.cat?.toLocaleLowerCase("tr").includes("kahve")?"☕":item.cat?.toLocaleLowerCase("tr").includes("tatlı")?"🍰":"✳"}</span><small>{item.cat}</small></div>
              <div className="lurk-catalog-product-body"><div className="lurk-catalog-product-title"><h3>{item.name}</h3><span className={"lurk-catalog-state"+(item.on?" on":"")}>{item.on?"AKTİF":"PASİF"}</span></div><div className="lurk-catalog-product-bottom"><strong>{fm(item.price)}</strong><button onClick={()=>openEdit(item)}>Düzenle <span>↗</span></button></div>
              <button className={"lurk-catalog-toggle"+(item.on?" on":"")} onClick={()=>setMenu(p=>p.map(m=>m.id===item.id?{...m,on:!m.on}:m))}><i/>{item.on?"Satışta":"Satış dışı"}</button></div>
            </article>)}
            {!visibleItems.length&&<div className="lurk-catalog-empty"><span>⌕</span><b>Ürün bulunamadı</b><p>Arama kelimesini veya kategori seçimini değiştir.</p></div>}
          </div>
        </main>
      </div>
      {(editingItem||showAdd)&&(
        <Modal>
          <div style={{fontWeight:800,fontSize:19,marginBottom:5,color:T.text}}>{editingItem?"Ürünü düzenle":"Yeni ürün oluştur"}</div>
          <div style={{fontSize:12,color:T.textSub,marginBottom:18}}>Ürün bilgilerini güncelle.</div>
          <label style={{display:"block",fontSize:12,fontWeight:700,color:T.textSub,marginBottom:6}}>ÜRÜN ADI</label>
          <input autoFocus value={newName} onChange={e=>{setNewName(e.target.value);setAddError("");}} placeholder="Örn. Iced Matcha Latte" style={{width:"100%",padding:"13px 14px",border:"1px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:14,background:T.bg2,color:T.text}}/>
          <label style={{display:"block",fontSize:12,fontWeight:700,color:T.textSub,marginBottom:6}}>FİYAT (TL)</label>
          <input type="number" min="0.01" step="0.01" value={newPrice} onChange={e=>{setNewPrice(e.target.value);setAddError("");}} placeholder="0,00" style={{width:"100%",padding:"13px 14px",border:"1px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:14,background:T.bg2,color:T.text}}/>
          <label style={{display:"block",fontSize:12,fontWeight:700,color:T.textSub,marginBottom:6}}>KATEGORİ</label>
          <select value={newCat} onChange={e=>setNewCat(e.target.value)} style={{width:"100%",padding:"13px 14px",border:"1px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:14,background:T.bg2,color:T.text}}>
            {cats.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          {addError&&<div role="alert" style={{fontSize:12,color:T.danger,marginBottom:10}}>{addError}</div>}
          <button onClick={()=>{if(editingItem){saveEdit();return;}const validated=validateMenuItemInput(newName,newPrice);if(validated.error){setAddError(validated.error);return;}setMenu(p=>[...p,{id:Date.now(),name:validated.name,price:validated.price,cat:newCat,on:true}]);setShowAdd(false);resetForm();}} style={{width:"100%",padding:14,background:"linear-gradient(135deg,#F36B3F,#D94D2B)",border:0,borderRadius:11,color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>{editingItem?"Değişiklikleri kaydet":"Ürünü kataloğa ekle"}</button>
          <button onClick={()=>{setEditingItem(null);setShowAdd(false);setAddError("");}} style={{width:"100%",padding:11,background:"transparent",border:0,color:T.textSub,fontSize:13,cursor:"pointer",marginTop:5}}>Vazgeç</button>
        </Modal>
      )}
    </div>
  );
}

/* ─── SETTINGS ─── */
function validateBackup(backup){
  if(!backup||typeof backup!=="object"||Array.isArray(backup))return "Yedek dosyasının biçimi geçersiz.";
  if(backup.app!=="LURK POS"||backup.formatVersion!==1)return "Bu dosya desteklenen bir LURK POS yedeği değil.";
  const d=backup.data;
  if(!d||typeof d!=="object"||Array.isArray(d))return "Yedek verileri bulunamadı.";
  for(const key of ["lurk_t","lurk_o","lurk_l","lurk_customers","lurk_credit","lurk_m"]){if(!Array.isArray(d[key]))return "Yedek içindeki "+key+" verisi geçersiz."}
  if(d.lurk_plus_members!==undefined&&!Array.isArray(d.lurk_plus_members))return "LURK+ üye verileri geçersiz.";
  if(d.lurk_d!==null&&d.lurk_d!==undefined&&(typeof d.lurk_d!=="object"||Array.isArray(d.lurk_d)))return "Gün durumu verisi geçersiz.";
  return "";
}

function SettingsScreen({setV,tables,orders,logs,customers,creditEntries,lurkPlusMembers,menu,day,setTables,setOrders,setLogs,setCustomers,setCreditEntries,setLurkPlusMembers,setMenu,setDay}){
  const [backupMsg,setBackupMsg]=useState("");
  const [importMsg,setImportMsg]=useState("");
  const [pendingImport,setPendingImport]=useState(null);
  const [importBusy,setImportBusy]=useState(false);
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
    setTables(d.lurk_t);setOrders(d.lurk_o);setLogs(d.lurk_l);setCustomers(d.lurk_customers);setCreditEntries(d.lurk_credit);setLurkPlusMembers(d.lurk_plus_members||[]);setMenu(d.lurk_m);setDay(d.lurk_d??null);
    setImportMsg("Yedek içeri aktarıldı. Kayıt göstergesi tamamlanana kadar uygulamayı kapatma.");
    setPendingImport(null);
  }
  function exportBackup(){
    const backup={app:"LURK POS",formatVersion:1,exportedAt:new Date().toISOString(),data:{lurk_t:tables,lurk_o:orders,lurk_l:logs,lurk_customers:customers,lurk_credit:creditEntries,lurk_plus_members:lurkPlusMembers,lurk_m:menu,lurk_d:day}};
    const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download="lurk-pos-yedek-"+tod()+".json";
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    setBackupMsg("Yedek dosyası indirildi. Güvenli bir yerde sakla.");
  }
  return(
    <div className="lurk-screen lurk-settings-screen lurk-settings-v2">
      <header className="lurk-settings-header">
        <button onClick={()=>setV("home")} aria-label="Ana ekrana dön">←</button>
        <div><span>GOOD MOOD OPERATING SYSTEM</span><h1>Sistem ayarları</h1><p>LURK POS'un yönetim ve veri güvenliği merkezi</p></div>
        <div className="lurk-settings-mark">L.</div>
      </header>
      <main className="lurk-settings-layout">
        <aside className="lurk-settings-rail">
          <span className="lurk-settings-eyebrow">YÖNETİM MERKEZİ</span>
          <div className="lurk-settings-railitem active"><b>01</b><span>Genel bakış<small>Sistem ve kayıtlar</small></span><i>✳</i></div>
          <button className="lurk-settings-railitem" onClick={()=>setV("menu")}><b>02</b><span>Menü yönetimi<small>Ürünler ve fiyatlar</small></span><i>↗</i></button>
          <div className="lurk-settings-note"><span>✦</span><b>LURK'te her şey yolunda.</b><small>Önemli verilerini düzenli aralıklarla yedeklemeyi unutma.</small></div>
        </aside>
        <section className="lurk-settings-main">
          <div className="lurk-settings-overview">
            <div><span className="lurk-settings-eyebrow">SİSTEM ÖZETİ</span><h2>Her şey kontrol altında.</h2><p>İşletme kayıtların tek yerde, düzenli ve güvende.</p></div>
            <div className="lurk-settings-live"><i/> ÇALIŞMAYA HAZIR</div>
          </div>
          <div className="lurk-settings-stats">
            <article><span>MASALAR</span><b>{tables.length}</b><small>Tanımlı masa</small></article>
            <article><span>MENÜ ÜRÜNLERİ</span><b>{menu.length}</b><small>Katalog kaydı</small></article>
            <article><span>MÜŞTERİLER</span><b>{customers.length}</b><small>Müşteri kaydı</small></article>
            <article><span>ADİSYONLAR</span><b>{orders.length}</b><small>İşlem kaydı</small></article>
          </div>
          <div className="lurk-settings-sectionhead"><div><span className="lurk-settings-eyebrow">VERİ GÜVENLİĞİ</span><h2>Yedekleme ve geri yükleme</h2></div><span className="lurk-settings-shield">⌑</span></div>
          <div className="lurk-settings-backupgrid">
            <article className="lurk-settings-backupcard">
              <div className="lurk-settings-cardicon orange">↓</div><span className="lurk-settings-eyebrow">DIŞA AKTAR</span><h3>Verilerini yedekle</h3>
              <p>Masa durumları, adisyonlar, raporlar, müşteriler, veresiye defteri ve menüyü tek bir JSON dosyasına indir. Mevcut kayıtların değişmez.</p>
              <button className="lurk-settings-primary" onClick={exportBackup}>Yedek dosyasını indir <span>↗</span></button>
              {backupMsg&&<div role="status" className="lurk-settings-message">{backupMsg}</div>}
            </article>
            <article className="lurk-settings-backupcard">
              <div className="lurk-settings-cardicon">↑</div><span className="lurk-settings-eyebrow">İÇE AKTAR</span><h3>Yedekten geri yükle</h3>
              <p>LURK POS tarafından oluşturulmuş, biçimi doğrulanmış JSON yedeği seç. Geri yükleme mevcut kayıtların yerine geçer.</p>
              <label className="lurk-settings-upload">{importBusy?"Yedek okunuyor…":"Yedek dosyası seç"} <span>＋</span><input type="file" accept=".json,application/json" disabled={importBusy} onChange={e=>inspectBackup(e.target.files?.[0])}/></label>
              {importMsg&&<div role="status" className="lurk-settings-message">{importMsg}</div>}
              {pendingImport&&<div className="lurk-settings-confirm"><small>Seçilen dosya: <b>{pendingImport.filename}</b></small><button onClick={applyBackup}>Mevcut verileri değiştir ve geri yükle</button><button className="lurk-settings-cancel" onClick={()=>{setPendingImport(null);setImportMsg("Geri yükleme iptal edildi.");}}>İptal</button></div>}
            </article>
          </div>
          <p className="lurk-settings-footnote">Güvenlik notu · Yedek dosyası hassas müşteri ve satış bilgileri içerebilir. Dosyayı güvenli bir yerde sakla.</p>
        </section>
      </main>
    </div>
  );
}
/* ─── SHARED ─── */
function Modal({children}){
  return(
    <div className="lurk-modal-backdrop" style={{position:"fixed",inset:0,background:"rgba(48,40,32,0.42)",zIndex:100,display:"flex",alignItems:"flex-end"}}>
      <div className="lurk-modal-panel" style={{background:"#FFF9EF",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,margin:"0 auto",padding:"20px 16px 36px",maxHeight:"88vh",overflowY:"auto",border:"1px solid rgba(91,65,43,0.1)"}}>
        {children}
      </div>
    </div>
  );
}

function Confirm({title,msg,onOk,onCancel}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}}>
      <div style={{background:"#FFF9EF",borderRadius:16,width:280,overflow:"hidden",border:"0.5px solid rgba(91,65,43,0.12)"}}>
        <div style={{padding:"22px 18px 16px",textAlign:"center"}}>
          <div style={{fontWeight:700,fontSize:17,marginBottom:6,color:T.text}}>{title}</div>
          {msg&&<div style={{fontSize:13,color:T.textSub}}>{msg}</div>}
        </div>
        <div style={{borderTop:"0.5px solid rgba(91,65,43,0.08)",display:"flex"}}>
          <button onClick={onCancel} style={{flex:1,padding:"15px 0",background:"transparent",border:"none",borderRight:"0.5px solid rgba(91,65,43,0.08)",color:T.text,fontSize:16,cursor:"pointer"}}>İptal</button>
          <button onClick={onOk} style={{flex:1,padding:"15px 0",background:"transparent",border:"none",color:T.danger,fontWeight:700,fontSize:16,cursor:"pointer"}}>Onayla</button>
        </div>
      </div>
    </div>
  );
}
