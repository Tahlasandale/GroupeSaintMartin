'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface Chant {
  titre: string;
  paroles: string;
  branche: string;
  ambiance: string;
}

interface CsvUploadProps {
  onDataParsed: (data: Chant[]) => void;
  onError: (error: string) => void;
}

export function CsvUpload({ onDataParsed, onError }: CsvUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCsv = (csvText: string): Chant[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('Le fichier CSV doit contenir au moins un en-tête et une ligne de données');
    }

    const headers = lines[0].split(';').map(h => h.trim().toLowerCase());
    const expectedHeaders = ['titre', 'paroles', 'branche', 'ambiance'];

    // Vérifier les en-têtes
    const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      throw new Error(`En-têtes manquants : ${missingHeaders.join(', ')}`);
    }

    const titleIndex = headers.indexOf('titre');
    const parolesIndex = headers.indexOf('paroles');
    const brancheIndex = headers.indexOf('branche');
    const ambianceIndex = headers.indexOf('ambiance');

    const chants: Chant[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';');

      if (values.length < 4) {
        throw new Error(`Ligne ${i + 1} : nombre de colonnes insuffisant`);
      }

      const chant: Chant = {
        titre: values[titleIndex]?.trim() || '',
        paroles: values[parolesIndex]?.trim().replace(/\\n/g, '\n') || '',
        branche: values[brancheIndex]?.trim() || '',
        ambiance: values[ambianceIndex]?.trim() || '',
      };

      // Validation
      if (!chant.titre) {
        throw new Error(`Ligne ${i + 1} : titre manquant`);
      }
      if (!chant.paroles) {
        throw new Error(`Ligne ${i + 1} : paroles manquantes`);
      }
      if (!['LL', 'SG', 'RGA'].includes(chant.branche)) {
        throw new Error(`Ligne ${i + 1} : branche invalide (${chant.branche}). Doit être LL, SG ou RGA`);
      }
      if (!['marche', 'veillée', 'prière'].includes(chant.ambiance)) {
        throw new Error(`Ligne ${i + 1} : ambiance invalide (${chant.ambiance}). Doit être marche, veillée ou prière`);
      }

      chants.push(chant);
    }

    return chants;
  };

  const handleFileSelect = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      onError('Veuillez sélectionner un fichier CSV');
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    try {
      const text = await file.text();
      const parsedData = parseCsv(text);
      onDataParsed(parsedData);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Erreur lors du parsing du fichier');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="mr-2 h-5 w-5" />
          Importer des chants via CSV
        </CardTitle>
        <CardDescription>
          Sélectionnez un fichier CSV avec les colonnes : titre;paroles;branche;ambiance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">
            {isProcessing ? 'Traitement en cours...' : 'Glissez-déposez votre fichier CSV ici'}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            ou cliquez pour sélectionner un fichier
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            variant="outline"
          >
            {isProcessing ? 'Traitement...' : 'Sélectionner un fichier'}
          </Button>
        </div>

        {fileName && (
          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Fichier sélectionné : {fileName}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}