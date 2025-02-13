export interface MarsRoverPhoto {
    id: number;
    img_src: string;
    earth_date: string;
    camera: {
      name: string;
      full_name: string;
    };
    rover: {
      name: string;
      landing_date: string;
      launch_date: string;
      status: string;
    };
  }