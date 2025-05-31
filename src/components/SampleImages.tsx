
import React from 'react';
import { Button } from '@/components/ui/button';

interface SampleImagesProps {
  onSampleSelect: (imageUrl: string) => void;
}

const SampleImages: React.FC<SampleImagesProps> = ({ onSampleSelect }) => {
  // Using placeholder images - in real implementation, these would be actual plant disease images
  const sampleImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      title: 'Healthy Tomato Leaf',
      description: 'Example of a healthy plant leaf'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1574236170878-6c9e4855e924?w=400&h=300&fit=crop',
      title: 'Diseased Leaf Sample',
      description: 'Example showing disease symptoms'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=300&fit=crop',
      title: 'Potato Leaf',
      description: 'Common crop for testing'
    }
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Try these sample images to see how the AI analysis works:
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {sampleImages.map((image) => (
          <div key={image.id} className="group cursor-pointer" onClick={() => onSampleSelect(image.url)}>
            <div className="relative overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-900">{image.title}</h4>
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
