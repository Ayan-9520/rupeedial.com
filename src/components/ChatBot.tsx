import  { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
const ChatBot = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Welcome to RupeeDial! How can I help you today?"
    }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input
    };

    setMessages((prev) => [...prev, userMessage]);

    // Dummy Bot Reply
    setTimeout(() => {

      let botReply =
        "Please share your loan requirement. Our expert will contact you shortly.";

      if (input.toLowerCase().includes("personal loan")) {
        botReply =
          "✅ Personal loans available up to ₹40 Lakhs.";
      }

      if (input.toLowerCase().includes("home loan")) {
        botReply =
          "🏠 Home loans available with attractive interest rates.";
      }

      if (input.toLowerCase().includes("emi")) {
        botReply =
          "📊 EMI depends on loan amount, tenure and interest rate.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: botReply
        }
      ]);

    }, 800);

    setInput("");
  };

  return (
    <>
   <a
  href="https://wa.me/917982953129?text=Hi%20RupeeDial%20Team"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 left-5 bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-105 transition-all duration-300"
>
  <FaWhatsapp size={26} />
</a>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-full shadow-2xl z-50 hover:scale-105 transition-all duration-300 font-medium"
      >
        💬 Ask RupeeDial
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-[360px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border">

          {/* Header */}
          <div className="bg-green-600 text-white p-4 font-semibold flex justify-between items-center">
            <span>Ask RupeeDial</span>

            <button onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-3 bg-gray-50">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`mb-3 flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                    msg.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {msg.text}
                </div>

              </div>

            ))}

          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">

            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              className="flex-1 border rounded-full px-4 py-2 outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 rounded-full"
            >
              ➤
            </button>

          </div>

        </div>
      )}
    </>
  );
};

export default ChatBot;