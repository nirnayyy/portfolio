import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import FAQ2, { FAQItem } from "@/components/ui/8bit-faq2";

// Monochromatic black and white style
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
      "   - Engineer automated Python/pandas data pipelines, reducing multi-hour cleaning tasks to minutes; process and query business datasets of 50,000+ rows weekly.\n" +
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
      // Find matching item in custom list or fall back
      const match = customQuickAnswers.find(i => i.question === item.question);
      const answer = match ? match.answer.toUpperCase() : getAIResponse(userMsg);
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
      {/* Floating Minimal Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-[99999] px-3.5 py-2.5 bg-[#0B0B0C] text-[#F0F1F2] border border-white/20 hover:border-white/50 rounded-[3px] shadow-lg flex items-center gap-2 cursor-pointer transition-colors select-none font-mono text-xs tracking-wider uppercase group"
        )}
        aria-label="Open AI Assistant"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform"></span>
        <span className="font-semibold">AI Assistant</span>
      </button>

      {/* Editorial Chat Box */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 right-6 w-[400px] h-[520px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] z-[99999] flex flex-col bg-[#0B0B0C] text-white border border-white/20 rounded-[4px] shadow-2xl font-mono select-none overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
          )}
        >
          {/* Header Panel */}
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/10 bg-[#121214] text-white font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] font-semibold tracking-wider uppercase">
                NIRNAY-BOT · MEM-BANK
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="px-2 py-0.5 border border-white/20 font-mono text-[10px] text-neutral-400 hover:text-white hover:border-white/50 rounded-[2px] transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div 
            className={cn(
              "flex-1 overflow-y-auto p-4 space-y-4 bg-[#0B0B0C] font-mono retro-scrollbar-dark",
              messages.length === 0 ? "flex flex-col justify-center" : ""
            )}
          >
            {messages.length === 0 ? (
              /* Initial State: Render Quick Answers */
              <div className="w-full">
                <div className="text-center mb-3">
                  <div className="inline-block border border-[var(--border)] bg-[#121214] px-2 py-1 text-[9px] text-neutral-400 uppercase tracking-widest mb-2 font-mono">
                    ONLINE: AI PROTOCOL v1.0
                  </div>
                  <h3 className="text-xs font-semibold text-white uppercase mb-1">
                    Ask anything about Nirnay
                  </h3>
                  <p className="text-[10px] text-neutral-400 tracking-wider">
                    Select a query below or type your custom message
                  </p>
                </div>
                <FAQ2
                  title=""
                  description=""
                  items={customQuickAnswers}
                  onItemClick={handleQuickAnswerClick}
                  className="p-0 border-0 bg-transparent text-white"
                />
              </div>
            ) : (
              /* Conversation Messages list */
              <div className="space-y-4 font-mono">
                <div className="text-center">
                  <span className="text-[8px] text-neutral-500 tracking-[0.2em] uppercase font-mono border-b border-white/5 pb-1">
                    DIALOG ACTIVE
                  </span>
                </div>
                
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
                        "max-w-[85%] p-3 text-[11px] leading-relaxed relative rounded-[2px]",
                        msg.sender === "user"
                          ? "bg-white text-black font-medium border border-white"
                          : "bg-[#17171A] text-neutral-200 border border-white/10"
                      )}
                    >
                      <div className="text-[8px] text-neutral-400 uppercase mb-1 font-mono tracking-wider">
                        {msg.sender === "user" ? "[USER]" : "[AI_TRANSMIT]"}
                      </div>
                      <p className="whitespace-pre-wrap font-mono uppercase">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}

                {/* AI Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#17171A] text-neutral-400 border border-white/10 px-3 py-1.5 text-[10px] font-mono flex items-center gap-2 rounded-[2px]">
                      <span className="uppercase">RETRIEVING DATA BLOCKS</span>
                      <span className="terminal-blink font-bold">_</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Quick Answers Floating Back Button (If converation is active) */}
          {messages.length > 0 && (
            <div className="px-3 py-1.5 bg-[#121214] border-t border-white/10 flex justify-between items-center">
              <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-mono">
                DATA FEED CONNECTED
              </span>
              <button
                onClick={() => setMessages([])}
                className="text-[9px] font-medium text-neutral-400 hover:text-white uppercase font-mono cursor-pointer border border-white/10 px-2 py-0.5 rounded-[2px] hover:border-white/30"
              >
                RESET DIALOG
              </button>
            </div>
          )}

          {/* Footer Input Area */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-white/10 bg-[#121214] flex gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="> Ask about projects, experience, skills..."
              className="flex-1 bg-black text-white border border-white/15 outline-none px-3 py-2 text-[11px] font-mono focus:border-white/50 rounded-[2px] transition-colors"
            />
            <button
              type="submit"
              className="px-3.5 bg-white text-black font-mono text-[11px] font-semibold tracking-wider uppercase rounded-[2px] hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </>
  );
}
