"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import healers from "@/lib/mock/healers";
import tasks from "@/lib/mock/tasks";
import knowledge from "@/lib/mock/knowledge";

function filter(items: any[], query: string) {
  return items.filter((item) =>
    JSON.stringify(item)
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
}

function SearchResults() {
  const params = useSearchParams();

  const query = params.get("q") || "";

  if (!query) {
    return <div className="p-8">Start typing to search.</div>;
  }

  const healerResults = filter(healers, query);
  const taskResults = filter(tasks, query);
  const knowledgeResults = filter(knowledge, query);

  if (!healerResults.length && !taskResults.length && !knowledgeResults.length) {
    return <div className="p-8">No results found.</div>;
  }

  return (
    <div className="space-y-10">
      <section>
        <h2>Healers ({healerResults.length})</h2>

        {healerResults.map((healer) => (
          <div key={healer.id}>{healer.name}</div>
        ))}
      </section>

      <section>
        <h2>Tasks ({taskResults.length})</h2>

        {taskResults.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </section>

      <section>
        <h2>Knowledge ({knowledgeResults.length})</h2>

        {knowledgeResults.map((article) => (
          <div key={article.id}>{article.title}</div>
        ))}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}