/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from "next/head";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import dynamic from "next/dynamic";
import { useGithubUser } from "./query-sample2/qeurySameple2";

const ReactQueryDevtoolsProduction = dynamic(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    d => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <QueryClientProvider client={queryClient}>
          <Example />
          <Example2 />
          <ReactQueryDevtoolsProduction />
        </QueryClientProvider>
      </main>
    </>
  );
}

export const Example = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://api.github.com/repos/tannerlinsley/react-query")
        .then(res => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>Example1</h1>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
};

export const Example2 = () => {
  const { isLoading, error, data, isFetching } = useGithubUser();

  if (isLoading) return "Loading...";
  if (error)
    console.log("An error occurred while fetching the user data ", error);

  return (
    <div>
      <h1>Example2</h1>
      <h2>name: {data?.name}</h2>
      <p>bio: {data?.bio}</p>
      <p>blog: {data.blog}</p>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
};
