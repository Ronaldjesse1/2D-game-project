
class User {

    static name
    static mapno
    static level

    static save_data() {}

    static load_data() {
        // let data = JSON.parse(document.localStorage);
        let { name, mapno, level, player } = mock_user()
        this.name = name;
        this.mapno = mapno;
        this.level = level;
    }
}


function mock_user() {
    return {
        name: 'test_user_1',
        mapno: 0,
        level: 0,
    };
}

export { User };
