import { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { AgentChat } from './components/AgentChat';
import { ProductAnalysis } from './components/ProductAnalysis';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setShowResults(false);

    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl">Back2Wo</h1>
              <p className="text-sm text-gray-600">Centsible AI Agent Marketplace</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!uploadedImage && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl mb-4">AI Agents Working for You</h2>
            <p className="text-xl text-gray-600 mb-2">
              AI agents are designed to make decisions and achieve goals on behalf of users
            </p>
            <p className="text-gray-500">
              Upload a product photo and watch our AI seller pitch it to our AI buyer, 
              analyze materials, and connect with affordable & sustainable suppliers
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {!uploadedImage ? (
          <ImageUpload onImageUpload={handleImageUpload} />
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
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
              <div>
                <AgentChat 
                  isAnalyzing={isAnalyzing} 
                  showResults={showResults} 
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Back2Wo - Making sustainable commerce centsible with AI agents</p>
        </div>
      </footer>
    </div>
  );
}
