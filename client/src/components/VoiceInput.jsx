import React, { useState, useRef } from "react";
import api from "../api/axios";

const VoiceInput = ({ updateCart }) => {

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef(null);

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = async (event) => {

      const speech =
        event.results[event.results.length - 1][0].transcript;

      setTranscript(speech);

      try {

        const res = await api.post("/billing/command", {
          transcript: speech
        });

        console.log("VOICE API RESPONSE:", res.data);

        if (res.data.total !== undefined) {
          updateCart(res.data);
        }

        if (res.data.paymentMethod) {
          alert("Voice Checkout Successful");
          updateCart(null);
        }

      } catch (err) {
        console.error(err);
      }

    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();

    recognitionRef.current = recognition;
  };

  return (

    <div className="mt-6 flex flex-col items-start gap-3">

      <button
        onClick={startListening}
        disabled={listening}
        className={`px-6 py-3 rounded-xl font-semibold text-white transition-all
        ${listening
          ? "bg-red-500 animate-pulse shadow-lg"
          : "bg-blue-600 hover:bg-blue-700 shadow-md"
        }`}
      >
        🎤 {listening ? "Listening..." : "Start Speaking"}
      </button>

      <p className="text-gray-600 dark:text-gray-300">
        <strong>Transcript:</strong> {transcript}
      </p>

    </div>

  );

};

export default VoiceInput;