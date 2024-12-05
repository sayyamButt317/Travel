import { pool } from "../Config/db.js";

const userTableQuery = `CREATE TABLE IF NOT EXISTS User(
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  UserName VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Email VARCHAR(255) UNIQUE NOT NULL,
  RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP );`;

const CityTableQuery = `CREATE TABLE IF NOT EXISTS City (
  CityID INT AUTO_INCREMENT PRIMARY KEY,
  Country VARCHAR(255) NOT NULL,
  CityName VARCHAR(255) NOT NULL
);
;`;

const LocationTableQuery = `CREATE TABLE IF NOT EXISTS Location (
  LocationID INT AUTO_INCREMENT PRIMARY KEY,
  LocationName VARCHAR(255) NOT NULL,
  CityID INT NOT NULL,
  Description VARCHAR(255),
  FOREIGN KEY (CityID) REFERENCES City(CityID)
);
`;

const HotelTableQuery = `CREATE TABLE IF NOT EXISTS Hotel (
  HotelID INT AUTO_INCREMENT PRIMARY KEY,
  HotelName VARCHAR(255) NOT NULL,
  CityID INT NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  Rating INT NOT NULL,
  FOREIGN KEY (CityID) REFERENCES City(CityID)
);
`;

const BucketTableQuery = `CREATE TABLE IF NOT EXISTS Bucket (
  BucketListID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT NOT NULL,
  ListName VARCHAR(255) NOT NULL,
  Privacy ENUM('Public', 'Private') NOT NULL,
  CreationDate DATE NOT NULL,
  FOREIGN KEY (UserID) REFERENCES User(UserID)
)
;`;

const BucketListLocationsQuery = `CREATE TABLE IF NOT EXISTS BucketListLocations (
  BucketListID INT NOT NULL,
  LocationID INT NOT NULL,
  PRIMARY KEY (BucketListID, LocationID),
  FOREIGN KEY (BucketListID) REFERENCES Bucket(BucketListID),
  FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
);`;

const JournalTableQuery = `CREATE TABLE IF NOT EXISTS Journal (
  JournalID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT NOT NULL,
  JournalName VARCHAR(255) NOT NULL,
  Privacy ENUM('Public', 'Private') NOT NULL,
  CreationDate DATE NOT NULL,
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);
`;

const LocationReviewTableQuery = `CREATE TABLE IF NOT EXISTS LocationReview (
  ReviewID INT AUTO_INCREMENT PRIMARY KEY,
  LocationID INT NOT NULL,
  UserID INT NOT NULL,
  Rating INT NOT NULL,
  Comment TEXT,
  SubmissionDate DATE NOT NULL,
  FOREIGN KEY (LocationID) REFERENCES Location(LocationID),
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);
`;

const HotelReviewTableQuery = `CREATE TABLE IF NOT EXISTS HotelReview (
  ReviewID INT AUTO_INCREMENT PRIMARY KEY,
  HotelID INT NOT NULL,
  UserID INT NOT NULL,
  Rating INT NOT NULL,
  Comment TEXT,
  SubmissionDate DATE NOT NULL,
  FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID),
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`Table ${tableName} created successfully.`);
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error.message);
  }
};

const createAllTable = async () => {
  try {
    await createTable("User", userTableQuery);
    await createTable("City", CityTableQuery);
    await createTable("Location", LocationTableQuery);
    await createTable("Hotel", HotelTableQuery);
    await createTable("BucketList", BucketTableQuery);
    await createTable("BucketListLocations", BucketListLocationsQuery);
    await createTable("Journal", JournalTableQuery);
    await createTable("LocationReview", LocationReviewTableQuery);
    await createTable("HotelReview", HotelReviewTableQuery);
    console.log("All tables created successfully.");
  } catch (error) {
    console.log("Error creating tables", error);
    throw error;
  }
};

export default createAllTable;
