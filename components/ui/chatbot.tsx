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
    answer: "Nirnay Pratap Singh is a Computer Science Engineering student at Bennett University. He enjoys full-stack development, cloud computing, AI/ML, and data analytics. Currently seeking software engineering internships!",
  },
  {
    question: "What is his work experience?",
    answer: "Data Analyst Intern at Lysandra Group (Jan 2025 – Present) weekly processing 50k+ row datasets, building SQL dashboards, and saving 40% time. Former Bennett Alt Reality Club Management Head.",
  },
  {
    question: "What are his achievements?",
    answer: "Competed in Meta PyTorch OpenEnv Hackathon 2026 (93.3% agent baseline), qualified for Smart India Hackathon (SIH) national finals in 2024 & 2025, and expanded Bennett's Alt Reality Club to 150+ members.",
  },
  {
    question: "What is his tech stack?",
    answer: "Languages: JS, Python, Java, HTML5/CSS3, SQL. Frontend: React, Tailwind. Backend: Node, Express, FastAPI, REST, JWT. Databases: MongoDB, MySQL. DevOps/AI: Git/GitHub, Docker, AWS, pandas, scikit-learn, PyTorch.",
  },
  {
    question: "What projects did he build?",
    answer: "1. OpenEnv Code Review Agent (Meta PyTorch Hackathon, 93.3% baseline), 2. Elevare (Full-stack mental health React app with Stripe), 3. Air Sentinel AI (AQI Monitor achieving 87% prediction accuracy).",
  },
  {
    question: "How do I contact him?",
    answer: "Email: nirnaysingh7@gmail.com | Phone: +91 78000XXXXX | Location: Greater Noida, Delhi NCR | Links: GitHub (github.com/nirnayyy), LinkedIn. Resume download is in page footer.",
  },
];

