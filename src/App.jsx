import { useState, useEffect, useRef } from "react";

const DARK={bg:"#0D0D0D",bg2:"#1A1A1A",bg3:"#242424",border:"rgba(255,255,255,0.1)",border2:"rgba(255,255,255,0.15)",accent:"#34C759",accentL:"#34C759",accentD:"#248A3D",accentXL:"#8FE3A8",text:"#F5F5F5",textSub:"#A0A0A0",textDim:"#666",success:"#34C759",danger:"#FF3B30",warn:"#FF9500",shadow:"0 2px 12px rgba(0,0,0,0.4),0 0 0 0.5px rgba(255,255,255,0.06) inset",shadowM:"0 8px 32px rgba(0,0,0,0.6),0 0 0 0.5px rgba(255,255,255,0.06) inset",glass:"rgba(255,255,255,0.05)",isDark:true};

const LIGHT={bg:"#F2F2F7",bg2:"rgba(255,255,255,0.9)",bg3:"rgba(118,118,128,0.12)",border:"rgba(60,60,67,0.12)",border2:"rgba(60,60,67,0.2)",accent:"#34C759",accentL:"#248A3D",accentD:"#248A3D",accentXL:"#8FE3A8",text:"#000000",textSub:"#6C6C70",textDim:"#AEAEB2",success:"#34C759",danger:"#FF3B30",warn:"#FF9500",shadow:"0 2px 8px rgba(0,0,0,0.08),0 0 0 0.5px rgba(255,255,255,0.5) inset",shadowM:"0 8px 32px rgba(0,0,0,0.12),0 0 0 0.5px rgba(255,255,255,0.4) inset",glass:"rgba(255,255,255,0.7)",isDark:false};

const MENU=[
{id:101,name:"SİGARALIK FİLTRE",price:50,cat:"Kahve",on:true},{id:102,name:"FİLTRE KAHVE",price:160,cat:"Kahve",on:true},{id:103,name:"AMERICANO",price:170,cat:"Kahve",on:true},{id:104,name:"LATTE",price:200,cat:"Kahve",on:true},{id:105,name:"SALTED CARAMEL LATTE",price:270,cat:"Kahve",on:true},{id:106,name:"CORTADO",price:170,cat:"Kahve",on:true},{id:107,name:"FLATWHITE",price:190,cat:"Kahve",on:true},{id:109,name:"MOCHA",price:250,cat:"Kahve",on:true},{id:110,name:"VANİLYA LATTE",price:220,cat:"Kahve",on:true},{id:112,name:"V60",price:240,cat:"Kahve",on:true},{id:113,name:"ESPRESSO",price:160,cat:"Kahve",on:true},{id:114,name:"CAPPUCCINO",price:200,cat:"Kahve",on:true},
{id:201,name:"MATCHA LATTE",price:260,cat:"Matcha",on:true},{id:202,name:"STRAWBERRY MATCHA",price:290,cat:"Matcha",on:true},{id:203,name:"BERRY MATCHA LATTE",price:290,cat:"Matcha",on:true},{id:204,name:"VANILLA MATCHA LATTE",price:280,cat:"Matcha",on:true},{id:205,name:"APPLE & GINGER MATCHA",price:290,cat:"Matcha",on:true},{id:206,name:"CRÈME BRÜLÉE MATCHA",price:280,cat:"Matcha",on:true},
{id:301,name:"SİYAH ÇAY",price:50,cat:"Cay",on:true},{id:302,name:"BİTKİ ÇAYI",price:180,cat:"Cay",on:true},{id:303,name:"ICE TEA",price:220,cat:"Cay",on:true},
{id:401,name:"MUHAMMARA SANDVİÇ",price:330,cat:"Sandviç",on:true},{id:402,name:"RENÇ SANDVİÇ",price:330,cat:"Sandviç",on:true},{id:403,name:"PESTO SANDVİÇ",price:300,cat:"Sandviç",on:true},{id:404,name:"TON BALIĞI SANDVİÇ",price:300,cat:"Sandviç",on:true},
{id:501,name:"TIRAMISU",price:290,cat:"Tatlı",on:true},{id:502,name:"SOFT COOKIE",price:175,cat:"Tatlı",on:true},
{id:601,name:"+VEGAN SÜT",price:70,cat:"Ekstra",on:true},{id:602,name:"SICAK ÇİKOLATA",price:220,cat:"Ekstra",on:true},{id:603,name:"SAHLEP",price:200,cat:"Ekstra",on:true},{id:604,name:"SODA",price:100,cat:"Ekstra",on:true},{id:605,name:"BAILEYS MATCHA",price:340,cat:"Ekstra",on:true},{id:606,name:"SERVİS",price:200,cat:"Ekstra",on:true},{id:607,name:"ORALET",price:50,cat:"Ekstra",on:true},{id:609,name:"CHURCHILL",price:130,cat:"Ekstra",on:true},
];

const OLD_LOGS=[]; // Supabase'e taşındı
const DS={name:"Restoran",tableCount:10,cur:"TL",requireName:false,sitePassword:"",recoveryQ:"",recoveryA:"",monthlyGoal:0,weeklyGoal:0,hiddenPlatforms:[]};
const DEC=["Malzeme","Kira","Personel","Fatura","Diğer"];
const PO=[{k:"cash",l:"Nakit",c:"#FF9500",bg:"rgba(255,149,0,0.1)",bd:"rgba(255,149,0,0.3)"},{k:"card",l:"Kart",c:"#007AFF",bg:"rgba(0,122,255,0.1)",bd:"rgba(0,122,255,0.3)"},{k:"credit",l:"Cari",c:"#AF52DE",bg:"rgba(175,82,222,0.1)",bd:"rgba(175,82,222,0.3)"}];
const mkT=(n)=>Array.from({length:n||10},(_,i)=>({id:i+1,lbl:"Masa "+(i+1),s:"e",order:[],oa:null,g:""}));
const fm=(v,c)=>(+v||0).toLocaleString("tr-TR",{minimumFractionDigits:2,maximumFractionDigits:2})+" "+(c||"TL");
const fd=(d)=>{if(!d)return"";try{const dt=new Date(d);return dt.toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"});}catch{return d;}};
const fdl=(d)=>{if(!d)return"";try{const dt=new Date(d+"T12:00:00");return dt.toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});}catch{return d;}};
const ft=(d)=>{if(!d)return"";try{return new Date(d).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});}catch{return"";}};
const tod=()=>new Date().toISOString().split("T")[0];
const uid=()=>Math.random().toString(36).slice(2);
const SUPABASE_URL="https://dpucptcrxoddfpvaqsdl.supabase.co";
const SUPABASE_KEY="sb_publishable_YiTDrcX7nnotBkoWqEWaHQ_tYHlT3NK";
const sv=async(k,v)=>{
  try{
    await fetch(SUPABASE_URL+"/rest/v1/app_storage",{
      method:"POST",
      headers:{"apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY,"Content-Type":"application/json","Prefer":"resolution=merge-duplicates"},
      body:JSON.stringify({key:k,value:JSON.stringify(v)})
    });
  }catch(e){console.error("sv error",e);}
};
const ld=async(k,fb)=>{
  try{
    const r=await fetch(SUPABASE_URL+"/rest/v1/app_storage?key=eq."+k+"&select=value",{
      headers:{"apikey":SUPABASE_KEY,"Authorization":"Bearer "+SUPABASE_KEY}
    });
    const d=await r.json();
    if(d&&d[0]&&d[0].value!==undefined)return JSON.parse(d[0].value);
    return fb;
  }catch(e){return fb;}
};

const buildAchievements=()=>[];

// --- ROZETLER ---
function buildBadges({logs,orders,cari,installments,fm,cur}){
  const allLogs=[...logs];
  const allOrders=[...orders];

  // Toplam ciro (tüm zamanlar)
  const totalRev=allLogs.reduce((s,l)=>s+(l.inc||0),0);

  // Toplam ürün sayısı (tüm zamanlar)
  const totalItems=allLogs.reduce((s,l)=>s+allLogs.reduce((_,__)=>_,0),0);
  const totalItemsSold=allLogs.reduce((s,l)=>s+(l.items||[]).reduce((ss,it)=>ss+(it.qty||0),0),0);

  // Günlük en iyi
  const bestDayInc=allLogs.length>0?Math.max(...allLogs.map(l=>l.inc||0)):0;

  // Haftalık en iyi (Pazartesi-Pazar bazlı)
  const weekMap={};
  allLogs.forEach(l=>{
    const d=new Date(l.date+"T12:00:00");
    const dow=d.getDay();
    const diff=dow===0?-6:1-dow;
    const mon=new Date(d);mon.setDate(d.getDate()+diff);
    const wk=mon.toISOString().split("T")[0];
    if(!weekMap[wk])weekMap[wk]=0;
    weekMap[wk]+=(l.inc||0);
  });
  const bestWeekRev=Object.values(weekMap).length>0?Math.max(...Object.values(weekMap)):0;

  // Aylık en iyi
  const monthMap={};
  allLogs.forEach(l=>{
    const m=l.date.slice(0,7);
    if(!monthMap[m])monthMap[m]={inc:0,items:{}};
    monthMap[m].inc+=(l.inc||0);
    (l.items||[]).forEach(it=>{
      const cat=(it.cat||"").toLowerCase();
      if(!monthMap[m].items[cat])monthMap[m].items[cat]=0;
      monthMap[m].items[cat]+=(it.qty||0);
    });
  });
  const bestMonthInc=Object.values(monthMap).length>0?Math.max(...Object.values(monthMap).map(m=>m.inc)):0;
  const bestMonthMatcha=Object.values(monthMap).length>0?Math.max(...Object.values(monthMap).map(m=>m.items["matcha"]||0)):0;
  const bestMonthKahve=Object.values(monthMap).length>0?Math.max(...Object.values(monthMap).map(m=>(m.items["kahve"]||0)+(m.items["coffee"]||0))):0;

  // Cari hesap sayısı (toplam açılmış)
  const totalCari=(cari||[]).length;

  // Vade ödenen taksit sayısı
  const paidInstCount=(installments||[]).reduce((s,p)=>s+(p.installments||[]).filter(i=>i.paid).length,0);

  // Yuvarlak gün kapanışı
  const roundDayCount=allLogs.filter(l=>(l.inc||0)>0&&(l.inc||0)%1000===0).length;

  // Sabah 10:00 öncesi açılış sayısı
  const earlyOpenCount=allLogs.filter(l=>{
    if(!l.oa)return false;
    try{
      const d=new Date(l.oa);
      // toLocaleString ile Türkiye saatini al
      const trTime=d.toLocaleString("tr-TR",{timeZone:"Europe/Istanbul",hour:"2-digit",hour12:false});
      const hour=parseInt(trTime);
      return hour<10;
    }catch{return false;}
  }).length;

  // Sıfır harcama günü sayısı
  const zeroExpCount=allLogs.filter(l=>(l.exp||0)===0&&(l.inc||0)>0).length;

  // Tek günde farklı ürün çeşidi
  const maxDiffItems=allLogs.length>0?Math.max(...allLogs.map(l=>(l.items||[]).length)):0;

  const B=[
    // --- CİRO ---
    {id:"rev_500k",icon:"💰",title:"Yarım Milyon",desc:"Tüm zamanlarda toplam 500.000 TL satışa ulaştın.",done:totalRev>=500000,progress:Math.min(100,Math.round(totalRev/500000*100)),curVal:totalRev,targetVal:500000,unit:"money",repeatable:false},
    {id:"rev_750k",icon:"💎",title:"750 Bin TL",desc:"Tüm zamanlarda toplam 750.000 TL satışa ulaştın.",done:totalRev>=750000,progress:Math.min(100,Math.round(totalRev/750000*100)),curVal:totalRev,targetVal:750000,unit:"money",repeatable:false},
    {id:"rev_1m",icon:"🏅",title:"Milyoner",desc:"Tüm zamanlarda toplam 1.000.000 TL satışa ulaştın.",done:totalRev>=1000000,progress:Math.min(100,Math.round(totalRev/1000000*100)),curVal:totalRev,targetVal:1000000,unit:"money",repeatable:false},

    // --- GÜNLÜK REKOR ---
    {id:"day_5k",icon:"⚡",title:"Beş Binlik Gün",desc:"Tek bir günde 5.000 TL satış yaptın.",done:bestDayInc>=5000,progress:Math.min(100,Math.round(bestDayInc/5000*100)),curVal:bestDayInc,targetVal:5000,unit:"money",repeatable:false},
    {id:"day_10k",icon:"🔥",title:"On Binlik Gün",desc:"Tek bir günde 10.000 TL satış yaptın.",done:bestDayInc>=10000,progress:Math.min(100,Math.round(bestDayInc/10000*100)),curVal:bestDayInc,targetVal:10000,unit:"money",repeatable:false},

    // --- HAFTALIK ---
    {id:"week_30k",icon:"📅",title:"30K Hafta",desc:"Aynı hafta içinde 30.000 TL satış yaptın.",done:bestWeekRev>=30000,progress:Math.min(100,Math.round(bestWeekRev/30000*100)),curVal:bestWeekRev,targetVal:30000,unit:"money",repeatable:false},

    // --- AYLIK ---
    {id:"month_150k",icon:"📈",title:"150K Ay",desc:"Bir ay içinde 150.000 TL satış yaptın.",done:bestMonthInc>=150000,progress:Math.min(100,Math.round(bestMonthInc/150000*100)),curVal:bestMonthInc,targetVal:150000,unit:"money",repeatable:false},
    {id:"month_200k",icon:"🚀",title:"200K Ay",desc:"Bir ay içinde 200.000 TL satış yaptın.",done:bestMonthInc>=200000,progress:Math.min(100,Math.round(bestMonthInc/200000*100)),curVal:bestMonthInc,targetVal:200000,unit:"money",repeatable:false},

    // --- ÜRÜN ---
    {id:"items_1000",icon:"☕",title:"Bin Servis",desc:"Tüm zamanlar boyunca toplam 1.000 ürün sattın.",done:totalItemsSold>=1000,progress:Math.min(100,Math.round(totalItemsSold/1000*100)),curVal:totalItemsSold,targetVal:1000,unit:"count",repeatable:false},
    {id:"items_2000",icon:"☕",title:"İki Bin Servis",desc:"Tüm zamanlar boyunca toplam 2.000 ürün sattın.",done:totalItemsSold>=2000,progress:Math.min(100,Math.round(totalItemsSold/2000*100)),curVal:totalItemsSold,targetVal:2000,unit:"count",repeatable:false},
    {id:"items_5000",icon:"🏭",title:"Beş Bin Servis",desc:"Tüm zamanlar boyunca toplam 5.000 ürün sattın.",done:totalItemsSold>=5000,progress:Math.min(100,Math.round(totalItemsSold/5000*100)),curVal:totalItemsSold,targetVal:5000,unit:"count",repeatable:false},

    // --- MATCHA ---
    {id:"matcha_100",icon:"🍵",title:"100 Matcha",desc:"Bir ayda 100 matcha ürünü sattın.",done:bestMonthMatcha>=100,progress:Math.min(100,Math.round(bestMonthMatcha/100*100)),curVal:bestMonthMatcha,targetVal:100,unit:"count",repeatable:false},
    {id:"matcha_250",icon:"🍵",title:"250 Matcha",desc:"Bir ayda 250 matcha ürünü sattın.",done:bestMonthMatcha>=250,progress:Math.min(100,Math.round(bestMonthMatcha/250*100)),curVal:bestMonthMatcha,targetVal:250,unit:"count",repeatable:false},

    // --- KAHVE ---
    {id:"kahve_100",icon:"☕",title:"100 Kahve",desc:"Bir ayda 100 kahve ürünü sattın.",done:bestMonthKahve>=100,progress:Math.min(100,Math.round(bestMonthKahve/100*100)),curVal:bestMonthKahve,targetVal:100,unit:"count",repeatable:false},
    {id:"kahve_250",icon:"☕",title:"250 Kahve",desc:"Bir ayda 250 kahve ürünü sattın.",done:bestMonthKahve>=250,progress:Math.min(100,Math.round(bestMonthKahve/250*100)),curVal:bestMonthKahve,targetVal:250,unit:"count",repeatable:false},
    {id:"kahve_500",icon:"☕",title:"500 Kahve",desc:"Bir ayda 500 kahve ürünü sattın.",done:bestMonthKahve>=500,progress:Math.min(100,Math.round(bestMonthKahve/500*100)),curVal:bestMonthKahve,targetVal:500,unit:"count",repeatable:false},

    // --- GÜN ÇEŞİTLİLİĞİ ---
    {id:"items_diff_10",icon:"🎯",title:"10 Farklı Ürün",desc:"Bir günde 10 farklı ürün sattın.",done:maxDiffItems>=10,progress:Math.min(100,Math.round(maxDiffItems/10*100)),curVal:maxDiffItems,targetVal:10,unit:"count",repeatable:false},
    {id:"items_diff_20",icon:"🎯",title:"20 Farklı Ürün",desc:"Bir günde 20 farklı ürün sattın.",done:maxDiffItems>=20,progress:Math.min(100,Math.round(maxDiffItems/20*100)),curVal:maxDiffItems,targetVal:20,unit:"count",repeatable:false},

    // --- CARİ ---
    {id:"cari_10",icon:"📋",title:"On Cari Hesap",desc:"Toplam 10 farklı cari hesap açtın.",done:totalCari>=10,progress:Math.min(100,Math.round(totalCari/10*100)),curVal:totalCari,targetVal:10,unit:"count",repeatable:false},

    // --- VADE ---
    {id:"inst_1",icon:"📌",title:"İlk Vade Ödemesi",desc:"Bir vade ödemesi tamamladın.",done:paidInstCount>=1,progress:Math.min(100,Math.round(paidInstCount/1*100)),curVal:paidInstCount,targetVal:1,unit:"count",repeatable:false},
    {id:"inst_5",icon:"📌",title:"5 Vade Ödemesi",desc:"Beş vade ödemesi tamamladın.",done:paidInstCount>=5,progress:Math.min(100,Math.round(paidInstCount/5*100)),curVal:paidInstCount,targetVal:5,unit:"count",repeatable:false},
    {id:"inst_10",icon:"📌",title:"10 Vade Ödemesi",desc:"On vade ödemesi tamamladın.",done:paidInstCount>=10,progress:Math.min(100,Math.round(paidInstCount/10*100)),curVal:paidInstCount,targetVal:10,unit:"count",repeatable:false},
    {id:"inst_20",icon:"📌",title:"20 Vade Ödemesi",desc:"Yirmi vade ödemesi tamamladın.",done:paidInstCount>=20,progress:Math.min(100,Math.round(paidInstCount/20*100)),curVal:paidInstCount,targetVal:20,unit:"count",repeatable:false},

    // --- TEKRARLANABILIR ---
    {id:"round_day",icon:"🎱",title:"Yuvarlak Gün",desc:"Bir günü tam yuvarlak rakamla kapattın (örn: 3.000 TL).",done:roundDayCount>0,count:roundDayCount,repeatable:true},
    {id:"early_open",icon:"🌅",title:"Erken Kalkan",desc:"Sabah 10:00'dan önce açtın.",done:earlyOpenCount>0,count:earlyOpenCount,repeatable:true},
    {id:"zero_exp",icon:"🪙",title:"Masrafsız Gün",desc:"Hiç harcama yapmadan günü kapattın.",done:zeroExpCount>0,count:zeroExpCount,repeatable:true},
  ];

  return B;
}

export default function App(){
const[darkMode,setDarkMode]=useState(()=>{try{return localStorage.getItem("nicchia_theme")!=="light";}catch{return true;}});
const T=darkMode?DARK:LIGHT;
// iOS zoom fix: font-size 16px on all inputs
if(typeof document!=="undefined"){
  let styleEl=document.getElementById("nicchia-input-fix");
  if(!styleEl){styleEl=document.createElement("style");styleEl.id="nicchia-input-fix";document.head.appendChild(styleEl);}
  styleEl.textContent="input,select,textarea{font-size:16px!important;}";
}
const inp={background:T.isDark?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.9)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",border:"0.5px solid "+T.border2,borderRadius:10,padding:"10px 14px",color:T.text,fontSize:16,outline:"none",width:"100%",boxSizing:"border-box",boxShadow:"0 1px 3px rgba(0,0,0,0.06) inset"};
const sb=(bg,col)=>({background:bg,border:"none",color:col||(T.isDark?"#fff":T.text),borderRadius:10,padding:"10px 18px",fontWeight:600,fontSize:13,cursor:"pointer",boxShadow:T.isDark?"0 2px 8px rgba(0,0,0,0.4)":"0 1px 4px rgba(0,0,0,0.1)"});
const toggleTheme=()=>{setDarkMode(p=>{const next=!p;try{localStorage.setItem("nicchia_theme",next?"dark":"light");}catch{}return next;});};
const NAV=[{k:"lurk",l:"Dashboard"},{k:"tables",l:"Masalar"},{k:"installments",l:"Vadeler"},{k:"credit",l:"Cari"},{k:"settings",l:"Ayarlar"}];
const[view,setV]=useState("lurk");
const[authed,setAuthed]=useState(false);
const[authChecked,setAuthChecked]=useState(false);
const[tables,setTbl]=useState([]);
const[sel,setSel]=useState(null);
const[orders,setOrd]=useState([]);
const[exp,setExp]=useState([]);
const[menu,setMenü]=useState(MENU);
const[cfg,setCfg]=useState(DS);
const[day,setDay]=useState(null);
const[logs,setLogs]=useState([]);
const[cari,setCari]=useState([]);
const[ecats,setEc]=useState(DEC);
const[ok,setOk]=useState(false);
const loadedRef=useRef(false);
const mountedRef=useRef(false);
const[toast,setToast]=useState(null);
const[onlineOrders,setOnlineOrders]=useState([]);
const[cat,setCat]=useState("Tümü");
const[disc,setDisc]=useState(null);
const[pay,setPay]=useState(false);
const[disM,setDisM]=useState(false);
const[gM,setGM]=useState(null);
const[cancelConfirm,setCancelConfirm]=useState(false);
const[selLog,setSelLog]=useState(null);
const[repT,setRepT]=useState("items");
const[mainT,setMainT]=useState("sales");
const[installments,setInstallments]=useState([]);
const[unlocked,setUnlocked]=useState({});
const[todos,setTodos]=useState([]);
const[notifications,setNotifications]=useState([]);
const[tacoLogs,setTacoLogs]=useState([]);
const[tacoMenu,setTacoMenu]=useState([]);
const[expMon,setExpMon]=useState(null);
const[expDay,setExpDay]=useState(null);
const[expF,setExpF]=useState({desc:"",amount:"",cat:"Malzeme",date:tod()});
const[showEF,setShowEF]=useState(false);
const[dayCon,setDayCon]=useState(false);
const[selC,setSelC]=useState(null);
const[stT,setStT]=useState(null);
const[delC,setDelC]=useState(null);
const[stab,setStab]=useState("general");
const[cfgF,setCfgF]=useState(DS);
const[mF,setMF]=useState({name:"",price:"",cat:"",on:true});
const[mEid,setMEid]=useState(null);
const[mCat,setMCat]=useState("Tümü");
const[newec,setNewec]=useState("");
const[drawerOpen,setDrawerOpen]=useState(false);
const[isMobile,setIsMobile]=useState(()=>window.innerWidth<768);
useEffect(()=>{const h=()=>setIsMobile(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);

useEffect(()=>{
const fallbackTimer=setTimeout(async()=>{
if(!ok){
// Supabase'e bir daha bağlanmayı dene
try{
const t=await ld("lurk_t",null);const o=await ld("lurk_o",[]);
if(o&&o.length>0){setOrd(o);}
if(t)setTbl((t||[]).filter(tb=>tb.order&&tb.order.length>0));
const e=await ld("lurk_e",[]);if(e)setExp(e);
const l=await ld("lurk_l",[]);if(l)setLogs(l);
const inst=await ld("lurk_inst",[]);if(inst)setInstallments(inst);
const d=await ld("lurk_d",null);
const today=new Date().toISOString().split("T")[0];
const validDay=d&&d.oa&&d.oa.split("T")[0]===today?d:null;
setDay(validDay);
}catch(e2){}
loadedRef.current=true;
setOk(true);setAuthChecked(true);setAuthed(true);
}
},8000);
(async()=>{
// Migration: eski p4... anahtarlarını lurk_... formatına taşı (bir kez)
const oldKeys=["t","o","e","m","s","d","l","c","ec","onl","inst","unl","notif","todo"];
for(const k of oldKeys){
const newVal=await ld("lurk_"+k,null);
if(newVal===null||newVal===undefined){
const oldVal=await ld("p4"+k,null);
if(oldVal!==null&&oldVal!==undefined){await sv("lurk_"+k,oldVal);}
}
}
const t=await ld("lurk_t",null);const o=await ld("lurk_o",[]);const e=await ld("lurk_e",[]);
const m=await ld("lurk_m",null);const s=await ld("lurk_s",DS);const d=await ld("lurk_d",null);
const l=await ld("lurk_l",[]);const c=await ld("lurk_c",[]);const ec=await ld("lurk_ec",DEC);
const onl=await ld("lurk_onl",[]);
const inst=await ld("lurk_inst",[]);
const unl=await ld("lurk_unl",{});
const notif=await ld("lurk_notif",[]);
const td_=await ld("lurk_todo",[]);
const tl=await ld("tt_l",[]);
const tm=await ld("tt_m",null);
const cf={...DS,...s};setCfg(cf);setCfgF(cf);setMenü(m||MENU);setOrd(o);setExp(e);
const oldDef=["Malzeme","Kira","Personel","Fatura","Diger"];
const isOldEc=!ec||ec.length===0||(ec.length===5&&ec.every((x,i)=>x===oldDef[i]));
const finalEc=isOldEc?DEC:ec;
// Eğer Supabase'de boş yazılmışsa DEC ile geri yaz
if(!ec||ec.length===0){sv("lurk_ec",DEC);}
const today=new Date().toISOString().split("T")[0];
const validDay=d&&d.oa&&d.oa.split("T")[0]===today?d:null;
setDay(validDay);setLogs(l);setCari(c||[]);setEc(finalEc);setOnlineOrders(onl);setInstallments(inst||[]);setUnlocked(unl);setNotifications(notif);setTodos(td_);
const cleanTables=(t||[]).filter(tb=>tb.order&&tb.order.length>0);
setTbl(cleanTables);
if(t&&t.length!==cleanTables.length){sv("lurk_t",cleanTables);}
setTacoLogs((tl||[]).filter(l=>l.type==="income"||l.type==="expense"));setTacoMenu(tm||[]);

// Vade bildirimleri kontrolü
const instNotifs=[];
const todayDate=new Date(today);
(inst||[]).forEach(plan=>{
  (plan.installments||[]).filter(i=>!i.paid).forEach(instItem=>{
    const dueDate=new Date(instItem.due);
    const diffDays=Math.round((dueDate-todayDate)/(1000*60*60*24));
    const notifId="inst_"+plan.id+"_"+instItem.id;
    const alreadyNotified=(notif||[]).some(n=>n.id===notifId);
    if(alreadyNotified)return;
    if(diffDays<0){
      instNotifs.push({id:notifId,type:"overdue",planName:plan.name,amount:instItem.amount,due:instItem.due,date:new Date().toISOString(),read:false,icon:"⚠️",title:plan.name+" — Gecikmiş Vade",desc:`${Math.abs(diffDays)} gün gecikmiş · ${instItem.amount.toLocaleString("tr-TR")} TL`});
    } else if(diffDays<=3){
      instNotifs.push({id:notifId,type:"urgent",planName:plan.name,amount:instItem.amount,due:instItem.due,date:new Date().toISOString(),read:false,icon:"🔔",title:plan.name+" — Vade Yaklaşıyor",desc:`${diffDays===0?"Bugün":diffDays===1?"Yarın":diffDays+" gün içinde"} · ${instItem.amount.toLocaleString("tr-TR")} TL`});
    } else if(diffDays<=7){
      instNotifs.push({id:notifId,type:"upcoming",planName:plan.name,amount:instItem.amount,due:instItem.due,date:new Date().toISOString(),read:false,icon:"📅",title:plan.name+" — Vade Hatırlatma",desc:`${diffDays} gün içinde · ${instItem.amount.toLocaleString("tr-TR")} TL`});
    }
  });
});
if(instNotifs.length>0){
  setNotifications(prev=>{
    const existingIds=new Set(prev.map(n=>n.id));
    const newOnes=instNotifs.filter(n=>!existingIds.has(n.id));
    return newOnes.length>0?[...newOnes,...prev]:prev;
  });
}

// Logu olmayan geçmiş günleri orders'tan otomatik oluştur
const autoToday=new Date().toISOString().split("T")[0];
const loggedDates=new Set((l||[]).map(x=>x.date));
const ordersByDate={};
(o||[]).forEach(order=>{
  if(!order.date||order.date===autoToday)return;
  if(loggedDates.has(order.date))return;
  if(!ordersByDate[order.date])ordersByDate[order.date]=[];
  ordersByDate[order.date].push(order);
});
if(Object.keys(ordersByDate).length>0){
  const newLogs=Object.entries(ordersByDate).map(([date,dayOrders])=>{
    const cash=dayOrders.filter(x=>x.pt==="cash").reduce((s,x)=>s+x.total,0);
    const card=dayOrders.filter(x=>x.pt==="card").reduce((s,x)=>s+x.total,0);
    const inc=dayOrders.reduce((s,x)=>s+x.total,0);
    const im={};dayOrders.forEach(ord=>ord.items&&ord.items.forEach(it=>{if(!im[it.name])im[it.name]={name:it.name,cat:it.cat||"",qty:0,total:0,price:it.price};im[it.name].qty+=it.qty;im[it.name].total+=it.price*it.qty;}));
    const gm={};dayOrders.forEach(ord=>{const g=(ord.g||"--").trim().toUpperCase();if(!gm[g])gm[g]={name:g,count:0,total:0,orders:[]};gm[g].count++;gm[g].total+=ord.total;gm[g].orders.push({id:ord.id,tbl:ord.tn,total:ord.total,pt:ord.pt,items:ord.items});});
    return{id:uid(),date,oa:date+"T09:00:00.000Z",ca:date+"T23:59:59.000Z",inc,exp:0,net:inc,cash,card,count:dayOrders.length,items:Object.values(im).sort((a,b)=>b.qty-a.qty),guests:Object.values(gm).sort((a,b)=>b.total-a.total),exps:[]};
  });
  const merged=[...(l||[]),...newLogs].sort((a,b)=>b.date.localeCompare(a.date));
  setLogs(merged);
  sv("lurk_l",merged);
  console.log("Auto-logged missing days:",Object.keys(ordersByDate));
}

// Orders total:0 düzeltme — items üzerinden yeniden hesapla
const fixedOrders=(o||[]).map(order=>{
  if(order.total>0)return order;
  if(!order.items||order.items.length===0)return order;
  const recalc=order.items.reduce((s,item)=>s+(item.price||0)*(item.qty||1),0);
  if(recalc>0)return{...order,total:recalc,sub:order.sub||recalc};
  return order;
});
const hadBroken=(o||[]).some(order=>order.total===0&&order.items&&order.items.length>0);
if(hadBroken){
  setOrd(fixedOrders);
  sv("lurk_o",fixedOrders);
  console.log("Fixed broken orders:",fixedOrders.filter(x=>x.total>0&&(o||[]).find(y=>y.id===x.id&&y.total===0)).length);
}

setOk(true);clearTimeout(fallbackTimer);
// Bir sonraki render'da save'lere izin ver
requestAnimationFrame(()=>requestAnimationFrame(()=>{loadedRef.current=true;}));
try{
const savedAuth=localStorage.getItem("lurk_auth");
const cfAuth=cf.sitePassword;
if(!cfAuth||savedAuth===cfAuth){setAuthed(true);}
}catch{setAuthed(true);}
setAuthChecked(true);
})().catch(function(){clearTimeout(fallbackTimer);setOk(true);setAuthChecked(true);setAuthed(true);});},[]);

// Debounced toplu kayıt — 800ms bekleyip tek seferde yazar
const saveTimerRef=useRef(null);
const pendingSaveRef=useRef({});
const debouncedSave=(key,value)=>{
  pendingSaveRef.current[key]=value;
  if(saveTimerRef.current)clearTimeout(saveTimerRef.current);
  saveTimerRef.current=setTimeout(async()=>{
    const batch={...pendingSaveRef.current};
    pendingSaveRef.current={};
    await Promise.all(Object.entries(batch).map(([k,v])=>sv(k,v)));
  },800);
};
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_t",tables);},[tables,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_o",orders);},[orders,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_e",exp);},[exp,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_m",menu);},[menu,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_s",cfg);},[cfg,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_d",day);},[day,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_l",logs);},[logs,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_c",cari);},[cari,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_ec",ecats);},[ecats,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_onl",onlineOrders);},[onlineOrders,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_inst",installments);},[installments,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_unl",unlocked);},[unlocked,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_notif",notifications);},[notifications,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("lurk_todo",todos);},[todos,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("tt_l",tacoLogs);},[tacoLogs,ok]);
useEffect(()=>{if(ok&&loadedRef.current)debouncedSave("tt_m",tacoMenu);},[tacoMenu,ok]);

useEffect(()=>{
if(!ok)return;
const curCur=cfg.cur||"TL";
const newlyDone=achievements.filter(a=>a.done&&!unlocked[a.id]);
if(newlyDone.length>0){
const now=new Date().toISOString();
const isFirstRun=Object.keys(unlocked).length===0;
setUnlocked(prev=>{
const next={...prev};
newlyDone.forEach(a=>{next[a.id]=now;});
return next;
});
if(!isFirstRun){
setNotifications(prev=>[
...newlyDone.map(a=>({id:a.id+"_"+Date.now()+"_"+Math.random(),achievementId:a.id,title:a.title,desc:a.desc,icon:a.icon,date:now,read:false})),
...prev
]);
}
}
},[logs,orders,cari,installments,ok]);

const msg=(m,t="ok")=>{setToast({m,t});setTimeout(()=>setToast(null),2800);};
const cur=cfg.cur||"TL";

const openDay=()=>{
const td=tod();
const alreadyClosed=logs.some(l=>l.date===td);
if(alreadyClosed){msg("Bugün zaten kapatıldı, yarın tekrar açabilirsin","err");return;}
// Önceki gün kapanmamışsa otomatik kapat ve logla
if(day&&day.oa){
const prevDate=new Date(day.oa).toISOString().split("T")[0];
if(prevDate!==td){
const to=orders.filter(o=>o.date===prevDate);
const te=exp.filter(e=>e.date===prevDate);
const cash=to.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
const card=to.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
const inc=to.reduce((s,o)=>s+o.total,0);const expt=te.reduce((s,e)=>s+e.amount,0);
const im={};to.forEach(o=>(o.items||[]).forEach(it=>{if(!it||typeof it!=="object")return;if(!im[it.name])im[it.name]={name:it.name,cat:it.cat||"",qty:0,total:0,price:it.price};im[it.name].qty+=it.qty||1;im[it.name].total+=(it.price||0)*(it.qty||1);}));
const gm={};to.forEach(o=>{const g=(o.g||"--").trim().toUpperCase();if(!gm[g])gm[g]={name:g,count:0,total:0,orders:[]};gm[g].count++;gm[g].total+=o.total;gm[g].orders.push({id:o.id,tbl:o.tn,total:o.total,pt:o.pt,items:o.items});});
const prevLog={id:uid(),date:prevDate,oa:day.oa,ca:new Date(prevDate+"T23:59:59").toISOString(),inc,exp:expt,net:inc-expt,cash,card,count:to.length,items:Object.values(im).sort((a,b)=>b.qty-a.qty),guests:Object.values(gm).sort((a,b)=>b.total-a.total),exps:te};
setLogs(prev=>[prevLog,...prev]);
// Eski masaları temizle
setTbl([]);
msg(prevDate+" günü otomatik kapatıldı");
}
}
setDay({oa:new Date().toISOString()});setDayCon(false);msg("Gün açıldı");
};
const closeDay=()=>{
const td=tod();const to=orders.filter(o=>o.date===td);const te=exp.filter(e=>e.date===td);
const cash=to.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
const card=to.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
const inc=to.reduce((s,o)=>s+o.total,0);const expt=te.reduce((s,e)=>s+e.amount,0);
const im={};to.forEach(o=>(o.items||[]).forEach(it=>{if(!it||typeof it!=="object")return;if(!im[it.name])im[it.name]={name:it.name,cat:it.cat||"",qty:0,total:0,price:it.price};im[it.name].qty+=it.qty||1;im[it.name].total+=(it.price||0)*(it.qty||1);}));
const gm={};to.forEach(o=>{const g=(o.g||"--").trim().toUpperCase();if(!gm[g])gm[g]={name:g,count:0,total:0,orders:[]};gm[g].count++;gm[g].total+=o.total;gm[g].orders.push({id:o.id,tbl:o.tn,total:o.total,pt:o.pt,items:o.items});});
setLogs(prev=>[{id:uid(),date:td,oa:day.oa,ca:new Date().toISOString(),inc,exp:expt,net:inc-expt,cash,card,count:to.length,items:Object.values(im).sort((a,b)=>b.qty-a.qty),guests:Object.values(gm).sort((a,b)=>b.total-a.total),exps:te},...prev]);
setDay(null);setDayCon(false);msg("Gun kapatıldı");};

const goTbl=(id)=>{if(!day){msg("Önce günü aç","err");return;}if(cfg.requireName){setSel(id);setGM(id);}else doOpen(id,"");};
const addNewTable=()=>{
if(!day){msg("Önce günü aç","err");return;}
const newId=tables.length>0?Math.max(...tables.map(t=>t.id))+1:1;
const newTable={id:newId,lbl:"Masa "+newId,s:"e",order:[],oa:null,g:""};
setTbl(prev=>[...prev,newTable]);
if(cfg.requireName){setSel(newId);setGM(newId);}else doOpen(newId,"");
};
const doOpen=(id,g)=>{
const firstCat=Array.from(new Set(menu.filter(m=>m.on).map(m=>m.cat)))[0]||"";
setTbl(prev=>prev.map(t=>t.id===id?{...t,s:"o",oa:t.oa||new Date().toISOString(),g:g?(g.trim().toUpperCase()):t.g}:t));setSel(id);setCat(firstCat);setDisc(null);setPay(false);setGM(null);setV("order");};
const addItem=(tid,item)=>{setTbl(prev=>prev.map(t=>{if(t.id!==tid)return t;const now=new Date().toISOString();const newEntry={...item,qty:1,addedAt:now,oid:uid()};return{...t,order:[...t.order,newEntry],s:"o",oa:t.oa||now};}));};
const chQ=(tid,iid,d)=>{setTbl(prev=>prev.map(t=>{if(t.id!==tid)return t;const newOrder=t.order.map(o=>(o.oid||o.id)===iid?{...o,qty:o.qty+d}:o).filter(o=>o.qty>0);return{...t,order:newOrder};}).filter(t=>t.id!==tid||t.order.length>0));};
const cancelOrder=(tid)=>{setTbl(prev=>prev.filter(t=>t.id!==tid));setV("tables");setSel(null);msg("Adisyon iptal edildi","err");};
const sub=(t)=>t.order.reduce((s,o)=>s+o.price*o.qty,0);
const fin=(t)=>{const s=sub(t);return disc?disc.after:s;};

const closeTbl=(splits,closeTable=true)=>{
const t=tables.find(x=>x.id===sel);if(!t||!t.order.length)return;
const g=t.g||"";
const creditSplits=splits.filter(sp=>sp.pt==="credit");
const nonCreditSplits=splits.filter(sp=>sp.pt!=="credit");
nonCreditSplits.forEach(sp=>{
const spGuest=g;
const spTotal=sp.total||sp.amount||0;
const spSub=sp.sub||spTotal;
if(spTotal<=0){console.warn("closeTbl: total 0, skipping",sp);return;}
setOrd(prev=>[{id:uid(),tId:t.id,tn:t.lbl,g:spGuest,items:t.order,sub:spSub,da:sp.da||0,total:spTotal,pt:sp.pt,oa:t.oa,ca:new Date().toISOString(),date:tod()},...prev]);
});
if(creditSplits.length>0){
creditSplits.forEach(sp=>{
const spGuest=sp.cariName||g;
const spTotal=sp.total||sp.amount||0;
const spSub=sp.sub||spTotal;
if(spTotal<=0)return;
setOrd(prev=>[{id:uid(),tId:t.id,tn:t.lbl,g:spGuest,items:t.order,sub:spSub,da:sp.da||0,total:spTotal,pt:sp.pt,oa:t.oa,ca:new Date().toISOString(),date:tod()},...prev]);
});
setCari(prev=>{
let next=[...prev];
creditSplits.forEach(sp=>{
const spGuest=sp.cariName||g;
const spTotal=sp.total||sp.amount||0;
const spSub=sp.sub||spTotal;
if(spTotal<=0)return;
const newAdisyon={id:uid(),tbl:t.lbl,items:t.order,sub:spSub,da:sp.da||0,total:spTotal,oa:t.oa,ca:new Date().toISOString(),date:tod()};
const idx=next.findIndex(c=>!c.settled&&c.g.toLowerCase()===spGuest.toLowerCase());
if(idx>=0){
next=next.map((c,i)=>i===idx?{...c,adisyonlar:[...(c.adisyonlar||[]),newAdisyon],total:(c.total||0)+spTotal}:c);
}else{
next=[{id:uid(),g:spGuest,adisyonlar:[newAdisyon],items:t.order,sub:spSub,da:sp.da||0,total:spTotal,tbl:t.lbl,oa:t.oa,cAt:new Date().toISOString(),date:tod(),settled:false,sAt:null,sPt:null},...next];
}
});
return next;
});
}
// Kısmi ödeme: ürünleri masadan çıkar ve istatistiğe ekle
if(!closeTable){
const paidMap={};
splits.forEach(sp=>{
if(sp.items&&sp.items.length>0){
t.order.forEach(o=>{
// String veya number karşılaştırması — ikisini de dene
if(sp.items.includes(o.id)||sp.items.includes(String(o.id))||sp.items.includes(o.name)){
if(!paidMap[o.id])paidMap[o.id]=0;
paidMap[o.id]+=o.qty;
}
});
}
});
// Masadan ödenen ürünleri çıkar
if(Object.keys(paidMap).length>0){
setTbl(prev=>prev.map(t2=>{
if(t2.id!==sel)return t2;
const remaining=t2.order.map(o=>{
const paid=paidMap[o.id]||0;
if(paid>=o.qty)return null;
return{...o,qty:o.qty-paid};
}).filter(Boolean);
if(remaining.length===0)return null;
return{...t2,order:remaining};
}).filter(Boolean));
}
// Kısmi ödemeyi istatistiğe ekle (zaten nonCreditSplits'te yapıldı ama kontrol et)
setPay(false);
msg("Kısmi ödeme alındı");
return;
}
setTbl(prev=>prev.filter(t2=>t2.id!==sel));
setPay(false);setSel(null);setDisc(null);setV("tables");msg(t.lbl+" kapatıldı");};

const addExp=()=>{if(!expF.desc||!expF.amount)return;setExp(prev=>[{id:uid(),...expF,amount:parseFloat(expF.amount)},...prev]);setExpF(p=>({desc:"",amount:"",cat:ecats[0]||p.cat,date:tod()}));msg("Harcama eklendi");};
const saveMI=()=>{if(!mF.name||!mF.price||!mF.cat)return;if(mEid){setMenü(prev=>prev.map(m=>m.id===mEid?{...m,...mF,price:parseFloat(mF.price)}:m));msg("Güncellendi");}else{setMenü(prev=>[...prev,{id:uid(),...mF,price:parseFloat(mF.price),on:true}]);msg("Eklendi");}setMF({name:"",price:"",cat:"",on:true});setMEid(null);};
const saveCfg=()=>{setCfg(cfgF);msg("Kaydedildi");};

const todO=orders.filter(o=>o.date===tod());
const todI=todO.reduce((s,o)=>s+o.total,0);
const todOpenTables=(tables||[]).reduce((s,t)=>s+t.order.reduce((a,o)=>a+o.price*o.qty,0),0);
const aMenü=menu.filter(m=>m.on);
const oCats=Array.from(new Set(aMenü.map(m=>m.cat)));
const fMenü=aMenü.filter(m=>m.cat===cat);
const curT=tables.find(t=>t.id===sel);
const go=(k)=>{setV(k);setSel(null);setSelLog(null);};
const achievements=buildBadges({logs,orders,cari,installments,cur:cfg.cur||"TL",fm});

if(!ok||!authChecked)return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg}}>Yükleniyor...</div>;

