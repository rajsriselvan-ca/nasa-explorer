import { MarsRoverPhoto } from '../types/marsRoverPhoto_types';

export interface PhotoModalProps {
  photo: MarsRoverPhoto | null;
  onClose: () => void;
}