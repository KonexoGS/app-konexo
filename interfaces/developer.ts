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

export interface Developer {
  user_id: string;
  full_name: string;
  username: string;
  email: string;
  password: string;
  headline: string;
  address: string;
  user_type: "developer";
  formation: Formation[];
  experience: Experience[];
  is_deleted: boolean;
  social_medias: SocialMedias;
  profile_photo: string | null;
  created_at: string;
  dev_id: string;
  tech_skills: string[];
  dev_level: "junior" | "pleno" | "senior";
  soft_skills: string[];
  languages: Language[];
  total_experience: number;
  projects_id: string[];
  badges_id: string[];
  is_recommend: boolean;
}
