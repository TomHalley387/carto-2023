<template>
  <div>
    <div v-for="group in groupedProjects" :key="group[0]">
      <h2>{{ group[0] }}</h2>
      <div v-for="project in group[1]" :key="project.id">
        <h3>{{ project.student }}</h3>
        <ul>
          <li v-for="img in project.augmentedImages" :key="img.path">
            <img
              :src="img.path"
              :alt="'Image for ' + project.student"
              :style="{ aspectRatio: img.ratio }"
            />
          </li>
        </ul>

        {{ augmentedImages }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import _ from "lodash";
import projects from "@/frontEndData.json"; // Import JSON directly

export default {
  props: {
    uese: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // Group the projects by 'uese' prop using lodash
    const groupedProjects = computed(() => {
      return _.chain(projects)
        .filter((project) => project.uese === props.uese)
        .groupBy("uese")
        .toPairs()
        .value();
    });

    // Augment the array of images with computed property
    const augmentedImages = computed(() => {
      return projects.map((project) => ({
        ...project,
        augmentedImages: project.images.map((img) => ({
          ...img,
          ratio: img.ratio || "1:1",
        })),
      }));
    });

    return { groupedProjects, augmentedImages };
  },
};
</script>

<style scoped>
/* You can add any styles specific to the component here */
</style>
