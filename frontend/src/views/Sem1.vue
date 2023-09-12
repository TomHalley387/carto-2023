<style scoped>
/* General styles */

.container {
  width: 100%;
  max-width: 100%;
}

div {
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  color: #ccc;
}

h3 {
  font-size: 18px;
  color: #ccc;
  margin-top: 10px;
}

/* Styling for the images swimlane */
ul {
  height: 300px; /* Adjust based on desired fixed height */

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

<template>
  <div>
    <div class="container">
      <!-- Loop through the students -->
      <div
        v-for="(projects, studentName) in groupedProjects"
        :key="studentName"
      >
        <!-- Display the student name in a H1 tag inside a box -->
        <h1
          style="
            display: inline-block;
            padding: 10px;
            border: 2px solid #333;
            margin-top: 20px;
          "
        >
          {{ studentName }}
        </h1>

        <!-- Loop through the projects for the student -->
        <div v-for="project in projects" :key="project.conceptSlug">
          <!-- Display the project name in a H3 tag -->
          <h3>{{ project.conceptSlug }}</h3>

          <!-- Loop through the images for the project -->
          <ul>
            <li v-for="img in project.images" :key="img.path">
              <img
                :src="'http://localhost:4000/' + img.path"
                :alt="'Image for ' + studentName + ' - ' + project.conceptSlug"
                loading="lazy"
              />
            </li>
          </ul>
        </div>
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
      required: false,
    },
  },
  setup(props) {
    // Group the projects by 'uese' prop using lodash
    const groupedProjects = computed(() => {
      return (
        _.chain(projects)
          // .filter((project) => project.user === props.user)
          .groupBy("user")
          .mapValues((userProjects) =>
            userProjects
              .filter((project) => project.images && project.images.length > 0)

              .map((project) => ({
                ...project,
                augmentedImages: project.images.map((img) => ({
                  path: "http://localhost:4000/concepts/" + img.path,
                  ...img,
                  ratio: img.ratio || "1",
                })),
              }))
          )
          .value()
      );
    });
    /*
    console.log(groupedProjects, 4325);
    // Augment the array of images with computed property
    const augmentedImages = computed(() => {
      return projects.map((project) => ({
        ...project,
        augmentedImages: project.images.map((img) => ({
          path: "http://localhost:4000/" + img.path,
          ...img,

          ratio: img.ratio || "1",
        })),
      }));
    });*/

    return { groupedProjects };
  },
};
</script>
