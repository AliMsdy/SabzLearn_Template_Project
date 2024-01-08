import { BreadCrumb, CourseBox, Loading, Pagination } from "@/Components";
import { useCourses } from "@/services/query";

//type
import { CourseType } from "@/types/shared";
import { useState } from "react";

function AllCoursesPage() {

  const {data:courses=[],isLoading} = useCourses()
  const [shownCourses,setShownCourses] = useState([])
  if(isLoading) return <Loading />
  return (
    <section className="custom-container">
      {/* BREADCRUMB START */}
      <BreadCrumb />
      {/* BREADCRUMB END */}

      {/* COURSE BOXES START */}
      <div className="mt-16 grid grid-cols-1 gap-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shownCourses.map((course: CourseType) => (
          <CourseBox key={course.name} {...course} />
        ))}
      </div>
      {/* COURSE BOXES END */}

      {/* PAGINATION START */}
      <Pagination items={courses} setShowedItems={setShownCourses} />
      {/* PAGINATION END */}
    </section>
  );
}

export { AllCoursesPage };

