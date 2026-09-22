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

const S={
  bg:"#F7F7F7",card:"#FFFFFF",border:"#E8E8E8",
  text:"#1A1A1A",sub:"#888",muted:"#BBB",
  green:"#2E7D32",red:"#C62828",blue:"#1565C0",
};

function Row({left,right,sub,onClick,rightSub}){
  return(
    <div onClick={onClick} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"0.5px solid "+S.border,cursor:onClick?"pointer":"default",background:S.card}}>
      <div style={{flex:1}}>
        <div style={{fontSize:14,color:S.text}}>{left}</div>
        {sub&&<div style={{fontSize:12,color:S.muted,marginTop:2}}>{sub}</div>}
      </div>
      <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
        <div style={{fontSize:14,fontWeight:500,color:S.text}}>{right}</div>
        {rightSub&&<div style={{fontSize:11,color:S.muted,marginTop:1}}>{rightSub}</div>}
      </div>
    </div>
  );
}

function Sec({children}){
  return <div style={{fontSize:10,fontWeight:600,color:S.muted,textTransform:"uppercase",letterSpacing:"1px",padding:"12px 16px 6px",background:S.bg}}>{children}</div>;
}

function Btn({children,onClick,dark,style={}}){
  return(
    <button onClick={onClick} style={{padding:"12px 16px",borderRadius:8,border:dark?"none":"0.5px solid "+S.border,background:dark?S.text:"transparent",color:dark?"#fff":S.sub,fontSize:13,fontWeight:500,cursor:"pointer",width:"100%",...style}}>
      {children}
    </button>
  );
}

function Modal({children,onClose}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.35)",zIndex:100,display:"flex",alignItems:"flex-end"}}>
      <div style={{background:S.card,borderRadius:"16px 16px 0 0",width:"100%",maxWidth:480,margin:"0 auto",padding:"20px 16px 36px",maxHeight:"85vh",overflowY:"auto"}}>
        {children}
      </div>
    </div>
  );
}

