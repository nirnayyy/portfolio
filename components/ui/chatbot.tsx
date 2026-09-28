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
    answer: "Nirnay Pratap Singh is a B.Tech CSE undergrad (3rd year) at Bennett University focused on cloud infrastructure and applied GenAI, with a full-stack foundation across databases, REST APIs, and production deployment. Currently seeking SWE / cloud / applied AI internships!",
  },
  {
    question: "What is his work experience?",
    answer: "Data Analyst Intern at Lysandra Group (Jun 2025 – Present): 50k+ row datasets weekly, 5+ SQL dashboards (~40% less manual reporting), pandas automation (~6 hrs/week saved). Former Management Head, Alt Reality Club, Bennett University.",
  },
  {
    question: "What are his achievements?",
    answer: "Meta PyTorch OpenEnv Hackathon × SST 2026 (93.3% Llama 3.3 baseline), Smart India Hackathon national rounds 2024 & 2025, and grew Alt Reality Club to 150+ members (+35%).",
  },
  {
    question: "What is his tech stack?",
    answer: "Cloud & DevOps: AWS (EC2, S3, IAM, Lambda), Docker, Git/GitHub, Vercel, CI/CD. AI & GenAI: RAG, vector embeddings, Llama 3.3, pandas, scikit-learn. Languages: C++, Java, Python, SQL, JavaScript, TypeScript. Backend: Node.js, Express, FastAPI, JWT. Databases: PostgreSQL, MySQL, MongoDB. Frontend: React, TypeScript, Tailwind.",
  },
  {
    question: "What projects did he build?",
    answer: "1. VeriPolicy (AI Policy Intelligence — RAG + PostgreSQL + Llama 3.3), 2. OpenEnv Code Review Agent (Meta PyTorch Hackathon, 93.3% baseline), 3. Air Sentinel AI (AQI monitor, 93% accuracy), 4. Elevare (mental health platform with Stripe + JWT).",
  },
  {
    question: "How do I contact him?",
    answer: "Email: nirnaysingh7@gmail.com | Phone: +91 7800029036 | Location: Greater Noida, Delhi NCR | GitHub: github.com/nirnayyy | LinkedIn: linkedin.com/in/nirnay-pratap-singh. Resume download is on the page.",
  },
];

