import { useLanguage } from "@/lib/i18n";
import { Phone, ExternalLink, ShieldCheck, FileSearch, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function GovResources() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-16 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">{t("gov.title")}</h1>
          <p className="text-xl text-muted-foreground">{t("gov.subtitle")}</p>
        </div>

        <div className="space-y-8">
          
          {/* NCH Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 md:p-10 border-2 border-primary/20 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-10"></div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="bg-primary text-primary-foreground p-5 rounded-2xl">
                <Phone className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">National Consumer Helpline</h2>
                <p className="text-muted-foreground text-lg mt-2">Toll-Free Grievance Registration</p>
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-border">
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Call Anywhere in India</p>
                <p className="text-5xl font-display font-black text-primary tracking-tight">1915</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Alternate Number</p>
                <p className="text-2xl font-bold text-foreground">1800-11-4000</p>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <a href="tel:1915" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                <Phone className="h-5 w-5" /> Call Now
              </a>
              <a href="https://consumerhelpline.gov.in/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-white border border-border text-foreground rounded-xl font-semibold hover:bg-secondary transition-colors inline-flex items-center gap-2">
                Visit Website <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* e-Daakhil Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="bg-accent/10 text-accent p-5 rounded-2xl shrink-0">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-3">e-Daakhil Portal</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A hassle-free, speedy, and inexpensive facility to conveniently approach Consumer Commissions online without needing to travel to the commission office.
                </p>
                
                <h4 className="font-bold text-foreground mb-4">Steps to File online:</h4>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3 items-start">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">1</span>
                    <span className="text-muted-foreground">Register an account on the e-Daakhil portal using your mobile number and email.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">2</span>
                    <span className="text-muted-foreground">Upload the Auto-Generated Legal Letter created by NyayAI along with evidence (receipts, photos).</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">3</span>
                    <span className="text-muted-foreground">Pay the nominal fee online and submit your case to the respective district forum.</span>
                  </li>
                </ul>

                <a href="https://edaakhil.nic.in/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-2">
                  Go to e-Daakhil <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
