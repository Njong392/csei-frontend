import { defineStore } from "pinia";
import fetchWithCookies from "../utils/fetchWrapper";
import router from "@/router";
import filterUserFields  from "../utils/filterUserFields";


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
        await this.fetchMember(memberId)
        this.isLoading = false;
        router.push(this.returnUrl || "/dashboard")
      } catch(err) {
        this.user = null
        this.loading = false;
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
          await this.fetchMember(this.user);
        }
      } catch {
        this.user = null;
        this.isAuthenticated = false;
        router.replace("/login");
      }
      finally {
        this.isAuthResolved = true;
      }
    },
    async fetchMember(memberId){
      this.loading = true
      this.error = null
      try{
        const res = await fetchWithCookies(`${baseUrl}/${memberId}`, "GET")
        this.user = filterUserFields(res)
        console.log(this.user)
      } catch(err){
        this.error = err.message
      } finally{
        this.loading = false
      }
    }
  },
});