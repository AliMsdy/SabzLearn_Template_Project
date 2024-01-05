import { ArticleBox, BreadCrumb, Pagination } from "@/Components";
import { useArticles } from "@/services/query";

//type
import { ArticleType } from "@/types/shared";
import { useState } from "react";

function AllArticlesPage() {
  const { data: articles = [] } = useArticles();
  const [shownArticles, setShownArticles] = useState([]);
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
      <Pagination items={articles} setShowedItems={setShownArticles} />
      {/* PAGINATION END */}
    </section>
  );
}

export { AllArticlesPage };
