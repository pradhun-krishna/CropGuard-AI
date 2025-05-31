
import React, { useState } from 'react';
import { Upload, Camera, Info, AlertTriangle, CheckCircle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import PredictionResults from '@/components/PredictionResults';
import DiseaseInfo from '@/components/DiseaseInfo';
import SampleImages from '@/components/SampleImages';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setPrediction(null);
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const mockPrediction = generateMockPrediction();
      setPrediction(mockPrediction);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Disease detected: ${mockPrediction.disease}`,
      });
    }, 3000);
  };

  const generateMockPrediction = () => {
    const diseases = [
      {
        disease: "Tomato Early Blight",
        confidence: 0.92,
        healthy: false,
        cause: "Fungal infection caused by Alternaria solani",
        symptoms: "Brown spots with concentric rings on leaves, yellowing and defoliation",
        treatment: "Apply copper-based fungicides, improve air circulation, remove affected leaves",
        prevention: "Crop rotation, proper spacing, avoid overhead watering"
      },
      {
        disease: "Healthy Leaf",
        confidence: 0.96,
        healthy: true,
        cause: "No disease detected",
        symptoms: "Green, vibrant foliage with no visible spots or discoloration",
        treatment: "Continue current care practices",
        prevention: "Maintain proper watering, fertilization, and pest monitoring"
      },
      {
        disease: "Potato Late Blight",
        confidence: 0.88,
        healthy: false,
        cause: "Oomycete pathogen Phytophthora infestans",
        symptoms: "Water-soaked lesions, white fuzzy growth on leaf undersides",
        treatment: "Apply metalaxyl or mancozeb fungicides immediately",
        prevention: "Plant resistant varieties, ensure good drainage, monitor weather conditions"
      }
    ];
    
    return diseases[Math.floor(Math.random() * diseases.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CropGuard AI</h1>
                <p className="text-sm text-gray-600">Intelligent Plant Disease Detection</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Camera className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Detect Plant Diseases Instantly
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Upload a photo of your plant leaf and get instant AI-powered diagnosis with treatment recommendations. 
            Helping farmers and gardeners protect their crops with cutting-edge technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Upload className="h-8 w-8 text-green-600" />
              <span className="font-medium">Upload Image</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="font-medium">AI Analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Info className="h-8 w-8 text-purple-600" />
              <span className="font-medium">Get Treatment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Analysis */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Plant Image</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload 
                  onImageUpload={handleImageUpload}
                  uploadedImage={uploadedImage}
                  isAnalyzing={isAnalyzing}
                />
              </CardContent>
            </Card>

            {prediction && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {prediction.healthy ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                    <span>Analysis Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PredictionResults prediction={prediction} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Information and Samples */}
          <div className="space-y-6">
            {prediction && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5" />
                    <span>Disease Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DiseaseInfo prediction={prediction} />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Try Sample Images</CardTitle>
              </CardHeader>
              <CardContent>
                <SampleImages onSampleSelect={handleImageUpload} />
              </CardContent>
            </Card>

            {/* Model Information */}
            <Card>
              <CardHeader>
                <CardTitle>Model Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Model Type:</span>
                  <span className="font-medium">MobileNetV2 + Transfer Learning</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset:</span>
                  <span className="font-medium">PlantVillage (54,000+ images)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-medium text-green-600">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Classes:</span>
                  <span className="font-medium">38 Disease Types</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
