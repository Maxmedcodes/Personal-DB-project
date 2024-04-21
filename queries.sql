-- create countries table
create table countries(
    id serial primary key,
    country_code char(3),
    country_name varchar(100)
)
-- I imported the countries.csv containing all the countries and their country 
-- code i removed "british indian ocean teritory" as i beleived it clashed when entering india 
-- I also renamed "American Saomoa to Samoa " as i beleive it clashes with America
-- *********************************************8
-- Next i created the visited_countries table
create table visited_countries(
    id serial primary key ,
    user_name varchar(15),
    countries varchar(100),
    country_code varchar(4)
)