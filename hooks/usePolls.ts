import { PocketbaseClient } from "../lib/pocketbase.client";
import { ListRequest } from "../types/pocketbase";
import { Poll } from "../types/polls";

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

      return {...response, items: response.items.map(it => ({
        created: it.created,
        createdBy: it.createdBy,
        description: it.description,
        id: it.id,
        slug: it.slug,
        title: it.title,
        validUntil: it.validUntil
      }))};
    },
  };
}
