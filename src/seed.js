/* eslint-disable no-plusplus */
// NOTE: replace 'aTKxK14ggQM4jWaVH63G3B0ldyC3' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: "aTKxK14ggQM4jWaVH63G3B0ldyC3",
      username: "Teslim",
      fullName: "Akintunde teslim",
      emailAddress: "teslim@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "Akeem",
      fullName: "Shittu Akeem",
      emailAddress: "akeem@akeem.com",
      following: [],
      followers: ["aTKxK14ggQM4jWaVH63G3B0ldyC3"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "ameenah",
      fullName: "ameena Lateefah",
      emailAddress: "ameena@ameena.com",
      following: [],
      followers: ["aTKxK14ggQM4jWaVH63G3B0ldyC3"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "saiduu",
      fullName: "saheed zeed",
      emailAddress: "zeed@zeed.com",
      following: [],
      followers: ["aTKxK14ggQM4jWaVH63G3B0ldyC3"],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "akeem",
            comment: "Love this place, looks like my animal farm!",
          },
          {
            displayName: "orwell",
            comment: "Would you mind if I used this picture?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
