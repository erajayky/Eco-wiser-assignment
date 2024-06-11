"use client";
import { useAuth } from "@clerk/nextjs";
import { MdOutlineDelete } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { deleteRecipie, getRecipedetail } from "./action";
import { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const { id } = params;
  const { userId } = useAuth();
  const router = useRouter();
  const [recipie, setRecipie] = useState({});

  useEffect(() => {
    const fetchRecipie = async () => {
      const res = await getRecipedetail(id);
      setRecipie(res);
    };
    fetchRecipie();
  }, []);

  return (
    <div className="text-white">
      {recipie && (
        <div className="mx-10 ">
          {userId === recipie.clerkId && (
            <div className="flex pr-8 justify-end">
              <MdOutlineDelete
                className=" text-red-700 size-12"
                onClick={() => {
                  deleteRecipie(id);
                }}
              />
              <button
                onClick={() => {
                  router.push(`/editrecipie/${id}`);
                }}
                className="border-white border-solid border-2 bg-green-700 hover:bg-green-400 w-fit px-4 py-2 rounded-xl"
              >
                Edit
              </button>
            </div>
          )}
          <p className="text-3xl italic text-center">{recipie.name}</p>
          <p className="text-xl my-4">{recipie.description}</p>
          <p className="text-xl italic">{recipie.instructions}</p>
          <p className="text-2xl font-semibold">
            Ingredients: {"  "}
            {recipie?.ingredients?.map((ing, ind) => (
              <span key={`ingredients${ind}`} className="text-xl italic">{ing}, </span>
            ))}
          </p>
          <h2 className="text-2xl font-semibold mt-5 mb-2">Steps</h2>
          <ol>
            {recipie?.steps?.map((step, ind) => (
              <li key={`step${ind}`} className="text-xl italic">
                {ind + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default page;
