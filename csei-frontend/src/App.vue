<template>
  <div v-if="auth.isAuthResolved">
    <div class="grid grid-cols-5" v-if="isLayoutPage">
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

    <div v-else>
    <RouterView />
  </div>
  </div>

  <div v-else>
    <DashboardSkeleton />
  </div>
</template>

<script setup>
import Sidebar from './components/layout/LeftSidebar.vue';
import Navbar from './components/layout/Navbar.vue';
import Menu from './components/layout/RightSidebar.vue';
import { RouterView, useRoute } from 'vue-router';
import { computed, onMounted} from 'vue';
import { useAuthStore } from './stores/UserAuth';
import DashboardSkeleton from './components/skeleton/DashboardSkeleton.vue';

const route = useRoute()
const isLayoutPage = computed(() => route.meta.requiresAuth);
const auth = useAuthStore()

onMounted(() => {
  if(!auth.isAuthResolved){
    auth.checkAuth()
  }
})



</script>

