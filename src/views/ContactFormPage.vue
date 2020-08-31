<template>
  <div class="contact-form md-layout md-alignment-center">
    <div
      class="container md-layout-item md-xlarge-size-60 md-large-size-70 md-medium-size-80 md-small-size-80 md-xsmall-size-90"
    >
      <ContactForm :edit="false" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ContactForm from '@/components/ContactForm.vue';

export default {
  name: 'ContactFormPage',
  components: {
    ContactForm,
  },
};
</script>
