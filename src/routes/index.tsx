import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { set, get } from "idb-keyval";
import ReactMarkdown from "react-markdown";
import { createServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Lock,
  Zap,
  Infinity as InfinityIcon,
  Ban,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  Sun,
  Moon,
  Globe,
  Copy,
  Check,
  Printer,
  History,
  X,
  Briefcase,
  Code2,
  FileSearch,
  GraduationCap,
  User,
  LogOut,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export type Language = "en" | "es" | "pt" | "fr" | "hi" | "zh";

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Spanish",
  pt: "Portuguese",
  fr: "French",
  hi: "Hindi",
  zh: "Simplified Chinese"
};

export const translations: Record<Language, any> = {
  en: {
    uploadTab: "Upload File", pasteTab: "Paste Text", optimizeBtn: "Optimize Resume",
    analyzingPdf: "AI is optimizing your resume...",
    extractingConcepts: "formatting for ATS standards",
    uploadPdf: "Upload Resume",
    uploadAnother: "Optimize Another Resume",
    uploadNow: "Optimize Resume Now",
    dropPdf: "Drop your Resume here",
    browseFiles: "Browse Files",
    analyzing: "AI is analyzing your resume…",
    summaryReady: "Your ATS-friendly resume is ready",
    unlockFull: "Unlock Resume & Get 100 Credits for $1",
    noSignupNeeded: "(No signup needed)",
    useCredit: "Use 1 Credit (Remaining: ",
    remainingCredits: "Remaining Credits: ",
    copy: "Copy Text",
    copied: "Copied!",
    exportPdf: "Export PDF",
    activeCreditsHint: "You have active credits. Unlock your resume instantly!",
    noCreditsHint: "Unlock the optimized resume and get 100 lifetime credits.",
    importantNote: "⚠️ **Important Note:** You can use the service without an account, but please do not clear your browser data or change devices to avoid losing your credits.",
    badge: "Built for job seekers · Flexible pricing",
    heroTitle1: "Optimize & Format",
    heroTitle2: "Your Resume",
    heroTitle3: "in Seconds",
    heroSubtitle1: "Pay ",
    heroSubtitle2: "once",
    heroSubtitle3: ". Get ",
    heroSubtitle4: "ample credits for ATS-optimized resumes",
    heroSubtitle5: " forever. Zero monthly subscriptions.",
    secureTry: "Secure · No signup to try",
    dropzoneHint: "or tap to browse · .pdf files only · up to 50 MB",
    card1Title: "ATS-Friendly",
    card1Desc: "Formats your text to pass automated HR screening systems.",
    card2Title: "Lifetime Credits",
    card2Desc: "Your credits never expire. Use them for future updates.",
    card3Title: "No Subscriptions",
    card3Desc: "One-time payment. Never get charged monthly.",
    footer: "© 2026 ResumePing · Made for professionals, not shareholders.",
    paperPingDesc: "PDF Summarizer & Translator",
    bandPingDesc: "IELTS AI Grader",
    codePingDesc: "AI Code Cleaner",
    pitchPingDesc: "Freelance Proposal Generator",
    summaryReadyFor: "Summary ready for",
    summaryAndTranslationReadyFor: "Summary & Translation ready for",
    getUniversalCredits: "Get Universal Credits (Sign In)",
    securePayment: "Secure payment · One-time · No subscription",
    moreFromEcosystem: "MORE FROM DOLLARFIX ECOSYSTEM",
    signIn: "Sign In",
    signOut: "Sign Out",
    packagesPreview: "(Available: 100 for $1 | 300 for $2 | 500 for $3)",
    pkg1: "100 / $1",
    pkg2: "300 / $2",
    pkg3: "500 / $3"
  },
  es: {
    uploadTab: "Subir Archivo", pasteTab: "Pegar Texto", optimizeBtn: "Optimizar Currículum",
    analyzingPdf: "La IA está optimizando su currículum...",
    extractingConcepts: "formateando para estándares ATS",
    uploadPdf: "Subir Currículum",
    uploadAnother: "Optimizar Otro Currículum",
    uploadNow: "Optimizar Currículum Ahora",
    dropPdf: "Suelta tu Currículum aquí",
    browseFiles: "Buscar Archivos",
    analyzing: "La IA está analizando tu currículum…",
    summaryReady: "Tu currículum ATS está listo",
    unlockFull: "Desbloquear Currículum y Obtener 100 Créditos por $1",
    noSignupNeeded: "(No requiere registro)",
    useCredit: "Usar 1 Crédito (Restante: ",
    remainingCredits: "Créditos restantes: ",
    copy: "Copiar Texto",
    copied: "¡Copiado!",
    exportPdf: "Exportar PDF",
    activeCreditsHint: "Tienes créditos activos. ¡Desbloquea tu currículum al instante!",
    noCreditsHint: "Desbloquea el currículum optimizado y obtén 100 créditos de por vida.",
    importantNote: "⚠️ **Nota Importante:** Puedes usar el servicio sin cuenta, pero por favor no borres los datos de tu navegador ni cambies de dispositivo.",
    badge: "Creado para profesionales · Precios flexibles",
    heroTitle1: "Optimiza y Formatea",
    heroTitle2: "Tu Currículum",
    heroTitle3: "en Segundos",
    heroSubtitle1: "Paga ",
    heroSubtitle2: "una vez",
    heroSubtitle3: ". Obtén ",
    heroSubtitle4: "amplios créditos para currículums ATS",
    heroSubtitle5: " para siempre. Cero suscripciones mensuales.",
    secureTry: "Seguro · Sin registro para probar",
    dropzoneHint: "o haz clic para explorar · solo archivos .pdf · hasta 50 MB",
    card1Title: "Compatible con ATS",
    card1Desc: "Formatea tu texto para pasar los sistemas automáticos de RRHH.",
    card2Title: "Créditos de por Vida",
    card2Desc: "Tus créditos nunca caducan. Úsalos para futuras actualizaciones.",
    card3Title: "Sin Suscripciones",
    card3Desc: "Pago único. Nunca más se te cobrará mensualmente.",
    footer: "© 2026 ResumePing · Hecho para profesionales, no para accionistas.",
    paperPingDesc: "Resumidor de PDF",
    bandPingDesc: "Calificador IELTS",
    codePingDesc: "Limpiador de Código IA",
    pitchPingDesc: "Generador de Propuestas",
    summaryReadyFor: "Resumen listo para",
    summaryAndTranslationReadyFor: "Resumen y traducción listos para",
    getUniversalCredits: "Obtener Créditos Universales (Iniciar sesión)",
    securePayment: "Pago seguro · Pago único · Sin suscripción",
    moreFromEcosystem: "MÁS DEL ECOSISTEMA DOLLARFIX",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    packagesPreview: "(Disponibles: 100 por $1 | 300 por $2 | 500 por $3)",
    pkg1: "100 / $1",
    pkg2: "300 / $2",
    pkg3: "500 / $3"
  },
  pt: {
    uploadTab: "Enviar Arquivo", pasteTab: "Colar Texto", optimizeBtn: "Otimizar Currículo",
    analyzingPdf: "A IA está otimizando seu currículo...",
    extractingConcepts: "formatando para padrões ATS",
    uploadPdf: "Enviar Currículo",
    uploadAnother: "Otimizar Outro Currículo",
    uploadNow: "Otimizar Currículo Agora",
    dropPdf: "Solte seu Currículo aqui",
    browseFiles: "Procurar Arquivos",
    analyzing: "A IA está analisando seu currículo…",
    summaryReady: "Seu currículo ATS está pronto",
    unlockFull: "Desbloquear Currículo e Obter 100 Créditos por $1",
    noSignupNeeded: "(Não precisa de cadastro)",
    useCredit: "Usar 1 Crédito (Restante: ",
    remainingCredits: "Créditos restantes: ",
    copy: "Copiar Texto",
    copied: "Copiado!",
    exportPdf: "Exportar PDF",
    activeCreditsHint: "Você tem créditos ativos. Desbloqueie seu currículo instantaneamente!",
    noCreditsHint: "Desbloqueie o currículo otimizado e obtenha 100 créditos vitálicos.",
    importantNote: "⚠️ **Nota Importante:** Você pode usar o serviço sem uma conta, mas não limpe os dados do navegador nem mude de dispositivo.",
    badge: "Feito para profissionais · Preços flexíveis",
    heroTitle1: "Otimize e Formate",
    heroTitle2: "Seu Currículo",
    heroTitle3: "em Segundos",
    heroSubtitle1: "Pague ",
    heroSubtitle2: "uma vez",
    heroSubtitle3: ". Obtenha ",
    heroSubtitle4: "amplos créditos para currículos ATS",
    heroSubtitle5: " para sempre. Zero assinaturas mensais.",
    secureTry: "Seguro · Sem registro para testar",
    dropzoneHint: "ou clique para procurar · apenas arquivos .pdf · até 50 MB",
    card1Title: "Amigável ao ATS",
    card1Desc: "Formata seu texto para passar em sistemas automáticos de RH.",
    card2Title: "Créditos Vitalícios",
    card2Desc: "Seus créditos nunca expiram. Use-os para atualizações futuras.",
    card3Title: "Sem Assinaturas",
    card3Desc: "Pagamento único. Nunca mais seja cobrado mensalmente.",
    footer: "© 2026 ResumePing · Feito para profissionais, não para acionistas.",
    paperPingDesc: "Resumidor de PDF",
    bandPingDesc: "Avaliador IELTS",
    codePingDesc: "Limpador de Código IA",
    pitchPingDesc: "Gerador de Propostas",
    summaryReadyFor: "Resumo pronto para",
    summaryAndTranslationReadyFor: "Resumo e tradução prontos para",
    getUniversalCredits: "Obter Créditos Universais (Entrar)",
    securePayment: "Pagamento seguro · Pagamento único · Sem assinatura",
    moreFromEcosystem: "MAIS DO ECOSSISTEMA DOLLARFIX",
    signIn: "Entrar",
    signOut: "Sair",
    packagesPreview: "(Disponíveis: 100 por $1 | 300 por $2 | 500 por $3)",
    pkg1: "100 / $1",
    pkg2: "300 / $2",
    pkg3: "500 / $3"
  },
  fr: {
    uploadTab: "Télécharger Fichier", pasteTab: "Coller Texte", optimizeBtn: "Optimiser le CV",
    analyzingPdf: "L'IA optimise votre CV...",
    extractingConcepts: "formatage pour les normes ATS",
    uploadPdf: "Télécharger le CV",
    uploadAnother: "Optimiser un Autre CV",
    uploadNow: "Optimiser le CV Maintenant",
    dropPdf: "Déposez votre CV ici",
    browseFiles: "Parcourir les Fichiers",
    analyzing: "L'IA analyse votre CV…",
    summaryReady: "Votre CV compatible ATS est prêt",
    unlockFull: "Débloquer le CV et Obtenir 100 Crédits pour 1 $",
    noSignupNeeded: "(Aucune inscription requise)",
    useCredit: "Utiliser 1 Crédit (Restant : ",
    remainingCredits: "Crédits restants : ",
    copy: "Copier le Texte",
    copied: "Copié !",
    exportPdf: "Exporter PDF",
    activeCreditsHint: "Vous avez des crédits actifs. Débloquez votre CV instantanément !",
    noCreditsHint: "Débloquez le CV optimisé et obtenez 100 crédits à vie.",
    importantNote: "⚠️ **Note Importante :** Vous pouvez utiliser le service sans compte, mais n'effacez pas les données de votre navigateur ou ne changez pas d'appareil.",
    badge: "Conçu pour les pros · Tarification flexible",
    heroTitle1: "Optimisez et Formatez",
    heroTitle2: "Votre CV",
    heroTitle3: "en quelques Secondes",
    heroSubtitle1: "Payez ",
    heroSubtitle2: "une fois",
    heroSubtitle3: ". Obtenez ",
    heroSubtitle4: "d'amples crédits pour des CV ATS",
    heroSubtitle5: " pour toujours. Zéro abonnement mensuel.",
    secureTry: "Sécurisé · Sans inscription pour essayer",
    dropzoneHint: "ou cliquez pour parcourir · fichiers .pdf uniquement · jusqu'à 50 Mo",
    card1Title: "Compatible ATS",
    card1Desc: "Formate votre texte pour passer les systèmes de filtrage RH.",
    card2Title: "Crédits à Vie",
    card2Desc: "Vos crédits n'expirent jamais. Utilisez-les pour vos mises à jour.",
    card3Title: "Pas d'Abonnement",
    card3Desc: "Paiement unique. Plus jamais de facturation mensuelle.",
    footer: "© 2026 ResumePing · Fait pour les professionnels, pas pour les actionnaires.",
    paperPingDesc: "Résumeur de PDF",
    bandPingDesc: "Évaluateur IELTS",
    codePingDesc: "Nettoyeur de Code IA",
    pitchPingDesc: "Générateur de Propositions",
    summaryReadyFor: "Résumé prêt pour",
    summaryAndTranslationReadyFor: "Résumé et traduction prêts pour",
    getUniversalCredits: "Obtenir des Crédits Universels (Se connecter)",
    securePayment: "Paiement sécurisé · Paiement unique · Sans abonnement",
    moreFromEcosystem: "PLUS DE L'ÉCOSYSTÈME DOLLARFIX",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    packagesPreview: "(Disponibles : 100 pour 1 $ | 300 pour 2 $ | 500 pour 3 $)",
    pkg1: "100 / 1 $",
    pkg2: "300 / 2 $",
    pkg3: "500 / 3 $"
  },
  hi: {
    uploadTab: "फ़ाइल अपलोड करें", pasteTab: "टेक्स्ट पेस्ट करें", optimizeBtn: "रिज्यूमे ऑप्टिमाइज़ करें",
    analyzingPdf: "AI आपके रिज्यूमे को ऑप्टिमाइज़ कर रहा है...",
    extractingConcepts: "ATS मानकों के लिए फ़ॉर्मेटिंग",
    uploadPdf: "रिज्यूमे अपलोड करें",
    uploadAnother: "एक और रिज्यूमे अपलोड करें",
    uploadNow: "अभी रिज्यूमे ऑप्टिमाइज़ करें",
    dropPdf: "अपना रिज्यूमे यहाँ छोड़ें",
    browseFiles: "फ़ाइलें ब्राउज़ करें",
    analyzing: "AI आपके रिज्यूमे का विश्लेषण कर रहा है…",
    summaryReady: "आपका ATS-अनुकूल रिज्यूमे तैयार है",
    unlockFull: "रिज्यूमे अनलॉक करें और $1 में 100 क्रेडिट प्राप्त करें",
    noSignupNeeded: "(साइनअप की आवश्यकता नहीं)",
    useCredit: "1 क्रेडिट का उपयोग करें (शेष: ",
    remainingCredits: "शेष क्रेडिट: ",
    copy: "टेक्स्ट कॉपी करें",
    copied: "कॉपी किया गया!",
    exportPdf: "PDF निर्यात करें",
    activeCreditsHint: "आपके पास सक्रिय क्रेडिट हैं। अपना रिज्यूमे तुरंत अनलॉक करें!",
    noCreditsHint: "अनुकूलित रिज्यूमे अनलॉक करें और 100 आजीवन क्रेडिट प्राप्त करें।",
    importantNote: "⚠️ **महत्वपूर्ण नोट:** आप बिना खाते के सेवा का उपयोग कर सकते हैं, लेकिन कृपया अपने क्रेडिट खोने से बचने के लिए अपने ब्राउज़र डेटा को साफ़ न करें या डिवाइस न बदलें।",
    badge: "नौकरी चाहने वालों के लिए · लचीला मूल्य निर्धारण",
    heroTitle1: "ऑप्टिमाइज़ और फ़ॉर्मेट करें",
    heroTitle2: "अपना रिज्यूमे",
    heroTitle3: "कुछ ही सेकंड में",
    heroSubtitle1: "भुगतान करें ",
    heroSubtitle2: "एक बार",
    heroSubtitle3: "। प्राप्त करें ",
    heroSubtitle4: "ATS-अनुकूलित रिज्यूमे के लिए पर्याप्त क्रेडिट",
    heroSubtitle5: " हमेशा के लिए। कोई मासिक सदस्यता नहीं।",
    secureTry: "सुरक्षित · आज़माने के लिए कोई साइनअप नहीं",
    dropzoneHint: "या ब्राउज़ करने के लिए टैप करें · केवल .pdf फ़ाइलें · 50 MB तक",
    card1Title: "ATS-अनुकूल",
    card1Desc: "स्वचालित एचआर सिस्टम को पास करने के लिए आपके टेक्स्ट को फ़ॉर्मेट करता है।",
    card2Title: "आजीवन क्रेडिट",
    card2Desc: "आपके क्रेडिट कभी समाप्त नहीं होते। भविष्य के अपडेट के लिए उनका उपयोग करें।",
    card3Title: "कोई सदस्यता नहीं",
    card3Desc: "एकमुश्त भुगतान। फिर कभी मासिक शुल्क नहीं लगेगा।",
    footer: "© 2026 ResumePing · शेयरधारकों के लिए नहीं, पेशेवरों के लिए बनाया गया।",
    paperPingDesc: "PDF सारांशकर्ता",
    bandPingDesc: "IELTS एआई ग्रेडर",
    codePingDesc: "AI कोड क्लीनर",
    pitchPingDesc: "प्रस्ताव जनरेटर",
    summaryReadyFor: "के लिए सारांश तैयार है",
    summaryAndTranslationReadyFor: "के लिए सारांश और अनुवाद तैयार है",
    getUniversalCredits: "यूनिवर्सल क्रेडिट प्राप्त करें (साइन इन करें)",
    securePayment: "सुरक्षित भुगतान · एकमुश्त · कोई सदस्यता नहीं",
    moreFromEcosystem: "DOLLARFIX इकोसिस्टम से अधिक",
    signIn: "साइन इन करें",
    signOut: "साइन आउट करें",
    packagesPreview: "(उपलब्ध: $1 के लिए 100 | $2 के लिए 300 | $3 के लिए 500)",
    pkg1: "100 / $1",
    pkg2: "300 / $2",
    pkg3: "500 / $3"
  },
  zh: {
    uploadTab: "上传文件", pasteTab: "粘贴文本", optimizeBtn: "优化简历",
    analyzingPdf: "AI 正在优化您的简历...",
    extractingConcepts: "正在按 ATS 标准格式化",
    uploadPdf: "上传简历",
    uploadAnother: "优化另一份简历",
    uploadNow: "立即优化简历",
    dropPdf: "将简历拖放到此处",
    browseFiles: "浏览文件",
    analyzing: "AI 正在分析您的简历…",
    summaryReady: "您的 ATS 兼容简历已准备就绪",
    unlockFull: "只需 1 美元即可解锁简历并获得 100 个积分",
    noSignupNeeded: "(无需注册)",
    useCredit: "使用 1 个积分 (剩余: ",
    remainingCredits: "剩余积分: ",
    copy: "复制文本",
    copied: "已复制!",
    exportPdf: "导出 PDF",
    activeCreditsHint: "您有可用积分。立即解锁您的简历！",
    noCreditsHint: "解锁优化后的简历，获得100个终身积分。",
    importantNote: "⚠️ **重要提示：** 您可以在没有帐户的情况下使用该服务，但请不要清除浏览器数据或更换设备，以免丢失积分。",
    badge: "专为求职者打造 · 灵活定价",
    heroTitle1: "优化与格式化",
    heroTitle2: "您的简历",
    heroTitle3: "只需几秒钟",
    heroSubtitle1: "只需支付 ",
    heroSubtitle2: "一次",
    heroSubtitle3: "。永久获取 ",
    heroSubtitle4: "充足的 ATS 优化简历积分",
    heroSubtitle5: "。零月度订阅。",
    secureTry: "安全 · 免费试用，无需注册",
    dropzoneHint: "或点击浏览 · 仅限 .pdf 文件 · 最大 50 MB",
    card1Title: "ATS 兼容",
    card1Desc: "格式化您的文本以通过自动 HR 筛选系统。",
    card2Title: "终身积分",
    card2Desc: "您的积分永不过期。留作日后更新使用。",
    card3Title: "无订阅费",
    card3Desc: "一次性支付。再也不会有每月扣费。",
    footer: "© 2026 ResumePing · 为专业人士而非股东打造。",
    paperPingDesc: "PDF 摘要生成器",
    bandPingDesc: "雅思 AI 评分",
    codePingDesc: "AI 代码清理工具",
    pitchPingDesc: "自由职业提案生成器",
    summaryReadyFor: "摘要已准备就绪：",
    summaryAndTranslationReadyFor: "摘要与翻译已准备就绪：",
    getUniversalCredits: "获取通用积分（登录）",
    securePayment: "安全支付 · 一次性 · 无需订阅",
    moreFromEcosystem: "更多来自 DOLLARFIX 生态系统",
    signIn: "登录",
    signOut: "登出",
    packagesPreview: "(可用套餐: 1美元100积分 | 2美元300积分 | 3美元500积分)",
    pkg1: "100 / $1",
    pkg2: "300 / $2",
    pkg3: "500 / $3"
  }
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResumePing — Optimize Your Resume for ATS in Seconds" },
      {
        name: "description",
        content:
          "Pay $1 once. Get 100 AI ATS-friendly resume optimizations forever. Built for job seekers. No subscriptions.",
      },
      { property: "og:title", content: "ResumePing — AI ATS Resume Optimizer" },
      {
        property: "og:description",
        content: "Pay $1 once. 100 lifetime resume optimizations. No monthly fees.",
      },
    ],
  }),
  component: LandingPage,
});

