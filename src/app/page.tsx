import Hero from "@/components/home page/Hero";
import LatestLessons from "@/components/home page/LatestLessons";
import ImportanceOfHtml from "@/components/home page/ImportanceOfHtml";
import ImportanceOfC from "@/components/home page/ImportanceOfC";
import MostLikedLessons from "@/components/home page/MostLikedLessons";

export default function Home() {
  return (
    <main>
      <Hero />
      <LatestLessons />
      <ImportanceOfHtml />
      <ImportanceOfC />
      <MostLikedLessons />
    </main>
  );
}
