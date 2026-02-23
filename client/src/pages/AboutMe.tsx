import { motion } from "framer-motion";
import { User, GraduationCap, Heart, Code, Target, MapPin, School } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase"
          >
            About Me
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
          >
            Aanchal Mourya
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-primary font-medium"
          >
            Young Innovator Empowering Consumers Through AI
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Profile Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1"
          >
            <Card className="border-primary/10 shadow-sm overflow-hidden">
              <div className="aspect-square bg-slate-100 flex items-center justify-center border-b border-primary/5">
                <User className="w-24 h-24 text-slate-300" />
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Class 11th (Science)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <School className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Govt. Higher Secondary School, Deshgaon</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Khandwa, Madhya Pradesh</span>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 italic text-primary/80 text-center">
              "Driven by curiosity and purpose, I believe young minds can use technology to create real change in society."
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 space-y-10"
          >
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Who I Am
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I am a Class 11 Science student passionate about coding, web development, and solving real-world problems using technology. Alongside my studies, I am building strong technical skills to create impactful digital solutions. I believe technology can empower people and bring positive change to society.
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-none bg-slate-50/50 shadow-none p-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Education
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Currently pursuing Class 11 (Science) while learning web development to build strong technical skills.
                </p>
              </Card>

              <Card className="border-none bg-slate-50/50 shadow-none p-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Hobbies & Interests
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Coding, Designing, Problem Solving, Learning Technology, AI Innovation
                </p>
              </Card>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-primary" />
                My Coding Journey
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I came to know about coding through my school, Govt. Higher Secondary School, Deshgaon. Through continuous learning and practice, I am building confidence in technology.
              </p>
            </section>

            <section className="p-8 rounded-3xl bg-slate-900 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <Target className="w-6 h-6" />
                My Mission
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                My mission is to use Artificial Intelligence to spread awareness about consumer rights and help rural and semi-urban communities through NyayAI.
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