const createCheckout = createServerFn({ method: "POST" }).handler(async () => {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "100 ATS Resume Optimizations",
            description: "Unlock full ATS-friendly resume formatting and optimization.",
          },
          unit_amount: 100, 
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://resumeping.dollarfix.net/?success=true",
    cancel_url: "https://resumeping.dollarfix.net",
  });

  return session.url;
});

const createCloudCheckout = createServerFn({ method: "POST" })
  .validator((data: { priceId: string; userId: string; returnUrl: string }) => data)
  .handler(async ({ data }) => {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: data.priceId, quantity: 1 }],
      mode: "payment",
      client_reference_id: data.userId,
      success_url: data.returnUrl,
      cancel_url: data.returnUrl,
    });
    return session.url;
  });

const generateSummary = createServerFn({ method: "POST" })
  .validator((data: { base64Data: string; mimeType: string; targetLanguage: string }) => data)
  .handler(async ({ data }) => {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `You are an expert ATS (Applicant Tracking System) optimizer and professional recruiter. I have provided a raw resume or CV text. 
    Your task is to completely rewrite, format, and optimize this resume to pass standard Western ATS platforms.
    
    Follow these strict rules:
    1. Extract all skills, experiences, and education.
    2. Rewrite bullet points using strong action verbs and quantify achievements where possible.
    3. Structure the output clearly with standard headings.
    4. Format the text beautifully using standard Markdown.
    5. IMPORTANT: ALL output MUST be written EXCLUSIVELY in ${data.targetLanguage}. Translate or transliterate all company names, job titles, and locations. Keep programming languages in English.
    6. CRITICAL: DO NOT output any conversational text, introductions, or explanations (e.g., do not say "Here is your resume"). Start immediately with the applicant's name. DO NOT wrap the response in markdown code blocks (\`\`\`). Output raw text only.`;
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: data.base64Data,
          mimeType: data.mimeType,
        },
      },
    ]);

    return result.response.text();
  });

