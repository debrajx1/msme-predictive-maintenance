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
    <div className="bg-base-100 text-base-content min-h-screen px-4 py-16 mx-auto max-w-7xl space-y-16">
      {/* Hero */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-base-content">
            AI-Powered Predictive Maintenance
          </h1>
          <p className="mt-4 text-lg md:text-xl text-base-content/70">
            Minimize Downtime. Reduce Costs. Act Before Failure.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/dashboard" className="btn btn-primary btn-lg">Open Dashboard</Link>
            <Link to="/upload" className="btn btn-outline btn-lg">Upload Sensor Data</Link>
          </div>
        </motion.div>

        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="card bg-base-200/20 p-6 rounded-2xl shadow-xl backdrop-blur-md">
            <img src={industrialImg} alt="Industrial Machine" className="rounded-xl shadow-md" />
            <div className="mt-3 text-sm text-base-content/60">
              Visualize trends, detect anomalies, simulate impact, and predict failures with confidence scoring.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="card bg-base-200 p-6 rounded-xl shadow hover:shadow-lg flex flex-col items-start gap-2"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <f.icon className="text-primary w-6 h-6" />
            <h3 className="text-lg font-semibold text-base-content">{f.title}</h3>
            <p className="text-base-content/70 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
