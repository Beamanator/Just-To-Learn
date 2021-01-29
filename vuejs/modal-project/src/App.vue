<template>
    <h1>{{ title }}</h1>
    <p>Welcome...</p>

    <teleport to=".modals" v-if="showModal">
        <Modal theme="sale" @close="toggleModal">
            <template v-slot:links>
                <a href="#">Sign up now</a>
                <a href="#">More info</a>
            </template>
            <!-- default slot w/out a name -->
            <h1>Ninja Givaway!?</h1>
            <p>Grab your ninja swag for half price!</p>
        </Modal>
    </teleport>

    <teleport to=".modals" v-if="showModalTwo">
        <Modal theme="" @close="toggleModalTwo">
            <template v-slot:links>
                <a href="#">Do something</a>
                <a href="#">Go somewhere</a>
            </template>
            <!-- default slot w/out a name -->
            <h1>Flying Disc Invasion is here!</h1>
            <p>Check out our next event!</p>
        </Modal>
    </teleport>

    <button @click.alt="toggleModal">open modal (alt click)</button>
    <button @dblclick="toggleModalTwo">open modal two (double click)</button>
</template>

<script>
import Modal from "./components/Modal";

export default {
    name: "App",
    components: { Modal },
    data() {
        return {
            title: "My First Vue App!",
            showModal: false,
            showModalTwo: false,
        };
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        },
        toggleModalTwo() {
            this.showModalTwo = !this.showModalTwo;
        },
    },
};
</script>

<style>
#app,
.modals {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
h1 {
    border-bottom: 1px solid #ddd;
    display: inline-block;
    padding-bottom: 10px;
}
</style>
