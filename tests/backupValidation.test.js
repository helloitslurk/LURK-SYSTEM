import test from "node:test";
import assert from "node:assert/strict";
import { validateBackup } from "../src/backupValidation.js";

function validBackup() {
  return {
    app:"LURK POS", formatVersion:1,
    data:{
      lurk_t:[{id:"t1",lbl:"Masa 1",s:"free",order:[],g:""}],
      lurk_o:[{id:"o1",date:"2026-10-24",total:100,subtotal:100,discount:0,items:[{name:"Çay",qty:2,price:50}],payments:[{method:"cash",amount:100}]}],
      lurk_l:[],lurk_customers:[{id:"c1",name:"Ayşe",phone:""}],
      lurk_credit:[{id:"e1",customerId:"c1",type:"debt",amount:50,date:"2026-10-24"}],
      lurk_m:[{id:1,name:"Çay",price:50,cat:"İçecek"}],lurk_d:null
    }
  };
}

test("accepts a valid backup with nested order and payment records",()=>{
  assert.equal(validateBackup(validBackup()),null);
});
test("rejects the wrong app or format version",()=>{
  const b=validBackup();b.app="Other";assert.ok(validateBackup(b));
});
test("rejects missing required collections and invalid record fields",()=>{
  const b=validBackup();delete b.data.lurk_credit;assert.ok(validateBackup(b));
  const c=validBackup();c.data.lurk_o[0].total="100";assert.ok(validateBackup(c));
});
test("rejects malformed nested lines and payment methods",()=>{
  const b=validBackup();b.data.lurk_o[0].items[0].qty=0;assert.ok(validateBackup(b));
  const c=validBackup();c.data.lurk_o[0].payments[0].method="crypto";assert.ok(validateBackup(c));
});
test("rejects duplicate customer IDs and unsupported credit types",()=>{
  const b=validBackup();b.data.lurk_customers.push({...b.data.lurk_customers[0]});assert.ok(validateBackup(b));
  const c=validBackup();c.data.lurk_credit[0].type="mystery";assert.ok(validateBackup(c));
});
test("rejects arrays where an object is required",()=>{
  const b=validBackup();b.data.lurk_d=[];assert.ok(validateBackup(b));
});

import { createKeyedWriteQueue } from "../src/writeQueue.js";

test("serializes writes to the same key in call order", async()=>{
  const events=[];
  const queue=createKeyedWriteQueue(async(key,value)=>{
    events.push("start:"+key+":"+value);
    await new Promise(resolve=>setTimeout(resolve,value===1?20:0));
    events.push("end:"+key+":"+value);
    return true;
  });
  await Promise.all([queue("orders",1),queue("orders",2),queue("orders",3)]);
  assert.deepEqual(events,[
    "start:orders:1","end:orders:1",
    "start:orders:2","end:orders:2",
    "start:orders:3","end:orders:3"
  ]);
});
test("allows independent keys to write concurrently", async()=>{
  const started=[];
  let release;
  const gate=new Promise(resolve=>{release=resolve;});
  const queue=createKeyedWriteQueue(async(key)=>{started.push(key);if(key==="orders")await gate;return true;});
  const first=queue("orders",1);
  const second=queue("customers",1);
  await new Promise(resolve=>setTimeout(resolve,0));
  assert.deepEqual(started.sort(),["customers","orders"]);
  release();
  await Promise.all([first,second]);
});
test("continues queue after a rejected write", async()=>{
  const calls=[];
  const queue=createKeyedWriteQueue(async(key,value)=>{calls.push(value);if(value===1)throw new Error("offline");return true;});
  await assert.rejects(queue("orders",1));
  assert.equal(await queue("orders",2),true);
  assert.deepEqual(calls,[1,2]);
});

import { validateMenuItemInput } from "../src/menuValidation.js";

test("menu validation rejects blank product names",()=>{
  assert.equal(validateMenuItemInput("   ","100").error,"Ürün adı zorunlu.");
});
test("menu validation rejects missing, zero, negative and non-finite prices",()=>{
  for (const price of ["", "0", "-1", "Infinity", "not-a-price"]) {
    assert.ok(validateMenuItemInput("Çay",price).error, "expected rejection for "+price);
  }
});
test("menu validation accepts decimal prices and Turkish uppercase names",()=>{
  assert.deepEqual(validateMenuItemInput("  çay özel  ","12.5"),{
    error:null,name:"ÇAY ÖZEL",price:12.5
  });
});

import { validatePayment } from "../src/paymentValidation.js";

test("payment validation accepts matching cash and card split",()=>{
  const result=validatePayment({total:100,isCredit:false,payments:[{method:"cash",amount:40},{method:"card",amount:60}]});
  assert.equal(result.error,null);
  assert.equal(result.paymentTotal,100);
});
test("payment validation rejects missing or mismatched tender",()=>{
  assert.ok(validatePayment({total:100,isCredit:false,payments:[]}).error);
  assert.ok(validatePayment({total:100,isCredit:false,payments:[{method:"cash",amount:99}]}).error);
});
test("payment validation rejects invalid methods and invalid totals",()=>{
  assert.ok(validatePayment({total:100,isCredit:false,payments:[{method:"credit",amount:100}]}).error);
  assert.ok(validatePayment({total:NaN,isCredit:false,payments:[{method:"cash",amount:100}]}).error);
});
test("credit payment requires a saved customer",()=>{
  assert.ok(validatePayment({total:100,isCredit:true,customerId:null,payments:[{method:"credit",amount:100}]}).error);
  assert.equal(validatePayment({total:100,isCredit:true,customerId:"c1",payments:[]}).error,null);
});

test("payment validation permits a fully discounted zero-total order",()=>{
  const result=validatePayment({total:0,isCredit:false,payments:[]});
  assert.equal(result.error,null);
  assert.equal(result.paymentTotal,0);
});

test("rejects restored menu items with blank names or invalid prices",()=>{
  const blank=validBackup();blank.data.lurk_m[0].name="   ";assert.ok(validateBackup(blank));
  const missing=validBackup();delete missing.data.lurk_m[0].price;assert.ok(validateBackup(missing));
  const negative=validBackup();negative.data.lurk_m[0].price=-1;assert.ok(validateBackup(negative));
  const nonFinite=validBackup();nonFinite.data.lurk_m[0].price=Infinity;assert.ok(validateBackup(nonFinite));
});
