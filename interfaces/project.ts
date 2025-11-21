export interface Project {
  owner_id: string;
  project_name: string;
  short_description: string;
  full_description: string;
  category: string[];
  github_link: string | null;
  developers_id: string[];
}