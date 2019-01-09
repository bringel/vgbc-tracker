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

exports.updateRole = functions.https.onRequest((request, response) => {
  const { userID, role } = request.body;

  const firestore = admin.firestore();
  const auth = admin.auth();

  const authorization = request.headers.authorization;
  const tokenMatcher = /Bearer (.*)/;

  if (tokenMatcher.test(authorization)) {
    const [_, token] = tokenMatcher.exec(authorization);

    return auth
      .verifyIdToken(token)
      .then(() => {
        return auth.setCustomUserClaims(userID, { role });
      })
      .then(() => {
        return firestore
          .collection('users')
          .doc(userID)
          .set({ role }, { merge: true });
      })
      .then(() => {
        return response.sendStatus(200);
      })
      .catch(() => {
        response.sendStatus(403);
      });
  } else {
    return response.sendStatus(403);
  }
});
