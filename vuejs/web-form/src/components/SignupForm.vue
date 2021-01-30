<template>
    <form @submit.prevent="handleSubmit">
        <label>Email: </label>
        <input type="email" required v-model="email" />

        <label>Password: </label>
        <input type="password" required v-model="password" />
        <div v-if="passwordError" class="error">{{ passwordError }}</div>

        <label>Role:</label>
        <select v-model="role">
            <option value="developer">Web Developer</option>
            <option value="designer">Web Designer</option>
        </select>

        <div class="terms">
            <input type="checkbox" v-model="terms" required />
            <label>Accept terms and conditions</label>
        </div>

        <!-- array of 2-way binding for checkboxes -->
        <!-- <div>
            <input type="checkbox" value="jimmy" v-model="names" />
            <label>Jimmy</label>
        </div>
        <div>
            <input type="checkbox" value="phil" v-model="names" />
            <label>Phil</label>
        </div>
        <div>
            <input type="checkbox" value="john" v-model="names" />
            <label>John</label>
        </div> -->

        <label>Skills:</label>
        <input type="text" v-model="tempSkill" @keyup.ctrl="addSkill" />
        <div v-for="skill in skills" :key="skill" class="pill">
            <span @click="removeSkill(skill)">{{ skill }}</span>
        </div>

        <div class="submit">
            <button>Create an Account</button>
        </div>
    </form>

    <p>Email: {{ email }}</p>
    <p>Password: {{ password }}</p>
    <p>Role: {{ role }}</p>
    <p>Terms accepted: {{ terms }}</p>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            role: "",
            terms: false,

            tempSkill: "",
            skills: [],

            passwordError: "",
        };
    },
    methods: {
        addSkill(e) {
            if (e.key === ",") {
                if (
                    this.tempSkill.length > 0 &&
                    !this.skills.includes(this.tempSkill)
                ) {
                    this.skills.push(this.tempSkill);
                }
                this.tempSkill = "";
            }
        },
        removeSkill(skill) {
            // let skillIndex = this.skills.indexOf(skill);
            // this.skills.splice(skillIndex, 1);

            // better...
            this.skills = this.skills.filter((oldSkill) => oldSkill !== skill);
        },
        handleSubmit() {
            // -> not needed due to .prevent event modifier!
            // e.preventDefault();
            this.passwordError =
                this.password.length > 5
                    ? ""
                    : "Password must be at least 6 chars long";

            if (!this.passwordError) {
                console.log({
                    email: this.email,
                    password: this.password,
                    role: this.role,
                    skills: this.skills,
                    terms: this.terms,
                });
            }
        },
    },
};
</script>

<style>
form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input,
select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}
input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
}
.pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}
button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}
.submit {
    text-align: center;
}
.error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}
</style>
