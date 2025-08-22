import { Link } from "react-router-dom";
import industrialImg from "../assets/industrial.png";
import { motion } from "framer-motion";
import { Cpu, Bell, Activity, ShieldCheck } from "lucide-react";

export default function Home() {
  const features = [
    { icon: Cpu, title: "Real-Time Monitoring", desc: "Track machine health live." },
    { icon: Bell, title: "Predictive Alerts", desc: "Get notified before failures." },
    { icon: Activity, title: "Simulation & Impact", desc: "Estimate business impact." },
    { icon: ShieldCheck, title: "AI Confidence Score", desc: "Make informed decisions." }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 space-y-16">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
            AI-Powered Predictive Maintenance
          </h1>
          <p className="text-slate-400 mt-4 text-lg md:text-xl">
            Minimize Downtime. Reduce Costs. Act Before Failure.
          </p>
          <p className="mt-6 text-slate-300">
            Monitor machines in real-time, predict failures using AI, and gain actionable insights for your MSME.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              to="/dashboard" 
              className="bg-gradient-to-r from-blue-500 to-emerald-400 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Open Dashboard
            </Link>
            <Link 
              to="/upload" 
              className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
              Upload Sensor Data
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="bg-gradient-to-br from-blue-900/20 to-black/30 p-6 rounded-2xl shadow-xl backdrop-blur-md">
            <img src={industrialImg} alt="Industrial Machine" className="rounded-xl shadow-md" />
            <div className="text-sm text-slate-400 mt-3">
              Visualize trends, detect anomalies, simulate impact, and predict failures with confidence scoring.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div 
            key={i} 
            className="bg-slate-800/50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-start gap-2"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <f.icon className="text-blue-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">{f.title}</h3>
            <p className="text-slate-300 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
