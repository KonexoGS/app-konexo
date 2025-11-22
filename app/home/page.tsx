import SectionProjects from "@/components/home/projects/section-projects";
import { searchProjects } from "@/server/projects/search-projects"
import { getGreeting } from "@/utils/get-greeting";
import HomeClient from "./home-client";

export default async function Home() {
  const { data: projects } = await searchProjects('category', 'api');
  const greeting = getGreeting();

  return (
    <HomeClient 
      projects={projects} 
      greeting={greeting} 
    />
  );
}