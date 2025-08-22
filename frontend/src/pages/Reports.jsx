// src/pages/Reports.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();

  const reportCards = [
    {
      title: "Monthly Usage",
      description: "Displays the usage metrics of each machine over the past month.",
      path: "/reports/monthly-usage",
    },
    {
      title: "Failure Predictions Summary",
      description: "Overview of predicted failures and risk levels for all machines.",
      path: "/reports/failure-summary",
    },
    {
      title: "Cost Savings",
      description: "Estimate cost savings based on predictive maintenance insights.",
      path: "/reports/cost-savings",
    },
    {
      title: "Custom Reports",
      description: "Generate downloadable reports filtered by machine, date, or risk level.",
      path: "/reports/custom",
    },
  ];

  const handleClick = (path) => {
    navigate(path); // navigate to another route
  };

  return (
    <motion.div
      className="p-6 mx-auto max-w-5xl space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-white">Reports</h1>
      <p className="text-slate-400">
        View machine performance, historical data, and predictive analytics reports here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCards.map((card) => (
          <motion.div
            key={card.title}
            className="card p-5 bg-[#1a1c24] rounded-xl shadow-md text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleClick(card.path)}
          >
            <h2 className="font-semibold mb-2">{card.title}</h2>
            <p className="text-slate-300 text-sm">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
