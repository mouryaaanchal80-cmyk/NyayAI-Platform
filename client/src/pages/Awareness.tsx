import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Shield, Eye, HandHeart, MessageSquare, Scale, BookOpen } from "lucide-react";

export default function Awareness() {
  const { t } = useLanguage();

  const rights = [
    {
      id: 1,
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: t("rights.right1.title"),
      description: t("rights.right1.desc"),
      case: "Example: A pressure cooker explodes due to a manufacturing defect. The consumer can claim damages."
    },
    {
      id: 2,
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: t("rights.right2.title"),
      description: t("rights.right2.desc"),
      case: "Example: A food package missing manufacturing date or ingredients list violates this right."
    },
    {
      id: 3,
      icon: <HandHeart className="h-8 w-8 text-primary" />,
      title: t("rights.right3.title"),
      description: t("rights.right3.desc"),
      case: "Example: A gas agency forcing you to buy a stove exclusively from them to get a connection."
    },
    {
      id: 4,
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: t("rights.right4.title"),
      description: t("rights.right4.desc"),
      case: "Example: A company ignores your customer service emails regarding a faulty product."
    },
    {
      id: 5,
      icon: <Scale className="h-8 w-8 text-primary" />,
      title: t("rights.right5.title"),
      description: t("rights.right5.desc"),
      case: "Example: You bought a defective laptop and the company refuses to honor the valid warranty."
    },
    {
      id: 6,
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: t("rights.right6.title"),
      description: t("rights.right6.desc"),
      case: "Example: Government initiatives and NGOs conducting camps to educate rural consumers."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-6"
          >
            <Shield className="h-10 w-10" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
          >
            {t("rights.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            {t("rights.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rights.map((right, idx) => (
            <motion.div
              key={right.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              
              <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                {right.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">{right.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {right.description}
              </p>
              
              <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                <p className="text-sm font-medium text-foreground italic">
                  "{right.case}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
