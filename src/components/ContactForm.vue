<template>
  <div class="contact-form">
    <div class="center">
      <h1>{{ editing ? 'Edit' : 'Add' }} Contact</h1>
    </div>
    {{errorsAll}}
    <ValidationObserver ref="form" v-slot="{ passes, errors }">
      <form novalidate class="md-layout" @submit="passes(save)">
        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="firstName">First Name</label>

          <ValidationProvider
            vid="firstName"
            rules="required"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-input
              name="firstName"
              v-model="contact.firstName"
              v-bind="ariaInput"
              :disabled="sending"
            />
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="[errors && errors.lastName && errors.lastName[0] ? 'md-invalid' : '']">
          <label for="lastName">Last Name</label>
          <md-input name="lastName" v-model="contact.lastName" :disabled="sending" />
        </md-field>

        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="addressLineOne">Address Line 1</label>
          <md-input name="addressLineOne" v-model="contact.addressLineOne" :disabled="sending" />
        </md-field>

        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="addressLineTwo">Address Line 2</label>
          <md-input name="addressLineTwo" v-model="contact.addressLineTwo" :disabled="sending" />
        </md-field>

        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="city">City</label>
          <md-input name="city" v-model="contact.city" :disabled="sending" />
        </md-field>

        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="country">Country</label>
          <md-select name="country" v-model="contact.country" md-dense :disabled="sending">
            <md-option :value="c" :key="c" v-for="c in countries">
              {{
              c
              }}
            </md-option>
          </md-select>
        </md-field>

        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="postalCode">Postal Code</label>
          <md-input name="postalCode" v-model="contact.postalCode" :disabled="sending" />
        </md-field>

        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="phone">Phone</label>
          <md-input name="phone" v-model="contact.phone" :disabled="sending" />
        </md-field>

        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="gender">Gender</label>
          <md-select name="gender" v-model="contact.gender" md-dense :disabled="sending">
            <md-option value="male">Male</md-option>
            <md-option value="female">Female</md-option>
          </md-select>
        </md-field>

        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="age">Age</label>
          <md-input
            type="number"
            id="age"
            name="age"
            autocomplete="age"
            v-model="contact.age"
            :disabled="sending"
          />
        </md-field>

        <md-field :class="[errors && errors.firstName && errors.firstName[0] ? 'md-invalid' : '']">
          <label for="email">Email</label>
          <md-input
            type="email"
            name="email"
            autocomplete="email"
            v-model="contact.email"
            :disabled="sending"
          />
        </md-field>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-button type="submit" class="md-raised">{{ editing ? 'Edit' : 'Create' }} Contact</md-button>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { COUNTRIES } from '@/helpers/export';
import { contactMixin } from '@/mixins/contactMixin';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('en', en);

export default {
  name: 'ContactForm',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [contactMixin],
  props: {
    editing: Boolean,
    contactId: Number,
  },
  computed: {
    isFormDirty() {
      return Object.keys(this.fields).some((key) => this.fields[key].dirty);
    },
    contacts() {
      return this.$store.state.contacts;
    },
    errorsAll() {
      //return false;
      return this.$refs.form;
    },
  },
  data() {
    return {
      sending: false,
      contact: {},
      countries: COUNTRIES.map((c) => c.name),
    };
  },
  beforeMount() {
    this.contact = this.contacts.find((c) => c.id == this.contactId) || {};
  },
  methods: {
    async save(evt) {
      evt.preventDefault();

      await this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }

      try {
        if (this.editing) {
          await this.updateContact(this.contact, this.contactId);
          await this.getAllContacts();
          this.$emit('contactSaved');
        } else {
          await this.addContact(this.contact);
          await this.getAllContacts();
          this.$router.push('/');
        }
      } catch (ex) {
        console.log(ex);
      }
      });
    },
    async getAllContacts() {
      try {
        const response = await this.getContacts();
        this.$store.commit('setContacts', response.data);
      } catch (ex) {
        console.log(ex);
      }
    },
    getPostalCodeRegex() {
      if (this.contact.country == 'United States') {
        return /^[0-9]{5}(?:-[0-9]{4})?$/;
      } else if (this.contact.country == 'Canada') {
        return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      }
      return /./;
    },
    getPhoneRegex() {
      if (['United States', 'Canada'].includes(this.contact.country)) {
        return /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
      }
      return /./;
    },
  },
};
</script>>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contact-form {
  margin: 0 auto;
  width: 90%;
}
</style>
