import { useLanguage } from "@/lib/i18n";
import { useDashboardStats } from "@/hooks/use-complaints";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Loader2, Activity, Users, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

export default function Impact() {
  const { t } = useLanguage();
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  const totalComplaints = stats.totalComplaints || 0;
  const resolvedCases = stats.resolvedCases || 0;
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedCases / totalComplaints) * 100) : 0;

  return (
    <div className="min-h-screen bg-background pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">{t("impact.title")}</h1>
          <p className="text-xl text-muted-foreground">{t("impact.subtitle")}</p>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Complaints Logged", value: totalComplaints.toLocaleString(), icon: <Users />, color: "text-blue-700", bg: "bg-blue-50" },
            { label: "Resolved Successfully", value: resolvedCases.toLocaleString(), icon: <CheckCircle2 />, color: "text-emerald-700", bg: "bg-emerald-50" },
            { label: "Resolution Rate", value: `${resolutionRate}%`, icon: <Activity />, color: "text-indigo-700", bg: "bg-indigo-50" },
            { label: "High Risk Flags", value: "1,240", icon: <AlertTriangle />, color: "text-amber-700", bg: "bg-amber-50" }
          ].map((kpi, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-5 hover-elevate"
            >
              <div className={`p-4 rounded-xl ${kpi.bg} ${kpi.color}`}>
                {kpi.icon}
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bar Chart - City Trends */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-3xl border border-border shadow-sm"
          >
            <h3 className="text-xl font-bold text-foreground mb-8">City-wise Complaints</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.cityTrends || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="city" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <Tooltip 
                    cursor={{fill: '#F3F4F6'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                  />
                  <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart - Categories */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-3xl border border-border shadow-sm"
          >
            <h3 className="text-xl font-bold text-foreground mb-8">Complaints by Category</h3>
            <div className="h-[350px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categories || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="category"
                  >
                    {(stats.categories || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {(stats.categories || []).map((entry, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                  <span className="text-sm font-medium text-muted-foreground">{entry.category} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
