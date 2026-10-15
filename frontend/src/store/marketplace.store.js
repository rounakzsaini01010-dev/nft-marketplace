import { create } from "zustand";

export const useMarketplaceStore = create((set) => ({
  listings: [],
  selectedListingId: null,
  setListings: (listings) => set({ listings }),
  selectListing: (id) => set({ selectedListingId: id }),
}));
