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
      setTbl(Array.isArray(t)?t:[]);
      setOrd(Array.isArray(o)?o:[]);
      setCustomers(Array.isArray(c)?c:[]);
      setCreditEntries(Array.isArray(ce)?ce:[]);
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
`}</style>
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
      {view==="settings"&&<SettingsScreen setV={setV} tables={tables} orders={orders} logs={logs} customers={customers} creditEntries={creditEntries} menu={menu} day={day} setTables={setTbl} setOrders={setOrd} setLogs={setLogs} setCustomers={setCustomers} setCreditEntries={setCreditEntries} setMenu={setMenu} setDay={setDay}/>}
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
    {k:"tables",label:"Masalar",icon:"🪑",sub:openT.length>0?openT.length+" açık masa":"Tüm masalar",tone:"#FCE0D2"},
    {k:"reports",label:"Raporlar",icon:"📈",sub:"Satış geçmişi",tone:"#DCEBDD"},
    {k:"customers",label:"Müşteriler",icon:"🧑‍🤝‍🧑",sub:"Aylık sıralama",tone:"#E5E0F5"},
    {k:"lurkPlus",label:"LURK+",icon:"🎟️",sub:"Ön ödemeli üyeler",tone:"#F8E8B9"},
    {k:"monthReview",label:"Bu ay nasıl geçti?",icon:"🏆",sub:"Ciro ve en çok kazandıran 5 ürün",tone:"#DCEAF4"},
    {k:"menu",label:"Menü",icon:"🥤",sub:"Ürün yönetimi",tone:"#F5DFE5"},
  ];

  return(
    <div className="lurk-screen lurk-home-screen lurk-console-home">
      <header className="lurk-console-topbar">
        <div className="lurk-console-brand"><img src="/lurk-logo.svg" alt="LURK POS"/><span>COFFEE · PEOPLE · GOOD MOOD</span></div>
        <div className="lurk-console-meta"><span className="lurk-console-clock">{new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}</span><span className={"lurk-console-open "+(day?"is-open":"")}><i/>{day?"Gün açık":"Gün kapalı"}</span></div>
      </header>
      <section className="lurk-console-stage">
        <div className="lurk-console-copy"><div className="lurk-console-eyebrow">LURK GOOD MOOD CLUB</div><h1>Bugün güzel<br/><em>şeyler yapalım.</em></h1><p>Kahveni hazırla, masanı aç. Günün ritmi burada başlıyor.</p><div className="lurk-console-live"><span><b>{openT.length}</b> açık masa</span><span className="lurk-console-live-dot"/><span><b>{fm(todInc+openInc)}</b> bugünkü satış</span></div></div>
        <div className="lurk-console-art" aria-hidden="true"><div className="lurk-art-sun"/><div className="lurk-art-window"><span/><span/><span/></div><div className="lurk-art-plant">✳</div><div className="lurk-art-cup">☕</div><div className="lurk-art-caption">LURK<br/>IS A<br/>GOOD<br/>IDEA.</div></div>
      </section>
      <section className="lurk-console-launcher">
        <div className="lurk-console-section-title"><div><span>CONTROL CENTER</span><h2>Nereye gidiyoruz?</h2></div><span className="lurk-console-hint">Bir alan seç ve başla <b>↘</b></span></div>
        <div className="lurk-console-apps">
          {[
            {k:"tables",label:"Adisyon",sub:"Yeni sipariş oluştur",icon:"☕",tone:"peach",primary:true},
            {k:"tables",label:"Masa düzeni",sub:"Masalar ve alanlar",icon:"🪑",tone:"sage"},
            {k:"menu",label:"Ürünler",sub:"Menü ve stok",icon:"🍄",tone:"butter"},
            {k:"customers",label:"Müşteriler",sub:"Müşteri kartları",icon:"⭐",tone:"lilac"},
            {k:"reports",label:"Raporlar",sub:"Günlük satışlar",icon:"📊",tone:"blue"},
            {k:"settings",label:"Ayarlar",sub:"Sistem tercihleri",icon:"⚙️",tone:"rose"},
          ].map(p=><button key={p.label} className={"lurk-console-app lurk-tone-"+p.tone+(p.primary?" is-primary":"")} onClick={()=>setV(p.k)}><span className="lurk-console-app-icon">{p.icon}</span><span className="lurk-console-app-name">{p.label}</span><span className="lurk-console-app-sub">{p.sub}</span><span className="lurk-console-app-arrow">↗</span></button>)}
        </div>
      </section>
      <footer className="lurk-console-footer"><div className="lurk-console-footer-note"><span className="lurk-footer-star">✳</span><span>GOOD MOOD IS ON THE MENU.</span></div><button onClick={day?closeDay:openDay} className={"lurk-console-day-button "+(day?"is-closing":"")}><span>{day?"◼":"▶"}</span>{day?"Günü kapat":"Günü başlat"}</button></footer>
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
      <div style={{background:"rgba(255,249,239,0.97)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(91,65,43,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{fontSize:23,fontWeight:850,letterSpacing:"-.7px",flex:1}}>Masalar</div>
        <button onClick={()=>setShowAll(p=>!p)} style={{background:"rgba(91,65,43,0.06)",border:"0.5px solid rgba(91,65,43,0.12)",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",color:T.textSub,fontWeight:600}}>{showAll?"Açıklar":"Tümü"}</button>
        <button onClick={()=>setShowNew(true)} style={{background:"#F36B3F",border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",color:"#fff",fontWeight:700}}>+ Masa</button>
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
              <div key={t.id} style={{background:isOpen?"#FFF3E9":"#FFF9EF",border:"1px solid "+(isOpen?"rgba(243,107,63,0.24)":"rgba(91,65,43,0.09)"),borderRadius:21,padding:"17px 15px",position:"relative",overflow:"hidden",boxShadow:isOpen?"0 4px 0 rgba(217,90,53,0.10)":"0 3px 0 rgba(91,65,43,0.045)"}}>
                
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{fontSize:14,fontWeight:850,color:T.text,letterSpacing:"-.2px"}}>{t.g||t.lbl}</div>
                  <button onClick={()=>setDelId(t.id)} style={{background:"none",border:"none",cursor:"pointer",color:T.textDim,fontSize:16,padding:"0 0 0 8px",lineHeight:1}}>×</button>
                </div>
                
                <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:isOpen?T.accentD:T.textDim,fontWeight:750,marginBottom:13}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:isOpen?"#F36B3F":"#C9BFB2",boxShadow:isOpen?"0 0 0 3px rgba(243,107,63,.12)":"none"}}/>
                  {isOpen?fm(total):"Şimdilik boş"}
                </div>
                <button onClick={()=>{setSel(t.id);setV("order");}} style={{width:"100%",padding:"9px",background:isOpen?"#F36B3F":"#F1E5D4",border:"1px solid "+(isOpen?"#F36B3F":"rgba(91,65,43,0.1)"),borderRadius:12,color:isOpen?"#fff":T.text,fontSize:12,fontWeight:800,cursor:"pointer"}}>
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

      {/* MENÜ GÖRÜNÜMÜ */}
      {showMenu&&(
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          {/* Sol: dikey kategori */}
          <div style={{width:72,background:"rgba(91,65,43,0.02)",borderRight:"0.5px solid rgba(91,65,43,0.06)",display:"flex",flexDirection:"column",overflowY:"auto",flexShrink:0}}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setSelCat(c)} style={{padding:"14px 4px",border:"none",background:selCat===c?"rgba(243,107,63,0.12)":"transparent",borderLeft:"3px solid "+(selCat===c?T.accent:"transparent"),color:selCat===c?T.accent:T.textSub,fontSize:11,fontWeight:selCat===c?700:500,cursor:"pointer",textAlign:"center",lineHeight:1.3,flexShrink:0}}>{c}</button>
            ))}
          </div>
          {/* Sağ: ürün grid */}
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <div style={{flex:1,overflowY:"auto",padding:"10px 10px "+(itemCount>0?"80px":"20px")}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ürün ara…" aria-label="Menüde ürün ara" style={{width:"100%",boxSizing:"border-box",padding:"11px 13px",marginBottom:10,borderRadius:10,border:"1px solid rgba(91,65,43,0.1)",background:"rgba(91,65,43,0.04)",color:T.text,fontSize:13,outline:"none"}} />
              <div className="lurk-product-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
                {menu.filter(m=>m.on&&(search.trim()?m.name.toLocaleLowerCase("tr-TR").includes(search.trim().toLocaleLowerCase("tr-TR")):m.cat===selCat)).map(item=>{
                  const inCart=table.order.filter(o=>o.id===item.id).reduce((sum,o)=>sum+o.qty,0);
                  const isFlash=flash===item.id;
                  return(
                    <button key={item.id} onClick={()=>handleAdd(item)} style={{background:isFlash?"rgba(243,107,63,0.25)":inCart>0?"rgba(243,107,63,0.1)":T.bg2,border:"0.5px solid "+(inCart>0?"rgba(243,107,63,0.35)":"rgba(91,65,43,0.08)"),borderRadius:12,padding:"12px 10px",cursor:"pointer",textAlign:"left",color:T.text,position:"relative",transition:"background 0.15s",outline:"none"}}>
                      {inCart>0&&<span style={{position:"absolute",top:6,right:8,background:T.accent,color:"#fff",borderRadius:20,fontSize:10,fontWeight:800,padding:"1px 6px"}}>×{inCart}</span>}
                      {isFlash&&<div style={{position:"absolute",inset:0,borderRadius:12,border:"2px solid #F36B3F",pointerEvents:"none"}}/>}
                      <div style={{fontSize:11,fontWeight:700,marginBottom:5,paddingRight:inCart>0?28:0,lineHeight:1.3,color:T.text}}>{item.name}</div>
                      <div style={{fontSize:14,fontWeight:800,color:inCart>0?T.accentL:T.textDim}}>{fm(item.price)}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            {itemCount>0&&(
              <div style={{flexShrink:0,padding:"10px 12px 20px",borderTop:"0.5px solid rgba(91,65,43,0.08)",background:"rgba(255,249,239,0.97)",backdropFilter:"blur(20px)"}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <button onClick={()=>setShowMenu(false)} style={{flex:1,background:T.bg3,border:"0.5px solid rgba(91,65,43,0.1)",borderRadius:12,padding:"11px 14px",cursor:"pointer",textAlign:"left",color:T.text,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{background:T.accent,color:"#fff",borderRadius:20,fontSize:11,fontWeight:800,padding:"2px 8px",flexShrink:0}}>{itemCount}</span>
                    <span style={{fontSize:12,color:T.textSub,flex:1}}>Siparişe dön →</span>
                  </button>
                  <button onClick={()=>setShowPay(true)} style={{background:"linear-gradient(135deg,#F36B3F,#D94D2B)",border:"none",borderRadius:12,padding:"11px 18px",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:"0 4px 16px rgba(243,107,63,0.35)",whiteSpace:"nowrap",flexShrink:0}}>{fm(sub)}</button>
                </div>
              </div>
            )}
            {itemCount===0&&(
              <div style={{flexShrink:0,padding:"10px 12px 20px",borderTop:"0.5px solid rgba(91,65,43,0.08)"}}>
                <button onClick={()=>setShowMenu(false)} style={{width:"100%",padding:"13px",background:T.bg2,border:"0.5px solid rgba(91,65,43,0.1)",borderRadius:12,color:T.textSub,fontWeight:600,fontSize:13,cursor:"pointer"}}>← Siparişe Dön</button>
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
      <div style={{background:"rgba(255,249,239,0.97)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(91,65,43,0.08)",padding:"16px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:19,fontWeight:800,letterSpacing:"-0.5px",flex:1}}>Bu ay nasıl geçti?</div>
      </div>
      <div style={{padding:14}}>
        <label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:6}}>Ay seç</label>
        <select value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)} style={{width:"100%",padding:12,marginBottom:14,background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.1)",borderRadius:10,textTransform:"capitalize"}}>
          {months.map(m=><option key={m} value={m}>{monthLabel(m)}</option>)}
        </select>
        <div style={{background:T.bg2,border:"1px solid rgba(91,65,43,.08)",borderRadius:16,padding:16,marginBottom:16}}>
          <div style={{fontSize:12,color:T.textSub,textTransform:"capitalize"}}>{monthLabel(selectedMonth)} cirosu</div>
          <div style={{fontSize:28,fontWeight:850,color:T.accentL,marginTop:6}}>{fm(revenue)}</div>
          <div style={{fontSize:11,color:T.textDim,marginTop:6}}>Kapanan adisyonlar{selectedMonth===thisMonth()?" + açık masalardaki mevcut ürünler":""}</div>
        </div>
        <div style={{background:T.bg2,border:"1px solid rgba(91,65,43,.08)",borderRadius:16,padding:16,marginBottom:16}}>
          <div style={{fontSize:15,fontWeight:800,color:T.text,marginBottom:4}}>Yıllık ciro</div>
          <label style={{display:"block",fontSize:11,color:T.textSub,margin:"10px 0 6px"}}>Yıl seç</label>
          <select value={year} onChange={e=>setYear(e.target.value)} style={{width:"100%",padding:11,background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.1)",borderRadius:10}}>
            {yearOptions.map(y=><option key={y} value={y}>{y}</option>)}
          </select>
          <div style={{fontSize:24,fontWeight:800,color:T.accentL,marginTop:12}}>{fm(yearRevenue)}</div>
          <div style={{fontSize:10,color:T.textDim,marginTop:3}}>Seçilen yılın kapanmış adisyon cirosu</div>
        </div>
        <div style={{fontSize:15,fontWeight:800,color:T.text,marginBottom:4}}>En çok kazandıran 5 ürün</div>
        <div style={{fontSize:11,color:T.textSub,marginBottom:10}}>Adede göre değil, ürün satış tutarına göre sıralanır.</div>
        {topProducts.length?topProducts.map((p,i)=><div key={p.name} style={{display:"flex",alignItems:"center",gap:10,background:T.bg2,border:"1px solid rgba(91,65,43,.07)",borderRadius:12,padding:13,marginBottom:8}}>
          <div style={{width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:9,background:"rgba(243,107,63,.12)",color:T.accentL,fontSize:13,fontWeight:800,flexShrink:0}}>{i+1}</div>
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
      <div style={{background:"rgba(255,249,239,0.97)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(91,65,43,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:23,fontWeight:850,letterSpacing:"-.7px",flex:1}}>Raporlar</div><button onClick={exportMonthCsv} style={{background:T.bg2,color:T.accentL,border:"1px solid rgba(91,65,43,.12)",borderRadius:10,padding:"9px 11px",fontSize:12,fontWeight:700,cursor:"pointer"}}>↓ CSV</button>
      </div>

      {/* Ay seçici */}
      <div style={{display:"flex",gap:6,padding:"12px 14px",overflowX:"auto",borderBottom:"0.5px solid rgba(91,65,43,0.06)"}}>
        {(months.length?months:[now]).map(m=>(
          <button key={m} onClick={()=>setSel(m)} style={{padding:"6px 14px",border:"0.5px solid rgba(91,65,43,0.1)",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",flexShrink:0,background:sel===m?"#F36B3F":"rgba(91,65,43,0.05)",color:sel===m?"#fff":T.textSub,borderColor:sel===m?"#F36B3F":"rgba(91,65,43,0.1)"}}>
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
          <div key={i} style={{background:T.bg2,borderRadius:14,padding:"12px",border:"0.5px solid rgba(91,65,43,0.07)"}}>
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
            <div key={day.date} style={{background:T.bg2,borderRadius:14,marginBottom:8,border:"0.5px solid rgba(91,65,43,0.07)",overflow:"hidden"}}>
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
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 20px",borderTop:"0.5px solid rgba(91,65,43,0.05)",background:"rgba(91,65,43,0.02)"}}>
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

/* ─── LURK+ ─── */
function LurkPlusScreen({members,setMembers,msg,setV}){
  const [showForm,setShowForm]=useState(false);
  const [selectedMemberId,setSelectedMemberId]=useState(null);
  const [name,setName]=useState("");
  const [balance,setBalance]=useState("");
  function addMember(){
    const clean=name.trim();
    const amount=Math.round(Number(balance)*100)/100;
    if(!clean){msg("Üye adı gir.");return;}
    if(!balance.trim()||!Number.isFinite(amount)||amount<0){msg("Geçerli bir bakiye gir.");return;}
    if(members.some(m=>m.name.trim().toLocaleLowerCase("tr-TR")===clean.toLocaleLowerCase("tr-TR"))){msg("Bu isimde LURK+ üyesi zaten var.");return;}
    const createdAt=new Date().toISOString();
    setMembers(prev=>[{id:uid(),name:clean,balance:amount,createdAt,history:[{id:uid(),type:"topup",date:createdAt,amount,balanceAfter:amount,note:"Başlangıç bakiyesi"}]},...prev]);
    setName("");setBalance("");setShowForm(false);msg("LURK+ üyesi eklendi.");
  }
  return(
    <div className="lurk-screen">
      <div style={{background:"rgba(255,249,239,0.97)",borderBottom:"0.5px solid rgba(91,65,43,0.08)",padding:"18px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setV("home")} style={{background:"transparent",border:0,color:T.textSub,fontSize:24,cursor:"pointer"}}>←</button>
        <div style={{flex:1}}><div style={{fontSize:24,fontWeight:850,letterSpacing:"-0.8px",color:T.text}}>LURK<span style={{color:T.accentL}}>+</span></div><div style={{fontSize:11,color:T.textSub,marginTop:2}}>Ön ödemeli üye bakiyeleri</div></div>
        <button onClick={()=>setShowForm(true)} style={{background:T.accent,border:0,borderRadius:22,padding:"9px 15px",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer"}}>+ Üye Ekle</button>
      </div>
      <div style={{padding:14}}>
        {members.length===0?<div style={{padding:"42px 20px",textAlign:"center",color:T.textSub,background:T.bg2,borderRadius:14}}><div style={{fontSize:30,marginBottom:10}}>＋</div><div style={{fontWeight:700,color:T.text,marginBottom:5}}>Henüz LURK+ üyesi yok</div><div style={{fontSize:12}}>İlk üyeni ekleyip başlangıç bakiyesini belirle.</div></div>:members.slice().sort((a,b)=>a.name.localeCompare(b.name,"tr")).map(m=><button key={m.id} onClick={()=>setSelectedMemberId(m.id)} style={{display:"flex",alignItems:"center",gap:12,width:"100%",textAlign:"left",background:T.bg2,border:"1px solid "+(selectedMemberId===m.id?"rgba(243,107,63,.35)":"rgba(91,65,43,.07)"),borderRadius:13,padding:12,marginBottom:8,cursor:"pointer",color:T.text}}><div style={{width:38,height:38,borderRadius:11,background:"rgba(243,107,63,.12)",display:"flex",alignItems:"center",justifyContent:"center",color:T.accentL,fontSize:16,fontWeight:800,flexShrink:0}}>{m.name.trim().charAt(0).toLocaleUpperCase("tr-TR")}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:750,overflowWrap:"anywhere"}}>{m.name}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>Üyelik: {new Date(m.createdAt||Date.now()).toLocaleDateString("tr-TR")}</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:15,fontWeight:850,color:T.accentL,whiteSpace:"nowrap"}}>{fm(m.balance)}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>Hareketleri gör ›</div></div></button>)}
        {selectedMemberId&&members.filter(m=>m.id===selectedMemberId).map(m=><div key={m.id} style={{marginTop:12,background:"rgba(91,65,43,.035)",border:"1px solid rgba(91,65,43,.09)",borderRadius:14,padding:13}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:10}}><div><div style={{fontSize:16,fontWeight:800,color:T.text}}>{m.name}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>Güncel bakiye</div></div><div style={{fontSize:18,fontWeight:850,color:T.accentL}}>{fm(m.balance)}</div></div>
          <div style={{fontSize:11,fontWeight:800,color:T.textSub,letterSpacing:".4px",marginBottom:7}}>BAKİYE HAREKETLERİ</div>
          {(!m.history||m.history.length===0)?<div style={{fontSize:12,color:T.textSub,padding:"12px 0"}}>Henüz hareket kaydı yok.</div>:m.history.slice().sort((a,b)=>new Date(b.date)-new Date(a.date)).map(h=><div key={h.id} style={{display:"flex",gap:9,alignItems:"flex-start",padding:"9px 0",borderTop:"1px solid rgba(91,65,43,.07)"}}><div style={{width:28,height:28,borderRadius:9,background:h.type==="topup"?"rgba(243,107,63,.12)":h.type==="refund"?"rgba(243,107,63,.1)":"rgba(255,69,58,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:h.type==="purchase"?T.danger:T.accentL,flexShrink:0}}>{h.type==="topup"?"＋":h.type==="refund"?"↩":"−"}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:750,color:T.text}}>{h.type==="topup"?(h.note||"Bakiye yüklendi"):h.type==="refund"?"Ürün iadesi":(h.itemName||"Ürün alımı")}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>{new Date(h.date).toLocaleString("tr-TR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}{h.table?" · "+h.table:""}</div><div style={{fontSize:10,color:T.textSub,marginTop:3}}>İşlem sonrası bakiye: {fm(h.balanceAfter)}</div></div><div style={{fontSize:12,fontWeight:800,color:h.type==="purchase"?T.danger:T.accentL,whiteSpace:"nowrap"}}>{h.type==="purchase"?"−":"+"}{fm(h.amount)}</div></div>)}
          <button onClick={()=>setSelectedMemberId(null)} style={{width:"100%",marginTop:8,padding:9,background:"transparent",border:"1px solid rgba(91,65,43,.1)",borderRadius:9,color:T.textSub,fontSize:11,cursor:"pointer"}}>Detayı Kapat</button>
        </div>)}
      </div>
      {showForm&&<Modal><div style={{fontSize:18,fontWeight:800,color:T.text,marginBottom:6}}>Yeni LURK+ Üyesi</div><div style={{fontSize:12,color:T.textSub,marginBottom:16}}>Üyenin adını ve mevcut ön ödemeli bakiyesini gir.</div><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Üye adı *</label><input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Ad soyad" style={{width:"100%",padding:12,marginBottom:12,background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.12)",borderRadius:10}}/><label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Başlangıç bakiyesi (TL) *</label><input value={balance} onChange={e=>setBalance(e.target.value)} inputMode="decimal" placeholder="Örn. 500" onKeyDown={e=>{if(e.key==="Enter")addMember();}} style={{width:"100%",padding:12,marginBottom:16,background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.12)",borderRadius:10}}/><button onClick={addMember} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>Üyeyi Kaydet</button><button onClick={()=>setShowForm(false)} style={{width:"100%",padding:12,background:"transparent",color:T.textSub,border:0,cursor:"pointer"}}>Vazgeç</button></Modal>}
    </div>
  );
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
    <div className="lurk-screen lurk-customers-screen">
      <div style={{background:"rgba(255,249,239,0.97)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(91,65,43,0.08)",padding:"22px 16px 18px",display:"flex",alignItems:"center",gap:12,background:"rgba(255,249,239,0.97)"}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:23,fontWeight:850,letterSpacing:"-.7px",flex:1}}>Müşteriler<div style={{fontSize:11,fontWeight:500,color:T.textSub,marginTop:3,letterSpacing:0}}>Müşteri ilişkileri ve hesap özeti</div></div>
        <button onClick={openNew} style={{padding:"9px 13px",background:T.accent,border:0,borderRadius:12,color:"#fff",fontWeight:750,cursor:"pointer",boxShadow:"0 5px 18px rgba(243,107,63,.18)"}}>＋ Yeni</button>
      </div>
      <div style={{padding:14}}>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Müşteri veya telefon ara…" style={{width:"100%",padding:12,marginBottom:14,background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.1)",borderRadius:10}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:10,marginBottom:14}}>
          <div style={{flex:1,minWidth:0,background:"rgba(243,107,63,.09)",border:"1px solid rgba(243,107,63,.18)",borderRadius:16,padding:"15px 14px"}}>
            <div style={{fontSize:10,color:T.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px"}}>Kayıtlı müşteri</div>
            <div style={{fontSize:26,fontWeight:850,color:T.text,marginTop:5}}>{customers.length}</div>
          </div>
          <div style={{flex:1,minWidth:0,background:"rgba(91,65,43,.045)",border:"1px solid rgba(91,65,43,.09)",borderRadius:15,padding:"14px 15px"}}>
            <div style={{fontSize:10,color:T.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px"}}>Toplam harcama</div>
            <div style={{fontSize:16,fontWeight:850,color:T.accentL,marginTop:5}}>{fm(customers.reduce((sum,c)=>sum+totalFor(c),0))}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{fontSize:12,color:T.textSub,flex:1}}>{filtered.length} müşteri · {monthLabel(selectedMonth)} harcamasına göre sıralı</div>
          <select value={selectedMonth} onChange={e=>setSelectedMonth(e.target.value)} aria-label="Ay seç" style={{maxWidth:155,padding:"8px 10px",background:T.bg2,color:T.text,border:"1px solid rgba(91,65,43,.1)",borderRadius:9,textTransform:"capitalize",fontSize:11}}>
            {availableMonths.map(month=><option key={month} value={month}>{monthLabel(month)}</option>)}
          </select>
        </div>
        <div className="lurk-customer-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(112px,1fr))",gap:10}}>
        {filtered.map(c=><div key={c.id} style={{background:"#FFF9EF",border:"1px solid rgba(91,65,43,.09)",borderRadius:17,padding:"12px 11px",minWidth:0,minHeight:124,display:"flex",flexDirection:"column",alignItems:"stretch",gap:7,boxShadow:"0 4px 0 rgba(91,65,43,.045)"}}>
          <button onClick={()=>setDetail(c)} aria-label={c.name+" detayları"} style={{width:30,height:30,borderRadius:12,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(145deg,#FFE0CE,#FFF0E5)",color:T.accentL,fontSize:12,fontWeight:850,border:"1px solid rgba(243,107,63,.22)"}}>{filtered.indexOf(c)+1}</button>
          <button onClick={()=>setDetail(c)} style={{minWidth:0,textAlign:"left",background:"transparent",border:0,color:T.text,cursor:"pointer",padding:0}}>
            <div style={{fontWeight:800,fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
            <div style={{fontSize:9,color:T.textSub,marginTop:3}}>{orderCountFor(c)} sipariş</div>
            <div style={{fontSize:9,color:T.accentL,marginTop:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{fm(monthlyTotalFor(c))} · bu ay</div>
          </button>
          <button onClick={()=>openEdit(c)} style={{marginTop:"auto",background:"transparent",color:T.textSub,border:"1px solid rgba(91,65,43,.1)",borderRadius:9,padding:"6px 8px",fontSize:10,fontWeight:750,cursor:"pointer"}}>Düzenle</button>
        </div>)}
        </div>
        {!filtered.length&&<div style={{padding:"30px 20px",textAlign:"center",background:"rgba(91,65,43,.035)",border:"1px dashed rgba(91,65,43,.14)",borderRadius:16,color:T.textSub}}><div style={{fontSize:28,marginBottom:8}}>♙</div><div style={{fontSize:14,fontWeight:750,color:T.text,marginBottom:5}}>{query?"Müşteri bulunamadı":"Henüz müşteri eklenmemiş"}</div><div style={{fontSize:12,lineHeight:1.5,marginBottom:query?0:14}}>{query?"Farklı bir isim veya telefon deneyebilirsin.":"İlk müşteri profilini oluştur, kayıt burada otomatik görünsün."}</div>{!query&&<button onClick={openNew} style={{padding:"10px 14px",background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:750}}>＋ İlk müşteriyi ekle</button>}</div>}
      </div>
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
      <div style={{background:"rgba(255,249,239,0.97)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(91,65,43,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("settings")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.5px",flex:1}}>Menü</div>
        <button onClick={()=>setShowAdd(true)} style={{background:"#F36B3F",border:"none",borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",color:"#fff",fontWeight:700}}>+ Ürün</button>
      </div>
      <div style={{padding:"14px"}}>
        {cats.map(cat=>(
          <div key={cat} style={{marginBottom:20}}>
            <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:10}}>{cat}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {menu.filter(m=>m.cat===cat).map(item=>(
                <div key={item.id} style={{background:item.on?T.bg2:"rgba(91,65,43,0.02)",border:"0.5px solid "+(item.on?"rgba(91,65,43,0.09)":"rgba(91,65,43,0.04)"),borderRadius:12,padding:"12px",position:"relative"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                    <div style={{fontSize:11,fontWeight:700,color:item.on?T.text:T.textDim,lineHeight:1.3,flex:1,paddingRight:6,textDecoration:item.on?"none":"line-through"}}>{item.name}</div>
                    <div onClick={()=>setMenu(p=>p.map(m=>m.id===item.id?{...m,on:!m.on}:m))} style={{width:28,height:16,borderRadius:8,background:item.on?"#F36B3F":"#C9BFB2",position:"relative",cursor:"pointer",flexShrink:0}}>
                      <div style={{width:12,height:12,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:item.on?14:2,transition:"left 0.15s"}}/>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                    <div style={{fontSize:13,fontWeight:800,color:item.on?T.accentL:T.textDim}}>{fm(item.price)}</div>
                    <button onClick={()=>openEdit(item)} style={{padding:"6px 9px",background:T.bg3,color:T.text,border:"1px solid rgba(91,65,43,.1)",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>Düzenle</button>
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
          <input autoFocus value={newName} onChange={e=>{setNewName(e.target.value);setAddError("");}} placeholder="Ürün adı" style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(91,65,43,0.07)",color:T.text}}/>
          <label style={{display:"block",fontSize:12,color:T.textSub,marginBottom:6}}>Fiyat (TL)</label>
          <input type="number" min="0.01" step="0.01" value={newPrice} onChange={e=>{setNewPrice(e.target.value);setAddError("");}} placeholder="Fiyat (TL)" style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(91,65,43,0.07)",color:T.text}}/>
          {addError&&<div role="alert" style={{fontSize:12,color:T.danger,marginBottom:10}}>{addError}</div>}
          <button onClick={saveEdit} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#F36B3F,#D94D2B)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>Değişiklikleri Kaydet</button>
          <button onClick={()=>{setEditingItem(null);setAddError("");}} style={{width:"100%",padding:"10px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>İptal</button>
        </Modal>
      )}
      {showAdd&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:16,color:T.text}}>Yeni Ürün</div>
          <input placeholder="Ürün adı" value={newName} onChange={e=>setNewName(e.target.value)} style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:10,background:"rgba(91,65,43,0.07)",color:T.text}}/>
          <input type="number" min="0.01" step="0.01" placeholder="Fiyat (TL)" value={newPrice} onChange={e=>{setNewPrice(e.target.value);setAddError("");}} style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:10,background:"rgba(91,65,43,0.07)",color:T.text}}/>
          <select value={newCat} onChange={e=>setNewCat(e.target.value)} style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(91,65,43,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:16,background:"#FFF9EF",color:T.text}}>
            {cats.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          {addError&&<div role="alert" style={{fontSize:12,color:T.danger,marginBottom:10}}>{addError}</div>}
          <button onClick={()=>{const validated=validateMenuItemInput(newName,newPrice);if(validated.error){setAddError(validated.error);return;}setMenu(p=>[...p,{id:Date.now(),name:validated.name,price:validated.price,cat:newCat,on:true}]);setNewName("");setNewPrice("");setAddError("");setShowAdd(false);}} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#F36B3F,#D94D2B)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(243,107,63,0.3)"}}>Ekle</button>
          <button onClick={()=>setShowAdd(false)} style={{width:"100%",padding:"10px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>İptal</button>
        </Modal>
      )}
    </div>
  );
}

/* ─── SETTINGS ─── */
function SettingsScreen({setV,tables,orders,logs,customers,creditEntries,menu,day,setTables,setOrders,setLogs,setCustomers,setCreditEntries,setMenu,setDay}){
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
    setTables(d.lurk_t);setOrders(d.lurk_o);setLogs(d.lurk_l);setCustomers(d.lurk_customers);setCreditEntries(d.lurk_credit);setMenu(d.lurk_m);setDay(d.lurk_d);
    setImportMsg("Yedek içeri aktarıldı. Kayıt göstergesi tamamlanana kadar uygulamayı kapatma.");
    setPendingImport(null);
  }
  function exportBackup(){
    const backup={app:"LURK POS",formatVersion:1,exportedAt:new Date().toISOString(),data:{lurk_t:tables,lurk_o:orders,lurk_l:logs,lurk_customers:customers,lurk_credit:creditEntries,lurk_m:menu,lurk_d:day}};
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
      <div style={{background:"rgba(255,249,239,0.97)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(91,65,43,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:23,fontWeight:850,letterSpacing:"-.7px"}}>Ayarlar</div>
      </div>
      <div style={{padding:"14px"}}>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:10}}>Yönetim</div>
        <button onClick={()=>setV("menu")} style={{width:"100%",background:T.bg2,border:"0.5px solid rgba(91,65,43,0.07)",borderRadius:14,padding:"16px 14px",cursor:"pointer",textAlign:"left",color:T.text,display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
          <div style={{width:40,height:40,borderRadius:10,background:"rgba(243,107,63,0.12)",border:"0.5px solid rgba(243,107,63,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>☰</div>
          <div><div style={{fontSize:14,fontWeight:700}}>Menü</div><div style={{fontSize:12,color:T.textSub,marginTop:2}}>Ürün ekle, fiyat güncelle</div></div>
          <div style={{marginLeft:"auto",fontSize:18,color:T.textDim}}>›</div>
        </button>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",margin:"20px 0 10px"}}>Veri güvenliği</div>
        <div style={{background:T.bg2,border:"1px solid rgba(91,65,43,.07)",borderRadius:14,padding:15}}>
          <div style={{fontSize:14,fontWeight:750,color:T.text}}>Veri yedeği</div>
          <div style={{fontSize:12,lineHeight:1.5,color:T.textSub,marginTop:5,marginBottom:13}}>Masa durumları, adisyonlar, raporlar, müşteriler, veresiye defteri ve menüyü tek bir JSON dosyasına indirir. Bu işlem mevcut kayıtları değiştirmez.</div>
          <button onClick={exportBackup} style={{width:"100%",padding:13,background:T.accent,color:"#fff",border:0,borderRadius:10,fontWeight:800,cursor:"pointer"}}>↓ Yedek İndir</button>
          {backupMsg&&<div role="status" style={{fontSize:12,color:T.accentL,marginTop:10}}>{backupMsg}</div>}
          <div style={{height:1,background:"rgba(91,65,43,.08)",margin:"16px 0"}}/>
          <div style={{fontSize:14,fontWeight:750,color:T.text}}>Yedekten geri yükle</div>
          <div style={{fontSize:12,lineHeight:1.5,color:T.textSub,marginTop:5,marginBottom:12}}>LURK POS tarafından oluşturulmuş, biçimi doğrulanmış JSON yedeği seç. Geri yükleme mevcut kayıtların yerine geçer.</div>
          <label style={{display:"block",boxSizing:"border-box",padding:13,textAlign:"center",background:"rgba(91,65,43,.07)",border:"1px solid rgba(91,65,43,.12)",borderRadius:10,color:T.text,fontWeight:750,cursor:"pointer"}}>
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
