import { defineStore } from "pinia";
import fetchWithCookies from "../utils/fetchWrapper";
import router from "@/router";
import { useMemberStore } from "./MemberData";


const baseUrl = `${import.meta.env.VITE_API_URL}/members`;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    returnUrl: null,
    error: null,
    isLoading: false,
    isAuthResolved: false
  }),
  actions: {
    async login({ memberId, password }) {
      
      this.isLoading = true;
      this.error = null;
      try {
       await fetchWithCookies(`${baseUrl}/login`, "POST", {
          memberId,
          password,
        });

        this.isAuthenticated = true;
        this.user = memberId
        this.isLoading = false;
        router.replace(this.returnUrl || "/dashboard");
        return this.user
      } catch(err) {
        this.user = null
        this.isLoading = false;
        this.error = err.message
      } finally{
        
        this.isAuthResolved = true;
      }
    },
    async logout() {
      try {
        await fetchWithCookies(`${baseUrl}/logout`, "POST");
        router.replace("/login");
      } catch {
        this.error = "Logout failed. Please try again.";
      }

      this.user = null;
      this.isAuthenticated = false;
      
    },
    async checkAuth() {
      try {
        const res = await fetchWithCookies(`${baseUrl}/me`, "GET");
        this.user = res.user;
        this.isAuthenticated = true;
        if(this.user){
          const memberStore = useMemberStore()
          await memberStore.fetchMember(this.user)
        }
      } catch {
        this.user = null;
        this.isAuthenticated = false;
        
      }
      finally {
        this.isAuthResolved = true;
      }
    },
  },
});