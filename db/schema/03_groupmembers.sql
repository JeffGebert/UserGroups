DROP TABLE IF EXISTS groupmembers CASCADE;
CREATE TABLE groupmembers (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    group_id INTEGER REFERENCES groups(id) NOT NULL
);