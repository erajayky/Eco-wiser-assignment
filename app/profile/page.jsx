import { currentUser } from "@clerk/nextjs/server";
import { getRecipies } from "./actions";
import Link from "next/link";

const page = async () => {
  const recipies = await getRecipies();
  const user = await currentUser();

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-3xl text-white italic font-mono">
        Welcome {user?.firstName} {user?.lastName}
      </p>
      <p className="text-2xl text-white font-sans pt-4">Your Recipies</p>
      <div className="flex w-full h-fit justify-end px-3 md:px-8">
        <Link href={`/addrecipe`}>
          <div className="px-4 py-2 border-white border-2 border-solid text-white bg-blue-800 hover:bg-blue-400 rounded-xl">
            Add Recipe
          </div>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap w-[90vw] mt-10">
        {recipies.map((recipie, index) => {
          return (
            <Link href={`/recipie/${recipie._id}`} key={`recipieList${index}`}>
              <div className="w-[256px] min-h-36 border-gray-500 border-solid border-2 mb-2 ml-2 p-6 flex flex-col items-center justify-center">
                <p className="text-white text-xl font-bold italic my-4">
                  {recipie.name}
                </p>
                <p className="text-white text-lg text-balance">
                  {recipie.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default page;
