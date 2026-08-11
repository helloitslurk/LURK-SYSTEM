import { useState } from "react";

const T = {
  bg:"#0D0D0D",bg2:"#1A1A1A",bg3:"#242424",
  border:"rgba(255,255,255,0.1)",
  accent:"#34C759",accentL:"#34C759",
  text:"#F5F5F5",textSub:"#A0A0A0",textDim:"#666",
  danger:"#FF3B30",warn:"#FF9500",
};

// Mock data
const ORDERS = [
  ...Array(180).fill(0).map((_,i)=>({
    total: 1200+Math.floor(Math.random()*3000),
    pt: Math.random()>0.4?"card":"cash",
    date:`2026-0${Math.floor(i/30)+1}-${String((i%30)+1).padStart(2,"0")}`,
    items:[
      {name:["FİLTRE KAHVE","LATTE","AMERICANO","MATCHA LATTE","STRAWBERRY MATCHA","ICE TEA","CAPPUCCINO","CORTADO","V60","SİGARALIK FİLTRE"][Math.floor(Math.random()*10)],qty:1+Math.floor(Math.random()*3),cat:Math.random()>0.5?"Kahve":"Matcha",price:150},
      {name:["FİLTRE KAHVE","LATTE","AMERICANO","MATCHA LATTE","ICE TEA","CAPPUCCINO"][Math.floor(Math.random()*6)],qty:1,cat:Math.random()>0.6?"Kahve":"Çay",price:180},
    ]
  }))
];

const fm = (v) => (v||0).toLocaleString("tr-TR",{minimumFractionDigits:0});

// Hesaplamalar
const totalRev = ORDERS.reduce((s,o)=>s+o.total,0);
const totalOrders = ORDERS.length;
const avgOrder = Math.round(totalRev/totalOrders);
const totalCash = ORDERS.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
const totalCard = ORDERS.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);

// Ürün sayıları
const itemCounts = {};
ORDERS.forEach(o=>(o.items||[]).forEach(item=>{
  if(!itemCounts[item.name])itemCounts[item.name]=0;
  itemCounts[item.name]+=item.qty||1;
}));

// Kategori sayıları
const catCounts = {};
ORDERS.forEach(o=>(o.items||[]).forEach(item=>{
  if(!catCounts[item.cat])catCounts[item.cat]=0;
  catCounts[item.cat]+=item.qty||1;
}));

// En iyi gün
const byDay = {};
ORDERS.forEach(o=>{if(!byDay[o.date])byDay[o.date]=0;byDay[o.date]+=o.total;});
const bestDay = Object.entries(byDay).sort((a,b)=>b[1]-a[1])[0];
const bestDayLabel = bestDay ? new Date(bestDay[0]).toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"}) : "—";

// En çok satan ürünler
const topItems = Object.entries(itemCounts).sort((a,b)=>b[1]-a[1]).slice(0,8);

const ICONS = {
  "Kahve":"☕", "Matcha":"🍵", "Çay":"🫖", "Sandviç":"🥪", "Tatlı":"🍰", "Ekstra":"➕"
};

