import { PocketbaseClient } from "../lib/pocketbase.client";
import { ListRequest } from "../types/pocketbase";
import { Option, Poll, VotedEvent } from "../types/polls";

export function usePolls() {
  const pb = PocketbaseClient.getInstance();
  const POLLS_PAGE_SIZE = 50;

  return {
    list: async (page: number): Promise<ListRequest<Poll>> => {
      const response = await pb.client.records.getList(
        "poll",
        page,
        POLLS_PAGE_SIZE,
        {
          sort: "-created",
        }
      );

      return {
        ...response,
        items: response.items.map((it) => ({
          created: it.created,
          createdBy: it.createdBy,
          description: it.description,
          id: it.id,
          slug: it.slug,
          title: it.title,
          validUntil: it.validUntil,
        })),
      };
    },

    get: async (id: string): Promise<Poll> => {
      const response = await pb.client.records.getFullList("options", 200, {
        filter: `poll = "${id}"`,
        expand: "poll",
      });

      if (!response.length) return {} as Poll;
      const poll = response[0]["@expand"].poll as Poll;
      poll.options = response.map((it) => ({
        id: it.id,
        text: it.text,
        description: it.description,
        votes: it.votes,
        poll: poll.id,
      }));

      return poll;
    },

    getRealtime: async (
      pollId: string,
      callback: (record: VotedEvent) => void
    ) => {
      await pb.client.realtime.unsubscribe();
      await pb.client.realtime.subscribe("votedEvent", (e) => {
        const event = e.record as unknown as VotedEvent;
        if (event.poll === pollId) callback(event);
      });
    },

    vote: async (optionId: string): Promise<Option> => {
      const option = (await pb.client.records.getOne(
        "options",
        optionId
      )) as unknown as Option;

      const response = await pb.client.records.update("options", optionId, {
        votes: option.votes + 1,
      });

      await pb.client.records.create("votedEvent", {
        option: optionId,
        poll: option.poll,
      });

      return response as unknown as Option;
    },

    create: async (poll: Poll): Promise<Poll> => {
      poll.createdBy = "hpganpcqe7g0cv0";
      poll.slug = poll.title.replace(" ", "-");
      const createdPoll = (await pb.client.records.create(
        "poll",
        poll
      )) as unknown as Poll;

      if (!poll.options) throw new Error("Can't have a poll without options");

      for (let i in poll.options) {
        const option = poll.options[i];
        if (!createdPoll.options) createdPoll.options = [];

        createdPoll.options.push(
          (await pb.client.records.create("options", {
            text: option.text,
            description: option.description,
            poll: createdPoll.id,
          })) as unknown as Option
        );
      }

      return createdPoll;
    },
  };
}
