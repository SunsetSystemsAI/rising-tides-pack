"use client";

import { motion } from "framer-motion";
import { CheckCircle, Mail, Github, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          You're in!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-400 mb-12"
        >
          Welcome to Rising Tides. Here's what happens next.
        </motion.p>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-12"
        >
          <div className="flex items-start gap-4 p-6 rounded-2xl border border-[#2a2a3a] bg-[#151520]/50 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Check your email</h3>
              <p className="text-gray-400 text-sm">
                You'll receive a confirmation email with your receipt and next steps within a few minutes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl border border-[#2a2a3a] bg-[#151520]/50 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Github className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">GitHub repo invite</h3>
              <p className="text-gray-400 text-sm">
                You'll get an invite to the private Rising Tides GitHub repo. Accept it to access all 170 skills and 37 plugins.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl border border-[#2a2a3a] bg-[#151520]/50 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Done-With-You customers</h3>
              <p className="text-gray-400 text-sm">
                If you purchased Done-With-You, you'll also receive a Cal.com link to book your 45-minute setup call with Nick.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://www.skool.com/rising-tides-9034"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl transition-all"
          >
            Join the Community
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#2a2a3a] hover:border-amber-500/50 rounded-xl transition-all"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-gray-500 text-sm"
        >
          Questions? Email{" "}
          <a href="mailto:nick@sunsetsystems.co" className="text-amber-500 hover:underline">
            nick@sunsetsystems.co
          </a>
        </motion.p>
      </div>
    </main>
  );
}
