import { useState, useCallback, useRef } from "react";
import { Upload, Camera, Clipboard, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ScreenshotUploadProps {
  onAnalyze: (imageData: string) => void;
  isAnalyzing: boolean;
}

export function ScreenshotUpload({ onAnalyze, isAnalyzing }: ScreenshotUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find(type => type.startsWith("image/"));
        if (imageType) {
          const blob = await item.getType(imageType);
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreview(result);
          };
          reader.readAsDataURL(blob);
          break;
        }
      }
    } catch {
      // Clipboard access might be denied
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = () => {
    if (preview) {
      onAnalyze(preview);
    }
  };

  return (
    <div className="space-y-4" data-testid="container-screenshot-upload">
      {!preview ? (
        <Card
          className={`relative border-2 border-dashed transition-all duration-200 ${
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/25"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          data-testid="card-drop-zone"
        >
          <div className="flex flex-col items-center justify-center py-10 px-5">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2" data-testid="text-upload-title">Screenshot hochladen</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm" data-testid="text-upload-description">
              Ziehe einen Screenshot hierher, füge ihn aus der Zwischenablage ein, oder wähle eine Datei aus
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant="default"
                onClick={() => fileInputRef.current?.click()}
                data-testid="button-select-file"
              >
                <Camera className="w-4 h-4 mr-2" />
                Datei auswählen
              </Button>
              <Button
                variant="outline"
                onClick={handlePaste}
                data-testid="button-paste-clipboard"
              >
                <Clipboard className="w-4 h-4 mr-2" />
                Aus Zwischenablage
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              data-testid="input-file-upload"
            />
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden" data-testid="card-preview">
          <div className="relative">
            <img
              src={preview}
              alt="Poker Screenshot"
              className="w-full h-auto max-h-[400px] object-contain bg-muted"
              data-testid="img-screenshot-preview"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-3 right-3"
              onClick={clearPreview}
              disabled={isAnalyzing}
              data-testid="button-clear-preview"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4 flex justify-center">
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              data-testid="button-analyze"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analysiere...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5 mr-2" />
                  Hand analysieren
                </>
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
