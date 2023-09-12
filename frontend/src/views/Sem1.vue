<style scoped>
/* General styles */
div {
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  color: #333;
}

h3 {
  font-size: 18px;
  color: #555;
  margin-top: 10px;
}

/* Styling for the images swimlane */
ul {
  display: flex;
  overflow-x: auto;
  height: 200px; /* Adjust based on desired fixed height */
  margin: 0;
  padding: 0;
  list-style: none;
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
}
</style>

<template>
  <div>
    <div>
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
            userProjects.map((project) => ({
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
