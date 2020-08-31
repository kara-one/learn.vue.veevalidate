<template>
  <div class="contact-form">
    <div class="center">
      <h1>{{ editing ? 'Edit' : 'Add' }} Contact</h1>
    </div>

    <ValidationObserver ref="form" v-slot="{ passes, errors, invalid }">
      <form novalidate class="md-layout" @submit.prevent="passes(save)">
        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'firstName') }">
          <label for="firstName">First Name</label>

          <ValidationProvider
            vid="firstName"
            rules="required|alpha"
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

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'lastName') }">
          <label for="lastName">Last Name</label>

          <ValidationProvider
            vid="lastName"
            rules="required|alpha"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-input
              name="lastName"
              v-model="contact.lastName"
              v-bind="ariaInput"
              :disabled="sending"
            />
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'addressLineOne') }">
          <label for="addressLineOne">Address Line 1</label>

          <ValidationProvider
            vid="addressLineOne"
            rules="required"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-input
              name="addressLineOne"
              v-model="contact.addressLineOne"
              v-bind="ariaInput"
              :disabled="sending"
            />
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'addressLineTwo') }">
          <label for="addressLineTwo">Address Line 2</label>

          <ValidationProvider
            vid="addressLineTwo"
            rules="alpha"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-input
              name="addressLineTwo"
              v-model="contact.addressLineTwo"
              v-bind="ariaInput"
              :disabled="sending"
            />
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'city') }">
          <label for="city">City</label>

          <ValidationProvider
            vid="city"
            rules="required"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-input name="city" v-model="contact.city" v-bind="ariaInput" :disabled="sending" />
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'country') }">
          <label for="country">Country</label>

          <ValidationProvider
            vid="country"
            rules="required|inCountries"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-select
              name="country"
              v-model="contact.country"
              v-bind="ariaInput"
              md-dense
              :disabled="sending"
            >
              <md-option v-for="(c, index) in countries" :value="c" :key="index">{{ c }}</md-option>
            </md-select>
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'postalCode') }">
          <label for="postalCode">Postal Code</label>

          <ValidationProvider
            vid="postalCode"
            :rules="{required: true, regex: getPostalCodeRegex()}"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-input
              name="postalCode"
              v-model="contact.postalCode"
              v-bind="ariaInput"
              :disabled="sending"
            />
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'phone') }">
          <label for="phone">Phone</label>

          <ValidationProvider
            vid="phone"
            :rules="{required: true, regex: getPhoneRegex()}"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-input name="phone" v-model="contact.phone" v-bind="ariaInput" :disabled="sending" />
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'gender') }">
          <label for="gender">Gender</label>

          <ValidationProvider
            vid="gender"
            rules="required"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-select
              name="gender"
              v-model="contact.gender"
              v-bind="ariaInput"
              md-dense
              :disabled="sending"
            >
              <md-option value="male">Male</md-option>
              <md-option value="female">Female</md-option>
            </md-select>
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'age') }">
          <label for="age">Age</label>

          <ValidationProvider
            vid="age"
            rules="required|between:0,200"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-input
              type="number"
              id="age"
              name="age"
              autocomplete="age"
              v-model="contact.age"
              v-bind="ariaInput"
              :disabled="sending"
            />
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-field :class="{ 'md-invalid': mdInvalid(errors, 'email') }">
          <label for="email">Email</label>

          <ValidationProvider
            vid="email"
            rules="required|email"
            :bails="false"
            v-slot="{ errors, ariaMsg, ariaInput }"
          >
            <md-input
              type="email"
              name="email"
              autocomplete="email"
              v-model="contact.email"
              v-bind="ariaInput"
              :disabled="sending"
            />
            <span class="md-error" v-bind="ariaMsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </md-field>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-button
          type="submit"
          class="md-raised"
          :disabled="invalid"
        >{{ editing ? 'Edit' : 'Create' }} Contact</md-button>

        <md-snackbar
          :md-position="snackbar.position"
          :md-duration="snackbar.isInfinity ? Infinity : snackbar.duration"
          :md-active.sync="save_error"
          md-persistent
        >
          <span>{{ save_error }}</span>
          <md-button class="md-primary" @click="save_error = false">Retry</md-button>
        </md-snackbar>
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
import { messages } from 'vee-validate/dist/locale/en.json';

Object.keys(rules).forEach((rule) => {
  extend(rule, {...rules[rule], message: messages[rule]});
});

extend('inCountries', (value) => {
  const check = COUNTRIES.some(el => {
    if(el.name.indexOf(value) !== -1) {
      return true;
    }
  });
  return check || 'Select one from list';
});

localize('en', en);

export default {
  name: 'ContactForm',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  mixins: [contactMixin],
  data() {
    return {
      sending: false,
      save_error: false,
      contact: {},
      countries: COUNTRIES.map((c) => c.name),
      snackbar: {
        position: 'center',
        duration: 4000,
        isInfinity: false
      }
    };
  },
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
  },
  beforeMount() {
    this.contact = this.contacts.find((c) => c.id == this.contactId) || {};
  },
  methods: {
    async save() {
      this.sending = true;
      const success = await this.$refs.form.validate();
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
        this.sending = false;
      } catch (ex) {
        console.log('-----error-------');
        console.log(ex);
        this.save_error = ex;
      }
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
      if (['Ukraine'].includes(this.contact.country)) {
        return /^[0-9]{9}$/;
      }
      return /./;
    },
    mdInvalid(errors, field) {
      const has = Object.prototype.hasOwnProperty;

      return has.call(errors, field) && has.call(errors[field], 0);
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
