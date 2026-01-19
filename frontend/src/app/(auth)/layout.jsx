"use client";

import { SearchContext } from "@/hooks/searchContext";

export default function AuthLayout({ children }) {
  return (
    <section>
      <SearchContext.Provider value={null}>{children}</SearchContext.Provider>
    </section>
  );
}
