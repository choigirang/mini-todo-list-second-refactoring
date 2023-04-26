import React from "react";
import { useInfiniteQuery } from "react-query";

export default function Example() {
  const initialUrl = "https://swapi.dev/api/people/";
  const fetchUrl = async (Url: string) => {
    const res = await fetch(Url);
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  console.log(data);

  return <div>Example</div>;
}
