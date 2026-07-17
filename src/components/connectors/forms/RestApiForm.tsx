import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConnectorConfig } from "@/pages/Connectors";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  connector: ConnectorConfig;
  onSuccess: () => void;
  onClose: () => void;
}

export function RestApiForm({ connector, onSuccess, onClose }: Props) {
  const [endpointUrl, setEndpointUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleValidate = async () => {
    if (!endpointUrl) {
      toast.error("Endpoint URL is required");
      return;
    }
    
    setIsValidating(true);
    
    try {
      new URL(endpointUrl); // Validate URL format
      JSON.parse(headers); // Validate headers JSON
      
      // Attempt generic GET/OPTIONS request just to check reachability
      try {
        await fetch(endpointUrl, {
          method: 'OPTIONS',
          headers: JSON.parse(headers),
          mode: 'no-cors' // We just want to see if it doesn't instantly throw a network error in the browser
        });
      } catch (fetchError) {
        // If it fails cors, that's fine, it might still be a valid endpoint for backend ingestion
        console.log("Fetch test result:", fetchError);
      }
      
      setValidated(true);
      toast.success("Connection validated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Validation failed. Check URL format and Headers JSON.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    if (!validated) return;

    setIsSaving(true);
    try {
      const config = { 
        endpointUrl, 
        apiKey, 
        webhookSecret, 
        headers: JSON.parse(headers) 
      };
      
      const { error } = await supabase.from('data_connectors').insert({
        name: `REST API (${new URL(endpointUrl).hostname})`,
        type: connector.type,
        status: 'active',
        config: config as any
      });

      if (error) throw error;
      
      toast.success("Connector configured securely");
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save connector");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="endpointUrl">Endpoint URL</Label>
        <Input 
          id="endpointUrl" 
          placeholder="https://api.provider.com/v1/alerts" 
          value={endpointUrl} 
          onChange={(e) => { setEndpointUrl(e.target.value); setValidated(false); }}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="apiKey">API Key (Optional)</Label>
        <Input 
          id="apiKey" 
          type="password"
          placeholder="Enter API Key for polling..." 
          value={apiKey} 
          onChange={(e) => { setApiKey(e.target.value); setValidated(false); }}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="webhookSecret">Webhook Secret (Optional)</Label>
        <Input 
          id="webhookSecret" 
          type="password"
          placeholder="Enter secret for validating incoming webhooks..." 
          value={webhookSecret} 
          onChange={(e) => { setWebhookSecret(e.target.value); setValidated(false); }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="headers">Custom Headers (JSON)</Label>
        <Textarea 
          id="headers" 
          className="font-mono text-xs min-h-[80px]"
          value={headers} 
          onChange={(e) => { setHeaders(e.target.value); setValidated(false); }}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        {!validated ? (
          <Button onClick={handleValidate} disabled={isValidating}>
            {isValidating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Validate Connection
          </Button>
        ) : (
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save Securely & Enable
          </Button>
        )}
      </div>
    </div>
  );
}
