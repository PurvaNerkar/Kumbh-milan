import { useState, type ChangeEvent } from 'react';
import './PhotoUpload.css';

interface PhotoUploadProps {
  label: string;
  onPhotoSelected: (base64: string) => void;
}

export function PhotoUpload({ label, onPhotoSelected }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onPhotoSelected(base64);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="photo-upload">
      <label className="photo-upload__label">{label}</label>
      <label className="photo-upload__dropzone">
        {preview ? (
          <img src={preview} alt="Selected preview" className="photo-upload__preview" />
        ) : (
          <span className="photo-upload__placeholder">Tap to upload a photo</span>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="photo-upload__input"
        />
      </label>
    </div>
  );
}
