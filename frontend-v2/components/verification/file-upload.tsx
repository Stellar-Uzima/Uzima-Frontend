'use client';

import * as React from 'react';
import { useCallback, useState } from 'react';
import { UploadCloudIcon, FileIcon, XIcon, AlertCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_EXTENSIONS,
  type FileUploadState,
} from './types';

interface FileUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

export function FileUpload({ value, onChange, error, disabled }: FileUploadProps) {
  const [state, setState] = useState<FileUploadState>({
    file: value,
    preview: null,
    error: null,
    isDragging: false,
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must not exceed 5MB';
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return 'File must be PDF, JPG, or PNG';
    }
    return null;
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setState((prev) => ({ ...prev, error: validationError, file: null, preview: null }));
        onChange(null);
        return;
      }

      // Create preview for images
      let preview: string | null = null;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      setState({
        file,
        preview,
        error: null,
        isDragging: false,
      });
      onChange(file);
    },
    [onChange, validateFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      setState((prev) => ({ ...prev, isDragging: false }));

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [disabled, handleFile]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setState((prev) => ({ ...prev, isDragging: true }));
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    if (state.preview) {
      URL.revokeObjectURL(state.preview);
    }
    setState({
      file: null,
      preview: null,
      error: null,
      isDragging: false,
    });
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [state.preview, onChange]);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const displayError = error || state.error;
  const hasFile = state.file || value;

  // Update state when value prop changes
  React.useEffect(() => {
    if (value && value !== state.file) {
      let preview: string | null = null;
      if (value.type.startsWith('image/')) {
        preview = URL.createObjectURL(value);
      }
      setState((prev) => ({ ...prev, file: value, preview }));
    }
  }, [value, state.file]);

  // Cleanup preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (state.preview) {
        URL.revokeObjectURL(state.preview);
      }
    };
  }, [state.preview]);

  return (
    <div className="space-y-2">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer',
          state.isDragging && 'border-primary bg-primary/5',
          displayError && 'border-destructive bg-destructive/5',
          !state.isDragging && !displayError && 'border-input hover:border-primary/50',
          disabled && 'opacity-50 cursor-not-allowed',
          hasFile && 'border-solid border-primary/30 bg-primary/5'
        )}
        aria-label="Upload license document"
        aria-describedby={displayError ? 'file-upload-error' : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_FILE_EXTENSIONS.join(',')}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
          aria-hidden="true"
        />

        {hasFile ? (
          <div className="flex flex-col items-center gap-3 w-full">
            {state.preview ? (
              <div className="relative">
                <img
                  src={state.preview}
                  alt="Document preview"
                  className="max-h-32 max-w-full rounded-md object-contain"
                />
              </div>
            ) : (
              <FileIcon className="size-12 text-primary" />
            )}
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-medium text-foreground">
                {(state.file || value)?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {((state.file || value)?.size ?? 0 / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              disabled={disabled}
              className="gap-1.5"
            >
              <XIcon className="size-3.5" />
              Remove file
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <UploadCloudIcon className="size-8 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-medium text-foreground">
                {state.isDragging ? 'Drop file here' : 'Drag & drop your license document'}
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              PDF, JPG, or PNG (max 5MB)
            </p>
          </div>
        )}
      </div>

      {displayError && (
        <div
          id="file-upload-error"
          className="flex items-center gap-1.5 text-sm text-destructive"
          role="alert"
        >
          <AlertCircleIcon className="size-4" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}
