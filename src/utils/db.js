import SQLite from 'react-native-sqlite-storage';

// DB bağlantısı kur
const db = SQLite.openDatabase(
  {
    name: 'NoteAppDB',
    location: 'default',
  },
  () => {
    console.log('Database opened.');
  },
  error => {
    console.log('DB ERROR: ', error);
  },
);

// DB bağlantısından sonra tablo oluşturma vs. gibi ilk tereffuatı hallet
export const initializeDatabase = () => {
  db.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, location TEXT);',
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER NOT NULL, title TEXT, description TEXT, FOREIGN KEY(userid) REFERENCES Users(id))',
      );
    },
    error => console.log('DB initialize error', error),
    () => console.log('All tables were successfully created.'),
  );
};

export const insertUserIfNotExists = async user => {
  return new Promise((resolve, reject) => {
    // Sql komut bloğu
    db.transaction(tx => {
      // Sql komutunux kendisi
      // İlk bize verilen e-postaya sahip kullanıcı var mı
      tx.executeSql(
        'SELECT * FROM Users WHERE email = ?',
        [user.email],
        (tx, results) => {
          // Girdiğimiz e-posta adresine sahip kullanıcılar satırı 0'dan büyükse
          if (results.rows.length > 0) {
            reject({ success: false, message: 'Bu e-posta zaten kullanımda.' });
          } else {
            //  Eğer bu e-postaya sahip kullanıcı yoksa kayıt etle
            tx.executeSql(
              'INSERT INTO Users (username, email, password, location) VALUES (?,?,?,?)',
              [user.name, user.email, user.password, user.location],
              (_, results) => {
                resolve({
                  success: true,
                  message: 'Kullanıcı başarıyla kaydoldu.',
                  userId: results.insertId,
                });
              },
              (_, error) => {
                reject({
                  success: false,
                  message: error.message || 'Kullanıcı eklerken hata oluştu.',
                });
              },
            );
          }
        },
        (_, error) => {
          reject({
            success: false,
            error: error.message || 'Kullanıcı var mı yok mu bulunamadı.',
          });
        },
      );
    });
  });
};
