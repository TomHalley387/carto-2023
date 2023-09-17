<script>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "YourComponentName", // Replace with your desired component name

  components: {
    HelloWorld,
    // Ensure to import and add any other components like 'it-switch' and 'it-toggle' if they are custom components.
  },

  setup() {
    // Data
    const toggleIconsValue = ref("light");
    const toggleIconsValue2 = ref(true);

    // Any methods or computed properties can go here.
    // For now, it seems you only have the reactive properties (`ref`s).

    // Return values that the template can access
    return {
      toggleIconsValue,
      toggleIconsValue2,
    };
  },
};
</script>

<template>
  <div>
    <header>
      <!-- Logo and title at the top -->
      <div class="logo-title">
        <br />
        <br />
        <br />
        <br />
        <img
          alt="logo"
          class="logo"
          src="@/assets/brand/logo1.webp"
          width="225"
          height="225"
        />
        <HelloWorld msg="École de Montréal" />
      </div>

      <!-- Navigation below the title -->
      <nav>
        <RouterLink to="/">concepts par membres (sem1)</RouterLink>
        <RouterLink to="/articles">articles</RouterLink>
        <!-- 
        <RouterLink to="/demo">demo</RouterLink>
        <RouterLink to="/about">About</RouterLink>
              <it-switch
        v-model="toggleIconsValue2"
        variant="success"
        label="Success"
      />

         -->
      </nav>
    </header>

    <!-- RouterView within a section with minimal margins -->
    <section class="route-section">
      <div style="padding: 30px">
        <RouterView />
      </div>
    </section>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo-title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.logo {
  display: block;
  margin-right: 1rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.route-section {
  padding-left: 1rem;
  width: 100%;
  width: 100vw;
  max-width: 100%;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  nav {
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>
