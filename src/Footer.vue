<template>
    <div id="footer">
        <small>Total users: {{users.length}}</small>
    </div>
</template>

<script>

    import { mapState } from 'vuex';

    export default {
        computed: {
            ...mapState('userModule', {
                users: 'users'
            })
        }
    }
</script>

<style>

</style>
