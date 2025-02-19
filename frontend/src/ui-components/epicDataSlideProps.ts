import { EPICResponse } from '../types/epicResponse_types'; 

export interface EpicDataSlideProps {
  data: EPICResponse[];
  currentIndex: number;
  imageError: boolean;
  setImageError: (val: boolean) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}