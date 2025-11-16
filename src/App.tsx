import { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { AgentChat } from './components/AgentChat';
import { ProductAnalysis } from './components/ProductAnalysis';
import { Sparkles, Upload, Camera } from 'lucide-react';
import { CameraCapture } from './components/CameraCapture';

export default function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mode, setMode] = useState<"upload" | "camera" | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setShowResults(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setShowResults(false);
    setIsAnalyzing(false);
    setMode(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Back2Wo</h1>
            <p className="text-sm text-gray-500">Centsible AI Agent Marketplace</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12">
        {!uploadedImage ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <div id="hero-main" className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-semibold mb-4 text-gray-900 tracking-tight">
                AI Agents Working for You
              </h2>
              <p className="text-lg text-gray-700 mb-3">
                AI agents are designed to make decisions and achieve goals on behalf of users.
              </p>
              <p className="text-gray-600">
                Upload a product photo and watch our AI seller pitch it to our AI buyer, analyze materials,
                and connect with affordable & sustainable suppliers.
              </p>
            </div>

            {/* Mode Buttons */}
            {!mode && (
              <div className="flex gap-6 justify-center">
                <button
                  onClick={() => setMode("upload")}
                  aria-label="Upload an image"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white shadow-md hover:shadow-lg 
                             text-gray-800 font-medium transition-transform transform hover:scale-105 focus:outline-none"
                >
                  <Upload className="w-5 h-5 text-blue-500" />
                  <span>Upload Image Now</span>
                </button>
              </div>
            )}

            {/* Conditional Rendering */}
            <div className="flex justify-center mt-8">
              {mode === "upload" && <ImageUpload onImageUpload={handleImageUpload} onTakePhoto={() => setMode("camera")}/>}
              {mode === "camera" && <CameraCapture onImageUpload={handleImageUpload} />}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Image & Analysis */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img
                    src={uploadedImage}
                    alt="Uploaded product"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4 flex justify-end">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Upload New Image
                    </button>
                  </div>
                </div>

                {showResults && <ProductAnalysis />}
              </div>

              {/* Right Column - Agent Chat */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <AgentChat isAnalyzing={isAnalyzing} showResults={showResults} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/70 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-gray-500">
          <p>Back2Wo — Making sustainable commerce centsible with AI agents</p>
        </div>
      </footer>
    </div>
  );
}
