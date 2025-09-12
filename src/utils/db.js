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

//                    KULLANICI FONKSIYONLARI
// --------------------------------------------------
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
              [user.username, user.email, user.password, user.location],
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

export const getUserFromDb = async id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Users WHERE id = ?',
        [id],
        (_, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);

            resolve({
              success: true,
              message: 'Kullanıcı başarıyla getirildi.',
              user,
            });
          } else {
            reject({
              success: false,
              message: 'Aradığınız kullanıcı bulunamadı.',
            });
          }
        },
        (_, error) => {
          reject({
            success: false,
            message: 'Kullanıcı bulunurken hata oluştu',
            error,
          });
        },
      );
    });
  });
};

export const loginFromDb = async (email, password) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Users WHERE email = ?',
        [email],

        // Başarılı olması durumunda
        (tx, results) => {
          // Aranan e-postaya sahip kullanıcı var mı
          if (results.rows.length > 0) {
            const user = results.rows.item(0);

            // Kullanıcı var ama şifre doğru mu
            if (user.password == password) {
              resolve({ success: true, message: 'Giriş başarılı', user });
            } else {
              reject({
                success: false,
                message: 'Kullanıcı bilgilerini kontrol ediniz.',
              });
            }
          } else {
            reject({
              success: false,
              message: 'Kullanıcı bilgilerini kontrol ediniz.',
            });
          }
        },
        (_, error) => reject({ success: false, error }),
      );
    });
  });
};

//                    NOT FONKSIYONLARI
// --------------------------------------------------

// 1) Not Oluşturma
export const insertNoteDb = ({ userId, title, description }) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx =>
      tx.executeSql(
        'INSERT OR REPLACE INTO Notes (userId, title, description) VALUES (?,?,?)',
        [userId, title, description],
        (_, results) => {
          resolve({
            success: true,
            message: 'Not başarıyla eklendi',
            noteId: results.insertId,
          });
        },
        (_, error) => {
          conselo.log(error);
          reject(error);
        },
      ),
    );
  });
};

// 2) Bütün notları alma
export const getAllNotesFromDb = ({ userId }) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx =>
      tx.executeSql(
        'SELECT * FROM Notes WHERE userId = ?',
        [userId],
        (_, results) => {
          const len = results.rows.length;
          const notes = [];
          for (let i = 0; i < len; i++) {
            notes.push(results.rows.item(i));
          }
          resolve(notes);
        },
        (_, error) => {
          reject(error);
        },
      ),
    );
  });
};

//  3) Spesifik bir notu alma
