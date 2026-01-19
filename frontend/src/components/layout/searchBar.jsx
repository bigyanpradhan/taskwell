"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { Field, FieldContent } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useContext } from "react";
import { SearchContext } from "@/hooks/searchContext";

export function SearchBar() {
  const { searchTerm, setSearchTerm, handleClear } = useContext(SearchContext);
  return (
    <div>
      <Field>
        <FieldContent>
          <InputGroup className="w-60 md:w-100 lg:w-130">
            <InputGroupInput
              placeholder="Search Tasks..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <InputGroupAddon align="inline-end">
              {!searchTerm.trim() ? (
                <SearchIcon className="cursor-pointer hover:text-amber-50" />
              ) : (
                <XIcon
                  className="cursor-pointer hover:text-amber-50"
                  onClick={handleClear}
                />
              )}
            </InputGroupAddon>
          </InputGroup>
        </FieldContent>
      </Field>
    </div>
  );
}
