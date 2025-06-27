<template>
  <div v-if="auth.isAuthResolved">
    <div v-if="isLoginPage">
      <RouterView />
    </div>

    <div v-else class="grid grid-cols-5">
      <div class="col-span-1 bg-columbia">
        <Sidebar />
      </div>


      <div class="col-span-4">
        <Navbar />

        <!--Nested grid under navbar-->
        <div class="grid grid-cols-4 bg-powder p-4 gap-2">
          <span class="col-span-3 bg-white rounded-xl shadow-lg">
            <!--Main content/outlet-->
            <RouterView />
          </span>

          <span class="col-span-1 bg-white rounded-lg shadow-lg">
            <Menu />
          </span>

        </div>

      </div>
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
    
  </div>
</template>

<script setup>
import Sidebar from './components/layout/LeftSidebar.vue';
import Navbar from './components/layout/Navbar.vue';
import Menu from './components/layout/RightSidebar.vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { computed, watch } from 'vue';
import { useAuthStore } from './stores/UserAuth';

const route = useRoute()
const router = useRouter()
const isLoginPage = computed(() => route.path === '/login')
const auth = useAuthStore()

// watch for auth resolution and redirect from root
watch(
  () => [auth.isAuthResolved, auth.isAuthenticated, route.path], ([resolved, authenticated, path]) => {
    if(resolved && path === '/'){
      if(authenticated){
        router.replace('dashboard')
       
      } else{
        router.replace('login')
      }
    }
  },
  { immediate: true }
)

</script>

