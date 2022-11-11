import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePolls } from "../../hooks/usePolls";
import { Option, Poll } from "../../types/polls";

export function PollForm() {
  const [poll, setPoll] = useState<Poll>({} as Poll);
  const [optionTemp, setOptionTemp] = useState<Option>({} as Option);
  const { create } = usePolls();
  const router = useRouter();

  function addOption() {
    if (!optionTemp.text) {
      toast.warn("You can't add an option without a text");
      return true;
    }

    setPoll((poll) => ({
      ...poll,
      options: [
        ...(poll.options ?? []),
        {
          text: optionTemp.text,
          description: optionTemp.description,
          id: "",
          poll: "",
          votes: 0,
        },
      ],
    }));

    setOptionTemp((option) => ({
      ...option,
      text: "",
      description: "",
    }));
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!poll.title || !poll.options) {
      toast.warn("There are required fields not provided");
      return;
    }

    const createdPoll = await create(poll);
    router.push("/poll/" + createdPoll.id);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="font-semibold text-2xl y-2">New Poll</h1>

      <input
        value={poll.title ?? ""}
        onChange={(e) =>
          setPoll((poll) => ({ ...poll, title: e.target.value }))
        }
        type="text"
        className="input"
        placeholder="Poll Title"
      />
      <textarea
        name="poll-description"
        value={poll.description ?? ""}
        onChange={(e) =>
          setPoll((poll) => ({ ...poll, description: e.target.value }))
        }
        className="input"
        placeholder="Describe the poll you're creating (optional)"
      ></textarea>

      <h1 className="font-semibold text-2xl border-b py-2">Poll Options</h1>

      <div className="flex items-end w-full gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <input
            type="text"
            className="input"
            placeholder="Option Text"
            value={optionTemp.text ?? ""}
            onChange={(e) =>
              setOptionTemp((option) => ({ ...option, text: e.target.value }))
            }
          />
          <textarea
            name=""
            className="input"
            placeholder="Option Description (optional)"
            value={optionTemp.description ?? ""}
            onChange={(e) =>
              setOptionTemp((option) => ({
                ...option,
                description: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <button
          role="button"
          className="p-2 rounded-md bg-green-700"
          onClick={(e) => {
            e.preventDefault();
            addOption();
          }}
        >
          Add Option
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {poll.options &&
          poll.options.map((option, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 justify-start bg-gray-700 rounded-md shadow-sm py-2 px-4"
            >
              <span>Text: {option.text}</span>
              {option.description && (
                <span> Description: {option.description}</span>
              )}
            </div>
          ))}
      </div>

      <button className="w-full p-2 bg-green-700">Save</button>
    </form>
  );
}
