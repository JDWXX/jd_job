/*
京东极速版-全品类15-8
不会用加群：212796668、681030097、681030097
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#京东极速版-全品类15-8
55 9,13,19,20,21 * * * https://github.com/JDWXX/jd_job/blob/master/ms/jd_yhq_9.js, tag=京东极速版-全品类15-8, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "55 9,13,19,20,21 * * *" script-path=https://github.com/JDWXX/jd_job/blob/master/ms/jd_yhq_9.js,tag=京东极速版-全品类15-8
===================================Surge================================
京东极速版-全品类15-8 = type=cron,cronexp="55 9,13,19,20,21 * * *",wake-system=1,timeout=3600,script-path=https://github.com/JDWXX/jd_job/blob/master/ms/jd_yhq_9.js
====================================小火箭=============================
京东极速版-全品类15-8 = type=cron,script-path=https://github.com/JDWXX/jd_job/blob/master/ms/jd_yhq_9.js, cronexpr="55 9,13,19,20,21 * * *", timeout=3600, enable=true
 */
const $ = new Env('测试脚本');
let ck = "SID=MTdiYjc0ZDZlODE1NGVlOWFhZDVjNTY2ZmZhOTA1OWanCFFySSu2KVrMBxghEDF8; cookie2=17bb74d6e8154ee9aad5c566ffa9059f; USERID=268971456;"
const fetch = require('node-fetch')
!(async () => {
    // await fetch("https://shopping.ele.me/h5/mtop.alsc.user.session.ele.check/1.0/?jsv=2.7.0&appKey=12574478&t=1665657551560&sign=a48eae25cd478d633815348fc7b0ea84&api=mtop.alsc.user.session.ele.check&v=1.0&timeout=5000&subDomain=shopping&mainDomain=ele.me&H5Request=true&pageDomain=ele.me&type=jsonp&dataType=jsonp&callback=mtopjsonp1&data=%7B%7D", {
    //     "headers": {
    //         'Host': 'shopping.ele.me',
    //         'Connection': 'keep-alive',
    //         'User-Agent': 'Rajax/1 MI_NOTE_3/MI_NOTE_3 Android/6.0.1 Display/V417IR_release-keys Eleme/10.13.3 Channel/1551089129819 ID/f9215ca1-cd3d-3b05-8d6e-cfbbe06fb81b; KERNEL_VERSION:4.0.9-android-x86_64+ API_Level:23 Hardware:823cf73ea8379cf6a7c53775bbfdb57d Mozilla/5.0 (Linux; Android 6.0.1; MI NOTE 3 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Mobile Safari/537.36 AliApp(ELMC/10.13.3) TTID/offical WindVane/8.5.0,UT4Aplus/ltracker-0.2.30.38',
    //         'Accept': '*/*',
    //         'Referer': 'https://tb.ele.me/wow/alsc/mod/d5275789de46503ba0908a9d?inviterId=3ed3868&actId=1&FastMode=1&_ltracker_f=hjb_app_jgw&chInfo=ch_app_chsub_Kouling&_ltracker_share_schema=app_inside_epwd&spm=a13.b_activity_kb_m46822.0.0',
    //         'Accept-Encoding': 'gzip, deflate',
    //         'Accept-Language': 'zh-CN,en-US;q=0.8',
    //         "Cookie": ck,
    //         // 'Cookie': 'cna=DM3OG6nF1FQCAXPG4fSWm4am; munb=2204726619220; cookie2=17bb74d6e8154ee9aad5c566ffa9059f; csg=df136cb3; t=d8fec7ce0742d146a06de3e3d18e093d; _tb_token_=fa3f7e5a3b81e; sgcookie=W100GqSvBch3XbPYkfqU0HfJQXDUEuR1Vyr1kC4MMoaSkUo7b7MFDQQoHGL8HpXt2tPGuFW%2FfZVRC13ux8vUlosbkoUK8NMQZxP7bkgBOzm0MqM%3D; unb=2204726619220; USERID=268971456; SID=MTdiYjc0ZDZlODE1NGVlOWFhZDVjNTY2ZmZhOTA1OWanCFFySSu2KVrMBxghEDF8; UTUSER=268971456; x5check_ele=BJRjtP2fO%2FNs38ouJIv6oq82gx2A0jPv4nKvLCtea1Q%3D; xlly_s=2; _m_h5_tk=14184aad0a42d830eac96a469a94f1c9_1665663043722; _m_h5_tk_enc=99c135de32bebe48c1a407b62df4c0d8; l=eBaSVkSuTUWA3fkUBOfwlurza77OSCOAiuPzaNbMiOCPOwfe5n6cW6PlAS8wC3GRhs_DR3PdblxJBeYBYn20_T7TC0T4rzDmn; tfstk=cWw1Bp_z300ElsBDIVsF7YV69zkfZT1ixhgufwlvAlVpV2E1Mygye6EpwI0tx; isg=BNHRDxVnVqe1rbqz_B2HnUMN69RrPkWw3lShF7NmzRi3WvGs-45VgH-8-Ci88t3o',
    //         'X-Requested-With': 'me.ele',
    //     },
    //     "method": "GET"
    // }).then(res =>console.log(res));
    //
    // await $.wait(2000);
    // await fetch("https://h5.ele.me/restapi/biz.application/generalpage/query?scene=usersharerefer&modules=[%22ShopAndFood%22,%22ShopAndNyuanBuy%22,%22ShopAndSpecialFood%22,%22ThreeSpecialFoods%22,%22Svip%22]&pageNum=1&extInfo=&advertise=true&extension=%257B%2522operation%2522%253A%2522EXCLUSIVE%2522%252C%2522rightSubType%2522%253A%2522%2522%252C%2522source%2522%253A%2522%2522%252C%2522cargoIds%2522%253A%2522%2522%252C%2522venueName%2522%253A%2522%2522%257D&jgsVersion=8.3&tab=Shop&svip=true&latitude=30.327265933156013&longitude=120.17587099224329&ddid=f9215ca1-cd3d-3b05-8d6e-cfbbe06fb81b&deviceId=f9215ca1-cd3d-3b05-8d6e-cfbbe06fb81b&authCode=&userAction=140%23vpbDrZwCzzPIqzo2%2BQSF4pN8s775eejBsurrWVAIlIKy8nwV6%2FwNr0zCAozPnMQkDm4qlbzx1bzrrmqUzFcQd1DOlpTzzPzbVXlqlbrofzIKV6gqzHOb2XU%2BlETcItI0MI2y7yDY5aC%2BMtPvLMdhAPhrHZblXqdN8wO9SrhgTh5BccZA9m4Axq8spWRzjJHzZyfmXTZknzzKaVM6lmYXxeZCkN0ZEJY6alN5vYyXWg78ydPma7VDR09womiLpb66q4RseqEabXK%2B%2BEOtAzjOQlkIGKS1OG0uyLAJE1Y0bH%2Bolm9ro%2BtcK8XJ3xanyaj9FwCg72yohPovVdieH%2FAhQg%2B0A3%2B43h8WE7t4jSpHSPotzBeOn4Yrnk6w1VAIGnh9s7SIPBVaXIwZbXBydgDst2s%2Fwh8W2wKagETyQiE6YSWZZwORwbudlAPqN7n7wifqTl48SvLLget1n%2F4uC8tLVBJRYkLy1Z1MAwJoFQfPHyXQx7a6wUPoOYG2Iit202MfIEu2uvO4nqLqgeekSsIgOb1OvU1ZOjdnx92vlfWxogtmN%2F3ii25apzK%2FOgPgjahWFhHfMDe7vuBvEed04Z6l%2BKpz3JkDO%2FiBHycGVEXwgUahrEXN%2B%2B7euXIOE9zv%2BRfZ7I%2FtC355gjjAUKkjX9WphvzqdDxFERcrD4xyY4GPZPJrHhbOoHwKUGm0ibtyty9M1KHnhivqa9JDA0iZB7Of6Jww4ZWOXrFbYyy8aiRs4BALUCbA4MnQ8GwoZq7hiZkta73FSE8jmDTSMO5HDT534qcoOuk18LW75bn6oyi5iB1S2AC5LOkvggkfNBkpUxySoXdWwPaFNj7Uf%2BWLA2AWCZDJRhwt0T8sGrL1sjF0ARbmJN634EHwxGMegFyRuUY4V%2Brp6u8ET%2FUf6ZIkhhxPZuvWeDjlSZkTeJxSxaHGo%2F0E7vkJ42ispMvqHhnvmrSbh2g7BsH9PjnOdPKL0CbYk83PkPtrvJI%2BPi8mu4NlpH%2BFs79Y36I9nsjdvU1obxN7fIr3IMFF6oyycAKb6o28tkR5uThsKfWJ%2BjfCBPz%3D&umidToken=T2gAD7ws0VvpjeJM0oVv-jnMM35N87gO31_rjxbNX-n7Hs-TP0-4EkJnkw2MT-W3M4w%3D", {
    //     "headers": {
    //             "Host": "h5.ele.me",
    //             "Connection": "keep-alive",
    //             "Accept": "application/json, text/plain, */*",
    //             "Origin": "https://tb.ele.me",
    //             "x-umt": "jaNLsrhLOvZUnDWD0GoKVBIFvnOOlpJA",
    //             "x-mini-wua": "aCARHMwWItJdqLz0oqO3T2j9OjXmYHDOKOIwGrZFQZx5JOgmL7/YP6ZXHGleFADLrkgMg+AnYoI8s17ZuEUyXEHnYm+z09Dka53ycmykOYXJhTNaaQoX1Z/vM4jJrEPIv/BfN5eFNVF+7mkEIncZ6V8P+i9o67QeSc8jrl7y4FFxmCQ==",
    //             "User-Agent": "Rajax/1 MI_NOTE_3/MI_NOTE_3 Android/6.0.1 Display/V417IR_release-keys Eleme/10.13.3 Channel/1551089129819 ID/f9215ca1-cd3d-3b05-8d6e-cfbbe06fb81b; KERNEL_VERSION:4.0.9-android-x86_64+ API_Level:23 Hardware:823cf73ea8379cf6a7c53775bbfdb57d Mozilla/5.0 (Linux; Android 6.0.1; MI NOTE 3 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Mobile Safari/537.36 AliApp(ELMC/10.13.3) TTID/offical WindVane/8.5.0,UT4Aplus/ltracker-0.2.30.38",
    //             "x-ua": "RenderWay/H5 AppName/elmc DeviceId/f9215ca1-cd3d-3b05-8d6e-cfbbe06fb81b AppExtraInfo/%7B%22utdid%22%3A%22YaR9gYcuPfIDAI6nl7G0h3D7%22%2C%22umidToken%22%3A%22jaNLsrhLOvZUnDWD0GoKVBIFvnOOlpJA%22%2C%22ttid%22%3A%221551089129819%40eleme_android_10.13.3%22%2C%22deviceUUID%22%3A%22f9215ca1-cd3d-3b05-8d6e-cfbbe06fb81b%22%2C%22miniWua%22%3A%22aCARHMwWItJdqLz0oqO3T2j9OjXmYHDOKOIwGrZFQZx5JOgmL7%2FYP6ZXHGleFADLrkgMg%2BAnYoI8s17ZuEUyXEHnYm%2Bz09Dka53ycmykOYXJhTNaaQoX1Z%2FvM4jJrEPIv%2FBfN5eFNVF%2B7mkEIncZ6V8P%2Bi9o67QeSc8jrl7y4FFxmCQ%3D%3D%22%7D",
    //             "Referer":"https://tb.ele.me/wow/alsc/mod/d5275789de46503ba0908a9d?inviterId=3ed3868&actId=1&FastMode=1&_ltracker_f=hjb_app_jgw&chInfo=ch_app_chsub_Kouling&_ltracker_share_schema=app_inside_epwd&spm=a13.b_activity_kb_m46822.0.0",
    //             "Accept-Encoding": "gzip, deflate",
    //             "Accept-Language": "zh-CN,en-US;q=0.8",
    //             // "Cookie": "cna=DM3OG6nF1FQCAXPG4fSWm4am; munb=2204726619220; cookie2=17bb74d6e8154ee9aad5c566ffa9059f; csg=df136cb3; t=d8fec7ce0742d146a06de3e3d18e093d; _tb_token_=fa3f7e5a3b81e; sgcookie=W100GqSvBch3XbPYkfqU0HfJQXDUEuR1Vyr1kC4MMoaSkUo7b7MFDQQoHGL8HpXt2tPGuFW%2FfZVRC13ux8vUlosbkoUK8NMQZxP7bkgBOzm0MqM%3D; unb=2204726619220; USERID=268971456; SID=MTdiYjc0ZDZlODE1NGVlOWFhZDVjNTY2ZmZhOTA1OWanCFFySSu2KVrMBxghEDF8; UTUSER=268971456; x5check_ele=BJRjtP2fO%2FNs38ouJIv6oq82gx2A0jPv4nKvLCtea1Q%3D; xlly_s=2; _m_h5_tk=14184aad0a42d830eac96a469a94f1c9_1665663043722; _m_h5_tk_enc=99c135de32bebe48c1a407b62df4c0d8; ucn=eleme_nt; tfstk=cGAOBpco08b6AoicT1Hh0UVhHvulZpVFmAs3MIDLP1atdgFAMgikNrbVQw5dq; l=eBaSVkSuTUWA35L2BOfaKurza77OSCOY5uPzaNbMiOCPO0C65K4FW6PlVALBC3GRhsOBR3PdblxJBeYBY3xonxvTC0T4rzDmn; isg=BAAA-zLLd4TUyAuA9YrG3jri2ofSieRTt4twhHqRzJuu9aAfIpm049bHCVs1gJwr",
    //             "Cookie": ck,
    //             "X-Requested-With": "me.ele"
    //     },
    //     "method": "GET"
    // }).then(res => res.json())
    //     .then(json => {
    //         console.log(json.data)
    //     });
    // await $.wait(2000);
    //
    // await fetch("https://f9b1d8.ug.ele.me/wow/alsc/mod/9b7dd5e527780fb84b5559a7?inviterId=3ed3868&actId=1&FastMode=1&_ltracker_f=hjb_app_jgw&chInfo=ch_app_chsub_Kouling", {
    //     "headers": {
    //         'Host': 'f9b1d8.ug.ele.me',
    //         'Connection': 'keep-alive',
    //         'Upgrade-Insecure-Requests': '1',
    //         'User-Agent': 'Rajax/1 MI_NOTE_3/MI_NOTE_3 Android/6.0.1 Display/V417IR_release-keys Eleme/10.13.3 Channel/1551089129819 ID/f9215ca1-cd3d-3b05-8d6e-cfbbe06fb81b; KERNEL_VERSION:4.0.9-android-x86_64+ API_Level:23 Hardware:823cf73ea8379cf6a7c53775bbfdb57d Mozilla/5.0 (Linux; Android 6.0.1; MI NOTE 3 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Mobile Safari/537.36 AliApp(ELMC/10.13.3) TTID/offical WindVane/8.5.0,UT4Aplus/ltracker-0.2.30.38',
    //         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    //         'Accept-Encoding': 'gzip, deflate',
    //         'Accept-Language': 'zh-CN,en-US;q=0.8',
    //         // 'Cookie': 'cna=DM3OG6nF1FQCAXPG4fSWm4am; munb=2204726619220; cookie2=17bb74d6e8154ee9aad5c566ffa9059f; csg=df136cb3; t=d8fec7ce0742d146a06de3e3d18e093d; _tb_token_=fa3f7e5a3b81e; sgcookie=W100GqSvBch3XbPYkfqU0HfJQXDUEuR1Vyr1kC4MMoaSkUo7b7MFDQQoHGL8HpXt2tPGuFW%2FfZVRC13ux8vUlosbkoUK8NMQZxP7bkgBOzm0MqM%3D; unb=2204726619220; USERID=268971456; SID=MTdiYjc0ZDZlODE1NGVlOWFhZDVjNTY2ZmZhOTA1OWanCFFySSu2KVrMBxghEDF8; UTUSER=268971456; x5check_ele=BJRjtP2fO%2FNs38ouJIv6oq82gx2A0jPv4nKvLCtea1Q%3D; xlly_s=2; _m_h5_tk=14184aad0a42d830eac96a469a94f1c9_1665663043722; _m_h5_tk_enc=99c135de32bebe48c1a407b62df4c0d8; l=eBaSVkSuTUWA31b2BOfaKurza77OSCOYkuPzaNbMiOCPOeC65-kRW6PlAZYBC3GRhsOBR3PdblxJBeYBY3xonxvTC0T4rzDmn; tfstk=cDCFBsARmxh1vDb8DCAP_nI_CF9dZzpXEl8BKoEnGbyq8UvhMWO-Qdcb5PN-e; isg=BDs7yi_13AXT6uCxwiO9PyW7wRalkE-SeEJblS34FzpRjFtutWDf4lnOoirCiqeK',
    //         "Cookie": ck,
    //         'X-Requested-With': 'me.ele',
    //         'If-None-Match': 'W/"f0f7-Avd42r313HsN4tC6CVFKtvqAxKQ"',
    //     },
    //     "method": "GET"
    // }).then(res =>console.log(res));
    // await $.wait(2000);

    // // 验证 1
    // await fetch("https://mtop.ele.me/h5/mtop.alibaba.svip.langrisser.query/1.0?jsv=2.6.2&appKey=12574478&t=1665722308755&sign=a6ff04c62307bfa58616374c2ff949af&api=mtop.alibaba.svip.langrisser.query&v=1.0&dataType=json&data=%7B%22callSource%22%3A%22biz_card_main%22%2C%22lgrsRequestItems%22%3A%22%5B%7B%5C%22resId%5C%22%3A%5C%22224166%5C%22%7D%5D%22%2C%22extra%22%3A%22%7B%5C%22source%5C%22%3A%5C%22mtop%5C%22%7D%22%2C%22latitude%22%3A%2222.524278%22%2C%22longitude%22%3A%22114.073330%22%7D", {
    //     "headers": {
    //         Host: 'mtop.ele.me',
    //         Connection: 'keep-alive',
    //         'User-Agent': 'Rajax/1 Apple/iPhone13,2 iOS/15.0 Eleme/10.7.15 ID/A332E16B-01AE-D30E-28264ED5C9AC; IsJailbroken/0 Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/10.7.15) UT4Aplus/ltracker-0.0.6 WindVane/8.7.2 1170x2532 WK',
    //         'x-ua': 'RenderWay%2FH5%20AppName%2Felmc%20DeviceId%2FA332E16B-01AE-D30E-28264ED5C9AC%20AppExtraInfo%2F%7B%22miniWua%22%3A%22cf91da0202373ae134b8eca626b89d8ee974105a5735024bd79e7ea3ad3935dc464d09cb0d3ebdeae6c18cb3a3a2059585270e87af59a88bb4d30fc06f0d10ec756c91f4600cf2a79438cbd31efbc4add25ea73d3a6cc3a43%22%2C%22umidToken%22%3A%22fd05b395cd3a0b3e0e31b43115cd8353%22%2C%22ttid%22%3A%22201200%40eleme_iphone_10.7.15%22%2C%22deviceUUID%22%3A%22A332E16B-01AE-D30E-28264ED5C9AC%22%2C%22utdid%22%3A%225b30d4aa4ce49d3e8d11c21e%22%7D',
    //         'x-shard': 'loc=114.077798,22.527448',
    //         Cookie: 'SID=MTFlYjQzZTRmZjYwMDA1NGZlMzAzZGUyMzQ4M2UwZTnXfSXC6JCTL23R-LBD_vp2; cookie2=11eb43e4ff600054fe303de23483e0e9; USERID=65878120;',
    //         Referer: 'https://tb.ele.me/'
    //     },
    //     "timeout": 1000,
    //     "method": "POST",
    //     "body": 'data=%7B%22asac%22%3A%222A207156FFTH57XVC1WXU4%22%2C%22ua%22%3A%22140%23D2b3Q8aazzPFHQo22Z%2Fb%2B3N8s7755%2BpIkTfxLsV8sYL36lDBbMyPPiU%2BVySh7fIBfddAxX4EuHAZTg8pOJy%2BrvJqlbzx1bWvKKJazzcbhONVl3MzzPzbVXlqlFzfCLtFA868zr6I2XhQBkrnzPFIV25etFro2HP%2Bz3ltQ11v2X8%2Bl6T4zPrb2zUiGHmijDapVrMn%2F2I4jearIkM%2BIXKnqdqAtmQHpN6GrWj6F166bZBQpcCcYItdz9FZA5otLSzawvrV4QC0pnfLrJU2ST9XZtpZ%2BDFlKj5X1jvY3dXBllGi6wErf7A%2BXPBEVgRYqC%2B%2FuFObCw3OKKPwaG2IiyHBVRKDRa%2BRnTq4Ed9NRtocxE5ESZowuXGdzEj4et515N9CalyR9FzUQ3%2BsQQoh5sIIZlDIRFsmVPquzbZ3cB%2Btzpas0f4yukZkxLSFn8lGWepl%2BNny8dDKOmScGZ1Tm37q7YxSCjChqxG76Qpw0bY0x4m%2FCZ8R9Own%2BzsMOaS3vcF3Mo4kn0TUmd%2FdLO%2FbT%2Bl48wCQvVsJ5tAi%2F%2Bva8grE1OUnjTjwy8NYc9UGGI19eju2mdENXBFe8v%2FMvVSspVfIs8uEaXjQHGO275iRlKaT0jDB6ZJvMjUe%2FZzvZf11O2L%2B%2Bklaw2Ct1Wz%2BgJ7iJ2LaMkUWpsY%2BrKQaNts7U72NoRiepbcz87hB2uS0uXk5cgNE%2Bbjdol67lODlZJ2eWRjzXxu%2B4AyBk%2BpAdd%2FVu9mFyDz6CwB4cAU1KQv0YHt1KYLl60uherPzclOsDZanh6LO0uVDTK8uSiv0qPCEqebt6hAEddXPlYdo8Jm1SDzNzpHCLUc0n2J7bjfdE3pZzy30b3mZ4GYmuO8%2BxXfrFt014tZk3UNKA%2Fa%2B0NobNc387Re50Bd9FJMu4k3SfJtZFEsM8vB8yBmdDEuR36qTpdMT2PY78K59qYMrWxpIwkZF5pP1G%2Ftx01a8LC%2FNMkdhZ3ulQJ%2FNIvOF0MNMV41BMy6DqDF%2FGSzu2O5PPYYqx8bmx64EGyLnjji7KaePTpQY%2BRxsXh2Qx0n02AnTWBe9gzrXOvmmYO6BRZ8fLea6%2BGuCqKfsKmMCJZX4VjD6GgjIRV5EfH6TlC984DZ29t2PPJ4fFK2oOZXRlnCgTDIwxBSEFyds0nSkyY0HrtbW7Dhl6IAopt1iNpf2Et6plylXOglT3HzhtHEIDi%2BAUbrA8TTlkpooxzwCgsPUBSqXIa5MBKr3aYGM2O2U2ep8HkJDYoReLTAWq5IalTY5uQ52eJdkzIubhFdsoSCW0twEZJYBAmd%2BcHabvLrAwtAj9aswj%2BWSSad9JA7%2BhmMa%2BbYute29Kiw30zjfqcKikuuqH32OwT%2B9lnlfJKPfhegtODyxmdBtvsxLvIpwndRU%2B4z9LpkGpN7Rvms%2FpC2jldCtzklqBjewie4PGTRkykcevgDXM%2Fi0ow2JpkbAb3sloCgmbJ0E5BFoWCGARaXwiOozKIx2ahcJVpsUVLJMWdODa8P4YhPw7n9whnEIylX3PfifinjmTvlN9C1H2p1fY9m%2FNTT7aJUwcJO84FCHcrBQquikuLOAA4H3Il03PBmkW%2Blmar9KR%2Fvvs%2BQql7xZAxacC%2FVKAfCLhf%2Fjs%2Ffeb%2BBnmqeb3aMKwwkt8DdVMEP25Uu7sfSejRUjE2aiAvIPzWgm2Iiy7rjkmGNV%2Flu3XuDDvLMudNQdmY987FnZKXhrbdAoOTzXc3GTDlowB98ui0DI0dgaD%2B3SHxrkbjC82nW%2BkEw%2BYSE5jjT1FyFrksL%2FBZfr0Y93GwKzzIqymQaNuTSrJHJSOfU8b%2BjHvTm%2F5ebc4xmFhkHhyTaZxsMgk7J9GcwEmfC1yc5n0mr15VwL3MZ28JQ44bzYkSh9GFZMtOg9tqPGkAPSTQeS2Sn8%2Bp8Gug9YxCnnoJi%2BjP3aJwLhzWatbGfXJHXakvAFilBAQ134LbW5UJnnTUhURKpub7%2B9m%2FLBDcN5JnAzAY8%2BXSRjv%2Bwt9ygAfeAtUAIExv2WdVZ47ezFto1TmSGpfwQ8zQf3wA2py57G9spTSBFo8mKtBiNCsh1Nvo%2BmwGjYUDIxeNEBG5GX7XCstU2PRSZ%2BR2Gr%2BzcbYdIqHaObHS4v6RrIM8HVA6dXRL7pi2ndXByodInwcvV88hUr5%2BHCtBRQthlPKgrgkjEQvHDpLenl5yg6WRZs1qmt5IcYwKhyDJ2S9hb5zc1NiVryXMQIUSaUhBSInhxY9PJ1X9uBdP936lY1bDQVyDaMugL9FKravmTpZ5dRaI0BNvri3vjO0M%2BM9JvebokvESzR27SH3JuSUspfnpy6nBdd6LwvRL1ceVcdQ3CbX468LFdNy4BsDRJcBaeU2TPsYyh%2F41yRNKAwMJzWm6R%2Bt%2FpL3X2Oi7HDjLtt4HHhT1M64gLoBj9JnbipI8MXf4P%2Bfdtww7jEauqaBTFor%2FTNK6UZB1yBpTJcHl0ED1CMRPkNDfRfmSMAjr58mL774mtFjVSf%2FTMv3g%2F16Aj1kVUPuY69%2FXw0ex0nKEZv8cO9%2FwgQKY4vz6HS9guMfb95OMjQpMwxftami3Qv6oiu7%2BuSRq8PIRKGi8gvSnPaAmXaDg%2F9g0oqq%2FetwX24aAsxRsUcxb5JnUMwG5gu%2FdwVvcO5UrwVQUb2lile46QkkjwOGKR3bXpL4EZJo0LUEvM5jDUUGQS7xDQyjYoAwtRBoudMI0nTYssPEoWintZwo4RZlocbV74qhqzm6S9uK75l7Sz95knHFe9ygB5w1CWGce5hDoITxVSW8Ewo7uHJQejw40zd1xD%2Bz5YcQk%2FYKMXeonVFm3J8eM9DEu96DaXvG0fQHg8%2B3q1%2Bg5cOzUWI%2BPlk9JaVYNfnVLmFYORoY%2BGr8TJsyRyStW214BeVF9Tc5%2BCApZQEWtPE9A9Ej0fUVTRrAvy6a08cROtyOE5C%2BiEMfok3E5QzTAqoh58FOYMJcuPuuZ11FU1jhYttK38VbhXIDu%2Fjli1SPVTkLzbRHTy%2B1mIm68SxdABl57rwrvx0G1b51TtB3RVubqKo6NR%2BcB4G9Oe4V1bHf1dPs2n%2Fhv2hx3izcv6KqlY8RQOjw8Rp%2FgGAd14o%2B0upiLFq2dYyqqr5r9CYg467VSv6riTnE9kXoVpOXJmMBW3rv59V7zzlEOr8s6pHZEjNngOR18T%2B7u9auXRBokX3LMW2Gp59SbD97qyGN5S4KzB1VwE70%2FiAf8hB085MJZx4NFMkE7YpdYv9RJVncmp9BVgdVvr4xMkuXNYvVoTeuF%3D%3D%22%2C%22umidToken%22%3A%22T2gAGvTaQBlFixwXEmBuxBFlUycE8AvMIy8wYwVMttfXxmJ8b_b61OUWd_HbZp9J88c%3D%22%2C%22latitude%22%3A30.32659%2C%22longitude%22%3A120.173753%2C%22extend%22%3A%22%7B%5C%22elemeUserAgent%5C%22%3A%5C%22Mozilla%2F5.0%20(Linux%3B%20U%3B%20Android%2012%3B%20zh-cn%3B%20M2102K1AC%20Build%2FSKQ1.211006.001)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Version%2F4.0%20Chrome%2F89.0.4389.72%20MQQBrowser%2F12.9%20Mobile%20Safari%2F537.36%20COVC%2F046215%5C%22%2C%5C%22pid%5C%22%3A%5C%22mm_1368340106_1991850209_111339400237%5C%22%2C%5C%22deviceId%5C%22%3A%5C%22%5C%22%2C%5C%22deviceType%5C%22%3A%5C%22h5%5C%22%2C%5C%22latitude%5C%22%3A30.32659%2C%5C%22longitude%5C%22%3A120.173753%2C%5C%22elemeUserId%5C%22%3A65878120%2C%5C%22phone%5C%22%3A%5C%2217764578824%5C%22%2C%5C%22mobile%5C%22%3A%5C%2217764578824%5C%22%2C%5C%22channel%5C%22%3A%5C%22F8565TCH52%5C%22%2C%5C%22relationId%5C%22%3A%5C%222818550388%5C%22%2C%5C%22unionLens%5C%22%3A%5C%22lensId%3AMAPI%401665717144%40212c7972_0bc6_183d47a8b94_0625%4001%3BeventPageId%3A1585018034441%5C%22%2C%5C%22ak%5C%22%3A%5C%2224894679%5C%22%2C%5C%22drawChannel%5C%22%3A%5C%22newchannel%5C%22%7D%22%2C%22pid%22%3A%22mm_1368340106_1991850209_111339400237%22%2C%22eh%22%3A%22XwavFptQiK11Z2W8b6J6weeA1fLtkmvuME4BxDdS%2BQWCuGvkQ1cnrQ%3D%3D%22%2C%22es%22%3A%22mPvmz6wsnfUN%2BoQUE6FNzAwMcyf%2B8yDUvHpaaUC5SwFNCfItouHfWhWe2mfvzNYFNriZCcrjkhs8jM%2BLc5VrnnswUrlGhH6DvKOtVjXKAx1K8sbv%2BfuX%2BQ%3D%3D%22%7D',
    // }).then(res => res.json())
    //     .then(json => {
    //         console.log(json)
    //     });
    // await $.wait(2000);

    // console.log("------------------ 获取验证码 ----------------")
    // await fetch("https://ipassport.ele.me/newlogin/sms/send.do?appName=eleme&fromSite=25&_bx-v=2.0.31", {
    //     "headers": {
    //         'Host': 'ipassport.ele.me',
    //         'Connection': 'keep-alive',
    //         'Content-Length': '3341',
    //         'EagleEye-SessionID': 'g6lU09ak81z2e0ggm2nzlw2xU36e',
    //         'Accept': 'application/json, text/plain, */*',
    //         'EagleEye-pAppName': 'gf3el0xc6g@256d85bbd150cf1',
    //         'User-Agent': 'Mozilla/5.0 (Linux; U; Android 12; zh-cn; M2102K1AC Build/SKQ1.211006.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/12.9 Mobile Safari/537.36 COVC/046215',
    //         'EagleEye-TraceID': 'e1bb23431665726340378100150cf1',
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Origin': 'https://ipassport.ele.me',
    //         'Sec-Fetch-Site': 'same-origin',
    //         'Sec-Fetch-Mode': 'cors',
    //         'Sec-Fetch-Dest': 'empty',
    //         'Referer': 'https://ipassport.ele.me/mini_login.htm?lang=zh_cn&appName=eleme&appEntrance=eleme_sms_h5&styleType=vertical&bizParams=&notLoadSsoView=true&notKeepLogin=false&isMobile=true&rnd=0.10674528455225718',
    //         'Accept-Encoding': 'gzip, deflate, br',
    //         'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'Cookie': 'xlly_s=1; cna=X+XPG7HKo0cCAXPG4fQVDAKe; _m_h5_tk=4e7479d1a569f26d3b75fdba73168eb6_1665734224972; _m_h5_tk_enc=267c41f1aa8c854b1359be0f4439d991; ut_ubt_ssid=1jiu2mtmsa1b2d0cg2h13xnsl0fmjc9y_2022-10-14; UTUSER=0; XSRF-TOKEN=254d0d41-f3cb-4e1a-8686-7a17ed22f302; _samesite_flag_=true; cookie2=1b406e70aba088e92da5b6e37c1f65e2; t=f2e1e5036e2bed8770346ab9e7ae4177; _tb_token_=54e45beb91ee7; l=eBg0OcFqTU-YJrGCBOfahurza7yFSCOv6uPzaNbMiOCP_z5p5OxlW6PO-FL9C3NRhs1eR3rBWbreBeYB4ImTB132C7xZ6fHmn; tfstk=cPWOB2j02xN9QB4DLdFHuYv8T1qhZM2Mu4TnHtV6Y8XxwFDAi0XlengaFHtpZkC..; isg=BG5utJ-agRGD1vV70lDwRMEUtMYwbzJpVKYTAJg32nEsew7VAP-CeRR5N-GX7CqB; _bl_uid=4UlOL98j8vv212gF63pXhCttLwzX; arms_uid=574ec4d0-ed8d-4ad6-96f5-48941fa8988a',
    //     },
    //     "method": "POST",
    //     "body": "phoneCode=86&loginId=17681854312&countryCode=CN&codeLength=6&ua=140%23%2BIQDZRIizzPVxzo2LZFzA6SogFJtOT%2BGxV%2F%2BHauL1uo1lMLohfNa%2FW0oyR6xiGolC8zhZ8%2BTRPOOGKTzkJ3dRjwBMFrlF3hqzznIxX96HDSzzR8HVY%2FBUbzx2DD3VthqzFKklbtglpOdzPzYVXEWMkbx%2F8ztH3h%2FzzzbL28%2BDFbkzKplVOg%2FlQzJ28xi2bQ3z4Mp2O8%2Bl66nzIDGVSKqvOfr28c3Vtg8zQr7iH8pwysx6I%2BiuC4qxb%2Bx1Pc%2BR6luVQriI183zb%2BxiDriZMBqHzrxJDc%2B2bGgGHmijDapVrMn%2F2I4jearIkM%2BIXKnqdqAtmQHsU7rwtI7lVTtDHWr7CHjLw0f0Tj5NXurlAkg3rzawvrV4QC0pnfLrJUP3i7Hq%2FZ08NgOsErUOzL1hKsTNi9xWEa5Y91IdQCZGTRPdxUC4I8iMAKZq%2FHe0My2lBnMIk6V%2BvPeGHsLmvcN4gD%2B47566K3zjPr%2FJLswqcTeIS65xngyahq1nr%2B6RWfi7pANmBOlrnCW8w1iCd2Be2n2CYnsNqVDGZcTKXKqsGtM1zRt8xm8xcmtMPVDmx0MUbxPPDufDQzUz0SKfLxUF9cyZ1G2xE2muLhuM8eWeMs7E7PaIHuc2hY4nkdnHqyE%2BxTKD5SmVOppv40lu%2FAm%2BoKhLj39YCjwoeg7wu0chJCO9Ljcp4MTe0AxojZzdXDbToKh1XECSOIIbMMTnZLDSdAG%2FJ78qqi3MntzJ7XdoxgkActCEeCClWElUbSzLaUMk1bwurAqth64ZS99duzUnVbGBERJTMG53kDKtG98B5kDjFZjnu%2FCPOpQO%2FJgzJvfcTDnK2eo2W4300HSFms36ojk6xfY7vh3rPSFMWlQtThGCwFtJXd7UIL%2BS5qHv6bY%2FzZZttPNB24SoLmQOVUKVFdhOww5LMEJdo2Z%2BTxAeWgRhKECXJTgiW7bdWkipNxoePowqxN8yf%2FrbOZhX1PDVg3c9SuM8tNFJhCE9ZT2d4ScBsqMj5YabhYpyhA%2BaBRuyzwaWGg6s4Eata9%2FfLhMMAirngfofTRFVGcgVh%2FtC2Muhj%2BUbJ9U9gakIWMxRVzOtoEZhMjVNakhD5sgo28E1YaMbxzy2n8Z1oJ5anlHoM7yNY4e&umidGetStatusVal=255&screenPixel=412x915&navlanguage=zh-CN&navUserAgent=Mozilla%2F5.0%20%28Linux%3B%20U%3B%20Android%2012%3B%20zh-cn%3B%20M2102K1AC%20Build%2FSKQ1.211006.001%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Version%2F4.0%20Chrome%2F89.0.4389.72%20MQQBrowser%2F12.9%20Mobile%20Safari%2F537.36%20COVC%2F046215&navPlatform=Linux%20aarch64&appName=eleme&appEntrance=eleme_sms_h5&_csrf_token=9Kke9adryP5x1C32DrHxi5&umidToken=a64b161503683db9aae138c92dbfde1c58c76341&isMobile=true&lang=zh_CN&returnUrl=&hsiz=1b406e70aba088e92da5b6e37c1f65e2&fromSite=25&bizParams=&umidTag=SERVER&weiBoMpBridge=&deviceId=&pageTraceId=21362e8c16657263253608585e9da6&bx-ua=223!g/JN9wpYib5gGCgyJgK6iAHGrOWIMRBFt/tSL2VflLyjURyfScg4JxAzZ9s/U6poBqvgUWyICCyV7UT/JjRyAKAv+cs4jMCyz3a/eaQ4c8WTbol+Y6WycKcqJG94IR3Kz3xQjgW4cQRCae2/WIH6EOMseSp4rQR4M3A/+6R4cQQCWGh/cgR4cAcESTjvYKQhglXe1n9szhCM3TXw0cp9UQ8QLEjraOm4cbWosMJsiA2TaBjmSTICzGEQJc9wcQRyzJau+W34cQRCWZo+3jR40h1a+iy4XjyyzJi/egmJ2jNRrth/cWR4cKcOeSI4rQygz3i7eC34cgRTWttQc3eJOWnMtIVNpu7XWtzFkfTpK1x3u2XsJYd8DsFyqQ29U8mzTsD7SplvQFC/53f3fxcwBF9NijwrllkA53ZOUARqzkGsi2MeoIKbb716CBL5i4AIcyGGE5dCCm06w3j1Sr7FDHoPNugkoVHfkbpPpSeUrjI0ZAds39oB2UWunl+gVl9t7czSy94vOvogASx8UjG7nrpkYvLFh72gnnZdfaGKwGAs67pwX+AxHqrt9RVrboO9++qK6ffPaIAXULbJZWqMTeOxlM8ZvfdvX1yxtr7yDZknXsNOtrqaqYitwSiwwSkjKxzyTFm1wZT48LCC8zxAsr8ntdzWKLWPsE2iyDrDoeAS6eeuKi4ReeKVXVL/TIoQsNWzgyOeJFmf0RdZRUj4fJQPXCJ1cOMmPDHnbGjtHro+SVzIKqLREeHs6Rya1GtJCQbJRMZjLEhDQE9VRePuBnN/YuRqz2m+tr4G0BF+CPHQkK9xrRbjumQYjunULrn+vvHXLoHBPuWKNW66w4A7PqXN3Fv1XnVTkCv6seo4G15iXShy/MHcBUVriBz4giTOc0zeVJfmtV19BKYePqauACZDQ3bzjVpItonmCWBDpEDh0JKg0bAUgtX3/wvN37AtCmTtJNUlMUD4JwZ5HRpVHJpy5spHUYfbfyNC5koxojC4Cu9M3NKOQoMN4yq1+AEafXdp7uiyJo1+Ntcwnt/YQHJu+FdyEJa/t/tUKKtWMZ+GUCmg1cbas7X0p4ZvlCJFJKsOmdLNeHw+I9SfVWRupzE+Wp7wsViUbXkFqs+DEz1wCsc6762frg/i4kQPZHKRqa+kdL2yPKxIsy/PNaA3gY7yFFNUX1+ajhMxZGOwsTL1+yI+rsQTSynbF+9CiOHv2B6Xmjoj0wYoMO3V+u3i+TAO/hNOgZivwAYWnnJcop/eLpy5SbA2L5Zi7j+sMj9FTvJXmaHeEjMkh7Hm2Q==&bx-umidtoken=T2gA_ygA805OKViTkApMRZVpmC5QZI1ML-7KpE-SpJz5utcePHpVEK9xOR998CoA2kw="
    // }).then(res => res.json())
    //     .then(json => {
    //         console.log(json)
    //     });
    // await $.wait(2000);
    //验证码参数 idc_131E9BA8140F549ACBDA9AAD2E2112A36
    // console.log("------------------ 登录 ----------------")
    // await fetch("https://ipassport.ele.me/newlogin/sms/login.do?appName=eleme&fromSite=25&_bx-v=2.0.31", {
    //     "headers": {
    //         'Host': 'ipassport.ele.me',
    //         'Connection': 'keep-alive',
    //         'Content-Length': '3341',
    //         'EagleEye-SessionID': 'g6lU09ak81z2e0ggm2nzlw2xU36e',
    //         'Accept': 'application/json, text/plain, */*',
    //         'EagleEye-pAppName': 'gf3el0xc6g@256d85bbd150cf1',
    //         'User-Agent': 'Mozilla/5.0 (Linux; U; Android 12; zh-cn; M2102K1AC Build/SKQ1.211006.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/12.9 Mobile Safari/537.36 COVC/046215',
    //         'EagleEye-TraceID': 'e1bb23431665726340378100150cf1',
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Origin': 'https://ipassport.ele.me',
    //         'Sec-Fetch-Site': 'same-origin',
    //         'Sec-Fetch-Mode': 'cors',
    //         'Sec-Fetch-Dest': 'empty',
    //         'Referer': 'https://ipassport.ele.me/mini_login.htm?lang=zh_cn&appName=eleme&appEntrance=eleme_sms_h5&styleType=vertical&bizParams=&notLoadSsoView=true&notKeepLogin=false&isMobile=true&rnd=0.10674528455225718',
    //         'Accept-Encoding': 'gzip, deflate, br',
    //         'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'Cookie': 'xlly_s=1; cna=X+XPG7HKo0cCAXPG4fQVDAKe; _m_h5_tk=4e7479d1a569f26d3b75fdba73168eb6_1665734224972; _m_h5_tk_enc=267c41f1aa8c854b1359be0f4439d991; ut_ubt_ssid=1jiu2mtmsa1b2d0cg2h13xnsl0fmjc9y_2022-10-14; UTUSER=0; XSRF-TOKEN=254d0d41-f3cb-4e1a-8686-7a17ed22f302; _samesite_flag_=true; cookie2=1b406e70aba088e92da5b6e37c1f65e2; t=f2e1e5036e2bed8770346ab9e7ae4177; _tb_token_=54e45beb91ee7; l=eBg0OcFqTU-YJrGCBOfahurza7yFSCOv6uPzaNbMiOCP_z5p5OxlW6PO-FL9C3NRhs1eR3rBWbreBeYB4ImTB132C7xZ6fHmn; tfstk=cPWOB2j02xN9QB4DLdFHuYv8T1qhZM2Mu4TnHtV6Y8XxwFDAi0XlengaFHtpZkC..; isg=BG5utJ-agRGD1vV70lDwRMEUtMYwbzJpVKYTAJg32nEsew7VAP-CeRR5N-GX7CqB; _bl_uid=4UlOL98j8vv212gF63pXhCttLwzX; arms_uid=574ec4d0-ed8d-4ad6-96f5-48941fa8988a',
    //     },
    //     "method": "POST",
    //     "body": "loginId=17681854312&phoneCode=86&countryCode=CN&smsCode=233322&smsToken=idc_131E9BA8140F549ACBDA9AAD2E2112A36&keepLogin=false&ua=140%23PZuDRFqHzzF4Izo2LZFuA6SogZpc5KvStG9%2FCwgoBv0TLTeJX7Ju46NFoGzfvDy%2FWytCLzSXdjPf8MB%2B1Wt8gylB1zrb23hqzznIxX96HDSzzRFTIamjUQzx2DD3VthqzFHklbtgLjfxzPFvV25etFr22mI%2BO6643FFi22U3U6TzeIdqVfB1kQrz2DDIOtTEF6%2Bi2nx6lpTzzDxvV2QU3uex2HwLIphqzzx621MfvpMzvPMIV2E%2FlEMD22w%2BOp6xWQ%2Bi22U3GqXxDkLYIFBqUpsxL2U%2BIdpjx%2BOiLnpYUEuxx2JfVlBql3fo2a0xbeiRzN1i2I24WkPI1wba7X53xl82VUpji2Jpo20oiliCyCPTD7HBMwb7UmoPp%2BWGxq8Tz%2FKJQKaHthIwx4Hg9VZzHy952ETdGvfjmlsyfRbShOVXAM%2FVFm8A9OU0Hc9mrjcG4w%2BwZ1K3I4YJO%2FYTRKhN6AojBxzw1EmrFwUROryvItCfRGniqgMDiubmFA4%2BQ1dQuEv9xJjgllupB16VL26mv%2Fzp6o2Q9cylVl%2BW9dpqfSLYUk8mMQQBeQy8xDmdItoIyjEAXo%2FYLYAj83HYIqlLwCW0kkuKvwKqh99VxB3gGRl5YxmdCQ7LJ9EDdo%2B1OrXWSHfNkzqwpMQQig5X2zzd%2FlMi7shPp3wZHLpHs0SCPFjKayffE9PmGpkP7bFBvP1RLJIAZ06QHfdoV3XTWHnzUKbxIOhedWRIsmrC1%2BUOd1Nuv5NKI%2FbfD509%2F7fZuVx56NL0qocsdVTthaLvj3cVYZx17tvJlU6Vk2wbbcCOuBClMWIZe%2FcLt7BJ6TSrZ7te7s6y6Yvjt5AJXdVLWcv5MTHp50EDsvh092qX4UQAUCcA8OgGH6hYBgoxV3zCweM%2B%2BZK%2BtuXcjIfMxRbKPzuC%2BKsYfpN4SNUjG4xR3K8uSURh9n0%2FMuzDWdJbu%2F0En9d%2BdHK31blmokFu9RmURp7TaIsHlQ4TAq1YqALrrjbgFTYacy9FFqY%2FXuF0aE%2B4n4fgosyGtzhOEx0vJGg06laN%2B9fUwPgfGkrt%2F2dMxRmZCAP%2BrFL0TdwQy66Pi15fKb2qfd0ERHHpsJ%2BMbZnjSsr2MfbTioE%2BJjfcq%2BSW%2B8QD2z6LdqQUyiJIc%2BrfqqCByA%2BTSZ3s84BP5igzsIkZVZbe6tOnwcExy6pxRKgyMqdUID8C&umidGetStatusVal=255&screenPixel=412x915&navlanguage=zh-CN&navUserAgent=Mozilla%2F5.0%20%28Linux%3B%20U%3B%20Android%2012%3B%20zh-cn%3B%20M2102K1AC%20Build%2FSKQ1.211006.001%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Version%2F4.0%20Chrome%2F89.0.4389.72%20MQQBrowser%2F12.9%20Mobile%20Safari%2F537.36%20COVC%2F046215&navPlatform=Linux%20aarch64&appName=eleme&appEntrance=eleme_sms_h5&_csrf_token=9Kke9adryP5x1C32DrHxi5&umidToken=a64b161503683db9aae138c92dbfde1c58c76341&isMobile=true&lang=zh_CN&returnUrl=&hsiz=1b406e70aba088e92da5b6e37c1f65e2&fromSite=25&bizParams=&umidTag=SERVER&weiBoMpBridge=&deviceId=&pageTraceId=21362e8c16657263253608585e9da6&bx-ua=223!cg3ICCXbEQCgGCgyJgK6iAHGrOWIMRBFt/tSL2VflLyjURyfScg4SxAzZ9s/U6p4eme8C95lGCyFrUT/JjRyMKAv+cs4jMCyz3a/eaQ4c8WTbol+Y6WycKcqJG94IR3Kz3xQjgW4cQRCae2/WIH6EOMseSp4rQR4M3c/Fq3scwZB8tT/rWRVgKAG+as4XRp1z3a/ec9JcgQCWGh/rQR4cAcOeUl415g/g2YRLTISQRzg6aXWSqylEo8K48qjSOX/MbJR1E7SzOpa6cbWabXkijEE4nvSSOT4gJi/+634SQWCWST/rW3bgPLreUgJvQDfzI87+6R4cQRTIv8+2+XycA4qe1l4cQygz3a7eCR4gQ6TWtT/cWok7gm0CxV/Qf7xx7flCUrP4gHkPbNWjynZ7re3tK6fXBSYursu5W7Oxo0c2MM4fWYL/aEszKAYHjjWuR1bptQY4MS0DagR1DV4tCWl5W1HuQMcMyFBLK+zOjjk40WuArkK/v9v3Xc4tA9TKvsYiKPSvYVtOp/3yYVgHGtA4KnRp1hMaD95mzZawnhXhTre5W2bArZveySO64qqtuhKMWglxjxg4/tHr3xHhyTrItvQ2T0j9i/j8qi8p41wYMEZ96xPM1rAAhkU7ieiejnZo/pyng2pcHqK0FAdILzUvWIFZI9FMYcy+IQzusETHrzAXsod07n3fY5dZCFcFk2YLWEsd7APwCEsf8IA29wpMaZ/SGfHVtGlgh9XeNTw9TgYcNTHytPPyCEY7TbBClL6zsQ6VNdjMSeul1+BxgISGWe0P4Z+KT5w5ThyzdOBcGzCt0huSYWLnCStdvNPiJdqeI0rlFZcUefIcc+U6ElfxYz2JnJATm8Gee3vKxLKExIZ5qsmllMfJYGUt9jVw/CcwtAGWyYsY8l4M2cBbjQnHf9zT/dK/3G13QE1ziMHkkQMiLl7POz/tT+l7wA9okCehIINYCFDhgfWrjPRD2i3FPr58hTq4Bfyq1xsoKyPdbVw2gADF3goMXXqVE0SxDl8MCqLE/hXxQU1IoXjlv8rZYzmiN36IAoR9slSEHe9fKDAINIH8axBIQygEDac5JDDtFr+7Ugs8WzyS29YxrsAnv0LHTYrjsWzyddDu12kk2Z3f3A9rSUDyIdkXT9VbdzdLcMnJADS2oIfzdfUObGcCO3r8zI71og24seaEM5RvMvFWhQtgDyYwIGWOCQhRDErzAxNRmeogUSFx8idBDnW6XXxoT7hP61WOFWCBYEysowHiL+YsSyPBJxd8h5NNtDqx/eH7PNPhinCqFP1utbscr0RdJ6m7mJVoB2mZhbQ9yrEC3ZNXAH1XxZomBa0cte5CJYPbWrqTRX/u2FvzRz+M7OtKWT+C4MMaYBVQmOS&bx-umidtoken=T2gA_ygA805OKViTkApMRZVpmC5QZI1ML-7KpE-SpJz5utcePHpVEK9xOR998CoA2kw="
    // }).then(res => res.json())
    //     .then(json => {
    //         console.log(json)
    //     });
    // await $.wait(2000);

    // {
    //     content: {
    //         data: {
    //             loginResult: 'success',
    //                 loginSucResultAction: 'loginResult',
    //                 st: 'tb_s_ele_1atuGVDGxB9BAxgfkwdJN5Q',
    //                 loginType: 'smsLogin',
    //                 user_id: '268971456',
    //                 loginScene: 'sms_login',
    //                 resultCode: 100,
    //                 appEntrance: 'eleme_sms_h5',
    //                 elemeExt: '{}',
    //                 smartlock: false,
    //                 sid: '1b406e70aba088e92da5b6e37c1f65e2',
    //                 username: '小小小小的号'
    //         },
    //         status: 0,
    //             success: true
    //     },
    //     hasError: false
    // }

    // console.log("------------------ 刷新token 1 ----------------")
    // let cookie2 = getUUID('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    // await fetch("https://mtop.ele.me/h5/mtop.alibaba.svip.langrisser.query/1.0?jsv=2.6.2&appKey=12574478&t=1665722805672&sign=55625326a953ade7f97aba1c0b13621f&api=mtop.alibaba.svip.langrisser.query&v=1.0&dataType=json&data=%7B%22callSource%22%3A%22biz_card_main%22%2C%22lgrsRequestItems%22%3A%22%5B%7B%5C%22resId%5C%22%3A%5C%22224166%5C%22%7D%5D%22%2C%22extra%22%3A%22%7B%5C%22source%5C%22%3A%5C%22mtop%5C%22%7D%22%2C%22latitude%22%3A%2222.528979%22%2C%22longitude%22%3A%22114.075285%22%7D", {
    //     "headers": {
    //         Host: 'mtop.ele.me',
    //         Connection: 'keep-alive',
    //         'User-Agent': 'Rajax/1 Apple/iPhone13,2 iOS/15.0 Eleme/10.7.15 ID/CBB8BB44-E41C-0328-E066AD21F3DB; IsJailbroken/0 Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/10.7.15) UT4Aplus/ltracker-0.0.6 WindVane/8.7.2 1170x2532 WK',
    //         'x-ua': 'RenderWay%2FH5%20AppName%2Felmc%20DeviceId%2FCBB8BB44-E41C-0328-E066AD21F3DB%20AppExtraInfo%2F%7B%22miniWua%22%3A%226777a370eecec92c125646488ff20bfabece80ab55263dfc5d9932e56277097fa4d9b440d44ee7c3cd2f072f23d3c82b34c840cec0b3f00c225a787fbdebd6074409e0356054abfb79afd1a39140e79a60f742daf44008a2d%22%2C%22umidToken%22%3A%22c604a7e4599ac1ca11be3e32faab1b07%22%2C%22ttid%22%3A%22201200%40eleme_iphone_10.7.15%22%2C%22deviceUUID%22%3A%22CBB8BB44-E41C-0328-E066AD21F3DB%22%2C%22utdid%22%3A%22272d4fbe2bab901ca4587b0e%22%7D',
    //         'x-shard': 'loc=114.075285,22.528979',
    //         Cookie: 'SID=1b406e70aba088e92da5b6e37c1f65e2; cookie2=' + cookie2 + '; USERID=268971456;',
    //         Referer: 'https://tb.ele.me/'
    //     },
    //     "timeout": 1000,
    //     "method": "GET",
    // }).then(res => console.log(res)
    //     );
    // await $.wait(2000);
    // console.log("------------------ 刷新token 2 ----------------")
    // let _m_h5_tk_enc = getUUID('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    // let _m_h5_tk = getUUID('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    // await fetch("https://shopping.ele.me/h5/mtop.alibaba.o2o.ele.guide.common.userinfo/1.0/?jsv=2.6.1&appKey=12574478&t=1665729770409&sign=0af6a8736e02d52721b4b0a1ce27f733&api=mtop.alibaba.o2o.ele.guide.common.userinfo&v=1.0&dataType=json&type=originaljson&data=%7B%22userAgent%22%3A%22Mozilla%2F5.0%20(Linux%3B%20U%3B%20Android%2012%3B%20zh-cn%3B%20M2102K1AC%20Build%2FSKQ1.211006.001)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Version%2F4.0%20Chrome%2F89.0.4389.72%20MQQBrowser%2F12.9%20Mobile%20Safari%2F537.36%20COVC%2F046215%22%2C%22ext%22%3A%22%7B%5C%22userId%5C%22%3A%5C%220%5C%22%7D%22%7D", {
    //     "headers": {
    //             'Host': 'shopping.ele.me',
    //             'Connection': 'keep-alive',
    //             'Accept': 'application/json',
    //             'User-Agent': 'Mozilla/5.0 (Linux; U; Android 12; zh-cn; M2102K1AC Build/SKQ1.211006.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/12.9 Mobile Safari/537.36 COVC/046215',
    //             'Content-type': 'application/x-www-form-urlencoded',
    //             'Origin': 'https://fc.ele.me',
    //             'Sec-Fetch-Site': 'same-site',
    //             'Sec-Fetch-Mode': 'cors',
    //             'Sec-Fetch-Dest': 'empty',
    //             'Referer': 'https://fc.ele.me/',
    //             'Accept-Encoding': 'gzip, deflate, br',
    //             'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    //             // 'Cookie': 'UTUSER=; xlly_s=1; cna=6PLPG5RXB3ACAXPG4fQd08sf; _m_h5_tk=bbf54d32651a8e02af13051c0ed21c8a_1665738050343; _m_h5_tk_enc=049b1816e705be342826819bb7768ecf; tfstk=csVNB7ZFVdaQANUA2Xc4TpKgs-dOZcwYEKusIgIEF3EwWmkGiVxx-niI0m9AMAf..; l=eBg0OcFqTU-YJPHDBOfZourza7yFSCOAouPzaNbMiOCP9M595n5NW6P_OuYpC3NRh6feR3rBWbreBeYB4IXshEQ2n35XjhDmn; isg=BLq61NDGjXzktQGf7tRsmNXYAOLcaz5FoHpHpMSzZs0Yt1rxrPuOVYDFAwXOCbbd',
    //             'Cookie': 'UTUSER=; xlly_s=1; cna=6PLPG5RXB3ACAXPG4fQd08sf; _m_h5_tk=' + _m_h5_tk
    //                 +'; _m_h5_tk_enc=' + _m_h5_tk_enc
    //                 + '; tfstk=csVNB7ZFVdaQANUA2Xc4TpKgs-dOZcwYEKusIgIEF3EwWmkGiVxx-niI0m9AMAf..; ' +
    //                 'l=eBg0OcFqTU-YJPHDBOfZourza7yFSCOAouPzaNbMiOCP9M595n5NW6P_OuYpC3NRh6feR3rBWbreBeYB4IXshEQ2n35XjhDmn; ' +
    //                 'isg=BLq61NDGjXzktQGf7tRsmNXYAOLcaz5FoHpHpMSzZs0Yt1rxrPuOVYDFAwXOCbbd',
    //     },
    //     "method": "GET",
    // }).then(res => res.json())
    //     .then(json => {
    //         console.log(json)
    //     });
    // await $.wait(2000);
    ck = '_m_h5_tk=9fce3a4331497b3c2a8a7d65729a6738_1665741918390; _m_h5_tk_enc=64a5778a86c78e842f870a86fb451210; SID=MTdiYjc0ZDZlODE1NGVlOWFhZDVjNTY2ZmZhOTA1OWanCFFySSu2KVrMBxghEDF8; cookie2=17bb74d6e8154ee9aad5c566ffa9059f; USERID=268971456;'
    // console.log("------------------ 登录查询 ----------------")
    // await fetch("https://restapi.ele.me/eus/v4/user_mini", {
    //     "headers": {
    //         Host: 'restapi.ele.me',
    //         Connection: 'keep-alive',
    //         'User-Agent': 'Rajax/1 Apple/iPhone13,2 iOS/15.0 Eleme/10.7.15 ID/CBB8BB44-E41C-0328-E066AD21F3DB; IsJailbroken/0 Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/10.7.15) UT4Aplus/ltracker-0.0.6 WindVane/8.7.2 1170x2532 WK',
    //         'x-ua': 'RenderWay%2FH5%20AppName%2Felmc%20DeviceId%2FCBB8BB44-E41C-0328-E066AD21F3DB%20AppExtraInfo%2F%7B%22miniWua%22%3A%226777a370eecec92c125646488ff20bfabece80ab55263dfc5d9932e56277097fa4d9b440d44ee7c3cd2f072f23d3c82b34c840cec0b3f00c225a787fbdebd6074409e0356054abfb79afd1a39140e79a60f742daf44008a2d%22%2C%22umidToken%22%3A%22c604a7e4599ac1ca11be3e32faab1b07%22%2C%22ttid%22%3A%22201200%40eleme_iphone_10.7.15%22%2C%22deviceUUID%22%3A%22CBB8BB44-E41C-0328-E066AD21F3DB%22%2C%22utdid%22%3A%22272d4fbe2bab901ca4587b0e%22%7D',
    //         'x-shard': 'loc=114.075285,22.528979',
    //         Cookie: 'SID=MTdiYjc0ZDZlODE1NGVlOWFhZDVjNTY2ZmZhOTA1OWanCFFySSu2KVrMBxghEDF8; USERID=268971456; _m_h5_tk=2ae3d4841cfcf755bb313c38b10802d2_1665730367921; _m_h5_tk_enc=0025fa62856f61865df3a3bdebf4a278;',
    //         Referer: 'https://tb.ele.me/'
    //     },
    //     "timeout": 1000,
    //     "method": "GET",
    // }).then(res => res.json())
    //     .then(json => {
    //         console.log(json)
    //     });
    // await $.wait(2000);
    // console.log("------------------ 登录查询 2----------------")
    // await fetch("https://h5.ele.me/restapi/svip_biz/v1/supervip/foodie/records?offset=0&limit=100&longitude=114.075285&latitude=22.528979", {
    //     "headers": {
    //         Host: 'h5.ele.me',
    //         Connection: 'keep-alive',
    //         'User-Agent': 'Rajax/1 Apple/iPhone13,2 iOS/15.0 Eleme/10.7.15 ID/CBB8BB44-E41C-0328-E066AD21F3DB; IsJailbroken/0 Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/10.7.15) UT4Aplus/ltracker-0.0.6 WindVane/8.7.2 1170x2532 WK',
    //         'x-ua': 'RenderWay%2FH5%20AppName%2Felmc%20DeviceId%2FCBB8BB44-E41C-0328-E066AD21F3DB%20AppExtraInfo%2F%7B%22miniWua%22%3A%226777a370eecec92c125646488ff20bfabece80ab55263dfc5d9932e56277097fa4d9b440d44ee7c3cd2f072f23d3c82b34c840cec0b3f00c225a787fbdebd6074409e0356054abfb79afd1a39140e79a60f742daf44008a2d%22%2C%22umidToken%22%3A%22c604a7e4599ac1ca11be3e32faab1b07%22%2C%22ttid%22%3A%22201200%40eleme_iphone_10.7.15%22%2C%22deviceUUID%22%3A%22CBB8BB44-E41C-0328-E066AD21F3DB%22%2C%22utdid%22%3A%22272d4fbe2bab901ca4587b0e%22%7D',
    //         'x-shard': 'loc=114.075285,22.528979',
    //         Cookie: 'SID=MTdiYjc0ZDZlODE1NGVlOWFhZDVjNTY2ZmZhOTA1OWanCFFySSu2KVrMBxghEDF8; USERID=268971456; _m_h5_tk=2ae3d4841cfcf755bb313c38b10802d2_1665730367921; _m_h5_tk_enc=0025fa62856f61865df3a3bdebf4a278; x5check_ele=BJRjtP2fO%2FNs38ouJIv6oq82gx2A0jPv4nKvLCtea1Q%3D;',
    //         Referer: 'https://tb.ele.me/'
    //     },
    //     "timeout": 1000,
    //     "method": "GET",
    // }).then(res => res.json())
    //     .then(json => {
    //         console.log(json)
    //     });
    // await $.wait(2000);

    // 联盟
    await fetch("https://shopping.ele.me/h5/mtop.alibaba.o2o.ele.alimama.vegas.draw/1.0/?jsv=2.6.1&appKey=12574478&t=1665717584098&sign=65d367abb00e9c2c9e949852c933467c&api=mtop.alibaba.o2o.ele.alimama.vegas.draw&needLogin=true&ecode=1&dataType=json&type=originaljson&v=1.0&AntiFlood=true&AntiCreep=true&isTriggerLogin=true&asac=2A207156FFTH57XVC1WXU4&x-umt=T2gAGvTaQBlFixwXEmBuxBFlUycE8AvMIy8wYwVMttfXxmJ8b_b61OUWd_HbZp9J88c%3D", {
        "headers": {
            'Host': 'shopping.ele.me',
            'Connection': 'keep-alive',
            'Content-Length': '5007',
            'Accept': 'application/json',
            'asac': '2A207156FFTH57XVC1WXU4',
            'x-umt': 'T2gAGvTaQBlFixwXEmBuxBFlUycE8AvMIy8wYwVMttfXxmJ8b_b61OUWd_HbZp9J88c=',
            'User-Agent': 'Mozilla/5.0 (Linux; U; Android 12; zh-cn; M2102K1AC Build/SKQ1.211006.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/12.9 Mobile Safari/537.36 COVC/046215',
            'Content-type': 'application/x-www-form-urlencoded',
            'Origin': 'https://tb.ele.me',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://tb.ele.me/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            // 'Cookie': 'cna=vdu3GzhjPhECAWVEOBBW8Pmy; miid=881671488255341299; ut_ubt_ssid=b39mfgukff42bbaudmwu8e1spe04kiu6_2022-10-14; _m_h5_tk=602610671f7f1c5f533a826486976b20_1665727288528; _m_h5_tk_enc=caa6b7abc8917b03f0a54f313629064c; xlly_s=1; _samesite_flag_=true; cookie2=1ca0848a68e53e34560ab596a8a8b18c; t=7a4cd1740c374a040d9fffc0487ea777; _tb_token_=5be7e64fa51b5; sgcookie=E100MgkZYgFa3BQkC1f%2FLm5SmfdbZRMG6wEMYlRpVTZTov75aPLNFS7lQR%2Bo%2FdLxlBcSTqW3DxgrnwWUVQgf8vTiiVBFa5YqvcRj8XDqFGVhqao%3D; munb=2204324844397; csg=0f128e80; t_eleuc4=id4=0%40BA%2FvuHCrrRkZZAU1DWjN%2BXdbv62Bs16t4SeYzA%3D%3D; unb=2204324844397; USERID=65878120; SID=MWNhMDg0OGE2OGU1M2UzNDU2MGFiNTk2YThhOGIxOGOJ6m5ryh8uJ6f91FzGusZn; UTUSER=65878120; x5check_ele=ben4Z0bHUNDgxHjlwtqKBw%3D%3D; isg=BC8v91z_kO7YCJTcKxtB6wg_tUE51IP2Db1yp0G8yh6lkE2SSaTXR-VCF8YLv1tu; l=eBg0OcFqTU-YJ9l2BOfZourza7yesCOqMuPzaNbMiOCPOj195odcW6POdpTpCnFRnsUDR3rBWbreBVYKYyzehNEARDYb1xat3dRC.; tfstk=cJBcBN1itM3DfwyOPZ9bQXzvqIqRa90Xk_55UoHlGqxPnrXX0sciaXkBAPY3q8c1.',
            "Cookie": ck,
        },
        "method": "POST",
        "body": 'data=%7B%22asac%22%3A%222A207156FFTH57XVC1WXU4%22%2C%22ua%22%3A%22140%23D2b3Q8aazzPFHQo22Z%2Fb%2B3N8s7755%2BpIkTfxLsV8sYL36lDBbMyPPiU%2BVySh7fIBfddAxX4EuHAZTg8pOJy%2BrvJqlbzx1bWvKKJazzcbhONVl3MzzPzbVXlqlFzfCLtFA868zr6I2XhQBkrnzPFIV25etFro2HP%2Bz3ltQ11v2X8%2Bl6T4zPrb2zUiGHmijDapVrMn%2F2I4jearIkM%2BIXKnqdqAtmQHpN6GrWj6F166bZBQpcCcYItdz9FZA5otLSzawvrV4QC0pnfLrJU2ST9XZtpZ%2BDFlKj5X1jvY3dXBllGi6wErf7A%2BXPBEVgRYqC%2B%2FuFObCw3OKKPwaG2IiyHBVRKDRa%2BRnTq4Ed9NRtocxE5ESZowuXGdzEj4et515N9CalyR9FzUQ3%2BsQQoh5sIIZlDIRFsmVPquzbZ3cB%2Btzpas0f4yukZkxLSFn8lGWepl%2BNny8dDKOmScGZ1Tm37q7YxSCjChqxG76Qpw0bY0x4m%2FCZ8R9Own%2BzsMOaS3vcF3Mo4kn0TUmd%2FdLO%2FbT%2Bl48wCQvVsJ5tAi%2F%2Bva8grE1OUnjTjwy8NYc9UGGI19eju2mdENXBFe8v%2FMvVSspVfIs8uEaXjQHGO275iRlKaT0jDB6ZJvMjUe%2FZzvZf11O2L%2B%2Bklaw2Ct1Wz%2BgJ7iJ2LaMkUWpsY%2BrKQaNts7U72NoRiepbcz87hB2uS0uXk5cgNE%2Bbjdol67lODlZJ2eWRjzXxu%2B4AyBk%2BpAdd%2FVu9mFyDz6CwB4cAU1KQv0YHt1KYLl60uherPzclOsDZanh6LO0uVDTK8uSiv0qPCEqebt6hAEddXPlYdo8Jm1SDzNzpHCLUc0n2J7bjfdE3pZzy30b3mZ4GYmuO8%2BxXfrFt014tZk3UNKA%2Fa%2B0NobNc387Re50Bd9FJMu4k3SfJtZFEsM8vB8yBmdDEuR36qTpdMT2PY78K59qYMrWxpIwkZF5pP1G%2Ftx01a8LC%2FNMkdhZ3ulQJ%2FNIvOF0MNMV41BMy6DqDF%2FGSzu2O5PPYYqx8bmx64EGyLnjji7KaePTpQY%2BRxsXh2Qx0n02AnTWBe9gzrXOvmmYO6BRZ8fLea6%2BGuCqKfsKmMCJZX4VjD6GgjIRV5EfH6TlC984DZ29t2PPJ4fFK2oOZXRlnCgTDIwxBSEFyds0nSkyY0HrtbW7Dhl6IAopt1iNpf2Et6plylXOglT3HzhtHEIDi%2BAUbrA8TTlkpooxzwCgsPUBSqXIa5MBKr3aYGM2O2U2ep8HkJDYoReLTAWq5IalTY5uQ52eJdkzIubhFdsoSCW0twEZJYBAmd%2BcHabvLrAwtAj9aswj%2BWSSad9JA7%2BhmMa%2BbYute29Kiw30zjfqcKikuuqH32OwT%2B9lnlfJKPfhegtODyxmdBtvsxLvIpwndRU%2B4z9LpkGpN7Rvms%2FpC2jldCtzklqBjewie4PGTRkykcevgDXM%2Fi0ow2JpkbAb3sloCgmbJ0E5BFoWCGARaXwiOozKIx2ahcJVpsUVLJMWdODa8P4YhPw7n9whnEIylX3PfifinjmTvlN9C1H2p1fY9m%2FNTT7aJUwcJO84FCHcrBQquikuLOAA4H3Il03PBmkW%2Blmar9KR%2Fvvs%2BQql7xZAxacC%2FVKAfCLhf%2Fjs%2Ffeb%2BBnmqeb3aMKwwkt8DdVMEP25Uu7sfSejRUjE2aiAvIPzWgm2Iiy7rjkmGNV%2Flu3XuDDvLMudNQdmY987FnZKXhrbdAoOTzXc3GTDlowB98ui0DI0dgaD%2B3SHxrkbjC82nW%2BkEw%2BYSE5jjT1FyFrksL%2FBZfr0Y93GwKzzIqymQaNuTSrJHJSOfU8b%2BjHvTm%2F5ebc4xmFhkHhyTaZxsMgk7J9GcwEmfC1yc5n0mr15VwL3MZ28JQ44bzYkSh9GFZMtOg9tqPGkAPSTQeS2Sn8%2Bp8Gug9YxCnnoJi%2BjP3aJwLhzWatbGfXJHXakvAFilBAQ134LbW5UJnnTUhURKpub7%2B9m%2FLBDcN5JnAzAY8%2BXSRjv%2Bwt9ygAfeAtUAIExv2WdVZ47ezFto1TmSGpfwQ8zQf3wA2py57G9spTSBFo8mKtBiNCsh1Nvo%2BmwGjYUDIxeNEBG5GX7XCstU2PRSZ%2BR2Gr%2BzcbYdIqHaObHS4v6RrIM8HVA6dXRL7pi2ndXByodInwcvV88hUr5%2BHCtBRQthlPKgrgkjEQvHDpLenl5yg6WRZs1qmt5IcYwKhyDJ2S9hb5zc1NiVryXMQIUSaUhBSInhxY9PJ1X9uBdP936lY1bDQVyDaMugL9FKravmTpZ5dRaI0BNvri3vjO0M%2BM9JvebokvESzR27SH3JuSUspfnpy6nBdd6LwvRL1ceVcdQ3CbX468LFdNy4BsDRJcBaeU2TPsYyh%2F41yRNKAwMJzWm6R%2Bt%2FpL3X2Oi7HDjLtt4HHhT1M64gLoBj9JnbipI8MXf4P%2Bfdtww7jEauqaBTFor%2FTNK6UZB1yBpTJcHl0ED1CMRPkNDfRfmSMAjr58mL774mtFjVSf%2FTMv3g%2F16Aj1kVUPuY69%2FXw0ex0nKEZv8cO9%2FwgQKY4vz6HS9guMfb95OMjQpMwxftami3Qv6oiu7%2BuSRq8PIRKGi8gvSnPaAmXaDg%2F9g0oqq%2FetwX24aAsxRsUcxb5JnUMwG5gu%2FdwVvcO5UrwVQUb2lile46QkkjwOGKR3bXpL4EZJo0LUEvM5jDUUGQS7xDQyjYoAwtRBoudMI0nTYssPEoWintZwo4RZlocbV74qhqzm6S9uK75l7Sz95knHFe9ygB5w1CWGce5hDoITxVSW8Ewo7uHJQejw40zd1xD%2Bz5YcQk%2FYKMXeonVFm3J8eM9DEu96DaXvG0fQHg8%2B3q1%2Bg5cOzUWI%2BPlk9JaVYNfnVLmFYORoY%2BGr8TJsyRyStW214BeVF9Tc5%2BCApZQEWtPE9A9Ej0fUVTRrAvy6a08cROtyOE5C%2BiEMfok3E5QzTAqoh58FOYMJcuPuuZ11FU1jhYttK38VbhXIDu%2Fjli1SPVTkLzbRHTy%2B1mIm68SxdABl57rwrvx0G1b51TtB3RVubqKo6NR%2BcB4G9Oe4V1bHf1dPs2n%2Fhv2hx3izcv6KqlY8RQOjw8Rp%2FgGAd14o%2B0upiLFq2dYyqqr5r9CYg467VSv6riTnE9kXoVpOXJmMBW3rv59V7zzlEOr8s6pHZEjNngOR18T%2B7u9auXRBokX3LMW2Gp59SbD97qyGN5S4KzB1VwE70%2FiAf8hB085MJZx4NFMkE7YpdYv9RJVncmp9BVgdVvr4xMkuXNYvVoTeuF%3D%3D%22%2C%22umidToken%22%3A%22T2gAGvTaQBlFixwXEmBuxBFlUycE8AvMIy8wYwVMttfXxmJ8b_b61OUWd_HbZp9J88c%3D%22%2C%22latitude%22%3A30.32659%2C%22longitude%22%3A120.173753%2C%22extend%22%3A%22%7B%5C%22elemeUserAgent%5C%22%3A%5C%22Mozilla%2F5.0%20(Linux%3B%20U%3B%20Android%2012%3B%20zh-cn%3B%20M2102K1AC%20Build%2FSKQ1.211006.001)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Version%2F4.0%20Chrome%2F89.0.4389.72%20MQQBrowser%2F12.9%20Mobile%20Safari%2F537.36%20COVC%2F046215%5C%22%2C%5C%22pid%5C%22%3A%5C%22mm_1368340106_1991850209_111339400237%5C%22%2C%5C%22deviceId%5C%22%3A%5C%22%5C%22%2C%5C%22deviceType%5C%22%3A%5C%22h5%5C%22%2C%5C%22latitude%5C%22%3A30.32659%2C%5C%22longitude%5C%22%3A120.173753%2C%5C%22elemeUserId%5C%22%3A65878120%2C%5C%22phone%5C%22%3A%5C%2217764578824%5C%22%2C%5C%22mobile%5C%22%3A%5C%2217764578824%5C%22%2C%5C%22channel%5C%22%3A%5C%22F8565TCH52%5C%22%2C%5C%22relationId%5C%22%3A%5C%222818550388%5C%22%2C%5C%22unionLens%5C%22%3A%5C%22lensId%3AMAPI%401665717144%40212c7972_0bc6_183d47a8b94_0625%4001%3BeventPageId%3A1585018034441%5C%22%2C%5C%22ak%5C%22%3A%5C%2224894679%5C%22%2C%5C%22drawChannel%5C%22%3A%5C%22newchannel%5C%22%7D%22%2C%22pid%22%3A%22mm_1368340106_1991850209_111339400237%22%2C%22eh%22%3A%22XwavFptQiK11Z2W8b6J6weeA1fLtkmvuME4BxDdS%2BQWCuGvkQ1cnrQ%3D%3D%22%2C%22es%22%3A%22mPvmz6wsnfUN%2BoQUE6FNzAwMcyf%2B8yDUvHpaaUC5SwFNCfItouHfWhWe2mfvzNYFNriZCcrjkhs8jM%2BLc5VrnnswUrlGhH6DvKOtVjXKAx1K8sbv%2BfuX%2BQ%3D%3D%22%7D',
    }).then(res => res.json())
        .then(json => {
            console.log(json)
        });
    await $.wait(2000);
    //
    // await fetch("https://shopping.ele.me/h5/mtop.alibaba.o2o.alsc.union.coupon.draw/1.0/?jsv=2.6.1&appKey=12574478&t=1665717686124&sign=258ab22d4fe7633c42bc57ddfc615200&api=mtop.alibaba.o2o.alsc.union.coupon.draw&needLogin=true&ecode=1&dataType=json&type=originaljson&v=1.0&AntiFlood=true&AntiCreep=true&isTriggerLogin=true&asac=2A207156FFTH57XVC1WXU4&x-umt=T2gA_NB7TxdofVKAr8y9pxcsEjJNTPYTe0Cu5PDfbQEeuHfCnk9l3dZO19qGHhKpLIA%3D", {
    //     "headers": {
    //         'Host': 'shopping.ele.me',
    //         'Connection': 'keep-alive',
    //         'Content-Length': '1977',
    //         'Accept': 'application/json',
    //         'asac': '2A207156FFTH57XVC1WXU4',
    //         'x-umt': 'T2gA_NB7TxdofVKAr8y9pxcsEjJNTPYTe0Cu5PDfbQEeuHfCnk9l3dZO19qGHhKpLIA=',
    //         'User-Agent': 'Mozilla/5.0 (Linux; U; Android 12; zh-cn; M2102K1AC Build/SKQ1.211006.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/12.9 Mobile Safari/537.36 COVC/046215',
    //         'Content-type': 'application/x-www-form-urlencoded',
    //         'Origin': 'https://fc.ele.me',
    //         'Sec-Fetch-Site': 'same-site',
    //         'Sec-Fetch-Mode': 'cors',
    //         'Sec-Fetch-Dest': 'empty',
    //         'Referer': 'https://fc.ele.me',
    //         'Accept-Encoding': 'gzip, deflate, br',
    //         'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    //         // 'Cookie': 'cna=vdu3GzhjPhECAWVEOBBW8Pmy; miid=881671488255341299; ut_ubt_ssid=b39mfgukff42bbaudmwu8e1spe04kiu6_2022-10-14; _m_h5_tk=602610671f7f1c5f533a826486976b20_1665727288528; _m_h5_tk_enc=caa6b7abc8917b03f0a54f313629064c; xlly_s=1; _samesite_flag_=true; cookie2=1ca0848a68e53e34560ab596a8a8b18c; t=7a4cd1740c374a040d9fffc0487ea777; _tb_token_=5be7e64fa51b5; sgcookie=E100MgkZYgFa3BQkC1f%2FLm5SmfdbZRMG6wEMYlRpVTZTov75aPLNFS7lQR%2Bo%2FdLxlBcSTqW3DxgrnwWUVQgf8vTiiVBFa5YqvcRj8XDqFGVhqao%3D; munb=2204324844397; csg=0f128e80; t_eleuc4=id4=0%40BA%2FvuHCrrRkZZAU1DWjN%2BXdbv62Bs16t4SeYzA%3D%3D; unb=2204324844397; USERID=65878120; SID=MWNhMDg0OGE2OGU1M2UzNDU2MGFiNTk2YThhOGIxOGOJ6m5ryh8uJ6f91FzGusZn; UTUSER=65878120; x5check_ele=ben4Z0bHUNDgxHjlwtqKBw%3D%3D; isg=BC8v91z_kO7YCJTcKxtB6wg_tUE51IP2Db1yp0G8yh6lkE2SSaTXR-VCF8YLv1tu; l=eBg0OcFqTU-YJ9l2BOfZourza7yesCOqMuPzaNbMiOCPOj195odcW6POdpTpCnFRnsUDR3rBWbreBVYKYyzehNEARDYb1xat3dRC.; tfstk=cJBcBN1itM3DfwyOPZ9bQXzvqIqRa90Xk_55UoHlGqxPnrXX0sciaXkBAPY3q8c1.',
    //         "Cookie": ck,
    //     },
    //     "method": "POST",
    //     "body": 'data=%7B%22asac%22%3A%222A207156FFTH57XVC1WXU4%22%2C%22ua%22%3A%22140%23%2F1Oo11OSzzP4SQo2KxcF3tN8s7755%2BZkiz9Oor3LsYl5TBx2J%2BSe5CRB%2FNxxeC3tt2OrrTiu4ayjF5Fvlp1zzq2rW7cHIQzxzK8za3Etzzrb22U3lpgQnfZuwZlqlRs%2Br0U%2BI3luzHOb2XYKFSnAz8oyQ%2BnqlbzzC8c%2BVDz3OqPI1wba7X53xl82VUpji2Jpo20oiliCyCPTD7BJqZrUJfK4%2FXrwTmZy5NOvZFmHx%2B8XTWZzHy952ETdG7ZeDZm6IL4HwrCBfWzS3E0swKc9kVZwc66kX%2FAs5dHeWcr0T1gUqvyEnlrH2deVjoVSyaNP2ORP01UWb0jVcZgnVT5jB0CF5aVm10P8ymD6F5%2F%2FXuiufhQVVbQLeMvHeUphzZAMoE868LP5e7jag7y9wBzNtHqcNnliNOgjAE0cA8bonuXsmfhuGILrB%2FLKYzHbbVZMG3wICN52vgdyOpAWP6CsqEDXr%2BkfdwLRLd%2FwS3ugxFxiyqub1wB0LTCSO5wyHL9hbz9nIprS%2Bbj8Tku5fT135Vo4ZL9iiarltW%2B%2FIChMGQaW9YY0aL5XISG82eLkmwsxGqaiHMultuCiPxXxZrvjwF7SyIcfEwvtjO7r8bTR%2B9mtrGAu5%2B8e69sXbZcHOmoydGAW8%2FxTwOXnP2BDKNgOxudkmNhBLcHeRKUealL%2B96z5QMVrV059a0cmyZwe1s64cZi858ipzEvhcHADNQ2UQEhDHW9KTmJ%2Fl0%2BcETEgEc07TzBbBxTJ9qEyR%2FtJPaW4NKC0SfTghzVMgBD6PhdXRl9dS2rZOdoUPrjrJ3pdbCSGc9ZblK94Ugz0W1d4QlOulUchgPLjo7Zir%2B8UPuNZh0yUusuBM0VlLwJq%2FnzgYDJZunVSwAqjPZxbbA98HbKlX5Hc2qo%2Blv7IUrPC34n0SnJCoA8ifd%2FzdJyUXTZE%22%2C%22umidToken%22%3A%22T2gA_NB7TxdofVKAr8y9pxcsEjJNTPYTe0Cu5PDfbQEeuHfCnk9l3dZO19qGHhKpLIA%3D%22%2C%22latitude%22%3A30.32659%2C%22longitude%22%3A120.173753%2C%22shortCode%22%3A%2253232deabe4546e6bc5c19e7c73ca3b6%22%2C%22extend%22%3A%22%7B%5C%22elemeUserAgent%5C%22%3A%5C%22Mozilla%2F5.0%20(Linux%3B%20U%3B%20Android%2012%3B%20zh-cn%3B%20M2102K1AC%20Build%2FSKQ1.211006.001)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Version%2F4.0%20Chrome%2F89.0.4389.72%20MQQBrowser%2F12.9%20Mobile%20Safari%2F537.36%20COVC%2F046215%5C%22%2C%5C%22deviceId%5C%22%3A%5C%22%5C%22%2C%5C%22shortCode%5C%22%3A%5C%2253232deabe4546e6bc5c19e7c73ca3b6%5C%22%2C%5C%22deviceType%5C%22%3A%5C%22h5%5C%22%2C%5C%22latitude%5C%22%3A30.32659%2C%5C%22longitude%5C%22%3A120.173753%2C%5C%22elemeUserId%5C%22%3A%5C%2265878120%5C%22%2C%5C%22phone%5C%22%3A%5C%2217764578824%5C%22%2C%5C%22channel%5C%22%3A%5C%22FD82UT426%5C%22%7D%22%7D',
    // }).then(res => res.json())
    //     .then(json => {
    //         console.log(json)
    //     });
    // await $.wait(2000);
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

function getUUID(format = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', UpperCase = 0) {
    return format.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        if (UpperCase) {
            uuid = v.toString(36).toUpperCase();
        } else {
            uuid = v.toString(36)
        }
        return uuid;
    });
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
