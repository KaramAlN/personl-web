import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, X, CheckCircle, Smartphone } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={() => {
          sound.playAffirmative();
          install();
        }}
        id="pwa-install-btn"
        type="button"
        data-sound="success"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-mono transition-all hover:border-cyan-300 hover:shadow-sm hover:shadow-cyan-400/30"
        title="Install app to your home screen or desktop"
      >
        <Download className="w-3.5 h-3.5 text-cyan-300 animate-bounce" />
        <span className="font-semibold tracking-wide">Install App</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => {
            sound.playAffirmative();
            setShowIOSGuide(true);
          }}
          id="pwa-ios-install-btn"
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-200 text-xs font-mono transition-all hover:border-cyan-400"
          title="Install app on iOS / iPadOS"
        >
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Install App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-[#0B132B] border border-cyan-400/40 p-6 shadow-2xl text-slate-100 relative">
              <button
                onClick={() => {
                  sound.playDismiss();
                  setShowIOSGuide(false);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-300">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading-en">Install on iPhone / iPad</h3>
                  <p className="text-xs text-cyan-400/90 font-mono">PWA Standalone Mode</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 font-mono mb-6 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                  <span>Tap the <strong className="text-white">Share</strong> icon <Share className="w-3.5 h-3.5 inline mx-1 text-cyan-300" /> in Safari's bottom toolbar.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                  <span>Scroll down and select <strong className="text-white">"Add to Home Screen"</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                  <span>Tap <strong className="text-white">"Add"</strong> in the top-right corner to launch in full screen.</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playDismiss();
                  setShowIOSGuide(false);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-[#070B1F] font-bold text-xs font-mono hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Got It</span>
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop / tablet button if not yet prompted or already running
  return (
    <button
      onClick={() => {
        sound.playAffirmative();
        alert('To install this app on your device, use your browser menu (e.g. Chrome 3-dots > "Install Karam Naamneh" or "Add to Home Screen").');
      }}
      id="pwa-generic-install-btn"
      type="button"
      className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-200 text-xs font-mono transition-all hover:border-cyan-400"
      title="Install PWA"
    >
      <Download className="w-3.5 h-3.5 text-cyan-400" />
      <span>Install PWA</span>
    </button>
  );
};
