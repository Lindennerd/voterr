import { useState } from "react";
import { usePolls } from "../../hooks/usePolls";
import { Option, Poll } from "../../types/polls";

export function VoteForm({
  poll,
  onVoted,
}: {
  poll: Poll;
  onVoted: (option: Option) => void;
}) {
  const [selected, setSelected] = useState("");
  const { vote } = usePolls();

  async function handleVote(e: any) {
    e.preventDefault();

    const option = await vote(selected);
    onVoted(option);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleVote}>
      {poll.options &&
        poll.options.map((option) => (
          <label
            key={option.id}
            className="cursor-pointer py-2 px-4 rounded-md shadow-sm hover:shadow-lg bg-gray-700 transition-all"
          >
            <input
              type="radio"
              name="answer"
              onChange={(e) => setSelected((sel) => option.id)}
            />{" "}
            {option.text}
            {option.description && (
              <span className="text-gray-400 ml-4">{option.description}</span>
            )}
          </label>
        ))}

      <button className="p-2 rounded-md bg-green-700 hover:shadow-md">
        Vote!
      </button>
    </form>
  );
}
