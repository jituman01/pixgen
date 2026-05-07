import { Button } from "@heroui/react";
import Link from "next/link";

const Category = async () => {
  const res = await fetch("https://pixgen-eta.vercel.app/category.json");
  const categories = await res.json();
  return (
    <div className="mb-5 space-x-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`?category=${category.name.toLowerCase()}`}
        >
          {" "}
          <Button variant="outline" size="sm">
            {category.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Category;