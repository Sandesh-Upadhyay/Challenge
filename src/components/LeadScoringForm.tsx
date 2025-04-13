
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LeadData, LeadScore, scoreLeadWithAI, updateCRM } from '@/utils/lead-scoring';

interface LeadScoringFormProps {
  onScoreComplete: (result: LeadScore) => void;
  className?: string;
}

const LeadScoringForm: React.FC<LeadScoringFormProps> = ({ onScoreComplete, className }) => {
  const [formData, setFormData] = useState<LeadData>({
    serviceRequested: '',
    zipCode: '',
    source: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCrmUpdating, setIsCrmUpdating] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.serviceRequested || !formData.zipCode || !formData.source) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await scoreLeadWithAI(formData);
      
      onScoreComplete(result);
      
      toast({
        title: "Lead scored successfully",
        description: `Lead received a score of ${result.score}/100.`,
      });
    } catch (error) {
      console.error("Error scoring lead:", error);
      toast({
        title: "Error scoring lead",
        description: "There was a problem evaluating this lead. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCRM = async () => {
    if (isLoading) return;
    
    try {
      setIsCrmUpdating(true);
      
      // Get the latest lead score data to update CRM
      const result = await scoreLeadWithAI(formData);
      
      const success = await updateCRM(formData, result.score, result.reasoning);
      
      if (success) {
        toast({
          title: "CRM Updated",
          description: "Lead score has been synced with the CRM system.",
        });
      } else {
        throw new Error("Failed to update CRM");
      }
    } catch (error) {
      console.error("Error updating CRM:", error);
      toast({
        title: "CRM Update Failed",
        description: "There was a problem synchronizing with the CRM system.",
        variant: "destructive"
      });
    } finally {
      setIsCrmUpdating(false);
    }
  };

  return (
    <Card className={`border-gray-800 bg-operatorOS ${className}`}>
      <CardHeader className="bg-operatorOS-accent">
        <CardTitle className="text-xl font-bold text-white">Lead Scoring Agent</CardTitle>
        <CardDescription className="text-gray-300">
          Enter lead information to calculate conversion potential
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="serviceRequested" className="text-white">Service Requested</Label>
              <Input
                id="serviceRequested"
                name="serviceRequested"
                placeholder="e.g. Premium Consulting, Basic Support"
                value={formData.serviceRequested}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="zipCode" className="text-white">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                placeholder="e.g. 94103"
                value={formData.zipCode}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="source" className="text-white">Lead Source</Label>
              <Input
                id="source"
                name="source"
                placeholder="e.g. Referral, Organic, Social"
                value={formData.source}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Processing...' : 'Score Lead'}
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={handleUpdateCRM}
              disabled={isCrmUpdating}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              {isCrmUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isCrmUpdating ? 'Updating...' : 'Update CRM'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t border-gray-800 bg-gray-900 py-3 px-6">
        <p className="text-xs text-gray-500">
          Using OpenAI GPT-4 to evaluate lead quality and conversion potential
        </p>
      </CardFooter>
    </Card>
  );
};

export default LeadScoringForm;
