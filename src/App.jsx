import { useState, useEffect, useRef } from "react";

const OLIVE={bg:"#E8E5DC",bg2:"#3D3D35",bg3:"#2A2A24",border:"rgba(0,0,0,0.1)",border2:"rgba(0,0,0,0.15)",accent:"#D4B83A",accentL:"#B89E2A",accentD:"#A08820",accentXL:"#E8CC4A",text:"#1A1A16",textSub:"#8A8A7A",textDim:"#AEAE9E",success:"#4A8A5A",danger:"#C43A2A",warn:"#C4882A",shadow:"0 2px 12px rgba(0,0,0,0.12)",shadowM:"0 8px 32px rgba(0,0,0,0.2)",glass:"rgba(255,255,255,0.1)",isDark:false};
// Stacked card shades — giderek koyulaşan
const SHADES=["#4A4A3F","#3D3D35","#35352D","#2E2E26","#282820","#23231D","#1E1E19","#1A1A16"];
const DARK=OLIVE;
const LIGHT=OLIVE;
const T=OLIVE;



const MENU=[
{id:101,name:"sigaralık filtre",price:50,cat:"Kahve",on:true},{id:102,name:"filtre kahve",price:140,cat:"Kahve",on:true},{id:103,name:"americano",price:150,cat:"Kahve",on:true},{id:104,name:"latte",price:180,cat:"Kahve",on:true},{id:105,name:"salted caramel latte",price:250,cat:"Kahve",on:true},{id:106,name:"cortado",price:150,cat:"Kahve",on:true},{id:107,name:"flatwhite",price:170,cat:"Kahve",on:true},{id:108,name:"süt reçelli latte",price:250,cat:"Kahve",on:true},{id:109,name:"mocha",price:230,cat:"Kahve",on:true},{id:110,name:"vanilya latte",price:200,cat:"Kahve",on:true},{id:111,name:"kış lattesi",price:200,cat:"Kahve",on:true},{id:112,name:"v60",price:220,cat:"Kahve",on:true},{id:113,name:"espresso",price:140,cat:"Kahve",on:true},{id:114,name:"cappuccino",price:180,cat:"Kahve",on:true},
{id:201,name:"matcha latte",price:230,cat:"Matcha",on:true},{id:202,name:"strawberry matcha",price:260,cat:"Matcha",on:true},{id:203,name:"berry matcha latte",price:260,cat:"Matcha",on:true},{id:204,name:"vanilla matcha latte",price:250,cat:"Matcha",on:true},{id:205,name:"apple & ginger matcha",price:260,cat:"Matcha",on:true},{id:206,name:"cremebrulee matcha",price:250,cat:"Matcha",on:true},{id:207,name:"mevsim meyveli matcha",price:260,cat:"Matcha",on:true},
{id:301,name:"siyah çay",price:50,cat:"Cay",on:true},{id:302,name:"bitki çayı",price:150,cat:"Cay",on:true},{id:303,name:"ice tea",price:200,cat:"Cay",on:true},
{id:401,name:"muhammara sandviç",price:330,cat:"Sandviç",on:true},{id:402,name:"renç sandviç",price:330,cat:"Sandviç",on:true},{id:403,name:"pesto sandviç",price:300,cat:"Sandviç",on:true},{id:404,name:"ton balığı sandviç",price:300,cat:"Sandviç",on:true},
{id:501,name:"tiramisu",price:290,cat:"Tatlı",on:true},{id:502,name:"soft cookie",price:175,cat:"Tatlı",on:true},
{id:601,name:"+vegan süt",price:50,cat:"Ekstra",on:true},{id:602,name:"sıcak çikolata",price:200,cat:"Ekstra",on:true},{id:603,name:"sahlep",price:150,cat:"Ekstra",on:true},{id:604,name:"soda",price:90,cat:"Ekstra",on:true},{id:605,name:"baileys matcha",price:300,cat:"Ekstra",on:true},{id:606,name:"servis",price:200,cat:"Ekstra",on:true},{id:607,name:"oralet",price:50,cat:"Ekstra",on:true},{id:608,name:"Clap",price:250,cat:"Ekstra",on:true},{id:609,name:"Churchill",price:120,cat:"Ekstra",on:true},
];

const OLD_LOGS=[]; // Supabase'e taşındı
const DS={name:"Restoran",tableCount:10,cur:"TL",requireName:false,sitePassword:"",recoveryQ:"",recoveryA:"",monthlyGoal:0,weeklyGoal:0,hiddenPlatforms:[]};
const DEC=["Malzeme","Kira","Personel","Fatura","Diğer"];
const PO=[{k:"cash",l:"Nakit",c:"#C4882A",bg:"rgba(196,136,42,0.1)",bd:"rgba(255,149,0,0.3)"},{k:"card",l:"Kart",c:"#007AFF",bg:"rgba(90,122,90,0.15)",bd:"rgba(0,122,255,0.3)"},{k:"credit",l:"Cari",c:"#D4B83A",bg:"rgba(212,184,58,0.15)",bd:"rgba(212,184,58,0.3)"}];
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
const[darkMode,setDarkMode]=useState(false);
const T=OLIVE;
// iOS zoom fix: font-size 16px on all inputs
if(typeof document!=="undefined"){
  let styleEl=document.getElementById("nicchia-input-fix");
  if(!styleEl){styleEl=document.createElement("style");styleEl.id="nicchia-input-fix";document.head.appendChild(styleEl);}
  styleEl.textContent="input,select,textarea{font-size:16px!important;}";
}
const inp={background:"rgba(255,255,255,0.5)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",border:"0.5px solid "+T.border2,borderRadius:10,padding:"10px 14px",color:T.text,fontSize:16,outline:"none",width:"100%",boxSizing:"border-box",boxShadow:"0 1px 2px rgba(0,0,0,0.06) inset"};
const sb=(bg,col)=>({background:bg,border:"none",color:col||"#1A1A16",borderRadius:10,padding:"10px 18px",fontWeight:600,fontSize:13,cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"});
const NAV=[{k:"lurk",l:"Dashboard"},{k:"home",l:"Bugün"},{k:"tables",l:"Masalar"},{k:"installments",l:"Vadeler"},{k:"credit",l:"Cari"},{k:"settings",l:"Ayarlar"}];
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

useEffect(()=>{(async()=>{
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
    const gm={};dayOrders.forEach(ord=>{const g=ord.g||"--";if(!gm[g])gm[g]={name:g,count:0,total:0,orders:[]};gm[g].count++;gm[g].total+=ord.total;gm[g].orders.push({id:ord.id,tbl:ord.tn,total:ord.total,pt:ord.pt,items:ord.items});});
    return{id:uid(),date,oa:date+"T09:00:00.000Z",ca:date+"T23:59:59.000Z",inc,exp:0,net:inc,cash,card,count:dayOrders.length,items:Object.values(im).sort((a,b)=>b.qty-a.qty),guests:Object.values(gm).sort((a,b)=>b.total-a.total),exps:[]};
  });
  const merged=[...(l||[]),...newLogs].sort((a,b)=>b.date.localeCompare(a.date));
  setLogs(merged);
  sv("lurk_l",merged);
  console.log("Auto-logged missing days:",Object.keys(ordersByDate));
}

setOk(true);
// Bir sonraki render'da save'lere izin ver
requestAnimationFrame(()=>requestAnimationFrame(()=>{loadedRef.current=true;}));
try{
const savedAuth=localStorage.getItem("lurk_auth");
const cfAuth=cf.sitePassword;
if(!cfAuth||savedAuth===cfAuth){setAuthed(true);}
}catch{setAuthed(true);}
setAuthChecked(true);
})();},[]);

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
const im={};to.forEach(o=>o.items.forEach(it=>{if(!im[it.name])im[it.name]={name:it.name,cat:it.cat||"",qty:0,total:0,price:it.price};im[it.name].qty+=it.qty;im[it.name].total+=it.price*it.qty;}));
const gm={};to.forEach(o=>{const g=o.g||"--";if(!gm[g])gm[g]={name:g,count:0,total:0,orders:[]};gm[g].count++;gm[g].total+=o.total;gm[g].orders.push({id:o.id,tbl:o.tn,total:o.total,pt:o.pt,items:o.items});});
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
const im={};to.forEach(o=>o.items.forEach(it=>{if(!im[it.name])im[it.name]={name:it.name,cat:it.cat||"",qty:0,total:0,price:it.price};im[it.name].qty+=it.qty;im[it.name].total+=it.price*it.qty;}));
const gm={};to.forEach(o=>{const g=o.g||"--";if(!gm[g])gm[g]={name:g,count:0,total:0,orders:[]};gm[g].count++;gm[g].total+=o.total;gm[g].orders.push({id:o.id,tbl:o.tn,total:o.total,pt:o.pt,items:o.items});});
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
setTbl(prev=>prev.map(t=>t.id===id?{...t,s:"o",oa:t.oa||new Date().toISOString(),g:g||t.g}:t));setSel(id);setCat(firstCat);setDisc(null);setPay(false);setGM(null);setV("order");};
const addItem=(tid,item)=>{setTbl(prev=>prev.map(t=>{if(t.id!==tid)return t;const ex=t.order.find(o=>o.id===item.id);const order=ex?t.order.map(o=>o.id===item.id?{...o,qty:o.qty+1}:o):[...t.order,{...item,qty:1}];return{...t,order,s:"o",oa:t.oa||new Date().toISOString()};}));};
const chQ=(tid,iid,d)=>{setTbl(prev=>prev.map(t=>{if(t.id!==tid)return t;const newOrder=t.order.map(o=>o.id===iid?{...o,qty:o.qty+d}:o).filter(o=>o.qty>0);return{...t,order:newOrder};}).filter(t=>t.id!==tid||t.order.length>0));};
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
setOrd(prev=>[{id:uid(),tId:t.id,tn:t.lbl,g:spGuest,items:sp.items,sub:sp.sub,da:sp.da||0,total:sp.total,pt:sp.pt,oa:t.oa,ca:new Date().toISOString(),date:tod()},...prev]);
});
if(creditSplits.length>0){
creditSplits.forEach(sp=>{
const spGuest=sp.cariName||g;
setOrd(prev=>[{id:uid(),tId:t.id,tn:t.lbl,g:spGuest,items:sp.items,sub:sp.sub,da:sp.da||0,total:sp.total,pt:sp.pt,oa:t.oa,ca:new Date().toISOString(),date:tod()},...prev]);
});
setCari(prev=>{
let next=[...prev];
creditSplits.forEach(sp=>{
const spGuest=sp.cariName||g;
const newAdisyon={id:uid(),tbl:t.lbl,items:sp.items,sub:sp.sub,da:sp.da||0,total:sp.total,oa:t.oa,ca:new Date().toISOString(),date:tod()};
const idx=next.findIndex(c=>!c.settled&&c.g.toLowerCase()===spGuest.toLowerCase());
if(idx>=0){
next=next.map((c,i)=>i===idx?{...c,adisyonlar:[...(c.adisyonlar||[{id:c.id+"_0",tbl:c.tbl,items:c.items,sub:c.sub,da:c.da||0,total:c.total,oa:c.oa,ca:c.cAt,date:c.date}]),newAdisyon],total:c.total+sp.total}:c);
}else{
next=[{id:uid(),g:spGuest,adisyonlar:[newAdisyon],items:sp.items,sub:sp.sub,da:sp.da||0,total:sp.total,tbl:t.lbl,oa:t.oa,cAt:new Date().toISOString(),date:tod(),settled:false,sAt:null,sPt:null},...next];
}
});
return next;
});
}
// Kısmi ödeme: ürün bazlı ise ödenen ürünleri masadan çıkar
if(!closeTable){
const paidItemNames=splits.flatMap(sp=>sp.items.map(i=>i.name+"_"+i.qty));
const paidMap={};
splits.flatMap(sp=>sp.items).forEach(it=>{
if(!paidMap[it.name])paidMap[it.name]=0;
paidMap[it.name]+=it.qty;
});
setTbl(prev=>prev.map(t2=>{
if(t2.id!==sel)return t2;
const remaining=t2.order.map(o=>{
const paid=paidMap[o.name]||0;
if(paid>=o.qty)return null;
return{...o,qty:o.qty-paid};
}).filter(Boolean);
if(remaining.length===0)return null;
return{...t2,order:remaining};
}).filter(Boolean));
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
const aMenü=menu.filter(m=>m.on);
const oCats=Array.from(new Set(aMenü.map(m=>m.cat)));
const fMenü=aMenü.filter(m=>m.cat===cat);
const curT=tables.find(t=>t.id===sel);
const go=(k)=>{setV(k);setSel(null);setSelLog(null);};
const achievements=buildBadges({logs,orders,cari,installments,cur:cfg.cur||"TL",fm});

if(!ok||!authChecked)return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg}}>Yükleniyor...</div>;

if(!authed)return <LoginV cfg={cfg} setCfg={setCfg} setAuthed={setAuthed} T={T}/>;

