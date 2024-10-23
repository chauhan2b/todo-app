import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center pt-40 m-10 md:m-20">
      <h1 className="text-3xl font-bold">
        Welcome to your personalized Todo App
      </h1>
      <p className="text-gray-500 mt-6">Here you can manage your todos.</p>
      <Button asChild className="mt-6">
        <Link href={"/todos"}>
          <ArrowRight />
          Enter App
        </Link>
      </Button>
    </div>
  );
}
