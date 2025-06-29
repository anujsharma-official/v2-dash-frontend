import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "../assets/human.jpg"; // Use your local image

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
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl animate-slide-down">
        <Card className="rounded-2xl shadow-xl border border-border bg-background">
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={logo} alt="App Logo" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <p className="text-base font-semibold">Install Admin App</p>
              <p className="text-sm text-muted-foreground">
                For faster access & offline use
              </p>
            </div>

            <Button onClick={handleInstall} className="gap-1">
              <Download className="w-4 h-4" />
              Install
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={handleClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Inline animation class using Tailwind's arbitrary keyframes */}
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
