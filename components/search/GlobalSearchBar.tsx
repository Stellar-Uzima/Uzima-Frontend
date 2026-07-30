"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

export default function GlobalSearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const debounced = useDebounce(query, 300);

  const submit = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "/") {
        event.preventDefault();

        document
          .getElementById("global-search")
          ?.focus();
      }

      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        document
          .getElementById("global-search")
          ?.focus();
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!debounced.trim()) return;

    router.replace(
      `/search?q=${encodeURIComponent(debounced)}`,
    );
  }, [debounced]);

  return (
    <input
      id="global-search"
      value={query}
      placeholder="Search healers, tasks, knowledge..."
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") submit();
      }}
      className="w-full rounded-md border p-2"
    />
  );
}