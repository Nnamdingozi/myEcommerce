// const { sequelize } = require('../backend/database/models'); // Adjust the path to your models

// async function dropDuplicateUniqueConstraints() {
//   try {
//     // Find all unique constraints for the Countries table
//     const [countryConstraints] = await sequelize.query(`
//       SELECT conname 
//       FROM pg_constraint 
//       WHERE conrelid = '"Countries"'::regclass 
//       AND contype = 'u';
//     `);

//     // Log the constraints to see what existsnpx sequelize-cli migration:generate --name modify_unique_constraint
//     console.log('Country constraints:', countryConstraints);

//     // Drop duplicate unique constraints from Countries table
//     for (let constraint of countryConstraints) {
//       if (constraint.conname !== 'Countries_code_key') {
//         console.log(`Dropping constraint: ${constraint.conname}`);
//         await sequelize.query(`ALTER TABLE "Countries" DROP CONSTRAINT "${constraint.conname}" CASCADE;`);
//       }
//     }

//     console.log('Duplicate unique constraints have been dropped.');
//   } catch (error) {
//     console.error('Error dropping unique constraints:', error);
//   }
// }

// dropDuplicateUniqueConstraints();
