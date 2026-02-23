import { Link } from "wouter";
import { ShieldCheck, FileText, Scale, TrendingUp, ArrowRight, Bot } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI Complaint Analyzer",
      desc: "Instantly analyze your issue, detect emotional tone, and map it to consumer rights using advanced NLP."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Auto-Draft Legal Letters",
      desc: "Automatically generate formally structured complaint letters ready for submission or sharing."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Know Your Rights",
      desc: "Interactive education on your 6 fundamental consumer rights with real-life case studies."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "National Impact",
      desc: "Visualize transparent, anonymous data showing common scams and city-wise trends."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 inset-x-0 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute top-48 -left-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-50 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20"
            >
              <Scale className="h-4 w-4" />
              Empowering Rural & Urban India
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight tracking-tight mb-6"
            >
              {t("hero.title")}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="/file-complaint"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                {t("hero.cta")}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="/awareness"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-white text-foreground border-2 border-border shadow-sm hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300"
              >
                {t("nav.awareness")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground">How NyayAI Helps You</h2>
            <p className="mt-4 text-muted-foreground text-lg">Smart technology bridging the gap between consumers and justice.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border/60 hover-elevate group"
              >
                <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
