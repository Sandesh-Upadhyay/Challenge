
import React, { useState } from 'react';
import Header from '@/components/Header';
import LeadScoringForm from '@/components/LeadScoringForm';
import LeadScoreCard from '@/components/LeadScoreCard';
import DemoLeads from '@/components/DemoLeads';
import CsvExport from '@/components/CsvExport';
import { LeadData, LeadScore } from '@/utils/lead-scoring';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Code, Database } from 'lucide-react';

const Index = () => {
  const [leadScore, setLeadScore] = useState<LeadScore | null>(null);
  
  const handleScoreComplete = (result: LeadScore) => {
    setLeadScore(result);
  };
  
  const handleSelectDemoLead = (lead: LeadData) => {
    // Pre-fill the form by forcing a re-render with the selected lead
    const form = document.querySelector('form');
    if (form) {
      // Update input values
      const serviceInput = form.querySelector('input[name="serviceRequested"]') as HTMLInputElement;
      const zipInput = form.querySelector('input[name="zipCode"]') as HTMLInputElement;
      const sourceInput = form.querySelector('input[name="source"]') as HTMLInputElement;
      
      if (serviceInput && zipInput && sourceInput) {
        serviceInput.value = lead.serviceRequested;
        zipInput.value = lead.zipCode;
        sourceInput.value = lead.source;
        
        // Trigger change events
        serviceInput.dispatchEvent(new Event('change', { bubbles: true }));
        zipInput.dispatchEvent(new Event('change', { bubbles: true }));
        sourceInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-operatorOS text-operatorOS-foreground">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              OperatorOS Developer Challenge
            </h1>
            <p className="text-gray-400">
              Lead Scoring Agent - Evaluate inbound leads based on likelihood to convert
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <LeadScoringForm onScoreComplete={handleScoreComplete} className="mb-6" />
              
              {leadScore && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Analysis Results</h2>
                    <CsvExport leadScore={leadScore} />
                  </div>
                  <LeadScoreCard leadScore={leadScore} />
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <DemoLeads onSelectLead={handleSelectDemoLead} />
              
              <Card className="border-gray-800 bg-operatorOS">
                <CardHeader className="bg-operatorOS-accent pb-4">
                  <CardTitle className="text-sm font-medium text-white">
                    About This Project
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-sm text-gray-400 space-y-4">
                    <p>
                      This Lead Scoring Agent demonstrates AI-powered lead evaluation for service franchises.
                    </p>
                    <p>
                      It fulfills the requirements by:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Accepting lead data points (service, ZIP, source)</li>
                      <li>Using OpenAI to evaluate lead quality</li>
                      <li>Scoring from 1-100 with reasoning</li>
                      <li>Logging results (CSV export)</li>
                      <li>Simulating CRM integration</li>
                    </ul>
                    <div className="flex items-center pt-2 text-xs text-blue-400">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span>Built with React + TypeScript</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
