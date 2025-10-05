"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function MathAgentUI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Convex action call
  const askMath = useAction(api.mathActions.askMath);

  const handleSend = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);

    try {
      const res = await askMath({ question });
      setAnswer(res); // result.text from backend
    } catch (err: any) {
      console.error(err);
      setAnswer("❌ Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🧮 Math Agent</h1>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter your math question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border px-3 py-2 rounded-l w-full"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-r disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {answer && (
          <div className="mt-4 p-3 border rounded bg-gray-50 text-center">
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </div>
    </div>
  );
}
