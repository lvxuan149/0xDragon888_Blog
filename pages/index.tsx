import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { getUserRepositories } from "@/lib/github";
import { LatestRepos } from "@/components/LatestRepos";
import { Repository } from "@/types/repos";
import { generateRssFeed } from "@/lib/generateRSSFeed";
import { getAllBlogs } from "@/lib/getAllBlogs";
import AllBlogs from "@/components/AllBlogs";
import { ThemeToggle } from "@/components/ThemeToggle";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({
  repos,
  blogs,
}: {
  repos: Repository[];
  blogs: any;
}) {
  const shouldShowMore = () => {
    if (repos && repos.length > 9) {
      return true;
    }
    return false;
  };
  return (
    <Container>
      <Hero />
      <h1 className="text-2xl md:text-3xl text-white font-bold max-w-5xl mx-auto px-8 mt-40 text-center">
        I've been building a lot of <span className="text-primary">cool shits</span>
      </h1>

      <Projects />
      <h1 className="text-2xl md:text-3xl text-white font-bold max-w-5xl mx-auto px-8 mt-40 text-center">
        Latest contributions to <span className="text-primary">open source</span>
      </h1>
      <LatestRepos repos={Array.isArray(repos) ? repos.slice(0, 9) : []} showMore={shouldShowMore()} />

      {/* 修改这里的布局，移除右侧 Uses 列 */}
      <div className="max-w-5xl mx-auto px-8 mt-40">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-8 text-center">
          Dive into <span className="text-primary">technical knowledge</span>
        </h1>
        <AllBlogs blogs={blogs} />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  // FIXME: Add back the github api call
  // const res = await fetch("https://api.github.com/users/tylerdurden");
  // const data = await res.json();

  // FIXME: Add back the rss feed generation

  const data = await getUserRepositories("manuarora700");

  return {
    props: {
      repos: data,
      blogs: (await getAllBlogs())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  };
}