export default function AllTimeStats() {
  const [expandedSec, setExpandedSec] = useState("products");

  const Section = ({id, title, children}) => (
    <div style={{marginBottom:12}}>
      <button onClick={()=>setExpandedSec(expandedSec===id?null:id)}
        style={{width:"100%",background:T.bg2,border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",color:T.text}}>
        <span style={{fontWeight:700,fontSize:15}}>{title}</span>
        <span style={{color:T.textSub,fontSize:14}}>{expandedSec===id?"▲":"▽"}</span>
      </button>
      {expandedSec===id&&(
        <div style={{background:T.bg2,borderRadius:"0 0 14px 14px",border:"0.5px solid rgba(255,255,255,0.08)",borderTop:"none",overflow:"hidden"}}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div style={{background:T.bg,minHeight:"100vh",fontFamily:"-apple-system,sans-serif",color:T.text,paddingBottom:60}}>

      {/* Header */}
      <div style={{padding:"16px 16px 20px",borderBottom:"0.5px solid "+T.border}}>
        <div style={{fontSize:13,color:T.textSub,marginBottom:6}}>← Dashboard</div>
        <h2 style={{margin:"0 0 4px",fontWeight:800,fontSize:24,color:T.text}}>📈 Tüm Zamanlar</h2>
        <div style={{fontSize:12,color:T.textDim}}>{totalOrders} adisyon · {Object.keys(byDay).length} gün</div>
      </div>

      <div style={{padding:"16px"}}>

        {/* Hero — Toplam Ciro */}
        <div style={{background:"linear-gradient(135deg,rgba(52,199,89,0.15),rgba(52,199,89,0.05))",border:"1px solid rgba(52,199,89,0.2)",borderRadius:16,padding:"20px",marginBottom:12,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"rgba(52,199,89,0.08)"}}/>
          <div style={{fontSize:10,color:T.accentL,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>Toplam Ciro</div>
          <div style={{fontSize:38,fontWeight:800,color:T.text,letterSpacing:-1,marginBottom:4}}>{fm(totalRev)} TL</div>
          <div style={{display:"flex",gap:16,marginTop:8}}>
            <div><span style={{fontSize:11,color:T.textSub}}>Nakit  </span><span style={{fontSize:13,fontWeight:700,color:"#34C759"}}>{fm(totalCash)} TL</span></div>
            <div><span style={{fontSize:11,color:T.textSub}}>Kart  </span><span style={{fontSize:13,fontWeight:700,color:"#007AFF"}}>{fm(totalCard)} TL</span></div>
          </div>
        </div>

        {/* Özet kartlar */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {[
            {label:"Toplam Adisyon",val:fm(totalOrders),unit:"adet",color:"#007AFF"},
            {label:"Ortalama Adisyon",val:fm(avgOrder),unit:"TL",color:"#FF9500"},
            {label:"En İyi Gün",val:fm(bestDay?.[1]),unit:"TL",color:"#AF52DE",sub:bestDayLabel},
            {label:"Günlük Ortalama",val:fm(Math.round(totalRev/Object.keys(byDay).length)),unit:"TL",color:"#34C759"},
          ].map((s,i)=>(
            <div key={i} style={{background:T.bg2,borderRadius:12,padding:"14px",border:"0.5px solid rgba(255,255,255,0.08)"}}>
              <div style={{fontSize:10,color:T.textSub,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5,marginBottom:6}}>{s.label}</div>
              <div style={{fontSize:20,fontWeight:800,color:s.color}}>{s.val}<span style={{fontSize:12,fontWeight:400,color:T.textSub,marginLeft:3}}>{s.unit}</span></div>
              {s.sub&&<div style={{fontSize:10,color:T.textDim,marginTop:3}}>{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* Kategori sayıları */}
        <Section id="categories" title="🏷 Kategori Dağılımı">
          {Object.entries(catCounts).sort((a,b)=>b[1]-a[1]).map(([cat,count],i)=>{
            const max=Math.max(...Object.values(catCounts));
            return(
              <div key={cat} style={{padding:"12px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:14,fontWeight:600,color:T.text}}>{ICONS[cat]||"•"} {cat}</span>
                  <span style={{fontSize:14,fontWeight:800,color:T.accentL}}>{fm(count)} adet</span>
                </div>
                <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
                  <div style={{height:"100%",width:(count/max*100)+"%",background:T.accent,borderRadius:2}}/>
                </div>
              </div>
            );
          })}
        </Section>

        {/* En çok satılan ürünler */}
        <Section id="products" title="🏆 En Çok Satılan Ürünler">
          {topItems.map(([name,count],i)=>(
            <div key={name} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:i===0?"rgba(255,215,0,0.15)":i===1?"rgba(192,192,192,0.1)":i===2?"rgba(205,127,50,0.1)":"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:i===0?"#FFD60A":i===1?"#C0C0C0":i===2?"#CD7F32":T.textDim,flexShrink:0}}>
                {i+1}
              </div>
              <div style={{flex:1,fontSize:13,fontWeight:600,color:T.text}}>{name}</div>
              <div style={{fontSize:14,fontWeight:800,color:T.accentL}}>{fm(count)}</div>
            </div>
          ))}
        </Section>

        {/* Özel istatistikler */}
        <Section id="special" title="✨ Özel İstatistikler">
          {[
            {label:"☕ Toplam Kahve",val:fm((itemCounts["FİLTRE KAHVE"]||0)+(itemCounts["LATTE"]||0)+(itemCounts["AMERICANO"]||0)+(itemCounts["CAPPUCCINO"]||0)+(itemCounts["CORTADO"]||0)+(itemCounts["FLATWHITE"]||0)+(itemCounts["MOCHA"]||0)+(itemCounts["V60"]||0)+(itemCounts["ESPRESSO"]||0)),unit:"fincan"},
            {label:"🍵 Toplam Matcha",val:fm((itemCounts["MATCHA LATTE"]||0)+(itemCounts["STRAWBERRY MATCHA"]||0)+(itemCounts["BERRY MATCHA LATTE"]||0)+(itemCounts["VANILLA MATCHA LATTE"]||0)+(itemCounts["APPLE & GINGER MATCHA"]||0)+(itemCounts["CRÈME BRÜLÉE MATCHA"]||0)),unit:"bardak"},
            {label:"🧋 Toplam Ice Tea",val:fm(itemCounts["ICE TEA"]||0),unit:"bardak"},
            {label:"🥪 Toplam Sandviç",val:fm((itemCounts["MUHAMMARA SANDVİÇ"]||0)+(itemCounts["RENÇ SANDVİÇ"]||0)+(itemCounts["PESTO SANDVİÇ"]||0)+(itemCounts["TON BALIĞI SANDVİÇ"]||0)),unit:"adet"},
            {label:"🍰 Toplam Tatlı",val:fm((itemCounts["TIRAMISU"]||0)+(itemCounts["SOFT COOKIE"]||0)),unit:"adet"},
          ].map((s,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderBottom:"0.5px solid rgba(255,255,255,0.06)"}}>
              <span style={{fontSize:14,color:T.text}}>{s.label}</span>
              <div>
                <span style={{fontSize:18,fontWeight:800,color:T.accentL}}>{s.val}</span>
                <span style={{fontSize:11,color:T.textSub,marginLeft:4}}>{s.unit}</span>
              </div>
            </div>
          ))}
        </Section>

      </div>
    </div>
  );
}
