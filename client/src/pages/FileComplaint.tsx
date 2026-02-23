import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Mic, Square, Loader2, ArrowRight, Copy, Download, Share2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAnalyzeComplaint, useSpeechToText, ComplaintAnalysis } from "@/hooks/use-complaints";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";

// Assuming we have access to the provided integration hook
// We fallback to a mock if the hook is missing in the environment for safety
import { useVoiceRecorder } from "../../replit_integrations/audio/useVoiceRecorder";

export default function FileComplaint() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const analyzeMutation = useAnalyzeComplaint();
  const sttMutation = useSpeechToText();
  
  // Try to use the hook, if it fails at runtime we catch it gracefully
  let recorder: any = { state: "idle", startRecording: async () => {}, stopRecording: async () => new Blob() };
  try {
    recorder = useVoiceRecorder();
  } catch (e) {
    console.warn("Audio integration missing, UI will gracefully downgrade");
  }

  const [formData, setFormData] = useState({
    description: "",
    city: "",
    category: ""
  });
  const [result, setResult] = useState<ComplaintAnalysis | null>(null);

  const handleVoiceToggle = async () => {
    if (recorder.state === "recording") {
      const blob = await recorder.stopRecording();
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        sttMutation.mutate(base64, {
          onSuccess: (data) => {
            setFormData(prev => ({
              ...prev,
              description: prev.description + (prev.description ? " " : "") + data.text
            }));
          }
        });
      };
      reader.readAsDataURL(blob);
    } else {
      await recorder.startRecording();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description) return;
    
    analyzeMutation.mutate(formData, {
      onSuccess: (data) => {
        setResult(data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.generatedLetter);
    toast({ title: "Copied to clipboard!" });
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(result.generatedLetter, 180);
    doc.text(splitText, 15, 15);
    doc.save("NyayAI-Complaint-Letter.pdf");
    toast({ title: "PDF Downloaded!" });
  };

  const handleWhatsApp = () => {
    if (!result) return;
    const url = `https://wa.me/?text=${encodeURIComponent(result.generatedLetter)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl border border-border/50 overflow-hidden"
            >
              <div className="bg-primary px-8 py-10 text-primary-foreground">
                <h1 className="text-3xl font-display font-bold mb-3">{t("form.title")}</h1>
                <p className="text-primary-foreground/80 text-lg">{t("form.desc")}</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-foreground">{t("form.complaint")}</label>
                    <Button 
                      type="button"
                      variant={recorder.state === "recording" ? "destructive" : "outline"}
                      size="sm"
                      onClick={handleVoiceToggle}
                      className={`gap-2 rounded-full ${recorder.state === "recording" ? "animate-pulse-fast shadow-lg shadow-destructive/40" : ""}`}
                    >
                      {recorder.state === "recording" ? (
                        <><Square className="h-4 w-4 fill-current" /> {t("form.recording")}</>
                      ) : (
                        <><Mic className="h-4 w-4" /> {t("form.voice")}</>
                      )}
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(p => ({...p, description: e.target.value}))}
                      placeholder="Describe what happened in detail... (You can use Hindi or English)"
                      className="w-full min-h-[200px] p-5 rounded-2xl bg-secondary/50 border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base resize-none"
                      required
                    />
                    {sttMutation.isPending && (
                      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">{t("form.city")}</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData(p => ({...p, city: e.target.value}))}
                      placeholder="e.g. Mumbai, Maharashtra"
                      className="w-full p-4 rounded-xl bg-secondary/50 border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground">{t("form.category")}</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(p => ({...p, category: e.target.value}))}
                      className="w-full p-4 rounded-xl bg-secondary/50 border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      required
                    >
                      <option value="">Select Category...</option>
                      <option value="electronics">Electronics</option>
                      <option value="ecommerce">E-Commerce</option>
                      <option value="telecom">Telecommunications</option>
                      <option value="finance">Banking & Finance</option>
                      <option value="travel">Travel & Hospitality</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={analyzeMutation.isPending || !formData.description}
                  className="w-full py-6 text-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all group"
                >
                  {analyzeMutation.isPending ? (
                    <><Loader2 className="mr-3 h-6 w-6 animate-spin" /> {t("form.analyzing")}</>
                  ) : (
                    <>{t("form.analyze")} <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-display font-bold text-foreground">{t("results.title")}</h2>
              </div>

              {/* Analysis Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">{t("results.issueType")}</h3>
                  <p className="text-xl font-semibold text-foreground">{result.issueType}</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">{t("results.emotion")}</h3>
                  <p className="text-xl font-semibold text-foreground">{result.emotionalTone}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm md:col-span-2">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">{t("results.rights")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.rights.map((right, idx) => (
                      <span key={idx} className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm border border-primary/20">
                        {right}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-accent/30 shadow-sm md:col-span-2 bg-gradient-to-br from-white to-green-50/50">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">{t("results.action")}</h3>
                      <p className="text-lg text-foreground font-medium">{result.suggestedAction}</p>
                    </div>
                    <div className="w-32 h-32 relative flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" className="stroke-muted fill-none" strokeWidth="12" />
                        <circle cx="64" cy="64" r="56" className="stroke-accent fill-none" strokeWidth="12" strokeDasharray="351" strokeDashoffset={351 - (351 * result.successProbability) / 100} strokeLinecap="round" />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-2xl font-bold text-foreground">{result.successProbability}%</span>
                        <span className="block text-[10px] text-muted-foreground uppercase font-bold">Success<br/>Prob.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generated Letter */}
              <div className="bg-white rounded-3xl border border-border shadow-xl overflow-hidden">
                <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {t("results.letter")}
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={handleCopy} className="gap-2">
                      <Copy className="h-4 w-4" /> <span className="hidden sm:inline">{t("results.copy")}</span>
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleDownloadPDF} className="gap-2">
                      <Download className="h-4 w-4" /> <span className="hidden sm:inline">{t("results.download")}</span>
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleWhatsApp} className="gap-2 bg-green-500 hover:bg-green-600 text-white border-none">
                      <Share2 className="h-4 w-4" /> <span className="hidden sm:inline">{t("results.share")}</span>
                    </Button>
                  </div>
                </div>
                <div className="p-8 bg-slate-50">
                  <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-border/50 rounded-xl font-serif text-slate-800 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                    {result.generatedLetter}
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-8">
                <Button variant="outline" onClick={() => setResult(null)} className="rounded-full px-8 py-6">
                  File Another Complaint
                </Button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
