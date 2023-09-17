<template>
  <div>
    <div class="container">
      <!-- Loop through the students -->
      <div
        v-for="(projects, studentName) in groupedProjects"
        :key="studentName"
      >
        <!-- Display the student name in a H1 tag inside a box -->
        <h1 style="">
          {{ studentName }}
        </h1>

        <!-- Loop through the projects for the student -->
        <div v-for="project in projects" :key="project.conceptSlug">
          <!-- Display the project name in a H3 tag -->
          <h3>{{ project.conceptSlug }}</h3>

          <!-- Loop through the images for the project -->
          <ul>
            <li
              v-for="img in project.images"
              :key="img.path"
              :class="{
                ai: img.ai,
                ori: img.ori,
              }"
            >
              <img
                :src="'/img/concepts/' + img.path + '?height=200'"
                :alt="'Image de ' + studentName + ' - ' + project.conceptSlug"
                loading="lazy"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import { computed, ref, onMounted } from "vue";
import _ from "lodash";

export default {
  props: {
    uese: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    // 1. Create a mutable reference for projects
    const projects = ref([]);

    // 3. Fetch data from API and update projects
    onMounted(async () => {
      try {
        const response = await fetch("/api/all-concepts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        projects.value = data;
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    });

    // Group the projects by 'uese' prop using lodash
    const groupedProjects = computed(() => {
      return _.chain(projects.value)
        .groupBy("user")
        .mapValues((userProjects) =>
          userProjects
            .filter((project) => project.images && project.images.length > 0)
            .map((project) => ({
              ...project,
              augmentedImages: project.images.map((img) => ({
                path: img.path,
                ...img,
                ratio: img.ratio || "1",
              })),
            }))
        )
        .value();
    });

    return { groupedProjects };
  },
};
</script>
<style scoped>
/* General styles */

li img {
  border: solid 3px black;
}
.ori img {
  border: solid 3px white;
}
.ai img {
  border: dashed 3px #ccc;
}
.container {
  width: 100%;
  max-width: 100%;
}

div {
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 55px;
  font-weight: 900;
  color: #ccc;
  display: inline-block;

  margin-top: 2em;
}

h3 {
  font-size: 22px;
  color: #ccc;
  margin-top: 10px;
  margin-top: 2em;
  margin-bottom: 0.7em;
}

/* Styling for the images swimlane */
ul {
  height: 220px; /* Adjust based on desired fixed height */

  display: flex;
  overflow-x: auto; /* Enables horizontal scrolling within the div */
  overflow-y: hidden; /* Ensures no vertical scroll */
  white-space: nowrap; /* Ensures content doesn't wrap to the next line */

  margin: 0;
  padding: 0;
  list-style: none;
  scrollbar-width: thin; /* Adjusts scrollbar width for Firefox */
  scrollbar-color: #888 #eee; /* Adjusts scrollbar color for Firefox */
  padding-right: 100px;
}

li {
  flex: none; /* Ensures images do not stretch/shrink */
  margin-right: 10px;
  height: 100%;
}

img {
  height: 100%;
  object-fit: cover;
  aspect-ratio: attr(ratio); /* Using webkit ratio property */
  border-radius: 8px;
}

/* Styling for webkit browsers' scrollbars */
ul::-webkit-scrollbar {
  height: 8px; /* Adjust height of the scrollbar */
  width: 0; /* For vertical scrollbars */
  height: 0; /* For horizontal scrollbars */
  display: none; /* This might not be necessary in most cases but added just in case */
}

ul::-webkit-scrollbar-thumb {
  background-color: #888; /* Adjust color of the draggable scrollbar */
  border-radius: 4px; /* Rounds the corners of the draggable scrollbar */
}

ul::-webkit-scrollbar-track {
  background-color: #eee; /* Adjust color of the track of the scrollbar */
}
</style>
