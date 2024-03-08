"use client";

import Link from "next/link";
import { CategoryType } from "@prisma/client";
import { useFormState } from "react-dom";

import { createCategory } from "@/lib/categories/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";

const categoryTypes = [CategoryType.EXPENSE, CategoryType.INCOME];
const initialState = {
  message: "",
  errors: {},
};

export const NewCategoryForm = () => {
  const [state, formAction] = useFormState(createCategory, initialState);

  return (
    <form action={formAction} autoComplete="off">
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input autoFocus type="text" name="name" id="name" />
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="type">Type</Label>
        <Select name="type" defaultValue={CategoryType.EXPENSE}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {categoryTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link href="/categories">Cancel</Link>
        </Button>
        <SubmitButton>Create</SubmitButton>
      </div>
    </form>
  );
};
