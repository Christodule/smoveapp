export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnailUrl?: string;
  size: number;
  uploadedDate: string;
  uploadedBy: string;
  alt?: string;
  tags: string[];
}

const MEDIA_STORAGE_KEY = 'smove_media_files';

export function getMediaFiles(): MediaFile[] {
  const stored = localStorage.getItem(MEDIA_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

export function getMediaFileById(id: string): MediaFile | undefined {
  const files = getMediaFiles();
  return files.find(f => f.id === id);
}

export function saveMediaFile(file: MediaFile): void {
  const files = getMediaFiles();
  const index = files.findIndex(f => f.id === file.id);
  
  if (index >= 0) {
    files[index] = file;
  } else {
    files.push(file);
  }
  
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(files));
}

export function deleteMediaFile(id: string): void {
  const files = getMediaFiles();
  const filtered = files.filter(f => f.id !== id);
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(filtered));
}

export function uploadMediaFile(fileData: {
  name: string;
  type: 'image' | 'video' | 'document';
  file: File;
  uploadedBy: string;
  alt?: string;
  tags?: string[];
}): Promise<MediaFile> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const mediaFile: MediaFile = {
        id: Date.now().toString(),
        name: fileData.name,
        type: fileData.type,
        url: e.target?.result as string,
        thumbnailUrl: e.target?.result as string,
        size: fileData.file.size,
        uploadedDate: new Date().toISOString(),
        uploadedBy: fileData.uploadedBy,
        alt: fileData.alt || fileData.name,
        tags: fileData.tags || [],
      };
      
      saveMediaFile(mediaFile);
      resolve(mediaFile);
    };
    
    reader.readAsDataURL(fileData.file);
  });
}

export function getMediaFilesByType(type: 'image' | 'video' | 'document'): MediaFile[] {
  const files = getMediaFiles();
  return files.filter(f => f.type === type);
}

export function searchMediaFiles(query: string): MediaFile[] {
  const files = getMediaFiles();
  const lowerQuery = query.toLowerCase();
  
  return files.filter(f => 
    f.name.toLowerCase().includes(lowerQuery) ||
    f.alt?.toLowerCase().includes(lowerQuery) ||
    f.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
