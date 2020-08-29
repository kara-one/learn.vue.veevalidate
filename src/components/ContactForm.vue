<template>
    <div class="contact-form">
        <div class="center">
            <h1>{{ editing ? 'Edit' : 'Add' }} Contact</h1>
        </div>
        <form novalidate class="md-layout" @submit="save">
            <md-field :class="{ 'md-invalid': errors.has('firstName') }">
                <label for="firstName">First Name</label>
                <md-input
                    name="firstName"
                    v-model="contact.firstName"
                    v-validate="'required'"
                    :disabled="sending"
                />
                <span class="md-error" v-if="errors.has('firstName')"
                    >First Name is required.</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('lastName') }">
                <label for="lastName">Last Name</label>
                <md-input
                    name="lastName"
                    v-model="contact.lastName"
                    :disabled="sending"
                    v-validate="'required'"
                />
                <span class="md-error" v-if="errors.has('lastName')"
                    >Last Name is required.</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('addressLineOne') }">
                <label for="addressLineOne">Address Line 1</label>
                <md-input
                    name="addressLineOne"
                    v-model="contact.addressLineOne"
                    :disabled="sending"
                    v-validate="'required'"
                />
                <span class="md-error" v-if="errors.has('addressLineOne')"
                    >Address line 1 is required.</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('addressLineTwo') }">
                <label for="addressLineTwo">Address Line 2</label>
                <md-input
                    name="addressLineTwo"
                    v-model="contact.addressLineTwo"
                    :disabled="sending"
                />
                <span class="md-error" v-if="errors.has('addressLineTwo')"
                    >Address line 2 is required</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('city') }">
                <label for="city">City</label>
                <md-input
                    name="city"
                    v-model="contact.city"
                    :disabled="sending"
                    v-validate="'required'"
                />
                <span class="md-error" v-if="errors.has('city')"
                    >City is required.</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('country') }">
                <label for="country">Country</label>
                <md-select
                    name="country"
                    v-model="contact.country"
                    md-dense
                    :disabled="sending"
                    v-validate.continues="'required'"
                >
                    <md-option :value="c" :key="c" v-for="c in countries">{{
                        c
                    }}</md-option>
                </md-select>
                <span
                    class="md-error"
                    v-if="errors.firstByRule('country', 'required')"
                    >Country is required.</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('postalCode') }">
                <label for="postalCode">Postal Code</label>
                <md-input
                    name="postalCode"
                    v-model="contact.postalCode"
                    :disabled="sending"
                    v-validate="{ required: true, regex: getPostalCodeRegex() }"
                />
                <span
                    class="md-error"
                    v-if="errors.firstByRule('postalCode', 'required')"
                    >Postal Code is required.</span
                >
                <span
                    class="md-error"
                    v-if="errors.firstByRule('postalCode', 'regex')"
                    >Postal Code is invalid.</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('phone') }">
                <label for="phone">Phone</label>
                <md-input
                    name="phone"
                    v-model="contact.phone"
                    :disabled="sending"
                    v-validate="{ required: true, regex: getPhoneRegex() }"
                />
                <span
                    class="md-error"
                    v-if="errors.firstByRule('phone', 'required')"
                    >Phone is required.</span
                >
                <span
                    class="md-error"
                    v-if="errors.firstByRule('phone', 'regex')"
                    >Phone is invalid.</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('gender') }">
                <label for="gender">Gender</label>
                <md-select
                    name="gender"
                    v-model="contact.gender"
                    md-dense
                    :disabled="sending"
                    v-validate.continues="'required'"
                >
                    <md-option value="male">Male</md-option>
                    <md-option value="female">Female</md-option>
                </md-select>
                <span
                    class="md-error"
                    v-if="errors.firstByRule('gender', 'required')"
                    >Gender is required.</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('age') }">
                <label for="age">Age</label>
                <md-input
                    type="number"
                    id="age"
                    name="age"
                    autocomplete="age"
                    v-model="contact.age"
                    :disabled="sending"
                    v-validate="'required|between:0,200'"
                />
                <span
                    class="md-error"
                    v-if="errors.firstByRule('age', 'required')"
                    >Age is required.</span
                >
                <span
                    class="md-error"
                    v-if="errors.firstByRule('age', 'between')"
                    >Age must be 0 and 200.</span
                >
            </md-field>
            <br />
            <md-field :class="{ 'md-invalid': errors.has('email') }">
                <label for="email">Email</label>
                <md-input
                    type="email"
                    name="email"
                    autocomplete="email"
                    v-model="contact.email"
                    :disabled="sending"
                    v-validate="'required|email'"
                />
                <span
                    class="md-error"
                    v-if="errors.firstByRule('email', 'required')"
                    >Email is required.</span
                >
                <span
                    class="md-error"
                    v-if="errors.firstByRule('email', 'email')"
                    >Email is invalid.</span
                >
            </md-field>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
            <md-button type="submit" class="md-raised"
                >{{ editing ? 'Edit' : 'Create' }} Contact</md-button
            >
        </form>
    </div>
</template>
<script>
import { COUNTRIES } from '~@/helpers/exports';
import { contactMixin } from '~@/mixins/contactMixin';

export default {
    name: 'ContactForm',
    mixins: [contactMixin],
    props: {
        editing: Boolean,
        contactId: Number,
    },
    computed: {
        isFormDirty() {
            return Object.keys(this.fields).some(
                (key) => this.fields[key].dirty
            );
        },
        contacts() {
            return this.$store.state.contacts;
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
            try {
                const result = await this.$validator.validateAll();
                if (!result) {
                    return;
                }
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
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contact-form {
    margin: 0 auto;
    width: 90%;
}
</style>