return(
<div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display',Inter,'Helvetica Neue',Helvetica,Arial,sans-serif",background:"#E8E5DC",minHeight:"100vh",color:T.text,position:"relative"}}>
{<>
<div style={{position:"fixed",top:"-5%",left:"-10%",width:"50vw",height:"50vw",maxWidth:500,maxHeight:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,184,58,0.12) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
<div style={{position:"fixed",top:"35%",right:"-8%",width:"40vw",height:"40vw",maxWidth:400,maxHeight:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(100,100,80,0.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
<div style={{position:"fixed",bottom:"5%",left:"20%",width:"45vw",height:"45vw",maxWidth:450,maxHeight:450,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,184,58,0.07) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
</>}

{toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:toast.t==="ok"?"rgba(74,138,90,0.12)":"#FDEFED",color:toast.t==="ok"?T.success:T.danger,border:"1px solid "+(toast.t==="ok"?"#8FE3A8":"rgba(255,59,48,0.3)"),padding:"10px 20px",borderRadius:20,fontWeight:600,fontSize:13,whiteSpace:"nowrap"}}>{toast.m}</div>}

{/* Mobile drawer overlay */}
{drawerOpen&&<div onClick={()=>setDrawerOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.3)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",zIndex:200}}/>}

{/* Mobile drawer */}
<div style={{position:"fixed",top:0,left:0,bottom:0,width:280,zIndex:300,transform:drawerOpen?"translateX(0)":"translateX(-100%)",transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)",background:"rgba(232,229,220,0.98)",backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",borderRight:"0.5px solid "+T.border,boxShadow:"4px 0 32px rgba(0,0,0,0.12)",display:"flex",flexDirection:"column",padding:"0 0 32px"}}>
<div style={{padding:"56px 20px 20px",borderBottom:"0.5px solid "+T.border}}>
<div style={{fontSize:28,fontWeight:800,letterSpacing:-0.5,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",marginBottom:6,color:T.text}}>LURK.</div>
{day?<div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(74,138,90,0.12)",borderRadius:20,padding:"4px 10px 4px 8px",width:"fit-content"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.success,display:"inline-block"}}/><span style={{fontSize:12,color:T.success,fontWeight:600}}>AÇIK {ft(day.oa)}</span></div>
:<div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(196,58,42,0.1)",borderRadius:20,padding:"4px 10px 4px 8px",width:"fit-content"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.danger,display:"inline-block"}}/><span style={{fontSize:12,color:T.danger,fontWeight:600}}>KAPALI</span></div>}
</div>
<div style={{flex:1,overflowY:"auto",padding:"12px 12px"}}>
{NAV.map(({k,l})=><button key={k} onClick={()=>{go(k);setDrawerOpen(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,border:"none",cursor:"pointer",background:view===k?T.bg3:"transparent",color:view===k?T.text:T.textSub,fontWeight:view===k?700:500,fontSize:13,marginBottom:4,textAlign:"left",boxShadow:"none",letterSpacing:0.5}}>{k==="lurk"?"DASHBOARD":k==="tables"?"MASALAR":k==="home"?"BUGÜN":k==="settings"?"AYARLAR":k==="installments"?"VADELER":k==="credit"?"CARİ":l.toUpperCase()}</button>)}
<button onClick={()=>{go("notifications");setDrawerOpen(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,border:"none",cursor:"pointer",background:view==="notifications"?T.bg3:"transparent",color:view==="notifications"?T.text:T.textSub,fontWeight:view==="notifications"?700:500,fontSize:13,marginBottom:4,textAlign:"left"}}>
BİLDİRİMLER
{notifications.filter(n=>!n.read).length>0&&<span style={{background:"#C43A2A",color:T.text,borderRadius:10,padding:"2px 7px",fontSize:11,fontWeight:700,marginLeft:"auto"}}>{notifications.filter(n=>!n.read).length}</span>}
</button>
</div>
</div>

<nav style={{background:"rgba(232,229,220,0.95)",backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",borderBottom:"1px solid rgba(0,0,0,0.08)",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,position:"sticky",top:0,zIndex:100}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
{isMobile&&<button onClick={()=>setDrawerOpen(p=>!p)} style={{width:36,height:36,borderRadius:10,border:"none",background:"rgba(118,118,128,0.12)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,flexShrink:0}}>
<span style={{display:"block",width:16,height:1.5,background:"#ccc",borderRadius:2}}/>
<span style={{display:"block",width:16,height:1.5,background:"#ccc",borderRadius:2}}/>
<span style={{display:"block",width:16,height:1.5,background:"#ccc",borderRadius:2}}/>
</button>}
<span style={{fontWeight:700,fontSize:isMobile?16:18,letterSpacing:-0.4,color:T.text,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>LURK.</span>
{day?<div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(74,138,90,0.12)",borderRadius:20,padding:"4px 10px 4px 8px"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.success,display:"inline-block"}}/><span style={{fontSize:11,color:T.success,fontWeight:600}}>{isMobile?"":"AÇIK "}{ft(day.oa)}</span></div>
:<div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(196,58,42,0.1)",borderRadius:20,padding:"4px 10px 4px 8px"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.danger,display:"inline-block"}}/><span style={{fontSize:11,color:T.danger,fontWeight:600}}>KAPALI</span></div>}
</div>
{!isMobile&&<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.05)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",padding:3,borderRadius:9,border:"0.5px solid rgba(255,255,255,0.1)",overflowX:"auto",maxWidth:"calc(100vw - 200px)"}}>
{NAV.map(({k,l})=><button key={k} onClick={()=>go(k)} style={{padding:"6px 12px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:590,fontSize:12,background:view===k?"rgba(255,255,255,0.1)":"transparent",color:view===k?T.text:T.textSub,opacity:view===k?1:0.75,boxShadow:view===k?"0 1px 3px rgba(0,0,0,0.12)":"none",transition:"all 0.15s",whiteSpace:"nowrap"}}>{k==="achievements"?"🎖 Rozetler":k==="todo"?"✅ Yapılacaklar":l}</button>)}
</div>
<button onClick={()=>go("notifications")} style={{position:"relative",width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:view==="notifications"?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.06)",boxShadow:view==="notifications"?"0 1px 3px rgba(0,0,0,0.12)":"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>
🔔
{notifications.filter(n=>!n.read).length>0&&<span style={{position:"absolute",top:2,right:2,minWidth:16,height:16,borderRadius:8,background:"#C43A2A",color:T.text,fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>{notifications.filter(n=>!n.read).length>9?"9+":notifications.filter(n=>!n.read).length}</span>}
</button>
<button onClick={()=>{try{localStorage.removeItem("lurk_auth");}catch{}setAuthed(false);setV("lurk");}} style={{width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:"rgba(196,58,42,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}} title="Güvenli Çıkış">🔒</button>
</div>}
{isMobile&&<div style={{display:"flex",alignItems:"center",gap:8}}>
<button onClick={()=>go("notifications")} style={{position:"relative",width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:"rgba(118,118,128,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
🔔
{notifications.filter(n=>!n.read).length>0&&<span style={{position:"absolute",top:2,right:2,minWidth:16,height:16,borderRadius:8,background:"#C43A2A",color:T.text,fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>{notifications.filter(n=>!n.read).length>9?"9+":notifications.filter(n=>!n.read).length}</span>}
</button>
<button onClick={()=>{try{localStorage.removeItem("lurk_auth");}catch{}setAuthed(false);setV("lurk");}} style={{width:36,height:36,borderRadius:"50%",border:"none",cursor:"pointer",background:"rgba(196,58,42,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}} title="Güvenli Çıkış">🔒</button>
</div>}
</nav>

{view!=="lurk"&&<div style={{padding:isMobile?"16px 16px 0":"24px 24px 0",maxWidth:860,margin:"0 auto"}}>
<div style={{fontSize:isMobile?18:22,fontWeight:800,letterSpacing:-0.5,color:T.text,fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>LURK.</div>
</div>}

{gM&&view!=="order"&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><GuestM req={cfg.requireName} onOk={g=>doOpen(gM,g)} onSkip={()=>{setGM(null);setSel(null);}} T={T}/></div>}

{view==="lurk"&&<LurkV setV={setV} T={T} logs={logs} orders={orders} cfg={cfg} cari={cari} installments={installments} unlocked={unlocked} fm={fm} fd={fd} cur={cur} day={day} ft={ft} tod={tod} isMobile={isMobile} badges={achievements}/>}
{view==="home"&&<HomeV tables={tables} orders={orders} exp={exp} setExp={setExp} ecats={ecats} todO={todO} todI={todI} day={day} cari={cari} cfg={cfg} cur={cur} fm={fm} ft={ft} fd={fd} tod={tod} uid={uid} msg={msg} setV={setV} openDay={openDay} closeDay={closeDay} dayCon={dayCon} setDayCon={setDayCon} isMobile={isMobile} T={T}/>}

{view==="tables"&&(
<div style={{maxWidth:680,margin:"0 auto"}}>

{/* Header */}
<div style={{background:"#D4B83A",padding:"24px 20px 20px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-50,right:-50,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
<div style={{fontSize:11,color:"rgba(0,0,0,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Masalar</div>
<div style={{fontSize:28,fontWeight:800,color:"#1A1A16",letterSpacing:-1}}>Aktif Siparişler</div>
{!day&&<div style={{fontSize:12,color:"rgba(0,0,0,0.4)",marginTop:6,display:"flex",alignItems:"center",gap:8}}>Gün açık değil — <button onClick={()=>go("home")} style={{background:"rgba(0,0,0,0.1)",border:"none",borderRadius:8,padding:"3px 10px",color:"#1A1A16",fontSize:12,fontWeight:600,cursor:"pointer"}}>Başlat</button></div>}
</div>

{tables.length===0?(
<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"50vh",gap:16,textAlign:"center",padding:"0 32px"}}>
<div style={{fontSize:40}}>🪑</div>
<div style={{fontSize:18,fontWeight:700,color:T.text}}>Henüz açık masa yok</div>
<div style={{fontSize:13,color:T.textSub}}>Yeni bir sipariş almak için masa ekle.</div>
<button onClick={addNewTable} disabled={!day} style={{background:day?"#D4B83A":T.bg2,border:"none",borderRadius:14,padding:"15px 40px",color:day?"#1A1A16":T.textDim,fontWeight:700,fontSize:15,cursor:day?"pointer":"not-allowed",marginTop:8,boxShadow:day?"0 4px 16px rgba(212,184,58,0.3)":"none"}}>＋ Yeni Masa Ekle</button>
</div>
):(
<div style={{display:"flex",flexDirection:"column",gap:0}}>
{tables.map((t,i)=>{
const tot=t.order.reduce((s,o)=>s+o.price*o.qty,0);
const dur=t.oa?Math.floor((Date.now()-new Date(t.oa))/60000):0;
return(
<button key={t.id} onClick={()=>goTbl(t.id)} style={{background:SHADES[Math.min(i,SHADES.length-1)],border:"none",borderTop:"0.5px solid rgba(255,255,255,0.04)",padding:"18px 20px",cursor:day?"pointer":"not-allowed",textAlign:"left",opacity:day?1:0.6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div>
<div style={{fontSize:11,color:"rgba(232,229,220,0.4)",fontWeight:600,marginBottom:4,textTransform:"uppercase",letterSpacing:0.8}}>{t.lbl}{t.g?" — "+t.g:""}</div>
<div style={{fontSize:20,fontWeight:800,color:"#E8E5DC",letterSpacing:-0.5}}>{fm(tot,cur)}</div>
<div style={{fontSize:10,color:"rgba(232,229,220,0.3)",marginTop:3}}>{t.order.length} kalem · {dur} dk</div>
</div>
<span style={{color:"rgba(232,229,220,0.2)",fontSize:20}}>›</span>
</button>
);})}
<button onClick={addNewTable} disabled={!day} style={{background:SHADES[Math.min(tables.length,SHADES.length-1)],border:"none",borderTop:"0.5px solid rgba(255,255,255,0.04)",padding:"18px 20px",cursor:day?"pointer":"not-allowed",textAlign:"left",opacity:day?1:0.4,display:"flex",alignItems:"center",gap:12,color:"rgba(232,229,220,0.4)"}}>
<span style={{fontSize:20,fontWeight:300}}>＋</span>
<span style={{fontSize:13,fontWeight:600}}>Yeni Masa Ekle</span>
</button>
</div>
)}
</div>
)}

{view==="order"&&curT&&(
<div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 60px)",overflow:"hidden",position:"relative"}}>
{gM&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><GuestM req={cfg.requireName} onOk={g=>doOpen(gM,g)} onSkip={()=>doOpen(gM,"")} T={T}/></div>}
{disM&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><DiscM total={sub(curT)} cur={cur} fm={fm} T={T} onApply={d=>{setDisc(d);setDisM(false);}} onClose={()=>setDisM(false)}/></div>}
{pay&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center"}}><PayM table={curT} disc={disc} cur={cur} fm={fm} T={T} PO={PO} openCari={cari.filter(c=>!c.settled)} onClose={()=>setPay(false)} onDone={(splits,closeTable)=>closeTbl(splits,closeTable)}/></div>}
{cancelConfirm&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:T.bg2,backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",border:"0.5px solid "+T.border,borderRadius:20,padding:28,width:340,maxWidth:"90vw",boxShadow:"0 24px 48px rgba(0,0,0,0.4)"}}><div style={{fontWeight:800,fontSize:17,color:T.danger,marginBottom:10}}>Adisyonu İptal Et</div><p style={{fontSize:13,color:T.textSub,margin:"0 0 20px"}}>{curT.lbl} masasındaki tüm ürünler silinecek ve masa boşalacak. Bu işlem geri alınamaz.</p><div style={{display:"flex",gap:10}}><button onClick={()=>setCancelConfirm(false)} style={{...sb(T.bg3),flex:1,color:T.text}}>Vazgeç</button><button onClick={()=>{setCancelConfirm(false);cancelOrder(curT.id);}} style={{...sb(T.danger),flex:1}}>Evet, İptal Et</button></div></div></div>}

{isMobile?(
/* MOBİL: Tab ile menü/sepet arası geçiş */
<OrderMobileV curT={curT} T={T} sb={sb} fm={fm} ft={ft} cur={cur} disc={disc} setDisc={setDisc} setDisM={setDisM} setPay={setPay} setV={setV} setSel={setSel} setCancelConfirm={setCancelConfirm} cat={cat} setCat={setCat} oCats={oCats} fMenü={fMenü} addItem={addItem} chQ={chQ} sub={sub} fin={fin} cfg={cfg} setGM={setGM} msg={msg}/>
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
{oCats.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:"4px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:cat===c?"#D4B83A":"#3D3D35",color:cat===c?"#1A1A16":"rgba(232,229,220,0.6)"}}>{c}</button>)}
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:8}}>
{fMenü.map(item=><button key={item.id} onClick={()=>addItem(curT.id,item)} style={{background:"#3D3D35",border:"none",borderRadius:10,padding:"12px 10px",cursor:"pointer",textAlign:"left",color:"#E8E5DC"}}><div style={{fontWeight:600,fontSize:12,marginBottom:5,color:"rgba(232,229,220,0.85)"}}>{item.name}</div><div style={{fontWeight:800,fontSize:14,color:"#D4B83A"}}>{fm(item.price,cur)}</div></button>)}
</div>
</div>
<div style={{background:T.bg2,borderLeft:"0.5px solid "+T.border,display:"flex",flexDirection:"column",overflow:"hidden"}}>
<div style={{padding:"12px 16px",borderBottom:"0.5px solid "+T.border,fontWeight:700,fontSize:13,color:T.accentL,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span>Sipariş</span>
<button onClick={()=>setGM(curT.id)} style={{background:"none",border:"0.5px solid "+T.border2,borderRadius:6,padding:"3px 8px",color:T.textSub,cursor:"pointer",fontSize:11}}>{curT.g||"Müşteri"}</button>
</div>
<div style={{flex:1,overflowY:"auto",padding:"10px 14px"}}>
{curT.order.length===0?<div style={{color:T.textDim,textAlign:"center",paddingTop:30,fontSize:12}}>Ürün eklenmedi</div>
:curT.order.map(item=><div key={item.id} style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
<div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:T.text}}>{item.name}</div><div style={{fontSize:10,color:T.textSub}}>{fm(item.price,cur)} x {item.qty} = <span style={{color:T.accentL}}>{fm(item.price*item.qty,cur)}</span></div></div>
<div style={{display:"flex",gap:3}}>
<button onClick={()=>chQ(curT.id,item.id,-1)} style={{width:24,height:24,borderRadius:6,border:"0.5px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",color:T.text}}>-</button>
<span style={{width:18,textAlign:"center",fontWeight:700,lineHeight:"24px",fontSize:12,color:T.text}}>{item.qty}</span>
<button onClick={()=>chQ(curT.id,item.id,1)} style={{width:24,height:24,borderRadius:6,border:"0.5px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",color:T.text}}>+</button>
</div></div>)}
</div>
<div style={{padding:"12px 16px",borderTop:"0.5px solid "+T.border}}>
<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:4}}><span>Ara toplam</span><span>{fm(sub(curT),cur)}</span></div>
{disc?<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.danger,marginBottom:4}}><span>İndirim <button onClick={()=>setDisc(null)} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",padding:"0 2px",fontSize:14}}>x</button></span><span>-{fm(disc.amount,cur)}</span></div>
:<button onClick={()=>curT.order.length>0&&setDisM(true)} style={{width:"100%",background:T.bg3,border:"1px dashed "+T.border2,borderRadius:8,padding:"6px",color:T.textSub,fontSize:11,cursor:"pointer",marginBottom:8}}>İndirim Ekle</button>}
<div style={{display:"flex",justifyContent:"space-between",fontSize:18,fontWeight:800,color:T.accentL,marginBottom:12,marginTop:4}}><span>Toplam</span><span>{fm(fin(curT),cur)}</span></div>
<button onClick={()=>curT.order.length>0&&setPay(true)} disabled={curT.order.length===0} style={{width:"100%",padding:"13px",background:curT.order.length===0?T.bg3:T.accent,color:curT.order.length===0?T.textDim:"#fff",border:"none",borderRadius:10,fontWeight:800,fontSize:14,cursor:curT.order.length===0?"not-allowed":"pointer"}}>Ödeme Al</button>
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
{view==="notifications"&&<NotificationsV notifications={notifications} setNotifications={setNotifications} fd={fd} ft={ft} setV={setV} sb={sb} T={T}/>}
{view==="installments"&&<InstallmentsPageV installments={installments} setInstallments={setInstallments} cur={cur} fm={fm} fd={fd} ft={ft} tod={tod} T={T} sb={sb} inp={inp} setV={setV} notifications={notifications} setNotifications={setNotifications}/>}
{view==="credit"&&<CreditPageV cari={cari} setCari={setCari} cur={cur} fm={fm} fd={fd} ft={ft} T={T} sb={sb} inp={inp} setV={setV} tables={tables} setTbl={setTbl} uid={uid}/>}
{view==="todo"&&<TodoV todos={todos} setTodos={setTodos} fd={fd} sb={sb} inp={inp} T={T} setV={setV}/>}
{view==="settings"&&<SetV cfg={cfg} cfgF={cfgF} setCfgF={setCfgF} saveCfg={saveCfg} stab={stab} setStab={setStab} menu={menu} mF={mF} setMF={setMF} mEid={mEid} setMEid={setMEid} mCat={mCat} setMCat={setMCat} saveMI={saveMI} setMenü={setMenü} ecats={ecats} setEc={setEc} newec={newec} setNewec={setNewec} exp={exp} msg={msg} setOrd={setOrd} setExp={setExp} setLogs={setLogs} cur={cur} fm={fm} inp={inp} sb={sb} T={T} logs={logs} onlineOrders={onlineOrders} todos={todos} tacoLogs={tacoLogs} tacoMenu={tacoMenu} notifications={notifications} cari={cari} installments={installments}/>}
</div>
);}

function OrderMobileV({curT,T,sb,fm,ft,cur,disc,setDisc,setDisM,setPay,setV,setSel,setCancelConfirm,cat,setCat,oCats,fMenü,addItem,chQ,sub,fin,cfg,setGM,msg}){
const[activeTab,setActiveTab]=useState("menu");
const cartItems=curT.order||[];
const orderTotal=fin(curT);
const itemCount=cartItems.reduce((s,i)=>s+i.qty,0);

return(
<div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 56px)",background:T.bg,overflow:"hidden"}}>

{/* Top bar */}
<div style={{background:"rgba(232,229,220,0.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,0,0,0.08)",padding:"10px 16px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
<button onClick={()=>{if(curT.order.length===0){setV("tables");setSel(null);}else setCancelConfirm(true);}} style={{background:"rgba(0,0,0,0.07)",border:"none",borderRadius:10,padding:"8px 14px",color:T.text,cursor:"pointer",fontSize:13,fontWeight:600,flexShrink:0}}>← Masalar</button>
<div style={{flex:1}}>
<div style={{fontWeight:800,fontSize:15,color:T.text}}>{curT.lbl}</div>
{curT.g&&<div style={{fontSize:11,color:T.accentL,fontWeight:600}}>{curT.g}</div>}
</div>
{cfg.requireName&&<button onClick={()=>setGM(curT.id)} style={{background:"rgba(0,0,0,0.06)",border:"none",borderRadius:8,padding:"6px 12px",color:T.textSub,fontSize:11,fontWeight:600,cursor:"pointer"}}>Müşteri</button>}
</div>

{/* Tabs */}
<div style={{display:"flex",borderBottom:"1px solid rgba(0,0,0,0.08)",background:"rgba(232,229,220,0.9)",flexShrink:0}}>
{[{k:"menu",l:"Menü"},{k:"cart",l:`Sepet${itemCount>0?" ("+itemCount+")":""}`}].map(t=>(
<button key={t.k} onClick={()=>setActiveTab(t.k)} style={{flex:1,padding:"12px 0",border:"none",background:"none",borderBottom:`2.5px solid ${activeTab===t.k?"#D4B83A":"transparent"}`,color:activeTab===t.k?"#B89E2A":"#8A8A7A",fontWeight:700,fontSize:13,cursor:"pointer",transition:"all 0.15s"}}>{t.l}</button>
))}
</div>

{activeTab==="menu"&&(
<div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>

{/* Kategori listesi — horizontal scroll */}
<div style={{padding:"12px 16px 8px",display:"flex",gap:8,overflowX:"auto",flexShrink:0,background:T.bg}}>
{oCats.map(c=>(
<button key={c} onClick={()=>setCat(c)} style={{padding:"8px 18px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",flexShrink:0,background:cat===c?"#D4B83A":"#3D3D35",color:cat===c?"#1A1A16":"rgba(232,229,220,0.6)",transition:"all 0.15s",boxShadow:cat===c?"0 3px 12px rgba(212,184,58,0.25)":"none"}}>{c}</button>
))}
</div>

{/* Ürün listesi — tam genişlik satırlar */}
<div style={{flex:1,padding:"0 0 80px"}}>
{fMenü.map((item,i)=>{
const inCart=curT.order.find(o=>o.id===item.id);
return(
<button key={item.id} onClick={()=>addItem(curT.id,item)} style={{width:"100%",background:inCart?"rgba(212,184,58,0.08)":"transparent",border:"none",borderBottom:"0.5px solid rgba(0,0,0,0.06)",padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
<div>
<div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:2}}>{item.name}</div>
<div style={{fontSize:12,color:T.accentL,fontWeight:700}}>{fm(item.price,cur)}</div>
</div>
{inCart?(
<div style={{display:"flex",alignItems:"center",gap:8}}>
<button onClick={e=>{e.stopPropagation();chQ(curT.id,item.id,-1);}} style={{width:28,height:28,borderRadius:"50%",border:"1px solid rgba(0,0,0,0.12)",background:"transparent",cursor:"pointer",fontSize:16,color:T.text,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
<span style={{fontWeight:800,fontSize:15,minWidth:16,textAlign:"center",color:"#B89E2A"}}>{inCart.qty}</span>
<button onClick={e=>{e.stopPropagation();addItem(curT.id,item);}} style={{width:28,height:28,borderRadius:"50%",border:"none",background:"#D4B83A",cursor:"pointer",fontSize:16,color:"#1A1A16",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
</div>
):(
<div style={{width:28,height:28,borderRadius:"50%",border:"1px solid rgba(0,0,0,0.12)",display:"flex",alignItems:"center",justifyContent:"center",color:T.textSub,fontSize:18}}>+</div>
)}
</button>
);})}
</div>
</div>
)}

{activeTab==="cart"&&(
<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
<div style={{flex:1,overflowY:"auto",padding:"0 0 80px"}}>
{cartItems.length===0?(
<div style={{textAlign:"center",padding:"60px 0",color:T.textSub}}>
<div style={{fontSize:32,marginBottom:10}}>🛒</div>
<div>Henüz ürün eklenmedi</div>
</div>
):cartItems.map((item,i)=>(
<div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderBottom:"0.5px solid rgba(0,0,0,0.06)"}}>
<div style={{flex:1}}>
<div style={{fontSize:14,fontWeight:600,color:T.text}}>{item.name}</div>
<div style={{fontSize:11,color:T.textSub,marginTop:2}}>{fm(item.price,cur)} × {item.qty} = <span style={{color:"#B89E2A",fontWeight:700}}>{fm(item.price*item.qty,cur)}</span></div>
</div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<button onClick={()=>chQ(curT.id,item.id,-1)} style={{width:28,height:28,borderRadius:"50%",border:"1px solid rgba(0,0,0,0.12)",background:"transparent",cursor:"pointer",fontSize:16,color:T.text,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
<span style={{fontWeight:800,fontSize:15,minWidth:16,textAlign:"center"}}>{item.qty}</span>
<button onClick={()=>chQ(curT.id,item.id,1)} style={{width:28,height:28,borderRadius:"50%",border:"none",background:"#D4B83A",cursor:"pointer",fontSize:16,color:"#1A1A16",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
</div>
</div>
))}
</div>
</div>
)}

{/* Bottom bar */}
<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 16px",background:"rgba(232,229,220,0.97)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(0,0,0,0.08)",display:"flex",gap:10,flexShrink:0}}>
{itemCount>0&&<button onClick={()=>{setActiveTab("menu");}} style={{padding:"13px 14px",background:"rgba(0,0,0,0.07)",border:"none",borderRadius:12,color:T.text,fontWeight:600,fontSize:12,cursor:"pointer",flexShrink:0}}>Menüye Dön</button>}
<button onClick={()=>setPay(true)} disabled={cartItems.length===0} style={{flex:1,padding:"13px",background:cartItems.length>0?"#D4B83A":"rgba(0,0,0,0.08)",border:"none",borderRadius:12,color:cartItems.length>0?"#1A1A16":T.textDim,fontWeight:800,fontSize:14,cursor:cartItems.length>0?"pointer":"not-allowed",boxShadow:cartItems.length>0?"0 4px 16px rgba(212,184,58,0.3)":"none"}}>
{cartItems.length>0?`Ödeme Al — ${fm(orderTotal,cur)}`:"Sepet Boş"}
</button>
</div>

</div>
);}

function HomeV({tables,orders,exp,setExp,ecats,todO,todI,day,cari,cfg,cur,fm,ft,fd,tod,uid,msg,setV,openDay,closeDay,dayCon,setDayCon,isMobile,T=DARK}){
const now=new Date();
const cash=todO.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
const card=todO.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
const todE=exp.filter(e=>e.date===tod()).reduce((s,e)=>s+e.amount,0);
const openT=tables.filter(t=>t.s==="o");
const l7=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-i);const ds=d.toISOString().split("T")[0];return{date:ds,lbl:d.toLocaleDateString("tr-TR",{weekday:"short"}),inc:orders.filter(o=>o.date===ds).reduce((s,o)=>s+o.total,0)};}).reverse();
const mx=Math.max(...l7.map(d=>d.inc),1);
const[showExpForm,setShowExpForm]=useState(false);
const[expF,setExpF]=useState({desc:"",amount:"",cat:(ecats&&ecats[0])||"Malzeme"});

// Gün kapalı
if(!day) return(
<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"70vh",gap:20,textAlign:"center",padding:"0 32px"}}>
<div style={{fontSize:11,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>{now.toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</div>
<div style={{fontSize:48}}>☕</div>
<div style={{fontSize:24,fontWeight:800,color:T.text,letterSpacing:-0.5}}>Gün henüz açılmadı</div>
<div style={{fontSize:13,color:T.textSub,maxWidth:280}}>Günü başlatmak için aşağıdaki butona bas.</div>
{!dayCon
?<button onClick={()=>setDayCon(true)} style={{background:"#D4B83A",border:"none",borderRadius:14,padding:"15px 40px",color:"#1A1A16",fontWeight:700,fontSize:15,cursor:"pointer",marginTop:8,boxShadow:"0 4px 16px rgba(212,184,58,0.3)"}}>Günü Başlat</button>
:<div style={{display:"flex",gap:10}}>
<button onClick={()=>setDayCon(false)} style={{background:"rgba(0,0,0,0.08)",border:"none",borderRadius:12,padding:"13px 22px",color:T.text,fontWeight:600,fontSize:13,cursor:"pointer"}}>İptal</button>
<button onClick={openDay} style={{background:"#D4B83A",border:"none",borderRadius:12,padding:"13px 26px",color:"#1A1A16",fontWeight:700,fontSize:13,cursor:"pointer"}}>✓ Evet, Başlat</button>
</div>}
</div>
);

return(
<div style={{maxWidth:680,margin:"0 auto"}}>

{/* Header — sarı kart */}
<div style={{background:"#D4B83A",padding:"24px 20px 20px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-50,right:-50,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div>
<div style={{fontSize:11,color:"rgba(0,0,0,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{now.toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</div>
<div style={{fontSize:11,color:"rgba(0,0,0,0.5)",fontWeight:700,marginBottom:8}}>● Açık — {ft(day.oa)}</div>
<div style={{fontSize:isMobile?36:44,fontWeight:800,color:"#1A1A16",letterSpacing:-1.5,lineHeight:1}}>{fm(todI,cur)}</div>
<div style={{fontSize:12,color:"rgba(0,0,0,0.4)",marginTop:6}}>{todO.length} adisyon</div>
</div>
{!dayCon
?<button onClick={()=>setDayCon(true)} style={{background:"rgba(0,0,0,0.1)",border:"none",borderRadius:10,padding:"9px 16px",color:"rgba(0,0,0,0.6)",fontWeight:600,fontSize:12,cursor:"pointer",flexShrink:0}}>Günü Kapat</button>
:<div style={{display:"flex",gap:6,flexShrink:0}}>
<button onClick={()=>setDayCon(false)} style={{background:"rgba(0,0,0,0.08)",border:"none",borderRadius:10,padding:"9px 14px",color:"rgba(0,0,0,0.5)",fontWeight:600,fontSize:12,cursor:"pointer"}}>İptal</button>
<button onClick={closeDay} style={{background:"rgba(0,0,0,0.2)",border:"none",borderRadius:10,padding:"9px 16px",color:"#1A1A16",fontWeight:700,fontSize:12,cursor:"pointer"}}>✓ Kapat</button>
</div>}
</div>
</div>

{/* Stat satırları — stacked */}
{[
{label:"Nakit",    val:fm(cash,cur),  sub:todI>0?`%${Math.round(cash/todI*100)}`:null,  col:"#4A8A5A"},
{label:"Kart",     val:fm(card,cur),  sub:todI>0?`%${Math.round(card/todI*100)}`:null,  col:"#5A7A5A"},
{label:"Dolu Masa",val:openT.length+" / "+tables.length, sub:openT.reduce((s,t)=>s+t.order.reduce((a,o)=>a+o.price*o.qty,0),0).toLocaleString("tr-TR")+" TL açık", col:"#5A6A4A"},
{label:"Harcama",  val:fm(todE,cur),  sub:"Net: "+fm(todI-todE,cur), col:"#8A4A3A"},
].map((s,i)=>(
<div key={i} style={{background:SHADES[i],padding:"16px 20px",borderTop:"0.5px solid rgba(255,255,255,0.04)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div>
<div style={{fontSize:11,color:"rgba(232,229,220,0.45)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.8,marginBottom:3}}>{s.label}</div>
{s.sub&&<div style={{fontSize:10,color:"rgba(232,229,220,0.3)"}}>{s.sub}</div>}
</div>
<div style={{fontSize:18,fontWeight:800,color:"#E8E5DC",letterSpacing:-0.5}}>{s.val}</div>
</div>
))}

{/* Harcama ekle */}
<div style={{background:SHADES[4],borderTop:"0.5px solid rgba(255,255,255,0.04)"}}>
<button onClick={()=>setShowExpForm(p=>!p)} style={{width:"100%",background:"transparent",border:"none",padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",color:"rgba(232,229,220,0.6)",fontSize:13,fontWeight:600}}>
<span>{showExpForm?"İptal":"＋ Harcama Ekle"}</span>
<span style={{fontSize:16,opacity:0.4}}>{showExpForm?"✕":"+"}</span>
</button>
{showExpForm&&<div style={{padding:"0 20px 16px",display:"flex",flexDirection:"column",gap:10}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
<input placeholder="Açıklama" value={expF.desc} onChange={e=>setExpF(p=>({...p,desc:e.target.value}))} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",color:"#E8E5DC",fontSize:16,outline:"none"}}/>
<input type="number" placeholder="Tutar" value={expF.amount} onChange={e=>setExpF(p=>({...p,amount:e.target.value}))} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",color:"#E8E5DC",fontSize:16,outline:"none"}}/>
</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{(ecats||[]).map(cat=><button key={cat} onClick={()=>setExpF(p=>({...p,cat}))} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:expF.cat===cat?"#D4B83A":"rgba(255,255,255,0.08)",color:expF.cat===cat?"#1A1A16":"rgba(232,229,220,0.5)"}}>{cat}</button>)}
</div>
<button onClick={()=>{if(!expF.desc||!expF.amount)return;setExp(prev=>[{id:uid(),desc:expF.desc,amount:parseFloat(expF.amount),cat:expF.cat,date:tod()},...prev]);msg("Harcama eklendi");setExpF({desc:"",amount:"",cat:(ecats&&ecats[0])||"Malzeme"});setShowExpForm(false);}} style={{background:"#D4B83A",border:"none",borderRadius:10,padding:"12px",color:"#1A1A16",fontWeight:700,fontSize:14,cursor:"pointer",opacity:expF.desc&&expF.amount?1:0.5}}>Kaydet</button>
</div>}
</div>

{/* Son 7 Gün */}
<div style={{background:SHADES[5],borderTop:"0.5px solid rgba(255,255,255,0.04)",padding:"20px 20px 16px"}}>
<div style={{fontSize:10,color:"rgba(232,229,220,0.35)",fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,marginBottom:20}}>Son 7 Gün</div>
<div style={{display:"flex",gap:6,alignItems:"flex-end",height:80}}>
{l7.map((d,i)=>{const h=d.inc>0?Math.max((d.inc/mx)*80,4):2;const isT=d.date===tod();return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{fontSize:8,color:"rgba(232,229,220,0.3)",textAlign:"center",height:12,display:"flex",alignItems:"flex-end",justifyContent:"center",whiteSpace:"nowrap"}}>{d.inc>0?fm(d.inc,cur).replace(cur,"").trim():""}</div><div style={{width:"100%",height:h,background:isT?"#D4B83A":"rgba(212,184,58,0.2)",borderRadius:"3px 3px 0 0"}}/><div style={{fontSize:9,color:isT?"#D4B83A":"rgba(232,229,220,0.3)",fontWeight:isT?700:400}}>{d.lbl}</div></div>);})}
</div>
</div>

</div>
);}

function GuestM({req,onOk,onSkip,T}){
const[n,setN]=useState("");
return(<div style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:16,padding:28,width:320}}>
<div style={{fontWeight:800,fontSize:17,marginBottom:16}}>Müşteri Adı</div>
<input autoFocus placeholder="Müşteri adi..." value={n} onChange={e=>setN(e.target.value)} onKeyDown={e=>e.key==="Enter"&&n.trim()&&onOk(n.trim())} style={{background:T.bg3,border:"0.5px solid "+T.border2,borderRadius:8,padding:"9px 12px",color:T.text,fontSize:14,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:16}}/>
<div style={{display:"flex",gap:10}}>
{!req&&<button onClick={onSkip} style={{flex:1,background:T.bg3,border:"none",color:T.textSub,borderRadius:8,padding:"10px",fontWeight:600,fontSize:13,cursor:"pointer"}}>Geç</button>}
<button onClick={()=>n.trim()&&onOk(n.trim())} style={{flex:2,background:T.accent,border:"none",color:T.text,borderRadius:8,padding:"10px",fontWeight:600,fontSize:13,cursor:"pointer"}}>Devam</button>
</div>
</div>);}

function DiscM({total,cur,fm,T,onApply,onClose}){
const[type,setType]=useState("percent");
const[val,setVal]=useState("");
const nv=parseFloat(val)||0;
const da=type==="percent"?total*(nv/100):Math.min(nv,total);
const af=total-da;
return(<div style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:16,padding:28,width:340}}>
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

function PayM({table,disc,cur,fm,T,PO,openCari,onClose,onDone}){
const sub=table.order.reduce((s,o)=>s+o.price*o.qty,0);
const da=disc?.amount||0;const fin=sub-da;
const[mode,setMode]=useState("all");
const[ip,setIp]=useState({});
const[lines,setLines]=useState([{id:1,amount:"",pt:"cash"},{id:2,amount:"",pt:"card"}]);
const[sp,setSp]=useState(null);
const[cariName,setCariName]=useState(table.g||"");

const hasCreditAll=mode==="all"&&sp==="credit";
const hasCreditItem=mode==="byitem"&&Object.values(ip).some(v=>v==="credit");
const hasCreditAmt=mode==="byamount"&&lines.some(l=>l.pt==="credit");
const needsName=hasCreditAll||hasCreditItem||hasCreditAmt;
const nameOk=!needsName||cariName.trim().length>0;

const getSplits=()=>{
if(!nameOk)return null;
const cn=cariName.trim()||undefined;
if(mode==="all"){if(!sp)return null;return{splits:[{items:[...table.order],sub,da,total:fin,pt:sp,cariName:cn}],closeTable:true};}
if(mode==="byitem"){
const g={};
let anySelected=false;
for(const item of table.order){
const pt=ip[item.id];
if(!pt)continue; // seçilmeyenler masada kalır
anySelected=true;
if(!g[pt])g[pt]={pt,items:[],sub:0};
g[pt].items.push(item);
g[pt].sub+=item.price*item.qty;
}
if(!anySelected)return null;
const selectedSub=Object.values(g).reduce((s,x)=>s+x.sub,0);
const allSelected=selectedSub>=sub-0.5;
const splits=Object.values(g).map(x=>({...x,da:0,total:x.sub,cariName:x.pt==="credit"?cn:undefined}));
return{splits,closeTable:allSelected};
}
if(mode==="byamount"){
const fl=lines.filter(l=>parseFloat(l.amount)>0&&l.pt);
if(!fl.length)return null;
const t=fl.reduce((s,l)=>s+parseFloat(l.amount),0);
if(t>fin+0.5)return null; // girilen tutar toplamı aşamaz
const closeTable=Math.abs(t-fin)<=0.5;
return{splits:fl.map(l=>({items:[...table.order],sub:parseFloat(l.amount),da:0,total:parseFloat(l.amount),pt:l.pt,cariName:l.pt==="credit"?cn:undefined})),closeTable};
}
return null;};
const result=getSplits();
const splits=result?.splits||null;
const closeTable=result?.closeTable??true;
const atot=lines.reduce((s,l)=>s+(parseFloat(l.amount)||0),0);
const rem=fin-atot;
return(<div style={{background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}}>
<div style={{padding:"18px 20px",borderBottom:"0.5px solid "+T.border,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontWeight:800,fontSize:17}}>Ödeme Al</div><div style={{fontSize:12,color:T.textSub,marginTop:2}}>{table.lbl} - <span style={{color:T.accentL,fontWeight:700}}>{fm(fin,cur)}</span></div></div>
<button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:T.textSub}}>x</button>
</div>
<div style={{display:"flex",borderBottom:"0.5px solid "+T.border}}>
{[{k:"all",l:"Tümü"},{k:"byitem",l:"Ürün Bazlı"},{k:"byamount",l:"Tutar Bazlı"}].map(({k,l})=><button key={k} onClick={()=>setMode(k)} style={{flex:1,padding:"11px 0",border:"none",borderBottom:"2px solid "+(mode===k?T.accent:"transparent"),background:"transparent",color:mode===k?T.accentL:T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>)}
</div>
<div style={{padding:20}}>
{mode==="all"&&<>
<div style={{display:"flex",gap:8,marginBottom:16}}>{PO.map(({k,l,c,bg,bd})=><button key={k} onClick={()=>setSp(k)} style={{flex:1,padding:"11px 0",borderRadius:10,border:"2px solid "+(sp===k?bd:T.border),background:sp===k?bg:T.bg3,color:sp===k?c:T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>)}</div>
{sp==="credit"&&<div style={{marginBottom:12}}>
<label style={{display:"block",fontSize:11,color:"#D4B83A",fontWeight:600,marginBottom:5}}>Müşteri Adı (zorunlu)</label>
<input autoFocus placeholder="Müşteri adı girin..." value={cariName} onChange={e=>setCariName(e.target.value)} style={{background:"rgba(212,184,58,0.15)",border:"2px solid "+(cariName.trim()?"rgba(212,184,58,0.3)":"#C43A2A"),borderRadius:8,padding:"9px 12px",color:T.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:6}}/>
{!cariName.trim()&&<div style={{fontSize:11,color:T.danger,marginBottom:6}}>Cari kayıt için musteri adi zorunludur</div>}
{openCari.length>0&&<div>
<div style={{fontSize:10,color:"#D4B83A",fontWeight:600,marginBottom:5,textTransform:"uppercase",letterSpacing:0.5}}>Mevcut Açık Cariler</div>
<div style={{display:"flex",flexDirection:"column",gap:5}}>
{openCari.map(oc=><button key={oc.id} onClick={()=>setCariName(oc.g)} style={{background:cariName===oc.g?"rgba(212,184,58,0.2)":T.bg3,border:"1px solid "+(cariName===oc.g?"rgba(212,184,58,0.3)":T.border),borderRadius:8,padding:"8px 12px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontSize:12,fontWeight:700,color:"#D4B83A"}}>{oc.g}</div><div style={{fontSize:10,color:T.textSub,marginTop:1}}>{(oc.adisyonlar||[oc]).length} adisyon</div></div>
<div style={{fontWeight:800,color:"#D4B83A",fontSize:13}}>{fm(oc.total,cur)}</div>
</button>)}
</div>
</div>}
</div>}
{sp&&<div style={{background:T.bg3,borderRadius:10,padding:12,fontSize:13,color:T.textSub}}>
{table.order.map(item=><div key={item.id} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span>{item.name} x{item.qty}</span><span style={{color:T.accentL}}>{fm(item.price*item.qty,cur)}</span></div>)}
{da>0&&<div style={{display:"flex",justifyContent:"space-between",color:T.danger,borderTop:"0.5px solid "+T.border,paddingTop:4,marginTop:4}}><span>İndirim</span><span>-{fm(da,cur)}</span></div>}
<div style={{display:"flex",justifyContent:"space-between",fontWeight:800,color:T.accentL,borderTop:"0.5px solid "+T.border,paddingTop:4,marginTop:4,fontSize:15}}><span>Toplam</span><span>{fm(fin,cur)}</span></div>
</div>}
</>}
{mode==="byitem"&&<>
{table.order.map(item=>{const as=ip[item.id];return(<div key={item.id} style={{background:T.bg3,borderRadius:10,padding:"10px 12px",marginBottom:8}}>
<div style={{fontWeight:600,fontSize:12,marginBottom:6}}>{item.name} x{item.qty} <span style={{color:T.accentL,float:"right"}}>{fm(item.price*item.qty,cur)}</span></div>
<div style={{display:"flex",gap:5}}>{PO.map(({k,l,c,bg,bd})=><button key={k} onClick={()=>setIp(p=>({...p,[item.id]:k}))} style={{flex:1,padding:"5px 0",borderRadius:7,border:"2px solid "+(as===k?bd:T.border),background:as===k?bg:"#1E1E1E",color:as===k?c:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}}>{l}</button>)}</div>
</div>);})}
{hasCreditItem&&<div style={{marginTop:8}}>
<label style={{display:"block",fontSize:11,color:"#D4B83A",fontWeight:600,marginBottom:5}}>Müşteri Adı (zorunlu)</label>
<input placeholder="Müşteri adı girin..." value={cariName} onChange={e=>setCariName(e.target.value)} style={{background:"rgba(212,184,58,0.15)",border:"2px solid "+(cariName.trim()?"rgba(212,184,58,0.3)":"#C43A2A"),borderRadius:8,padding:"9px 12px",color:T.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:6}}/>
{!cariName.trim()&&<div style={{fontSize:11,color:T.danger,marginBottom:6}}>Cari kayıt için musteri adi zorunludur</div>}
{openCari.length>0&&<div style={{display:"flex",flexDirection:"column",gap:5}}>
{openCari.map(oc=><button key={oc.id} onClick={()=>setCariName(oc.g)} style={{background:cariName===oc.g?"rgba(212,184,58,0.2)":T.bg3,border:"1px solid "+(cariName===oc.g?"rgba(212,184,58,0.3)":T.border),borderRadius:8,padding:"7px 12px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,fontWeight:700,color:"#D4B83A"}}>{oc.g}</span><span style={{fontWeight:800,color:"#D4B83A",fontSize:12}}>{fm(oc.total,cur)}</span></button>)}
</div>}
</div>}
</>}
{mode==="byamount"&&<>
<div style={{fontSize:12,color:T.textSub,marginBottom:12}}>Toplam <strong style={{color:T.accentL}}>{fm(fin,cur)}</strong> olmali.</div>
{lines.map(line=><div key={line.id} style={{display:"flex",gap:8,marginBottom:10,alignItems:"center"}}>
<input type="number" placeholder="Tutar" value={line.amount} onChange={e=>setLines(prev=>prev.map(l=>l.id===line.id?{...l,amount:e.target.value}:l))} style={{background:T.bg3,border:"0.5px solid "+T.border2,borderRadius:8,padding:"8px 10px",color:T.text,fontSize:13,outline:"none",flex:1}}/>
<div style={{display:"flex",gap:4}}>{PO.map(({k,l,c,bg,bd})=><button key={k} onClick={()=>setLines(prev=>prev.map(li=>li.id===line.id?{...li,pt:k}:li))} style={{padding:"7px 9px",borderRadius:7,border:"2px solid "+(line.pt===k?bd:T.border),background:line.pt===k?bg:"#1E1E1E",color:line.pt===k?c:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}}>{l}</button>)}</div>
{lines.length>1&&<button onClick={()=>setLines(prev=>prev.filter(l=>l.id!==line.id))} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",padding:4,fontSize:13}}>x</button>}
</div>)}
<button onClick={()=>setLines(prev=>[...prev,{id:Date.now(),amount:"",pt:"cash"}])} style={{width:"100%",background:T.bg3,border:"1px dashed "+T.border2,borderRadius:8,padding:"7px",color:T.textSub,fontSize:12,cursor:"pointer",marginBottom:10}}>+ Satır Ekle</button>
<div style={{background:T.bg3,borderRadius:8,padding:"9px 12px",display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:8}}><span style={{color:T.textSub}}>Kalan</span><span style={{fontWeight:800,color:Math.abs(rem)<0.5?T.success:T.danger}}>{fm(rem,cur)}</span></div>
{hasCreditAmt&&<div style={{marginTop:8}}>
<label style={{display:"block",fontSize:11,color:"#D4B83A",fontWeight:600,marginBottom:5}}>Müşteri Adı (zorunlu)</label>
<input placeholder="Müşteri adı girin..." value={cariName} onChange={e=>setCariName(e.target.value)} style={{background:"rgba(212,184,58,0.15)",border:"2px solid "+(cariName.trim()?"rgba(212,184,58,0.3)":"#C43A2A"),borderRadius:8,padding:"9px 12px",color:T.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:6}}/>
{!cariName.trim()&&<div style={{fontSize:11,color:T.danger,marginBottom:6}}>Cari kayıt için musteri adi zorunludur</div>}
{openCari.length>0&&<div style={{display:"flex",flexDirection:"column",gap:5}}>
{openCari.map(oc=><button key={oc.id} onClick={()=>setCariName(oc.g)} style={{background:cariName===oc.g?"rgba(212,184,58,0.2)":T.bg3,border:"1px solid "+(cariName===oc.g?"rgba(212,184,58,0.3)":T.border),borderRadius:8,padding:"7px 12px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,fontWeight:700,color:"#D4B83A"}}>{oc.g}</span><span style={{fontWeight:800,color:"#D4B83A",fontSize:12}}>{fm(oc.total,cur)}</span></button>)}
</div>}
</div>}
</>}
<button onClick={()=>splits&&onDone(splits,closeTable)} disabled={!splits} style={{width:"100%",marginTop:18,padding:"14px",background:splits?T.accent:T.bg3,color:splits?"#fff":T.textDim,border:"none",borderRadius:10,fontWeight:800,fontSize:15,cursor:splits?"pointer":"not-allowed"}}>
{splits
  ?(closeTable
    ?"Hesabı Kapat — "+fm(fin,cur)
    :"Kısmi Ödeme Al")
  :"Ödeme yöntemi seçin"}
</button>
</div>
</div>);}

function ReportsV({orders,exp,logs,cur,fm,fd,fdl,ft,tod,mainT,setMainT,expMon,setExpMon,expDay,setExpDay,ecats,expF,setExpF,showEF,setShowEF,addExp,setExp,inp,sb,setSelLog,setV,installments,setInstallments,tacoLogs,setTacoLogs,tacoMenu,setTacoMenu,cari,setCari,T=DARK,tables,setTbl,uid}){
const[tab,setTab]=useState("sales");

// Sales data
const allLogs=logs||[];
const months=[...new Set(allLogs.map(l=>l.date.slice(0,7)))].sort((a,b)=>b.localeCompare(a));
const[openMonth,setOpenMonth]=useState(months[0]||null);
const[openDay,setOpenDay]=useState(null);
const totalSales=allLogs.reduce((s,l)=>s+l.inc,0);
const avgDaily=allLogs.length>0?Math.round(totalSales/allLogs.length):0;

// Expense data
const allExp=exp||[];
const expMonths=[...new Set(allExp.map(e=>e.date.slice(0,7)))].sort((a,b)=>b.localeCompare(a));
const[openExpMonth,setOpenExpMonth]=useState(expMonths[0]||null);
const totalExp=allExp.reduce((s,e)=>s+e.amount,0);

const monthName=m=>{const[y,mo]=m.split("-");return new Date(y,mo-1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"});};

return(
<div style={{maxWidth:680,margin:"0 auto"}}>

{/* Sarı header */}
<div style={{background:"#D4B83A",padding:"24px 20px 0",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-50,right:-50,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
<div style={{fontSize:11,color:"rgba(0,0,0,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4,cursor:"pointer"}} onClick={()=>setV("lurk")}>← Dashboard</div>
<div style={{fontSize:28,fontWeight:800,color:"#1A1A16",letterSpacing:-1,marginBottom:16}}>Raporlar</div>

{/* Tabs */}
<div style={{display:"flex"}}>
{[{k:"sales",l:"SATIŞ"},{k:"expenses",l:"HARCAMA"}].map(t=>(
<button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"12px 0",border:"none",background:"none",borderBottom:`2.5px solid ${tab===t.k?"rgba(0,0,0,0.4)":"transparent"}`,color:tab===t.k?"rgba(0,0,0,0.7)":"rgba(0,0,0,0.35)",fontWeight:700,fontSize:12,cursor:"pointer",letterSpacing:1}}>{t.l}</button>
))}
</div>
</div>

{/* Sales tab */}
{tab==="sales"&&<div>
{/* Summary */}
<div style={{display:"flex",background:SHADES[0]}}>
{[{l:"Toplam",v:fm(totalSales,cur)},{l:"Günlük Ort.",v:fm(avgDaily,cur)},{l:"Gün Sayısı",v:allLogs.length+" gün"}].map((s,i)=>(
<div key={i} style={{flex:1,padding:"16px 16px",borderRight:i<2?"0.5px solid rgba(255,255,255,0.06)":"none"}}>
<div style={{fontSize:10,color:"rgba(232,229,220,0.35)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.8,marginBottom:4}}>{s.l}</div>
<div style={{fontSize:13,fontWeight:800,color:"#E8E5DC"}}>{s.v}</div>
</div>
))}
</div>

{/* Month list */}
{allLogs.length===0?(
<div style={{textAlign:"center",padding:"40px 20px",color:"rgba(232,229,220,0.3)",background:SHADES[1]}}>Kapatılmış gün yok.</div>
):(
<div style={{display:"flex",flexDirection:"column"}}>
{months.map((m,mi)=>{
const mLogs=allLogs.filter(l=>l.date.startsWith(m)).sort((a,b)=>b.date.localeCompare(a.date));
const mTotal=mLogs.reduce((s,l)=>s+l.inc,0);
const isOpen=openMonth===m;
return(
<div key={m} style={{borderTop:"0.5px solid rgba(255,255,255,0.04)"}}>
<button onClick={()=>setOpenMonth(isOpen?null:m)} style={{width:"100%",background:SHADES[Math.min(mi+1,SHADES.length-1)],border:"none",padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
<div>
<div style={{fontSize:13,fontWeight:700,color:"#E8E5DC",marginBottom:2}}>{monthName(m)}</div>
<div style={{fontSize:10,color:"rgba(232,229,220,0.35)"}}>{mLogs.length} gün kapatıldı</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{fontWeight:800,fontSize:16,color:"#D4B83A",letterSpacing:-0.5}}>{fm(mTotal,cur)}</div>
<span style={{color:"rgba(232,229,220,0.2)",fontSize:14,transform:isOpen?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
</div>
</button>
{isOpen&&<div>
{mLogs.map((log,li)=>(
<button key={log.date} onClick={()=>setSelLog(log)} style={{width:"100%",background:"rgba(0,0,0,0.15)",border:"none",padding:"13px 20px 13px 32px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left",borderTop:"0.5px solid rgba(255,255,255,0.03)"}}>
<div>
<div style={{fontSize:12,fontWeight:600,color:"rgba(232,229,220,0.7)"}}>{fdl(log.date)}</div>
<div style={{fontSize:10,color:"rgba(232,229,220,0.3)",marginTop:2}}>{log.count||0} adisyon</div>
</div>
<div style={{fontWeight:700,fontSize:14,color:"#E8E5DC"}}>{fm(log.inc,cur)}</div>
</button>
))}
</div>}
</div>
);})}
</div>
)}
</div>}

{/* Expenses tab */}
{tab==="expenses"&&<div>
{/* Summary */}
<div style={{display:"flex",background:SHADES[0]}}>
{[{l:"Toplam",v:fm(totalExp,cur)},{l:"Kayıt",v:allExp.length+" adet"}].map((s,i)=>(
<div key={i} style={{flex:1,padding:"16px 16px",borderRight:i<1?"0.5px solid rgba(255,255,255,0.06)":"none"}}>
<div style={{fontSize:10,color:"rgba(232,229,220,0.35)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.8,marginBottom:4}}>{s.l}</div>
<div style={{fontSize:13,fontWeight:800,color:"#E8E5DC"}}>{s.v}</div>
</div>
))}
</div>

{/* Harcama ekle */}
<div style={{background:SHADES[1],borderBottom:"0.5px solid rgba(255,255,255,0.04)"}}>
<button onClick={()=>setShowEF(p=>!p)} style={{width:"100%",background:"transparent",border:"none",padding:"15px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",color:"rgba(232,229,220,0.5)",fontSize:13,fontWeight:600}}>
<span>{showEF?"İptal":"＋ Harcama Ekle"}</span>
<span style={{fontSize:16,opacity:0.4}}>{showEF?"✕":"+"}</span>
</button>
{showEF&&<div style={{padding:"0 20px 16px",display:"flex",flexDirection:"column",gap:8}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
<input placeholder="Açıklama" value={expF.desc} onChange={e=>setExpF(p=>({...p,desc:e.target.value}))} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",color:"#E8E5DC",fontSize:16,outline:"none"}}/>
<input type="number" placeholder="Tutar" value={expF.amount} onChange={e=>setExpF(p=>({...p,amount:e.target.value}))} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",color:"#E8E5DC",fontSize:16,outline:"none"}}/>
</div>
<input type="date" value={expF.date||tod()} onChange={e=>setExpF(p=>({...p,date:e.target.value}))} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",color:"#E8E5DC",fontSize:16,outline:"none"}}/>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{(ecats||[]).map(cat=><button key={cat} onClick={()=>setExpF(p=>({...p,cat}))} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:expF.cat===cat?"#D4B83A":"rgba(255,255,255,0.08)",color:expF.cat===cat?"#1A1A16":"rgba(232,229,220,0.5)"}}>{cat}</button>)}
</div>
<button onClick={()=>{if(expF.desc&&expF.amount){addExp();setShowEF(false);}}} style={{background:"#D4B83A",border:"none",borderRadius:10,padding:"12px",color:"#1A1A16",fontWeight:700,fontSize:14,cursor:"pointer",opacity:expF.desc&&expF.amount?1:0.5}}>Kaydet</button>
</div>}
</div>

{/* Expense month list */}
{allExp.length===0?(
<div style={{textAlign:"center",padding:"40px 20px",color:"rgba(232,229,220,0.3)",background:SHADES[2]}}>Harcama kaydı yok.</div>
):(
<div style={{display:"flex",flexDirection:"column"}}>
{expMonths.map((m,mi)=>{
const mExps=allExp.filter(e=>e.date.startsWith(m)).sort((a,b)=>b.date.localeCompare(a.date));
const mTotal=mExps.reduce((s,e)=>s+e.amount,0);
const isOpen=openExpMonth===m;
return(
<div key={m} style={{borderTop:"0.5px solid rgba(255,255,255,0.04)"}}>
<button onClick={()=>setOpenExpMonth(isOpen?null:m)} style={{width:"100%",background:SHADES[Math.min(mi+2,SHADES.length-1)],border:"none",padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
<div>
<div style={{fontSize:13,fontWeight:700,color:"#E8E5DC",marginBottom:2}}>{monthName(m)}</div>
<div style={{fontSize:10,color:"rgba(232,229,220,0.35)"}}>{mExps.length} kayıt</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{fontWeight:800,fontSize:16,color:"#C43A2A",letterSpacing:-0.5}}>{fm(mTotal,cur)}</div>
<span style={{color:"rgba(232,229,220,0.2)",fontSize:14,transform:isOpen?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
</div>
</button>
{isOpen&&<div>
{mExps.map((e,ei)=>(
<div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 20px 13px 32px",borderTop:"0.5px solid rgba(255,255,255,0.03)",background:"rgba(0,0,0,0.15)"}}>
<div>
<div style={{fontSize:12,fontWeight:600,color:"rgba(232,229,220,0.7)"}}>{e.desc||e.itemName||"—"}</div>
<div style={{fontSize:10,color:"rgba(232,229,220,0.3)",marginTop:2}}>{e.cat} · {fd(e.date)}</div>
</div>
<div style={{fontWeight:700,fontSize:14,color:"#C43A2A"}}>{fm(e.amount,cur)}</div>
</div>
))}
</div>}
</div>
);})}
</div>
)}
</div>}

</div>
);}

function LogV({log,setLogs,ecats,cur,fm,ft,fdl,repT,setRepT,setSelLog,inp,T,sb,orders,setOrd}){
const[editMode,setEditMode]=useState(false);
const[items,setItems]=useState(log.items||[]);
const[exps,setExps]=useState(log.exps||[]);
const[showAddExp,setShowAddExp]=useState(false);
const[newExp,setNewExp]=useState({desc:"",amount:"",cat:ecats[0]||""});
const[editOrderId,setEditOrderId]=useState(null);
const[orderEditForm,setOrderEditForm]=useState(null);

const dayOrders=(orders||[]).filter(o=>o.date===log.date).sort((a,b)=>new Date(b.ca)-new Date(a.ca));

const startEditOrder=(o)=>{
setEditOrderId(o.id);
setOrderEditForm({total:String(o.total),pt:o.pt,guest:o.guest||""});
};
const saveOrderEdit=(orderId)=>{
const oldOrder=dayOrders.find(o=>o.id===orderId);
if(!oldOrder)return;
const newTotal=parseFloat(orderEditForm.total)||0;
const newPt=orderEditForm.pt;
const newGuest=orderEditForm.guest;

setOrd(prev=>prev.map(o=>o.id===orderId?{...o,total:newTotal,pt:newPt,guest:newGuest}:o));

const incDiff=newTotal-oldOrder.total;
const cashDiff=(oldOrder.pt==="cash"?-oldOrder.total:0)+(newPt==="cash"?newTotal:0);
const cardDiff=(oldOrder.pt==="card"?-oldOrder.total:0)+(newPt==="card"?newTotal:0);

setLogs(prev=>prev.map(l=>{
if(l.id!==log.id)return l;
const newCash=(l.cash||0)+cashDiff;
const newCard=(l.card||0)+cardDiff;
const newInc=(l.inc||0)+incDiff;
return{...l,cash:newCash,card:newCard,inc:newInc,net:newInc-(l.exp||0)};
}));
setEditOrderId(null);
setOrderEditForm(null);
};
const deleteOrder=(orderId)=>{
const oldOrder=dayOrders.find(o=>o.id===orderId);
if(!oldOrder)return;
if(!window.confirm("Bu adisyonu silmek istediğine emin misin? Bu işlem geri alınamaz."))return;
setOrd(prev=>prev.filter(o=>o.id!==orderId));
setLogs(prev=>prev.map(l=>{
if(l.id!==log.id)return l;
const newCash=(l.cash||0)-(oldOrder.pt==="cash"?oldOrder.total:0);
const newCard=(l.card||0)-(oldOrder.pt==="card"?oldOrder.total:0);
const newInc=(l.inc||0)-oldOrder.total;
const newCount=Math.max(0,(l.count||0)-1);
return{...l,cash:newCash,card:newCard,inc:newInc,net:newInc-(l.exp||0),count:newCount};
}));
};

const cg={};items.forEach(it=>{const c=it.cat||"Diger";if(!cg[c])cg[c]=[];cg[c].push(it);});

const recalc=(newItems,newExps)=>{
const newInc=newItems.reduce((s,i)=>s+i.total,0);
const newExpTotal=newExps.reduce((s,e)=>s+e.amount,0);
return{inc:newInc,exp:newExpTotal,net:newInc-newExpTotal};
};

const saveChanges=()=>{
const{inc,exp,net}=recalc(items,exps);
setLogs(prev=>prev.map(l=>l.id===log.id?{...l,items,exps,inc,exp,net}:l));
setEditMode(false);
};

const updateItemQty=(name,delta)=>{
setItems(prev=>prev.map(it=>it.name===name?{...it,qty:Math.max(0,it.qty+delta),total:Math.max(0,it.qty+delta)*it.price}:it).filter(it=>it.qty>0));
};
const updateItemPrice=(name,newPrice)=>{
const p=parseFloat(newPrice)||0;
setItems(prev=>prev.map(it=>it.name===name?{...it,price:p,total:it.qty*p}:it));
};
const deleteItem=(name)=>{
if(window.confirm("Bu ürünü bu günün raporundan silmek istediğine emin misin?")){
setItems(prev=>prev.filter(it=>it.name!==name));
}
};
const deleteExp=(id)=>{
if(window.confirm("Bu gideri silmek istediğine emin misin?")){
setExps(prev=>prev.filter(e=>e.id!==id));
}
};
const updateExpAmount=(id,newAmt)=>{
const a=parseFloat(newAmt)||0;
setExps(prev=>prev.map(e=>e.id===id?{...e,amount:a}:e));
};
const addExp=()=>{
if(!newExp.desc||!newExp.amount)return;
setExps(prev=>[...prev,{id:Date.now()+Math.random(),...newExp,amount:parseFloat(newExp.amount),date:log.date}]);
setNewExp({desc:"",amount:"",cat:ecats[0]||""});
setShowAddExp(false);
};

const liveTotals=recalc(items,exps);

return(<div style={{padding:24,maxWidth:780,margin:"0 auto"}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<button onClick={()=>setSelLog(null)} style={{...sb(T.bg3),color:T.textSub,padding:"7px 12px"}}>Geri</button>
<div><h2 style={{margin:0,fontWeight:800,fontSize:20}}>{fdl(log.date)}</h2><div style={{fontSize:12,color:T.textSub}}>{ft(log.oa)} - {ft(log.ca)}</div></div>
</div>
{!editMode
?<button onClick={()=>{setItems(log.items||[]);setExps(log.exps||[]);setEditMode(true);}} style={{...sb(T.bg3),color:T.accentL,border:"0.5px solid "+T.border2,fontSize:12,padding:"8px 16px"}}>✎ Düzenle</button>
:<div style={{display:"flex",gap:8}}>
<button onClick={()=>{setItems(log.items||[]);setExps(log.exps||[]);setEditMode(false);}} style={{...sb(T.bg3),color:T.textSub,fontSize:12,padding:"8px 14px"}}>İptal</button>
<button onClick={saveChanges} style={{...sb(T.accent),fontSize:12,padding:"8px 16px"}}>Kaydet</button>
</div>}
</div>

{editMode&&<div style={{background:"rgba(196,136,42,0.1)",border:"1px solid rgba(255,149,0,0.3)",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#C4882A"}}>
Düzenleme modundasın. Değişiklikler "Kaydet"e basana kadar uygulanmaz.
</div>}

<div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:20}}>
<div style={{background:"rgba(74,138,90,0.12)",border:"1px solid #8FE3A8",borderRadius:12,padding:"16px 18px",gridColumn:"1/-1"}}><div style={{fontSize:11,color:T.textSub,marginBottom:4}}>Toplam Satış</div><div style={{fontSize:32,fontWeight:800,color:T.accentL}}>{fm(editMode?liveTotals.inc:log.inc,cur)}</div><div style={{fontSize:12,color:T.textSub,marginTop:4}}>{log.count} adisyon</div></div>
<div style={{background:"rgba(196,136,42,0.1)",border:"1px solid rgba(255,149,0,0.3)",borderRadius:12,padding:"16px 18px"}}><div style={{fontSize:11,color:"#C4882A",marginBottom:4}}>Nakit</div><div style={{fontSize:24,fontWeight:800,color:"#C4882A"}}>{fm(log.cash||0,cur)}</div></div>
<div style={{background:"rgba(90,122,90,0.15)",border:"1px solid rgba(0,122,255,0.3)",borderRadius:12,padding:"16px 18px"}}><div style={{fontSize:11,color:"#007AFF",marginBottom:4}}>Kart</div><div style={{fontSize:24,fontWeight:800,color:"#007AFF"}}>{fm(log.card||0,cur)}</div></div>
<div style={{background:"rgba(196,58,42,0.1)",border:"1px solid rgba(255,59,48,0.3)",borderRadius:12,padding:"16px 18px"}}><div style={{fontSize:11,color:T.textSub,marginBottom:4}}>Gider</div><div style={{fontSize:24,fontWeight:800,color:T.danger}}>{fm(editMode?liveTotals.exp:log.exp,cur)}</div></div>
<div style={{background:(editMode?liveTotals.net:log.net)>=0?"rgba(74,138,90,0.12)":"rgba(196,58,42,0.1)",border:"1px solid "+((editMode?liveTotals.net:log.net)>=0?"#8FE3A8":"rgba(255,59,48,0.3)"),borderRadius:12,padding:"16px 18px"}}><div style={{fontSize:11,color:T.textSub,marginBottom:4}}>Net Kâr</div><div style={{fontSize:24,fontWeight:800,color:(editMode?liveTotals.net:log.net)>=0?T.success:T.danger}}>{fm(editMode?liveTotals.net:log.net,cur)}</div></div>
</div>

<div style={{display:"flex",gap:0,background:"rgba(255,255,255,0.06)",borderRadius:10,padding:3,marginBottom:16,width:"fit-content"}}>
{[{k:"orders",l:"Adisyonlar"},{k:"items",l:"Satılan Ürünler"},{k:"guests",l:"Müşteri Raporu"}].map(({k,l})=><button key={k} onClick={()=>setRepT(k)} style={{padding:"7px 16px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:590,fontSize:13,background:repT===k?"rgba(255,255,255,0.12)":"transparent",color:repT===k?"#fff":T.textSub,boxShadow:repT===k?"0 1px 3px rgba(0,0,0,0.12)":"none"}}>{l}</button>)}
</div>

{repT==="orders"&&(dayOrders.length===0?<div style={{color:T.textDim,textAlign:"center",padding:"30px 0"}}>Bu güne ait adisyon kaydı yok.</div>
:<div style={{display:"flex",flexDirection:"column",gap:10}}>
{dayOrders.map(o=>{
const isEditing=editOrderId===o.id;
return(
<div key={o.id} style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:"14px 16px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
<div>
<div style={{fontWeight:700,fontSize:14}}>{o.tblName}{o.guest&&<span style={{color:T.accentL,marginLeft:8,fontWeight:500,fontSize:12}}>{o.guest}</span>}</div>
<div style={{fontSize:11,color:T.textSub,marginTop:2}}>{ft(o.ca)}</div>
</div>
{!isEditing&&<div style={{display:"flex",gap:6}}>
<button onClick={()=>startEditOrder(o)} style={{background:T.bg3,border:"none",borderRadius:7,padding:"5px 10px",cursor:"pointer",color:T.accentL,fontSize:11,fontWeight:600}}>✎ Düzenle</button>
<button onClick={()=>deleteOrder(o.id)} style={{background:T.bg3,border:"none",borderRadius:7,padding:"5px 10px",cursor:"pointer",color:T.danger,fontSize:11,fontWeight:600}}>Sil</button>
</div>}
</div>
<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
{(o.items||[]).map((it,ii)=><span key={ii} style={{background:T.bg3,padding:"2px 8px",borderRadius:20,fontSize:11,color:T.textSub}}>{it.name} x{it.qty}</span>)}
</div>
{!isEditing?(
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{fontSize:12,fontWeight:600,padding:"3px 10px",borderRadius:20,background:o.pt==="cash"?"rgba(196,136,42,0.1)":o.pt==="card"?"rgba(90,122,90,0.15)":"rgba(212,184,58,0.15)",color:o.pt==="cash"?"#C4882A":o.pt==="card"?"#007AFF":"#D4B83A"}}>{o.pt==="cash"?"Nakit":o.pt==="card"?"Kart":"Cari"}</span>
<span style={{fontWeight:800,fontSize:13,color:T.accentL}}>{fm(o.total,cur)}</span>
</div>
):(
<div style={{background:T.bg3,borderRadius:10,padding:12}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
<div>
<label style={{fontSize:10,color:T.textSub,display:"block",marginBottom:4}}>Tutar</label>
<input type="number" value={orderEditForm.total} onChange={e=>setOrderEditForm(p=>({...p,total:e.target.value}))} style={inp}/>
</div>
<div>
<label style={{fontSize:10,color:T.textSub,display:"block",marginBottom:4}}>Müşteri</label>
<input value={orderEditForm.guest} onChange={e=>setOrderEditForm(p=>({...p,guest:e.target.value}))} style={inp}/>
</div>
</div>
<div style={{marginBottom:10}}>
<label style={{fontSize:10,color:T.textSub,display:"block",marginBottom:4}}>Ödeme Tipi</label>
<div style={{display:"flex",gap:6}}>
{[{k:"cash",l:"Nakit"},{k:"card",l:"Kart"},{k:"credit",l:"Cari"}].map(({k,l})=>(
<button key={k} onClick={()=>setOrderEditForm(p=>({...p,pt:k}))} style={{flex:1,padding:"7px 0",borderRadius:7,border:"2px solid "+(orderEditForm.pt===k?T.accent:T.border),background:orderEditForm.pt===k?T.accent:T.bg2,color:orderEditForm.pt===k?"#fff":T.textSub,fontWeight:600,fontSize:11,cursor:"pointer"}}>{l}</button>
))}
</div>
</div>
<div style={{display:"flex",gap:8}}>
<button onClick={()=>{setEditOrderId(null);setOrderEditForm(null);}} style={{...sb(T.bg2),flex:1,color:T.textSub,fontSize:12,padding:"8px 0"}}>İptal</button>
<button onClick={()=>saveOrderEdit(o.id)} style={{...sb(T.accent),flex:1,fontSize:12,padding:"8px 0"}}>Kaydet</button>
</div>
</div>
)}
</div>
);
})}
</div>)}

{repT==="items"&&(Object.keys(cg).length===0?<div style={{color:T.textDim,textAlign:"center",padding:"30px 0"}}>Veri yok.</div>
:<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:20,marginBottom:16}}>
{Object.entries(cg).map(([cat,catItems])=><div key={cat} style={{marginBottom:16}}>
<div style={{fontSize:11,fontWeight:700,color:T.accent,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{cat}</div>
{catItems.map(item=><div key={item.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"0.5px solid "+T.border,gap:8}}>
<div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
{editMode
?<div style={{display:"flex",alignItems:"center",gap:4}}>
<button onClick={()=>updateItemQty(item.name,-1)} style={{width:22,height:22,borderRadius:6,border:"0.5px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:13,lineHeight:1}}>-</button>
<span style={{minWidth:22,textAlign:"center",fontWeight:800,fontSize:12}}>{item.qty}</span>
<button onClick={()=>updateItemQty(item.name,1)} style={{width:22,height:22,borderRadius:6,border:"0.5px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:13,lineHeight:1}}>+</button>
</div>
:<span style={{background:T.accent,color:T.text,fontSize:11,fontWeight:800,padding:"2px 7px",borderRadius:20,minWidth:26,textAlign:"center"}}>{item.qty}</span>
}
<span style={{fontSize:13,fontWeight:600}}>{item.name}</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
{editMode
?<input type="number" value={item.price} onChange={e=>updateItemPrice(item.name,e.target.value)} style={{width:70,background:T.bg3,border:"0.5px solid "+T.border2,borderRadius:6,padding:"4px 6px",fontSize:12,textAlign:"right"}}/>
:<div style={{textAlign:"right"}}><div style={{fontWeight:700,color:T.accentL,fontSize:13}}>{fm(item.total,cur)}</div><div style={{fontSize:10,color:T.textSub}}>{fm(item.price,cur)} x {item.qty}</div></div>
}
{editMode&&<button onClick={()=>deleteItem(item.name)} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",fontSize:15,padding:2}}>×</button>}
</div>
</div>)}
<div style={{display:"flex",justifyContent:"flex-end",paddingTop:5,fontSize:12,color:T.textSub}}>Toplam: <span style={{fontWeight:700,color:T.accentL,marginLeft:4}}>{fm(catItems.reduce((s,i)=>s+i.total,0),cur)}</span></div>
</div>)}
<div style={{display:"flex",justifyContent:"space-between",paddingTop:10,borderTop:"2px solid "+T.border2,fontWeight:800,fontSize:15}}><span>Genel</span><span style={{color:T.accentL}}>{fm(editMode?liveTotals.inc:log.inc,cur)}</span></div>
</div>)}

{repT==="guests"&&(()=>{
const gMap={};
dayOrders.forEach(o=>{
const gname=o.guest||"--";
if(!gMap[gname])gMap[gname]={name:gname,total:0,orders:[]};
gMap[gname].total+=o.total;
gMap[gname].orders.push(o);
});
const guestGroups=Object.values(gMap).sort((a,b)=>b.total-a.total);
return(
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:20}}>
{guestGroups.length===0?<div style={{color:T.textDim,textAlign:"center",padding:"30px 0"}}>Müşteri kaydi yok.</div>
:guestGroups.map((g,gi)=><div key={gi} style={{marginBottom:16,paddingBottom:16,borderBottom:"0.5px solid "+T.border}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:32,height:32,borderRadius:"50%",background:T.accentD,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,color:T.text}}>{g.name==="--"?"?":g.name[0].toUpperCase()}</div><div><div style={{fontWeight:700,fontSize:14}}>{g.name}</div><div style={{fontSize:11,color:T.textSub}}>{g.orders.length} adisyon</div></div></div>
<div style={{fontWeight:800,color:T.accentL,fontSize:13}}>{fm(g.total,cur)}</div>
</div>
{g.orders.map((o)=>{
const isEditing=editOrderId===o.id;
return(
<div key={o.id} style={{background:T.bg3,borderRadius:8,padding:"10px 12px",marginBottom:6}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
<span style={{fontSize:12,fontWeight:600}}>{o.tblName}</span>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:12,fontWeight:700,color:o.pt==="cash"?"#C4882A":o.pt==="card"?"#007AFF":"#D4B83A"}}>{fm(o.total,cur)} {o.pt==="cash"?"Nakit":o.pt==="card"?"Kart":"Cari"}</span>
{editMode&&!isEditing&&<div style={{display:"flex",gap:4}}>
<button onClick={()=>startEditOrder(o)} style={{background:T.bg2,border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer",color:T.accentL,fontSize:10,fontWeight:600}}>✎</button>
<button onClick={()=>deleteOrder(o.id)} style={{background:T.bg2,border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer",color:T.danger,fontSize:10,fontWeight:600}}>Sil</button>
</div>}
</div>
</div>
{!isEditing
?<div style={{display:"flex",flexWrap:"wrap",gap:4}}>{(o.items||[]).map((it,ii)=><span key={ii} style={{background:T.bg2,padding:"2px 7px",borderRadius:20,fontSize:11,color:T.textSub}}>{it.name} x{it.qty}</span>)}</div>
:<div style={{background:T.bg2,borderRadius:8,padding:10,marginTop:6}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
<div><label style={{fontSize:10,color:T.textSub,display:"block",marginBottom:4}}>Tutar</label><input type="number" value={orderEditForm.total} onChange={e=>setOrderEditForm(p=>({...p,total:e.target.value}))} style={inp}/></div>
<div><label style={{fontSize:10,color:T.textSub,display:"block",marginBottom:4}}>Müşteri</label><input value={orderEditForm.guest} onChange={e=>setOrderEditForm(p=>({...p,guest:e.target.value}))} style={inp}/></div>
</div>
<div style={{marginBottom:8}}>
<label style={{fontSize:10,color:T.textSub,display:"block",marginBottom:4}}>Ödeme Tipi</label>
<div style={{display:"flex",gap:6}}>
{[{k:"cash",l:"Nakit"},{k:"card",l:"Kart"},{k:"credit",l:"Cari"}].map(({k,l})=>(
<button key={k} onClick={()=>setOrderEditForm(p=>({...p,pt:k}))} style={{flex:1,padding:"6px 0",borderRadius:7,border:"2px solid "+(orderEditForm.pt===k?T.accent:T.border),background:orderEditForm.pt===k?T.accent:"#1E1E1E",color:orderEditForm.pt===k?"#fff":T.textSub,fontWeight:600,fontSize:10,cursor:"pointer"}}>{l}</button>
))}
</div>
</div>
<div style={{display:"flex",gap:6}}>
<button onClick={()=>{setEditOrderId(null);setOrderEditForm(null);}} style={{...sb(T.bg3),flex:1,color:T.textSub,fontSize:11,padding:"6px 0"}}>İptal</button>
<button onClick={()=>saveOrderEdit(o.id)} style={{...sb(T.accent),flex:1,fontSize:11,padding:"6px 0"}}>Kaydet</button>
</div>
</div>}
</div>
);
})}
</div>)}
</div>
);
})()}

<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:20,marginTop:16}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
<h3 style={{margin:0,fontWeight:700,fontSize:14}}>Giderler</h3>
{editMode&&<button onClick={()=>setShowAddExp(p=>!p)} style={{...sb(T.bg3),color:T.accentL,fontSize:11,padding:"5px 12px"}}>{showAddExp?"İptal":"+ Gider Ekle"}</button>}
</div>
{showAddExp&&editMode&&<div style={{background:T.bg3,borderRadius:10,padding:14,marginBottom:14}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
<input placeholder="Açıklama" value={newExp.desc} onChange={e=>setNewExp(p=>({...p,desc:e.target.value}))} style={inp}/>
<input type="number" placeholder="Tutar" value={newExp.amount} onChange={e=>setNewExp(p=>({...p,amount:e.target.value}))} style={inp}/>
<select value={newExp.cat} onChange={e=>setNewExp(p=>({...p,cat:e.target.value}))} style={inp}>{ecats.map(c=><option key={c}>{c}</option>)}</select>
</div>
<button onClick={addExp} style={{...sb(T.accent),fontSize:12,padding:"7px 16px"}}>Ekle</button>
</div>}
{exps.length===0?<div style={{color:T.textDim,fontSize:13,textAlign:"center",padding:"16px 0"}}>Gider yok.</div>
:exps.map(e=><div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"0.5px solid "+T.border,gap:8}}>
<div><div style={{fontSize:13,fontWeight:600}}>{e.desc}</div><div style={{fontSize:11,color:T.textSub}}>{e.cat}</div></div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
{editMode
?<input type="number" value={e.amount} onChange={ev=>updateExpAmount(e.id,ev.target.value)} style={{width:80,background:T.bg3,border:"0.5px solid "+T.border2,borderRadius:6,padding:"4px 6px",fontSize:12,textAlign:"right"}}/>
:<div style={{fontWeight:700,color:T.danger}}>{fm(e.amount,cur)}</div>
}
{editMode&&<button onClick={()=>deleteExp(e.id)} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",fontSize:15,padding:2}}>×</button>}
</div>
</div>)}
</div>
</div>);}

function SettleModal({selC,cur,fm,ft,T,sb,stT,setStT,setSelC,settle,partialPay}){
const[payMode,setPayMode]=useState("full");
const[discType,setDiscType]=useState("none");
const[discVal,setDiscVal]=useState("");
const[partialAmt,setPartialAmt]=useState("");
const rawTotal=selC.total;
const discAmt=discType==="percent"?rawTotal*(parseFloat(discVal)||0)/100:discType==="fixed"?Math.min(parseFloat(discVal)||0,rawTotal):0;
const afterDisc=rawTotal-discAmt;
const partialNum=Math.min(parseFloat(partialAmt)||0,rawTotal);
const remainingAfterPartial=rawTotal-partialNum;
const adisyonlar=selC.adisyonlar||[{tbl:selC.tbl,items:selC.items||[],total:selC.total,ca:selC.cAt}];
const pastPayments=selC.payments||[];

const doConfirm=()=>{
if(!stT)return;
if(payMode==="partial"){
if(partialNum<=0)return;
partialPay(selC.id,partialNum,stT);
}else{
settle(selC.id,stT,discAmt);
}
};

return(<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:"rgba(22,22,22,0.98)",backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",border:"0.5px solid rgba(255,255,255,0.85)",borderRadius:20,padding:28,width:400,boxShadow:"0 24px 48px rgba(0,0,0,0.15),0 0 0 0.5px rgba(255,255,255,0.5) inset",maxHeight:"85vh",overflowY:"auto"}}>
<div style={{fontWeight:800,fontSize:17,marginBottom:4}}>Cari Tahsil Et</div>
<div style={{fontSize:13,color:"#D4B83A",fontWeight:600,marginBottom:16}}>{selC.g}</div>
<div style={{background:T.bg3,borderRadius:10,padding:"10px 14px",marginBottom:14,maxHeight:160,overflowY:"auto"}}>
{adisyonlar.map((a,ai)=>(
<div key={ai} style={{marginBottom:ai<adisyonlar.length-1?10:0}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
<span style={{fontSize:11,color:"#D4B83A",fontWeight:700}}>{a.tbl} - {ft(a.ca)}</span>
<span style={{fontSize:12,fontWeight:700,color:"#D4B83A"}}>{fm(a.total,cur)}</span>
</div>
{(a.items||[]).map((it,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"1px 0",color:T.textSub}}><span>{it.name} x{it.qty}</span><span>{fm((it.price||0)*(it.qty||1),cur)}</span></div>)}
{ai<adisyonlar.length-1&&<div style={{borderBottom:"0.5px solid "+T.border,marginTop:6}}/>}
</div>
))}
</div>

{pastPayments.length>0&&<div style={{marginBottom:14}}>
<div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:6}}>Önceki Ödemeler</div>
<div style={{display:"flex",flexDirection:"column",gap:4}}>
{pastPayments.map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.textSub,background:T.bg3,borderRadius:7,padding:"5px 10px"}}><span>{ft(p.date)} · {p.pt==="cash"?"Nakit":"Kart"}</span><span style={{fontWeight:700,color:"#4A8A5A"}}>{fm(p.amount,cur)}</span></div>)}
</div>
</div>}

<div style={{display:"flex",gap:6,marginBottom:14,background:T.bg3,padding:3,borderRadius:9}}>
{[{k:"full",l:"Tam Tahsil"},{k:"partial",l:"Kısmi Ödeme"}].map(({k,l})=><button key={k} onClick={()=>{setPayMode(k);setStT(null);}} style={{flex:1,padding:"8px 0",borderRadius:7,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:payMode===k?"rgba(212,184,58,0.2)":"transparent",color:payMode===k?"#D4B83A":T.textSub,boxShadow:payMode===k?"0 1px 3px rgba(0,0,0,0.12)":"none"}}>{l}</button>)}
</div>

{payMode==="full"&&<>
<div style={{marginBottom:14}}>
<div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>İndirim</div>
<div style={{display:"flex",gap:6,marginBottom:8}}>
{[{k:"none",l:"Yok"},{k:"percent",l:"Yüzde %"},{k:"fixed",l:"Tutar"}].map(({k,l})=><button key={k} onClick={()=>{setDiscType(k);setDiscVal("");}} style={{flex:1,padding:"6px 0",borderRadius:7,border:"1px solid "+(discType===k?T.accent:T.border),background:discType===k?T.accent:T.bg3,color:discType===k?"#fff":T.textSub,fontWeight:600,fontSize:11,cursor:"pointer"}}>{l}</button>)}
</div>
{discType!=="none"&&<>
<input type="number" autoFocus placeholder={discType==="percent"?"0-100":"Tutar"} value={discVal} onChange={e=>setDiscVal(e.target.value)} style={{background:T.bg3,border:"0.5px solid "+T.border2,borderRadius:8,padding:"8px 12px",color:T.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:6}}/>
{discAmt>0&&<div style={{fontSize:11,color:T.textSub}}>İndirim: -{fm(discAmt,cur)}</div>}
</>}
</div>
<div style={{background:"rgba(212,184,58,0.15)",borderRadius:10,padding:"10px 14px",marginBottom:14}}>
{discAmt>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:4}}><span>Ara toplam</span><span>{fm(rawTotal,cur)}</span></div>}
{discAmt>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.danger,marginBottom:4}}><span>İndirim</span><span>-{fm(discAmt,cur)}</span></div>}
<div style={{display:"flex",justifyContent:"space-between",fontSize:18,fontWeight:800,color:"#D4B83A"}}><span>Tahsil Edilecek</span><span>{fm(afterDisc,cur)}</span></div>
</div>
</>}

{payMode==="partial"&&<>
<div style={{marginBottom:14}}>
<div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>Ödenen Tutar</div>
<input type="number" autoFocus placeholder={`Toplam borç: ${fm(rawTotal,cur)}`} value={partialAmt} onChange={e=>setPartialAmt(e.target.value)} style={{background:T.bg3,border:"0.5px solid "+T.border2,borderRadius:8,padding:"10px 12px",color:T.text,fontSize:15,fontWeight:700,outline:"none",width:"100%",boxSizing:"border-box"}}/>
</div>
<div style={{background:"rgba(212,184,58,0.15)",borderRadius:10,padding:"10px 14px",marginBottom:14}}>
<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:4}}><span>Toplam Borç</span><span>{fm(rawTotal,cur)}</span></div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#4A8A5A",marginBottom:4}}><span>Şimdi Alınacak</span><span>{fm(partialNum,cur)}</span></div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:18,fontWeight:800,color:"#D4B83A"}}><span>Kalan Bakiye</span><span>{fm(remainingAfterPartial,cur)}</span></div>
</div>
</>}

<div style={{display:"flex",gap:8,marginBottom:14}}>
{[{k:"cash",l:"Nakit",c:"#C4882A",bg:"rgba(196,136,42,0.1)",bd:"rgba(255,149,0,0.3)"},{k:"card",l:"Kart",c:"#007AFF",bg:"rgba(90,122,90,0.15)",bd:"rgba(0,122,255,0.3)"}].map(({k,l,c,bg,bd})=><button key={k} onClick={()=>setStT(k)} style={{flex:1,padding:"10px 0",borderRadius:8,border:"2px solid "+(stT===k?bd:T.border),background:stT===k?bg:T.bg3,color:stT===k?c:T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>)}
</div>
<div style={{display:"flex",gap:10}}>
<button onClick={()=>{setSelC(null);setStT(null);}} style={{...sb(T.bg3),flex:1,color:T.textSub}}>İptal</button>
<button onClick={doConfirm} disabled={!stT||(payMode==="partial"&&partialNum<=0)} style={{...sb(stT&&(payMode==="full"||partialNum>0)?T.success:T.bg3),flex:2,color:stT&&(payMode==="full"||partialNum>0)?"#fff":T.textDim}}>
{payMode==="partial"?`Ödeme Al${partialNum>0?" - "+fm(partialNum,cur):""}`:`Tahsil Et${stT?" - "+fm(afterDisc,cur):""}`}
</button>
</div>
</div></div>);}

function CariV({cari,setCari,cur,fm,fd,ft,selC,setSelC,stT,setStT,delC,setDelC,msg,T,sb,inp,PO,setV}){
const open=cari.filter(c=>!c.settled);const closed=cari.filter(c=>c.settled);
const openT=open.reduce((s,c)=>s+c.total,0);
const settle=(id,pt,discAmt)=>{setCari(prev=>prev.map(c=>c.id===id?{...c,settled:true,sAt:new Date().toISOString(),sPt:pt,settleDisc:discAmt||0}:c));setSelC(null);setStT(null);msg("Tahsil edildi");};
const partialPay=(id,amount,pt)=>{
setCari(prev=>prev.map(c=>{
if(c.id!==id)return c;
const newTotal=Math.max(0,c.total-amount);
const payment={id:Date.now()+Math.random(),amount,pt,date:new Date().toISOString()};
const newPayments=[...(c.payments||[]),payment];
if(newTotal<=0){
return{...c,total:0,settled:true,sAt:new Date().toISOString(),sPt:pt,payments:newPayments};
}
return{...c,total:newTotal,payments:newPayments};
}));
setSelC(null);setStT(null);
msg("Kısmi ödeme alındı");
};
const del=(id)=>{setCari(prev=>prev.filter(c=>c.id!==id));setDelC(null);msg("Silindi","err");};

const[showManual,setShowManual]=useState(false);
const[manualForm,setManualForm]=useState({name:"",amount:"",note:""});

const addManualCari=()=>{
if(!manualForm.name.trim()||!manualForm.amount)return;
const amt=parseFloat(manualForm.amount)||0;
const now=new Date().toISOString();
const today=now.split("T")[0];
setCari(prev=>[{
id:Date.now()+Math.random(),
g:manualForm.name.trim(),
tbl:"Manuel",
items:manualForm.note?[{name:manualForm.note,qty:1,price:amt}]:[],
sub:amt,
da:0,
total:amt,
oa:now,
cAt:now,
date:today,
settled:false
},...prev]);
setManualForm({name:"",amount:"",note:""});
setShowManual(false);
msg("Cari eklendi");
};

return(<div style={{padding:24,maxWidth:780,margin:"0 auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
<h2 style={{margin:0,fontWeight:700,fontSize:20}}>Cari Hesaplar</h2>
<button onClick={()=>setShowManual(p=>!p)} style={{...sb(showManual?T.bg3:"#D4B83A"),color:showManual?T.textSub:"#fff",fontSize:12,padding:"8px 16px"}}>{showManual?"İptal":"+ Manuel Cari Ekle"}</button>
</div>
<div style={{fontSize:12,color:T.textSub,marginBottom:22}}>Tahsil edilmemiş adisyonlar.</div>

{showManual&&<div style={{background:"rgba(212,184,58,0.15)",border:"1px solid rgba(212,184,58,0.3)",borderRadius:14,padding:20,marginBottom:22}}>
<div style={{fontWeight:700,fontSize:14,color:"#D4B83A",marginBottom:14}}>Manuel Cari Kaydı</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
<div><label style={{display:"block",fontSize:11,color:"#D4B83A",fontWeight:600,marginBottom:5}}>İsim Soyisim</label><input autoFocus placeholder="Örn: Salim Dalyan" value={manualForm.name} onChange={e=>setManualForm(p=>({...p,name:e.target.value}))} style={inp}/></div>
<div><label style={{display:"block",fontSize:11,color:"#D4B83A",fontWeight:600,marginBottom:5}}>Bakiye ({cur})</label><input type="number" placeholder="750" value={manualForm.amount} onChange={e=>setManualForm(p=>({...p,amount:e.target.value}))} style={inp}/></div>
</div>
<div style={{marginBottom:14}}>
<label style={{display:"block",fontSize:11,color:"#D4B83A",fontWeight:600,marginBottom:5}}>Not (opsiyonel)</label>
<input placeholder="Örn: Geçen ayki hesap" value={manualForm.note} onChange={e=>setManualForm(p=>({...p,note:e.target.value}))} style={inp}/>
</div>
<button onClick={addManualCari} style={{...sb("#D4B83A"),fontSize:13,padding:"9px 20px"}}>Ekle</button>
</div>}

{delC&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:"rgba(22,22,22,0.98)",backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)",border:"0.5px solid rgba(255,255,255,0.85)",borderRadius:20,padding:28,width:340,boxShadow:"0 24px 48px rgba(0,0,0,0.15)"}}><div style={{fontWeight:800,fontSize:17,color:T.danger,marginBottom:10}}>Cari Hesabı Sil</div><p style={{fontSize:13,color:T.textSub,margin:"0 0 20px"}}>Kalıcı olarak silinecek.</p><div style={{display:"flex",gap:10}}><button onClick={()=>setDelC(null)} style={{...sb(T.bg3),flex:1,color:T.text}}>İptal</button><button onClick={()=>del(delC)} style={{...sb(T.danger),flex:1}}>Evet, Sil</button></div></div></div>}
{selC&&<SettleModal selC={selC} cur={cur} fm={fm} ft={ft} T={T} sb={sb} stT={stT} setStT={setStT} setSelC={setSelC} settle={settle} partialPay={partialPay}/>}
<div style={{background:"rgba(212,184,58,0.15)",border:"1px solid rgba(212,184,58,0.3)",borderRadius:12,padding:"14px 18px",marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:11,color:"#D4B83A",marginBottom:4}}>Açık Cari</div><div style={{fontSize:26,fontWeight:800,color:"#1A1A16"}}>{fm(openT,cur)}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:22,fontWeight:800,color:"#D4B83A"}}>{open.length}</div><div style={{fontSize:11,color:T.textSub}}>hesap</div></div></div>
{open.length===0?<div style={{textAlign:"center",padding:"30px 0",color:T.textDim,background:T.bg2,borderRadius:12,marginBottom:20}}>Açık hesap yok.</div>
:<div style={{marginBottom:24}}>{open.map(c=>{
const adisyonlar=c.adisyonlar||[{id:c.id+"_0",tbl:c.tbl,items:c.items,sub:c.sub,da:c.da||0,total:c.total,oa:c.oa,ca:c.cAt,date:c.date}];
return(<div key={c.id} style={{background:T.bg2,border:"2px solid rgba(212,184,58,0.3)",borderRadius:12,padding:"14px 16px",marginBottom:10}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
<div><div style={{fontWeight:800,fontSize:13}}>{c.g||"İsimsiz"}</div><div style={{fontSize:11,color:T.textSub,marginTop:3}}>{adisyonlar.length} adisyon</div></div>
<div style={{fontWeight:800,fontSize:20,color:"#D4B83A"}}>{fm(c.total,cur)}</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
{adisyonlar.map((a,ai)=>(
<div key={a.id||ai} style={{background:"rgba(212,184,58,0.15)",borderRadius:9,padding:"10px 12px"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
<div style={{fontSize:11,color:"#D4B83A",fontWeight:700}}>{a.tbl}</div>
<div style={{fontSize:12,fontWeight:800,color:"#D4B83A"}}>{fm(a.total,cur)}</div>
</div>
<div style={{fontSize:10,color:T.textSub,marginBottom:6}}>{fd(a.ca)} {ft(a.ca)}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:4}}>
{a.items.map((it,i)=><span key={i} style={{background:T.bg2,padding:"2px 8px",borderRadius:20,fontSize:11,color:T.textSub}}>{it.name} x{it.qty}</span>)}
</div>
{a.da>0&&<div style={{fontSize:11,color:T.danger,marginTop:4}}>İndirim: -{fm(a.da,cur)}</div>}
</div>
))}
</div>
<div style={{display:"flex",gap:8}}><button onClick={()=>{setSelC(c);setStT(null);}} style={{...sb("#D4B83A"),flex:1,color:"#1A1A16",fontSize:12}}>Tahsil Et</button><button onClick={()=>setDelC(c.id)} style={{background:T.bg3,border:"none",borderRadius:8,padding:"10px 14px",cursor:"pointer",color:T.danger,fontSize:13}}>x</button></div>
</div>);})}</div>}
{closed.length>0&&<div><div style={{fontSize:12,fontWeight:700,color:T.textSub,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Kapatılmış</div>
{closed.map(c=><div key={c.id} style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:10,padding:"12px 14px",marginBottom:8,opacity:0.7}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,fontSize:13}}>{c.g||"İsimsiz"}</div><div style={{fontSize:11,color:T.textSub}}>{c.tbl} - {fd(c.cAt)}</div><div style={{fontSize:11,color:T.success,marginTop:2}}>{fd(c.sAt)} - {c.sPt==="cash"?"Nakit":"Kart"}</div></div><div style={{textAlign:"right"}}><div style={{fontWeight:800,color:T.accentL}}>{fm(c.total,cur)}</div><button onClick={()=>setDelC(c.id)} style={{background:"none",border:"none",color:T.textDim,cursor:"pointer",padding:"4px 0",marginTop:4,fontSize:13}}>x</button></div></div></div>)}
</div>}
</div>);}

function SetV({cfg,cfgF,setCfgF,saveCfg,stab,setStab,menu,mF,setMF,mEid,setMEid,mCat,setMCat,saveMI,setMenü,ecats,setEc,newec,setNewec,exp,msg,setOrd,setExp,setLogs,cur,fm,inp,sb,T,logs,onlineOrders,todos,tacoLogs,tacoMenu,notifications,cari,installments}){
return(<div style={{padding:24,maxWidth:860,margin:"0 auto"}}>
<h2 style={{margin:"0 0 20px",fontWeight:700,fontSize:20}}>Ayarlar</h2>
<div style={{display:"flex",gap:8,marginBottom:22}}>
{[{k:"general",l:"Genel"},{k:"menu",l:"Menü"},{k:"ecats",l:"Harcama Kategorileri"}].map(({k,l})=><button key={k} onClick={()=>setStab(k)} style={{padding:"9px 20px",borderRadius:9,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:stab===k?T.accent:"#1E1E1E",color:stab===k?"#fff":T.textSub}}>{l}</button>)}
</div>
{stab==="general"&&<>
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:22,marginBottom:16}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:16}}>İşletme Bilgileri</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>İşletme Adı</label><input value={cfgF.name} onChange={e=>setCfgF(p=>({...p,name:e.target.value}))} style={inp}/></div>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>Para Birimi</label><input value={cfgF.cur} onChange={e=>setCfgF(p=>({...p,cur:e.target.value}))} style={{...inp,maxWidth:80}}/></div>

</div>
</div>
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:22,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:6}}>Online Sipariş Platformları</div>
<div style={{fontSize:12,color:T.textSub,marginBottom:14}}>Pasif platformlar Online sayfasında görünmez, geçmiş veriler silinmez.</div>
{[{k:"yemeksepeti",l:"Yemeksepeti",color:"#FA0050"},{k:"ubereats",l:"Uber Eats",color:"#06C167"}].map(p=>{
const hidden=(cfgF.hiddenPlatforms||[]).includes(p.k);
return(<div key={p.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{width:8,height:8,borderRadius:"50%",background:hidden?"#444":p.color}}/>
<span style={{fontSize:13,fontWeight:600,color:hidden?T.textDim:T.text}}>{p.l}</span>
<span style={{fontSize:11,color:hidden?"#C43A2A":"#4A8A5A",fontWeight:600}}>{hidden?"Pasif":"Aktif"}</span>
</div>
<div onClick={()=>setCfgF(prev=>{const h=prev.hiddenPlatforms||[];const newH=h.includes(p.k)?h.filter(x=>x!==p.k):[...h,p.k];return{...prev,hiddenPlatforms:newH};})} style={{width:44,height:24,borderRadius:12,background:hidden?T.bg3:"#4A8A5A",border:"0.5px solid "+T.border2,position:"relative",cursor:"pointer"}}>
<div style={{position:"absolute",top:3,left:hidden?3:22,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"left 0.2s"}}/>
</div>
</div>);})}
<button onClick={saveCfg} style={{...sb(T.accent),marginTop:14,padding:"10px 22px",fontSize:13}}>Kaydet</button>
</div>
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:22,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:6}}>Hedef Takibi</div>
<div style={{fontSize:12,color:T.textSub,marginBottom:14}}>Bugün sayfasında aylık ve haftalık hedefe göre ilerlemenizi takip edebilirsiniz.</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>Haftalık Hedef ({cur})</label><input type="number" min="0" placeholder="örn: 20000" value={cfgF.weeklyGoal||""} onChange={e=>setCfgF(p=>({...p,weeklyGoal:parseFloat(e.target.value)||0}))} style={inp}/></div>
</div>
<button onClick={saveCfg} style={{...sb(T.accent),marginTop:14,padding:"10px 22px",fontSize:13}}>Hedefleri Güncelle</button>
</div>
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:22,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:14}}>Adisyon Ayarları</div>
<label style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
<div onClick={()=>setCfgF(p=>({...p,requireName:!p.requireName}))} style={{width:44,height:24,borderRadius:12,background:cfgF.requireName?T.accent:T.bg3,border:"0.5px solid "+T.border2,position:"relative",cursor:"pointer"}}><div style={{position:"absolute",top:3,left:cfgF.requireName?22:3,width:16,height:16,borderRadius:"50%",background:T.bg2}}/></div>
<div><div style={{fontWeight:600,fontSize:13}}>Müşteri Adı Zorunlu</div><div style={{fontSize:11,color:T.textSub}}>Adisyon açılırken isim istenir</div></div>
</label>
</div>
<div style={{background:T.bg2,border:"0.5px solid "+T.border,borderRadius:12,padding:22,marginBottom:20}}>
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

<div style={{background:"rgba(196,58,42,0.1)",border:"1px solid rgba(255,59,48,0.3)",borderRadius:12,padding:18,marginTop:16}}>
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
        <button onClick={()=>setShowDatePicker(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:rangeLabel?"rgba(74,138,90,0.12)":T.bg3,border:"1px solid "+(rangeLabel?"#8FE3A8":T.border2),borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,color:rangeLabel?"#4A8A5A":T.textSub}}>
          📅 {rangeLabel||"Tarih Aralığı"}
          {rangeLabel&&<span onClick={e=>{e.stopPropagation();clearRange();}} style={{marginLeft:4,color:"#4A8A5A",fontWeight:800,fontSize:14,lineHeight:1}}>×</span>}
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
    <div style={{background:T.bg2,borderRadius:14,padding:"16px 18px",color:T.text}}>
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

<div style={{background:T.bg2,borderRadius:14,padding:"20px 22px",color:T.text,marginBottom:20}}>
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
<div style={{background:"rgba(74,138,90,0.12)",border:"1px solid #8FE3A8",borderRadius:14,padding:20,marginBottom:20}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
<span style={{fontSize:20}}>✓</span>
<div style={{fontWeight:700,fontSize:15,color:"#4A8A5A"}}>Eski raporlar içe aktarıldı</div>
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
<span style={{color:"#C4882A"}}>{fm(l.cash,cur)}</span>
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
const dow=now.getDay();const diffToMon=dow===0?-6:1-dow;
const weekStart=new Date(now);weekStart.setDate(now.getDate()+diffToMon);
const weekStartStr=weekStart.toISOString().split("T")[0];
const weekEnd=new Date(weekStart);weekEnd.setDate(weekStart.getDate()+6);
const weekEndStr=weekEnd.toISOString().split("T")[0];
const weeklyRev=[...allLogs,...(orders||[]).filter(o=>o.date&&o.date>=weekStartStr&&o.date<=weekEndStr&&!allLogs.find(l=>l.date===o.date))].filter(l=>l.date&&l.date>=weekStartStr&&l.date<=weekEndStr).reduce((s,l)=>s+(l.inc||l.total||0),0);
const weeklyGoal=cfg?.weeklyGoal||0;
const weekPct=weeklyGoal>0?Math.min(100,Math.round(weeklyRev/weeklyGoal*100)):0;
const earnedCount=(badges||[]).filter(b=>b.done).length;
const openCari=(cari||[]).filter(c=>!c.settled).length;
const overdueCount=(installments||[]).reduce((s,p)=>s+(p.installments||[]).filter(i=>!i.paid&&i.due&&new Date(i.due)<new Date(tod())).length,0);
const[hideAmounts,setHideAmounts]=useState(false);
const mask=v=>hideAmounts?"••••••":v;

const NAV=[
  {k:"home",    label:"Bugün",        sub:day?"Gün açık — "+ft(day.oa):"Gün kapalı",         val:null,     idx:0},
  {k:"tables",  label:"Masalar",      sub:"Aktif siparişler",                                  val:null,     idx:1},
  {k:"reports", label:"Raporlar",     sub:"Satış & harcama",                                   val:null,     idx:2},
  {k:"installments",label:"Vadeler",  sub:overdueCount>0?overdueCount+" gecikmiş":"Taksit takibi", val:overdueCount||null, idx:3},
  {k:"credit",  label:"Cari",         sub:openCari>0?openCari+" açık hesap":"Müşteri alacakları", val:openCari||null, idx:4},
  {k:"achievements",label:"Rozetler", sub:earnedCount+"/"+((badges||[]).length)+" kazanıldı",  val:null,     idx:5},
  {k:"todo",    label:"Yapılacaklar", sub:"Görevler & notlar",                                 val:null,     idx:6},
  {k:"settings",label:"Ayarlar",      sub:"Sistem & menü",                                    val:null,     idx:7},
];

return(
<div style={{padding:0,maxWidth:680,margin:"0 auto"}}>

{/* Sarı header kartı */}
<div style={{background:"#D4B83A",padding:"28px 20px 24px",position:"relative",overflow:"hidden",cursor:"pointer"}} onClick={()=>setHideAmounts(p=>!p)}>
<div style={{position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
<div style={{position:"absolute",bottom:-40,left:-20,width:150,height:150,borderRadius:"50%",background:"rgba(0,0,0,0.05)",pointerEvents:"none"}}/>
<div style={{fontSize:11,color:"rgba(0,0,0,0.4)",fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,marginBottom:6}}>
{now.toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}
</div>
<h1 style={{fontSize:isMobile?38:48,fontWeight:800,letterSpacing:-2,margin:"0 0 8px",color:"#1A1A16",lineHeight:1}}>LURK.</h1>
<div style={{display:"flex",gap:8,alignItems:"center",marginBottom:weeklyGoal>0?16:0,flexWrap:"wrap"}}>
{day
?<span style={{background:"rgba(0,0,0,0.1)",color:"#1A1A16",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>● AÇIK {ft(day.oa)}</span>
:<span style={{background:"rgba(0,0,0,0.08)",color:"rgba(0,0,0,0.45)",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>● KAPALI</span>}
{overdueCount>0&&<span style={{background:"rgba(196,58,42,0.15)",color:"#8A2A1A",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:20}}>{overdueCount} gecikmiş vade</span>}
<span style={{marginLeft:"auto",fontSize:11,color:"rgba(0,0,0,0.35)",fontWeight:600}}>{hideAmounts?"Göster ◎":"Gizle ◉"}</span>
</div>
{weeklyGoal>0&&<div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
<span style={{fontSize:11,color:"rgba(0,0,0,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>Bu Hafta</span>
<span style={{fontSize:11,color:"rgba(0,0,0,0.4)",fontWeight:600}}>%{weekPct}</span>
</div>
<div style={{fontSize:isMobile?26:32,fontWeight:800,color:"#1A1A16",letterSpacing:-1,marginBottom:8}}>{mask(fm(weeklyRev,cur))}</div>
<div style={{background:"rgba(0,0,0,0.12)",borderRadius:4,height:5,overflow:"hidden"}}>
<div style={{height:"100%",width:weekPct+"%",background:"rgba(0,0,0,0.3)",borderRadius:4,transition:"width 0.8s"}}/>
</div>
<div style={{fontSize:11,color:"rgba(0,0,0,0.35)",marginTop:5}}>/ {mask(fm(weeklyGoal,cur))}{weekPct>=100?" 🎯":""}</div>
</div>}
</div>

{/* Stacked nav kartları */}
<div style={{display:"flex",flexDirection:"column",gap:0}}>
{NAV.map((item,i)=>(
<button key={item.k} onClick={()=>setV(item.k)} style={{
  width:"100%",
  background:SHADES[Math.min(i,SHADES.length-1)],
  border:"none",
  borderTop:"0.5px solid rgba(255,255,255,0.04)",
  padding:"18px 20px",
  cursor:"pointer",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  textAlign:"left",
}}>
<div>
<div style={{fontSize:13,fontWeight:700,color:"#E8E5DC",marginBottom:3,letterSpacing:0.1}}>{item.label}</div>
<div style={{fontSize:11,color:"rgba(232,229,220,0.4)"}}>{item.sub}</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
{item.val!=null&&<span style={{background:"#D4B83A",color:"#1A1A16",fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:20}}>{item.val}</span>}
<span style={{color:"rgba(232,229,220,0.25)",fontSize:16}}>›</span>
</div>
</button>
))}
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
<button onClick={()=>{setAuthed(true);}} style={{background:T.accent,border:"none",color:T.text,borderRadius:10,padding:"13px 0",fontWeight:600,fontSize:14,cursor:"pointer",width:"100%"}}>Sisteme Gir</button>
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
<button onClick={tryRecover} style={{background:T.accent,border:"none",color:T.text,borderRadius:10,padding:"13px 0",fontWeight:600,fontSize:14,cursor:"pointer",width:"100%",marginBottom:10}}>Onayla</button>
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
<button onClick={tryLogin} style={{background:T.accent,border:"none",color:T.text,borderRadius:10,padding:"13px 0",fontWeight:600,fontSize:14,cursor:"pointer",width:"100%",marginBottom:14}}>Giriş Yap</button>
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
  day_5k:{color:"#5A7A5A",icon:"⚡"},
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
<div style={{background:"#E8E5DC",borderBottom:"1px solid "+("rgba(60,60,67,0.12)"),padding:"28px 28px 24px"}}>
<div style={{maxWidth:920,margin:"0 auto"}}>
<button onClick={()=>setV("lurk")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:16,padding:0}}>← Dashboard</button>
<h2 style={{margin:"0 0 20px",fontSize:28,fontWeight:800,letterSpacing:-0.5,color:T.text}}>Rozetler</h2>

{/* Progress bar büyük */}
<div style={{display:"flex",alignItems:"center",gap:16}}>
<div style={{flex:1,background:T.bg2,borderRadius:4,height:8,overflow:"hidden",border:"1px solid "+T.border}}>
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
  background:st.color,color:T.text,
  fontSize:10,fontWeight:700,
  borderRadius:20,padding:"2px 7px",
  border:"2px solid "+T.bg,
  letterSpacing:0.5,
}}>×{b.count}</div>}

{/* Yeni kazanıldı efekti */}
{isUnlocked&&unlockedAt&&(new Date()-new Date(unlockedAt))<1000*60*60*24*3&&<div style={{
  position:"absolute",top:-4,left:-4,
  background:"#C0922A",color:T.text,
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
<div style={{width:"100%",height:3,background:T.bg2,borderRadius:2,overflow:"hidden",marginBottom:3}}>
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
{!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:"#C4882A",flexShrink:0,marginTop:4}}/>}
</div>
))}
</div>
)}
</div>);}

function CreditPageV({cari,setCari,cur,fm,fd,ft,T,sb,inp,setV,tables,setTbl,uid}){
return(
<div style={{maxWidth:680,margin:"0 auto"}}>
<div style={{background:"#D4B83A",padding:"24px 20px 20px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-50,right:-50,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
<div style={{fontSize:11,color:"rgba(0,0,0,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4,cursor:"pointer"}} onClick={()=>setV("lurk")}>← Dashboard</div>
<div style={{fontSize:28,fontWeight:800,color:"#1A1A16",letterSpacing:-1}}>Cari Hesaplar</div>
</div>
<CariInReportsV cari={cari} setCari={setCari} cur={cur} fm={fm} fd={fd} ft={ft} T={T} sb={sb} inp={inp} tables={tables} setTbl={setTbl} uid={uid} tod={()=>new Date().toISOString().split("T")[0]}/>
</div>
);}

function InstallmentsPageV({installments,setInstallments,cur,fm,fd,ft,tod,T,sb,inp,setV,notifications,setNotifications}){
const now=new Date();
const today=tod();
const[activeTab,setActiveTab]=useState("is");
const[showAdd,setShowAdd]=useState(false);
const[newPlan,setNewPlan]=useState({name:"",category:activeTab,rows:[{id:1,due:"",amount:""}]});
const addRow=()=>setNewPlan(p=>({...p,rows:[...p.rows,{id:Date.now(),due:"",amount:""}]}));
const removeRow=(id)=>setNewPlan(p=>({...p,rows:p.rows.filter(r=>r.id!==id)}));
const updateRow=(id,field,val)=>setNewPlan(p=>({...p,rows:p.rows.map(r=>r.id===id?{...r,[field]:val}:r)}));
const daysUntil=(due)=>due?Math.round((new Date(due)-new Date(today))/(1000*60*60*24)):999;
const[expandedPlan,setExpandedPlan]=useState(null);

const filteredPlans=(installments||[]).filter(p=>(p.category||"is")===activeTab);
const unpaidTotal=filteredPlans.reduce((s,p)=>s+(p.installments||[]).filter(i=>!i.paid).reduce((ss,i)=>ss+i.amount,0),0);
const overdueCount=filteredPlans.reduce((s,p)=>s+(p.installments||[]).filter(i=>!i.paid&&i.due&&daysUntil(i.due)<0).length,0);

const addPlan=()=>{
  if(!newPlan.name)return;
  const insts=newPlan.rows.filter(r=>r.amount).map((r,i)=>({id:Date.now()+"_"+i,due:r.due||"",note:r.note||"",amount:parseFloat(r.amount),paid:false}));
  if(insts.length===0)return;
  const total=insts.reduce((s,i)=>s+i.amount,0);
  setInstallments(prev=>[{id:Date.now()+"",name:newPlan.name,total,category:newPlan.category||activeTab,installments:insts},...prev]);
  setNewPlan({name:"",category:activeTab,rows:[{id:1,due:"",amount:""}]});
  setShowAdd(false);
};

const togglePaid=(planId,instId)=>{
  setInstallments(prev=>prev.map(p=>p.id===planId?{...p,installments:p.installments.map(i=>i.id===instId?{...i,paid:!i.paid}:i)}:p));
};
const deletePlan=(id)=>setInstallments(prev=>prev.filter(p=>p.id!==id));

return(
<div style={{maxWidth:680,margin:"0 auto"}}>

{/* Sarı header */}
<div style={{background:"#D4B83A",padding:"24px 20px 20px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-50,right:-50,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
<div style={{fontSize:11,color:"rgba(0,0,0,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4,cursor:"pointer"}} onClick={()=>setV("lurk")}>← Dashboard</div>
<div style={{fontSize:28,fontWeight:800,color:"#1A1A16",letterSpacing:-1,marginBottom:8}}>Vadeler</div>
<div style={{display:"flex",gap:12}}>
<div><div style={{fontSize:22,fontWeight:800,color:"#1A1A16",letterSpacing:-0.5}}>{fm(unpaidTotal,cur)}</div><div style={{fontSize:10,color:"rgba(0,0,0,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.8}}>Kalan</div></div>
{overdueCount>0&&<div style={{marginLeft:16}}><div style={{fontSize:22,fontWeight:800,color:"rgba(196,58,42,0.8)",letterSpacing:-0.5}}>{overdueCount}</div><div style={{fontSize:10,color:"rgba(0,0,0,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.8}}>Gecikmiş</div></div>}
</div>
</div>

{/* Kategori tabs */}
<div style={{display:"flex",background:SHADES[0],borderBottom:"0.5px solid rgba(255,255,255,0.04)"}}>
{[{k:"is",l:"İŞ"},{k:"kisisel",l:"KİŞİSEL"}].map(({k,l})=>(
<button key={k} onClick={()=>{setActiveTab(k);setShowAdd(false);setNewPlan({name:"",category:k,rows:[{id:1,due:"",amount:""}]});}} style={{flex:1,padding:"13px 0",border:"none",background:"none",borderBottom:`2.5px solid ${activeTab===k?"#D4B83A":"transparent"}`,color:activeTab===k?"#D4B83A":"rgba(232,229,220,0.35)",fontWeight:700,fontSize:12,cursor:"pointer",letterSpacing:1}}>{l}</button>
))}
</div>

{/* Vade ekle */}
<div style={{background:SHADES[1],borderBottom:"0.5px solid rgba(255,255,255,0.04)"}}>
<button onClick={()=>{setShowAdd(p=>!p);setNewPlan({name:"",category:activeTab,rows:[{id:Date.now(),due:"",amount:""}]});}} style={{width:"100%",background:"transparent",border:"none",padding:"15px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",color:"rgba(232,229,220,0.5)",fontSize:13,fontWeight:600}}>
<span>{showAdd?"İptal":"＋ Vade Ekle"}</span>
<span style={{fontSize:16,opacity:0.4}}>{showAdd?"✕":"+"}</span>
</button>
{showAdd&&<div style={{padding:"0 20px 16px"}}>
<input placeholder="Plan adı (örn: Kira Borcu)" value={newPlan.name} onChange={e=>setNewPlan(p=>({...p,name:e.target.value}))} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 12px",color:"#E8E5DC",fontSize:16,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:10}}/>
{(newPlan.rows||[]).map((row,i)=>(
<div key={row.id} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
<span style={{fontSize:11,color:"rgba(232,229,220,0.3)",minWidth:18}}>{i+1}.</span>
<input placeholder="Not" value={row.note||""} onChange={e=>updateRow(row.id,"note",e.target.value)} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"9px 10px",color:"#E8E5DC",fontSize:16,outline:"none",flex:"0 0 130px"}}/>
<input type="number" placeholder="Tutar" value={row.amount} onChange={e=>updateRow(row.id,"amount",e.target.value)} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"9px 10px",color:"#E8E5DC",fontSize:16,outline:"none",flex:1}}/>
<input type="date" value={row.due||""} onChange={e=>updateRow(row.id,"due",e.target.value)} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"9px 10px",color:"#E8E5DC",fontSize:16,outline:"none",flex:"0 0 130px"}}/>
{newPlan.rows.length>1&&<button onClick={()=>removeRow(row.id)} style={{background:"none",border:"none",color:"rgba(196,58,42,0.7)",cursor:"pointer",fontSize:18,padding:"0 4px",flexShrink:0}}>×</button>}
</div>
))}
<div style={{display:"flex",gap:8,marginTop:4}}>
<button onClick={addRow} style={{flex:1,padding:"9px",background:"rgba(255,255,255,0.06)",border:"0.5px dashed rgba(255,255,255,0.15)",borderRadius:10,color:"rgba(232,229,220,0.4)",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ Taksit Ekle</button>
<button onClick={addPlan} disabled={!newPlan.name} style={{flex:2,padding:"9px",background:newPlan.name?"#D4B83A":"rgba(255,255,255,0.06)",color:newPlan.name?"#1A1A16":"rgba(232,229,220,0.3)",border:"none",borderRadius:10,fontWeight:700,fontSize:13,cursor:newPlan.name?"pointer":"not-allowed"}}>
Kaydet {newPlan.rows.filter(r=>r.amount).length>0&&"— "+fm(newPlan.rows.filter(r=>r.amount).reduce((s,r)=>s+(parseFloat(r.amount)||0),0),cur)}
</button>
</div>
</div>}
</div>

{/* Plan listesi */}
{filteredPlans.length===0?(
<div style={{textAlign:"center",padding:"50px 20px",color:"rgba(232,229,220,0.3)",background:SHADES[2]}}>
{activeTab==="kisisel"?"Kişisel vade kaydı yok.":"İş vadesi kaydı yok."}
</div>
):(
<div style={{display:"flex",flexDirection:"column"}}>
{filteredPlans.map((plan,pi)=>{
const unpaid=(plan.installments||[]).filter(i=>!i.paid);
const paid=(plan.installments||[]).filter(i=>i.paid);
const remaining=unpaid.reduce((s,i)=>s+i.amount,0);
const isOpen=expandedPlan===plan.id;
return(
<div key={plan.id} style={{borderTop:"0.5px solid rgba(255,255,255,0.04)"}}>
<button onClick={()=>setExpandedPlan(isOpen?null:plan.id)} style={{width:"100%",background:SHADES[Math.min(pi+2,SHADES.length-1)],border:"none",padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
<div>
<div style={{fontSize:13,fontWeight:700,color:"#E8E5DC",marginBottom:3}}>{plan.name}</div>
<div style={{fontSize:10,color:"rgba(232,229,220,0.35)"}}>{unpaid.length} bekleyen · {paid.length} ödendi</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{fontWeight:800,fontSize:16,color:remaining>0?"#D4B83A":"#4A8A5A",letterSpacing:-0.5}}>{fm(remaining,cur)}</div>
<span style={{color:"rgba(232,229,220,0.2)",fontSize:14,transform:isOpen?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
</div>
</button>
{isOpen&&<div style={{background:"rgba(0,0,0,0.15)"}}>
{(plan.installments||[]).map((inst,ii)=>{
const d=inst.due?daysUntil(inst.due):999;
const isOverdue=!inst.paid&&inst.due&&d<0;
return(
<div key={inst.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 20px",borderTop:"0.5px solid rgba(255,255,255,0.03)"}}>
<button onClick={()=>togglePaid(plan.id,inst.id)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${inst.paid?"#4A8A5A":"rgba(232,229,220,0.2)"}`,background:inst.paid?"#4A8A5A":"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
{inst.paid&&<span style={{color:"#fff",fontSize:12}}>✓</span>}
</button>
<div style={{flex:1}}>
<div style={{fontSize:12,fontWeight:600,color:inst.paid?"rgba(232,229,220,0.3)":"#E8E5DC",textDecoration:inst.paid?"line-through":"none"}}>
{inst.note||`${ii+1}. Taksit`}{inst.due?` — ${fd(inst.due)}`:""}
</div>
<div style={{fontSize:10,color:isOverdue?"#C43A2A":inst.paid?"rgba(232,229,220,0.2)":"rgba(232,229,220,0.35)",marginTop:1}}>
{inst.paid?"Ödendi":inst.due?(d<0?`${Math.abs(d)} gün gecikmiş`:d===0?"Bugün":d===1?"Yarın":`${d} gün kaldı`):"Tarih yok"}
</div>
</div>
<div style={{fontWeight:700,fontSize:13,color:inst.paid?"rgba(232,229,220,0.3)":"#D4B83A"}}>{fm(inst.amount,cur)}</div>
</div>
);})}
<div style={{padding:"12px 20px",display:"flex",gap:0,borderTop:"0.5px solid rgba(255,255,255,0.04)"}}>
<button onClick={()=>setInstallments(prev=>prev.map(p=>p.id===plan.id?{...p,category:activeTab==="is"?"kisisel":"is"}:p))} style={{flex:1,padding:"10px",background:"transparent",border:"none",color:"rgba(232,229,220,0.35)",fontSize:11,fontWeight:600,cursor:"pointer",borderRight:"0.5px solid rgba(255,255,255,0.04)"}}>→ {activeTab==="is"?"Kişisel'e":"İş'e"} taşı</button>
<button onClick={()=>deletePlan(plan.id)} style={{flex:1,padding:"10px",background:"transparent",border:"none",color:"rgba(196,58,42,0.5)",fontSize:11,fontWeight:600,cursor:"pointer"}}>Sil</button>
</div>
</div>}
</div>
);})}
</div>
)}

</div>
);}

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
<button onClick={addTodo} style={{...sb("#4A8A5A"),padding:"0 20px"}}>Ekle</button>
</div>

<div style={{display:"flex",gap:6,marginBottom:18}}>
{[{k:"active",l:`Aktif (${activeTodos.length})`},{k:"done",l:`Tamamlandı (${doneTodos.length})`},{k:"all",l:"Tümü"}].map(({k,l})=>(
<button key={k} onClick={()=>setFilter(k)} style={{padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filter===k?"#4A8A5A":T.bg3,color:filter===k?"#fff":T.textSub}}>{l}</button>
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
<input type="checkbox" checked={t.done} onChange={()=>toggleTodo(t.id)} style={{width:18,height:18,cursor:"pointer",flexShrink:0,accentColor:"#4A8A5A"}}/>
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

{existing&&<div style={{background:"rgba(196,136,42,0.1)",border:"0.5px solid rgba(255,149,0,0.4)",borderRadius:12,padding:"10px 16px",marginBottom:16,fontSize:12,color:"#C4882A",fontWeight:600}}>
⚠ {fd(date)} için daha önce giriş yapılmış — kaydetmek üzerine yazar.
</div>}

{saved&&<div style={{background:"rgba(74,138,90,0.12)",border:"0.5px solid #8FE3A8",borderRadius:12,padding:"10px 16px",marginBottom:16,fontSize:12,color:"#4A8A5A",fontWeight:700}}>
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
return(<button key={m.name} onClick={()=>addItem(m)} style={{background:inCart?"rgba(74,138,90,0.1)":T.bg3,border:"0.5px solid "+(inCart?"#8FE3A8":T.border),borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left"}}>
<div style={{fontSize:12,fontWeight:600,color:T.text}}>{m.name}</div>
<div style={{fontSize:11,color:T.accent,marginTop:2}}>{fm(m.price,cur)}</div>
{inCart&&<div style={{fontSize:11,fontWeight:800,color:"#4A8A5A",marginTop:2}}>× {inCart.qty}</div>}
</button>);})}
</div>
{items.length>0&&<div style={{display:"flex",flexDirection:"column",gap:6,borderTop:"0.5px solid "+T.border,paddingTop:12}}>
{items.map(i=><div key={i.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span style={{fontSize:13,fontWeight:600}}>{i.name}</span>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<button onClick={()=>chItemQ(i.name,-1)} style={{...sb(T.bg3),color:T.text,width:28,height:28,borderRadius:8,padding:0}}>−</button>
<span style={{fontWeight:700,minWidth:24,textAlign:"center"}}>{i.qty}</span>
<button onClick={()=>chItemQ(i.name,1)} style={{...sb(T.accent),color:T.text,width:28,height:28,borderRadius:8,padding:0}}>+</button>
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
{saved&&<div style={{background:"rgba(74,138,90,0.12)",border:"0.5px solid #8FE3A8",borderRadius:10,padding:"10px 16px",marginBottom:14,fontSize:12,color:"#4A8A5A",fontWeight:700}}>✓ Kaydedildi!</div>}

<div style={{display:"flex",gap:10,marginBottom:20}}>
<button onClick={()=>setMode(mode==="income"?null:"income")} style={{flex:1,padding:"14px 0",borderRadius:12,border:"2px solid "+(mode==="income"?"#4A8A5A":"rgba(0,0,0,0.08)"),background:mode==="income"?"rgba(74,138,90,0.1)":"#fff",cursor:"pointer",fontWeight:700,fontSize:14,color:mode==="income"?"#4A8A5A":"#000"}}>＋ Gelir Ekle</button>
<button onClick={()=>setMode(mode==="expense"?null:"expense")} style={{flex:1,padding:"14px 0",borderRadius:12,border:"2px solid "+(mode==="expense"?"#C43A2A":"rgba(0,0,0,0.08)"),background:mode==="expense"?"rgba(196,58,42,0.1)":"#fff",cursor:"pointer",fontWeight:700,fontSize:14,color:mode==="expense"?"#C43A2A":"#000"}}>－ Gider Ekle</button>
</div>

{mode&&<div style={{background:T.bg2,border:"0.5px solid rgba(0,0,0,0.08)",borderRadius:14,padding:20,marginBottom:20,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
<div style={{fontWeight:700,fontSize:14,color:mode==="income"?"#4A8A5A":"#C43A2A",marginBottom:14}}>{mode==="income"?"Gelir Ekle":"Gider Ekle"}</div>
{mode==="income"&&<>
<div style={{fontSize:11,color:"#8E8E93",marginBottom:8,fontWeight:600}}>Ödeme Tipi</div>
<div style={{display:"flex",gap:8,marginBottom:14}}>
{[{k:"cash",l:"Nakit"},{k:"card",l:"Kart"}].map(({k,l})=><button key={k} onClick={()=>setPt(k)} style={{flex:1,padding:"10px 0",borderRadius:10,border:"2px solid "+(pt===k?(k==="cash"?"#C4882A":"#007AFF"):"rgba(0,0,0,0.08)"),background:pt===k?(k==="cash"?"rgba(196,136,42,0.1)":"rgba(90,122,90,0.15)"):"#fff",cursor:"pointer",fontWeight:700,fontSize:13,color:pt===k?(k==="cash"?"#C4882A":"#007AFF"):"#8E8E93"}}>{l}</button>)}
</div>
</>}
<div style={{fontSize:11,color:"#8E8E93",marginBottom:6,fontWeight:600}}>Ürün / Açıklama</div>
<input placeholder={mode==="income"?"Ürün adı (örn: Taco)":"Açıklama (örn: Malzeme)"} value={itemName} onChange={e=>setItemName(e.target.value)} style={{...inp,marginBottom:12}}/>
<div style={{fontSize:11,color:"#8E8E93",marginBottom:6,fontWeight:600}}>Tutar ({cur})</div>
<input type="number" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)} onKeyDown={e=>e.key==="Enter"&&save()} style={{...inp,marginBottom:14,fontSize:13,fontWeight:700}} autoFocus/>
<div style={{display:"flex",gap:8}}>
<button onClick={()=>{setMode(null);setItemName("");setAmount("");}} style={{...sb("rgba(118,118,128,0.12)"),flex:1,color:"#8E8E93"}}>İptal</button>
<button onClick={save} style={{...sb(mode==="income"?"#4A8A5A":"#C43A2A"),flex:2}}>Kaydet</button>
</div>
</div>}

<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
<div style={{background:"rgba(74,138,90,0.1)",border:"1px solid rgba(52,199,89,0.3)",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#4A8A5A",marginBottom:4}}>Toplam Gelir</div><div style={{fontWeight:800,fontSize:18,color:"#4A8A5A"}}>{fm(totalIncome,cur)}</div></div>
<div style={{background:"rgba(196,58,42,0.1)",border:"1px solid rgba(255,59,48,0.3)",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#C43A2A",marginBottom:4}}>Toplam Gider</div><div style={{fontWeight:800,fontSize:18,color:"#C43A2A"}}>{fm(totalExpense,cur)}</div></div>
<div style={{background:net>=0?"rgba(74,138,90,0.1)":"rgba(196,58,42,0.1)",border:"1px solid "+(net>=0?"rgba(52,199,89,0.3)":"rgba(255,59,48,0.3)"),borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:net>=0?"#4A8A5A":"#C43A2A",marginBottom:4}}>Net</div><div style={{fontWeight:800,fontSize:18,color:net>=0?"#4A8A5A":"#C43A2A"}}>{fm(net,cur)}</div></div>
</div>

{months.length===0?<div style={{textAlign:"center",padding:"40px 0",color:"#C7C7CC",fontSize:13}}>Henüz kayıt yok.</div>
:<div style={{display:"flex",flexDirection:"column",gap:8}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:4}}>Taco & Tortilla Raporları</div>
{months.map(m=>{
const md=byMonth[m];
const isOpen=openM===m;
return(<div key={m} style={{background:T.bg2,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:"0.5px solid "+T.border,borderRadius:14,boxShadow:"0 2px 12px rgba(0,0,0,0.4)",overflow:"hidden"}}>
<button onClick={()=>setOpenM(isOpen?null:m)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
<div><div style={{fontWeight:700,fontSize:15,color:T.text}}>{monthName(m)}</div><div style={{fontSize:11,color:T.textSub,marginTop:2}}>{md.entries.length} kayıt</div></div>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<div style={{textAlign:"right"}}>
<div style={{fontSize:13,color:"#4A8A5A",fontWeight:700}}>↑ {fm(md.income,cur)}</div>
<div style={{fontSize:13,color:"#C43A2A",fontWeight:700}}>↓ {fm(md.expense,cur)}</div>
</div>
<span style={{color:"#C7C7CC",fontSize:12}}>{isOpen?"▲":"▼"}</span>
</div>
</button>
{isOpen&&<div style={{borderTop:"0.5px solid rgba(0,0,0,0.08)"}}>
{md.entries.map((e,i)=><div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:i<md.entries.length-1?"0.5px solid rgba(0,0,0,0.06)":"none",background:i%2===0?T.bg2:T.bg2}}>
<div><div style={{fontSize:13,fontWeight:600,color:T.text}}>{e.itemName}</div><div style={{fontSize:10,color:T.textSub,marginTop:1}}>{fd(e.date)}{e.pt?" · "+(e.pt==="cash"?"Nakit":"Kart"):""}</div></div>
<div style={{fontWeight:700,fontSize:14,color:e.type==="income"?"#4A8A5A":"#C43A2A"}}>{e.type==="income"?"＋":"－"}{fm(e.amount,cur)}</div>
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
<div style={{background:"rgba(196,136,42,0.1)",border:"1px solid rgba(255,149,0,0.25)",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#C4882A",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Toplam Adet</div><div style={{fontSize:22,fontWeight:800,color:"#C4882A"}}>{totalQty}</div></div>
<div style={{background:"rgba(90,122,90,0.15)",border:"1px solid rgba(0,122,255,0.25)",borderRadius:12,padding:"14px 16px"}}><div style={{fontSize:10,color:"#5A7A5A",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Toplam Ciro</div><div style={{fontSize:18,fontWeight:800,color:"#5A7A5A"}}>{fm(totalRev,cur)}</div></div>
</div>
<div style={{display:"flex",gap:6,marginBottom:16}}>
{[{k:"qty",l:"Adete Göre"},{k:"revenue",l:"Ciroya Göre"}].map(({k,l})=><button key={k} onClick={()=>setSortBy(k)} style={{padding:"8px 16px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:sortBy===k?"#5A7A5A":T.bg3,color:sortBy===k?"#fff":T.textSub}}>{l}</button>)}
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
<div style={{fontSize:14,fontWeight:700,color:"#5A7A5A"}}>{sortBy==="qty"?p.qty+" adet":fm(p.revenue,cur)}</div>
<div style={{fontSize:11,color:T.textSub}}>{sortBy==="qty"?fm(p.revenue,cur):p.qty+" adet"}</div>
</div>
</div>
</div>
);})}
</div>}
</div>
);}

function CustomersPageV({orders,cur,fm,fd,T,inp,setV}){
const custMap={};
(orders||[]).filter(o=>o.g&&o.g.trim()&&o.g!=="--").forEach(o=>{
  const name=o.g.trim();const month=o.date?o.date.slice(0,7):"";
  if(!custMap[name])custMap[name]={name,total:0,count:0,visits:new Set(),months:{},lastVisit:"",items:{}};
  custMap[name].total+=o.total||0;custMap[name].count++;custMap[name].visits.add(o.date);
  if(o.date>custMap[name].lastVisit)custMap[name].lastVisit=o.date;
  if(month){if(!custMap[name].months[month])custMap[name].months[month]=0;custMap[name].months[month]+=o.total||0;}
  (o.items||[]).forEach(it=>{if(!custMap[name].items[it.name])custMap[name].items[it.name]=0;custMap[name].items[it.name]+=it.qty||0;});
});
const custList=Object.values(custMap).map(c=>({...c,visits:c.visits.size,avgOrder:c.count>0?c.total/c.count:0})).sort((a,b)=>b.total-a.total);
return(
<div style={{padding:"24px 28px",maxWidth:860,margin:"0 auto"}}>
<button onClick={()=>setV("lurk")} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:16,padding:0}}>← Dashboard</button>
<h2 style={{margin:"0 0 20px",fontWeight:800,fontSize:22,color:T.text}}>👥 Müşteriler</h2>
<CustomersV orders={orders} custList={custList} cur={cur} fm={fm} fd={fd} T={T} inp={inp}/>
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

return(<div>
{tablePickFor&&activeTables.length===0&&setTablePickFor(null)}
{selC&&<SettleModal selC={selC} cur={cur} fm={fm} ft={ft} T={T} sb={sb} stT={stT} setStT={setStT} setSelC={setSelC} settle={settle} partialPay={partialPay}/>}
{delC&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.6)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:"#2A2A24",borderRadius:16,padding:24,width:320,maxWidth:"90vw"}}><div style={{fontWeight:700,fontSize:15,color:T.danger,marginBottom:10}}>Cari Hesabı Sil</div><p style={{fontSize:13,color:"rgba(232,229,220,0.5)",margin:"0 0 16px"}}>Kalıcı olarak silinecek.</p><div style={{display:"flex",gap:8}}><button onClick={()=>setDelC(null)} style={{...sb(T.bg2),flex:1,color:"#E8E5DC"}}>İptal</button><button onClick={()=>del(delC)} style={{background:T.danger,border:"none",borderRadius:10,padding:"10px 18px",color:"#fff",fontWeight:600,flex:1,cursor:"pointer"}}>Sil</button></div></div></div>}

{/* Özet + Manuel ekle */}
<div style={{background:"#D4B83A",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div>
<div style={{fontSize:11,color:"rgba(0,0,0,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>Açık Toplam</div>
<div style={{fontSize:24,fontWeight:800,color:"#1A1A16",letterSpacing:-0.5}}>{fm(openT,cur)}</div>
<div style={{fontSize:11,color:"rgba(0,0,0,0.4)"}}>{open.length} açık hesap</div>
</div>
<button onClick={()=>setShowManual(p=>!p)} style={{background:"rgba(0,0,0,0.12)",border:"none",borderRadius:10,padding:"9px 16px",color:"#1A1A16",fontWeight:700,fontSize:12,cursor:"pointer"}}>{showManual?"İptal":"＋ Manuel Ekle"}</button>
</div>

{showManual&&<div style={{background:"#3D3D35",padding:"16px 20px",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
<input autoFocus placeholder="İsim" value={manualForm.name} onChange={e=>setManualForm(p=>({...p,name:e.target.value}))} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 12px",color:"#E8E5DC",fontSize:16,outline:"none"}}/>
<input type="number" placeholder="Bakiye" value={manualForm.amount} onChange={e=>setManualForm(p=>({...p,amount:e.target.value}))} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 12px",color:"#E8E5DC",fontSize:16,outline:"none"}}/>
</div>
<input placeholder="Not (opsiyonel)" value={manualForm.note} onChange={e=>setManualForm(p=>({...p,note:e.target.value}))} style={{background:"rgba(255,255,255,0.08)",border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 12px",color:"#E8E5DC",fontSize:16,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:8}}/>
<button onClick={addManualCari} style={{background:"#D4B83A",border:"none",borderRadius:10,padding:"11px",color:"#1A1A16",fontWeight:700,fontSize:14,cursor:"pointer",width:"100%"}}>Ekle</button>
</div>}

{open.length===0?(
<div style={{textAlign:"center",padding:"40px 20px",color:"rgba(232,229,220,0.3)",background:SHADES[1]}}>Açık cari hesap yok.</div>
):(
<div style={{display:"flex",flexDirection:"column"}}>
{open.map((c,i)=>(
<div key={c.id} style={{background:SHADES[Math.min(i,SHADES.length-1)],borderTop:"0.5px solid rgba(255,255,255,0.04)"}}>
<div style={{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div>
<div style={{fontWeight:700,fontSize:15,color:"#E8E5DC",letterSpacing:0.1}}>{(c.g||"İsimsiz").toUpperCase()}</div>
<div style={{fontSize:11,color:"rgba(232,229,220,0.35)",marginTop:3}}>{fd(c.date)} · {c.tbl}</div>
{(c.payments||[]).length>0&&<div style={{fontSize:11,color:"#4A8A5A",marginTop:3}}>↓ {c.payments.length} kısmi ödeme</div>}
</div>
<div style={{fontWeight:800,fontSize:20,color:"#D4B83A",letterSpacing:-0.5}}>{fm(c.total,cur)}</div>
</div>
<div style={{display:"flex",gap:0,borderTop:"0.5px solid rgba(255,255,255,0.04)"}}>
<button onClick={()=>{setSelC(c);setStT(null);}} style={{flex:2,padding:"12px",background:"transparent",border:"none",borderRight:"0.5px solid rgba(255,255,255,0.04)",color:"#D4B83A",fontWeight:700,fontSize:13,cursor:"pointer"}}>Tahsil Et</button>
{activeTables.length>0&&<button onClick={()=>setTablePickFor(tablePickFor===c.id?null:c.id)} style={{flex:2,padding:"12px",background:"transparent",border:"none",borderRight:"0.5px solid rgba(255,255,255,0.04)",color:"rgba(232,229,220,0.5)",fontWeight:600,fontSize:12,cursor:"pointer"}}>Masaya Ekle</button>}
<button onClick={()=>setDelC(c.id)} style={{padding:"12px 16px",background:"transparent",border:"none",color:"rgba(196,58,42,0.7)",fontWeight:600,fontSize:12,cursor:"pointer"}}>Sil</button>
</div>
{tablePickFor===c.id&&<div style={{padding:"12px 20px",background:"rgba(0,0,0,0.15)",borderTop:"0.5px solid rgba(255,255,255,0.04)"}}>
<div style={{fontSize:11,color:"rgba(232,229,220,0.4)",marginBottom:8,fontWeight:600}}>Hangi masaya eklensin?</div>
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{activeTables.map(t=><button key={t.id} onClick={()=>addCariToTable(c.id,t.id)} style={{background:"#D4B83A",border:"none",borderRadius:8,padding:"7px 14px",color:"#1A1A16",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.lbl}{t.g?" — "+t.g:""}</button>)}
</div>
</div>}
</div>
))}
</div>
)}

{closed.length>0&&<div style={{borderTop:"0.5px solid rgba(0,0,0,0.1)",padding:"16px 20px"}}>
<div style={{fontSize:10,color:T.textSub,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Tahsil Edilenler</div>
{closed.map(c=>(
<div key={c.id} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"0.5px solid rgba(0,0,0,0.06)"}}>
<div><div style={{fontSize:13,fontWeight:600,color:T.textSub,textDecoration:"line-through"}}>{c.g||"İsimsiz"}</div><div style={{fontSize:11,color:T.textDim}}>{c.sAt?fd(c.sAt):""}</div></div>
<div style={{fontSize:13,fontWeight:700,color:"#4A8A5A"}}>{fm(c.total,cur)}</div>
</div>
))}
</div>}
</div>);}
