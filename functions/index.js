const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.handleUserSignUp = functions.auth.user().onCreate((user) => {
  const firestore = admin.firestore();

  admin.auth().setCustomUserClaims(user.uid, { role: 'user' });

  return firestore
    .collection('users')
    .doc(user.uid)
    .set(
      {
        email: user.email,
        role: 'user'
      },
      { merge: true }
    );
});

exports.makeUserAdmin = functions.https.onRequest((request, response) => {
  const { userID } = request.body;

  const firestore = admin.firestore();

  return admin
    .auth()
    .setCustomUserClaims(userID, { role: 'admin' })
    .then(() => {
      return firestore
        .collection('users')
        .doc(userID)
        .set({ role: 'admin' }, { merge: true });
    })
    .then(() => {
      return response.send(200);
    });
});
