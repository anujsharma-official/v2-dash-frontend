import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

  return (
    visible && (
      <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
        <Card className="w-[350px] shadow-2xl border border-primary rounded-2xl">
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="w-12 h-12 rounded-xl">
              <AvatarImage src={logo} alt="App Logo" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-base">Install Admin App</p>
              <p className="text-sm text-muted-foreground">
                Faster access & offline support
              </p>
            </div>
            <Button onClick={handleInstall} className="gap-1">
              <Download className="w-4 h-4" />
              Install
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  );
}
