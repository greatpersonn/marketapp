CREATE DATABASE Mirta;

CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    UserName VARCHAR(128) NOT NULL, 
    UserPassword VARCHAR(128) NOT NULL,
    UserEmail VARCHAR(128) NOT NULL,
    UserRole VARCHAR(32) NOT NULL,
    UserImage VARCHAR(128) NOT NULL,
    UserFeedbacks TEXT [],
    UserProducts TEXT [],
    UserOrders TEXT []
);

CREATE TABLE Products (
    ProductID SERIAL,
    ProductUserID INT,
    ProductName VARCHAR(128) NOT NULL,
    ProductKey VARCHAR(128) NOT NULL,
    ProductPrice VARCHAR(128) NOT NULL,
    ProductDesc VARCHAR(256) NOT NULL,
    ProductImage VARCHAR(128) NOT NULL,
    Added VARCHAR(128) NOT NULL,
    FOREIGN KEY (ProductUserID) REFERENCES Users (UserID)
);

CREATE TABLE News (
    NewsID SERIAL PRIMARY KEY,
    NewsAuthorID INT,
    NewsHeader VARCHAR(128) NOT NULL,
    NewsTitle VARCHAR(128) NOT NULL,
    NewsContent VARCHAR(256) NOT NULL,
    NewsImage VARCHAR(128) NOT NULL,
    NewsAuthor VARCHAR(128) NOT NULL,
    NewsDate VARCHAR(64) NOT NULL,
    FOREIGN KEY (NewsAuthorID) REFERENCES Users (UserID)
);