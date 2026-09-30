import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import FAQ2, { FAQItem } from "@/components/ui/8bit-faq2";

// Minimal editorial monochrome chat — inherits the site's CSS variable theme system
interface Message {
  sender: "user" | "ai";
  text: string;
}

const customQuickAnswers: FAQItem[] = [
  {
    question: "Who is Nirnay?",
    answer: "Nirnay Pratap Singh is a 3rd-year Computer Science undergrad and AWS Certified AI Practitioner at Bennett University building full-stack applications, retrieval-augmented generation (RAG) pipelines, and cloud-deployed systems on AWS & Docker. Currently seeking SWE / cloud / GenAI internships!",
  },
  {
    question: "What is his work experience?",
    answer: "Data Analyst Intern (Automation & Analytics) at Lysandra Group (Jun 2026 – Aug 2026): Automated Python/pandas pipelines for 50k+ weekly rows; built 5+ SQL-backed KPI dashboards cutting reporting effort by ~40% and saving ~6 hrs/week. Former Management Head, Alt Reality Club (Aug 2024 – May 2025).",
  },
  {
    question: "What are his certifications?",
    answer: "AWS Certified AI Practitioner (AIF-C01), Oracle Agentic AI Certified Foundations Associate, Career Essentials in Generative AI by Microsoft & LinkedIn, AWS Academy Graduate (Cloud & Security Foundations), Anthropic AI Fluency, and Coursera ML Capstone.",
  },
  {
    question: "What is his tech stack?",
    answer: "Cloud & DevOps: AWS (EC2, S3, IAM, Lambda), Docker, Git/GitHub, Vercel, CI/CD. GenAI & ML: Agentic AI, RAG, LangChain, LangGraph, MCP Protocol, Amazon Bedrock, PyTorch, scikit-learn, pandas. Languages: Python, C++, Java, JavaScript, TypeScript, SQL. Databases: PostgreSQL, Supabase, MySQL, MongoDB.",
  },
  {
    question: "What projects did he build?",
    answer: "1. VeriPolicy (AI Policy Intelligence — RAG + PostgreSQL + Supabase + Llama 3.3, sub-2s briefs), 2. OpenEnv Code Review Agent (Meta PyTorch OpenEnv Hackathon, 93.3% baseline), 3. Air Sentinel AI (AQI regression system, 93% accuracy), 4. Elevare (mental health platform with Stripe + JWT).",
  },
  {
    question: "How do I contact him?",
    answer: "Email: nirnaysingh7@gmail.com | Phone: +91 7800029036 | Location: Greater Noida, Delhi NCR | GitHub: github.com/nirnayyy | LinkedIn: linkedin.com/in/nirnay-pratap-singh | LeetCode: leetcode.com/u/Nirnaysingh. Resume download available on page.",
  },
];

