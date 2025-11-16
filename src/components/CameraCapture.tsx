import { useRef, useState } from "react";
import { Camera, CameraOff, Image } from "lucide-react"; // professional icons

type Props = {
  onImageUpload: (imageUrl: string) => void;
};

export function CameraCapture({ onImageUpload }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    const s = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(s);
    if (videoRef.current) {
      videoRef.current.srcObject = s;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const url = canvas.toDataURL("image/png");
      onImageUpload(url);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="space-y-6 text-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="mx-auto rounded-xl shadow-md border border-gray-200 max-w-full"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={startCamera}
          aria-label="Start camera"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 
                     text-gray-800 font-medium shadow-sm hover:shadow-md hover:bg-blue-50 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Camera className="w-5 h-5 text-blue-500" />
          <span>Start</span>
        </button>

        <button
          onClick={capturePhoto}
          aria-label="Capture photo"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 
                     text-gray-800 font-medium shadow-sm hover:shadow-md hover:bg-green-50 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <Image className="w-5 h-5 text-green-500" />
          <span>Capture</span>
        </button>

        <button
          onClick={stopCamera}
          aria-label="Stop camera"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-gray-200 
                     text-gray-800 font-medium shadow-sm hover:shadow-md hover:bg-red-50 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <CameraOff className="w-5 h-5 text-red-500" />
          <span>Stop</span>
        </button>
      </div>
    </div>
  );
}
