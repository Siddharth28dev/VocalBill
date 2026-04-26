import VoiceInput from "../VoiceInput"

export default function VoiceConsole({ updateCart }) {

  return (

    <div className="
      glass-card hover-premium rounded-2xl
      bg-gradient-to-br from-blue-50/40 to-white/30
      dark:from-blue-900/10 dark:to-transparent
      p-8
      flex flex-col items-center text-center
      justify-center
      min-h-[360px]
    ">

      <h2 className="text-xl font-semibold mb-3">
        🎤 Voice Billing
      </h2>

      <p className="text-gray-500 mb-6">
        Speak a command like:
        <br />
        <span className="italic text-blue-600">
          “add two bananas”
        </span>
      </p>

      {/* REAL VOICE COMPONENT */}
      <VoiceInput updateCart={updateCart} />

    </div>

  )

}