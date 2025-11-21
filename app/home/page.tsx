import SectionProjects from "@/components/home/projects/section-projects";
import { searchProjects } from "@/server/projects/search-projects"
import { getGreeting } from "@/utils/get-greeting";

export default async function Home() {

  const { data: projects } = await searchProjects('category', 'api');
  const greeting = getGreeting();

  return (
    <div className='w-full p-4 md:p-10 pt-6 md:pt-12 h-screen space-y-6 md:space-y-8 overflow-y-auto scrollbar-custom sidebar-custom-without-radius'>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-semibold text-transparent leading-tight tracking-tight bg-[linear-gradient(90deg,#29D757,#72EB8B,#8FE479,#BEE49F)] not-dark:bg-[linear-gradient(90deg,#421A60,#711B87,#9F1882,#DD2BAD)] bg-clip-text w-fit">
          {greeting}, Luís
        </h1>
        <h3 className="text-sm md:text-base text-sidebar-accent-foreground font-light">
          Selecionamos alguns projetos que dão match <br className="sm:hidden" />
          com as suas skills
        </h3>
      </div>

      <div className="flex flex-col gap-6 md:gap-10">
        <SectionProjects title="Meus projetos" projects={projects} />
        <SectionProjects title="Sugestões" projects={projects} />
      </div>
    </div>
  )
}