// Local rule-based AI parser that responds with exact text extracted from index.html
const getAIResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes("who") || q.includes("profile") || q.includes("about") || q.includes("nirnay")) {
    return "MEM-BANK[0x01]: ABOUT NIRNAY\n" +
      "I'm Nirnay Pratap Singh, a Computer Science undergraduate (B.Tech, 3rd year) at Bennett University focused on cloud infrastructure and applied GenAI, with a full-stack engineering foundation spanning database design, REST APIs, and production deployment. I've shipped RAG pipelines, vector search, and multi-tenant PostgreSQL systems on AWS and Vercel. Comfortable owning a feature end to end and turning ambiguous requirements into reliable, secure software. Currently seeking SWE, cloud, or applied AI internships.";
  }
  
  if (q.includes("lysandra") || q.includes("intern") || q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("reality") || q.includes("club") || q.includes("leader")) {
    return "MEM-BANK[0x02]: EXPERIENCE DATA\n" +
      "1. DATA ANALYST INTERN AT LYSANDRA GROUP (JUN 2025 - PRESENT):\n" +
      "   - Cleaned and queried 50,000+ row business datasets weekly, surfacing insights that informed stakeholder decisions on resource allocation and campaign spend.\n" +
      "   - Built and maintained 5+ SQL dashboards tracking sales and operations KPIs, reducing manual reporting effort by around 40% and freeing roughly 6 hours a week for deeper analysis.\n" +
      "   - Automated recurring data-cleaning workflows in Python (pandas), cutting multi-hour processes down to minutes with no manual steps.\n" +
      "   - Partnered with 3 cross-functional teams, translating vague data requests into structured, reusable weekly reports used in leadership reviews.\n\n" +
      "2. MANAGEMENT HEAD AT ALT REALITY CLUB, BENNETT UNIVERSITY (AUG 2024 - MAY 2025):\n" +
      "   - Led a 12-person core team to deliver 8+ technical events and workshops, growing club membership 35% to 150+ active students over the academic year.";
  }
  
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("school") || q.includes("cgpa") || q.includes("bennett")) {
    return "MEM-BANK[0x03]: EDUCATION ARCHIVE\n" +
      "1. B.TECH — COMPUTER SCIENCE ENGINEERING, BENNETT UNIVERSITY (AUG 2024 - MAY 2028)\n" +
      "   - 3RD YEAR, 5TH SEMESTER | CGPA: 7.64 / 10\n" +
      "   - CLOUD COMPUTING COURSE GRADE: 9 / 10\n" +
      "   - RELEVANT COURSEWORK: CLOUD COMPUTING, DATA STRUCTURES & ALGORITHMS, DESIGN & ANALYSIS OF ALGORITHMS, DBMS, OS, COMPUTER NETWORKS, OOP.\n\n" +
      "2. XII — CBSE (1ST DIVISION), SUNBEAM INTERNATIONAL (MAR 2022)\n\n" +
      "3. X — CBSE (1ST DIVISION), TINY TOTS SR. SEC. SCHOOL (MAR 2020)";
  }
  
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("tool") || q.includes("languages") || q.includes("python") || q.includes("react")) {
    return "MEM-BANK[0x04]: STACK & TOOLBOX\n" +
      "- CLOUD & DEVOPS: AWS (EC2, S3, IAM, Lambda), Docker, Git/GitHub, Vercel, CI/CD.\n" +
      "- AI & GENAI: RAG, vector embeddings, LLM integration (Llama 3.3), pandas, scikit-learn, SQL analytics.\n" +
      "- LANGUAGES: C++, Java, Python, SQL, JavaScript (ES6+), TypeScript.\n" +
      "- BACKEND & APIS: Node.js, Express.js, FastAPI, JWT auth.\n" +
      "- DATABASES: PostgreSQL, MySQL, MongoDB.\n" +
      "- FRONTEND: React.js, TypeScript, Tailwind CSS, responsive design.\n" +
      "- CS FUNDAMENTALS: DSA, OOP, DBMS, OS, Computer Networks, SDLC.";
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
      "Built an RL environment for the Meta PyTorch OpenEnv Hackathon where AI agents tackle automated code review tasks. Llama 3.3-70B hit a 93.3% average baseline.\n" +
      "FEATURES:\n" +
      "  - 3-tier benchmark covering bug detection, logic errors & SQL injection.\n" +
      "  - Partial-credit reward shaping for nuanced agent training.\n" +
      "  - Dockerized with clean REST API (FastAPI) endpoints.\n" +
      "TECH: Python, FastAPI, Docker, RL, PyTorch.";
  }
  
  if (q.includes("elevare") || q.includes("mental") || q.includes("health") || q.includes("stripe")) {
    return "MEM-BANK[0x06]: PROJECT [ELEVARE - MENTAL HEALTH PLATFORM]\n" +
      "Full-stack mental health app for isolated students across India with peer support, professional booking, and self-help resources. Stripe-integrated premium subscriptions.\n" +
      "FEATURES:\n" +
      "  - JWT-based auth with role-based access control.\n" +
      "  - 12+ RESTful endpoints with optimized MongoDB schemas.\n" +
      "  - Fully responsive React frontend — zero layout breakage.\n" +
      "TECH: React, Node.js, Express, MongoDB, Stripe, JWT.";
  }
  
  if (q.includes("airsentinel") || q.includes("air sentinel") || q.includes("aqi") || q.includes("sentinel") || q.includes("sensor")) {
    return "MEM-BANK[0x07]: PROJECT [AIR SENTINEL AI - AQI MONITOR]\n" +
      "AIR QUALITY MONITORING SYSTEM WITH A REGRESSION MODEL TRAINED ON 2+ YEARS OF AQI DATA ACHIEVING 93% ACCURACY ON HELD-OUT TEST SETS, WITH REAL-TIME SENSOR READINGS PIPED INTO A REACT DASHBOARD.\n" +
      "FEATURES:\n" +
      "  - REAL-TIME SENSOR DATA EVERY 5 MIN WITH LIVE CHARTS.\n" +
      "  - MONGODB BACKEND HANDLES 10,000+ TIME-SERIES RECORDS.\n" +
      "  - SELF-CONTAINED: INGESTION, INFERENCE & FRONTEND IN ONE PACKAGE.\n" +
      "TECH: REACT, PYTHON, SCIKIT-LEARN, MONGODB, REST APIS.";
  }
  
  if (q.includes("project") || q.includes("build") || q.includes("portfolio")) {
    return "MEM-BANK[0x08]: PORTFOLIO PROJECTS\n" +
      "1. VERIPOLICY: AI POLICY INTELLIGENCE PLATFORM. TECH: REACT, TYPESCRIPT, POSTGRESQL, SUPABASE, RAG, LLAMA 3.3, VECTOR EMBEDDINGS, VERCEL.\n\n" +
      "2. OPENENV CODE REVIEW AGENT: RL ENV FOR META PYTORCH OPENENV HACKATHON. TECH: PYTHON, FASTAPI, DOCKER, RL, PYTORCH.\n\n" +
      "3. AIR SENTINEL AI - AQI MONITOR: AQI REGRESSION MODEL ACHIEVING 93% ACCURACY + LIVE REACT DASHBOARD. TECH: REACT, PYTHON, SCIKIT-LEARN, MONGODB, REST APIS.\n\n" +
      "4. ELEVARE - MENTAL HEALTH PLATFORM: FULL-STACK MENTAL HEALTH APP WITH PEER SUPPORT & BOOKING. TECH: REACT, NODE.JS, EXPRESS, MONGODB, STRIPE, JWT.";
  }
  
  if (q.includes("hackathon") || q.includes("sih") || q.includes("achievement") || q.includes("win") || q.includes("pytorch")) {
    return "MEM-BANK[0x09]: VERIFIED ACHIEVEMENTS\n" +
      "- META PYTORCH OPENENV HACKATHON × SST 2026: AI code-review agent hit a 93.3% average baseline.\n" +
      "- SMART INDIA HACKATHON (SIH): Qualified and competed in the national finals in both 2024 and 2025 rounds.\n" +
      "- ALT REALITY CLUB: Grew membership to 150+ active students as Management Head.";
  }
  
  if (q.includes("certification") || q.includes("aws") || q.includes("certified") || q.includes("anthropic")) {
    return "MEM-BANK[0x0a]: CERTIFICATIONS\n" +
      "- AWS ACADEMY GRADUATE — CLOUD FOUNDATIONS\n" +
      "- AWS ACADEMY GRADUATE — CLOUD SECURITY FOUNDATIONS\n" +
      "- ANTHROPIC AI FLUENCY: FRAMEWORK AND FOUNDATIONS\n" +
      "- MACHINE LEARNING CAPSTONE — COURSERA";
  }
  
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("mail") || q.includes("linkedin") || q.includes("github")) {
    return "MEM-BANK[0x0c]: CONTACT DETAILS\n" +
      "- EMAIL: nirnaysingh7@gmail.com\n" +
      "- PHONE: +91 7800029036\n" +
      "- LOCATION: Greater Noida, Delhi NCR\n" +
      "- GITHUB: github.com/nirnayyy\n" +
      "- LINKEDIN: linkedin.com/in/nirnay-pratap-singh\n" +
      "- PORTFOLIO: https://nirnayyy-portfolio.vercel.app\n" +
      "- RESUME: Available for download on this page.";
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
