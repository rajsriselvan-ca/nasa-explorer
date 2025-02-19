import { MarsRoverPhoto } from '../types/marsRoverPhoto_types';

export interface PhotoGridProps {
  photos: MarsRoverPhoto[];
  onPhotoClick: (photo: MarsRoverPhoto) => void;
  formatDate: (dateStr: string) => string;
}