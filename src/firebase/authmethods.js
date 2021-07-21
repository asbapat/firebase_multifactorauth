import firebaseconfig from "./firebaseIndex";
import firebase from "firebase";

var recaptchaVerifier = null;
var resolver = null;
var verificationId = null;

export const authMethods = {
  //firebase helper methods go here...

  enroll: async (phone) => {
    console.log(phone);
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier("2fa-captcha", {
      size: "invisible",
      callback: function (response) {
        console.log("captcha solved!");
      },
    });

    const user = firebase.auth().currentUser;

    const session = await user.multiFactor.getSession();

    const phoneOpts = {
      phoneNumber: phone,
      session: session,
    };
    const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
    verificationId = await phoneAuthProvider.verifyPhoneNumber(
      phoneOpts,
      recaptchaVerifier
    );
    alert("SMS Sent");
  },
  verify: async (code) => {
    const cred = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    const multiFactorAssertion =
      firebase.auth.PhoneMultiFactorGenerator.assertion(cred);

    const user = firebase.auth().currentUser;
    await user.multiFactor.enroll(multiFactorAssertion, "phone number");

    alert("enrolled in MFA");
  },
  signup: (email, password, setErrors, setToken) => {
    console.log(email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        console.log(res);
        const token = res.user.Aa;
        console.log(token);
        //set token to localStorage
        await localStorage.setItem("token", token);
        setToken(token);
        await res.user.sendEmailVerification();
        alert("check your email!");
        // grab token from local storage and set to state.
      })
      .catch((err) => {
        console.error("Error", err);
        setErrors((prev) => [...prev, err.message]);
      });
  },
  signin: async (email, password, setErrors) => {
    //change from create users to...
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      //everything is almost exactly the same as the function above
      .then(async (res) => {
        console.log(res);
      })
      .catch(async (err) => {
        console.log(err);
        if (err.code === "auth/multi-factor-auth-required") {
          recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "2fa-captcha",
            {
              size: "invisible",
              callback: function (response) {
                console.log("captcha solved!");
              },
            }
          );
          resolver = err.resolver;
          if (
            resolver.hints[0].factorId ===
            firebase.auth.PhoneMultiFactorGenerator.FACTOR_ID
          ) {
            var phoneOpts = {
              multiFactorHint: resolver.hints[0],
              session: resolver.session,
            };
            const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();

            verificationId = await phoneAuthProvider.verifyPhoneNumber(
              phoneOpts,
              recaptchaVerifier
            );

            alert("sms text sent!");
          }
        }
        setErrors((prev) => [...prev, err.message]);
      });
  },
  verifyLogin: async (code, setToken) => {
    const cred = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    const multiFactorAssertion =
      firebase.auth.PhoneMultiFactorGenerator.assertion(cred);

    const credential = await resolver.resolveSignIn(multiFactorAssertion);

    console.log(credential);
    const token = credential.user.Aa;
    //set token to localStorage
    await localStorage.setItem("token", token);

    setToken(window.localStorage.token);

    alert("logged in!");
  },
  signout: (setErrors, setToken) => {
    // signOut is a no argument function
    firebase
      .auth()
      .signOut()
      .then((res) => {
        //remove the token
        localStorage.removeItem("token");
        //set the token back to original state
        setToken(null);
      })
      .catch((err) => {
        //there shouldn't every be an error from firebase but just in case
        setErrors((prev) => [...prev, err.message]);
        //whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem("token");
        setToken(null);
        console.error(err.message);
      });
  },
};
