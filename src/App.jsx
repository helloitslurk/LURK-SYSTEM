import{useState,useEffect,useRef}from"react";

const SB_URL="https://dpucptcrxoddfpvaqsdl.supabase.co";
const SB_KEY="sb_publishable_YiTDrcX7nnotBkoWqEWaHQ_tYHlT3NK";

const MENU=[
{id:101,name:"SİGARALIK FİLTRE",price:50,cat:"Kahve",on:true},
{id:102,name:"FİLTRE KAHVE",price:160,cat:"Kahve",on:true},
{id:103,name:"AMERICANO",price:170,cat:"Kahve",on:true},
{id:104,name:"LATTE",price:200,cat:"Kahve",on:true},
{id:105,name:"SALTED CARAMEL LATTE",price:270,cat:"Kahve",on:true},
{id:106,name:"CORTADO",price:170,cat:"Kahve",on:true},
{id:107,name:"FLATWHITE",price:190,cat:"Kahve",on:true},
{id:109,name:"MOCHA",price:250,cat:"Kahve",on:true},
{id:110,name:"VANİLYA LATTE",price:220,cat:"Kahve",on:true},
{id:112,name:"V60",price:240,cat:"Kahve",on:true},
{id:113,name:"ESPRESSO",price:160,cat:"Kahve",on:true},
{id:114,name:"CAPPUCCINO",price:200,cat:"Kahve",on:true},
{id:201,name:"MATCHA LATTE",price:260,cat:"Matcha",on:true},
{id:202,name:"STRAWBERRY MATCHA",price:290,cat:"Matcha",on:true},
{id:203,name:"BERRY MATCHA LATTE",price:290,cat:"Matcha",on:true},
{id:204,name:"VANILLA MATCHA LATTE",price:280,cat:"Matcha",on:true},
{id:205,name:"APPLE GINGER MATCHA",price:290,cat:"Matcha",on:true},
{id:206,name:"CREME BRULEE MATCHA",price:280,cat:"Matcha",on:true},
{id:301,name:"SİYAH ÇAY",price:50,cat:"Cay",on:true},
{id:302,name:"BİTKİ ÇAYI",price:180,cat:"Cay",on:true},
{id:303,name:"ICE TEA",price:220,cat:"Cay",on:true},
{id:401,name:"MUHAMMARA SANDVİÇ",price:330,cat:"Sandvic",on:true},
{id:402,name:"RENÇ SANDVİÇ",price:330,cat:"Sandvic",on:true},
{id:403,name:"PESTO SANDVİÇ",price:300,cat:"Sandvic",on:true},
{id:404,name:"TON BALIĞI SANDVİÇ",price:300,cat:"Sandvic",on:true},
{id:501,name:"TIRAMISU",price:290,cat:"Tatli",on:true},
{id:502,name:"SOFT COOKIE",price:175,cat:"Tatli",on:true},
{id:601,name:"+VEGAN SUT",price:70,cat:"Ekstra",on:true},
{id:602,name:"SICAK CIKOLATA",price:220,cat:"Ekstra",on:true},
{id:603,name:"SAHLEP",price:200,cat:"Ekstra",on:true},
{id:604,name:"SODA",price:100,cat:"Ekstra",on:true},
{id:605,name:"BAILEYS MATCHA",price:340,cat:"Ekstra",on:true},
{id:606,name:"SERVIS",price:200,cat:"Ekstra",on:true},
{id:607,name:"ORALET",price:50,cat:"Ekstra",on:true},
{id:609,name:"CHURCHILL",price:130,cat:"Ekstra",on:true},
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
  bg:"#0D0D0D",bg2:"#1A1A1A",bg3:"#242424",
  border:"rgba(255,255,255,0.09)",border2:"rgba(255,255,255,0.15)",
  accent:"#34C759",accentL:"#34C759",accentD:"#248A3D",
  text:"#F5F5F5",textSub:"#A0A0A0",textDim:"#555",
  danger:"#FF3B30",warn:"#FF9500",
};

async function sbGet(key,fb){
  try{
    const r=await fetch(SB_URL+"/rest/v1/app_storage?key=eq."+key+"&select=value",{headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY}});
    const d=await r.json();
    if(d&&d[0])return JSON.parse(d[0].value);
  }catch(e){}
  return fb;
}
async function sbSet(key,val){
  try{
    await fetch(SB_URL+"/rest/v1/app_storage",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({key,value:JSON.stringify(val)})});
  }catch(e){}
}

