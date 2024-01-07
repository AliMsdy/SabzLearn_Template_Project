import { useParams } from "react-router-dom";

//components
import { ArticleBox, CourseBox, Loading, SectionHeader } from "@/Components";

//api
import { useSearchQueryResult } from "@/services/query";

//types
import { CourseType,ArticleType } from "@/types/shared";

function SearchPage() {
  const { searchedValue } = useParams();
  const { data, isLoading } = useSearchQueryResult(searchedValue!);
  if (isLoading) {
    return <Loading />
  }
  return (
      <section className="custom-container">
        <SectionHeader title={`نتیجه دوره ها برای جستجوی شما : ${searchedValue}`} />
        <div className="mt-10 grid grid-cols-1 gap-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {data.allResultCourses.length ? (data.allResultCourses.map((course:CourseType) => <CourseBox key={course._id} {...course} />) ): (
            <div className="col-span-3 rounded-md p-4 dark:bg-dark-theme-secondary shadow-custom">
              دوره ای برای جستجوی شما وجود ندارد
            </div>
          )}
        </div>
        <SectionHeader title={`نتیجه مقاله ها برای جستجوی شما : ${searchedValue}`} />
        <div className="mt-10 grid grid-cols-1 gap-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {data.allResultArticles.length ? (data.allResultArticles.map((article:ArticleType) => <ArticleBox key={article._id} {...article} />) ): (
            <div className="col-span-3 rounded-md p-4 dark:bg-dark-theme-secondary shadow-custom">
              مقاله ای برای جستجوی شما وجود ندارد
            </div>
          )}
        </div>
      </section>
  );
}

export { SearchPage };

