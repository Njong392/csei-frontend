import { defineStore } from "pinia";
import fetchWithCookies from "../utils/fetchWrapper";
import filterUserFields from "../utils/filterUserFields";


const baseUrl = `${import.meta.env.VITE_API_URL}/members`;


export const useMemberStore = defineStore("member", {
  state: () => ({
    member: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMember(memberId) {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetchWithCookies(`${baseUrl}/${memberId}`, "GET");
        this.member = filterUserFields(res);
        //console.log(this.member);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});