function fm(v){return(v||0).toLocaleString("tr-TR",{minimumFractionDigits:2})+" TL";}
function tod(){return new Date().toISOString().split("T")[0];}
function uid(){return Math.random().toString(36).slice(2)+Date.now().toString(36);}
function ft(iso){if(!iso)return"—";const d=new Date(iso);return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");}

export default function App(){
  const[ok,setOk]=useState(false);
  const[view,setV]=useState("home");
  const[sel,setSel]=useState(null);
  const[tables,setTbl]=useState([]);
  const[orders,setOrd]=useState([]);
  const[logs,setLogs]=useState([]);
  const[menu,setMenu]=useState(MENU);
  const[day,setDay]=useState(null);
  const[toast,setToast]=useState(null);
  const loaded=useRef(false);
  const timer=useRef(null);

  function save(k,v){
    if(!loaded.current)return;
    clearTimeout(timer.current);
    timer.current=setTimeout(()=>sbSet(k,v),800);
  }

  useEffect(()=>{
    const fb=setTimeout(()=>{if(!ok)setOk(true);},12000);
    (async()=>{
      const t=await sbGet("lurk_t",[]);
      const o=await sbGet("lurk_o",[]);
      const l=await sbGet("lurk_l",[]);
      const m=await sbGet("lurk_m",null);
      const d=await sbGet("lurk_d",null);
      setTbl(Array.isArray(t)?t:[]);
      setOrd(Array.isArray(o)?o:[]);
      const existing=new Set((Array.isArray(l)?l:[]).map(x=>x.date));
      const merged=[...(Array.isArray(l)?l:[]),...HISTORY.filter(h=>!existing.has(h.date))].sort((a,b)=>b.date.localeCompare(a.date));
      setLogs(merged);
      if(m&&Array.isArray(m)){
        const ids=new Set(MENU.map(x=>x.id));
        const mm=MENU.map(mi=>{const f=m.find(x=>x.id===mi.id);return f?{...mi,price:f.price,on:f.on}:mi;});
        m.filter(x=>!ids.has(x.id)).forEach(x=>mm.push(x));
        setMenu(mm);
      }
      if(d&&d.oa&&d.oa.startsWith(tod()))setDay(d);
      clearTimeout(fb);
      loaded.current=true;
      setOk(true);
    })().catch(()=>{clearTimeout(fb);setOk(true);});
  },[]);

  useEffect(()=>{save("lurk_t",tables);},[tables]);
  useEffect(()=>{save("lurk_o",orders);},[orders]);
  useEffect(()=>{save("lurk_l",logs);},[logs]);
  useEffect(()=>{save("lurk_m",menu);},[menu]);

  function msg(m){setToast(m);setTimeout(()=>setToast(null),2500);}

  function openDay(){const d={oa:new Date().toISOString(),date:tod()};setDay(d);sbSet("lurk_d",d);}
  function closeDay(){
    if(!day)return;
    const closed=orders.filter(o=>o.date===tod());
    const inc=closed.reduce((s,o)=>s+o.total,0);
    const cash=closed.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
    const card=closed.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
    const log={id:uid(),date:tod(),oa:day.oa,ca:new Date().toISOString(),inc,cash,card,count:closed.length};
    setLogs(prev=>[log,...prev]);
    setTbl(prev=>prev.map(t=>t.s==="o"?{...t,order:[],s:"free",g:""}:t));
    setDay(null);sbSet("lurk_d",null);
    msg("Gün kapatıldı · "+fm(inc));
  }

  function addItem(tid,item){
    setTbl(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      const existing=t.order.find(o=>o.id===item.id);
      if(existing){return{...t,order:t.order.map(o=>o.id===item.id?{...o,qty:o.qty+1}:o)};}
      return{...t,s:"o",oa:t.oa||new Date().toISOString(),order:[...t.order,{...item,qty:1,oid:uid(),addedAt:new Date().toISOString()}]};
    }));
  }
  function chQ(tid,itemId,d){
    setTbl(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      const order=t.order.map(o=>o.id===itemId?{...o,qty:o.qty+d}:o).filter(o=>o.qty>0);
      return{...t,order,s:order.length>0?"o":"free"};
    }));
  }
  function pay(tid,pt,disc){
    const t=tables.find(x=>x.id===tid);
    if(!t)return;
    const sub=t.order.reduce((s,o)=>s+o.price*o.qty,0);
    const total=Math.max(0,sub-(disc||0));
    const order={id:uid(),date:tod(),total,pt,g:t.g||"",items:t.order.map(o=>({name:o.name,qty:o.qty,price:o.price,cat:o.cat}))};
    setOrd(prev=>[order,...prev]);
    setTbl(prev=>prev.map(tb=>tb.id===tid?{...tb,order:[],s:"free",g:""}:tb));
    msg("Ödeme alındı · "+fm(total));
    setSel(null);setV("tables");
  }

  const curT=tables.find(t=>t.id===sel);
  const cats=[...new Set(menu.filter(m=>m.on).map(m=>m.cat))];

  if(!ok)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg,fontFamily:"-apple-system,sans-serif"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:28,fontWeight:800,color:T.text,marginBottom:8,letterSpacing:"-1px"}}>LURK.</div>
        <div style={{fontSize:13,color:T.textSub}}>Yükleniyor...</div>
      </div>
    </div>
  );

  const NAV=[
    {k:"home",label:"Ana Sayfa",icon:"⌂"},
    {k:"tables",label:"Masalar",icon:"⊞"},
    {k:"reports",label:"Raporlar",icon:"≡"},
    {k:"settings",label:"Ayarlar",icon:"⚙"},
  ];

  return(
    <div style={{background:T.bg,minHeight:"100vh",fontFamily:"-apple-system,sans-serif",color:T.text,maxWidth:480,margin:"0 auto",paddingBottom:64}}>
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#34C759",color:"#fff",padding:"9px 18px",borderRadius:20,fontSize:13,fontWeight:700,zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(52,199,89,0.45)"}}>{toast}</div>}
      {view==="home"&&<HomeScreen tables={tables} orders={orders} logs={logs} day={day} openDay={openDay} closeDay={closeDay} setV={setV}/>}
      {view==="tables"&&<TablesScreen tables={tables} setTbl={setTbl} setV={setV} setSel={setSel} msg={msg}/>}
      {view==="order"&&curT&&<OrderScreen table={curT} menu={menu} cats={cats} addItem={addItem} chQ={chQ} pay={pay} setTbl={setTbl} setV={setV} setSel={setSel}/>}
      {view==="reports"&&<ReportsScreen orders={orders} logs={logs} setV={setV}/>}
      {view==="customers"&&<CustomersScreen orders={orders} setV={setV}/>}
      {view==="menu"&&<MenuScreen menu={menu} setMenu={setMenu} setV={setV}/>}
      {view==="settings"&&<SettingsScreen setV={setV}/>}
      {view!=="order"&&(
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(13,13,13,0.97)",backdropFilter:"blur(40px)",borderTop:"0.5px solid rgba(255,255,255,0.08)",display:"flex",zIndex:50}}>
          {NAV.map(n=>(
            <button key={n.k} onClick={()=>setV(n.k)} style={{flex:1,padding:"10px 0 14px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontSize:20,lineHeight:1,color:view===n.k?T.accent:T.textDim}}>{n.icon}</span>
              <span style={{fontSize:10,fontWeight:view===n.k?700:400,color:view===n.k?T.accent:T.textDim}}>{n.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── HOME ─── */
function HomeScreen({tables,orders,logs,day,openDay,closeDay,setV}){
  const[confirm,setConfirm]=useState(false);
  const today=tod();
  const todO=orders.filter(o=>o.date===today);
  const todInc=todO.reduce((s,o)=>s+o.total,0);
  const todCash=todO.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
  const todCard=todO.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
  const openT=tables.filter(t=>t.s==="o");
  const openInc=openT.reduce((s,t)=>s+t.order.reduce((ss,o)=>ss+o.price*o.qty,0),0);

  const PAGES=[
    {k:"tables",label:"Masalar",icon:"⊞",sub:openT.length>0?openT.length+" açık masa":"Tüm masalar"},
    {k:"reports",label:"Raporlar",icon:"≡",sub:"Satış geçmişi"},
    {k:"customers",label:"Müşteriler",icon:"◎",sub:"Aylık sıralama"},
    {k:"menu",label:"Menü",icon:"☰",sub:"Ürün yönetimi"},
  ];

  return(
    <div>
      {/* Header */}
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"20px 16px 16px"}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <div style={{fontSize:28,fontWeight:800,letterSpacing:"-1px",color:T.text}}>LURK.</div>
            <div style={{fontSize:12,color:T.textSub,marginTop:2}}>{new Date().toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,background:day?"rgba(52,199,89,0.12)":"rgba(255,255,255,0.05)",border:"0.5px solid "+(day?"rgba(52,199,89,0.3)":"rgba(255,255,255,0.1)"),borderRadius:20,padding:"6px 12px"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:day?"#34C759":T.textDim}}/>
            <span style={{fontSize:12,fontWeight:600,color:day?"#34C759":T.textSub}}>{day?"Açık":"Kapalı"}</span>
          </div>
        </div>

        {/* Bugün stat kartları */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[
            {label:"Toplam",val:fm(todInc+openInc),sub:todO.length+" kapanan"},
            {label:"Nakit",val:fm(todCash),sub:"bugün"},
            {label:"Kart",val:fm(todCard),sub:"bugün"},
          ].map((s,i)=>(
            <div key={i} style={{background:T.bg2,borderRadius:14,padding:"12px 12px",border:"0.5px solid rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>{s.label}</div>
              <div style={{fontSize:15,fontWeight:800,color:i===0?T.accentL:T.text,letterSpacing:"-0.3px"}}>{s.val.replace(" TL","")}</div>
              <div style={{fontSize:9,color:T.textDim,marginTop:2}}>TL · {s.sub}</div>
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

      {/* Gün aç/kapat */}
      <div style={{padding:"16px 14px"}}>
        {!day
          ?<button onClick={openDay} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:14,color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.35)"}}>Günü Aç</button>
          :<button onClick={()=>setConfirm(true)} style={{width:"100%",padding:"14px",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:14,color:T.textSub,fontWeight:600,fontSize:14,cursor:"pointer"}}>Günü Kapat</button>
        }
      </div>

      {confirm&&<Confirm title="Günü Kapat?" msg={fm(todInc)+" kazanıldı"} onOk={()=>{closeDay();setConfirm(false);}} onCancel={()=>setConfirm(false)}/>}
    </div>
  );
}

/* ─── TABLES ─── */
function TablesScreen({tables,setTbl,setV,setSel,msg}){
  const[showNew,setShowNew]=useState(false);
  const[showAll,setShowAll]=useState(true);
  const[delId,setDelId]=useState(null);
  const nameRef=useRef(null);
  const openT=tables.filter(t=>t.s==="o");
  const displayed=showAll?tables:openT;

  function addTable(){
    const n=(nameRef.current?nameRef.current.value:"").trim();
    if(!n)return;
    setTbl(p=>[...p,{id:uid(),lbl:n,s:"free",order:[],g:""}]);
    if(nameRef.current)nameRef.current.value="";
    setShowNew(false);
  }

  return(
    <div>
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.5px",flex:1}}>Masalar</div>
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
              <div key={t.id} style={{background:isOpen?"rgba(52,199,89,0.08)":T.bg2,border:"0.5px solid "+(isOpen?"rgba(52,199,89,0.25)":"rgba(255,255,255,0.07)"),borderRadius:16,padding:"16px 14px",position:"relative",overflow:"hidden"}}>
                {isOpen&&<div style={{position:"absolute",top:-20,right:-20,width:70,height:70,borderRadius:"50%",background:"rgba(52,199,89,0.06)"}}/>}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{fontSize:14,fontWeight:700,color:isOpen?T.accentL:T.text}}>{t.lbl}</div>
                  <button onClick={()=>setDelId(t.id)} style={{background:"none",border:"none",cursor:"pointer",color:T.textDim,fontSize:16,padding:"0 0 0 8px",lineHeight:1}}>×</button>
                </div>
                {t.g&&<div style={{fontSize:11,color:T.accentL,fontWeight:600,marginBottom:6}}>{t.g}</div>}
                <div style={{fontSize:12,color:isOpen?T.textSub:T.textDim,marginBottom:12}}>
                  {isOpen?fm(total):"Boş"}
                </div>
                <button onClick={()=>{setSel(t.id);setV("order");}} style={{width:"100%",padding:"9px",background:isOpen?"rgba(52,199,89,0.15)":"rgba(255,255,255,0.06)",border:"0.5px solid "+(isOpen?"rgba(52,199,89,0.3)":"rgba(255,255,255,0.1)"),borderRadius:10,color:isOpen?T.accentL:T.textSub,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  {isOpen?"Siparişe Gir →":"Aç →"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {showNew&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:16,color:T.text}}>Yeni Masa</div>
          <input ref={nameRef} autoFocus placeholder="Masa adı"
            onKeyDown={e=>{if(e.key==="Enter")addTable();}}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <button onClick={addTable}
            style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.3)"}}>
            Ekle
          </button>
          <button onClick={()=>setShowNew(false)}
            style={{width:"100%",padding:"11px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>
            İptal
          </button>
        </Modal>
      )}
      {delId&&<Confirm title="Masayı Sil" msg="Bu masa silinecek." onOk={()=>{setTbl(p=>p.filter(t=>t.id!==delId));setDelId(null);msg("Masa silindi.");}} onCancel={()=>setDelId(null)}/>}
    </div>
  );
}

/* ─── ORDER ─── */
function OrderScreen({table,menu,cats,addItem,chQ,pay,setTbl,setV,setSel}){
  const[showMenu,setShowMenu]=useState(table.order.length===0);
  const[selCat,setSelCat]=useState(cats[0]||"");
  const[showPay,setShowPay]=useState(false);
  const[showName,setShowName]=useState(false);
  const[showFis,setShowFis]=useState(false);
  const[name,setName]=useState(table.g||"");
  const[disc,setDisc]=useState("");
  const[flash,setFlash]=useState(null);
  const[pt,setPt]=useState("cash");
  const sub=table.order.reduce((s,o)=>s+o.price*o.qty,0);
  const discVal=parseFloat(disc)||0;
  const total=Math.max(0,sub-discVal);
  const itemCount=table.order.reduce((s,o)=>s+o.qty,0);

  function handleAdd(item){
    addItem(table.id,item);
    setFlash(item.id);
    setTimeout(()=>setFlash(null),400);
  }

  const grouped=Object.values(table.order.reduce((acc,item)=>{
    if(!acc[item.id])acc[item.id]={...item,qty:0};
    acc[item.id].qty+=item.qty;
    return acc;
  },{}));

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:T.bg}}>
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
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{flex:1,overflowY:"auto",padding:"10px 12px"}}>
            {table.order.length===0
              ?<div style={{textAlign:"center",padding:"60px 20px",color:T.textDim}}>
                  <div style={{fontSize:36,marginBottom:12}}>☕</div>
                  <div style={{fontSize:14,fontWeight:600,color:T.textSub}}>Henüz sipariş yok</div>
                </div>
              :grouped.map(item=>(
                <div key={item.id} style={{background:T.bg2,borderRadius:14,padding:"14px",marginBottom:8,border:"0.5px solid rgba(255,255,255,0.06)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:700,color:T.text}}>{item.name}</div>
                      <div style={{fontSize:13,color:T.accentL,fontWeight:700,marginTop:2}}>{fm(item.price*item.qty)}</div>
                    </div>
                    <div style={{fontSize:11,color:T.textSub}}>{fm(item.price)} × {item.qty}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <button onClick={()=>chQ(table.id,item.id,-1)} style={{flex:1,height:36,borderRadius:8,border:"0.5px solid rgba(255,59,48,0.3)",background:"rgba(255,59,48,0.08)",cursor:"pointer",fontSize:20,color:T.danger,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                    <span style={{minWidth:36,textAlign:"center",fontWeight:800,fontSize:17,color:T.text}}>{item.qty}</span>
                    <button onClick={()=>addItem(table.id,item)} style={{flex:1,height:36,borderRadius:8,border:"none",background:T.accent,cursor:"pointer",fontSize:20,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Alt bar */}
          <div style={{flexShrink:0,padding:"10px 12px 24px",borderTop:"0.5px solid rgba(255,255,255,0.08)",background:"rgba(13,13,13,0.97)",backdropFilter:"blur(20px)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:14,color:T.textSub,fontWeight:600}}>Toplam</span>
              <span style={{fontSize:22,fontWeight:800,color:T.accentL,letterSpacing:"-0.5px"}}>{fm(sub)}</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowMenu(true)} style={{flex:1,padding:"13px",background:T.bg3,border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:12,color:T.text,fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Sipariş Ekle</button>
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
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
                {menu.filter(m=>m.on&&m.cat===selCat).map(item=>{
                  const inCart=table.order.find(o=>o.id===item.id);
                  const isFlash=flash===item.id;
                  return(
                    <button key={item.id} onClick={()=>handleAdd(item)} style={{background:isFlash?"rgba(52,199,89,0.25)":inCart?"rgba(52,199,89,0.1)":T.bg2,border:"0.5px solid "+(inCart?"rgba(52,199,89,0.35)":"rgba(255,255,255,0.08)"),borderRadius:12,padding:"12px 10px",cursor:"pointer",textAlign:"left",color:T.text,position:"relative",transition:"background 0.15s",outline:"none"}}>
                      {inCart&&<span style={{position:"absolute",top:6,right:8,background:T.accent,color:"#fff",borderRadius:20,fontSize:10,fontWeight:800,padding:"1px 6px"}}>×{inCart.qty}</span>}
                      {isFlash&&<div style={{position:"absolute",inset:0,borderRadius:12,border:"2px solid #34C759",pointerEvents:"none"}}/>}
                      <div style={{fontSize:11,fontWeight:700,marginBottom:5,paddingRight:inCart?28:0,lineHeight:1.3,color:T.text}}>{item.name}</div>
                      <div style={{fontSize:14,fontWeight:800,color:inCart?T.accentL:T.textDim}}>{fm(item.price)}</div>
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
          <div style={{fontWeight:700,fontSize:17,marginBottom:16,color:T.text}}>Müşteri Adı</div>
          <input autoFocus placeholder="İsim" value={name} onChange={e=>setName(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"){setTbl(p=>p.map(t=>t.id===table.id?{...t,g:name.trim()}:t));setShowName(false);}}}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <button onClick={()=>{setTbl(p=>p.map(t=>t.id===table.id?{...t,g:name.trim()}:t));setShowName(false);}} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>Kaydet</button>
        </Modal>
      )}

      {/* Ödeme modal */}
      {showPay&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:4,color:T.text}}>Ödeme Al</div>
          <div style={{fontSize:12,color:T.textSub,marginBottom:16}}>{table.lbl}{table.g?" · "+table.g:""}</div>
          <div style={{fontSize:32,fontWeight:800,textAlign:"center",marginBottom:16,color:T.accentL,letterSpacing:"-1px"}}>{fm(total)}</div>
          <input type="number" placeholder="İndirim (TL)" value={disc} onChange={e=>setDisc(e.target.value)}
            style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:12,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {["cash","card"].map(p=>(
              <button key={p} onClick={()=>setPt(p)} style={{flex:1,padding:"12px",border:"0.5px solid rgba(255,255,255,0.12)",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",background:pt===p?"rgba(52,199,89,0.15)":"rgba(255,255,255,0.05)",color:pt===p?T.accentL:T.textSub,borderColor:pt===p?"rgba(52,199,89,0.4)":"rgba(255,255,255,0.12)"}}>
                {p==="cash"?"Nakit":"Kart"}
              </button>
            ))}
          </div>
          <button onClick={()=>{pay(table.id,pt,discVal);setShowPay(false);}} style={{width:"100%",padding:"15px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.35)"}}>Tahsil Et · {fm(total)}</button>
          <button onClick={()=>setShowPay(false)} style={{width:"100%",padding:"11px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>Vazgeç</button>
        </Modal>
      )}
    </div>
  );
}

/* ─── REPORTS ─── */
function ReportsScreen({orders,logs,setV}){
  const months=[...new Set([...orders.map(o=>o.date?o.date.slice(0,7):""),...logs.map(l=>l.date?l.date.slice(0,7):"")].filter(Boolean))].sort((a,b)=>b.localeCompare(a));
  const now=new Date().toISOString().slice(0,7);
  const[sel,setSel]=useState(months[0]||now);
  const[exp,setExp]=useState(null);
  function ml(m){const[y,mo]=m.split("-");return new Date(y,parseInt(mo)-1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"});}
  const ms=sel+"-01";
  const me=sel+"-"+String(new Date(parseInt(sel.slice(0,4)),parseInt(sel.slice(5,7)),0).getDate()).padStart(2,"0");
  const mo=orders.filter(o=>o.date&&o.date>=ms&&o.date<=me);
  const ml2=logs.filter(l=>l.date&&l.date>=ms&&l.date<=me);
  const totalInc=mo.reduce((s,o)=>s+o.total,0)||ml2.reduce((s,l)=>s+(l.inc||0),0);
  const totalCash=mo.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
  const totalCard=mo.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
  const dayMap={};
  mo.forEach(o=>{if(!dayMap[o.date])dayMap[o.date]={date:o.date,orders:[],inc:0};dayMap[o.date].orders.push(o);dayMap[o.date].inc+=o.total;});
  ml2.forEach(l=>{if(!dayMap[l.date])dayMap[l.date]={date:l.date,orders:[],inc:l.inc||0,log:l};else{if(!dayMap[l.date].inc)dayMap[l.date].inc=l.inc||0;dayMap[l.date].log=l;}});
  const days=Object.values(dayMap).sort((a,b)=>b.date.localeCompare(a.date));

  return(
    <div>
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.5px"}}>Raporlar</div>
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
      <div style={{padding:"14px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        {[
          {label:"Toplam",val:fm(totalInc),color:T.accentL},
          {label:"Nakit",val:fm(totalCash),color:T.text},
          {label:"Kart",val:fm(totalCard),color:T.text},
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
                  <div style={{fontSize:11,color:T.textSub,marginTop:3}}>{log?ft(log.oa)+" – "+ft(log.ca)+" · ":""}{day.orders.length||log?.count||0} adisyon</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:15,fontWeight:800,color:T.accentL}}>{fm(day.inc)}</div>
                  <div style={{fontSize:11,color:T.textDim,marginTop:2}}>{isExp?"▲":"▽"}</div>
                </div>
              </div>
              {isExp&&day.orders.length>0&&day.orders.map((o,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 20px",borderTop:"0.5px solid rgba(255,255,255,0.05)",background:"rgba(255,255,255,0.02)"}}>
                  <div>
                    <div style={{fontSize:13,color:T.text}}>{o.g||"—"}</div>
                    <div style={{fontSize:11,color:T.textSub,marginTop:1}}>{o.pt==="cash"?"Nakit":"Kart"}</div>
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

/* ─── CUSTOMERS ─── */
function CustomersScreen({orders,setV}){
  const months=[...new Set(orders.filter(o=>o.g&&o.g.trim()).map(o=>o.date?o.date.slice(0,7):"").filter(Boolean))].sort((a,b)=>b.localeCompare(a));
  const now=new Date().toISOString().slice(0,7);
  const[sel,setSel]=useState(months[0]||now);
  function ml(m){const[y,mo]=m.split("-");return new Date(y,parseInt(mo)-1).toLocaleDateString("tr-TR",{month:"long",year:"numeric"});}
  const mo=orders.filter(o=>o.date&&o.date.startsWith(sel)&&o.g&&o.g.trim());
  const map={};
  mo.forEach(o=>{const n=o.g.trim().toUpperCase();if(!map[n])map[n]={name:n,total:0,count:0};map[n].total+=o.total;map[n].count++;});
  const sorted=Object.values(map).sort((a,b)=>b.total-a.total);
  const totalRev=mo.reduce((s,o)=>s+o.total,0);

  return(
    <div>
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.5px"}}>Müşteriler</div>
      </div>
      <div style={{display:"flex",gap:6,padding:"12px 14px",overflowX:"auto",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
        {(months.length?months:[now]).map(m=>(
          <button key={m} onClick={()=>setSel(m)} style={{padding:"6px 14px",border:"0.5px solid rgba(255,255,255,0.1)",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",flexShrink:0,background:sel===m?"#34C759":"rgba(255,255,255,0.05)",color:sel===m?"#fff":T.textSub,borderColor:sel===m?"#34C759":"rgba(255,255,255,0.1)"}}>
            {ml(m)}
          </button>
        ))}
      </div>
      <div style={{padding:"14px"}}>
        {totalRev>0&&(
          <div style={{background:T.bg2,borderRadius:14,padding:"14px",marginBottom:14,border:"0.5px solid rgba(255,255,255,0.07)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:12,color:T.textSub}}>{sorted.length} müşteri</div>
            <div style={{fontSize:16,fontWeight:800,color:T.accentL}}>{fm(totalRev)}</div>
          </div>
        )}
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:10}}>Sıralama</div>
        {sorted.length===0&&<div style={{padding:"24px",textAlign:"center",fontSize:13,color:T.textSub,background:T.bg2,borderRadius:14}}>Bu ay isimli sipariş yok</div>}
        {sorted.map((c,i)=>(
          <div key={c.name} style={{background:T.bg2,borderRadius:14,padding:"14px",marginBottom:8,border:"0.5px solid "+(i===0?"rgba(52,199,89,0.2)":"rgba(255,255,255,0.07)"),display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:i===0?"rgba(52,199,89,0.2)":"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:i===0?T.accentL:T.textSub,flexShrink:0}}>{i+1}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:i===0?700:500,color:T.text}}>{c.name}</div>
              <div style={{fontSize:11,color:T.textSub,marginTop:2}}>{c.count} sipariş · %{totalRev>0?Math.round(c.total/totalRev*100):0}</div>
            </div>
            <div style={{fontSize:15,fontWeight:800,color:i===0?T.accentL:T.text}}>{fm(c.total)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MENU ─── */
function MenuScreen({menu,setMenu,setV}){
  const[showAdd,setShowAdd]=useState(false);
  const[newName,setNewName]=useState("");
  const[newPrice,setNewPrice]=useState("");
  const[newCat,setNewCat]=useState("Kahve");
  const cats=[...new Set(menu.map(m=>m.cat))];

  return(
    <div>
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
                  <div style={{fontSize:13,fontWeight:800,color:item.on?T.accentL:T.textDim}}>{fm(item.price)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showAdd&&(
        <Modal>
          <div style={{fontWeight:700,fontSize:17,marginBottom:16,color:T.text}}>Yeni Ürün</div>
          <input placeholder="Ürün adı" value={newName} onChange={e=>setNewName(e.target.value)} style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:10,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <input type="number" placeholder="Fiyat (TL)" value={newPrice} onChange={e=>setNewPrice(e.target.value)} style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:10,background:"rgba(255,255,255,0.07)",color:T.text}}/>
          <select value={newCat} onChange={e=>setNewCat(e.target.value)} style={{width:"100%",padding:"12px 14px",border:"0.5px solid rgba(255,255,255,0.15)",borderRadius:10,fontSize:16,outline:"none",boxSizing:"border-box",marginBottom:16,background:"#1A1A1A",color:T.text}}>
            {cats.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={()=>{if(!newName.trim()||!newPrice)return;setMenu(p=>[...p,{id:Date.now(),name:newName.trim().toUpperCase(),price:parseFloat(newPrice),cat:newCat,on:true}]);setNewName("");setNewPrice("");setShowAdd(false);}} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#34C759,#248A3D)",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:"0 4px 16px rgba(52,199,89,0.3)"}}>Ekle</button>
          <button onClick={()=>setShowAdd(false)} style={{width:"100%",padding:"10px",background:"transparent",border:"none",color:T.textSub,fontSize:13,cursor:"pointer",marginTop:4}}>İptal</button>
        </Modal>
      )}
    </div>
  );
}

/* ─── SETTINGS ─── */
function SettingsScreen({setV}){
  return(
    <div>
      <div style={{background:"rgba(13,13,13,0.98)",backdropFilter:"blur(40px)",borderBottom:"0.5px solid rgba(255,255,255,0.08)",padding:"16px 14px 14px",display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setV("home")} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:0,color:T.textSub,lineHeight:1}}>←</button>
        <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.5px"}}>Ayarlar</div>
      </div>
      <div style={{padding:"14px"}}>
        <div style={{fontSize:10,fontWeight:700,color:T.textSub,textTransform:"uppercase",letterSpacing:"1.2px",marginBottom:10}}>Yönetim</div>
        <button onClick={()=>setV("menu")} style={{width:"100%",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"16px 14px",cursor:"pointer",textAlign:"left",color:T.text,display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:40,height:40,borderRadius:10,background:"rgba(52,199,89,0.12)",border:"0.5px solid rgba(52,199,89,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>☰</div>
          <div>
            <div style={{fontSize:14,fontWeight:700}}>Menü</div>
            <div style={{fontSize:12,color:T.textSub,marginTop:2}}>Ürün ekle, fiyat güncelle</div>
          </div>
          <div style={{marginLeft:"auto",fontSize:18,color:T.textDim}}>›</div>
        </button>
      </div>
    </div>
  );
}

/* ─── SHARED ─── */
function Modal({children}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:100,display:"flex",alignItems:"flex-end"}}>
      <div style={{background:"#1C1C1E",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,margin:"0 auto",padding:"20px 16px 36px",maxHeight:"88vh",overflowY:"auto",border:"0.5px solid rgba(255,255,255,0.1)"}}>
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
