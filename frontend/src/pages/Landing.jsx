import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LandingNavbar from "../components/LandingNavbar.jsx";

const features = [
  { title: "Real-Time Monitoring", description: "Monitor your machines continuously and predict failures before they happen." },
  { title: "Cost Reduction", description: "Reduce downtime and maintenance costs with intelligent predictions." },
  { title: "Seamless Integration", description: "Integrates easily with existing MSME workflows and data sources." },
];

const achievements = [
  { title: "500+ Machines Monitored", description: "Our solution actively monitors hundreds of machines across MSMEs." },
  { title: "200+ MSMEs Served", description: "Trusted by MSMEs nationwide to reduce downtime and costs." },
  { title: "98% Uptime Success", description: "Significant improvement in operational uptime for our clients." },
];

const clients = ["Client A", "Client B", "Client C", "Client D"];

const testimonials = [
  { name: "Ravi Kumar", role: "Owner, XYZ Industries", message: "This predictive maintenance system saved us hundreds of hours of downtime!" },
  { name: "Sita Sharma", role: "Manager, ABC Manufacturing", message: "Our machines are running smoothly thanks to the real-time monitoring alerts." },
  { name: "Amit Joshi", role: "Engineer, LMN Pvt Ltd", message: "The analytics and reports are incredibly useful for planning maintenance schedules." },
];

const faqs = [
  { question: "How quickly can I integrate this system?", answer: "Our solution can be integrated within a few days depending on your setup." },
  { question: "Do you support small-scale MSMEs?", answer: "Yes, we have starter plans specifically designed for small businesses." },
  { question: "Can I track multiple machines at once?", answer: "Absolutely, our dashboard supports monitoring of hundreds of machines in real-time." },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <LandingNavbar />

      {/* Hero */}
      <section className="hero min-h-screen text-center flex flex-col justify-center px-6 pt-20"
        style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }} // optional gradient
      >
        <motion.div
          className="hero-content flex-col"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Predictive Maintenance for MSMEs</h1>
          <p className="mb-8 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
            Reduce downtime, cut costs, and embrace Industry 4.0 with our smart, AI-powered predictive maintenance solution.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/login")}>Get Started</button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              className="card bg-base-100 shadow-xl rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="card-body">
                <h3 className="card-title">{f.title}</h3>
                <p>{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-6 bg-base-200 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Achievements</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {achievements.map((a, idx) => (
            <motion.div
              key={idx}
              className="card bg-base-100 shadow-xl rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="card-body">
                <h3 className="card-title">{a.title}</h3>
                <p>{a.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 px-6 text-center max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Our Clients</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {clients.map((c, idx) => (
            <motion.div
              key={idx}
              className="badge badge-outline text-lg"
              whileHover={{ scale: 1.05 }}
            >
              {c}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-200 py-12 text-center">
        <p className="mb-4 text-lg">Ready to take your MSME to the next level?</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/login")}>Login to Continue</button>
      </footer>
    </div>
  );
};

export default Landing;
