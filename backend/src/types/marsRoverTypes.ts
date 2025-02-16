export interface MarsRoverPhoto {
    id: number;
    img_src: string;
    earth_date: string;
    camera: {
      full_name: string;
    };
    rover: {
      name: string;
    };
  }