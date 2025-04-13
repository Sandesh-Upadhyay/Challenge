
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-800 bg-operatorOS py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-white">OperatorOS</span>
          <span className="bg-blue-600 text-xs text-white px-2 py-0.5 rounded">
            Lead Scoring Agent
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center text-sm text-gray-400">
            <span>Developer Challenge</span>
          </div>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="public/lovable-uploads/36711e0f-d317-4fea-9913-abfeebdcf1bc.png" />
            <AvatarFallback className="bg-gray-700">OS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
