export function validateBackup(parsed) {
  const d=parsed?.data;
  const keys=["lurk_t","lurk_o","lurk_l","lurk_customers","lurk_credit","lurk_m"];
  const isRecord=row=>!!row&&typeof row==="object"&&!Array.isArray(row);
  const badArray=keys.some(k=>!Array.isArray(d?.[k])||d[k].length>100000||d[k].some(row=>!isRecord(row)));
  const badFields=(rows,checks)=>rows.some(row=>checks.some(([key,type])=>key in row&&(
    type==="string"?typeof row[key]!=="string":
    type==="number"?typeof row[key]!=="number"||!Number.isFinite(row[key]):
    type==="array"?!Array.isArray(row[key]):
    type==="object"?!isRecord(row[key]):
    false
  )));
  const badTables=!Array.isArray(d?.lurk_t)||badFields(d.lurk_t,[["id","string"],["lbl","string"],["s","string"],["order","array"],["g","string"]]);
  const badOrders=!Array.isArray(d?.lurk_o)||badFields(d.lurk_o,[["id","string"],["date","string"],["total","number"],["subtotal","number"],["discount","number"],["items","array"],["payments","array"]]);
  const badCustomers=!Array.isArray(d?.lurk_customers)||badFields(d.lurk_customers,[["id","string"],["name","string"],["phone","string"]]);
  const badCredit=!Array.isArray(d?.lurk_credit)||badFields(d.lurk_credit,[["id","string"],["customerId","string"],["type","string"],["amount","number"],["date","string"]]);
  const badMenu=!Array.isArray(d?.lurk_m)||badFields(d.lurk_m,[["id","number"],["name","string"],["price","number"],["cat","string"]]);
  const badMenuValues=Array.isArray(d?.lurk_m)&&d.lurk_m.some(m=>!("price" in m)||!Number.isFinite(m.price)||m.price<0||!("name" in m)||!m.name.trim());
  const badLogs=!Array.isArray(d?.lurk_l)||badFields(d.lurk_l,[["date","string"],["inc","number"],["count","number"]]);
  const badTableLines=Array.isArray(d?.lurk_t)&&d.lurk_t.some(t=>Array.isArray(t.order)&&t.order.some(line=>!isRecord(line)||(("qty" in line)&&(typeof line.qty!=="number"||!Number.isFinite(line.qty)||line.qty<=0))||(("price" in line)&&(typeof line.price!=="number"||!Number.isFinite(line.price)||line.price<0))||(("name" in line)&&typeof line.name!=="string")));
  const badOrderLines=Array.isArray(d?.lurk_o)&&d.lurk_o.some(o=>(Array.isArray(o.items)&&o.items.some(line=>!isRecord(line)||(("qty" in line)&&(typeof line.qty!=="number"||!Number.isFinite(line.qty)||line.qty<=0))||(("price" in line)&&(typeof line.price!=="number"||!Number.isFinite(line.price)||line.price<0))) )||(Array.isArray(o.payments)&&o.payments.some(p=>!isRecord(p)||(("amount" in p)&&(typeof p.amount!=="number"||!Number.isFinite(p.amount)||p.amount<0))||(("method" in p)&&!["cash","card","credit"].includes(p.method)))));
  const customerIds=Array.isArray(d?.lurk_customers)?d.lurk_customers.map(c=>c.id).filter(id=>typeof id==="string"): [];
  const duplicateCustomerIds=new Set(customerIds).size!==customerIds.length;
  const badCreditTypes=Array.isArray(d?.lurk_credit)&&d.lurk_credit.some(e=>("type" in e)&&!["debt","payment"].includes(e.type));
  if(parsed?.app!=="LURK POS"||parsed?.formatVersion!==1||!isRecord(d)||badArray||badTables||badOrders||badCustomers||badCredit||badMenu||badMenuValues||badLogs||badTableLines||badOrderLines||duplicateCustomerIds||badCreditTypes||!("lurk_d" in d)||(d.lurk_d!==null&&!isRecord(d.lurk_d))) {
    return "Yedek biçimi veya kayıt alanları desteklenmiyor.";
  }
  return null;
}
