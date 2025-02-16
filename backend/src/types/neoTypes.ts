export interface NeoData {
    id: string;
    name: string;
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
    close_approach_data: {
      close_approach_date: string;
      relative_velocity: {
        kilometers_per_second: string;
      };
      miss_distance: {
        kilometers: string;
      };
    }[];
    is_potentially_hazardous_asteroid: boolean;
  }