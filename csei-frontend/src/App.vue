<template>
  <div class="grid grid-cols-5">
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
</template>

<script setup>
import Sidebar from './components/layout/LeftSidebar.vue';
import Navbar from './components/layout/Navbar.vue';
import Menu from './components/layout/RightSidebar.vue';
import { RouterView } from 'vue-router';

</script>

