import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import logo from "../assets/human.jpg";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        console.log("PWA Installed");
      }
      setVisible(false);
    }
  };

  const handleClose = () => setVisible(false);

  return (
    visible && (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg flex items-center gap-4 p-4 animate-slide-down">
        <img src={logo} alt="App Icon" className="w-12 h-12 rounded-lg" />

        <div className="flex-1">
          <p className="text-base font-semibold text-gray-900 dark:text-white">Install Admin App</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            For faster access & offline use
          </p>
        </div>

        <button
          onClick={handleInstall}
          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm"
        >
          <Download className="w-4 h-4" />
          Install
        </button>

        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white ml-2"
        >
          <X className="w-4 h-4" />
        </button>

        <style>{`
          @keyframes slide-down {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-down {
            animation: slide-down 0.4s ease-out;
          }
        `}</style>
      </div>
    )
  );
}
