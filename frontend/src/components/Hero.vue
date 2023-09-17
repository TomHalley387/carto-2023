<template>
  <div class="m3Hero" :style="bgImageStyle">
    <div class="container" style="max-width: 1000px">
      <h1 class="title is-1">{{ title }}</h1>
      <p class="subtitle is-4">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      //  default: "Getting the most out of generative AI.",
    },
    bgImage: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/D3-OahttrL-yH62XV-Ss1HzQWT1RaCeAowh_b24TSPUbfilOv559cGrzrExTklxin0oOrZ4RlyPYe85coUMZDSTCqgMOlsofyLm3RKFzhwONddZRf8X_=w2400-rj",
    },
  },
  computed: {
    bgImageStyle() {
      return {
        backgroundImage: `url("${this.bgImage}")`,
      };
    },
  },
};
</script>
<style scoped>
.m3Hero {
  margin: 0 auto;
  margin-bottom: 30px;
  padding: 133px 0;
  border-radius: 22px;
  width: 100%;
  background-color: #f5f5f5;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 1700px;
  color: #000;
}

.m3Hero h1 {
  font-size: 99px;
  font-weight: 100;
}

.card {
  margin-bottom: 20px;
}

/* Responsive adjustments for large screens */

@media (max-width: 1400px) {
  .m3Hero {
    padding: 120px 30px; /* Adjusted padding for larger screens */
  }
}

@media (max-width: 1200px) {
  .m3Hero {
    padding: 110px 20px; /* Adjusted padding for larger screens */
  }
}

/* Responsive adjustments for tablets and smaller desktop views */
@media (max-width: 1024px) {
  .m3Hero {
    padding: 90px 20px; /* Adjusted padding for intermediate screens */
  }

  .m3Hero h1 {
    font-size: 80px; /* Adjust title font size */
  }

  .m3Hero .subtitle.is-4 {
    font-size: 24px; /* Slight adjustment to subtitle font size */
  }
}

/* Responsive adjustments for mobile screens */
@media (max-width: 768px) {
  .m3Hero {
    padding: 60px 20px; /* Adjusted padding for smaller screens */
  }

  .m3Hero h1 {
    font-size: 50px; /* Further reduce title font size for mobiles */
  }

  .m3Hero .subtitle.is-4 {
    font-size: 20px; /* Adjust subtitle font size for mobiles */
  }
}
</style>
