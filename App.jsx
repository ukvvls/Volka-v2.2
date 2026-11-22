import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowDownUp, Bell, Bot, Building2, BarChart3,
  ChevronDown, Globe2, Home, Languages, Menu, Newspaper, Search,
  Settings, Sparkles, Wallet, X, RefreshCw, ExternalLink, Clock3
} from "lucide-react";

const COMPANY_UNIVERSE = [
["AAPL","Apple","Technology","US"],["MSFT","Microsoft","Technology","US"],["NVDA","NVIDIA","Semiconductors","US"],
["AMZN","Amazon","E-commerce","US"],["GOOGL","Alphabet","Technology","US"],["META","Meta Platforms","Technology","US"],
["BRK.B","Berkshire Hathaway","Finance","US"],["LLY","Eli Lilly","Healthcare","US"],["AVGO","Broadcom","Semiconductors","US"],
["TSLA","Tesla","Automotive","US"],["WMT","Walmart","Retail","US"],["JPM","JPMorgan Chase","Finance","US"],
["V","Visa","Finance","US"],["XOM","Exxon Mobil","Energy","US"],["UNH","UnitedHealth","Healthcare","US"],
["MA","Mastercard","Finance","US"],["COST","Costco","Retail","US"],["ORCL","Oracle","Technology","US"],
["PG","Procter & Gamble","Consumer goods","US"],["JNJ","Johnson & Johnson","Healthcare","US"],
["HD","Home Depot","Retail","US"],["ABBV","AbbVie","Healthcare","US"],["BAC","Bank of America","Finance","US"],
["KO","Coca-Cola","Consumer goods","US"],["NFLX","Netflix","Media","US"],["CRM","Salesforce","Technology","US"],
["CVX","Chevron","Energy","US"],["AMD","AMD","Semiconductors","US"],["PEP","PepsiCo","Consumer goods","US"],
["TMUS","T-Mobile US","Telecom","US"],["ACN","Accenture","Technology","IE"],["LIN","Linde","Chemicals","IE"],
["MRK","Merck","Healthcare","US"],["ADBE","Adobe","Technology","US"],["CSCO","Cisco","Technology","US"],
["MCD","McDonald's","Restaurants","US"],["WFC","Wells Fargo","Finance","US"],["IBM","IBM","Technology","US"],
["QCOM","Qualcomm","Semiconductors","US"],["GE","GE Aerospace","Industrial","US"],["INTU","Intuit","Technology","US"],
["CAT","Caterpillar","Industrial","US"],["TMO","Thermo Fisher","Healthcare","US"],["AXP","American Express","Finance","US"],
["DIS","Walt Disney","Media","US"],["AMGN","Amgen","Healthcare","US"],["TXN","Texas Instruments","Semiconductors","US"],
["PM","Philip Morris","Consumer goods","US"],["VZ","Verizon","Telecom","US"],["NOW","ServiceNow","Technology","US"],
["NVO","Novo Nordisk","Healthcare","DK"],["SAP","SAP","Technology","DE"],["TM","Toyota","Automotive","JP"],
["HSBC","HSBC","Finance","GB"],["SHEL","Shell","Energy","GB"],["AZN","AstraZeneca","Healthcare","GB"],
["NESN.SW","Nestlé","Consumer goods","CH"],["NOVN.SW","Novartis","Healthcare","CH"],["ROG.SW","Roche","Healthcare","CH"],
["MC.PA","LVMH","Luxury","FR"],["OR.PA","L'Oréal","Consumer goods","FR"],["TTE","TotalEnergies","Energy","FR"],
["SIE.DE","Siemens","Industrial","DE"],["ALV.DE","Allianz","Finance","DE"],["BMW.DE","BMW","Automotive","DE"],
["7203.T","Toyota Motor","Automotive","JP"],["6758.T","Sony","Technology","JP"],["9984.T","SoftBank Group","Technology","JP"],
["005930.KS","Samsung Electronics","Technology","KR"],["000660.KS","SK Hynix","Semiconductors","KR"],["BABA","Alibaba","E-commerce","CN"],
["0700.HK","Tencent","Technology","CN"],["9988.HK","Alibaba Group","E-commerce","CN"],["TSM","TSMC","Semiconductors","TW"],
["RELIANCE.NS","Reliance Industries","Energy","IN"],["TCS.NS","Tata Consultancy","Technology","IN"],["INFY","Infosys","Technology","IN"],
["RIO","Rio Tinto","Mining","GB"],["BHP","BHP","Mining","AU"],["CBA.AX","Commonwealth Bank","Finance","AU"],
["RY","Royal Bank of Canada","Finance","CA"],["SHOP","Shopify","Technology","CA"],["ENB","Enbridge","Energy","CA"],
["PFE","Pfizer","Healthcare","US"],["ABT","Abbott","Healthcare","US"],["DHR","Danaher","Healthcare","US"],
["GS","Goldman Sachs","Finance","US"],["MS","Morgan Stanley","Finance","US"],["BLK","BlackRock","Finance","US"],
["LOW","Lowe's","Retail","US"],["UPS","UPS","Logistics","US"],["HON","Honeywell","Industrial","US"],
["RTX","RTX","Aerospace","US"],["SPGI","S&P Global","Finance","US"],["BKNG","Booking Holdings","Travel","US"],
["UBER","Uber","Technology","US"],["PLTR","Palantir","Technology","US"],["ARM","Arm Holdings","Semiconductors","GB"],
["BUD","AB InBev","Consumer goods","BE"],["SAN","Banco Santander","Finance","ES"],["ITX.MC","Inditex","Retail","ES"],
["2222.SR","Saudi Aramco","Energy","SA"],["1120.SR","Al Rajhi Bank","Finance","SA"],["COMI.CA","Commercial International Bank","Finance","EG"]
];

