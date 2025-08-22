import { FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const contacts = [
    { icon: <FaEnvelope className="text-blue-400 text-xl" />, label: "Email", value: "support@msme-pm.example", href: "mailto:support@msme-pm.example" },
    { icon: <FaPhone className="text-green-400 text-xl" />, label: "Phone", value: "+91-000-000-0000", href: "tel:+910000000000" }
  ];

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6 rounded-2xl bg-slate-800/50 backdrop-blur-md shadow-lg">
      <h2 className="text-3xl font-bold text-white">Contact</h2>
      <p className="text-slate-300 text-lg">
        Questions, partnerships, or demo requests? Reach out to us:
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {contacts.map((c, i) => (
          <motion.a
            key={i}
            href={c.href}
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {c.icon}
            <div>
              <div className="text-slate-400 text-sm">{c.label}</div>
              <div className="text-slate-200 font-medium">{c.value}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
