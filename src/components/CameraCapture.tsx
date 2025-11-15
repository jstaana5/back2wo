import { useRef, useState } from "react";

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
  };

  return (
    <div className="space-y-4 text-center">
      <video ref={videoRef} autoPlay playsInline className="mx-auto rounded-lg" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="flex gap-2 justify-center">
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={capturePhoto}>Capture</button>
        <button onClick={stopCamera}>Stop</button>
      </div>
    </div>
  );
}
