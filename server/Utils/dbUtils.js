import { pool } from "../Config/db";

const userTableQuery = `CREATE TABLE IF NOT EXISTS User(
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  UserName VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Email VARCHAR(255) UNIQUE NOT NULL,
  RegistrationDate VARCHAR(255) NOT NULL);`;

const CityTableQuery = `CREATE TABLE IF NOT EXISTS City(
  CityID INT FOREIGN KEY (CityID) REFERENCES,
  Country VARCHAR(255) NOT NULL,
  CityName VARCHAR(255) NOT NULL
  );`;

const LocationTableQuery = `CREATE TABLE IF NOT EXISTS Location(
  LocationID INT AUTO_INCREMENT PRIMARY KEY,
  LocationName VARCHAR(255) NOT NULL,
  CityID INT FOREIGN KEY (CityID) REFERENCES City(CityID),
  Description VARCHAR(255);`;

const HotelTableQuery = `CREATE TABLE IF NOT EXISTS Hotel(
  HotelID INT AUTO_INCREMENT PRIMARY KEY,
  HotelName VARCHAR(255) NOT NULL,
  CityID INT FOREIGN KEY (CityID) REFERENCES City(CityID),
  Price DECIMAL(10, 2) NOT NULL,
  Rating INT NOT NULL);`;

const BucketTableQuery = `CREATE TABLE IF NOT EXISTS Bucket(
  BucketListID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT FOREIGN KEY (UserID) REFERENCES User(UserID),
  ListName VARCHAR(255) NOT NULL,
  Privacy ENUM('Public', 'Private') NOT NULL,
  CreationDate DATE NOT NULL);`;

const BucketListLocationsQuery = `CREATE TABLE IF NOT EXISTS BucketList(
  BucketListID INT FOREIGN KEY (BucketListID) REFERENCES Bucket,
  LocationID INT FOREIGN KEY (LocationID) REFERENCES Location(LocationID)
  );`;

const JournalTableQuery = `CREATE TABLE IF NOT EXISTS Journal(
  JournalID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT FOREIGN KEY (UserID) REFERENCES User(UserID),
  JournalName VARCHAR(255) NOT NULL,
  Privacy ENUM('Public', 'Private') NOT NULL,
  CreationDate DATE NOT NULL
  );`;

const LocationReviewTableQuery = `CREATE TABLE IF NOT EXISTS LocationReview(
  ReviewID INT AUTO_INCREMENT PRIMARY KEY,
  LocationID INT FOREIGN KEY (LocationID) REFERENCES Location(LocationID),
  UserID INT FOREIGN KEY (UserID) REFERENCES User(UserID),
  Rating INT NOT NULL,
  Comment TEXT,
  SubmissionDate DATE NOT NULL);`;

const HotelReviewTableQuery = `CREATE TABLE IF NOT EXISTS(
  ReviewID INT AUTO_INCREMENT PRIMARY KEY,
  HotelID INT FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID),
  UserID INT FOREIGN KEY (UserID) REFERENCES User(UserID),
  Rating INT NOT NULL,
  Comment TEXT,
  SubmissionDate DATE NOT NULL
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