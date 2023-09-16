<template>
  <div class="articles-container">
    <div v-for="article in articles" :key="article.id" class="article-card">
      <img :src="article.image" alt="Article Image" class="article-image" />
      <h2 class="article-title">{{ article.title }}</h2>
      <p class="article-summary">{{ article.summary }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "BlogArticles",

  setup() {
    const articles = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch("/api/articles/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        articles.value = data;
      } catch (error) {
        console.error("There was a problem fetching the articles:", error);
      }
    });

    return { articles };
  },
};
</script>

<style scoped>
.articles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.article-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  max-width: 300px;
  transition: transform 0.2s ease-in-out;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article-title {
  padding: 10px 15px;
  font-size: 20px;
  font-weight: bold;
}

.article-summary {
  padding: 0 15px 15px;
  font-size: 16px;
  color: #666;
}
</style>
