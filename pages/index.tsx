import { PollsList } from "../components/Polls/PollsList";
import { usePolls } from "../hooks/usePolls";
import { Poll } from "../types/polls";

export default function Home({ polls }: { polls: Poll[] }) {
  return (
    <div className="px-4 py-2 flex flex-col gap-4 w-full">
      <form className="flex items-center gap-2">
        <input type="text" className="input w-full" placeholder="Search" />
        <button className="p-2 rounded-md bg-green-700">Search</button>
      </form>
      <PollsList polls={polls} />
    </div>
  );
}

export async function getServerSideProps() {
  const { list } = usePolls();
  const response = await list(1);

  return {
    props: {
      polls: response.items,
    },
  };
}
