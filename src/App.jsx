import { useState, useEffect } from "react";

const T={bg:"#F7F6F3",bg2:"#FFFFFF",bg3:"#EFEDE8",border:"#E4E1DA",border2:"#CCC9C0",accent:"#2D6A4F",accentL:"#40916C",accentD:"#1B4332",accentXL:"#74C69D",text:"#1C1C1A",textSub:"#6B6860",textDim:"#A8A49C",success:"#2D6A4F",danger:"#B83232",warn:"#8B6914",shadow:"0 1px 3px rgba(0,0,0,0.06)",shadowM:"0 4px 14px rgba(0,0,0,0.08)"};

const MENU=[
{id:101,name:"sigaralık filtre",price:50,cat:"Kahve",on:true},{id:102,name:"filtre kahve",price:140,cat:"Kahve",on:true},{id:103,name:"americano",price:150,cat:"Kahve",on:true},{id:104,name:"latte",price:180,cat:"Kahve",on:true},{id:105,name:"salted caramel latte",price:250,cat:"Kahve",on:true},{id:106,name:"cortado",price:150,cat:"Kahve",on:true},{id:107,name:"flatwhite",price:170,cat:"Kahve",on:true},{id:108,name:"süt reçelli latte",price:250,cat:"Kahve",on:true},{id:109,name:"mocha",price:230,cat:"Kahve",on:true},{id:110,name:"vanilya latte",price:200,cat:"Kahve",on:true},{id:111,name:"kış lattesi",price:200,cat:"Kahve",on:true},{id:112,name:"v60",price:220,cat:"Kahve",on:true},{id:113,name:"espresso",price:140,cat:"Kahve",on:true},{id:114,name:"cappuccino",price:180,cat:"Kahve",on:true},
{id:201,name:"matcha latte",price:230,cat:"Matcha",on:true},{id:202,name:"strawberry matcha",price:260,cat:"Matcha",on:true},{id:203,name:"berry matcha latte",price:260,cat:"Matcha",on:true},{id:204,name:"vanilla matcha latte",price:250,cat:"Matcha",on:true},{id:205,name:"apple & ginger matcha",price:260,cat:"Matcha",on:true},{id:206,name:"cremebrulee matcha",price:250,cat:"Matcha",on:true},{id:207,name:"mevsim meyveli matcha",price:260,cat:"Matcha",on:true},
{id:301,name:"siyah çay",price:50,cat:"Cay",on:true},{id:302,name:"bitki çayı",price:150,cat:"Cay",on:true},{id:303,name:"ice tea",price:200,cat:"Cay",on:true},
{id:401,name:"muhammara sandviç",price:330,cat:"Sandviç",on:true},{id:402,name:"renç sandviç",price:330,cat:"Sandviç",on:true},{id:403,name:"pesto sandviç",price:300,cat:"Sandviç",on:true},{id:404,name:"ton balığı sandviç",price:300,cat:"Sandviç",on:true},
{id:501,name:"tiramisu",price:290,cat:"Tatlı",on:true},{id:502,name:"soft cookie",price:175,cat:"Tatlı",on:true},
{id:601,name:"+vegan süt",price:50,cat:"Ekstra",on:true},{id:602,name:"sıcak çikolata",price:200,cat:"Ekstra",on:true},{id:603,name:"sahlep",price:150,cat:"Ekstra",on:true},{id:604,name:"soda",price:90,cat:"Ekstra",on:true},{id:605,name:"baileys matcha",price:300,cat:"Ekstra",on:true},{id:606,name:"servis",price:200,cat:"Ekstra",on:true},{id:607,name:"oralet",price:50,cat:"Ekstra",on:true},{id:608,name:"Clap",price:250,cat:"Ekstra",on:true},{id:609,name:"Churchill",price:120,cat:"Ekstra",on:true},
];