type AppState = "idle" | "processing" | "locked" | "unlocked";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export type HistoryItem = {
  id: string;
  fileName: string;
  summary: string;
  date: number; 
};

const saveToHistory = async (fileName: string, summary: string) => {
  try {
    const currentHistory: HistoryItem[] = (await get("resumeping_history")) || [];
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      fileName,
      summary,
      date: Date.now(),
    };
    
    let updatedHistory = [newItem, ...currentHistory];
    
    if (updatedHistory.length > 15) {
      updatedHistory = updatedHistory.slice(0, 15);
    }
    
    await set("resumeping_history", updatedHistory);
  } catch (error) {
    console.error("Error saving to history:", error);
  }
};

function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [state, setState] = useState<AppState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [summaryResult, setSummaryResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem("resumeping_language") : null;
    return (savedLang as Language) || "en";
  });
  
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [pastedText, setPastedText] = useState("");

  useEffect(() => {
    localStorage.setItem("resumeping_language", language);
  }, [language]);

  const [userCredits, setUserCredits] = useState<number | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []); 

  useEffect(() => {
    const syncCredits = async () => {
      if (!session?.user) return; 

      const localCreditsStr = localStorage.getItem("resumeping_credits");
      const localCredits = parseInt(localCreditsStr || "0", 10);

      const { data: profile } = await supabase
        .from("profiles")
        .select("ping_credits")
        .eq("id", session.user.id)
        .single();

      let cloudCredits = profile?.ping_credits || 0;

      if (localCredits > 0) {
        cloudCredits += localCredits;
        const { error } = await supabase
          .from("profiles")
          .upsert({ id: session.user.id, ping_credits: cloudCredits });

        if (!error) {
          localStorage.removeItem("resumeping_credits"); 
        }
      }

      setUserCredits(cloudCredits);
      
      // ✅ الإغلاق الآلي للنافذة بمجرد نجاح تسجيل الدخول
      setIsAuthModalOpen(false);
    };

    syncCredits();
  }, [session]); 

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const storedCredits = localStorage.getItem('resumeping_credits');
    if (storedCredits !== null) {
      setUserCredits(parseInt(storedCredits, 10));
    } else {
      setUserCredits(0);
    }
  }, []);

  const runAIProcessing = async (file: File) => {
    setState("processing");
    try {
      const base64 = await fileToBase64(file);
      const resultText = await generateSummary({ 
        data: { 
          base64Data: base64, 
          mimeType: file.type,
          targetLanguage: languageNames[language] 
        } 
      });
      
      setUserCredits(prev => {
        if (prev !== null && prev > 0) {
          const newCredits = prev - 1;
          localStorage.setItem("resumeping_credits", newCredits.toString()); 
          return newCredits;
        }
        return prev;
      });

      setSummaryResult(resultText);
      await saveToHistory(file.name, resultText);
      setState("unlocked");
    } catch (error) {
      console.error("AI Error:", error);
      alert("An error occurred during summarization. Please try again.");
      setState("idle");
    }
  };

  useEffect(() => {
    const processPaidDocument = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const successType = urlParams.get("success");
      
      if (successType === "true" || successType === "cloud") {
        const savedPdf = await get("pending_pdf");
        
        if (savedPdf) {
          const file = savedPdf as File;
          setPdfFile(file);
          setFileName(file.name);
          
          if (successType === "true") {
            localStorage.setItem("resumeping_credits", "100");
          }
          
          window.history.replaceState({}, document.title, "/");
          await runAIProcessing(file);
        }
      }
    };
    processPaidDocument();
  }, []);

  const startProcessing = useCallback((file: File) => {
    setFileName(file.name);
    setPdfFile(file); 
    setState("processing");
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / 2200) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else setTimeout(() => setState("locked"), 250);
    };
    requestAnimationFrame(tick);
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (!f.name.toLowerCase().endsWith(".pdf")) return;
    startProcessing(f);
  };

  const handleUploadAction = () => {
    setState("idle");
    setFileName(null);
    setPdfFile(null);
    setSummaryResult(null);
    setProgress(0);
    
    appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
    setTimeout(() => {
      inputRef.current?.click();
    }, 100);
  };

  const handleTextSubmit = () => {
    if (!pastedText.trim()) return;
    setFileName("Pasted Resume Text");
    
    const virtualFile = new File([pastedText], "resume.txt", { type: "text/plain" });
    setPdfFile(virtualFile); 
    
    setState("processing");
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / 2200) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
      else setTimeout(() => setState("locked"), 250);
    };
    requestAnimationFrame(tick);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-display text-base font-semibold tracking-tight">
              ResumePing
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative inline-flex items-center mr-2">
              <Globe className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="h-9 appearance-none rounded-md border border-border bg-transparent dark:bg-background pl-9 pr-6 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                dir="ltr"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="fr">Français</option>
                <option value="hi">हिन्दी</option>
                <option value="zh">中文</option>
              </select>
            </div>
            
            {session ? (
              <button
                onClick={async () => await supabase.auth.signOut()}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:bg-destructive/10 hover:text-destructive mr-1"
                title={translations[language].signOut}
              >
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:bg-accent mr-1"
                title={translations[language].signIn}
              >
                <User className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:bg-accent mr-1"
              aria-label="View History"
            >
              <History className="h-4 w-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:bg-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={handleUploadAction}
              className="rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover sm:px-4"
            >
              {state === "idle" ? translations[language].uploadPdf : translations[language].uploadAnother}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[480px] bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]"
        />
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pb-16 sm:pt-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
           {translations[language].badge}
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {translations[language].heroTitle1}{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.62_0.18_200)] bg-clip-text text-transparent">
              {translations[language].heroTitle2}
            </span>{" "}
            {translations[language].heroTitle3}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            {translations[language].heroSubtitle1}
          <span className="font-semibold text-foreground">{translations[language].heroSubtitle2}</span>
          {translations[language].heroSubtitle3}
          <span className="font-semibold text-foreground">{translations[language].heroSubtitle4}</span>
          {translations[language].heroSubtitle5}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={handleUploadAction}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition hover:bg-primary-hover sm:w-auto"
            >
              <Upload className="h-5 w-5" />
              {state === "idle" ? translations[language].uploadNow : translations[language].uploadAnother}
            </button>
            
            {userCredits !== null && userCredits > 0 ? (
              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary shadow-soft animate-fade-in">
                <Zap className="h-4 w-4" />
                <span>{translations[language].remainingCredits}{userCredits}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-success" />
                {translations[language].secureTry}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* App core */}
      <section ref={appRef} className="px-4 pb-12 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6">
            {state === "idle" && (
              <IdleZone
                language={language}
                userCredits={userCredits}
                dragOver={dragOver}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onBrowse={() => inputRef.current?.click()}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pastedText={pastedText}
                setPastedText={setPastedText}
                onProcessText={handleTextSubmit}
              />
            )}

            {state === "processing" && <ProcessingState language={language} fileName={fileName} progress={progress} />}

            {state === "locked" && (
              <LockedResult 
                language={language} 
                fileName={fileName} 
                pdfFile={pdfFile} 
                onUseCredit={() => pdfFile && runAIProcessing(pdfFile)} 
                onCreditSpent={() => setUserCredits(prev => prev !== null && prev > 0 ? prev - 1 : prev)} 
                onOpenAuth={() => setIsAuthModalOpen(true)}
                userCredits={userCredits} 
                session={session} // 👈 تمرير الجلسة للمكون لتفعيل الاستجابة الذكية
              />
            )}
            {state === "unlocked" && <UnlockedResult language={language} summary={summaryResult} fileName={fileName} />}

            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {state !== "idle" && (
            <div className="mt-8 text-center">
              <button
                onClick={handleUploadAction}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground shadow-soft transition hover:bg-muted/50 hover:border-primary/30"
              >
                ← {translations[language].uploadAnother}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-border bg-surface px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          <ValueProp
            icon={<Zap className="h-5 w-5" />}
            title={translations[language].card1Title}
            desc={translations[language].card1Desc}
          />
          <ValueProp
            icon={<InfinityIcon className="h-5 w-5" />}
            title={translations[language].card2Title}
            desc={translations[language].card2Desc}
          />
          <ValueProp
            icon={<Ban className="h-5 w-5" />}
            title={translations[language].card3Title}
            desc={translations[language].card3Desc}
          />
        </div>
      </section>

      <CrossPromotion language={language} />
      <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
        {translations[language].footer}
      </footer>

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelect={(item) => {
          setFileName(item.fileName);
          setSummaryResult(item.summary);
          setState("unlocked"); 
          setIsHistoryOpen(false); 
          appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); 
        }}
      />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        // النافذة لم تعد تحتاج session بداخلها لأنها ستغلق آلياً بمجرد التسجيل
      />
    </div>
  );
}

