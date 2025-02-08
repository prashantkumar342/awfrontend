import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRightWaves } from "@mynaui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDraftCourses } from "@/redux/api/getDraftCourseSlice";

function Drafts() {
  const dispatch = useDispatch();
  const { draftCourses } = useSelector((state) => state.draftCourses);

  useEffect(() => {
    dispatch(getDraftCourses());
    if (draftCourses) {
      console.log(draftCourses.courseId)
    }
  }, [dispatch]);

  return (
    <div>
      {(location.pathname === "/administrativeworld/admin/course/draft" ||
        location.pathname === "/administrativeworld/admin/course/draft/") && (
          <>
            <div className="p-2 flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  className="pl-10 py-5"
                  type="search"
                  id="search"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="p-2 flex flex-col gap-3 justify-center">
              <span className="text-xl">Draft Courses</span>
              <div className="flex flex-wrap gap-3">
                {draftCourses &&
                  draftCourses.map((item) => (
                    <Card
                      key={item._id}
                      className="w-60 p-2 shadow-md"
                    >
                      <div className="flex p-2 justify-center">
                        <img
                          src={item.courseId.thumbnail}
                          alt={item.courseId.courseName}
                          className="w-full object-cover rounded-md"
                        />
                      </div>
                      <CardHeader className="text-sm font-medium p-2">
                        {item.courseId.courseName}
                      </CardHeader>
                      <CardContent className="flex flex-col gap-2 p-2">
                        <div>
                          <p>{item.courseId.courseDescription.slice(0, 100)}...</p>
                        </div>
                        <div className="ml-auto">
                          <Button size="sm">Continue <ArrowRightWaves size={16} /></Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </>
        )}
    </div>
  );
}

export default Drafts;
