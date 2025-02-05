import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ClipboardList, Tag, Info, Percent, Upload, IndianRupee } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearCourseState, createCourse } from "@/redux/api/createCourseSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "@/redux/api/getCategorySlice";
import PrimarySpinner from "../Loaders/PrimarySpinner";

function CourseInfo() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { categories } = useSelector((state) => state.getCategory);
  const { status, loading } = useSelector((state) => state.createCourse);

  const [courseDetails, setCourseDetails] = useState({
    thumbnail: "",
    courseName: "",
    courseDescription: "",
    price: "",
    category: "",
    whatYouWillLearn: "",
    tag: "",
    instructions: "",
    couponCode: "",
  });

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (status === 200) {
      toast.dismiss();
      toast.success("Course created successfully!");
      dispatch(clearCourseState());
      setCourseDetails({
        thumbnail: null,
        courseName: "",
        courseDescription: "",
        price: "",
        category: "",
        whatYouWillLearn: "",
        tag: "",
        instructions: "",
        couponCode: "",
      });
    } else if (status && status !== 200) {
      toast.error(`Error: ${status}`);
      dispatch(clearCourseState());
    }
  }, [status, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseDetails({ ...courseDetails, thumbnail: file });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value.name);
    setCourseDetails({ ...courseDetails, category: value._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDetails = {
      ...courseDetails,
      tag: JSON.stringify(courseDetails.tag.split(",").map((item) => item.trim())),
      instructions: JSON.stringify(courseDetails.instructions.split(",").map((item) => item.trim())),
    };
    try {
      dispatch(createCourse(updatedDetails));
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    }
  };

  return (
    <div className="h-full w-full">
      <Card className="p-5 py-10">
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Thumbnail Image */}
            <div>
              <Label htmlFor="thumbnailImage" className="text-sm font-medium">
                Thumbnail Image
              </Label>
              <div className="relative">
                <input
                  className="hidden"
                  type="file"
                  id="thumbnailImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="thumbnailImage"
                  className="block w-full p-5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="flex items-center justify-center">
                    <Upload className="mr-2 text-gray-500" />
                    <span className="text-gray-500">Choose file</span>
                  </div>
                </label>
                {courseDetails.thumbnail && (
                  <div className="mt-2 text-sm text-gray-600">{courseDetails.thumbnail.name}</div>
                )}
              </div>
            </div>

            {/* Course Fields */}
            {[
              { id: "courseName", label: "Course Name", icon: ClipboardList },
              { id: "courseDescription", label: "Course Description", icon: Info },
              { id: "price", label: "Price", icon: IndianRupee },
              { id: "whatYouWillLearn", label: "What You Will Learn", icon: ClipboardList },
              { id: "tag", label: "Tag (comma separated)", icon: Tag },
              { id: "instructions", label: "Instructions (comma separated)", icon: ClipboardList },
              { id: "couponCode", label: "Coupon Code", icon: Percent },
            ].map(({ id, label, icon: Icon }) => (
              <div key={id}>
                <Label htmlFor={id} className="text-sm font-medium">
                  {label}
                </Label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    className="pl-10 py-3 transition-all duration-300"
                    type="text"
                    id={id}
                    placeholder={label}
                    value={courseDetails[id]}
                    onChange={(e) => setCourseDetails({ ...courseDetails, [id]: e.target.value })}
                  />
                </div>
              </div>
            ))}

            {/* Category Selection */}
            <div>
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full text-left">
                      {selectedCategory || "Select Category"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Select a Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup onValueChange={handleCategoryChange}>
                      {categories?.data?.length > 0 ? (
                        categories.data.map((cat) => (
                          <DropdownMenuRadioItem key={cat._id} value={cat}>
                            {cat.name}
                          </DropdownMenuRadioItem>
                        ))
                      ) : (
                        <p className="text-center text-gray-500">No Categories Found</p>
                      )}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 flex justify-end">
              {loading ? (
                <Button disabled className="flex items-center gap-2">
                  <span className="text-lg">Save</span>
                  <PrimarySpinner />
                </Button>
              ) : (
                <Button type="submit" className="flex items-center gap-2">
                  <span className="text-lg">Save</span>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseInfo;