const OLD_LOGS=[{"id":"old_0_1767696480","date":"2026-01-06","oa":"2026-01-06T10:48:00","ca":"2026-01-07T00:59:00","inc":4070,"exp":0,"net":4070,"cash":200,"card":3870,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_1_1767791520","date":"2026-01-07","oa":"2026-01-07T13:12:00","ca":"2026-01-08T11:55:00","inc":810,"exp":0,"net":810,"cash":300,"card":510,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_2_1767877620","date":"2026-01-08","oa":"2026-01-08T13:07:00","ca":"2026-01-08T22:24:00","inc":450,"exp":0,"net":450,"cash":0,"card":450,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_3_1767963780","date":"2026-01-09","oa":"2026-01-09T13:03:00","ca":"2026-01-10T11:09:00","inc":3020,"exp":0,"net":3020,"cash":620,"card":2400,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_4_1768043340","date":"2026-01-10","oa":"2026-01-10T11:09:00","ca":"2026-01-10T23:59:00","inc":2020,"exp":0,"net":2020,"cash":150,"card":1870,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_5_1768138680","date":"2026-01-11","oa":"2026-01-11T13:38:00","ca":"2026-01-12T00:28:00","inc":1410,"exp":0,"net":1410,"cash":0,"card":1410,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_6_1768177680","date":"2026-01-12","oa":"2026-01-12T00:28:00","ca":"2026-01-12T22:34:00","inc":2525,"exp":0,"net":2525,"cash":120,"card":2405,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_7_1768305300","date":"2026-01-13","oa":"2026-01-13T11:55:00","ca":"2026-01-13T23:01:00","inc":1990,"exp":0,"net":1990,"cash":540,"card":1450,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_8_1768390980","date":"2026-01-14","oa":"2026-01-14T11:43:00","ca":"2026-01-15T10:17:00","inc":1250,"exp":0,"net":1250,"cash":200,"card":1050,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_9_1768476060","date":"2026-01-15","oa":"2026-01-15T11:21:00","ca":"2026-01-16T00:25:00","inc":1330,"exp":0,"net":1330,"cash":680,"card":650,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_10_1768523160","date":"2026-01-16","oa":"2026-01-16T00:26:00","ca":"2026-01-17T02:45:00","inc":1730,"exp":0,"net":1730,"cash":840,"card":890,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_11_1768647360","date":"2026-01-17","oa":"2026-01-17T10:56:00","ca":"2026-01-18T12:45:00","inc":1160,"exp":0,"net":1160,"cash":500,"card":660,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_12_1768749720","date":"2026-01-18","oa":"2026-01-18T15:22:00","ca":"2026-01-18T22:10:00","inc":870,"exp":0,"net":870,"cash":400,"card":470,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_13_1768820760","date":"2026-01-19","oa":"2026-01-19T11:06:00","ca":"2026-01-19T23:05:00","inc":3140,"exp":0,"net":3140,"cash":1470,"card":1670,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_14_1768931280","date":"2026-01-20","oa":"2026-01-20T17:48:00","ca":"2026-01-21T10:05:00","inc":1180,"exp":0,"net":1180,"cash":580,"card":600,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_15_1768989900","date":"2026-01-21","oa":"2026-01-21T10:05:00","ca":"2026-01-21T22:36:00","inc":2410,"exp":0,"net":2410,"cash":750,"card":1660,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_16_1769077080","date":"2026-01-22","oa":"2026-01-22T10:18:00","ca":"2026-01-22T22:07:00","inc":880,"exp":0,"net":880,"cash":120,"card":760,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_17_1769198460","date":"2026-01-23","oa":"2026-01-23T20:01:00","ca":"2026-01-24T07:19:00","inc":1170,"exp":0,"net":1170,"cash":0,"card":1170,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_18_1769262540","date":"2026-01-24","oa":"2026-01-24T13:49:00","ca":"2026-01-25T12:49:00","inc":610,"exp":0,"net":610,"cash":0,"card":610,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_19_1769360400","date":"2026-01-25","oa":"2026-01-25T17:00:00","ca":"2026-01-25T21:37:00","inc":2050,"exp":0,"net":2050,"cash":350,"card":1700,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_20_1769423580","date":"2026-01-26","oa":"2026-01-26T10:33:00","ca":"2026-01-26T22:05:00","inc":1465,"exp":0,"net":1465,"cash":300,"card":1165,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_21_1769509440","date":"2026-01-27","oa":"2026-01-27T10:24:00","ca":"2026-01-27T23:01:00","inc":1910,"exp":0,"net":1910,"cash":0,"card":1910,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_22_1769603820","date":"2026-01-28","oa":"2026-01-28T12:37:00","ca":"2026-01-29T10:21:00","inc":1525,"exp":0,"net":1525,"cash":0,"card":1525,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_23_1769682060","date":"2026-01-29","oa":"2026-01-29T10:21:00","ca":"2026-01-29T23:32:00","inc":2495,"exp":0,"net":2495,"cash":730,"card":1765,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_24_1769775540","date":"2026-01-30","oa":"2026-01-30T12:19:00","ca":"2026-01-30T21:20:00","inc":1970,"exp":0,"net":1970,"cash":750,"card":1220,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_25_1769855640","date":"2026-01-31","oa":"2026-01-31T10:34:00","ca":"2026-01-31T21:49:00","inc":1230,"exp":0,"net":1230,"cash":680,"card":550,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_26_1769972760","date":"2026-02-01","oa":"2026-02-01T19:06:00","ca":"2026-02-01T20:40:00","inc":940,"exp":0,"net":940,"cash":100,"card":840,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_27_1770045660","date":"2026-02-02","oa":"2026-02-02T15:21:00","ca":"2026-02-02T23:24:00","inc":960,"exp":0,"net":960,"cash":100,"card":860,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_28_1770122460","date":"2026-02-03","oa":"2026-02-03T12:41:00","ca":"2026-02-03T21:31:00","inc":890,"exp":0,"net":890,"cash":200,"card":690,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_29_1770207660","date":"2026-02-04","oa":"2026-02-04T12:21:00","ca":"2026-02-05T00:56:00","inc":800,"exp":0,"net":800,"cash":350,"card":450,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_30_1770285660","date":"2026-02-05","oa":"2026-02-05T10:01:00","ca":"2026-02-05T21:33:00","inc":1870,"exp":0,"net":1870,"cash":500,"card":1370,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_31_1770468720","date":"2026-02-07","oa":"2026-02-07T12:52:00","ca":"2026-02-08T01:35:00","inc":1430,"exp":0,"net":1430,"cash":200,"card":1230,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_32_1770552720","date":"2026-02-08","oa":"2026-02-08T12:12:00","ca":"2026-02-08T20:12:00","inc":2235,"exp":0,"net":2235,"cash":465,"card":1770,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_33_1770655620","date":"2026-02-09","oa":"2026-02-09T16:47:00","ca":"2026-02-09T23:29:00","inc":810,"exp":0,"net":810,"cash":0,"card":810,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_34_1770726120","date":"2026-02-10","oa":"2026-02-10T12:22:00","ca":"2026-02-10T22:49:00","inc":1550,"exp":0,"net":1550,"cash":450,"card":1100,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_35_1770806580","date":"2026-02-11","oa":"2026-02-11T10:43:00","ca":"2026-02-12T10:50:00","inc":1530,"exp":280,"net":1250,"cash":340,"card":1190,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_36_1770899580","date":"2026-02-12","oa":"2026-02-12T12:33:00","ca":"2026-02-13T00:50:00","inc":670,"exp":0,"net":670,"cash":0,"card":670,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_37_1770982980","date":"2026-02-13","oa":"2026-02-13T11:43:00","ca":"2026-02-13T22:40:00","inc":2190,"exp":0,"net":2190,"cash":425,"card":1765,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_38_1771071660","date":"2026-02-14","oa":"2026-02-14T12:21:00","ca":"2026-02-15T10:11:00","inc":660,"exp":0,"net":660,"cash":0,"card":660,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_39_1771188060","date":"2026-02-15","oa":"2026-02-15T20:41:00","ca":"2026-02-16T00:03:00","inc":160,"exp":0,"net":160,"cash":0,"card":160,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_40_1771242960","date":"2026-02-16","oa":"2026-02-16T11:56:00","ca":"2026-02-17T14:07:00","inc":1710,"exp":0,"net":1710,"cash":780,"card":930,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_41_1771337280","date":"2026-02-17","oa":"2026-02-17T14:08:00","ca":"2026-02-17T23:35:00","inc":800,"exp":0,"net":800,"cash":0,"card":800,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_42_1771410540","date":"2026-02-18","oa":"2026-02-18T10:29:00","ca":"2026-02-18T21:23:00","inc":720,"exp":0,"net":720,"cash":420,"card":300,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_43_1771499040","date":"2026-02-19","oa":"2026-02-19T11:04:00","ca":"2026-02-20T14:40:00","inc":1950,"exp":0,"net":1950,"cash":100,"card":1850,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_44_1771598400","date":"2026-02-20","oa":"2026-02-20T14:40:00","ca":"2026-02-20T22:38:00","inc":2610,"exp":0,"net":2610,"cash":320,"card":2290,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_45_1771666560","date":"2026-02-21","oa":"2026-02-21T09:36:00","ca":"2026-02-21T22:13:00","inc":1440,"exp":0,"net":1440,"cash":530,"card":910,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_46_1771759920","date":"2026-02-22","oa":"2026-02-22T11:32:00","ca":"2026-02-23T11:43:00","inc":2395,"exp":0,"net":2395,"cash":240,"card":2155,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_47_1771846980","date":"2026-02-23","oa":"2026-02-23T11:43:00","ca":"2026-02-24T02:27:00","inc":900,"exp":0,"net":900,"cash":320,"card":580,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_48_1771936020","date":"2026-02-24","oa":"2026-02-24T12:27:00","ca":"2026-02-25T10:32:00","inc":1630,"exp":0,"net":1630,"cash":0,"card":1630,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_49_1772017260","date":"2026-02-25","oa":"2026-02-25T11:01:00","ca":"2026-02-25T20:21:00","inc":640,"exp":0,"net":640,"cash":0,"card":640,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_50_1772101680","date":"2026-02-26","oa":"2026-02-26T10:28:00","ca":"2026-02-27T11:42:00","inc":530,"exp":0,"net":530,"cash":0,"card":530,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_51_1772197200","date":"2026-02-27","oa":"2026-02-27T13:00:00","ca":"2026-02-27T21:41:00","inc":590,"exp":0,"net":590,"cash":250,"card":340,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_52_1772285160","date":"2026-02-28","oa":"2026-02-28T13:26:00","ca":"2026-03-01T14:08:00","inc":270,"exp":0,"net":270,"cash":150,"card":120,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_53_1772374080","date":"2026-03-01","oa":"2026-03-01T14:08:00","ca":"2026-03-01T23:24:00","inc":3620,"exp":0,"net":3620,"cash":320,"card":3300,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_54_1772454720","date":"2026-03-02","oa":"2026-03-02T12:32:00","ca":"2026-03-03T11:25:00","inc":1460,"exp":0,"net":1460,"cash":330,"card":1130,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_55_1772537100","date":"2026-03-03","oa":"2026-03-03T11:25:00","ca":"2026-03-03T23:52:00","inc":1920,"exp":0,"net":1920,"cash":140,"card":1780,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_56_1772623560","date":"2026-03-04","oa":"2026-03-04T11:26:00","ca":"2026-03-05T11:08:00","inc":1550,"exp":0,"net":1550,"cash":220,"card":1330,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_57_1772708880","date":"2026-03-05","oa":"2026-03-05T11:08:00","ca":"2026-03-05T22:43:00","inc":960,"exp":0,"net":960,"cash":480,"card":480,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_58_1772806260","date":"2026-03-06","oa":"2026-03-06T14:11:00","ca":"2026-03-06T22:01:00","inc":690,"exp":0,"net":690,"cash":180,"card":510,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_59_1772884500","date":"2026-03-07","oa":"2026-03-07T11:55:00","ca":"2026-03-08T11:51:00","inc":1130,"exp":0,"net":1130,"cash":670,"card":460,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_60_1772970660","date":"2026-03-08","oa":"2026-03-08T11:51:00","ca":"2026-03-08T23:07:00","inc":2360,"exp":0,"net":2360,"cash":700,"card":1660,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_61_1773066060","date":"2026-03-09","oa":"2026-03-09T14:21:00","ca":"2026-03-10T01:34:00","inc":2660,"exp":0,"net":2660,"cash":570,"card":2090,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_62_1773151860","date":"2026-03-10","oa":"2026-03-10T14:11:00","ca":"2026-03-10T22:08:00","inc":1970,"exp":0,"net":1970,"cash":180,"card":1790,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_63_1773222060","date":"2026-03-11","oa":"2026-03-11T09:41:00","ca":"2026-03-11T22:05:00","inc":1420,"exp":0,"net":1420,"cash":0,"card":1420,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_64_1773314700","date":"2026-03-12","oa":"2026-03-12T11:25:00","ca":"2026-03-12T23:30:00","inc":2150,"exp":0,"net":2150,"cash":530,"card":1620,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_65_1773400800","date":"2026-03-13","oa":"2026-03-13T11:20:00","ca":"2026-03-14T12:11:00","inc":850,"exp":0,"net":850,"cash":250,"card":600,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_66_1773501960","date":"2026-03-14","oa":"2026-03-14T15:26:00","ca":"2026-03-14T19:56:00","inc":1660,"exp":0,"net":1660,"cash":350,"card":1310,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_67_1773575220","date":"2026-03-15","oa":"2026-03-15T11:47:00","ca":"2026-03-15T21:02:00","inc":2130,"exp":0,"net":2130,"cash":300,"card":1830,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_68_1773658680","date":"2026-03-16","oa":"2026-03-16T10:58:00","ca":"2026-03-16T23:05:00","inc":1330,"exp":0,"net":1330,"cash":0,"card":1330,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_69_1773744780","date":"2026-03-17","oa":"2026-03-17T10:53:00","ca":"2026-03-18T09:39:00","inc":1440,"exp":0,"net":1440,"cash":0,"card":1440,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_70_1773829320","date":"2026-03-18","oa":"2026-03-18T10:22:00","ca":"2026-03-18T21:59:00","inc":1080,"exp":0,"net":1080,"cash":160,"card":920,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_71_1773918240","date":"2026-03-19","oa":"2026-03-19T11:04:00","ca":"2026-03-20T11:43:00","inc":1210,"exp":0,"net":1210,"cash":330,"card":880,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_72_1774095180","date":"2026-03-21","oa":"2026-03-21T12:13:00","ca":"2026-03-21T21:02:00","inc":2300,"exp":0,"net":2300,"cash":930,"card":1370,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_73_1774178880","date":"2026-03-22","oa":"2026-03-22T11:28:00","ca":"2026-03-22T19:53:00","inc":5020,"exp":0,"net":5020,"cash":740,"card":4280,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_74_1774275720","date":"2026-03-23","oa":"2026-03-23T14:22:00","ca":"2026-03-23T21:58:00","inc":1240,"exp":0,"net":1240,"cash":200,"card":1040,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_75_1774352400","date":"2026-03-24","oa":"2026-03-24T11:40:00","ca":"2026-03-24T21:28:00","inc":1270,"exp":0,"net":1270,"cash":750,"card":520,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_76_1774439100","date":"2026-03-25","oa":"2026-03-25T11:45:00","ca":"2026-03-25T21:45:00","inc":2740,"exp":0,"net":2740,"cash":0,"card":2740,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_77_1774522560","date":"2026-03-26","oa":"2026-03-26T10:56:00","ca":"2026-03-27T07:52:00","inc":1620,"exp":0,"net":1620,"cash":100,"card":1520,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_78_1774598160","date":"2026-03-27","oa":"2026-03-27T07:56:00","ca":"2026-03-27T20:57:00","inc":2485,"exp":0,"net":2485,"cash":270,"card":2215,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_79_1774704480","date":"2026-03-28","oa":"2026-03-28T13:28:00","ca":"2026-03-29T06:20:00","inc":470,"exp":0,"net":470,"cash":170,"card":300,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_80_1774796100","date":"2026-03-29","oa":"2026-03-29T14:55:00","ca":"2026-03-29T22:35:00","inc":2005,"exp":0,"net":2005,"cash":100,"card":1905,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_81_1774857360","date":"2026-03-30","oa":"2026-03-30T07:56:00","ca":"2026-03-31T10:34:00","inc":2250,"exp":0,"net":2250,"cash":290,"card":1960,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_82_1774978980","date":"2026-03-31","oa":"2026-03-31T17:43:00","ca":"2026-04-01T09:48:00","inc":1230,"exp":0,"net":1230,"cash":140,"card":1090,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_83_1775037000","date":"2026-04-01","oa":"2026-04-01T09:50:00","ca":"2026-04-01T22:53:00","inc":3645,"exp":0,"net":3645,"cash":345,"card":3300,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_84_1775135940","date":"2026-04-02","oa":"2026-04-02T13:19:00","ca":"2026-04-02T23:12:00","inc":2890,"exp":0,"net":2890,"cash":150,"card":2740,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_85_1775211900","date":"2026-04-03","oa":"2026-04-03T10:25:00","ca":"2026-04-03T22:36:00","inc":2160,"exp":0,"net":2160,"cash":700,"card":1460,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_86_1775303580","date":"2026-04-04","oa":"2026-04-04T11:53:00","ca":"2026-04-05T11:49:00","inc":1790,"exp":0,"net":1790,"cash":110,"card":1680,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_87_1775397780","date":"2026-04-05","oa":"2026-04-05T14:03:00","ca":"2026-04-05T22:17:00","inc":3550,"exp":0,"net":3550,"cash":290,"card":3260,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_88_1775470680","date":"2026-04-06","oa":"2026-04-06T10:18:00","ca":"2026-04-06T22:22:00","inc":8710,"exp":0,"net":8710,"cash":2530,"card":6180,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_89_1775561040","date":"2026-04-07","oa":"2026-04-07T11:24:00","ca":"2026-04-07T21:10:00","inc":2430,"exp":0,"net":2430,"cash":500,"card":1930,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_90_1775646060","date":"2026-04-08","oa":"2026-04-08T11:01:00","ca":"2026-04-08T23:12:00","inc":1800,"exp":0,"net":1800,"cash":540,"card":1260,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_91_1775740440","date":"2026-04-09","oa":"2026-04-09T13:14:00","ca":"2026-04-09T22:05:00","inc":2290,"exp":0,"net":2290,"cash":230,"card":2060,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_92_1775827320","date":"2026-04-10","oa":"2026-04-10T13:22:00","ca":"2026-04-11T11:35:00","inc":750,"exp":0,"net":750,"cash":0,"card":750,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_93_1775910120","date":"2026-04-11","oa":"2026-04-11T12:22:00","ca":"2026-04-12T12:03:00","inc":2450,"exp":0,"net":2450,"cash":220,"card":2230,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_94_1775995980","date":"2026-04-12","oa":"2026-04-12T12:13:00","ca":"2026-04-12T22:24:00","inc":2650,"exp":0,"net":2650,"cash":500,"card":2150,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_95_1776083280","date":"2026-04-13","oa":"2026-04-13T12:28:00","ca":"2026-04-13T20:52:00","inc":2240,"exp":0,"net":2240,"cash":150,"card":2090,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_96_1776164520","date":"2026-04-14","oa":"2026-04-14T11:02:00","ca":"2026-04-14T22:30:00","inc":4350,"exp":0,"net":4350,"cash":250,"card":4100,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_97_1776249960","date":"2026-04-15","oa":"2026-04-15T10:46:00","ca":"2026-04-16T12:23:00","inc":2130,"exp":0,"net":2130,"cash":400,"card":1730,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_98_1776342180","date":"2026-04-16","oa":"2026-04-16T12:23:00","ca":"2026-04-16T21:59:00","inc":1570,"exp":0,"net":1570,"cash":200,"card":1370,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_99_1776426720","date":"2026-04-17","oa":"2026-04-17T11:52:00","ca":"2026-04-17T21:48:00","inc":1410,"exp":0,"net":1410,"cash":0,"card":1410,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_100_1776527880","date":"2026-04-18","oa":"2026-04-18T15:58:00","ca":"2026-04-19T02:44:00","inc":1060,"exp":0,"net":1060,"cash":50,"card":1010,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_101_1776596040","date":"2026-04-19","oa":"2026-04-19T10:54:00","ca":"2026-04-19T20:38:00","inc":5870,"exp":0,"net":5870,"cash":1200,"card":4670,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_102_1776682680","date":"2026-04-20","oa":"2026-04-20T10:58:00","ca":"2026-04-20T22:29:00","inc":2710,"exp":0,"net":2710,"cash":620,"card":2090,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_103_1776774840","date":"2026-04-21","oa":"2026-04-21T12:34:00","ca":"2026-04-21T21:04:00","inc":2450,"exp":0,"net":2450,"cash":500,"card":1950,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_104_1776860280","date":"2026-04-22","oa":"2026-04-22T12:18:00","ca":"2026-04-22T21:30:00","inc":1625,"exp":0,"net":1625,"cash":435,"card":1190,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_105_1776948240","date":"2026-04-23","oa":"2026-04-23T12:44:00","ca":"2026-04-23T22:55:00","inc":4330,"exp":0,"net":4330,"cash":300,"card":4030,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_106_1777033320","date":"2026-04-24","oa":"2026-04-24T12:22:00","ca":"2026-04-24T22:29:00","inc":3200,"exp":0,"net":3200,"cash":870,"card":2330,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_107_1777116540","date":"2026-04-25","oa":"2026-04-25T11:29:00","ca":"2026-04-25T21:50:00","inc":3120,"exp":0,"net":3120,"cash":550,"card":2570,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_108_1777211760","date":"2026-04-26","oa":"2026-04-26T13:56:00","ca":"2026-04-27T10:54:00","inc":2860,"exp":0,"net":2860,"cash":230,"card":2630,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_109_1777287900","date":"2026-04-27","oa":"2026-04-27T11:05:00","ca":"2026-04-27T22:31:00","inc":2130,"exp":0,"net":2130,"cash":100,"card":2030,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_110_1777382880","date":"2026-04-28","oa":"2026-04-28T13:28:00","ca":"2026-04-28T21:18:00","inc":1430,"exp":0,"net":1430,"cash":300,"card":1130,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_111_1777465620","date":"2026-04-29","oa":"2026-04-29T12:27:00","ca":"2026-04-29T22:04:00","inc":4060,"exp":0,"net":4060,"cash":950,"card":3110,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_112_1777551000","date":"2026-04-30","oa":"2026-04-30T12:10:00","ca":"2026-04-30T23:44:00","inc":5790,"exp":0,"net":5790,"cash":440,"card":5350,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_113_1777639440","date":"2026-05-01","oa":"2026-05-01T12:44:00","ca":"2026-05-01T21:48:00","inc":3865,"exp":0,"net":3865,"cash":490,"card":3375,"count":11,"items":[{"name":"filtre kahve","qty":8,"total":1140,"price":142.5,"cat":"Diger"},{"name":"americano","qty":4,"total":640,"price":160.0,"cat":"Diger"},{"name":"250g FILTER","qty":1,"total":500,"price":500.0,"cat":"Diger"},{"name":"latte","qty":2,"total":360,"price":180.0,"cat":"Diger"},{"name":"bitki çayı","qty":2,"total":300,"price":150.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"soft cookie","qty":1,"total":175,"price":175.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":3,"total":150,"price":50.0,"cat":"Diger"},{"name":"cortado","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"dümdüz siyah çay","qty":1,"total":50,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_114_1777727160","date":"2026-05-02","oa":"2026-05-02T13:06:00","ca":"2026-05-02T22:20:00","inc":3940,"exp":0,"net":3940,"cash":680,"card":3260,"count":12,"items":[{"name":"salted caramel latte","qty":4,"total":1000,"price":250.0,"cat":"Diger"},{"name":"latte","qty":4,"total":720,"price":180.0,"cat":"Diger"},{"name":"americano","qty":3,"total":470,"price":156.67,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":280,"price":140.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":230,"price":230.0,"cat":"Diger"},{"name":"kış lattesi","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"cappuccino","qty":1,"total":180,"price":180.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":3,"total":150,"price":50.0,"cat":"Diger"},{"name":"cortado","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"espresso","qty":1,"total":140,"price":140.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_115_1777810500","date":"2026-05-03","oa":"2026-05-03T12:15:00","ca":"2026-05-03T21:33:00","inc":2870,"exp":0,"net":2870,"cash":400,"card":2470,"count":10,"items":[{"name":"vanilla matcha latte","qty":3,"total":770,"price":256.67,"cat":"Diger"},{"name":"filtre kahve","qty":3,"total":420,"price":140.0,"cat":"Diger"},{"name":"(a) servis","qty":1,"total":350,"price":350.0,"cat":"Diger"},{"name":"sahlep","qty":2,"total":300,"price":150.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"vanilya latte","qty":1,"total":220,"price":220.0,"cat":"Diger"},{"name":"ice tea","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"latte","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":1,"total":50,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_116_1777901100","date":"2026-05-04","oa":"2026-05-04T13:25:00","ca":"2026-05-04T21:25:00","inc":1340,"exp":0,"net":1340,"cash":50,"card":1290,"count":4,"items":[{"name":"salted caramel latte","qty":2,"total":520,"price":260.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":7,"total":350,"price":50.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"sıcak çikolata","qty":1,"total":200,"price":200.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_117_1777983060","date":"2026-05-05","oa":"2026-05-05T12:11:00","ca":"2026-05-05T21:16:00","inc":1990,"exp":0,"net":1990,"cash":150,"card":1840,"count":7,"items":[{"name":"americano","qty":3,"total":470,"price":156.67,"cat":"Diger"},{"name":"ice tea","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":320,"price":160.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":2,"total":100,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_118_1778070780","date":"2026-05-06","oa":"2026-05-06T12:33:00","ca":"2026-05-07T15:26:00","inc":4520,"exp":0,"net":4520,"cash":550,"card":3970,"count":9,"items":[{"name":"vanilya latte","qty":4,"total":840,"price":210.0,"cat":"Diger"},{"name":"latte","qty":4,"total":780,"price":195.0,"cat":"Diger"},{"name":"filtre kahve","qty":5,"total":760,"price":152.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":2,"total":540,"price":270.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":10,"total":450,"price":45.0,"cat":"Diger"},{"name":"ice tea","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"bitki çayı","qty":2,"total":300,"price":150.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":250,"price":250.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_119_1778167560","date":"2026-05-07","oa":"2026-05-07T15:26:00","ca":"2026-05-08T00:03:00","inc":3600,"exp":0,"net":3600,"cash":420,"card":3180,"count":10,"items":[{"name":"salted caramel latte","qty":3,"total":790,"price":263.33,"cat":"Diger"},{"name":"strawberry matcha latte","qty":2,"total":560,"price":280.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":2,"total":540,"price":270.0,"cat":"Diger"},{"name":"americano","qty":3,"total":510,"price":170.0,"cat":"Diger"},{"name":"latte","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"ice tea","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"vanilya latte","qty":1,"total":220,"price":220.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":4,"total":200,"price":50.0,"cat":"Diger"},{"name":"(a) servis","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"filtre kahve","qty":1,"total":160,"price":160.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_120_1778252040","date":"2026-05-08","oa":"2026-05-08T14:54:00","ca":"2026-05-08T22:21:00","inc":4240,"exp":0,"net":4240,"cash":630,"card":3610,"count":12,"items":[{"name":"strawberry matcha latte","qty":3,"total":820,"price":273.33,"cat":"Diger"},{"name":"latte","qty":4,"total":780,"price":195.0,"cat":"Diger"},{"name":"americano","qty":3,"total":510,"price":170.0,"cat":"Diger"},{"name":"(a) servis","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":300,"price":150.0,"cat":"Diger"},{"name":"bitki çayı","qty":2,"total":300,"price":150.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":5,"total":250,"price":50.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"ice tea","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"cortado","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"dümdüz siyah çay","qty":1,"total":50,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_121_1778337600","date":"2026-05-09","oa":"2026-05-09T14:40:00","ca":"2026-05-09T21:54:00","inc":2810,"exp":0,"net":2810,"cash":150,"card":2660,"count":9,"items":[{"name":"americano","qty":4,"total":660,"price":165.0,"cat":"Diger"},{"name":"ice tea","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":320,"price":160.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"latte","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"cortado","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":2,"total":100,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_122_1778419140","date":"2026-05-10","oa":"2026-05-10T13:19:00","ca":"2026-05-10T23:10:00","inc":3680,"exp":0,"net":3680,"cash":330,"card":3350,"count":8,"items":[{"name":"vanilla matcha latte","qty":3,"total":810,"price":270.0,"cat":"Diger"},{"name":"latte","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":2,"total":540,"price":270.0,"cat":"Diger"},{"name":"americano","qty":3,"total":490,"price":163.33,"cat":"Diger"},{"name":"filtre kahve","qty":3,"total":480,"price":160.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":9,"total":450,"price":50.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"flatwhite","qty":1,"total":170,"price":170.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_123_1778502360","date":"2026-05-11","oa":"2026-05-11T12:26:00","ca":"2026-05-11T22:12:00","inc":4120,"exp":0,"net":4120,"cash":420,"card":3700,"count":12,"items":[{"name":"strawberry matcha latte","qty":3,"total":840,"price":280.0,"cat":"Diger"},{"name":"filtre kahve","qty":4,"total":640,"price":160.0,"cat":"Diger"},{"name":"ice tea","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"latte","qty":3,"total":560,"price":186.67,"cat":"Diger"},{"name":"americano","qty":3,"total":510,"price":170.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":230,"price":230.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":230,"price":230.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":3,"total":150,"price":50.0,"cat":"Diger"},{"name":"dümdüz siyah çay","qty":3,"total":150,"price":50.0,"cat":"Diger"},{"name":"Churchill","qty":1,"total":120,"price":120.0,"cat":"Diger"},{"name":"+vegan süt","qty":2,"total":100,"price":50.0,"cat":"Diger"},{"name":"soda","qty":1,"total":90,"price":90.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_124_1778591820","date":"2026-05-12","oa":"2026-05-12T13:17:00","ca":"2026-05-12T23:15:00","inc":5310,"exp":0,"net":5310,"cash":450,"card":4860,"count":11,"items":[{"name":"latte","qty":5,"total":960,"price":192.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":3,"total":840,"price":280.0,"cat":"Diger"},{"name":"ice tea","qty":4,"total":800,"price":200.0,"cat":"Diger"},{"name":"filtre kahve","qty":5,"total":800,"price":160.0,"cat":"Diger"},{"name":"americano","qty":3,"total":490,"price":163.33,"cat":"Diger"},{"name":"sigaralık filtre","qty":8,"total":400,"price":50.0,"cat":"Diger"},{"name":"(a) servis","qty":1,"total":350,"price":350.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"soda","qty":1,"total":90,"price":90.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_125_1778668740","date":"2026-05-13","oa":"2026-05-13T10:39:00","ca":"2026-05-13T23:11:00","inc":4370,"exp":0,"net":4370,"cash":100,"card":4270,"count":10,"items":[{"name":"americano","qty":7,"total":1190,"price":170.0,"cat":"Diger"},{"name":"latte","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"ice tea","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"salted caramel latte","qty":2,"total":470,"price":235.0,"cat":"Diger"},{"name":"bitki çayı","qty":3,"total":450,"price":150.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"berry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":5,"total":250,"price":50.0,"cat":"Diger"},{"name":"vanilya latte","qty":1,"total":220,"price":220.0,"cat":"Diger"},{"name":"filtre kahve","qty":1,"total":160,"price":160.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_126_1778751000","date":"2026-05-14","oa":"2026-05-14T09:30:00","ca":"2026-05-14T23:58:00","inc":3970,"exp":0,"net":3970,"cash":90,"card":3880,"count":9,"items":[{"name":"latte","qty":5,"total":940,"price":188.0,"cat":"Diger"},{"name":"americano","qty":5,"total":850,"price":170.0,"cat":"Diger"},{"name":"filtre kahve","qty":5,"total":720,"price":144.0,"cat":"Diger"},{"name":"salted caramel latte","qty":2,"total":500,"price":250.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"vanilya latte","qty":1,"total":220,"price":220.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":4,"total":200,"price":50.0,"cat":"Diger"},{"name":"dümdüz siyah çay","qty":3,"total":150,"price":50.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_127_1778846220","date":"2026-05-15","oa":"2026-05-15T11:57:00","ca":"2026-05-15T21:53:00","inc":3020,"exp":0,"net":3020,"cash":800,"card":2220,"count":10,"items":[{"name":"strawberry matcha latte","qty":3,"total":820,"price":273.33,"cat":"Diger"},{"name":"latte","qty":4,"total":780,"price":195.0,"cat":"Diger"},{"name":"americano","qty":2,"total":340,"price":170.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"ice tea","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"kış lattesi","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":3,"total":150,"price":50.0,"cat":"Diger"},{"name":"filtre kahve","qty":1,"total":140,"price":140.0,"cat":"Diger"},{"name":"soda","qty":1,"total":90,"price":90.0,"cat":"Diger"},{"name":"dümdüz siyah çay","qty":1,"total":50,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_128_1778937360","date":"2026-05-16","oa":"2026-05-16T13:16:00","ca":"2026-05-17T10:47:00","inc":1910,"exp":0,"net":1910,"cash":0,"card":1910,"count":5,"items":[{"name":"salted caramel latte","qty":3,"total":770,"price":256.67,"cat":"Diger"},{"name":"latte","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"ice tea","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":5,"total":250,"price":50.0,"cat":"Diger"},{"name":"filtre kahve","qty":1,"total":160,"price":160.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_129_1779014820","date":"2026-05-17","oa":"2026-05-17T10:47:00","ca":"2026-05-17T22:19:00","inc":6970,"exp":0,"net":6970,"cash":50,"card":6920,"count":12,"items":[{"name":"strawberry matcha latte","qty":4,"total":1120,"price":280.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":4,"total":1080,"price":270.0,"cat":"Diger"},{"name":"salted caramel latte","qty":4,"total":1020,"price":255.0,"cat":"Diger"},{"name":"filtre kahve","qty":7,"total":1000,"price":142.86,"cat":"Diger"},{"name":"americano","qty":4,"total":680,"price":170.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":12,"total":600,"price":50.0,"cat":"Diger"},{"name":"latte","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"tiramisu","qty":1,"total":290,"price":290.0,"cat":"Diger"},{"name":"berry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"ice tea","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_130_1779096900","date":"2026-05-18","oa":"2026-05-18T09:35:00","ca":"2026-05-18T22:11:00","inc":4050,"exp":0,"net":4050,"cash":1280,"card":2770,"count":9,"items":[{"name":"latte","qty":8,"total":1560,"price":195.0,"cat":"Diger"},{"name":"americano","qty":3,"total":510,"price":170.0,"cat":"Diger"},{"name":"mocha","qty":2,"total":480,"price":240.0,"cat":"Diger"},{"name":"ice tea","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"tiramisu","qty":1,"total":290,"price":290.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"filtre kahve","qty":1,"total":160,"price":160.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":3,"total":150,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_131_1779188400","date":"2026-05-19","oa":"2026-05-19T11:00:00","ca":"2026-05-19T22:06:00","inc":7580,"exp":0,"net":7580,"cash":700,"card":6880,"count":11,"items":[{"name":"filtre kahve","qty":9,"total":1380,"price":153.33,"cat":"Diger"},{"name":"americano","qty":5,"total":880,"price":176.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":3,"total":840,"price":280.0,"cat":"Diger"},{"name":"ice tea","qty":4,"total":800,"price":200.0,"cat":"Diger"},{"name":"latte","qty":4,"total":780,"price":195.0,"cat":"Diger"},{"name":"matcha latte","qty":3,"total":750,"price":250.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":14,"total":700,"price":50.0,"cat":"Diger"},{"name":"berry matcha latte","qty":2,"total":560,"price":280.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":2,"total":540,"price":270.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_132_1779275400","date":"2026-05-20","oa":"2026-05-20T11:10:00","ca":"2026-05-20T22:48:00","inc":2900,"exp":0,"net":2900,"cash":50,"card":2850,"count":11,"items":[{"name":"strawberry matcha latte","qty":2,"total":560,"price":280.0,"cat":"Diger"},{"name":"salted caramel latte","qty":2,"total":520,"price":260.0,"cat":"Diger"},{"name":"tiramisu","qty":1,"total":290,"price":290.0,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":280,"price":140.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"mocha","qty":1,"total":230,"price":230.0,"cat":"Diger"},{"name":"latte","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"americano","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"cortado","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":2,"total":100,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_133_1779360480","date":"2026-05-21","oa":"2026-05-21T10:48:00","ca":"2026-05-21T21:40:00","inc":1985,"exp":0,"net":1985,"cash":300,"card":1685,"count":9,"items":[{"name":"soft cookie","qty":2,"total":350,"price":175.0,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":300,"price":150.0,"cat":"Diger"},{"name":"apple & ginger matcha latte","qty":1,"total":260,"price":260.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":4,"total":200,"price":50.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"americano","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"+vegan süt","qty":2,"total":100,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_134_1779452580","date":"2026-05-22","oa":"2026-05-22T12:23:00","ca":"2026-05-22T22:52:00","inc":3570,"exp":0,"net":3570,"cash":0,"card":3570,"count":8,"items":[{"name":"strawberry matcha latte","qty":3,"total":840,"price":280.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":3,"total":810,"price":270.0,"cat":"Diger"},{"name":"americano","qty":4,"total":660,"price":165.0,"cat":"Diger"},{"name":"salted caramel latte","qty":2,"total":500,"price":250.0,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":280,"price":140.0,"cat":"Diger"},{"name":"ice tea","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"latte","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":3,"total":150,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_135_1779535440","date":"2026-05-23","oa":"2026-05-23T11:24:00","ca":"2026-05-23T21:30:00","inc":2500,"exp":0,"net":2500,"cash":0,"card":2500,"count":9,"items":[{"name":"filtre kahve","qty":4,"total":600,"price":150.0,"cat":"Diger"},{"name":"latte","qty":3,"total":580,"price":193.33,"cat":"Diger"},{"name":"soft cookie","qty":2,"total":350,"price":175.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"Churchill","qty":1,"total":120,"price":120.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":2,"total":100,"price":50.0,"cat":"Diger"},{"name":"dümdüz siyah çay","qty":2,"total":100,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_136_1779629400","date":"2026-05-24","oa":"2026-05-24T13:30:00","ca":"2026-05-25T09:20:00","inc":3270,"exp":0,"net":3270,"cash":100,"card":3170,"count":8,"items":[{"name":"filtre kahve","qty":5,"total":760,"price":152.0,"cat":"Diger"},{"name":"americano","qty":4,"total":660,"price":165.0,"cat":"Diger"},{"name":"latte","qty":3,"total":560,"price":186.67,"cat":"Diger"},{"name":"salted caramel latte","qty":2,"total":520,"price":260.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":9,"total":450,"price":50.0,"cat":"Diger"},{"name":"espresso","qty":1,"total":140,"price":140.0,"cat":"Diger"},{"name":"Churchill","qty":1,"total":120,"price":120.0,"cat":"Diger"},{"name":"dümdüz siyah çay","qty":2,"total":100,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_137_1779705720","date":"2026-05-25","oa":"2026-05-25T10:42:00","ca":"2026-05-26T13:29:00","inc":2860,"exp":0,"net":2860,"cash":830,"card":2030,"count":8,"items":[{"name":"filtre kahve","qty":5,"total":780,"price":156.0,"cat":"Diger"},{"name":"ice tea","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"salted caramel latte","qty":2,"total":520,"price":260.0,"cat":"Diger"},{"name":"latte","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"espresso","qty":2,"total":280,"price":140.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":2,"total":100,"price":50.0,"cat":"Diger"},{"name":"dümdüz siyah çay","qty":1,"total":50,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_138_1779807360","date":"2026-05-26","oa":"2026-05-26T14:56:00","ca":"2026-05-26T21:28:00","inc":1470,"exp":0,"net":1470,"cash":390,"card":1080,"count":5,"items":[{"name":"ice tea","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"latte","qty":2,"total":390,"price":195.0,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":320,"price":160.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"espresso","qty":1,"total":140,"price":140.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_139_1779966540","date":"2026-05-28","oa":"2026-05-28T11:09:00","ca":"2026-05-29T11:57:00","inc":3210,"exp":0,"net":3210,"cash":850,"card":2360,"count":7,"items":[{"name":"vanilla matcha latte","qty":3,"total":810,"price":270.0,"cat":"Diger"},{"name":"filtre kahve","qty":5,"total":720,"price":144.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":9,"total":420,"price":46.67,"cat":"Diger"},{"name":"ice tea","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"latte","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"americano","qty":2,"total":320,"price":160.0,"cat":"Diger"},{"name":"cortado","qty":1,"total":150,"price":150.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_140_1780055820","date":"2026-05-29","oa":"2026-05-29T11:57:00","ca":"2026-05-30T11:06:00","inc":3720,"exp":0,"net":3720,"cash":980,"card":2740,"count":8,"items":[{"name":"salted caramel latte","qty":5,"total":1270,"price":254.0,"cat":"Diger"},{"name":"filtre kahve","qty":5,"total":780,"price":156.0,"cat":"Diger"},{"name":"americano","qty":3,"total":510,"price":170.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":5,"total":250,"price":50.0,"cat":"Diger"},{"name":"vanilya latte","qty":1,"total":220,"price":220.0,"cat":"Diger"},{"name":"ice tea","qty":1,"total":200,"price":200.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_141_1780139160","date":"2026-05-30","oa":"2026-05-30T11:06:00","ca":"2026-05-31T13:35:00","inc":2640,"exp":0,"net":2640,"cash":100,"card":2540,"count":7,"items":[{"name":"americano","qty":5,"total":850,"price":170.0,"cat":"Diger"},{"name":"latte","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":9,"total":450,"price":50.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"ice tea","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"espresso","qty":1,"total":140,"price":140.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_142_1780234680","date":"2026-05-31","oa":"2026-05-31T13:38:00","ca":"2026-05-31T23:55:00","inc":5030,"exp":0,"net":5030,"cash":250,"card":4780,"count":12,"items":[{"name":"filtre kahve","qty":8,"total":1180,"price":147.5,"cat":"Diger"},{"name":"salted caramel latte","qty":3,"total":790,"price":263.33,"cat":"Diger"},{"name":"sigaralık filtre","qty":15,"total":750,"price":50.0,"cat":"Diger"},{"name":"americano","qty":4,"total":660,"price":165.0,"cat":"Diger"},{"name":"latte","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"matcha latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"ice tea","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"cappuccino","qty":1,"total":180,"price":180.0,"cat":"Diger"},{"name":"bitki çayı","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"espresso","qty":1,"total":140,"price":140.0,"cat":"Diger"},{"name":"soda","qty":1,"total":90,"price":90.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1780322820","date":"2026-06-01","oa":"2026-06-01T14:07:00","ca":"2026-06-02T11:21:00","inc":3020,"exp":0,"net":3020,"cash":400,"card":2620,"count":7,"items":[{"name":"latte","qty":4,"total":800,"price":200.0,"cat":"Diger"},{"name":"americano","qty":4,"total":680,"price":170.0,"cat":"Diger"},{"name":"filtre kahve","qty":4,"total":640,"price":160.0,"cat":"Diger"},{"name":"espresso","qty":2,"total":280,"price":140.0,"cat":"Diger"},{"name":"berry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"ice tea","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":3,"total":150,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1780399320","date":"2026-06-02","oa":"2026-06-02T11:22:00","ca":"2026-06-03T10:59:00","inc":2970,"exp":0,"net":2970,"cash":300,"card":2670,"count":9,"items":[{"name":"ice tea","qty":4,"total":800,"price":200.0,"cat":"Diger"},{"name":"filtre kahve","qty":5,"total":780,"price":156.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"vanilya latte","qty":1,"total":220,"price":220.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":4,"total":200,"price":50.0,"cat":"Diger"},{"name":"latte","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"americano","qty":1,"total":170,"price":170.0,"cat":"Diger"},{"name":"espresso","qty":1,"total":140,"price":140.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1780486260","date":"2026-06-03","oa":"2026-06-03T11:31:00","ca":"2026-06-03T23:00:00","inc":4330,"exp":0,"net":4330,"cash":800,"card":3530,"count":10,"items":[{"name":"ice tea","qty":7,"total":1400,"price":200.0,"cat":"Diger"},{"name":"filtre kahve","qty":5,"total":800,"price":160.0,"cat":"Diger"},{"name":"latte","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"americano","qty":3,"total":490,"price":163.33,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"mevsim meyvelerinden matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"cortado","qty":1,"total":150,"price":150.0,"cat":"Diger"},{"name":"espresso","qty":1,"total":140,"price":140.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":2,"total":100,"price":50.0,"cat":"Diger"},{"name":"soda","qty":1,"total":90,"price":90.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1780577520","date":"2026-06-04","oa":"2026-06-04T12:52:00","ca":"2026-06-05T14:50:00","inc":4400,"exp":0,"net":4400,"cash":650,"card":3750,"count":10,"items":[{"name":"filtre kahve","qty":6,"total":960,"price":160.0,"cat":"Diger"},{"name":"ice tea","qty":4,"total":800,"price":200.0,"cat":"Diger"},{"name":"salted caramel latte","qty":3,"total":790,"price":263.33,"cat":"Diger"},{"name":"latte","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"americano","qty":3,"total":520,"price":173.33,"cat":"Diger"},{"name":"berry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"soda","qty":2,"total":180,"price":90.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":3,"total":150,"price":50.0,"cat":"Diger"},{"name":"cappuccino","qty":1,"total":120,"price":120.0,"cat":"Diger"},{"name":"+vegan süt","qty":2,"total":100,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1780682820","date":"2026-06-05","oa":"2026-06-05T18:07:00","ca":"2026-06-05T23:31:00","inc":2210,"exp":0,"net":2210,"cash":410,"card":1800,"count":6,"items":[{"name":"salted caramel latte","qty":3,"total":750,"price":250.0,"cat":"Diger"},{"name":"americano","qty":3,"total":490,"price":163.33,"cat":"Diger"},{"name":"latte","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"ice tea","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"filtre kahve","qty":1,"total":160,"price":160.0,"cat":"Diger"},{"name":"soda","qty":1,"total":90,"price":90.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1780746360","date":"2026-06-06","oa":"2026-06-06T11:46:00","ca":"2026-06-07T15:59:00","inc":2720,"exp":0,"net":2720,"cash":600,"card":2120,"count":7,"items":[{"name":"americano","qty":5,"total":850,"price":170.0,"cat":"Diger"},{"name":"latte","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"matcha latte","qty":2,"total":460,"price":230.0,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":320,"price":160.0,"cat":"Diger"},{"name":"strawberry matcha latte","qty":1,"total":280,"price":280.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":1,"total":50,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1780847940","date":"2026-06-07","oa":"2026-06-07T15:59:00","ca":"2026-06-08T11:23:00","inc":1290,"exp":0,"net":1290,"cash":820,"card":470,"count":5,"items":[{"name":"americano","qty":2,"total":340,"price":170.0,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":300,"price":150.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":4,"total":200,"price":50.0,"cat":"Diger"},{"name":"latte","qty":1,"total":200,"price":200.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1780917780","date":"2026-06-08","oa":"2026-06-08T11:23:00","ca":"2026-06-09T11:29:00","inc":4470,"exp":0,"net":4470,"cash":400,"card":4070,"count":7,"items":[{"name":"ice tea","qty":8,"total":1600,"price":200.0,"cat":"Diger"},{"name":"americano","qty":8,"total":1340,"price":167.5,"cat":"Diger"},{"name":"matcha latte","qty":3,"total":600,"price":200.0,"cat":"Diger"},{"name":"latte","qty":2,"total":400,"price":200.0,"cat":"Diger"},{"name":"vanilla matcha latte","qty":1,"total":270,"price":270.0,"cat":"Diger"},{"name":"filtre kahve","qty":1,"total":160,"price":160.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":2,"total":100,"price":50.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1781005500","date":"2026-06-09","oa":"2026-06-09T11:45:00","ca":"2026-06-10T10:25:00","inc":2500,"exp":0,"net":2500,"cash":400,"card":2100,"count":5,"items":[{"name":"ice tea","qty":6,"total":1200,"price":200.0,"cat":"Diger"},{"name":"americano","qty":4,"total":640,"price":160.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":6,"total":300,"price":50.0,"cat":"Diger"},{"name":"latte","qty":1,"total":200,"price":200.0,"cat":"Diger"},{"name":"filtre kahve","qty":1,"total":160,"price":160.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1781088540","date":"2026-06-10","oa":"2026-06-10T10:49:00","ca":"2026-06-11T01:54:00","inc":3430,"exp":0,"net":3430,"cash":0,"card":3430,"count":6,"items":[{"name":"ice tea","qty":7,"total":1400,"price":200.0,"cat":"Diger"},{"name":"salted caramel latte","qty":3,"total":750,"price":250.0,"cat":"Diger"},{"name":"americano","qty":3,"total":490,"price":163.33,"cat":"Diger"},{"name":"filtre kahve","qty":2,"total":320,"price":160.0,"cat":"Diger"},{"name":"sigaralık filtre","qty":6,"total":300,"price":50.0,"cat":"Diger"},{"name":"latte","qty":1,"total":200,"price":200.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true},{"id":"old_june_1781184720","date":"2026-06-11","oa":"2026-06-11T13:32:00","ca":"2026-06-11T17:42:00","inc":1050,"exp":0,"net":1050,"cash":180,"card":870,"count":0,"items":[],"guests":[],"exps":[],"imported":true},{"id":"old_june_1781272080","date":"2026-06-12","oa":"2026-06-12T13:48:00","ca":"2026-06-14T15:51:00","inc":550,"exp":0,"net":550,"cash":300,"card":250,"count":2,"items":[{"name":"vanilla matcha latte","qty":1,"total":300,"price":300.0,"cat":"Diger"},{"name":"salted caramel latte","qty":1,"total":250,"price":250.0,"cat":"Diger"}],"guests":[],"exps":[],"imported":true}];
const DS={name:"Restoran",tableCount:10,cur:"TL",requireName:false};
const DEC=["Buz","Su","Kahve","Matcha","Fatura","Take Away Malz.","Süt","Meyve","Kırtasiye / Nalbur","Yaşar Amca","Alkol","Market","Ekipman"];
const PO=[{k:"cash",l:"Nakit",c:"#5C4A1E",bg:"#F5F0E4",bd:"#D4C080"},{k:"card",l:"Kart",c:"#2D4A6A",bg:"#EEF2F7",bd:"#9BBAD8"},{k:"credit",l:"Cari",c:"#6B4CA0",bg:"#F3EFF9",bd:"#C4AEE8"}];

const mkT=(n)=>Array.from({length:n},(_,i)=>({id:i+1,s:"e",order:[],oa:null,lbl:"Masa "+(i+1),g:""}));
const fm=(n,c="TL")=>Number(n).toLocaleString("tr-TR",{minimumFractionDigits:2,maximumFractionDigits:2})+" "+c;
const fd=(d)=>new Date(d).toLocaleDateString("tr-TR",{day:"2-digit",month:"2-digit",year:"numeric"});
const fdl=(d)=>new Date(d).toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const ft=(d)=>new Date(d).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});
const tod=()=>new Date().toISOString().split("T")[0];
const uid=()=>Date.now()+Math.random();
const SUPABASE_URL="https://dpucptcrxoddfpvaqsdl.supabase.co";
const SUPABASE_KEY="sb_publishable_YiTDrcX7nnotBkoWqEWaHQ_tYHlT3NK";

const sv=async(k,v)=>{
  try{
    await fetch(SUPABASE_URL+"/rest/v1/app_storage",{
      method:"POST",
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":"Bearer "+SUPABASE_KEY,
        "Content-Type":"application/json",
        "Prefer":"resolution=merge-duplicates",
      },
      body:JSON.stringify({key:k,value:v}),
    });
  }catch{}
};
const ld=async(k,fb)=>{
  try{
    const r=await fetch(SUPABASE_URL+"/rest/v1/app_storage?key=eq."+k+"&select=value",{
      headers:{
        "apikey":SUPABASE_KEY,
        "Authorization":"Bearer "+SUPABASE_KEY,
      },
    });
    const j=await r.json();
    if(j&&j.length>0)return j[0].value;
    return fb;
  }catch{return fb;}
};

const inp={background:T.bg3,border:"1px solid "+T.border2,borderRadius:8,padding:"9px 12px",color:T.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"};
const sb=(bg,col="#fff")=>({background:bg,border:"none",color:col,borderRadius:8,padding:"10px 18px",fontWeight:600,fontSize:13,cursor:"pointer"});

const NAV=[{k:"home",l:"Başlangıç"},{k:"tables",l:"Masalar"},{k:"online",l:"Online"},{k:"reports",l:"Raporlar"},{k:"credit",l:"Cari"},{k:"settings",l:"Ayarlar"}];

export default function App(){
const[view,setV]=useState("home");
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
const[toast,setToast]=useState(null);
const[onlineOrders,setOnlineOrders]=useState([]);
const[cat,setCat]=useState("Tümü");
const[disc,setDisc]=useState(null);
const[pay,setPay]=useState(false);
const[disM,setDisM]=useState(false);
const[gM,setGM]=useState(null);
const[selLog,setSelLog]=useState(null);
const[repT,setRepT]=useState("items");
const[mainT,setMainT]=useState("sales");
const[installments,setInstallments]=useState([]);
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

useEffect(()=>{(async()=>{
const t=await ld("p4t",null);const o=await ld("p4o",[]);const e=await ld("p4e",[]);
const m=await ld("p4m",null);const s=await ld("p4s",DS);const d=await ld("p4d",null);
const l=await ld("p4l",[]);const c=await ld("p4c",[]);const ec=await ld("p4ec",DEC);
const onl=await ld("p4onl",[]);
const inst=await ld("p4inst",[]);
const cf={...DS,...s};setCfg(cf);setCfgF(cf);setMenü(m||MENU);setOrd(o);setExp(e);
const oldDef=["Malzeme","Kira","Personel","Fatura","Diger"];
const isOldEc=!ec||ec.length===0||(ec.length===5&&ec.every((x,i)=>x===oldDef[i]));
setDay(d);setLogs(l);setCari(c);setEc(isOldEc?DEC:ec);setOnlineOrders(onl);setInstallments(inst);setTbl(t||mkT(cf.tableCount));setOk(true);
})();},[]);

useEffect(()=>{if(ok)sv("p4t",tables);},[tables,ok]);
useEffect(()=>{if(ok)sv("p4o",orders);},[orders,ok]);
useEffect(()=>{if(ok)sv("p4e",exp);},[exp,ok]);
useEffect(()=>{if(ok)sv("p4m",menu);},[menu,ok]);
useEffect(()=>{if(ok)sv("p4s",cfg);},[cfg,ok]);
useEffect(()=>{if(ok)sv("p4d",day);},[day,ok]);
useEffect(()=>{if(ok)sv("p4l",logs);},[logs,ok]);
useEffect(()=>{if(ok)sv("p4c",cari);},[cari,ok]);
useEffect(()=>{if(ok)sv("p4ec",ecats);},[ecats,ok]);
useEffect(()=>{if(ok)sv("p4onl",onlineOrders);},[onlineOrders,ok]);
useEffect(()=>{if(ok)sv("p4inst",installments);},[installments,ok]);

const msg=(m,t="ok")=>{setToast({m,t});setTimeout(()=>setToast(null),2800);};
const cur=cfg.cur||"TL";

const openDay=()=>{
const td=tod();
const alreadyClosed=logs.some(l=>l.date===td);
if(alreadyClosed){msg("Bugün zaten kapatıldı, yarın tekrar açabilirsin","err");return;}
setDay({oa:new Date().toISOString()});msg("Gün açıldı");
};
const closeDay=()=>{
const td=tod();const to=orders.filter(o=>o.date===td);const te=exp.filter(e=>e.date===td);
const cash=to.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
const card=to.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
const inc=to.reduce((s,o)=>s+o.total,0);const expt=te.reduce((s,e)=>s+e.amount,0);
const im={};to.forEach(o=>o.items.forEach(it=>{if(!im[it.name])im[it.name]={name:it.name,cat:it.cat||"",qty:0,total:0,price:it.price};im[it.name].qty+=it.qty;im[it.name].total+=it.price*it.qty;}));
const gm={};to.forEach(o=>{const g=o.g||"--";if(!gm[g])gm[g]={name:g,count:0,total:0,orders:[]};gm[g].count++;gm[g].total+=o.total;gm[g].orders.push({tbl:o.tn,total:o.total,pt:o.pt,items:o.items});});
setLogs(prev=>[{id:uid(),date:td,oa:day.oa,ca:new Date().toISOString(),inc,exp:expt,net:inc-expt,cash,card,count:to.length,items:Object.values(im).sort((a,b)=>b.qty-a.qty),guests:Object.values(gm).sort((a,b)=>b.total-a.total),exps:te},...prev]);
setDay(null);setDayCon(false);msg("Gun kapatıldı");};

const goTbl=(id)=>{if(!day){msg("Önce günü aç","err");return;}if(cfg.requireName){setGM(id);}else doOpen(id,"");};
const doOpen=(id,g)=>{setTbl(prev=>prev.map(t=>t.id===id?{...t,s:"o",oa:t.oa||new Date().toISOString(),g:g||t.g}:t));setSel(id);setCat("Tümü");setDisc(null);setPay(false);setGM(null);setV("order");};
const addItem=(tid,item)=>{setTbl(prev=>prev.map(t=>{if(t.id!==tid)return t;const ex=t.order.find(o=>o.id===item.id);const order=ex?t.order.map(o=>o.id===item.id?{...o,qty:o.qty+1}:o):[...t.order,{...item,qty:1}];return{...t,order,s:"o",oa:t.oa||new Date().toISOString()};}));};
const chQ=(tid,iid,d)=>{setTbl(prev=>prev.map(t=>{if(t.id!==tid)return t;return{...t,order:t.order.map(o=>o.id===iid?{...o,qty:o.qty+d}:o).filter(o=>o.qty>0)};}));};
const sub=(t)=>t.order.reduce((s,o)=>s+o.price*o.qty,0);
const fin=(t)=>{const s=sub(t);return disc?disc.after:s;};

const closeTbl=(splits)=>{
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
setTbl(prev=>prev.map(t2=>t2.id===sel?{...t2,s:"e",order:[],oa:null,g:""}:t2));
setPay(false);setSel(null);setDisc(null);setV("tables");msg(t.lbl+" kapatıldı");};

const addExp=()=>{if(!expF.desc||!expF.amount)return;setExp(prev=>[{id:uid(),...expF,amount:parseFloat(expF.amount)},...prev]);setExpF(p=>({desc:"",amount:"",cat:ecats[0]||p.cat,date:tod()}));msg("Harcama eklendi");};
const saveMI=()=>{if(!mF.name||!mF.price||!mF.cat)return;if(mEid){setMenü(prev=>prev.map(m=>m.id===mEid?{...m,...mF,price:parseFloat(mF.price)}:m));msg("Güncellendi");}else{setMenü(prev=>[...prev,{id:uid(),...mF,price:parseFloat(mF.price),on:true}]);msg("Eklendi");}setMF({name:"",price:"",cat:"",on:true});setMEid(null);};
const saveCfg=()=>{const nc={...cfgF,tableCount:parseInt(cfgF.tableCount)||10};setCfg(nc);if(nc.tableCount!==tables.length)setTbl(mkT(nc.tableCount).map(nt=>tables.find(t=>t.id===nt.id)||nt));msg("Kaydedildi");};

const todO=orders.filter(o=>o.date===tod());
const todI=todO.reduce((s,o)=>s+o.total,0);
const aMenü=menu.filter(m=>m.on);
const oCats=["Tümü",...Array.from(new Set(aMenü.map(m=>m.cat)))];
const fMenü=cat==="Tümü"?aMenü:aMenü.filter(m=>m.cat===cat);
const curT=tables.find(t=>t.id===sel);
const go=(k)=>{setV(k);setSel(null);setSelLog(null);};

if(!ok)return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:T.bg}}>Yükleniyor...</div>;

return(
<div style={{fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif",background:T.bg,minHeight:"100vh",color:T.text}}>

{toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:toast.t==="ok"?"#EBF5EF":"#FDEFED",color:toast.t==="ok"?T.success:T.danger,border:"1px solid "+(toast.t==="ok"?"#74C69D":"#E8BABA"),padding:"10px 20px",borderRadius:20,fontWeight:600,fontSize:13,whiteSpace:"nowrap"}}>{toast.m}</div>}

<nav style={{background:T.bg2,borderBottom:"1px solid "+T.border,padding:"0 20px",display:"flex",alignItems:"center",gap:4,height:52,boxShadow:T.shadow}}>
<span style={{fontWeight:800,fontSize:15,color:T.accent,marginRight:12}}>{cfg.name}</span>
<div style={{marginRight:12}}>
{day?<div style={{display:"flex",alignItems:"center",gap:5,background:"#EBF5EF",border:"1px solid #74C69D",borderRadius:20,padding:"3px 10px"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.success,display:"inline-block"}}/><span style={{fontSize:10,color:T.success,fontWeight:700}}>AÇIK {ft(day.oa)}</span></div>
:<div style={{display:"flex",alignItems:"center",gap:5,background:"#FDEFED",border:"1px solid #E8BABA",borderRadius:20,padding:"3px 10px"}}><span style={{width:6,height:6,borderRadius:"50%",background:T.danger,display:"inline-block"}}/><span style={{fontSize:10,color:T.danger,fontWeight:700}}>KAPALI</span></div>}
</div>
{NAV.map(({k,l})=><button key={k} onClick={()=>go(k)} style={{padding:"6px 12px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:view===k?"#EBF5EF":"transparent",color:view===k?T.accent:T.textSub}}>{l}</button>)}
</nav>

{view==="home"&&<HomeV tables={tables} orders={orders} exp={exp} todO={todO} todI={todI} day={day} cari={cari} cfg={cfg} cur={cur} fm={fm} ft={ft} fd={fd} tod={tod} setV={setV} openDay={openDay} closeDay={closeDay} dayCon={dayCon} setDayCon={setDayCon}/>}

{view==="tables"&&(
<div style={{padding:24,maxWidth:1100,margin:"0 auto"}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
<h2 style={{margin:0,fontWeight:700,fontSize:20}}>Aktif Masalar</h2>
{!day&&<div style={{background:"#FDEFED",border:"1px solid #E8BABA",borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:12,color:T.danger,fontWeight:600}}>Gün açık değil</span><button onClick={()=>go("home")} style={{fontSize:12,color:T.accent,background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Başlangıç</button></div>}
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:12}}>
{tables.map(t=>{const tot=t.order.reduce((s,o)=>s+o.price*o.qty,0);const dur=t.oa?Math.floor((Date.now()-new Date(t.oa))/60000):0;const occ=t.s==="o";return(
<button key={t.id} onClick={()=>goTbl(t.id)} style={{background:occ?"#EBF5EF":T.bg2,border:"2px solid "+(occ?T.success:T.border),borderRadius:14,padding:"14px 12px",cursor:day?"pointer":"not-allowed",textAlign:"left",color:T.text,opacity:day?1:0.5,boxShadow:T.shadow}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontWeight:800,fontSize:13}}>{t.lbl}</span><span style={{background:occ?T.success:T.bg3,color:occ?"#fff":T.textSub,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:20}}>{occ?"DOLU":"BOŞ"}</span></div>
{t.g&&<div style={{fontSize:10,color:T.accentL,marginBottom:4}}>{t.g}</div>}
{occ?<><div style={{fontSize:17,fontWeight:800,color:T.accentL}}>{fm(tot,cur)}</div><div style={{fontSize:10,color:T.textSub,marginTop:2}}>{dur}dk - {t.order.length} kalem</div></>:<div style={{fontSize:11,color:T.textDim}}>Boş</div>}
</button>);})}
</div>
<div style={{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:"12px 16px",boxShadow:T.shadow}}><div style={{fontSize:11,color:T.textSub,marginBottom:4}}>Dolu Masa</div><div style={{fontSize:18,fontWeight:800,color:T.accent}}>{tables.filter(t=>t.s==="o").length} / {tables.length}</div></div>
<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:"12px 16px",boxShadow:T.shadow}}><div style={{fontSize:11,color:T.textSub,marginBottom:4}}>Açık Hesap</div><div style={{fontSize:18,fontWeight:800,color:T.accentL}}>{fm(tables.reduce((s,t)=>s+t.order.reduce((a,o)=>a+o.price*o.qty,0),0),cur)}</div></div>
</div>
</div>
)}

{view==="order"&&curT&&(
<div style={{display:"grid",gridTemplateColumns:"1fr 340px",height:"calc(100vh - 52px)"}}>
{gM&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><GuestM req={cfg.requireName} onOk={g=>doOpen(gM,g)} onSkip={()=>doOpen(gM,"")} T={T}/></div>}
{disM&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><DiscM total={sub(curT)} cur={cur} fm={fm} T={T} onApply={d=>{setDisc(d);setDisM(false);}} onClose={()=>setDisM(false)}/></div>}
{pay&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center"}}><PayM table={curT} disc={disc} cur={cur} fm={fm} T={T} PO={PO} openCari={cari.filter(c=>!c.settled)} onClose={()=>setPay(false)} onDone={closeTbl}/></div>}
<div style={{padding:16,overflowY:"auto"}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
<button onClick={()=>{setV("tables");setSel(null);}} style={{...sb(T.bg3),color:T.textSub,padding:"6px 12px"}}>Masalar</button>
<div><div style={{fontWeight:700,fontSize:16}}>{curT.lbl}</div>{curT.g&&<div style={{fontSize:11,color:T.accentL}}>{curT.g}</div>}</div>
{curT.oa&&<span style={{fontSize:11,color:T.textSub,background:T.bg3,padding:"2px 8px",borderRadius:20}}>{ft(curT.oa)}</span>}
</div>
<div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
{oCats.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:"4px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:cat===c?T.accent:T.bg3,color:cat===c?"#fff":T.textSub}}>{c}</button>)}
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:8}}>
{fMenü.map(item=><button key={item.id} onClick={()=>addItem(curT.id,item)} style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:10,padding:"10px 8px",cursor:"pointer",textAlign:"left",color:T.text}}><div style={{fontWeight:600,fontSize:11,marginBottom:4}}>{item.name}</div><div style={{fontWeight:800,fontSize:13,color:T.accentL}}>{fm(item.price,cur)}</div></button>)}
</div>
</div>
<div style={{background:T.bg2,borderLeft:"1px solid "+T.border,display:"flex",flexDirection:"column"}}>
<div style={{padding:"12px 16px",borderBottom:"1px solid "+T.border,fontWeight:700,fontSize:13,color:T.accentL,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<span>Sipariş</span>
<button onClick={()=>{if(cfg.requireName)setGM(curT.id);}} style={{background:"none",border:"1px solid "+T.border2,borderRadius:6,padding:"3px 8px",color:T.textSub,cursor:"pointer",fontSize:11}}>{curT.g||"Müşteri"}</button>
</div>
<div style={{flex:1,overflowY:"auto",padding:"10px 14px"}}>
{curT.order.length===0?<div style={{color:T.textDim,textAlign:"center",paddingTop:30,fontSize:12}}>Ürün eklenmedi</div>
:curT.order.map(item=><div key={item.id} style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
<div style={{flex:1}}><div style={{fontSize:12,fontWeight:600}}>{item.name}</div><div style={{fontSize:10,color:T.textSub}}>{fm(item.price,cur)} x {item.qty} = <span style={{color:T.accentL}}>{fm(item.price*item.qty,cur)}</span></div></div>
<div style={{display:"flex",gap:3}}>
<button onClick={()=>chQ(curT.id,item.id,-1)} style={{width:24,height:24,borderRadius:6,border:"1px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>-</button>
<span style={{width:18,textAlign:"center",fontWeight:700,lineHeight:"24px",fontSize:12}}>{item.qty}</span>
<button onClick={()=>chQ(curT.id,item.id,1)} style={{width:24,height:24,borderRadius:6,border:"1px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
</div></div>)}
</div>
<div style={{padding:"12px 16px",borderTop:"1px solid "+T.border}}>
<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:4}}><span>Ara toplam</span><span>{fm(sub(curT),cur)}</span></div>
{disc?<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.danger,marginBottom:4}}><span>İndirim <button onClick={()=>setDisc(null)} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",padding:"0 2px",fontSize:14}}>x</button></span><span>-{fm(disc.amount,cur)}</span></div>
:<button onClick={()=>curT.order.length>0&&setDisM(true)} style={{width:"100%",background:T.bg3,border:"1px dashed "+T.border2,borderRadius:8,padding:"6px",color:T.textSub,fontSize:11,cursor:"pointer",marginBottom:8}}>İndirim Ekle</button>}
<div style={{display:"flex",justifyContent:"space-between",fontSize:18,fontWeight:800,color:T.accentL,marginBottom:12,marginTop:4}}><span>Toplam</span><span>{fm(fin(curT),cur)}</span></div>
<button onClick={()=>curT.order.length>0&&setPay(true)} disabled={curT.order.length===0} style={{width:"100%",padding:"13px",background:curT.order.length===0?T.bg3:T.accent,color:curT.order.length===0?T.textDim:"#fff",border:"none",borderRadius:10,fontWeight:800,fontSize:14,cursor:curT.order.length===0?"not-allowed":"pointer"}}>Ödeme Al</button>
</div>
</div>
</div>
)}

{view==="online"&&<OnlineV onlineOrders={onlineOrders} setOnlineOrders={setOnlineOrders} cur={cur} fm={fm} fd={fd} ft={ft} tod={tod} uid={uid} msg={msg} inp={inp} sb={sb} T={T}/>}
{view==="product-analysis"&&<ProductAnalysisV logs={logs} cur={cur} fm={fm} fd={fd} setV={setV} sb={sb} inp={inp} T={T}/>}
{view==="import-old"&&<ImportOldV logs={logs} setLogs={setLogs} cur={cur} fm={fm} fd={fd} setV={setV} sb={sb} T={T}/>}
{view==="reports"&&!selLog&&<ReportsV orders={orders} exp={exp} logs={logs} cur={cur} fm={fm} fd={fd} fdl={fdl} ft={ft} tod={tod} mainT={mainT} setMainT={setMainT} expMon={expMon} setExpMon={setExpMon} expDay={expDay} setExpDay={setExpDay} ecats={ecats} expF={expF} setExpF={setExpF} showEF={showEF} setShowEF={setShowEF} addExp={addExp} setExp={setExp} inp={inp} sb={sb} setSelLog={setSelLog} setV={setV} installments={installments} setInstallments={setInstallments}/>}
{view==="reports"&&selLog&&<LogV log={selLog} setLogs={setLogs} ecats={ecats} cur={cur} fm={fm} ft={ft} fdl={fdl} repT={repT} setRepT={setRepT} setSelLog={setSelLog} inp={inp} T={T} sb={sb} orders={orders} setOrd={setOrd}/>}
{view==="credit"&&<CariV cari={cari} setCari={setCari} cur={cur} fm={fm} fd={fd} ft={ft} selC={selC} setSelC={setSelC} stT={stT} setStT={setStT} delC={delC} setDelC={setDelC} msg={msg} T={T} sb={sb} PO={PO}/>}
{view==="settings"&&<SetV cfg={cfg} cfgF={cfgF} setCfgF={setCfgF} saveCfg={saveCfg} stab={stab} setStab={setStab} menu={menu} mF={mF} setMF={setMF} mEid={mEid} setMEid={setMEid} mCat={mCat} setMCat={setMCat} saveMI={saveMI} setMenü={setMenü} ecats={ecats} setEc={setEc} newec={newec} setNewec={setNewec} exp={exp} msg={msg} setOrd={setOrd} setExp={setExp} setLogs={setLogs} cur={cur} fm={fm} inp={inp} sb={sb} T={T}/>}
</div>
);}

function HomeV({tables,orders,exp,todO,todI,day,cari,cfg,cur,fm,ft,fd,tod,setV,openDay,closeDay,dayCon,setDayCon}){
const now=new Date();
const cash=todO.filter(o=>o.pt==="cash").reduce((s,o)=>s+o.total,0);
const card=todO.filter(o=>o.pt==="card").reduce((s,o)=>s+o.total,0);
const cred=todO.filter(o=>o.pt==="credit").reduce((s,o)=>s+o.total,0);
const todE=exp.filter(e=>e.date===tod()).reduce((s,e)=>s+e.amount,0);
const openT=tables.filter(t=>t.s==="o");
const oCari=cari.filter(c=>!c.settled);
const l7=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-i);const ds=d.toISOString().split("T")[0];return{date:ds,lbl:d.toLocaleDateString("tr-TR",{weekday:"short"}),inc:orders.filter(o=>o.date===ds).reduce((s,o)=>s+o.total,0)};}).reverse();
const mx=Math.max(...l7.map(d=>d.inc),1);
const rec=orders.filter(o=>o.date===tod()).slice(0,8);
return(
<div style={{padding:28,maxWidth:980,margin:"0 auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28}}>
<div>
<div style={{fontSize:13,color:"#6B6860",fontWeight:500}}>{now.toLocaleDateString("tr-TR",{weekday:"long"})}</div>
<h1 style={{margin:"4px 0 8px",fontWeight:800,fontSize:26,letterSpacing:-0.8}}>{now.toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"})}</h1>
{day?<span style={{fontSize:12,color:"#2D6A4F",background:"#EBF5EF",border:"1px solid #74C69D",padding:"4px 12px",borderRadius:20,fontWeight:600}}>Gün açık - {ft(day.oa)}</span>:<span style={{fontSize:12,color:"#B83232",background:"#FDEFED",border:"1px solid #E8BABA",padding:"4px 12px",borderRadius:20,fontWeight:600}}>Gün henüz açılmadı</span>}
</div>
<div style={{display:"flex",gap:10}}>
{!day?<button onClick={openDay} style={{background:"#2D6A4F",border:"none",color:"#fff",padding:"11px 22px",borderRadius:12,fontWeight:600,fontSize:14,cursor:"pointer"}}>Günü Aç</button>
:dayCon?<div style={{display:"flex",gap:8,alignItems:"center",background:"#fff",border:"1px solid #E4E1DA",borderRadius:10,padding:"8px 14px"}}><span style={{fontSize:12,color:"#6B6860"}}>Günü kapat?</span><button onClick={()=>setDayCon(false)} style={{background:"#EFEDE8",border:"none",color:"#1C1C1A",borderRadius:8,padding:"7px 12px",fontWeight:600,fontSize:12,cursor:"pointer"}}>İptal</button><button onClick={closeDay} style={{background:"#B83232",border:"none",color:"#fff",borderRadius:8,padding:"7px 14px",fontWeight:600,fontSize:12,cursor:"pointer"}}>Evet</button></div>
:<button onClick={()=>setDayCon(true)} style={{background:"#EFEDE8",border:"1px solid #CCC9C0",color:"#8B6914",padding:"11px 18px",borderRadius:12,fontWeight:600,fontSize:13,cursor:"pointer"}}>Günü Kapat</button>}
</div>
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14,marginBottom:24}}>
<div style={{background:"linear-gradient(135deg,#2D6A4F,#40916C)",borderRadius:14,padding:"20px 22px",color:"#fff",gridColumn:"span 2"}}>
<div style={{fontSize:11,opacity:0.8,marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>Bugün Toplam Ciro</div>
<div style={{fontSize:36,fontWeight:800,letterSpacing:-1.5}}>{fm(todI,cur)}</div>
<div style={{fontSize:12,opacity:0.75,marginTop:6}}>{todO.length} adisyon</div>
</div>
<div style={{background:"#F5F0E4",border:"1px solid #D4C080",borderRadius:14,padding:"16px 18px"}}><div style={{fontSize:11,color:"#7A6428",marginBottom:5,fontWeight:600}}>Nakit</div><div style={{fontSize:22,fontWeight:800,color:"#5C4A1E"}}>{fm(cash,cur)}</div>{todI>0&&<div style={{fontSize:11,color:"#6B6860",marginTop:3}}>%{Math.round(cash/todI*100)}</div>}</div>
<div style={{background:"#EEF2F7",border:"1px solid #9BBAD8",borderRadius:14,padding:"16px 18px"}}><div style={{fontSize:11,color:"#1A3A5A",marginBottom:5,fontWeight:600}}>Kart</div><div style={{fontSize:22,fontWeight:800,color:"#2D4A6A"}}>{fm(card,cur)}</div>{todI>0&&<div style={{fontSize:11,color:"#6B6860",marginTop:3}}>%{Math.round(card/todI*100)}</div>}</div>
{cred>0&&<div style={{background:"#F3EFF9",border:"1px solid #C4AEE8",borderRadius:14,padding:"16px 18px"}}><div style={{fontSize:11,color:"#6B4CA0",marginBottom:5,fontWeight:600}}>Cari</div><div style={{fontSize:22,fontWeight:800,color:"#6B4CA0"}}>{fm(cred,cur)}</div></div>}
<div style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:14,padding:"16px 18px"}}><div style={{fontSize:11,color:"#6B6860",marginBottom:5,fontWeight:600}}>Dolu Masa</div><div style={{fontSize:22,fontWeight:800,color:"#2D6A4F"}}>{openT.length}<span style={{fontSize:14,fontWeight:400,color:"#6B6860"}}> / {tables.length}</span></div><div style={{fontSize:11,color:"#6B6860",marginTop:3}}>{fm(openT.reduce((s,t)=>s+t.order.reduce((a,o)=>a+o.price*o.qty,0),0),cur)} acik</div></div>
<div style={{background:"#FDF0EF",border:"1px solid #E8BABA",borderRadius:14,padding:"16px 18px"}}><div style={{fontSize:11,color:"#B83232",marginBottom:5,fontWeight:600}}>Harcama</div><div style={{fontSize:22,fontWeight:800,color:"#B83232"}}>{fm(todE,cur)}</div><div style={{fontSize:11,color:"#6B6860",marginTop:3}}>Net: <span style={{color:todI-todE>=0?"#2D6A4F":"#B83232",fontWeight:600}}>{fm(todI-todE,cur)}</span></div></div>
{oCari.length>0&&<div style={{background:"#F3EFF9",border:"1px solid #C4AEE8",borderRadius:14,padding:"16px 18px"}}><div style={{fontSize:11,color:"#6B4CA0",marginBottom:5,fontWeight:600}}>Açık Cari</div><div style={{fontSize:22,fontWeight:800,color:"#6B4CA0"}}>{fm(oCari.reduce((s,c)=>s+c.total,0),cur)}</div><div style={{fontSize:11,color:"#6B6860",marginTop:3}}>{oCari.length} bekliyor</div></div>}
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
<div style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:14,padding:20}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:18}}>Son 7 Gün</div>
<div style={{display:"flex",gap:6,alignItems:"flex-end",height:90}}>
{l7.map((d,i)=>{const h=d.inc>0?Math.max((d.inc/mx)*90,6):2;const isT=d.date===tod();return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{fontSize:9,color:"#6B6860",textAlign:"center"}}>{d.inc>0?fm(d.inc,cur).replace(cur,"").trim():""}</div><div style={{width:"100%",height:h,background:isT?"#2D6A4F":"#74C69D",borderRadius:"4px 4px 0 0",opacity:d.inc>0?1:0.2}}/><div style={{fontSize:10,color:isT?"#2D6A4F":"#6B6860",fontWeight:isT?700:400}}>{d.lbl}</div></div>);})}
</div>
</div>
<div style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:14,padding:20}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontWeight:700,fontSize:14}}>Son Adisyonlar</div><span style={{fontSize:11,color:"#6B6860"}}>{rec.length} işlem</span></div>
{rec.length===0?<div style={{color:"#A8A49C",fontSize:13,textAlign:"center",padding:"20px 0"}}>Bugün adisyon yok</div>
:<div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:200,overflowY:"auto"}}>
{rec.map(o=><div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",background:"#EFEDE8",borderRadius:9}}>
<div><div style={{fontSize:12,fontWeight:600}}>{o.tn}{o.g&&<span style={{color:"#40916C",marginLeft:6,fontSize:11}}>{o.g}</span>}</div><div style={{fontSize:10,color:"#6B6860",marginTop:1}}>{ft(o.ca)}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:"#2D6A4F"}}>{fm(o.total,cur)}</div><div style={{fontSize:10,color:o.pt==="cash"?"#5C4A1E":o.pt==="card"?"#2D4A6A":"#6B4CA0"}}>{o.pt==="cash"?"Nakit":o.pt==="card"?"Kart":"Cari"}</div></div>
</div>)}
</div>}
</div>
</div>
{openT.length>0&&<div style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:14,padding:20,marginTop:20}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontWeight:700,fontSize:14}}>Açık Masalar</div><button onClick={()=>setV("tables")} style={{fontSize:12,color:"#2D6A4F",background:"none",border:"none",cursor:"pointer",fontWeight:600}}>Tümü</button></div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:8}}>
{openT.map(t=>{const tot=t.order.reduce((s,o)=>s+o.price*o.qty,0);const dur=t.oa?Math.floor((Date.now()-new Date(t.oa))/60000):0;return(<div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#EBF5EF",border:"1px solid #74C69D",borderRadius:10}}><div><span style={{fontWeight:600,fontSize:13}}>{t.lbl}</span>{t.g&&<div style={{fontSize:10,color:"#40916C",marginTop:1}}>{t.g}</div>}<div style={{fontSize:10,color:"#6B6860",marginTop:1}}>{dur}dk - {t.order.length} kalem</div></div><div style={{fontWeight:700,color:"#2D6A4F",fontSize:15}}>{fm(tot,cur)}</div></div>);})}
</div>
</div>}
</div>
);}

function GuestM({req,onOk,onSkip,T}){
const[n,setN]=useState("");
return(<div style={{background:T.bg2,border:"1px solid "+T.border2,borderRadius:16,padding:28,width:320}}>
<div style={{fontWeight:800,fontSize:17,marginBottom:16}}>Müşteri Adı</div>
<input autoFocus placeholder="Müşteri adi..." value={n} onChange={e=>setN(e.target.value)} onKeyDown={e=>e.key==="Enter"&&n.trim()&&onOk(n.trim())} style={{background:T.bg3,border:"1px solid "+T.border2,borderRadius:8,padding:"9px 12px",color:T.text,fontSize:14,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:16}}/>
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
return(<div style={{background:T.bg2,border:"1px solid "+T.border2,borderRadius:16,padding:28,width:340}}>
<div style={{fontWeight:800,fontSize:17,marginBottom:16}}>İndirim</div>
<div style={{display:"flex",gap:8,marginBottom:14}}>
{[{k:"percent",l:"Yüzde (%)"},{k:"fixed",l:"Tutar"}].map(({k,l})=><button key={k} onClick={()=>{setType(k);setVal("");}} style={{flex:1,padding:"8px",borderRadius:8,border:"2px solid "+(type===k?T.accent:T.border),background:type===k?T.accentD:T.bg3,color:type===k?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>)}
</div>
{type==="percent"&&<div style={{display:"flex",gap:6,marginBottom:10}}>{[5,10,15,20].map(d=><button key={d} onClick={()=>setVal(String(d))} style={{flex:1,padding:"6px 0",borderRadius:6,border:"1px solid "+(val===String(d)?T.accent:T.border),background:val===String(d)?T.accent:T.bg3,color:val===String(d)?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{d}%</button>)}</div>}
<input type="number" autoFocus placeholder={type==="percent"?"0-100":"Tutar"} value={val} onChange={e=>setVal(e.target.value)} style={{background:T.bg3,border:"1px solid "+T.border2,borderRadius:8,padding:"9px 12px",color:T.text,fontSize:14,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:14}}/>
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
if(mode==="all"){if(!sp)return null;return[{items:[...table.order],sub,da,total:fin,pt:sp,cariName:cn}];}
if(mode==="byitem"){const g={};for(const item of table.order){const pt=ip[item.id];if(!pt)return null;if(!g[pt])g[pt]={pt,items:[],sub:0};g[pt].items.push(item);g[pt].sub+=item.price*item.qty;}return Object.values(g).map(x=>({...x,da:sub>0?da*(x.sub/sub):0,total:x.sub-(sub>0?da*(x.sub/sub):0),cariName:x.pt==="credit"?cn:undefined}));}
if(mode==="byamount"){const fl=lines.filter(l=>parseFloat(l.amount)>0&&l.pt);if(!fl.length)return null;const t=fl.reduce((s,l)=>s+parseFloat(l.amount),0);if(Math.abs(t-fin)>0.5)return null;return fl.map(l=>({items:[...table.order],sub:parseFloat(l.amount),da:0,total:parseFloat(l.amount),pt:l.pt,cariName:l.pt==="credit"?cn:undefined}));}
return null;};
const splits=getSplits();
const atot=lines.reduce((s,l)=>s+(parseFloat(l.amount)||0),0);
const rem=fin-atot;
return(<div style={{background:T.bg2,border:"1px solid "+T.border2,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}}>
<div style={{padding:"18px 20px",borderBottom:"1px solid "+T.border,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontWeight:800,fontSize:17}}>Ödeme Al</div><div style={{fontSize:12,color:T.textSub,marginTop:2}}>{table.lbl} - <span style={{color:T.accentL,fontWeight:700}}>{fm(fin,cur)}</span></div></div>
<button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:T.textSub}}>x</button>
</div>
<div style={{display:"flex",borderBottom:"1px solid "+T.border}}>
{[{k:"all",l:"Tümü"},{k:"byitem",l:"Ürün Bazlı"},{k:"byamount",l:"Tutar Bazlı"}].map(({k,l})=><button key={k} onClick={()=>setMode(k)} style={{flex:1,padding:"11px 0",border:"none",borderBottom:"2px solid "+(mode===k?T.accent:"transparent"),background:"transparent",color:mode===k?T.accentL:T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>)}
</div>
<div style={{padding:20}}>
{mode==="all"&&<>
<div style={{display:"flex",gap:8,marginBottom:16}}>{PO.map(({k,l,c,bg,bd})=><button key={k} onClick={()=>setSp(k)} style={{flex:1,padding:"11px 0",borderRadius:10,border:"2px solid "+(sp===k?bd:T.border),background:sp===k?bg:T.bg3,color:sp===k?c:T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>)}</div>
{sp==="credit"&&<div style={{marginBottom:12}}>
<label style={{display:"block",fontSize:11,color:"#6B4CA0",fontWeight:600,marginBottom:5}}>Müşteri Adı (zorunlu)</label>
<input autoFocus placeholder="Müşteri adı girin..." value={cariName} onChange={e=>setCariName(e.target.value)} style={{background:"#F3EFF9",border:"2px solid "+(cariName.trim()?"#C4AEE8":"#B83232"),borderRadius:8,padding:"9px 12px",color:T.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:6}}/>
{!cariName.trim()&&<div style={{fontSize:11,color:T.danger,marginBottom:6}}>Cari kayıt için musteri adi zorunludur</div>}
{openCari.length>0&&<div>
<div style={{fontSize:10,color:"#6B4CA0",fontWeight:600,marginBottom:5,textTransform:"uppercase",letterSpacing:0.5}}>Mevcut Açık Cariler</div>
<div style={{display:"flex",flexDirection:"column",gap:5}}>
{openCari.map(oc=><button key={oc.id} onClick={()=>setCariName(oc.g)} style={{background:cariName===oc.g?"#E8E0F5":T.bg3,border:"1px solid "+(cariName===oc.g?"#C4AEE8":T.border),borderRadius:8,padding:"8px 12px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontSize:12,fontWeight:700,color:"#6B4CA0"}}>{oc.g}</div><div style={{fontSize:10,color:T.textSub,marginTop:1}}>{(oc.adisyonlar||[oc]).length} adisyon</div></div>
<div style={{fontWeight:800,color:"#6B4CA0",fontSize:13}}>{fm(oc.total,cur)}</div>
</button>)}
</div>
</div>}
</div>}
{sp&&<div style={{background:T.bg3,borderRadius:10,padding:12,fontSize:13,color:T.textSub}}>
{table.order.map(item=><div key={item.id} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span>{item.name} x{item.qty}</span><span style={{color:T.accentL}}>{fm(item.price*item.qty,cur)}</span></div>)}
{da>0&&<div style={{display:"flex",justifyContent:"space-between",color:T.danger,borderTop:"1px solid "+T.border,paddingTop:4,marginTop:4}}><span>İndirim</span><span>-{fm(da,cur)}</span></div>}
<div style={{display:"flex",justifyContent:"space-between",fontWeight:800,color:T.accentL,borderTop:"1px solid "+T.border,paddingTop:4,marginTop:4,fontSize:15}}><span>Toplam</span><span>{fm(fin,cur)}</span></div>
</div>}
</>}
{mode==="byitem"&&<>
{table.order.map(item=>{const as=ip[item.id];return(<div key={item.id} style={{background:T.bg3,borderRadius:10,padding:"10px 12px",marginBottom:8}}>
<div style={{fontWeight:600,fontSize:12,marginBottom:6}}>{item.name} x{item.qty} <span style={{color:T.accentL,float:"right"}}>{fm(item.price*item.qty,cur)}</span></div>
<div style={{display:"flex",gap:5}}>{PO.map(({k,l,c,bg,bd})=><button key={k} onClick={()=>setIp(p=>({...p,[item.id]:k}))} style={{flex:1,padding:"5px 0",borderRadius:7,border:"2px solid "+(as===k?bd:T.border),background:as===k?bg:"#fff",color:as===k?c:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}}>{l}</button>)}</div>
</div>);})}
{hasCreditItem&&<div style={{marginTop:8}}>
<label style={{display:"block",fontSize:11,color:"#6B4CA0",fontWeight:600,marginBottom:5}}>Müşteri Adı (zorunlu)</label>
<input placeholder="Müşteri adı girin..." value={cariName} onChange={e=>setCariName(e.target.value)} style={{background:"#F3EFF9",border:"2px solid "+(cariName.trim()?"#C4AEE8":"#B83232"),borderRadius:8,padding:"9px 12px",color:T.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:6}}/>
{!cariName.trim()&&<div style={{fontSize:11,color:T.danger,marginBottom:6}}>Cari kayıt için musteri adi zorunludur</div>}
{openCari.length>0&&<div style={{display:"flex",flexDirection:"column",gap:5}}>
{openCari.map(oc=><button key={oc.id} onClick={()=>setCariName(oc.g)} style={{background:cariName===oc.g?"#E8E0F5":T.bg3,border:"1px solid "+(cariName===oc.g?"#C4AEE8":T.border),borderRadius:8,padding:"7px 12px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,fontWeight:700,color:"#6B4CA0"}}>{oc.g}</span><span style={{fontWeight:800,color:"#6B4CA0",fontSize:12}}>{fm(oc.total,cur)}</span></button>)}
</div>}
</div>}
</>}
{mode==="byamount"&&<>
<div style={{fontSize:12,color:T.textSub,marginBottom:12}}>Toplam <strong style={{color:T.accentL}}>{fm(fin,cur)}</strong> olmali.</div>
{lines.map(line=><div key={line.id} style={{display:"flex",gap:8,marginBottom:10,alignItems:"center"}}>
<input type="number" placeholder="Tutar" value={line.amount} onChange={e=>setLines(prev=>prev.map(l=>l.id===line.id?{...l,amount:e.target.value}:l))} style={{background:T.bg3,border:"1px solid "+T.border2,borderRadius:8,padding:"8px 10px",color:T.text,fontSize:13,outline:"none",flex:1}}/>
<div style={{display:"flex",gap:4}}>{PO.map(({k,l,c,bg,bd})=><button key={k} onClick={()=>setLines(prev=>prev.map(li=>li.id===line.id?{...li,pt:k}:li))} style={{padding:"7px 9px",borderRadius:7,border:"2px solid "+(line.pt===k?bd:T.border),background:line.pt===k?bg:"#fff",color:line.pt===k?c:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}}>{l}</button>)}</div>
{lines.length>1&&<button onClick={()=>setLines(prev=>prev.filter(l=>l.id!==line.id))} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",padding:4,fontSize:16}}>x</button>}
</div>)}
<button onClick={()=>setLines(prev=>[...prev,{id:Date.now(),amount:"",pt:"cash"}])} style={{width:"100%",background:T.bg3,border:"1px dashed "+T.border2,borderRadius:8,padding:"7px",color:T.textSub,fontSize:12,cursor:"pointer",marginBottom:10}}>+ Satır Ekle</button>
<div style={{background:T.bg3,borderRadius:8,padding:"9px 12px",display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:8}}><span style={{color:T.textSub}}>Kalan</span><span style={{fontWeight:800,color:Math.abs(rem)<0.5?T.success:T.danger}}>{fm(rem,cur)}</span></div>
{hasCreditAmt&&<div style={{marginTop:8}}>
<label style={{display:"block",fontSize:11,color:"#6B4CA0",fontWeight:600,marginBottom:5}}>Müşteri Adı (zorunlu)</label>
<input placeholder="Müşteri adı girin..." value={cariName} onChange={e=>setCariName(e.target.value)} style={{background:"#F3EFF9",border:"2px solid "+(cariName.trim()?"#C4AEE8":"#B83232"),borderRadius:8,padding:"9px 12px",color:T.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:6}}/>
{!cariName.trim()&&<div style={{fontSize:11,color:T.danger,marginBottom:6}}>Cari kayıt için musteri adi zorunludur</div>}
{openCari.length>0&&<div style={{display:"flex",flexDirection:"column",gap:5}}>
{openCari.map(oc=><button key={oc.id} onClick={()=>setCariName(oc.g)} style={{background:cariName===oc.g?"#E8E0F5":T.bg3,border:"1px solid "+(cariName===oc.g?"#C4AEE8":T.border),borderRadius:8,padding:"7px 12px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,fontWeight:700,color:"#6B4CA0"}}>{oc.g}</span><span style={{fontWeight:800,color:"#6B4CA0",fontSize:12}}>{fm(oc.total,cur)}</span></button>)}
</div>}
</div>}
</>}
<button onClick={()=>splits&&onDone(splits)} disabled={!splits} style={{width:"100%",marginTop:18,padding:"14px",background:splits?T.accent:T.bg3,color:splits?"#fff":T.textDim,border:"none",borderRadius:10,fontWeight:800,fontSize:15,cursor:splits?"pointer":"not-allowed"}}>{splits?"Hesabı Kapat - "+fm(fin,cur):"Ödeme yöntemi seçin"}</button>
</div>
</div>);}

function ReportsV({orders,exp,logs,cur,fm,fd,fdl,ft,tod,mainT,setMainT,expMon,setExpMon,expDay,setExpDay,ecats,expF,setExpF,showEF,setShowEF,addExp,setExp,inp,sb,setSelLog,setV,installments,setInstallments}){
const CC=["#2D6A4F","#40916C","#5C4A1E","#2D4A6A","#6B4CA0","#B83232","#8B6914","#1B4332"];
const[dateFrom,setDateFrom]=useState("");
const[dateTo,setDateTo]=useState("");
const[showDatePicker,setShowDatePicker]=useState(false);

const inRange=(date)=>{
  if(!dateFrom&&!dateTo)return true;
  if(dateFrom&&date<dateFrom)return false;
  if(dateTo&&date>dateTo)return false;
  return true;
};
const filteredLogs=logs.filter(l=>inRange(l.date));
const rangeLabel=dateFrom||dateTo?`${dateFrom||"..."} → ${dateTo||"..."}`:null;
const clearRange=()=>{setDateFrom("");setDateTo("");setShowDatePicker(false);};

const MM={};exp.filter(e=>inRange(e.date)).forEach(e=>{const m=e.date.slice(0,7);if(!MM[m])MM[m]={total:0,days:{},cats:{}};MM[m].total+=e.amount;if(!MM[m].days[e.date])MM[m].days[e.date]=0;MM[m].days[e.date]+=e.amount;if(!MM[m].cats[e.cat])MM[m].cats[e.cat]=0;MM[m].cats[e.cat]+=e.amount;});
const months=Object.keys(MM).sort((a,b)=>b.localeCompare(a));
const fmtM=m=>{const[y,mo]=m.split("-");const ns=["","Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];return ns[+mo]+" "+y;};
const sMD=expMon?MM[expMon]:null;
const lE=exp.filter(e=>inRange(e.date)&&(expDay?e.date===expDay:expMon?e.date.slice(0,7)===expMon:false)).sort((a,b)=>b.date.localeCompare(a.date));
const ct={};lE.forEach(e=>{if(!ct[e.cat])ct[e.cat]=0;ct[e.cat]+=e.amount;});
const stot=lE.reduce((s,e)=>s+e.amount,0);
const ce=Object.entries(ct).sort((a,b)=>b[1]-a[1]);

const[showAddInst,setShowAddInst]=useState(false);
const[newInst,setNewInst]=useState({name:"",totalAmount:"",count:"1",startDate:tod()});
const[expandedInstId,setExpandedInstId]=useState(null);

const addInstallment=()=>{
if(!newInst.name||!newInst.totalAmount||!newInst.count)return;
const count=parseInt(newInst.count)||1;
const totalAmount=parseFloat(newInst.totalAmount)||0;
const perInstallment=Math.round((totalAmount/count)*100)/100;
const startD=new Date(newInst.startDate);
const installmentsList=[];
for(let i=0;i<count;i++){
const dueDate=new Date(startD);
dueDate.setMonth(dueDate.getMonth()+i);
installmentsList.push({id:Date.now()+i+Math.random(),due:dueDate.toISOString().split("T")[0],amount:perInstallment,paid:false});
}
setInstallments(prev=>[...prev,{id:Date.now(),name:newInst.name,totalAmount,count,installments:installmentsList,createdAt:new Date().toISOString()}]);
setNewInst({name:"",totalAmount:"",count:"1",startDate:tod()});
setShowAddInst(false);
};

const togglePaid=(planId,instId)=>{
setInstallments(prev=>prev.map(p=>p.id!==planId?p:{...p,installments:p.installments.map(i=>i.id===instId?{...i,paid:!i.paid}:i)}));
};

const deletePlan=(planId)=>{
if(window.confirm("Bu vade planını tamamen silmek istediğine emin misin?")){
setInstallments(prev=>prev.filter(p=>p.id!==planId));
}
};

const daysUntil=(dateStr)=>{
const today=new Date(tod());
const target=new Date(dateStr);
const diffMs=target-today;
return Math.round(diffMs/(1000*60*60*24));
};

const allInstallmentRows=[];
installments.forEach(plan=>{
plan.installments.forEach(inst=>{
allInstallmentRows.push({...inst,planId:plan.id,planName:plan.name,planCount:plan.count});
});
});
allInstallmentRows.sort((a,b)=>a.due.localeCompare(b.due));
const unpaidRows=allInstallmentRows.filter(r=>!r.paid);
const overdueCount=unpaidRows.filter(r=>daysUntil(r.due)<0).length;
const upcomingCount=unpaidRows.filter(r=>{const d=daysUntil(r.due);return d>=0&&d<=7;}).length;
const totalUnpaid=unpaidRows.reduce((s,r)=>s+r.amount,0);
return(<div style={{padding:24,maxWidth:780,margin:"0 auto"}}>

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
<h2 style={{margin:0,fontWeight:700,fontSize:20}}>Raporlar</h2>
<div style={{display:"flex",gap:8,alignItems:"center"}}>
<button onClick={()=>setV("import-old")} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#1a1a2e",border:"1px solid #2a2a4e",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,color:"#fff"}}>
  📁 Reports Before NICCHIA
</button>
<button onClick={()=>setV("product-analysis")} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:T.accent,border:"none",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,color:"#fff"}}>
  📊 Ürün Analizi
</button>
</div>
</div>

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:10}}>
<div style={{display:"flex",gap:0,background:"#EFEDE8",borderRadius:10,padding:3,width:"fit-content"}}>
{[{k:"sales",l:"Satış"},{k:"expenses",l:"Harcama"},{k:"installments",l:"Vadeler"}].map(({k,l})=><button key={k} onClick={()=>setMainT(k)} style={{padding:"8px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:mainT===k?"#fff":"#EFEDE8",color:mainT===k?"#2D6A4F":"#6B6860"}}>{l}</button>)}
</div>
<div style={{position:"relative"}}>
  <button onClick={()=>setShowDatePicker(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:rangeLabel?"#EBF5EF":T.bg3,border:"1px solid "+(rangeLabel?"#74C69D":T.border2),borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,color:rangeLabel?"#2D6A4F":T.textSub}}>
    📅 {rangeLabel||"Tarih Aralığı"}
    {rangeLabel&&<span onClick={e=>{e.stopPropagation();clearRange();}} style={{marginLeft:4,color:"#2D6A4F",fontWeight:800,fontSize:14,lineHeight:1}}>×</span>}
  </button>
  {showDatePicker&&(
    <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:16,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:100,minWidth:260}}>
      <div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>Başlangıç</div>
      <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={{...inp,marginBottom:12}}/>
      <div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>Bitiş</div>
      <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} style={{...inp,marginBottom:14}}/>
      <div style={{display:"flex",gap:8}}>
        <button onClick={clearRange} style={{...sb(T.bg3),flex:1,color:T.textSub,padding:"8px 0",fontSize:12}}>Temizle</button>
        <button onClick={()=>setShowDatePicker(false)} style={{...sb(T.accent),flex:1,padding:"8px 0",fontSize:12}}>Uygula</button>
      </div>
    </div>
  )}
</div>
</div>
{mainT==="sales"&&(filteredLogs.length===0?<div style={{textAlign:"center",padding:"60px 0",color:"#A8A49C"}}>{rangeLabel?"Bu tarih aralığında kayıt yok.":"Kapatılmış gün yok."}</div>
:<div style={{display:"flex",flexDirection:"column",gap:12}}>
{filteredLogs.map(log=><button key={log.id} onClick={()=>setSelLog(log)} style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:14,padding:"18px 20px",cursor:"pointer",textAlign:"left",color:"#1C1C1A",width:"100%"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
<div><div style={{fontWeight:800,fontSize:16,marginBottom:3}}>{fdl(log.date)}</div><div style={{fontSize:12,color:"#6B6860"}}>{ft(log.oa)} - {ft(log.ca)} - {log.count} adisyon</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:22,fontWeight:800,color:"#40916C"}}>{fm(log.inc,cur)}</div><div style={{fontSize:11,color:log.net>=0?"#2D6A4F":"#B83232"}}>Net: {fm(log.net,cur)}</div></div>
</div>
<div style={{display:"flex",gap:8}}>
<div style={{flex:1,background:"#F5F0E4",border:"1px solid #D4C080",borderRadius:8,padding:"7px 10px"}}><div style={{fontSize:10,color:"#7A6428",marginBottom:2}}>Nakit</div><div style={{fontWeight:700,color:"#5C4A1E",fontSize:13}}>{fm(log.cash||0,cur)}</div></div>
<div style={{flex:1,background:"#EEF2F7",border:"1px solid #9BBAD8",borderRadius:8,padding:"7px 10px"}}><div style={{fontSize:10,color:"#1A3A5A",marginBottom:2}}>Kart</div><div style={{fontWeight:700,color:"#2D4A6A",fontSize:13}}>{fm(log.card||0,cur)}</div></div>
<div style={{flex:1,background:"#FDF0EF",border:"1px solid #E8BABA",borderRadius:8,padding:"7px 10px"}}><div style={{fontSize:10,color:"#B83232",marginBottom:2}}>Gider</div><div style={{fontWeight:700,color:"#B83232",fontSize:13}}>{fm(log.exp||0,cur)}</div></div>
</div>
<div style={{marginTop:8,fontSize:12,color:"#6B6860",textAlign:"right"}}>Detay &rarr;</div>
</button>)}
</div>)}
{mainT==="expenses"&&<div>
<div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
<button onClick={()=>setShowEF(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:showEF?"#EFEDE8":"#2D6A4F",border:"1px solid "+(showEF?"#CCC9C0":"transparent"),borderRadius:9,color:showEF?"#555":"#fff",fontWeight:600,fontSize:12,cursor:"pointer"}}>{showEF?"İptal":"+ Harcama Ekle"}</button>
</div>
{showEF&&<div style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:12,padding:18,marginBottom:18}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
<input placeholder="Açıklama" value={expF.desc} onChange={e=>setExpF(p=>({...p,desc:e.target.value}))} style={inp} autoFocus/>
<input type="number" placeholder="Tutar" value={expF.amount} onChange={e=>setExpF(p=>({...p,amount:e.target.value}))} style={inp}/>
<select value={expF.cat} onChange={e=>setExpF(p=>({...p,cat:e.target.value}))} style={inp}>{ecats.map(c=><option key={c}>{c}</option>)}</select>
<input type="date" value={expF.date} onChange={e=>setExpF(p=>({...p,date:e.target.value}))} style={inp}/>
</div>
<button onClick={()=>{addExp();setShowEF(false);}} style={{...sb("#B83232")}}>Ekle</button>
</div>}
{(expMon||expDay)&&<div style={{display:"flex",gap:6,marginBottom:16}}>
{expMon&&<button onClick={()=>{setExpMon(null);setExpDay(null);}} style={{fontSize:11,background:"#EFEDE8",border:"1px solid #CCC9C0",borderRadius:6,padding:"3px 10px",color:"#6B6860",cursor:"pointer"}}>Tüm Aylar</button>}
{expDay&&<button onClick={()=>setExpDay(null)} style={{fontSize:11,background:"#EFEDE8",border:"1px solid #CCC9C0",borderRadius:6,padding:"3px 10px",color:"#6B6860",cursor:"pointer"}}>{fmtM(expMon)}</button>}
</div>}
{!expMon&&(exp.length===0?<div style={{textAlign:"center",padding:"60px 0",color:"#A8A49C"}}>Harcama yok.</div>
:<div>{months.map(m=>{const md=MM[m];return(<button key={m} onClick={()=>{setExpMon(m);setExpDay(null);}} style={{width:"100%",background:"#fff",border:"1px solid #E4E1DA",borderRadius:12,padding:"16px 18px",cursor:"pointer",textAlign:"left",color:"#1C1C1A",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontWeight:700,fontSize:15}}>{fmtM(m)}</div><div style={{fontSize:11,color:"#6B6860",marginTop:3}}>{Object.keys(md.days).length} gun - {exp.filter(e=>e.date.slice(0,7)===m).length} kayıt</div></div>
<div style={{display:"flex",alignItems:"center",gap:12}}><div style={{fontWeight:800,fontSize:18,color:"#B83232"}}>{fm(md.total,cur)}</div><span style={{color:"#6B6860"}}>&rsaquo;</span></div>
</button>);})}</div>)}
{expMon&&!expDay&&sMD&&<>
<div style={{background:"#FDF0EF",border:"1px solid #E8BABA",borderRadius:12,padding:"16px 18px",marginBottom:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontSize:11,color:"#6B6860",marginBottom:3}}>{fmtM(expMon)}</div><div style={{fontSize:24,fontWeight:800,color:"#B83232"}}>{fm(sMD.total,cur)}</div></div>
<div style={{fontSize:12,color:"#6B6860"}}>{Object.keys(sMD.days).length} gun</div>
</div>
<div style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:12,padding:18,marginBottom:18}}>
<div style={{fontSize:11,fontWeight:700,color:"#6B6860",marginBottom:14,textTransform:"uppercase",letterSpacing:0.5}}>Kategori</div>
{Object.entries(sMD.cats).sort((a,b)=>b[1]-a[1]).map(([cat,amt],ci)=>{const pct=sMD.total>0?Math.round(amt/sMD.total*100):0;return(<div key={cat} style={{marginBottom:14}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:10,height:10,borderRadius:"50%",background:CC[ci%CC.length]}}/><span style={{fontSize:13}}>{cat}</span></div><div style={{display:"flex",gap:10}}><span style={{fontSize:13,fontWeight:700,color:"#B83232"}}>{fm(amt,cur)}</span><span style={{fontSize:12,color:"#6B6860",minWidth:32,textAlign:"right"}}>%{pct}</span></div></div>
<div style={{height:7,background:"#EFEDE8",borderRadius:10,overflow:"hidden"}}><div style={{height:"100%",width:pct+"%",background:CC[ci%CC.length],borderRadius:10}}/></div>
</div>);})}
</div>
<div style={{fontSize:11,fontWeight:700,color:"#6B6860",textTransform:"uppercase",letterSpacing:0.5,marginBottom:10}}>Günlere Göre</div>
{Object.entries(sMD.days).sort((a,b)=>b[0].localeCompare(a[0])).map(([day2,amt])=><button key={day2} onClick={()=>setExpDay(day2)} style={{width:"100%",background:"#fff",border:"1px solid #E4E1DA",borderRadius:10,padding:"12px 16px",cursor:"pointer",textAlign:"left",color:"#1C1C1A",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontWeight:600,fontSize:13}}>{fd(day2)}</div><div style={{fontSize:11,color:"#6B6860",marginTop:2}}>{exp.filter(e=>e.date===day2).length} kayıt</div></div>
<div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontWeight:700,color:"#B83232"}}>{fm(amt,cur)}</span><span style={{color:"#6B6860"}}>&rsaquo;</span></div>
</button>)}
</>}
{expDay&&<>
<div style={{background:"#FDF0EF",border:"1px solid #E8BABA",borderRadius:12,padding:"14px 18px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontSize:11,color:"#6B6860",marginBottom:3}}>{fd(expDay)}</div><div style={{fontSize:22,fontWeight:800,color:"#B83232"}}>{fm(stot,cur)}</div></div>
<div style={{fontSize:12,color:"#6B6860"}}>{lE.length} kayıt</div>
</div>
{ce.length>0&&<div style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:12,padding:16,marginBottom:14}}>
{ce.map(([cat,amt],ci)=>{const pct=stot>0?Math.round(amt/stot*100):0;return(<div key={cat} style={{marginBottom:10}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:8,height:8,borderRadius:"50%",background:CC[ci%CC.length]}}/><span style={{fontSize:12}}>{cat}</span></div><div style={{display:"flex",gap:8}}><span style={{fontSize:12,fontWeight:600,color:"#B83232"}}>{fm(amt,cur)}</span><span style={{fontSize:11,color:"#6B6860"}}>%{pct}</span></div></div>
<div style={{height:5,background:"#EFEDE8",borderRadius:10,overflow:"hidden"}}><div style={{height:"100%",width:pct+"%",background:CC[ci%CC.length],borderRadius:10}}/></div>
</div>);})}
</div>}
{lE.map(e=><div key={e.id} style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:10,padding:"10px 14px",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontWeight:600,fontSize:13}}>{e.desc}</div><span style={{fontSize:10,background:"#EFEDE8",padding:"1px 7px",borderRadius:10,color:"#6B6860"}}>{e.cat}</span></div>
<div style={{display:"flex",alignItems:"center",gap:10}}><div style={{fontWeight:700,color:"#B83232",fontSize:14}}>{fm(e.amount,cur)}</div><button onClick={()=>{if(window.confirm("Bu harcamayı silmek istediğine emin misin?")){setExp(prev=>prev.filter(x=>x.id!==e.id));}}} style={{background:"none",border:"none",color:"#A8A49C",cursor:"pointer",padding:4,fontSize:16}}>x</button></div>
</div>)}
</>}
</div>}

{mainT==="installments"&&<div>
<div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
<button onClick={()=>setShowAddInst(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:showAddInst?"#EFEDE8":"#2D6A4F",border:"1px solid "+(showAddInst?"#CCC9C0":"transparent"),borderRadius:9,color:showAddInst?"#555":"#fff",fontWeight:600,fontSize:12,cursor:"pointer"}}>{showAddInst?"İptal":"+ Vade Ekle"}</button>
</div>

{showAddInst&&<div style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:12,padding:18,marginBottom:18}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
<input placeholder="Ödeme adı (örn: Kira)" value={newInst.name} onChange={e=>setNewInst(p=>({...p,name:e.target.value}))} style={inp} autoFocus/>
<input type="number" placeholder="Toplam tutar" value={newInst.totalAmount} onChange={e=>setNewInst(p=>({...p,totalAmount:e.target.value}))} style={inp}/>
<input type="number" placeholder="Taksit sayısı" value={newInst.count} onChange={e=>setNewInst(p=>({...p,count:e.target.value}))} style={inp} min="1"/>
<input type="date" value={newInst.startDate} onChange={e=>setNewInst(p=>({...p,startDate:e.target.value}))} style={inp}/>
</div>
{newInst.totalAmount&&newInst.count&&<div style={{fontSize:12,color:"#6B6860",marginBottom:12}}>Her taksit: {fm(Math.round((parseFloat(newInst.totalAmount)/parseInt(newInst.count||1))*100)/100,cur)} — toplam {newInst.count} ay boyunca aynı günde</div>}
<button onClick={addInstallment} style={{...sb("#2D6A4F"),fontSize:13,padding:"9px 20px"}}>Ekle</button>
</div>}

{installments.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}}>
<div style={{background:"#FDF0EF",border:"1px solid #E8BABA",borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:10,color:"#B83232",marginBottom:3}}>Gecikmiş</div><div style={{fontSize:18,fontWeight:800,color:"#B83232"}}>{overdueCount}</div></div>
<div style={{background:"#FFF8E8",border:"1px solid #E8D8A0",borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:10,color:"#8B6914",marginBottom:3}}>7 Gün İçinde</div><div style={{fontSize:18,fontWeight:800,color:"#8B6914"}}>{upcomingCount}</div></div>
<div style={{background:"#EEF2F7",border:"1px solid #9BBAD8",borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:10,color:"#2D4A6A",marginBottom:3}}>Kalan Toplam</div><div style={{fontSize:18,fontWeight:800,color:"#2D4A6A"}}>{fm(totalUnpaid,cur)}</div></div>
</div>}

{installments.length===0?<div style={{textAlign:"center",padding:"60px 0",color:"#A8A49C"}}>Henüz vade kaydı yok.</div>
:<div style={{display:"flex",flexDirection:"column",gap:10}}>
{installments.map(plan=>{
const paidCount=plan.installments.filter(i=>i.paid).length;
const isExpanded=expandedInstId===plan.id;
const nextUnpaid=plan.installments.filter(i=>!i.paid).sort((a,b)=>a.due.localeCompare(b.due))[0];
return(
<div key={plan.id} style={{background:"#fff",border:"1px solid #E4E1DA",borderRadius:12,padding:"14px 16px"}}>
<div onClick={()=>setExpandedInstId(isExpanded?null:plan.id)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
<div>
<div style={{fontWeight:700,fontSize:14}}>{plan.name}</div>
<div style={{fontSize:11,color:"#6B6860",marginTop:2}}>{paidCount}/{plan.count} ödendi · {fm(plan.totalAmount,cur)}{nextUnpaid&&<span> · sıradaki: {fd(nextUnpaid.due)}</span>}</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
{paidCount===plan.count
?<span style={{fontSize:11,fontWeight:700,color:"#2D6A4F",background:"#EBF5EF",padding:"3px 10px",borderRadius:20}}>Tamamlandı</span>
:nextUnpaid&&daysUntil(nextUnpaid.due)<0
?<span style={{fontSize:11,fontWeight:700,color:"#B83232",background:"#FDF0EF",padding:"3px 10px",borderRadius:20}}>Gecikmiş</span>
:nextUnpaid&&daysUntil(nextUnpaid.due)<=7
?<span style={{fontSize:11,fontWeight:700,color:"#8B6914",background:"#FFF8E8",padding:"3px 10px",borderRadius:20}}>Yaklaşıyor</span>
:<span style={{fontSize:11,fontWeight:700,color:"#6B6860",background:"#EFEDE8",padding:"3px 10px",borderRadius:20}}>Devam Ediyor</span>
}
<span style={{color:"#A8A49C",fontSize:11}}>{isExpanded?"▲":"▼"}</span>
</div>
</div>
{isExpanded&&<div style={{marginTop:14,paddingTop:14,borderTop:"1px solid #E4E1DA"}}>
{plan.installments.map((inst,ii)=>{
const dd=daysUntil(inst.due);
const isOverdue=!inst.paid&&dd<0;
const isUpcoming=!inst.paid&&dd>=0&&dd<=7;
return(
<div key={inst.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",marginBottom:6,borderRadius:8,background:isOverdue?"#FDF0EF":isUpcoming?"#FFF8E8":"#F7F6F3"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<input type="checkbox" checked={inst.paid} onChange={()=>togglePaid(plan.id,inst.id)} style={{width:16,height:16,cursor:"pointer"}}/>
<div>
<div style={{fontSize:12,fontWeight:600,textDecoration:inst.paid?"line-through":"none",color:inst.paid?"#A8A49C":"#1C1C1A"}}>{ii+1}. Taksit — {fd(inst.due)}</div>
{!inst.paid&&<div style={{fontSize:10,color:isOverdue?"#B83232":isUpcoming?"#8B6914":"#A8A49C",marginTop:1}}>{isOverdue?`${Math.abs(dd)} gün gecikti`:dd===0?"Bugün":dd===1?"Yarın":`${dd} gün kaldı`}</div>}
</div>
</div>
<div style={{fontWeight:700,fontSize:13,color:inst.paid?"#2D6A4F":"#1C1C1A"}}>{fm(inst.amount,cur)}</div>
</div>
);
})}
<button onClick={()=>deletePlan(plan.id)} style={{marginTop:8,background:"none",border:"none",color:"#B83232",cursor:"pointer",fontSize:11,fontWeight:600,padding:0}}>Bu vade planını sil</button>
</div>}
</div>
);
})}
</div>}
</div>}
</div>);}

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
?<button onClick={()=>{setItems(log.items||[]);setExps(log.exps||[]);setEditMode(true);}} style={{...sb(T.bg3),color:T.accentL,border:"1px solid "+T.border2,fontSize:12,padding:"8px 16px"}}>✎ Düzenle</button>
:<div style={{display:"flex",gap:8}}>
<button onClick={()=>{setItems(log.items||[]);setExps(log.exps||[]);setEditMode(false);}} style={{...sb(T.bg3),color:T.textSub,fontSize:12,padding:"8px 14px"}}>İptal</button>
<button onClick={saveChanges} style={{...sb(T.accent),fontSize:12,padding:"8px 16px"}}>Kaydet</button>
</div>}
</div>

{editMode&&<div style={{background:"#FFF8E8",border:"1px solid #E8D8A0",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#8B6914"}}>
Düzenleme modundasın. Değişiklikler "Kaydet"e basana kadar uygulanmaz.
</div>}

<div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:20}}>
<div style={{background:"#EBF5EF",border:"1px solid #74C69D",borderRadius:12,padding:"16px 18px",gridColumn:"1/-1"}}><div style={{fontSize:11,color:T.textSub,marginBottom:4}}>Toplam Satış</div><div style={{fontSize:32,fontWeight:800,color:T.accentL}}>{fm(editMode?liveTotals.inc:log.inc,cur)}</div><div style={{fontSize:12,color:T.textSub,marginTop:4}}>{log.count} adisyon</div></div>
<div style={{background:"#F5F0E4",border:"1px solid #D4C080",borderRadius:12,padding:"16px 18px"}}><div style={{fontSize:11,color:"#7A6428",marginBottom:4}}>Nakit</div><div style={{fontSize:24,fontWeight:800,color:"#5C4A1E"}}>{fm(log.cash||0,cur)}</div></div>
<div style={{background:"#EEF2F7",border:"1px solid #9BBAD8",borderRadius:12,padding:"16px 18px"}}><div style={{fontSize:11,color:"#1A3A5A",marginBottom:4}}>Kart</div><div style={{fontSize:24,fontWeight:800,color:"#2D4A6A"}}>{fm(log.card||0,cur)}</div></div>
<div style={{background:"#FDF0EF",border:"1px solid #E8BABA",borderRadius:12,padding:"16px 18px"}}><div style={{fontSize:11,color:T.textSub,marginBottom:4}}>Gider</div><div style={{fontSize:24,fontWeight:800,color:T.danger}}>{fm(editMode?liveTotals.exp:log.exp,cur)}</div></div>
<div style={{background:(editMode?liveTotals.net:log.net)>=0?"#EBF5EF":"#FDF0EF",border:"1px solid "+((editMode?liveTotals.net:log.net)>=0?"#74C69D":"#E8BABA"),borderRadius:12,padding:"16px 18px"}}><div style={{fontSize:11,color:T.textSub,marginBottom:4}}>Net Kâr</div><div style={{fontSize:24,fontWeight:800,color:(editMode?liveTotals.net:log.net)>=0?T.success:T.danger}}>{fm(editMode?liveTotals.net:log.net,cur)}</div></div>
</div>

<div style={{display:"flex",gap:8,marginBottom:16}}>
{[{k:"orders",l:"Adisyonlar"},{k:"items",l:"Satılan Ürünler"},{k:"guests",l:"Müşteri Raporu"}].map(({k,l})=><button key={k} onClick={()=>setRepT(k)} style={{padding:"8px 18px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:repT===k?T.accent:T.bg3,color:repT===k?"#fff":T.textSub}}>{l}</button>)}
</div>

{repT==="orders"&&(dayOrders.length===0?<div style={{color:T.textDim,textAlign:"center",padding:"30px 0"}}>Bu güne ait adisyon kaydı yok.</div>
:<div style={{display:"flex",flexDirection:"column",gap:10}}>
{dayOrders.map(o=>{
const isEditing=editOrderId===o.id;
return(
<div key={o.id} style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:"14px 16px"}}>
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
<span style={{fontSize:12,fontWeight:600,padding:"3px 10px",borderRadius:20,background:o.pt==="cash"?"#F5F0E4":o.pt==="card"?"#EEF2F7":"#F3EFF9",color:o.pt==="cash"?"#5C4A1E":o.pt==="card"?"#2D4A6A":"#6B4CA0"}}>{o.pt==="cash"?"Nakit":o.pt==="card"?"Kart":"Cari"}</span>
<span style={{fontWeight:800,fontSize:16,color:T.accentL}}>{fm(o.total,cur)}</span>
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
:<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:20,marginBottom:16}}>
{Object.entries(cg).map(([cat,catItems])=><div key={cat} style={{marginBottom:16}}>
<div style={{fontSize:11,fontWeight:700,color:T.accent,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{cat}</div>
{catItems.map(item=><div key={item.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid "+T.border,gap:8}}>
<div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
{editMode
?<div style={{display:"flex",alignItems:"center",gap:4}}>
<button onClick={()=>updateItemQty(item.name,-1)} style={{width:22,height:22,borderRadius:6,border:"1px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:13,lineHeight:1}}>-</button>
<span style={{minWidth:22,textAlign:"center",fontWeight:800,fontSize:12}}>{item.qty}</span>
<button onClick={()=>updateItemQty(item.name,1)} style={{width:22,height:22,borderRadius:6,border:"1px solid "+T.border2,background:T.bg3,cursor:"pointer",fontSize:13,lineHeight:1}}>+</button>
</div>
:<span style={{background:T.accent,color:"#fff",fontSize:11,fontWeight:800,padding:"2px 7px",borderRadius:20,minWidth:26,textAlign:"center"}}>{item.qty}</span>
}
<span style={{fontSize:13,fontWeight:600}}>{item.name}</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
{editMode
?<input type="number" value={item.price} onChange={e=>updateItemPrice(item.name,e.target.value)} style={{width:70,background:T.bg3,border:"1px solid "+T.border2,borderRadius:6,padding:"4px 6px",fontSize:12,textAlign:"right"}}/>
:<div style={{textAlign:"right"}}><div style={{fontWeight:700,color:T.accentL,fontSize:13}}>{fm(item.total,cur)}</div><div style={{fontSize:10,color:T.textSub}}>{fm(item.price,cur)} x {item.qty}</div></div>
}
{editMode&&<button onClick={()=>deleteItem(item.name)} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",fontSize:15,padding:2}}>×</button>}
</div>
</div>)}
<div style={{display:"flex",justifyContent:"flex-end",paddingTop:5,fontSize:12,color:T.textSub}}>Toplam: <span style={{fontWeight:700,color:T.accentL,marginLeft:4}}>{fm(catItems.reduce((s,i)=>s+i.total,0),cur)}</span></div>
</div>)}
<div style={{display:"flex",justifyContent:"space-between",paddingTop:10,borderTop:"2px solid "+T.border2,fontWeight:800,fontSize:15}}><span>Genel</span><span style={{color:T.accentL}}>{fm(editMode?liveTotals.inc:log.inc,cur)}</span></div>
</div>)}

{repT==="guests"&&<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:20}}>
{(!log.guests||log.guests.length===0)?<div style={{color:T.textDim,textAlign:"center",padding:"30px 0"}}>Müşteri kaydi yok.</div>
:log.guests.map((g,gi)=><div key={gi} style={{marginBottom:16,paddingBottom:16,borderBottom:"1px solid "+T.border}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:32,height:32,borderRadius:"50%",background:T.accentD,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,color:"#fff"}}>{g.name==="--"?"?":g.name[0].toUpperCase()}</div><div><div style={{fontWeight:700,fontSize:14}}>{g.name}</div><div style={{fontSize:11,color:T.textSub}}>{g.count} adisyon</div></div></div>
<div style={{fontWeight:800,color:T.accentL,fontSize:16}}>{fm(g.total,cur)}</div>
</div>
{g.orders.map((o,oi)=><div key={oi} style={{background:T.bg3,borderRadius:8,padding:"8px 12px",marginBottom:6}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,fontWeight:600}}>{o.tbl}</span><span style={{fontSize:12,fontWeight:700,color:o.pt==="cash"?"#5C4A1E":"#2D4A6A"}}>{fm(o.total,cur)} {o.pt==="cash"?"Nakit":"Kart"}</span></div>
<div style={{display:"flex",flexWrap:"wrap",gap:4}}>{o.items.map((it,ii)=><span key={ii} style={{background:T.bg2,padding:"2px 7px",borderRadius:20,fontSize:11,color:T.textSub}}>{it.name} x{it.qty}</span>)}</div>
</div>)}
</div>)}
</div>}

<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:20,marginTop:16}}>
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
:exps.map(e=><div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid "+T.border,gap:8}}>
<div><div style={{fontSize:13,fontWeight:600}}>{e.desc}</div><div style={{fontSize:11,color:T.textSub}}>{e.cat}</div></div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
{editMode
?<input type="number" value={e.amount} onChange={ev=>updateExpAmount(e.id,ev.target.value)} style={{width:80,background:T.bg3,border:"1px solid "+T.border2,borderRadius:6,padding:"4px 6px",fontSize:12,textAlign:"right"}}/>
:<div style={{fontWeight:700,color:T.danger}}>{fm(e.amount,cur)}</div>
}
{editMode&&<button onClick={()=>deleteExp(e.id)} style={{background:"none",border:"none",color:T.danger,cursor:"pointer",fontSize:15,padding:2}}>×</button>}
</div>
</div>)}
</div>
</div>);}

function CariV({cari,setCari,cur,fm,fd,ft,selC,setSelC,stT,setStT,delC,setDelC,msg,T,sb,PO}){
const open=cari.filter(c=>!c.settled);const closed=cari.filter(c=>c.settled);
const openT=open.reduce((s,c)=>s+c.total,0);
const settle=(id,pt,discAmt)=>{setCari(prev=>prev.map(c=>c.id===id?{...c,settled:true,sAt:new Date().toISOString(),sPt:pt,settleDisc:discAmt||0}:c));setSelC(null);setStT(null);msg("Tahsil edildi");};
const del=(id)=>{setCari(prev=>prev.filter(c=>c.id!==id));setDelC(null);msg("Silindi","err");};
return(<div style={{padding:24,maxWidth:780,margin:"0 auto"}}>
<h2 style={{margin:"0 0 6px",fontWeight:700,fontSize:20}}>Cari Hesaplar</h2>
<div style={{fontSize:12,color:T.textSub,marginBottom:22}}>Tahsil edilmemiş adisyonlar.</div>
{delC&&<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:T.bg2,border:"1px solid "+T.danger,borderRadius:16,padding:28,width:340}}><div style={{fontWeight:800,fontSize:17,color:T.danger,marginBottom:10}}>Cari Hesabı Sil</div><p style={{fontSize:13,color:T.textSub,margin:"0 0 20px"}}>Kalıcı olarak silinecek.</p><div style={{display:"flex",gap:10}}><button onClick={()=>setDelC(null)} style={{...sb(T.bg3),flex:1,color:T.text}}>İptal</button><button onClick={()=>del(delC)} style={{...sb(T.danger),flex:1}}>Evet, Sil</button></div></div></div>}
{selC&&(()=>{
const[discType,setDiscType]=useState("none");
const[discVal,setDiscVal]=useState("");
const rawTotal=selC.total;
const discAmt=discType==="percent"?rawTotal*(parseFloat(discVal)||0)/100:discType==="fixed"?Math.min(parseFloat(discVal)||0,rawTotal):0;
const afterDisc=rawTotal-discAmt;
return(<div style={{position:"fixed",inset:0,background:"rgba(28,28,26,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:T.bg2,border:"1px solid #C4AEE8",borderRadius:16,padding:28,width:400,maxHeight:"85vh",overflowY:"auto"}}>
<div style={{fontWeight:800,fontSize:17,marginBottom:4}}>Cari Tahsil Et</div>
<div style={{fontSize:13,color:"#6B4CA0",fontWeight:600,marginBottom:16}}>{selC.g}</div>
<div style={{background:T.bg3,borderRadius:10,padding:"10px 14px",marginBottom:14,maxHeight:180,overflowY:"auto"}}>
{(selC.adisyonlar||[{tbl:selC.tbl,items:selC.items,total:selC.total,ca:selC.cAt}]).map((a,ai)=>(
<div key={ai} style={{marginBottom:ai<(selC.adisyonlar||[selC]).length-1?10:0}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
<span style={{fontSize:11,color:"#6B4CA0",fontWeight:700}}>{a.tbl} - {ft(a.ca)}</span>
<span style={{fontSize:12,fontWeight:700,color:"#6B4CA0"}}>{fm(a.total,cur)}</span>
</div>
{a.items.map((it,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"1px 0",color:T.textSub}}><span>{it.name} x{it.qty}</span><span>{fm(it.price*it.qty,cur)}</span></div>)}
{ai<(selC.adisyonlar||[selC]).length-1&&<div style={{borderBottom:"1px solid "+T.border,marginTop:6}}/>}
</div>
))}
</div>
<div style={{marginBottom:14}}>
<div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>İndirim</div>
<div style={{display:"flex",gap:6,marginBottom:8}}>
{[{k:"none",l:"Yok"},{k:"percent",l:"Yüzde %"},{k:"fixed",l:"Tutar"}].map(({k,l})=><button key={k} onClick={()=>{setDiscType(k);setDiscVal("");}} style={{flex:1,padding:"6px 0",borderRadius:7,border:"1px solid "+(discType===k?T.accent:T.border),background:discType===k?T.accent:T.bg3,color:discType===k?"#fff":T.textSub,fontWeight:600,fontSize:11,cursor:"pointer"}}>{l}</button>)}
</div>
{discType!=="none"&&<>
<input type="number" autoFocus placeholder={discType==="percent"?"0-100":"Tutar"} value={discVal} onChange={e=>setDiscVal(e.target.value)} style={{background:T.bg3,border:"1px solid "+T.border2,borderRadius:8,padding:"8px 12px",color:T.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:6}}/>
{discAmt>0&&<div style={{fontSize:11,color:T.textSub}}>İndirim: -{fm(discAmt,cur)}</div>}
</>}
</div>
<div style={{background:"#F3EFF9",borderRadius:10,padding:"10px 14px",marginBottom:14}}>
{discAmt>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.textSub,marginBottom:4}}><span>Ara toplam</span><span>{fm(rawTotal,cur)}</span></div>}
{discAmt>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.danger,marginBottom:4}}><span>İndirim</span><span>-{fm(discAmt,cur)}</span></div>}
<div style={{display:"flex",justifyContent:"space-between",fontSize:18,fontWeight:800,color:"#6B4CA0"}}><span>Tahsil Edilecek</span><span>{fm(afterDisc,cur)}</span></div>
</div>
<div style={{display:"flex",gap:8,marginBottom:14}}>
{[{k:"cash",l:"Nakit",c:"#5C4A1E",bg:"#F5F0E4",bd:"#D4C080"},{k:"card",l:"Kart",c:"#2D4A6A",bg:"#EEF2F7",bd:"#9BBAD8"}].map(({k,l,c,bg,bd})=><button key={k} onClick={()=>setStT(k)} style={{flex:1,padding:"10px 0",borderRadius:8,border:"2px solid "+(stT===k?bd:T.border),background:stT===k?bg:T.bg3,color:stT===k?c:T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>)}
</div>
<div style={{display:"flex",gap:10}}><button onClick={()=>{setSelC(null);setStT(null);}} style={{...sb(T.bg3),flex:1,color:T.textSub}}>İptal</button><button onClick={()=>stT&&settle(selC.id,stT,discAmt)} style={{...sb(stT?T.success:T.bg3),flex:2,color:stT?"#fff":T.textDim}}>Tahsil Et{stT?" - "+fm(afterDisc,cur):""}</button></div>
</div></div>);
})()}
<div style={{background:"#F3EFF9",border:"1px solid #C4AEE8",borderRadius:12,padding:"14px 18px",marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:11,color:"#6B4CA0",marginBottom:4}}>Açık Cari</div><div style={{fontSize:26,fontWeight:800,color:"#6B4CA0"}}>{fm(openT,cur)}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:22,fontWeight:800,color:"#6B4CA0"}}>{open.length}</div><div style={{fontSize:11,color:T.textSub}}>hesap</div></div></div>
{open.length===0?<div style={{textAlign:"center",padding:"30px 0",color:T.textDim,background:T.bg2,borderRadius:12,marginBottom:20}}>Açık hesap yok.</div>
:<div style={{marginBottom:24}}>{open.map(c=>{
const adisyonlar=c.adisyonlar||[{id:c.id+"_0",tbl:c.tbl,items:c.items,sub:c.sub,da:c.da||0,total:c.total,oa:c.oa,ca:c.cAt,date:c.date}];
return(<div key={c.id} style={{background:T.bg2,border:"2px solid #C4AEE8",borderRadius:12,padding:"14px 16px",marginBottom:10}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
<div><div style={{fontWeight:800,fontSize:16}}>{c.g||"İsimsiz"}</div><div style={{fontSize:11,color:T.textSub,marginTop:3}}>{adisyonlar.length} adisyon</div></div>
<div style={{fontWeight:800,fontSize:20,color:"#6B4CA0"}}>{fm(c.total,cur)}</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
{adisyonlar.map((a,ai)=>(
<div key={a.id||ai} style={{background:"#F3EFF9",borderRadius:9,padding:"10px 12px"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
<div style={{fontSize:11,color:"#6B4CA0",fontWeight:700}}>{a.tbl}</div>
<div style={{fontSize:12,fontWeight:800,color:"#6B4CA0"}}>{fm(a.total,cur)}</div>
</div>
<div style={{fontSize:10,color:T.textSub,marginBottom:6}}>{fd(a.ca)} {ft(a.ca)}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:4}}>
{a.items.map((it,i)=><span key={i} style={{background:T.bg2,padding:"2px 8px",borderRadius:20,fontSize:11,color:T.textSub}}>{it.name} x{it.qty}</span>)}
</div>
{a.da>0&&<div style={{fontSize:11,color:T.danger,marginTop:4}}>İndirim: -{fm(a.da,cur)}</div>}
</div>
))}
</div>
<div style={{display:"flex",gap:8}}><button onClick={()=>{setSelC(c);setStT(null);}} style={{...sb("#E8E0F5"),flex:1,color:"#6B4CA0",fontSize:12}}>Tahsil Et</button><button onClick={()=>setDelC(c.id)} style={{background:T.bg3,border:"none",borderRadius:8,padding:"10px 14px",cursor:"pointer",color:T.danger,fontSize:16}}>x</button></div>
</div>);})}</div>}
{closed.length>0&&<div><div style={{fontSize:12,fontWeight:700,color:T.textSub,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Kapatılmış</div>
{closed.map(c=><div key={c.id} style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:10,padding:"12px 14px",marginBottom:8,opacity:0.7}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,fontSize:13}}>{c.g||"İsimsiz"}</div><div style={{fontSize:11,color:T.textSub}}>{c.tbl} - {fd(c.cAt)}</div><div style={{fontSize:11,color:T.success,marginTop:2}}>{fd(c.sAt)} - {c.sPt==="cash"?"Nakit":"Kart"}</div></div><div style={{textAlign:"right"}}><div style={{fontWeight:800,color:T.accentL}}>{fm(c.total,cur)}</div><button onClick={()=>setDelC(c.id)} style={{background:"none",border:"none",color:T.textDim,cursor:"pointer",padding:"4px 0",marginTop:4,fontSize:16}}>x</button></div></div></div>)}
</div>}
</div>);}

function SetV({cfg,cfgF,setCfgF,saveCfg,stab,setStab,menu,mF,setMF,mEid,setMEid,mCat,setMCat,saveMI,setMenü,ecats,setEc,newec,setNewec,exp,msg,setOrd,setExp,setLogs,cur,fm,inp,sb,T}){
return(<div style={{padding:24,maxWidth:860,margin:"0 auto"}}>
<h2 style={{margin:"0 0 20px",fontWeight:700,fontSize:20}}>Ayarlar</h2>
<div style={{display:"flex",gap:8,marginBottom:22}}>
{[{k:"general",l:"Genel"},{k:"menu",l:"Menü"},{k:"ecats",l:"Harcama Kategorileri"}].map(({k,l})=><button key={k} onClick={()=>setStab(k)} style={{padding:"9px 20px",borderRadius:9,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:stab===k?T.accent:T.bg3,color:stab===k?"#fff":T.textSub}}>{l}</button>)}
</div>
{stab==="general"&&<>
<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:22,marginBottom:16}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:16}}>İşletme Bilgileri</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>İşletme Adı</label><input value={cfgF.name} onChange={e=>setCfgF(p=>({...p,name:e.target.value}))} style={inp}/></div>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>Para Birimi</label><input value={cfgF.cur} onChange={e=>setCfgF(p=>({...p,cur:e.target.value}))} style={{...inp,maxWidth:80}}/></div>
<div><label style={{display:"block",fontSize:11,color:T.textSub,marginBottom:5}}>Masa Sayısı</label><input type="number" min="1" max="50" value={cfgF.tableCount} onChange={e=>setCfgF(p=>({...p,tableCount:e.target.value}))} style={{...inp,maxWidth:100}}/></div>
</div>
</div>
<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:22,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:14}}>Adisyon Ayarları</div>
<label style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
<div onClick={()=>setCfgF(p=>({...p,requireName:!p.requireName}))} style={{width:44,height:24,borderRadius:12,background:cfgF.requireName?T.accent:T.bg3,border:"1px solid "+T.border2,position:"relative",cursor:"pointer"}}><div style={{position:"absolute",top:3,left:cfgF.requireName?22:3,width:16,height:16,borderRadius:"50%",background:"#fff"}}/></div>
<div><div style={{fontWeight:600,fontSize:13}}>Müşteri Adı Zorunlu</div><div style={{fontSize:11,color:T.textSub}}>Adisyon açılırken isim istenir</div></div>
</label>
</div>
<button onClick={saveCfg} style={{...sb(T.accent),padding:"12px 28px",fontSize:14}}>Kaydet</button>
<div style={{background:"#FDF0EF",border:"1px solid #E8BABA",borderRadius:12,padding:18,marginTop:28}}>
<div style={{fontWeight:700,fontSize:13,color:T.danger,marginBottom:8}}>Tehlikeli Bölge</div>
<p style={{fontSize:12,color:T.textSub,margin:"0 0 12px"}}>Tüm sipariş, rapor ve harcama verilerini sil.</p>
<button onClick={()=>{if(window.confirm("Emin misin?")){setOrd([]);setExp([]);setLogs([]);msg("Silindi","err");}}} style={{...sb(T.danger),fontSize:12}}>Tüm Verileri Sil</button>
</div>
</>}
{stab==="menu"&&<>
<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:20,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:14}}>{mEid?"Ürün Düzenle":"Yeni Ürün"}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
<input placeholder="Ürün adı" value={mF.name} onChange={e=>setMF(p=>({...p,name:e.target.value}))} style={inp}/>
<input type="number" placeholder="Fiyat" value={mF.price} onChange={e=>setMF(p=>({...p,price:e.target.value}))} style={inp}/>
<input placeholder="Kategori" value={mF.cat} onChange={e=>setMF(p=>({...p,cat:e.target.value}))} style={inp} list="mcats"/>
<datalist id="mcats">{Array.from(new Set(menu.map(m=>m.cat))).map(c=><option key={c} value={c}/>)}</datalist>
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
<button onClick={()=>{if(window.confirm("Bu ürünü silmek istediğine emin misin?")){setMenü(prev=>prev.filter(m=>m.id!==item.id));}}} style={{background:T.bg3,border:"none",borderRadius:7,padding:"6px 10px",cursor:"pointer",color:T.danger,fontSize:16}}>x</button>
</div>
</div>)}
</div>
</>}
{stab==="ecats"&&<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:22,maxWidth:500}}>
<div style={{fontWeight:700,fontSize:14,color:T.accentL,marginBottom:16}}>Harcama Kategorileri</div>
<div style={{display:"flex",gap:8,marginBottom:18}}>
<input placeholder="Yeni kategori..." value={newec} onChange={e=>setNewec(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){const t=newec.trim();if(t&&!ecats.includes(t)){setEc(prev=>[...prev,t]);setNewec("");msg("Eklendi");}}}} style={inp}/>
<button onClick={()=>{const t=newec.trim();if(t&&!ecats.includes(t)){setEc(prev=>[...prev,t]);setNewec("");msg("Eklendi");}}} style={{...sb(T.accent),padding:"9px 14px",flexShrink:0}}>+</button>
</div>
<div style={{display:"flex",flexDirection:"column",gap:7}}>
{ecats.map(cat=>{const used=exp.filter(e=>e.cat===cat).length;return(<div key={cat} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:T.bg3,borderRadius:9,padding:"10px 14px"}}><div><div style={{fontWeight:600,fontSize:13}}>{cat}</div><div style={{fontSize:10,color:T.textSub,marginTop:2}}>{used} kayıt</div></div><button onClick={()=>{if(used>0){msg("Harcaması var","err");return;}if(window.confirm("Bu kategoriyi silmek istediğine emin misin?")){setEc(prev=>prev.filter(c=>c!==cat));msg("Silindi");}}} style={{background:"none",border:"none",color:used>0?T.textDim:T.danger,cursor:used>0?"not-allowed":"pointer",padding:4,fontSize:16,opacity:used>0?0.4:1}}>x</button></div>);})}
</div>
<div style={{marginTop:14,padding:10,background:T.bg3,borderRadius:8,fontSize:11,color:T.textDim}}>Harcaması olan kategorisi silinemez.</div>
</div>}
</div>);}

function OnlineV({onlineOrders,setOnlineOrders,cur,fm,fd,ft,tod,uid,msg,inp,sb,T}){
const PLATFORMS=[
  {k:"yemeksepeti",l:"Yemeksepeti",color:"#FA0050",bg:"#FFF0F4"},
  {k:"getir",l:"Getir",color:"#5C3EBC",bg:"#F4F0FF"},
  {k:"ubereats",l:"Uber Eats",color:"#06C167",bg:"#F0FFF6"},
];
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
        <button onClick={()=>setShowDatePicker(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:rangeLabel?"#EBF5EF":T.bg3,border:"1px solid "+(rangeLabel?"#74C69D":T.border2),borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,color:rangeLabel?"#2D6A4F":T.textSub}}>
          📅 {rangeLabel||"Tarih Aralığı"}
          {rangeLabel&&<span onClick={e=>{e.stopPropagation();clearRange();}} style={{marginLeft:4,color:"#2D6A4F",fontWeight:800,fontSize:14,lineHeight:1}}>×</span>}
        </button>
        {showDatePicker&&(
          <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:16,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:100,minWidth:260}}>
            <div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>Başlangıç</div>
            <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={{...inp,marginBottom:12}}/>
            <div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>Bitiş</div>
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
    <div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:14,padding:20,marginBottom:22,boxShadow:T.shadowM}}>
      <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:T.accentL}}>Yeni Sipariş</div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {PLATFORMS.map(p=>(
          <button key={p.k} onClick={()=>setForm(f=>({...f,platform:p.k}))} style={{flex:1,padding:"10px 0",borderRadius:10,border:"2px solid "+(form.platform===p.k?p.color:"#E4E1DA"),background:form.platform===p.k?p.bg:T.bg3,color:form.platform===p.k?p.color:T.textSub,fontWeight:700,fontSize:13,cursor:"pointer"}}>{p.l}</button>
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
    <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)",borderRadius:14,padding:"16px 18px",color:"#fff"}}>
      <div style={{fontSize:11,opacity:0.7,marginBottom:6,textTransform:"uppercase",letterSpacing:0.5}}>Toplam</div>
      <div style={{fontSize:24,fontWeight:800}}>{fm(totalAll,cur)}</div>
      <div style={{fontSize:11,opacity:0.6,marginTop:4}}>{onlineOrders.length} sipariş</div>
    </div>
    {PLATFORMS.map(p=>(
      <div key={p.k} style={{background:p.bg,border:"2px solid "+p.color+"33",borderRadius:14,padding:"16px 18px"}}>
        <div style={{fontSize:11,color:p.color,fontWeight:700,marginBottom:6}}>{p.l}</div>
        <div style={{fontSize:22,fontWeight:800,color:p.color}}>{fm(byPlatform[p.k]||0,cur)}</div>
        <div style={{fontSize:11,color:T.textSub,marginTop:3}}>{onlineOrders.filter(o=>o.platform===p.k).length} sipariş</div>
      </div>
    ))}
  </div>

  <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
    <button onClick={()=>setFilterP("all")} style={{padding:"5px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:filterP==="all"?T.accent:T.bg3,color:filterP==="all"?"#fff":T.textSub}}>Tümü ({onlineOrders.length})</button>
    {PLATFORMS.map(p=>(
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
          <div key={o.id} style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:"13px 16px",boxShadow:T.shadow}}>
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
                <button onClick={(e)=>{e.stopPropagation();if(window.confirm("Bu siparişi silmek istediğine emin misin?")){setOnlineOrders(prev=>prev.filter(x=>x.id!==o.id));}}} style={{background:"none",border:"none",color:T.textDim,cursor:"pointer",padding:4,fontSize:16}}>x</button>
              </div>
            </div>
            {isExpanded&&hasItems&&(
              <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid "+T.border}}>
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

function ImportOldV({logs,setLogs,cur,fm,fd,setV,sb,T}){
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

<div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)",borderRadius:14,padding:"20px 22px",color:"#fff",marginBottom:20}}>
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
<div style={{background:"#EBF5EF",border:"1px solid #74C69D",borderRadius:14,padding:20,marginBottom:20}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
<span style={{fontSize:20}}>✓</span>
<div style={{fontWeight:700,fontSize:15,color:"#2D6A4F"}}>Eski raporlar içe aktarıldı</div>
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
<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:14,padding:20,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:15,marginBottom:8}}>İçe aktarmaya hazır</div>
<div style={{fontSize:13,color:T.textSub,marginBottom:16}}>
Bu işlem {OLD_LOGS.length} günlük geçmiş satış kaydını mevcut Raporlar listene ekleyecek. Bu kayıtlar diğer günlerle birlikte görünecek ve toplam ciro/net kâr hesaplamalarına dahil olacak. Ürün ve müşteri bazlı detay içermiyorlar, sadece günlük nakit/kart/gider toplamları var.
</div>
<button onClick={doImport} style={{...sb(T.accent),fontSize:14,padding:"12px 24px",width:"100%"}}>İçe Aktar — {OLD_LOGS.length} Gün</button>
</div>
)}

<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:14,padding:20}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Önizleme (ilk 10 kayıt)</div>
<div style={{display:"flex",flexDirection:"column",gap:6}}>
{sortedOld.slice(0,10).map(l=>(
<div key={l.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:T.bg3,borderRadius:8}}>
<span style={{fontSize:12,fontWeight:600}}>{fd(l.date)}</span>
<div style={{display:"flex",gap:14,fontSize:12}}>
<span style={{color:"#5C4A1E"}}>{fm(l.cash,cur)}</span>
<span style={{color:"#2D4A6A"}}>{fm(l.card,cur)}</span>
<span style={{fontWeight:700,color:T.accentL}}>{fm(l.inc,cur)}</span>
</div>
</div>
))}
</div>
<div style={{fontSize:11,color:T.textDim,marginTop:10,textAlign:"center"}}>...ve {OLD_LOGS.length-10} kayıt daha</div>
</div>
</div>
);}

function ProductAnalysisV({logs,cur,fm,fd,setV,sb,inp,T}){
const defaultFrom=(()=>{const d=new Date();d.setDate(d.getDate()-40);return d.toISOString().split("T")[0];})();
const defaultTo=new Date().toISOString().split("T")[0];
const[dateFrom,setDateFrom]=useState(defaultFrom);
const[dateTo,setDateTo]=useState(defaultTo);
const[showDatePicker,setShowDatePicker]=useState(false);
const[sortBy,setSortBy]=useState("qty");
const isDefaultRange=dateFrom===defaultFrom&&dateTo===defaultTo;

const inRange=(date)=>{
  if(!dateFrom&&!dateTo)return true;
  if(dateFrom&&date<dateFrom)return false;
  if(dateTo&&date>dateTo)return false;
  return true;
};
const rangeLabel=!isDefaultRange&&(dateFrom||dateTo)?`${dateFrom||"..."} → ${dateTo||"..."}`:null;
const clearRange=()=>{setDateFrom(defaultFrom);setDateTo(defaultTo);setShowDatePicker(false);};

const relevantLogs=logs.filter(l=>inRange(l.date)&&l.items&&l.items.length>0);
const daysWithData=relevantLogs.length;
const totalDaysInRange=logs.filter(l=>inRange(l.date)).length;

const productMap={};
relevantLogs.forEach(log=>{
  log.items.forEach(it=>{
    const key=it.name;
    if(!productMap[key])productMap[key]={name:it.name,qty:0,revenue:0,days:new Set()};
    productMap[key].qty+=it.qty;
    productMap[key].revenue+=it.total;
    productMap[key].days.add(log.date);
  });
});

const products=Object.values(productMap).map(p=>({
  ...p,
  dayCount:p.days.size,
  avgPerDay:p.qty/p.days.size,
}));

const totalQty=products.reduce((s,p)=>s+p.qty,0);
const totalRevenue=products.reduce((s,p)=>s+p.revenue,0);

const sorted=[...products].sort((a,b)=>sortBy==="qty"?b.qty-a.qty:b.revenue-a.revenue);
const maxVal=sorted.length>0?(sortBy==="qty"?sorted[0].qty:sorted[0].revenue):1;

const bottomSorted=[...products].sort((a,b)=>sortBy==="qty"?a.qty-b.qty:a.revenue-b.revenue).slice(0,5);

return(<div style={{padding:24,maxWidth:820,margin:"0 auto"}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:10}}>
<div style={{display:"flex",alignItems:"center",gap:12}}>
<button onClick={()=>setV("reports")} style={{...sb(T.bg3),color:T.textSub,padding:"7px 12px"}}>Geri</button>
<div>
<h2 style={{margin:0,fontWeight:800,fontSize:20}}>Ürün Analizi</h2>
<div style={{fontSize:12,color:T.textSub,marginTop:2}}>{daysWithData} günün ürün verisi üzerinden hesaplanıyor{totalDaysInRange>daysWithData?` (toplam ${totalDaysInRange} gün içinde)`:""}</div>
</div>
</div>
<div style={{position:"relative"}}>
  <button onClick={()=>setShowDatePicker(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:rangeLabel?"#EBF5EF":T.bg3,border:"1px solid "+(rangeLabel?"#74C69D":T.border2),borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,color:rangeLabel?"#2D6A4F":T.textSub}}>
    📅 {rangeLabel||"Son 41 Gün"}
    {rangeLabel&&<span onClick={e=>{e.stopPropagation();clearRange();}} style={{marginLeft:4,color:"#2D6A4F",fontWeight:800,fontSize:14,lineHeight:1}}>×</span>}
  </button>
  {showDatePicker&&(
    <div style={{position:"absolute",top:"calc(100% + 6px)",right:0,background:T.bg2,border:"1px solid "+T.border,borderRadius:12,padding:16,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:100,minWidth:260}}>
      <div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>Başlangıç</div>
      <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={{...inp,marginBottom:12}}/>
      <div style={{fontSize:11,color:T.textSub,fontWeight:600,marginBottom:8}}>Bitiş</div>
      <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} style={{...inp,marginBottom:14}}/>
      <div style={{display:"flex",gap:8}}>
        <button onClick={clearRange} style={{...sb(T.bg3),flex:1,color:T.textSub,padding:"8px 0",fontSize:12}}>Son 41 Gün</button>
        <button onClick={()=>setShowDatePicker(false)} style={{...sb(T.accent),flex:1,padding:"8px 0",fontSize:12}}>Uygula</button>
      </div>
    </div>
  )}
</div>
</div>

{daysWithData===0?(
<div style={{textAlign:"center",padding:"60px 0",color:T.textDim,background:T.bg2,borderRadius:14}}>
<div style={{fontSize:32,marginBottom:10}}>📊</div>
<div>Bu tarih aralığında ürün bazlı veri yok.</div>
<div style={{fontSize:12,marginTop:6}}>Ürün detayı olan günler henüz sınırlı (Mayıs-Haziran 2026).</div>
</div>
):(
<>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
<div style={{background:"#EBF5EF",border:"1px solid #74C69D",borderRadius:12,padding:"16px 18px"}}>
<div style={{fontSize:11,color:T.textSub,marginBottom:4}}>Toplam Ürün Çeşidi</div>
<div style={{fontSize:24,fontWeight:800,color:T.accentL}}>{products.length}</div>
</div>
<div style={{background:"#F5F0E4",border:"1px solid #D4C080",borderRadius:12,padding:"16px 18px"}}>
<div style={{fontSize:11,color:"#7A6428",marginBottom:4}}>Toplam Satılan Adet</div>
<div style={{fontSize:24,fontWeight:800,color:"#5C4A1E"}}>{totalQty}</div>
</div>
<div style={{background:"#EEF2F7",border:"1px solid #9BBAD8",borderRadius:12,padding:"16px 18px"}}>
<div style={{fontSize:11,color:"#1A3A5A",marginBottom:4}}>Toplam Ciro</div>
<div style={{fontSize:24,fontWeight:800,color:"#2D4A6A"}}>{fm(totalRevenue,cur)}</div>
</div>
</div>

<div style={{display:"flex",gap:8,marginBottom:16}}>
{[{k:"qty",l:"Adete Göre"},{k:"revenue",l:"Ciroya Göre"}].map(({k,l})=><button key={k} onClick={()=>setSortBy(k)} style={{padding:"8px 18px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:sortBy===k?T.accent:T.bg3,color:sortBy===k?"#fff":T.textSub}}>{l}</button>)}
</div>

<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:14,padding:20,marginBottom:20}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:14}}>En Çok Satanlar</div>
<div style={{display:"flex",flexDirection:"column",gap:10}}>
{sorted.map((p,i)=>{
const val=sortBy==="qty"?p.qty:p.revenue;
const pct=totalQty>0?(sortBy==="qty"?p.qty/totalQty*100:p.revenue/totalRevenue*100):0;
const barPct=maxVal>0?val/maxVal*100:0;
return(
<div key={p.name}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:11,fontWeight:800,color:T.textDim,minWidth:18}}>{i+1}</span>
<span style={{fontSize:13,fontWeight:600}}>{p.name}</span>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<span style={{fontSize:11,color:T.textSub}}>%{pct.toFixed(1)}</span>
<span style={{fontSize:13,fontWeight:700,color:T.accentL,minWidth:70,textAlign:"right"}}>{sortBy==="qty"?p.qty+" adet":fm(p.revenue,cur)}</span>
</div>
</div>
<div style={{background:T.bg3,borderRadius:6,height:8,overflow:"hidden"}}>
<div style={{background:T.accent,height:"100%",width:barPct+"%",borderRadius:6,transition:"width 0.3s"}}/>
</div>
<div style={{fontSize:10,color:T.textDim,marginTop:3}}>{p.dayCount} günde satıldı · günlük ort. {p.avgPerDay.toFixed(1)} adet · {sortBy==="qty"?fm(p.revenue,cur):p.qty+" adet"}</div>
</div>
);
})}
</div>
</div>

<div style={{background:T.bg2,border:"1px solid "+T.border,borderRadius:14,padding:20}}>
<div style={{fontWeight:700,fontSize:14,marginBottom:4}}>En Az Satanlar</div>
<div style={{fontSize:11,color:T.textSub,marginBottom:14}}>Menüden çıkarmayı veya kampanya yapmayı düşünebileceğin ürünler</div>
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{bottomSorted.map(p=>(
<div key={p.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:T.bg3,borderRadius:8}}>
<span style={{fontSize:13,fontWeight:600}}>{p.name}</span>
<div style={{display:"flex",gap:14,fontSize:12,color:T.textSub}}>
<span>{p.qty} adet</span>
<span style={{fontWeight:700,color:T.danger}}>{fm(p.revenue,cur)}</span>
</div>
</div>
))}
</div>
</div>
</>
)}
</div>);}
