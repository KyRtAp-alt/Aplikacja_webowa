import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://admin:Book54321@cluster0.qxenmyc.mongodb.net/Restauracja"
);

async function getAllDoctors() {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("doctor");
    const result = await collection.find().toArray();
    return result;
  } catch (error) {
    console.error("Error while getting doctors from the database", error);
    throw error;
  }
}

// async function addDoctor(doctorData) {
//   try {
//     await client.connect();
//     const db = client.db();
//     const collection = db.collection("doctor");
//     const result = await collection.insertOne(doctorData);
//     return result;
//   } catch (error) {
//     console.error("Błąd podczas dodawania lekarza do bazy danych", error);
//     throw error;
//   }
// }

// async function deleteDoctor(doctorId) {
//   try {
//     await client.connect();
//     const db = client.db();
//     const collection = db.collection("doctor");
//     const id = new ObjectId(doctorId);
//     const result = await collection.deleteOne({ _id: id });
//     return result.deletedCount;
//   } catch (error) {
//     console.error("Błąd podczas usuwania lekarza z bazy danych", error);
//     throw error;
//   }
// }

// async function updateDoctor(doctorId, updatedData) {
//   try {
//     await client.connect();
//     const db = client.db();
//     const collection = db.collection("doctor");
//     const id = new ObjectId(doctorId);
//     const result = await collection.updateOne(
//       { _id: id },
//       { $set: updatedData }
//     );
//     return result.modifiedCount;
//   } catch (error) {
//     console.error(
//       "Błąd podczas aktualizacji danych lekarza w bazie danych",
//       error
//     );
//     throw error;
//   }
// }

module.exports = {
  getAllDoctors,
  // addDoctor,
  // deleteDoctor,
  // updateDoctor,
};
