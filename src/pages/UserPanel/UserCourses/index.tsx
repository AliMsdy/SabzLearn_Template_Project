import { useState } from "react";
//context
import { useAuthContext } from "@/context/AuthContext";

//components
import { UserPanelCourseBox } from "@/Components/UserPanel";
//api
import { useQueryCall } from "@/hooks";
//types
import { CourseType } from "@/types/shared";
//utils
import { cn } from "@/lib/utils";

function UserCourses() {
  const { token } = useAuthContext();
  const [filter, setFilter] = useState("all");
  const { data: userCourses = [] } = useQueryCall(["UserCourses"], {
    url: "/users/courses",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const shownCourses = () => {
    if (filter === "all") {
      return userCourses;
    } else if (filter === "free") {
      return userCourses.filter(
        ({ course }: { course: CourseType }) => !course.price,
      );
    } else if (filter === "paid") {
      return userCourses.filter(
        ({ course }: { course: CourseType }) => course.price,
      );
    }
  };
  return (
    <div>
      <h2 className="mt-6 text-2xl font-bold sm:mt-0">دوره های ثبت نام شده</h2>

      <div className="mt-6 flex gap-4 border-b border-solid border-primary-color pb-3 text-sm sm:text-base">
        <div
          onClick={() => setFilter("all")}
          className={cn(
            "cursor-pointer transition-all duration-200 hover:text-primary-color",
            {
              "text-primary-color": filter === "all",
            },
          )}
        >
          همه دوره ها
        </div>
        <div
          onClick={() => setFilter("free")}
          className={cn(
            "cursor-pointer transition-all duration-200 hover:text-primary-color",
            {
              "text-primary-color": filter === "free",
            },
          )}
        >
          دوره های رایگان
        </div>
        <div
          onClick={() => setFilter("paid")}
          className={cn(
            "cursor-pointer transition-all duration-200 hover:text-primary-color",
            {
              "text-primary-color": filter === "paid",
            },
          )}
        >
          دوره های پولی
        </div>
      </div>

      <div className="mt-8 ">
        {shownCourses().length === 0 ? (
          <div className="text-center">دوره ای برای نمایش وجود ندارد</div>
        ) : (
          <>
            {shownCourses().map(({ course }: { course: CourseType }) => (
              <UserPanelCourseBox key={course._id} {...course} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export { UserCourses };
