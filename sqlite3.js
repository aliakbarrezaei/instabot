
var results = $('#results')[0];
var id = $('#id')[0];
var firstName = $('#username')[0];
var lastName = $('#password')[0];
//-------------

$(document).ready(function () {

    
    var createStatement = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)";

    var selectAllStatement = "SELECT * FROM users";
    var insertStatement = "INSERT INTO users (username, password) VALUES (?,?)";
    var updateStatement = "UPDATE users SET username = ?, password = ? WHERE id = ?";
    var deleteStatement = "DELETE FROM users WHERE id=?";
    var dropStatement = "DROP TABLE users";
    var countdb = "SELECT COUNT(*) FROM users";

    //([db-Name],[db-Version],[db-description],[db-Size])
    var db = openDatabase("insta", "1.0", "Instagram Users", 200000);
    var dataset;

    createTable();



    function onError(tx, error) {
        alert(error.message);
    }

    function showRecords() {
        results.innerHTML = '';
        db.transaction(function (tx) {
            tx.executeSql(selectAllStatement, [], function (tx, result) {
                console.log(tx);
                dataset = result.rows;
                for (var i = 0, item = null; i < dataset.length; i++) {
                    item = dataset.item(i);
                    console.log(item);
                      results.innerHTML += '<tr> <td>' + item['username'] +  '</td> <td>' + item['password'] + '</td> <td> <i class="bi bi-person-bounding-box"></i>  </td> <tr>';
                }
            });
        });
    }

    function createTable() {
        db.transaction(function (tx) {
            tx.executeSql(createStatement, [], showRecords, onError);
        });
    }
    function getCount() {
        db.transaction(function (tx) {
            tx.executeSql(selectAllStatement, [], function (tx, result) {
                console.log(result.rows.length);
                $(".countusers").append(result.rows.length);
            });
        });
    }
    function insertRecord() {
        db.transaction(function (tx) {
            tx.executeSql(insertStatement, [username.value, password.value,], loadAndReset, onError);
        });
    }

    function loadRecord(i) {
        var item = dataset.item(i);
        username.value = item['username'];
        password.value = item['password'];
        id.value = item['id'];
    }

    function updateRecord() {
        db.transaction(function (tx) {
            tx.executeSql(updateStatement, [username.value, password.value, id.value], loadAndReset, onError);
        });
    }

    function deleteRecord(id) {
        db.transaction(function (tx) {
            tx.executeSql(deleteStatement, [id], showRecords, onError);
        });
        resetForm();
    }

    function dropTable() {
        db.transaction(function (tx) {
            tx.executeSql(dropStatement, [], showRecords, onError);
        });
        resetForm();
        setTimeout(() => {
          window.location.href = "login.html";

        }, 300);
    }

    function loadAndReset() {
        resetForm();
        showRecords();
    }

    function resetForm() {
        username.value = '';
        password.value = '';
    }

    $('.reset').on('click', resetForm);
    $('.update').on('click', updateRecord);
    $('.insert').on('click', insertRecord);
    $('.drop').on('click', dropTable);
    $('.getCount').on('click', getCount);
});