// Local rule-based AI parser that responds with exact text extracted from index.html
const getAIResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes("who") || q.includes("profile") || q.includes("about") || q.includes("nirnay")) {
    return "MEM-BANK[0x01]: ABOUT NIRNAY\n" +
      "I'm Nirnay Pratap Singh, a Computer Science Engineering student at Bennett University passionate about building impactful digital products and solving real-world problems through technology. I enjoy working across full-stack development, cloud computing, AI/ML, and data analytics, constantly exploring new tools and pushing myself beyond the classroom. Currently, I'm focused on expanding my expertise in software engineering, cloud technologies, and intelligent systems while looking for opportunities where I can learn fast, build meaningful products, and contribute to innovative teams.";
  }
  
  if (q.includes("lysandra") || q.includes("intern") || q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("reality") || q.includes("club") || q.includes("leader")) {
    return "MEM-BANK[0x02]: EXPERIENCE DATA\n" +
      "1. DATA ANALYST INTERN AT LYSANDRA GROUP (JAN 2025 - PRESENT):\n" +
      "   - Work with 50,000+ row business datasets weekly — cleaning, querying, and extracting insights.\n" +
      "   - Built and maintain 5+ dashboards in SQL and data visualization tools.\n" +
      "   - Reduced manual reporting time by ~40%.\n" +
      "   - Automated repetitive data-cleaning workflows using Python/pandas.\n" +
      "   - Collaborated across cross-functional teams for weekly performance reporting.\n\n" +
      "2. MANAGEMENT HEAD AT ALT REALITY CLUB, BENNETT UNIVERSITY (AUG 2024 - MAY 2025):\n" +
      "   - Led a 12-person team through tech events and workshops.\n" +
      "   - Coordinated SIH qualification pushes in 2024 and 2025.\n" +
      "   - Managed logistics for events with 200+ participants.\n" +
      "   - Handled vendor coordination and volunteer onboarding.";
  }
  
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("school") || q.includes("cgpa") || q.includes("bennett")) {
    return "MEM-BANK[0x03]: EDUCATION ARCHIVE\n" +
      "1. B.TECH — COMPUTER SCIENCE ENGINEERING, BENNETT UNIVERSITY (AUG 2023 - MAY 2027)\n" +
      "   - CGPA: 7.78\n" +
      "   - Active member of tech clubs and hackathon communities.\n\n" +
      "2. XII — CBSE (1ST DIVISION), SUNBEAM INTERNATIONAL (MAR 2022)\n\n" +
      "3. X — CBSE (1ST DIVISION), TINY TOTS SR. SEC. SCHOOL (MAR 2020)";
  }
  
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("tool") || q.includes("languages") || q.includes("python") || q.includes("react")) {
    return "MEM-BANK[0x04]: STACK & TOOLBOX\n" +
      "- LANGUAGES: HTML5 (90%), CSS3 (88%), JavaScript (85%), Python (85%), Java (72%), SQL (75%).\n" +
      "- FRONTEND: Tailwind CSS (85%), React.js (82%), Bootstrap (70%), Figma (65%).\n" +
      "- BACKEND: REST APIs (80%), Node.js (78%), Express.js (75%), FastAPI (72%), JWT Auth (68%).\n" +
      "- DATABASES: MongoDB (80%), MySQL (72%).\n" +
      "- CLOUD & DEVOPS: Git (85%), GitHub (82%), Docker (72%), AWS (70%).\n" +
      "- AI / DATA: pandas (78%), scikit-learn (72%), PyTorch (70%), Power BI (68%), HuggingFace (60%).";
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
      "Air quality monitoring system with a regression model trained on 2+ years of AQI data achieving 87% prediction accuracy, with real-time sensor readings piped into a React dashboard.\n" +
      "FEATURES:\n" +
      "  - Real-time sensor data every 5 min with live charts.\n" +
      "  - MongoDB backend handles 10,000+ time-series records.\n" +
      "  - Self-contained: ingestion, inference & frontend in one package.\n" +
      "TECH: React, Python, scikit-learn, MongoDB, REST APIs.";
  }
  
  if (q.includes("project") || q.includes("build") || q.includes("portfolio")) {
    return "MEM-BANK[0x08]: PORTFOLIO PROJECTS\n" +
      "1. OPENENV CODE REVIEW AGENT: RL env for Meta PyTorch OpenEnv Hackathon. Tech: Python, FastAPI, Docker, RL, PyTorch.\n\n" +
      "2. ELEVARE - MENTAL HEALTH PLATFORM: Full-stack mental health app with peer support & booking. Tech: React, Node.js, Express, MongoDB, Stripe, JWT.\n\n" +
      "3. AIR SENTINEL AI - AQI MONITOR: AQI regression model achieving 87% accuracy + live React dashboard. Tech: React, Python, scikit-learn, MongoDB, REST APIs.";
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
    return "MEM-BANK[0x0b]: CONTACT DETAILS\n" +
      "- EMAIL: nirnaysingh7@gmail.com\n" +
      "- PHONE: +91 78000XXXXX\n" +
      "- LOCATION: Greater Noida, Delhi NCR\n" +
      "- GITHUB: github.com/nirnayyy\n" +
      "- LINKEDIN: linkedin.com/in/nirnay-pratap-singh-9231a5212\n" +
      "- RESUME: Available for download on the bottom left of this page.";
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
      {/* Floating 8-Bit Pixel Trigger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-[99999] w-14 h-14 bg-black text-white border-4 border-white outline outline-2 outline-black -outline-offset-[6px] shadow-[4px_4px_0px_0px_#ffffff] flex items-center justify-center font-bold text-lg cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 select-none animate-bounce"
        )}
        aria-label="Open 8-bit AI Chatbot"
        style={{ animationDuration: "2.5s" }}
      >
        <span className="retro-title text-xs">AI</span>
      </button>

      {/* Retro 8-Bit Chat Box */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-24 right-6 w-[400px] h-[520px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] z-[99999] flex flex-col bg-black text-white border-4 border-white outline outline-2 outline-black -outline-offset-[6px] shadow-[8px_8px_0px_0px_#ffffff] font-mono select-none overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          )}
        >
          {/* Header Panel */}
          <div className="flex items-center justify-between p-3 border-b-4 border-white bg-white text-black font-bold">
            <span className="retro-title text-[8px] md:text-[9px] uppercase tracking-tighter">
              NIRNAY-BOT.EXE v1.0
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="px-1 border-2 border-black font-bold text-[9px] retro hover:bg-black hover:text-white cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              [X]
            </button>
          </div>

          {/* Chat Body */}
          <div 
            className={cn(
              "flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950 font-mono retro-scrollbar-dark",
              messages.length === 0 ? "flex flex-col justify-center" : ""
            )}
          >
            {messages.length === 0 ? (
              /* Initial State: Render Quick Answers */
              <div className="w-full">
                <div className="text-center mb-3">
                  <div className="inline-block border border-dashed border-zinc-700 bg-zinc-900 px-2 py-1 text-[8px] text-zinc-400 uppercase tracking-widest mb-2 font-mono">
                    ONLINE: AI PROTOCOL v1.0
                  </div>
                  <h3 className="retro-title text-[9px] font-bold text-white uppercase mb-1">
                    Ask me anything about Nirnay!
                  </h3>
                  <p className="retro text-[8px] text-zinc-500 uppercase tracking-wider">
                    Select a quick query below or type your custom message
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
                  <span className="text-[7px] text-zinc-600 tracking-[0.25em] uppercase font-mono border-b border-zinc-900 pb-1">
                    --- DIALOG TRANSMISSION STARTED ---
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
                        "max-w-[85%] p-3 text-[10px] leading-relaxed relative",
                        msg.sender === "user"
                          ? "bg-white text-black border-2 border-white font-semibold"
                          : "bg-zinc-900 text-white border-2 border-zinc-700 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]"
                      )}
                    >
                      <div className="text-[7px] text-zinc-500 uppercase mb-1 font-mono tracking-wider">
                        {msg.sender === "user" ? "[USER_QUERY]" : "[AI_TRANSMIT]"}
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
                    <div className="bg-zinc-900 text-zinc-400 border border-dashed border-zinc-700 p-2 text-[9px] font-mono flex items-center gap-2">
                      <span className="retro uppercase">AI IS RETRIEVING DATA BLOCKS</span>
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
            <div className="px-3 py-1 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-mono">
                ACTIVE DATA FEED
              </span>
              <button
                onClick={() => setMessages([])}
                className="text-[8px] retro font-bold text-zinc-400 hover:text-white uppercase font-mono cursor-pointer border border-zinc-800 px-1 hover:border-zinc-500 active:translate-x-0.5 active:translate-y-0.5"
              >
                [ RESET DIALOG ]
              </button>
            </div>
          )}

          {/* Footer Input Area */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t-4 border-white bg-black flex gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="> TYPE QUESTION (e.g. experience, skills)..."
              className="flex-1 bg-zinc-950 text-white border-2 border-zinc-700 outline-none p-2 text-[10px] uppercase font-mono focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="px-3 bg-white text-black border-2 border-white hover:bg-black hover:text-white hover:border-white transition-colors cursor-pointer text-[10px] font-bold retro active:translate-x-0.5 active:translate-y-0.5"
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </>
  );
}
