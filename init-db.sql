CREATE TABLE IF NOT EXISTS baby_names (
  state_code VARCHAR(2) NOT NULL,
  gender_code VARCHAR(1) NOT NULL,
  birth_year INT NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  name_count INT NOT NULL,
  PRIMARY KEY (state_code, gender_code, birth_year, first_name, name_count)
);
