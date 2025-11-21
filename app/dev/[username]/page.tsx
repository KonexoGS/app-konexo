
import { getDeveloperByUsername } from "@/server/devs/get-developer-by-username";
import { notFound } from "next/navigation";
import DevInfo from "@/components/dev/dev-info";
import DevProjects from "@/components/dev/dev-projects";
import { searchProjects } from "@/server/projects/search-projects";
import { getDeveloperProjects } from "@/server/devs/get-dev-projects";

export default async function DeveloperProfile({
  params,
}: {
  params: Promise<{ username: string }>
}) {

  const { username } = await params

  const res = await getDeveloperByUsername(username);

  if (res.status === 404) notFound();

  if (!res.success) return <div>Erro interno: não foi possível buscar usuário</div>

  const {
    profile_photo,
    full_name,
    headline,
    tech_skills,
    projects_id,
    address,
    user_id,
    dev_id,
    is_recommend,
    dev_level,
    experience,
    languages,
    social_medias,
  } = res.data!;

  const projectsPromises = projects_id.map(async (project_id) => {
    const res = await searchProjects('project_id', project_id);
    return res.data![0];
  });

  const participatingProjects = await Promise.all(projectsPromises);

  const developerProjectsRes = await getDeveloperProjects(user_id);
  const developerProjects = developerProjectsRes.data?.map(p => ({ ...p, owner_name: full_name })) || [];

  return (
    <div className="overflow-y-auto min-h-screen scrollbar-custom">
      <DevInfo
        dev_id={dev_id}
        profile_photo={profile_photo!}
        full_name={full_name}
        headline={headline}
        tech_skills={tech_skills}
        is_recommend={is_recommend}
        address={address}
        dev_level={dev_level}
        experience={experience}
        languages={languages}
        social_medias={social_medias}
      />
      <DevProjects
        participatingProjects={participatingProjects}
        ownProjects={developerProjects}
      />
      <div className="p-10 pt-0">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Experiência Profissional</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="bg-background/50 rounded-lg p-4 border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(exp.begin).getFullYear()} - {exp.end ? new Date(exp.end).getFullYear() : 'Atual'}
                  </div>
                </div>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Idiomas</h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2 bg-background/50 rounded-lg px-4 py-2 border">
                <span className="font-medium">{lang.name}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground capitalize">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}