if(!authed)return <LoginV cfg={cfg} setCfg={setCfg} setAuthed={setAuthed} T={T}/>;

return(
<div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display',Inter,'Helvetica Neue',Helvetica,Arial,sans-serif",background:T.isDark?"#080810":T.bg,minHeight:"100vh",color:T.text,position:"relative"}}>
{T.isDark&&<>
<div style={{position:"fixed",top:"-5%",left:"-10%",width:"50vw",height:"50vw",maxWidth:500,maxHeight:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(52,199,89,0.09) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
<div style={{position:"fixed",top:"35%",right:"-8%",width:"40vw",height:"40vw",maxWidth:400,maxHeight:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,122,255,0.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
<div style={{position:"fixed",bottom:"5%",left:"20%",width:"45vw",height:"45vw",maxWidth:450,maxHeight:450,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
</>}

{toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:toast.t==="ok"?"rgba(52,199,89,0.12)":"#FDEFED",color:toast.t==="ok"?T.success:T.danger,border:"1px solid "+(toast.t==="ok"?"#8FE3A8":"rgba(255,59,48,0.3)"),padding:"10px 20px",borderRadius:20,fontWeight:600,fontSize:13,whiteSpace:"nowrap"}}>{toast.m}</div>}

{/* Mobile drawer overlay */}
{drawerOpen&&<div onClick={()=>setDrawerOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.3)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",zIndex:200}}/>}

{/* Mobile drawer */}
<div style={{position:"fixed",top:0,left:0,bottom:0,width:280,zIndex:300,transform:drawerOpen?"translateX(0)":"translateX(-100%)",transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",background:T.isDark?"rgba(13,13,13,0.98)":"rgba(242,242,247,0.98)",backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",borderRight:"0.5px solid "+T.border,boxShadow:"4px 0 32px rgba(0,0,0,0.12)",display:"flex",flexDirection:"column",padding:"0 0 32px"}}>
<div style={{padding:"56px 20px 20px",borderBottom:"0.5px solid "+T.border}}>
<div style={{fontSize:28,fontWeight:800,letterSpacing:-0.5,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",marginBottom:6,color:T.text}}>LURK.</div>
{day?<div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(52,199,89,0.12)",borderRadius:20,padding:"4px 10px 4px 8px",width:"fit-content"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.success,display:"inline-block"}}/><span style={{fontSize:12,color:T.success,fontWeight:600}}>AÇIK {ft(day.oa)}</span></div>
:<div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(255,59,48,0.1)",borderRadius:20,padding:"4px 10px 4px 8px",width:"fit-content"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.danger,display:"inline-block"}}/><span style={{fontSize:12,color:T.danger,fontWeight:600}}>KAPALI</span></div>}
</div>
<div style={{flex:1,overflowY:"auto",padding:"12px 12px"}}>
{NAV.map(({k,l})=><button key={k} onClick={()=>{go(k);setDrawerOpen(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,border:"none",cursor:"pointer",background:view===k?T.bg3:"transparent",color:view===k?T.text:T.textSub,fontWeight:view===k?700:500,fontSize:13,marginBottom:4,textAlign:"left",boxShadow:"none",letterSpacing:0.5}}>{k==="lurk"?"DASHBOARD":k==="tables"?"MASALAR":k==="settings"?"AYARLAR":k==="installments"?"VADELER":k==="credit"?"CARİ":l.toUpperCase()}</button>)}
<button onClick={()=>{go("notifications");setDrawerOpen(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,border:"none",cursor:"pointer",background:view==="notifications"?T.bg3:"transparent",color:view==="notifications"?T.text:T.textSub,fontWeight:view==="notifications"?700:500,fontSize:13,marginBottom:4,textAlign:"left"}}>
BİLDİRİMLER
{notifications.filter(n=>!n.read).length>0&&<span style={{background:"#FF3B30",color:"#fff",borderRadius:10,padding:"2px 7px",fontSize:11,fontWeight:700,marginLeft:"auto"}}>{notifications.filter(n=>!n.read).length}</span>}
</button>
</div>
</div>

<nav style={{background:T.isDark?"rgba(13,13,13,0.95)":"rgba(242,242,247,0.95)",backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",borderBottom:"0.5px solid "+T.border,boxShadow:T.isDark?"0 1px 0 rgba(0,0,0,0.5)":"0 1px 0 rgba(0,0,0,0.08)",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,position:"sticky",top:0,zIndex:100}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
{isMobile&&<button onClick={()=>setDrawerOpen(p=>!p)} style={{width:36,height:36,borderRadius:10,border:"none",background:"rgba(118,118,128,0.12)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,flexShrink:0}}>
<span style={{display:"block",width:16,height:1.5,background:"#ccc",borderRadius:2}}/>
<span style={{display:"block",width:16,height:1.5,background:"#ccc",borderRadius:2}}/>
<span style={{display:"block",width:16,height:1.5,background:"#ccc",borderRadius:2}}/>
</button>}
<span style={{fontWeight:700,fontSize:isMobile?16:18,letterSpacing:-0.4,color:T.text,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>LURK.</span>
{day?<div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(52,199,89,0.12)",borderRadius:20,padding:"4px 10px 4px 8px"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.success,display:"inline-block"}}/><span style={{fontSize:11,color:T.success,fontWeight:600}}>{isMobile?"":"AÇIK "}{ft(day.oa)}</span></div>
:<div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(255,59,48,0.1)",borderRadius:20,padding:"4px 10px 4px 8px"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.danger,display:"inline-block"}}/><span style={{fontSize:11,color:T.danger,fontWeight:600}}>KAPALI</span></div>}
</div>
{!isMobile&&<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.05)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",padding:3,borderRadius:9,border:"0.5px solid rgba(255,255,255,0.1)",overflowX:"auto",maxWidth:"calc(100vw - 200px)"}}>
{NAV.map(({k,l})=><button key={k} onClick={()=>go(k)} style={{padding:"6px 12px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:590,fontSize:12,background:view===k?"rgba(255,255,255,0.1)":"transparent",color:view===k?T.text:T.textSub,opacity:view===k?1:0.75,boxShadow:view===k?"0 1px 3px rgba(0,0,0,0.12)":"none",transition:"all 0.15s",whiteSpace:"nowrap"}}>{k==="achievements"?"🎖 Rozetler":k==="todo"?"✅ Yapılacaklar":l}</button>)}
</div>
<button onClick={()=>go("notifications")} style={{position:"relative",width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:view==="notifications"?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.06)",boxShadow:view==="notifications"?"0 1px 3px rgba(0,0,0,0.12)":"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>
🔔
{notifications.filter(n=>!n.read).length>0&&<span style={{position:"absolute",top:2,right:2,minWidth:16,height:16,borderRadius:8,background:"#FF3B30",color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>{notifications.filter(n=>!n.read).length>9?"9+":notifications.filter(n=>!n.read).length}</span>}
</button>
<button onClick={()=>{try{localStorage.removeItem("lurk_auth");}catch{}setAuthed(false);setV("lurk");}} style={{width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:"rgba(255,59,48,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}} title="Güvenli Çıkış">🔒</button>
<button onClick={toggleTheme} style={{width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:darkMode?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}} title={darkMode?"Aydınlık Tema":"Karanlık Tema"}>{darkMode?"☀️":"🌙"}</button>
</div>}
{isMobile&&<div style={{display:"flex",alignItems:"center",gap:8}}>
<button onClick={()=>go("notifications")} style={{position:"relative",width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:"rgba(118,118,128,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
🔔
{notifications.filter(n=>!n.read).length>0&&<span style={{position:"absolute",top:2,right:2,minWidth:16,height:16,borderRadius:8,background:"#FF3B30",color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>{notifications.filter(n=>!n.read).length>9?"9+":notifications.filter(n=>!n.read).length}</span>}
</button>
<button onClick={()=>{try{localStorage.removeItem("lurk_auth");}catch{}setAuthed(false);setV("lurk");}} style={{width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:"rgba(255,59,48,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}} title="Güvenli Çıkış">🔒</button>
</div>}
<button onClick={toggleTheme} style={{width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:darkMode?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}} title={darkMode?"Aydınlık Tema":"Karanlık Tema"}>{darkMode?"☀️":"🌙"}</button>
</nav>

{view!=="lurk"&&<div style={{padding:isMobile?"16px 16px 0":"24px 24px 0",maxWidth:860,margin:"0 auto"}}>
<div style={{fontSize:isMobile?18:22,fontWeight:800,letterSpacing:-0.5,color:T.text,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>LURK.</div>
</div>}

{gM&&view!=="order"&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><GuestM req={cfg.requireName} onOk={g=>doOpen(gM,g)} onSkip={()=>{setGM(null);setSel(null);}} T={T}/></div>}

{(view==="lurk"||view==="home")&&<HomeV tables={tables} orders={orders} exp={exp} setExp={setExp} ecats={ecats} todO={todO} todI={todI} todOpenTables={todOpenTables} day={day} cari={cari} cfg={cfg} cur={cur} fm={fm} ft={ft} fd={fd} tod={tod} uid={uid} msg={msg} setV={setV} openDay={openDay} closeDay={closeDay} dayCon={dayCon} setDayCon={setDayCon} isMobile={isMobile} T={T} badges={achievements} logs={logs} installments={installments}/>}

{view==="tables"&&(
<div style={{padding:isMobile?"16px":"24px",maxWidth:1100,margin:"0 auto"}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:isMobile?16:22}}>
<h2 style={{margin:0,fontWeight:700,fontSize:isMobile?18:22,letterSpacing:-0.4,color:T.text}}>Aktif Masalar</h2>
{!day&&<div style={{background:"rgba(255,59,48,0.1)",borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:12,color:T.danger,fontWeight:600}}>Gün açık değil</span><button onClick={()=>go("home")} style={{fontSize:12,color:T.accent,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Başlangıç</button></div>}
</div>

{tables.length===0?(
<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"50vh",gap:16,textAlign:"center"}}>
<div style={{fontSize:36}}>🪑</div>
<div style={{fontSize:16,fontWeight:700,color:T.text}}>Henüz açık masa yok</div>
<div style={{fontSize:13,color:T.textSub,maxWidth:280}}>Yeni bir sipariş almak için masa ekle.</div>
<button onClick={addNewTable} disabled={!day} style={{background:day?T.accent:T.bg3,border:"none",borderRadius:14,padding:"14px 32px",color:day?"#fff":T.textDim,fontWeight:700,fontSize:15,cursor:day?"pointer":"not-allowed",marginTop:8}}>＋ Yeni Masa Ekle</button>
</div>
):(
<>
<div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(auto-fill,minmax(140px,1fr))":"repeat(auto-fill,minmax(155px,1fr))",gap:isMobile?10:12,marginBottom:14}}>
{tables.map(t=>{const tot=t.order.reduce((s,o)=>s+o.price*o.qty,0);const dur=t.oa?Math.floor((Date.now()-new Date(t.oa))/60000):0;const occ=t.s==="o";return(
<button key={t.id} onClick={()=>goTbl(t.id)} style={{background:occ?"#1a3a1a":T.bg2,border:"none",borderRadius:16,padding:isMobile?"12px":"14px 12px",cursor:day?"pointer":"not-allowed",textAlign:"left",color:occ?"#fff":T.text,opacity:day?1:0.5,boxShadow:T.shadow}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontWeight:700,fontSize:isMobile?16:14}}>{t.lbl}</span><span style={{background:occ?"rgba(255,255,255,0.25)":T.bg3,color:occ?"#fff":T.textSub,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:20}}>{occ?"DOLU":"BOŞ"}</span></div>
{t.g&&<div style={{fontSize:11,color:occ?"rgba(255,255,255,0.85)":T.accentL,marginBottom:4}}>{t.g}</div>}
{occ?<><div style={{fontSize:isMobile?20:18,fontWeight:700}}>{fm(tot,cur)}</div><div style={{fontSize:11,opacity:0.85,marginTop:2}}>{dur}dk - {t.order.length} kalem</div></>:<div style={{fontSize:12,color:T.textDim}}>Boş</div>}
</button>);})}
<button onClick={addNewTable} disabled={!day} style={{background:"transparent",border:"2px dashed "+T.border2,borderRadius:16,padding:isMobile?"12px":"14px 12px",cursor:day?"pointer":"not-allowed",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,color:T.textSub,minHeight:isMobile?90:96,opacity:day?1:0.5}}>
<span style={{fontSize:22}}>＋</span>
<span style={{fontSize:11,fontWeight:600}}>Yeni Masa</span>
</button>
</div>

</>
)}
</div>
)}

{view==="order"&&curT&&(
<div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 60px)",overflow:"hidden",position:"relative"}}>
{gM&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><GuestM req={cfg.requireName} onOk={g=>doOpen(gM,g)} onSkip={()=>doOpen(gM,"")} T={T}/></div>}
{disM&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><DiscM total={sub(curT)} cur={cur} fm={fm} T={T} onApply={d=>{setDisc(d);setDisM(false);}} onClose={()=>setDisM(false)}/></div>}
{pay&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center"}}><PayM table={curT} disc={disc} cur={cur} fm={fm} T={T} PO={PO} openCari={cari.filter(c=>!c.settled)} onClose={()=>setPay(false)} onDone={(splits,closeTable)=>closeTbl(splits,closeTable)} tables={tables} setTbl={setTbl} setSel={setSel} setV={setV} uid={uid} msg={msg} setCari={setCari} cari={cari}/></div>}
{cancelConfirm&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:T.bg2,backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",border:"0.5px solid "+T.border,borderRadius:20,padding:28,width:340,maxWidth:"90vw",boxShadow:"0 24px 48px rgba(0,0,0,0.4)"}}><div style={{fontWeight:800,fontSize:17,color:T.danger,marginBottom:10}}>Adisyonu İptal Et</div><p style={{fontSize:13,color:T.textSub,margin:"0 0 20px"}}>{curT.lbl} masasındaki tüm ürünler silinecek ve masa boşalacak. Bu işlem geri alınamaz.</p><div style={{display:"flex",gap:10}}><button onClick={()=>setCancelConfirm(false)} style={{...sb(T.bg3),flex:1,color:T.text}}>Vazgeç</button><button onClick={()=>{setCancelConfirm(false);cancelOrder(curT.id);}} style={{...sb(T.danger),flex:1}}>Evet, İptal Et</button></div></div></div>}

{isMobile?(
/* MOBİL: Tab ile menü/sepet arası geçiş */
<OrderMobileV curT={curT} T={T} sb={sb} fm={fm} ft={ft} cur={cur} disc={disc} setDisc={setDisc} setDisM={setDisM} setPay={setPay} setV={setV} setSel={setSel} setCancelConfirm={setCancelConfirm} cat={cat} setCat={setCat} oCats={oCats} fMenü={fMenü} addItem={addItem} chQ={chQ} sub={sub} fin={fin} cfg={cfg} setGM={setGM} msg={msg} tables={tables} setTbl={setTbl}/>
):(
/* MASAÜSTÜ: yan yana iki sütun */
<div style={{display:"grid",gridTemplateColumns:"1fr 340px",height:"100%",overflow:"hidden"}}>
<div style={{padding:16,overflowY:"auto"}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
<button onClick={()=>{if(curT&&curT.order.length===0){setTbl(prev=>prev.filter(t2=>t2.id!==curT.id));}setV("tables");setSel(null);}} style={{...sb(T.bg3),color:T.textSub,padding:"6px 12px"}}>Masalar</button>
<div><div style={{fontWeight:700,fontSize:13,color:T.text}}>{curT.lbl}</div>{curT.g&&<div style={{fontSize:11,color:T.accentL}}>{curT.g}</div>}</div>
{curT.oa&&<span style={{fontSize:11,color:T.textSub,background:T.bg3,padding:"2px 8px",borderRadius:20}}>{ft(curT.oa)}</span>}
{(curT.order.length>0||curT.s==="o")&&<button onClick={()=>setCancelConfirm(true)} style={{marginLeft:"auto",background:"none",border:"0.5px solid rgba(255,59,48,0.3)",color:T.danger,borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer"}}>Adisyonu İptal Et</button>}
</div>
<div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
{oCats.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:"4px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:cat===c?T.accent:T.bg3,color:cat===c?"#fff":T.textSub}}>{c}</button>)}
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:8}}>
{fMenü.map(item=><button key={item.id} onClick={()=>addItem(curT.id,item)} style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:10,padding:"10px 8px",cursor:"pointer",textAlign:"left",color:T.text}}><div style={{fontWeight:600,fontSize:11,marginBottom:4}}>{item.name}</div><div style={{fontWeight:800,fontSize:13,color:T.accentL}}>{fm(item.price,cur)}</div></button>)}
</div>
</div>
<div style={{background:T.isDark?"#111":T.bg2,borderLeft:"0.5px solid "+T.border,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>
<div style={{padding:"12px 16px",borderBottom:"0.5px solid "+T.border,fontWeight:700,fontSize:13,color:T.accentL,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span>Sipariş</span>
<button onClick={()=>setGM(curT.id)} style={{background:"none",border:"0.5px solid "+T.border2,borderRadius:6,padding:"3px 8px",color:T.textSub,cursor:"pointer",fontSize:11}}>{curT.g||"Müşteri"}</button>
</div>
<div style={{flex:1,overflowY:"auto",padding:"10px 14px",paddingBottom:200}}>
{curT.order.length===0?<div style={{color:T.textDim,textAlign:"center",paddingTop:30,fontSize:12}}>Ürün eklenmedi</div>
:curT.order.map(item=><div key={item.id} style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
<div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:T.text}}>{item.name}</div><div style={{fontSize:10,color:T.textSub}}>{fm(item.price,cur)} x {item.qty} = <span style={{color:T.accentL}}>{fm(item.price*item.qty,cur)}</span></div></div>
<div style={{display:"flex",gap:3}}>
<button onClick={()=>chQ(curT.id,item.id,-1)} style={{width:24,height:24,borderRadius:6,border:"0.5px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",color:T.text}}>-</button>
<span style={{width:18,textAlign:"center",fontWeight:700,lineHeight:"24px",fontSize:12,color:T.text}}>{item.qty}</span>
<button onClick={()=>chQ(curT.id,item.id,1)} style={{width:24,height:24,borderRadius:6,border:"0.5px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",color:T.text}}>+</button>
</div></div>)}
</div>
<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 16px",borderTop:"0.5px solid "+T.border,background:T.isDark?"#111":T.bg2,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)"}}>
<div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:800,color:T.accentL,marginBottom:10}}><span>Toplam</span><span>{fm(fin(curT),cur)}</span></div>
<button onClick={()=>curT.order.length>0&&setPay(true)} disabled={curT.order.length===0} style={{width:"100%",padding:"15px",background:curT.order.length===0?T.bg3:T.accent,color:curT.order.length===0?T.textDim:"#fff",border:"none",borderRadius:12,fontWeight:800,fontSize:16,cursor:curT.order.length===0?"not-allowed":"pointer"}}>Ödeme Al</button>
</div>
</div>
</div>
)}
</div>
)}

{view==="online"&&<OnlineV onlineOrders={onlineOrders} setOnlineOrders={setOnlineOrders} cur={cur} fm={fm} fd={fd} ft={ft} tod={tod} uid={uid} msg={msg} inp={inp} sb={sb} T={T} cfg={cfg}/>}
{view==="import-old"&&<ImportOldV logs={logs} setLogs={setLogs} cur={cur} fm={fm} fd={fd} setV={setV} sb={sb} T={T}/>}
{view==="reports"&&!selLog&&<ReportsV orders={orders} exp={exp} logs={logs} cur={cur} fm={fm} fd={fd} fdl={fdl} ft={ft} tod={tod} mainT={mainT} setMainT={setMainT} expMon={expMon} setExpMon={setExpMon} expDay={expDay} setExpDay={setExpDay} ecats={ecats} expF={expF} setExpF={setExpF} showEF={showEF} setShowEF={setShowEF} addExp={addExp} setExp={setExp} inp={inp} sb={sb} setSelLog={setSelLog} setV={setV} installments={installments} setInstallments={setInstallments} tacoLogs={tacoLogs} setTacoLogs={setTacoLogs} tacoMenu={tacoMenu} setTacoMenu={setTacoMenu} cari={cari} setCari={setCari} T={T} tables={tables} setTbl={setTbl} uid={uid}/>}
{view==="reports"&&selLog&&<LogV log={selLog} setLogs={setLogs} ecats={ecats} cur={cur} fm={fm} ft={ft} fdl={fdl} repT={repT} setRepT={setRepT} setSelLog={setSelLog} inp={inp} T={T} sb={sb} orders={orders} setOrd={setOrd}/>}
{view==="achievements"&&<AchievementsV logs={logs} orders={orders} cari={cari} installments={installments} unlocked={unlocked} cur={cur} fm={fm} fd={fd} setV={setV} sb={sb} T={T} badges={achievements}/>}
{view==="products"&&<ProductsPageV logs={logs} cur={cur} fm={fm} tod={tod} T={T} inp={inp} sb={sb} setV={setV}/>}
{view==="customers"&&<CustomersPageV orders={orders} cur={cur} fm={fm} fd={fd} T={T} inp={inp} setV={setV}/>}
{view==="expenses"&&<ExpensesPageV exp={exp} setExp={setExp} ecats={ecats} setEc={setEc} cur={cur} fm={fm} fd={fd} tod={tod} uid={uid} T={T} setV={setV}/>}
{view==="alltime"&&<AllTimeV orders={orders} cur={cur} fm={fm} T={T} setV={setV}/>}
{view==="notifications"&&<NotificationsV notifications={notifications} setNotifications={setNotifications} fd={fd} ft={ft} setV={setV} sb={sb} T={T}/>}
{view==="installments"&&<InstallmentsPageV installments={installments} setInstallments={setInstallments} cur={cur} fm={fm} fd={fd} ft={ft} tod={tod} T={T} sb={sb} inp={inp} setV={setV} notifications={notifications} setNotifications={setNotifications}/>}
{view==="credit"&&<CreditPageV cari={cari} setCari={setCari} cur={cur} fm={fm} fd={fd} ft={ft} T={T} sb={sb} inp={inp} setV={setV} tables={tables} setTbl={setTbl} uid={uid}/>}
{view==="todo"&&<TodoV todos={todos} setTodos={setTodos} fd={fd} sb={sb} inp={inp} T={T} setV={setV}/>}
{view==="settings"&&<SetV cfg={cfg} cfgF={cfgF} setCfgF={setCfgF} saveCfg={saveCfg} stab={stab} setStab={setStab} menu={menu} mF={mF} setMF={setMF} mEid={mEid} setMEid={setMEid} mCat={mCat} setMCat={setMCat} saveMI={saveMI} setMenü={setMenü} ecats={ecats} setEc={setEc} newec={newec} setNewec={setNewec} exp={exp} msg={msg} setOrd={setOrd} setExp={setExp} setLogs={setLogs} cur={cur} fm={fm} inp={inp} sb={sb} T={T} logs={logs} onlineOrders={onlineOrders} todos={todos} tacoLogs={tacoLogs} tacoMenu={tacoMenu} notifications={notifications} cari={cari} installments={installments}/>}
</div>
);}

function OrderMobileV({curT,T,sb,fm,ft,cur,disc,setDisc,setDisM,setPay,setV,setSel,setCancelConfirm,cat,setCat,oCats,fMenü,addItem,chQ,sub,fin,cfg,setGM,msg,tables,setTbl}){
const[openCats,setOpenCats]=useState(function(){var o={};if(oCats.length>0)o[oCats[0]]=true;return o;});
const[showMenu,setShowMenu]=useState(curT.order.length===0);
const[selMode,setSelMode]=useState(false);
const[selItems,setSelItems]=useState([]);
const orderTotal=fin(curT);
const itemCount=curT.order.reduce(function(s,i){return s+i.qty;},0);

useEffect(function(){
var hasNoOid=curT.order.some(function(o){return !o.oid;});
if(hasNoOid){
setTbl(function(prev){return prev.map(function(t){
if(t.id!==curT.id)return t;
var seen={};
return{...t,order:t.order.map(function(o){
if(o.oid)return o;
seen[o.id]=(seen[o.id]||0)+1;
return{...o,oid:o.id+"_"+seen[o.id]};
})};
});});
}
},[curT.id]);

var aMenü=fMenü;
var oCatsFiltered=oCats;

return(
<div style={{display:"flex",flexDirection:"column",height:"100vh",background:T.bg,overflow:"hidden"}}>

{/* Header */}
<div style={{flexShrink:0,display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:"0.5px solid rgba(255,255,255,0.08)",background:"rgba(13,13,13,0.95)",backdropFilter:"blur(20px)"}}>
<button onClick={function(){setSel(null);setV("tables");}} style={{padding:"6px 14px",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:20,color:T.textSub,fontSize:13,fontWeight:600,cursor:"pointer",flexShrink:0}}>← Masalar</button>
<div style={{flex:1}}>
<div style={{fontSize:15,fontWeight:800,color:T.text}}>{curT.lbl}</div>
{curT.g&&<div style={{fontSize:11,color:T.accentL,fontWeight:600}}>{curT.g}</div>}
</div>
{curT.g&&<button onClick={function(){setGM(curT.id);}} style={{padding:"5px 12px",background:"rgba(52,199,89,0.12)",border:"0.5px solid rgba(52,199,89,0.3)",borderRadius:20,color:T.accentL,fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>{curT.g}</button>}
{!curT.g&&<button onClick={function(){setGM(curT.id);}} style={{padding:"5px 12px",background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:20,color:T.textSub,fontSize:12,fontWeight:600,cursor:"pointer",flexShrink:0}}>+ İsim</button>}
<button onClick={function(){setCancelConfirm(true);}} style={{padding:"5px 12px",background:"rgba(255,59,48,0.08)",border:"0.5px solid rgba(255,59,48,0.25)",borderRadius:20,color:T.danger,fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>İptal</button>
</div>

{/* Sipariş görünümü */}
{!showMenu&&(
<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minHeight:0}}>
<div style={{flex:1,overflowY:"auto",minHeight:0}}>
{curT.order.length===0
?<div style={{textAlign:"center",padding:"60px 20px",color:T.textDim}}>
<div style={{fontSize:36,marginBottom:12}}>🛒</div>
<div style={{fontSize:15,fontWeight:600,color:T.textSub}}>Henüz sipariş yok</div>
</div>
:curT.order.map(function(item,idx){
var seen={};
curT.order.slice(0,idx).forEach(function(o){seen[o.id]=(seen[o.id]||0)+1;});
var oid=item.oid||(item.id+"_"+(seen[item.id]||0)+"_"+idx);
var isSel=selItems.includes(oid);
return(
<div key={oid} style={{display:"flex",alignItems:"center",padding:"14px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.06)",background:isSel?"rgba(52,199,89,0.08)":"transparent"}}>
{selMode&&<button onClick={function(){setSelItems(function(p){return p.includes(oid)?p.filter(function(x){return x!==oid;}):[...p,oid];});}} style={{width:24,height:24,borderRadius:6,border:"2px solid "+(isSel?T.accent:"rgba(255,255,255,0.2)"),background:isSel?T.accent:"transparent",cursor:"pointer",marginRight:10,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:800}}>{isSel?"✓":""}</button>}
<div style={{flex:1,cursor:selMode?"pointer":"default"}} onClick={selMode?function(){setSelItems(function(p){return p.includes(oid)?p.filter(function(x){return x!==oid;}):[...p,oid];});}:undefined}>
<div style={{fontSize:14,fontWeight:700,color:T.text}}>{item.name}</div>
<div style={{fontSize:13,fontWeight:700,color:T.accentL,marginTop:2}}>{fm(item.price*item.qty,cur)}</div>
<div style={{fontSize:10,color:T.textDim,marginTop:1}}>{fm(item.price,cur)} × {item.qty}{item.addedAt?" · "+new Date(item.addedAt).toLocaleDateString("tr-TR",{day:"numeric",month:"short"})+" "+new Date(item.addedAt).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}):""}</div>
</div>
{!selMode&&<div style={{display:"flex",alignItems:"center"}}>
<button onClick={function(){chQ(curT.id,oid,-1);}} style={{width:36,height:36,border:"1px solid rgba(255,59,48,0.3)",background:"rgba(255,59,48,0.1)",color:T.danger,fontSize:20,cursor:"pointer",borderRadius:"8px 0 0 8px",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
<div style={{width:40,textAlign:"center",fontWeight:800,fontSize:15,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:T.bg3,borderTop:"1px solid rgba(255,255,255,0.1)",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>{item.qty}</div>
<button onClick={function(){chQ(curT.id,oid,1);}} style={{width:36,height:36,border:"none",background:T.accent,color:"#fff",fontSize:20,cursor:"pointer",borderRadius:"0 8px 8px 0",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
</div>}
</div>
);})}
</div>

{/* Alt bar */}
<div style={{flexShrink:0,padding:"10px 14px 20px",borderTop:"0.5px solid rgba(255,255,255,0.08)",background:"rgba(13,13,13,0.95)",backdropFilter:"blur(20px)"}}>
{disc&&!selMode&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.danger,marginBottom:6}}>
<span>İndirim <button onClick={function(){setDisc(null);}} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",fontSize:13}}>×</button></span>
<span>-{fm(disc.amount,cur)}</span>
</div>}
{!selMode&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
<span style={{fontSize:14,color:T.textSub,fontWeight:600}}>Toplam</span>
<span style={{fontSize:22,fontWeight:800,color:T.accentL,letterSpacing:-0.5}}>{fm(orderTotal,cur)}</span>
</div>}
{!selMode&&<div style={{display:"flex",gap:8}}>
<button onClick={function(){setShowMenu(true);}} style={{flex:1,padding:"13px",background:T.bg3,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.text,fontWeight:700,fontSize:13,cursor:"pointer"}}>＋ Sipariş Ekle</button>
<button onClick={function(){setSelMode(true);setSelItems([]);}} style={{padding:"13px 14px",background:T.bg3,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.textSub,fontWeight:700,fontSize:13,cursor:"pointer"}}>🔀</button>
<button onClick={function(){setPay(true);}} disabled={curT.order.length===0} style={{flex:2,padding:"13px",background:curT.order.length===0?T.bg3:"linear-gradient(135deg,#34C759,#248A3D)",color:curT.order.length===0?T.textDim:"#fff",border:"none",borderRadius:12,fontWeight:800,fontSize:14,cursor:curT.order.length===0?"not-allowed":"pointer",boxShadow:curT.order.length>0?"0 4px 16px rgba(52,199,89,0.35)":"none"}}>Ödeme Al ↑</button>
</div>}
{selMode&&(
<div>
<div style={{fontSize:12,color:T.textSub,marginBottom:10,textAlign:"center"}}>{selItems.length} ürün seçildi</div>
{selItems.length>0&&(
<div style={{marginBottom:10}}>
<div style={{fontSize:11,color:T.textSub,marginBottom:6,fontWeight:600}}>Hangi masaya taşınsın?</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
{(tables||[]).filter(function(t){return t.id!==curT.id&&t.s==="o";}).map(function(t){return(
<button key={t.id} onClick={function(){
var toMove=curT.order.filter(function(o){return selItems.includes(o.oid||o.id);});
setTbl(function(prev){return prev.map(function(tt){
if(tt.id===t.id)return{...tt,order:[...tt.order,...toMove],s:"o",oa:tt.oa||new Date().toISOString()};
if(tt.id===curT.id){var rem=tt.order.filter(function(o){return !selItems.includes(o.oid||o.id);});return rem.length===0?null:{...tt,order:rem};}
return tt;
}).filter(Boolean);});
msg("Ürünler "+t.lbl+"'a taşındı");setSelMode(false);setSelItems([]);
}} style={{padding:"8px 14px",background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,color:T.text,fontWeight:600,fontSize:12,cursor:"pointer"}}>
{t.lbl}{t.g?" — "+t.g:""}
</button>
);})}
<button onClick={function(){
var toMove=curT.order.filter(function(o){return selItems.includes(o.oid||o.id);});
var newId=(tables&&tables.length>0?Math.max.apply(null,tables.map(function(t){return t.id;}))+1:1);
var newTable={id:newId,lbl:"Masa "+newId,s:"o",order:toMove,oa:new Date().toISOString(),g:""};
setTbl(function(prev){
var rem=prev.map(function(tt){if(tt.id!==curT.id)return tt;var r=tt.order.filter(function(o){return !selItems.includes(o.oid||o.id);});return r.length===0?null:{...tt,order:r};}).filter(Boolean);
return[...rem,newTable];
});
msg("Yeni masaya taşındı");setSelMode(false);setSelItems([]);
}} style={{padding:"8px 14px",background:"rgba(52,199,89,0.1)",border:"0.5px solid rgba(52,199,89,0.3)",borderRadius:10,color:T.accentL,fontWeight:600,fontSize:12,cursor:"pointer"}}>＋ Yeni Masa</button>
</div>
</div>
)}
<button onClick={function(){setSelMode(false);setSelItems([]);}} style={{width:"100%",padding:"12px",background:T.bg3,border:"none",borderRadius:12,color:T.textSub,fontWeight:700,fontSize:13,cursor:"pointer"}}>İptal</button>
</div>
)}
</div>
</div>
)}

{/* Menü görünümü */}
{showMenu&&(
<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
<div style={{flexShrink:0,display:"flex",gap:6,padding:"10px 14px",overflowX:"auto",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
{oCatsFiltered.map(function(c){return(
<button key={c} onClick={function(){setCat(c);}} style={{padding:"7px 16px",border:"none",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",flexShrink:0,background:cat===c?T.accent:"rgba(255,255,255,0.06)",color:cat===c?"#fff":T.textSub}}>{c}</button>
);})}
</div>
<div style={{flex:1,overflowY:"auto"}}>
{aMenü.filter(function(item){return item.on!==false;}).map(function(item){
var inCart=curT.order.filter(function(o){return o.id===item.id;});
var inCartTotal=inCart.reduce(function(s,o){return s+o.qty;},0);
return(
<div key={item.id} style={{display:"flex",alignItems:"center",padding:"13px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.04)",background:inCartTotal>0?"rgba(52,199,89,0.05)":"transparent"}}>
<div style={{flex:1}}>
<div style={{fontSize:13,fontWeight:600,color:T.text}}>{item.name}</div>
<div style={{fontSize:13,fontWeight:800,color:inCartTotal>0?T.accentL:"#555",marginTop:1}}>{fm(item.price,cur)}</div>
</div>
{inCartTotal>0?(
<div style={{display:"flex",alignItems:"center"}}>
<button onClick={function(){var last=inCart[inCart.length-1];if(last)chQ(curT.id,last.oid||last.id,-1);}} style={{width:32,height:32,border:"1px solid rgba(255,59,48,0.3)",background:"rgba(255,59,48,0.1)",color:T.danger,fontSize:18,cursor:"pointer",borderRadius:"6px 0 0 6px",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
<div style={{width:36,textAlign:"center",fontWeight:800,fontSize:14,height:32,display:"flex",alignItems:"center",justifyContent:"center",background:T.bg3,borderTop:"1px solid rgba(255,255,255,0.1)",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>{inCartTotal}</div>
<button onClick={function(){addItem(curT.id,item);}} style={{width:32,height:32,border:"none",background:T.accent,color:"#fff",fontSize:18,cursor:"pointer",borderRadius:"0 6px 6px 0",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
</div>
):(
<button onClick={function(){addItem(curT.id,item);}} style={{width:32,height:32,border:"0.5px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"#fff",fontSize:20,cursor:"pointer",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
)}
</div>
);})}
</div>
<div style={{flexShrink:0,padding:"10px 14px 20px",borderTop:"0.5px solid rgba(255,255,255,0.08)",background:"rgba(13,13,13,0.95)"}}>
<button onClick={function(){setShowMenu(false);}} style={{width:"100%",padding:"13px",background:T.bg3,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.text,fontWeight:700,fontSize:14,cursor:"pointer"}}>← Siparişe Dön {itemCount>0?"("+itemCount+" ürün)":""}</button>
</div>
</div>
)}
</div>
);}

function HomeV({tables,orders,exp,setExp,ecats,todO,todI,todOpenTables,day,cari,cfg,cur,fm,ft,fd,tod,uid,msg,setV,openDay,closeDay,dayCon,setDayCon,isMobile,T=DARK,badges,logs,installments}){
const now=new Date();
const cash=todO.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
const[showExpForm,setShowExpForm]=useState(false);
const[expF,setExpF]=useState({desc:"",amount:"",cat:(ecats&&ecats[0])||"Malzeme"});
const card=todO.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
const todE=exp.filter(e=>e.date===tod()).reduce((s,e)=>s+e.amount,0);
const openT=tables.filter(t=>t.s==="o");
const l7=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-i);const ds=d.toISOString().split("T")[0];return{date:ds,lbl:d.toLocaleDateString("tr-TR",{weekday:"short"}),inc:orders.filter(o=>o.date===ds).reduce((s,o)=>s+o.total,0)};}).reverse();
const mx=Math.max(...l7.map(d=>d.inc),1);
const earnedCount=(badges||[]).filter(b=>b.done).length;
const openCari=(cari||[]).filter(c=>!c.settled).length;
const overdueCount=(installments||[]).reduce((s,p)=>s+(p.installments||[]).filter(i=>!i.paid&&i.due&&new Date(i.due)<new Date(tod())).length,0);

const NAV_CARDS=[
{k:"tables",label:"Masalar",sub:openT.length>0?openT.length+" açık masa":"Boş",val:openT.length||null,valColor:"#34C759"},
{k:"reports",label:"Raporlar",sub:"Satış & harcama",val:null,valColor:null},
{k:"expenses",label:"Harcamalar",sub:"Gider takibi",val:null,valColor:"#FF3B30"},
{k:"installments",label:"Vadeler",sub:overdueCount>0?overdueCount+" gecikmiş":"Taksit takibi",val:overdueCount||null,valColor:"#FF3B30"},
{k:"customers",label:"Müşteriler",sub:"En çok harcayanlar",val:null,valColor:"#F59E0B"},
{k:"alltime",label:"Tüm Zamanlar",sub:"Genel istatistikler",val:null,valColor:"#5856D6"},
{k:"achievements",label:"Rozetler",sub:earnedCount+"/"+((badges||[]).length),val:null,valColor:null},
{k:"settings",label:"Ayarlar",sub:"Sistem & menü",val:null,valColor:null},
];

return(
<div style={{padding:isMobile?"16px":"28px",maxWidth:980,margin:"0 auto"}}>

<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
<div>
<div style={{fontSize:13,color:"#8E8E93",fontWeight:500}}>{now.toLocaleDateString("tr-TR",{weekday:"long"})}</div>
<h1 style={{margin:"4px 0 8px",fontWeight:700,fontSize:28,letterSpacing:-0.6,color:T.text}}>{now.toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"})}</h1>
{day?<span style={{fontSize:12,color:"#34C759",background:"rgba(52,199,89,0.12)",padding:"5px 12px",borderRadius:20,fontWeight:600}}>Gün açık - {ft(day.oa)}</span>:<span style={{fontSize:12,color:"#FF3B30",background:"rgba(255,59,48,0.1)",padding:"5px 12px",borderRadius:20,fontWeight:600}}>Gün henüz açılmadı</span>}
</div>
<div style={{display:"flex",gap:10}}>
{!day?<button onClick={()=>setDayCon(true)} style={{background:"#34C759",border:"none",color:"#fff",padding:"12px 22px",borderRadius:12,fontWeight:600,fontSize:14,cursor:"pointer"}}>Günü Aç</button>
:dayCon?<div style={{display:"flex",gap:8,alignItems:"center",background:T.isDark?"#1a1a1a":T.bg2,borderRadius:12,padding:"8px 14px"}}>
<span style={{fontSize:12,color:"#8E8E93"}}>Günü kapat?</span>
<button onClick={()=>setDayCon(false)} style={{background:"rgba(118,118,128,0.12)",border:"none",color:T.text,borderRadius:8,padding:"7px 12px",fontWeight:600,fontSize:12,cursor:"pointer"}}>İptal</button>
<button onClick={closeDay} style={{background:"#FF3B30",border:"none",color:"#fff",borderRadius:8,padding:"7px 14px",fontWeight:600,fontSize:12,cursor:"pointer"}}>Evet</button>
</div>
:<button onClick={()=>setDayCon(true)} style={{background:"rgba(118,118,128,0.12)",border:"none",color:"#FF9500",padding:"12px 18px",borderRadius:12,fontWeight:600,fontSize:13,cursor:"pointer"}}>Günü Kapat</button>}
</div>
</div>

{!day&&dayCon&&<div style={{display:"flex",gap:10,marginBottom:24}}>
<button onClick={()=>setDayCon(false)} style={{background:T.bg3,border:"none",borderRadius:12,padding:"12px 20px",color:T.textSub,fontWeight:600,fontSize:13,cursor:"pointer"}}>İptal</button>
<button onClick={openDay} style={{background:T.accent,border:"none",borderRadius:12,padding:"12px 24px",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>✓ Evet, Başlat</button>
</div>}

<div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(4,1fr)":"repeat(7,1fr)",gap:8,marginBottom:20}}>
{NAV_CARDS.map((card)=>(
<button key={card.k} onClick={()=>setV(card.k)} style={{background:T.isDark?"rgba(255,255,255,0.05)":T.bg2,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:T.isDark?"1px solid rgba(255,255,255,0.08)":"1px solid "+T.border,borderRadius:14,padding:"14px 10px",cursor:"pointer",textAlign:"left",color:T.text,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",gap:4,minHeight:80}}>
<div style={{fontSize:12,fontWeight:700,color:T.text}}>{card.label}</div>
<div style={{fontSize:10,color:T.textSub,lineHeight:1.3}}>{card.sub}</div>
{card.val!=null&&<div style={{position:"absolute",top:8,right:8,background:card.valColor+"22",color:card.valColor,fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 7px",border:`1px solid ${card.valColor}44`}}>{card.val}</div>}
</button>
))}
</div>

<div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8,marginBottom:isMobile?16:20}}>
<div style={{background:T.isDark?"rgba(255,255,255,0.05)":T.bg2,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:T.isDark?"1px solid rgba(255,255,255,0.1)":"1px solid "+T.border,borderRadius:14,padding:"12px 14px"}}>
<div style={{fontSize:9,color:T.textSub,marginBottom:3,textTransform:"uppercase",letterSpacing:0.5,fontWeight:600}}>Toplam Ciro</div>
<div style={{fontSize:20,fontWeight:800,letterSpacing:-0.5,color:T.text}}>{fm(todI+(todOpenTables||0),cur)}</div>
<div style={{fontSize:10,color:T.textDim,marginTop:2}}>{todO.length} kapanan{(todOpenTables||0)>0?` · ${fm(todOpenTables,cur)} açık`:""}</div>
</div>
<div style={{background:T.isDark?"rgba(255,255,255,0.04)":T.bg2,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:T.isDark?"1px solid rgba(255,255,255,0.08)":"1px solid "+T.border,borderRadius:14,padding:"12px 10px"}}>
<div style={{fontSize:9,color:T.textSub,marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Nakit</div>
<div style={{fontSize:16,fontWeight:700,color:"#34C759"}}>{fm(cash,cur)}</div>
{todI>0&&<div style={{fontSize:9,color:T.textDim,marginTop:2}}>%{Math.round(cash/todI*100)}</div>}
</div>
<div style={{background:T.isDark?"rgba(255,255,255,0.04)":T.bg2,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:T.isDark?"1px solid rgba(255,255,255,0.08)":"1px solid "+T.border,borderRadius:14,padding:"12px 10px"}}>
<div style={{fontSize:9,color:T.textSub,marginBottom:3,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Kart</div>
<div style={{fontSize:16,fontWeight:700,color:"#007AFF"}}>{fm(card,cur)}</div>
{todI>0&&<div style={{fontSize:9,color:T.textDim,marginTop:2}}>%{Math.round(card/todI*100)}</div>}
</div>
</div>

<div style={{marginBottom:isMobile?16:20}}>
<button onClick={()=>setShowExpForm(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,background:showExpForm?T.bg3:T.isDark?"rgba(255,59,48,0.12)":"rgba(255,59,48,0.08)",border:"1px solid "+(showExpForm?T.border:"rgba(255,59,48,0.25)"),borderRadius:10,padding:"9px 16px",cursor:"pointer",color:showExpForm?T.textSub:"#FF3B30",fontWeight:600,fontSize:13}}>
{showExpForm?"İptal":"＋ Harcama Ekle"}
</button>
{showExpForm&&<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:16,display:"grid",gap:10,marginTop:10}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
<input autoFocus placeholder="Açıklama" value={expF.desc} onChange={e=>setExpF(p=>({...p,desc:e.target.value}))} style={{background:T.isDark?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.9)",border:"0.5px solid "+T.border2,borderRadius:10,padding:"10px 14px",color:T.text,fontSize:16,outline:"none",width:"100%",boxSizing:"border-box"}}/>
<input type="number" placeholder="Tutar" value={expF.amount} onChange={e=>setExpF(p=>({...p,amount:e.target.value}))} style={{background:T.isDark?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.9)",border:"0.5px solid "+T.border2,borderRadius:10,padding:"10px 14px",color:T.text,fontSize:16,outline:"none",width:"100%",boxSizing:"border-box"}}/>
</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{(ecats||[]).map(cat=><button key={cat} onClick={()=>setExpF(p=>({...p,cat}))} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:expF.cat===cat?"#FF3B30":T.bg3,color:expF.cat===cat?"#fff":T.textSub}}>{cat}</button>)}
</div>
<button onClick={()=>{if(!expF.desc||!expF.amount)return;setExp(prev=>[{id:uid(),desc:expF.desc,amount:parseFloat(expF.amount),cat:expF.cat,date:tod()},...prev]);msg("Harcama eklendi");setExpF({desc:"",amount:"",cat:(ecats&&ecats[0])||"Malzeme"});setShowExpForm(false);}} style={{background:"#FF3B30",border:"none",borderRadius:10,padding:"11px",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",opacity:expF.desc&&expF.amount?1:0.5}}>Kaydet</button>
</div>}
</div>

<div style={{fontWeight:600,fontSize:15,marginBottom:10,color:T.text}}>Son 7 Gün</div>
<div style={{background:T.isDark?"#1a1a1a":T.bg2,borderRadius:16,padding:"20px 16px 14px",marginBottom:16}}>
<div style={{display:"flex",gap:6,alignItems:"flex-end",height:120}}>
{l7.map((d,i)=>{const h=d.inc>0?Math.max((d.inc/mx)*80,6):2;const isT=d.date===tod();return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
<div style={{fontSize:9,color:T.textSub,textAlign:"center",height:26,display:"flex",alignItems:"flex-end",justifyContent:"center",whiteSpace:"nowrap",paddingBottom:4}}>{d.inc>0?fm(d.inc,cur).replace(cur,"").trim():""}</div>
<div style={{width:"100%",height:h,background:isT?"#34C759":"rgba(52,199,89,0.2)",borderRadius:"4px 4px 0 0"}}/>
<div style={{fontSize:10,color:isT?"#34C759":T.textSub,fontWeight:isT?700:400,marginTop:5}}>{d.lbl}</div>
</div>);})}
</div>
</div>

</div>
);}

function GuestM({req,onOk,onSkip,T}){
const[n,setN]=useState("");
return(<div style={{background:T.isDark?"#1a1a1a":T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:16,padding:28,width:320}}>
<div style={{fontWeight:800,fontSize:17,marginBottom:16}}>Müşteri Adı</div>
<input autoFocus placeholder="Müşteri adi..." value={n} onChange={e=>setN(e.target.value)} onKeyDown={e=>e.key==="Enter"&&n.trim()&&onOk(n.trim())} style={{background:T.bg3,border:"0.5px solid "+T.border2,borderRadius:8,padding:"9px 12px",color:T.text,fontSize:14,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:16}}/>
<div style={{display:"flex",gap:10}}>
{!req&&<button onClick={onSkip} style={{flex:1,background:T.bg3,border:"none",color:T.textSub,borderRadius:8,padding:"10px",fontWeight:600,fontSize:13,cursor:"pointer"}}>Geç</button>}
<button onClick={()=>n.trim()&&onOk(n.trim())} style={{flex:2,background:T.accent,border:"none",color:"#fff",borderRadius:8,padding:"10px",fontWeight:600,fontSize:13,cursor:"pointer"}}>Devam</button>
</div>
</div>);}

function DiscM({total,cur,fm,T,onApply,onClose}){
const[type,setType]=useState("percent");
const[val,setVal]=useState("");
const nv=parseFloat(val)||0;
const da=type==="percent"?total*(nv/100):Math.min(nv,total);
const af=total-da;
return(<div style={{background:T.isDark?"#1a1a1a":T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:16,padding:28,width:340}}>
<div style={{fontWeight:800,fontSize:17,marginBottom:16}}>İndirim</div>
<div style={{display:"flex",gap:8,marginBottom:14}}>
{[{k:"percent",l:"Yüzde (%)"},{k:"fixed",l:"Tutar"}].map(({k,l})=><button key={k} onClick={()=>{setType(k);setVal("");}} style={{flex:1,padding:"8px",borderRadius:8,border:"2px solid "+(type===k?T.accent:T.border),background:type===k?T.accentD:T.bg3,color:type===k?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>)}
</div>
{type==="percent"&&<div style={{display:"flex",gap:6,marginBottom:10}}>{[5,10,15,20].map(d=><button key={d} onClick={()=>setVal(String(d))} style={{flex:1,padding:"6px 0",borderRadius:6,border:"1px solid "+(val===String(d)?T.accent:T.border),background:val===String(d)?T.accent:T.bg3,color:val===String(d)?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{d}%</button>)}</div>}
<input type="number" autoFocus placeholder={type==="percent"?"0-100":"Tutar"} value={val} onChange={e=>setVal(e.target.value)} style={{background:T.bg3,border:"0.5px solid "+T.border2,borderRadius:8,padding:"9px 12px",color:T.text,fontSize:14,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:14}}/>
{nv>0&&<div style={{background:T.bg3,borderRadius:10,padding:12,marginBottom:14,fontSize:13}}>
<div style={{display:"flex",justifyContent:"space-between",color:T.textSub,marginBottom:4}}><span>Orijinal</span><span>{fm(total,cur)}</span></div>
<div style={{display:"flex",justifyContent:"space-between",color:T.danger,marginBottom:4}}><span>İndirim</span><span>-{fm(da,cur)}</span></div>
<div style={{display:"flex",justifyContent:"space-between",fontWeight:800,color:T.accentL,fontSize:15}}><span>Son</span><span>{fm(af,cur)}</span></div>
</div>}
<div style={{display:"flex",gap:10}}>
<button onClick={onClose} style={{flex:1,background:T.bg3,border:"none",color:T.textSub,borderRadius:8,padding:"10px",fontWeight:600,fontSize:13,cursor:"pointer"}}>İptal</button>
<button onClick={()=>nv>0&&onApply({type,value:nv,amount:da,after:af})} style={{flex:2,background:nv?T.accent:T.bg3,border:"none",color:nv?"#fff":T.textDim,borderRadius:8,padding:"10px",fontWeight:700,fontSize:13,cursor:"pointer"}}>Uygula</button>
</div>
</div>);}

function PayM({table,disc,cur,fm,T,PO,openCari,onClose,onDone,tables,setTbl,setSel,setV,uid,msg,setCari,cari}){
const[payMode,setPayMode]=useState("full");
const[partialAmt,setPartialAmt]=useState("");
const[selectedItems,setSelectedItems]=useState({});
const[moveMode,setMoveMode]=useState(false);
const[discAmt,setDiscAmt]=useState(disc?disc.amount:0);
const[showDiscInput,setShowDiscInput]=useState(false);
const[discInput,setDiscInput]=useState("");
const[showCariInput,setShowCariInput]=useState(false);
const[newCariName,setNewCariName]=useState("");

const sub=table.order.reduce((s,o)=>s+o.price*o.qty,0);
const total=Math.max(0,sub-discAmt);

const selectedTotal=Object.entries(selectedItems).reduce((s,[id,qty])=>{
  const item=table.order.find(o=>String(o.id)===String(id));
  return s+(item?item.price*qty:0);
},0);

const toggleItem=(id,maxQty)=>setSelectedItems(p=>{
  if(p[id]){const n={...p};delete n[id];return n;}
  return{...p,[id]:maxQty};
});

const applyDisc=()=>{
  const amt=parseFloat(discInput||0);
  if(amt>0&&amt<=sub){setDiscAmt(amt);setShowDiscInput(false);setDiscInput("");}
};

const moveItemsToTable=(targetId)=>{
  const itemsToMove=table.order.filter(o=>selectedItems[o.id]);
  if(!itemsToMove.length)return;
  setTbl(prev=>prev.map(t=>{
    if(t.id!==targetId)return t;
    const newOrder=[...t.order];
    itemsToMove.forEach(item=>{
      const ex=newOrder.findIndex(o=>o.id===item.id);
      if(ex>=0)newOrder[ex]={...newOrder[ex],qty:newOrder[ex].qty+item.qty};
      else newOrder.push({...item});
    });
    return{...t,order:newOrder,s:"o",oa:t.oa||new Date().toISOString()};
  }));
  setTbl(prev=>prev.map(t=>{
    if(t.id!==table.id)return t;
    const remaining=t.order.filter(o=>!selectedItems[o.id]);
    if(!remaining.length)return null;
    return{...t,order:remaining};
  }).filter(Boolean));
  msg("Ürünler taşındı");onClose();
};

const moveToNewTable=()=>{
  const itemsToMove=table.order.filter(o=>selectedItems[o.id]);
  if(!itemsToMove.length)return;
  const newId=(tables.length>0?Math.max(...tables.map(t=>t.id)):0)+1;
  const newTable={id:newId,lbl:"Masa "+newId,s:"o",order:itemsToMove,oa:new Date().toISOString(),g:""};
  setTbl(prev=>{
    const remaining=prev.map(t=>{
      if(t.id!==table.id)return t;
      const rem=t.order.filter(o=>!selectedItems[o.id]);
      if(!rem.length)return null;
      return{...t,order:rem};
    }).filter(Boolean);
    return[...remaining,newTable];
  });
  msg("Yeni masaya taşındı");onClose();
};

const doPay=(pt,amt)=>{
  const itemIds=payMode==="items"?Object.keys(selectedItems):null;
  const isPartial=payMode==="partial"||(payMode==="items"&&itemIds&&itemIds.length<table.order.length);
  onDone([{pt,amount:amt,total:amt,sub,da:discAmt,items:itemIds}],!isPartial);
};

const doNewCari=()=>{
  const name=(newCariName||"").trim();
  if(!name)return;
  onDone([{pt:"credit",amount:total,total,sub,da:discAmt,cariName:name.toUpperCase(),items:null}],true);
};

const otherTables=(tables||[]).filter(t=>t.id!==table.id&&t.s==="o");

return(
<div style={{background:"rgba(22,22,22,0.98)",backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,padding:"20px 20px 32px",maxHeight:"85vh",overflowY:"auto"}}>

{/* Başlık */}
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
<div>
<div style={{fontWeight:800,fontSize:18,color:T.text}}>Ödeme Al</div>
<div style={{fontSize:12,color:T.textSub,marginTop:2}}>{table.lbl}{table.g?" — "+table.g:""}</div>
</div>
<button onClick={onClose} style={{background:T.bg3,border:"none",borderRadius:20,width:32,height:32,cursor:"pointer",color:T.textSub,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
</div>

{/* Mod seçici */}
<div style={{display:"flex",gap:6,marginBottom:16}}>
{[{k:"full",l:"Tümünü Öde"},{k:"partial",l:"Kısmi Tutar"},{k:"items",l:"Ürün Seç"}].map(m=>(
<button key={m.k} onClick={()=>{setPayMode(m.k);setSelectedItems({});setPartialAmt("");setMoveMode(false);setShowDiscInput(false);setShowCariInput(false);}}
style={{flex:1,padding:"9px 6px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,background:payMode===m.k?T.accent:T.bg3,color:payMode===m.k?"#fff":T.textSub,transition:"all 0.15s"}}>
{m.l}
</button>
))}
</div>

{/* TAM ÖDEME */}
{payMode==="full"&&(
<div>
{/* Tutar özeti */}
<div style={{background:T.bg3,borderRadius:12,padding:"14px 16px",marginBottom:12}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:discAmt>0?8:0}}>
<span style={{color:T.textSub,fontSize:13}}>Ara Toplam</span>
<span style={{fontWeight:600,fontSize:15,color:T.text}}>{fm(sub,cur)}</span>
</div>
{discAmt>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
<span style={{color:T.danger,fontSize:13,display:"flex",alignItems:"center",gap:6}}>
İndirim
<button onClick={()=>{setDiscAmt(0);}} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",fontSize:14,padding:0,lineHeight:1}}>×</button>
</span>
<span style={{fontWeight:600,fontSize:15,color:T.danger}}>-{fm(discAmt,cur)}</span>
</div>}
{discAmt>0&&<div style={{borderTop:"0.5px solid rgba(255,255,255,0.08)",paddingTop:8}}/>}
<div style={{display:"flex",justifyContent:"space-between"}}>
<span style={{color:T.text,fontSize:15,fontWeight:700}}>Toplam</span>
<span style={{fontWeight:800,fontSize:22,color:T.accentL}}>{fm(total,cur)}</span>
</div>
</div>

{/* İndirim */}
<div style={{marginBottom:8}}>
{!showDiscInput
?<button onClick={()=>setShowDiscInput(true)} style={{width:"100%",padding:"10px 14px",background:"transparent",border:"1px dashed rgba(255,255,255,0.12)",borderRadius:10,color:T.textDim,fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"left"}}>
＋ İndirim Ekle
</button>
:<div style={{display:"flex",gap:8,alignItems:"center"}}>
<input autoFocus type="number" placeholder="İndirim tutarı..." value={discInput} onChange={e=>setDiscInput(e.target.value)}
onKeyDown={e=>e.key==="Enter"&&applyDisc()}
style={{flex:1,background:T.bg3,border:"0.5px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"10px 14px",color:T.text,fontSize:16,fontWeight:700,outline:"none"}}/>
<button onClick={applyDisc} style={{padding:"10px 16px",background:T.accent,border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>Uygula</button>
<button onClick={()=>{setShowDiscInput(false);setDiscInput("");}} style={{padding:"10px 12px",background:T.bg3,border:"none",borderRadius:10,color:T.textSub,fontWeight:600,fontSize:13,cursor:"pointer"}}>İptal</button>
</div>}
</div>

{/* Nakit / Kart butonları */}
<div style={{display:"flex",gap:10,marginBottom:12}}>
<button onClick={()=>doPay("cash",total)} style={{flex:1,padding:15,background:"#FF9500",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer"}}>💵 Nakit</button>
<button onClick={()=>doPay("card",total)} style={{flex:1,padding:15,background:"#007AFF",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer"}}>💳 Kart</button>
</div>

{/* Cari */}
<div style={{borderTop:"0.5px solid rgba(255,255,255,0.08)",paddingTop:12}}>
<div style={{fontSize:11,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:8}}>Cariye Ekle</div>

{/* Mevcut açık cariler */}
{(openCari||[]).length>0&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
{(openCari||[]).map(c=>(
<button key={c.id} onClick={()=>doPay("credit",total)} style={{padding:"8px 14px",background:"rgba(175,82,222,0.1)",border:"1px solid rgba(175,82,222,0.3)",borderRadius:8,color:"#AF52DE",fontSize:12,fontWeight:600,cursor:"pointer"}}>
{c.g||"İsimsiz"}
</button>
))}
</div>}

{/* Yeni cari oluştur */}
{!showCariInput
?<button onClick={()=>setShowCariInput(true)} style={{width:"100%",padding:"10px 14px",background:"rgba(175,82,222,0.08)",border:"1px solid rgba(175,82,222,0.2)",borderRadius:10,color:"#AF52DE",fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"left"}}>
＋ Yeni Cari Oluştur
</button>
:<div style={{display:"flex",gap:8,alignItems:"center"}}>
<input autoFocus placeholder="Müşteri adı..." value={newCariName} onChange={e=>setNewCariName(e.target.value)}
onKeyDown={e=>e.key==="Enter"&&doNewCari()}
style={{flex:1,background:T.bg3,border:"0.5px solid rgba(175,82,222,0.4)",borderRadius:10,padding:"10px 14px",color:T.text,fontSize:16,outline:"none"}}/>
<button onClick={doNewCari} style={{padding:"10px 16px",background:"#AF52DE",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>Kaydet</button>
<button onClick={()=>{setShowCariInput(false);setNewCariName("");}} style={{padding:"10px 12px",background:T.bg3,border:"none",borderRadius:10,color:T.textSub,fontWeight:600,fontSize:13,cursor:"pointer"}}>İptal</button>
</div>}
</div>
</div>
)}

{/* KISMİ TUTAR */}
{payMode==="partial"&&(
<div>
<div style={{fontSize:12,color:T.textSub,marginBottom:8}}>Ne kadar alınacak? <span style={{color:T.accentL,fontWeight:700}}>(Toplam: {fm(sub,cur)})</span></div>
<input type="number" placeholder="Tutar gir..." value={partialAmt} onChange={e=>setPartialAmt(e.target.value)}
style={{width:"100%",background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:12,padding:"14px 16px",color:T.text,fontSize:18,fontWeight:700,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
{partialAmt&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:T.textSub,marginBottom:14,padding:"10px 14px",background:T.bg3,borderRadius:10}}>
<span>Kalan</span>
<span style={{color:T.danger,fontWeight:700}}>{fm(Math.max(0,sub-parseFloat(partialAmt||0)),cur)}</span>
</div>}
<div style={{display:"flex",gap:10}}>
<button disabled={!partialAmt} onClick={()=>doPay("cash",parseFloat(partialAmt))} style={{flex:1,padding:15,background:partialAmt?"#FF9500":T.bg3,border:"none",borderRadius:12,color:partialAmt?"#fff":T.textDim,fontWeight:800,fontSize:15,cursor:partialAmt?"pointer":"not-allowed"}}>💵 Nakit</button>
<button disabled={!partialAmt} onClick={()=>doPay("card",parseFloat(partialAmt))} style={{flex:1,padding:15,background:partialAmt?"#007AFF":T.bg3,border:"none",borderRadius:12,color:partialAmt?"#fff":T.textDim,fontWeight:800,fontSize:15,cursor:partialAmt?"pointer":"not-allowed"}}>💳 Kart</button>
</div>
</div>
)}

{/* ÜRÜN SEÇ */}
{payMode==="items"&&(
<div>
<div style={{fontSize:12,color:T.textSub,marginBottom:10}}>Ürün seç → öde veya masaya taşı</div>
{table.order.map(item=>{const sel=!!selectedItems[item.id];return(
<button key={item.id} onClick={()=>toggleItem(item.id,item.qty)}
style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",background:sel?"rgba(52,199,89,0.12)":T.bg3,border:`0.5px solid ${sel?"rgba(52,199,89,0.4)":T.border}`,borderRadius:12,marginBottom:8,cursor:"pointer",color:T.text,textAlign:"left"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{width:22,height:22,borderRadius:6,border:`2px solid ${sel?T.accent:"rgba(255,255,255,0.2)"}`,background:sel?T.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
{sel&&<span style={{color:"#fff",fontSize:12}}>✓</span>}
</div>
<div style={{textAlign:"left"}}>
<div style={{fontSize:13,fontWeight:600,color:T.text}}>{item.name}</div>
<div style={{fontSize:11,color:T.textSub}}>×{item.qty} · {fm(item.price,cur)} adet</div>
</div>
</div>
<span style={{fontWeight:700,fontSize:14,color:sel?T.accentL:T.textSub}}>{fm(item.price*item.qty,cur)}</span>
</button>
);})}

{Object.keys(selectedItems).length>0&&(
<div style={{marginTop:4}}>
<div style={{display:"flex",justifyContent:"space-between",padding:"12px 14px",background:T.bg3,borderRadius:10,marginBottom:12}}>
<span style={{color:T.textSub,fontSize:13}}>Seçilen toplam</span>
<span style={{fontWeight:800,fontSize:18,color:T.accentL}}>{fm(selectedTotal,cur)}</span>
</div>
{!moveMode&&<div style={{display:"flex",gap:8,marginBottom:10}}>
<button onClick={()=>doPay("cash",selectedTotal)} style={{flex:1,padding:13,background:"#FF9500",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>💵 Nakit</button>
<button onClick={()=>doPay("card",selectedTotal)} style={{flex:1,padding:13,background:"#007AFF",border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>💳 Kart</button>
</div>}
<button onClick={()=>setMoveMode(p=>!p)} style={{width:"100%",padding:"11px",background:moveMode?"rgba(255,149,0,0.15)":T.bg3,border:`1px solid ${moveMode?"rgba(255,149,0,0.4)":T.border}`,borderRadius:12,color:moveMode?"#FF9500":T.textSub,fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:moveMode?10:0}}>
🔀 {moveMode?"Masa seç:":"Masaya Taşı"}
</button>
{moveMode&&<div>
<button onClick={moveToNewTable} style={{width:"100%",padding:"11px",background:"rgba(52,199,89,0.1)",border:"1px solid rgba(52,199,89,0.3)",borderRadius:12,color:T.accent,fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:8}}>＋ Yeni Masa Aç</button>
{otherTables.length>0&&<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{otherTables.map(t=>(
<button key={t.id} onClick={()=>moveItemsToTable(t.id)} style={{padding:"9px 14px",background:T.bg3,border:"0.5px solid "+T.border,borderRadius:10,color:T.text,fontWeight:600,fontSize:12,cursor:"pointer"}}>
{t.lbl}{t.g?" — "+t.g:""}
</button>
))}
</div>}
</div>}
</div>
)}
</div>
)}

</div>
);}

function ReportsV({orders,exp,logs,cur,fm,fd,fdl,ft,tod,mainT,setMainT,expMon,setExpMon,expDay,setExpDay,ecats,expF,setExpF,showEF,setShowEF,addExp,setExp,inp,sb,setSelLog,setV,installments,setInstallments,tacoLogs,setTacoLogs,tacoMenu,setTacoMenu,cari,setCari,T=DARK,tables,setTbl,uid}){
const now=new Date();
const[activeTab,setActiveTab]=useState("Satış");
const[selMonth,setSelMonth]=useState(now.toISOString().slice(0,7));
const[expandedDay,setExpandedDay]=useState(null);
const[showExpForm,setShowExpForm]=useState(false);
const[newExp,setNewExp]=useState({desc:"",amount:"",cat:(ecats&&ecats[0])||"Malzeme"});
const[editExp,setEditExp]=useState(null);
const[showNewCat,setShowNewCat]=useState(false);
const[newCatName,setNewCatName]=useState("");

const allMonths=[...new Set([...orders.map(o=>o.date?o.date.slice(0,7):""),...(exp||[]).map(e=>e.date?e.date.slice(0,7):"")].filter(Boolean))].sort((a,b)=>b.localeCompare(a));
const monthLabel=function(m){const[y,mo]=m.split("-");return new Date(y,parseInt(mo)-1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"});};
const monthStart=selMonth+"-01";
const lastDay=new Date(parseInt(selMonth.slice(0,4)),parseInt(selMonth.slice(5,7)),0).getDate();
const monthEnd=selMonth+"-"+String(lastDay).padStart(2,"0");
const monthOrders=orders.filter(o=>o.date&&o.date>=monthStart&&o.date<=monthEnd);
const monthExp=(exp||[]).filter(e=>e.date&&e.date>=monthStart&&e.date<=monthEnd);
const totalInc=monthOrders.reduce((s,o)=>s+o.total,0);
const totalExp=monthExp.reduce((s,e)=>s+e.amount,0);
const totalCash=monthOrders.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
const totalCard=monthOrders.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
const dayMap={};
monthOrders.forEach(o=>{const d=o.date;if(!dayMap[d])dayMap[d]={date:d,orders:[],total:0};dayMap[d].orders.push(o);dayMap[d].total+=o.total||0;});
const logMap={};
(logs||[]).forEach(l=>{if(l.date)logMap[l.date]=l;});
const dayList=Object.values(dayMap).sort((a,b)=>b.date.localeCompare(a.date));
const byCat={};
monthExp.forEach(e=>{if(!byCat[e.cat])byCat[e.cat]=0;byCat[e.cat]+=e.amount||0;});

return(
<div style={{maxWidth:680,margin:"0 auto",paddingBottom:60}}>
<div style={{padding:"16px 16px 12px",borderBottom:"0.5px solid "+T.border}}>
<button onClick={()=>setV("lurk")} style={{background:"none",border:"none",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600,padding:0,marginBottom:10,display:"block"}}>Dashboard</button>
<h2 style={{margin:"0 0 12px",fontWeight:800,fontSize:22,color:T.text}}>Raporlar</h2>
<div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
{allMonths.map(m=>(
<button key={m} onClick={()=>setSelMonth(m)} style={{padding:"7px 16px",border:"none",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",flexShrink:0,background:selMonth===m?T.accent:"rgba(255,255,255,0.06)",color:selMonth===m?"#fff":T.textSub}}>
{monthLabel(m)}
</button>
))}
</div>
</div>
<div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8,padding:"12px 16px",borderBottom:"0.5px solid "+T.border}}>
<div style={{background:"rgba(52,199,89,0.08)",borderRadius:12,padding:"12px 14px",border:"0.5px solid rgba(52,199,89,0.2)"}}>
<div style={{fontSize:9,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>Toplam Ciro</div>
<div style={{fontSize:20,fontWeight:800,color:T.accentL}}>{fm(totalInc,cur)}</div>
<div style={{fontSize:10,color:T.textDim,marginTop:2}}>{monthOrders.length} adisyon</div>
</div>
<div style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"12px 10px",border:"0.5px solid rgba(255,255,255,0.08)"}}>
<div style={{fontSize:9,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>Nakit</div>
<div style={{fontSize:15,fontWeight:700,color:"#34C759"}}>{fm(totalCash,cur)}</div>
{totalInc>0&&<div style={{fontSize:9,color:T.textDim,marginTop:2}}>%{Math.round(totalCash/totalInc*100)}</div>}
</div>
<div style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"12px 10px",border:"0.5px solid rgba(255,255,255,0.08)"}}>
<div style={{fontSize:9,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>Kart</div>
<div style={{fontSize:15,fontWeight:700,color:"#007AFF"}}>{fm(totalCard,cur)}</div>
{totalInc>0&&<div style={{fontSize:9,color:T.textDim,marginTop:2}}>%{Math.round(totalCard/totalInc*100)}</div>}
</div>
</div>
<div style={{display:"flex",borderBottom:"0.5px solid "+T.border}}>
{["Satış","Harcama"].map(tab=>(
<button key={tab} onClick={()=>setActiveTab(tab)} style={{flex:1,padding:"12px 0",border:"none",borderBottom:"2px solid "+(activeTab===tab?T.accent:"transparent"),background:"transparent",cursor:"pointer",fontSize:13,fontWeight:700,color:activeTab===tab?T.accentL:T.textSub}}>
{tab}
</button>
))}
</div>
{activeTab==="Satış"&&(
<div>
{dayList.length===0
?<div style={{textAlign:"center",padding:"40px",color:T.textDim}}>Bu ayda sipariş yok</div>
:dayList.map(day=>{
const log=logMap[day.date];
const open=log?ft(log.oa):"—";
const close=log?ft(log.ca):"—";
const isOpen=expandedDay===day.date;
return(
<div key={day.date} style={{borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
<button onClick={()=>setExpandedDay(isOpen?null:day.date)} style={{width:"100%",background:"none",border:"none",padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
<div>
<div style={{fontSize:14,fontWeight:700,color:T.text}}>{new Date(day.date+"T12:00:00").toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric",weekday:"long"})}</div>
<div style={{fontSize:11,color:T.textSub,marginTop:2}}>{log?open+" - "+close+" · ":""}{day.orders.length} adisyon</div>
</div>
<div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
<div style={{fontSize:16,fontWeight:800,color:T.accentL}}>{fm(day.total,cur)}</div>
<span style={{fontSize:12,color:T.textSub}}>{isOpen?"▲":"▽"}</span>
</div>
</button>
{isOpen&&<div style={{background:"rgba(255,255,255,0.02)",borderTop:"0.5px solid rgba(255,255,255,0.06)"}}>
{day.orders.map((o,i)=>(
<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px",borderBottom:"0.5px solid rgba(255,255,255,0.03)"}}>
<div>
<div style={{fontSize:12,fontWeight:600,color:T.text}}>{o.g||"—"}</div>
<div style={{fontSize:11,color:T.textSub}}>{o.pt==="cash"?"Nakit":o.pt==="card"?"Kart":"Cari"}</div>
</div>
<div style={{fontSize:14,fontWeight:700,color:T.text}}>{fm(o.total,cur)}</div>
</div>
))}
</div>}
</div>
);})}
</div>
)}
{activeTab==="Harcama"&&(
<div>
<div style={{padding:"12px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
<button onClick={()=>{setShowExpForm(p=>!p);setEditExp(null);setNewExp({desc:"",amount:"",cat:(ecats&&ecats[0])||"Malzeme"});}} style={{background:showExpForm?T.bg3:"rgba(255,59,48,0.1)",border:"1px solid "+(showExpForm?T.border:"rgba(255,59,48,0.3)"),borderRadius:10,padding:"9px 16px",cursor:"pointer",color:showExpForm?T.textSub:T.danger,fontWeight:600,fontSize:13}}>
{showExpForm?"İptal":"+ Harcama Ekle"}
</button>
{showExpForm&&<div style={{marginTop:12,display:"grid",gap:8}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
<input autoFocus placeholder="Açıklama" value={newExp.desc} onChange={e=>setNewExp(p=>({...p,desc:e.target.value}))} style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:10,padding:"11px 14px",color:T.text,fontSize:14,outline:"none"}}/>
<input type="number" placeholder="Tutar" value={newExp.amount} onChange={e=>setNewExp(p=>({...p,amount:e.target.value}))} style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:10,padding:"11px 14px",color:T.text,fontSize:14,outline:"none"}}/>
</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
{(ecats||[]).map(cat=><button key={cat} onClick={()=>setNewExp(p=>({...p,cat}))} style={{padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:newExp.cat===cat?T.danger:T.bg3,color:newExp.cat===cat?"#fff":T.textSub}}>{cat}</button>)}
{!showNewCat
?<button onClick={()=>setShowNewCat(true)} style={{padding:"5px 12px",borderRadius:20,border:"1px dashed rgba(255,255,255,0.2)",background:"transparent",cursor:"pointer",fontSize:11,color:T.textDim}}>+ Yeni</button>
:<div style={{display:"flex",gap:6,alignItems:"center"}}>
<input autoFocus placeholder="Kategori" value={newCatName} onChange={e=>setNewCatName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newCatName.trim()){const t=newCatName.trim();if(!ecats.includes(t)){if(typeof setEc==="function")setEc(prev=>[...prev,t]);}setNewExp(p=>({...p,cat:t}));setNewCatName("");setShowNewCat(false);}}} style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:8,padding:"5px 10px",color:T.text,fontSize:12,outline:"none",width:110}}/>
<button onClick={()=>{const t=newCatName.trim();if(t){if(!ecats.includes(t)){if(typeof setEc==="function")setEc(prev=>[...prev,t]);}setNewExp(p=>({...p,cat:t}));}setNewCatName("");setShowNewCat(false);}} style={{padding:"5px 10px",background:T.accent,border:"none",borderRadius:8,color:"#fff",fontWeight:600,fontSize:11,cursor:"pointer"}}>Ekle</button>
</div>}
</div>
<button onClick={()=>{
if(!newExp.desc||!newExp.amount)return;
if(editExp!==null){
setExp(prev=>prev.map((e,i)=>i===editExp?{...e,desc:newExp.desc,amount:parseFloat(newExp.amount),cat:newExp.cat}:e));
setEditExp(null);
}else{
setExp(prev=>[{id:uid(),desc:newExp.desc,amount:parseFloat(newExp.amount),cat:newExp.cat,date:tod()},...prev]);
}
setNewExp({desc:"",amount:"",cat:(ecats&&ecats[0])||"Malzeme"});
setShowExpForm(false);
}} style={{padding:"12px",background:T.danger,border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",opacity:newExp.desc&&newExp.amount?1:0.5}}>
{editExp!==null?"Güncelle":"Kaydet"}
</button>
</div>}
</div>
{Object.keys(byCat).length>0&&<div style={{padding:"12px 16px 0"}}>
<div style={{fontSize:10,color:T.textSub,fontWeight:600,letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>Kategori Dağılımı</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
{Object.entries(byCat).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>(
<div key={cat} style={{background:"rgba(255,59,48,0.06)",borderRadius:10,padding:"10px 12px",border:"0.5px solid rgba(255,59,48,0.15)"}}>
<div style={{fontSize:10,color:T.textSub,marginBottom:2}}>{cat}</div>
<div style={{fontSize:15,fontWeight:800,color:T.danger}}>{fm(amt,cur)}</div>
<div style={{fontSize:9,color:T.textDim,marginTop:1}}>%{totalExp>0?Math.round(amt/totalExp*100):0}</div>
</div>
))}
</div>
</div>}
{monthExp.length>0&&<div style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.08)",borderTop:"0.5px solid rgba(255,255,255,0.08)"}}>
<span style={{fontSize:12,color:T.textSub,fontWeight:600}}>Toplam Harcama</span>
<span style={{fontSize:15,fontWeight:800,color:T.danger}}>{fm(totalExp,cur)}</span>
</div>}
{monthExp.length===0
?<div style={{textAlign:"center",padding:"40px",color:T.textDim}}>Bu ay harcama yok</div>
:monthExp.sort((a,b)=>b.date.localeCompare(a.date)).map((e,i)=>{
const realIdx=(exp||[]).indexOf(e);
return(
<div key={i} style={{padding:"12px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.04)",background:editExp===realIdx?"rgba(255,149,0,0.05)":"transparent"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{flex:1}}>
<div style={{fontSize:13,fontWeight:600,color:T.text}}>{e.desc}</div>
<div style={{fontSize:11,color:T.textSub,marginTop:1}}>{e.cat} · {fd(e.date)}</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<div style={{fontSize:14,fontWeight:700,color:T.danger}}>{fm(e.amount,cur)}</div>
<button onClick={()=>{setNewExp({desc:e.desc,amount:String(e.amount),cat:e.cat});setEditExp(realIdx);setShowExpForm(true);}} style={{background:"rgba(255,255,255,0.06)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:6,padding:"4px 10px",cursor:"pointer",color:T.textSub,fontSize:11,fontWeight:600}}>Düzenle</button>
<button onClick={()=>setExp(prev=>prev.filter((_,idx)=>idx!==realIdx))} style={{background:"none",border:"none",color:T.textDim,cursor:"pointer",fontSize:16,padding:"0 4px"}}>×</button>
</div>
</div>
</div>
);})}
</div>
)}
</div>
);}

function SetV({cfg,cfgF,setCfgF,saveCfg,stab,setStab,menu,mF,setMF,mEid,setMEid,mCat,setMCat,saveMI,setMenü,ecats,setEc,newec,setNewec,exp,msg,setOrd,setExp,setLogs,cur,fm,inp,sb,T,logs,onlineOrders,todos,tacoLogs,tacoMenu,notifications,cari,installments}){
return(<div style={{padding:24,maxWidth:860,margin:"0 auto"}}>
<h2 style={{margin:"0 0 20px",fontWeight:700,fontSize:20}}>Ayarlar</h2>
<div style={{display:"flex",gap:8,marginBottom:22}}>
{[{k:"general",l:"Genel"},{k:"menu",l:"Menü"},{k:"ecats",l:"Harcama Kategorileri"}].map(({k,l})=><button key={k} onClick={()=>setStab(k)} style={{padding:"9px 20px",borderRadius:9,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:stab===k?T.accent:"#1E1E1E",color:stab===k?"#fff":T.textSub}}>{l}</button>)}
</div>
{stab==="general"&&<>
<div style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:12,padding:22,marginBottom:16}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:16}}>İşletme Bilgileri</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>İşletme Adı</label><input value={cfgF.name} onChange={e=>setCfgF(p=>({...p,name:e.target.value}))} style={inp}/></div>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>Para Birimi</label><input value={cfgF.cur} onChange={e=>setCfgF(p=>({...p,cur:e.target.value}))} style={{...inp,maxWidth:80}}/></div>

</div>
</div>
<div style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:12,padding:22,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:6}}>Online Sipariş Platformları</div>
<div style={{fontSize:12,color:T.textSub,marginBottom:14}}>Pasif platformlar Online sayfasında görünmez, geçmiş veriler silinmez.</div>
{[{k:"yemeksepeti",l:"Yemeksepeti",color:"#FA0050"},{k:"ubereats",l:"Uber Eats",color:"#06C167"}].map(p=>{
const hidden=(cfgF.hiddenPlatforms||[]).includes(p.k);
return(<div key={p.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{width:8,height:8,borderRadius:"50%",background:hidden?"#444":p.color}}/>
<span style={{fontSize:13,fontWeight:600,color:hidden?T.textDim:T.text}}>{p.l}</span>
<span style={{fontSize:11,color:hidden?"#FF3B30":"#34C759",fontWeight:600}}>{hidden?"Pasif":"Aktif"}</span>
</div>
<div onClick={()=>setCfgF(prev=>{const h=prev.hiddenPlatforms||[];const newH=h.includes(p.k)?h.filter(x=>x!==p.k):[...h,p.k];return{...prev,hiddenPlatforms:newH};})} style={{width:44,height:24,borderRadius:12,background:hidden?T.bg3:"#34C759",border:"0.5px solid "+T.border2,position:"relative",cursor:"pointer"}}>
<div style={{position:"absolute",top:3,left:hidden?3:22,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left 0.2s"}}/>
</div>
</div>);})}
<button onClick={saveCfg} style={{...sb(T.accent),marginTop:14,padding:"10px 22px",fontSize:13}}>Kaydet</button>
</div>
<div style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:12,padding:22,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:6}}>Hedef Takibi</div>
<div style={{fontSize:12,color:T.textSub,marginBottom:14}}>Bugün sayfasında aylık ve haftalık hedefe göre ilerlemenizi takip edebilirsiniz.</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
</div>
<button onClick={saveCfg} style={{...sb(T.accent),marginTop:14,padding:"10px 22px",fontSize:13}}>Hedefleri Güncelle</button>
</div>
<div style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:12,padding:22,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:14}}>Adisyon Ayarları</div>
<label style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
<div onClick={()=>setCfgF(p=>({...p,requireName:!p.requireName}))} style={{width:44,height:24,borderRadius:12,background:cfgF.requireName?T.accent:T.bg3,border:"0.5px solid "+T.border2,position:"relative",cursor:"pointer"}}><div style={{position:"absolute",top:3,left:cfgF.requireName?22:3,width:16,height:16,borderRadius:"50%",background:T.isDark?"#1a1a1a":T.bg2}}/></div>
<div><div style={{fontWeight:600,fontSize:13}}>Müşteri Adı Zorunlu</div><div style={{fontSize:11,color:T.textSub}}>Adisyon açılırken isim istenir</div></div>
</label>
</div>
<div style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:12,padding:22,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:6}}>Site Şifresi</div>
<div style={{fontSize:12,color:T.textSub,marginBottom:14}}>Belirlersen, siteye giren herkesten bu şifre istenir. Boş bırakırsan site herkese açık kalır.</div>
<div style={{maxWidth:280,marginBottom:16}}>
<label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>Şifre</label>
<input type="text" placeholder="Şifre belirle (boş = korumasız)" value={cfgF.sitePassword||""} onChange={e=>setCfgF(p=>({...p,sitePassword:e.target.value}))} style={inp}/>
</div>
{cfgF.sitePassword&&<div style={{fontSize:11,color:T.success,marginBottom:16}}>✓ Site bu şifreyle korunacak (Kaydet'e basmayı unutma)</div>}
{cfgF.sitePassword&&<div style={{borderTop:"0.5px solid "+T.border,paddingTop:16}}>
<div style={{fontWeight:600,fontSize:13,marginBottom:4}}>Kurtarma Sorusu</div>
<div style={{fontSize:11,color:T.textSub,marginBottom:12}}>Şifreni unutursan, doğru cevabı vererek girişi sıfırlayabilirsin.</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,maxWidth:560}}>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>Soru</label><input placeholder="Örn: İlk kahve makinası markası?" value={cfgF.recoveryQ||""} onChange={e=>setCfgF(p=>({...p,recoveryQ:e.target.value}))} style={inp}/></div>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>Cevap</label><input placeholder="Cevabı yaz" value={cfgF.recoveryA||""} onChange={e=>setCfgF(p=>({...p,recoveryA:e.target.value}))} style={inp}/></div>
</div>
</div>}
</div>
<button onClick={saveCfg} style={{...sb(T.accent),padding:"12px 28px",fontSize:14}}>Kaydet</button>

<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:18,marginTop:20}}>
<div style={{fontWeight:700,fontSize:13,color:T.text,marginBottom:6}}>Veri Yedekleme</div>
<p style={{fontSize:12,color:T.textSub,margin:"0 0 14px"}}>Tüm verileri JSON olarak indir. Düzenli yedek almanı öneririz.</p>
<div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
<button onClick={()=>{
  const backup={version:1,date:new Date().toISOString(),logs,orders:exp,expenses:exp,cari,installments,ecats,cfg,menu,onlineOrders,todos,tacoLogs,tacoMenu,notifications};
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download="nicchia-yedek-"+new Date().toISOString().split("T")[0]+".json";
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
  msg("Yedek indirildi");
}} style={{...sb(T.accent),fontSize:12,padding:"9px 18px"}}>⬇ Yedeği İndir</button>
</div>
<div style={{fontSize:11,color:T.textDim,marginTop:10}}>Son yedek: elle indirildiğinde güncellenir. Otomatik yedek yok.</div>
</div>

<div style={{background:"rgba(255,59,48,0.1)",border:"1px solid rgba(255,59,48,0.3)",borderRadius:12,padding:18,marginTop:16}}>
<div style={{fontWeight:700,fontSize:13,color:T.danger,marginBottom:8}}>Tehlikeli Bölge</div>
<p style={{fontSize:12,color:T.textSub,margin:"0 0 12px"}}>Tüm sipariş, rapor ve harcama verilerini sil.</p>
<button onClick={()=>{if(window.confirm("Emin misin?")){setOrd([]);setExp([]);setLogs([]);msg("Silindi","err");}}} style={{...sb(T.danger),fontSize:12}}>Tüm Verileri Sil</button>
</div>
</>}
{stab==="menu"&&<>
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:20,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:14}}>{mEid?"Ürün Düzenle":"Yeni Ürün"}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
<input placeholder="Ürün adı" value={mF.name} onChange={e=>setMF(p=>({...p,name:e.target.value}))} style={inp}/>
<input type="number" placeholder="Fiyat" value={mF.price} onChange={e=>setMF(p=>({...p,price:e.target.value}))} style={inp}/>
<select value={mF.cat} onChange={e=>{if(e.target.value==="__new__"){const nc=window.prompt("Yeni kategori adı:");if(nc&&nc.trim())setMF(p=>({...p,cat:nc.trim()}));}else{setMF(p=>({...p,cat:e.target.value}));}}} style={inp}>
<option value="">Kategori seç</option>
{Array.from(new Set(menu.map(m=>m.cat))).sort().map(c=><option key={c} value={c}>{c}</option>)}
<option value="__new__">+ Yeni kategori...</option>
</select>
</div>
<div style={{display:"flex",gap:10}}>
<button onClick={saveMI} style={{...sb(T.accent)}}>{mEid?"Güncelle":"Ekle"}</button>
{mEid&&<button onClick={()=>{setMEid(null);setMF({name:"",price:"",cat:"",on:true});}} style={{...sb(T.bg3),color:T.textSub}}>İptal</button>}
</div>
</div>
<div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
{["Tümü",...Array.from(new Set(menu.map(m=>m.cat)))].map(c=><button key={c} onClick={()=>setMCat(c)} style={{padding:"5px 13px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:mCat===c?T.accent:T.bg3,color:mCat===c?"#fff":T.textSub}}>{c}</button>)}
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:10}}>
{menu.filter(m=>mCat==="Tümü"||m.cat===mCat).map(item=><div key={item.id} style={{background:T.bg2,border:"1px solid "+(item.on?T.border:T.border2),borderRadius:10,padding:"12px 14px",opacity:item.on?1:0.5}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div><div style={{fontWeight:700,fontSize:13}}>{item.name}</div><div style={{fontSize:11,color:T.textSub}}>{item.cat}</div></div><div style={{fontWeight:800,color:T.accentL,fontSize:14}}>{fm(item.price,cur)}</div></div>
<div style={{display:"flex",gap:6}}>
<button onClick={()=>{setMF({name:item.name,price:String(item.price),cat:item.cat,on:item.on});setMEid(item.id);}} style={{...sb(T.bg3),flex:1,color:T.text,padding:"6px 0",fontSize:11}}>Düzenle</button>
<button onClick={()=>setMenü(prev=>prev.map(m=>m.id===item.id?{...m,on:!m.on}:m))} style={{...sb(item.on?T.bg3:T.accent),flex:1,color:item.on?T.textSub:"#fff",padding:"6px 0",fontSize:11}}>{item.on?"Pasif":"Aktif"}</button>
<button onClick={()=>{if(window.confirm("Bu ürünü silmek istediğine emin misin?")){setMenü(prev=>prev.filter(m=>m.id!==item.id));}}} style={{background:T.bg3,border:"none",borderRadius:7,padding:"6px 10px",cursor:"pointer",color:T.danger,fontSize:13}}>x</button>
</div>
</div>)}
</div>
</>}
{stab==="ecats"&&<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:22,maxWidth:500}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:16}}>Harcama Kategorileri</div>
<div style={{display:"flex",gap:8,marginBottom:18}}>
<input placeholder="Yeni kategori..." value={newec} onChange={e=>setNewec(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){const t=newec.trim();if(t&&!ecats.includes(t)){setEc(prev=>[...prev,t]);setNewec("");msg("Eklendi");}}}} style={inp}/>
<button onClick={()=>{const t=newec.trim();if(t&&!ecats.includes(t)){setEc(prev=>[...prev,t]);setNewec("");msg("Eklendi");}}} style={{...sb(T.accent),padding:"9px 14px",flexShrink:0}}>+</button>
</div>
<div style={{display:"flex",flexDirection:"column",gap:7}}>
{ecats.map(cat=>{const used=exp.filter(e=>e.cat===cat).length;return(<div key={cat} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:T.bg3,borderRadius:9,padding:"10px 14px"}}><div><div style={{fontWeight:600,fontSize:13}}>{cat}</div><div style={{fontSize:10,color:T.textSub,marginTop:2}}>{used} kayıt</div></div><button onClick={()=>{if(used>0){msg("Harcaması var","err");return;}if(window.confirm("Bu kategoriyi silmek istediğine emin misin?")){setEc(prev=>prev.filter(c=>c!==cat));msg("Silindi");}}} style={{background:"none",border:"none",color:used>0?T.textDim:T.danger,cursor:used>0?"not-allowed":"pointer",padding:4,fontSize:13,opacity:used>0?0.4:1}}>x</button></div>);})}
</div>
<div style={{marginTop:14,padding:10,background:T.bg3,borderRadius:8,fontSize:11,color:T.textDim}}>Harcaması olan kategorisi silinemez.</div>
</div>}
</div>);}

function OnlineV({onlineOrders,setOnlineOrders,cur,fm,fd,ft,tod,uid,msg,inp,sb,T,cfg}){
const PLATFORMS=[
  {k:"yemeksepeti",l:"Yemeksepeti",color:"#FA0050",bg:"#FFF0F4"},
    {k:"ubereats",l:"Uber Eats",color:"#06C167",bg:"#F0FFF6"},
];
const hiddenPlatforms=cfg?.hiddenPlatforms||[];
const activePlatforms=PLATFORMS.filter(p=>!hiddenPlatforms.includes(p.k));
const[showForm,setShowForm]=useState(false);
const[form,setForm]=useState({platform:"yemeksepeti",note:"",amount:"",date:tod(),items:[]});
const[itemInput,setItemInput]=useState({name:"",qty:"1",price:""});
const[filterP,setFilterP]=useState("all");
const[dateFrom,setDateFrom]=useState("");
const[dateTo,setDateTo]=useState("");
const[showDatePicker,setShowDatePicker]=useState(false);
const[expandedId,setExpandedId]=useState(null);

const inRange=(date)=>{
  if(!dateFrom&&!dateTo)return true;
  if(dateFrom&&date<dateFrom)return false;
  if(dateTo&&date>dateTo)return false;
  return true;
};
const rangeLabel=dateFrom||dateTo?`${dateFrom||"..."} → ${dateTo||"..."}`:null;
const clearRange=()=>{setDateFrom("");setDateTo("");setShowDatePicker(false);};
const setQuickRange=(days)=>{
const to=tod();
const from=new Date();
from.setDate(from.getDate()-(days-1));
setDateFrom(from.toISOString().split("T")[0]);
setDateTo(to);
setShowDatePicker(false);
};
const setQuickMonth=()=>{
const now=new Date();
const from=new Date(now.getFullYear(),now.getMonth(),1);
setDateFrom(from.toISOString().split("T")[0]);
setDateTo(tod());
setShowDatePicker(false);
};

const addItemToForm=()=>{
  if(!itemInput.name)return;
  const qty=parseInt(itemInput.qty)||1;
  const price=parseFloat(itemInput.price)||0;
  setForm(p=>({...p,items:[...p.items,{id:Date.now(),name:itemInput.name,qty,price}]}));
  setItemInput({name:"",qty:"1",price:""});
};
const removeItemFromForm=(id)=>{
  setForm(p=>({...p,items:p.items.filter(i=>i.id!==id)}));
};
const itemsTotal=form.items.reduce((s,i)=>s+i.qty*i.price,0);

const addOrder=()=>{
  if(!form.amount||!form.platform)return;
  setOnlineOrders(prev=>[{id:uid(),...form,amount:parseFloat(form.amount),createdAt:new Date().toISOString()},...prev]);
  setForm({platform:form.platform,note:"",amount:"",date:tod(),items:[]});
  setShowForm(false);
  msg("Sipariş eklendi");
};

const base=onlineOrders.filter(o=>inRange(o.date));
const filtered=filterP==="all"?base:base.filter(o=>o.platform===filterP);
const totalAll=base.reduce((s,o)=>s+o.amount,0);
const byPlatform={};
PLATFORMS.forEach(p=>{byPlatform[p.k]=base.filter(o=>o.platform===p.k).reduce((s,o)=>s+o.amount,0);});

return(
<div style={{padding:24,maxWidth:860,margin:"0 auto"}}>
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
    <div>
      <h2 style={{margin:"0 0 4px",fontWeight:700,fontSize:20}}>Online Siparişler</h2>
      <div style={{fontSize:12,color:T.textSub}}>Manuel sipariş girişi</div>
    </div>
    <div style={{display:"flex",gap:8,alignItems:"center"}}>
      <div style={{position:"relative"}}>
        <button onClick={()=>setShowDatePicker(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:rangeLabel?"rgba(52,199,89,0.12)":T.bg3,border:"1px solid "+(rangeLabel?"#8FE3A8":T.border2),borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,color:rangeLabel?"#34C759":T.textSub}}>
          📅 {rangeLabel||"Tarih Aralığı"}
          {rangeLabel&&<span onClick={e=>{e.stopPropagation();clearRange();}} style={{marginLeft:4,color:"#34C759",fontWeight:800,fontSize:14,lineHeight:1}}>×</span>}
        </button>
        {showDatePicker&&(
          <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:16,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:100,minWidth:260}}>
            <div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>Hızlı Seçim</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              <button onClick={()=>setQuickRange(7)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:T.bg3,color:T.text}}>Son 7 Gün</button>
              <button onClick={()=>setQuickRange(14)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:T.bg3,color:T.text}}>Son 14 Gün</button>
              <button onClick={()=>setQuickRange(30)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:T.bg3,color:T.text}}>Son 1 Ay</button>
              <button onClick={()=>setQuickRange(90)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:T.bg3,color:T.text}}>Son 3 Ay</button>
              <button onClick={setQuickMonth} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:T.bg3,color:T.text}}>Bu Ay</button>
            </div>
            <div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>Özel Aralık</div>
            <div style={{fontSize:10,color:T.textDim,marginBottom:6}}>Başlangıç</div>
            <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={{...inp,marginBottom:10}}/>
            <div style={{fontSize:10,color:T.textDim,marginBottom:6}}>Bitiş</div>
            <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} style={{...inp,marginBottom:14}}/>
            <div style={{display:"flex",gap:8}}>
              <button onClick={clearRange} style={{...sb(T.bg3),flex:1,color:T.textSub,padding:"8px 0",fontSize:12}}>Temizle</button>
              <button onClick={()=>setShowDatePicker(false)} style={{...sb(T.accent),flex:1,padding:"8px 0",fontSize:12}}>Uygula</button>
            </div>
          </div>
        )}
      </div>
      <button onClick={()=>setShowForm(p=>!p)} style={{...sb(showForm?T.bg3:T.accent),border:"1px solid "+(showForm?T.border2:"transparent"),color:showForm?T.textSub:"#fff",display:"flex",alignItems:"center",gap:6,padding:"9px 18px",fontSize:13}}>
        {showForm?"İptal":"+ Sipariş Ekle"}
      </button>
    </div>
  </div>

  {showForm&&(
    <div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:20,marginBottom:22,boxShadow:T.shadowM}}>
      <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:T.accentL}}>Yeni Sipariş</div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {activePlatforms.map(p=>(
          <button key={p.k} onClick={()=>setForm(f=>({...f,platform:p.k}))} style={{flex:1,padding:"10px 0",borderRadius:10,border:"2px solid "+(form.platform===p.k?p.color:"rgba(0,0,0,0.08)"),background:form.platform===p.k?p.bg:T.bg3,color:form.platform===p.k?p.color:T.textSub,fontWeight:700,fontSize:13,cursor:"pointer"}}>{p.l}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <input placeholder="Not / Sipariş no" value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} style={inp}/>
        <input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} style={inp}/>
      </div>

      <div style={{fontSize:11,fontWeight:700,color:T.textSub,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>Sipariş İçeriği</div>
      {form.items.length>0&&(
        <div style={{marginBottom:10}}>
          {form.items.map(it=>(
            <div key={it.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:T.bg3,borderRadius:8,padding:"7px 12px",marginBottom:6}}>
              <span style={{fontSize:12,fontWeight:600}}>{it.name} <span style={{color:T.textSub}}>x{it.qty}</span></span>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:12,color:T.accentL,fontWeight:700}}>{fm(it.qty*it.price,cur)}</span>
                <button onClick={()=>removeItemFromForm(it.id)} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",fontSize:15,padding:2}}>×</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        <input placeholder="Ürün adı" value={itemInput.name} onChange={e=>setItemInput(p=>({...p,name:e.target.value}))} style={{...inp,flex:2}}/>
        <input type="number" placeholder="Adet" value={itemInput.qty} onChange={e=>setItemInput(p=>({...p,qty:e.target.value}))} style={{...inp,flex:1}}/>
        <input type="number" placeholder="Fiyat" value={itemInput.price} onChange={e=>setItemInput(p=>({...p,price:e.target.value}))} style={{...inp,flex:1}}/>
        <button onClick={addItemToForm} style={{...sb(T.bg3),color:T.accentL,padding:"9px 14px",flexShrink:0}}>+</button>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:12,color:T.textSub}}>{form.items.length>0&&`Ürünler toplamı: ${fm(itemsTotal,cur)}`}</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <label style={{fontSize:12,color:T.textSub,fontWeight:600}}>Toplam Tutar ({cur})</label>
          <input type="number" placeholder="0" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} style={{...inp,width:110}}/>
        </div>
      </div>
      {form.items.length>0&&!form.amount&&(
        <button onClick={()=>setForm(f=>({...f,amount:String(itemsTotal)}))} style={{fontSize:11,color:T.accentL,background:"none",border:"none",cursor:"pointer",marginBottom:10,padding:0,textDecoration:"underline"}}>Ürün toplamını tutara kopyala</button>
      )}
      <button onClick={addOrder} style={{...sb(T.accent)}}>Ekle</button>
    </div>
  )}


  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12,marginBottom:22}}>
    {PLATFORMS.map(p=>(
      <div key={p.k} style={{background:p.bg,border:"2px solid "+p.color+"33",borderRadius:14,padding:"16px 18px"}}>
        <div style={{fontSize:11,color:p.color,fontWeight:700,marginBottom:6}}>{p.l}</div>
        <div style={{fontSize:22,fontWeight:800,color:p.color}}>{fm(byPlatform[p.k]||0,cur)}</div>
        <div style={{fontSize:11,color:T.textSub,marginTop:3}}>{onlineOrders.filter(o=>o.platform===p.k).length} sipariş</div>
      </div>
    ))}
    <div style={{background:T.isDark?"linear-gradient(135deg,#1a1a2e,#16213e)":T.bg2,borderRadius:14,padding:"16px 18px",color:T.text}}>
      <div style={{fontSize:11,opacity:0.7,marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>Toplam</div>
      <div style={{fontSize:24,fontWeight:800}}>{fm(totalAll,cur)}</div>
      <div style={{fontSize:11,opacity:0.6,marginTop:4}}>{onlineOrders.length} sipariş</div>
    </div>
  </div>

  <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
    <button onClick={()=>setFilterP("all")} style={{padding:"5px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filterP==="all"?T.accent:T.bg3,color:filterP==="all"?"#fff":T.textSub}}>Tümü ({onlineOrders.length})</button>
    {activePlatforms.map(p=>(
      <button key={p.k} onClick={()=>setFilterP(p.k)} style={{padding:"5px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filterP===p.k?p.color:T.bg3,color:filterP===p.k?"#fff":T.textSub}}>{p.l} ({onlineOrders.filter(o=>o.platform===p.k).length})</button>
    ))}
  </div>

  {filtered.length===0
    ?<div style={{textAlign:"center",padding:"60px 0",color:T.textDim,background:T.bg2,borderRadius:14}}>
       <div style={{fontSize:32,marginBottom:10}}>📦</div>
       <div>Henüz sipariş yok.</div>
     </div>
    :<div style={{display:"flex",flexDirection:"column",gap:8}}>
      {filtered.map(o=>{
        const pl=PLATFORMS.find(p=>p.k===o.platform)||PLATFORMS[0];
        const hasItems=o.items&&o.items.length>0;
        const isExpanded=expandedId===o.id;
        return(
          <div key={o.id} style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:"13px 16px",boxShadow:T.shadow}}>
            <div onClick={()=>hasItems&&setExpandedId(isExpanded?null:o.id)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:hasItems?"pointer":"default"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:pl.color,flexShrink:0}}/>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontWeight:700,fontSize:13,color:pl.color}}>{pl.l}</span>
                    {o.note&&<span style={{fontSize:12,color:T.textSub}}>· {o.note}</span>}
                    {hasItems&&<span style={{fontSize:10,color:T.textSub,background:T.bg3,padding:"1px 7px",borderRadius:10}}>{o.items.length} ürün</span>}
                  </div>
                  <div style={{fontSize:11,color:T.textSub,marginTop:2}}>{fd(o.date)} {o.createdAt?ft(o.createdAt):""}</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontWeight:800,fontSize:15,color:T.text}}>{fm(o.amount,cur)}</div>
                {hasItems&&<span style={{color:T.textSub,fontSize:11}}>{isExpanded?"▲":"▼"}</span>}
                <button onClick={(e)=>{e.stopPropagation();if(window.confirm("Bu siparişi silmek istediğine emin misin?")){setOnlineOrders(prev=>prev.filter(x=>x.id!==o.id));}}} style={{background:"none",border:"none",color:T.textDim,cursor:"pointer",padding:4,fontSize:13}}>x</button>
              </div>
            </div>
            {isExpanded&&hasItems&&(
              <div style={{marginTop:12,paddingTop:12,borderTop:"0.5px solid "+T.border}}>
                {o.items.map(it=>(
                  <div key={it.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"4px 0",color:T.textSub}}>
                    <span>{it.name} <span style={{color:T.textDim}}>x{it.qty}</span></span>
                    <span style={{color:T.accentL,fontWeight:600}}>{fm(it.qty*it.price,cur)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  }
</div>
);}

function ImportOldV({logs,setLogs,cur,fm,fd,setV,sb,T=DARK}){
const alreadyImported=logs.some(l=>l.imported);
const importedCount=logs.filter(l=>l.imported).length;
const importedTotal=logs.filter(l=>l.imported).reduce((s,l)=>s+l.inc,0);
const importedExp=logs.filter(l=>l.imported).reduce((s,l)=>s+l.exp,0);
const sortedOld=OLD_LOGS.slice().sort((a,b)=>a.date.localeCompare(b.date));
const firstDate=sortedOld[0]?.date;
const lastDate=sortedOld[sortedOld.length-1]?.date;
const totalIncome=OLD_LOGS.reduce((s,l)=>s+l.inc,0);
const totalExpense=OLD_LOGS.reduce((s,l)=>s+l.exp,0);

const doImport=()=>{
if(alreadyImported){
if(!window.confirm("Eski raporlar zaten içe aktarılmış görünüyor. Tekrar eklemek istediğine emin misin? (Mükerrer kayıt oluşabilir)")) return;
}
setLogs(prev=>{
const existingDates=new Set(prev.filter(l=>!l.imported).map(l=>l.date));
const toAdd=OLD_LOGS.filter(l=>!existingDates.has(l.date));
const withoutOldImports=prev.filter(l=>!l.imported);
return[...withoutOldImports,...toAdd].sort((a,b)=>b.date.localeCompare(a.date));
});
};

const removeImport=()=>{
if(window.confirm("İçe aktarılmış tüm eski raporları kaldırmak istediğine emin misin?")){
setLogs(prev=>prev.filter(l=>!l.imported));
}
};

return(
<div style={{padding:24,maxWidth:780,margin:"0 auto"}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
<button onClick={()=>setV("reports")} style={{...sb(T.bg3),color:T.textSub,padding:"7px 12px"}}>Geri</button>
<div>
<h2 style={{margin:0,fontWeight:800,fontSize:20}}>Reports Before NICCHIA</h2>
<div style={{fontSize:12,color:T.textSub,marginTop:2}}>NICCHIA öncesi kullanılan eski sistemden aktarılan satış raporları</div>
</div>
</div>

<div style={{background:T.isDark?"linear-gradient(135deg,#1a1a2e,#16213e)":T.bg2,borderRadius:14,padding:"20px 22px",color:T.text,marginBottom:20}}>
<div style={{fontSize:11,opacity:0.7,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>Arşivdeki Veri</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
<div>
<div style={{fontSize:24,fontWeight:800}}>{OLD_LOGS.length}</div>
<div style={{fontSize:11,opacity:0.65,marginTop:2}}>gün kaydı</div>
</div>
<div>
<div style={{fontSize:24,fontWeight:800}}>{fm(totalIncome,cur)}</div>
<div style={{fontSize:11,opacity:0.65,marginTop:2}}>toplam ciro</div>
</div>
</div>
<div style={{marginTop:14,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.15)",fontSize:12,opacity:0.75}}>
{fd(firstDate)} — {fd(lastDate)} tarihleri arası
</div>
</div>

{alreadyImported?(
<div style={{background:"rgba(52,199,89,0.12)",border:"1px solid #8FE3A8",borderRadius:14,padding:20,marginBottom:20}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
<span style={{fontSize:20}}>✓</span>
<div style={{fontWeight:700,fontSize:15,color:"#34C759"}}>Eski raporlar içe aktarıldı</div>
</div>
<div style={{fontSize:13,color:T.textSub,marginBottom:14}}>
{importedCount} gün, toplam {fm(importedTotal,cur)} ciro Raporlar listene eklendi ve genel istatistiklere dahil edildi.
</div>
<div style={{display:"flex",gap:10}}>
<button onClick={doImport} style={{...sb(T.bg3),color:T.textSub,fontSize:12,padding:"9px 16px"}}>Tekrar İçe Aktar</button>
<button onClick={removeImport} style={{...sb(T.danger),fontSize:12,padding:"9px 16px"}}>Arşivi Kaldır</button>
</div>
</div>
):(
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:20,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:15,marginBottom:8}}>İçe aktarmaya hazır</div>
<div style={{fontSize:13,color:T.textSub,marginBottom:16}}>
Bu işlem {OLD_LOGS.length} günlük geçmiş satış kaydını mevcut Raporlar listene ekleyecek. Bu kayıtlar diğer günlerle birlikte görünecek ve toplam ciro/net kâr hesaplamalarına dahil olacak. Ürün ve müşteri bazlı detay içermiyorlar, sadece günlük nakit/kart/gider toplamları var.
</div>
<button onClick={doImport} style={{...sb(T.accent),fontSize:14,padding:"12px 24px",width:"100%"}}>İçe Aktar — {OLD_LOGS.length} Gün</button>
</div>
)}

<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:20}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Önizleme (ilk 10 kayıt)</div>
<div style={{display:"flex",flexDirection:"column",gap:6}}>
{sortedOld.slice(0,10).map(l=>(
<div key={l.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:T.bg3,borderRadius:8}}>
<span style={{fontSize:12,fontWeight:600}}>{fd(l.date)}</span>
<div style={{display:"flex",gap:14,fontSize:12}}>
<span style={{color:"#FF9500"}}>{fm(l.cash,cur)}</span>
<span style={{color:"#007AFF"}}>{fm(l.card,cur)}</span>
<span style={{fontWeight:700,color:T.accentL}}>{fm(l.inc,cur)}</span>
</div>
</div>
))}
</div>
<div style={{fontSize:11,color:T.textDim,marginTop:10,textAlign:"center"}}>...ve {OLD_LOGS.length-10} kayıt daha</div>
</div>
</div>
);}

function LurkV({setV,T,logs,orders,cfg,cari,installments,unlocked,fm,fd,cur,day,ft,tod,isMobile,badges}){
const now=new Date();
const allLogs=logs||[];

// Bu hafta
const dow=now.getDay();const diffToMon=dow===0?-6:1-dow;
const weekStart=new Date(now);weekStart.setDate(now.getDate()+diffToMon);
const weekStartStr=weekStart.toISOString().split("T")[0];
const weekEnd=new Date(weekStart);weekEnd.setDate(weekStart.getDate()+6);
const weekEndStr=weekEnd.toISOString().split("T")[0];
const weeklyRev=[...allLogs,...(orders||[]).filter(o=>o.date&&o.date>=weekStartStr&&o.date<=weekEndStr&&!allLogs.find(l=>l.date===o.date))].filter(l=>l.date&&l.date>=weekStartStr&&l.date<=weekEndStr).reduce((s,l)=>s+(l.inc||l.total||0),0);

// Bu ay
const thisMonth=now.toISOString().slice(0,7);
const monthlyRev=[...allLogs,...(orders||[]).filter(o=>o.date&&o.date.startsWith(thisMonth)&&!allLogs.find(l=>l.date===o.date))].filter(l=>l.date&&l.date.startsWith(thisMonth)).reduce((s,l)=>s+(l.inc||l.total||0),0);

const weeklyGoal=cfg?.weeklyGoal||0;
const monthlyGoal=cfg?.monthlyGoal||0;
const weekPct=weeklyGoal>0?Math.min(100,Math.round(weeklyRev/weeklyGoal*100)):0;
const monthPct=monthlyGoal>0?Math.min(100,Math.round(monthlyRev/monthlyGoal*100)):0;

// Gizle/göster
const[hideAmounts,setHideAmounts]=useState(false);
const mask=(val)=>hideAmounts?"••••••":val;

// Rozetler
const earnedCount=badges.filter(b=>b.done).length;

// Açık cari
const openCari=(cari||[]).filter(c=>!c.settled).length;

// Vadeler
const overdueCount=(installments||[]).reduce((s,p)=>s+(p.installments||[]).filter(i=>{
  if(i.paid)return false;
  return new Date(i.due)<new Date(now.toISOString().split("T")[0]);
}).length,0);

const NAV_CARDS=[
  {k:"online", label:"Online Siparişler", sub:"Yemeksepeti · Uber Eats", accent:"#FF6B35",
   stat:null, icon:"📦"},
  {k:"reports", label:"Raporlar", sub:openCari>0?`${openCari} açık cari`:"Satış & harcama", accent:"#3A9EFF",
   stat:openCari>0?openCari:null, statColor:"#AF52DE", icon:"📊"},
  {k:"achievements", label:"Rozetler", sub:`${earnedCount} / ${badges.length} kazanıldı`, accent:"#FF9500",
   stat:earnedCount, statColor:"#FF9500", icon:"🎖"},
  {k:"todo", label:"Yapılacaklar", sub:"Görevler & notlar", accent:"#A855F7",
   stat:null, icon:"✅"},
  {k:"products", label:"Ürün Analizi", sub:"En çok satanlar", accent:"#3A9EFF",
   stat:null, icon:"📦"},
  {k:"customers", label:"Müşteriler", sub:earnedCount>0?earnedCount+" müşteri":"isimli müşteri", accent:"#F59E0B",
   stat:null, icon:"👥"},
];

return(
<div style={{minHeight:"calc(100vh - 60px)",padding:isMobile?"16px":"28px 32px",maxWidth:1000,margin:"0 auto",position:"relative"}}>

{/* Header */}
<div style={{marginBottom:28,position:"relative",zIndex:1}}>
<h1 style={{fontSize:isMobile?28:42,fontWeight:800,letterSpacing:-1,margin:"0 0 6px",color:T.text,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>LURK.</h1>
<div style={{fontSize:13,color:T.textSub}}>
{now.toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}
{day&&<span style={{marginLeft:12,background:"rgba(52,199,89,0.15)",color:"#34C759",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>● AÇIK {ft(day.oa)}</span>}
{!day&&<span style={{marginLeft:12,background:"rgba(255,59,48,0.1)",color:"#FF3B30",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600}}>● KAPALI</span>}
</div>
</div>

{/* Navigasyon kartları — üstte */}
<div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(6,1fr)",gap:10,marginBottom:16,position:"relative",zIndex:1}}>
{NAV_CARDS.map(card=>(
<button key={card.k} onClick={()=>setV(card.k)} style={{
  background:T.isDark?"rgba(255,255,255,0.06)":T.bg2,
  backdropFilter:"blur(24px)",
  WebkitBackdropFilter:"blur(24px)",
  border:T.isDark?"1px solid rgba(255,255,255,0.12)":"1px solid "+T.border,
  borderRadius:20,
  padding:"18px 14px",
  cursor:"pointer",
  textAlign:"left",
  color:T.text,
  position:"relative",
  overflow:"hidden",
  transition:"all 0.2s",
  display:"flex",
  flexDirection:"column",
  gap:8,
  minHeight:110,
  boxShadow:T.isDark?"0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)":"0 2px 8px rgba(0,0,0,0.06)",
}}>
{/* Accent glow top */}
<div style={{position:"absolute",top:0,left:0,right:0,height:40,background:`linear-gradient(180deg,${card.accent}18 0%,transparent 100%)`,borderRadius:"20px 20px 0 0",pointerEvents:"none"}}/>
<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent 0%,${card.accent}80 50%,transparent 100%)`,pointerEvents:"none"}}/>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative"}}>
<span style={{fontSize:26}}>{card.icon}</span>
{card.stat!=null&&<span style={{background:card.statColor+"22",color:card.statColor,fontSize:11,fontWeight:800,borderRadius:20,padding:"2px 8px",border:`1px solid ${card.statColor}44`}}>{card.stat}</span>}
</div>
<div style={{position:"relative"}}>
<div style={{fontSize:12,fontWeight:700,color:T.text,marginBottom:2}}>{card.label}</div>
<div style={{fontSize:10,color:T.textSub}}>{card.sub}</div>
</div>
</button>
))}
</div>

{/* Hedef kartları — altta */}
<div style={{marginBottom:16,position:"relative",zIndex:1}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
<div style={{fontSize:11,color:T.textDim,fontWeight:600,letterSpacing:0.5,textTransform:"uppercase"}}>Hedefler</div>
<button onClick={()=>setHideAmounts(p=>!p)} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",cursor:"pointer",color:T.textDim,fontSize:11,fontWeight:600,padding:"4px 8px",borderRadius:8}}>
{hideAmounts
  ?<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  :<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
{hideAmounts?"Göster":"Gizle"}
</button>
</div>
<div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:12}}>
{weeklyGoal>0?<div style={{background:T.isDark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:18,padding:"22px 24px",color:T.text,border:T.isDark?"1px solid rgba(255,255,255,0.1)":"1px solid "+T.border,boxShadow:T.isDark?"0 8px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.08)":"0 2px 8px rgba(0,0,0,0.06)"}}>
<div style={{fontSize:11,color:T.textSub,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Bu Hafta</div>
<div style={{fontSize:isMobile?24:28,fontWeight:800,letterSpacing:-0.5,marginBottom:4,fontVariantNumeric:"tabular-nums"}}>{mask(fm(weeklyRev,cur))}</div>
<div style={{background:"rgba(255,255,255,0.1)",borderRadius:4,height:5,overflow:"hidden",marginBottom:5}}>
{!hideAmounts&&<div style={{height:"100%",width:weekPct+"%",background:weekPct>=100?"#34C759":weekPct>=70?"#FF9500":"#FF3B30",borderRadius:4,transition:"width 0.8s"}}/>}
{hideAmounts&&<div style={{height:"100%",width:"100%",background:"#2a2a2a",borderRadius:4}}/>}
</div>
<div style={{fontSize:11,color:T.textSub}}>{hideAmounts?"/ ••••••":("/ "+fm(weeklyGoal,cur)+" · %"+weekPct+(weekPct>=100?" 🎯":""))}</div>
</div>:<div style={{background:T.isDark?"#111":T.bg2,borderRadius:18,padding:"22px 24px",border:"1px solid "+T.border,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
<div style={{fontSize:11,color:T.textDim,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Bu Hafta</div>
<div style={{fontSize:isMobile?24:28,fontWeight:800,color:T.textDim,marginBottom:8}}>{mask(fm(weeklyRev,cur))}</div>
<button onClick={()=>setV("settings")} style={{fontSize:11,color:T.textSub,background:"none",border:"1px solid "+T.border,borderRadius:8,cursor:"pointer",padding:"6px 12px",width:"fit-content"}}>Hedef belirle →</button>
</div>}

</div>
</div>

</div>
);}

function LoginV({cfg,setCfg,setAuthed,T}){
const authKey="lurk_auth";
const[pw,setPw]=useState("");
const[err,setErr]=useState(false);
const[mode,setMode]=useState("login");
const[recoveryAnswer,setRecoveryAnswer]=useState("");
const[recoveryErr,setRecoveryErr]=useState(false);
const[resetDone,setResetDone]=useState(false);

const tryLogin=()=>{
if(pw===cfg.sitePassword){
try{localStorage.setItem(authKey,pw);}catch{}
setAuthed(true);
}else{
setErr(true);
}
};

const tryRecover=async()=>{
if(recoveryAnswer.trim().toLowerCase()===( cfg.recoveryA||"").trim().toLowerCase()&&cfg.recoveryA){
const newCfg={...cfg,sitePassword:"",recoveryQ:"",recoveryA:""};
setCfg(newCfg);
await sv("lurk_s",newCfg);
try{localStorage.removeItem(authKey);}catch{}
setResetDone(true);
}else{
setRecoveryErr(true);
}
};

if(mode==="recover"){
return(
<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:T.bg,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display',Inter,'Helvetica Neue',Helvetica,Arial,sans-serif"}}>
<div style={{textAlign:"center",width:"100%",maxWidth:340}}>
<h1 style={{fontSize:40,fontWeight:800,letterSpacing:-1,margin:"0 0 28px",color:T.text}}>LURK.</h1>
{resetDone?(
<>
<div style={{fontSize:14,fontWeight:600,color:T.success,marginBottom:8}}>✓ Şifre sıfırlandı</div>
<div style={{fontSize:12,color:T.textSub,marginBottom:20}}>Site artık şifresiz. Ayarlar'dan yeni bir şifre belirleyebilirsin.</div>
<button onClick={()=>{setAuthed(true);}} style={{background:T.accent,border:"none",color:"#fff",borderRadius:10,padding:"13px 0",fontWeight:600,fontSize:14,cursor:"pointer",width:"100%"}}>Sisteme Gir</button>
</>
):cfg.recoveryQ?(
<>
<div style={{fontSize:13,color:T.textSub,marginBottom:14,textAlign:"left"}}>{cfg.recoveryQ}</div>
<input
autoFocus
placeholder="Cevabını yaz"
value={recoveryAnswer}
onChange={e=>{setRecoveryAnswer(e.target.value);setRecoveryErr(false);}}
onKeyDown={e=>{if(e.key==="Enter")tryRecover();}}
style={{background:T.bg2,border:"1px solid "+(recoveryErr?T.danger:T.border2),borderRadius:10,padding:"13px 16px",color:T.text,fontSize:15,outline:"none",width:"100%",boxSizing:"border-box",textAlign:"center",marginBottom:12}}
/>
{recoveryErr&&<div style={{fontSize:12,color:T.danger,marginBottom:12}}>Cevap yanlış</div>}
<button onClick={tryRecover} style={{background:T.accent,border:"none",color:"#fff",borderRadius:10,padding:"13px 0",fontWeight:600,fontSize:14,cursor:"pointer",width:"100%",marginBottom:10}}>Onayla</button>
<button onClick={()=>{setMode("login");setRecoveryErr(false);setRecoveryAnswer("");}} style={{background:"none",border:"none",color:T.textSub,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>Girişe dön</button>
</>
):(
<>
<div style={{fontSize:13,color:T.textSub,marginBottom:20}}>Kurtarma sorusu tanımlanmamış. Şifreyi sıfırlamak için Supabase üzerinden manuel müdahale gerekiyor.</div>
<button onClick={()=>setMode("login")} style={{background:T.bg3,border:"none",color:T.textSub,borderRadius:10,padding:"13px 0",fontWeight:600,fontSize:14,cursor:"pointer",width:"100%"}}>Girişe dön</button>
</>
)}
</div>
</div>
);
}

return(
<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:T.bg,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display',Inter,'Helvetica Neue',Helvetica,Arial,sans-serif"}}>
<div style={{textAlign:"center",width:"100%",maxWidth:320}}>
<h1 style={{fontSize:56,fontWeight:800,letterSpacing:-1,margin:"0 0 32px",color:T.text}}>LURK.</h1>
<input
type="password"
autoFocus
placeholder="Şifre"
value={pw}
onChange={e=>{setPw(e.target.value);setErr(false);}}
onKeyDown={e=>{if(e.key==="Enter")tryLogin();}}
style={{background:"rgba(255,255,255,0.07)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:"0.5px solid "+(err?"rgba(255,59,48,0.6)":"rgba(255,255,255,0.12)"),borderRadius:10,padding:"13px 16px",color:T.text,fontSize:15,outline:"none",width:"100%",boxSizing:"border-box",textAlign:"center",marginBottom:12}}
/>
{err&&<div style={{fontSize:12,color:T.danger,marginBottom:12}}>Şifre yanlış</div>}
<button onClick={tryLogin} style={{background:T.accent,border:"none",color:"#fff",borderRadius:10,padding:"13px 0",fontWeight:600,fontSize:14,cursor:"pointer",width:"100%",marginBottom:14}}>Giriş Yap</button>
<button onClick={()=>setMode("recover")} style={{background:"none",border:"none",color:T.textSub,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>Şifremi Unuttum</button>
</div>
</div>
);}

function AchievementsV({logs,orders,cari,installments,unlocked,cur,fm,fd,setV,sb,T,badges}){
const doneCount=badges.filter(b=>b.done).length;
const total=badges.length;
const pct=Math.round(doneCount/total*100);

// Sırala: kazanılmış önce (en yeni), sonra kilitliler (progress'e göre)
const done=badges.filter(b=>b.done).sort((a,b)=>{
  const da=unlocked?.[a.id],db=unlocked?.[b.id];
  if(da&&db)return new Date(db)-new Date(da);
  return 0;
});
const notDone=badges.filter(b=>!b.done).sort((a,b)=>(b.progress||0)-(a.progress||0));
const sorted=[...done,...notDone];

// Her rozet için renk ve ikon
const BADGE_STYLE={
  rev_500k:{color:"#C0922A",icon:"₺"},
  rev_750k:{color:"#A855F7",icon:"◆"},
  rev_1m:{color:"#F43F5E",icon:"🥇"},
  day_5k:{color:"#3A9EFF",icon:"⚡"},
  day_10k:{color:"#FF6B35",icon:"🔥"},
  week_30k:{color:"#06B6D4",icon:"📊"},
  month_150k:{color:"#10B981",icon:"📈"},
  month_200k:{color:"#8B5CF6",icon:"🚀"},
  items_1000:{color:"#6B7280",icon:"☕"},
  items_2000:{color:"#F59E0B",icon:"☕"},
  items_5000:{color:"#EF4444",icon:"🏪"},
  matcha_100:{color:"#22C55E",icon:"🌿"},
  matcha_250:{color:"#16A34A",icon:"🌿"},
  kahve_100:{color:"#92400E",icon:"☕"},
  kahve_250:{color:"#B45309",icon:"☕"},
  kahve_500:{color:"#78350F",icon:"☕"},
  items_diff_10:{color:"#0EA5E9",icon:"🗂"},
  items_diff_20:{color:"#6366F1",icon:"🗂"},
  cari_10:{color:"#D946EF",icon:"👥"},
  inst_1:{color:"#64748B",icon:"💳"},
  inst_5:{color:"#475569",icon:"💳"},
  inst_10:{color:"#334155",icon:"💳"},
  inst_20:{color:"#1E293B",icon:"💳"},
  round_day:{color:"#F97316",icon:"⭕"},
  early_open:{color:"#FBBF24",icon:"🌅"},
  zero_exp:{color:"#34D399",icon:"🐷"},
};

return(
<div style={{minHeight:"calc(100vh - 60px)",background:T.bg,color:T.text,padding:"0 0 60px"}}>

{/* Header banner */}
<div style={{background:T.isDark?"linear-gradient(180deg,#1a1a1a 0%,#0D0D0D 100%)":"linear-gradient(180deg,#fff 0%,#F2F2F7 100%)",borderBottom:"1px solid "+(T.isDark?"#222":"rgba(60,60,67,0.12)"),padding:"28px 28px 24px"}}>
<div style={{maxWidth:920,margin:"0 auto"}}>
<button onClick={()=>setV("lurk")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:16,padding:0}}>← Dashboard</button>
<h2 style={{margin:"0 0 20px",fontSize:28,fontWeight:800,letterSpacing:-0.5,color:T.text}}>Rozetler</h2>

{/* Progress bar büyük */}
<div style={{display:"flex",alignItems:"center",gap:16}}>
<div style={{flex:1,background:T.isDark?"#1a1a1a":T.bg2,borderRadius:4,height:8,overflow:"hidden",border:"1px solid "+T.border}}>
<div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#C0922A,#F59E0B)",borderRadius:4,transition:"width 1s ease"}}/>
</div>
<div style={{fontSize:13,fontWeight:700,color:"#C0922A",minWidth:80,textAlign:"right"}}>{doneCount} / {total} rozet</div>
</div>
<div style={{display:"flex",gap:20,marginTop:16}}>
<div><div style={{fontSize:24,fontWeight:800,color:"#C0922A"}}>{pct}%</div><div style={{fontSize:11,color:T.textSub,marginTop:1}}>tamamlandı</div></div>
<div style={{width:1,background:"#222"}}/>
<div><div style={{fontSize:24,fontWeight:800,color:T.text}}>{doneCount}</div><div style={{fontSize:11,color:T.textSub,marginTop:1}}>kazanıldı</div></div>
<div style={{width:1,background:"#222"}}/>
<div><div style={{fontSize:24,fontWeight:800,color:T.textSub}}>{total-doneCount}</div><div style={{fontSize:11,color:T.textSub,marginTop:1}}>kilitli</div></div>
</div>
</div>
</div>

{/* Grid */}
<div style={{maxWidth:920,margin:"0 auto",padding:"28px 28px 0"}}>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:24}}>
{sorted.map(b=>{
const isUnlocked=b.done;
const st=BADGE_STYLE[b.id]||{color:"#888",icon:"🎖"};
const unlockedAt=unlocked?.[b.id];
return(
<div key={b.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>

{/* Rozet dairesi */}
<div style={{position:"relative",width:96,height:96}}>
<div style={{
  width:96,height:96,borderRadius:"50%",
  background:isUnlocked?T.bg2:T.bg3,
  border:`2.5px solid ${isUnlocked?st.color:T.border}`,
  display:"flex",alignItems:"center",justifyContent:"center",
  boxShadow:isUnlocked?`0 0 0 1px ${st.color}22, 0 8px 24px ${st.color}33`:"none",
  opacity:isUnlocked?1:0.45,
  transition:"all 0.2s",
}}>
{isUnlocked
  ?<span style={{fontSize:40,lineHeight:1,display:"block",filter:`drop-shadow(0 0 8px ${st.color}88)`}}>{st.icon}</span>
  :<span style={{fontSize:30,color:T.textDim,fontWeight:900,fontFamily:"monospace",lineHeight:1,display:"inline-block"}}>🔒</span>
}
</div>

{/* Tekrarlanabilir sayaç */}
{isUnlocked&&b.repeatable&&b.count>1&&<div style={{
  position:"absolute",top:-4,right:-4,
  background:st.color,color:"#F0F0F0",
  fontSize:10,fontWeight:700,
  borderRadius:20,padding:"2px 7px",
  border:"2px solid "+T.bg,
  letterSpacing:0.5,
}}>×{b.count}</div>}

{/* Yeni kazanıldı efekti */}
{isUnlocked&&unlockedAt&&(new Date()-new Date(unlockedAt))<1000*60*60*24*3&&<div style={{
  position:"absolute",top:-4,left:-4,
  background:"#C0922A",color:"#F0F0F0",
  fontSize:9,fontWeight:800,
  borderRadius:20,padding:"2px 6px",
  border:"2px solid #0D0D0D",
  letterSpacing:0.5,textTransform:"uppercase",
}}>YENİ</div>}
</div>

{/* Bilgi */}
<div style={{textAlign:"center",width:"100%"}}>
<div style={{fontSize:12,fontWeight:600,color:isUnlocked?T.text:T.textSub,lineHeight:1.3,marginBottom:4}}>{b.title}</div>
<div style={{fontSize:10,color:T.textDim,lineHeight:1.4,marginBottom:isUnlocked?3:6}}>{b.desc}</div>
{isUnlocked&&!b.repeatable&&unlockedAt&&<div style={{fontSize:10,color:st.color,fontWeight:500}}>{fd(unlockedAt)}</div>}
{isUnlocked&&b.repeatable&&<div style={{fontSize:10,color:st.color,fontWeight:500}}>{b.count} kez</div>}
{!isUnlocked&&(b.progress||0)>0&&<div>
<div style={{width:"100%",height:3,background:T.isDark?"#1a1a1a":T.bg2,borderRadius:2,overflow:"hidden",marginBottom:3}}>
<div style={{height:"100%",width:(b.progress)+"%",background:st.color,borderRadius:2}}/>
</div>
<div style={{fontSize:10,color:T.textDim}}>%{b.progress}</div>
</div>}
{!isUnlocked&&!(b.progress>0)&&<div style={{fontSize:10,color:T.textDim,letterSpacing:1}}>— — —</div>}
</div>
</div>
);})}
</div>
</div>

</div>
);}

function NotificationsV({notifications,setNotifications,fd,ft,setV,sb,T}){
const unreadCount=notifications.filter(n=>!n.read).length;
const markAllRead=()=>setNotifications(prev=>prev.map(n=>({...n,read:true})));
const markRead=(id)=>setNotifications(prev=>prev.map(n=>n.id===id?{...n,read:true}:n));
const clearAll=()=>{if(window.confirm("Tüm bildirimleri silmek istediğine emin misin?"))setNotifications([]);};

return(<div style={{padding:24,maxWidth:680,margin:"0 auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
<div>
<button onClick={()=>setV("lurk")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:16,padding:0}}>← Dashboard</button>
<h2 style={{margin:0,fontWeight:800,fontSize:20}}>🔔 Bildirimler</h2>
<div style={{fontSize:12,color:T.textSub,marginTop:2}}>{unreadCount>0?`${unreadCount} okunmamış bildirim`:"Hepsi okundu"}</div>
</div>
{notifications.length>0&&<div style={{display:"flex",gap:8}}>
{unreadCount>0&&<button onClick={markAllRead} style={{...sb(T.bg3),color:T.textSub,fontSize:12,padding:"8px 14px"}}>Hepsini Okundu Say</button>}
<button onClick={clearAll} style={{...sb(T.bg3),color:T.danger,fontSize:12,padding:"8px 14px"}}>Temizle</button>
</div>}
</div>

{notifications.length===0?(
<div style={{textAlign:"center",padding:"60px 0",color:T.textDim}}>
<div style={{fontSize:32,marginBottom:10}}>🔕</div>
<div>Henüz bildirim yok.</div>
<div style={{fontSize:12,marginTop:6}}>Yeni bir başarı kazandığında burada görünecek.</div>
</div>
):(
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{notifications.map(n=>(
<div key={n.id} onClick={()=>!n.read&&markRead(n.id)} style={{display:"flex",alignItems:"flex-start",gap:12,background:n.read?T.bg2:"rgba(255,149,0,0.08)",borderRadius:14,padding:"14px 16px",cursor:n.read?"default":"pointer",boxShadow:T.shadow,position:"relative"}}>
<div style={{fontSize:26}}>{n.icon||"🏆"}</div>
<div style={{flex:1,minWidth:0}}>
<div style={{fontSize:13,fontWeight:700,color:T.text}}>{n.title}{(!n.type||n.type==="badge")?" kazanıldı!":""}</div>
<div style={{fontSize:12,color:T.textSub,marginTop:2}}>{n.desc}</div>
<div style={{fontSize:11,color:T.textDim,marginTop:6}}>{fd(n.date)} · {ft(n.date)}</div>
</div>
{!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:"#FF9500",flexShrink:0,marginTop:4}}/>}
</div>
))}
</div>
)}
</div>);}

function CreditPageV({cari,setCari,cur,fm,fd,ft,T,sb,inp,setV,tables,setTbl,uid}){
return(
<div style={{padding:"20px 20px 80px",maxWidth:720,margin:"0 auto"}}>
<button onClick={()=>setV("lurk")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:16,padding:0}}>← Dashboard</button>
<h2 style={{margin:"0 0 16px",fontWeight:800,fontSize:22,color:T.text}}>👤 Cari Hesaplar</h2>
<CariInReportsV cari={cari} setCari={setCari} cur={cur} fm={fm} fd={fd} ft={ft} T={T} sb={sb} inp={inp} tables={tables} setTbl={setTbl} uid={uid} tod={()=>new Date().toISOString().split("T")[0]}/>
</div>
);}

function InstallmentsPageV({installments,setInstallments,cur,fm,fd,ft,tod,T,sb,inp,setV,notifications,setNotifications}){
const[expanded,setExpanded]=useState({});
const[showModal,setShowModal]=useState(false);
const[showPartial,setShowPartial]=useState(false);
const[showEdit,setShowEdit]=useState(false);
const[editTarget,setEditTarget]=useState(null);
const[editForm,setEditForm]=useState({name:"",amount:""});
const[partialTarget,setPartialTarget]=useState(null);
const[partialAmt,setPartialAmt]=useState("");
const[form,setForm]=useState({name:"",amount:"",date:"",type:"single",instCount:""});

const debts=(installments||[]).map(function(d){
var total=d.total||d.totalAmount||0;
var insts=(d.installments||[]).map(function(i){return{...i,amt:i.amt||i.amount||0,paid:i.paid||false,partialPaid:i.partialPaid||0,due:i.due||i.dueDate||""};});
var paid=d.paid!=null?d.paid:insts.reduce(function(s,i){return s+(i.paid?i.amt:(i.partialPaid||0));},0);
return{...d,total:total,paid:paid,installments:insts};
});

var totalDebt=debts.reduce(function(s,d){return s+d.total;},0);
var totalPaid=debts.reduce(function(s,d){return s+d.paid;},0);
var remaining=totalDebt-totalPaid;
var pct=totalDebt>0?Math.round(totalPaid/totalDebt*100):0;
var sortedDebts=[...debts].sort(function(a,b){return(a.total-a.paid)-(b.total-b.paid);});

var motivMsg=pct>=80?"Muhtesem! Borcların neredeyse bitti.":pct>=50?"Yarıyı gectin! Devam et!":pct>0?"Iyi baslangic. Her odeme hedefe yaklastirir.":"";

var toggleExpand=function(id){setExpanded(function(p){var n={...p};n[id]=!n[id];return n;});};

var toggleInst=function(did,idx){
setInstallments(function(prev){return prev.map(function(d){
if(d.id!==did)return d;
var insts=d.installments.map(function(inst,i){
if(i!==idx)return inst;
var instAmt=inst.amt||inst.amount||0;
var nowPaid=!inst.paid;
return{...inst,amt:instAmt,paid:nowPaid,partialPaid:nowPaid?instAmt:0};
});
var paid=insts.reduce(function(s,i){return s+(i.paid?(i.amt||i.amount||0):(i.partialPaid||0));},0);
return{...d,paid:paid};
});});
};

var payAllInst=function(did,idx){
setInstallments(function(prev){return prev.map(function(d){
if(d.id!==did)return d;
var insts=d.installments.map(function(inst,i){
if(i!==idx)return inst;
var instAmt=inst.amt||inst.amount||0;
return{...inst,paid:true,partialPaid:instAmt,amt:instAmt};
});
var paid=insts.reduce(function(s,i){return s+(i.paid?(i.amt||i.amount||0):(i.partialPaid||0));},0);
return{...d,paid:paid};
});});
};

var savePartial=function(){
var amt=parseFloat(partialAmt)||0;
if(amt<=0||!partialTarget)return;
setInstallments(function(prev){return prev.map(function(d){
if(d.id!==partialTarget.did)return d;
var insts=d.installments.map(function(inst,i){
if(i!==partialTarget.idx)return inst;
var instAmt=inst.amt||inst.amount||0;
var newPartial=Math.min(instAmt,(inst.partialPaid||0)+amt);
var nowPaid=newPartial>=instAmt;
return{...inst,amt:instAmt,partialPaid:newPartial,paid:nowPaid};
});
var paid=insts.reduce(function(s,i){return s+(i.paid?(i.amt||i.amount||0):(i.partialPaid||0));},0);
return{...d,paid:paid};
});});
setShowPartial(false);setPartialAmt("");setPartialTarget(null);
};

var saveEdit=function(){
var name=editForm.name.trim();
var amt=parseFloat(editForm.amount)||0;
if(!name||!amt||!editTarget)return;
setInstallments(function(prev){return prev.map(function(d){
if(d.id!==editTarget)return d;
var ratio=amt/(d.total||1);
var insts=d.installments.map(function(i){return{...i,amt:Math.round((i.amt||i.amount||0)*ratio)};});
return{...d,name:name,total:amt,totalAmount:amt,installments:insts};
});});
setShowEdit(false);setEditTarget(null);
};

var saveDebt=function(){
var name=form.name.trim();
var amt=parseFloat(form.amount)||0;
if(!name||!amt||!form.date)return;
var insts=[];
if(form.type==="monthly"){
var count=parseInt(form.instCount)||1;
for(var i=0;i<count;i++){
var d=new Date(form.date+"T12:00:00");
d.setMonth(d.getMonth()+i);
insts.push({due:d.toISOString().slice(0,10),amt:Math.round(amt/count),paid:false,partialPaid:0});
}
}else{
insts.push({due:form.date,amt:amt,paid:false,partialPaid:0});
}
var newId=(installments&&installments.length>0?Math.max.apply(null,installments.map(function(d){return parseInt(d.id)||0;})):0)+1;
setInstallments(function(prev){return[...prev,{id:newId,name:name,total:amt,totalAmount:amt,paid:0,installments:insts}];});
setExpanded(function(p){var n={...p};n[newId]=true;return n;});
setShowModal(false);setForm({name:"",amount:"",date:"",type:"single",instCount:""});
};

var deleteDebt=function(id){setInstallments(function(prev){return prev.filter(function(d){return d.id!==id;});});};

return (
<div style={{maxWidth:680,margin:"0 auto",paddingBottom:80}}>

<div style={{padding:"16px 16px 12px",borderBottom:"0.5px solid "+T.border}}>
<button onClick={function(){setV("lurk");}} style={{background:"none",border:"none",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600,padding:0,marginBottom:10,display:"block"}}>Dashboard</button>
<h2 style={{margin:"0 0 0",fontWeight:800,fontSize:22,color:T.text}}>Vadeler</h2>
</div>

<div style={{margin:"12px 16px",background:"rgba(255,59,48,0.06)",border:"0.5px solid rgba(255,59,48,0.2)",borderRadius:14,padding:"20px"}}>
<div style={{fontSize:10,color:T.textSub,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Kalan Borc</div>
<div style={{fontSize:36,fontWeight:800,color:T.danger,letterSpacing:-1,marginBottom:12}}>{fm(remaining,cur)}</div>
<div style={{height:10,background:"rgba(0,0,0,0.06)",borderRadius:5,overflow:"hidden",marginBottom:8}}>
<div style={{height:"100%",width:pct+"%",background:"#34C759",borderRadius:5}}/>
</div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub}}>
<span style={{color:"#34C759",fontWeight:700}}>Odenen: {fm(totalPaid,cur)}</span>
<span>%{pct} tamamlandi</span>
</div>
</div>

{motivMsg!==""&&<div style={{margin:"0 16px 12px",background:"rgba(52,199,89,0.08)",border:"0.5px solid rgba(52,199,89,0.2)",borderRadius:10,padding:"11px 14px",fontSize:13,color:"#248A3D",fontWeight:600}}>{motivMsg}</div>}

<div style={{padding:"0 16px"}}>
{debts.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:T.textDim,fontSize:13}}>Henuz borc yok</div>}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
{sortedDebts.map(function(d){
var dpct=d.total>0?Math.round(d.paid/d.total*100):0;
var isDone=d.paid>=d.total;
return (
<div key={d.id} style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:14,overflow:"hidden"}}>
<button onClick={function(){toggleExpand(d.id);}} style={{width:"100%",background:"none",border:"none",padding:"14px 14px 10px",cursor:"pointer",textAlign:"left"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
<div style={{fontSize:13,fontWeight:700,color:isDone?T.textSub:T.text,textDecoration:isDone?"line-through":"none",lineHeight:1.3,flex:1,paddingRight:4}}>{d.name}</div>
<div style={{display:"flex",gap:4,alignItems:"center",flexShrink:0}}>
{isDone&&<span style={{fontSize:9,background:"rgba(52,199,89,0.15)",color:"#248A3D",padding:"2px 6px",borderRadius:20,fontWeight:700}}>Tamamlandi</span>}
<span onClick={function(e){e.stopPropagation();setEditTarget(d.id);setEditForm({name:d.name,amount:String(d.total)});setShowEdit(true);}} style={{fontSize:10,color:"#007AFF",background:"rgba(0,122,255,0.1)",border:"0.5px solid rgba(0,122,255,0.25)",borderRadius:5,padding:"2px 7px",cursor:"pointer",fontWeight:600}}>Duzenle</span>
</div>
</div>
<div style={{fontSize:18,fontWeight:800,color:isDone?"#34C759":T.danger,letterSpacing:-0.5,marginBottom:2}}>{fm(isDone?d.total:d.total-d.paid,cur)}</div>
<div style={{fontSize:10,color:T.textSub}}>{isDone?"Tamamlandi":"Kalan"}</div>
</button>
<div style={{height:4,background:"rgba(0,0,0,0.08)",margin:"0 14px 12px"}}>
<div style={{height:"100%",width:dpct+"%",background:"#34C759",borderRadius:2}}/>
</div>
{expanded[d.id]&&(
<div style={{borderTop:"0.5px solid rgba(255,255,255,0.08)",padding:"8px 14px 12px"}}>
{d.installments.map(function(inst,i){
var instAmt=inst.amt||inst.amount||0;
return (
<div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 0",borderBottom:i<d.installments.length-1?"0.5px solid rgba(255,255,255,0.05)":"none"}}>
<button onClick={function(){toggleInst(d.id,i);}} style={{width:18,height:18,borderRadius:"50%",border:"2px solid "+(inst.paid?"#34C759":"rgba(255,255,255,0.2)"),background:inst.paid?"#34C759":"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",fontWeight:800}}>
{inst.paid?"V":""}
</button>
<div style={{flex:1,minWidth:0}}>
<div style={{fontSize:11,color:inst.paid?T.textSub:T.text,textDecoration:inst.paid?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inst.due?new Date(inst.due+"T12:00:00").toLocaleDateString("tr-TR",{day:"numeric",month:"short"}):""}</div>
{inst.partialPaid>0&&!inst.paid&&<div style={{fontSize:10,color:"#34C759"}}>{fm(inst.partialPaid,cur)}</div>}
</div>
<div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2,flexShrink:0}}>
<div style={{fontSize:11,fontWeight:700,color:inst.paid?T.textSub:T.text}}>{fm(instAmt,cur)}</div>
{!inst.paid&&(
<div style={{display:"flex",gap:3}}>
<button onClick={function(){setPartialTarget({did:d.id,idx:i,inst:inst});setShowPartial(true);}} style={{fontSize:9,color:"#007AFF",background:"rgba(0,122,255,0.1)",border:"0.5px solid rgba(0,122,255,0.3)",borderRadius:4,padding:"2px 5px",cursor:"pointer"}}>Kismi</button>
<button onClick={function(){payAllInst(d.id,i);}} style={{fontSize:9,color:"#248A3D",background:"rgba(52,199,89,0.12)",border:"0.5px solid rgba(52,199,89,0.3)",borderRadius:4,padding:"2px 5px",cursor:"pointer"}}>Tumu</button>
</div>
)}
</div>
</div>
);
})}
<button onClick={function(){deleteDebt(d.id);}} style={{marginTop:8,fontSize:11,color:T.danger,background:"rgba(255,59,48,0.06)",border:"0.5px solid rgba(255,59,48,0.2)",borderRadius:6,padding:"5px 10px",cursor:"pointer",width:"100%"}}>Sil</button>
</div>
)}
</div>
);
})}
</div>
</div>

<div style={{padding:"8px 16px"}}>
<button onClick={function(){setShowModal(true);}} style={{width:"100%",padding:"13px",background:"transparent",border:"1px dashed rgba(255,255,255,0.2)",borderRadius:12,color:T.textSub,fontSize:14,cursor:"pointer"}}>+ Borc Ekle</button>
</div>

{showEdit&&(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:200,display:"flex",alignItems:"flex-end"}}>
<div style={{background:"#1C1C1E",borderRadius:"20px 20px 0 0",width:"100%",padding:"20px 16px 36px",maxWidth:480,margin:"0 auto"}}>
<div style={{fontWeight:800,fontSize:17,color:T.text,marginBottom:16}}>Borcu Duzenle</div>
<input placeholder="Borc adi" value={editForm.name} onChange={function(e){setEditForm(function(p){return{...p,name:e.target.value};});}} style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 14px",color:T.text,fontSize:15,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:8}}/>
<input type="number" placeholder="Toplam tutar" value={editForm.amount} onChange={function(e){setEditForm(function(p){return{...p,amount:e.target.value};});}} style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 14px",color:T.text,fontSize:15,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:12}}/>
<button onClick={saveEdit} style={{width:"100%",padding:"15px",background:"#007AFF",border:"none",borderRadius:14,color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",marginBottom:8}}>Kaydet</button>
<button onClick={function(){setShowEdit(false);}} style={{width:"100%",padding:"13px",background:T.bg3,border:"none",borderRadius:14,color:T.textSub,fontSize:14,cursor:"pointer"}}>Iptal</button>
</div>
</div>
)}

{showModal&&(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:200,display:"flex",alignItems:"flex-end"}}>
<div style={{background:"#1C1C1E",borderRadius:"20px 20px 0 0",width:"100%",padding:"20px 16px 36px",maxWidth:480,margin:"0 auto"}}>
<div style={{fontWeight:800,fontSize:17,color:T.text,marginBottom:16}}>Borc Ekle</div>
<input placeholder="Borc adi" value={form.name} onChange={function(e){setForm(function(p){return{...p,name:e.target.value};});}} style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 14px",color:T.text,fontSize:15,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:8}}/>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
<input type="number" placeholder="Tutar" value={form.amount} onChange={function(e){setForm(function(p){return{...p,amount:e.target.value};});}} style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 14px",color:T.text,fontSize:15,outline:"none"}}/>
<input type="date" value={form.date} onChange={function(e){setForm(function(p){return{...p,date:e.target.value};});}} style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 14px",color:T.text,fontSize:15,outline:"none"}}/>
</div>
<select value={form.type} onChange={function(e){setForm(function(p){return{...p,type:e.target.value};});}} style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 14px",color:T.text,fontSize:15,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:8}}>
<option value="single">Tek odeme</option>
<option value="monthly">Aylik taksit</option>
</select>
{form.type==="monthly"&&<input type="number" placeholder="Taksit sayisi" value={form.instCount} onChange={function(e){setForm(function(p){return{...p,instCount:e.target.value};});}} style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 14px",color:T.text,fontSize:15,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:8}}/>}
<button onClick={saveDebt} style={{width:"100%",padding:"15px",background:T.danger,border:"none",borderRadius:14,color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",marginBottom:8}}>Kaydet</button>
<button onClick={function(){setShowModal(false);}} style={{width:"100%",padding:"13px",background:T.bg3,border:"none",borderRadius:14,color:T.textSub,fontSize:14,cursor:"pointer"}}>Iptal</button>
</div>
</div>
)}

{showPartial&&partialTarget&&(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:200,display:"flex",alignItems:"flex-end"}}>
<div style={{background:"#1C1C1E",borderRadius:"20px 20px 0 0",width:"100%",padding:"20px 16px 36px",maxWidth:480,margin:"0 auto"}}>
<div style={{fontWeight:800,fontSize:17,color:T.text,marginBottom:6}}>Kismi Odeme</div>
<div style={{fontSize:13,color:T.textSub,marginBottom:16}}>{partialTarget.inst&&fm((partialTarget.inst.amt||partialTarget.inst.amount||0)-(partialTarget.inst.partialPaid||0),cur)+" kalan"}</div>
<input autoFocus type="number" placeholder="Odenecek tutar" value={partialAmt} onChange={function(e){setPartialAmt(e.target.value);}} style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 14px",color:T.text,fontSize:18,fontWeight:700,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:10}}/>
<button onClick={savePartial} style={{width:"100%",padding:"15px",background:"#34C759",border:"none",borderRadius:14,color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",marginBottom:8}}>Odemeyi Kaydet</button>
<button onClick={function(){setShowPartial(false);setPartialAmt("");}} style={{width:"100%",padding:"13px",background:T.bg3,border:"none",borderRadius:14,color:T.textSub,fontSize:14,cursor:"pointer"}}>Iptal</button>
</div>
</div>
)}

</div>
);
}

function TodoV({todos,setTodos,fd,sb,inp,T,setV}){
const[newTodo,setNewTodo]=useState("");
const[filter,setFilter]=useState("active");

const addTodo=()=>{
if(!newTodo.trim())return;
setTodos(prev=>[{id:Date.now()+Math.random(),text:newTodo.trim(),done:false,createdAt:new Date().toISOString()},...prev]);
setNewTodo("");
};

const toggleTodo=(id)=>setTodos(prev=>prev.map(t=>t.id===id?{...t,done:!t.done,doneAt:!t.done?new Date().toISOString():null}:t));
const deleteTodo=(id)=>setTodos(prev=>prev.filter(t=>t.id!==id));
const clearDone=()=>{if(window.confirm("Tamamlanan tüm görevleri silmek istediğine emin misin?"))setTodos(prev=>prev.filter(t=>!t.done));};

const activeTodos=todos.filter(t=>!t.done);
const doneTodos=todos.filter(t=>t.done);
const filtered=filter==="active"?activeTodos:filter==="done"?doneTodos:todos;

return(<div style={{padding:24,maxWidth:680,margin:"0 auto"}}>
<div style={{marginBottom:22}}>
<button onClick={()=>setV("lurk")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:16,padding:0}}>← Dashboard</button>
<h2 style={{margin:0,fontWeight:800,fontSize:20}}>📝 Yapılacaklar</h2>
<div style={{fontSize:12,color:T.textSub,marginTop:2}}>{activeTodos.length} aktif görev{doneTodos.length>0?`, ${doneTodos.length} tamamlandı`:""}</div>
</div>

<div style={{display:"flex",gap:8,marginBottom:18}}>
<input
placeholder="Yeni görev ekle... (örn: Sosyal medya planı hazırla)"
value={newTodo}
onChange={e=>setNewTodo(e.target.value)}
onKeyDown={e=>{if(e.key==="Enter")addTodo();}}
style={{...inp,flex:1}}
/>
<button onClick={addTodo} style={{...sb("#34C759"),padding:"0 20px"}}>Ekle</button>
</div>

<div style={{display:"flex",gap:6,marginBottom:18}}>
{[{k:"active",l:`Aktif (${activeTodos.length})`},{k:"done",l:`Tamamlandı (${doneTodos.length})`},{k:"all",l:"Tümü"}].map(({k,l})=>(
<button key={k} onClick={()=>setFilter(k)} style={{padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filter===k?"#34C759":T.bg3,color:filter===k?"#fff":T.textSub}}>{l}</button>
))}
{doneTodos.length>0&&<button onClick={clearDone} style={{padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"transparent",color:T.danger,marginLeft:"auto"}}>Tamamlananları Temizle</button>}
</div>

{filtered.length===0?(
<div style={{textAlign:"center",padding:"50px 0",color:T.textDim}}>
<div style={{fontSize:28,marginBottom:8}}>✅</div>
<div>{filter==="done"?"Henüz tamamlanan görev yok.":filter==="active"?"Aktif görev yok, harika!":"Henüz görev eklemedin."}</div>
</div>
):(
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{filtered.map(t=>(
<div key={t.id} style={{display:"flex",alignItems:"center",gap:12,background:T.bg2,borderRadius:12,padding:"12px 14px",boxShadow:T.shadow}}>
<input type="checkbox" checked={t.done} onChange={()=>toggleTodo(t.id)} style={{width:18,height:18,cursor:"pointer",flexShrink:0,accentColor:"#34C759"}}/>
<div style={{flex:1,minWidth:0}}>
<div style={{fontSize:14,fontWeight:500,color:t.done?T.textDim:T.text,textDecoration:t.done?"line-through":"none"}}>{t.text}</div>
<div style={{fontSize:10,color:T.textDim,marginTop:2}}>{t.done&&t.doneAt?`${fd(t.doneAt)} tarihinde tamamlandı`:`${fd(t.createdAt)} tarihinde eklendi`}</div>
</div>
<button onClick={()=>deleteTodo(t.id)} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",fontSize:12,fontWeight:600,padding:"4px 8px",flexShrink:0}}>Sil</button>
</div>
))}
</div>
)}
</div>);}

function TacoEntryV({logs,setLogs,cur,fm,fd,tod,menu,setMenu,ecats,inp,sb,T=DARK}){
const[date,setDate]=useState(tod());
const[cash,setCash]=useState("");
const[card,setCard]=useState("");
const[items,setItems]=useState([]);
const[expenses,setExpenses]=useState([]);
const[expDesc,setExpDesc]=useState("");
const[expAmt,setExpAmt]=useState("");
const[expCat,setExpCat]=useState(ecats[0]||"Malzeme");
const[itemSearch,setItemSearch]=useState("");
const[saved,setSaved]=useState(false);

const totalInc=(parseFloat(cash)||0)+(parseFloat(card)||0);
const totalExp=expenses.reduce((s,e)=>s+e.amount,0);
const totalItems=items.reduce((s,i)=>s+i.qty,0);

const filteredMenu=(menu||[]).filter(m=>m.on!==false&&m.name.toLowerCase().includes(itemSearch.toLowerCase()));
const cats=["Tümü",...Array.from(new Set((menu||[]).map(m=>m.cat)))];
const[mCat,setMCat]=useState("Tümü");
const catMenu=filteredMenu.filter(m=>mCat==="Tümü"||m.cat===mCat);

const addItem=(menuItem)=>{
setItems(prev=>{
const ex=prev.find(i=>i.name===menuItem.name);
if(ex)return prev.map(i=>i.name===menuItem.name?{...i,qty:i.qty+1}:i);
return[...prev,{name:menuItem.name,qty:1,price:menuItem.price,cat:menuItem.cat}];
});
};
const chItemQ=(name,d)=>{
setItems(prev=>prev.map(i=>i.name===name?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0));
};
const addExp=()=>{
if(!expDesc||!expAmt)return;
setExpenses(prev=>[...prev,{id:Date.now()+Math.random(),desc:expDesc,amount:parseFloat(expAmt)||0,cat:expCat}]);
setExpDesc("");setExpAmt("");
};

const saveDay=()=>{
if(!cash&&!card&&items.length===0){return;}
const inc=totalInc;
const exp=totalExp;
const logItems=items.map(i=>({name:i.name,qty:i.qty,total:i.price*i.qty,price:i.price,cat:i.cat}));
const logExps=expenses.map(e=>({...e,date}));
const newLog={
id:Date.now()+Math.random(),
date,
oa:"09:00",
ca:new Date().toISOString(),
inc,
exp,
net:inc-exp,
cash:parseFloat(cash)||0,
card:parseFloat(card)||0,
count:totalItems,
items:logItems,
guests:[],
exps:logExps,
manual:true,
};
setLogs(prev=>{
const filtered=prev.filter(l=>l.date!==date);
return[newLog,...filtered].sort((a,b)=>b.date.localeCompare(a.date));
});
setSaved(true);
setTimeout(()=>setSaved(false),3000);
};

const existing=logs.find(l=>l.date===date);

return(<div style={{padding:24,maxWidth:760,margin:"0 auto"}}>
<div style={{marginBottom:22}}>
<h2 style={{margin:0,fontWeight:800,fontSize:20}}>Günlük Giriş</h2>
<div style={{fontSize:12,color:T.textSub,marginTop:2}}>Gün sonu nakit, kart, ürün ve giderleri gir</div>
</div>

{existing&&<div style={{background:"rgba(255,149,0,0.1)",border:"0.5px solid rgba(255,149,0,0.4)",borderRadius:12,padding:"10px 16px",marginBottom:16,fontSize:12,color:"#FF9500",fontWeight:600}}>
⚠ {fd(date)} için daha önce giriş yapılmış — kaydetmek üzerine yazar.
</div>}

{saved&&<div style={{background:"rgba(52,199,89,0.12)",border:"0.5px solid #8FE3A8",borderRadius:12,padding:"10px 16px",marginBottom:16,fontSize:12,color:"#34C759",fontWeight:700}}>
✓ {fd(date)} kaydedildi!
</div>}

<div style={{background:T.bg2,borderRadius:14,padding:20,marginBottom:16,boxShadow:T.shadow}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Tarih & Tahsilat</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
<div><label style={{fontSize:11,color:T.textSub,display:"block",marginBottom:5}}>Tarih</label><input type="date" value={date} onChange={e=>{setDate(e.target.value);setSaved(false);}} style={inp}/></div>
<div><label style={{fontSize:11,color:T.textSub,display:"block",marginBottom:5}}>Nakit ({cur})</label><input type="number" placeholder="0" value={cash} onChange={e=>setCash(e.target.value)} style={inp}/></div>
<div><label style={{fontSize:11,color:T.textSub,display:"block",marginBottom:5}}>Kart ({cur})</label><input type="number" placeholder="0" value={card} onChange={e=>setCard(e.target.value)} style={inp}/></div>
</div>
{totalInc>0&&<div style={{marginTop:12,display:"flex",gap:16,padding:"10px 14px",background:T.bg3,borderRadius:10}}>
<div><span style={{fontSize:11,color:T.textSub}}>Toplam: </span><span style={{fontWeight:800,color:T.accent,fontSize:15}}>{fm(totalInc,cur)}</span></div>
<div><span style={{fontSize:11,color:T.textSub}}>Net: </span><span style={{fontWeight:800,color:totalInc-totalExp>=0?T.accent:T.danger,fontSize:15}}>{fm(totalInc-totalExp,cur)}</span></div>
</div>}
</div>

<div style={{background:T.bg2,borderRadius:14,padding:20,marginBottom:16,boxShadow:T.shadow}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Satılan Ürünler {totalItems>0&&<span style={{fontSize:12,color:T.textSub,fontWeight:400}}>({totalItems} adet, {fm(items.reduce((s,i)=>s+i.price*i.qty,0),cur)})</span>}</div>
<input placeholder="Ürün ara..." value={itemSearch} onChange={e=>setItemSearch(e.target.value)} style={{...inp,marginBottom:10}}/>
<div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
{cats.map(c=><button key={c} onClick={()=>setMCat(c)} style={{padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:mCat===c?T.accent:T.bg3,color:mCat===c?"#fff":T.textSub}}>{c}</button>)}
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8,marginBottom:16,maxHeight:200,overflowY:"auto"}}>
{catMenu.map(m=>{
const inCart=items.find(i=>i.name===m.name);
return(<button key={m.name} onClick={()=>addItem(m)} style={{background:inCart?"rgba(52,199,89,0.1)":T.bg3,border:"0.5px solid "+(inCart?"#8FE3A8":T.border),borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left"}}>
<div style={{fontSize:12,fontWeight:600,color:T.text}}>{m.name}</div>
<div style={{fontSize:11,color:T.accent,marginTop:2}}>{fm(m.price,cur)}</div>
{inCart&&<div style={{fontSize:11,fontWeight:800,color:"#34C759",marginTop:2}}>× {inCart.qty}</div>}
</button>);})}
</div>
{items.length>0&&<div style={{display:"flex",flexDirection:"column",gap:6,borderTop:"0.5px solid "+T.border,paddingTop:12}}>
{items.map(i=><div key={i.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{fontSize:13,fontWeight:600}}>{i.name}</span>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<button onClick={()=>chItemQ(i.name,-1)} style={{...sb(T.bg3),color:T.text,width:28,height:28,borderRadius:8,padding:0}}>−</button>
<span style={{fontWeight:700,minWidth:24,textAlign:"center"}}>{i.qty}</span>
<button onClick={()=>chItemQ(i.name,1)} style={{...sb(T.accent),color:"#fff",width:28,height:28,borderRadius:8,padding:0}}>+</button>
<span style={{fontSize:12,color:T.textSub,minWidth:70,textAlign:"right"}}>{fm(i.price*i.qty,cur)}</span>
</div>
</div>)}
</div>}
</div>

<div style={{background:T.bg2,borderRadius:14,padding:20,marginBottom:20,boxShadow:T.shadow}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Giderler {totalExp>0&&<span style={{fontSize:12,color:T.textSub,fontWeight:400}}>({fm(totalExp,cur)})</span>}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto auto",gap:8,marginBottom:12,alignItems:"end"}}>
<div><label style={{fontSize:11,color:T.textSub,display:"block",marginBottom:4}}>Açıklama</label><input placeholder="Malzeme, kira..." value={expDesc} onChange={e=>setExpDesc(e.target.value)} style={inp}/></div>
<div><label style={{fontSize:11,color:T.textSub,display:"block",marginBottom:4}}>Tutar</label><input type="number" placeholder="0" value={expAmt} onChange={e=>setExpAmt(e.target.value)} style={inp}/></div>
<div><label style={{fontSize:11,color:T.textSub,display:"block",marginBottom:4}}>Kategori</label>
<select value={expCat} onChange={e=>setExpCat(e.target.value)} style={inp}>
{ecats.map(c=><option key={c} value={c}>{c}</option>)}
</select></div>
<button onClick={addExp} style={{...sb(T.accent),padding:"9px 16px",height:40}}>Ekle</button>
</div>
{expenses.map(e=><div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"0.5px solid "+T.border}}>
<span style={{fontSize:13}}>{e.desc} <span style={{fontSize:11,color:T.textSub}}>({e.cat})</span></span>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<span style={{fontWeight:700,color:T.danger,fontSize:13}}>{fm(e.amount,cur)}</span>
<button onClick={()=>setExpenses(prev=>prev.filter(x=>x.id!==e.id))} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",fontSize:11}}>✕</button>
</div>
</div>)}
</div>

<button onClick={saveDay} style={{...sb(T.accent),width:"100%",padding:"14px 0",fontSize:15,fontWeight:700}}>
{saved?"✓ Kaydedildi":"Günü Kaydet"}
</button>
</div>);}

function TacoTabV({tacoLogs,setTacoLogs,cur,fm,fd,fdl,tod,inp,sb,T=DARK}){
const[mode,setMode]=useState(null);
const[pt,setPt]=useState("cash");
const[itemName,setItemName]=useState("");
const[amount,setAmount]=useState("");
const[saved,setSaved]=useState(false);

const save=()=>{
if(!amount)return;
const entry={
id:Date.now()+Math.random(),
date:tod(),
type:mode,
pt,
itemName:itemName.trim()||"—",
amount:parseFloat(amount)||0,
createdAt:new Date().toISOString(),
};
setTacoLogs(prev=>[entry,...prev]);
setMode(null);setPt("cash");setItemName("");setAmount("");
setSaved(true);setTimeout(()=>setSaved(false),2000);
};

const income=tacoLogs.filter(l=>(l.type==="income"));
const expense=tacoLogs.filter(l=>(l.type==="expense"));
const totalIncome=income.reduce((s,l)=>s+l.amount,0);
const totalExpense=expense.reduce((s,l)=>s+l.amount,0);
const net=totalIncome-totalExpense;

const byMonth={};
tacoLogs.forEach(l=>{const m=l.date.slice(0,7);if(!byMonth[m])byMonth[m]={income:0,expense:0,entries:[]};byMonth[m][l.type==="income"?"income":"expense"]+=l.amount;byMonth[m].entries.push(l);});
const months=Object.keys(byMonth).sort((a,b)=>b.localeCompare(a));
const monthName=(m)=>{const[y,mo]=m.split("-");const n=["","Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];return n[parseInt(mo)]+" "+y;};
const[openM,setOpenM]=useState(null);

return(<div style={{paddingTop:8}}>
{saved&&<div style={{background:"rgba(52,199,89,0.12)",border:"0.5px solid #8FE3A8",borderRadius:10,padding:"10px 16px",marginBottom:14,fontSize:12,color:"#34C759",fontWeight:700}}>✓ Kaydedildi!</div>}

<div style={{display:"flex",gap:10,marginBottom:20}}>
<button onClick={()=>setMode(mode==="income"?null:"income")} style={{flex:1,padding:"14px 0",borderRadius:12,border:"2px solid "+(mode==="income"?"#34C759":"rgba(0,0,0,0.08)"),background:mode==="income"?"rgba(52,199,89,0.1)":"#fff",cursor:"pointer",fontWeight:700,fontSize:14,color:mode==="income"?"#34C759":"#000"}}>＋ Gelir Ekle</button>
<button onClick={()=>setMode(mode==="expense"?null:"expense")} style={{flex:1,padding:"14px 0",borderRadius:12,border:"2px solid "+(mode==="expense"?"#FF3B30":"rgba(0,0,0,0.08)"),background:mode==="expense"?"rgba(255,59,48,0.1)":"#fff",cursor:"pointer",fontWeight:700,fontSize:14,color:mode==="expense"?"#FF3B30":"#000"}}>－ Gider Ekle</button>
</div>

{mode&&<div style={{background:T.isDark?"#1a1a1a":T.bg2,border:"0.5px solid rgba(0,0,0,0.08)",borderRadius:14,padding:20,marginBottom:20,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
<div style={{fontWeight:700,fontSize:14,color:mode==="income"?"#34C759":"#FF3B30",marginBottom:14}}>{mode==="income"?"Gelir Ekle":"Gider Ekle"}</div>
{mode==="income"&&<>
<div style={{fontSize:11,color:"#8E8E93",marginBottom:8,fontWeight:600}}>Ödeme Tipi</div>
<div style={{display:"flex",gap:8,marginBottom:14}}>
{[{k:"cash",l:"Nakit"},{k:"card",l:"Kart"}].map(({k,l})=><button key={k} onClick={()=>setPt(k)} style={{flex:1,padding:"10px 0",borderRadius:10,border:"2px solid "+(pt===k?(k==="cash"?"#FF9500":"#007AFF"):"rgba(0,0,0,0.08)"),background:pt===k?(k==="cash"?"rgba(255,149,0,0.1)":"rgba(0,122,255,0.1)"):"#fff",cursor:"pointer",fontWeight:700,fontSize:13,color:pt===k?(k==="cash"?"#FF9500":"#007AFF"):"#8E8E93"}}>{l}</button>)}
</div>
</>}
<div style={{fontSize:11,color:"#8E8E93",marginBottom:6,fontWeight:600}}>Ürün / Açıklama</div>
<input placeholder={mode==="income"?"Ürün adı (örn: Taco)":"Açıklama (örn: Malzeme)"} value={itemName} onChange={e=>setItemName(e.target.value)} style={{...inp,marginBottom:12}}/>
<div style={{fontSize:11,color:"#8E8E93",marginBottom:6,fontWeight:600}}>Tutar ({cur})</div>
<input type="number" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)} onKeyDown={e=>e.key==="Enter"&&save()} style={{...inp,marginBottom:14,fontSize:13,fontWeight:700}} autoFocus/>
<div style={{display:"flex",gap:8}}>
<button onClick={()=>{setMode(null);setItemName("");setAmount("");}} style={{...sb("rgba(118,118,128,0.12)"),flex:1,color:"#8E8E93"}}>İptal</button>
<button onClick={save} style={{...sb(mode==="income"?"#34C759":"#FF3B30"),flex:2}}>Kaydet</button>
</div>
</div>}

<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
<div style={{background:"rgba(52,199,89,0.1)",border:"1px solid rgba(52,199,89,0.3)",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#34C759",marginBottom:4}}>Toplam Gelir</div><div style={{fontWeight:800,fontSize:18,color:"#34C759"}}>{fm(totalIncome,cur)}</div></div>
<div style={{background:"rgba(255,59,48,0.1)",border:"1px solid rgba(255,59,48,0.3)",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#FF3B30",marginBottom:4}}>Toplam Gider</div><div style={{fontWeight:800,fontSize:18,color:"#FF3B30"}}>{fm(totalExpense,cur)}</div></div>
<div style={{background:net>=0?"rgba(52,199,89,0.1)":"rgba(255,59,48,0.1)",border:"1px solid "+(net>=0?"rgba(52,199,89,0.3)":"rgba(255,59,48,0.3)"),borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:net>=0?"#34C759":"#FF3B30",marginBottom:4}}>Net</div><div style={{fontWeight:800,fontSize:18,color:net>=0?"#34C759":"#FF3B30"}}>{fm(net,cur)}</div></div>
</div>

{months.length===0?<div style={{textAlign:"center",padding:"40px 0",color:"#C7C7CC",fontSize:13}}>Henüz kayıt yok.</div>
:<div style={{display:"flex",flexDirection:"column",gap:8}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:4}}>Taco & Tortilla Raporları</div>
{months.map(m=>{
const md=byMonth[m];
const isOpen=openM===m;
return(<div key={m} style={{background:T.isDark?"#1a1a1a":T.bg2,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:14,boxShadow:"0 2px 12px rgba(0,0,0,0.4)",overflow:"hidden"}}>
<button onClick={()=>setOpenM(isOpen?null:m)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
<div><div style={{fontWeight:700,fontSize:15,color:T.text}}>{monthName(m)}</div><div style={{fontSize:11,color:T.textSub,marginTop:2}}>{md.entries.length} kayıt</div></div>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{textAlign:"right"}}>
<div style={{fontSize:13,color:"#34C759",fontWeight:700}}>↑ {fm(md.income,cur)}</div>
<div style={{fontSize:13,color:"#FF3B30",fontWeight:700}}>↓ {fm(md.expense,cur)}</div>
</div>
<span style={{color:"#C7C7CC",fontSize:12}}>{isOpen?"▲":"▼"}</span>
</div>
</button>
{isOpen&&<div style={{borderTop:"0.5px solid rgba(0,0,0,0.08)"}}>
{md.entries.map((e,i)=><div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:i<md.entries.length-1?"0.5px solid rgba(0,0,0,0.06)":"none",background:i%2===0?T.isDark?"#1a1a1a":T.bg2:T.bg2}}>
<div><div style={{fontSize:13,fontWeight:600,color:T.text}}>{e.itemName}</div><div style={{fontSize:10,color:T.textSub,marginTop:1}}>{fd(e.date)}{e.pt?" · "+(e.pt==="cash"?"Nakit":"Kart"):""}</div></div>
<div style={{fontWeight:700,fontSize:14,color:e.type==="income"?"#34C759":"#FF3B30"}}>{e.type==="income"?"＋":"－"}{fm(e.amount,cur)}</div>
</div>)}
</div>}
</div>);})}
</div>}
</div>);}

function ProductsPageV({logs,cur,fm,tod,T,inp,sb,setV}){
const[sortBy,setSortBy]=useState("qty");
const[dateFrom,setDateFrom]=useState(()=>{const d=new Date();d.setDate(d.getDate()-40);return d.toISOString().split("T")[0];});
const[dateTo,setDateTo]=useState(tod());

const inRange=(date)=>{if(!dateFrom&&!dateTo)return true;if(dateFrom&&date<dateFrom)return false;if(dateTo&&date>dateTo)return false;return true;};
const relevantLogs=(logs||[]).filter(l=>inRange(l.date)&&l.items&&l.items.length>0);
const productMap={};
relevantLogs.forEach(log=>{(log.items||[]).forEach(it=>{const key=it.name;if(!productMap[key])productMap[key]={name:it.name,qty:0,revenue:0,days:new Set()};productMap[key].qty+=it.qty;productMap[key].revenue+=it.total;productMap[key].days.add(log.date);});});
const productList=Object.values(productMap).map(p=>({...p,dayCount:p.days.size,avgPerDay:p.qty/p.days.size}));
const sorted=[...productList].sort((a,b)=>sortBy==="qty"?b.qty-a.qty:b.revenue-a.revenue);
const maxVal=sorted.length>0?(sortBy==="qty"?sorted[0].qty:sorted[0].revenue):1;
const totalQty=productList.reduce((s,p)=>s+p.qty,0);
const totalRev=productList.reduce((s,p)=>s+p.revenue,0);

return(
<div style={{padding:"24px 28px",maxWidth:860,margin:"0 auto"}}>
<button onClick={()=>setV("lurk")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:16,padding:0}}>← Dashboard</button>
<h2 style={{margin:"0 0 20px",fontWeight:800,fontSize:22,color:T.text}}>📦 Ürün Analizi</h2>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
<input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={inp}/>
<input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} style={inp}/>
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Ürün Çeşidi</div><div style={{fontSize:22,fontWeight:800,color:T.text}}>{productList.length}</div></div>
<div style={{background:"rgba(255,149,0,0.1)",border:"1px solid rgba(255,149,0,0.25)",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#FF9500",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Toplam Adet</div><div style={{fontSize:22,fontWeight:800,color:"#FF9500"}}>{totalQty}</div></div>
<div style={{background:"rgba(0,122,255,0.1)",border:"1px solid rgba(0,122,255,0.25)",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#3A9EFF",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Toplam Ciro</div><div style={{fontSize:18,fontWeight:800,color:"#3A9EFF"}}>{fm(totalRev,cur)}</div></div>
</div>
<div style={{display:"flex",gap:6,marginBottom:16}}>
{[{k:"qty",l:"Adete Göre"},{k:"revenue",l:"Ciroya Göre"}].map(({k,l})=><button key={k} onClick={()=>setSortBy(k)} style={{padding:"8px 16px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:sortBy===k?"#3A9EFF":T.bg3,color:sortBy===k?"#fff":T.textSub}}>{l}</button>)}
</div>
{sorted.length===0?<div style={{textAlign:"center",padding:"60px 0",color:T.textDim}}>Bu aralıkta ürün verisi yok.</div>
:<div style={{display:"flex",flexDirection:"column",gap:6}}>
{sorted.map((p,i)=>{
const val=sortBy==="qty"?p.qty:p.revenue;
const barPct=maxVal>0?val/maxVal*100:0;
return(
<div key={p.name} style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:"12px 16px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",bottom:0,left:0,height:2,width:barPct+"%",background:"rgba(58,158,255,0.4)"}}/>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<span style={{fontSize:12,fontWeight:800,color:T.textDim,minWidth:20}}>{i+1}</span>
<div>
<div style={{fontSize:13,fontWeight:600,color:T.text}}>{p.name}</div>
<div style={{fontSize:11,color:T.textSub,marginTop:1}}>{p.dayCount} günde · günlük ort. {p.avgPerDay.toFixed(1)} adet</div>
</div>
</div>
<div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
<div style={{fontSize:14,fontWeight:700,color:"#3A9EFF"}}>{sortBy==="qty"?p.qty+" adet":fm(p.revenue,cur)}</div>
<div style={{fontSize:11,color:T.textSub}}>{sortBy==="qty"?fm(p.revenue,cur):p.qty+" adet"}</div>
</div>
</div>
</div>
);})}
</div>}
</div>
);}

function AllTimeV({orders,cur,fm,T,setV}){
const[expandedSec,setExpandedSec]=useState("special");
const totalRev=orders.reduce((s,o)=>s+o.total,0);
const totalOrders=orders.length;
const avgOrder=totalOrders>0?Math.round(totalRev/totalOrders):0;
const totalCash=orders.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
const totalCard=orders.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
const byDay={};
orders.forEach(o=>{if(!byDay[o.date])byDay[o.date]=0;byDay[o.date]+=o.total;});
const bestDay=Object.entries(byDay).sort((a,b)=>b[1]-a[1])[0];
const bestDayLabel=bestDay?new Date(bestDay[0]+"T12:00:00").toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"}):"—";
const dayCount=Object.keys(byDay).length;
const itemCounts={};
const catCounts={};
orders.forEach(o=>(o.items||[]).forEach(item=>{
if(!item||typeof item!=="object")return;
if(!itemCounts[item.name])itemCounts[item.name]=0;
itemCounts[item.name]+=item.qty||1;
if(!catCounts[item.cat])catCounts[item.cat]=0;
catCounts[item.cat]+=item.qty||1;
}));
const topItems=Object.entries(itemCounts).sort((a,b)=>b[1]-a[1]).slice(0,10);
const catList=Object.entries(catCounts).sort((a,b)=>b[1]-a[1]);
const maxCat=catList[0]?.[1]||1;
const ICONS={"Kahve":"☕","Matcha":"🍵","Cay":"🫖","Sandviç":"🥪","Tatlı":"🍰","Ekstra":"➕"};
const Section=function({id,title,children}){return(
<div style={{marginBottom:12}}>
<button onClick={()=>setExpandedSec(expandedSec===id?null:id)} style={{width:"100%",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:expandedSec===id?"14px 14px 0 0":14,padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",color:T.text,borderBottom:expandedSec===id?"none":undefined}}>
<span style={{fontWeight:700,fontSize:15,color:T.text}}>{title}</span>
<span style={{color:T.textSub,fontSize:14}}>{expandedSec===id?"▲":"▽"}</span>
</button>
{expandedSec===id&&<div style={{background:T.bg2,borderRadius:"0 0 14px 14px",border:"0.5px solid rgba(255,255,255,0.08)",borderTop:"none",overflow:"hidden"}}>{children}</div>}
</div>
);};
return(
<div style={{maxWidth:680,margin:"0 auto",paddingBottom:60}}>
<div style={{padding:"16px 16px 20px",borderBottom:"0.5px solid "+T.border}}>
<button onClick={()=>setV("lurk")} style={{background:"none",border:"none",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600,padding:0,marginBottom:10,display:"block"}}>Dashboard</button>
<h2 style={{margin:"0 0 4px",fontWeight:800,fontSize:24,color:T.text}}>Tüm Zamanlar</h2>
<div style={{fontSize:12,color:T.textDim}}>{totalOrders} adisyon · {dayCount} gün</div>
</div>
<div style={{padding:"16px"}}>
<div style={{background:"linear-gradient(135deg,rgba(52,199,89,0.15),rgba(52,199,89,0.05))",border:"1px solid rgba(52,199,89,0.2)",borderRadius:16,padding:"20px",marginBottom:12}}>
<div style={{fontSize:10,color:T.accentL,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>Toplam Ciro</div>
<div style={{fontSize:38,fontWeight:800,color:T.text,letterSpacing:-1,marginBottom:8}}>{fm(totalRev,cur)}</div>
<div style={{display:"flex",gap:16}}>
<div><span style={{fontSize:11,color:T.textSub}}>Nakit  </span><span style={{fontSize:13,fontWeight:700,color:"#34C759"}}>{fm(totalCash,cur)}</span></div>
<div><span style={{fontSize:11,color:T.textSub}}>Kart  </span><span style={{fontSize:13,fontWeight:700,color:"#007AFF"}}>{fm(totalCard,cur)}</span></div>
</div>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
{[
{label:"Toplam Adisyon",val:totalOrders.toLocaleString("tr-TR"),unit:"adet",color:"#007AFF"},
{label:"Ortalama Adisyon",val:fm(avgOrder,cur),unit:"",color:"#FF9500"},
{label:"En İyi Gün",val:fm(bestDay?.[1]||0,cur),unit:"",color:"#AF52DE",sub:bestDayLabel},
{label:"Günlük Ortalama",val:fm(dayCount>0?Math.round(totalRev/dayCount):0,cur),unit:"",color:"#34C759"},
].map((s,i)=>(
<div key={i} style={{background:T.bg2,borderRadius:12,padding:"14px",border:"0.5px solid rgba(255,255,255,0.08)"}}>
<div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>{s.label}</div>
<div style={{fontSize:16,fontWeight:800,color:s.color}}>{s.val}</div>
{s.sub&&<div style={{fontSize:10,color:T.textDim,marginTop:3}}>{s.sub}</div>}
</div>
))}
</div>
<Section id="special" title="✨ Ürün İstatistikleri">
{[
{label:"☕ Toplam Kahve",keys:["FİLTRE KAHVE","LATTE","AMERICANO","CAPPUCCINO","CORTADO","FLATWHITE","MOCHA","V60","ESPRESSO","SİGARALIK FİLTRE","SALTED CARAMEL LATTE","VANİLYA LATTE"],unit:"fincan"},
{label:"🍵 Toplam Matcha",keys:["MATCHA LATTE","STRAWBERRY MATCHA","BERRY MATCHA LATTE","VANILLA MATCHA LATTE","APPLE & GINGER MATCHA","CRÈME BRÜLÉE MATCHA"],unit:"bardak"},
{label:"🧋 Ice Tea",keys:["ICE TEA"],unit:"bardak"},
{label:"🫖 Bitki Çayı",keys:["BİTKİ ÇAYI"],unit:"bardak"},
{label:"🥪 Toplam Sandviç",keys:["MUHAMMARA SANDVİÇ","RENÇ SANDVİÇ","PESTO SANDVİÇ","TON BALIĞI SANDVİÇ"],unit:"adet"},
{label:"🍰 Toplam Tatlı",keys:["TIRAMISU","SOFT COOKIE"],unit:"adet"},
].map((s,i)=>{
const count=s.keys.reduce((sum,k)=>sum+(itemCounts[k]||0),0);
return(
<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
<span style={{fontSize:14,color:T.text}}>{s.label}</span>
<div><span style={{fontSize:20,fontWeight:800,color:T.accentL}}>{count.toLocaleString("tr-TR")}</span><span style={{fontSize:11,color:T.textSub,marginLeft:4}}>{s.unit}</span></div>
</div>
);})}
</Section>
<Section id="products" title="🏆 En Çok Satılan Ürünler">
{topItems.length===0?<div style={{padding:"20px",textAlign:"center",color:T.textDim}}>Henüz veri yok</div>
:topItems.map(([name,count],i)=>(
<div key={name} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
<div style={{width:28,height:28,borderRadius:"50%",background:i===0?"rgba(255,215,0,0.15)":i===1?"rgba(192,192,192,0.1)":i===2?"rgba(205,127,50,0.1)":"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:i===0?"#FFD60A":i===1?"#C0C0C0":i===2?"#CD7F32":T.textDim,flexShrink:0}}>{i+1}</div>
<div style={{flex:1,fontSize:13,fontWeight:600,color:T.text}}>{name}</div>
<div style={{fontSize:15,fontWeight:800,color:T.accentL}}>{count.toLocaleString("tr-TR")}</div>
</div>
))}
</Section>
<Section id="categories" title="🏷 Kategori Dağılımı">
{catList.length===0?<div style={{padding:"20px",textAlign:"center",color:T.textDim}}>Henüz veri yok</div>
:catList.map(([cat,count])=>(
<div key={cat} style={{padding:"12px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
<span style={{fontSize:14,fontWeight:600,color:T.text}}>{ICONS[cat]||"•"} {cat}</span>
<span style={{fontSize:14,fontWeight:800,color:T.accentL}}>{count.toLocaleString("tr-TR")} adet</span>
</div>
<div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
<div style={{height:"100%",width:(count/maxCat*100)+"%",background:T.accent,borderRadius:2}}/>
</div>
</div>
))}
</Section>
</div>
</div>
);}

function ExpensesPageV({exp,setExp,ecats,setEc,cur,fm,fd,tod,uid,T,setV}){
const COLORS=["#FF3B30","#FF9500","#FFD60A","#34C759","#007AFF","#5856D6","#AF52DE","#FF2D55"];
const now=new Date();
const[selMonth,setSelMonth]=useState(now.toISOString().slice(0,7));
const[step,setStep]=useState(null);
const[selCat,setSelCat]=useState(null);
const[amount,setAmount]=useState("");
const[desc,setDesc]=useState("");
const[showNewCat,setShowNewCat]=useState(false);
const[newCatInput,setNewCatInput]=useState("");
const[expandedCat,setExpandedCat]=useState(null);
const[editId,setEditId]=useState(null);
const[editAmt,setEditAmt]=useState("");
const[editCat,setEditCat]=useState("");
const[editDesc,setEditDesc]=useState("");
const[delId,setDelId]=useState(null);
const col=function(i){return COLORS[i%COLORS.length];};
const catCol=function(c){return col((ecats||[]).indexOf(c));};
const months=[...new Set((exp||[]).map(e=>e.date?e.date.slice(0,7):"").filter(Boolean))].sort((a,b)=>b.localeCompare(a));
if(months.length===0||!months.includes(selMonth)){const m=now.toISOString().slice(0,7);if(!months.includes(m))months.unshift(m);}
const monthLabel=function(m){const[y,mo]=m.split("-");return new Date(y,parseInt(mo)-1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"});};
const monthStart=selMonth+"-01";
const lastDay=new Date(parseInt(selMonth.slice(0,4)),parseInt(selMonth.slice(5,7)),0).getDate();
const monthEnd=selMonth+"-"+String(lastDay).padStart(2,"0");
const monthExp=(exp||[]).filter(e=>e.date&&e.date>=monthStart&&e.date<=monthEnd);
const total=monthExp.reduce((s,e)=>s+e.amount,0);
const byCat={};
monthExp.forEach(e=>{if(!byCat[e.cat])byCat[e.cat]={cat:e.cat,total:0,items:[]};byCat[e.cat].total+=e.amount;byCat[e.cat].items.push(e);});
const catList=Object.values(byCat).sort((a,b)=>b.total-a.total);
const maxCat=catList[0]?.total||1;
const reset=function(){setStep(null);setSelCat(null);setAmount("");setDesc("");setShowNewCat(false);setNewCatInput("");};
const addNewCat=function(){
const t=newCatInput.trim();
if(!t)return;
if(!(ecats||[]).includes(t))setEc(function(prev){return[...(prev||[]),t];});
setSelCat(t);setShowNewCat(false);setNewCatInput("");setStep("amount");
};
const save=function(){
if(!selCat||!amount)return;
setExp(function(prev){return[{id:uid(),desc:desc||selCat,cat:selCat,amount:parseFloat(amount),date:tod()},...(prev||[])];});
reset();
};
return(
<div style={{maxWidth:680,margin:"0 auto",paddingBottom:80}}>
<div style={{padding:"16px 16px 12px",borderBottom:"0.5px solid "+T.border}}>
<button onClick={function(){setV("lurk");}} style={{background:"none",border:"none",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600,padding:0,marginBottom:10,display:"block"}}>Dashboard</button>
<h2 style={{margin:"0 0 12px",fontWeight:800,fontSize:22,color:T.text}}>Harcamalar</h2>
<div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
{months.map(m=>(
<button key={m} onClick={function(){setSelMonth(m);}} style={{padding:"7px 16px",border:"none",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",flexShrink:0,background:selMonth===m?T.accent:"rgba(255,255,255,0.06)",color:selMonth===m?"#fff":T.textSub}}>
{monthLabel(m)}
</button>
))}
</div>
</div>
<div style={{padding:"16px 16px 12px",borderBottom:"0.5px solid "+T.border}}>
<div style={{fontSize:10,color:T.textSub,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>Toplam — {monthLabel(selMonth)}</div>
<div style={{fontSize:32,fontWeight:800,color:T.danger,letterSpacing:-1}}>{fm(total,cur)}</div>
<div style={{fontSize:11,color:T.textDim,marginTop:2}}>{monthExp.length} kalem · {catList.length} kategori</div>
</div>
<div style={{padding:"16px"}}>
{catList.length===0
?<div style={{textAlign:"center",padding:"40px",color:T.textDim}}>Bu ay harcama yok</div>
:catList.map(function(c,i){
const pct=Math.round(c.total/total*100);
const barW=Math.round(c.total/maxCat*100);
const cc=catCol(c.cat);
const isOpen=expandedCat===c.cat;
return(
<div key={c.cat} style={{marginBottom:20}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
<div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
<div style={{width:10,height:10,borderRadius:"50%",background:cc,flexShrink:0}}/>
<span style={{fontSize:14,fontWeight:700,color:T.text}}>{c.cat}</span>
<span style={{fontSize:11,color:T.textDim}}>{c.items.length} kalem</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{textAlign:"right"}}>
<span style={{fontSize:15,fontWeight:800,color:cc}}>{fm(c.total,cur)}</span>
<span style={{fontSize:11,color:T.textDim,marginLeft:6}}>%{pct}</span>
</div>
<button onClick={function(){setExpandedCat(isOpen?null:c.cat);}} style={{width:28,height:28,borderRadius:"50%",border:"0.5px solid rgba(255,255,255,0.15)",background:isOpen?"rgba(255,255,255,0.1)":"transparent",cursor:"pointer",color:T.textSub,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
{isOpen?"▲":"▽"}
</button>
</div>
</div>
<div style={{height:10,background:"rgba(255,255,255,0.06)",borderRadius:5,overflow:"hidden",marginBottom:isOpen?10:0}}>
<div style={{height:"100%",width:barW+"%",background:cc,borderRadius:5}}/>
</div>
{isOpen&&(
<div style={{background:"rgba(255,255,255,0.03)",borderRadius:10,border:"0.5px solid rgba(255,255,255,0.08)",marginTop:6,overflow:"hidden"}}>
{c.items.sort((a,b)=>b.amount-a.amount).map(function(item,j){
return(
<div key={j} style={{padding:"11px 14px",borderBottom:j<c.items.length-1?"0.5px solid rgba(255,255,255,0.06)":"none"}}>
{editId===item.id
?<div style={{display:"flex",flexDirection:"column",gap:8}}>
<div style={{display:"flex",gap:8,alignItems:"center"}}>
<input type="number" value={editAmt} onChange={function(e){setEditAmt(e.target.value);}} style={{flex:1,background:T.bg3,border:"0.5px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"8px 12px",color:T.text,fontSize:15,fontWeight:700,outline:"none"}}/>
<button onClick={function(){setExp(function(prev){return prev.map(function(e){return e.id===item.id?{...e,amount:parseFloat(editAmt),cat:editCat,desc:editDesc||editCat}:e;});});setEditId(null);}} style={{padding:"8px 14px",background:T.accent,border:"none",borderRadius:8,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}}>✓</button>
<button onClick={function(){setEditId(null);}} style={{padding:"8px 10px",background:T.bg3,border:"none",borderRadius:8,color:T.textSub,fontSize:13,cursor:"pointer"}}>✕</button>
</div>
<input value={editDesc} onChange={function(e){setEditDesc(e.target.value);}} placeholder="Aciklama" style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"8px 12px",color:T.text,fontSize:13,outline:"none"}}/>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{(ecats||[]).map(function(cat,ci){return(
<button key={cat} onClick={function(){setEditCat(cat);}} style={{padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:editCat===cat?col(ci):"rgba(255,255,255,0.06)",color:editCat===cat?"#fff":T.textSub}}>{cat}</button>
);})}
</div>
</div>
:<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div>
<div style={{fontSize:13,fontWeight:600,color:T.text}}>{item.desc||item.cat}</div>
<div style={{fontSize:10,color:T.textDim,marginTop:1}}>{fd(item.date)}</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:14,fontWeight:700,color:cc}}>{fm(item.amount,cur)}</span>
<button onClick={function(){setEditId(item.id);setEditAmt(String(item.amount));setEditCat(item.cat);setEditDesc(item.desc||"");}} style={{background:"rgba(255,255,255,0.06)",border:"none",borderRadius:6,padding:"4px 8px",cursor:"pointer",color:T.textSub,fontSize:11}}>Duzenle</button>
<button onClick={function(){setDelId(item.id);}} style={{background:"none",border:"none",color:T.textDim,cursor:"pointer",fontSize:16,padding:"0 2px"}}>×</button>
</div>
</div>}
</div>
);})}
</div>
)}
</div>
);
})}
</div>
{step===null&&<button onClick={function(){setStep("cat");}} style={{position:"fixed",bottom:32,right:20,background:T.danger,border:"none",borderRadius:28,padding:"14px 24px",cursor:"pointer",color:"#fff",fontWeight:800,fontSize:15,boxShadow:"0 8px 24px rgba(255,59,48,0.45)",zIndex:50}}>+ Ekle</button>}
{step==="cat"&&(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:100,display:"flex",alignItems:"flex-end"}} onClick={function(e){if(e.target===e.currentTarget)reset();}}>
<div style={{background:"#1C1C1E",borderRadius:"20px 20px 0 0",width:"100%",padding:"20px 16px 36px",maxHeight:"80vh",overflowY:"auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
<div style={{fontWeight:800,fontSize:17,color:T.text}}>Kategori Sec</div>
<button onClick={reset} style={{background:T.bg3,border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",color:T.textSub,fontSize:17}}>×</button>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
{(ecats||[]).map(function(c,i){return(
<button key={c} onClick={function(){setSelCat(c);setStep("amount");}} style={{padding:"16px 14px",borderRadius:14,border:"1.5px solid "+col(i)+"44",background:col(i)+"11",cursor:"pointer",textAlign:"left"}}>
<div style={{width:10,height:10,borderRadius:"50%",background:col(i),marginBottom:8}}/>
<div style={{fontSize:13,fontWeight:700,color:T.text}}>{c}</div>
</button>
);})}
</div>
{!showNewCat
?<button onClick={function(){setShowNewCat(true);}} style={{width:"100%",padding:"13px",background:"transparent",border:"1px dashed rgba(255,255,255,0.2)",borderRadius:12,color:T.textSub,fontSize:14,fontWeight:600,cursor:"pointer"}}>+ Yeni Kategori</button>
:<div style={{display:"flex",gap:8}}>
<input autoFocus placeholder="Kategori adi..." value={newCatInput} onChange={function(e){setNewCatInput(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")addNewCat();}} style={{flex:1,background:T.bg3,border:"0.5px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"13px 14px",color:T.text,fontSize:15,outline:"none"}}/>
<button onClick={addNewCat} style={{padding:"13px 18px",background:T.accent,border:"none",borderRadius:12,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>Ekle</button>
</div>}
</div>
</div>
)}
{step==="amount"&&(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:100,display:"flex",alignItems:"flex-end"}} onClick={function(e){if(e.target===e.currentTarget)setStep("cat");}}>
<div style={{background:"#1C1C1E",borderRadius:"20px 20px 0 0",width:"100%",padding:"20px 16px 36px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
<button onClick={function(){setStep("cat");}} style={{background:T.bg3,border:"none",borderRadius:20,padding:"6px 14px",color:T.textSub,fontSize:14,cursor:"pointer",fontWeight:600}}>{selCat}</button>
<button onClick={reset} style={{background:T.bg3,border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",color:T.textSub,fontSize:17}}>×</button>
</div>
<div style={{textAlign:"center",padding:"16px 0 16px"}}>
<div style={{fontSize:11,color:T.textSub,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Tutar</div>
<input autoFocus type="number" placeholder="0" value={amount} onChange={function(e){setAmount(e.target.value);}} style={{background:"transparent",border:"none",borderBottom:"3px solid "+catCol(selCat),padding:"6px 0",color:T.text,fontSize:52,fontWeight:800,outline:"none",width:"100%",textAlign:"center",letterSpacing:-2}}/>
<div style={{fontSize:14,color:T.textSub,marginTop:8}}>TL</div>
</div>
<input placeholder="Aciklama (opsiyonel)" value={desc} onChange={function(e){setDesc(e.target.value);}} style={{background:T.bg3,border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:12,padding:"12px 14px",color:T.text,fontSize:15,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:16}}/>
<button onClick={save} disabled={!amount} style={{width:"100%",padding:"16px",background:amount?catCol(selCat):T.bg3,border:"none",borderRadius:14,color:amount?"#fff":T.textDim,fontSize:17,fontWeight:800,cursor:amount?"pointer":"not-allowed"}}>Ekle</button>
</div>
</div>
)}
{delId&&(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}}>
<div style={{background:"rgba(28,28,30,0.98)",backdropFilter:"blur(40px)",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:14,width:270,overflow:"hidden"}}>
<div style={{padding:"20px 16px 16px",textAlign:"center"}}>
<div style={{fontWeight:700,fontSize:17,color:T.text,marginBottom:8}}>Harcamayı Sil</div>
<div style={{fontSize:13,color:T.textSub}}>Bu islem geri alinamaz.</div>
</div>
<div style={{borderTop:"0.5px solid rgba(255,255,255,0.15)",display:"flex"}}>
<button onClick={function(){setDelId(null);}} style={{flex:1,padding:"14px 0",background:"transparent",border:"none",borderRight:"0.5px solid rgba(255,255,255,0.15)",color:T.text,fontWeight:400,fontSize:17,cursor:"pointer"}}>Iptal</button>
<button onClick={function(){setExp(function(prev){return prev.filter(function(e){return e.id!==delId;});});setDelId(null);}} style={{flex:1,padding:"14px 0",background:"transparent",border:"none",color:T.danger,fontWeight:700,fontSize:17,cursor:"pointer"}}>Sil</button>
</div>
</div>
</div>
)}
</div>
);}

function CustomersPageV({orders,cur,fm,fd,T,inp,setV}){
const now=new Date();
const[selMonth,setSelMonth]=useState(now.toISOString().slice(0,7));
const MERGED_GROUPS=[{key:"2026-06+07",label:"Haziran-Temmuz 2026",months:["2026-06","2026-07"]}];
const allMonths=[...new Set((orders||[]).filter(o=>o.g&&o.g.trim()&&o.g.trim()!=="--").map(o=>o.date?o.date.slice(0,7):"").filter(Boolean))].sort((a,b)=>b.localeCompare(a));
const mergedMonths=new Set(MERGED_GROUPS.flatMap(g=>g.months));
const singleMonths=allMonths.filter(m=>!mergedMonths.has(m));
const tabs=[
...MERGED_GROUPS.filter(g=>g.months.some(m=>allMonths.includes(m))),
...singleMonths.map(m=>{const[y,mo]=m.split("-");return{key:m,label:new Date(y,parseInt(mo)-1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"}),months:[m]};})
];
const[selKey,setSelKey]=useState(tabs[0]?.key||"");
const selTab=tabs.find(t=>t.key===selKey)||tabs[0];
const monthOrders=(orders||[]).filter(o=>{
if(!o.date||!o.g||!o.g.trim()||o.g.trim()==="--")return false;
const m=o.date.slice(0,7);
return selTab?.months.includes(m);
});
const custMap={};
monthOrders.forEach(o=>{
const name=o.g.trim().toUpperCase();
if(!custMap[name])custMap[name]={name,total:0,count:0,lastDate:"",pt:{cash:0,card:0}};
custMap[name].total+=o.total||0;
custMap[name].count+=1;
if(!custMap[name].lastDate||o.date>custMap[name].lastDate)custMap[name].lastDate=o.date;
if(o.pt&&custMap[name].pt[o.pt]!==undefined)custMap[name].pt[o.pt]=(custMap[name].pt[o.pt]||0)+(o.total||0);
});
const sorted=Object.values(custMap).sort((a,b)=>b.total-a.total);
const totalRev=monthOrders.reduce((s,o)=>s+(o.total||0),0);
return(
<div style={{padding:"0 0 80px",maxWidth:680,margin:"0 auto"}}>
<div style={{padding:"16px 16px 12px",borderBottom:"0.5px solid "+T.border}}>
<button onClick={()=>setV("lurk")} style={{background:"none",border:"none",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600,padding:0,marginBottom:10,display:"block"}}>Dashboard</button>
<h2 style={{margin:"0 0 12px",fontWeight:800,fontSize:22,color:T.text}}>Musteriler</h2>
<div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4}}>
{tabs.length===0&&<div style={{fontSize:12,color:T.textSub}}>Henuz isimli siparis yok.</div>}
{tabs.map(tab=>(
<button key={tab.key} onClick={()=>setSelKey(tab.key)} style={{padding:"7px 16px",border:"none",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",flexShrink:0,background:selKey===tab.key?T.accent:"rgba(255,255,255,0.06)",color:selKey===tab.key?"#fff":T.textSub}}>
{tab.label}
</button>
))}
</div>
</div>
{sorted.length>0&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,padding:"12px 16px",borderBottom:"0.5px solid "+T.border}}>
<div style={{background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.08)"}}>
<div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>Toplam Ciro</div>
<div style={{fontSize:20,fontWeight:800,color:T.text}}>{fm(totalRev,cur)}</div>
</div>
<div style={{background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.08)"}}>
<div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>Musteri</div>
<div style={{fontSize:20,fontWeight:800,color:T.text}}>{sorted.length} kisi</div>
</div>
</div>}
{sorted.length===0
?<div style={{textAlign:"center",padding:"60px 20px",color:T.textDim}}>
<div style={{fontSize:32,marginBottom:10}}>👤</div>
<div style={{fontSize:14,fontWeight:600,color:T.textSub}}>{selTab?.label} icin isimli siparis yok</div>
</div>
:<div>
{sorted.map((c,i)=>(
<div key={c.name} style={{padding:"14px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",alignItems:"center",background:i===0?"rgba(52,199,89,0.06)":"transparent"}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{width:32,height:32,borderRadius:"50%",background:i===0?"rgba(52,199,89,0.2)":"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:i===0?T.accent:T.textSub,flexShrink:0}}>{i+1}</div>
<div>
<div style={{fontWeight:700,fontSize:14,color:T.text}}>{c.name}</div>
<div style={{fontSize:11,color:T.textSub,marginTop:2}}>{c.count} siparis · Son: {fd(c.lastDate)}</div>
{(c.pt.cash>0||c.pt.card>0)&&<div style={{fontSize:10,color:T.textDim,marginTop:1}}>
{c.pt.cash>0?"Nakit: "+fm(c.pt.cash,cur)+" ":""}
{c.pt.card>0?"Kart: "+fm(c.pt.card,cur):""}
</div>}
</div>
</div>
<div style={{textAlign:"right",flexShrink:0}}>
<div style={{fontSize:18,fontWeight:800,color:i===0?T.accent:T.text}}>{fm(c.total,cur)}</div>
<div style={{fontSize:10,color:T.textSub,marginTop:2}}>%{totalRev>0?Math.round(c.total/totalRev*100):0}</div>
</div>
</div>
))}
</div>}
</div>
);}

function CustomersV({orders,custList,cur,fm,fd,T,inp}){
const[selCust,setSelCust]=useState(null);
const[sortBy,setSortBy]=useState("total");
const[search,setSearch]=useState("");

const sorted=[...custList]
  .filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase()))
  .sort((a,b)=>sortBy==="total"?b.total-a.total:sortBy==="visits"?b.visits-a.visits:b.avgOrder-a.avgOrder);

const months=(cust)=>Object.entries(cust.months).sort((a,b)=>b[0].localeCompare(a[0]));
const monthName=(m)=>{const[y,mo]=m.split("-");const n=["","Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];return n[parseInt(mo)]+" "+y;};
const topItem=(cust)=>{const e=Object.entries(cust.items||{}).sort((a,b)=>b[1]-a[1]);return e[0]?e[0][0]:null;};
const maxTotal=sorted.length>0?sorted[0].total:1;

if(selCust){
  const cust=custList.find(c=>c.name===selCust);
  if(!cust)return null;
  const custOrders=(orders||[]).filter(o=>o.g===cust.name).sort((a,b)=>b.date.localeCompare(a.date));
  return(
  <div>
  <button onClick={()=>setSelCust(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:20,padding:0}}>← Tüm Müşteriler</button>
  <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
  <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(245,158,11,0.15)",border:"2px solid rgba(245,158,11,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#F59E0B",textAlign:"center",padding:"0 4px",lineHeight:1.2}}>{cust.name.split(" ")[0]}</div>
  <div><div style={{fontSize:22,fontWeight:800,color:T.text}}>{cust.name}</div><div style={{fontSize:12,color:T.textSub,marginTop:2}}>İlk ziyaret: {fd(Object.keys(cust.months||{}).sort()[0]?.slice(0,7)+"-01"||"")}</div></div>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
  <div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:"16px 18px"}}>
  <div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Toplam Harcama</div>
  <div style={{fontSize:20,fontWeight:800,color:"#F59E0B"}}>{fm(cust.total,cur)}</div>
  </div>
  <div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:"16px 18px"}}>
  <div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Ziyaret</div>
  <div style={{fontSize:20,fontWeight:800,color:T.text}}>{cust.visits} gün</div>
  <div style={{fontSize:11,color:T.textSub}}>{cust.count} adisyon</div>
  </div>
  <div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:"16px 18px"}}>
  <div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Ort. Adisyon</div>
  <div style={{fontSize:20,fontWeight:800,color:T.text}}>{fm(Math.round(cust.avgOrder),cur)}</div>
  </div>
  </div>
  {Object.keys(cust.items||{}).length>0&&<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:"18px 20px",marginBottom:16}}>
  <div style={{fontSize:12,fontWeight:700,color:T.textSub,marginBottom:14,textTransform:"uppercase",letterSpacing:0.5}}>En Çok Sipariş Ettiği</div>
  <div style={{display:"flex",flexDirection:"column",gap:8}}>
  {Object.entries(cust.items).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([name,qty])=>(
  <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
  <span style={{fontSize:13,color:T.text}}>{name}</span>
  <span style={{fontSize:13,fontWeight:700,color:"#F59E0B"}}>{qty} adet</span>
  </div>
  ))}
  </div>
  </div>}
  <div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:"18px 20px",marginBottom:16}}>
  <div style={{fontSize:12,fontWeight:700,color:T.textSub,marginBottom:14,textTransform:"uppercase",letterSpacing:0.5}}>Aylık Harcama</div>
  {months(cust).map(([m,val])=>(
  <div key={m} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"0.5px solid "+T.border}}>
  <span style={{fontSize:13,color:T.text}}>{monthName(m)}</span>
  <span style={{fontSize:14,fontWeight:700,color:"#F59E0B"}}>{fm(val,cur)}</span>
  </div>
  ))}
  </div>
  <div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:"18px 20px"}}>
  <div style={{fontSize:12,fontWeight:700,color:T.textSub,marginBottom:14,textTransform:"uppercase",letterSpacing:0.5}}>Son Adisyonlar</div>
  {custOrders.slice(0,10).map(o=>(
  <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"0.5px solid "+T.border}}>
  <div><div style={{fontSize:13,color:T.text}}>{fd(o.date)} · {o.tn}</div><div style={{fontSize:11,color:T.textSub}}>{(o.items||[]).map(i=>i.name).join(", ").slice(0,40)}</div></div>
  <span style={{fontSize:14,fontWeight:700,color:T.text,marginLeft:12}}>{fm(o.total,cur)}</span>
  </div>
  ))}
  </div>
  </div>
  );
}

return(
<div>
{custList.length===0?(
<div style={{textAlign:"center",padding:"60px 0",color:T.textDim}}>
<div style={{fontSize:32,marginBottom:10}}>👥</div>
<div style={{fontSize:14}}>Henüz isimli müşteri kaydı yok.</div>
<div style={{fontSize:12,color:T.textDim,marginTop:6}}>Adisyon kapatırken müşteri adı girilirse burada görünür.</div>
</div>
):(
<>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
<div style={{background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.25)",borderRadius:12,padding:"14px 16px"}}>
<div style={{fontSize:10,color:"#F59E0B",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Müşteri Sayısı</div>
<div style={{fontSize:24,fontWeight:800,color:"#F59E0B"}}>{custList.length}</div>
</div>
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:"14px 16px"}}>
<div style={{fontSize:10,color:T.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Toplam Harcama</div>
<div style={{fontSize:18,fontWeight:800,color:T.text}}>{fm(custList.reduce((s,c)=>s+c.total,0),cur)}</div>
</div>
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:"14px 16px"}}>
<div style={{fontSize:10,color:T.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Ort. Harcama</div>
<div style={{fontSize:18,fontWeight:800,color:T.text}}>{fm(Math.round(custList.reduce((s,c)=>s+c.total,0)/custList.length),cur)}</div>
</div>
</div>
<div style={{display:"flex",gap:8,marginBottom:16}}>
<input placeholder="Müşteri ara..." value={search} onChange={e=>setSearch(e.target.value)} style={{...inp,flex:1}}/>
<div style={{display:"flex",gap:6}}>
{[{k:"total",l:"Harcama"},{k:"visits",l:"Ziyaret"},{k:"avgOrder",l:"Ort."}].map(({k,l})=>(
<button key={k} onClick={()=>setSortBy(k)} style={{padding:"8px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:sortBy===k?"#F59E0B":T.bg3,color:sortBy===k?"#000":T.textSub,whiteSpace:"nowrap"}}>{l}</button>
))}
</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{sorted.map((c,i)=>{
const barPct=maxTotal>0?c.total/maxTotal*100:0;
const top=topItem(c);
return(
<button key={c.name} onClick={()=>setSelCust(c.name)} style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:14,padding:"14px 16px",cursor:"pointer",textAlign:"left",width:"100%",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",bottom:0,left:0,height:2,width:barPct+"%",background:"rgba(245,158,11,0.4)",borderRadius:"0 2px 0 0"}}/>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{width:36,height:36,borderRadius:"50%",background:"rgba(245,158,11,0.12)",border:"1.5px solid rgba(245,158,11,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#F59E0B",flexShrink:0}}>{c.name.split(" ")[0]}</div>
<div>
<div style={{fontSize:14,fontWeight:700,color:T.text}}>{c.name}</div>
<div style={{fontSize:11,color:T.textSub,marginTop:2}}>{c.visits} gün · {c.count} adisyon{top?" · ☕ "+top:""}</div>
</div>
</div>
<div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
<div style={{fontSize:13,fontWeight:800,color:"#F59E0B"}}>{fm(c.total,cur)}</div>
<div style={{fontSize:11,color:T.textSub,marginTop:1}}>ort. {fm(Math.round(c.avgOrder),cur)}</div>
</div>
</div>
</button>
);})}
</div>
</>
)}
</div>
);
}

function CariInReportsV({cari,setCari,cur,fm,fd,ft,T,sb,inp,tables,setTbl,uid,tod}){
const[selC,setSelC]=useState(null);
const[stT,setStT]=useState(null);
const[delC,setDelC]=useState(null);
const[showManual,setShowManual]=useState(false);
const[manualForm,setManualForm]=useState({name:"",amount:"",note:""});
const[partialInstForm,setPartialInstForm]=useState(null);
const[tablePickFor,setTablePickFor]=useState(null); // cari id için masa seçici

const activeTables=(tables||[]).filter(t=>t.s==="o");

const addCariToTable=(cariId,tableId)=>{
const c=(cari||[]).find(x=>x.id===cariId);
if(!c)return;
setTbl(prev=>prev.map(t=>{
if(t.id!==tableId)return t;
const newItems=c.items&&c.items.length>0?c.items:[{id:"cari_"+cariId,name:c.g+" (Cari)",qty:1,price:c.total,cat:"Cari"}];
const existingOrder=[...t.order];
newItems.forEach(item=>{
const ex=existingOrder.findIndex(o=>o.id===item.id);
if(ex>=0)existingOrder[ex]={...existingOrder[ex],qty:existingOrder[ex].qty+item.qty};
else existingOrder.push({...item,id:item.id||(uid?uid():"cari_"+Date.now())});
});
return{...t,order:existingOrder,s:"o",g:c.g||t.g};
}));
setCari(prev=>prev.filter(x=>x.id!==cariId));
setTablePickFor(null);
};

const open=(cari||[]).filter(c=>!c.settled);
const closed=(cari||[]).filter(c=>c.settled);
const openT=open.reduce((s,c)=>s+c.total,0);

const settle=(id,pt,discAmt)=>{setCari(prev=>prev.map(c=>c.id===id?{...c,settled:true,sAt:new Date().toISOString(),sPt:pt,settleDisc:discAmt||0}:c));setSelC(null);setStT(null);};
const partialPay=(id,amount,pt)=>{setCari(prev=>prev.map(c=>{if(c.id!==id)return c;const newTotal=Math.max(0,c.total-amount);const payment={id:Date.now()+Math.random(),amount,pt,date:new Date().toISOString()};const newPayments=[...(c.payments||[]),payment];if(newTotal<=0)return{...c,total:0,settled:true,sAt:new Date().toISOString(),sPt:pt,payments:newPayments};return{...c,total:newTotal,payments:newPayments};}));setSelC(null);setStT(null);};
const del=(id)=>{setCari(prev=>prev.filter(c=>c.id!==id));setDelC(null);};
const addManualCari=()=>{if(!manualForm.name.trim()||!manualForm.amount)return;const amt=parseFloat(manualForm.amount)||0;const now=new Date().toISOString();setCari(prev=>[{id:Date.now()+Math.random(),g:manualForm.name.trim(),tbl:"Manuel",items:manualForm.note?[{name:manualForm.note,qty:1,price:amt}]:[],sub:amt,da:0,total:amt,oa:now,cAt:now,date:now.split("T")[0],settled:false},...prev]);setManualForm({name:"",amount:"",note:""});setShowManual(false);};

return(<div style={{paddingTop:8}}>
{tablePickFor&&activeTables.length===0&&setTablePickFor(null)}
{selC&&<SettleModal selC={selC} cur={cur} fm={fm} ft={ft} T={T} sb={sb} stT={stT} setStT={setStT} setSelC={setSelC} settle={settle} partialPay={partialPay}/>}
{delC&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:"rgba(22,22,22,0.98)",backdropFilter:"blur(20px)",borderRadius:16,padding:24,width:320}}><div style={{fontWeight:700,fontSize:15,color:T.danger,marginBottom:10}}>Cari Hesabı Sil</div><p style={{fontSize:13,color:T.textSub,margin:"0 0 16px"}}>Kalıcı olarak silinecek.</p><div style={{display:"flex",gap:8}}><button onClick={()=>setDelC(null)} style={{...sb(T.bg3),flex:1,color:T.text}}>İptal</button><button onClick={()=>del(delC)} style={{...sb(T.danger),flex:1}}>Sil</button></div></div></div>}

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
<div style={{background:"rgba(175,82,222,0.1)",border:"1px solid rgba(175,82,222,0.3)",borderRadius:12,padding:"12px 16px",flex:1,marginRight:12}}>
<div style={{fontSize:11,color:"#AF52DE",marginBottom:2}}>Açık Cari Toplam</div>
<div style={{fontSize:22,fontWeight:800,color:"#AF52DE"}}>{fm(openT,cur)}</div>
<div style={{fontSize:11,color:T.textSub,marginTop:2}}>{open.length} açık hesap</div>
</div>
<button onClick={()=>setShowManual(p=>!p)} style={{...sb("rgba(175,82,222,0.15)"),color:"#AF52DE",border:"1px solid rgba(175,82,222,0.3)"}}>+ Manuel Ekle</button>
</div>

{showManual&&<div style={{background:"rgba(175,82,222,0.08)",border:"1px solid rgba(175,82,222,0.3)",borderRadius:12,padding:16,marginBottom:16}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
<div><label style={{display:"block",fontSize:11,color:"#AF52DE",fontWeight:600,marginBottom:4}}>İsim</label><input autoFocus placeholder="Örn: Ahmet Yılmaz" value={manualForm.name} onChange={e=>setManualForm(p=>({...p,name:e.target.value}))} style={inp}/></div>
<div><label style={{display:"block",fontSize:11,color:"#AF52DE",fontWeight:600,marginBottom:4}}>Bakiye ({cur})</label><input type="number" placeholder="0" value={manualForm.amount} onChange={e=>setManualForm(p=>({...p,amount:e.target.value}))} style={inp}/></div>
</div>
<input placeholder="Not (opsiyonel)" value={manualForm.note} onChange={e=>setManualForm(p=>({...p,note:e.target.value}))} style={{...inp,marginBottom:10}}/>
<button onClick={addManualCari} style={{...sb("#AF52DE")}}>Ekle</button>
</div>}

{open.length===0?<div style={{textAlign:"center",padding:"30px 0",color:T.textDim,background:T.bg2,borderRadius:12,marginBottom:16}}>Açık cari hesap yok.</div>
:<div style={{marginBottom:20}}>{open.map(c=>(<div key={c.id} style={{background:T.isDark?"#1a1a1a":T.bg2,backdropFilter:"blur(16px)",border:"1.5px solid rgba(175,82,222,0.25)",borderRadius:12,padding:"14px 16px",marginBottom:10}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
<div><div style={{fontWeight:700,fontSize:15}}>{c.g||"İsimsiz"}</div><div style={{fontSize:11,color:T.textSub,marginTop:2}}>{fd(c.date)} · {c.tbl}</div></div>
<div style={{fontWeight:800,fontSize:18,color:"#AF52DE"}}>{fm(c.total,cur)}</div>
</div>
{(c.payments||[]).length>0&&<div style={{fontSize:11,color:"#34C759",marginBottom:8}}>↓ {c.payments.length} kısmi ödeme yapıldı</div>}
<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
<button onClick={()=>{setSelC(c);setStT(null);}} style={{...sb("rgba(175,82,222,0.15)"),flex:2,color:"#AF52DE",border:"1px solid rgba(175,82,222,0.3)",fontSize:12}}>Tahsil Et</button>
{activeTables.length>0&&<button onClick={()=>setTablePickFor(tablePickFor===c.id?null:c.id)} style={{...sb("rgba(0,122,255,0.1)"),color:"#3A9EFF",border:"1px solid rgba(0,122,255,0.25)",fontSize:12}}>🪑 Masaya Ekle</button>}
<button onClick={()=>setDelC(c.id)} style={{...sb("rgba(255,59,48,0.1)"),color:T.danger,border:"1px solid rgba(255,59,48,0.2)",fontSize:12}}>Sil</button>
</div>
{tablePickFor===c.id&&<div style={{marginTop:8,padding:10,background:T.bg3,borderRadius:10,border:"0.5px solid "+T.border}}>
<div style={{fontSize:11,color:T.textSub,marginBottom:8,fontWeight:600}}>Hangi masaya eklensin?</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{activeTables.map(t=><button key={t.id} onClick={()=>addCariToTable(c.id,t.id)} style={{...sb(T.accent),fontSize:12,padding:"6px 14px"}}>{t.lbl}{t.g?" - "+t.g:""}</button>)}
</div>
</div>}
</div>))}
</div>}

{closed.length>0&&<div>
<div style={{fontWeight:700,fontSize:13,color:T.textSub,marginBottom:10}}>Tahsil Edilenler ({closed.length})</div>
{closed.map(c=><div key={c.id} style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderRadius:10,background:T.bg3,marginBottom:6}}>
<div><div style={{fontSize:13,fontWeight:600,color:T.textSub,textDecoration:"line-through"}}>{c.g||"İsimsiz"}</div><div style={{fontSize:11,color:T.textDim}}>{c.sAt?fd(c.sAt):""}</div></div>
<div style={{fontSize:13,fontWeight:700,color:"#34C759"}}>{fm(c.total,cur)}</div>
</div>)}
</div>}
</div>);}