function Confirm({title,msg,onOk,onCancel}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.35)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 20px"}}>
      <div style={{background:S.card,borderRadius:14,width:270,overflow:"hidden"}}>
        <div style={{padding:"20px 16px 16px",textAlign:"center"}}>
          <div style={{fontWeight:600,fontSize:16,marginBottom:6}}>{title}</div>
          {msg&&<div style={{fontSize:13,color:S.sub}}>{msg}</div>}
        </div>
        <div style={{borderTop:"0.5px solid "+S.border,display:"flex"}}>
          <button onClick={onCancel} style={{flex:1,padding:"14px 0",background:"transparent",border:"none",borderRight:"0.5px solid "+S.border,color:S.text,fontSize:16,cursor:"pointer"}}>İptal</button>
          <button onClick={onOk} style={{flex:1,padding:"14px 0",background:"transparent",border:"none",color:S.red,fontWeight:600,fontSize:16,cursor:"pointer"}}>Onayla</button>
        </div>
      </div>
    </div>
  );
}

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
    msg("Gün kapatıldı. Ciro: "+fm(inc));
  }

  function addItem(tid,item){
    setTbl(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      return{...t,s:"o",oa:t.oa||new Date().toISOString(),order:[...t.order,{...item,qty:1,oid:uid(),addedAt:new Date().toISOString()}]};
    }));
  }
  function chQ(tid,oid,d){
    setTbl(prev=>prev.map(t=>{
      if(t.id!==tid)return t;
      return{...t,order:t.order.map(o=>o.oid===oid?{...o,qty:o.qty+d}:o).filter(o=>o.qty>0)};
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
    msg("Ödeme alındı: "+fm(total));
    setSel(null);setV("home");
  }

  const curT=tables.find(t=>t.id===sel);
  const cats=[...new Set(menu.filter(m=>m.on).map(m=>m.cat))];

  if(!ok)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:S.bg,fontFamily:"-apple-system,sans-serif"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:22,fontWeight:500,color:S.text,marginBottom:6}}>LURK.</div>
        <div style={{fontSize:12,color:S.muted}}>Yükleniyor...</div>
      </div>
    </div>
  );

  const NAV_ITEMS=[
    {k:"home",label:"Ana Sayfa",icon:"⌂"},
    {k:"tables",label:"Masalar",icon:"⊞"},
    {k:"reports",label:"Raporlar",icon:"↗"},
    {k:"settings",label:"Ayarlar",icon:"⚙"},
  ];

  return(
    <div style={{background:S.bg,minHeight:"100vh",fontFamily:"-apple-system,sans-serif",color:S.text,maxWidth:480,margin:"0 auto",paddingBottom:56}}>
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:S.text,color:"#fff",padding:"9px 18px",borderRadius:20,fontSize:13,fontWeight:500,zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(0,0,0,0.15)"}}>{toast}</div>}
      {view==="home"&&<HomeScreen tables={tables} orders={orders} logs={logs} day={day} openDay={openDay} closeDay={closeDay} setV={setV} msg={msg}/>}
      {view==="tables"&&<TablesScreen tables={tables} setTbl={setTbl} setV={setV} setSel={setSel} msg={msg}/>}
      {view==="order"&&curT&&<OrderScreen table={curT} menu={menu} cats={cats} addItem={addItem} chQ={chQ} pay={pay} setTbl={setTbl} setV={setV} setSel={setSel}/>}
      {view==="reports"&&<ReportsScreen orders={orders} logs={logs} setV={setV}/>}
      {view==="customers"&&<CustomersScreen orders={orders} setV={setV}/>}
      {view==="menu"&&<MenuScreen menu={menu} setMenu={setMenu} setV={setV}/>}
      {view==="settings"&&<SettingsScreen menu={menu} setMenu={setMenu} setV={setV}/>}
      {view!=="order"&&(
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:S.card,borderTop:"0.5px solid "+S.border,display:"flex",zIndex:50}}>
          {NAV_ITEMS.map(n=>(
            <button key={n.k} onClick={()=>setV(n.k)} style={{flex:1,padding:"10px 0 12px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontSize:18,lineHeight:1,color:view===n.k?S.text:S.muted}}>{n.icon}</span>
              <span style={{fontSize:10,fontWeight:view===n.k?600:400,color:view===n.k?S.text:S.muted}}>{n.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HomeScreen({tables,orders,logs,day,openDay,closeDay,setV,msg}){
  const[confirm,setConfirm]=useState(false);
  const today=tod();
  const todO=orders.filter(o=>o.date===today);
  const todInc=todO.reduce((s,o)=>s+o.total,0);
  const todCash=todO.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
  const todCard=todO.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
  const openT=tables.filter(t=>t.s==="o");
  const openInc=openT.reduce((s,t)=>s+t.order.reduce((ss,o)=>ss+o.price*o.qty,0),0);
  const NAV=[
    {k:"tables",label:"Masalar",sub:openT.length>0?openT.length+" açık masa":"Tüm masalar"},
    {k:"reports",label:"Raporlar",sub:"Satış geçmişi"},
    {k:"customers",label:"Müşteriler",sub:"Aylık sıralama"},
    {k:"menu",label:"Menü",sub:"Ürün yönetimi"},
    {k:"settings",label:"Ayarlar",sub:"Sistem ayarları"},
  ];

  return(
    <div style={{paddingBottom:32}}>
      <div style={{padding:"20px 16px 16px",background:S.card,borderBottom:"0.5px solid "+S.border}}>
        <div style={{fontSize:22,fontWeight:500,letterSpacing:"-0.3px"}}>LURK.</div>
        <div style={{fontSize:12,color:S.sub,marginTop:2}}>{new Date().toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</div>
        <div style={{display:"flex",alignItems:"center",gap:5,marginTop:10}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:day?S.green:S.muted}}/>
          <span style={{fontSize:12,color:day?S.green:S.muted}}>{day?"Açık · "+ft(day.oa):"Kapalı"}</span>
        </div>
      </div>

      <div style={{background:S.card,borderBottom:"0.5px solid "+S.border}}>
        <Sec>Bugün</Sec>
        <Row left="Toplam ciro" right={fm(todInc+openInc)} sub={todO.length+" kapanan"+(openInc>0?" · "+fm(openInc)+" açık":"")}/>
        <Row left="Nakit" right={fm(todCash)}/>
        <Row left="Kart" right={fm(todCard)}/>
      </div>

      <div style={{background:S.card,borderBottom:"0.5px solid "+S.border}}>
        <Sec>Sayfalar</Sec>
        {NAV.map(n=>(
          <Row key={n.k} left={n.label} sub={n.sub} right="›" onClick={()=>setV(n.k)}/>
        ))}
      </div>

      <div style={{padding:"12px 16px",display:"flex",gap:8}}>
        {!day
          ?<Btn dark onClick={openDay}>Günü Aç</Btn>
          :<Btn onClick={()=>setConfirm(true)}>Günü Kapat</Btn>
        }
      </div>

      {confirm&&<Confirm title="Günü Kapat" msg={fm(todInc)+" kazanıldı"} onOk={()=>{closeDay();setConfirm(false);}} onCancel={()=>setConfirm(false)}/>}
    </div>
  );
}

function TablesScreen({tables,setTbl,setV,setSel,msg}){
  const[showNew,setShowNew]=useState(false);
  const[showAll,setShowAll]=useState(false);
  const[delId,setDelId]=useState(null);
  const nameRef=useRef(null);
  const openT=tables.filter(t=>t.s==="o");
  const displayed=showAll?tables:openT;

  function addTable(){
    const n=(nameRef.current?nameRef.current.value:"").trim();
    if(!n)return;
    setTbl(p=>[...p,{id:uid(),lbl:n,s:"free",order:[],g:""}]);
    setShowNew(false);
  }

  return(
    <div style={{paddingBottom:32}}>
      <div style={{padding:"16px 16px 12px",background:S.card,borderBottom:"0.5px solid "+S.border,display:"flex",alignItems:"center",gap:12}}>
        <div style={{fontSize:17,fontWeight:500,flex:1}}>Masalar</div>
        <button onClick={()=>setShowAll(p=>!p)} style={{background:"transparent",border:"0.5px solid "+S.border,borderRadius:7,padding:"6px 10px",fontSize:12,cursor:"pointer",color:S.sub,marginRight:4}}>{showAll?"Açıklar":"Tümü"}</button>
        <button onClick={()=>setShowNew(true)} style={{background:S.text,border:"none",borderRadius:7,padding:"6px 12px",fontSize:12,cursor:"pointer",color:"#fff",fontWeight:500}}>+ Masa</button>
      </div>
      {displayed.length===0&&(
        <div style={{padding:"24px 16px",fontSize:13,color:S.muted,background:S.card}}>
          {showAll?"Henüz masa yok":"Açık masa yok"}
        </div>
      )}
      {displayed.map(t=>(
        <div key={t.id} style={{background:S.card,borderBottom:"0.5px solid "+S.border,display:"flex",alignItems:"center"}}>
          <div onClick={()=>{setSel(t.id);setV("order");}} style={{flex:1,padding:"12px 16px",cursor:"pointer"}}>
            <div style={{fontSize:14,fontWeight:t.s==="o"?600:400}}>{t.lbl}</div>
            <div style={{fontSize:12,marginTop:2,color:t.s==="o"?S.green:S.muted}}>
              {t.s==="o"?(t.g?t.g+" · ":"")+fm(t.order.reduce((s,o)=>s+o.price*o.qty,0)):"Boş"}
            </div>
          </div>
          <button onClick={()=>setDelId(t.id)} style={{padding:"12px 16px",background:"transparent",border:"none",cursor:"pointer",color:S.muted,fontSize:18,lineHeight:1}}>×</button>
        </div>
      ))}

      {showNew&&(
        <Modal onClose={()=>setShowNew(false)}>
          <div style={{fontWeight:600,fontSize:16,marginBottom:14}}>Yeni Masa</div>
          <input ref={nameRef} autoFocus placeholder="Masa adı"
            onKeyDown={e=>{if(e.key==="Enter")addTable();}}
            style={{width:"100%",padding:"11px 12px",border:"0.5px solid "+S.border,borderRadius:8,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
          <button onClick={addTable}
            style={{width:"100%",padding:"13px",background:S.text,border:"none",borderRadius:8,color:"#fff",fontSize:14,fontWeight:500,cursor:"pointer"}}>
            Ekle
          </button>
          <button onClick={()=>setShowNew(false)}
            style={{width:"100%",padding:"10px",background:"transparent",border:"none",color:S.sub,fontSize:13,cursor:"pointer",marginTop:4}}>
            İptal
          </button>
        </Modal>
      )}
      {delId&&<Confirm title="Masayı Sil" msg="Bu masa silinecek." onOk={()=>{setTbl(p=>p.filter(t=>t.id!==delId));setDelId(null);msg("Masa silindi.");}} onCancel={()=>setDelId(null)}/>}
    </div>
  );
}

function MenuScreen({menu,setMenu,setV}){
  const[showAdd,setShowAdd]=useState(false);
  const[newName,setNewName]=useState("");
  const[newPrice,setNewPrice]=useState("");
  const[newCat,setNewCat]=useState("Kahve");
  const cats=[...new Set(menu.map(m=>m.cat))];

  return(
    <div style={{paddingBottom:32}}>
      <div style={{padding:"16px 16px 12px",background:S.card,borderBottom:"0.5px solid "+S.border,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setV("home")} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",padding:0,color:S.sub,lineHeight:1}}>←</button>
        <div style={{fontSize:17,fontWeight:500,flex:1}}>Menü</div>
        <button onClick={()=>setShowAdd(true)} style={{background:S.text,border:"none",borderRadius:7,padding:"6px 12px",fontSize:12,cursor:"pointer",color:"#fff",fontWeight:500}}>+ Ürün</button>
      </div>
      {cats.map(cat=>(
        <div key={cat}>
          <Sec>{cat}</Sec>
          {menu.filter(m=>m.cat===cat).map(item=>(
            <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 16px",borderBottom:"0.5px solid "+S.border,background:S.card}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,color:item.on?S.text:S.muted,textDecoration:item.on?"none":"line-through"}}>{item.name}</div>
                <div style={{fontSize:12,color:S.muted,marginTop:1}}>{fm(item.price)}</div>
              </div>
              <div onClick={()=>setMenu(p=>p.map(m=>m.id===item.id?{...m,on:!m.on}:m))} style={{width:40,height:22,borderRadius:11,background:item.on?S.green:"#CCC",position:"relative",cursor:"pointer",flexShrink:0}}>
                <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:item.on?21:3,transition:"left 0.15s"}}/>
              </div>
            </div>
          ))}
        </div>
      ))}
      {showAdd&&(
        <Modal onClose={()=>setShowAdd(false)}>
          <div style={{fontWeight:600,fontSize:16,marginBottom:14}}>Yeni Ürün</div>
          <input placeholder="Ürün adı" value={newName} onChange={e=>setNewName(e.target.value)} style={{width:"100%",padding:"10px 12px",border:"0.5px solid "+S.border,borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
          <input type="number" placeholder="Fiyat (TL)" value={newPrice} onChange={e=>setNewPrice(e.target.value)} style={{width:"100%",padding:"10px 12px",border:"0.5px solid "+S.border,borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
          <select value={newCat} onChange={e=>setNewCat(e.target.value)} style={{width:"100%",padding:"10px 12px",border:"0.5px solid "+S.border,borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:14,background:S.card}}>
            {cats.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <Btn dark onClick={()=>{if(!newName.trim()||!newPrice)return;setMenu(p=>[...p,{id:Date.now(),name:newName.trim().toUpperCase(),price:parseFloat(newPrice),cat:newCat,on:true}]);setNewName("");setNewPrice("");setShowAdd(false);}}>Ekle</Btn>
        </Modal>
      )}
    </div>
  );
}

function OrderScreen({table,menu,cats,addItem,chQ,pay,setTbl,setV,setSel}){
  const[showMenu,setShowMenu]=useState(table.order.length===0);
  const[selCat,setSelCat]=useState(cats[0]||"");
  const[showPay,setShowPay]=useState(false);
  const[showName,setShowName]=useState(false);
  const[showFis,setShowFis]=useState(false);
  const[name,setName]=useState(table.g||"");
  const[disc,setDisc]=useState("");
  const[pt,setPt]=useState("cash");
  const sub=table.order.reduce((s,o)=>s+o.price*o.qty,0);
  const discVal=parseFloat(disc)||0;
  const total=Math.max(0,sub-discVal);
  const grouped=Object.values(table.order.reduce((acc,item)=>{
    if(!acc[item.name])acc[item.name]={name:item.name,price:item.price,qty:0};
    acc[item.name].qty+=item.qty;
    return acc;
  },{}));

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:S.bg}}>
      <div style={{padding:"11px 14px",borderBottom:"0.5px solid "+S.border,background:S.card,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <button onClick={()=>{setSel(null);setV("home");}} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",padding:0,color:S.sub,lineHeight:1}}>←</button>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:500}}>{table.lbl}</div>
          {table.g&&<div style={{fontSize:12,color:S.green,marginTop:1}}>{table.g}</div>}
        </div>
        <button onClick={()=>setShowName(true)} style={{background:"transparent",border:"0.5px solid "+S.border,borderRadius:20,padding:"5px 12px",fontSize:12,cursor:"pointer",color:S.sub}}>{table.g||"+ İsim"}</button>
      </div>

      {!showMenu?(
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minHeight:0}}>
          <div style={{flex:1,overflowY:"auto"}}>
            {table.order.length===0
              ?<div style={{padding:"40px 16px",textAlign:"center",fontSize:13,color:S.muted}}>Sipariş yok</div>
              :table.order.map(item=>(
                <div key={item.oid} style={{display:"flex",alignItems:"center",padding:"12px 16px",borderBottom:"0.5px solid "+S.border,background:S.card}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:500}}>{item.name}</div>
                    <div style={{fontSize:12,color:S.muted,marginTop:2}}>{fm(item.price)} · {ft(item.addedAt)}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center"}}>
                    <button onClick={()=>chQ(table.id,item.oid,-1)} style={{width:30,height:30,border:"0.5px solid "+S.border,borderRadius:"6px 0 0 6px",background:S.bg,cursor:"pointer",fontSize:16,color:S.red}}>−</button>
                    <div style={{width:34,height:30,display:"flex",alignItems:"center",justifyContent:"center",borderTop:"0.5px solid "+S.border,borderBottom:"0.5px solid "+S.border,fontSize:13,fontWeight:600,background:S.card}}>{item.qty}</div>
                    <button onClick={()=>chQ(table.id,item.oid,1)} style={{width:30,height:30,border:"0.5px solid "+S.border,borderRadius:"0 6px 6px 0",background:S.text,cursor:"pointer",fontSize:16,color:"#fff"}}>+</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div style={{flexShrink:0,padding:"12px 14px 24px",borderTop:"0.5px solid "+S.border,background:S.card}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <span style={{fontSize:13,color:S.sub}}>Toplam</span>
              <span style={{fontSize:18,fontWeight:500}}>{fm(sub)}</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn style={{flex:1}} onClick={()=>setShowMenu(true)}>+ Ekle</Btn>
              <Btn style={{flex:1}} onClick={()=>setShowFis(true)}>Fiş</Btn>
              <Btn dark style={{flex:2}} onClick={()=>setShowPay(true)}>Ödeme Al</Btn>
            </div>
          </div>
        </div>
      ):(
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minHeight:0}}>
          <div style={{display:"flex",gap:8,padding:"10px 14px",overflowX:"auto",borderBottom:"0.5px solid "+S.border,background:S.card,flexShrink:0}}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setSelCat(c)} style={{padding:"6px 14px",border:"0.5px solid "+S.border,borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:500,whiteSpace:"nowrap",flexShrink:0,background:selCat===c?S.text:"transparent",color:selCat===c?"#fff":S.sub}}>
                {c}
              </button>
            ))}
          </div>
          <div style={{flex:1,overflowY:"auto"}}>
            {menu.filter(m=>m.on&&m.cat===selCat).map(item=>{
              const inCart=table.order.filter(o=>o.id===item.id);
              const qty=inCart.reduce((s,o)=>s+o.qty,0);
              return(
                <div key={item.id} style={{display:"flex",alignItems:"center",padding:"12px 16px",borderBottom:"0.5px solid "+S.border,background:S.card}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:qty>0?600:400,color:S.text}}>{item.name}</div>
                    <div style={{fontSize:12,color:qty>0?S.green:S.sub,marginTop:1}}>{fm(item.price)}</div>
                  </div>
                  {qty>0?(
                    <div style={{display:"flex",alignItems:"center"}}>
                      <button onClick={()=>{const last=inCart[inCart.length-1];if(last)chQ(table.id,last.oid,-1);}} style={{width:30,height:30,border:"0.5px solid "+S.border,borderRadius:"6px 0 0 6px",background:S.bg,cursor:"pointer",fontSize:16,color:S.red}}>−</button>
                      <div style={{width:34,height:30,display:"flex",alignItems:"center",justifyContent:"center",borderTop:"0.5px solid "+S.border,borderBottom:"0.5px solid "+S.border,fontSize:13,fontWeight:600,background:S.card}}>{qty}</div>
                      <button onClick={()=>addItem(table.id,item)} style={{width:30,height:30,border:"0.5px solid "+S.border,borderRadius:"0 6px 6px 0",background:S.text,cursor:"pointer",fontSize:16,color:"#fff"}}>+</button>
                    </div>
                  ):(
                    <button onClick={()=>addItem(table.id,item)} style={{width:30,height:30,border:"0.5px solid "+S.border,borderRadius:6,background:S.bg,cursor:"pointer",fontSize:18,color:S.text}}>+</button>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{flexShrink:0,padding:"10px 14px 24px",borderTop:"0.5px solid "+S.border,background:S.card}}>
            <Btn dark onClick={()=>setShowMenu(false)}>← Siparişe Dön {table.order.length>0?"("+table.order.reduce((s,o)=>s+o.qty,0)+")":""}</Btn>
          </div>
        </div>
      )}

      {showFis&&(
        <Modal onClose={()=>setShowFis(false)}>
          <div style={{textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:20,fontWeight:500,letterSpacing:"-0.3px"}}>LURK.</div>
            <div style={{fontSize:11,color:S.muted,marginTop:2}}>Beşiktaş, İstanbul</div>
          </div>
          <div style={{borderTop:"1px dashed "+S.border,marginBottom:12}}/>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,color:S.muted}}>{table.lbl}</div>
            {table.g&&<div style={{fontSize:14,fontWeight:500,marginTop:1}}>{table.g}</div>}
            <div style={{fontSize:11,color:S.muted,marginTop:2}}>{new Date().toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"})} · {ft(new Date().toISOString())}</div>
          </div>
          <div style={{borderTop:"1px dashed "+S.border,marginBottom:8}}/>
          {grouped.map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"6px 0",borderBottom:"0.5px solid "+S.border}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,color:S.text}}>{item.name}</div>
                <div style={{fontSize:11,color:S.muted,marginTop:1}}>{item.qty} × {fm(item.price)}</div>
              </div>
              <div style={{fontSize:13,fontWeight:500,marginLeft:12}}>{fm(item.price*item.qty)}</div>
            </div>
          ))}
          <div style={{borderTop:"1px dashed "+S.border,marginTop:8,paddingTop:8}}>
            {discVal>0&&(
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:12,color:S.muted}}>Ara toplam</span>
                <span style={{fontSize:12,color:S.muted}}>{fm(sub)}</span>
              </div>
            )}
            {discVal>0&&(
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:12,color:S.muted}}>İndirim</span>
                <span style={{fontSize:12,color:S.red}}>-{fm(discVal)}</span>
              </div>
            )}
            <div style={{display:"flex",justifyContent:"space-between",paddingTop:4}}>
              <span style={{fontSize:15,fontWeight:600}}>Toplam</span>
              <span style={{fontSize:15,fontWeight:600}}>{fm(discVal>0?total:sub)}</span>
            </div>
          </div>
          <div style={{textAlign:"center",marginTop:16,fontSize:11,color:S.muted}}>Teşekkür ederiz ✦</div>
          <button onClick={()=>setShowFis(false)} style={{width:"100%",padding:"11px",background:"transparent",border:"0.5px solid "+S.border,borderRadius:8,color:S.sub,fontSize:13,cursor:"pointer",marginTop:16}}>Kapat</button>
        </Modal>
      )}

      {showName&&(
        <Modal onClose={()=>setShowName(false)}>
          <div style={{fontWeight:600,fontSize:16,marginBottom:14}}>Müşteri Adı</div>
          <input autoFocus placeholder="İsim" value={name} onChange={e=>setName(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"){setTbl(p=>p.map(t=>t.id===table.id?{...t,g:name.trim()}:t));setShowName(false);}}}
            style={{width:"100%",padding:"11px 12px",border:"0.5px solid "+S.border,borderRadius:8,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
          <Btn dark onClick={()=>{setTbl(p=>p.map(t=>t.id===table.id?{...t,g:name.trim()}:t));setShowName(false);}}>Kaydet</Btn>
        </Modal>
      )}

      {showPay&&(
        <Modal onClose={()=>setShowPay(false)}>
          <div style={{fontWeight:600,fontSize:16,marginBottom:4}}>Ödeme Al</div>
          <div style={{fontSize:12,color:S.sub,marginBottom:16}}>{table.lbl}{table.g?" · "+table.g:""}</div>
          <div style={{fontSize:28,fontWeight:500,textAlign:"center",marginBottom:16}}>{fm(total)}</div>
          <input type="number" placeholder="İndirim (TL)" value={disc} onChange={e=>setDisc(e.target.value)}
            style={{width:"100%",padding:"10px 12px",border:"0.5px solid "+S.border,borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            {["cash","card"].map(p=>(
              <button key={p} onClick={()=>setPt(p)} style={{flex:1,padding:"10px",border:"0.5px solid "+S.border,borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer",background:pt===p?S.text:"transparent",color:pt===p?"#fff":S.text}}>
                {p==="cash"?"Nakit":"Kart"}
              </button>
            ))}
          </div>
          <Btn dark onClick={()=>{pay(table.id,pt,discVal);setShowPay(false);}}>Tahsil Et — {fm(total)}</Btn>
        </Modal>
      )}
    </div>
  );
}

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
  ml2.forEach(l=>{if(!dayMap[l.date])dayMap[l.date]={date:l.date,orders:[],inc:l.inc||0,log:l};else dayMap[l.date].log=l;});
  const days=Object.values(dayMap).sort((a,b)=>b.date.localeCompare(a.date));

  return(
    <div style={{paddingBottom:32}}>
      <div style={{padding:"16px 16px 12px",background:S.card,borderBottom:"0.5px solid "+S.border,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setV("home")} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",padding:0,color:S.sub,lineHeight:1}}>←</button>
        <div style={{fontSize:17,fontWeight:500}}>Raporlar</div>
      </div>
      <div style={{display:"flex",gap:6,padding:"10px 16px",overflowX:"auto",borderBottom:"0.5px solid "+S.border,background:S.card}}>
        {(months.length?months:[now]).map(m=>(
          <button key={m} onClick={()=>setSel(m)} style={{padding:"5px 12px",border:"0.5px solid "+S.border,borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:500,whiteSpace:"nowrap",flexShrink:0,background:sel===m?S.text:"transparent",color:sel===m?"#fff":S.sub}}>
            {ml(m)}
          </button>
        ))}
      </div>
      <div style={{background:S.card,borderBottom:"0.5px solid "+S.border}}>
        <Row left="Toplam ciro" right={fm(totalInc)} sub={mo.length>0?mo.length+" adisyon":days.length+" gün"}/>
        <Row left="Nakit" right={fm(totalCash)}/>
        <Row left="Kart" right={fm(totalCard)}/>
      </div>
      <Sec>Günler</Sec>
      {days.length===0&&<div style={{padding:"20px 16px",fontSize:13,color:S.muted,background:S.card}}>Bu ay kayıt yok</div>}
      {days.map(day=>{
        const isExp=exp===day.date;
        const log=day.log;
        return(
          <div key={day.date} style={{background:S.card,borderBottom:"0.5px solid "+S.border}}>
            <div onClick={()=>setExp(isExp?null:day.date)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",cursor:"pointer"}}>
              <div>
                <div style={{fontSize:14}}>{new Date(day.date+"T12:00:00").toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</div>
                <div style={{fontSize:12,color:S.muted,marginTop:2}}>{log?ft(log.oa)+" – "+ft(log.ca)+" · ":""}{day.orders.length||log?.count||0} adisyon</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:14,fontWeight:500}}>{fm(day.inc)}</div>
                <div style={{fontSize:12,color:S.muted,marginTop:1}}>{isExp?"▲":"▽"}</div>
              </div>
            </div>
            {isExp&&day.orders.length>0&&day.orders.map((o,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"9px 24px",borderTop:"0.5px solid "+S.border,background:S.bg}}>
                <div><div style={{fontSize:13}}>{o.g||"—"}</div><div style={{fontSize:11,color:S.muted,marginTop:1}}>{o.pt==="cash"?"Nakit":"Kart"}</div></div>
                <div style={{fontSize:13,fontWeight:500}}>{fm(o.total)}</div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

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
    <div style={{paddingBottom:32}}>
      <div style={{padding:"16px 16px 12px",background:S.card,borderBottom:"0.5px solid "+S.border,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setV("home")} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",padding:0,color:S.sub,lineHeight:1}}>←</button>
        <div style={{fontSize:17,fontWeight:500}}>Müşteriler</div>
      </div>
      <div style={{display:"flex",gap:6,padding:"10px 16px",overflowX:"auto",borderBottom:"0.5px solid "+S.border,background:S.card}}>
        {(months.length?months:[now]).map(m=>(
          <button key={m} onClick={()=>setSel(m)} style={{padding:"5px 12px",border:"0.5px solid "+S.border,borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:500,whiteSpace:"nowrap",flexShrink:0,background:sel===m?S.text:"transparent",color:sel===m?"#fff":S.sub}}>
            {ml(m)}
          </button>
        ))}
      </div>
      {totalRev>0&&<Row left="Toplam ciro" right={fm(totalRev)} sub={sorted.length+" müşteri"}/>}
      <Sec>Sıralama</Sec>
      {sorted.length===0&&<div style={{padding:"20px 16px",fontSize:13,color:S.muted,background:S.card}}>Bu ay isimli sipariş yok</div>}
      {sorted.map((c,i)=>(
        <div key={c.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"0.5px solid "+S.border,background:S.card}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:22,textAlign:"center",fontSize:12,color:i===0?S.green:S.muted,fontWeight:600}}>{i+1}</div>
            <div>
              <div style={{fontSize:14,fontWeight:i===0?600:400}}>{c.name}</div>
              <div style={{fontSize:12,color:S.muted,marginTop:1}}>{c.count} sipariş · %{totalRev>0?Math.round(c.total/totalRev*100):0}</div>
            </div>
          </div>
          <div style={{fontSize:14,fontWeight:500,color:i===0?S.green:S.text}}>{fm(c.total)}</div>
        </div>
      ))}
    </div>
  );
}

function SettingsScreen({menu,setMenu,setV}){
  return(
    <div style={{paddingBottom:32}}>
      <div style={{padding:"16px 16px 12px",background:S.card,borderBottom:"0.5px solid "+S.border,display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setV("home")} style={{background:"transparent",border:"none",fontSize:20,cursor:"pointer",padding:0,color:S.sub,lineHeight:1}}>←</button>
        <div style={{fontSize:17,fontWeight:500}}>Ayarlar</div>
      </div>
      <Sec>Yönetim</Sec>
      <Row left="Menü" sub="Ürün ekle, fiyat güncelle" right="›" onClick={()=>setV("menu")}/>
    </div>
  );
}
