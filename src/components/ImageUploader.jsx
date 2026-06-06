import { useState, useRef } from 'react';
import toast from 'react-hot-toast';

const ImageUploader = ({ onUpload, uploading, setUploading, type = 'memory' }) => {
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return toast.error('Only JPG, PNG, or WEBP files allowed.');
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const { uploadProfileImage, uploadMemoryImage } = await import('../services/api');
      const uploadFn = type === 'profile' ? uploadProfileImage : uploadMemoryImage;
      const res = await uploadFn(formData);

      onUpload(res.data.url);
      toast.success('Image uploaded!');
    } catch {
      toast.error('Upload failed. Try again.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed
                  transition-all duration-200 overflow-hidden
                  ${dragOver
                    ? 'border-gold bg-gold/5'
                    : 'border-gray-200 hover:border-gold hover:bg-gold/5'
                  }
                  ${type === 'profile' ? 'h-40 w-40 rounded-full' : 'h-48 w-full'}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center
                        justify-center gap-2 p-4">
          <div className="text-3xl">
            {uploading ? '⏳' : '📷'}
          </div>
          <p className="font-body text-xs text-muted text-center">
            {uploading
              ? 'Uploading...'
              : dragOver
              ? 'Drop it!'
              : 'Click or drag to upload'}
          </p>
        </div>
      )}

      {uploading && (
        <div className="absolute inset-0 bg-white/70 flex items-center
                        justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent
                          rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;