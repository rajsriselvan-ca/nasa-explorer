export interface ImageLibraryItem {
    href: string; 
    data: {
      title: string;
      description: string;
      nasa_id: string;
      date_created: string;
    }[];
    links?: {
      href: string; 
    }[];
  }