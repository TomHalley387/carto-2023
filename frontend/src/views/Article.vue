<template>
  <div class="article-page" v-if="article && article.slug">
    <Hero
      :title="article.title"
      :subtitle="article.subtitle"
      :bgImage="article.image"
    />
    <img
      :src="article.image"
      alt="Article Image"
      class="article-header-image"
    />
    <h1 class="article-header-title">{{ article.title }}</h1>
    <p class="article-author">By: {{ article.author }}</p>
    <p class="article-date">Published on: {{ article.date }}</p>
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";

export default {
  name: "BlogArticle",
  components: {
    Hero,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      article: {},
    };
  },

  mounted() {
    this.fetchArticle();
  },

  methods: {
    async fetchArticle() {
      try {
        const slug = this.$route.params.slug;
        //  alert(slug);
        const response = await fetch(`/api/articles/${slug}`);

        if (!response.ok) {
          const responseBody = await response.text();
          console.error(
            `Error fetching article with ID ${this.id}. Server responded with ${response.status}: ${responseBody}`
          );
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        this.article = data;
      } catch (error) {
        console.error("There was a problem fetching the article:", error);
      }
    },
  },
};
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.article-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.article-header-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
}

.article-header-title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}

.article-author {
  font-size: 18px;
  color: #666;
  margin-bottom: 5px;
}

.article-date {
  font-size: 16px;
  color: #999;
  margin-bottom: 30px;
}

.article-content {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
}
</style>