// Local rule-based AI parser that responds with exact text extracted from index.html
const getAIResponse = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes("who") || q.includes("profile") || q.includes("about") || q.includes("nirnay")) {
    return "MEM-BANK[0x01]: ABOUT NIRNAY\n" +
      "I'm Nirnay Pratap Singh, a 3rd-year Computer Science undergraduate and AWS Certified AI Practitioner at Bennett University focused on cloud infrastructure, applied GenAI, and full-stack systems engineering. My foundation spans Python, REST APIs, PostgreSQL, AWS, and Docker. I have shipped production systems including VeriPolicy (indexing 2M+ records across 47 jurisdictions) and an RL code-review benchmark for the Meta PyTorch OpenEnv Hackathon scoring 93.3%. Currently seeking software engineering internships focused on GenAI and cloud.";
  }

  if (q.includes("lysandra") || q.includes("intern") || q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("reality") || q.includes("club") || q.includes("leader")) {
    return "MEM-BANK[0x02]: EXPERIENCE DATA\n" +
      "1. DATA ANALYST INTERN (AUTOMATION & ANALYTICS) AT LYSANDRA GROUP (JUN 2026 - AUG 2026):\n" +
      "   - Engineer automated Python/pandas pipelines, reducing multi-hour cleaning tasks to minutes; process and query business datasets of 50,000+ rows weekly.\n" +
      "   - Architect 5+ SQL-backed dashboards for sales and operations KPIs, cutting manual reporting effort by approximately 40% and saving about 6 hours weekly; ship reusable reporting tools for 3 cross-functional teams.\n\n" +
      "2. MANAGEMENT HEAD AT ALT REALITY CLUB, BENNETT UNIVERSITY (AUG 2024 - MAY 2025):\n" +
      "   - Led a 12-person team to deliver 8+ technical events and workshops; grew membership 35% to 150+ students.";
  }

  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("school") || q.includes("cgpa") || q.includes("bennett")) {
    return "MEM-BANK[0x03]: EDUCATION ARCHIVE\n" +
      "1. B.TECH IN COMPUTER SCIENCE ENGINEERING, BENNETT UNIVERSITY (AUG 2024 - MAY 2028)\n" +
      "   - 3RD YEAR, 5TH SEMESTER | CLOUD COMPUTING COURSE GRADE: 9 / 10\n" +
      "   - CS FUNDAMENTALS: DATA STRUCTURES & ALGORITHMS, OOP, DBMS, OPERATING SYSTEMS, COMPUTER NETWORKS, SDLC.\n\n" +
      "2. XII — CBSE (1ST DIVISION), SUNBEAM INTERNATIONAL (MAR 2022)\n\n" +
      "3. X — CBSE (1ST DIVISION), TINY TOTS SR. SEC. SCHOOL (MAR 2020)";
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("tool") || q.includes("languages") || q.includes("python") || q.includes("react")) {
    return "MEM-BANK[0x04]: STACK & TOOLBOX\n" +
      "- CLOUD & DEVOPS: AWS (EC2, S3, IAM, Lambda), Docker, Git/GitHub, Vercel, CI/CD, Oracle Cloud (OCI).\n" +
      "- GENAI & ML: Machine Learning, Agentic AI, RAG, LangChain, LangGraph, Model Context Protocol (MCP), Large Language Models (LLMs), Amazon Bedrock, Amazon SageMaker, PyTorch, scikit-learn, pandas.\n" +
      "- LANGUAGES: Python, C++, Java, JavaScript (ES6+), TypeScript, SQL.\n" +
      "- BACKEND & APIS: FastAPI, Node.js, Express.js, REST APIs, JWT auth.\n" +
      "- DATABASES: PostgreSQL, Supabase (with RLS), MySQL, MongoDB.\n" +
      "- CS FUNDAMENTALS: DSA, OOP, DBMS, Operating Systems, Computer Networks, SDLC.\n" +
      "- FRONTEND: React.js, Tailwind CSS.";
  }

  if (q.includes("veripolicy") || q.includes("policy") || q.includes("simulator") || q.includes("veripolicy-lovable")) {
    return "MEM-BANK[0x0b]: PROJECT [VERIPOLICY - AI POLICY INTELLIGENCE PLATFORM]\n" +
      "FULL-STACK POLICY INTELLIGENCE PLATFORM INDEXING 2M+ RECORDS ACROSS 47 JURISDICTIONS TO PRODUCE REFERENCED FORESIGHT BRIEFS IN UNDER TWO SECONDS.\n" +
      "FEATURES:\n" +
      "  - ENGINEERED RAG PIPELINE ON LLAMA 3.3-70B GROUNDING CLAIMS IN PRIMARY-SOURCE SIPRI & OWID DATA.\n" +
      "  - NORMALIZED POSTGRESQL SCHEMA WITH RLS AND VECTOR SEARCH FOR MULTI-TENANT ISOLATION.\n" +
      "  - INGESTS DATA VIA LIVE NEWSDATA PIPELINE, DEPLOYED ON VERCEL WITH ENVIRONMENT SECRETS.\n" +
      "TECH: REACT, TYPESCRIPT, POSTGRESQL, SUPABASE, RAG, LLAMA 3.3, VECTOR EMBEDDINGS, VERCEL.";
  }

  if (q.includes("openenv") || q.includes("review") || q.includes("agent") || q.includes("llama")) {
    return "MEM-BANK[0x05]: PROJECT [OPENENV CODE REVIEW AGENT]\n" +
      "Built an RL environment for the Meta PyTorch OpenEnv Hackathon x SST where AI agents tackle automated code review tasks. Llama 3.3-70B hit a 93.3% average baseline.\n" +
      "FEATURES:\n" +
      "  - 3-tier benchmark covering bug detection, logic errors & SQL injection with partial-credit reward shaping.\n" +
      "  - Dockerized with clean REST API (FastAPI) endpoints (/reset, /step, /state).\n" +
      "TECH: Python, FastAPI, Docker, Reinforcement Learning, Meta PyTorch OpenEnv.";
  }

  if (q.includes("elevare") || q.includes("mental") || q.includes("health") || q.includes("stripe")) {
    return "MEM-BANK[0x06]: PROJECT [ELEVARE - MENTAL HEALTH PLATFORM]\n" +
      "Full-stack mental health app for students with peer support, appointment booking, and Stripe subscription gateways.\n" +
      "FEATURES:\n" +
      "  - JWT-based auth with role-based access control.\n" +
      "  - 12+ RESTful endpoints with optimized MongoDB schemas.\n" +
      "TECH: React, Node.js, Express, MongoDB, Stripe, JWT.";
  }

  if (q.includes("airsentinel") || q.includes("air sentinel") || q.includes("aqi") || q.includes("sentinel") || q.includes("sensor")) {
    return "MEM-BANK[0x07]: PROJECT [AIR SENTINEL AI - AQI MONITOR]\n" +
      "AIR QUALITY INGESTION, REGRESSION, AND LIVE-DASHBOARD SYSTEM USING 2+ YEARS OF HISTORICAL DATA, INFERENCE EVERY 5 MINUTES, AND INDEXED MONGODB STORAGE FOR 10,000+ TIME-SERIES RECORDS.\n" +
      "TECH: REACT, PYTHON, SCIKIT-LEARN, MONGODB, REST APIS.";
  }

  if (q.includes("project") || q.includes("build") || q.includes("portfolio")) {
    return "MEM-BANK[0x08]: PORTFOLIO PROJECTS\n" +
      "1. VERIPOLICY: AI Policy Intelligence Platform (React, TypeScript, PostgreSQL, Supabase, RAG, Llama 3.3, Vercel).\n" +
      "2. OPENENV CODE REVIEW AGENT: RL Benchmark for Meta PyTorch OpenEnv Hackathon x SST (Python, FastAPI, Docker, PyTorch).\n" +
      "3. AIR SENTINEL AI: AQI Monitor & Regression (React, Python, scikit-learn, MongoDB, REST APIs).\n" +
      "4. ELEVARE: Mental Health Platform (React, Node.js, Express, MongoDB, Stripe, JWT).";
  }

  if (q.includes("hackathon") || q.includes("sih") || q.includes("achievement") || q.includes("win") || q.includes("pytorch")) {
    return "MEM-BANK[0x09]: VERIFIED ACHIEVEMENTS\n" +
      "- SMART INDIA HACKATHON: Qualified for and competed in the national rounds in 2024 and 2025.\n" +
      "- META PYTORCH OPENENV HACKATHON × SST 2026: Designed code-review benchmark; baseline agent scored 93.3%.\n" +
      "- ALT REALITY CLUB: Scaled membership 35% to 150+ students across 8+ technical events as Management Head.";
  }

  if (q.includes("certification") || q.includes("aws") || q.includes("certified") || q.includes("anthropic") || q.includes("oracle")) {
    return "MEM-BANK[0x0a]: CERTIFICATIONS\n" +
      "- AWS CERTIFIED AI PRACTITIONER: Amazon Web Services (AIF-C01) · Credly\n" +
      "- ORACLE AGENTIC AI CERTIFIED FOUNDATIONS ASSOCIATE · Oracle CertView\n" +
      "- CAREER ESSENTIALS IN GENERATIVE AI BY MICROSOFT & LINKEDIN\n" +
      "- AWS ACADEMY GRADUATE: Cloud Foundations & Cloud Security Foundations\n" +
      "- ANTHROPIC AI FLUENCY: FRAMEWORK AND FOUNDATIONS\n" +
      "- MACHINE LEARNING CAPSTONE — COURSERA";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("mail") || q.includes("linkedin") || q.includes("github") || q.includes("leetcode")) {
    return "MEM-BANK[0x0c]: CONTACT DETAILS\n" +
      "- EMAIL: nirnaysingh7@gmail.com\n" +
      "- PHONE: +91 7800029036\n" +
      "- LOCATION: Greater Noida, Delhi NCR\n" +
      "- LINKEDIN: linkedin.com/in/nirnay-pratap-singh\n" +
      "- LEETCODE: leetcode.com/u/Nirnaysingh\n" +
      "- GITHUB: github.com/nirnayyy\n" +
      "- PORTFOLIO: https://nirnayyy-portfolio.vercel.app\n" +
      "- RESUME: Nirnay_Pratap_Singh_Resume_final.pdf (Available for direct download).";
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greet")) {
    return "SYSTEM ONLINE. WELCOME USER. ASK ME ANYTHING ABOUT NIRNAY'S PROJECTS, SKILLS, WORK EXPERIENCE, EDUCATION, HACKATHONS, OR HIS CONTACT INFO. ALL DATA RETRIEVED DIRECTLY FROM THE WEBSITE DATA BLOCKS.";
  }

  return "MEM-BANK[0x00]: QUERY NOT RECOGNIZED. SYSTEM RETRIEVAL RANGE: 'WHO', 'EXPERIENCE', 'SKILLS', 'PROJECTS', 'EDUCATION', 'HACKATHONS', 'CERTIFICATIONS', OR 'CONTACT'. TYPE A KEYWORD TO ACCESS DIGITAL ARTIFACTS.";
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages list changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Handle Quick Answer click
  const handleQuickAnswerClick = (item: FAQItem) => {
    const userMsg = item.question;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);

    setIsTyping(true);
    setTimeout(() => {
      const match = customQuickAnswers.find((i) => i.question === item.question);
      const answer = match ? match.answer : getAIResponse(userMsg);
      setMessages((prev) => [...prev, { sender: "ai", text: answer }]);
      setIsTyping(false);
    }, 800);
  };

  // Handle custom text send
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputVal("");

    setIsTyping(true);
    setTimeout(() => {
      const response = getAIResponse(userText);
      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating minimal trigger — editorial pill matching the site chrome */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className={cn(
          "fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[99999] h-10 pl-4 pr-4 md:pr-5 flex items-center gap-2.5",
          "border border-[var(--border-hover)] rounded-full cursor-pointer select-none",
          "bg-[var(--card-bg)]/90 backdrop-blur-md text-[var(--text)]",
          "font-mono text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase",
          "shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300",
          "hover:border-[var(--text-muted)] hover:-translate-y-0.5"
        )}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--text)] opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--text)]" />
        </span>
        <span>{isOpen ? "Close" : "Ask AI"}</span>
      </button>

      {/* Editorial chat panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-[4.5rem] right-4 left-4 md:left-auto md:right-6 w-auto md:w-[380px] h-[min(560px,72vh)] z-[99999]",
            "flex flex-col overflow-hidden rounded-lg border border-[var(--border-hover)]",
            "bg-[var(--bg)]/95 backdrop-blur-xl text-[var(--text)]",
            "shadow-[0_24px_70px_rgba(0,0,0,0.5)]",
            "animate-in fade-in slide-in-from-bottom-3 duration-200"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-lg leading-none tracking-wide">
                NIRNAY<span className="text-[var(--accent)]">.</span>BOT
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                Online
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text)] cursor-pointer"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div
            className={cn(
              "flex-1 overflow-y-auto px-4 py-4 space-y-4",
              messages.length === 0 ? "flex flex-col justify-center" : ""
            )}
          >
            {messages.length === 0 ? (
              <div className="w-full">
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--text-muted)] mb-2 text-center">
                  Local Knowledge Base
                </p>
                <h3 className="text-center font-sans text-base font-semibold text-[var(--text)] mb-1.5">
                  Ask anything about Nirnay
                </h3>
                <p className="text-center font-sans text-xs text-[var(--text-muted)] mb-4">
                  Pick a prompt or type your own
                </p>
                <FAQ2
                  title=""
                  description=""
                  items={customQuickAnswers}
                  onItemClick={handleQuickAnswerClick}
                  className="p-0 border-0 bg-transparent text-[var(--text)]"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[88%] rounded-xl px-3.5 py-2.5 text-[12px] leading-relaxed font-sans",
                        msg.sender === "user"
                          ? "bg-[var(--text)] text-[var(--bg)] rounded-br-sm"
                          : "border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-secondary)] rounded-bl-sm"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 rounded-xl rounded-bl-sm border border-[var(--border)] bg-[var(--card-bg)] px-3.5 py-3">
                      <span className="h-1 w-1 rounded-full bg-[var(--text-muted)] animate-bounce [animation-delay:0ms]" />
                      <span className="h-1 w-1 rounded-full bg-[var(--text-muted)] animate-bounce [animation-delay:150ms]" />
                      <span className="h-1 w-1 rounded-full bg-[var(--text-muted)] animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Footer actions */}
          {messages.length > 0 && (
            <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--text-faint)]">
                Synced with portfolio data
              </span>
              <button
                onClick={() => setMessages([])}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors hover:text-[var(--text)] cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-[var(--border)] p-3">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about projects, skills…"
              className="flex-1 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 font-sans text-xs text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--border-hover)]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--text)] text-[var(--bg)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
