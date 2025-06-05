import React from "react";
import { Button } from "@/components/ui/button";

interface SampleImagesProps {
  onSampleSelect: (imageUrl: string) => void;
}

const SampleImages: React.FC<SampleImagesProps> = ({ onSampleSelect }) => {
  const baseUrl = import.meta.env.PROD ? "/CropGuard-AI" : "";

  const sampleImages = [
    {
      id: 1,
      url: `${baseUrl}/sample-images/healthy-tomato-leaf.jpg`,
      title: "Healthy Tomato Leaf",
      description: "Example of a healthy tomato plant leaf",
    },
    {
      id: 2,
      url: `${baseUrl}/sample-images/diseased-tomato-leaf.jpg`,
      title: "Diseased Tomato Leaf",
      description: "Example showing early blight disease symptoms",
    },
    {
      id: 3,
      url: `${baseUrl}/sample-images/healthy-potato-leaf.jpg`,
      title: "Healthy Potato Leaf",
      description: "Example of a healthy potato plant leaf",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Try these sample images to see how the AI analysis works:
      </p>

      <div className="grid grid-cols-1 gap-3">
        {sampleImages.map((image) => (
          <div
            key={image.id}
            className="group cursor-pointer"
            onClick={() => onSampleSelect(image.url)}
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-900">
                {image.title}
              </h4>
              <p className="text-xs text-gray-600">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500">
        Click any image above to analyze it with our AI model
      </div>
    </div>
  );
};

export default SampleImages;
