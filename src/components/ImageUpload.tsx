
import React, { useRef, useState } from 'react';
import { Upload, Camera, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  uploadedImage: string | null;
  isAnalyzing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, uploadedImage, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const clearImage = () => {
    onImageUpload('');
  };

  return (
    <div className="space-y-4">
      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Camera className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload Plant Leaf Image
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop an image here, or click to select
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative">
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={uploadedImage}
              alt="Uploaded plant leaf"
              className="w-full h-64 object-cover"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">Analyzing image...</p>
                  <p className="text-xs opacity-75">This may take a few seconds</p>
                </div>
              </div>
            )}
          </div>
          
          <Button
            onClick={clearImage}
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 bg-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="text-xs text-gray-500 text-center">
        Supported formats: JPG, PNG, WebP • Max size: 10MB
      </div>
    </div>
  );
};

export default ImageUpload;