function IdleZone({
  language,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowse,
  userCredits,
  activeTab,
  setActiveTab,
  pastedText,
  setPastedText,
  onProcessText
}: {
  language: Language;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowse: () => void;
  userCredits: number | null;
  activeTab: "upload" | "paste";
  setActiveTab: (tab: "upload" | "paste") => void;
  pastedText: string;
  setPastedText: (text: string) => void;
  onProcessText: () => void;
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex p-1 mb-6 rounded-lg bg-muted/50 border border-border w-full max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === "upload" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload className="h-4 w-4" /> {translations[language].uploadTab}
        </button>
        <button
          onClick={() => setActiveTab("paste")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === "paste" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="h-4 w-4" /> {translations[language].pasteTab}
        </button>
      </div>

      {activeTab === "upload" ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-12 text-center transition sm:py-16 animate-fade-in ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border bg-surface hover:border-primary/50"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-7 w-7" />
          </div>
          <div>
            <p className="text-base font-semibold">{translations[language].dropPdf}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {translations[language].dropzoneHint}
            </p>
          </div>
          <button
            onClick={onBrowse}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            <Upload className="h-4 w-4" />
            {translations[language].browseFiles}
          </button>
          
          {userCredits !== null && userCredits > 0 && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary shadow-soft animate-fade-in">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>{translations[language].remainingCredits}{userCredits}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col animate-fade-in w-full">
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your unformatted resume text here..."
            className="w-full min-h-[280px] p-4 text-sm bg-surface border border-border rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={onProcessText}
            disabled={pastedText.trim().length === 0}
            className="mt-4 mx-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-glow"
          >
            <FileText className="h-4 w-4" />
            {translations[language].optimizeBtn}
          </button>
        </div>
      )}
    </div>
  );
}

function ProcessingState({
  language,
  fileName,
  progress,
}: {
  language: Language;
  fileName: string | null;
  progress: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-4 py-12 text-center sm:py-16">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Loader2 className="h-7 w-7 animate-spin" />
      </div>
      <div>
        <p className="text-base font-semibold">{translations[language].analyzingPdf}</p>
        
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {fileName ?? "your-document.pdf"} · {translations[language].extractingConcepts}
        </p>
      </div>
      <div className="w-full max-w-sm">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.62_0.18_200)] transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

function LockedResult({
  language,
  fileName,
  pdfFile,
  onUseCredit,
  onCreditSpent,
  onOpenAuth,
  userCredits, 
  session, // 👈 الجلسة لمعرفة حالة المستخدم
}: {
  language: Language;
  fileName: string | null;
  pdfFile: File | null;
  onUseCredit: () => void;
  onCreditSpent: () => void;
  onOpenAuth: () => void;
  userCredits: number | null; 
  session: Session | null;
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState<string | null>(null);
  const credits = userCredits || 0;

  // الدفع المحلي القديم ($1)
  const handleAction = async () => {
    if (!pdfFile) return;

    if (credits > 0) {
      onUseCredit();
    } else {
      try {
        setIsRedirecting(true);
        await set("pending_pdf", pdfFile);
        const url = await createCheckout();
        if (url) {
          window.location.href = url;
        }
      } catch (error) {
        console.error("Payment error:", error);
        setIsRedirecting(false);
      }
    }
  };

  // الدفع السحابي الجديد عبر الأزرار المصغرة
  const handleCloudCheckout = async (priceId: string) => {
    if (!session?.user?.id) return;
    setLoadingPrice(priceId);
    try {
      const url = await createCloudCheckout({
        data: {
          priceId: priceId,
          userId: session.user.id,
          returnUrl: window.location.origin + window.location.pathname + "?success=cloud"
        }
      });
      if (url) {
        window.location.href = url;
      } else {
        alert("Payment link error.");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert("Error: " + (error.message || "Invalid setup."));
    } finally {
      setLoadingPrice(null);
    }
  };

  return (
    <div className="relative">
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span>{translations[language].summaryReadyFor} {fileName ?? "your-document.pdf"}</span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border bg-surface min-h-[350px]">
        <div
          aria-hidden
          className="space-y-3 p-6 text-sm leading-relaxed text-foreground/90 select-none"
          style={{ filter: "blur(6px)" }}
        >
          <p className="font-semibold">Key Takeaways</p>
          <p>The paper introduces a novel framework for distributed transformer training...</p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background/40 via-background/80 to-background p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 text-center shadow-glow sm:p-6">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              {credits > 0 ? <Zap className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
            </div>
            
            <h3 className="text-lg font-semibold tracking-tight">
              {translations[language].summaryReady}
            </h3>
            
            <p className="mt-1 text-sm text-muted-foreground">
              {credits > 0
                ? translations[language].activeCreditsHint
                : translations[language].noCreditsHint}
            </p>

            {credits > 0 ? (
              // 🌟 الحالة 1: يوجد رصيد (المعالجة المباشرة)
              <button
                onClick={handleAction}
                disabled={isRedirecting}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Zap className="h-4 w-4" />
                {translations[language].useCredit}{credits})
              </button>
            ) : session ? (
              // 🌟 الحالة 2: مسجل دخول + لا يوجد رصيد (الأزرار السحابية الثلاثة)
              <div className="mt-5 flex gap-2 w-full animate-fade-in">
                <button 
                  onClick={() => handleCloudCheckout("price_1UCMhMCXmAUBsCGpqKoXMw8x")}
                  disabled={loadingPrice !== null}
                  className="flex-1 flex flex-col items-center justify-center rounded-xl bg-surface border border-border text-foreground px-2 py-2 text-[11px] sm:text-xs font-semibold transition hover:bg-primary/5 hover:border-primary/50"
                >
                  {loadingPrice === "price_1UCMhMCXmAUBsCGpqKoXMw8x" ? <Loader2 className="h-4 w-4 animate-spin mb-1 text-primary" /> : <Zap className="h-4 w-4 mb-1 text-primary" />}
                  {translations[language].pkg1}
                </button>
                <button 
                  onClick={() => handleCloudCheckout("price_1UCMhMCXmAUBsCGpJa6TlFhe")}
                  disabled={loadingPrice !== null}
                  className="flex-1 flex flex-col items-center justify-center rounded-xl bg-surface border border-border text-foreground px-2 py-2 text-[11px] sm:text-xs font-semibold transition hover:bg-primary/5 hover:border-primary/50"
                >
                  {loadingPrice === "price_1UCMhMCXmAUBsCGpJa6TlFhe" ? <Loader2 className="h-4 w-4 animate-spin mb-1 text-primary" /> : <Zap className="h-4 w-4 mb-1 text-primary" />}
                  {translations[language].pkg2}
                </button>
                <button 
                  onClick={() => handleCloudCheckout("price_1UCMhMCXmAUBsCGpP2sLbdkN")}
                  disabled={loadingPrice !== null}
                  className="flex-1 flex flex-col items-center justify-center rounded-xl bg-surface border border-border text-foreground px-2 py-2 text-[11px] sm:text-xs font-semibold transition hover:bg-primary/5 hover:border-primary/50"
                >
                  {loadingPrice === "price_1UCMhMCXmAUBsCGpP2sLbdkN" ? <Loader2 className="h-4 w-4 animate-spin mb-1 text-primary" /> : <Zap className="h-4 w-4 mb-1 text-primary" />}
                  {translations[language].pkg3}
                </button>
              </div>
            ) : (
              // 🌟 الحالة 3: زائر (الدفع المحلي أو تسجيل الدخول السحابي)
              <div className="mt-5 flex flex-col gap-3 w-full">
                <button
                  onClick={handleAction}
                  disabled={isRedirecting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isRedirecting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                  {isRedirecting ? (
                    <span>Redirecting...</span>
                  ) : (
                    <div className="flex flex-col items-center leading-tight">
                      <span>{translations[language].unlockFull}</span>
                      <span className="text-sm font-medium opacity-90 mt-0.5">{translations[language].noSignupNeeded}</span>
                    </div>
                  )}
                </button>
                <div className="flex flex-col items-center w-full">
                  <button
                    onClick={onOpenAuth}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-surface border-2 border-primary/30 text-primary px-4 py-3 text-sm font-semibold transition hover:bg-primary/5 hover:border-primary"
                  >
                    <Globe className="h-4 w-4" />
                    {translations[language].getUniversalCredits}
                  </button>
                  <span className="mt-2 text-[11px] text-muted-foreground font-medium text-center opacity-80">
                    {translations[language].packagesPreview}
                  </span>
                </div>
              </div>
            )}

            {credits > 0 ? (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200 text-center text-balance">
                {translations[language].importantNote}
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                {translations[language].securePayment}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueProp({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="font-display text-base font-semibold tracking-tight">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function UnlockedResult({ language, summary, fileName }: { language: Language; summary: string | null; fileName: string | null }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative print-container">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-container, .print-container * { visibility: visible; }
          .print-container { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <span>{translations[language].summaryAndTranslationReadyFor} {fileName ?? "your-document.pdf"}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted/50"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? translations[language].copied : translations[language].copy}
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted/50"
          >
            <Printer className="h-3.5 w-3.5" />
            {translations[language].exportPdf}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap shadow-soft">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2 text-primary" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-5 mb-2 border-b border-border pb-1" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-medium mt-3 mb-1" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
            li: ({ node, ...props }) => <li className="text-foreground/90" {...props} />,
            p: ({ node, ...props }) => <p className="mb-3 text-foreground/90 leading-relaxed" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-bold text-foreground" {...props} />,
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function CrossPromotion({ language }: { language: Language }) {
  const apps = [
    { 
      name: "PaperPing", 
      desc: translations[language].paperPingDesc, 
      icon: FileSearch, 
      url: "https://paperping.dollarfix.net", 
      color: "text-[oklch(0.58_0.21_254)]", 
      bgHover: "hover:bg-[oklch(0.58_0.21_254)]/10 hover:border-[oklch(0.58_0.21_254)]/30" 
    },
    { 
      name: "BandPing", 
      desc: translations[language].bandPingDesc, 
      icon: GraduationCap, 
      url: "https://bandping.dollarfix.net", 
      color: "text-[oklch(0.45_0.18_25)]", 
      bgHover: "hover:bg-[oklch(0.45_0.18_25)]/10 hover:border-[oklch(0.45_0.18_25)]/30" 
    },
    { 
      name: "CodePing", 
      desc: translations[language].codePingDesc, 
      icon: Code2, 
      url: "https://codeping.dollarfix.net", 
      color: "text-[oklch(0.60_0.16_285)]", 
      bgHover: "hover:bg-[oklch(0.60_0.16_285)]/10 hover:border-[oklch(0.60_0.16_285)]/30" 
    },
    { 
      name: "PitchPing", 
      desc: translations[language].pitchPingDesc, 
      icon: Briefcase, 
      url: "https://pitchping.dollarfix.net", 
      color: "text-[oklch(0.70_0.17_45)]", 
      bgHover: "hover:bg-[oklch(0.70_0.17_45)]/10 hover:border-[oklch(0.70_0.17_45)]/30" 
    },
  ];

  return (
    <section className="border-t border-border bg-background px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center sm:text-left">
          {translations[language].moreFromEcosystem}
        </p>
        <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex shrink-0 snap-start items-center gap-3 rounded-full border border-border/50 bg-surface px-4 py-2 transition-all ${app.bgHover}`}
            >
              <div className={`${app.color} transition-transform group-hover:scale-110`}>
                <app.icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground leading-none">{app.name}</span>
                <span className="text-[10px] text-muted-foreground mt-1 leading-none">{app.desc}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HistoryDrawer({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: HistoryItem) => void;
}) {
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      get("resumeping_history").then((data) => {
        if (data) setHistoryList(data);
      });
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
      )}
      
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <History className="h-5 w-5 text-primary" />
            History
          </h2>
          <button 
            onClick={onClose} 
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex max-h-[calc(100vh-100px)] flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          {historyList.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center text-center text-muted-foreground">
              <History className="mb-3 h-8 w-8 opacity-20" />
              <p className="text-sm">No summary history yet.</p>
            </div>
          ) : (
            historyList.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="group flex flex-col items-start rounded-xl border border-border bg-surface p-4 text-left transition hover:border-primary/50 hover:bg-primary/5"
              >
                <span className="w-full truncate text-sm font-semibold text-foreground group-hover:text-primary">
                  {item.fileName}
                </span>
                <span className="mt-1.5 text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}


function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'linkedin_oidc') => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-fade-in">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="mt-2">
          <h2 className="mb-2 text-center text-xl font-bold tracking-tight text-foreground">
            Sign In / Register
          </h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Create an account to get universal credits across all apps.
          </p>

          {/* أزرار السوشيال ميديا المخصصة */}
          <div className="flex flex-col gap-3 mb-6">
            <button 
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center gap-3 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted/50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            <button 
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center gap-3 w-full rounded-lg border border-[#1877F2]/20 bg-[#1877F2]/5 text-[#1877F2] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#1877F2]/10"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign in with Facebook
            </button>

            <button 
              onClick={() => handleSocialLogin('linkedin_oidc')}
              className="flex items-center justify-center gap-3 w-full rounded-lg border border-[#0A66C2]/20 bg-[#0A66C2]/5 text-[#0A66C2] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#0A66C2]/10"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Sign in with LinkedIn
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* مكون سوبابيس الأساسي بدون الـ providers */}
          <Auth 
            supabaseClient={supabase} 
            appearance={{ theme: ThemeSupa }} 
            providers={[]} 
          />
        </div>
      </div>
    </div>
  );
}