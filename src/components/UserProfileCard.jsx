import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserProfileCard({user}) {
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);

  const toggleCard = () => setShowCard((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowCard(false);
      }
    }

    if (showCard) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCard]);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleCard}
        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
      >
        {user.displayName || "Perfil"}
      </button>

      <AnimatePresence>
        {showCard && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 z-50"
          >
            <div className="bg-white rounded-2xl border shadow-xl p-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">Guilherme</p>
                  <p className="text-sm text-gray-500">Eng. de Software</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button className="w-full border rounded-md px-4 py-2 hover:bg-gray-100 transition">
                  Ver Perfil
                </button>
                <button className="w-full bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition">
                  Sair
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
