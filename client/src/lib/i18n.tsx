import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: string;
}

const en: Translations = {
  "nav.home": "Home",
  "nav.fileComplaint": "File Complaint",
  "nav.awareness": "Know Your Rights",
  "nav.impact": "Impact Dashboard",
  "nav.gov": "Gov Resources",
  
  "hero.title": "Smart Consumer Justice Platform",
  "hero.subtitle": "Report unfair trade practices, understand your rights, and file complaints easily. Accessible for all citizens.",
  "hero.cta": "File a Complaint Now",
  
  "form.title": "Report an Issue",
  "form.desc": "Describe your issue below or use the voice input feature.",
  "form.complaint": "Complaint Description",
  "form.city": "City/District",
  "form.category": "Product/Service Category",
  "form.voice": "Voice Input",
  "form.recording": "Recording...",
  "form.analyze": "Analyze Complaint",
  "form.analyzing": "Analyzing...",
  
  "results.title": "Analysis Results",
  "results.issueType": "Identified Issue",
  "results.emotion": "Emotional Tone",
  "results.rights": "Consumer Rights Involved",
  "results.action": "Suggested Action",
  "results.probability": "Success Probability",
  "results.letter": "Auto-Generated Legal Letter",
  "results.copy": "Copy Text",
  "results.download": "Download PDF",
  "results.share": "Share on WhatsApp",
  
  "rights.title": "Know Your Consumer Rights",
  "rights.subtitle": "Under the Consumer Protection Act, you are guaranteed these 6 fundamental rights.",
  
  "impact.title": "National Impact Dashboard",
  "impact.subtitle": "Live analytics of consumer grievances across the country.",
  
  "gov.title": "Government Resources & Portals",
  "gov.subtitle": "Official channels to seek redressal and support.",
};

const hi: Translations = {
  "nav.home": "होम",
  "nav.fileComplaint": "शिकायत दर्ज करें",
  "nav.awareness": "अपने अधिकार जानें",
  "nav.impact": "प्रभाव डैशबोर्ड",
  "nav.gov": "सरकारी संसाधन",
  
  "hero.title": "स्मार्ट उपभोक्ता न्याय मंच",
  "hero.subtitle": "अनुचित व्यापार प्रथाओं की रिपोर्ट करें, अपने अधिकारों को समझें, और आसानी से शिकायत दर्ज करें। सभी नागरिकों के लिए सुलभ।",
  "hero.cta": "अभी शिकायत दर्ज करें",
  
  "form.title": "समस्या की रिपोर्ट करें",
  "form.desc": "अपनी समस्या का वर्णन करें या वॉयस इनपुट सुविधा का उपयोग करें।",
  "form.complaint": "शिकायत का विवरण",
  "form.city": "शहर/जिला",
  "form.category": "उत्पाद/सेवा श्रेणी",
  "form.voice": "वॉयस इनपुट (आवाज़)",
  "form.recording": "रिकॉर्ड हो रहा है...",
  "form.analyze": "शिकायत का विश्लेषण करें",
  "form.analyzing": "विश्लेषण हो रहा है...",
  
  "results.title": "विश्लेषण परिणाम",
  "results.issueType": "पहचानी गई समस्या",
  "results.emotion": "भावनात्मक स्वर",
  "results.rights": "शामिल उपभोक्ता अधिकार",
  "results.action": "सुझाए गए कदम",
  "results.probability": "सफलता की संभावना",
  "results.letter": "स्वचालित कानूनी पत्र",
  "results.copy": "कॉपी करें",
  "results.download": "पीडीएफ डाउनलोड करें",
  "results.share": "व्हाट्सएप पर शेयर करें",
  
  "rights.title": "अपने उपभोक्ता अधिकारों को जानें",
  "rights.subtitle": "उपभोक्ता संरक्षण अधिनियम के तहत, आपको इन 6 मौलिक अधिकारों की गारंटी दी गई है।",
  "rights.right1.title": "सुरक्षा का अधिकार",
  "rights.right1.desc": "खतरनाक वस्तुओं और सेवाओं से सुरक्षा का अधिकार।",
  "rights.right2.title": "सूचित होने का अधिकार",
  "rights.right2.desc": "उत्पादों की गुणवत्ता, मात्रा और कीमत के बारे में जानकारी।",
  "rights.right3.title": "चुनने का अधिकार",
  "rights.right3.desc": "प्रतिस्पर्धी कीमतों पर विभिन्न उत्पादों तक पहुंच।",
  "rights.right4.title": "सुने जाने का अधिकार",
  "rights.right4.desc": "उपयुक्त मंचों पर उपभोक्ता हितों पर विचार किया जाना।",
  "rights.right5.title": "निवारण का अधिकार",
  "rights.right5.desc": "अनुचित व्यापार प्रथाओं के खिलाफ न्याय पाने का अधिकार।",
  "rights.right6.title": "उपभोक्ता शिक्षा का अधिकार",
  "rights.right6.desc": "एक जागरूक उपभोक्ता बनने के लिए ज्ञान प्राप्त करना।",
  
  "impact.title": "राष्ट्रीय प्रभाव डैशबोर्ड",
  "impact.subtitle": "देश भर में उपभोक्ता शिकायतों का लाइव विश्लेषण।",
  "impact.stats.total": "कुल शिकायतें",
  "impact.stats.resolved": "सुलझाए गए मामले",
  "impact.stats.rate": "समाधान दर",
  "impact.stats.risk": "उच्च जोखिम वाले मामले",
  
  "gov.title": "सरकारी संसाधन और पोर्टल",
  "gov.subtitle": "निवारण और सहायता प्राप्त करने के आधिकारिक चैनल।",
  "gov.portal1.name": "ई-दाखिल (e-Daakhil)",
  "gov.portal1.desc": "उपभोक्ता शिकायतों को ऑनलाइन दर्ज करने का आधिकारिक पोर्टल।",
  "gov.portal2.name": "राष्ट्रीय उपभोक्ता हेल्पलाइन",
  "gov.portal2.desc": "उपभोक्ताओं के लिए सहायता और जानकारी के लिए टोल-फ्री नंबर।",
};

const dictionaries = { en, hi };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return dictionaries[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
