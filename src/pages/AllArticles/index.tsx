import { useState } from "react";

import { ArticleBox, BreadCrumb, Loading, Pagination } from "@/Components";
//api
import { useQueryCall } from "@/hooks";

//type
import { ArticleType } from "@/types/shared";

function AllArticlesPage() {
  const { data: articles = [], isLoading } = useQueryCall(["Articles"], {
    url: "/articles",
  });
  const [shownArticles, setShownArticles] = useState([]);

  if (isLoading) return <Loading />;
  return (
    <section className="custom-container">
      {/* BREADCRUMB START */}
      <BreadCrumb />
      {/* BREADCRUMB END */}

      {/* COURSE BOXES START */}
      <div className="mt-16 grid grid-cols-1 gap-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shownArticles.map((article: ArticleType) => (
          <ArticleBox key={article._id} {...article} />
        ))}
      </div>
      {/* COURSE BOXES END */}

      {/* PAGINATION START */}
      <Pagination
        items={articles.filter((article: ArticleType) => article.publish)}
        setShowedItems={setShownArticles}
      />
      {/* PAGINATION END */}
    </section>
  );
}

export { AllArticlesPage };
