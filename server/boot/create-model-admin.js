/* For creating an admin user. Since we only have login for FB you need to set
 * the accessToken so just use the admin one in db.json
 */

// module.exports = function(app) {
//   var User = app.models.user;
//   var Role = app.models.Role;
//   var RoleMapping = app.models.RoleMapping;
//   console.log("Booting create-model-admin");
//
//   User.create({ username: 'admin', email: 'admin@turnip.com', password: 'password' },
//   function(err, user) {
//     if (err) {
//       console.error("Error creating User", err);
//       return;
//     }
//
//     console.log(JSON.stringify(user));
//     user.save();
//
//     Role.create({
//       name: 'admin'
//     }, function(err, role) {
//       if (err) {
//         console.error("Error creating Role", err);
//         return;
//       }
//
//       role.principals.create({
//         principalType: RoleMapping.USER,
//         principalId: user.id
//       }, function(err, principal) {
//         if (err) throw err;
//       });
//     });
//   });
// };
