"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateRecipe } from "./action";
import { getRecipedetail } from "./action";

const page = () => {
  const params = useParams();
  const { id } = params;

  const [recipie, setRecipie] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchRecipie = async () => {
      const res = await getRecipedetail(id);
      setRecipie(res);
    };
    fetchRecipie();
  }, []);

  useEffect(() => {
    setName(recipie.name);
    setDescription(recipie.description);
    setInstruction(recipie.instructions);
    setIngredients(recipie.ingredients);
    setSteps(recipie.steps);
  }, [recipie]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddSteps = () => {
    setSteps([...steps, ""]);
  };

  const handleStepChange = (index, event) => {
    const newSteps = [...steps];
    newSteps[index] = event.target.value;
    setSteps(newSteps);
  };

  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <p className="text-3xl font-serif italic my-4 md:mb-8">Edit your recipe</p>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name" className="font-lg italic">Name of your Recipe</Label>
        <Input
          type="text"
          id="name"
          placeholder="Enter name of your recipe"
          onChange={handleNameChange}
          className="mt-2 mb-5"
          value={name}
        />
        <Label htmlFor="instruction" className="font-lg italic">Instructions your Recipe</Label>
        <Input
          type="text"
          id="instruction"
          placeholder="Any instruction for your recipe"
          onChange={handleInstructionChange}
          className="mt-2 mb-5"
          value={instruction}
        />
        <Label htmlFor="description" className="font-lg italic">Description for your Recipe</Label>
        <Textarea
          type="description"
          placeholder="Description of your Recipe."
          onChange={handleDescriptionChange}
          className="mt-2 mb-5"
          value={description}
        />

        <Label htmlFor="ingredients" className="mt-2 mb-5">Ingredients</Label>
        {ingredients?.map((ingredient, index) => (
          <Input
            key={index}
            type="text"
            value={ingredient}
            onChange={(event) => handleIngredientChange(index, event)}
            placeholder={`Ingredient ${index + 1}`}
            className="mt-2 mb-5"
          />
        ))}
        <button type="button" onClick={handleAddIngredient} className="border-white border-solid border-2 bg-green-700 hover:border-b-green-400 w-fit px-4 py-2 rounded-2xl mb-5">
          Add Ingredient
        </button>

        <Label htmlFor="ingredients" className="font-lg italic">Steps</Label>
        {steps?.map((step, index) => (
          <Input
            key={index}
            type="text"
            value={step}
            onChange={(event) => handleStepChange(index, event)}
            placeholder={`Step ${index + 1}`}
            className="mt-2 mb-5"
          />
        ))}
        <button type="button" onClick={handleAddSteps} className="border-white border-solid border-2 bg-green-700 hover:border-b-green-400 w-fit px-4 py-2 rounded-2xl my-5">
          Add Step
        </button>

        <button
          onClick={() =>
            updateRecipe(name, instruction, description, ingredients, steps, id)
          }
          className="border-white border-solid border-2 bg-blue-700 hover:border-b-blue-400 w-fit px-4 py-2 rounded-3xl"
        >
          Save edits
        </button>
      </div>
    </div>
  );
};

export default page;
