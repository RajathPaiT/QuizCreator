
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  ref,
  push,
  set,
  get
} from "firebase/database";

export default function Home() {

  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [answer, setAnswer] = useState("Option A");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch questions from Firebase
  async function fetchQuestions() {
    try {
      const dbRef = ref(db, "questions");

      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        const questionList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));

        setQuestions(questionList);
      } else {
        setQuestions([]);
      }

    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error fetching questions: " + error.message);
    } finally {
      setFetching(false);
    }
  }

  // Load questions when page opens
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Save question to Firebase
  async function saveQuestion(e) {
    e.preventDefault();

    if (
      !question.trim() ||
      !optionA.trim() ||
      !optionB.trim() ||
      !optionC.trim() ||
      !optionD.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Generate unique ID
      const questionRef = push(ref(db, "questions"));

      // Save data
      await set(questionRef, {
        question: question.trim(),
        optionA: optionA.trim(),
        optionB: optionB.trim(),
        optionC: optionC.trim(),
        optionD: optionD.trim(),
        answer: answer
      });

      alert("Question saved successfully!");

      // Clear form
      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setAnswer("Option A");

      // Refresh questions
      await fetchQuestions();

    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Error saving question: " + error.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Quiz Creator
        </h1>

        {/* Quiz Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          <form onSubmit={saveQuestion}>

            <label className="font-semibold">
              Question
            </label>

            <input
              type="text"
              placeholder="Enter quiz question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border p-3 rounded-lg mt-2 mb-4"
              required
            />

            <label className="font-semibold">
              Option A
            </label>

            <input
              type="text"
              placeholder="Enter option A"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              className="w-full border p-3 rounded-lg mt-2 mb-4"
              required
            />

            <label className="font-semibold">
              Option B
            </label>

            <input
              type="text"
              placeholder="Enter option B"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              className="w-full border p-3 rounded-lg mt-2 mb-4"
              required
            />

            <label className="font-semibold">
              Option C
            </label>

            <input
              type="text"
              placeholder="Enter option C"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
              className="w-full border p-3 rounded-lg mt-2 mb-4"
              required
            />

            <label className="font-semibold">
              Option D
            </label>

            <input
              type="text"
              placeholder="Enter option D"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
              className="w-full border p-3 rounded-lg mt-2 mb-4"
              required
            />

            <label className="font-semibold">
              Correct Answer
            </label>

            <select
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border p-3 rounded-lg mt-2 mb-6"
            >
              <option value="Option A">Option A</option>
              <option value="Option B">Option B</option>
              <option value="Option C">Option C</option>
              <option value="Option D">Option D</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Question"}
            </button>

          </form>

        </div>

        {/* Saved Questions */}
        <h2 className="text-2xl font-bold mt-10 mb-5">
          Saved Questions
        </h2>

        {fetching ? (
          <p className="text-gray-500">Loading questions...</p>
        ) : questions.length === 0 ? (

          <p className="text-gray-500">
            No questions saved yet.
          </p>

        ) : (

          <div className="space-y-5">

            {questions.map((q, index) => (

              <div
                key={q.id}
                className="bg-white p-6 rounded-xl shadow-md"
              >

                <h3 className="text-lg font-bold mb-4">
                  {index + 1}. {q.question}
                </h3>

                <p className="mb-2">
                  Option A: {q.optionA}
                </p>

                <p className="mb-2">
                  Option B: {q.optionB}
                </p>

                <p className="mb-2">
                  Option C: {q.optionC}
                </p>

                <p className="mb-2">
                  Option D: {q.optionD}
                </p>

                <p className="mt-4 text-green-600 font-semibold">
                  Correct Answer: {q.answer}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}
