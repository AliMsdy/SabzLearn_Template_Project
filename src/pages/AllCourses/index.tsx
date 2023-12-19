import { BreadCrumb, CourseBox, Pagination } from "@/Components";

//list
import { CourseList } from "@/shared/Lists";

function AllCoursesPage() {
  return (
    <section className="custom-container">
      {/* BREADCRUMB START */}
      <BreadCrumb />
      {/* BREADCRUMB END */}

      {/* COURSE BOXES START */}
      <div className="mt-16 grid grid-cols-1 gap-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {CourseList.map((item) => (
          <CourseBox key={item.title} {...item} />
        ))}
      </div>
      {/* COURSE BOXES END */}

      {/* PAGINATION START */}
      <Pagination />
      {/* PAGINATION END */}
    </section>
  );
}

export { AllCoursesPage };
