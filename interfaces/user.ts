interface Formation {
  name: string;
  institution: string;
  completed_year: number;
  description: string | null;
}

interface Experience {
  company: string;
  role: string;
  begin: string;
  end: string | null;
  description: string;
}

interface SocialMedias {
  linkedin?: string;
  github?: string;
}

interface Language {
  name: string;
  level: string;
}

export interface User {
  full_name: string;
  username: string;
  headline: string;
  address: string;
  email: string;
  formation: Formation[];
  experience: Experience[];
  social_medias: SocialMedias;
  tech_skills: string[];
  soft_skills: string[];
  dev_level: "junior" | "pleno" | "senior";
  languages: Language[];
  password: string;
}