const NAV = [
  ["home","الرئيسية","Home",Home],["markets","الأسواق","Markets",BarChart3],
  ["companies","الشركات","Companies",Building2],["currency","تحويل العملات","Currency",ArrowDownUp],
  ["news","الأخبار","News",Newspaper],["ai","VOLKA AI","VOLKA AI",Bot],["settings","الإعدادات","Settings",Settings]
];
const fmt = (n, digits=4) => Number(n).toLocaleString("en-US",{maximumFractionDigits:digits});
const today = () => new Date().toISOString().slice(0,10);

export default function App(){
  const [lang,setLang]=useState("ar"), [page,setPage]=useState("home");
  const [glass,setGlass]=useState(58), [motionOn,setMotionOn]=useState(true);
  const [currencies,setCurrencies]=useState({}), [rates,setRates]=useState({});
  const [base,setBase]=useState("USD"), [quote,setQuote]=useState("EGP"), [amount,setAmount]=useState("1");
  const [currencyDate,setCurrencyDate]=useState(""), [currencyError,setCurrencyError]=useState("");
  const [news,setNews]=useState([]), [newsStatus,setNewsStatus]=useState("loading");
  const [query,setQuery]=useState(""), [answer,setAnswer]=useState("اسأل عن العملات أو الشركات أو بيانات الأسواق المتاحة داخل VOLKA.");
  const [companySearch,setCompanySearch]=useState("");
  const [notice,setNotice]=useState("مرحباً بك في VOLKA 2.0");
  const [menuOpen,setMenuOpen]=useState(false);
  const isAr=lang==="ar";
  const t=(ar,en)=>isAr?ar:en;

  useEffect(()=>{
    document.documentElement.lang=lang; document.documentElement.dir=isAr?"rtl":"ltr";
  },[lang,isAr]);
  useEffect(()=>{
    document.documentElement.style.setProperty("--glass",`${glass/100}`);
  },[glass]);
  useEffect(()=>{ loadCurrencies(); loadNews(); },[]);

  async function loadCurrencies(){
    setCurrencyError("");
    try{
      const res=await fetch("https://api.frankfurter.dev/v1/currencies");
      if(!res.ok) throw new Error("currency list unavailable");
      const names=await res.json(); setCurrencies(names);
      await loadRates(base);
    }catch(e){setCurrencyError(t("تعذر الاتصال بمصدر العملات. تحقق من الإنترنت.","Could not reach the currency data source. Check your connection."));}
  }
  async function loadRates(code){
    try{
      const res=await fetch(`https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(code)}`);
      if(!res.ok) throw new Error("rates unavailable");
      const data=await res.json(); setRates(data.rates||{}); setCurrencyDate(data.date||"");
    }catch(e){setCurrencyError(t("تعذر تحميل أسعار الصرف.","Could not load exchange rates."));}
  }
  async function loadNews(){
    setNewsStatus("loading");
    try{
      const url="https://api.gdeltproject.org/api/v2/doc/doc?query=(finance%20OR%20markets%20OR%20stocks%20OR%20economy)&mode=ArtList&format=json&maxrecords=18&sort=DateDesc";
      const res=await fetch(url); if(!res.ok) throw new Error("news unavailable");
      const data=await res.json(); setNews(data.articles||[]); setNewsStatus("ready");
    }catch(e){setNewsStatus("error");}
  }
  const converted=useMemo(()=>{
    if(base===quote) return Number(amount)||0;
    const direct=rates[quote];
    if(direct) return (Number(amount)||0)*direct;
    return null;
  },[amount,base,quote,rates]);
  const companies=useMemo(()=>COMPANY_UNIVERSE.filter(c=>`${c[0]} ${c[1]} ${c[2]} ${c[3]}`.toLowerCase().includes(companySearch.toLowerCase())),[companySearch]);

  function askAI(){
    const q=query.trim().toLowerCase(); if(!q)return;
    const codeMatch=Object.keys(currencies).find(c=>q.includes(c.toLowerCase()));
    const namedMatch=Object.entries(currencies).find(([c,n])=>q.includes(n.toLowerCase()));
    const company=COMPANY_UNIVERSE.find(c=>q.includes(c[0].toLowerCase())||q.includes(c[1].toLowerCase()));
    if((q.includes("تحويل")||q.includes("convert")||q.includes("سعر")||q.includes("rate"))&&(codeMatch||namedMatch)){
      const code=codeMatch||namedMatch[0];
      setAnswer(t(`العملة ${currencies[code]||code} (${code}) موجودة في قائمة العملات. افتح صفحة تحويل العملات لاختيار عملة المقارنة. لا أملك هنا سعراً تاريخياً مؤكداً لهذه العملة قبل تحميل سجلها.`,`The currency ${currencies[code]||code} (${code}) is available. Open Currency to choose a pair. A historical quote has not been loaded in this session.`));
    }else if(company){
      setAnswer(t(`${company[1]} (${company[0]}) موجودة في دليل الشركات ضمن قطاع ${company[2]}. أسعار الأسهم غير موصولة بمصدر تداول في هذه النسخة، لذلك لن أعرض رقماً تخمينياً.`,` ${company[1]} (${company[0]}) is listed in the company directory under ${company[2]}. Equity quotes are not connected yet, so I won't invent a price.`));
    }else if(q.includes("ذهب")||q.includes("gold")||q.includes("نفط")||q.includes("oil")||q.includes("فضة")||q.includes("silver")){
      setAnswer(t("بيانات السلع مثل الذهب والفضة والنفط لم تُربط بمصدر أسعار بعد. لن أعرض سعراً وهمياً. يمكنني حالياً الوصول إلى أسعار صرف مرجعية عبر صفحة العملات.","Commodity feeds for gold, silver and oil are not connected yet. I won't show fabricated quotes. Reference FX rates are available in Currency."));
    }else{
      setAnswer(t("أنا مساعد محلي متخصص في بيانات VOLKA المتاحة. أستطيع البحث في دليل الشركات والعملات والأخبار المحمّلة. لا أختلق أسعاراً أو معلومات غير موجودة في المنصة.","I'm VOLKA's local data assistant. I can search the company and currency directory and loaded headlines. I won't fabricate prices or facts that aren't in the platform."));
    }
  }
  const PageMotion=({children})=><motion.div key={page} initial={motionOn?{opacity:0,y:14,filter:"blur(8px)"}:false} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={motionOn?{opacity:0,y:-10,filter:"blur(6px)"}:undefined} transition={{duration:.32,ease:[.22,1,.36,1]}}>{children}</motion.div>;

  return <div className="app-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="ambient ambient-three"/>
    <header className="topbar jelly">
      <button className="icon-btn mobile-menu" onClick={()=>setMenuOpen(!menuOpen)}><Menu size={19}/></button>
      <div className="brand"><span className="brand-mark">V</span><div><b>VOLKA</b><small>GLOBAL FINANCIAL INTELLIGENCE</small></div></div>
      <div className="top-actions"><span className="live-dot"/><span className="market-status">{t("مركز البيانات","DATA CENTER")}</span><button className="icon-btn" onClick={()=>setNotice(t("لا توجد تنبيهات جديدة","No new alerts"))}><Bell size={18}/></button><button className="lang-btn" onClick={()=>setLang(isAr?"en":"ar")}><Languages size={16}/>{isAr?"EN":"عربي"}</button></div>
    </header>
    <div className="layout">
      <aside className={`sidebar jelly ${menuOpen?"open":""}`}>
        <div className="side-label">{t("مساحة العمل","WORKSPACE")}</div>
        {NAV.map(([id,ar,en,Icon])=><button key={id} className={`nav-item ${page===id?"active":""}`} onClick={()=>{setPage(id);setMenuOpen(false)}}><Icon size={18}/><span>{t(ar,en)}</span>{id==="ai"&&<i className="new-tag">AI</i>}</button>)}
        <div className="sidebar-bottom"><div className="secure-chip"><Activity size={15}/><span>{t("اتصال البيانات حسب المصدر","SOURCE-DEPENDENT DATA")}</span></div><small>VOLKA v2.0 · BUILD 001</small></div>
      </aside>
      <main className="main-content">
        <div className="page-heading"><div><div className="eyebrow">{t("ذكاء الأسواق العالمي","GLOBAL MARKET INTELLIGENCE")}</div><h1>{NAV.find(x=>x[0]===page)?.[isAr?1:2]}</h1></div><div className="date-pill"><Clock3 size={14}/>{today()}</div></div>
        <AnimatePresence mode="wait"><PageMotion>
          {page==="home"&&<section className="page-grid">
            <div className="hero-card jelly span-2"><div className="hero-copy"><div className="gold-kicker"><Sparkles size={15}/>{t("رؤية أوضح للأسواق","A CLEARER MARKET VIEW")}</div><h2>{t("الأسواق تتحرك،","Markets move,")}<br/><em>{t("ابقَ على اطلاع.","stay informed.")}</em></h2><p>{t("منصة موحدة لاستكشاف الشركات والعملات والأخبار المالية.","One workspace for companies, currencies and financial headlines.")}</p><button className="gold-button" onClick={()=>setPage("markets")}>{t("استكشف الأسواق","Explore markets")} <ArrowDownUp size={16}/></button></div><div className="orb-wrap"><div className="glass-orb"><span>V</span></div><div className="orbit orbit-a"/><div className="orbit orbit-b"/></div></div>
            <div className="metric-card jelly"><span>{t("العملات المتاحة","AVAILABLE CURRENCIES")}</span><strong>{Object.keys(currencies).length||"—"}</strong><small>{t("من مصدر أسعار الصرف","From FX reference feed")}</small></div>
            <div className="metric-card jelly"><span>{t("الشركات في الدليل","COMPANY DIRECTORY")}</span><strong>{COMPANY_UNIVERSE.length}</strong><small>{t("قائمة استكشافية، وليست ترتيباً لحظياً","Directory, not live ranking")}</small></div>
            <div className="feature-card jelly" onClick={()=>setPage("ai")}><div className="feature-icon"><Bot/></div><div><b>VOLKA AI</b><p>{t("اسأل عن البيانات المتاحة في المنصة","Ask about platform data")}</p></div><ChevronDown className="feature-arrow"/></div>
            <div className="feature-card jelly" onClick={()=>setPage("currency")}><div className="feature-icon blue"><ArrowDownUp/></div><div><b>{t("محول العملات","Currency converter")}</b><p>{t("تحويل العملات المرجعية","Reference FX conversion")}</p></div><ChevronDown className="feature-arrow"/></div>
            <div className="section-card jelly span-2"><div className="section-title"><div><h3>{t("آخر الأخبار","Latest headlines")}</h3><small>{t("عناوين من مصادر خارجية","Headlines from external sources")}</small></div><button className="text-button" onClick={()=>setPage("news")}>{t("عرض الكل","View all")} ↗</button></div>{news.slice(0,4).map((n,i)=><a className="news-row" key={n.url||i} href={n.url} target="_blank" rel="noreferrer"><span className="news-index">{String(i+1).padStart(2,"0")}</span><span>{n.title}</span><ExternalLink size={14}/></a>)}{newsStatus==="error"&&<p className="muted">{t("تعذر تحميل الأخبار حالياً.","Could not load news right now.")}</p>}</div>
          </section>}
          {page==="markets"&&<section className="section-card jelly"><div className="section-title"><div><h3>{t("نظرة الأسواق","Market overview")}</h3><small>{t("بيانات السلع والأسهم تحتاج مزود أسعار قبل عرض الأرقام","Commodities and equities need a quote provider before values can be shown")}</small></div><span className="status-pill pending">FEED PENDING</span></div><div className="empty-state"><div className="empty-icon"><BarChart3/></div><h3>{t("مصادر الأسعار قيد الربط","Market feeds are not connected")}</h3><p>{t("لن نعرض أسعاراً تجريبية على أنها أسعار حقيقية. سيتم تفعيل الذهب والفضة والنفط والمؤشرات عند ربط مزود موثوق.","No demo numbers will be presented as real quotes. Gold, silver, oil and indices will appear once a trusted provider is connected.")}</p></div></section>}
          {page==="companies"&&<section className="section-card jelly"><div className="section-title"><div><h3>{t("دليل الشركات العالمية","global company directory")}</h3><small>{t("قائمة شركات عالمية للاستكشاف؛ الأسعار غير متصلة بعد","Global company universe; quotes not connected yet")}</small></div><span className="status-pill pending">DIRECTORY</span></div><div className="search-box"><Search size={17}/><input value={companySearch} onChange={e=>setCompanySearch(e.target.value)} placeholder={t("ابحث بالاسم أو الرمز أو القطاع","Search name, ticker or sector")}/></div><div className="company-list">{companies.map(c=><div className="company-row" key={c[0]}><div className="company-avatar">{c[1].slice(0,1)}</div><div className="company-name"><b>{c[1]}</b><small>{c[0]} · {c[2]} · {c[3]}</small></div><span className="status-pill pending">{t("السعر غير متاح","QUOTE N/A")}</span></div>)}</div></section>}
          {page==="currency"&&<section className="currency-layout"><div className="section-card jelly"><div className="section-title"><div><h3>{t("محول العملات العالمي","Global currency converter")}</h3><small>{t("أسعار مرجعية يومية من Frankfurter / البنك المركزي الأوروبي","Daily reference rates via Frankfurter / ECB")}</small></div><button className="icon-btn" onClick={()=>loadRates(base)}><RefreshCw size={17}/></button></div><label>{t("المبلغ","Amount")}<input className="amount-input" type="number" min="0" value={amount} onChange={e=>setAmount(e.target.value)}/></label><div className="currency-pair"><label>{t("من","From")}<select value={base} onChange={e=>{setBase(e.target.value);loadRates(e.target.value)}}>{Object.keys(currencies).sort().map(c=><option key={c} value={c}>{c} — {currencies[c]}</option>)}</select></label><button className="swap-btn" onClick={()=>{setBase(quote);setQuote(base);loadRates(quote)}}><ArrowDownUp/></button><label>{t("إلى","To")}<select value={quote} onChange={e=>setQuote(e.target.value)}>{Object.keys(currencies).sort().map(c=><option key={c} value={c}>{c} — {currencies[c]}</option>)}</select></label></div><div className="conversion-result"><small>{t("النتيجة التقريبية","Indicative result")}</small><strong>{converted===null?"—":fmt(converted,6)} <i>{quote}</i></strong><span>{currencyDate?t("تاريخ السعر المرجعي: ","Reference rate date: ")+currencyDate:t("جارٍ تحميل تاريخ السعر","Loading rate date")}</span></div>{currencyError&&<p className="error-text">{currencyError}</p>}<p className="disclaimer">{t("أسعار مرجعية وليست أسعار بيع/شراء أو أسعار تحويل بنكية. قد لا تتوفر كل العملات في كل يوم.","Reference rates, not bank buy/sell rates. Some currencies may not be available every day.")}</p></div><div className="section-card jelly"><h3>{t("مصدر البيانات","Data source")}</h3><p className="muted">Frankfurter API · ECB reference rates</p><a className="source-link" href="https://www.frankfurter.dev/" target="_blank" rel="noreferrer">frankfurter.dev <ExternalLink size={14}/></a><p className="muted">{t("القائمة تُحمّل تلقائياً من المصدر؛ بعض العملات قد تكون غير مدعومة أو غير متداولة حالياً.","Currency list is loaded from the provider; some currencies may be unsupported or inactive.")}</p></div></section>}
          {page==="news"&&<section className="section-card jelly"><div className="section-title"><div><h3>{t("الأخبار المالية العالمية","Global financial news")}</h3><small>GDELT · {news.length} {t("عنواناً محملاً","headlines loaded")}</small></div><button className="icon-btn" onClick={loadNews}><RefreshCw size={17}/></button></div>{newsStatus==="loading"&&<p className="muted">{t("جارٍ تحميل الأخبار…","Loading headlines…")}</p>}{newsStatus==="error"&&<p className="error-text">{t("تعذر تحميل الأخبار. قد يمنع المتصفح الاتصال بالمصدر.","Could not load headlines. The provider may be unreachable.")}</p>}{news.map((n,i)=><a className="news-row full" key={n.url||i} href={n.url} target="_blank" rel="noreferrer"><span className="news-index">{String(i+1).padStart(2,"0")}</span><span><b>{n.title}</b><small>{n.domain||n.sourceCountry||"External source"} · {n.seendate||""}</small></span><ExternalLink size={14}/></a>)}</section>}
          {page==="ai"&&<section className="ai-layout"><div className="ai-intro jelly"><div className="ai-symbol"><Bot size={32}/><span/></div><div><div className="gold-kicker"><Sparkles size={14}/> LOCAL DATA ASSISTANT</div><h2>VOLKA <em>AI</em></h2><p>{t("مساعد محلي متخصص في فهرس المنصة والبيانات التي تم تحميلها. لا يحتاج إلى خدمة ذكاء اصطناعي خارجية، لكنه ليس نموذجاً لغوياً عاماً.","A local assistant for the platform directory and loaded data. No external AI service required; it is not a general-purpose language model.")}</p></div></div><div className="chat-panel jelly"><div className="chat-answer"><div className="bot-avatar"><Bot size={18}/></div><p>{answer}</p></div><div className="suggestions">{[t("سعر الذهب","Gold price"),t("سعر الدولار بالجنيه","USD to EGP"),t("شركة Apple","Apple company")].map(s=><button key={s} onClick={()=>setQuery(s)}>{s}</button>)}</div><div className="chat-input"><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()} placeholder={t("اسأل عن شركة أو عملة أو بيانات المنصة…","Ask about a company, currency or platform data…")}/><button className="send-button" onClick={askAI}><Sparkles size={17}/></button></div></div><div className="section-card jelly"><h3>{t("حدود المساعد الحالية","Current assistant scope")}</h3><p className="muted">{t("يفهرس الشركات والعملات ويستفيد من الأخبار المحملة. لا يدّعي امتلاك أسعار الأسهم أو السلع التاريخية قبل ربط مزودها وتخزين السجل.","It indexes companies and currencies and uses loaded headlines. It does not claim equity or commodity prices or historical series until a provider and storage are connected.")}</p></div></section>}
          {page==="settings"&&<section className="settings-grid"><div className="section-card jelly"><div className="section-title"><div><h3>{t("مظهر الزجاج","Glass appearance")}</h3><small>{t("تحكم مباشر في كثافة وشفافية طبقات الزجاج","Adjust glass layer transparency")}</small></div><span className="value-badge">{glass}%</span></div><label className="range-label">{t("شفافية الزجاج","Glass transparency")}<input type="range" min="12" max="82" value={glass} onChange={e=>setGlass(Number(e.target.value))}/><div className="range-ends"><span>12%</span><span>82%</span></div></label><div className="glass-preview"><div className="preview-jelly">{t("معاينة الزجاج","Glass preview")}<b>VOLKA</b></div></div><label className="toggle-row"><span>{t("تشغيل أنيميشن الانتقال","Page transition animations")}</span><input type="checkbox" checked={motionOn} onChange={e=>setMotionOn(e.target.checked)}/></label><label className="toggle-row"><span>{t("لغة الواجهة","Interface language")}</span><button className="lang-btn" onClick={()=>setLang(isAr?"en":"ar")}>{isAr?"العربية":"English"}</button></label></div><div className="section-card jelly"><h3>{t("ألوان VOLKA","VOLKA palette")}</h3><div className="swatches"><span style={{background:"#08090d"}}/><span style={{background:"#d6b15e"}}/><span style={{background:"#087d62"}}/><span style={{background:"#647ceb"}}/></div><p className="muted">{t("أسود عميق · ذهبي غني · أخضر زمردي · أزرق ياقوتي","Deep black · rich gold · emerald · sapphire")}</p><h3>{t("حالة الاتصالات","Connection status")}</h3><p className="muted">FX: {currencyDate||"Loading"} · News: {newsStatus}</p></div></section>}
        </PageMotion></AnimatePresence>
        <footer>VOLKA © 2026 <span>·</span> {t("البيانات حسب المصدر وتاريخ التحديث","Data shown with provider and update date")}</footer>
      </main>
    </div>
    <AnimatePresence>{notice&&<motion.div className="toast jelly" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}}>{notice}<button onClick={()=>setNotice("")}><X size={14}/></button></motion.div>}</AnimatePresence>
  </div>;
}