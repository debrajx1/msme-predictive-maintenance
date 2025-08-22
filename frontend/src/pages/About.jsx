import { FaTachometerAlt, FaExclamationTriangle, FaFileUpload, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    { icon: <FaTachometerAlt className="text-blue-400 w-6 h-6" />, title: "Live Metrics", text: "Temperature, vibration, and usage in real-time." },
    { icon: <FaExclamationTriangle className="text-yellow-400 w-6 h-6" />, title: "Predictive Alerts", text: "Failure risk scoring with actionable suggestions." },
    { icon: <FaFileUpload className="text-green-400 w-6 h-6" />, title: "Historical Data", text: "Upload data to improve ML model accuracy." },
    { icon: <FaLaptopCode className="text-purple-400 w-6 h-6" />, title: "Simple API", text: "Dashboard and API for easy day-to-day integration." },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 rounded-2xl bg-slate-800/50 backdrop-blur-md shadow-lg">
      <h2 className="text-3xl font-bold text-white">About</h2>
      <p className="text-slate-300 text-lg">
        This platform helps MSMEs reduce downtime using real-time monitoring, anomaly detection, and ML-based failure prediction.
        It’s designed to be affordable, scalable, and easy to integrate.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-4 p-5 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex-shrink-0">{f.icon}</div>
            <div>
              <h4 className="text-white font-semibold">{f.title}</h4>
              <p className="text-slate-200 text-sm mt-1">{f.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
