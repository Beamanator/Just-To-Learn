<template>
    <div class="home">
        <h1>Home</h1>
        <div v-if="error">fetch error: {{ error }}</div>
        <div v-if="posts.length">
            <PostList :posts="posts" />
        </div>
        <div v-else>
            <Spinner />
        </div>
        <!-- <button @click="showPosts = !showPosts">toggle posts</button>
        <button @click="posts.pop()">delete a post</button> -->
    </div>
    <!-- <p ref="p">Name: {{ name }}</p> -->
    <!-- <input type="text" v-model="search" />
    <p>Search term - {{ search }}</p>
    <div v-for="name in names" :key="name">{{ name }}</div>
    <p>matching</p>
    <div v-for="name in matchingNames" :key="name">{{ name }}</div> -->
    <!-- <p>Age: {{ age }}</p>
    <button @click="handleClick">click me</button>
    <button @click="age++">Add 1 to age</button>
    <input type="text" v-model="name" />

    <p>{{ ninjaOne.name }} - {{ ninjaOne.age }}</p>
    <button @click="updateNinjaOne">Update ninja one</button>
    <h2>Reactive</h2>
    <p>{{ ninjaTwo.name }} - {{ ninjaTwo.age }}</p>
    <button @click="updateNinjaTwo">Update ninja two</button> -->
</template>

<script>
import { computed, ref, reactive, watch, watchEffect } from "vue";
import PostList from "../components/PostList.vue";
import Spinner from "../components/Spinner.vue";

import getPosts from "../composables/getPosts";

export default {
    name: "Home",
    components: { PostList, Spinner },
    // runs before other lifecycle methods
    // -> not reactive by default
    setup() {
        // const posts = ref([
        //     // {
        //     //     title: "welcome to the blog",
        //     //     body:
        //     //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eum pariatur omnis nulla modi dolorem voluptatem alias quod dignissimos! Reiciendis debitis maxime laboriosam facere in dolorum, illum repudiandae, tempore sed, impedit pariatur alias! Cum unde ab natus enim, fuga mollitia cumque quisquam reiciendis asperiores dolore praesentium distinctio eligendi eaque pariatur rerum quaerat laborum minus ut saepe recusandae excepturi dolores suscipit debitis. Tempora unde neque fugit eos aperiam recusandae totam repellat maxime, quo voluptatibus minima consequuntur dolorum aliquid laudantium, minus at accusantium? Tempore laborum molestias eveniet quas voluptas itaque asperiores ex deleniti ipsa perferendis voluptate excepturi iusto accusantium, ipsum, consectetur eaque?",
        //     //     id: 1,
        //     // },
        //     // {
        //     //     title: "welcome to the blag",
        //     //     body:
        //     //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eum pariatur omnis nulla modi dolorem voluptatem alias quod dignissimos! Reiciendis debitis maxime laboriosam facere in dolorum, illum repudiandae, tempore sed, impedit pariatur alias! Cum unde ab natus enim, fuga mollitia cumque quisquam reiciendis asperiores dolore praesentium distinctio eligendi eaque pariatur rerum quaerat laborum minus ut saepe recusandae excepturi dolores suscipit debitis. Tempora unde neque fugit eos aperiam recusandae totam repellat maxime, quo voluptatibus minima consequuntur dolorum aliquid laudantium, minus at accusantium? Tempore laborum molestias eveniet quas voluptas itaque asperiores ex deleniti ipsa perferendis voluptate excepturi iusto accusantium, ipsum, consectetur eaque?",
        //     //     id: 2,
        //     // },
        // ]);
        // const error = ref(null);

        // const load = async () => {
        //     try {
        //         let data = await fetch("http://localhost:3000/posts");
        //         if (!data.ok) {
        //             throw Error("no data available");
        //         }
        //         posts.value = await data.json();
        //     } catch (err) {
        //         error.value = err.message;
        //     }
        // };

        const { error, posts, load } = getPosts();

        load();

        // const showPosts = ref(true);

        // can grab data, make computed property, anything from here

        // when using ref to surround a value, it becomes reactive
        // const name = ref("mario");
        // const age = ref(30); // maybe not as easy / recommended

        // // this.$refs... (old way)
        // const p = ref(null);
        // // console.log(p) // still null until it's returned

        // const handleClick = () => {
        //     // console.log("you clicked me", p);
        //     // p.value.classList.add("test");

        //     name.value = "luigi";
        //     age.value = 35;
        // };

        // const ninjaOne = ref({ name: "mario", age: 30 });
        // const ninjaTwo = reactive({ name: "luigi", age: 35 });

        // const updateNinjaOne = () => {
        //     ninjaOne.value.age = 40;
        // };
        // const updateNinjaTwo = () => {
        //     ninjaTwo.age = 45;
        // };
        // const search = ref("");
        // const names = ref(["mario", "yoshi", "luigi", "toad", "bowser"]);

        // const matchingNames = computed(() => {
        //     return names.value.filter((name) => {
        //         return name.includes(search.value);
        //     });
        // });

        // // only runs when this passed value updates
        // // (not on component init)
        // const stopWatch = watch(search, () => {
        //     console.log("watch function ran");
        // });

        // // runs when setup function first runs
        // // also runs if any ref is updating within the callback fn!
        // const stopWatchEffect = watchEffect(() => {
        //     console.log("watch effect function ran");
        // });

        // return values you want to use in template
        // -> these are not reactive values like data() (we will do that later)
        return {
            error,
            posts,
            // showPosts,
            // names,
            // search,
            // matchingNames,
            // age,
            // handleClick,
            // p, // ref
            // ninjaOne,
            // ninjaTwo,
            // updateNinjaOne,
            // updateNinjaTwo,
        };
    },
    // -> these are reactive by default (and accessible via this...)
    // data() {
    //     return {

    //     }
    // }
};
</script>
