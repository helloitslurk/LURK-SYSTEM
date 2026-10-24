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
