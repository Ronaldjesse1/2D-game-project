class User {

    static data = null;

    static save_data() {
    }

    static load_data() {
        // let data = JSON.parse(document.localStorage);
        let data = this.mock_user();
        this.data = data
    }

    static mock_user() {
        return {
            name: 'test_user_1',
            map: 0,
            level: 0,
            player: {}
        };
    }
}

export { User };
