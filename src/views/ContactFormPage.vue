<template>
    <div class="about">
        <ContactForm :edit="false" />
    </div>
</template>

<script>
// @ is an alias to /src
import ContactForm from '@/components/ContactForm.vue'

export default {
  name: 'ContactFormPage',
  components: {
    ContactForm,
  },
}
</script>
